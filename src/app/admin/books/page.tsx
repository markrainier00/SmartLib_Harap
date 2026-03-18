"use client";

import React, { useState, useRef, memo } from "react";

/* ─── HELPERS & MOCK DATA ───────────────────────────────── */
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
  const [libBooks, setLibBooks] = useState([
    { id: 1, title: "Introduction to Algorithms", author: "Cormen et al.", cat: "Computer Science", course: "BSCS", avail: true, pages: 1292, copies: 3, description: "A comprehensive text on algorithms.", actualImage: null },
    { id: 2, title: "Calculus: Early Transcendentals", author: "James Stewart", cat: "Mathematics", course: "BSMATH", avail: false, pages: 1368, copies: 2, description: "Standard calculus textbook.", actualImage: null },
  ]);

  const [libSearch, setLibSearch] = useState("");
  const [libCat, setLibCat] = useState("All");
  const [libAvail, setLibAvail] = useState("All");
  
  const [bookModal, setBookModal] = useState<any>(null);
  const [bookForm, setBookForm] = useState<any>(EMPTY_BOOK);
  const [delBook, setDelBook] = useState<any>(null);
  const [nextId, setNextId] = useState(3);
  const [toast, setToast] = useState<any>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fireToast = (type: string, msg: string) => { setToast({ type, msg }); setTimeout(() => setToast(null), 3000); };

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
    const ms = b.title.toLowerCase().includes(libSearch.toLowerCase()) || b.author.toLowerCase().includes(libSearch.toLowerCase());
    const mc = libCat === "All" || b.cat === libCat;
    const ma = libAvail === "All" || (libAvail === "Available" ? b.avail : !b.avail);
    return ms && mc && ma;
  });

  const openAdd = () => { setBookForm({ ...EMPTY_BOOK }); setBookModal({ mode: "add" }); };
  const openEdit = (b: any) => { setBookForm({ ...b }); setBookModal({ mode: "edit", book: b }); };
  const openView = (b: any) => { setBookModal({ mode: "view", book: b }); };

  const saveBook = () => {
    if (!bookForm.title.trim() || !bookForm.author.trim()) { fireToast("err", "Title and Author are required"); return; }
    if (bookModal.mode === "add") {
      setLibBooks(prev => [...prev, { ...bookForm, id: nextId, pages: Number(bookForm.pages) || 0, copies: Number(bookForm.copies) || 1 }]);
      setNextId(n => n + 1);
      fireToast("ok", "Book added to library!");
    } else {
      setLibBooks(prev => prev.map(b => b.id === bookModal.book.id ? { ...bookForm, id: b.id, pages: Number(bookForm.pages) || 0, copies: Number(bookForm.copies) || 1 } : b));
      fireToast("ok", "Book updated successfully!");
    }
    setBookModal(null);
  };

  // Optimized Input Change Handler
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
          <div style={{ fontSize: 13, color: "#8a8ea8", marginTop: 2 }}>{libBooks.length} books total</div>
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
            <div><Badge label={b.cat} type="navy" /></div>
            <div style={{ fontSize: 12.5, color: "#64748b" }}>{b.course}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1a2744", textAlign: "center" }}>{b.copies}</div>
            <div style={{ fontSize: 13, color: "#64748b" }}>{b.pages}</div>
            <div><Badge label={b.avail ? "Available" : "Borrowed"} type={b.avail ? "green" : "red"} /></div>
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
        <div style={{ position: "fixed", inset: 0, background: "rgba(26,39,68,.5)", backdropFilter: "blur(6px)", zIndex: 90, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "#fff", borderRadius: 22, padding: "26px 28px", maxWidth: 580, width: "100%", maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: "#1a2744" }}>{bookModal.mode === "add" ? "New Library Book" : "Edit Book"}</div>
              <button onClick={() => setBookModal(null)} style={{ background: "#f0ede5", border: "none", borderRadius: 8, padding: "6px 10px", cursor: "pointer" }}>✕</button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
              {/* IMAGE UPLOAD SECTION */}
              <div style={{ gridColumn: "1/-1", marginBottom: 20 }}>
                <label style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "#1a2744", display: "block", marginBottom: 8 }}>Actual Book Photo</label>
                <div style={{ display: "flex", gap: 15, alignItems: "center" }}>
                  <div style={{ width: 80, height: 110, borderRadius: 10, background: "#f0ede5", border: "2px dashed #e2dfd6", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {bookForm.actualImage ? <img src={bookForm.actualImage} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span>📸</span>}
                  </div>
                  <div style={{ flex: 1 }}>
                    <Btn variant="ghost" onClick={() => fileInputRef.current?.click()} style={{ width: "100%" }}>Choose Photo</Btn>
                    <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
                  </div>
                </div>
              </div>

              {/* Input Fields using name attribute and handleInputChange to prevent typing lag */}
              <div style={{ gridColumn: "1/-1", marginBottom: 13 }}>
                <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#1a2744", display: "block", marginBottom: 5 }}>Title *</label>
                <input name="title" value={bookForm.title} onChange={handleInputChange} style={{ width: "100%", background: "#f0ede5", border: "2px solid transparent", borderRadius: 10, padding: "9px 11px", fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: "#1a2744", outline: "none" }} />
              </div>

              <div style={{ marginBottom: 13 }}>
                <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#1a2744", display: "block", marginBottom: 5 }}>Author *</label>
                <input name="author" value={bookForm.author} onChange={handleInputChange} style={{ width: "100%", background: "#f0ede5", border: "2px solid transparent", borderRadius: 10, padding: "9px 11px", fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: "#1a2744", outline: "none" }} />
              </div>

              <div style={{ marginBottom: 13 }}>
                <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#1a2744", display: "block", marginBottom: 5 }}>Category</label>
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

      {/* VIEW MODAL & DELETE CONFIRMATION remain identical but without ratings logic */}
      {/* (Skipping view and delete code blocks for brevity, same as yours) */}

      {/* TOAST NOTIFICATION */}
      {toast && (
        <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: toast.type === "err" ? "#c94040" : "#2d7a4f", color: "#fff", padding: "12px 22px", borderRadius: 12, fontSize: 13.5, fontWeight: 500, boxShadow: "0 8px 24px rgba(0,0,0,.2)", zIndex: 200, animation: "fadeUp .3s ease", display: "flex", alignItems: "center", gap: 8 }}>
          {toast.type === "err" ? "⚠️" : "✅"} {toast.msg}
        </div>
      )}
    </div>
  );
}