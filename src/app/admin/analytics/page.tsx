"use client";

import React, { useState, useEffect } from "react";

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
  const [loading, setLoading] = useState(true);
  
  // 🚀 REPORT MODAL STATES
  const [showReport, setShowReport] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [adminName, setAdminName] = useState("Administrator");

  // 🚀 DYNAMIC STATES NA SASALO NG DATA MULA SA BACKEND
  const [stats, setStats] = useState([
    { label: "Total Books", value: "0", trend: "0%", isUp: true, color: "#3d8bef", bg: "#e8f1fd", icon: "📚" },
    { label: "Active Borrows", value: "0", trend: "0%", isUp: true, color: "#4caf6e", bg: "#e6f7ec", icon: "📖" },
    { label: "Overdue Books", value: "0", trend: "0%", isUp: false, color: "#c94040", bg: "#fdeaea", icon: "⚠️" },
    { label: "Total Students", value: "0", trend: "0", isUp: true, color: "#7c3aed", bg: "#f3e8ff", icon: "👥" },
  ]);
  const [monthlyData, setMonthlyData] = useState<{m: string, val: number}[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [topBooks, setTopBooks] = useState<any[]>([]);

  // 🚀 FETCH DATA FROM GO BACKEND
  useEffect(() => {
    // Kunin ang Admin Name para sa Report Signatory
    const userStr = localStorage.getItem("smartLib_user") || localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user.firstname) setAdminName(`${user.firstname} ${user.lastname}`);
    }

    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:8080/api/admin/analytics-full");
        const json = await res.json();
        
        if (res.ok && json.isSuccess && json.data) {
          const { totalBooks, activeBorrows, overdueBooks, totalStudents, monthly, categories, top } = json.data;
          
          setStats([
            { label: "Total Books", value: totalBooks?.toString() || "0", trend: "+12%", isUp: true, color: "#3d8bef", bg: "#e8f1fd", icon: "📚" },
            { label: "Active Borrows", value: activeBorrows?.toString() || "0", trend: "+5%", isUp: true, color: "#4caf6e", bg: "#e6f7ec", icon: "📖" },
            { label: "Overdue Books", value: overdueBooks?.toString() || "0", trend: "-2%", isUp: false, color: "#c94040", bg: "#fdeaea", icon: "⚠️" },
            { label: "Total Students", value: totalStudents?.toString() || "0", trend: "+24", isUp: true, color: "#7c3aed", bg: "#f3e8ff", icon: "👥" },
          ]);

          setMonthlyData(monthly || []);
          setCategoryData(categories || []);
          setTopBooks(top || []);
        }
      } catch (err) {
        console.error("Failed to load analytics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [timeRange]);

  const maxBorrow = monthlyData.length > 0 ? Math.max(...monthlyData.map(d => d.val)) : 100;

  // 🚀 FUNCTION PARA SA GENERATE REPORT ANIMATION
  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowReport(true);
    }, 1200); // 1.2s loading simulation for premium feel
  };

  return (
    <div style={{ animation: "fadeUp .3s ease", paddingBottom: 40 }}>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        @keyframes growUp { from { height: 0; opacity: 0; } to { opacity: 1; } }
        @keyframes growRight { from { width: 0; opacity: 0; } to { opacity: 1; } }
        .bar-hover:hover { opacity: 0.8; }
        .row-hover:hover { background: #f7f5f0; }
        @keyframes spin { to { transform: rotate(360deg); } }
        
        /* 🚀 CSS PARA SA PDF EXPORT / PRINTING */
        @media print {
          body * { visibility: hidden; }
          .print-section, .print-section * { visibility: visible; }
          .print-section { position: absolute; left: 0; top: 0; width: 100%; padding: 0; margin: 0; box-shadow: none; border: none; }
          .no-print { display: none !important; }
        }
      `}</style>

      {/* HEADER */}
      <div className="no-print" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, color: "#1a2744" }}>Data Analytics</div>
          <div style={{ fontSize: 13, color: "#8a8ea8", marginTop: 2 }}>System overview and borrowing trends</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <select value={timeRange} onChange={e => setTimeRange(e.target.value)} style={{ background: "#fff", border: "2px solid #e2dfd6", borderRadius: 10, padding: "8px 14px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#1a2744", outline: "none", cursor: "pointer", fontWeight: 600 }}>
            {["This Year", "Last 6 Months", "This Month"].map(t => <option key={t}>{t}</option>)}
          </select>
          <Btn onClick={handleGenerateReport} variant="navy">
            {isGenerating ? "Generating..." : "📄 View Full Report"}
          </Btn>
        </div>
      </div>

      {loading ? (
        <div className="no-print" style={{ padding: 100, textAlign: "center", color: "#1a2744" }}>
           <div style={{ width: 30, height: 30, border: "3px solid #1a274433", borderTopColor: "#1a2744", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }}></div>
           Analyzing library data...
        </div>
      ) : (
        <div className="no-print">
          {/* TOP STATS */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
            {stats.map((s, i) => (
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
                
                {monthlyData.length === 0 ? (
                  <div style={{ height: 220, display: "flex", alignItems: "center", justifyContent: "center", color: "#8a8ea8" }}>No data available yet</div>
                ) : (
                  <div style={{ height: 220, display: "flex", alignItems: "flex-end", gap: "2%", position: "relative", paddingBottom: 24 }}>
                    {/* Grid Lines */}
                    {[0, 0.25, 0.5, 0.75, 1].map((line, i) => (
                      <div key={i} style={{ position: "absolute", bottom: 24 + (196 * line), left: 0, right: 0, borderTop: "1px dashed #e2dfd6", zIndex: 0 }}>
                        <span style={{ position: "absolute", left: -30, top: -8, fontSize: 10, color: "#8a8ea8" }}>{Math.round(maxBorrow * line)}</span>
                      </div>
                    ))}

                    {/* Bars */}
                    {monthlyData.map((d, i) => {
                      const heightPct = maxBorrow === 0 ? 0 : (d.val / maxBorrow) * 100;
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
                )}
              </div>

              {/* TABLE: TOP BOOKS */}
              <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2dfd6", padding: "24px", boxShadow: "0 2px 12px rgba(26,39,68,.06)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#1a2744", fontFamily: "'DM Serif Display', serif" }}>Most Popular Books</div>
                </div>
                
                {topBooks.length === 0 ? (
                  <div style={{ padding: 20, textAlign: "center", color: "#8a8ea8" }}>No borrow records yet</div>
                ) : (
                  <div style={{ display: "grid", gap: 8 }}>
                    {topBooks.map((b, i) => (
                      <div key={i} className="row-hover" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", background: "#fcfaf7", border: "1px solid #f2efe8", borderRadius: 10, transition: "background .15s" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={{ fontSize: 20 }}>{b.emoji || "📖"}</div>
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: "#1a2744" }}>{b.title}</div>
                            <div style={{ fontSize: 11, color: "#8a8ea8" }}>{b.author || "Unknown Author"}</div>
                          </div>
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#3d8bef", background: "#e8f1fd", padding: "4px 10px", borderRadius: 20 }}>
                          {b.borrows} Borrows
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: DISTRIBUTION */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              
              {/* PROGRESS BARS: CATEGORIES */}
              <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2dfd6", padding: "24px", boxShadow: "0 2px 12px rgba(26,39,68,.06)" }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#1a2744", marginBottom: 20, fontFamily: "'DM Serif Display', serif" }}>Top Categories</div>
                
                {categoryData.length === 0 ? (
                  <div style={{ textAlign: "center", color: "#8a8ea8", padding: "20px 0" }}>No category data</div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    {categoryData.map((c, i) => (
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
                )}
              </div>

              {/* MINI REPORT WIDGET */}
              <div style={{ background: "linear-gradient(135deg, #1a2744, #2a3d66)", borderRadius: 16, padding: "24px", color: "#fff", position: "relative", overflow: "hidden", boxShadow: "0 8px 24px rgba(26,39,68,.15)" }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#7fb8f7", marginBottom: 8 }}>Executive Insight</div>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, lineHeight: 1.3, marginBottom: 12 }}>Generate Official Report</div>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,.7)", lineHeight: 1.5, marginBottom: 20 }}>
                  Compile all live database statistics into a formal PDF report for administrative review and archiving.
                </p>
                <button onClick={handleGenerateReport} style={{ width: "100%", background: "#fff", border: "none", borderRadius: 10, padding: "10px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700, color: "#1a2744", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", gap: 8 }}>
                  {isGenerating ? <span style={{ animation: "spin 1s linear infinite" }}>⏳</span> : "📄"} 
                  {isGenerating ? "Compiling Data..." : "Generate Full Report"}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 🚀 PROFESSIONAL REPORT MODAL (OVERLAY) */}
      {showReport && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.6)", display: "flex", justifyContent: "center", alignItems: "flex-start", overflowY: "auto", padding: "40px 20px" }}>
          
          <div className="print-section" style={{ background: "#fff", width: "100%", maxWidth: 850, borderRadius: 12, padding: "50px", boxShadow: "0 20px 50px rgba(0,0,0,0.2)", position: "relative" }}>
            
            {/* Modal Controls (Hindi kasama sa Print) */}
            <div className="no-print" style={{ position: "absolute", top: 20, right: 20, display: "flex", gap: 10 }}>
              <Btn variant="ghost" onClick={() => setShowReport(false)}>✖ Close</Btn>
              <Btn variant="navy" onClick={() => window.print()}>🖨️ Save as PDF</Btn>
            </div>

            {/* ─── PORMAL NA REPORT HEADER ─── */}
            <div style={{ borderBottom: "2px solid #1a2744", paddingBottom: 20, marginBottom: 30, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div>
                <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, color: "#1a2744", margin: 0 }}>SmartLib System</h1>
                <div style={{ fontSize: 14, color: "#64748b", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginTop: 4 }}>Executive Analytics Report</div>
              </div>
              <div style={{ textAlign: "right", fontSize: 12, color: "#1a2744" }}>
                <div><strong>Date Generated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                <div><strong>Generated By:</strong> {adminName}</div>
                <div><strong>Reporting Period:</strong> {timeRange}</div>
              </div>
            </div>

            {/* ─── SUMMARY STATS ─── */}
            <h3 style={{ fontSize: 16, color: "#1a2744", borderBottom: "1px solid #e2e8f0", paddingBottom: 8, marginBottom: 16 }}>I. System Overview</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 15, marginBottom: 40 }}>
              {stats.map((s, i) => (
                <div key={i} style={{ padding: 15, background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8 }}>
                  <div style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", fontWeight: 700, marginBottom: 8 }}>{s.label}</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: "#1a2744" }}>{s.value}</div>
                </div>
              ))}
            </div>

            {/* ─── TABULAR DATA ─── */}
            <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 40 }}>
              
              {/* Table 1: Top Books */}
              <div>
                <h3 style={{ fontSize: 16, color: "#1a2744", borderBottom: "1px solid #e2e8f0", paddingBottom: 8, marginBottom: 16 }}>II. Most Popular Titles</h3>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                  <thead>
                    <tr style={{ background: "#f1f5f9", textAlign: "left" }}>
                      <th style={{ padding: "10px", borderBottom: "2px solid #cbd5e1", color: "#475569" }}>Title & Author</th>
                      <th style={{ padding: "10px", borderBottom: "2px solid #cbd5e1", color: "#475569", textAlign: "right" }}>Borrows</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topBooks.length > 0 ? topBooks.map((b, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #e2e8f0" }}>
                        <td style={{ padding: "10px", color: "#1e293b", fontWeight: 500 }}>
                          {b.title} <br/><span style={{ fontSize: 10, color: "#64748b", fontWeight: 400 }}>{b.author}</span>
                        </td>
                        <td style={{ padding: "10px", textAlign: "right", fontWeight: 700, color: "#1a2744" }}>{b.borrows}</td>
                      </tr>
                    )) : <tr><td colSpan={2} style={{ padding: "10px", textAlign: "center", color: "#64748b" }}>No data available.</td></tr>}
                  </tbody>
                </table>
              </div>

              {/* Table 2: Category Breakdown */}
              <div>
                <h3 style={{ fontSize: 16, color: "#1a2744", borderBottom: "1px solid #e2e8f0", paddingBottom: 8, marginBottom: 16 }}>III. Category Distribution</h3>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                  <thead>
                    <tr style={{ background: "#f1f5f9", textAlign: "left" }}>
                      <th style={{ padding: "10px", borderBottom: "2px solid #cbd5e1", color: "#475569" }}>Category</th>
                      <th style={{ padding: "10px", borderBottom: "2px solid #cbd5e1", color: "#475569", textAlign: "right" }}>Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryData.length > 0 ? categoryData.map((c, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #e2e8f0" }}>
                        <td style={{ padding: "10px", color: "#1e293b", fontWeight: 500 }}>{c.cat}</td>
                        <td style={{ padding: "10px", textAlign: "right", fontWeight: 700, color: c.color }}>{c.pct}%</td>
                      </tr>
                    )) : <tr><td colSpan={2} style={{ padding: "10px", textAlign: "center", color: "#64748b" }}>No data available.</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ─── FOOTER ─── */}
            <div style={{ marginTop: 60, paddingTop: 20, borderTop: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", fontSize: 10, color: "#94a3b8" }}>
              <div>SmartLib Library Management System v1.0</div>
              <div>Confidential and Proprietary. Do not distribute without permission.</div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}