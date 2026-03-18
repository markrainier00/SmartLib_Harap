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
    if (!concernDesc.trim()) { alert("⚠️ Please describe your concern."); return; }
    alert("✅ Concern submitted! We'll reply to your email.");
    setConcernDesc(""); setConcernBook("");
  };

  return (
    <div className="page-layout fadeUp">
      <div className="page-header">Support Center</div>
      <div className="page-sub">Submit concerns or issues about books and services</div>

      <div className="two-col-grid" style={{ maxWidth: 820 }}>

        {/* Form */}
        <div className="sup-card">
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--color-primary)", margin: "0 0 4px 0" }}>Submit a Concern</h3>
          <p style={{ fontSize: 12, color: "var(--color-subtext)", margin: "0 0 18px 0" }}>Librarian concern support</p>
          <form onSubmit={handleSubmit}>
            <div className="sup-field">
              <label>Type of Concern</label>
              <select value={concernType} onChange={e => setConcernType(e.target.value)}>
                {["Missing pages", "Damaged book", "Wrong book", "Book not found on shelf", "Late return", "Account issue", "Other"].map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div className="sup-field">
              <label>Related Book (optional)</label>
              <select value={concernBook} onChange={e => setConcernBook(e.target.value)}>
                <option value="">Select a book…</option>
                {BOOKS.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div className="sup-field">
              <label>Description</label>
              <textarea
                placeholder="Describe the issue in detail…"
                value={concernDesc}
                onChange={e => setConcernDesc(e.target.value)}
              />
            </div>
            <button type="submit" className="btn">Submit Concern</button>
          </form>
        </div>

        {/* Info & FAQ */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="sup-card" style={{ padding: 18 }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: "var(--color-primary)", margin: "0 0 12px 0" }}>Contact Information</h4>
            {[
              { label: "Email",    value: "library@university.edu" },
              { label: "Phone",    value: "+63 2 8888 1234" },
              { label: "Hours",    value: "Mon–Fri 7AM–8PM" },
              { label: "Location", value: "Main Building, Ground Floor" },
            ].map(({ label, value }, i, arr) => (
              <div key={label} style={{ padding: "9px 0", borderBottom: i < arr.length - 1 ? `1px solid var(--color-surface)` : "none" }}>
                <div style={{ fontSize: 11, color: "var(--color-subtext)" }}>{label}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--color-primary)" }}>{value}</div>
              </div>
            ))}
          </div>

          <div className="sup-card" style={{ padding: 18 }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: "var(--color-primary)", margin: "0 0 12px 0" }}>Common Questions</h4>
            {[
              { q: "How do I renew a book?",             a: "Go to My List → Borrowed Books and click \"Extend\"." },
              { q: "Can I reserve an unavailable book?", a: "Yes — click any unavailable book and choose Reserve." },
              { q: "When does my account expire?",       a: "Student accounts are valid for the current academic year." },
            ].map(({ q, a }, i, arr) => (
              <div key={q} style={{ marginBottom: i < arr.length - 1 ? 12 : 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--color-primary)" }}>{q}</div>
                <div style={{ fontSize: 12, color: "var(--color-subtext)", marginTop: 3, lineHeight: 1.5 }}>{a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}