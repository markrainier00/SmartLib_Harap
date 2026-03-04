"use client";

import React, { useState } from "react";

// Mock Data base sa HTML mo
const BOOKS = [
  { id: 1, title: "Introduction to Algorithms", author: "Cormen et al.", color: "#1e3a5f", spine: "#3d8bef", emoji: "📘" },
  { id: 2, title: "Calculus: Early Transcendentals", author: "James Stewart", color: "#3b1f6e", spine: "#7c3aed", emoji: "📙" },
  { id: 3, title: "Organic Chemistry", author: "Paula Bruice", color: "#1a4731", spine: "#4caf6e", emoji: "📗" },
  { id: 4, title: "Principles of Economics", author: "N. Gregory Mankiw", color: "#7c2d12", spine: "#ea580c", emoji: "📕" },
  { id: 5, title: "Human Anatomy & Physiology", author: "Marieb & Hoehn", color: "#134e4a", spine: "#0d9488", emoji: "📘" },
  { id: 8, title: "Financial Accounting", author: "Weygandt et al.", color: "#14532d", spine: "#15803d", emoji: "📕" },
];

export default function MyBooksPage() {
  // State para sa mga listahan (simulated data)
  const [borrowed, setBorrowed] = useState([2, 5, 8]); // IDs of borrowed books
  const [reserved, setReserved] = useState([3]); // IDs of reserved books
  const [saved, setSaved] = useState([1, 4]); // IDs of saved books

  // Helper function para sa reusable Book Cover UI
  const renderCover = (book: any, width: number, height: number, fontSize: number) => (
    <div style={{ width, height, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", flexShrink: 0, boxShadow: "3px 3px 12px rgba(0,0,0,.18), inset -3px 0 8px rgba(0,0,0,.22)", background: `linear-gradient(150deg, ${book.color}, ${book.spine}88)` }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: book.spine }}></div>
      <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg,transparent,transparent 16px,rgba(255,255,255,.05) 16px,rgba(255,255,255,.05) 17px)" }}></div>
      <span style={{ position: "relative", zIndex: 1, fontSize: `${fontSize}px` }}>{book.emoji}</span>
      {height > 100 && (
        <div style={{ position: "absolute", bottom: 6, left: 7, right: 7, fontSize: 8, fontWeight: 700, color: "#fff", lineHeight: 1.2, textShadow: "0 1px 3px rgba(0,0,0,.5)", zIndex: 1, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {book.title}
        </div>
      )}
    </div>
  );

  return (
    <div style={{ animation: "fadeUp .3s ease both" }}>
      {/* ── CSS ISOLATION PARA EKSATONG DESIGN MO ── */}
      <style>{`
        .ml-title { font-family: 'DM Serif Display', serif; font-size: 24px; color: #1a2744; margin-bottom: 4px; }
        .ml-sub { font-size: 13px; color: #8a8ea8; margin-bottom: 24px; }
        
        .section-head { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
        .section-head h3 { font-size: 15px; font-weight: 700; color: #1a2744; margin: 0; }
        .count-badge { padding: 2px 10px; border-radius: 20px; font-size: 12px; font-weight: 700; }
        
        .list-card { background: #fff; border-radius: 16px; box-shadow: 0 2px 12px rgba(26,39,68,.08); border: 1px solid #e2dfd6; padding: 16px 18px; margin-bottom: 10px; transition: transform .2s; }
        .list-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(26,39,68,.12); }
        
        .lc-row { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; }
        .lc-left { display: flex; gap: 14px; }
        .lc-title { font-size: 14px; font-weight: 700; color: #1a2744; margin-bottom: 2px; }
        .lc-author { font-size: 12px; color: #8a8ea8; }
        .lc-due { font-size: 12px; color: #e05c5c; font-weight: 600; margin-top: 7px; display: flex; align-items: center; gap: 5px; }
        
        .lc-actions { display: flex; gap: 7px; flex-wrap: wrap; }
        .ml-btn { border: none; border-radius: 10px; padding: 6px 13px; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600; cursor: pointer; transition: all .18s; display: inline-flex; align-items: center; gap: 6px; }
        .ml-btn-ghost { background: #f0ede5; color: #1a2744; border: 2px solid #e2dfd6; }
        .ml-btn-ghost:hover { background: #ece9e1; border-color: #d1cdb8; }
        .ml-btn-red { background: #fdeaea; color: #e05c5c; border: 2px solid #f5c5c5; }
        .ml-btn-red:hover { background: #fad0d0; }

        .res-card { background: #f0f7ff; border: 1.5px solid #bae0fd; border-radius: 14px; padding: 16px 18px; margin-bottom: 10px; display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
        .res-alert { font-size: 12px; color: #3d8bef; margin-top: 7px; font-weight: 500; }
        
        .saved-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 14px; }
        .sv-card { background: #fff; border-radius: 14px; overflow: hidden; border: 1px solid #e2dfd6; box-shadow: 0 2px 12px rgba(26,39,68,.08); cursor: pointer; transition: all .22s; }
        .sv-card:hover { transform: translateY(-4px); box-shadow: 0 8px 32px rgba(26,39,68,.12); }
        .heart-btn { background: none; border: none; cursor: pointer; font-size: 16px; padding: 3px; transition: transform .15s; position: absolute; top: 8px; right: 8px; z-index: 10; }
        .heart-btn:hover { transform: scale(1.3); }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
      `}</style>

      <div className="ml-title">My List</div>
      <div className="ml-sub">Manage your borrowed, reserved, and saved books</div>

      {/* ── BORROWED BOOKS ── */}
      <div style={{ marginBottom: "28px" }}>
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
                <div className="lc-actions">
                  <button className="ml-btn ml-btn-ghost" onClick={() => alert(`Extension requested for ${b.title}`)}>🗓 Extend</button>
                  <button className="ml-btn ml-btn-ghost" onClick={() => alert(`Concern reported for ${b.title}`)}>💬 Report</button>
                  <button className="ml-btn ml-btn-red" onClick={() => setBorrowed(borrowed.filter(x => x !== b.id))}>Return</button>
                </div>
              </div>
            </div>
          );
        })}
        {borrowed.length === 0 && <div className="list-card" style={{ textAlign: "center", color: "#8a8ea8" }}>No borrowed books</div>}
      </div>

      {/* ── RESERVED BOOKS ── */}
      <div style={{ marginBottom: "28px" }}>
        <div className="section-head">
          <h3>🔖 Reserved Books</h3>
          <span className="count-badge" style={{ background: "#e8f1fd", color: "#3d8bef" }}>{reserved.length}</span>
        </div>

        {reserved.map(id => {
          const b = BOOKS.find(x => x.id === id);
          if(!b) return null;
          return (
            <div key={b.id} className="res-card">
              <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                {renderCover(b, 56, 76, 20)}
                <div>
                  <div className="lc-title">{b.title}</div>
                  <div className="lc-author">{b.author}</div>
                  <div className="res-alert">🔔 Email alert when available for pickup</div>
                </div>
              </div>
              <span style={{ background: "#e8f1fd", color: "#3d8bef", padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 600 }}>
                Reserved
              </span>
            </div>
          );
        })}
        {reserved.length === 0 && <div className="list-card" style={{ textAlign: "center", color: "#8a8ea8" }}>No reserved books</div>}
      </div>

      {/* ── SAVED BOOKS ── */}
      <div>
        <div className="section-head">
          <h3>❤️ Saved Books</h3>
          <span className="count-badge" style={{ background: "#fdeaea", color: "#e05c5c" }}>{saved.length}</span>
        </div>

        <div className="saved-grid">
          {saved.map(id => {
            const b = BOOKS.find(x => x.id === id);
            if(!b) return null;
            return (
              <div key={b.id} className="sv-card">
                <div style={{ padding: "14px 14px 8px", display: "flex", justifyContent: "center", position: "relative" }}>
                  {renderCover(b, 110, 148, 36)}
                  <button className="heart-btn" onClick={() => setSaved(saved.filter(x => x !== b.id))}>❤️</button>
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
        {saved.length === 0 && <div className="list-card" style={{ textAlign: "center", color: "#8a8ea8" }}>No saved books — tap ❤️ to save books you like</div>}
      </div>
      
    </div>
  );
}