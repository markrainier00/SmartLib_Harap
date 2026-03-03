"use client";

import React from "react";

// Dummy data para sa books (Ito ang basehan ng recommendations)
const books = [
  { id: 1, title: "Introduction to Algorithms", author: "Cormen et al.", category: "Computer Science", available: true, cover: "#1a1a2e", accent: "#e94560", course: ["BSCS", "BSIT", "BSCpE"] },
  { id: 2, title: "Calculus: Early Transcendentals", author: "James Stewart", category: "Mathematics", available: false, cover: "#16213e", accent: "#4a90d9", course: ["BSMATH", "BSCS", "BSEd"] },
  { id: 6, title: "Data Structures in Java", author: "Robert Lafore", category: "Computer Science", available: true, cover: "#2a1a2e", accent: "#9c27b0", course: ["BSCS", "BSIT"] },
  { id: 7, title: "Engineering Mechanics", author: "R.C. Hibbeler", category: "Engineering", available: true, cover: "#1a1f2e", accent: "#ff6b35", course: ["BSCE", "BSMechE", "BSElecE"] },
];

export default function RecommendationPage() {
  // Kunin natin ang course ni Maria (BSCS) para sa filtering logic
  const userCourse = "BSCS";
  const recommended = books.filter(b => b.course.includes(userCourse));

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 className="np" style={{ fontSize: 24 }}>For You</h1>
        <p style={{ fontSize: 13, color: "rgba(226,226,238,.38)", marginTop: 4 }}>
          Curated for <span style={{ color: "#c9a84c", fontWeight: 600 }}>{userCourse}</span> students
        </p>
      </div>

      <div style={{ background: "rgba(201,168,76,.05)", border: "1px solid rgba(201,168,76,.14)", borderRadius: 12, padding: "12px 16px", marginBottom: 22, fontSize: 13, color: "rgba(226,226,238,.6)", display: "flex", gap: 9, alignItems: "center" }}>
        <span>⭐</span> 
        Recommendations are based on your enrolled course.
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 14 }}>
        {recommended.map(b => (
          <div key={b.id} className="card" style={{ display: "flex", gap: 14, padding: 16 }}>
            <div style={{ width: 50, height: 64, borderRadius: 8, background: b.cover, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", border: `2px solid ${b.accent}44` }}>
              📗
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.3 }}>{b.title}</p>
              <p style={{ fontSize: 12, color: "rgba(226,226,238,.42)", marginTop: 3 }}>{b.author}</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
                <span className={`badge ${b.available ? "bg" : "br"}`}>
                  {b.available ? "Available" : "Unavailable"}
                </span>
                <button className="btn btn-gold" style={{ padding: "5px 12px", fontSize: 12 }}>
                  {b.available ? "Borrow" : "Reserve"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}