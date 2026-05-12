"use client";

import { api } from "@/lib/api";
import { useState, useEffect } from "react";
import { IconSearch } from "@/components/icons";
import DataTable from "@/components/DataTable";

export default function SigninHistoryPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const TABS = ["All", "Student", "Staff", "Admin"];
  const PER_PAGE = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await api.get(`/api/admin/signin-history`);
        if (res.retCode === "200") setHistoryData(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const filtered = historyData.filter(item => {
    const matchesTab = activeTab === "All" ? true : item.role?.toLowerCase() === activeTab.toLowerCase();
    const matchesSearch =
      item.identifier?.toLowerCase().includes(search.toLowerCase()) ||
      item.school_id?.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const columns = [
    {
      header: "School ID",
      thStyle: { textAlign: "center" as const },
      tdStyle: { textAlign: "center" as const },
      render: (r: any) => r.school_id || "—",
    },
    {
      header: "Identifier",
      thStyle: { textAlign: "center" as const },
      tdStyle: { textAlign: "center" as const },
      render: (r: any) => r.identifier,
    },
    {
      header: "Role",
      thStyle: { textAlign: "center" as const },
      tdStyle: { textAlign: "center" as const },
      render: (r: any) => r.role || "—",
    },
    {
      header: "Status",
      thStyle: { textAlign: "center" as const },
      tdStyle: { textAlign: "center" as const },
      render: (r: any) => (
        <span style={{ color: r.status === "success" ? "green" : "red", fontWeight: 600 }}>
          {r.status === "success" ? "Success" : "Failed"}
        </span>
      ),
    },
    {
      header: "Reason",
      render: (r: any) => r.reason || "—",
    },
    {
      header: "Date",
      thStyle: { textAlign: "center" as const },
      tdStyle: { textAlign: "center" as const },
      render: (r: any) => new Date(r.login_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    {
      header: "Time",
      thStyle: { textAlign: "center" as const },
      tdStyle: { textAlign: "center" as const },
      render: (r: any) => new Date(r.login_at).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }),
    },
  ];

  return (
    <div className="app">
      <div className="page-layout fadeUp">
        <div style={{ marginBottom: 20 }}>
          <div className="page-header">Sign in History</div>
          <div className="page-sub">Log of all sign in attempts</div>
        </div>

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

        <div style={{ display: "flex", marginBottom: 18 }}>
          <div className="search-wrapper" style={{ maxWidth: 300 }}>
            <IconSearch />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search" />
          </div>
        </div>

        <DataTable
          columns={columns}
          data={paginated}
          loading={isLoading}
          emptyText="No sign in history found."
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filtered.length}
          perPage={PER_PAGE}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}