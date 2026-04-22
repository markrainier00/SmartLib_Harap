"use client";

import { api } from "@/lib/api"
import { useUser } from "@/lib/user"
import React, { useState, useEffect } from "react";
import { IconSearch, IconX } from "@/components/icons";
import DataTable from "@/components/DataTable";
import FloatingInput from "@/components/ui/FloatingInput";
import FloatingTextarea from "@/components/ui/FloatingTextarea";
import Modal from "@/components/Modal";
import LoadingModal from "@/components/LoadingModal";

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AdminRequestsPage() {
  const { fullName }= useUser();
  const [requests, setRequests] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  
  const [isLoadingOpen, setIsLoadingOpen] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Processing...");
  const [systemResponseOpen, setSystemResponseOpen] = useState(false);
  const [systemResponse, setSystemResponse] = useState("");

  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("oldest");

  const [requestModal, setRequestModal] = useState<any>(null);
  const [rejectRequestReason, setRejectRequestReason] = useState("");

  const PER_PAGE = 10;

  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      const json = await api.getPublic("/api/transactions/getBookBorrowRequest");
      if (json.retCode === "200" || json.isSuccess) {
        setRequests(json.data);
      } else {
        setRequests([]);
      }
    } catch (err) {
      console.error("Failed to fetch requests", err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();

    const requestMode = requestModal.mode === "approve";
    setLoadingMessage(
      requestMode 
        ? "Processing book borrow request approval..." 
        : "Processing book borrow request rejection..."
    );
    setIsLoadingOpen(true);

    try {
      let json;

      if (requestMode) {
        json = await api.put(`/api/transactions/approveBorrowRequest`, {
          id: requestModal.id,
          school_id: requestModal.school_id,
          isbn: requestModal.isbn,
          staff: fullName,
        });
      } else {
        json = await api.put(`/api/transactions/rejectBorrowRequest`, {
          id: requestModal.id,
          school_id: requestModal.school_id,
          isbn: requestModal.isbn,
          reject_reason: rejectRequestReason,
          staff: fullName,
        });
      }

      if (json.retCode === "200") {
        setSystemResponse(
          requestMode 
            ? "Book borrow request approved."
            : "Book borrow request rejected."
        );
        await fetchRequests();
        setRequestModal(null);
      } else {
        setSystemResponse( json.message || "Failed to process the book borrow request." );
      }
    } catch (err) {
      setSystemResponse("Server connection failed.");
    } finally {
      setIsLoadingOpen(false);
      setSystemResponseOpen(true);
    }
    
  };

  // ── Filter ──
  const filtered = requests.filter(r => {
    const matchesSearch = (r.isbn || "").toLowerCase().includes(search.toLowerCase()) || (r.school_id || "").includes(search);
    return matchesSearch;
  });
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // ── Sort ──
  const sortedRequests = [...filtered].sort((a, b) => {
    const aCreated = new Date(a.created_at).getTime();
    const bCreated = new Date(b.created_at).getTime();
    const aPickup = new Date(a.pickup_date).getTime();
    const bPickup = new Date(b.pickup_date).getTime();

    if (sortOption === "oldest") {
      return aCreated - bCreated;
    }
    else if (sortOption === "recent") {
      return bCreated - aCreated;
    }  
    else if (sortOption === "pickupSoon") {
      return aPickup - bPickup;
    } 
    else if (sortOption === "pickupLate") {
      return bPickup - aPickup;
    } 
    else {
      return 0;
    }
  });

  // ── Paginate ──
  const totalPages   = Math.ceil(sortedRequests.length / PER_PAGE);
  const paginated    = sortedRequests.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const requestColumns = [
    {
      header: "School ID",
      render: (r: any) => r.school_id,
    },
    {
      header: "Book ISBN",
      render: (r: any) => r.isbn,
    },
    {
      header: "Date of Request",
      thStyle: { textAlign: "center" as const },
      tdStyle: { textAlign: "center" as const },
      render: (r: any) => new Date(r.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", }),
    },
    {
      header: "Pickup Date",
      thStyle: { textAlign: "center" as const },
      tdStyle: { textAlign: "center" as const },
      render: (r: any) => new Date(r.pickup_date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", }),
    },
    {
      header: "Actions",
      thStyle: { textAlign: "center" as const },
      tdStyle: { textAlign: "center" as const },
      render: (r) => (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", justifyContent: "center" }}>
          <button className="badge" style={{ background: "var(--color-success)", color: "#ffffff", cursor: "pointer", fontWeight: "300" }}
            onClick={() => setRequestModal({ mode: "approve", ...r })}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#1b7d3c";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--color-success)";
            }}
          >
            Approve
          </button>
          <button className="badge" style={{ background: "var(--color-error)", color: "#ffffff", cursor: "pointer", fontWeight: "300" }}
            onClick={() => {
              setRequestModal({ mode: "reject", ...r });
              setRejectRequestReason("");
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#de3535";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--color-error)";
            }}

          >
            Reject
          </button>
        </div>
      )
    },
  ];

  return (
    <>
      <div className="app">
        <div className="page-layout fadeUp">
          <div style={{ marginBottom: 20 }}>
            <div className="page-header">Book Requests</div>
            <div className="page-sub">Manage student book borrow requests</div>
          </div>
          
          {/* FILTERS */}
          <div style={{ display: "flex", flexWrap: "wrap", marginBottom: 18, gap: 10 }}>
            <div className="search-wrapper" style={{ flex: 1, maxWidth: 300 }}>
              <IconSearch/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search"/>
            </div>
            <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="pills">
              <option value="oldest">Oldest Request</option>
              <option value="recent">Recent Request</option>
              <option value="pickupSoon">Soonest Pickup</option>
              <option value="pickupLate">Latest Pickup</option>
            </select>
          </div>

          {/* TABLE */}
          <DataTable
            columns={requestColumns}
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

      {/* ── Modal: Approve / Reject ── */}
      {requestModal && (
        <form onSubmit={handleRequest}>
          <div className="overlay" onClick={() => setRequestModal(null)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <button className="close" onClick={() => setRequestModal(null)} ><IconX/></button>
              </div>
              <div className="modal-scroll">
                <div style={{ textAlign: "center" }}>
                  <div className="page-header">{requestModal.mode === "approve" ? "Approve" : "Reject"} Borrow Request</div>
                </div>
                <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                  <div className="form-row">
                    <FloatingInput label="School ID" type="text" value={requestModal.school_id}/>
                    <FloatingInput label="Book ISBN" type="text" value={requestModal.isbn}/>
                  </div>
                  <div className="form-row">
                    <FloatingInput label="Date of Request" type="text" value={requestModal?.created_at
                          ? new Date(requestModal.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", }) 
                          : "-"}/>
                    <FloatingInput label="Date of Pickup" type="text" value={requestModal?.created_at
                          ? new Date(requestModal.pickup_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", }) 
                          : "-"}/>
                  </div>
                </div>
                {requestModal.mode === "reject" && (
                  <FloatingTextarea
                    label="Reason for Rejection"
                    value={rejectRequestReason}
                    onChange={e => setRejectRequestReason(e.target.value)}
                    required
                  />
                )}
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn" disabled={isLoadingOpen}>
                  {requestModal.mode === "approve" ? "Approve" : "Reject"}
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
          
      {/* Modal for displaying messages */}
      <Modal isOpen={systemResponseOpen} message={systemResponse} onClose={() => setSystemResponseOpen(false)} cancelColor="bg-subtext" cancelText="Close"/>
      <LoadingModal isOpen={isLoadingOpen} message={loadingMessage} />
    </>
  );
}