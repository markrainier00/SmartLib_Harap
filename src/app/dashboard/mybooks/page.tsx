"use client";

import React, { useState } from "react";

const BOOKS = [
  { id: 1, title: "Introduction to Algorithms", author: "Cormen et al.", color: "#1e3a5f", spine: "#3d8bef", emoji: "📘" },
  { id: 2, title: "Calculus: Early Transcendentals", author: "James Stewart", color: "#3b1f6e", spine: "#7c3aed", emoji: "📙" },
  { id: 3, title: "Organic Chemistry", author: "Paula Bruice", color: "#1a4731", spine: "#4caf6e", emoji: "📗" },
  { id: 4, title: "Principles of Economics", author: "N. Gregory Mankiw", color: "#7c2d12", spine: "#ea580c", emoji: "📕" },
  { id: 5, title: "Human Anatomy & Physiology", author: "Marieb & Hoehn", color: "#134e4a", spine: "#0d9488", emoji: "📘" },
];

export default function MyBooksPage() {
  const [borrowed] = useState([2, 5]); 
  const [wishlist, setWishlist] = useState([1, 3]); 

  const renderCover = (book: any, width: number, height: number, fontSize: number) => (
    <div style={{ width, height, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", flexShrink: 0, boxShadow: "4px 4px 15px rgba(0,0,0,.15), inset -3px 0 8px rgba(0,0,0,.2)", background: `linear-gradient(150deg, ${book.color}, ${book.spine}88)` }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 5, background: book.spine }}></div>
      <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg,transparent,transparent 16px,rgba(255,255,255,.05) 16px,rgba(255,255,255,.05) 17px)" }}></div>
      <span style={{ position: "relative", zIndex: 1, fontSize: `${fontSize}px` }}>{book.emoji}</span>
    </div>
  );

  return (
    <div className="page-mylist" style={{ animation: "fadeUp .3s ease both" }}>
      <style>{`
        /* INAYOS ANG MAX-WIDTH AT MARGIN PARA PANTAY SA DISCOVER PAGE */
        .page-mylist { width: 100%; max-width: 1400px; margin: 0 auto; }
        
        .ml-title { font-family: 'DM Serif Display', serif; font-size: 28px; color: #1a2744; margin-bottom: 6px; }
        .ml-sub { font-size: 14px; color: #8a8ea8; margin-bottom: 28px; }
        
        .section-head { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
        .section-head h3 { font-size: 18px; font-weight: 700; color: #1a2744; margin: 0; }
        .count-badge { padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; }
        
        /* GINAWANG GRID ANG BORROWED BOOKS PARA HINDI HUMABA NANG SOBRA */
        .borrowed-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 16px; }
        
        .list-card { background: #fff; border-radius: 16px; box-shadow: 0 4px 14px rgba(26,39,68,.05); border: 1px solid #e2dfd6; padding: 18px; transition: transform .25s ease; display: flex; align-items: center; }
        .list-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(26,39,68,.1); }
        
        .lc-left { display: flex; gap: 16px; width: 100%; align-items: center; }
        .lc-title { font-size: 15px; font-weight: 700; color: #1a2744; margin-bottom: 4px; line-height: 1.3; }
        .lc-author { font-size: 13px; color: #8a8ea8; }
        .lc-due { font-size: 12.5px; color: #e05c5c; font-weight: 600; margin-top: 10px; display: flex; align-items: center; gap: 6px; background: #fdeaea; padding: 4px 10px; border-radius: 8px; display: inline-flex; }

        .saved-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 20px; }
        .sv-card { background: #fff; border-radius: 16px; overflow: hidden; border: 1px solid #e2dfd6; box-shadow: 0 4px 14px rgba(26,39,68,.05); cursor: pointer; transition: all .25s ease; display: flex; flex-direction: column; }
        .sv-card:hover { transform: translateY(-5px); box-shadow: 0 12px 30px rgba(26,39,68,.12); border-color: rgba(26,39,68,.2); }
        .sv-card-img { padding: 18px 18px 10px; display: flex; justify-content: center; position: relative; background: #faf9f6; }
        
        /* UNIFORM STAR BUTTON PARA SA WISHLIST */
        .star-btn { background: none; border: none; cursor: pointer; font-size: 22px; padding: 4px; transition: transform .2s ease; position: absolute; top: 8px; right: 8px; z-index: 10; text-shadow: 0 2px 4px rgba(0,0,0,0.3); color: #fff; }
        .star-btn:hover { transform: scale(1.25); }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
      `}</style>

      <div className="ml-title">My List</div>
      <div className="ml-sub">Monitor your current borrowed items and your wishlist</div>

      {/* ── BORROWED BOOKS (NAKA-GRID NA NGAYON) ── */}
      <div style={{ marginBottom: "36px" }}>
        <div className="section-head">
          <h3>📖 Borrowed Books</h3>
          <span className="count-badge" style={{ background: "#e8f1fd", color: "#3d8bef" }}>{borrowed.length}</span>
        </div>
        
        <div className="borrowed-grid">
          {borrowed.map(id => {
            const b = BOOKS.find(x => x.id === id);
            if(!b) return null;
            return (
              <div key={b.id} className="list-card">
                <div className="lc-left">
                  {renderCover(b, 75, 100, 28)}
                  <div style={{ flex: 1 }}>
                    <div className="lc-title">{b.title}</div>
                    <div className="lc-author">{b.author}</div>
                    <div className="lc-due">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      Due: March 16, 2026
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── WISHLIST (PANTAY SA GRID NG DISCOVER PAGE) ── */}
      <div>
        <div className="section-head">
          <h3>⭐ My Wishlist</h3>
          <span className="count-badge" style={{ background: "#fef5e6", color: "#a06010" }}>{wishlist.length}</span>
        </div>

        <div className="saved-grid">
          {wishlist.map(id => {
            const b = BOOKS.find(x => x.id === id);
            if(!b) return null;
            return (
              <div key={b.id} className="sv-card">
                <div className="sv-card-img">
                  {renderCover(b, 120, 165, 50)}
                  <button className="star-btn" onClick={() => setWishlist(wishlist.filter(x => x !== b.id))}>⭐</button>
                </div>
                <div style={{ padding: "12px 16px 16px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#1a2744", lineHeight: 1.4, marginBottom: "4px" }}>
                    {b.title.length > 28 ? b.title.slice(0, 28) + '…' : b.title}
                  </div>
                  <div style={{ fontSize: "12px", color: "#8a8ea8" }}>{b.author}</div>
                </div>
              </div>
            );
          })}
        </div>
        {wishlist.length === 0 && <div style={{ color: "#8a8ea8", padding: "20px 0" }}>Your wishlist is empty.</div>}
      </div>
      
    </div>
  );
}