"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { IconX, IconSearch, IconEllipsis } from "@/components/icons";

export default function AdminAccountsPage() {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [viewAcc, setViewAcc] = useState<any>(null);
  const [actionModal, setActionModal] = useState<any>(null);
  const [toast, setToast] = useState<any>(null);

  const fireToast = (type: string, msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const json = await api.get("/api/admin/registrations");
      
      if (json.data) {
        setAccounts(json.data
          .filter((u: any) => u.status !== "Pending")
          .map((u: any) => ({
            id: u.school_id,
            name: `${u.firstname} ${u.lastname}`,
            email: u.email,
            role: u.role,
            department: u.department,
            program: u.program,
            year: u.year,
            status: u.status,
            lastLogin: new Date(u.updated_at).toLocaleDateString(),
            joined: new Date(u.created_at).toLocaleDateString(),
            penaltyCount: u.penalty_count || 0
        })));
      }
    } catch (err) {
      fireToast("err", "Failed to load accounts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const filtered = accounts.filter(a => 
    a.name.toLowerCase().includes(search.toLowerCase()) || 
    a.email.toLowerCase().includes(search.toLowerCase()) ||
    a.id.toLowerCase().includes(search.toLowerCase())
  );

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
    setViewAcc(null);
  };

  const statusBadgeClass = (status: string) => {
    if (status === "Active") return "badge-green";
    if (status === "Locked") return "badge-red";
    return "badge-orange";
  };

  return (
    <>
      <div className="page-layout fadeUp">

        {/* HEADER */}
        <div style={{ marginBottom: 20 }}>
          <div className="page-header">Manage Accounts</div>
          <div className="page-sub">Admin control panel for student users</div>
        </div>

        {/* SEARCH */}
        <div className="search-wrapper" style={{ marginBottom: 18 }}>
          <IconSearch/>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search student name, email, or ID..."/>
        </div>

        {/* TABLE */}
        <div className="data-card">
          <table className="data-table">
            <thead>
              <tr>
                <th>User Details</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} style={{ padding: 60, textAlign: "center" }}>
                    <div className="spinner" style={{ borderColor: "var(--color-surface)", borderTopColor: "var(--color-primary)", margin: "0 auto 12px" }} />
                    Loading accounts...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: 40, textAlign: "center", color: "var(--color-subtext)", fontStyle: "italic", background: "var(--color-surface)" }}>
                    No accounts found.
                  </td>
                </tr>
              ) : (
                filtered.map(a => (
                  <tr key={a.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                        <div>
                          <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--color-primary)" }}>{a.name}</div>
                          <div style={{ fontSize: 10, color: "var(--color-subtext)", fontFamily: "monospace" }}>{a.id}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ color: "var(--color-subtext)" }}>{a.email}</td>
                    <td>
                      <span className={`badge ${a.role === "Admin" ? "badge-blue" : "badge-green"}`}>
                        {a.role}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${statusBadgeClass(a.status)}`}>
                        {a.status}
                      </span>
                    </td>
                    <td style={{ fontSize: 12.5, color: "var(--color-subtext)" }}>{a.joined}</td>
                    <td>
                      <button className="ellipsis-button" onClick={() => setViewAcc(a)}><IconEllipsis/></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="data-footer">
            <span>Total {filtered.length} account{filtered.length !== 1 ? "s" : ""}</span>
          </div>
        </div>
        {/* TOAST NOTIFICATION */}
        {toast && (
          <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: toast.type === "err" ? "var(--color-error)" : "var(--color-primary)", color: "#fff", padding: "12px 22px", borderRadius: 12, fontSize: 13.5, fontWeight: 500, boxShadow: "0 8px 24px rgba(0,0,0,.2)", zIndex: 200, animation: "fadeUp .3s ease", display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap" }}>
            {toast.msg}
          </div>
        )}
      </div>

      {/* ── MODAL: VIEW DETAILS ── */}
      {viewAcc && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(16,42,28,.7)", backdropFilter: "blur(6px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, animation: "fadeIn .2s ease" }}>
          <div className="data-card fadeUp" style={{ maxWidth: 440, width: "100%", padding: 28, borderRadius: 22 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "var(--color-primary)", letterSpacing: 1 }}>Account Profile</div>
              <button onClick={() => setViewAcc(null)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "var(--color-subtext)" }}><IconX/></button>
            </div>

            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--color-primary)" }}>{viewAcc.name}</div>
              <div style={{ fontSize: 13, color: "var(--color-subtext)" }}>{viewAcc.email}</div>
            </div>

            {[
              { label: "School ID", value: <span style={{ fontWeight: 600}}>{viewAcc.id}</span> },
              { label: "Role", value: <span className={`badge ${viewAcc.role === "admin" ? "badge-blue" : "badge-green"}`}>{viewAcc.role}</span> },
              { label: "Department", value: <span style={{ fontWeight: 600}}>{viewAcc.department}</span> },
              { label: "Program", value: <span style={{ fontWeight: 600}}>{viewAcc.program}</span> },
              { label: "Year Level", value: <span style={{ fontWeight: 600}}>{viewAcc.year}</span> },
              { label: "Account Status", value: <span className={`badge ${statusBadgeClass(viewAcc.status)}`}>{viewAcc.status}</span> },
              { label: "Active Penalties", value: <span style={{ fontWeight: 700, color: viewAcc.penaltyCount >= 3 ? "var(--color-error)" : "var(--color-primary)" }}>{viewAcc.penaltyCount} / 3 {viewAcc.penaltyCount >= 3 && "(Auto-Locked)"}</span> },
            ].map(({ label, value }, i, arr) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, paddingBottom: 8, marginBottom: 8, borderBottom: i < arr.length - 1 ? `1px solid var(--color-surface)` : "none" }}>
                <span style={{ color: "var(--color-subtext)" }}>{label}</span>
                {value}
              </div>
            ))}

            <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 8 }}>
              {viewAcc.role === "Student" ? (
                <>
                  {viewAcc.status === "Locked" && (
                    <button className="btn" style={{ background: "#e8a020", boxShadow: "none" }} onClick={() => setActionModal({ type: "unlock", acc: viewAcc })}>
                      Unlock Student
                    </button>
                  )}
                  <button className="btn" style={{ background: "var(--color-error)", boxShadow: "none", marginTop: 0 }} onClick={() => setActionModal({ type: "delete", acc: viewAcc })}>
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
      )}

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