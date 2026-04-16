"use client";

import { api } from "@/lib/api";
import { useState, useEffect } from "react";
import { IconSearch } from "@/components/icons";
import DataTable from "@/components/DataTable";

/* ─── MAIN COMPONENT ────────────────────────────────────── */
export default function AdminHistoryPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [transactionDetails, setTransactionDetails] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]);

  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const TABS = ["All", "Approve", "Reject", "Borrow", "Return"];
  const PER_PAGE = 10;

  const [viewTx, setViewTx] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
          
        const [historyRes, transactionRes,usersRes, booksRes] = await Promise.all([
          api.get(`/api/transactions/getStaffHistory`),
          api.get(`/api/transactions/all`),
          api.get(`/api/admin/studentUsers`),
          api.getPublic(`/api/books/getBooks`),
        ]);

        if (historyRes.isSuccess) setHistoryData(historyRes.data || []);
        if (transactionRes.retCode === "200") setTransactionDetails(transactionRes.data || []);
        if (usersRes.retCode === "200") setUsers(usersRes.data || []);
        if (booksRes.isSuccess || booksRes.retCode === "200") setBooks(booksRes.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const messages = {
    Request: (title: string, firstname: string, lastname: string) => <>{firstname} {lastname} requested to borrow <strong style={{ color: "var(--color-primary)" }}>{title}</strong>.</>,
    Approve: (title: string, firstname: string, lastname: string) => <>{firstname} {lastname}'s borrow request for <strong style={{ color: "var(--color-primary)" }}>{title}</strong> was approved.</>,
    Reject: (title: string, firstname: string, lastname: string) => <>{firstname} {lastname}'s borrow request for <strong style={{ color: "var(--color-primary)" }}>{title}</strong> was rejected.</>,
    Borrow: (title: string, firstname: string, lastname: string) => <>{firstname} {lastname}'s <strong style={{ color: "var(--color-primary)" }}>{title}</strong> borrow was processed.</>,
    Return: (title: string, firstname: string, lastname: string) => <>{firstname} {lastname}'s <strong style={{ color: "var(--color-primary)" }}>{title}</strong> borrow was marked as returned.</>,
    Late: (title: string, firstname: string, lastname: string) => <>{firstname} {lastname}'s <strong style={{ color: "var(--color-primary)" }}>{title}</strong> borrow was marked as returned late.</>,
  };

  const bookMap = new Map(books.map(b => [b.isbn, b]));
  const userMap = new Map(users.map(u => [u.school_id, u]));
  
 
  const filtered = historyData
    .filter(item => {
      const user = userMap.get(item.school_id);
      return (
        (activeTab === "All" ? true : item.event === activeTab) && (
          item.staff.toLowerCase().includes(search.toLowerCase()) ||
          user.firstname.toLowerCase().includes(search.toLowerCase()) ||
          user.lastname.toLowerCase().includes(search.toLowerCase())
        )
      );
    });

  // Reset to page 1 when tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const messageColumn = [
    {
      header: "Staff",
      thStyle: { textAlign: "center" as const },
      tdStyle: { textAlign: "center" as const },
      render: (r: any) => r.staff,
    },
    {
    header: "Message",
    render: (r: any) => messages[r.event](bookMap.get(r.isbn)?.title, userMap.get(r.school_id)?.firstname, userMap.get(r.school_id)?.lastname),
    },
  ];

  const dateTimeColumn = [
    {
    header: "Date",
    thStyle: { textAlign: "center" as const },
    tdStyle: { textAlign: "center" as const },
    render: (r: any) => new Date(r.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    {
    header: "Time",
    thStyle: { textAlign: "center" as const },
    tdStyle: { textAlign: "center" as const },
    render: (r: any) => new Date(r.date).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true, }),
    },
  ];

  const tabColumn = {
    All:  [
      {
        header: "Event",
        thStyle: { textAlign: "center" as const },
        tdStyle: { textAlign: "center" as const },
        render: (r: any) => r.event === "Late" ? "Return (Late)" : r.event,
      },
    ],
  };
  const historyColumns = [
    ...(activeTab === "All" ? tabColumn.All : []),
    ...messageColumn,
    ...dateTimeColumn,
  ];

  return (
  <>
  <div className="app">
    <div className="page-layout fadeUp">
      <div style={{ marginBottom: 20 }}>
          <div className="page-header">Borrow History</div>
          <div className="page-sub">Log of all library transactions</div>
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

      <div style={{ display: "flex", flexWrap: "wrap", marginBottom: 18, justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 10 }}>
              <div className="search-wrapper" style={{ flex: 1, maxWidth: 300 }}>
                  <IconSearch/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search"/>
              </div>
          </div>
      </div>


      {/* Table */}
      <DataTable
        columns={historyColumns}
        data={paginated}
        loading={isLoading}
        emptyText="No books found."
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filtered.length}
        perPage={PER_PAGE}
        onPageChange={setCurrentPage}
      />
    </div>
  </div>
  </>
  );
}