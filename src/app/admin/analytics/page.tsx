"use client";

import React, { useState } from "react";

/* ─── MOCK DATA ────────────────────────────────────────── */
const STATS = [
  { label: "Total Books", value: "2,451", trend: "+12%", isUp: true, color: "#3d8bef", bg: "#e8f1fd", icon: "📚" },
  { label: "Active Borrows", value: "184", trend: "+5%", isUp: true, color: "#4caf6e", bg: "#e6f7ec", icon: "📖" },
  { label: "Overdue Books", value: "12", trend: "-2%", isUp: false, color: "#c94040", bg: "#fdeaea", icon: "⚠️" },
  { label: "Total Students", value: "892", trend: "+24", isUp: true, color: "#7c3aed", bg: "#f3e8ff", icon: "👥" },
];

const MONTHLY_DATA = [
  { m: "Jan", val: 120 }, { m: "Feb", val: 180 }, { m: "Mar", val: 250 },
  { m: "Apr", val: 210 }, { m: "May", val: 150 }, { m: "Jun", val: 90 },
  { m: "Jul", val: 110 }, { m: "Aug", val: 300 }, { m: "Sep", val: 280 },
  { m: "Oct", val: 220 }, { m: "Nov", val: 190 }, { m: "Dec", val: 160 }
];

const CATEGORY_DATA = [
  { cat: "Computer Science", pct: 35, color: "#3d8bef" },
  { cat: "Engineering", pct: 25, color: "#4caf6e" },
  { cat: "Business", pct: 20, color: "#e8a020" },
  { cat: "Mathematics", pct: 12, color: "#7c3aed" },
  { cat: "Others", pct: 8, color: "#8a8ea8" },
];

const TOP_BOOKS = [
  { title: "Introduction to Algorithms", author: "Cormen et al.", borrows: 145, emoji: "📘" },
  { title: "Clean Code", author: "Robert C. Martin", borrows: 112, emoji: "📗" },
  { title: "Engineering Mechanics", author: "R.C. Hibbeler", borrows: 98, emoji: "📙" },
  { title: "Calculus: Early Transcendentals", author: "James Stewart", borrows: 85, emoji: "📕" },
  { title: "Business Law", author: "Jane Doe", borrows: 64, emoji: "📔" },
];

