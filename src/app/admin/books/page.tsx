"use client";

import React, { useState } from "react";

/* ─── HELPERS & MOCK DATA ───────────────────────────────── */
const CATS = ["All", "Computer Science", "Mathematics", "Physics", "Chemistry", "Biology", "Engineering", "Medicine", "Economics", "Accounting", "Law"];
const COURSES = ["All", "BSCS", "BSIT", "BSCpE", "BSMATH", "BSBA", "BSAcc", "BSECE", "BSCHE", "BSN", "BSCE", "BSBio", "BSPharma"];
const EMOJIS = ["📘", "📙", "📗", "📕", "📔", "📒"];
const COLORS = [
  { color: "#1e3a5f", spine: "#3d8bef" }, { color: "#3b1f6e", spine: "#7c3aed" },
  { color: "#1a4731", spine: "#4caf6e" }, { color: "#7c2d12", spine: "#ea580c" },
  { color: "#134e4a", spine: "#0d9488" }, { color: "#0c4a6e", spine: "#0284c7" },
];

const EMPTY_BOOK = { title: "", author: "", cat: "Computer Science", course: "BSCS", color: "#1e3a5f", spine: "#3d8bef", avail: true, rating: 4.0, pages: "", emoji: "📘", copies: 1, description: "" };

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
    { id: 1, title: "Introduction to Algorithms", author: "Cormen et al.", cat: "Computer Science", course: "BSCS", color: "#1e3a5f", spine: "#3d8bef", avail: true, rating: 4.8, pages: 1292, emoji: "📘", copies: 3, description: "A comprehensive text on algorithms." },
    { id: 2, title: "Calculus: Early Transcendentals", author: "James Stewart", cat: "Mathematics", course: "BSMATH", color: "#3b1f6e", spine: "#7c3aed", avail: false, rating: 4.5, pages: 1368, emoji: "📙", copies: 2, description: "Standard calculus textbook." },
    { id: 3, title: "Organic Chemistry", author: "Paula Bruice", cat: "Chemistry", course: "BSCHE", color: "#1a4731", spine: "#4caf6e", avail: true, rating: 4.3, pages: 1440, emoji: "📗", copies: 4, description: "In-depth coverage of organic chemistry." },
    { id: 4, title: "Principles of Economics", author: "N. Gregory Mankiw", cat: "Economics", course: "BSBA", color: "#7c2d12", spine: "#ea580c", avail: true, rating: 4.6, pages: 880, emoji: "📕", copies: 2, description: "Leading economics textbook." },
  ]);

  const [libSearch, setLibSearch] = useState("");
  const [libCat, setLibCat] = useState("All");
  const [libAvail, setLibAvail] = useState("All");
  
  const [bookModal, setBookModal] = useState<any>(null);
  const [bookForm, setBookForm] = useState<any>(EMPTY_BOOK);
  const [delBook, setDelBook] = useState<any>(null);
  const [nextId, setNextId] = useState(5);
  const [toast, setToast] = useState<any>(null);

  const fireToast = (type: string, msg: string) => { setToast({ type, msg }); setTimeout(() => setToast(null), 3000); };

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
      setLibBooks(prev => [...prev, { ...bookForm, id: nextId, pages: Number(bookForm.pages) || 0, copies: Number(bookForm.copies) || 1, rating: parseFloat(bookForm.rating) || 4.0 }]);
      setNextId(n => n + 1);
      fireToast("ok", "Book added to library!");
    } else {
      setLibBooks(prev => prev.map(b => b.id === bookModal.book.id ? { ...bookForm, id: b.id, pages: Number(bookForm.pages) || 0, copies: Number(bookForm.copies) || 1, rating: parseFloat(bookForm.rating) || 4.0 } : b));
      fireToast("ok", "Book updated successfully!");
    }
    setBookModal(null);
  };

  const Field = ({ label, val, set, type = "text", opts }: any) => (
    <div style={{ marginBottom: 13 }}>
      <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#1a2744", display: "block", marginBottom: 5 }}>{label}</label>
      {opts ? (
        <select value={val} onChange={e => set(e.target.value)} style={{ width: "100%", background: "#f0ede5", border: "2px solid transparent", borderRadius: 10, padding: "9px 11px", fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: "#1a2744", outline: "none" }}>
          {opts.map((o: any) => <option key={o}>{o}</option>)}
        </select>
      ) : (
        <input type={type} value={val} onChange={e => set(e.target.value)} style={{ width: "100%", background: "#f0ede5", border: "2px solid transparent", borderRadius: 10, padding: "9px 11px", fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: "#1a2744", outline: "none" }} />
      )}
    </div>
  );

  return (
    <div style={{ animation: "fadeUp .3s ease" }}>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        .row-hover:hover { background: #f7f5f0 !important; }
        .chip { border: 2px solid #e2dfd6; border-radius: 50px; padding: 7px 16px; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600; cursor: pointer; background: #fff; color: #8a8ea8; transition: all .18s; }
        .chip:hover { border-color: #1a2744; color: #1a2744; }
        .chip.active { background: #1a2744; color: #fff; border-color: #1a2744; }
        .action-icon { background: #f0ede5; border: 1.5px solid #e2dfd6; border-radius: 8px; padding: 5px 9px; font-size: 13px; cursor: pointer; transition: all .15s; }
        .action-icon:hover { background: #e2dfd6; }
      `}</style>

      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, color: "#1a2744" }}>Library Management</div>
          <div style={{ fontSize: 13, color: "#8a8ea8", marginTop: 2 }}>{libBooks.length} books · {libBooks.filter(b => b.avail).length} available</div>
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

        {filtLib.length === 0 ? (
          <div style={{ padding: 40, textAlign: "center", color: "#8a8ea8" }}>
            <div style={{ fontSize: 36, marginBottom: 10 }}>📭</div>
            No books match your filters
          </div>
        ) : (
          filtLib.map((b, i) => (
            <div key={b.id} className="row-hover" style={{ display: "grid", gridTemplateColumns: "2.4fr 1.6fr 1.2fr 1fr 0.7fr 0.7fr 0.7fr 1.4fr", padding: "12px 20px", borderBottom: i < filtLib.length - 1 ? "1px solid #f2efe8" : "none", alignItems: "center", transition: "background .15s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 11, cursor: "pointer" }} onClick={() => openView(b)}>
                <div style={{ width: 34, height: 46, borderRadius: 5, background: `linear-gradient(150deg,${b.color},${b.spine}88)`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", boxShadow: `2px 2px 8px ${b.color}55` }}>
                  <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: b.spine }} />
                  <span style={{ fontSize: 18, position: "relative" }}>{b.emoji}</span>
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#1a2744", lineHeight: 1.3 }}>{b.title.length > 28 ? b.title.slice(0, 28) + "…" : b.title}</div>
                  <div style={{ fontSize: 10.5, color: "#8a8ea8", marginTop: 2 }}>ID #{b.id}</div>
                </div>
              </div>
              <div style={{ fontSize: 13, color: "#64748b" }}>{b.author.length > 20 ? b.author.slice(0, 20) + "…" : b.author}</div>
              <div><Badge label={b.cat} type="navy" /></div>
              <div style={{ fontSize: 12.5, color: "#64748b" }}>{b.course}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#1a2744", textAlign: "center" }}>{b.copies}</div>
              <div style={{ fontSize: 13, color: "#64748b" }}>{b.pages}</div>
              <div><Badge label={b.avail ? "Available" : "Borrowed"} type={b.avail ? "green" : "red"} /></div>
              <div style={{ display: "flex", gap: 6 }}>
                <button className="action-icon" onClick={() => openView(b)} title="View">👁</button>
                <button className="action-icon" style={{ background: "#e8f1fd", borderColor: "#bdd6fa" }} onClick={() => openEdit(b)} title="Edit">✏️</button>
                <button className="action-icon" style={{ background: "#fdeaea", borderColor: "#f5c5c5", color: "#c94040" }} onClick={() => setDelBook(b)} title="Delete">🗑</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL: ADD / EDIT BOOK */}
      {bookModal && bookModal.mode !== "view" && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(26,39,68,.5)", backdropFilter: "blur(6px)", zIndex: 90, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={e => e.target === e.currentTarget && setBookModal(null)}>
          <div style={{ background: "#fff", borderRadius: 22, padding: "26px 28px", maxWidth: 580, width: "100%", boxShadow: "0 24px 64px rgba(26,39,68,.18)", animation: "fadeUp .25s ease", maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#3d8bef", marginBottom: 5 }}>{bookModal.mode === "add" ? "Add New Book" : "Edit Book"}</div>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: "#1a2744" }}>{bookModal.mode === "add" ? "New Library Book" : bookForm.title || "Edit Details"}</div>
              </div>
              <button onClick={() => setBookModal(null)} style={{ background: "#f0ede5", border: "none", borderRadius: 8, padding: "6px 10px", cursor: "pointer", fontSize: 16, color: "#8a8ea8" }}>✕</button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
              <div style={{ gridColumn: "1/-1" }}><Field label="Title *" val={bookForm.title} set={(v: any) => setBookForm((f: any) => ({ ...f, title: v }))} /></div>
              <Field label="Author *" val={bookForm.author} set={(v: any) => setBookForm((f: any) => ({ ...f, author: v }))} />
              <Field label="Category" val={bookForm.cat} set={(v: any) => setBookForm((f: any) => ({ ...f, cat: v }))} opts={CATS.slice(1)} />
              <Field label="Course" val={bookForm.course} set={(v: any) => setBookForm((f: any) => ({ ...f, course: v }))} opts={COURSES.slice(1)} />
              <Field label="Pages" val={bookForm.pages} set={(v: any) => setBookForm((f: any) => ({ ...f, pages: v }))} type="number" />
              <Field label="Copies" val={bookForm.copies} set={(v: any) => setBookForm((f: any) => ({ ...f, copies: v }))} type="number" />
              <Field label="Rating (0-5)" val={bookForm.rating} set={(v: any) => setBookForm((f: any) => ({ ...f, rating: v }))} type="number" />
              <Field label="Emoji Icon" val={bookForm.emoji} set={(v: any) => setBookForm((f: any) => ({ ...f, emoji: v }))} opts={EMOJIS} />
              
              <div style={{ gridColumn: "1/-1", marginBottom: 13 }}>
                <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#1a2744", display: "block", marginBottom: 5 }}>Availability</label>
                <div style={{ display: "flex", gap: 10 }}>
                  {[true, false].map(v => (
                    <button key={String(v)} onClick={() => setBookForm((f: any) => ({ ...f, avail: v }))}
                      style={{ flex: 1, padding: "9px", borderRadius: 10, border: bookForm.avail === v ? "none" : "2px solid #e2dfd6", background: bookForm.avail === v ? (v ? "#e6f7ec" : "#fdeaea") : "#f0ede5", color: bookForm.avail === v ? (v ? "#2d7a4f" : "#c94040") : "#8a8ea8", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all .18s" }}>
                      {v ? "✓ Available" : "✗ Borrowed / Unavailable"}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ gridColumn: "1/-1", marginBottom: 16 }}>
                <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#1a2744", display: "block", marginBottom: 5 }}>Description</label>
                <textarea value={bookForm.description} onChange={e => setBookForm((f: any) => ({ ...f, description: e.target.value }))} placeholder="Brief description of the book…"
                  style={{ width: "100%", background: "#f0ede5", border: "2px solid transparent", borderRadius: 10, padding: "9px 11px", fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: "#1a2744", outline: "none", resize: "vertical", minHeight: 72 }} />
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
      {bookModal?.mode === "view" && (() => {
        const b = bookModal.book;
        return (
          <div style={{ position: "fixed", inset: 0, background: "rgba(26,39,68,.5)", backdropFilter: "blur(6px)", zIndex: 90, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={e => e.target === e.currentTarget && setBookModal(null)}>
            <div style={{ background: "#fff", borderRadius: 22, padding: "26px 28px", maxWidth: 480, width: "100%", boxShadow: "0 24px 64px rgba(26,39,68,.18)", animation: "fadeUp .25s ease" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#3d8bef" }}>Book Details</div>
                <button onClick={() => setBookModal(null)} style={{ background: "#f0ede5", border: "none", borderRadius: 8, padding: "5px 9px", cursor: "pointer", fontSize: 15, color: "#8a8ea8" }}>✕</button>
              </div>
              <div style={{ display: "flex", gap: 18, marginBottom: 18 }}>
                <div style={{ width: 80, height: 110, borderRadius: 8, background: `linear-gradient(150deg,${b.color},${b.spine}88)`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", boxShadow: `3px 3px 14px ${b.color}66,inset -3px 0 8px rgba(0,0,0,.22)` }}>
                  <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 5, background: b.spine }} />
                  <span style={{ fontSize: 36, position: "relative" }}>{b.emoji}</span>
                </div>
                <div>
                  <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, color: "#1a2744", lineHeight: 1.3, marginBottom: 4 }}>{b.title}</div>
                  <div style={{ fontSize: 13, color: "#8a8ea8", marginBottom: 10 }}>{b.author}</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    <Badge label={b.cat} type="navy" />
                    <Badge label={b.avail ? "Available" : "Borrowed"} type={b.avail ? "green" : "red"} />
                  </div>
                </div>
              </div>
              {[["Course", b.course], ["Pages", b.pages], ["Copies", b.copies], ["Rating", b.rating + "/5"]].map(([k, v], i, arr) => (
                <div key={k as string} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: i < arr.length - 1 ? "1px solid #f2efe8" : "none" }}>
                  <span style={{ fontSize: 13, color: "#64748b" }}>{k}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#1a2744" }}>{v as React.ReactNode}</span>
                </div>
              ))}
              {b.description && <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, marginTop: 12, marginBottom: 18 }}>{b.description}</p>}
              <div style={{ display: "flex", gap: 9, marginTop: 14 }}>
                <Btn onClick={() => { setBookForm({ ...b }); setBookModal({ mode: "edit", book: b }); }}>✏️ Edit</Btn>
                <Btn variant="red" onClick={() => { setDelBook(b); setBookModal(null); }}>🗑 Delete</Btn>
              </div>
            </div>
          </div>
        );
      })()}

      {/* MODAL: DELETE CONFIRMATION */}
      {delBook && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(26,39,68,.5)", backdropFilter: "blur(6px)", zIndex: 90, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={e => e.target === e.currentTarget && setDelBook(null)}>
          <div style={{ background: "#fff", borderRadius: 22, padding: "28px", maxWidth: 400, width: "100%", boxShadow: "0 24px 64px rgba(26,39,68,.18)", animation: "fadeUp .25s ease", textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 10 }}>🗑️</div>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 19, color: "#1a2744", marginBottom: 6 }}>Delete Book?</div>
            <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, marginBottom: 22 }}>
              Permanently remove <strong style={{ color: "#1a2744" }}>{delBook.title}</strong> from the library?
            </p>
            <div style={{ display: "flex", gap: 9, justifyContent: "center" }}>
              <Btn variant="red" onClick={() => { setLibBooks(prev => prev.filter(b => b.id !== delBook.id)); fireToast("ok", "Book deleted."); setDelBook(null); }}>Yes, Delete</Btn>
              <Btn variant="ghost" onClick={() => setDelBook(null)}>Cancel</Btn>
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