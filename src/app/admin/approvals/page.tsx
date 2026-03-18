"use client";

import React, { useState, useEffect } from "react";

/* ─── HELPERS ───────────────────────────────── */
const COURSES = ["All", "BSCS", "BSIT", "BSCpE", "BSMATH", "BSBA", "BSAcc", "BSECE", "BSCHE", "BSN", "BSCE", "BSBio", "BSPharma"];
const YEARS = ["All", "1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"];

function Badge({ label, type = "navy" }: any) {
  const m: any = {
    green: ["#e6f7ec", "#2d7a4f"], red: ["#fdeaea", "#c94040"],
    blue: ["#e8f1fd", "#2563eb"], amber: ["#fef5e6", "#a06010"], navy: ["#e8ecf5", "#1a2744"]
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
export default function AdminApprovalsPage() {
  const [pending, setPending] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [appTab, setAppTab] = useState("pending"); 
  const [appSearch, setAppSearch] = useState("");
  const [appCourse, setAppCourse] = useState("All");
  const [appYear, setAppYear] = useState("All");

  const [viewApplicant, setViewApplicant] = useState<any>(null);
  const [rejectModal, setRejectModal] = useState<any>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [toast, setToast] = useState<any>(null);

  const fireToast = (type: string, msg: string) => { setToast({ type, msg }); setTimeout(() => setToast(null), 3000); };

  // 🚀 1. FETCH DATA FROM GO BACKEND
  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/users/registrations");
      const json = await res.json();
      if (res.ok && json.data) {
        // Map backend data to frontend format
        const formattedData = json.data.map((u: any) => ({
          id: u.id,
          name: `${u.firstname} ${u.lastname}`,
          email: u.email,
          studentId: u.school_id,
          course: u.program || "N/A",
          year: u.year || "N/A",           // 👈 INAYOS DITO: u.year_level naging u.year
          dept: u.program || "N/A",        // 👈 INAYOS DITO: u.department naging u.program
          date: new Date(u.created_at).toLocaleDateString(),
          // Backend uses "New", "Active", "Rejected" -> map to frontend terms
          status: u.status === "New" ? "pending" : u.status === "Active" ? "approved" : "rejected",
          rejectReason: u.reject_reason || ""
        }));
        setPending(formattedData);
      }
    } catch (err) {
      fireToast("err", "Failed to load registrations from server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const filtPending = pending.filter(p => {
    const ms = p.name.toLowerCase().includes(appSearch.toLowerCase()) ||
               p.email.toLowerCase().includes(appSearch.toLowerCase()) ||
               p.studentId.toLowerCase().includes(appSearch.toLowerCase());
    const mt = appTab === "all" || p.status === appTab;
    const mc = appCourse === "All" || p.course === appCourse;
    const my = appYear === "All" || p.year === appYear;
    return ms && mt && mc && my;
  }).sort((a, b) => a.name.localeCompare(b.name));

  // 🚀 2. APPROVE ACTION
  const approve = async (studentId: string) => {
    try {
      const res = await fetch("http://localhost:8080/api/users/approve", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ school_id: studentId }),
      });
      if (res.ok) {
        fireToast("ok", "Student registration approved!");
        fetchRegistrations(); // Refresh list
        setViewApplicant(null);
      } else {
        fireToast("err", "Failed to approve student.");
      }
    } catch (err) { fireToast("err", "Server error"); }
  };

  // 🚀 3. REJECT ACTION
  const reject = async (studentId: string, reason: string) => {
    try {
      const res = await fetch("http://localhost:8080/api/users/reject", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ school_id: studentId, reason: reason }),
      });
      if (res.ok) {
        fireToast("ok", "Registration rejected. Student has been notified.");
        fetchRegistrations(); // Refresh list
        setRejectModal(null);
        setViewApplicant(null);
        setRejectReason("");
      } else {
        fireToast("err", "Failed to reject student.");
      }
    } catch (err) { fireToast("err", "Server error"); }
  };

  const tabCounts: any = {
    pending: pending.filter(p => p.status === "pending").length,
    approved: pending.filter(p => p.status === "approved").length,
    rejected: pending.filter(p => p.status === "rejected").length,
    all: pending.length,
  };

  const statusColor: any = { pending: "amber", approved: "green", rejected: "red" };
  const statusLabel: any = { pending: "⏳ Pending", approved: "✓ Approved", rejected: "✗ Rejected" };

  return (
    <div style={{ animation: "fadeUp .3s ease" }}>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        .row-hover:hover { background: #f7f5f0 !important; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* HEADER */}
      <div style={{ marginBottom: 22 }}>
        <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, color: "#1a2744" }}>Registration Approvals</div>
        <div style={{ fontSize: 13, color: "#8a8ea8", marginTop: 2 }}>Review and approve student registration requests</div>
      </div>

      {/* SUMMARY CARDS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginBottom: 24 }}>
        {[
          { label: "Pending", val: tabCounts.pending, color: "#e8a020", bg: "#fff8e6", icon: "⏳" },
          { label: "Approved", val: tabCounts.approved, color: "#2d7a4f", bg: "#e6f7ec", icon: "✅" },
          { label: "Rejected", val: tabCounts.rejected, color: "#c94040", bg: "#fdeaea", icon: "✗" },
          { label: "Total", val: tabCounts.all, color: "#2563eb", bg: "#e8f1fd", icon: "📋" },
        ].map((s, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2dfd6", padding: "16px 18px", boxShadow: "0 2px 12px rgba(26,39,68,.06)", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}
            onClick={() => setAppTab(s.label.toLowerCase())}>
            <div style={{ width: 40, height: 40, borderRadius: 11, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{s.icon}</div>
            <div>
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, color: s.color, lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: 12, color: "#8a8ea8", marginTop: 2 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* FILTERS */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 180 }}>
          <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", fontSize: 13, pointerEvents: "none" }}>🔍</span>
          <input value={appSearch} onChange={e => setAppSearch(e.target.value)} placeholder="Search name, email, ID…"
            style={{ width: "100%", background: "#fff", border: "2px solid #e2dfd6", borderRadius: 11, padding: "8px 13px 8px 32px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#1a2744", outline: "none" }} />
        </div>
        <select value={appCourse} onChange={e => setAppCourse(e.target.value)} style={{ background: "#fff", border: "2px solid #e2dfd6", borderRadius: 11, padding: "8px 13px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#1a2744", outline: "none", cursor: "pointer" }}>
          {COURSES.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={appYear} onChange={e => setAppYear(e.target.value)} style={{ background: "#fff", border: "2px solid #e2dfd6", borderRadius: 11, padding: "8px 13px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#1a2744", outline: "none", cursor: "pointer" }}>
          {YEARS.map(y => <option key={y}>{y}</option>)}
        </select>
        {(appCourse !== "All" || appYear !== "All" || appSearch) && (
          <button onClick={() => { setAppCourse("All"); setAppYear("All"); setAppSearch(""); }}
            style={{ background: "transparent", border: "1.5px solid #e2dfd6", borderRadius: 9, padding: "7px 13px", fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#8a8ea8", cursor: "pointer", whiteSpace: "nowrap" }}>
            ✕ Reset
          </button>
        )}
        <div style={{ marginLeft: "auto", fontSize: 12, color: "#8a8ea8", whiteSpace: "nowrap" }}>{filtPending.length} result{filtPending.length !== 1 ? "s" : ""}</div>
      </div>

      {/* TABLE */}
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2dfd6", boxShadow: "0 2px 12px rgba(26,39,68,.06)", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2.2fr 2fr 1fr 1fr 1fr 1.6fr", padding: "11px 20px", background: "#f7f5f0", borderBottom: "1px solid #e2dfd6" }}>
          {["Applicant", "Email", "Student ID", "Course", "Date", "Actions"].map(h => (
            <div key={h} style={{ fontSize: 10.5, fontWeight: 700, color: "#8a8ea8", letterSpacing: ".06em", textTransform: "uppercase" }}>{h}</div>
          ))}
        </div>

        {loading ? (
          <div style={{ padding: 50, textAlign: "center", color: "#1a2744" }}>
             <div style={{ width: 24, height: 24, border: "3px solid #1a274433", borderTopColor: "#1a2744", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 10px" }}></div>
             Fetching registrations...
          </div>
        ) : filtPending.length === 0 ? (
          <div style={{ padding: 40, textAlign: "center", color: "#8a8ea8" }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>📭</div>
            No registrations found
          </div>
        ) : (
          filtPending.map((p, i) => (
            <div key={p.id} className="row-hover" style={{ display: "grid", gridTemplateColumns: "2.2fr 2fr 1fr 1fr 1fr 1.6fr", padding: "13px 20px", borderBottom: i < filtPending.length - 1 ? "1px solid #f2efe8" : "none", alignItems: "center", transition: "background .15s", background: p.status === "pending" ? "#fffdf5" : "#fff" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setViewApplicant(p)}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: `linear-gradient(135deg,#3d8bef,#4caf6e)`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{p.name[0]}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#1a2744" }}>{p.name}</div>
                  <div style={{ fontSize: 10.5, color: "#8a8ea8" }}>{p.year} · {p.dept.split(" ").slice(-1)[0]}</div>
                </div>
              </div>
              <div style={{ fontSize: 12.5, color: "#64748b" }}>{p.email}</div>
              <div style={{ fontSize: 12.5, fontFamily: "monospace", color: "#1a2744", fontWeight: 600 }}>{p.studentId}</div>
              <div><Badge label={p.course} type="navy" /></div>
              <div style={{ fontSize: 12, color: "#8a8ea8" }}>{p.date}</div>
              
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                {p.status === "pending" ? (
                  <>
                    <button onClick={() => approve(p.studentId)} style={{ background: "#e6f7ec", color: "#2d7a4f", border: "1.5px solid #b6e8c4", borderRadius: 8, padding: "5px 10px", fontSize: 11.5, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all .15s" }}>✓ Approve</button>
                    <button onClick={() => { setRejectModal(p); setRejectReason(""); }} style={{ background: "#fdeaea", color: "#c94040", border: "1.5px solid #f5c5c5", borderRadius: 8, padding: "5px 10px", fontSize: 11.5, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all .15s" }}>✗ Reject</button>
                  </>
                ) : (
                  <Badge label={statusLabel[p.status]} type={statusColor[p.status]} />
                )}
                <button onClick={() => setViewApplicant(p)} style={{ background: "#f0ede5", border: "1.5px solid #e2dfd6", borderRadius: 8, padding: "5px 9px", fontSize: 13, cursor: "pointer" }}>👁</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── MODAL: VIEW APPLICANT ── */}
      {viewApplicant && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(26,39,68,.5)", backdropFilter: "blur(6px)", zIndex: 90, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={e => e.target === e.currentTarget && setViewApplicant(null)}>
          <div style={{ background: "#fff", borderRadius: 22, padding: "28px", maxWidth: 460, width: "100%", boxShadow: "0 24px 64px rgba(26,39,68,.18)", animation: "fadeUp .25s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#3d8bef" }}>Registration Request</div>
              <button onClick={() => setViewApplicant(null)} style={{ background: "#f0ede5", border: "none", borderRadius: 8, padding: "5px 9px", cursor: "pointer", fontSize: 15, color: "#8a8ea8" }}>✕</button>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20, padding: "16px", background: "#f7f5f0", borderRadius: 14 }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg,#3d8bef,#4caf6e)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 22, fontWeight: 700, flexShrink: 0 }}>{viewApplicant.name[0]}</div>
              <div>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 19, color: "#1a2744" }}>{viewApplicant.name}</div>
                <div style={{ fontSize: 12, color: "#8a8ea8", marginTop: 2 }}>{viewApplicant.email}</div>
                <div style={{ marginTop: 8 }}><Badge label={statusLabel[viewApplicant.status]} type={statusColor[viewApplicant.status]} /></div>
              </div>
            </div>

            {[
              ["Student ID", viewApplicant.studentId],
              ["Course", viewApplicant.course],
              ["Year Level", viewApplicant.year],
              ["Department", viewApplicant.dept],
              ["Applied On", viewApplicant.date],
            ].map(([k, v], i, arr) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: i < arr.length - 1 ? "1px solid #f2efe8" : "none" }}>
                <span style={{ fontSize: 13, color: "#64748b" }}>{k}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#1a2744" }}>{v}</span>
              </div>
            ))}

            {viewApplicant.rejectReason && (
              <div style={{ marginTop: 14, background: "#fdeaea", border: "1px solid #f5c5c5", borderRadius: 10, padding: "10px 14px" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#c94040", marginBottom: 4 }}>REJECTION REASON</div>
                <div style={{ fontSize: 13, color: "#64748b" }}>{viewApplicant.rejectReason}</div>
              </div>
            )}

            {viewApplicant.status === "pending" && (
              <div style={{ display: "flex", gap: 9, marginTop: 20 }}>
                <Btn onClick={() => approve(viewApplicant.studentId)}>✓ Approve</Btn>
                <Btn variant="red" onClick={() => { setRejectModal(viewApplicant); setRejectReason(""); setViewApplicant(null); }}>✗ Reject</Btn>
                <Btn variant="ghost" onClick={() => setViewApplicant(null)}>Close</Btn>
              </div>
            )}
            {viewApplicant.status !== "pending" && (
              <Btn variant="ghost" style={{ marginTop: 18, width: "100%", justifyContent: "center" }} onClick={() => setViewApplicant(null)}>Close</Btn>
            )}
          </div>
        </div>
      )}

      {/* ── MODAL: REJECT REASON ── */}
      {rejectModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(26,39,68,.5)", backdropFilter: "blur(6px)", zIndex: 91, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={e => e.target === e.currentTarget && setRejectModal(null)}>
          <div style={{ background: "#fff", borderRadius: 22, padding: "26px 28px", maxWidth: 420, width: "100%", boxShadow: "0 24px 64px rgba(26,39,68,.18)", animation: "fadeUp .25s ease" }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#c94040", marginBottom: 8 }}>Reject Registration</div>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 19, color: "#1a2744", marginBottom: 4 }}>{rejectModal.name}</div>
            <div style={{ fontSize: 12, color: "#8a8ea8", marginBottom: 18 }}>{rejectModal.email} · {rejectModal.studentId}</div>
            
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#1a2744", display: "block", marginBottom: 7 }}>Reason for Rejection *</label>
              <textarea value={rejectReason} onChange={e => setRejectReason(e.target.value)} placeholder="e.g. Incomplete requirements, Invalid student ID, Duplicate account…"
                style={{ width: "100%", background: "#f0ede5", border: "2px solid transparent", borderRadius: 11, padding: "11px 13px", fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: "#1a2744", outline: "none", resize: "vertical", minHeight: 90 }} />
            </div>
            <div style={{ background: "#fff8e6", border: "1px solid #fde8b0", borderRadius: 10, padding: "10px 14px", marginBottom: 18 }}>
              <div style={{ fontSize: 12, color: "#a06010" }}>📧 The student will receive an email notification with this reason.</div>
            </div>
            
            <div style={{ display: "flex", gap: 9 }}>
              <Btn variant="red" onClick={() => { if (!rejectReason.trim()) { fireToast("err", "Please provide a reason"); return; } reject(rejectModal.studentId, rejectReason); }}>Confirm Rejection</Btn>
              <Btn variant="ghost" onClick={() => setRejectModal(null)}>Cancel</Btn>
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