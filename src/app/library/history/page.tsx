"use client";

import React, { useState, useEffect } from "react";

const TABS = ["All", "Requested", "Borrowed", "Returned", "Overdue"];
const PER_PAGE = 10;

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/transactions/history?school_id=2024-0003");
        const result = await response.json();
        if (response.ok) setHistoryData(result.data || []);
      } catch (err) {
        console.error("Failed to fetch history:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  // Reset to page 1 when tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const filteredData = historyData.filter(item =>
    activeTab === "All" ? true : item.status === activeTab
  );

  const totalPages = Math.ceil(filteredData.length / PER_PAGE);
  const paginated  = filteredData.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const total    = historyData.length;
  const pending  = historyData.filter(i => i.status === "Pending").length;
  const returned = historyData.filter(i => i.status === "Returned").length;
  const active   = historyData.filter(i => i.status === "Borrowed").length;

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Overdue":  return "badge-red";
      case "Borrowed": return "badge-blue";
      case "Pending":  return "badge-orange";
      case "Returned": return "badge-green";
      default:         return "";
    }
  };

  return (
    <div className="page-layout fadeUp">
      <div className="page-header">Library History</div>
      <div className="page-sub">Your complete borrowing activity recorded in the system</div>

      {/* Summary */}
      <div className="summary-grid">
        <div className="sum-card">
          <div className="sum-num" style={{ color: "var(--color-info)" }}>{total}</div>
          <div className="sum-label">Total Logs</div>
        </div>
        <div className="sum-card">
          <div className="sum-num" style={{ color: "#e89940" }}>{pending}</div>
          <div className="sum-label">Pending Request</div>
        </div>
        <div className="sum-card">
          <div className="sum-num" style={{ color: "var(--color-success)" }}>{returned}</div>
          <div className="sum-label">Returned</div>
        </div>
        <div className="sum-card">
          <div className="sum-num" style={{ color: "var(--color-error)" }}>{active}</div>
          <div className="sum-label">Active</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="page-tabs">
        {TABS.map(tab => (
          <button
            key={tab}
            className={`page-tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="data-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Book Title</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} style={{ padding: 40, textAlign: "center", color: "var(--color-subtext)" }}>
                  Loading your records...
                </td>
              </tr>
            ) : paginated.length > 0 ? (
              paginated.map((item: any) => (
                <tr key={item.id}>
                  <td style={{ fontWeight: 600 }}>{item.book_title}</td>
                  <td style={{ color: "var(--color-subtext)", fontSize: 13 }}>
                    {new Date(item.CreatedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </td>
                  <td>
                    <span className={`badge ${getStatusClass(item.status)}`}>{item.status}</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} style={{ padding: 40, textAlign: "center", color: "var(--color-subtext)", fontStyle: "italic", background: "var(--color-surface)" }}>
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="data-footer">
          <span>
            {filteredData.length > 0
              ? `Showing ${(currentPage - 1) * PER_PAGE + 1}–${Math.min(currentPage * PER_PAGE, filteredData.length)} of ${filteredData.length} records`
              : "No records"}
          </span>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                style={{ padding: "4px 10px", borderRadius: 8, border: `1.5px solid var(--color-border)`, background: currentPage === 1 ? "var(--color-surface)" : "#fff", color: currentPage === 1 ? "var(--color-muted)" : "var(--color-primary)", cursor: currentPage === 1 ? "not-allowed" : "pointer", fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, transition: "all 0.2s" }}
              >
                ←
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  style={{ padding: "4px 10px", borderRadius: 8, border: `1.5px solid ${page === currentPage ? "var(--color-primary)" : "var(--color-border)"}`, background: page === currentPage ? "var(--color-primary)" : "#fff", color: page === currentPage ? "#fff" : "var(--color-primary)", cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, transition: "all 0.2s" }}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                style={{ padding: "4px 10px", borderRadius: 8, border: `1.5px solid var(--color-border)`, background: currentPage === totalPages ? "var(--color-surface)" : "#fff", color: currentPage === totalPages ? "var(--color-muted)" : "var(--color-primary)", cursor: currentPage === totalPages ? "not-allowed" : "pointer", fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, transition: "all 0.2s" }}
              >
                →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}