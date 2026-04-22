"use client";

import { api } from "@/lib/api";
import { useState, useEffect } from "react";
import DataTable from "@/components/DataTable";
import { IconSearch, IconX } from "@/components/icons";
import Modal from "@/components/Modal";
import LoadingModal from "@/components/LoadingModal";
import FloatingInput from "@/components/ui/FloatingInput";
import FloatingTextarea from "@/components/ui/FloatingTextarea";
import { UserDetails } from "@/components/UserDetails";

const STATUS = ["All Status", "Active", "Pending", "Locked"];
const ROLES  = ["All Roles", "Student", "Staff", "Admin"];

export default function SuperAdminAccounts() {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [roleFilter, setRoleFilter]     = useState("All Roles");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectModal, setRejectModal] = useState<any>(null);
  
  const [isLoadingOpen, setIsLoadingOpen] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Processing...");
  const [isSystemResponseOpen, setSystemResponseOpen] = useState(false);
  const [systemResponse, setSystemResponse] = useState("");

  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [adminForm, setAdminForm] = useState({ firstname: "", lastname: "", email: "" });
  
  const [confirmModal, setConfirmModal] = useState<{
    open: boolean;
    title: string;
    message: string | React.ReactNode;
    onConfirm: () => void;
    confirmLabel: string;
    confirmColor: string;
  }>({ open: false, title: "", message: "", onConfirm: () => {}, confirmLabel: "Confirm", confirmColor: "" });

  const closeConfirm = () => setConfirmModal(prev => ({ ...prev, open: false }));

  const fetchAccounts = async () => {
    setIsLoading(true);
    try {
      const json = await api.get("/api/admin/allUsers");
      
      if (json.retCode === "200") {
        setAccounts(json.data);
      }
    } catch (error) {
      setSystemResponse("Failed to connect to server.");
      setSystemResponseOpen(true);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleAddAdminSubmit = async () => {
    setLoadingMessage("Processing staff registration...");
    setIsLoadingOpen(true);
    try {
      const json = await api.post("/api/admin/addStaff", adminForm);
      if (json.retCode === "201") {
        setSystemResponse("Staff registered successfully.");
        setAdminForm({ firstname: "", lastname: "", email: "" });
        setShowAddAdmin(false);
        fetchAccounts();
      } else {
        setSystemResponse(json.message);
      }
    } catch {
      setSystemResponse("Failed to connect to server.");
    } finally {
      setIsLoadingOpen(false);
      setSystemResponseOpen(true);
    }
  };

  const handleLock = (a: any) => {
    const isLocked = a.status === "Locked";
    setConfirmModal({
      open: true,
      title: isLocked ? "Unlock Account" : "Lock Account",
      message: isLocked
        ? <>Restore access for <b>{a.firstname} {a.lastname}</b>?</>
        : <><b>{a.firstname} {a.lastname}</b> won't be able to log in.</>,
      confirmLabel: isLocked ? "Unlock" : "Lock",
      confirmColor: "bg-warning",
      onConfirm: async () => {
        setConfirmModal(prev => ({ ...prev, open: false }));
        const newStatus = isLocked ? "Active" : "Locked";
        setLoadingMessage(isLocked ? "Unlocking account..." : "Locking account...");
        setIsLoadingOpen(true);
        try {
          const json = await api.put("/api/admin/status", { school_id: a.school_id, status: newStatus });
          if (json.retCode === "200") {
            setAccounts(prev => prev.map(x => x.school_id === a.school_id ? { ...x, status: newStatus } : x));
            setSelectedUser((prev: any) => prev ? { ...prev, status: newStatus } : null);
            setSystemResponse(`Account ${newStatus.toLowerCase()} successfully.`);
          } else {
            setSystemResponse("Failed to update account status.");
          }
        } catch {
          setSystemResponse("Failed to connect to server.");
        } finally {
          setIsLoadingOpen(false);
          setSystemResponseOpen(true);
        }
      },
    });
  };

  const handleArchive = (a: any) => {
    setConfirmModal({
      open: true,
      title: "Archive Account",
      message: <>Archive <b>{a.firstname} {a.lastname}</b>'s account? This will disable their access.</>,
      confirmLabel: "Archive",
      confirmColor: "bg-error",
      onConfirm: async () => {
        setConfirmModal(prev => ({ ...prev, open: false }));
        setLoadingMessage("Archiving account...");
        setIsLoadingOpen(true);
        try {
          const json = await api.put("/api/admin/status", { school_id: a.school_id, status: "Archived" });
          if (json.retCode === "200") {
            setAccounts(prev => prev.filter(x => x.school_id !== a.school_id));
            setSelectedUser(null);
            setSystemResponse("Account archived successfully.");
          } else {
            setSystemResponse("Failed to archive account.");
          }
        } catch {
          setSystemResponse("Failed to connect to server.");
        } finally {
          setIsLoadingOpen(false);
          setSystemResponseOpen(true);
        }
      },
    });
  };

  const handleApprove = (a: any) => {
    setConfirmModal({
      open: true,
      title: "Approve Registration",
      message: <>Approve <strong>{a.firstname} {a.lastname}</strong>'s registration?</>,
      confirmLabel: "Approve",
      confirmColor: "bg-primary",
      onConfirm: async () => {
        closeConfirm();
        setSelectedUser(null);
        setLoadingMessage("Approving registration...");
        setIsLoadingOpen(true);
        try {
          const json = await api.put("/api/admin/approve", { school_id: a.school_id });
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
    setRejectModal(a);
    setSelectedUser(null);
  };

  const handleRejectConfirm = () => {
    if (!rejectReason.trim()) {
      setSystemResponse("Please provide a reason for rejection.");
      setSystemResponseOpen(true);
      return;
    }
    const a = rejectModal;
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

  const filteredAccounts = accounts.filter(a =>
    (statusFilter === "All Status" || a.status === statusFilter) &&
    (roleFilter   === "All Roles" || a.role   === roleFilter) &&
    (!search || (
      `${a.firstname} ${a.lastname}`.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase()) ||
      a.school_id.toLowerCase().includes(search.toLowerCase())
    ))
  );

  const accountColumns = [
    {
      header: "Name",
      render: (a: any) => `${a.firstname} ${a.lastname}`,
    },
    {
      header: "School ID",
      thStyle: { textAlign: "center" as const },
      tdStyle: { textAlign: "center" as const },
      render: (a: any) => a.school_id,
    },
    {
      header: "Email",
      render: (a: any) => a.email,
    },
    {
      header: "Role",
      thStyle: { textAlign: "center" as const },
      tdStyle: { textAlign: "center" as const },
      render: (a: any) => (
        <span className={ `badge ${
          a.role === "Student" ? "badge-blue" :
          a.role === "Staff"   ? "badge-orange" :
          "badge-red"}`
        }>
          {a.role}
        </span>
      ),
    },
    {
      header: "Status",
      thStyle: { textAlign: "center" as const },
      tdStyle: { textAlign: "center" as const },
      render: (a: any) => (
        <span className={`badge ${
          a.status === "Active"  ? "badge-green"  :
          a.status === "Pending" ? "badge-orange" :
          "badge-red"
        }`}>
          {a.status}
        </span>
      ),
    },
    {
      header: "Joined",
      thStyle: { textAlign: "center" as const },
      tdStyle: { textAlign: "center" as const },
      render: (r: any) => new Date(r.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    {
      header: "Actions",
      thStyle: { textAlign: "center" as const },
      tdStyle: { textAlign: "center" as const },
      render: (a: any) => (
        <a href="#" className="hyperlink text-primary" style={{ textDecoration: "underline" }}
          onClick={(e) => { e.preventDefault(); setSelectedUser(a); }}>
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
        <div className="page-header">Manage Accounts</div>
        <div className="page-sub">Administrator control panel for student and staff users.</div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", marginBottom: 18, justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 10 }}>
          <div className="search-wrapper" style={{ flex: 1, maxWidth: 300 }}>
            <IconSearch/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search"/>
          </div>
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="pills">
            {ROLES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="pills">
            {STATUS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        
          {(statusFilter !== "All Status" || roleFilter !== "All Roles" || search) && (
            <button className="pills" onClick={() => { setStatusFilter("All Status"); setRoleFilter("All Roles"); setSearch(""); }} style={{ background: "#f5f5f5", borderColor: "#dadada", color: "#777777" }}>
              Reset
            </button>
          )}
        </div>
        <button className="btn w-auto px-4 py-2" onClick={() => setShowAddAdmin(true)}>Add Staff</button>
      </div>

      {/* Table */}
      <DataTable
        columns={accountColumns}
        data={filteredAccounts}
        loading={isLoading}
        emptyText="No accounts found."
        currentPage={1}
        totalPages={1}
        totalItems={filteredAccounts.length}
        perPage={filteredAccounts.length}
        onPageChange={() => {}}
      />
    </div>
  </div>
  {/* ── MODALS ── */}
  {showAddAdmin && (
    <div className="overlay" onClick={() => setShowAddAdmin(false)}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <button className="close" onClick={() => setShowAddAdmin(false)} ><IconX/></button>
        </div>
        <div className="modal-scroll">
          <div className="page-header">Create Staff Account</div>
          <div style={{ marginTop: "20px", marginBottom: "20px", textAlign: "right" }}>
              <FloatingInput label="First Name" type="text" value={adminForm.firstname} onChange={e => setAdminForm({ ...adminForm, firstname: e.target.value })} required/>
              <FloatingInput label="Last Name" type="text" value={adminForm.lastname} onChange={e => setAdminForm({ ...adminForm, lastname: e.target.value })} required/>
              <FloatingInput label="Email Address" type="email" value={adminForm.email} onChange={e => setAdminForm({ ...adminForm, email: e.target.value })} required/>
          </div>
        </div>
        <div className="modal-footer" style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button className="btn" style={{ background: "var(--color-primary)", color: "#fff" }} onClick={handleAddAdminSubmit}>
            Create Account
          </button>
        </div>
      </div>
    </div>
  )}

  <UserDetails
    user={selectedUser}
    mode="view"
    onClose={() => setSelectedUser(null)}
    onLock={handleLock}
    onArchive={handleArchive}
    onApprove={handleApprove}
    onReject={handleReject}
  />

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

  <Modal isOpen={isSystemResponseOpen} message={systemResponse} onClose={() => setSystemResponseOpen(false)} cancelColor="bg-subtext" cancelText="Close" />
  <LoadingModal isOpen={isLoadingOpen} message={loadingMessage} />
  </>
  );
}