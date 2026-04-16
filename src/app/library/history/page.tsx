"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/lib/user";
import { api } from "@/lib/api";
import DataTable from "@/components/DataTable";

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isLoading, setIsLoading] = useState(false);
  const { school_id } = useUser();
  const [books, setBooks] = useState<any[]>([]);
  const [transactionDetails, setTransactionDetails] = useState<any[]>([]);
  const [systemResponse, setSystemResponse] = useState("");

  const TABS = ["All", "Approve", "Reject", "Borrow", "Return"];
  const PER_PAGE = 10;

  useEffect(() => {
    if(!school_id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
          
        const [historyRes, transactionRes, booksRes] = await Promise.all([
          api.get(`/api/transactions/history/${school_id}`),
          api.get(`/api/transactions/details/${school_id}`),
          api.getPublic(`/api/books/getBooks`),
        ]);

        if (historyRes.retCode === "200") setHistoryData(historyRes.data || []);
        if (transactionRes.retCode === "200") setTransactionDetails(transactionRes.data || []);
        if (booksRes.isSuccess) setBooks(booksRes.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [school_id]);

  const filtered = historyData.filter(item =>
    activeTab === "All" ? true : item.event === activeTab
  );
  // Reset to page 1 when tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const bookMap = new Map(books.map(b => [b.isbn, b]));
  const transactionMap = new Map(transactionDetails.map((t) => [t.id, t]));

  const messages = {
    Request: (title: string) => <>You requested to borrow <strong style={{ color: "var(--color-primary)" }}>{title}</strong>.</>,
    Approve: (title: string) => <>Your borrow request for <strong style={{ color: "var(--color-primary)" }}>{title}</strong> was approved.</>,
    Reject: (title: string) => <>Your borrow request for <strong style={{ color: "var(--color-primary)" }}>{title}</strong> was rejected.</>,
    Borrow: (title: string) => <>You borrowed <strong style={{ color: "var(--color-primary)" }}>{title}</strong>.</>,
    Return: (title: string) => <>You returned <strong style={{ color: "var(--color-primary)" }}>{title}</strong>.</>,
    Late: (title: string) => <>You returned <strong style={{ color: "var(--color-primary)" }}>{title}</strong>.</>,
  };

  const messageColumn = [
    {
    header: "Message",
    render: (r: any) => messages[r.event](bookMap.get(r.isbn)?.title),
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
    Reject: [
      {
        header: "Reason",
        render: (r: any) => {
          const reason = transactionMap.get(r.transaction_id);
          return reason?.reject_reason ? reason.reject_reason : <em>No Reason Provided</em>
        }
      }
    ],
    Return:  [
      {
        header: "Violation",
        render: (r: any) => {
        const transaction = transactionMap.get(r.transaction_id);

        return transaction?.violation ? transaction.violation : <em>No Violation</em>
      },
      },
    ],
  };
  const historyColumns = [
    ...messageColumn,
    ...(activeTab === "All" ? tabColumn.All : []),
    ...(activeTab === "Reject" ? tabColumn.Reject : []),
    ...(activeTab === "Return" ? tabColumn.Return : []),
    ...dateTimeColumn,
  ];

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
  );
}