/* ─── COMPONENTS ───────────────────────────────────────── */
function Btn({ children, variant = "ghost", onClick, style = {} }: any) {
  const base: any = { border: "none", borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all .18s", display: "inline-flex", alignItems: "center", gap: 6, padding: "9px 16px", ...style };
  const v: any = {
    navy: { background: "#1a2744", color: "#fff", boxShadow: "0 4px 14px rgba(26,39,68,.22)" },
    ghost: { background: "#f0ede5", color: "#1a2744", border: "2px solid #e2dfd6" },
  };
  return <button style={{ ...base, ...v[variant] }} onClick={onClick}>{children}</button>;
}

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("This Year");
  const maxBorrow = Math.max(...MONTHLY_DATA.map(d => d.val));

  return (
    <div style={{ animation: "fadeUp .3s ease", paddingBottom: 40 }}>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        @keyframes growUp { from { height: 0; opacity: 0; } to { opacity: 1; } }
        @keyframes growRight { from { width: 0; opacity: 0; } to { opacity: 1; } }
        .bar-hover:hover { opacity: 0.8; }
        .row-hover:hover { background: #f7f5f0; }
      `}</style>

      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, color: "#1a2744" }}>Data Analytics</div>
          <div style={{ fontSize: 13, color: "#8a8ea8", marginTop: 2 }}>System overview and borrowing trends</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <select value={timeRange} onChange={e => setTimeRange(e.target.value)} style={{ background: "#fff", border: "2px solid #e2dfd6", borderRadius: 10, padding: "8px 14px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#1a2744", outline: "none", cursor: "pointer", fontWeight: 600 }}>
            {["This Year", "Last 6 Months", "This Month"].map(t => <option key={t}>{t}</option>)}
          </select>
          <Btn onClick={() => window.print()}>🖨️ Export PDF</Btn>
        </div>
      </div>

      {/* TOP STATS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
        {STATS.map((s, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2dfd6", padding: "20px", boxShadow: "0 2px 12px rgba(26,39,68,.06)", display: "flex", alignItems: "flex-start", gap: 14 }}>
            <div style={{ width: 46, height: 46, borderRadius: 12, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{s.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, color: "#8a8ea8", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 6 }}>{s.label}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: "#1a2744", lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: s.isUp ? "#2d7a4f" : "#c94040", background: s.isUp ? "#e6f7ec" : "#fdeaea", padding: "2px 6px", borderRadius: 6 }}>
                  {s.isUp ? "↑" : "↓"} {s.trend}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24, alignItems: "start" }}>
        
        {/* LEFT COLUMN: CHARTS */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          
          {/* BAR CHART: MONTHLY BORROWS */}
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2dfd6", padding: "24px", boxShadow: "0 2px 12px rgba(26,39,68,.06)" }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#1a2744", marginBottom: 24, fontFamily: "'DM Serif Display', serif" }}>Books Borrowed (Monthly)</div>
            
            <div style={{ height: 220, display: "flex", alignItems: "flex-end", gap: "2%", position: "relative", paddingBottom: 24 }}>
              {/* Grid Lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((line, i) => (
                <div key={i} style={{ position: "absolute", bottom: 24 + (196 * line), left: 0, right: 0, borderTop: "1px dashed #e2dfd6", zIndex: 0 }}>
                  <span style={{ position: "absolute", left: -30, top: -8, fontSize: 10, color: "#8a8ea8" }}>{Math.round(maxBorrow * line)}</span>
                </div>
              ))}

              {/* Bars */}
              {MONTHLY_DATA.map((d, i) => {
                const heightPct = (d.val / maxBorrow) * 100;
                return (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, zIndex: 1 }}>
                    <div style={{ width: "100%", maxWidth: 36, height: 196, display: "flex", alignItems: "flex-end", position: "relative" }} title={`${d.val} borrows`}>
                      <div className="bar-hover" style={{ width: "100%", height: `${heightPct}%`, background: "linear-gradient(to top, #3d8bef, #7fb8f7)", borderRadius: "6px 6px 0 0", animation: `growUp .5s ease forwards ${(i * 0.05)}s`, transformOrigin: "bottom", cursor: "pointer", transition: "opacity .15s" }} />
                    </div>
                    <div style={{ fontSize: 11, color: "#8a8ea8", fontWeight: 600 }}>{d.m}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* TABLE: TOP BOOKS */}
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2dfd6", padding: "24px", boxShadow: "0 2px 12px rgba(26,39,68,.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#1a2744", fontFamily: "'DM Serif Display', serif" }}>Most Popular Books</div>
              <Btn style={{ padding: "5px 10px", fontSize: 11 }}>View All</Btn>
            </div>
            <div style={{ display: "grid", gap: 8 }}>
              {TOP_BOOKS.map((b, i) => (
                <div key={i} className="row-hover" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", background: "#fcfaf7", border: "1px solid #f2efe8", borderRadius: 10, transition: "background .15s" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ fontSize: 20 }}>{b.emoji}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#1a2744" }}>{b.title}</div>
                      <div style={{ fontSize: 11, color: "#8a8ea8" }}>{b.author}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#3d8bef", background: "#e8f1fd", padding: "4px 10px", borderRadius: 20 }}>
                    {b.borrows} Borrows
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: DISTRIBUTION */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          
          {/* PROGRESS BARS: CATEGORIES */}
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2dfd6", padding: "24px", boxShadow: "0 2px 12px rgba(26,39,68,.06)" }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#1a2744", marginBottom: 20, fontFamily: "'DM Serif Display', serif" }}>Top Categories</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {CATEGORY_DATA.map((c, i) => (
                <div key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#1a2744" }}>{c.cat}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: c.color }}>{c.pct}%</span>
                  </div>
                  <div style={{ width: "100%", height: 8, background: "#f0ede5", borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${c.pct}%`, background: c.color, borderRadius: 4, animation: `growRight .6s ease forwards ${(i * 0.1)}s`, transformOrigin: "left" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MINI REPORT WIDGET */}
          <div style={{ background: "linear-gradient(135deg, #1a2744, #2a3d66)", borderRadius: 16, padding: "24px", color: "#fff", position: "relative", overflow: "hidden", boxShadow: "0 8px 24px rgba(26,39,68,.15)" }}>
            <div style={{ position: "absolute", top: -20, right: -20, fontSize: 100, opacity: 0.1, pointerEvents: "none" }}>📈</div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#7fb8f7", marginBottom: 8 }}>Weekly Insight</div>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, lineHeight: 1.3, marginBottom: 12 }}>Borrowing increased by 15% this week!</div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,.7)", lineHeight: 1.5, marginBottom: 20 }}>
              Engineering and Computer Science books are driving the most traffic. Make sure to restock high-demand titles.
            </p>
            <button style={{ width: "100%", background: "#fff", border: "none", borderRadius: 10, padding: "10px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700, color: "#1a2744", cursor: "pointer", transition: "opacity .15s" }}>Generate Full Report</button>
          </div>

        </div>
      </div>
    </div>
  );
}