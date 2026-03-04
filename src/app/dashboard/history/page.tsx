"use client";

import React, { useState } from "react";

// Mock Data mula sa iyong HTML
const HISTORY_DATA = [
  { id: 1, book: "Data Structures in Java", action: "Returned", date: "Feb 28, 2026", due: "Mar 01, 2026", status: "returned" },
  { id: 2, book: "Calculus: Early Transcendentals", action: "Borrowed", date: "Feb 15, 2026", due: "Mar 15, 2026", status: "borrowed" },
  { id: 3, book: "Organic Chemistry", action: "Reserved", date: "Feb 10, 2026", due: "—", status: "returned" },
  { id: 4, book: "Engineering Mechanics", action: "Borrowed", date: "Jan 30, 2026", due: "Feb 28, 2026", status: "overdue" },
  { id: 5, book: "Physics for Scientists", action: "Returned", date: "Jan 20, 2026", due: "Jan 22, 2026", status: "returned" },
  { id: 6, book: "Business Law", action: "Borrowed", date: "Mar 01, 2026", due: "Mar 22, 2026", status: "borrowed" },
];

export default function HistoryPage() {
  const [histTab, setHistTab] = useState("all");

  const filteredHistory = histTab === "all" ? HISTORY_DATA : HISTORY_DATA.filter((h) => h.status === histTab);

  const stats = [
    { label: 'Total', val: HISTORY_DATA.length, color: '#2563eb' },
    { label: 'Active', val: HISTORY_DATA.filter(h => h.status === 'borrowed').length, color: '#e8a020' },
    { label: 'Returned', val: HISTORY_DATA.filter(h => h.status === 'returned').length, color: '#2d7a4f' },
    { label: 'Overdue', val: HISTORY_DATA.filter(h => h.status === 'overdue').length, color: '#c94040' },
  ];

  const icons: Record<string, string> = { Returned: '↩️', Borrowed: '📖', Reserved: '🔖' };
  const bgMap: Record<string, string> = { returned: '#f0fdf4', borrowed: '#eff6ff', overdue: '#fff1f0' };
  const badgeMap: Record<string, string> = { returned: 'badge-green', borrowed: 'badge-blue', overdue: 'badge-red' };

  return (
    <div className="page-history" style={{ animation: "fadeUp .3s ease both" }}>
      <style>{`
        .page-title { font-family: 'DM Serif Display', serif; font-size: 24px; color: #1a2744; margin-bottom: 4px; }
        .page-sub { font-size: 13px; color: #8a8ea8; margin-bottom: 24px; }
        
        .tab-row { display: flex; border-bottom: 2px solid #e2dfd6; margin-bottom: 22px; }
        .tab-btn { background: none; border: none; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600; padding: 10px 16px; cursor: pointer; color: #8a8ea8; border-bottom: 2px solid transparent; margin-bottom: -2px; transition: all .18s; }
        .tab-btn.on { color: #1a2744; border-bottom-color: #1a2744; }

        .hist-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap: 12px; margin-bottom: 22px; }
        .hist-stat { background: #fff; border: 1px solid #e2dfd6; border-radius: 14px; padding: 14px 16px; text-align: center; }
        .hs-val { font-family: 'DM Serif Display', serif; font-size: 30px; line-height: 1; margin-bottom: 4px; }
        .hs-label { font-size: 12px; color: #8a8ea8; }

        .card { background: #ffffff; border-radius: 16px; box-shadow: 0 2px 12px rgba(26,39,68,.08); border: 1px solid #e2dfd6; }
        .h-row { padding: 14px 0; border-bottom: 1px solid #f2efe8; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .h-row:last-child { border-bottom: none; }
        
        .badge { display: inline-flex; align-items: center; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; }
        .badge-green { background: #e6f7ec; color: #2d7a4f; }
        .badge-blue { background: #e8f1fd; color: #2563eb; }
        .badge-red { background: #fdeaea; color: #c94040; }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
      `}</style>

      <div className="page-title">Library History</div>
      <div className="page-sub">Your complete borrowing and return activity</div>

      <div className="tab-row">
        {["all", "borrowed", "returned", "overdue"].map((tab) => (
          <button 
            key={tab} 
            className={`tab-btn ${histTab === tab ? "on" : ""}`} 
            onClick={() => setHistTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="hist-stats">
        {stats.map((s, idx) => (
          <div key={idx} className="hist-stat">
            <div className="hs-val" style={{ color: s.color }}>{s.val}</div>
            <div className="hs-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: "4px 20px" }}>
        {filteredHistory.length > 0 ? filteredHistory.map((h) => (
          <div key={h.id} className="h-row">
            <div style={{ display: "flex", alignItems: "center", gap: "13px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "11px", background: bgMap[h.status], display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0 }}>
                {icons[h.action] || '📅'}
              </div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "#1a2744" }}>{h.book}</div>
                <div style={{ fontSize: "12px", color: "#8a8ea8", marginTop: "2px" }}>{h.action} · {h.date}</div>
                <div style={{ fontSize: "11px", color: "#c0bdb8", marginTop: "1px" }}>Due: {h.due}</div>
              </div>
            </div>
            <span className={`badge ${badgeMap[h.status]}`}>
              {h.status.charAt(0).toUpperCase() + h.status.slice(1)}
            </span>
          </div>
        )) : (
          <div style={{ padding: "28px", textAlign: "center", color: "#8a8ea8" }}>No records found</div>
        )}
      </div>
    </div>
  );
}