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
    <div style={{ width, height, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", flexShrink: 0, boxShadow: "3px 3px 12px rgba(0,0,0,.18)", background: `linear-gradient(150deg, ${book.color}, ${book.spine}88)` }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: book.spine }}></div>
      <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg,transparent,transparent 16px,rgba(255,255,255,.05) 16px,rgba(255,255,255,.05) 17px)" }}></div>
      <span style={{ position: "relative", zIndex: 1, fontSize: `${fontSize}px` }}>{book.emoji}</span>
    </div>
  );

  return (
    <div style={{ animation: "fadeUp .3s ease both" }}>
      <style>{`
        .ml-title { font-family: 'DM Serif Display', serif; font-size: 24px; color: #1a2744; margin-bottom: 4px; }
        .ml-sub { font-size: 13px; color: #8a8ea8; margin-bottom: 24px; }
        
        .section-head { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
        .section-head h3 { font-size: 15px; font-weight: 700; color: #1a2744; margin: 0; }
        .count-badge { padding: 2px 10px; border-radius: 20px; font-size: 12px; font-weight: 700; }
        
        .list-card { background: #fff; border-radius: 16px; box-shadow: 0 2px 12px rgba(26,39,68,.08); border: 1px solid #e2dfd6; padding: 16px 18px; margin-bottom: 10px; transition: transform .2s; }
        
        .lc-row { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
        .lc-left { display: flex; gap: 14px; }
        .lc-title { font-size: 14px; font-weight: 700; color: #1a2744; margin-bottom: 2px; }
        .lc-author { font-size: 12px; color: #8a8ea8; }
        .lc-due { font-size: 12px; color: #e05c5c; font-weight: 600; margin-top: 7px; display: flex; align-items: center; gap: 5px; }

        .saved-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 14px; }
        .sv-card { background: #fff; border-radius: 14px; overflow: hidden; border: 1px solid #e2dfd6; box-shadow: 0 2px 12px rgba(26,39,68,.08); cursor: pointer; transition: all .22s; }
        .sv-card:hover { transform: translateY(-4px); box-shadow: 0 8px 32px rgba(26,39,68,.12); }
        .heart-btn { background: none; border: none; cursor: pointer; font-size: 16px; padding: 3px; transition: transform .15s; position: absolute; top: 8px; right: 8px; z-index: 10; }
        .heart-btn:hover { transform: scale(1.3); }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
      `}</style>

      <div className="ml-title">My List</div>
      <div className="ml-sub">Monitor your current borrowed items and your wishlist</div>

      {/* ── BORROWED BOOKS ── */}
      <div style={{ marginBottom: "32px" }}>
        <div className="section-head">
          <h3>📖 Borrowed Books</h3>
          <span className="count-badge" style={{ background: "#e8f1fd", color: "#3d8bef" }}>{borrowed.length}</span>
        </div>
        
        {borrowed.map(id => {
          const b = BOOKS.find(x => x.id === id);
          if(!b) return null;
          return (
            <div key={b.id} className="list-card">
              <div className="lc-row">
                <div className="lc-left">
                  {renderCover(b, 66, 88, 24)}
                  <div>
                    <div className="lc-title">{b.title}</div>
                    <div className="lc-author">{b.author}</div>
                    <div className="lc-due">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      Due: March 16, 2026
                    </div>
                  </div>
                </div>
                {/* Tinanggal na yung mahabang text dito! */}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── WISHLIST ── */}
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
                <div style={{ padding: "14px 14px 8px", display: "flex", justifyContent: "center", position: "relative" }}>
                  {renderCover(b, 110, 148, 36)}
                  <button className="heart-btn" onClick={() => setWishlist(wishlist.filter(x => x !== b.id))}>⭐</button>
                </div>
                <div style={{ padding: "0 13px 13px" }}>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#1a2744", lineHeight: 1.3, marginBottom: "3px" }}>
                    {b.title.length > 24 ? b.title.slice(0, 24) + '…' : b.title}
                  </div>
                  <div style={{ fontSize: "11px", color: "#8a8ea8" }}>{b.author}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}