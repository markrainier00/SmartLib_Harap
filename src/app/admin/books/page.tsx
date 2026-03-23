"use client";

import React, { useState, useRef, useEffect } from "react";

/* ─── HELPERS & MOCK DATA ───────────────────────────────── */
// 🚀 PALITAN ITO KUNG IBA ANG PORT NG GO BACKEND MO (Ex: http://localhost:8000/api/books)
const API_URL = "http://localhost:8080/api/books"; 

const CATS = ["All", "Computer Science", "Mathematics", "Physics", "Chemistry", "Biology", "Engineering", "Medicine", "Economics", "Accounting", "Law"];
const COURSES = ["All", "BSCS", "BSIT", "BSCpE", "BSMATH", "BSBA", "BSAcc", "BSECE", "BSCHE", "BSN", "BSCE", "BSBio", "BSPharma"];

const EMPTY_BOOK = { title: "", author: "", cat: "Computer Science", course: "BSCS", avail: true, pages: "", copies: 1, description: "", actualImage: null };

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

/* ─── MAIN COMPONENT ────────────────────────────────────── */
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

  // 🚀 1. KUNIN ANG DATA MULA SA GO BACKEND
  const fetchBooks = async () => {
    try {
      const response = await fetch(API_URL);
      const result = await response.json();
      
      if (response.ok && result.isSuccess) {
        setLibBooks(result.data || []); // Kukunin niya yung "data" array galing sa Go
      } else {
        fireToast("err", result.message || "Failed to load books");
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      fireToast("err", "Cannot connect to Backend Database.");
    }
  };

  useEffect(() => {
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
    const titleMatch = b.title ? b.title.toLowerCase().includes(libSearch.toLowerCase()) : false;
    const authorMatch = b.author ? b.author.toLowerCase().includes(libSearch.toLowerCase()) : false;
    const ms = titleMatch || authorMatch;
    const mc = libCat === "All" || b.category === libCat;
    const ma = libAvail === "All" || (libAvail === "Available" ? b.available : !b.available);
    return ms && mc && ma;
  });

  const openAdd = () => { setBookForm({ ...EMPTY_BOOK }); setBookModal({ mode: "add" }); };
  
  const openEdit = (b: any) => { 
    setBookForm({ 
      title: b.title, 
      author: b.author, 
      cat: b.category || "Computer Science", 
      course: b.course || "BSCS", 
      avail: b.available !== undefined ? b.available : true, 
      pages: b.pages || "", 
      copies: b.copies || 1, 
      description: b.description || "", 
      actualImage: b.actualImage || null 
    }); 
    setBookModal({ mode: "edit", book: b }); 
  };
  
  const openView = (b: any) => { setBookModal({ mode: "view", book: b }); };

  // 🚀 2. MAG-SAVE O MAG-UPDATE SA GO BACKEND
  const saveBook = async () => {
    if (!bookForm.title.trim() || !bookForm.author.trim()) { fireToast("err", "Title and Author are required"); return; }
    
    // Sakto sa JSON tags ng model.Book
    const payload = {
      title: bookForm.title,
      author: bookForm.author,
      category: bookForm.cat,
      course: bookForm.course,
      available: bookForm.avail,
      pages: Number(bookForm.pages) || 0,
      copies: Number(bookForm.copies) || 1,
      description: bookForm.description,
      actualImage: bookForm.actualImage
    };

    const isAdd = bookModal.mode === "add";
    const method = isAdd ? "POST" : "PUT";
    const url = isAdd ? API_URL : `${API_URL}/${bookModal.book.id}`;

    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      const result = await response.json();

      if (response.ok && result.isSuccess) {
        fireToast("ok", result.message);
        fetchBooks(); // I-refresh ang data sa screen
        setBookModal(null);
      } else {
        fireToast("err", result.message || "Failed to save to database.");
      }
    } catch (error) {
      console.error(error);
      fireToast("err", "Server offline. Is the Go backend running?");
    }
  };

  // 🚀 3. MAG-DELETE SA GO BACKEND
  const deleteBook = async () => {
    try {
      const response = await fetch(`${API_URL}/${delBook.id}`, { method: "DELETE" });
      const result = await response.json();

      if (response.ok && result.isSuccess) {
        fireToast("ok", result.message);
        fetchBooks(); // I-refresh ang data
        setDelBook(null);
      } else {
        fireToast("err", result.message || "Failed to delete from database.");
      }
    } catch (error) {
      console.error(error);
      fireToast("err", "Server offline.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookForm((prev: any) => ({ ...prev, [name]: value }));
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
        input, select, textarea { transition: border-color 0.2s ease; }
        input:focus, select:focus, textarea:focus { border-color: #1a2744 !important; }
      `}</style>

      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, color: "#1a2744" }}>Library Management</div>
          <div style={{ fontSize: 13, color: "#8a8ea8", marginTop: 2 }}>{libBooks.length} books in Database</div>
        </div>
        <Btn onClick={openAdd}>＋ Add New Book</Btn>
      </div>

      {/* FILTERS */}
      <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1, maxWidth: 300 }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, pointerEvents: "none" }}>🔍</span>
          <input value={libSearch} onChange={e => setLibSearch(e.target.value)} placeholder="Search title or author…"
            style={{ width: "100%", background: "#fff", border: "2px solid #e2dfd6", borderRadius: 11, padding: "9px 13px 9px 38px", fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: "#1a2744", outline: "none" }} />
        </div>
        <select value={libCat} onChange={e => setLibCat(e.target.value)} style={{ background: "#fff", border: "2px solid #e2dfd6", borderRadius: 11, padding: "9px 14px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#1a2744", outline: "none", cursor: "pointer" }}>
          {CATS.map(c => <option key={c}>{c}</option>)}
        </select>
        {["All", "Available", "Borrowed"].map(v => (
          <button key={v} className={`chip ${libAvail === v ? "active" : ""}`} onClick={() => setLibAvail(v)}>{v}</button>
        ))}
      </div>

      {/* TABLE */}
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2dfd6", boxShadow: "0 2px 12px rgba(26,39,68,.06)", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2.4fr 1.6fr 1.2fr 1fr 0.7fr 0.7fr 0.7fr 1.4fr", padding: "11px 20px", background: "#f7f5f0", borderBottom: "1px solid #e2dfd6" }}>
          {["Cover + Title", "Author", "Category", "Course", "Copies", "Pages", "Status", "Actions"].map(h => (
            <div key={h} style={{ fontSize: 10.5, fontWeight: 700, color: "#8a8ea8", letterSpacing: ".06em", textTransform: "uppercase" }}>{h}</div>
          ))}
        </div>

        {filtLib.map((b, i) => (
          <div key={b.id} className="row-hover" style={{ display: "grid", gridTemplateColumns: "2.4fr 1.6fr 1.2fr 1fr 0.7fr 0.7fr 0.7fr 1.4fr", padding: "12px 20px", borderBottom: i < filtLib.length - 1 ? "1px solid #f2efe8" : "none", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 11, cursor: "pointer" }} onClick={() => openView(b)}>
              <div style={{ width: 34, height: 46, borderRadius: 5, background: b.actualImage ? "none" : "#f0ede5", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", border: "1px solid #e2dfd6" }}>
                {b.actualImage ? <img src={b.actualImage} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontSize: 20 }}>📖</span>}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1a2744", lineHeight: 1.3 }}>{b.title}</div>
                <div style={{ fontSize: 10.5, color: "#8a8ea8", marginTop: 2 }}>ID #{b.id}</div>
              </div>
            </div>
            <div style={{ fontSize: 13, color: "#64748b" }}>{b.author}</div>
            <div><Badge label={b.category || "Unknown"} type="navy" /></div>
            <div style={{ fontSize: 12.5, color: "#64748b" }}>{b.course || "N/A"}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1a2744", textAlign: "center" }}>{b.copies}</div>
            <div style={{ fontSize: 13, color: "#64748b" }}>{b.pages || 0}</div>
            <div><Badge label={b.available !== false ? "Available" : "Borrowed"} type={b.available !== false ? "green" : "red"} /></div>
            <div style={{ display: "flex", gap: 6 }}>
              <button className="action-icon" onClick={() => openView(b)}>👁</button>
              <button className="action-icon" style={{ background: "#e8f1fd" }} onClick={() => openEdit(b)}>✏️</button>
              <button className="action-icon" style={{ background: "#fdeaea", color: "#c94040" }} onClick={() => setDelBook(b)}>🗑</button>
            </div>
          </div>
        ))}
        {filtLib.length === 0 && (
          <div style={{ padding: 30, textAlign: "center", color: "#8a8ea8", fontSize: 14 }}>No books found in database.</div>
        )}
      </div>

      {/* MODAL: ADD / EDIT BOOK */}
      {bookModal && bookModal.mode !== "view" && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(26,39,68,.5)", backdropFilter: "blur(6px)", zIndex: 90, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "#fff", borderRadius: 22, padding: "26px 28px", maxWidth: 580, width: "100%", maxHeight: "90vh", overflowY: "auto" }}>
            
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: "#1a2744" }}>{bookModal.mode === "add" ? "New Library Book" : "Edit Book"}</div>
              <button onClick={() => setBookModal(null)} style={{ background: "#f0ede5", border: "none", borderRadius: 8, padding: "6px 10px", cursor: "pointer" }}>✕</button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
              <div style={{ gridColumn: "1/-1", marginBottom: 20 }}>
                <label style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "#1a2744", display: "block", marginBottom: 8 }}>Actual Book Photo</label>
                <div style={{ display: "flex", gap: 15, alignItems: "center" }}>
                  <div style={{ width: 80, height: 110, borderRadius: 10, background: "#f0ede5", border: "2px dashed #e2dfd6", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {bookForm.actualImage ? <img src={bookForm.actualImage} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span>📸</span>}
                  </div>
                  <div style={{ flex: 1 }}>
                    <Btn variant="ghost" onClick={() => fileInputRef.current?.click()} style={{ width: "100%", justifyContent: "center" }}>Choose Photo</Btn>
                    <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
                  </div>
                </div>
              </div>

              <div style={{ gridColumn: "1/-1", marginBottom: 13 }}>
                <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#1a2744", display: "block", marginBottom: 5 }}>Title *</label>
                <input name="title" value={bookForm.title} onChange={handleInputChange} style={{ width: "100%", background: "#f0ede5", border: "2px solid transparent", borderRadius: 10, padding: "9px 11px", fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: "#1a2744", outline: "none" }} />
              </div>

              <div style={{ marginBottom: 13 }}>
                <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#1a2744", display: "block", marginBottom: 5 }}>Author *</label>
                <input name="author" value={bookForm.isbn} onChange={handleInputChange} style={{ width: "100%", background: "#f0ede5", border: "2px solid transparent", borderRadius: 10, padding: "9px 11px", fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: "#1a2744", outline: "none" }} />
              </div>

              <div style={{ marginBottom: 13 }}>
                <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#1a2744", display: "block", marginBottom: 5 }}>ISBN *</label>
                <input name="author" value={bookForm.author} onChange={handleInputChange} style={{ width: "100%", background: "#f0ede5", border: "2px solid transparent", borderRadius: 10, padding: "9px 11px", fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: "#1a2744", outline: "none" }} />
              </div>

              <div style={{ marginBottom: 13 }}>
                <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#1a2744", display: "block", marginBottom: 5 }}>Publisher *</label>
                <input name="author" value={bookForm.author} onChange={handleInputChange} style={{ width: "100%", background: "#f0ede5", border: "2px solid transparent", borderRadius: 10, padding: "9px 11px", fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: "#1a2744", outline: "none" }} />
              </div>

              <div style={{ marginBottom: 13 }}>
                <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#1a2744", display: "block", marginBottom: 5 }}>Date of Publication *</label>
                <input name="author" value={bookForm.author} onChange={handleInputChange} style={{ width: "100%", background: "#f0ede5", border: "2px solid transparent", borderRadius: 10, padding: "9px 11px", fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: "#1a2744", outline: "none" }} />
              </div>

              <div style={{ marginBottom: 13 }}>
                <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#1a2744", display: "block", marginBottom: 5 }}>Edition *</label>
                <input name="isbn" value={bookForm.author} onChange={handleInputChange} style={{ width: "100%", background: "#f0ede5", border: "2px solid transparent", borderRadius: 10, padding: "9px 11px", fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: "#1a2744", outline: "none" }} />
              </div>

              <div style={{ marginBottom: 13 }}>
                <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#1a2744", display: "block", marginBottom: 5 }}>Genre/Category</label>
                <select name="cat" value={bookForm.cat} onChange={handleInputChange} style={{ width: "100%", background: "#f0ede5", border: "2px solid transparent", borderRadius: 10, padding: "9px 11px", fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: "#1a2744", outline: "none" }}>
                  {CATS.slice(1).map(c => <option key={c}>{c}</option>)}
                </select>
              </div>

              <div style={{ marginBottom: 13 }}>
                <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#1a2744", display: "block", marginBottom: 5 }}>Course</label>
                <select name="course" value={bookForm.course} onChange={handleInputChange} style={{ width: "100%", background: "#f0ede5", border: "2px solid transparent", borderRadius: 10, padding: "9px 11px", fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: "#1a2744", outline: "none" }}>
                  {COURSES.slice(1).map(c => <option key={c}>{c}</option>)}
                </select>
              </div>

              <div style={{ marginBottom: 13 }}>
                <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#1a2744", display: "block", marginBottom: 5 }}>Pages</label>
                <input name="pages" type="number" value={bookForm.pages} onChange={handleInputChange} style={{ width: "100%", background: "#f0ede5", border: "2px solid transparent", borderRadius: 10, padding: "9px 11px", fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: "#1a2744", outline: "none" }} />
              </div>

              <div style={{ marginBottom: 13 }}>
                <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#1a2744", display: "block", marginBottom: 5 }}>Copies</label>
                <input name="copies" type="number" value={bookForm.copies} onChange={handleInputChange} style={{ width: "100%", background: "#f0ede5", border: "2px solid transparent", borderRadius: 10, padding: "9px 11px", fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: "#1a2744", outline: "none" }} />
              </div>
              
              <div style={{ gridColumn: "1/-1", marginBottom: 13 }}>
                <label style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "#1a2744", display: "block", marginBottom: 5 }}>Availability</label>
                <div style={{ display: "flex", gap: 10 }}>
                  {[true, false].map(v => (
                    <button key={String(v)} onClick={() => setBookForm((f: any) => ({ ...f, avail: v }))}
                      style={{ flex: 1, padding: "9px", borderRadius: 10, background: bookForm.avail === v ? (v ? "#e6f7ec" : "#fdeaea") : "#f0ede5", color: bookForm.avail === v ? (v ? "#2d7a4f" : "#c94040") : "#8a8ea8", fontWeight: 600, cursor: "pointer", border: "none" }}>
                      {v ? "✓ Available" : "✗ Borrowed"}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ gridColumn: "1/-1", marginBottom: 16 }}>
                <label style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "#1a2744", display: "block", marginBottom: 5 }}>Description</label>
                <textarea name="description" value={bookForm.description} onChange={handleInputChange} style={{ width: "100%", background: "#f0ede5", border: "none", borderRadius: 10, padding: "9px 11px", minHeight: 72, fontFamily: "'DM Sans', sans-serif", outline: "none" }} />
              </div>
            </div>

            <div style={{ display: "flex", gap: 9 }}>
              <Btn onClick={saveBook}>{bookModal.mode === "add" ? "＋ Add Book" : "💾 Save Changes"}</Btn>
              <Btn variant="ghost" onClick={() => setBookModal(null)}>Cancel</Btn>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: VIEW BOOK */}
      {bookModal && bookModal.mode === "view" && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(26,39,68,.5)", backdropFilter: "blur(6px)", zIndex: 90, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "#fff", borderRadius: 22, padding: "26px 28px", maxWidth: 500, width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: "#1a2744" }}>Book Details</div>
              <button onClick={() => setBookModal(null)} style={{ background: "#f0ede5", border: "none", borderRadius: 8, padding: "6px 10px", cursor: "pointer" }}>✕</button>
            </div>
            <div style={{ display: "flex", gap: 20 }}>
              <div style={{ width: 120, height: 160, borderRadius: 10, background: bookModal.book.actualImage ? "none" : "#f0ede5", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", border: "1px solid #e2dfd6", flexShrink: 0 }}>
                {bookModal.book.actualImage ? <img src={bookModal.book.actualImage} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontSize: 40 }}>📖</span>}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#1a2744", lineHeight: 1.2, marginBottom: 4 }}>{bookModal.book.title}</div>
                <div style={{ fontSize: 13.5, color: "#64748b", marginBottom: 12 }}>by {bookModal.book.author}</div>
                <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                  <Badge label={bookModal.book.category || "Unknown"} type="navy" />
                  <Badge label={bookModal.book.course || "All"} type="navy" />
                  <Badge label={bookModal.book.available !== false ? "Available" : "Borrowed"} type={bookModal.book.available !== false ? "green" : "red"} />
                </div>
                <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6 }}><strong>Pages:</strong> {bookModal.book.pages || "N/A"} &nbsp;|&nbsp; <strong>Copies:</strong> {bookModal.book.copies || 1}</div>
                <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, marginTop: 10 }}><strong>Description:</strong> {bookModal.book.description || "No description provided."}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 9, marginTop: 20, justifyContent: "flex-end" }}>
              <Btn variant="ghost" onClick={() => setBookModal(null)}>Close</Btn>
              <Btn onClick={() => { openEdit(bookModal.book); }}>✏️ Edit Book</Btn>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: DELETE CONFIRMATION */}
      {delBook && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(26,39,68,.5)", backdropFilter: "blur(6px)", zIndex: 90, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "#fff", borderRadius: 22, padding: "26px 28px", maxWidth: 400, width: "100%", textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 10 }}>🗑️</div>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: "#1a2744", marginBottom: 10 }}>Delete Book?</div>
            <div style={{ fontSize: 13.5, color: "#64748b", marginBottom: 20 }}>Are you sure you want to remove <strong>{delBook.title}</strong>? This action cannot be undone.</div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <Btn variant="ghost" onClick={() => setDelBook(null)}>Cancel</Btn>
              <Btn variant="red" onClick={deleteBook}>Delete Book</Btn>
            </div>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {toast && (
        <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: toast.type === "err" ? "#c94040" : "#2d7a4f", color: "#fff", padding: "12px 22px", borderRadius: 12, fontSize: 13.5, fontWeight: 500, boxShadow: "0 8px 24px rgba(0,0,0,.2)", zIndex: 200, animation: "fadeUp .3s ease", display: "flex", alignItems: "center", gap: 8 }}>
          {toast.type === "err" ? "⚠️" : "✅"} {toast.msg}
        </div>
      )}
    </div>
  );
}