"use client";

import React, { useState } from "react";

/* ─── HELPERS & MOCK DATA ───────────────────────────────── */
const COURSES = ["All", "BSCS", "BSIT", "BSCpE", "BSMATH", "BSBA", "BSAcc", "BSECE", "BSCHE", "BSN", "BSCE", "BSBio", "BSPharma"];
const YEARS = ["All", "1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"];

const INIT_PENDING = [
  { id: 1, name: "Reina Dela Torre", email: "reina@university.edu", studentId: "2025-00101", course: "BSCS", year: "1st Year", dept: "College of Computing", date: "Mar 05, 2026", status: "pending" },
  { id: 2, name: "Marco Villafuerte", email: "marco@university.edu", studentId: "2025-00102", course: "BSN", year: "2nd Year", dept: "College of Nursing", date: "Mar 05, 2026", status: "pending" },
  { id: 3, name: "Jasmine Aquino", email: "jasmine@university.edu", studentId: "2025-00103", course: "BSBA", year: "1st Year", dept: "College of Business", date: "Mar 04, 2026", status: "pending" },
  { id: 4, name: "Eugene Macaraeg", email: "eugene@university.edu", studentId: "2025-00104", course: "BSCE", year: "3rd Year", dept: "College of Engineering", date: "Mar 04, 2026", status: "pending" },
  { id: 5, name: "Patricia Soriano", email: "pat@university.edu", studentId: "2025-00105", course: "BSMATH", year: "2nd Year", dept: "College of Science", date: "Mar 03, 2026", status: "pending" },
  { id: 6, name: "Lorenzo Bautista", email: "lorenzo@university.edu", studentId: "2025-00106", course: "BSPharma", year: "1st Year", dept: "College of Pharmacy", date: "Mar 03, 2026", status: "approved" },
  { id: 7, name: "Camille Reyes", email: "camille@university.edu", studentId: "2025-00107", course: "BSIT", year: "2nd Year", dept: "College of Computing", date: "Mar 02, 2026", status: "approved" },
  { id: 8, name: "Danilo Santos", email: "danilo@university.edu", studentId: "2025-00108", course: "BSAcc", year: "3rd Year", dept: "College of Accountancy", date: "Mar 02, 2026", status: "rejected" },
  { id: 9, name: "Rhea Mendoza", email: "rhea@university.edu", studentId: "2025-00109", course: "BSCHE", year: "1st Year", dept: "College of Engineering", date: "Mar 01, 2026", status: "pending" },
  { id: 10, name: "Francis Tan", email: "francis@university.edu", studentId: "2025-00110", course: "BSBio", year: "2nd Year", dept: "College of Science", date: "Mar 01, 2026", status: "rejected" },
];

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
  const [pending, setPending] = useState<any[]>(INIT_PENDING);
  const [appTab, setAppTab] = useState("pending"); // pending | approved | rejected | all
  const [appSearch, setAppSearch] = useState("");
  const [appCourse, setAppCourse] = useState("All");
  const [appYear, setAppYear] = useState("All");

  const [viewApplicant, setViewApplicant] = useState<any>(null);
  const [rejectModal, setRejectModal] = useState<any>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [toast, setToast] = useState<any>(null);

  const fireToast = (type: string, msg: string) => { setToast({ type, msg }); setTimeout(() => setToast(null), 3000); };

  const filtPending = pending.filter(p => {
    const ms = p.name.toLowerCase().includes(appSearch.toLowerCase()) ||
               p.email.toLowerCase().includes(appSearch.toLowerCase()) ||
               p.studentId.toLowerCase().includes(appSearch.toLowerCase());
    const mt = appTab === "all" || p.status === appTab;
    const mc = appCourse === "All" || p.course === appCourse;
    const my = appYear === "All" || p.year === appYear;
    return ms && mt && mc && my;
  }).sort((a, b) => a.name.localeCompare(b.name));

  const approve = (id: any) => {
    setPending(prev => prev.map(p => p.id === id ? { ...p, status: "approved" } : p));
    fireToast("ok", "Student registration approved! Email sent.");
    setViewApplicant(null);
  };

  const reject = (id: any, reason: any) => {
    setPending(prev => prev.map(p => p.id === id ? { ...p, status: "rejected", rejectReason: reason } : p));
    fireToast("ok", "Registration rejected. Student has been notified.");
    setRejectModal(null);
    setViewApplicant(null);
    setRejectReason("");
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

      {/* TABS */}
      <div style={{ display: "flex", borderBottom: "2px solid #e2dfd6", marginBottom: 14 }}>
        {["pending", "approved", "rejected", "all"].map(t => (
          <button key={t} onClick={() => setAppTab(t)}
            style={{ background: "none", border: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, padding: "9px 16px", cursor: "pointer", color: appTab === t ? "#1a2744" : "#8a8ea8", borderBottom: `2px solid ${appTab === t ? "#1a2744" : "transparent"}`, marginBottom: -2, transition: "all .18s", textTransform: "capitalize", display: "flex", alignItems: "center", gap: 6 }}>
            {t}
            <span style={{ background: appTab === t ? "#1a2744" : "#f0ede5", color: appTab === t ? "#fff" : "#8a8ea8", borderRadius: 20, fontSize: 10, fontWeight: 700, padding: "1px 7px" }}>{tabCounts[t]}</span>
          </button>
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

        {filtPending.length === 0 ? (
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
                    <button onClick={() => approve(p.id)} style={{ background: "#e6f7ec", color: "#2d7a4f", border: "1.5px solid #b6e8c4", borderRadius: 8, padding: "5px 10px", fontSize: 11.5, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all .15s" }}>✓ Approve</button>
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
                <Btn onClick={() => approve(viewApplicant.id)}>✓ Approve</Btn>
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
              <Btn variant="red" onClick={() => { if (!rejectReason.trim()) { fireToast("err", "Please provide a reason"); return; } reject(rejectModal.id, rejectReason); }}>Confirm Rejection</Btn>
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