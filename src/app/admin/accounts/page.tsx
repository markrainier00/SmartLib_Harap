"use client";

import React, { useState } from "react";

/* ─── HELPERS & MOCK DATA ───────────────────────────────── */
const INIT_ACCOUNTS = [
  { id: "ACC-0001", name: "Bryan Lumangaya", email: "bryan@smartlib.edu", role: "admin", status: "active", lastLogin: "Mar 06, 2026", joined: "Jan 10, 2026", booksBorrowed: 0 },
  { id: "ACC-0002", name: "Ana Lim", email: "ana@smartlib.edu", role: "admin", status: "active", lastLogin: "Mar 05, 2026", joined: "Jan 12, 2026", booksBorrowed: 0 },
  { id: "ACC-0101", name: "Juan dela Cruz", email: "juan@university.edu", role: "student", status: "active", lastLogin: "Mar 06, 2026", joined: "Feb 10, 2026", booksBorrowed: 12 },
  { id: "ACC-0102", name: "Maria Santos", email: "maria@university.edu", role: "student", status: "locked", lastLogin: "Feb 28, 2026", joined: "Feb 15, 2026", booksBorrowed: 4 },
  { id: "ACC-0103", name: "Sofia Manalo", email: "sofia@university.edu", role: "student", status: "active", lastLogin: "Mar 04, 2026", joined: "Feb 20, 2026", booksBorrowed: 8 },
  { id: "ACC-0104", name: "Pedro Bautista", email: "pedro@university.edu", role: "student", status: "active", lastLogin: "Mar 01, 2026", joined: "Jan 15, 2026", booksBorrowed: 15 },
  { id: "ACC-0105", name: "Mark Villanueva", email: "mark@university.edu", role: "student", status: "locked", lastLogin: "Feb 18, 2026", joined: "Feb 18, 2026", booksBorrowed: 2 },
  { id: "ACC-0106", name: "Luz Garcia", email: "luz@university.edu", role: "student", status: "active", lastLogin: "Mar 05, 2026", joined: "Mar 01, 2026", booksBorrowed: 1 },
];

function Badge({ label, type = "navy" }: any) {
  const m: any = {
    green: ["#e6f7ec", "#2d7a4f"], red: ["#fdeaea", "#c94040"],
    blue: ["#e8f1fd", "#2563eb"], navy: ["#e8ecf5", "#1a2744"],
    purple: ["#f3e8ff", "#7c3aed"], gray: ["#f0ede5", "#64748b"]
  };
  const [bg, fg] = m[type] || m.navy;
  return <span style={{ background: bg, color: fg, padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, display: "inline-block" }}>{label}</span>;
}

function Btn({ children, variant = "navy", onClick, style = {} }: any) {
  const base: any = { border: "none", borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all .18s", display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 20px", ...style };
  const v: any = {
    navy: { background: "#1a2744", color: "#fff", boxShadow: "0 4px 14px rgba(26,39,68,.22)" },
    ghost: { background: "#f0ede5", color: "#1a2744", border: "2px solid #e2dfd6" },
    red: { background: "#fdeaea", color: "#c94040", border: "2px solid #f5c5c5" },
    amber: { background: "#fff8e6", color: "#a06010", border: "2px solid #fde8b0" },
  };
  return <button style={{ ...base, ...v[variant] }} onClick={onClick}>{children}</button>;
}

