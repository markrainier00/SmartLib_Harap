"use client";

import React, { useState, useRef, useEffect } from "react";

/* ─── HELPERS & MOCK DATA ───────────────────────────────── */
const CATS = ["All", "Computer Science", "Mathematics", "Physics", "Chemistry", "Biology", "Engineering", "Medicine", "Economics", "Accounting", "Law"];
const COURSES = ["All", "BSCS", "BSIT", "BSCpE", "BSMATH", "BSBA", "BSAcc", "BSECE", "BSCHE", "BSN", "BSCE", "BSBio", "BSPharma"];

// 🚀 PINALITAN: Ginawa nating "" (blanko) ang default category
const EMPTY_BOOK = { title: "", author: "", category: "", course: "BSCS", available: true, pages: "", copies: 1, description: "", actualImage: null };

function Badge({ label, type = "navy" }: any) {
  const m: any = {
    green: ["#e6f7ec", "#2d7a4f"], red: ["#fdeaea", "#c94040"],
    blue: ["#e8f1fd", "#2563eb"], navy: ["#e8ecf5", "#1a2744"]
  };
  const [bg, fg] = m[type] || m.navy;
  return <span style={{ background: bg, color: fg, padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, display: "inline-block" }}>{label}</span>;
}

function Btn({ children, variant = "navy", onClick, style = {} }: any) {
  const base: any = { border: "none", borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all .18s", display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 20px", ...style };
  const v: any = {
    navy: { background: "#1a2744", color: "#fff", boxShadow: "0 4px 14px rgba(26,39,68,.22)" },
    ghost: { background: "#f0ede5", color: "#1a2744", border: "2px solid #e2dfd6" },
    red: { background: "#fdeaea", color: "#c94040", border: "2px solid #f5c5c5" },
  };
  return <button style={{ ...base, ...v[variant] }} onClick={onClick}>{children}</button>;
}

