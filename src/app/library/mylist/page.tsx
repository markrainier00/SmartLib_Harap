"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/user";
import { api } from "@/lib/api"

const TABS = ["Pending Request", "Borrowed", "Wishlist"];
const PER_PAGE = 10;

export default function MyListPage() {
  const router = useRouter();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Pending");
  const [currentPage, setCurrentPage] = useState(1);
  const { school_id } = useUser();

  useEffect(() => {
    if (!school_id) return;
    const fetchData = async () => {
      try {
        const transaction = await api.get(`/api/transactions/history?school_id=${school_id}`);
        if (transaction === "200") setTransactions(transaction.data || []);
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [school_id]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const getCategory = (title: string) => books.find(b => b.title === title)?.category || "N/A";

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };

  const pendingRequests = transactions.filter(t => t.status === "Pending");
  const activeBorrows   = transactions.filter(t => t.status === "Borrowed");

  const filteredData = activeTab === "Pending" ? pendingRequests : activeBorrows;
  const totalPages   = Math.ceil(filteredData.length / PER_PAGE);
  const paginated    = filteredData.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  if (!school_id) return null;

  return (
    <div className="page-layout fadeUp">
      <div className="page-header">My Books</div>
      <div className="page-sub">Track your book requests and active borrows</div>

      {/* Summary */}
      <div className="summary-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
        <div className="sum-card">
          <div className="sum-num" style={{ color: "#e89940" }}>{pendingRequests.length}</div>
          <div className="sum-label">Pending Requests</div>
        </div>
        <div className="sum-card">
          <div className="sum-num" style={{ color: "var(--color-info)" }}>{activeBorrows.length}</div>
          <div className="sum-label">Active Borrows</div>
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
              <th>Title</th>
              <th>Category</th>
              {activeTab === "Pending" ? <th>Date Requested</th> : <th>Date Approved</th>}
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} style={{ padding: 40, textAlign: "center", color: "var(--color-subtext)" }}>
                  Loading your books...
                </td>
              </tr>
            ) : paginated.length > 0 ? (
              paginated.map((item, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{item.book_title}</td>
                  <td>{getCategory(item.book_title)}</td>
                  <td style={{ color: "var(--color-subtext)", fontSize: 13 }}>
                    {activeTab === "Pending" ? formatDate(item.created_at) : formatDate(item.updated_at)}
                  </td>
                  <td style={{ color: "var(--color-subtext)", fontSize: 13 }}>{formatDate(item.return_date)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} style={{ padding: 40, textAlign: "center", color: "var(--color-subtext)", fontStyle: "italic", background: "var(--color-surface)" }}>
                  {activeTab === "Pending" ? "No pending requests at the moment." : "No currently borrowed books."}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="data-footer">
          <span>
            {filteredData.length > 0
              ? `Showing ${(currentPage - 1) * PER_PAGE + 1}–${Math.min(currentPage * PER_PAGE, filteredData.length)} of ${filteredData.length} records`
              : activeTab === "Pending" ? "No book requests" : "No borrowed books"}
          </span>
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