/* ─── MAIN COMPONENT ────────────────────────────────────── */
export default function AdminAccountsPage() {
  const [accounts, setAccounts] = useState<any[]>(INIT_ACCOUNTS);
  const [accSearch, setAccSearch] = useState("");
  const [accRole, setAccRole] = useState("All");
  const [accStatus, setAccStatus] = useState("All");

  const [viewAcc, setViewAcc] = useState<any>(null);
  const [actionModal, setActionModal] = useState<any>(null); // { type: 'lock' | 'unlock' | 'delete', acc }
  const [toast, setToast] = useState<any>(null);

  const fireToast = (type: string, msg: string) => { setToast({ type, msg }); setTimeout(() => setToast(null), 3000); };

  const filtAccs = accounts.filter(a => {
    const ms = a.name.toLowerCase().includes(accSearch.toLowerCase()) ||
               a.email.toLowerCase().includes(accSearch.toLowerCase()) ||
               a.id.toLowerCase().includes(accSearch.toLowerCase());
    const mr = accRole === "All" || a.role === accRole;
    const mt = accStatus === "All" || a.status === accStatus;
    return ms && mr && mt;
  }).sort((a, b) => {
    if (a.role !== b.role) return a.role === "admin" ? -1 : 1;
    return a.name.localeCompare(b.name);
  });

  const stats = {
    total: accounts.length,
    active: accounts.filter(a => a.status === "active").length,
    locked: accounts.filter(a => a.status === "locked").length,
    admins: accounts.filter(a => a.role === "admin").length,
  };

  const handleAction = () => {
    if (!actionModal) return;
    const { type, acc } = actionModal;
    
    if (type === "delete") {
      if (acc.role === "admin" && stats.admins <= 1) {
        fireToast("err", "Cannot delete the last admin account!");
      } else {
        setAccounts(prev => prev.filter(a => a.id !== acc.id));
        fireToast("ok", "Account permanently deleted.");
      }
    } else if (type === "lock") {
      if (acc.role === "admin") { fireToast("err", "Cannot lock an admin account!"); }
      else {
        setAccounts(prev => prev.map(a => a.id === acc.id ? { ...a, status: "locked" } : a));
        fireToast("ok", "Account has been locked.");
      }
    } else if (type === "unlock") {
      setAccounts(prev => prev.map(a => a.id === acc.id ? { ...a, status: "active" } : a));
      fireToast("ok", "Account restored and unlocked.");
    }
    setActionModal(null);
    setViewAcc(null);
  };

  return (
    <div style={{ animation: "fadeUp .3s ease" }}>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        .row-hover:hover { background: #f7f5f0 !important; }
        .chip { border: 2px solid #e2dfd6; border-radius: 50px; padding: 7px 16px; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600; cursor: pointer; background: #fff; color: #8a8ea8; transition: all .18s; }
        .chip:hover { border-color: #1a2744; color: #1a2744; }
        .chip.active { background: #1a2744; color: #fff; border-color: #1a2744; }
        .action-icon { background: #f0ede5; border: 1.5px solid #e2dfd6; border-radius: 8px; padding: 5px 9px; font-size: 13px; cursor: pointer; transition: all .15s; }
        .action-icon:hover { background: #e2dfd6; }
      `}</style>

      {/* HEADER */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, color: "#1a2744" }}>Manage Accounts</div>
        <div style={{ fontSize: 13, color: "#8a8ea8", marginTop: 2 }}>View, update, or restrict user access to the library</div>
      </div>

      {/* SUMMARY CARDS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginBottom: 22 }}>
        {[
          { label: "Total Users", val: stats.total, color: "#2563eb", bg: "#e8f1fd", icon: "👥" },
          { label: "Active", val: stats.active, color: "#2d7a4f", bg: "#e6f7ec", icon: "✅" },
          { label: "Locked", val: stats.locked, color: "#c94040", bg: "#fdeaea", icon: "🔒" },
          { label: "Admins", val: stats.admins, color: "#7c3aed", bg: "#f3e8ff", icon: "🛡️" },
        ].map((s, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2dfd6", padding: "16px 18px", boxShadow: "0 2px 12px rgba(26,39,68,.06)", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 11, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{s.icon}</div>
            <div>
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, color: s.color, lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: 12, color: "#8a8ea8", marginTop: 2 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* FILTERS */}
      <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200, maxWidth: 350 }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, pointerEvents: "none" }}>🔍</span>
          <input value={accSearch} onChange={e => setAccSearch(e.target.value)} placeholder="Search name, email, or ID…"
            style={{ width: "100%", background: "#fff", border: "2px solid #e2dfd6", borderRadius: 11, padding: "9px 13px 9px 38px", fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: "#1a2744", outline: "none" }} />
        </div>
        
        <select value={accRole} onChange={e => setAccRole(e.target.value)} style={{ background: "#fff", border: "2px solid #e2dfd6", borderRadius: 11, padding: "9px 14px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#1a2744", outline: "none", cursor: "pointer" }}>
          <option value="All">All Roles</option>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>

        <select value={accStatus} onChange={e => setAccStatus(e.target.value)} style={{ background: "#fff", border: "2px solid #e2dfd6", borderRadius: 11, padding: "9px 14px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#1a2744", outline: "none", cursor: "pointer" }}>
          <option value="All">All Status</option>
          <option value="active">Active</option>
          <option value="locked">Locked</option>
        </select>
        
        <div style={{ marginLeft: "auto", fontSize: 12, color: "#8a8ea8" }}>{filtAccs.length} user{filtAccs.length !== 1 ? "s" : ""}</div>
      </div>

      {/* TABLE */}
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2dfd6", boxShadow: "0 2px 12px rgba(26,39,68,.06)", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2.5fr 2fr 1fr 1fr 1.2fr 1.2fr", padding: "11px 20px", background: "#f7f5f0", borderBottom: "1px solid #e2dfd6" }}>
          {["User Details", "Email Address", "Role", "Status", "Last Login", "Actions"].map((h, i) => (
            <div key={i} style={{ fontSize: 10.5, fontWeight: 700, color: "#8a8ea8", letterSpacing: ".06em", textTransform: "uppercase" }}>{h}</div>
          ))}
        </div>

        {filtAccs.length === 0 ? (
          <div style={{ padding: 40, textAlign: "center", color: "#8a8ea8" }}>
            <div style={{ fontSize: 36, marginBottom: 10 }}>📭</div>
            No accounts match your filters
          </div>
        ) : (
          filtAccs.map((a, i) => (
            <div key={a.id} className="row-hover" style={{ display: "grid", gridTemplateColumns: "2.5fr 2fr 1fr 1fr 1.2fr 1.2fr", padding: "12px 20px", borderBottom: i < filtAccs.length - 1 ? "1px solid #f2efe8" : "none", alignItems: "center", transition: "background .15s", background: a.status === "locked" ? "#fdfbfb" : "#fff" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 11, cursor: "pointer" }} onClick={() => setViewAcc(a)}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: a.role === "admin" ? "linear-gradient(135deg,#7c3aed,#3b1f6e)" : "linear-gradient(135deg,#3d8bef,#4caf6e)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14, fontWeight: 700, flexShrink: 0, opacity: a.status === "locked" ? 0.5 : 1 }}>
                  {a.name[0]}
                </div>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: a.status === "locked" ? "#8a8ea8" : "#1a2744" }}>{a.name}</div>
                  <div style={{ fontSize: 10.5, color: "#8a8ea8", fontFamily: "monospace", marginTop: 2 }}>{a.id}</div>
                </div>
              </div>
              <div style={{ fontSize: 13, color: "#64748b" }}>{a.email}</div>
              <div><Badge label={a.role === "admin" ? "🛡️ Admin" : "Student"} type={a.role === "admin" ? "purple" : "navy"} /></div>
              <div><Badge label={a.status === "active" ? "✓ Active" : "🔒 Locked"} type={a.status === "active" ? "green" : "red"} /></div>
              <div style={{ fontSize: 12.5, color: "#64748b" }}>{a.lastLogin}</div>
              
              <div style={{ display: "flex", gap: 6 }}>
                <button className="action-icon" onClick={() => setViewAcc(a)} title="View Details">👁</button>
                {a.role !== "admin" && (
                  <button className="action-icon" style={{ background: a.status === "active" ? "#fff8e6" : "#e6f7ec", borderColor: a.status === "active" ? "#fde8b0" : "#b6e8c4", color: a.status === "active" ? "#a06010" : "#2d7a4f" }} 
                    onClick={() => setActionModal({ type: a.status === "active" ? "lock" : "unlock", acc: a })} 
                    title={a.status === "active" ? "Lock Account" : "Unlock Account"}>
                    {a.status === "active" ? "🔒" : "🔓"}
                  </button>
                )}
                <button className="action-icon" style={{ background: "#fdeaea", borderColor: "#f5c5c5", color: "#c94040" }} onClick={() => setActionModal({ type: "delete", acc: a })} title="Delete Account">🗑</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── MODAL: VIEW ACCOUNT DETAILS ── */}
      {viewAcc && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(26,39,68,.5)", backdropFilter: "blur(6px)", zIndex: 90, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={e => e.target === e.currentTarget && setViewAcc(null)}>
          <div style={{ background: "#fff", borderRadius: 22, padding: "28px", maxWidth: 460, width: "100%", boxShadow: "0 24px 64px rgba(26,39,68,.18)", animation: "fadeUp .25s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#3d8bef" }}>User Profile</div>
              <button onClick={() => setViewAcc(null)} style={{ background: "#f0ede5", border: "none", borderRadius: 8, padding: "5px 9px", cursor: "pointer", fontSize: 15, color: "#8a8ea8" }}>✕</button>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20, padding: "16px", background: "#f7f5f0", borderRadius: 14 }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: viewAcc.role === "admin" ? "linear-gradient(135deg,#7c3aed,#3b1f6e)" : "linear-gradient(135deg,#3d8bef,#4caf6e)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 26, fontWeight: 700, flexShrink: 0, opacity: viewAcc.status === "locked" ? 0.5 : 1 }}>{viewAcc.name[0]}</div>
              <div>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#1a2744" }}>{viewAcc.name}</div>
                <div style={{ fontSize: 13, color: "#8a8ea8", marginTop: 2, fontFamily: "monospace" }}>{viewAcc.id} · {viewAcc.email}</div>
                <div style={{ marginTop: 8, display: "flex", gap: 6 }}>
                  <Badge label={viewAcc.role === "admin" ? "🛡️ Admin" : "Student"} type={viewAcc.role === "admin" ? "purple" : "navy"} />
                  <Badge label={viewAcc.status === "active" ? "✓ Active" : "🔒 Locked"} type={viewAcc.status === "active" ? "green" : "red"} />
                </div>
              </div>
            </div>

            {[
              ["Date Joined", viewAcc.joined],
              ["Last Login", viewAcc.lastLogin],
              ["Total Books Borrowed", viewAcc.booksBorrowed],
            ].map(([k, v], i, arr) => (
              <div key={k as string} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: i < arr.length - 1 ? "1px solid #f2efe8" : "none" }}>
                <span style={{ fontSize: 13, color: "#64748b" }}>{k}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#1a2744" }}>{v}</span>
              </div>
            ))}

            <div style={{ display: "flex", gap: 9, marginTop: 24 }}>
              {viewAcc.role !== "admin" && (
                <Btn variant={viewAcc.status === "active" ? "amber" : "navy"} onClick={() => { setActionModal({ type: viewAcc.status === "active" ? "lock" : "unlock", acc: viewAcc }); setViewAcc(null); }} style={{ flex: 1, justifyContent: "center" }}>
                  {viewAcc.status === "active" ? "🔒 Lock Account" : "🔓 Unlock Account"}
                </Btn>
              )}
              <Btn variant="red" onClick={() => { setActionModal({ type: "delete", acc: viewAcc }); setViewAcc(null); }} style={{ flex: 1, justifyContent: "center" }}>🗑 Delete</Btn>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: ACTION CONFIRMATION (LOCK/DELETE) ── */}
      {actionModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(26,39,68,.5)", backdropFilter: "blur(6px)", zIndex: 91, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={e => e.target === e.currentTarget && setActionModal(null)}>
          <div style={{ background: "#fff", borderRadius: 22, padding: "28px", maxWidth: 400, width: "100%", boxShadow: "0 24px 64px rgba(26,39,68,.18)", animation: "fadeUp .25s ease", textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 10 }}>
              {actionModal.type === "delete" ? "🗑️" : actionModal.type === "lock" ? "🔒" : "🔓"}
            </div>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 19, color: "#1a2744", marginBottom: 6, textTransform: "capitalize" }}>
              {actionModal.type} Account?
            </div>
            <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, marginBottom: 22 }}>
              Are you sure you want to {actionModal.type} <strong style={{ color: "#1a2744" }}>{actionModal.acc.name}</strong>'s account? 
              {actionModal.type === "delete" && " This action cannot be undone and all history will be lost."}
              {actionModal.type === "lock" && " They will not be able to log in or borrow books until unlocked."}
            </p>
            <div style={{ display: "flex", gap: 9, justifyContent: "center" }}>
              <Btn variant={actionModal.type === "delete" ? "red" : actionModal.type === "lock" ? "amber" : "navy"} onClick={handleAction}>
                Yes, {actionModal.type}
              </Btn>
              <Btn variant="ghost" onClick={() => setActionModal(null)}>Cancel</Btn>
            </div>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {toast && (
        <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: toast.type === "err" ? "#c94040" : "#2d7a4f", color: "#fff", padding: "12px 22px", borderRadius: 12, fontSize: 13.5, fontWeight: 500, boxShadow: "0 8px 24px rgba(0,0,0,.2)", zIndex: 200, animation: "fadeUp .3s ease", display: "flex", alignItems: "center", gap: 8 }}>
          {toast.type === "err" ? "⚠️" : "✅"} {toast.msg}
        </div>
      )}
    </div>
  );
}