"use client";

import React, { useState } from "react";

// MOCK DATA PARA SA HISTORY
const HISTORY_DATA = [
  { id: 1, title: "Data Structures in Java", action: "Returned", date: "Feb 28, 2026", due: "Mar 01, 2026", status: "Returned" },
  { id: 2, title: "Calculus: Early Transcendentals", action: "Borrowed", date: "Feb 15, 2026", due: "Mar 15, 2026", status: "Borrowed" },
  { id: 3, title: "Organic Chemistry", action: "Reserved", date: "Feb 10, 2026", due: "—", status: "Returned" }, // Ginawa kong Returned based sa SS mo
  { id: 4, title: "Engineering Mechanics", action: "Borrowed", date: "Jan 30, 2026", due: "Feb 28, 2026", status: "Overdue" },
  { id: 5, title: "Physics for Scientists", action: "Returned", date: "Jan 20, 2026", due: "Jan 22, 2026", status: "Returned" },
];

const TABS = ["All", "Borrowed", "Returned", "Overdue"];

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState("All");

  // Filter Logic
  const filteredData = HISTORY_DATA.filter(item => {
    if (activeTab === "All") return true;
    if (activeTab === "Borrowed" && item.status === "Borrowed") return true;
    if (activeTab === "Returned" && item.status === "Returned") return true;
    if (activeTab === "Overdue" && item.status === "Overdue") return true;
    return false;
  });

  // Summary Counts
  const total = HISTORY_DATA.length;
  const active = HISTORY_DATA.filter(i => i.status === "Borrowed").length;
  const returned = HISTORY_DATA.filter(i => i.status === "Returned").length;
  const overdue = HISTORY_DATA.filter(i => i.status === "Overdue").length;

  // Helper para sa icons at kulay
  const getIconAndColor = (status: string, action: string) => {
    if (status === "Overdue") return { icon: "📖", bg: "#fdeaea", color: "#c94040" };
    if (status === "Borrowed") return { icon: "📖", bg: "#e8f1fd", color: "#3d8bef" };
    if (action === "Reserved") return { icon: "🎟️", bg: "#fef5e6", color: "#e89940" };
    return { icon: "↩️", bg: "#e6f7ec", color: "#2d7a4f" }; // Returned default
  };

  return (
    <div className="page-history" style={{ animation: "fadeUp .3s ease both" }}>
      <style>{`
        .page-history { width: 100%; max-width: 1200px; margin: 0 auto; padding-bottom: 40px; }
        
        .hist-header { font-family: 'DM Serif Display', serif; font-size: 32px; color: #1a2744; margin-bottom: 6px; }
        .hist-sub { font-size: 15px; color: #8a8ea8; margin-bottom: 28px; }

        /* TABS */
        .tabs-container { display: flex; border-bottom: 2px solid #f2efe8; margin-bottom: 24px; gap: 8px; }
        .tab-btn { padding: 14px 20px; font-family: 'DM Sans', sans-serif; font-size: 14.5px; font-weight: 600; color: #8a8ea8; background: none; border: none; border-bottom: 3px solid transparent; cursor: pointer; transition: all .2s; margin-bottom: -2px; }
        .tab-btn:hover { color: #1a2744; }
        .tab-btn.active { color: #1a2744; border-bottom-color: #1a2744; }

        /* SUMMARY CARDS */
        .summary-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 28px; }
        @media (max-width: 768px) { .summary-grid { grid-template-columns: repeat(2, 1fr); } }
        
        .sum-card { background: #fff; border: 1px solid #e2dfd6; border-radius: 16px; padding: 24px 20px; text-align: center; box-shadow: 0 4px 12px rgba(26,39,68,.03); transition: transform .2s; }
        .sum-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(26,39,68,.06); }
        .sum-num { font-family: 'DM Serif Display', serif; font-size: 36px; line-height: 1; margin-bottom: 6px; }
        .sum-label { font-size: 13px; font-weight: 600; color: #8a8ea8; text-transform: uppercase; letter-spacing: 0.5px; }

        /* LIST CONTAINER */
        .list-container { background: #fff; border: 1px solid #e2dfd6; border-radius: 20px; box-shadow: 0 6px 20px rgba(26,39,68,.04); overflow: hidden; padding: 8px 24px; }
        
        .list-item { display: flex; align-items: center; justify-content: space-between; padding: 20px 0; border-bottom: 1px solid #f2efe8; }
        .list-item:last-child { border-bottom: none; }
        
        .li-left { display: flex; align-items: center; gap: 16px; }
        .li-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
        
        .li-title { font-size: 15px; font-weight: 700; color: #1a2744; margin-bottom: 4px; }
        .li-details { font-size: 12.5px; color: #8a8ea8; display: flex; align-items: center; gap: 8px; }
        
        .badge { display: inline-flex; align-items: center; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 700; letter-spacing: 0.3px; }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
      `}</style>

      <div className="hist-header">Library History</div>
      <div className="hist-sub">Your complete borrowing and return activity</div>

      {/* TABS */}
      <div className="tabs-container">
        {TABS.map(tab => (
          <button 
            key={tab} 
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`} 
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* SUMMARY CARDS */}
      <div className="summary-grid">
        <div className="sum-card">
          <div className="sum-num" style={{ color: "#3d8bef" }}>{total}</div>
          <div className="sum-label">Total</div>
        </div>
        <div className="sum-card">
          <div className="sum-num" style={{ color: "#e89940" }}>{active}</div>
          <div className="sum-label">Active</div>
        </div>
        <div className="sum-card">
          <div className="sum-num" style={{ color: "#2d7a4f" }}>{returned}</div>
          <div className="sum-label">Returned</div>
        </div>
        <div className="sum-card">
          <div className="sum-num" style={{ color: "#c94040" }}>{overdue}</div>
          <div className="sum-label">Overdue</div>
        </div>
      </div>

      {/* HISTORY LIST */}
      <div className="list-container">
        {filteredData.length > 0 ? (
          filteredData.map(item => {
            const style = getIconAndColor(item.status, item.action);
            
            return (
              <div key={item.id} className="list-item">
                <div className="li-left">
                  <div className="li-icon" style={{ background: style.bg, color: style.color }}>
                    {style.icon}
                  </div>
                  <div>
                    <div className="li-title">{item.title}</div>
                    <div className="li-details">
                      <span>{item.action} • {item.date}</span>
                      {item.due !== "—" && (
                        <>
                          <span>|</span>
                          <span>Due: {item.due}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <span className="badge" style={{ background: style.bg, color: style.color }}>
                    {item.status}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div style={{ padding: "40px 0", textAlign: "center", color: "#8a8ea8" }}>
            <div style={{ fontSize: "32px", marginBottom: "8px" }}>📭</div>
            <p>No records found in this category.</p>
          </div>
        )}
      </div>

    </div>
  );
}