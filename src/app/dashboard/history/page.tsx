"use client";

import React, { useState, useEffect } from "react";

// Helper para sa icons at kulay (Ginalaw ko nang kaunti para sa Status logic)
const getIconAndColor = (status: string) => {
  switch (status) {
    case "Overdue":
      return { icon: "⚠️", bg: "#fdeaea", color: "#c94040" };
    case "Borrowed":
      return { icon: "📖", bg: "#e8f1fd", color: "#3d8bef" };
    case "Pending":
      return { icon: "⏳", bg: "#fef5e6", color: "#e89940" };
    case "Returned":
      return { icon: "↩", bg: "#e6f7ec", color: "#2d7a4f" };
    default:
      return { icon: "🔖", bg: "#f0f2f5", color: "#64748b" };
  }
};

const TABS = ["All", "Pending", "Borrowed", "Returned", "Overdue"];

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 📡 FETCH LIVE DATA FROM GO BACKEND
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // Palitan ang ID ng dynamic user ID mamaya. For now, gamitin natin ang endpoint.
        const response = await fetch("http://localhost:8080/api/transactions/history?school_id=2024-0001");
        const result = await response.json();
        
        if (response.ok) {
          setHistoryData(result.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  // Filter Logic
  const filteredData = historyData.filter(item => {
    if (activeTab === "All") return true;
    return item.status === activeTab;
  });

  // Summary Counts (Dynamic)
  const total = historyData.length;
  const pending = historyData.filter(i => i.status === "Pending").length;
  const active = historyData.filter(i => i.status === "Borrowed").length;
  const returned = historyData.filter(i => i.status === "Returned").length;

  return (
    <div className="page-history" style={{ animation: "fadeUp .3s ease both" }}>
      <style>{`
        .page-history { width: 100%; max-width: 1200px; margin: 0 auto; padding-bottom: 40px; }
        .hist-header { font-family: 'DM Serif Display', serif; font-size: 32px; color: #1a2744; margin-bottom: 6px; }
        .hist-sub { font-size: 15px; color: #8a8ea8; margin-bottom: 28px; }
        .tabs-container { display: flex; border-bottom: 2px solid #f2efe8; margin-bottom: 24px; gap: 8px; overflow-x: auto; }
        .tab-btn { padding: 14px 20px; font-size: 14.5px; font-weight: 600; color: #8a8ea8; background: none; border: none; border-bottom: 3px solid transparent; cursor: pointer; transition: all .2s; white-space: nowrap; }
        .tab-btn.active { color: #1a2744; border-bottom-color: #1a2744; }
        .summary-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 28px; }
        .sum-card { background: #fff; border: 1px solid #e2dfd6; border-radius: 16px; padding: 24px 20px; text-align: center; }
        .sum-num { font-family: 'DM Serif Display', serif; font-size: 36px; line-height: 1; margin-bottom: 6px; }
        .sum-label { font-size: 13px; font-weight: 600; color: #8a8ea8; text-transform: uppercase; }
        .list-container { background: #fff; border: 1px solid #e2dfd6; border-radius: 20px; overflow: hidden; padding: 8px 24px; min-height: 200px; }
        .list-item { display: flex; align-items: center; justify-content: space-between; padding: 20px 0; border-bottom: 1px solid #f2efe8; }
        .li-left { display: flex; align-items: center; gap: 16px; }
        .li-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; }
        .li-title { font-size: 15px; font-weight: 700; color: #1a2744; }
        .badge { padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 700; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
      `}</style>

      <div className="hist-header">Library History</div>
      <div className="hist-sub">Your complete borrowing activity recorded in the system</div>

      {/* TABS */}
      <div className="tabs-container">
        {TABS.map(tab => (
          <button key={tab} className={`tab-btn ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
            {tab}
          </button>
        ))}
      </div>

      {/* SUMMARY CARDS */}
      <div className="summary-grid">
        <div className="sum-card">
          <div className="sum-num" style={{ color: "#3d8bef" }}>{total}</div>
          <div className="sum-label">Total Logs</div>
        </div>
        <div className="sum-card">
          <div className="sum-num" style={{ color: "#e89940" }}>{pending}</div>
          <div className="sum-label">Pending</div>
        </div>
        <div className="sum-card">
          <div className="sum-num" style={{ color: "#2d7a4f" }}>{returned}</div>
          <div className="sum-label">Returned</div>
        </div>
        <div className="sum-card">
          <div className="sum-num" style={{ color: "#c94040" }}>{active}</div>
          <div className="sum-label">Active</div>
        </div>
      </div>

      {/* HISTORY LIST */}
      <div className="list-container">
        {loading ? (
          <div style={{ padding: "40px 0", textAlign: "center", color: "#8a8ea8" }}>Loading your records...</div>
        ) : filteredData.length > 0 ? (
          filteredData.map((item: any) => {
            const style = getIconAndColor(item.status);
            return (
              <div key={item.id} className="list-item">
                <div className="li-left">
                  <div className="li-icon" style={{ background: style.bg, color: style.color }}>
                    {style.icon}
                  </div>
                  <div>
                    <div className="li-title">{item.book_title}</div>
                    <div style={{ fontSize: "12.5px", color: "#8a8ea8" }}>
                      Requested on {new Date(item.CreatedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <span className="badge" style={{ background: style.bg, color: style.color }}>
                  {item.status}
                </span>
              </div>
            );
          })
        ) : (
          <div style={{ padding: "40px 0", textAlign: "center", color: "#8a8ea8" }}>
            <div style={{ fontSize: "32px" }}>📭</div>
            <p>No records found.</p>
          </div>
        )}
      </div>
    </div>
  );
}