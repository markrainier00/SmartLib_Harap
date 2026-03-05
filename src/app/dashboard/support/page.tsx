"use client";

import React, { useState } from "react";

const BOOKS = [
  "Introduction to Algorithms", "Calculus: Early Transcendentals", "Organic Chemistry", 
  "Principles of Economics", "Human Anatomy & Physiology", "Data Structures in Java"
];

export default function SupportPage() {
  const [concernType, setConcernType] = useState("Missing pages");
  const [concernBook, setConcernBook] = useState("");
  const [concernDesc, setConcernDesc] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!concernDesc.trim()) {
      alert("⚠️ Please describe your concern.");
      return;
    }
    alert("✅ Concern submitted! We'll reply to juan@university.edu");
    setConcernDesc("");
    setConcernBook("");
  };

  return (
    <div style={{ animation: "supFadeUp .3s ease both" }}>
      {/* ── NAKA-ISOLATE NA CSS PARA 100% GAYANG-GAYA SA HTML MO ── */}
      <style>{`
        .sup-title { font-family: 'DM Serif Display', serif; font-size: 24px; color: #1a2744; margin-bottom: 4px; }
        .sup-sub { font-size: 13px; color: #8a8ea8; margin-bottom: 24px; }
        
        .sup-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; max-width: 820px; }
        @media (max-width: 700px) { .sup-grid { grid-template-columns: 1fr; } }
        
        .sup-card { background: #ffffff; border-radius: 16px; box-shadow: 0 2px 12px rgba(26,39,68,.08); border: 1px solid #e2dfd6; padding: 22px; }
        
        .sup-field { margin-bottom: 14px; }
        .sup-field label { display: block; font-size: 11px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: #1a2744; margin-bottom: 7px; }
        
        .sup-sel-wrap select { width: 100%; background: #f0ede5; border: 2px solid transparent; border-radius: 11px; padding: 11px 13px; font-family: 'DM Sans', sans-serif; font-size: 13.5px; color: #1a2744; outline: none; cursor: pointer; transition: border-color .2s; appearance: none; background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%238a8ea8' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 13px center; padding-right: 34px; }
        .sup-sel-wrap select:focus { border-color: #2a3d6e; background-color: #fff; }
        
        textarea.sup-inp { width: 100%; background: #f0ede5; border: 2px solid transparent; border-radius: 11px; padding: 11px 13px; font-family: 'DM Sans', sans-serif; font-size: 13.5px; color: #1a2744; outline: none; resize: vertical; min-height: 90px; transition: border-color .2s, background .2s; }
        textarea.sup-inp:focus { border-color: #2a3d6e; background: #fff; }
        
        .sup-btn { border: none; border-radius: 10px; padding: 12px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600; cursor: pointer; transition: all .18s; display: flex; align-items: center; justify-content: center; background: #1a2744; color: #fff; box-shadow: 0 4px 14px rgba(26,39,68,.25); width: 100%; margin-top: 18px; }
        .sup-btn:hover { background: #2a3d6e; transform: translateY(-1px); }

        .sup-info-item { display: flex; gap: 11px; align-items: center; padding: 9px 0; border-bottom: 1px solid #f2efe8; }
        .sup-info-item:last-child { border-bottom: none; }
        .sup-icon { font-size: 18px; }
        .sup-label { font-size: 11px; color: #8a8ea8; }
        .sup-val { font-size: 13px; font-weight: 600; color: #1a2744; }
        
        .sup-faq { margin-bottom: 13px; }
        .sup-faq-q { font-size: 13px; font-weight: 600; color: #1a2744; }
        .sup-faq-a { font-size: 12px; color: #64748b; margin-top: 3px; line-height: 1.5; }

        @keyframes supFadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
      `}</style>

      <div className="sup-title">Support Center</div>
      <div className="sup-sub">Submit concerns or issues about books and services</div>

      <div className="sup-grid">
        {/* FORM COLUMN */}
        <div className="sup-card">
          <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#1a2744", margin: "0 0 4px 0" }}>📋 Submit a Concern</h3>
          <p style={{ fontSize: "12px", color: "#8a8ea8", margin: "0 0 18px 0" }}>Librarian concern support </p>
          
          <form onSubmit={handleSubmit}>
            <div className="sup-field">
              <label>Type of Concern</label>
              <div className="sup-sel-wrap">
                <select value={concernType} onChange={(e) => setConcernType(e.target.value)}>
                  {["Missing pages ngani", "Damaged utak", "Water vendor", "Wrong book daw", "Book not found on self", "Late return ka boss", "Account luma na", "Other"].map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="sup-field">
              <label>Related Book (optional)</label>
              <div className="sup-sel-wrap">
                <select value={concernBook} onChange={(e) => setConcernBook(e.target.value)}>
                  <option value="">Select a book…</option>
                  {BOOKS.map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="sup-field">
              <label>Description</label>
              <textarea 
                className="sup-inp" 
                placeholder="Describe the issue in detail. Include page numbers, location of damage, etc…"
                value={concernDesc}
                onChange={(e) => setConcernDesc(e.target.value)}
              />
            </div>
            
            <button type="submit" className="sup-btn">Submit Concern</button>
          </form>
        </div>

        {/* INFO & FAQ COLUMN */}
        <div>
          <div className="sup-card" style={{ padding: "18px", marginBottom: "14px" }}>
            <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#1a2744", margin: "0 0 12px 0" }}>📬 Contact Information</h4>
            <div className="sup-info-item"><span className="sup-icon">📧</span><div><div className="sup-label">Email</div><div className="sup-val">library@university.edu</div></div></div>
            <div className="sup-info-item"><span className="sup-icon">📞</span><div><div className="sup-label">Phone</div><div className="sup-val">+63 2 8888 1234</div></div></div>
            <div className="sup-info-item"><span className="sup-icon">🕐</span><div><div className="sup-label">Hours</div><div className="sup-val">Mon–Fri 7AM–8PM</div></div></div>
            <div className="sup-info-item" style={{ border: "none", paddingBottom: 0 }}><span className="sup-icon">📍</span><div><div className="sup-label">Location</div><div className="sup-val">Main Building, Ground Floor</div></div></div>
          </div>

          <div className="sup-card" style={{ padding: "18px" }}>
            <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#1a2744", margin: "0 0 12px 0" }}>❓ Common Questions</h4>
            <div className="sup-faq">
              <div className="sup-faq-q">How do I renew a book?</div>
              <div className="sup-faq-a">Go to My List → Borrowed Books and click "Extend".</div>
            </div>
            <div className="sup-faq">
              <div className="sup-faq-q">Can I reserve an unavailable book?</div>
              <div className="sup-faq-a">Yes — click any unavailable book and choose Reserve. You'll be emailed when ready.</div>
            </div>
            <div className="sup-faq" style={{ marginBottom: 0 }}>
              <div className="sup-faq-q">When does my account expire?</div>
              <div className="sup-faq-a">Student accounts are valid for the current academic year.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}