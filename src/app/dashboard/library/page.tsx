"use client";

import React, { useState } from "react";

// ── MOCK DATA BASE SA IYONG HTML ──
const BOOKS = [
  { id: 1, title: "Introduction to Algorithms", author: "Cormen et al.", cat: "Computer Science", color: "#1e3a5f", spine: "#3d8bef", avail: true, rating: 4.8, pages: 1292, emoji: "📘" },
  { id: 2, title: "Calculus: Early Transcendentals", author: "James Stewart", cat: "Mathematics", color: "#3b1f6e", spine: "#7c3aed", avail: false, rating: 4.5, pages: 1368, emoji: "📙" },
  { id: 3, title: "Organic Chemistry", author: "Paula Bruice", cat: "Chemistry", color: "#1a4731", spine: "#4caf6e", avail: true, rating: 4.3, pages: 1440, emoji: "📗" },
  { id: 4, title: "Principles of Economics", author: "N. Gregory Mankiw", cat: "Economics", color: "#7c2d12", spine: "#ea580c", avail: true, rating: 4.6, pages: 880, emoji: "📕" },
  { id: 6, title: "Data Structures in Java", author: "Robert Lafore", cat: "Computer Science", color: "#1e1b4b", spine: "#4f46e5", avail: true, rating: 4.4, pages: 780, emoji: "📙" },
];

const CATS = ["All", "Computer Science", "Mathematics", "Chemistry", "Economics", "Medicine", "Engineering"];

export default function LibraryPage() {
  const [activeCat, setActiveCat] = useState("All");
  const [sortBy, setSortBy] = useState("title");
  const [filterAvail, setFilterAvail] = useState("all");
  const [savedBooks, setSavedBooks] = useState<number[]>([]);

  const toggleSave = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setSavedBooks(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  // Filter Logic
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
      {/* ── EKSAKTONG CSS PARA SA PAGE NA ITO ── */}
      <style>{`
        .hero { background: linear-gradient(135deg, #1a2744 0%, #2a3d6e 55%, #1e4a8c 100%); border-radius: 20px; padding: 26px 30px; margin-bottom: 28px; position: relative; overflow: hidden; }
        .hero::before { content: ''; position: absolute; right: -20px; top: -40px; width: 180px; height: 180px; background: radial-gradient(circle, rgba(61,139,239,.3) 0%, transparent 70%); }
        .hero::after  { content: '📚'; position: absolute; right: 28px; top: 10px; font-size: 80px; opacity: .1; transform: rotate(-12deg); }
        .hero-eyebrow { font-size: 11px; font-weight: 600; color: rgba(255,255,255,.5); letter-spacing: .8px; text-transform: uppercase; margin-bottom: 8px; }
        .hero-title { font-family: 'DM Serif Display', serif; font-size: 24px; color: #fff; margin-bottom: 8px; position: relative; z-index: 2; }
        .hero-sub { font-size: 13px; color: rgba(255,255,255,.6); margin-bottom: 20px; max-width: 420px; position: relative; z-index: 2; }
        .hero-actions { display: flex; gap: 10px; flex-wrap: wrap; position: relative; z-index: 2; }
        .hero-btn { border: none; border-radius: 50px; padding: 9px 22px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600; cursor: pointer; transition: all .18s; }
        .hero-btn-white { background: #fff; color: #1a2744; }
        .hero-btn-white:hover { background: #f5f3ee; }
        .hero-btn-ghost { background: rgba(255,255,255,.12); color: #fff; border: 1px solid rgba(255,255,255,.25); }
        .hero-btn-ghost:hover { background: rgba(255,255,255,.2); }

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
      `}</style>

      {/* ── HERO SECTION ── */}
      <div className="hero">
        <div className="hero-eyebrow">Good Morning nandito ka para mag basa</div>
        <div className="hero-title">What will you learn today?</div>
        <div className="hero-sub">Kung ako sayo mag basa ka ng libro BSCS students ka pa naman boss.</div>
        <div className="hero-actions">
          <button className="hero-btn hero-btn-white">Browse All Books</button>
          <button className="hero-btn hero-btn-ghost">My List</button>
        </div>
      </div>

      {/* ── RECOMMENDED SECTION ── */}
      <div style={{ marginBottom: "30px" }}>
        <div className="section-head">
          <div>
            <div className="section-title">Recommended for You</div>
            <div className="section-sub">Based on your BSCS curriculum</div>
          </div>
          <button className="hero-btn hero-btn-white" style={{ border: "2px solid #e2dfd6", padding: "6px 16px", fontSize: "12px" }}>See All →</button>
        </div>
        <div className="rec-scroll">
          {BOOKS.slice(0, 4).map(b => (
            <div key={b.id} className="rec-book">
              <div style={{ position: "relative" }}>
                <div className="bk-cover" style={{ width: 130, height: 175, background: `linear-gradient(150deg, ${b.color}, ${b.spine}88)` }}>
                  <div className="spine" style={{ background: b.spine }}></div>
                  <div className="lines"></div>
                  <span style={{ fontSize: "54px", position: "relative", zIndex: 1 }}>{b.emoji}</span>
                  <div style={{ position: "absolute", bottom: 6, left: 7, right: 7, fontSize: 10, fontWeight: 700, color: "#fff", zIndex: 1, textShadow: "0 1px 3px rgba(0,0,0,.5)" }}>
                    {b.title}
                  </div>
                </div>
                <button className="heart-btn" onClick={(e) => toggleSave(e, b.id)}>
                  {savedBooks.includes(b.id) ? '❤️' : '🤍'}
                </button>
              </div>
              <div className="rb-title">{b.title.length > 24 ? b.title.slice(0, 24) + '…' : b.title}</div>
              <div className="rb-author">{b.author}</div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, alignItems: "center" }}>
                <span style={{ color: "#e8a020", fontSize: 12 }}>★ {b.rating}</span>
                <span className={`badge ${b.avail ? 'badge-green' : 'badge-red'}`}>{b.avail ? 'Free' : 'Taken'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── BROWSE BY CATEGORY ── */}
      <div>
        <div className="section-head" style={{ marginBottom: "12px" }}>
          <div className="section-title">Browse by Category</div>
          <div style={{ display: "flex", gap: "8px" }}>
            <select className="filter-sel" value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="title">A–Z Title</option>
              <option value="author">A–Z Author</option>
              <option value="avail">Available First</option>
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
            <button key={c} className={`chip ${activeCat === c ? 'chip-on' : 'chip-off'}`} onClick={() => setActiveCat(c)}>
              {c}
            </button>
          ))}
        </div>

        <div className="bk-grid">
          {filteredBooks.length > 0 ? filteredBooks.map(b => (
            <div key={b.id} className="bk-card">
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
                <span className={`badge ${b.avail ? 'badge-green' : 'badge-red'}`}>{b.avail ? 'Available' : 'Borrowed'}</span>
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

    </div>
  );
}