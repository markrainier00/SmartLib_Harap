"use client";

import React, { useState, useEffect } from "react";

/* ─── COMPONENTS ───────────────────────────────────────── */
function Badge({ label, type = "navy" }: any) {
  const m: any = {
    green: ["#e6f7ec", "#2d7a4f"], red: ["#fdeaea", "#c94040"],
    blue: ["#e8f1fd", "#2563eb"], navy: ["#e8ecf5", "#1a2744"],
    purple: ["#f3e8ff", "#7c3aed"], gray: ["#f0ede5", "#64748b"],
    amber: ["#fff8e6", "#a06010"]
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
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [accSearch, setAccSearch] = useState("");
  const [viewAcc, setViewAcc] = useState<any>(null);
  const [actionModal, setActionModal] = useState<any>(null); // { type: 'unlock'|'delete', acc }
  const [toast, setToast] = useState<any>(null);

  const fireToast = (type: string, msg: string) => { setToast({ type, msg }); setTimeout(() => setToast(null), 3000); };

  // 🚀 FETCH DATA FROM GO BACKEND
  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/users/registrations");
      const json = await res.json();
      
      if (res.ok && json.data) {
        const formattedData = json.data.map((u: any) => ({
          id: u.school_id,
          name: `${u.firstname} ${u.lastname}`,
          email: u.email,
          role: u.role || "student",
          status: u.status ? u.status.toLowerCase() : "new",
          lastLogin: new Date(u.updated_at).toLocaleDateString(),
          joined: new Date(u.created_at).toLocaleDateString(),
          penaltyCount: u.penalty_count || 0
        }));
        setAccounts(formattedData);
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

  const filtAccs = accounts.filter(a => 
    a.name.toLowerCase().includes(accSearch.toLowerCase()) || 
    a.email.toLowerCase().includes(accSearch.toLowerCase()) ||
    a.id.toLowerCase().includes(accSearch.toLowerCase())
  );

  // 🚀 ACTION HANDLER (Unlock at Delete na lang)
  const handleConfirmedAction = async () => {
    if (!actionModal) return;
    const { type, acc } = actionModal;
    
    try {
      if (type === "delete") {
        const res = await fetch(`http://localhost:8080/api/users/${acc.id}`, { method: "DELETE" });
        if (res.ok) {
          setAccounts(prev => prev.filter(x => x.id !== acc.id));
          fireToast("ok", "Account deleted successfully.");
        } else {
          fireToast("err", "Failed to delete account.");
        }

      } else if (type === "unlock") {
        const res = await fetch("http://localhost:8080/api/users/status", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ school_id: acc.id, status: "Active" }),
        });

        if (res.ok) {
          setAccounts(prev => prev.map(x => x.id === acc.id ? { ...x, status: "active", penaltyCount: 0 } : x));
          fireToast("ok", `Account unlocked successfully. Penalties reset to 0.`);
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

  return (
    <div style={{ animation: "fadeUp .3s ease" }}>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        .row-hover:hover { background: #f7f5f0 !important; }
        .view-btn { background: #f0ede5; border: 1.5px solid #e2dfd6; border-radius: 8px; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all .15s; }
        .view-btn:hover { background: #e2dfd6; }
        @keyframes spin { to { transform: rotate(360deg); } }
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
          <div>User Details</div><div>Email</div><div>Role</div><div>Status</div><div>Joined</div><div>Actions</div>
        </div>

        {loading ? (
           <div style={{ padding: 60, textAlign: "center", color: "#1a2744" }}>
             <div style={{ width: 28, height: 28, border: "3px solid #1a274433", borderTopColor: "#1a2744", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 12px" }}></div>
             Loading accounts...
           </div>
        ) : filtAccs.length === 0 ? (
           <div style={{ padding: 40, textAlign: "center", color: "#8a8ea8" }}>No accounts found.</div>
        ) : (
          filtAccs.map((a) => (
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
              <div>
                <Badge label={a.status === 'locked' ? 'Locked' : a.status} type={a.status === "active" ? "green" : a.status === "locked" ? "red" : "amber"} />
              </div>
              <div style={{ fontSize: 12.5, color: "#64748b" }}>{a.joined}</div>
              <div>
                <button className="view-btn" onClick={() => setViewAcc(a)}>👁</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── MODAL: VIEW DETAILS ── */}
      {viewAcc && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(26,39,68,.5)", backdropFilter: "blur(6px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#fff", borderRadius: 22, padding: "28px", maxWidth: 440, width: "100%", boxShadow: "0 24px 64px rgba(26,39,68,.18)", animation: "fadeUp .25s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "#3d8bef" }}>Account Profile</div>
              <button onClick={() => setViewAcc(null)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#8a8ea8" }}>✕</button>
            </div>

            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: viewAcc.role === "admin" ? "#7c3aed" : viewAcc.status === "locked" ? "#c94040" : "#3d8bef", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700, margin: "0 auto 12px" }}>
                {viewAcc.status === "locked" ? "🔒" : viewAcc.name[0]}
              </div>
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#1a2744" }}>{viewAcc.name}</div>
              <div style={{ fontSize: 13, color: "#8a8ea8" }}>{viewAcc.email}</div>
            </div>

            <div style={{ display: "grid", gap: 10, marginBottom: 24 }}>
               <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, borderBottom: "1px solid #f2efe8", paddingBottom: 8 }}>
                 <span style={{ color: "#8a8ea8" }}>Student ID</span><span style={{ fontWeight: 600, fontFamily: "monospace", color: "#1a2744" }}>{viewAcc.id}</span>
               </div>
               <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, borderBottom: "1px solid #f2efe8", paddingBottom: 8 }}>
                 <span style={{ color: "#8a8ea8" }}>Role</span><Badge label={viewAcc.role} type={viewAcc.role === "admin" ? "purple" : "navy"} />
               </div>
               <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, borderBottom: "1px solid #f2efe8", paddingBottom: 8 }}>
                 <span style={{ color: "#8a8ea8" }}>Account Status</span><Badge label={viewAcc.status} type={viewAcc.status === "active" ? "green" : viewAcc.status === "locked" ? "red" : "amber"} />
               </div>
               
               <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, borderBottom: "1px solid #f2efe8", paddingBottom: 8 }}>
                 <span style={{ color: "#8a8ea8" }}>Active Penalties</span>
                 <span style={{ fontWeight: 700, color: viewAcc.penaltyCount >= 3 ? "#c94040" : "#1a2744" }}>
                    {viewAcc.penaltyCount} / 3 {viewAcc.penaltyCount >= 3 && "(Auto-Locked)"}
                 </span>
               </div>
            </div>

            {/* 🚀 WALANG MANUAL LOCK, UNLOCK AT DELETE NA LANG */}
            {viewAcc.role === "student" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {viewAcc.status === "locked" && (
                  <Btn variant="amber" style={{ width: "100%" }} onClick={() => setActionModal({ type: "unlock", acc: viewAcc })}>
                    🔓 Unlock Student (Reset Penalties)
                  </Btn>
                )}
                <Btn variant="red" style={{ width: "100%" }} onClick={() => setActionModal({ type: "delete", acc: viewAcc })}>🗑 Delete Record</Btn>
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
        <div style={{ position: "fixed", inset: 0, background: "rgba(26,39,68,.5)", backdropFilter: "blur(6px)", zIndex: 110, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#fff", borderRadius: 20, padding: 24, maxWidth: 350, textAlign: "center", boxShadow: "0 24px 64px rgba(26,39,68,.18)", animation: "fadeUp .2s ease" }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>{actionModal.type === 'delete' ? '🗑' : '🔓'}</div>
            <div style={{ fontWeight: 700, fontSize: 18, color: "#1a2744", marginBottom: 8, textTransform: "capitalize" }}>Confirm {actionModal.type}</div>
            <div style={{ fontSize: 13, color: "#64748b", marginBottom: 20 }}>
              Are you sure you want to {actionModal.type} the account of <strong style={{color:"#1a2744"}}>{actionModal.acc.name}</strong>?
              {actionModal.type === 'delete' && <div style={{ color: "#c94040", marginTop: 8, fontWeight: 600 }}>This action cannot be undone.</div>}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Btn variant={actionModal.type === 'delete' ? 'red' : 'navy'} style={{ flex: 1 }} onClick={handleConfirmedAction}>Yes, Confirm</Btn>
              <Btn variant="ghost" style={{ flex: 1 }} onClick={() => setActionModal(null)}>Cancel</Btn>
            </div>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {toast && (
        <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: toast.type === "err" ? "#c94040" : "#2d7a4f", color: "#fff", padding: "12px 22px", borderRadius: 12, fontSize: 13.5, fontWeight: 500, boxShadow: "0 8px 24px rgba(0,0,0,.2)", zIndex: 200, animation: "fadeUp .3s ease", display: "flex", alignItems: "center", gap: 8 }}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}