export default function AdminLibraryPage() {
  const [libBooks, setLibBooks] = useState<any[]>([]);

  const [libSearch, setLibSearch] = useState("");
  const [libCat, setLibCat] = useState("All");
  const [libAvail, setLibAvail] = useState("All");
  
  const [bookModal, setBookModal] = useState<any>(null);
  const [bookForm, setBookForm] = useState<any>(EMPTY_BOOK);
  const [delBook, setDelBook] = useState<any>(null);
  const [toast, setToast] = useState<any>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fireToast = (type: string, msg: string) => { setToast({ type, msg }); setTimeout(() => setToast(null), 3000); };

  // FETCH MULA SA GO BACKEND (GET)
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/books");
        const json = await res.json();
        if (json.isSuccess && json.data) {
          setLibBooks(json.data); 
        }
      } catch (err) {
        console.error("Failed to fetch books:", err);
      }
    };
    fetchBooks();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBookForm((f: any) => ({ ...f, actualImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const filtLib = libBooks.filter(b => {
    const ms = b.title?.toLowerCase().includes(libSearch.toLowerCase()) || b.author?.toLowerCase().includes(libSearch.toLowerCase());
    const mc = libCat === "All" || b.category === libCat;
    const ma = libAvail === "All" || (libAvail === "Available" ? b.available : !b.available);
    return ms && mc && ma;
  });

  const openAdd = () => { setBookForm({ ...EMPTY_BOOK }); setBookModal({ mode: "add" }); };
  const openEdit = (b: any) => { setBookForm({ ...b }); setBookModal({ mode: "edit", book: b }); };
  const openView = (b: any) => { setBookModal({ mode: "view", book: b }); };

  // SAVE PAPUNTA SA GO BACKEND (POST)
  const saveBook = async () => {
    // 🚀 PINALITAN: Idinagdag ang Category sa Form Validation
    if (!bookForm.title.trim() || !bookForm.author.trim() || !bookForm.category) { 
      fireToast("err", "Title, Author, and Category are required!"); 
      return; 
    }

    try {
      if (bookModal.mode === "add") {
        const payload = {
          ...bookForm,
          pages: Number(bookForm.pages) || 0,
          copies: Number(bookForm.copies) || 1,
        };

        const res = await fetch("http://localhost:8080/api/books", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const json = await res.json();

        if (json.isSuccess) {
          setLibBooks(prev => [...prev, json.data]); 
          fireToast("ok", "Book added to Supabase successfully!");
        } else {
          fireToast("err", "Backend error: " + json.message);
        }

      } else {
        setLibBooks(prev => prev.map(b => b.id === bookModal.book.id ? { ...bookForm, id: b.id } : b));
        fireToast("ok", "Book updated locally!");
      }
    } catch (err) {
      console.error("API Fetch Error:", err);
      fireToast("err", "Cannot connect to Backend Server.");
    }
    
    setBookModal(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookForm((prev: any) => ({ ...prev, [name]: value }));
  };

  // DELETE: TATAWAGIN ANG BACKEND
  const deleteBook = async () => {
    if (!delBook) return;

    try {
      const res = await fetch(`http://localhost:8080/api/books/${delBook.id}`, {
        method: "DELETE",
      });

      const json = await res.json();

      if (json.isSuccess) {
        setLibBooks(prev => prev.filter(b => b.id !== delBook.id));
        fireToast("ok", "Book deleted permanently.");
      } else {
        fireToast("err", "Failed to delete: " + json.message);
      }
    } catch (err) {
      console.error("Delete Error:", err);
      fireToast("err", "Cannot connect to Backend Server.");
    }
    
    setDelBook(null);
  };

  return (
    <div style={{ animation: "fadeUp .3s ease" }}>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        .row-hover:hover { background: #f7f5f0 !important; }
        .chip { border: 2px solid #e2dfd6; border-radius: 50px; padding: 7px 16px; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600; cursor: pointer; background: #fff; color: #8a8ea8; transition: all .18s; }
        .chip:hover { border-color: #1a2744; color: #1a2744; }
        .chip.active { background: #1a2744; color: #fff; border-color: #1a2744; }
        .action-icon { background: #f0ede5; border: 1.5px solid #e2dfd6; border-radius: 8px; padding: 5px 9px; font-size: 13px; cursor: pointer; transition: all .15s; }
        .action-icon:hover { transform: scale(1.05); }
      `}</style>

      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, color: "#1a2744" }}>Library Management</div>
          <div style={{ fontSize: 13, color: "#8a8ea8", marginTop: 2 }}>Catalog & Inventory Control</div>
        </div>
        <Btn onClick={openAdd}>＋ Add New Book</Btn>
      </div>

      {/* FILTERS */}
      <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap", alignItems: "center" }}>
        <input 
          value={libSearch} 
          onChange={e => setLibSearch(e.target.value)} 
          placeholder="Search catalog..."
          style={{ flex: 1, minWidth: 200, maxWidth: 300, background: "#fff", border: "2px solid #e2dfd6", borderRadius: 11, padding: "9px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: "#1a2744", outline: "none" }} 
        />
        <select value={libCat} onChange={e => setLibCat(e.target.value)} style={{ background: "#fff", border: "2px solid #e2dfd6", borderRadius: 11, padding: "9px 14px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#1a2744", outline: "none", cursor: "pointer" }}>
          {CATS.map(c => <option key={c}>{c}</option>)}
        </select>
        <div style={{ display: "flex", gap: 6 }}>
          {["All", "Available", "Borrowed"].map(v => (
            <button key={v} className={`chip ${libAvail === v ? "active" : ""}`} onClick={() => setLibAvail(v)}>{v}</button>
          ))}
        </div>
      </div>

      {/* TABLE */}
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2dfd6", boxShadow: "0 2px 12px rgba(26,39,68,.06)", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2.4fr 1.6fr 1.2fr 1fr 0.8fr 1fr 1.4fr", padding: "12px 20px", background: "#f7f5f0", borderBottom: "1px solid #e2dfd6" }}>
          {["Book Details", "Author", "Category", "Course", "Copies", "Status", "Actions"].map(h => (
            <div key={h} style={{ fontSize: 10, fontWeight: 700, color: "#8a8ea8", letterSpacing: ".06em", textTransform: "uppercase" }}>{h}</div>
          ))}
        </div>

        {filtLib.length === 0 && (
          <div style={{ padding: 30, textAlign: "center", color: "#8a8ea8", fontSize: 14 }}>
            No books found. Try adding a new book!
          </div>
        )}

        {filtLib.map((b, i) => (
          <div key={b.id} className="row-hover" style={{ display: "grid", gridTemplateColumns: "2.4fr 1.6fr 1.2fr 1fr 0.8fr 1fr 1.4fr", padding: "14px 20px", borderBottom: i < filtLib.length - 1 ? "1px solid #f2efe8" : "none", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
              <div style={{ width: 34, height: 46, borderRadius: 5, background: "#f0ede5", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", border: "1px solid #e2dfd6" }}>
                {b.actualImage ? <img src={b.actualImage} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontSize: 14 }}>📖</span>}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1a2744" }}>{b.title}</div>
                <div style={{ fontSize: 10.5, color: "#8a8ea8" }}>ID: {b.id} • {b.pages} pages</div>
              </div>
            </div>
            <div style={{ fontSize: 13, color: "#64748b" }}>{b.author}</div>
            <div><Badge label={b.category || "N/A"} /></div>
            <div style={{ fontSize: 12.5, color: "#64748b" }}>{b.course || "N/A"}</div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{b.copies}</div>
            <div><Badge label={b.available ? "Available" : "Borrowed"} type={b.available ? "green" : "red"} /></div>
            <div style={{ display: "flex", gap: 6 }}>
              <button className="action-icon" onClick={() => openView(b)}>👁</button>
              <button className="action-icon" style={{ background: "#e8f1fd" }} onClick={() => openEdit(b)}>✏️</button>
              <button className="action-icon" style={{ background: "#fdeaea", color: "#c94040" }} onClick={() => setDelBook(b)}>🗑</button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL: ADD / EDIT BOOK */}
      {bookModal && bookModal.mode !== "view" && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(26,39,68,.5)", backdropFilter: "blur(4px)", zIndex: 90, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "#fff", borderRadius: 22, padding: "28px", maxWidth: 580, width: "100%", maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#1a2744", marginBottom: 20 }}>
              {bookModal.mode === "add" ? "Register New Book" : "Update Book Details"}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div style={{ gridColumn: "1/-1" }}>
                <label style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "#8a8ea8", display: "block", marginBottom: 6 }}>Cover Photo</label>
                <div style={{ display: "flex", gap: 12, alignItems: "center", padding: "12px", background: "#f8f7f2", borderRadius: 12 }}>
                   <div style={{ width: 60, height: 80, borderRadius: 8, background: "#fff", border: "1px solid #e2dfd6", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                     {bookForm.actualImage ? <img src={bookForm.actualImage} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : "📸"}
                   </div>
                   <Btn variant="ghost" onClick={() => fileInputRef.current?.click()}>Upload Cover</Btn>
                   <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
                </div>
              </div>

              <div style={{ gridColumn: "1/-1" }}>
                <label style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "#8a8ea8", display: "block", marginBottom: 5 }}>Book Title *</label>
                <input name="title" value={bookForm.title} onChange={handleInputChange} style={{ width: "100%", background: "#f0ede5", border: "none", borderRadius: 10, padding: "11px", fontSize: 14 }} />
              </div>

              <div>
                <label style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "#8a8ea8", display: "block", marginBottom: 5 }}>Author *</label>
                <input name="author" value={bookForm.author} onChange={handleInputChange} style={{ width: "100%", background: "#f0ede5", border: "none", borderRadius: 10, padding: "11px", fontSize: 14 }} />
              </div>

              <div>
                <label style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "#8a8ea8", display: "block", marginBottom: 5 }}>Category *</label>
                {/* 🚀 PINALITAN: Nagdagdag tayo ng disabled default option para piliting pumili ang user */}
                <select name="category" value={bookForm.category} onChange={handleInputChange} style={{ width: "100%", background: "#f0ede5", border: "none", borderRadius: 10, padding: "11px", fontSize: 14 }}>
                  <option value="" disabled> choose category </option>
                  {CATS.slice(1).map(c => <option key={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "#8a8ea8", display: "block", marginBottom: 5 }}>Pages</label>
                <input name="pages" type="number" value={bookForm.pages} onChange={handleInputChange} style={{ width: "100%", background: "#f0ede5", border: "none", borderRadius: 10, padding: "11px", fontSize: 14 }} />
              </div>

              <div>
                <label style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "#8a8ea8", display: "block", marginBottom: 5 }}>Copies</label>
                <input name="copies" type="number" value={bookForm.copies} onChange={handleInputChange} style={{ width: "100%", background: "#f0ede5", border: "none", borderRadius: 10, padding: "11px", fontSize: 14 }} />
              </div>

              <div style={{ gridColumn: "1/-1" }}>
                <label style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "#8a8ea8", display: "block", marginBottom: 5 }}>Brief Description</label>
                <textarea name="description" value={bookForm.description} onChange={handleInputChange} style={{ width: "100%", background: "#f0ede5", border: "none", borderRadius: 10, padding: "11px", minHeight: 80, fontSize: 14 }} />
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <Btn onClick={saveBook} style={{ flex: 1 }}>{bookModal.mode === "add" ? "Save Book" : "Update Book"}</Btn>
              <Btn variant="ghost" onClick={() => setBookModal(null)} style={{ flex: 1 }}>Discard</Btn>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODAL */}
      {bookModal?.mode === "view" && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(26,39,68,.5)", backdropFilter: "blur(4px)", zIndex: 90, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "#fff", borderRadius: 22, padding: "28px", maxWidth: 450, width: "100%" }}>
            <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
              <div style={{ width: 100, height: 140, borderRadius: 12, background: "#f0ede5", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", border: "1px solid #e2dfd6", flexShrink: 0 }}>
                {bookModal.book.actualImage ? <img src={bookModal.book.actualImage} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : "📖"}
              </div>
              <div>
                <Badge label={bookModal.book.category} />
                <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: "#1a2744", margin: "8px 0 4px" }}>{bookModal.book.title}</h2>
                <p style={{ color: "#8a8ea8", fontSize: 14 }}>By {bookModal.book.author}</p>
              </div>
            </div>
            <div style={{ padding: "15px", background: "#f8f7f2", borderRadius: 14, fontSize: 13, color: "#64748b", lineHeight: 1.6, marginBottom: 20 }}>
              {bookModal.book.description || "No description provided for this book."}
            </div>
            <Btn variant="ghost" onClick={() => setBookModal(null)} style={{ width: "100%" }}>Close Preview</Btn>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {delBook && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(26,39,68,.5)", backdropFilter: "blur(4px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#fff", borderRadius: 20, padding: "24px", maxWidth: 320, textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>⚠️</div>
            <h3 style={{ color: "#1a2744", marginBottom: 8 }}>Remove Book?</h3>
            <p style={{ fontSize: 13, color: "#8a8ea8", marginBottom: 20 }}>Are you sure you want to delete <br/><strong>{delBook.title}</strong>?</p>
            <div style={{ display: "flex", gap: 10 }}>
              <Btn variant="red" onClick={deleteBook} style={{ flex: 1 }}>Delete</Btn>
              <Btn variant="ghost" onClick={() => setDelBook(null)} style={{ flex: 1 }}>Keep it</Btn>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: toast.type === "err" ? "#c94040" : "#1a2744", color: "#fff", padding: "10px 20px", borderRadius: 12, fontSize: 13, fontWeight: 600, boxShadow: "0 8px 24px rgba(0,0,0,.2)", zIndex: 200, animation: "fadeUp .3s ease" }}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}