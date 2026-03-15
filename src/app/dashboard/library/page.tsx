"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const CATS = ["All", "Computer Science", "Mathematics", "Chemistry", "Economics", "Medicine", "Engineering"];

export default function LibraryPage() {
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [books, setBooks] = useState<any[]>([]);
  const [activeCat, setActiveCat] = useState("All");
  const [sortBy, setSortBy] = useState("title");
  const [filterAvail, setFilterAvail] = useState("all");
  const [savedBooks, setSavedBooks] = useState<number[]>([]);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [requestStep, setRequestStep] = useState<"details" | "form">("details");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      router.replace("/");
    } else {
      try {
        setCurrentUser(JSON.parse(userStr));
      } catch (e) {
        router.replace("/");
      }
    }
  }, [router]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/books");
        const json = await res.json();
        if (json.isSuccess && json.data) setBooks(json.data);
      } catch (err) {
        console.error("Failed to fetch books:", err);
      }
    };
    fetchBooks();
  }, []);

  const toggleSave = (e: React.MouseEvent | null, id: number) => {
    if (e) e.stopPropagation();
    setSavedBooks(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const openBookDetails = (book: any) => {
    setSelectedBook(book);
    setRequestStep("details");
    setPickupDate("");
    setReturnDate("");
  };

  const closePanel = () => setSelectedBook(null);

  const handleConfirmRequest = async () => {
    if (!pickupDate || !returnDate) {
      alert("⚠️ Please select both pickup and return dates.");
      return;
    }
    try {
      const res = await fetch("http://localhost:8080/api/transactions/borrow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          school_id: currentUser?.school_id || "Unknown",
          book_title: selectedBook.title,
          pickup_date: pickupDate,
          return_date: returnDate,
        }),
      });
      const result = await res.json();
      if (res.ok && result.isSuccess) {
        alert(`✅ Request submitted successfully for: ${selectedBook.title}!`);
        closePanel();
      } else {
        alert(`❌ Error: ${result.message}`);
      }
    } catch (err) {
      alert("⚠️ Server connection failed. Make sure your Go backend is running on port 8080.");
    }
  };

  let filteredBooks = books.filter(b => {
    const matchCat = activeCat === "All" || b.category === activeCat;
    const matchAvail = filterAvail === "all" || (filterAvail === "yes" ? b.available : !b.available);
    return matchCat && matchAvail;
  });

  if (sortBy === "author") filteredBooks.sort((a, b) => (a.author || "").localeCompare(b.author || ""));
  else if (sortBy === "avail") filteredBooks.sort((a, b) => Number(b.available) - Number(a.available));
  else filteredBooks.sort((a, b) => (a.title || "").localeCompare(b.title || ""));

  if (!currentUser) return null;

  return (
    <div className="library-wrapper">
      <style>{`
        .library-wrapper {
          display: flex;
          align-items: flex-start;
          gap: 24px;
          width: 100%;
          max-width: 1500px;
          margin: 0 auto;
        }

        .main-content { flex: 1; min-width: 0; }

        /* ── Hero ── */
        .hero {
          background: linear-gradient(135deg, #1B5E35 0%, #256D42 55%, #2E8B57 100%);
          border-radius: 20px;
          padding: 32px 36px;
          margin-bottom: 32px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(27,94,53,.2);
        }
        .hero::before {
          content: '';
          position: absolute;
          right: -20px; top: -40px;
          width: 220px; height: 220px;
          background: radial-gradient(circle, rgba(76,175,120,.35) 0%, transparent 70%);
        }
        .hero::after {
          content: '📚';
          position: absolute;
          right: 40px; top: 15px;
          font-size: 90px;
          opacity: .12;
          transform: rotate(-12deg);
        }
        .hero-eyebrow {
          font-size: 11.5px;
          font-weight: 700;
          color: rgba(255,255,255,.65);
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .hero-title {
          font-family: 'DM Serif Display', serif;
          font-size: 28px;
          color: #fff;
          margin-bottom: 8px;
          position: relative;
          z-index: 2;
        }
        .hero-sub {
          font-size: 14px;
          color: rgba(255,255,255,.75);
          max-width: 460px;
          position: relative;
          z-index: 2;
          line-height: 1.5;
        }

        /* ── Sections ── */
        .section-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 12px;
        }
        .section-title {
          font-family: 'DM Serif Display', serif;
          font-size: 22px;
          color: #102A1C;
        }
        .section-sub { font-size: 13px; color: #7AAD8E; margin-top: 4px; }

        /* ── Rec scroll ── */
        .rec-scroll {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          padding-bottom: 12px;
          margin-bottom: 36px;
        }
        .rec-scroll::-webkit-scrollbar { height: 6px; }
        .rec-scroll::-webkit-scrollbar-thumb { background: #C3DDD0; border-radius: 3px; }

        /* ── Book cover ── */
        .bk-cover {
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          flex-shrink: 0;
          box-shadow: 4px 4px 15px rgba(0,0,0,.15), inset -3px 0 8px rgba(0,0,0,.2);
          transition: transform .25s ease;
          background: #EBF7F0;
        }
        .bk-cover .spine { position: absolute; left: 0; top: 0; bottom: 0; width: 6px; }
        .bk-cover .lines {
          position: absolute; inset: 0;
          background: repeating-linear-gradient(0deg,transparent,transparent 16px,rgba(255,255,255,.05) 16px,rgba(255,255,255,.05) 17px);
        }

        .rec-book { flex-shrink: 0; width: 140px; cursor: pointer; }
        .rec-book:hover .bk-cover { transform: translateY(-4px); box-shadow: 6px 8px 20px rgba(0,0,0,.2); }
        .rb-title { font-size: 14px; font-weight: 700; color: #102A1C; line-height: 1.3; margin-top: 12px; }
        .rb-author { font-size: 12px; color: #7AAD8E; margin-top: 3px; }

        .star-btn {
          background: none; border: none; cursor: pointer;
          font-size: 22px; padding: 4px;
          transition: transform .2s ease;
          position: absolute; top: 6px; right: 6px; z-index: 10;
          text-shadow: 0 2px 4px rgba(0,0,0,.3);
          color: #fff;
        }
        .star-btn:hover { transform: scale(1.25); }

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
        .bk-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 20px; }
        .bk-card {
          background: #fff;
          border-radius: 16px;
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
          padding: 18px 18px 10px;
          display: flex;
          justify-content: center;
          position: relative;
          background: #EBF7F0;
        }

        /* ── Badges ── */
        .badge { display: inline-flex; align-items: center; padding: 4px 12px; border-radius: 20px; font-size: 11.5px; font-weight: 700; }
        .badge-green { background: #D6EDE1; color: #1B5E35; }
        .badge-red { background: #fdeaea; color: #c94040; }

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

        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: none; }
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
      <div className="main-content">

        {/* Hero */}
        <div className="hero">
          <div className="hero-eyebrow">Good Morning, {currentUser.firstname || 'Student'}!</div>
          <div className="hero-title">What will you learn today?</div>
          <div className="hero-sub">Explore available books across different categories tailored for {currentUser.program || 'your'} students.</div>
        </div>

        {/* Curated for You */}
        <div>
          <div className="section-head">
            <div>
              <div className="section-title">Curated for You</div>
              <div className="section-sub">Based on your enrolled program</div>
            </div>
          </div>
          <div className="rec-scroll">
            {books.slice(0, 4).map(b => (
              <div key={b.id} className="rec-book" onClick={() => openBookDetails(b)}>
                <div style={{ position: "relative" }}>
                  <div className="bk-cover" style={{ width: 140, height: 190, background: b.actualImage ? '#fff' : `linear-gradient(150deg, ${b.accent || '#1B5E35'}, ${b.cover || '#4CAF78'}88)` }}>
                    {b.actualImage ? (
                      <img src={b.actualImage} alt="Cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <>
                        <div className="spine" style={{ background: b.cover || '#4CAF78' }}></div>
                        <div className="lines"></div>
                        <span style={{ fontSize: "60px", position: "relative", zIndex: 1 }}>📖</span>
                      </>
                    )}
                  </div>
                  <button className="star-btn" onClick={(e) => toggleSave(e, b.id)}>
                    {savedBooks.includes(b.id) ? '⭐' : '☆'}
                  </button>
                </div>
                <div className="rb-title">{b.title?.length > 24 ? b.title.slice(0, 24) + '…' : b.title}</div>
                <div className="rb-author">{b.author}</div>
                <div style={{ marginTop: 8 }}>
                  <span className={`badge ${b.available ? 'badge-green' : 'badge-red'}`}>{b.available ? 'Available' : 'Unavailable'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Browse by Category */}
        <div>
          <div className="section-head">
            <div className="section-title">Browse by Category</div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <select aria-label="Sort" className="filter-sel" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="title">A–Z Title</option>
                <option value="author">A–Z Author</option>
              </select>
              <select aria-label="Availability" className="filter-sel" value={filterAvail} onChange={e => setFilterAvail(e.target.value)}>
                <option value="all">All Books</option>
                <option value="yes">Available</option>
                <option value="no">Unavailable</option>
              </select>
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
            {CATS.map(c => (
              <button key={c} className={`chip ${activeCat === c ? 'chip-on' : 'chip-off'}`} onClick={() => setActiveCat(c)}>{c}</button>
            ))}
          </div>

          <div className="bk-grid">
            {filteredBooks.length > 0 ? filteredBooks.map(b => (
              <div key={b.id} className="bk-card" onClick={() => openBookDetails(b)}>
                <div className="bk-card-img">
                  <div className="bk-cover" style={{ width: 120, height: 165, background: b.actualImage ? '#fff' : `linear-gradient(150deg, ${b.accent || '#1B5E35'}, ${b.cover || '#4CAF78'}88)` }}>
                    {b.actualImage ? (
                      <img src={b.actualImage} alt="Cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <>
                        <div className="spine" style={{ background: b.cover || '#4CAF78' }}></div>
                        <div className="lines"></div>
                        <span style={{ fontSize: "50px", position: "relative", zIndex: 1 }}>📖</span>
                      </>
                    )}
                  </div>
                  <button className="star-btn" style={{ top: 10, right: 10 }} onClick={(e) => toggleSave(e, b.id)}>
                    {savedBooks.includes(b.id) ? '⭐' : '☆'}
                  </button>
                </div>
                <div style={{ padding: "12px 16px 16px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#102A1C", lineHeight: 1.4, margin: "0 0 4px 0" }}>
                    {b.title?.length > 28 ? b.title.slice(0, 28) + '…' : b.title}
                  </div>
                  <div style={{ fontSize: 12, color: "#7AAD8E", margin: "0 0 12px 0", flex: 1 }}>{b.author}</div>
                  <span className={`badge ${b.available ? 'badge-green' : 'badge-red'}`}>{b.available ? 'Available' : 'Unavailable'}</span>
                </div>
              </div>
            )) : (
              <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "60px 0", color: "#7AAD8E" }}>
                <div style={{ fontSize: 42 }}>📭</div>
                <p style={{ marginTop: 12, fontSize: 15 }}>No books found in the library.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── SIDE PANEL ── */}
      {selectedBook && (
        <aside className="side-panel">
          <div className="sp-scroll">
            <button className="sp-close" onClick={closePanel}>✕</button>

            <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px", paddingTop: "10px" }}>
              <div className="bk-cover" style={{ width: 130, height: 180, background: selectedBook.actualImage ? '#fff' : `linear-gradient(150deg, ${selectedBook.accent || '#1B5E35'}, ${selectedBook.cover || '#4CAF78'}88)`, boxShadow: "0 10px 30px rgba(0,0,0,.2)" }}>
                {selectedBook.actualImage ? (
                  <img src={selectedBook.actualImage} alt="Cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <>
                    <div className="spine" style={{ background: selectedBook.cover || '#4CAF78' }}></div>
                    <div className="lines"></div>
                    <span style={{ fontSize: "55px", position: "relative", zIndex: 1 }}>📖</span>
                  </>
                )}
              </div>
            </div>

            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "22px", color: "#102A1C", marginBottom: "6px", lineHeight: 1.2 }}>{selectedBook.title}</h3>
              <p style={{ fontSize: "14px", color: "#4CAF78", fontWeight: 600, marginBottom: "14px" }}>{selectedBook.author}</p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center" }}>
                <span className={`badge ${selectedBook.available ? 'badge-green' : 'badge-red'}`}>{selectedBook.available ? 'Available' : 'Unavailable'}</span>
                <span className="badge" style={{ background: "#EBF7F0", color: "#1B5E35" }}>{selectedBook.pages || '?'} Pages</span>
              </div>
            </div>

            {requestStep === "details" && (
              <div style={{ background: "#EBF7F0", padding: "18px", borderRadius: "14px", border: "1px solid #C3DDD0" }}>
                <h4 style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "#7AAD8E", marginBottom: "8px" }}>Synopsis / Description</h4>
                <p style={{ fontSize: "13px", color: "#3B6B50", lineHeight: 1.6, margin: 0 }}>
                  {selectedBook.description || "No description provided."}
                </p>
              </div>
            )}

            {requestStep === "form" && (
              <div style={{ background: "#EBF7F0", padding: "20px", borderRadius: "16px", border: "1px solid #C3DDD0", animation: "fadeUp .2s ease" }}>
                <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#102A1C", marginBottom: "14px" }}>📅 Schedule Borrow Request</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "14px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "#7AAD8E", marginBottom: "6px" }}>Pickup Date</label>
                    <input aria-label="Pickup Date" type="date" value={pickupDate} onChange={e => setPickupDate(e.target.value)}
                      style={{ width: "100%", background: "#fff", border: "2px solid #C3DDD0", borderRadius: "10px", padding: "10px 12px", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#102A1C", outline: "none" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "#7AAD8E", marginBottom: "6px" }}>Return Date</label>
                    <input aria-label="Return Date" type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)}
                      style={{ width: "100%", background: "#fff", border: "2px solid #C3DDD0", borderRadius: "10px", padding: "10px 12px", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#102A1C", outline: "none" }} />
                  </div>
                </div>
                <div style={{ fontSize: "11px", color: "#3B6B50", lineHeight: 1.5 }}>
                  <span style={{ color: "#e05c5c", fontWeight: 600 }}>Note:</span> Unclaimed books after the pickup date will be automatically canceled. Standard duration is max 7 days.
                </div>
              </div>
            )}
          </div>

          <div className="sp-footer">
            {requestStep === "details" ? (
              <div style={{ display: "flex", gap: "10px" }}>
                {selectedBook.available ? (
                  <>
                    <button style={{ flex: 1, padding: "14px 10px", borderRadius: "12px", border: "none", background: "#1B5E35", color: "#fff", fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", boxShadow: "0 4px 14px rgba(27,94,53,.3)", transition: "all 0.2s" }}
                      onClick={() => setRequestStep("form")}>
                      ✋ Request
                    </button>
                    <button style={{ flex: 1, padding: "14px 10px", borderRadius: "12px", border: "2px solid #C3DDD0", background: savedBooks.includes(selectedBook.id) ? "#1B5E35" : "#fff", color: savedBooks.includes(selectedBook.id) ? "#fff" : "#1B5E35", fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", transition: "all 0.2s" }}
                      onClick={() => toggleSave(null, selectedBook.id)}>
                      {savedBooks.includes(selectedBook.id) ? '⭐ Saved' : '☆ Wishlist'}
                    </button>
                  </>
                ) : (
                  <button style={{ width: "100%", padding: "14px", borderRadius: "12px", border: "none", background: "#e89940", color: "#fff", fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", boxShadow: "0 4px 14px rgba(232,153,64,.3)", transition: "all 0.2s" }}
                    onClick={() => { alert('You are now in queue!'); closePanel(); }}>
                    🔔 Notify When Available
                  </button>
                )}
              </div>
            ) : (
              <div style={{ display: "flex", gap: "10px" }}>
                <button style={{ flex: 1, padding: "14px", borderRadius: "12px", border: "none", background: "#1B5E35", color: "#fff", fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", boxShadow: "0 4px 14px rgba(27,94,53,.25)" }}
                  onClick={handleConfirmRequest}>
                  ✅ Confirm
                </button>
                <button style={{ flex: 1, padding: "14px", borderRadius: "12px", border: "2px solid #C3DDD0", background: "#fff", color: "#1B5E35", fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px" }}
                  onClick={() => setRequestStep("details")}>
                  Cancel
                </button>
              </div>
            )}
          </div>
        </aside>
      )}
    </div>
  );
}