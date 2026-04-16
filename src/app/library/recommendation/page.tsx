"use client";

import { api } from "@/lib/api";
import { useUser } from "@/lib/user";
import React, { useState, useEffect } from "react";
import { IconBookmark, IconLogo, IconShelf, IconX } from "@/components/icons";
import BookCard from "@/components/BookCard";
import LoadingModal from "@/components/LoadingModal";
import Modal from "@/components/Modal";
import { BookDetails } from "@/components/BookDetails";

const CATS = ["All", "Computer Science", "Mathematics", "Chemistry", "Economics", "Medicine", "Engineering"];

export default function LibraryPage() {
  const { firstName, school_id, program } = useUser();

  const [isLoadingOpen, setIsLoadingOpen] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Processing...");
  const [isSystemResponseOpen, setSystemResponseOpen] = useState(false);
  const [systemResponse, setSystemResponse] = useState("");
  
  const [requestedBooks, setRequestedBooks] = useState<string[]>([]);
  const [books, setBooks] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState("title");
  const [savedBooks, setSavedBooks] = useState<string[]>([]);
  const [category, setCategory] = useState("All Categories");
  const [filterAvail, setFilterAvail] = useState("all");
  const [selectedBook, setSelectedBook] = useState<any>(null);
  
  const fetchBooks = async () => {
    try {
      const json = await api.getPublic("/api/books/getBooks");
      if (json.retCode === "200" || json.isSuccess) {
        setBooks(json.data || []);
      } else {
        setSystemResponse("Failed to load books");
      }
    } catch (err) {
      setSystemResponse("Cannot connect to the server.");
    }
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchWishlist = async () => {
    try {
      const json = await api.get(`/api/transactions/getWishlist/${school_id}`);
      if (json.retCode === "200") {
        setSavedBooks(json.data);
      } else {
        setSystemResponse("Failed to the wishlist");
      }
    } catch (err) {
      setSystemResponse("Cannot connect to the server.");
    }
  };
  useEffect(() => {
    if (!school_id) return;
    fetchWishlist();
  }, [school_id]);

  const fetchRequests = async () => {
    try {
      const json = await api.get(`/api/transactions/getRequests/${school_id}`);console.log("Response:", json);
      if (json.isSuccess) {
        setRequestedBooks(json.data);
      }
    } catch (err) {
      console.error("Failed to fetch requests", err);
    }
  };
  useEffect(() => {
    if (school_id) fetchRequests();
  }, [school_id]);

  const openBookDetails = (book: any) => {
    setSelectedBook(book);
  };

  const handleBookRequest = async (pickupDate: string) => {
    if (isLoadingOpen) return;
    if (!pickupDate) {
      setSystemResponse("Please select a pickup date.");
      setSystemResponseOpen(true);
      return;
    }

    setSelectedBook(null);
    setLoadingMessage("Submitting borrow request...");
    setIsLoadingOpen(true);

    try {
      const json = await api.post("/api/transactions/request", {
          school_id: school_id,
          isbn: selectedBook.isbn,
          pickup_date: pickupDate,
      });

      if (json.retCode === "200") {
        setSystemResponse(`Borrow request submitted successfully for "${selectedBook.title}."`);
        setRequestedBooks(prev => [...prev, selectedBook.isbn]);
      } else {
        setSystemResponse(`${json.message}`);
      }
    } catch (err) {
      setSystemResponse("Server connection failed.");
    } finally {
      setIsLoadingOpen(false);
      setSystemResponseOpen(true);
    }
  };

  const handleWishlist = async (e: React.MouseEvent | null, book: any) => {
    if (e) e.stopPropagation();
    if (isLoadingOpen) return;

    setIsLoadingOpen(true);

    const isSaved = savedBooks.includes(book.isbn);
    setLoadingMessage(isSaved ? "Removing from wishlist..." : "Adding to wishlist...");
    setIsLoadingOpen(true);

    try {
      if (isSaved) {
        await api.post("/api/transactions/removeWishlist", {
          school_id,
          isbn: book.isbn,
        });

        setSavedBooks(prev => prev.filter(id => id !== book.isbn));
        setSystemResponse("Removed from wishlist");
      } else {
        await api.post("/api/transactions/addWishlist", {
          school_id,
          isbn: book.isbn,
        });

        setSavedBooks(prev => [...prev, book.isbn]);
        setSystemResponse("Added to wishlist");
      }
    } catch (err) {
      setSystemResponse(`Wishlist error: ${err}`);
    } finally {
      setIsLoadingOpen(false);
      setSystemResponseOpen(true);
    }
  };

  const allCategories = books.flatMap(b => 
    b.category ? b.category.split(',').map((c: string) => c.trim()) : []
  );
  const CATEGORIES = ["All Categories", "Uncategorized", ...new Set(allCategories)];

  let filtered = books.filter(b => {
    
    const bookCategory = b.category 
      ? b.category.split(',').map((c: string) => c.trim()) 
      : ["Uncategorized"];

    const matchesCategory = category === "All Categories" || bookCategory.includes(category);
    
    const matchAvail = filterAvail === "all" || (filterAvail === "yes" ? b.available : !b.available);
    return matchesCategory && matchAvail;
  });

  if (sortBy === "avail") filtered.sort((a, b) => Number(b.available) - Number(a.available));
  else filtered.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
  
  const programBooks = books.filter(b =>
    b.category &&
    b.category.trim() !== "" &&
    b.category
      .split(",")
      .map((c: string) => c.trim())
      .some((cat: string) =>
        (program || "").toLowerCase().includes(cat.toLowerCase()) ||
  cat.toLowerCase().includes((program || "").toLowerCase())
      )
  );
  
  return (
    <>
      <style>{`
        .rec-book { flex-shrink: 0; width: 140px; cursor: pointer; }
        .rec-book:hover .bk-cover { transform: translateY(-4px); box-shadow: 6px 8px 20px rgba(0,0,0,.2); }
        .rb-title { font-size: 14px; font-weight: 500; color: #102A1C; margin-top: 5px; 

        white-space: nowrap;      /* keep it on one line */
        overflow: hidden;         /* hide the overflow */
        text-overflow: ellipsis;}

        .bookmark-btn {
          background: none;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 22px;
          padding: 2px;
          transition: transform .2s ease;
          text-shadow: 0 1px 10px rgba(0,0,0,0.9);
          color: #fff;
        }
        .bookmark-btn:hover { transform: scale(1.25); }

        /* ── Badges ── */
        .badge { padding: 2px 4px; border-radius: 5px; font-size: 11.5px; font-weight: 700; }
        .badge-green { background: var(--color-success-bg); color: var(--color-success); border: 2px solid var(--color-success-border); }
        .badge-red { background: var(--color-error-bg); color: var(--color-error); border: 2px solid var(--color-error-border); }


        /* ── Category chips ── */
        .chip {
          border: none; border-radius: 50px;
          padding: 8px 18px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 600;
          cursor: pointer; transition: all .2s;
          white-space: nowrap;
        }
        .chip-on { background: #1B5E35; color: #fff; box-shadow: 0 4px 10px rgba(27,94,53,.2); }
        .chip-off { background: #fff; color: #3B6B50; border: 1.5px solid #C3DDD0; }
        .chip-off:hover { border-color: #1B5E35; color: #1B5E35; }

        /* ── Book grid ── */
        .bk-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 20px; }
        .bk-card {
          background: #fff;
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid #C3DDD0;
          box-shadow: 0 4px 14px rgba(27,94,53,.05);
          cursor: pointer;
          transition: all .25s ease;
          display: flex;
          flex-direction: column;
        }
        .bk-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 30px rgba(27,94,53,.12);
          border-color: #4CAF78;
        }
        .bk-card-img {
          padding: 5px;
          display: flex;
          justify-content: center;
          position: relative;
          background: #EBF7F0;
        }
        /* ── Filter selects ── */
        .filter-sel {
          background: #fff;
          border: 1.5px solid #C3DDD0;
          border-radius: 10px;
          color: #102A1C;
          padding: 8px 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 500;
          outline: none; cursor: pointer;
          transition: border 0.2s;
        }
        .filter-sel:focus { border-color: #1B5E35; }

        /* ── Side panel ── */
        .side-panel {
          width: 400px;
          flex-shrink: 0;
          background: #ffffff;
          border-radius: 24px;
          border: 1px solid #C3DDD0;
          box-shadow: 0 12px 40px rgba(27,94,53,.1);
          position: sticky;
          top: 0;
          height: calc(100vh - 120px);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: slideInRight .3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .sp-scroll {
          flex: 1; overflow-y: auto;
          padding: 32px 28px 20px;
          position: relative;
        }
        .sp-scroll::-webkit-scrollbar { width: 5px; }
        .sp-scroll::-webkit-scrollbar-thumb { background: #C3DDD0; border-radius: 3px; }

        .sp-footer {
          padding: 20px 28px;
          background: #fff;
          border-top: 1px solid #EBF7F0;
          flex-shrink: 0;
          z-index: 10;
        }
        .sp-close {
          position: absolute; top: 20px; right: 20px;
          background: #EBF7F0; border: none; border-radius: 50%;
          width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #7AAD8E; font-size: 14px;
          transition: background 0.2s; z-index: 20;
        }
        .sp-close:hover { background: #D6EDE1; color: #1B5E35; }

        @media (max-width: 1100px) {
          .side-panel { position: fixed; right: 20px; top: 80px; height: calc(100vh - 100px); z-index: 100; }
        }
      `}</style>

      {/* ── MAIN CONTENT ── */}
      <div className="page-layout fadeUp" style={{ minWidth: 0 }}>

        {/* Hero */}
        <div className="hero relative">
          <div className="hero-eyebrow">Hello, {firstName || 'Student'}!</div>
          <div className="hero-title">What will you read today?</div>
          <div className="hero-sub">Explore available books across different categories tailored for {program || 'your'} students.</div>
          <IconLogo className="absolute right-10 top-4 w-60 h-60 opacity-10 -rotate-12"/>
        </div>

        <div>
          <div className="section-head">
            <div>
              <div className="section-title">{program} Related Books</div>
              <div className="section-sub">Based on your enrolled program</div>
            </div>
          </div>
          <div className="rec-scroll">
            {programBooks.length > 0 ? (
              programBooks.map(b => (
                <BookCard
                  key={b.id}
                  book={b}
                  onClick={openBookDetails}
                  handleWishlist={handleWishlist}
                  isSaved={savedBooks.includes(b.isbn)}
                />
              ))
            ) : (
              <p style={{ color: "var(--color-subtext)", fontSize: "14px" }}>
                No books found for your program yet.
              </p>
            )}
          </div>
        </div>

        {/* Browse by Category */}
        <div>
          <div className="section-head">
            <div>
              <div className="section-title">Explore the Library</div>
              <div className="page-sub">Discover from {books.length} books in our catalog</div>
            </div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <select value={category} onChange={e => setCategory(e.target.value)} className="pills">
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <select aria-label="Availability" className="pills" value={filterAvail} onChange={e => setFilterAvail(e.target.value)}>
                <option value="all">All Books</option>
                <option value="yes">Available</option>
                <option value="no">Unavailable</option>
              </select>
              {(category !== "All Categories" || filterAvail !== "all") && (
                <button className="pills" onClick={() => { setCategory("All Categories"); setFilterAvail("all"); }} style={{ background: "#f5f5f5", borderColor: "#dadada", color: "#777777" }}>
                  Reset
                </button>
              )}
            </div>
          </div>

          <div className="bk-grid">
            {filtered.length > 0 ? filtered.map(b => (
              <BookCard
                key={b.id}
                book={b}
                onClick={openBookDetails}
                handleWishlist={handleWishlist}
                isSaved={savedBooks.includes(b.isbn)}
              />
            )) : (
              <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "60px 0", color: "#7AAD8E" }}>
                <IconShelf/>
                <p style={{ marginTop: 12, fontSize: 15 }}>No books found in the library.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Modal for displaying messages */}
      <Modal isOpen={isSystemResponseOpen} message={systemResponse} onClose={() => setSystemResponseOpen(false)} />
      <LoadingModal isOpen={isLoadingOpen} message={loadingMessage} />
      
      {/* ── SIDE PANEL ── */}
      {selectedBook && (
        <BookDetails
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          role="Student"
          handleBookRequest={handleBookRequest}
        />
      )}
    </>
    
  );
}