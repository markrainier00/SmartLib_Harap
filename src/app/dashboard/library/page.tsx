"use client";

import React, { useState } from "react";

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

const categories = ["All", "Computer Science", "Mathematics", "Chemistry", "Economics", "Medicine", "Engineering", "Accounting"];

export default function LibraryPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("title");
  const [filterAvail, setFilterAvail] = useState("all");
  
  // States para malaman kung alin ang borrowed/reserved (dummy data for visual)
  const borrowed = [2, 5, 8];
  const reserved = [3];

  const filtered = books
    .filter(b => {
      const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === "All" || b.category === category;
      const matchAvail = filterAvail === "all" || (filterAvail === "yes" ? b.available : !b.available);
      return matchSearch && matchCat && matchAvail;
    })
    .sort((a, b) => sortBy === "author" ? a.author.localeCompare(b.author) : sortBy === "avail" ? Number(b.available) - Number(a.available) : a.title.localeCompare(b.title));

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 className="np" style={{ fontSize: 24 }}>Library Catalog</h1>
        <p style={{ fontSize: 13, color: "rgba(226,226,238,.38)", marginTop: 4 }}>{filtered.length} books found</p>
      </div>

      {/* Filters & Search */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 14 }}>
        <div style={{ flex: 1, minWidth: 180, position: "relative" }}>
          <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", opacity: .32, pointerEvents: "none" }}>🔍</span>
          <input className="inp" style={{ paddingLeft: 34 }} placeholder="Search title or author…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="sel" value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="title">Sort: Title</option>
          <option value="author">Sort: Author</option>
          <option value="avail">Sort: Available</option>
        </select>
        <select className="sel" value={filterAvail} onChange={e => setFilterAvail(e.target.value)}>
          <option value="all">All Books</option>
          <option value="yes">Available</option>
          <option value="no">Unavailable</option>
        </select>
      </div>

      <div style={{ display: "flex", gap: 7, marginBottom: 20, overflowX: "auto", paddingBottom: 4 }}>
        {categories.map(c => (
          <button key={c} className={`chip ${category === c ? "chip-on" : "chip-off"}`} onClick={() => setCategory(c)}>{c}</button>
        ))}
      </div>

      {/* Book Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 14 }}>
        {filtered.map(b => (
          <div key={b.id} className="bk-card">
            <div style={{ height: 128, background: b.cover, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", borderBottom: `3px solid ${b.accent}` }}>
              <span style={{ fontSize: 42 }}>📚</span>
              <div style={{ position: "absolute", top: 8, right: 8 }}>
                <span className={`badge ${b.available ? "bg" : "br"}`}>{b.available ? "Available" : "Borrowed"}</span>
              </div>
              {borrowed.includes(b.id) && <div style={{ position: "absolute", top: 8, left: 8 }}><span className="badge ba">Mine</span></div>}
              {reserved.includes(b.id) && !borrowed.includes(b.id) && <div style={{ position: "absolute", top: 8, left: 8 }}><span className="badge bb">Reserved</span></div>}
            </div>
            <div style={{ padding: "12px 14px" }}>
              <p style={{ fontSize: 13.5, fontWeight: 600, lineHeight: 1.3, marginBottom: 4 }}>{b.title}</p>
              <p style={{ fontSize: 12, color: "rgba(226,226,238,.42)" }}>{b.author}</p>
              <p style={{ fontSize: 11, color: "rgba(226,226,238,.28)", marginTop: 5 }}>{b.category}</p>
            </div>
          </div>
        ))}
      </div>
      
      {filtered.length === 0 && (
        <div style={{ textAlign: "center", opacity: .3, paddingTop: 60 }}>
          <div style={{ fontSize: 40 }}>📭</div>
          <p style={{ marginTop: 10, fontSize: 14 }}>No books match your filters</p>
        </div>
      )}
    </div>
  );
}