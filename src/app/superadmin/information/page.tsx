"use client";

import { api } from "@/lib/api"
import React, { useState, useEffect } from "react";
import { IconSearch, IconX } from "@/components/icons";
import DataTable from "@/components/DataTable";
import FloatingTextarea from "@/components/ui/FloatingTextarea";
import Modal from "@/components/Modal";
import LoadingModal from "@/components/LoadingModal";

export default function AdminInformationRequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [isLoadingOpen, setIsLoadingOpen] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Processing...");
  const [systemResponseOpen, setSystemResponseOpen] = useState(false);
  const [systemResponse, setSystemResponse] = useState("");

  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("recent");

  const [requestModal, setRequestModal] = useState<any>(null);
  const [currentUserDetails, setCurrentUserDetails] = useState<any>(null);
  const [rejectReason, setRejectReason] = useState("");

  const PER_PAGE = 10;

  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      const json = await api.get("/api/admin/informationChange");
      if (json.retCode === "200" || json.isSuccess) {
        setRequests(json.data || []);
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

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const closeModal = () => {
    setRequestModal(null);
    setRejectReason("");
    setCurrentUserDetails(null);
  };

  const handleApprove = async (r: any) => {
    setLoadingMessage("Approving request...");
    setIsLoadingOpen(true);
    try {
      const json = await api.put(`/api/admin/approveInformationChange`, { id: r.ID });
      if (json.isSuccess) {
        setSystemResponse("Request approved.");
        await fetchRequests();
        closeModal();
      } else {
        setSystemResponse(json.message || "Failed to approve request.");
      }
    } catch (err) {
      setSystemResponse("Server connection failed.");
    } finally {
      setIsLoadingOpen(false);
      setSystemResponseOpen(true);
    }
  };

  const handleReject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingMessage("Rejecting request...");
    setIsLoadingOpen(true);
    try {
      const json = await api.put(`/api/admin/rejectInformationChange`, {
        id: requestModal.ID,
        reject_reason: rejectReason,
      });
      if (json.isSuccess) {
        setSystemResponse("Request rejected.");
        await fetchRequests();
        closeModal();
      } else {
        setSystemResponse(json.message || "Failed to reject request.");
      }
    } catch (err) {
      setSystemResponse("Server connection failed.");
    } finally {
      setIsLoadingOpen(false);
      setSystemResponseOpen(true);
    }
  };

  // ── Filter ──
  const filtered = requests.filter(r =>
    (r.school_id || "").toLowerCase().includes(search.toLowerCase())
  );

  // ── Sort ──
  const sorted = [...filtered].sort((a, b) => {
    const aDate = new Date(a.CreatedAt).getTime();
    const bDate = new Date(b.CreatedAt).getTime();
    return sortOption === "recent" ? bDate - aDate : aDate - bDate;
  });

  // ── Paginate ──
  const totalPages = Math.ceil(sorted.length / PER_PAGE);
  const paginated = sorted.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const columns = [
    {
      header: "School ID",
      render: (r: any) => r.school_id,
    },
    {
      header: "Change Request",
      render: (r: any) => {
        const fields = [
          r.email && "Email",
          r.department && "Department",
          r.program && "Program",
          r.year && "Year",
        ].filter(Boolean);
        return fields.length > 0 ? fields.join(", ") : "—";
      },
    },
    {
      header: "Date of Request",
      thStyle: { textAlign: "center" as const },
      tdStyle: { textAlign: "center" as const },
      render: (r: any) => new Date(r.CreatedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    {
      header: "Actions",
      thStyle: { textAlign: "center" as const },
      tdStyle: { textAlign: "center" as const },
      render: (r: any) => (
        <div style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
          <a href="#" className="hyperlink text-primary" style={{ textDecoration: "underline" }}
            onClick={async e => {
              e.preventDefault();
              const json = await api.get(`/api/admin/specificUser/${r.school_id}`);
              setCurrentUserDetails(json.data[0] || null);
              setRequestModal({ mode: "view", ...r });
              console.log(json.data);
            }}
          >
            View Details
          </a>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="app">
        <div className="page-layout fadeUp">
          <div style={{ marginBottom: 20 }}>
            <div className="page-header">Information Change Requests</div>
            <div className="page-sub">Review and manage student information update requests</div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", marginBottom: 18, gap: 10 }}>
            <div className="search-wrapper" style={{ flex: 1, maxWidth: 300 }}>
              <IconSearch /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by School ID" />
            </div>
            <select value={sortOption} onChange={e => setSortOption(e.target.value)} className="pills">
              <option value="recent">Recent Request</option>
              <option value="oldest">Oldest Request</option>
            </select>
          </div>

          <DataTable
            columns={columns}
            data={paginated}
            loading={isLoading}
            emptyText="No requests found."
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filtered.length}
            perPage={PER_PAGE}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* ── Modal: View Details ── */}
      {requestModal && requestModal.mode === "view" && (
        <div className="overlay" onClick={closeModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <button className="close" type="button" onClick={closeModal}><IconX /></button>
            </div>
            <div className="modal-scroll">
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <div className="page-header">Information Request</div>
              </div>
              <p style={{ color: "var(--color-primary)", textAlign: "center", fontWeight: "700" }}>Current Details</p>
              <div className="book-preview" style={{ marginBottom: 16 }}>
                <div><strong>Email:</strong> {currentUserDetails?.email || "—"}</div>
                <div><strong>Department:</strong> {currentUserDetails?.department || "—"}</div>
                <div><strong>Program:</strong> {currentUserDetails?.program || "—"}</div>
                <div><strong>Year:</strong> {currentUserDetails?.year || "—"}</div>
              </div>

              <p style={{ color: "var(--color-primary)", textAlign: "center", fontWeight: "700" }}>Change Request</p>
              <div className="book-preview" style={{ marginBottom: 16 }}>
                {requestModal.email && <div><strong>New Email:</strong> {requestModal.email}</div>}
                {requestModal.department && <div><strong>New Department:</strong> {requestModal.department}</div>}
                {requestModal.program && <div><strong>New Program:</strong> {requestModal.program}</div>}
                {requestModal.year && <div><strong>New Year:</strong> {requestModal.year}</div>}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn" onClick={() => handleApprove(requestModal)}>
                Approve
              </button>
              <button className="btn" style={{ background: "var(--color-error)", boxShadow: "none" }}
                onClick={() => setRequestModal({ ...requestModal, mode: "reject" })}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal: Reject Reason ── */}
      {requestModal && requestModal.mode === "reject" && (
        <form onSubmit={handleReject}>
          <div className="overlay" onClick={closeModal}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <button className="close" type="button" onClick={() => setRequestModal({ ...requestModal, mode: "view" })}><IconX /></button>
              </div>
              <div className="modal-scroll">
                <div style={{ textAlign: "center", marginBottom: 20 }}>
                  <div className="page-header">Reject Request</div>
                </div>
                <FloatingTextarea
                  label="Reason for Rejection"
                  value={rejectReason}
                  onChange={e => setRejectReason(e.target.value)}
                  required
                />
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn" style={{ background: "var(--color-error)", boxShadow: "none" }} disabled={isLoadingOpen}>
                  Confirm Reject
                </button>
              </div>
            </div>
          </div>
        </form>
      )}

      <Modal isOpen={systemResponseOpen} message={systemResponse} onClose={() => setSystemResponseOpen(false)} cancelColor="bg-primary" cancelText="Okay" />
      <LoadingModal isOpen={isLoadingOpen} message={loadingMessage} />
    </>
  );
}