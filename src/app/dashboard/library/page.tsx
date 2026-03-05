"use client";

import React, { useState } from "react";

const BOOKS = [
  { id: 1, title: "Introduction to Algorithms", author: "Cormen et al.", date: "2022", desc: "A comprehensive update of the leading algorithms text, with new material on matchings in bipartite graphs, online algorithms, machine learning, and other topics.", cat: "Computer Science", color: "#1e3a5f", spine: "#3d8bef", avail: true, pages: 1292, emoji: "📘" },
  { id: 2, title: "Calculus: Early Transcendentals", author: "James Stewart", date: "2020", desc: "Widely renowned for its mathematical precision and accuracy, clarity of exposition, and outstanding examples and problem sets.", cat: "Mathematics", color: "#3b1f6e", spine: "#7c3aed", avail: false, pages: 1368, emoji: "📙" },
  { id: 3, title: "Organic Chemistry", author: "Paula Bruice", date: "2019", desc: "Provides a framework for understanding the fundamental principles of organic chemistry, focusing on mechanisms and conceptual understanding.", cat: "Chemistry", color: "#1a4731", spine: "#4caf6e", avail: true, pages: 1440, emoji: "📗" },
  { id: 4, title: "Principles of Economics", author: "N. Gregory Mankiw", date: "2023", desc: "The most widely-used text in economics classrooms worldwide, providing a clear, engaging, and highly accessible introduction to economics.", cat: "Economics", color: "#7c2d12", spine: "#ea580c", avail: true, pages: 880, emoji: "📕" },
  { id: 6, title: "Data Structures in Java", author: "Robert Lafore", date: "2017", desc: "A practical introduction to data structures and algorithms in Java, featuring clear explanations and visual examples.", cat: "Computer Science", color: "#1e1b4b", spine: "#4f46e5", avail: false, pages: 780, emoji: "📙" },
];

const CATS = ["All", "Computer Science", "Mathematics", "Chemistry", "Economics", "Medicine", "Engineering"];

