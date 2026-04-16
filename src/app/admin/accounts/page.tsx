"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { IconX, IconSearch } from "@/components/icons";
import DataTable from "@/components/DataTable";
import { UserDetails } from "@/components/UserDetails";

const PER_PAGE = 10;

export default function AdminAccountsPage() {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<any>(null);
  const [actionModal, setActionModal] = useState<any>(null);
  const [toast, setToast] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [roleFilter, setRoleFilter] = useState<string>("All");

  const STATUS = ["All Status", "Active", "Locked", "Pending"]
  const ROLES = ["All Roles", "Student", "Staff", "Admin"]

  const fireToast = (type: string, msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchAccounts = async () => {
    setIsLoading(true);
    try {
      const json = await api.get("/api/admin/registrations");
      
      if (json.data) {
        setAccounts(json.data
          .filter((u: any) => u.status !== "Pending"));
      }
    } catch (err) {
      fireToast("err", "Failed to load accounts.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const filtered = accounts.filter((a) => {
    const matchesSearch = a.firstname.toLowerCase().includes(search.toLowerCase()) || 
      a.lastname.toLowerCase().includes(search.toLowerCase()) || 
      a.email.toLowerCase().includes(search.toLowerCase()) ||
      a.school_id.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "All" || a.status === statusFilter;
    const matchesRole = roleFilter === "All" || a.role === roleFilter;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  const handleConfirmedAction = async () => {
    if (!actionModal) return;
    const { type, acc } = actionModal;
    
    try {
      if (type === "delete") {
        const json = await api.delete(`/api/admin/${acc.id}`);
        if (json.retCode === "200") {
          setAccounts(prev => prev.filter(x => x.id !== acc.id));
          fireToast("ok", "Account deleted successfully.");
        } else {
          fireToast("err", "Failed to delete account.");
        }
      } else if (type === "unlock") {
        const json = await api.put("/api/admin/status", { school_id: acc.id, status: "Active" });
      
        if (json.retCode === "200") {
          setAccounts(prev => prev.map(x => x.id === acc.id ? { ...x, status: "Active", penaltyCount: 0 } : x));
          fireToast("ok", `Account unlocked successfully.`);
        } else {
          fireToast("err", `Failed to unlock account.`);
        }
      }
    } catch (err) {
      fireToast("err", "Server error. Try again later.");
    }

    setActionModal(null);
    setModal(null);
  };
  
  useEffect(() => {
    setCurrentPage(1);
  }, []);

  const totalPages   = Math.ceil(filtered.length / PER_PAGE);
  const paginated    = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const accountsColumn = [
      {
        header: "School ID",
        render: (r: any) => r.school_id,
      },
      {
        header: "Name",
        render: (r: any) => `${r.firstname} ${r.lastname}`,
      },
      {
        header: "Email",
        render: (r: any) => r.email,
      },
      {
        header: "Role",
        thStyle: { textAlign: "center" as const },
        tdStyle: { textAlign: "center" as const },
        render: (r: any) => {
          const classColor = r.role === "Student" ? "badge-blue" :
                              r.role === "Staff" ? "badge-orange" :
                              "badge-red";
          return <span className={classColor}>{r.role}</span>;
        },
      },
      {
        header: "Status",
        thStyle: { textAlign: "center" as const },
        tdStyle: { textAlign: "center" as const },
        render: (r: any) => {
          const classColor = r.status === "Active" ? "badge-green" :
                              r.status === "Locked" ? "badge-red" :
                              "badge-orange";
          return <span className={classColor}>{r.status}</span>;
        },
      },
      {
        header: "Joined",
        thStyle: { textAlign: "center" as const },
        tdStyle: { textAlign: "center" as const },
        render: (r: any) => new Date(r.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", }),
      },
      {
        header: "Action",
        thStyle: { textAlign: "center" as const },
        tdStyle: { textAlign: "center" as const },
        render: (user: any) => (
          <a href="#" className="hyperlink text-primary" style={{ textAlign: "center", textDecoration: "underline" }} onClick={(e) => { e.preventDefault(); setModal({mode: "view", user}); }}>
              View Details
          </a>
        ),
      },
  ];

  return (
    <>
      <div className="page-layout fadeUp">
        <div style={{ marginBottom: 20 }}>
          <div className="page-header">Manage Accounts</div>
          <div className="page-sub">Admin control panel for student users</div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", marginBottom: 18, justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 10 }}>
            <div className="search-wrapper" style={{ flex: 1, maxWidth: 300 }}>
              <IconSearch/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search student name, email, or ID..."/>
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="pills">
              {STATUS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="pills">
              {ROLES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          
            {(statusFilter !== "All" || roleFilter !== "All" || search) && (
              <button className="pills" onClick={() => { setStatusFilter("All"); setRoleFilter("All"); setSearch(""); }} style={{ background: "#f5f5f5", borderColor: "#dadada", color: "#777777" }}>
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Table */}
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

        {/* TOAST NOTIFICATION */}
        {toast && (
          <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: toast.type === "err" ? "var(--color-error)" : "var(--color-primary)", color: "#fff", padding: "12px 22px", borderRadius: 12, fontSize: 13.5, fontWeight: 500, boxShadow: "0 8px 24px rgba(0,0,0,.2)", zIndex: 200, animation: "fadeUp .3s ease", display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap" }}>
            {toast.msg}
          </div>
        )}
      </div>

        {/* User Details Panel */}
        {modal && modal.mode === "view" && (
          <UserDetails
            user={modal.user}
            onClose={() => setModal(null)}
            mode="view"
          />
        )}

      {/* ── MODAL: VIEW DETAILS ── */}
      {/* {modal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(16,42,28,.7)", backdropFilter: "blur(6px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, animation: "fadeIn .2s ease" }}>
          <div className="data-card fadeUp" style={{ maxWidth: 440, width: "100%", padding: 28, borderRadius: 22 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "var(--color-primary)", letterSpacing: 1 }}>Account Profile</div>
              <button onClick={() => setModal(null)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "var(--color-subtext)" }}><IconX/></button>
            </div>

            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--color-primary)" }}>{modal.firstname} {modal.lastname}</div>
              <div style={{ fontSize: 13, color: "var(--color-subtext)" }}>{modal.email}</div>
            </div>

            {[
              { label: "School ID", value: <span style={{ fontWeight: 600}}>{modal.id}</span> },
              { label: "Role", value: <span className={`badge ${modal.role === "admin" ? "badge-blue" : "badge-green"}`}>{modal.role}</span> },
              { label: "Department", value: <span style={{ fontWeight: 600}}>{modal.department}</span> },
              { label: "Program", value: <span style={{ fontWeight: 600}}>{modal.program}</span> },
              { label: "Year Level", value: <span style={{ fontWeight: 600}}>{modal.year}</span> },
              { label: "Account Status", value: <span className={`badge ${modal.status}`}>{modal.status}</span> },
              { label: "Active Penalties", value: <span style={{ fontWeight: 700, color: modal.penaltyCount >= 3 ? "var(--color-error)" : "var(--color-primary)" }}>{modal.penaltyCount} / 3 {modal.penaltyCount >= 3 && "(Auto-Locked)"}</span> },
            ].map(({ label, value }, i, arr) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, paddingBottom: 8, marginBottom: 8, borderBottom: i < arr.length - 1 ? `1px solid var(--color-surface)` : "none" }}>
                <span style={{ color: "var(--color-subtext)" }}>{label}</span>
                {value}
              </div>
            ))}

            <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 8 }}>
              {modal.role === "Student" ? (
                <>
                  {modal.status === "Locked" && (
                    <button className="btn" style={{ background: "#e8a020", boxShadow: "none" }} onClick={() => setActionModal({ type: "unlock", acc: modal })}>
                      Unlock Student
                    </button>
                  )}
                  <button className="btn" style={{ background: "var(--color-error)", boxShadow: "none", marginTop: 0 }} onClick={() => setActionModal({ type: "delete", acc: modal })}>
                    Delete Record
                  </button>
                </>
              ) : (
                <div style={{ padding: 12, background: "var(--color-surface)", borderRadius: 10, fontSize: 12, color: "var(--color-subtext)", textAlign: "center" }}>
                  🛡️ Admin accounts can only be managed by Super Admins.
                </div>
              )}
            </div>
          </div>
        </div>
      )} */}

      {/* ── CONFIRMATION MODAL ── */}
      {actionModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(26,39,68,.5)", backdropFilter: "blur(6px)", zIndex: 110, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div className="data-card fadeUp" style={{ maxWidth: 350, width: "100%", padding: 24, borderRadius: 20, textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>{actionModal.type === 'delete' ? '🗑' : '🔓'}</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 20, color: "var(--color-primary)", marginBottom: 8, textTransform: "capitalize" }}>Confirm {actionModal.type}</div>
            <div style={{ fontSize: 13, color: "var(--color-subtext)", marginBottom: 20 }}>
              Are you sure you want to {actionModal.type} the account of <strong style={{ color: "var(--color-primary)" }}>{actionModal.acc.name}</strong>?
              {actionModal.type === 'delete' && (
                <div style={{ color: "var(--color-error)", marginTop: 8, fontWeight: 600 }}>This action cannot be undone.</div>
              )}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                className="btn"
                style={{ background: actionModal.type === "delete" ? "var(--color-error)" : "#e8a020", boxShadow: "none", flex: 1 }}
                onClick={handleConfirmedAction}
              >
                Yes, Confirm
              </button>
              <button
                className="btn"
                style={{ background: "var(--color-surface)", color: "var(--color-primary)", boxShadow: "none", flex: 1 }}
                onClick={() => setActionModal(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}