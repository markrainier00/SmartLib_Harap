"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MyBooksPage() {
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr || userStr === "undefined" || userStr === "null") {
      router.replace("/");
    } else {
      try {
        const parsed = JSON.parse(userStr);
        if (!parsed || !parsed.id) router.replace("/");
        else setCurrentUser(parsed);
      } catch (e) {
        router.replace("/");
      }
    }
  }, [router]);

  useEffect(() => {
    if (!currentUser) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const txRes = await fetch(`http://localhost:8080/api/transactions/history?school_id=${currentUser.school_id}`);
        const txJson = await txRes.json();

        const bkRes = await fetch("http://localhost:8080/api/books");
        const bkJson = await bkRes.json();

        if (txJson.isSuccess) {
          console.log("📋 TRANSACTIONS:", txJson.data);
          setTransactions(txJson.data || []);
        }
        if (bkJson.isSuccess) setBooks(bkJson.data || []);
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

  const getCategory = (title: string) => {
    const book = books.find(b => b.title === title);
    return book?.category || "N/A";
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };

  // ✅ FIX: Exact match sa backend status values
  const pendingRequests = transactions.filter(t => t.status === "Pending");
  const activeBorrows   = transactions.filter(t => t.status === "Borrowed");

  if (!currentUser) return null;

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", padding: "36px 32px", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        :root {
          --green-dark:    #1B5E35;
          --green-primary: #256D42;
          --green-light:   #D6EDE1;
          --green-pale:    #EBF7F0;
          --green-accent:  #4CAF78;
          --border:        #C3DDD0;
          --text-dark:     #102A1C;
          --text-light:    #7AAD8E;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .sl-page { max-width: 1000px; margin: 0 auto; }
        .sl-section { margin-bottom: 44px; animation: fadeUp 0.4s ease both; }
        .sl-section:nth-child(3) { animation-delay: 0.12s; }

        .sl-section-header {
          display: flex; align-items: center; gap: 10px; margin-bottom: 14px;
        }
        .sl-icon {
          width: 34px; height: 34px;
          background: var(--green-dark);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; font-size: 16px;
        }
        .sl-title { font-size: 20px; font-weight: 700; color: var(--text-dark); letter-spacing: -0.3px; }
        .sl-count {
          margin-left: auto; font-size: 12px; font-weight: 600;
          color: var(--green-primary); background: var(--green-light);
          padding: 3px 10px; border-radius: 20px;
        }
        .sl-divider { border: none; border-top: 1.5px solid var(--border); margin-bottom: 40px; }

        .sl-card {
          background: #fff; border-radius: 16px; overflow: hidden;
          border: 1px solid var(--border);
          box-shadow: 0 2px 16px rgba(27,94,53,0.07);
        }
        .sl-table { width: 100%; border-collapse: collapse; }
        .sl-table thead tr { background: var(--green-dark); }
        .sl-table th {
          padding: 14px 20px; font-size: 11px; font-weight: 700;
          color: rgba(255,255,255,0.85); text-align: left;
          letter-spacing: 0.8px; text-transform: uppercase;
        }
        .sl-table td {
          padding: 14px 20px; font-size: 13.5px;
          color: var(--text-dark); border-top: 1px solid var(--green-pale);
        }
        .sl-table tbody tr { transition: background 0.15s; }
        .sl-table tbody tr:hover { background: var(--green-pale); }
        .sl-title-cell { font-weight: 600; }
        .sl-date { color: var(--text-light); font-size: 13px; }
        .sl-due  { font-size: 13px; font-weight: 400; color: var(--text-light); }

        .sl-empty td {
          padding: 40px; text-align: center;
          color: var(--text-light); font-size: 14px;
          font-style: italic; background: var(--green-pale);
        }
        .sl-footer {
          background: var(--green-pale); padding: 10px 20px;
          display: flex; align-items: center; justify-content: space-between;
          border-top: 1px solid var(--border);
        }
        .sl-footer span { font-size: 12px; color: var(--text-light); font-weight: 500; }
        .sl-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green-accent); display: inline-block; margin-right: 6px; }

        .sl-loading {
          display: flex; align-items: center; justify-content: center;
          gap: 10px; padding: 80px;
          color: var(--text-light); font-size: 14px;
        }
        .sl-spinner {
          width: 18px; height: 18px;
          border: 2px solid var(--green-light);
          border-top-color: var(--green-dark);
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
      `}</style>

      {loading ? (
        <div className="sl-loading">
          <div className="sl-spinner" />
          Loading your books...
        </div>
      ) : (
        <div className="sl-page">

          {/* ── BOOK REQUESTS (Pending) ── */}
          <div className="sl-section">
            <div className="sl-section-header">
              <div className="sl-icon">📋</div>
              <span className="sl-title">Book Requests</span>
              <span className="sl-count">{pendingRequests.length} pending</span>
            </div>
            <div className="sl-card">
              <table className="sl-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Date Requested</th>
                    <th>Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingRequests.length === 0 ? (
                    <tr className="sl-empty"><td colSpan={4}>No pending requests at the moment.</td></tr>
                  ) : (
                    pendingRequests.map((req, i) => (
                      <tr key={i}>
                        <td className="sl-title-cell">{req.book_title}</td>
                        <td>{getCategory(req.book_title)}</td>
                        <td className="sl-date">{formatDate(req.created_at)}</td>
                        <td className="sl-due">{formatDate(req.return_date)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              <div className="sl-footer">
                <span><span className="sl-dot" />Awaiting librarian approval</span>
                <span>{pendingRequests.length} record{pendingRequests.length !== 1 ? "s" : ""}</span>
              </div>
            </div>
          </div>

          <hr className="sl-divider" />

          {/* ── BOOK BORROW (Borrowed) ── */}
          <div className="sl-section">
            <div className="sl-section-header">
              <div className="sl-icon">📚</div>
              <span className="sl-title">Book Borrow</span>
              <span className="sl-count">{activeBorrows.length} active</span>
            </div>
            <div className="sl-card">
              <table className="sl-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Date Approved</th>
                    <th>Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {activeBorrows.length === 0 ? (
                    <tr className="sl-empty"><td colSpan={4}>No currently borrowed books.</td></tr>
                  ) : (
                    activeBorrows.map((borrow, i) => (
                      <tr key={i}>
                        <td className="sl-title-cell">{borrow.book_title}</td>
                        <td>{getCategory(borrow.book_title)}</td>
                        {/* ✅ FIX: updated_at na ngayon mula sa model */}
                        <td className="sl-date">{formatDate(borrow.updated_at)}</td>
                        <td className="sl-due">{formatDate(borrow.return_date)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              <div className="sl-footer">
                <span><span className="sl-dot" />Currently borrowed books</span>
                <span>{activeBorrows.length} record{activeBorrows.length !== 1 ? "s" : ""}</span>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}