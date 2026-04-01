"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@/lib/user";
import { api } from "@/lib/api";

const TABS = ["All", "Active", "Returned", "Overdue"];
const PER_PAGE = 10;

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { school_id } = useUser();

  useEffect(() => {
    if(!school_id) return;
    const fetchHistory = async () => {
      try {
        const json = await api.get(`/api/transactions/history?school_id=${school_id}`);
        if (json.retCode === "200") setHistoryData(json.data || []);
      } catch (err) {
        console.error("Failed to fetch history:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [school_id]);

  // Reset to page 1 when tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const filteredData = historyData.filter(item =>
    activeTab === "All" ? true : item.status === activeTab
  );

  const totalPages = Math.ceil(filteredData.length / PER_PAGE);
  const paginated  = filteredData.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Overdue":  return "badge-red";
      case "Borrowed": return "badge-blue";
      case "Pending":  return "badge-orange";
      case "Returned": return "badge-green";
      case "Rejected": return "badge-red";
      default:         return "";
    }
  };

  return (
    <div className="page-layout fadeUp">
      <div className="page-header">Library History</div>
      <div className="page-sub">Your complete transaction history recorded in the system</div>

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
              <th>Author</th>
              {activeTab === "All" && <><th>Status</th><th>Date Borrowed</th><th>Return Date</th></>}
              {activeTab === "Active" && <><th>Date Borrowed</th><th>Expected Return Date</th></>}
              {activeTab === "Returned" && <><th>Date Borrowed</th><th>Date Returned</th></>}
              {activeTab === "Overdue" && <><th>Expected Return Date</th><th>Date Returned</th></>}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} style={{ padding: 40, textAlign: "center", color: "var(--color-subtext)" }}>
                  Loading your records...
                </td>
              </tr>
            ) : paginated.length > 0 ? (
              paginated.map((item: any, index) => (
                <tr key={index}>
                  <td style={{ fontWeight: 600 }}>{item.book_title}</td>
                  <td style={{ color: "var(--color-subtext)", fontSize: 13 }}>{item.author}</td>
                  {activeTab === "All" && (
                    <>
                      <td><span className={`badge ${getStatusClass(item.status)}`}>{item.status}</span></td>
                      <td style={{ color: "var(--color-subtext)", fontSize: 13 }}>{item.borrow_date ? new Date(item.borrow_date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "—"}</td>
                      <td style={{ color: "var(--color-subtext)", fontSize: 13 }}>{item.return_date ? new Date(item.return_date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "—"}</td>
                    </>
                  )}
                  {activeTab === "Active" && (
                    <>
                      <td style={{ color: "var(--color-subtext)", fontSize: 13 }}>{item.borrow_date ? new Date(item.borrow_date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "—"}</td>
                      <td style={{ color: "var(--color-subtext)", fontSize: 13 }}>{item.return_date ? new Date(item.return_date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "—"}</td>
                    </>
                  )}
                  {activeTab === "Returned" && (
                    <>
                      <td style={{ color: "var(--color-subtext)", fontSize: 13 }}>{item.borrow_date ? new Date(item.borrow_date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "—"}</td>
                      <td style={{ color: "var(--color-subtext)", fontSize: 13 }}>{item.date_returned ? new Date(item.date_returned).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "—"}</td>
                    </>
                  )}
                  {activeTab === "Overdue" && (
                    <>
                      <td style={{ color: "var(--color-subtext)", fontSize: 13 }}>{item.return_date ? new Date(item.return_date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "—"}</td>
                      <td style={{ color: "var(--color-subtext)", fontSize: 13 }}>{item.date_returned ? new Date(item.date_returned).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "—"}</td>
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ padding: 40, textAlign: "center", color: "var(--color-subtext)", fontStyle: "italic", background: "var(--color-surface)" }}>
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