"use client";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { IconSearch, IconX } from "@/components/icons";
import DataTable from "@/components/DataTable";
import { UserDetails } from "@/components/UserDetails";
import Modal from "@/components/Modal";
import LoadingModal from "@/components/LoadingModal";
import FloatingTextarea from "@/components/ui/FloatingTextarea";

const PER_PAGE = 10;
const STATUS = ["All Status", "Active", "Locked"];

export default function AdminAccountsPage() {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All Status");

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

  const [confirmModal, setConfirmModal] = useState<{
    open: boolean;
    title: string;
    message: React.ReactNode;
    onConfirm: () => void;
    confirmLabel: string;
    confirmColor: string;
  }>({ open: false, title: "", message: "", onConfirm: () => {}, confirmLabel: "Confirm", confirmColor: "bg-error" });

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingOpen, setIsLoadingOpen] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Processing...");
  const [isSystemResponseOpen, setSystemResponseOpen] = useState(false);
  const [systemResponse, setSystemResponse] = useState("");

  const fetchAccounts = async () => {
    setIsLoading(true);
    try {
      const json = await api.get("/api/admin/studentUsers");
      if (json.retCode === "200") setAccounts(json.data);
      else setSystemResponse("Failed to fetch accounts.");
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchAccounts();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);
  
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
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const accountsColumn = [
    { header: "School ID", render: (r: any) => r.school_id },
    { header: "Name", render: (r: any) => `${r.firstname} ${r.lastname}` },
    { header: "Email", render: (r: any) => r.email },
    {
      header: "Status",
      thStyle: { textAlign: "center" as const },
      tdStyle: { textAlign: "center" as const },
      render: (r: any) => (
        <span className={`badge ${
          r.status === "Active"  ? "badge-green" :
          r.status === "Locked"  ? "badge-orange"   : "badge-red"
        }`}>{r.status}</span>
      ),
    },
    {
      header: "Joined",
      thStyle: { textAlign: "center" as const },
      tdStyle: { textAlign: "center" as const },
      render: (r: any) => new Date(r.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    {
      header: "Action",
      thStyle: { textAlign: "center" as const },
      tdStyle: { textAlign: "center" as const },
      render: (user: any) => (
        <a href="#" className="hyperlink text-primary" style={{ textAlign: "center", textDecoration: "underline" }}
          onClick={(e) => { e.preventDefault(); setSelectedUser(user); }}>
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
            <div className="page-sub">Admin control panel for student users</div>
          </div>

          <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
            <div className="search-wrapper" style={{ flex: 1, maxWidth: 300 }}>
              <IconSearch />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name, email, or ID..." />
            </div>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="pills">
              {STATUS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {(statusFilter !== "All Status" || search) && (
              <button className="pills" onClick={() => { setStatusFilter("All Status"); setSearch(""); }}
                style={{ background: "#f5f5f5", borderColor: "#dadada", color: "#777" }}>
                Reset
              </button>
            )}
          </div>

          <DataTable
            columns={accountsColumn}
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

      {/* Confirm Modal */}
      <Modal
        isOpen={confirmModal.open}
        title={confirmModal.title}
        message={confirmModal.message}
        onClose={() => setConfirmModal(prev => ({ ...prev, open: false }))}
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