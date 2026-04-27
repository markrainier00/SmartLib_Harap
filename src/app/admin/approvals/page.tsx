"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { IconSearch, IconX } from "@/components/icons";
import Modal from "@/components/Modal";
import LoadingModal from "@/components/LoadingModal";
import DataTable from "@/components/DataTable";
import FloatingTextarea from "@/components/ui/FloatingTextarea";
import { UserDetails } from "@/components/UserDetails";

const PROGRAMS = ["All Programs", "BSCS", "BSIT", "BSCpE", "BSMATH", "BSBA", "BSAcc", "BSECE", "BSCHE", "BSN", "BSCE", "BSBio", "BSPharma"];
const YEARS = ["All Year Levels", "1st", "2nd", "3rd", "4th", "5th"];

export default function AdminApprovalsPage() {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [appProgram, setAppProgram] = useState("All Programs");
  const [appYear, setAppYear] = useState("All Year Levels");

  const [viewApplicant, setViewApplicant] = useState<any>(null);
  const [rejectModal, setRejectModal] = useState<any>(null);
  const [rejectReason, setRejectReason] = useState("");

  const [confirmModal, setConfirmModal] = useState<{
    open: boolean;
    title: string;
    message: React.ReactNode;
    onConfirm: () => void;
    confirmLabel: string;
    confirmColor: string;
  }>({ open: false, title: "", message: "", onConfirm: () => {}, confirmLabel: "Confirm", confirmColor: "" });

  const [isLoadingOpen, setIsLoadingOpen] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Processing...");
  const [isSystemResponseOpen, setSystemResponseOpen] = useState(false);
  const [systemResponse, setSystemResponse] = useState("");

  const closeConfirm = () => setConfirmModal(prev => ({ ...prev, open: false }));

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const json = await api.get("/api/admin/pendingUsers");
      if (json.data) setAccounts(json.data);
    } catch {
      setSystemResponse("Failed to load registrations from server.");
      setSystemResponseOpen(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAccounts(); }, []);

  const filtered = accounts.filter(a => {
    const ms =
      `${a.firstname} ${a.lastname}`.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase()) ||
      a.school_id.toLowerCase().includes(search.toLowerCase());
    const mc = appProgram === "All Programs" || a.program === appProgram;
    const my = appYear === "All Year Levels" || a.year === appYear;
    return ms && mc && my;
  });

  const handleApprove = (a: any) => {
    setConfirmModal({
      open: true,
      title: "Approve Registration",
      message: <>Approve <strong>{a.firstname} {a.lastname}</strong>'s registration?</>,
      confirmLabel: "Approve",
      confirmColor: "bg-primary",
      onConfirm: async () => {
        closeConfirm();
        setViewApplicant(null);
        setLoadingMessage("Approving registration...");
        setIsLoadingOpen(true);
        try {
          const json = await api.put("/api/admin/approve", { school_id: a.school_id, status: "Active" });
          if (json.retCode === "200") {
            setAccounts(prev => prev.filter(x => x.school_id !== a.school_id));
            setSystemResponse("Registration approved successfully.");
          } else {
            setSystemResponse("Failed to approve registration.");
          }
        } catch {
          setSystemResponse("Server error. Try again later.");
        } finally {
          setIsLoadingOpen(false);
          setSystemResponseOpen(true);
        }
      },
    });
  };

  const handleReject = (a: any) => {
    if (!rejectReason.trim()) {
      setSystemResponse("Please provide a reason for rejection.");
      setSystemResponseOpen(true);
      return;
    }
    setConfirmModal({
      open: true,
      title: "Reject Registration",
      message: <>Reject <strong>{a.firstname} {a.lastname}</strong>'s registration? They will be notified.</>,
      confirmLabel: "Reject",
      confirmColor: "bg-error",
      onConfirm: async () => {
        closeConfirm();
        setRejectModal(null);
        setLoadingMessage("Rejecting registration...");
        setIsLoadingOpen(true);
        try {
          const json = await api.put("/api/admin/reject", { school_id: a.school_id, reason: rejectReason });
          if (json.retCode === "200") {
            setAccounts(prev => prev.filter(x => x.school_id !== a.school_id));
            setSystemResponse("Registration rejected successfully.");
            setRejectReason("");
          } else {
            setSystemResponse("Failed to reject registration.");
          }
        } catch {
          setSystemResponse("Server error. Try again later.");
        } finally {
          setIsLoadingOpen(false);
          setSystemResponseOpen(true);
        }
      },
    });
  };

  const columns = [
    {
      header: "Name",
      render: (a: any) => `${a.firstname} ${a.lastname}`
    },
    {
      header: "School ID",
      thStyle: { textAlign: "center" as const },
      tdStyle: { textAlign: "center" as const },
      render: (a: any) => a.school_id
    },
    {
      header: "Email",
      render: (a: any) => <span style={{ color: "var(--color-subtext)" }}>{a.email}</span>,
    },
    {
      header: "Date Joined",
      thStyle: { textAlign: "center" as const },
      tdStyle: { textAlign: "center" as const },
      render: (a: any) => (
        <span style={{ fontSize: 12.5, color: "var(--color-subtext)" }}>
          {new Date(a.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </span>
      ),
    },
    {
      header: "Action",
      thStyle: { textAlign: "center" as const },
      tdStyle: { textAlign: "center" as const },
      render: (a: any) => (
        <a href="#" className="hyperlink text-primary" style={{ textAlign: "center",textDecoration: "underline" }}
          onClick={e => { e.preventDefault(); setViewApplicant(a); setRejectReason(""); }}>
          View Details
        </a>
      ),
    },
  ];

  return (
    <>
    <div className="app">
      <div className="page-layout fadeUp">
        <div style={{ marginBottom: 20 }}>
          <div className="page-header">Registration Approvals</div>
          <div className="page-sub">Review and approve student registration requests</div>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
          <div className="search-wrapper" style={{ maxWidth: 300 }}>
            <IconSearch />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search" />
          </div>
          <select className="pills" value={appProgram} onChange={e => setAppProgram(e.target.value)}>
            {PROGRAMS.map(c => <option key={c}>{c}</option>)}
          </select>
          <select className="pills" value={appYear} onChange={e => setAppYear(e.target.value)}>
            {YEARS.map(y => <option key={y}>{y}</option>)}
          </select>
          {(appProgram !== "All Programs" || appYear !== "All Year Levels" || search) && (
            <button className="pills" onClick={() => { setAppProgram("All Programs"); setAppYear("All Year Levels"); setSearch(""); }}
              style={{ background: "#f5f5f5", borderColor: "#dadada", color: "#777" }}>
              Reset
            </button>
          )}
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={filtered}
          loading={loading}
          emptyText="No pending registrations found."
          currentPage={1}
          totalPages={1}
          totalItems={filtered.length}
          perPage={filtered.length}
          onPageChange={() => {}}
        />
      </div>
    </div>

    {/* View Applicant Modal */}
    {viewApplicant && (
      <UserDetails
        user={viewApplicant}
        mode="view"
        onClose={() => setViewApplicant(null)}
        onApprove={(a) => {
          setViewApplicant(null);
          handleApprove(a);
        }}
        onReject={(a) => {
          setViewApplicant(null);
          setRejectModal(a);
          setRejectReason("");
        }}
      />
    )}
    {rejectModal && (
      <div className="overlay" onClick={() => setRejectModal(null)}>
        <div className="modal" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
                <button className="close" type="button" onClick={() => { setRejectModal(null); setRejectReason(""); }} aria-label="Close modal" ><IconX/></button>
          </div>
          <div className="modal-scroll">
            <div className="page-header">Reject Registration</div>
            <div style={{ textAlign: "center", margin: 20 }}>
              <h1 className="page-sub">You are about to reject <strong>{rejectModal.firstname} {rejectModal.lastname}</strong>'s registration.</h1>
            </div>

            <div style={{ marginTop: 20 }}>
              <FloatingTextarea
                label="Rejection Reason"
                value={rejectReason}
                onChange={e => setRejectReason(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="modal-footer" style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <button className="btn" style={{ background: "var(--color-error)", color: "#fff" }}
              onClick={() => handleReject(rejectModal)}>
              Confirm Rejection
            </button>
          </div>
        </div>
      </div>
    )}

    {/* Confirm Modal */}
    <Modal
      isOpen={confirmModal.open}
      title={confirmModal.title}
      message={confirmModal.message}
      onClose={closeConfirm}
      onConfirm={confirmModal.onConfirm}
      confirmText={confirmModal.confirmLabel}
      confirmColor={confirmModal.confirmColor}
      cancelText="Cancel"
      cancelColor="bg-subtext"
    />

    <Modal isOpen={isSystemResponseOpen} message={systemResponse} onClose={() => setSystemResponseOpen(false)} cancelColor="bg-primary" cancelText="Okay" />
    <LoadingModal isOpen={isLoadingOpen} message={loadingMessage} />
    </>
  );
}