export default function LibraryPage() {
  const [activeCat, setActiveCat] = useState("All");
  const [sortBy, setSortBy] = useState("title");
  const [filterAvail, setFilterAvail] = useState("all");
  const [savedBooks, setSavedBooks] = useState<number[]>([]);
  
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [requestStep, setRequestStep] = useState<"details" | "form">("details");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

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

  const closePanel = () => {
    setSelectedBook(null);
  };

  const handleConfirmRequest = () => {
    if (!pickupDate || !returnDate) {
      alert("⚠️ Please select both pickup and return dates.");
      return;
    }
    alert(`✅ Request submitted! \nPickup: ${pickupDate}\nReturn: ${returnDate}\n\nPlease proceed to the library on your pickup date.`);
    closePanel();
  };

  let filteredBooks = BOOKS.filter(b => {
    const matchCat = activeCat === "All" || b.cat === activeCat;
    const matchAvail = filterAvail === "all" || (filterAvail === "yes" ? b.avail : !b.avail);
    return matchCat && matchAvail;
  });

  if (sortBy === "author") filteredBooks.sort((a, b) => a.author.localeCompare(b.author));
  else if (sortBy === "avail") filteredBooks.sort((a, b) => Number(b.avail) - Number(a.avail));
  else filteredBooks.sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className="library-wrapper">
      <style>{`
        .library-wrapper { display: flex; align-items: flex-start; gap: 24px; width: 100%; max-width: 1500px; margin: 0 auto; }
        .main-content { flex: 1; min-width: 0; transition: all 0.3s ease; }
        
        .hero { background: linear-gradient(135deg, #1a2744 0%, #2a3d6e 55%, #1e4a8c 100%); border-radius: 20px; padding: 32px 36px; margin-bottom: 32px; position: relative; overflow: hidden; box-shadow: 0 10px 30px rgba(26,39,68,.1); }
        .hero::before { content: ''; position: absolute; right: -20px; top: -40px; width: 220px; height: 220px; background: radial-gradient(circle, rgba(61,139,239,.3) 0%, transparent 70%); }
        .hero::after  { content: '📚'; position: absolute; right: 40px; top: 15px; font-size: 90px; opacity: .1; transform: rotate(-12deg); }
        .hero-eyebrow { font-size: 11.5px; font-weight: 700; color: rgba(255,255,255,.6); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px; }
        .hero-title { font-family: 'DM Serif Display', serif; font-size: 28px; color: #fff; margin-bottom: 8px; position: relative; z-index: 2; }
        .hero-sub { font-size: 14px; color: rgba(255,255,255,.7); margin-bottom: 0; max-width: 460px; position: relative; z-index: 2; line-height: 1.5; }
        
        .section-head { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 20px; flex-wrap: wrap; gap: 12px; }
        .section-title { font-family: 'DM Serif Display', serif; font-size: 22px; color: #1a2744; }
        .section-sub { font-size: 13px; color: #8a8ea8; margin-top: 4px; }

        .rec-scroll { display: flex; gap: 20px; overflow-x: auto; padding-bottom: 12px; margin-bottom: 36px; }
        .rec-scroll::-webkit-scrollbar { height: 6px; }
        .rec-scroll::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 3px; }
        
        .bk-cover { border-radius: 8px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; flex-shrink: 0; box-shadow: 4px 4px 15px rgba(0,0,0,.15), inset -3px 0 8px rgba(0,0,0,.2); transition: transform .25s ease; }
        .bk-cover .spine { position: absolute; left: 0; top: 0; bottom: 0; width: 6px; }
        .bk-cover .lines { position: absolute; inset: 0; background: repeating-linear-gradient(0deg,transparent,transparent 16px,rgba(255,255,255,.05) 16px,rgba(255,255,255,.05) 17px); }
        
        .rec-book { flex-shrink: 0; width: 140px; cursor: pointer; }
        .rec-book:hover .bk-cover { transform: translateY(-4px); box-shadow: 6px 8px 20px rgba(0,0,0,.2); }
        .rb-title { font-size: 14px; font-weight: 700; color: #1a2744; line-height: 1.3; margin-top: 12px; }
        .rb-author { font-size: 12px; color: #8a8ea8; margin-top: 3px; }
        
        .star-btn { background: none; border: none; cursor: pointer; font-size: 22px; padding: 4px; transition: transform .2s ease; position: absolute; top: 6px; right: 6px; z-index: 10; text-shadow: 0 2px 4px rgba(0,0,0,0.3); color: #fff; }
        .star-btn:hover { transform: scale(1.25); }

        .chip { border: none; border-radius: 50px; padding: 8px 18px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600; cursor: pointer; transition: all .2s; white-space: nowrap; }
        .chip-on { background: #1a2744; color: #fff; box-shadow: 0 4px 10px rgba(26,39,68,.15); }
        .chip-off { background: #fff; color: #64748b; border: 1.5px solid #e2dfd6; }
        .chip-off:hover { border-color: #1a2744; color: #1a2744; }

        .bk-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 20px; }
        .bk-card { background: #fff; border-radius: 16px; overflow: hidden; border: 1px solid #e2dfd6; box-shadow: 0 4px 14px rgba(26,39,68,.05); cursor: pointer; transition: all .25s ease; display: flex; flex-direction: column; }
        .bk-card:hover { transform: translateY(-5px); box-shadow: 0 12px 30px rgba(26,39,68,.12); border-color: rgba(26,39,68,.2); }
        .bk-card-img { padding: 18px 18px 10px; display: flex; justify-content: center; position: relative; background: #faf9f6; }
        
        .badge { display: inline-flex; align-items: center; padding: 4px 12px; border-radius: 20px; font-size: 11.5px; font-weight: 700; }
        .badge-green { background: #e6f7ec; color: #2d7a4f; }
        .badge-red { background: #fdeaea; color: #c94040; }
        
        .filter-sel { background: #fff; border: 1.5px solid #e2dfd6; border-radius: 10px; color: #1a2744; padding: 8px 14px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; outline: none; cursor: pointer; transition: border 0.2s; }
        .filter-sel:focus { border-color: #1a2744; }

        /* ── INAYOS NA SIDE PANEL (STICKY BOTTOM BUTTONS) ── */
        .side-panel {
          width: 400px;
          flex-shrink: 0;
          background: #ffffff;
          border-radius: 24px;
          border: 1px solid #e2dfd6;
          box-shadow: 0 12px 40px rgba(26,39,68,.08);
          position: sticky;
          top: 0; 
          height: calc(100vh - 120px); 
          display: flex;
          flex-direction: column; /* Para maghiwalay yung content at footer */
          overflow: hidden; /* Tinatago ang lalabas sa corners */
          animation: slideInRight .3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .sp-scroll {
          flex: 1;
          overflow-y: auto; /* Ito lang ang mag-i-scroll kung mahaba ang text */
          padding: 32px 28px 20px;
          position: relative;
        }
        .sp-scroll::-webkit-scrollbar { width: 5px; }
        .sp-scroll::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 3px; }

        /* DITO NAKADIKIT ANG BUTTONS PARA HINDI NA MAG-SCROLL */
        .sp-footer {
          padding: 20px 28px;
          background: #fff;
          border-top: 1px solid #f2efe8;
          flex-shrink: 0;
          z-index: 10;
        }
        
        @keyframes slideInRight { 
          from { opacity: 0; transform: translateX(40px); } 
          to { opacity: 1; transform: none; } 
        }

        .sp-close { position: absolute; top: 20px; right: 20px; background: #f0ede5; border: none; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #8a8ea8; font-size: 14px; transition: background 0.2s; z-index: 20; }
        .sp-close:hover { background: #e2dfd6; color: #1a2744; }

        @media (max-width: 1100px) {
          .side-panel { position: fixed; right: 20px; top: 80px; height: calc(100vh - 100px); z-index: 100; box-shadow: -10px 0 40px rgba(26,39,68,.15); }
        }
      `}</style>

      {/* ── LEFT SIDE: MAIN CONTENT ── */}
      <div className="main-content">
        <div className="hero">
          <div className="hero-eyebrow">Good Morning</div>
          <div className="hero-title">What will you learn today?</div>
          <div className="hero-sub">Explore available books across different categories tailored for BSCS students.</div>
        </div>

        <div>
          <div className="section-head">
            <div>
              <div className="section-title">Curated for You</div>
              <div className="section-sub">Based on your enrolled program</div>
            </div>
          </div>
          <div className="rec-scroll">
            {BOOKS.slice(0, 4).map(b => (
              <div key={b.id} className="rec-book" onClick={() => openBookDetails(b)}>
                <div style={{ position: "relative" }}>
                  <div className="bk-cover" style={{ width: 140, height: 190, background: `linear-gradient(150deg, ${b.color}, ${b.spine}88)` }}>
                    <div className="spine" style={{ background: b.spine }}></div>
                    <div className="lines"></div>
                    <span style={{ fontSize: "60px", position: "relative", zIndex: 1 }}>{b.emoji}</span>
                  </div>
                  <button className="star-btn" onClick={(e) => toggleSave(e, b.id)}>
                    {savedBooks.includes(b.id) ? '⭐' : '☆'}
                  </button>
                </div>
                <div className="rb-title">{b.title.length > 24 ? b.title.slice(0, 24) + '…' : b.title}</div>
                <div className="rb-author">{b.author}</div>
                <div style={{ marginTop: 8 }}>
                  <span className={`badge ${b.avail ? 'badge-green' : 'badge-red'}`}>{b.avail ? 'Available' : 'Unavailable'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="section-head">
            <div className="section-title">Browse by Category</div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <select className="filter-sel" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="title">A–Z Title</option>
                <option value="author">A–Z Author</option>
              </select>
              <select className="filter-sel" value={filterAvail} onChange={e => setFilterAvail(e.target.value)}>
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
                  <div className="bk-cover" style={{ width: 120, height: 165, background: `linear-gradient(150deg, ${b.color}, ${b.spine}88)` }}>
                    <div className="spine" style={{ background: b.spine }}></div>
                    <div className="lines"></div>
                    <span style={{ fontSize: "50px", position: "relative", zIndex: 1 }}>{b.emoji}</span>
                  </div>
                  <button className="star-btn" style={{ top: 10, right: 10 }} onClick={(e) => toggleSave(e, b.id)}>
                    {savedBooks.includes(b.id) ? '⭐' : '☆'}
                  </button>
                </div>
                <div style={{ padding: "12px 16px 16px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#1a2744", lineHeight: 1.4, margin: "0 0 4px 0" }}>
                    {b.title.length > 28 ? b.title.slice(0, 28) + '…' : b.title}
                  </div>
                  <div style={{ fontSize: 12, color: "#8a8ea8", margin: "0 0 12px 0", flex: 1 }}>{b.author}</div>
                  <div>
                    <span className={`badge ${b.avail ? 'badge-green' : 'badge-red'}`}>{b.avail ? 'Available' : 'Unavailable'}</span>
                  </div>
                </div>
              </div>
            )) : (
              <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "60px 0", color: "#8a8ea8" }}>
                <div style={{ fontSize: 42 }}>📭</div>
                <p style={{ marginTop: 12, fontSize: 15 }}>No books match your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── RIGHT SIDE: THE NEW SIDE PANEL (STICKY BUTTONS) ── */}
      {selectedBook && (
        <aside className="side-panel">
          
          {/* Scrollable Content Area */}
          <div className="sp-scroll">
            <button className="sp-close" onClick={closePanel}>✕</button>

            <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px", paddingTop: "10px" }}>
              <div className="bk-cover" style={{ width: 130, height: 180, background: `linear-gradient(150deg, ${selectedBook.color}, ${selectedBook.spine}88)`, boxShadow: "0 10px 30px rgba(0,0,0,.2), inset -3px 0 8px rgba(0,0,0,.2)" }}>
                <div className="spine" style={{ background: selectedBook.spine }}></div>
                <div className="lines"></div>
                <span style={{ fontSize: "55px", position: "relative", zIndex: 1 }}>{selectedBook.emoji}</span>
              </div>
            </div>

            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "22px", color: "#1a2744", marginBottom: "6px", lineHeight: 1.2 }}>{selectedBook.title}</h3>
              <p style={{ fontSize: "14px", color: "#3d8bef", fontWeight: 600, marginBottom: "14px" }}>{selectedBook.author}</p>
              
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center" }}>
                <span className={`badge ${selectedBook.avail ? 'badge-green' : 'badge-red'}`}>{selectedBook.avail ? 'Available' : 'Unavailable'}</span>
                <span className="badge" style={{ background: "#f0ede5", color: "#1a2744" }}>Published: {selectedBook.date}</span>
                <span className="badge" style={{ background: "#e8ecf5", color: "#1a2744" }}>{selectedBook.pages} Pages</span>
              </div>
            </div>

            {requestStep === "details" && (
              <div style={{ background: "#f9f8f5", padding: "18px", borderRadius: "14px", border: "1px solid #e2dfd6" }}>
                <h4 style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "#8a8ea8", marginBottom: "8px" }}>Synopsis / Description</h4>
                <p style={{ fontSize: "13px", color: "#475569", lineHeight: 1.6, margin: 0 }}>
                  {selectedBook.desc}
                </p>
              </div>
            )}

            {requestStep === "form" && (
              <div style={{ background: "#f0f6ff", padding: "20px", borderRadius: "16px", border: "1px solid #c9e0ff", animation: "fadeUp .2s ease" }}>
                <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#1a2744", marginBottom: "14px" }}>📅 Schedule Borrow Request</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "14px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "#8a8ea8", marginBottom: "6px" }}>Pickup Date</label>
                    <input type="date" value={pickupDate} onChange={e => setPickupDate(e.target.value)} style={{ width: "100%", background: "#fff", border: "2px solid #e2dfd6", borderRadius: "10px", padding: "10px 12px", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#1a2744", outline: "none" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "#8a8ea8", marginBottom: "6px" }}>Return Date</label>
                    <input type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)} style={{ width: "100%", background: "#fff", border: "2px solid #e2dfd6", borderRadius: "10px", padding: "10px 12px", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#1a2744", outline: "none" }} />
                  </div>
                </div>
                <div style={{ fontSize: "11px", color: "#64748b", lineHeight: 1.5 }}>
                  <span style={{color: "#e05c5c", fontWeight: 600}}>Note:</span> Unclaimed books after the pickup date will be automatically canceled. Standard duration is max 7 days.
                </div>
              </div>
            )}
          </div>

          {/* Sticky Footer Actions (LAGING NASA BABA) */}
          <div className="sp-footer">
            {requestStep === "details" ? (
              <div style={{ display: "flex", gap: "10px" }}>
                {selectedBook.avail ? (
                  <>
                    <button style={{ flex: 1, padding: "14px 10px", borderRadius: "12px", border: "none", background: "#3d8bef", color: "#fff", fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", boxShadow: "0 4px 14px rgba(61,139,239,.3)", transition: "all 0.2s" }} 
                            onClick={() => setRequestStep("form")}>
                      ✋ Request
                    </button>
                    <button style={{ flex: 1, padding: "14px 10px", borderRadius: "12px", border: "2px solid #e2dfd6", background: savedBooks.includes(selectedBook.id) ? "#1a2744" : "#fff", color: savedBooks.includes(selectedBook.id) ? "#fff" : "#1a2744", fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", transition: "all 0.2s" }} 
                            onClick={() => toggleSave(null, selectedBook.id)}>
                       {savedBooks.includes(selectedBook.id) ? '⭐ Saved' : '☆ Wishlist'}
                    </button>
                  </>
                ) : (
                  <button style={{ width: "100%", padding: "14px", borderRadius: "12px", border: "none", background: "#e89940", color: "#fff", fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", boxShadow: "0 4px 14px rgba(232,153,64,.3)", transition: "all 0.2s" }} 
                          onClick={() => { 
                            alert('You are now in queue! You will receive an email once this book is returned.'); 
                            if (!savedBooks.includes(selectedBook.id)) toggleSave(null, selectedBook.id); 
                            closePanel(); 
                          }}>
                    🔔 Notify When Available
                  </button>
                )}
              </div>
            ) : (
              <div style={{ display: "flex", gap: "10px" }}>
                <button style={{ flex: 1, padding: "14px", borderRadius: "12px", border: "none", background: "#1a2744", color: "#fff", fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", boxShadow: "0 4px 14px rgba(26,39,68,.25)" }} 
                        onClick={handleConfirmRequest}>
                  ✅ Confirm
                </button>
                <button style={{ flex: 1, padding: "14px", borderRadius: "12px", border: "2px solid #e2dfd6", background: "#fff", color: "#1a2744", fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px" }} 
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