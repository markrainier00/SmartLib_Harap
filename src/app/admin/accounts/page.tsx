"use client";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { IconSearch } from "@/components/icons";
import DataTable from "@/components/DataTable";
import { UserDetails } from "@/components/UserDetails";
import Modal from "@/components/Modal";
import LoadingModal from "@/components/LoadingModal";

const PER_PAGE = 10;
const STATUS = ["All Status", "Active", "Locked", "Archived"];

export default function AdminAccountsPage() {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All Status");

  const [selectedUser, setSelectedUser] = useState<any>(null);

  const [confirmModal, setConfirmModal] = useState<{
    open: boolean;
    title: string;
    message: React.ReactNode;
    onConfirm: () => void;
    confirmLabel: string;
    confirmColor: string;
  }>({ open: false, title: "", message: "", onConfirm: () => {}, confirmLabel: "Confirm", confirmColor: "bg-error" });

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

  useEffect(() => { fetchAccounts(); }, []);

  useEffect(() => { setCurrentPage(1); }, [search, statusFilter]);

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
  
  const handleLock = (user: any) => {
    const isLocked = user.status === "Locked";
    setConfirmModal({
      open: true,
      title: isLocked ? "Unlock Account" : "Lock Account",
      message: isLocked
        ? <>Restore access for <b>{user.firstname} {user.lastname}</b>?</>
        : <><b>{user.firstname} {user.lastname}</b> won't be able to log in.</>,
      confirmLabel: isLocked ? "Unlock" : "Lock",
      confirmColor: isLocked ? "bg-warning" : "bg-warning",
      onConfirm: async () => {
        setConfirmModal(prev => ({ ...prev, open: false }));
        setLoadingMessage(isLocked ? "Unlocking account..." : "Locking account...");
        setIsLoadingOpen(true);
        try {
          const newStatus = isLocked ? "Active" : "Locked";
          const json = await api.put("/api/admin/status", { school_id: user.school_id, status: newStatus });
          if (json.retCode === "200") {
            setAccounts(prev => prev.map(x => x.school_id === user.school_id ? { ...x, status: newStatus } : x));
            setSelectedUser(prev => prev ? { ...prev, status: newStatus } : null);
            setSystemResponse(`Account ${newStatus.toLowerCase()} successfully.`);
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
  };

  const handleArchive = (user: any) => {
    setConfirmModal({
      open: true,
      title: "Archive Account",
      message: <>Archive <b>{user.firstname} {user.lastname}</b>'s account? This cannot be undone.</>,
      confirmLabel: "Archive",
      confirmColor: "bg-error",
      onConfirm: async () => {
        setConfirmModal(prev => ({ ...prev, open: false }));
        setLoadingMessage("Archiving account...");
        setIsLoadingOpen(true);
        try {
          const json = await api.put("/api/admin/status", { school_id: user.school_id, status: "Archived" });
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
  };

  const accountsColumn = [
    { header: "School ID", render: (r: any) => r.school_id },
    { header: "Name", render: (r: any) => `${r.firstname} ${r.lastname}` },
    { header: "Email", render: (r: any) => r.email },
    {
      header: "Role",
      thStyle: { textAlign: "center" as const },
      tdStyle: { textAlign: "center" as const },
      render: (r: any) => (
        <span className={`badge ${
          r.role === "Student" ? "badge-blue" :
          r.role === "Staff"   ? "badge-orange" : "badge-red"
        }`}>{r.role}</span>
      ),
    },
    {
      header: "Status",
      thStyle: { textAlign: "center" as const },
      tdStyle: { textAlign: "center" as const },
      render: (r: any) => (
        <span className={`badge ${
          r.status === "Active"  ? "badge-green" :
          r.status === "Locked"  ? "badge-red"   : "badge-orange"
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

      {/* User Details with Lock / Archive actions */}
      <UserDetails
        user={selectedUser}
        mode="view"
        onClose={() => setSelectedUser(null)}
        onLock={handleLock}
        onArchive={handleArchive}
      />

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

      <Modal isOpen={isSystemResponseOpen} message={systemResponse} onClose={() => setSystemResponseOpen(false)} cancelColor="bg-subtext" cancelText="Close" />
      <LoadingModal isOpen={isLoadingOpen} message={loadingMessage} />
    </>
  );
}