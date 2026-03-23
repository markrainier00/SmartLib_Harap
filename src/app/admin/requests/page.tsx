"use client";

import React, { useState, useEffect } from "react";

/* ─── HELPERS ───────────────────────────────── */
const COURSES = ["All", "BSCS", "BSIT", "BSCpE", "BSMATH", "BSBA", "BSAcc", "BSECE", "BSCHE", "BSN", "BSCE", "BSBio", "BSPharma"];

function Badge({ label, type = "navy" }: any) {
  const m: any = {
    green: ["#e6f7ec", "#2d7a4f"], red: ["#fdeaea", "#c94040"],
    blue: ["#e8f1fd", "#2563eb"], navy: ["#e8ecf5", "#1a2744"],
    amber: ["#fef5e6", "#a06010"]
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
  };
  return <button style={{ ...base, ...v[variant] }} onClick={onClick}>{children}</button>;
}

/* ─── MAIN COMPONENT ────────────────────────────────────── */
export default function AdminRequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [reqTab, setReqTab] = useState("pending");
  const [reqType, setReqType] = useState("All"); 
  const [reqSearch, setReqSearch] = useState("");
  const [reqCourse, setReqCourse] = useState("All");

  const [rejectReqModal, setRejectReqModal] = useState<any>(null);
  const [rejectReqReason, setRejectReqReason] = useState("");
  const [toast, setToast] = useState<any>(null);

  const fireToast = (type: string, msg: string) => { setToast({ type, msg }); setTimeout(() => setToast(null), 3000); };

  // 🚀 FETCH TRANSACTIONS MULA SA DATABASE
  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/transactions/all");
      const json = await res.json();
      if (json.isSuccess && json.data) {
        setRequests(json.data);
      } else {
        setRequests([]); // Kung walang laman
      }
    } catch (err) {
      console.error("Failed to fetch requests", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // 🚀 ACTION BUTTONS NA NAKAKONEKTA SA GO BACKEND
  const approveReq = async (id: any) => {
    try {
      const res = await fetch("http://localhost:8080/api/transactions/release", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transaction_id: id })
      });
      const json = await res.json();
      if (json.isSuccess) {
        fireToast("ok", "Request approved! Student notified.");
        fetchRequests(); // I-refresh ang listahan
      } else {
        fireToast("err", json.message || "Failed to approve.");
      }
    } catch (err) {
      fireToast("err", "Server connection failed.");
    }
  };

  const markReturned = async (id: any) => {
    try {
      const res = await fetch("http://localhost:8080/api/transactions/return", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transaction_id: id })
      });
      const json = await res.json();
      if (json.isSuccess) {
        fireToast("ok", "Book marked as returned.");
        fetchRequests();
      } else {
        fireToast("err", json.message || "Failed to mark returned.");
      }
    } catch (err) {
      fireToast("err", "Server connection failed.");
    }
  };

  const rejectReq = async (id: any, reason: any) => {
    if (!reason.trim()) { fireToast("err", "Please provide a reason"); return; }
    try {
      const res = await fetch("http://localhost:8080/api/transactions/reject", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transaction_id: id, reason: reason })
      });
      const json = await res.json();
      if (json.isSuccess) {
        fireToast("ok", "Request rejected. Student notified.");
        setRejectReqModal(null);
        setRejectReqReason("");
        fetchRequests();
      } else {
        fireToast("err", json.message || "Failed to reject.");
      }
    } catch (err) {
      fireToast("err", "Server connection failed.");
    }
  };

  // ── FILTERING LOGIC ──
  const filtReqs = requests.filter(r => {
    const ms = (r.student || "").toLowerCase().includes(reqSearch.toLowerCase()) ||
               (r.book || "").toLowerCase().includes(reqSearch.toLowerCase()) ||
               (r.school_id || "").includes(reqSearch); // Ginamit natin school_id base sa Go DB mo
    // Note: Sa database mo, baka naka-Capitalize yung status (e.g. "Pending"), kaya nag-toLowerCase tayo
    const mt = reqTab === "all" || (r.status || "").toLowerCase() === reqTab.toLowerCase();
    const mtype = reqType === "All" || (r.type || "").toLowerCase() === reqType.toLowerCase();
    const mc = reqCourse === "All" || (r.course || "") === reqCourse;
    return ms && mt && mtype && mc;
  });

  const reqCounts: any = {
    pending: requests.filter(r => (r.status || "").toLowerCase() === "pending").length,
    approved: requests.filter(r => (r.status || "").toLowerCase() === "approved" || (r.status || "").toLowerCase() === "released").length,
    returned: requests.filter(r => (r.status || "").toLowerCase() === "returned").length,
    rejected: requests.filter(r => (r.status || "").toLowerCase() === "rejected").length,
    all: requests.length,
  };

  const statusColor: any = { pending: "amber", approved: "green", released: "green", rejected: "red", returned: "navy" };
  const statusLabel: any = { pending: "⏳ Pending", approved: "✓ Approved", released: "✓ Released", rejected: "✗ Rejected", returned: "↩ Returned" };
  const typeColor: any = { borrow: "blue", reserve: "navy" };

  return (
    <div style={{ animation: "fadeUp .3s ease" }}>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        .row-hover:hover { background: #f7f5f0 !important; }
        .chip { border: 2px solid #e2dfd6; border-radius: 50px; padding: 7px 16px; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600; cursor: pointer; background: #fff; color: #8a8ea8; transition: all .18s; }
        .chip:hover { border-color: #1a2744; color: #1a2744; }
        .chip.active { background: #1a2744; color: #fff; border-color: #1a2744; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* HEADER */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, color: "#1a2744" }}>Book Requests</div>
        <div style={{ fontSize: 13, color: "#8a8ea8", marginTop: 2 }}>Manage student borrow and reserve requests</div>
      </div>

      {/* SUMMARY CARDS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 12, marginBottom: 22 }}>
        {[
          { key: "pending", label: "Pending", color: "#e8a020", bg: "#fff8e6", icon: "⏳" },
          { key: "approved", label: "Approved/Released", color: "#2d7a4f", bg: "#e6f7ec", icon: "✅" },
          { key: "returned", label: "Returned", color: "#1a2744", bg: "#e8ecf5", icon: "↩️" },
          { key: "rejected", label: "Rejected", color: "#c94040", bg: "#fdeaea", icon: "✗" },
          { key: "all", label: "Total", color: "#2563eb", bg: "#e8f1fd", icon: "📋" },
        ].map((s, i) => (
          <div key={i} onClick={() => setReqTab(s.key)}
            style={{ background: "#fff", borderRadius: 14, border: `2px solid ${reqTab === s.key ? "#1a2744" : "#e2dfd6"}`, padding: "13px 14px", boxShadow: "0 2px 12px rgba(26,39,68,.06)", display: "flex", alignItems: "center", gap: 10, cursor: "pointer", transition: "border .18s" }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{s.icon}</div>
            <div>
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: s.color, lineHeight: 1 }}>{reqCounts[s.key]}</div>
              <div style={{ fontSize: 11, color: "#8a8ea8", marginTop: 2 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>
      
      {/* FILTERS */}
      <div style={{ display: "flex", gap: 9, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 180 }}>
          <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", fontSize: 13, pointerEvents: "none" }}>🔍</span>
          <input value={reqSearch} onChange={e => setReqSearch(e.target.value)} placeholder="Search student, book, ID…"
            style={{ width: "100%", background: "#fff", border: "2px solid #e2dfd6", borderRadius: 11, padding: "8px 13px 8px 32px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#1a2744", outline: "none" }} />
        </div>
        {["All", "borrow", "reserve"].map(v => (
          <button key={v} className={`chip ${reqType === v ? "active" : ""}`} onClick={() => setReqType(v)}>
            {v === "All" ? "All Types" : v === "borrow" ? "📖 Borrow" : "🔖 Reserve"}
          </button>
        ))}
        <select value={reqCourse} onChange={e => setReqCourse(e.target.value)} style={{ background: "#fff", border: "2px solid #e2dfd6", borderRadius: 11, padding: "8px 13px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#1a2744", outline: "none", cursor: "pointer" }}>
          {COURSES.map(c => <option key={c}>{c}</option>)}
        </select>
        <div style={{ marginLeft: "auto", fontSize: 12, color: "#8a8ea8" }}>{filtReqs.length} result{filtReqs.length !== 1 ? "s" : ""}</div>
      </div>

      {/* TABLE */}
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2dfd6", boxShadow: "0 2px 12px rgba(26,39,68,.06)", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.8fr 2.2fr 0.8fr 0.8fr 1fr 0.9fr 1.8fr", padding: "11px 20px", background: "#f7f5f0", borderBottom: "1px solid #e2dfd6" }}>
          {["Student", "Book", "Course", "Type", "Date", "Status", "Actions"].map(h => (
            <div key={h} style={{ fontSize: 10.5, fontWeight: 700, color: "#8a8ea8", letterSpacing: ".06em", textTransform: "uppercase" }}>{h}</div>
          ))}
        </div>
        
        {loading ? (
           <div style={{ padding: 40, textAlign: "center", color: "#8a8ea8" }}>
             <div style={{ width: 24, height: 24, border: "3px solid #e2dfd6", borderTopColor: "#1a2744", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 10px" }}></div>
             Loading requests...
           </div>
        ) : filtReqs.length === 0 ? (
          <div style={{ padding: 40, textAlign: "center", color: "#8a8ea8" }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>📭</div>
            No requests found in database.
          </div>
        ) : (
          filtReqs.map((r, i) => {
            const rawStatus = (r.status || "pending").toLowerCase();
            const rowBg = rawStatus === "pending" ? "#fffdf5" : rawStatus === "returned" ? "#f7fdf9" : "#fff";
            const reqTypeStr = (r.type || "borrow").toLowerCase();
            
            return (
              <div key={r.id} className="row-hover" style={{ display: "grid", gridTemplateColumns: "1.8fr 2.2fr 0.8fr 0.8fr 1fr 0.9fr 1.8fr", padding: "12px 20px", borderBottom: i < filtReqs.length - 1 ? "1px solid #f2efe8" : "none", alignItems: "center", transition: "background .15s", background: rowBg }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#1a2744" }}>{r.student || r.student_name}</div>
                  <div style={{ fontSize: 11, color: "#8a8ea8" }}>{r.school_id}</div>
                </div>
                <div style={{ fontSize: 12.5, color: "#64748b", lineHeight: 1.3 }}>{(r.book || r.book_title || "").length > 30 ? (r.book || r.book_title).slice(0, 30) + "…" : (r.book || r.book_title)}</div>
                <div style={{ fontSize: 12, color: "#64748b" }}>{r.course}</div>
                <div><Badge label={reqTypeStr === "borrow" ? "📖 Borrow" : "🔖 Reserve"} type={typeColor[reqTypeStr] || "blue"} /></div>
                <div style={{ fontSize: 12, color: "#8a8ea8" }}>{new Date(r.created_at).toLocaleDateString()}</div>
                <div><Badge label={statusLabel[rawStatus] || r.status} type={statusColor[rawStatus] || "navy"} /></div>
                
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                  {rawStatus === "pending" && (
                    <>
                      <button onClick={() => approveReq(r.id)} style={{ background: "#e6f7ec", color: "#2d7a4f", border: "1.5px solid #b6e8c4", borderRadius: 8, padding: "5px 9px", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>✓ Approve</button>
                      <button onClick={() => { setRejectReqModal(r); setRejectReqReason(""); }} style={{ background: "#fdeaea", color: "#c94040", border: "1.5px solid #f5c5c5", borderRadius: 8, padding: "5px 9px", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>✗ Reject</button>
                    </>
                  )}
                  {(rawStatus === "approved" || rawStatus === "released") && reqTypeStr === "borrow" && (
                    <button onClick={() => markReturned(r.id)} style={{ background: "#e8ecf5", color: "#1a2744", border: "1.5px solid #c8d0e8", borderRadius: 8, padding: "5px 9px", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>↩ Mark Returned</button>
                  )}
                  {rawStatus === "returned" && (
                    <span style={{ fontSize: 12, color: "#4caf6e", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                      ✓ Returned
                    </span>
                  )}
                  {rawStatus === "rejected" && (
                    <span style={{ fontSize: 11, color: "#c94040", fontStyle: "italic" }} title={r.rejectReason}>Rejected</span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ── MODAL: REJECT REQUEST ── */}
      {rejectReqModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(26,39,68,.5)", backdropFilter: "blur(6px)", zIndex: 90, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={e => e.target === e.currentTarget && setRejectReqModal(null)}>
          <div style={{ background: "#fff", borderRadius: 22, padding: "26px 28px", maxWidth: 420, width: "100%", boxShadow: "0 24px 64px rgba(26,39,68,.18)", animation: "fadeUp .25s ease" }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#c94040", marginBottom: 8 }}>Reject Request</div>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, color: "#1a2744", marginBottom: 2 }}>{rejectReqModal.student || rejectReqModal.student_name}</div>
            <div style={{ fontSize: 12, color: "#8a8ea8", marginBottom: 6 }}>{rejectReqModal.school_id}</div>
            <div style={{ fontSize: 13, color: "#64748b", marginBottom: 16 }}>Book: <strong style={{ color: "#1a2744" }}>{rejectReqModal.book || rejectReqModal.book_title}</strong></div>
            
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#1a2744", display: "block", marginBottom: 7 }}>Reason for Rejection *</label>
              <textarea value={rejectReqReason} onChange={e => setRejectReqReason(e.target.value)} placeholder="e.g. Book already at max capacity, Account has overdue books…"
                style={{ width: "100%", background: "#f0ede5", border: "2px solid transparent", borderRadius: 11, padding: "11px 13px", fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: "#1a2744", outline: "none", resize: "vertical", minHeight: 80 }} />
            </div>
            
            <div style={{ display: "flex", gap: 9 }}>
              <Btn variant="red" onClick={() => rejectReq(rejectReqModal.id, rejectReqReason)}>Confirm Rejection</Btn>
              <Btn variant="ghost" onClick={() => setRejectReqModal(null)}>Cancel</Btn>
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