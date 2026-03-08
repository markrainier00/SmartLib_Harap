"use client";

import React, { useState } from "react";

/* ─── MOCK DATA ────────────────────────────────────────── */
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
  return <span style={{ background: bg, color: fg, padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>{label}</span>;
}

function Btn({ children, variant = "navy", onClick, style = {} }: any) {
  const base: any = { border: "none", borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all .18s", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "10px 20px", ...style };
  const v: any = {
    navy: { background: "#1a2744", color: "#fff" },
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
  const [viewAcc, setViewAcc] = useState<any>(null);
  const [actionModal, setActionModal] = useState<any>(null); // { type: 'lock'|'delete', acc }

  const filtAccs = accounts.filter(a => 
    a.name.toLowerCase().includes(accSearch.toLowerCase()) || 
    a.email.toLowerCase().includes(accSearch.toLowerCase()) ||
    a.id.toLowerCase().includes(accSearch.toLowerCase())
  );

  const handleConfirmedAction = () => {
    if (!actionModal) return;
    const { type, acc } = actionModal;
    
    if (type === "delete") {
      setAccounts(prev => prev.filter(x => x.id !== acc.id));
    } else if (type === "lock") {
      setAccounts(prev => prev.map(x => x.id === acc.id ? { ...x, status: "locked" } : x));
    } else if (type === "unlock") {
      setAccounts(prev => prev.map(x => x.id === acc.id ? { ...x, status: "active" } : x));
    }
    setActionModal(null);
    setViewAcc(null);
  };

  return (
    <div style={{ animation: "fadeUp .3s ease" }}>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        .row-hover:hover { background: #f7f5f0 !important; }
        .view-btn { background: #f0ede5; border: 1.5px solid #e2dfd6; border-radius: 8px; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all .15s; }
        .view-btn:hover { background: #e2dfd6; }
      `}</style>

      {/* HEADER */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, color: "#1a2744" }}>Manage Accounts</div>
        <div style={{ fontSize: 13, color: "#8a8ea8", marginTop: 2 }}>Admin control panel for student users</div>
      </div>

      {/* SEARCH */}
      <div style={{ marginBottom: 18 }}>
        <input value={accSearch} onChange={e => setAccSearch(e.target.value)} placeholder="Search student name, email, or ID..."
          style={{ width: "100%", maxWidth: 400, background: "#fff", border: "2px solid #e2dfd6", borderRadius: 11, padding: "10px 14px", fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, outline: "none" }} />
      </div>

      {/* TABLE */}
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2dfd6", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2.5fr 2fr 1fr 1fr 1.2fr 0.8fr", padding: "12px 20px", background: "#f7f5f0", borderBottom: "1px solid #e2dfd6", fontSize: 10.5, fontWeight: 700, color: "#8a8ea8", textTransform: "uppercase", letterSpacing: ".05em" }}>
          <div>User Details</div><div>Email</div><div>Role</div><div>Status</div><div>Last Login</div><div>Actions</div>
        </div>

        {filtAccs.map((a) => (
          <div key={a.id} className="row-hover" style={{ display: "grid", gridTemplateColumns: "2.5fr 2fr 1fr 1fr 1.2fr 0.8fr", padding: "14px 20px", borderBottom: "1px solid #f2efe8", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: a.role === "admin" ? "#7c3aed" : "#3d8bef", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>{a.name[0]}</div>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: "#1a2744" }}>{a.name}</div>
                <div style={{ fontSize: 10, color: "#8a8ea8", fontFamily: "monospace" }}>{a.id}</div>
              </div>
            </div>
            <div style={{ fontSize: 13, color: "#64748b" }}>{a.email}</div>
            <div><Badge label={a.role} type={a.role === "admin" ? "purple" : "navy"} /></div>
            <div><Badge label={a.status} type={a.status === "active" ? "green" : "red"} /></div>
            <div style={{ fontSize: 12.5, color: "#64748b" }}>{a.lastLogin}</div>
            <div>
              <button className="view-btn" onClick={() => setViewAcc(a)}>👁</button>
            </div>
          </div>
        ))}
      </div>

      {/* ── MODAL: VIEW DETAILS (Actions inside here) ── */}
      {viewAcc && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(26,39,68,.5)", backdropFilter: "blur(6px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#fff", borderRadius: 22, padding: "28px", maxWidth: 440, width: "100%", boxShadow: "0 24px 64px rgba(26,39,68,.18)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "#3d8bef" }}>Account Profile</div>
              <button onClick={() => setViewAcc(null)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18 }}>✕</button>
            </div>

            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: viewAcc.role === "admin" ? "#7c3aed" : "#3d8bef", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700, margin: "0 auto 12px" }}>{viewAcc.name[0]}</div>
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#1a2744" }}>{viewAcc.name}</div>
              <div style={{ fontSize: 13, color: "#8a8ea8" }}>{viewAcc.email}</div>
            </div>

            <div style={{ display: "grid", gap: 10, marginBottom: 24 }}>
               <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, borderBottom: "1px solid #f2efe8", paddingBottom: 8 }}>
                 <span style={{ color: "#8a8ea8" }}>Student ID</span><span style={{ fontWeight: 600 }}>{viewAcc.id}</span>
               </div>
               <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, borderBottom: "1px solid #f2efe8", paddingBottom: 8 }}>
                 <span style={{ color: "#8a8ea8" }}>Role</span><Badge label={viewAcc.role} type={viewAcc.role === "admin" ? "purple" : "navy"} />
               </div>
               <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, borderBottom: "1px solid #f2efe8", paddingBottom: 8 }}>
                 <span style={{ color: "#8a8ea8" }}>Account Status</span><Badge label={viewAcc.status} type={viewAcc.status === "active" ? "green" : "red"} />
               </div>
            </div>

            {/* SAFE GUARD: Actions only show for Students */}
            {viewAcc.role === "student" ? (
              <div style={{ display: "flex", gap: 8 }}>
                <Btn variant={viewAcc.status === "active" ? "amber" : "navy"} style={{ flex: 1 }} onClick={() => setActionModal({ type: viewAcc.status === "active" ? "lock" : "unlock", acc: viewAcc })}>
                  {viewAcc.status === "active" ? "🔒 Lock Student" : "🔓 Unlock Student"}
                </Btn>
                <Btn variant="red" style={{ flex: 1 }} onClick={() => setActionModal({ type: "delete", acc: viewAcc })}>🗑 Delete Record</Btn>
              </div>
            ) : (
              <div style={{ padding: "12px", background: "#f7f5f0", borderRadius: 10, fontSize: 12, color: "#8a8ea8", textAlign: "center" }}>
                🛡️ Admin accounts can only be managed by Super Admins.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── ACTION CONFIRMATION MODAL ── */}
      {actionModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.4)", zIndex: 110, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#fff", borderRadius: 20, padding: 24, maxWidth: 350, textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>{actionModal.type === 'delete' ? '⚠️' : '🛡️'}</div>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Confirm {actionModal.type}?</div>
            <div style={{ fontSize: 13, color: "#64748b", marginBottom: 20 }}>Are you sure you want to {actionModal.type} <strong>{actionModal.acc.name}</strong>?</div>
            <div style={{ display: "flex", gap: 8 }}>
              <Btn variant={actionModal.type === 'delete' ? 'red' : 'navy'} style={{ flex: 1 }} onClick={handleConfirmedAction}>Yes, Confirm</Btn>
              <Btn variant="ghost" style={{ flex: 1 }} onClick={() => setActionModal(null)}>Cancel</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}