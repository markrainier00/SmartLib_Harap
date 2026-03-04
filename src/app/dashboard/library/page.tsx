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
  
  // States para sa Modal at Form
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [requestStep, setRequestStep] = useState<"details" | "form">("details");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const toggleSave = (e: React.MouseEvent | null, id: number) => {
    if (e) e.stopPropagation();
    setSavedBooks(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const closeModal = () => {
    setSelectedBook(null);
    setRequestStep("details");
    setPickupDate("");
    setReturnDate("");
  };

  const handleConfirmRequest = () => {
    if (!pickupDate || !returnDate) {
      alert("⚠️ Please select both pickup and return dates.");
      return;
    }
    alert(`✅ Request submitted! \nPickup: ${pickupDate}\nReturn: ${returnDate}\n\nPlease proceed to the library on your pickup date.`);
    closeModal();
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
    <div className="page-discover">
      <style>{`
        .hero { background: linear-gradient(135deg, #1a2744 0%, #2a3d6e 55%, #1e4a8c 100%); border-radius: 20px; padding: 26px 30px; margin-bottom: 28px; position: relative; overflow: hidden; }
        .hero::before { content: ''; position: absolute; right: -20px; top: -40px; width: 180px; height: 180px; background: radial-gradient(circle, rgba(61,139,239,.3) 0%, transparent 70%); }
        .hero::after  { content: '📚'; position: absolute; right: 28px; top: 10px; font-size: 80px; opacity: .1; transform: rotate(-12deg); }
        .hero-eyebrow { font-size: 11px; font-weight: 600; color: rgba(255,255,255,.5); letter-spacing: .8px; text-transform: uppercase; margin-bottom: 8px; }
        .hero-title { font-family: 'DM Serif Display', serif; font-size: 24px; color: #fff; margin-bottom: 8px; position: relative; z-index: 2; }
        .hero-sub { font-size: 13px; color: rgba(255,255,255,.6); margin-bottom: 20px; max-width: 420px; position: relative; z-index: 2; }
        
        .section-head { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 16px; }
        .section-title { font-family: 'DM Serif Display', serif; font-size: 20px; color: #1a2744; }
        .section-sub { font-size: 12px; color: #8a8ea8; margin-top: 2px; }

        .rec-scroll { display: flex; gap: 16px; overflow-x: auto; padding-bottom: 8px; }
        .rec-scroll::-webkit-scrollbar { height: 4px; }
        .rec-scroll::-webkit-scrollbar-thumb { background: #e2dfd6; border-radius: 2px; }
        
        .bk-cover { border-radius: 7px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; flex-shrink: 0; box-shadow: 3px 3px 12px rgba(0,0,0,.18), inset -3px 0 8px rgba(0,0,0,.22); transition: transform .2s; }
        .bk-cover .spine { position: absolute; left: 0; top: 0; bottom: 0; width: 5px; }
        .bk-cover .lines { position: absolute; inset: 0; background: repeating-linear-gradient(0deg,transparent,transparent 16px,rgba(255,255,255,.05) 16px,rgba(255,255,255,.05) 17px); }
        
        .rec-book { flex-shrink: 0; width: 130px; cursor: pointer; }
        .rec-book:hover .bk-cover { transform: translateY(-3px); }
        .rb-title { font-size: 13px; font-weight: 700; color: #1a2744; line-height: 1.3; margin-top: 10px; }
        .rb-author { font-size: 11px; color: #8a8ea8; margin-top: 2px; }
        
        .heart-btn { background: none; border: none; cursor: pointer; font-size: 16px; padding: 3px; transition: transform .15s; position: absolute; top: 6px; right: 6px; z-index: 10; }
        .heart-btn:hover { transform: scale(1.3); }

        .chip { border: none; border-radius: 50px; padding: 6px 16px; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600; cursor: pointer; transition: all .18s; white-space: nowrap; }
        .chip-on { background: #1a2744; color: #fff; }
        .chip-off { background: #fff; color: #8a8ea8; border: 2px solid #e2dfd6; }
        .chip-off:hover { border-color: #1a2744; color: #1a2744; }

        .bk-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(148px, 1fr)); gap: 14px; }
        .bk-card { background: #fff; border-radius: 14px; overflow: hidden; border: 1px solid #e2dfd6; box-shadow: 0 2px 12px rgba(26,39,68,.08); cursor: pointer; transition: all .22s; }
        .bk-card:hover { transform: translateY(-4px); box-shadow: 0 8px 32px rgba(26,39,68,.12); border-color: rgba(26,39,68,.15); }
        .bk-card-img { padding: 14px 14px 8px; display: flex; justify-content: center; position: relative; }
        
        .badge { display: inline-flex; align-items: center; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; }
        .badge-green { background: #e6f7ec; color: #2d7a4f; }
        .badge-red { background: #fdeaea; color: #c94040; }
        
        .filter-sel { background: #fff; border: 2px solid #e2dfd6; border-radius: 10px; color: #1a2744; padding: 7px 12px; font-family: 'DM Sans', sans-serif; font-size: 12.5px; outline: none; cursor: pointer; }
        
        @keyframes modalFadeUp { from { opacity: 0; transform: translateY(20px) scale(0.95); } to { opacity: 1; transform: none; } }
      `}</style>

      <div className="hero">
        <div className="hero-eyebrow">Good Morning</div>
        <div className="hero-title">What will you learn today?</div>
        <div className="hero-sub">Explore available books across different categories tailored for BSCS students.</div>
      </div>

      <div style={{ marginBottom: "30px" }}>
        <div className="section-head">
          <div>
            <div className="section-title">Curated for You</div>
            <div className="section-sub">Based on your enrolled program</div>
          </div>
        </div>
        <div className="rec-scroll">
          {BOOKS.slice(0, 4).map(b => (
            <div key={b.id} className="rec-book" onClick={() => setSelectedBook(b)}>
              <div style={{ position: "relative" }}>
                <div className="bk-cover" style={{ width: 130, height: 175, background: `linear-gradient(150deg, ${b.color}, ${b.spine}88)` }}>
                  <div className="spine" style={{ background: b.spine }}></div>
                  <div className="lines"></div>
                  <span style={{ fontSize: "54px", position: "relative", zIndex: 1 }}>{b.emoji}</span>
                </div>
                <button className="heart-btn" onClick={(e) => toggleSave(e, b.id)}>
                  {savedBooks.includes(b.id) ? '❤️' : '🤍'}
                </button>
              </div>
              <div className="rb-title">{b.title.length > 24 ? b.title.slice(0, 24) + '…' : b.title}</div>
              <div className="rb-author">{b.author}</div>
              <div style={{ marginTop: 6 }}>
                <span className={`badge ${b.avail ? 'badge-green' : 'badge-red'}`}>{b.avail ? 'Available' : 'Unavailable'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="section-head" style={{ marginBottom: "12px" }}>
          <div className="section-title">Browse by Category</div>
          <div style={{ display: "flex", gap: "8px" }}>
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

        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
          {CATS.map(c => (
            <button key={c} className={`chip ${activeCat === c ? 'chip-on' : 'chip-off'}`} onClick={() => setActiveCat(c)}>{c}</button>
          ))}
        </div>

        <div className="bk-grid">
          {filteredBooks.length > 0 ? filteredBooks.map(b => (
            <div key={b.id} className="bk-card" onClick={() => setSelectedBook(b)}>
              <div className="bk-card-img">
                <div className="bk-cover" style={{ width: 110, height: 148, background: `linear-gradient(150deg, ${b.color}, ${b.spine}88)` }}>
                  <div className="spine" style={{ background: b.spine }}></div>
                  <div className="lines"></div>
                  <span style={{ fontSize: "46px", position: "relative", zIndex: 1 }}>{b.emoji}</span>
                </div>
                <button className="heart-btn" style={{ top: 8, right: 8 }} onClick={(e) => toggleSave(e, b.id)}>
                  {savedBooks.includes(b.id) ? '❤️' : '🤍'}
                </button>
              </div>
              <div style={{ padding: "0 13px 13px" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1a2744", lineHeight: 1.3, marginBottom: 3 }}>
                  {b.title.length > 28 ? b.title.slice(0, 28) + '…' : b.title}
                </div>
                <div style={{ fontSize: 11, color: "#8a8ea8", marginBottom: 8 }}>{b.author}</div>
                <span className={`badge ${b.avail ? 'badge-green' : 'badge-red'}`}>{b.avail ? 'Available' : 'Unavailable'}</span>
              </div>
            </div>
          )) : (
            <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "48px 0", color: "#8a8ea8" }}>
              <div style={{ fontSize: 36 }}>📭</div>
              <p style={{ marginTop: 10 }}>No books match your filters</p>
            </div>
          )}
        </div>
      </div>

      {/* ── ENHANCED MODAL WITH DATE PICKER FORM ── */}
      {selectedBook && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(26,39,68,.6)", backdropFilter: "blur(4px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }} onClick={closeModal}>
          <div style={{ background: "#fff", borderRadius: "24px", padding: "32px", maxWidth: "520px", width: "100%", position: "relative", boxShadow: "0 24px 64px rgba(26,39,68,.18)", animation: "modalFadeUp .25s ease both" }} onClick={e => e.stopPropagation()}>
            <button onClick={closeModal} style={{ position: "absolute", top: "24px", right: "24px", background: "#f0ede5", border: "none", borderRadius: "50%", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#8a8ea8", fontSize: "16px", transition: "background 0.2s" }}>✕</button>
            
            <div style={{ display: "flex", gap: "24px", marginBottom: "24px", alignItems: "flex-start" }}>
              <div className="bk-cover" style={{ width: 120, height: 160, background: `linear-gradient(150deg, ${selectedBook.color}, ${selectedBook.spine}88)` }}>
                <div className="spine" style={{ background: selectedBook.spine }}></div>
                <div className="lines"></div>
                <span style={{ fontSize: "50px", position: "relative", zIndex: 1 }}>{selectedBook.emoji}</span>
              </div>
              
              <div style={{ flex: 1, marginTop: "4px" }}>
                <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "22px", color: "#1a2744", marginBottom: "6px", lineHeight: 1.2 }}>{selectedBook.title}</h3>
                <p style={{ fontSize: "14px", color: "#3d8bef", fontWeight: 600, marginBottom: "12px" }}>{selectedBook.author}</p>
                
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <span className={`badge ${selectedBook.avail ? 'badge-green' : 'badge-red'}`}>{selectedBook.avail ? 'Available' : 'Unavailable'}</span>
                  <span className="badge" style={{ background: "#f0ede5", color: "#1a2744" }}>Published: {selectedBook.date}</span>
                  <span className="badge" style={{ background: "#e8ecf5", color: "#1a2744" }}>{selectedBook.pages} Pages</span>
                </div>
              </div>
            </div>

            {/* STEP 1: Ipakita ang Synopsis kung details view */}
            {requestStep === "details" && (
              <div style={{ marginBottom: "28px", background: "#f9f8f5", padding: "16px", borderRadius: "12px", border: "1px solid #e2dfd6", animation: "modalFadeUp .2s ease" }}>
                <h4 style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "#8a8ea8", marginBottom: "8px" }}>Synopsis / Description</h4>
                <p style={{ fontSize: "13.5px", color: "#475569", lineHeight: 1.6, margin: 0 }}>
                  {selectedBook.desc}
                </p>
              </div>
            )}

            {/* STEP 2: Ipakita ang Date Form kung form view */}
            {requestStep === "form" && (
              <div style={{ background: "#f0f6ff", padding: "20px", borderRadius: "16px", border: "1px solid #c9e0ff", marginBottom: "24px", animation: "modalFadeUp .2s ease" }}>
                <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#1a2744", marginBottom: "14px" }}>📅 Schedule your Borrow Request</h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "14px" }}>
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
                  <span style={{color: "#e05c5c", fontWeight: 600}}>Note:</span> Unclaimed books after the pickup date will be automatically canceled. Standard borrow duration is max 7 days.
                </div>
              </div>
            )}

            {/* BUTTONS LOGIC */}
            <div style={{ display: "flex", gap: "10px" }}>
              {requestStep === "details" ? (
                <>
                  {selectedBook.avail ? (
                    <button style={{ flex: 1, padding: "14px", borderRadius: "12px", border: "none", background: "#3d8bef", color: "#fff", fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", boxShadow: "0 4px 14px rgba(61,139,239,.3)", transition: "all 0.2s" }} 
                            onClick={() => setRequestStep("form")}>
                      ✋ Request to Borrow
                    </button>
                  ) : (
                    <button style={{ flex: 1, padding: "14px", borderRadius: "12px", border: "none", background: "#e89940", color: "#fff", fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", boxShadow: "0 4px 14px rgba(232,153,64,.3)", transition: "all 0.2s" }} 
                            onClick={() => { alert('You are now in queue! You will receive an email once this book is returned.'); closeModal(); }}>
                      🔔 Notify When Available
                    </button>
                  )}
                  <button style={{ padding: "14px 20px", borderRadius: "12px", border: "2px solid #e2dfd6", background: savedBooks.includes(selectedBook.id) ? "#1a2744" : "#f0ede5", color: savedBooks.includes(selectedBook.id) ? "#fff" : "#1a2744", fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", transition: "all 0.2s" }} 
                          onClick={() => toggleSave(null, selectedBook.id)}>
                     {savedBooks.includes(selectedBook.id) ? '❤️ Saved' : '🤍 Wishlist'}
                  </button>
                </>
              ) : (
                <>
                  <button style={{ flex: 1, padding: "14px", borderRadius: "12px", border: "none", background: "#1a2744", color: "#fff", fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", boxShadow: "0 4px 14px rgba(26,39,68,.25)" }} 
                          onClick={handleConfirmRequest}>
                    ✅ Confirm Request
                  </button>
                  <button style={{ padding: "14px 20px", borderRadius: "12px", border: "2px solid #e2dfd6", background: "#fff", color: "#1a2744", fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "14px" }} 
                          onClick={() => setRequestStep("details")}>
                    Cancel
                  </button>
                </>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}