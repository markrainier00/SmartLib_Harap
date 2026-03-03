"use client";

import React from "react";

const books = [
  { id: 1, title: "Introduction to Algorithms", author: "Cormen et al.", category: "Computer Science", available: true, cover: "#1a1a2e", accent: "#e94560", course: ["BSCS", "BSIT", "BSCpE"] },
  { id: 2, title: "Calculus: Early Transcendentals", author: "James Stewart", category: "Mathematics", available: false, cover: "#16213e", accent: "#4a90d9", course: ["BSMATH", "BSCS", "BSEd"] },
  { id: 3, title: "Organic Chemistry", author: "Paula Bruice", category: "Chemistry", available: true, cover: "#1b262c", accent: "#bbe1fa", course: ["BSCHE", "BSPharma", "BSBio"] },
  { id: 4, title: "Principles of Economics", author: "N. Gregory Mankiw", category: "Economics", available: true, cover: "#2c1810", accent: "#d4a574", course: ["BSECON", "BSBA", "BSAcc"] },
  { id: 5, title: "Human Anatomy & Physiology", author: "Marieb & Hoehn", category: "Medicine", available: false, cover: "#1a2a1a", accent: "#4caf50", course: ["BSN", "BSMT", "BSPharma"] },
  { id: 6, title: "Data Structures in Java", author: "Robert Lafore", category: "Computer Science", available: true, cover: "#2a1a2e", accent: "#9c27b0", course: ["BSCS", "BSIT"] },
  { id: 7, title: "Engineering Mechanics", author: "R.C. Hibbeler", category: "Engineering", available: true, cover: "#1a1f2e", accent: "#ff6b35", course: ["BSCE", "BSMechE", "BSElecE"] },
  { id: 8, title: "Financial Accounting", author: "Weygandt et al.", category: "Accounting", available: false, cover: "#1e2a1e", accent: "#66bb6a", course: ["BSAcc", "BSBA"] },
];

export default function MyBooksPage() {
  // Static data para may makita tayo agad sa screen
  const borrowedIds = [2, 5, 8];
  const reservedIds = [3];

  const borrowedBooks = books.filter(b => borrowedIds.includes(b.id));
  const reservedBooks = books.filter(b => reservedIds.includes(b.id));

  return (
    <div>
      <div style={{ marginBottom: 22 }}>
        <h1 className="np" style={{ fontSize: 24 }}>My Books</h1>
        <p style={{ fontSize: 13, color: "rgba(226,226,238,.38)", marginTop: 4 }}>Manage your borrowed and reserved books</p>
      </div>

      {/* Borrowed Section */}
      <h3 style={{ fontSize: 14, fontWeight: 600, color: "rgba(226,226,238,.55)", marginBottom: 12 }}>📖 Borrowed ({borrowedBooks.length})</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
        {borrowedBooks.map(b => (
          <div key={b.id} className="card" style={{ padding: "16px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
              <div style={{ display: "flex", gap: 13 }}>
                <div style={{ width: 44, height: 58, borderRadius: 8, background: b.cover, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>📕</div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600 }}>{b.title}</p>
                  <p style={{ fontSize: 12, color: "rgba(226,226,238,.42)", marginTop: 2 }}>{b.author}</p>
                  <p style={{ fontSize: 12, color: "#e74c3c", marginTop: 6 }}>📅 Due: March 16, 2026</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button className="btn btn-ghost" style={{ fontSize: 12 }}>🗓 Extend</button>
                <button className="btn btn-ghost" style={{ fontSize: 12 }}>💬 Concern</button>
                <button className="btn btn-red" style={{ fontSize: 12 }}>Return</button>
              </div>
            </div>
          </div>
        ))}
        {borrowedBooks.length === 0 && <p style={{ opacity: .3, fontSize: 13 }}>No borrowed books.</p>}
      </div>

      {/* Reserved Section */}
      <h3 style={{ fontSize: 14, fontWeight: 600, color: "rgba(226,226,238,.55)", marginBottom: 12 }}>🔖 Reserved ({reservedBooks.length})</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {reservedBooks.map(b => (
          <div key={b.id} style={{ background: "rgba(100,149,237,.05)", border: "1px solid rgba(100,149,237,.14)", borderRadius: 14, padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600 }}>{b.title}</p>
              <p style={{ fontSize: 12, color: "rgba(226,226,238,.42)", marginTop: 2 }}>{b.author}</p>
              <p style={{ fontSize: 12, color: "#6495ed", marginTop: 5 }}>🔔 Email alert when available</p>
            </div>
            <span className="badge bb">Reserved</span>
          </div>
        ))}
        {reservedBooks.length === 0 && <p style={{ opacity: .3, fontSize: 13 }}>No reserved books.</p>}
      </div>
    </div>
  );
}