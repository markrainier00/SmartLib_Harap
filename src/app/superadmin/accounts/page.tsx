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

const PER_PAGE = 10;
const STATUS = ["All Status", "Active", "Locked"];
const ROLES  = ["All Users", "Student", "Staff"];

export default function SuperAdminAccounts() {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [roleFilter, setRoleFilter]     = useState("All Users");

  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [reasonModal, setReasonModal] = useState<{
    open: boolean;
    title: string;
    placeholder: string;
    required: boolean;
    onSubmit: (reason: string) => void;
  }>({ open: false, title: "", placeholder: "", required: true, onSubmit: () => {} });
  const [reasonInput, setReasonInput] = useState("");
  const openReasonModal = (
    title: string,
    placeholder: string,
    required: boolean,
    onSubmit: (reason: string) => void
  ) => {
    setReasonInput("");
    setReasonModal({ open: true, title, placeholder, required, onSubmit });
  };
  
  const [isLoading, setIsLoading] = useState(false);
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
      const filtered = (json.data || []).filter(
        (user) => user.status !== "Pending"
      );

      setAccounts(filtered);
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

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, roleFilter]);

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

  const handleLock = (user: any) => {
    const isLocked = user.status === "Locked";

    if (isLocked) {
      setConfirmModal({
        open: true,
        title: "Unlock Account",
        message: <>Restore access for <b>{user.firstname} {user.lastname}</b>?</>,
        confirmLabel: "Unlock",
        confirmColor: "bg-warning",
        onConfirm: async () => {
          setConfirmModal(prev => ({ ...prev, open: false }));
          setLoadingMessage("Unlocking account...");
          setIsLoadingOpen(true);
          try {
            const json = await api.put("/api/admin/status", { school_id: user.school_id, status: "Active" });
            if (json.retCode === "200") {
              setAccounts(prev => prev.map(x => x.school_id === user.school_id ? { ...x, status: "Active" } : x));
              setSelectedUser(prev => prev ? { ...prev, status: "Active" } : null);
              setSystemResponse("Account unlocked successfully.");
            } else {
              setSystemResponse("Failed to update account status.");
            }
          } catch {
            setSystemResponse("Server error. Try again later.");
          } finally {
            setIsLoadingOpen(false);
            setSystemResponseOpen(true);
          }
        },
      });
      return;
    }

    openReasonModal(
      "Lock Account",
      "Lock Account Reason",
      true,
      (reason) => {
        setReasonModal(prev => ({ ...prev, open: false }));
        setConfirmModal({
          open: true,
          title: "Lock Account",
          message: (
            <>
              <b>{user.firstname} {user.lastname}</b> won't be able to sign in.
            </>
          ),
          confirmLabel: "Lock",
          confirmColor: "bg-warning",
          onConfirm: async () => {
            setConfirmModal(prev => ({ ...prev, open: false }));
            setLoadingMessage("Locking account...");
            setIsLoadingOpen(true);
            try {
              const json = await api.put("/api/admin/status", {
                school_id: user.school_id,
                status: "Locked",
                reason,
              });
              if (json.retCode === "200") {
                setAccounts(prev => prev.map(x => x.school_id === user.school_id ? { ...x, status: "Locked" } : x));
                setSelectedUser(prev => prev ? { ...prev, status: "Locked" } : null);
                setSystemResponse("Account locked successfully.");
              } else {
                setSystemResponse("Failed to update account status.");
              }
            } catch {
              setSystemResponse("Server error. Try again later.");
            } finally {
              setIsLoadingOpen(false);
              setSystemResponseOpen(true);
            }
          },
        });
      }
    );
  };

  const handleArchive = (user: any) => {
    openReasonModal(
      "Archive Account",
      "Archive Account Reason",
      true,
      (reason) => {
        setReasonModal(prev => ({ ...prev, open: false }));
        setConfirmModal({
          open: true,
          title: "Archive Account",
          message: (
            <>
              <b>{user.firstname} {user.lastname}</b> will be disabled.
            </>
          ),
          confirmLabel: "Archive",
          confirmColor: "bg-error",
          onConfirm: async () => {
            setConfirmModal(prev => ({ ...prev, open: false }));
            setLoadingMessage("Archiving account...");
            setIsLoadingOpen(true);
            try {
              const json = await api.put("/api/admin/status", {
                school_id: user.school_id,
                status: "Archived",
                reason,
              });
              if (json.retCode === "200") {
                setAccounts(prev => prev.filter(x => x.school_id !== user.school_id));
                setSelectedUser(null);
                setSystemResponse("Account archived successfully.");
              } else {
                setSystemResponse("Failed to archive account.");
              }
            } catch {
              setSystemResponse("Server error. Try again later.");
            } finally {
              setIsLoadingOpen(false);
              setSystemResponseOpen(true);
            }
          },
        });
      }
    );
  };

  const filtered = accounts.filter((a) => {
    const matchesSearch =
      a.firstname.toLowerCase().includes(search.toLowerCase()) ||
      a.lastname.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase()) ||
      a.school_id.toLowerCase().includes(search.toLowerCase());
      
    const matchesStatus = statusFilter === "All Status" || a.status === statusFilter;
    const matchesRole = roleFilter === "All Users" || a.role === roleFilter;

    return matchesSearch && matchesStatus && matchesRole;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);
  
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
          a.role === "Staff"   ? "badge-red" :
          "text-text"}`
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
        
          {(statusFilter !== "All Status" || roleFilter !== "All Users" || search) && (
            <button className="pills" onClick={() => { setStatusFilter("All Status"); setRoleFilter("All Users"); setSearch(""); }} style={{ background: "#f5f5f5", borderColor: "#dadada", color: "#777777" }}>
              Reset
            </button>
          )}
        </div>
        <button className="btn w-auto px-4 py-2" onClick={() => setShowAddAdmin(true)}>Add Staff</button>
      </div>

      {/* Table */}
      <DataTable
        columns={accountColumns}
        data={paginated}
        loading={isLoading}
        emptyText="No accounts found."
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filtered.length}
        perPage={PER_PAGE}
        onPageChange={setCurrentPage}
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
  />

      {/* Reason Modal */}
      {reasonModal.open && (
        <div className="overlay" onClick={() => setReasonModal(prev => ({ ...prev, open: false }))}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 440 }}>
            <div className="modal-header">
                <button className="close" onClick={() => setReasonModal(prev => ({ ...prev, open: false }))}><IconX/></button>
            </div>
            <div className="modal-scroll">
              <div className="page-header mb-5">{reasonModal.title}</div>

              <FloatingTextarea
                label={reasonModal.placeholder}
                value={reasonInput}
                onChange={e => { setReasonInput(e.target.value); }}
                required
              />
            </div>
            
            <div className="modal-footer">
              <button className="btn bg-error" onClick={() => {reasonModal.onSubmit(reasonInput.trim());}}>{reasonModal.title}</button>
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

  <Modal isOpen={isSystemResponseOpen} message={systemResponse} onClose={() => setSystemResponseOpen(false)} cancelColor="bg-primary" cancelText="Okay" />
  <LoadingModal isOpen={isLoadingOpen} message={loadingMessage} />
  </>
  );
}