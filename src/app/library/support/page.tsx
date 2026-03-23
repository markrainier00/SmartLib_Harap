"use client";

import React, { useState, useEffect } from "react";

// Mabilis na fallback books lang ito habang wala pa tayong GetBooks API
const BOOKS = [
  "Introduction to Algorithms", "Calculus: Early Transcendentals", "Organic Chemistry",
  "Principles of Economics", "Human Anatomy & Physiology", "Data Structures in Java"
];

export default function SupportPage() {
  const [concernType, setConcernType] = useState("Missing pages");
  const [concernBook, setConcernBook] = useState("");
  const [concernDesc, setConcernDesc] = useState("");
  
  // 🚀 STATE PARA SA STUDENT INFO NA NAKA-LOGIN
  const [studentInfo, setStudentInfo] = useState({ name: "Unknown Student", course: "N/A" });
  const [loading, setLoading] = useState(false);

  // 🚀 KUNIN KUNG SINO ANG NAKA-LOGIN MULA SA BROWSER STORAGE
  useEffect(() => {
    const userStr = localStorage.getItem("user") || localStorage.getItem("smartLib_user");
    if (userStr) {
      const user = JSON.parse(userStr);
      setStudentInfo({
        name: `${user.firstname} ${user.lastname}`,
        course: user.program || "N/A"
      });
    }
  }, []);

  // 🚀 IPASA SA DATABASE ANG CONCERN PAGKA-CLICK NG SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!concernDesc.trim()) { alert("⚠️ Please describe your concern."); return; }
    
    setLoading(true);
    
    // Gawa tayo ng Title base sa piniling type at libro
    const title = concernBook ? `${concernType}: ${concernBook}` : concernType;

    try {
      const res = await fetch("http://localhost:8080/api/concerns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student: studentInfo.name,
          course: studentInfo.course,
          type: concernType === "Missing pages" || concernType === "Damaged book" ? "Damaged Book" : 
                concernType === "Book not found on shelf" || concernType === "Wrong book" ? "Book Request" : "Other",
          title: title,
          msg: concernDesc
        })
      });

      const json = await res.json();

      if (json.isSuccess) {
        alert("✅ Concern submitted successfully! The Admin will review it shortly.");
        setConcernDesc(""); 
        setConcernBook("");
      } else {
        alert("❌ Failed to submit concern.");
      }
    } catch (err) {
      alert("❌ Server error. Could not connect to database.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-layout fadeUp">
      <div className="page-header">Support Center</div>
      <div className="page-sub">Submit concerns or issues about books and services</div>

      <div className="two-col-grid" style={{ maxWidth: 820 }}>

        {/* Form */}
        <div className="sup-card">
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--color-primary)", margin: "0 0 4px 0" }}>Submit a Concern</h3>
          <p style={{ fontSize: 12, color: "var(--color-subtext)", margin: "0 0 18px 0" }}>Logged in as: <strong>{studentInfo.name}</strong></p>
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
                disabled={loading}
              />
            </div>
            <button type="submit" className="btn" disabled={loading} style={{ opacity: loading ? 0.7 : 1 }}>
              {loading ? "Submitting..." : "Submit Concern"}
            </button>
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
              <div key={label} style={{ padding: "9px 0", borderBottom: i < arr.length - 1 ? `2px solid var(--color-muted)` : "none" }}>
                <div style={{ fontSize: 11, color: "var(--color-subtext)" }}>{label}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text)" }}>{value}</div>
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