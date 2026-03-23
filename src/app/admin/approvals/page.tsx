"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { IconEllipsis, IconSearch, IconX } from "@/components/icons";

/* ─── HELPERS ───────────────────────────────── */
const PROGRAMS = ["All Programs", "BSCS", "BSIT", "BSCpE", "BSMATH", "BSBA", "BSAcc", "BSECE", "BSCHE", "BSN", "BSCE", "BSBio", "BSPharma"];
const YEARS = ["All Year Levels", "1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"];

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
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewAcc, setViewAcc] = useState<any>(null);
 
  const [search, setSearch] = useState("");
  const [appProgram, setAppProgram] = useState("All");
  const [appYear, setAppYear] = useState("All");

  const [viewApplicant, setViewApplicant] = useState<any>(null);
  const [rejectModal, setRejectModal] = useState<any>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [toast, setToast] = useState<any>(null);

  const fireToast = (type: string, msg: string) => { setToast({ type, msg }); setTimeout(() => setToast(null), 3000); };

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const json = await api.get("/api/admin/registrations");
      
      if (json.data) {
        setAccounts(json.data
          .filter((u: any) => u.status === "Pending" && u.role === "Student")
          .map((u: any) => ({
            id: u.school_id,
            name: `${u.firstname} ${u.lastname}`,
            email: u.email,
            role: u.role,
            department: u.department,
            program: u.program,
            year: u.year,
            status: u.status,
            joined: new Date(u.created_at).toLocaleDateString()
        })));
      }
    } catch (err) {
      fireToast("err", "Failed to load registrations from server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const filtered = accounts.filter(a => {
    const ms = a.name.toLowerCase().includes(search.toLowerCase()) ||
               a.email.toLowerCase().includes(search.toLowerCase()) ||
               a.id.toLowerCase().includes(search.toLowerCase());
    const mt = true;
    const mc = appProgram === "All" || a.program === appProgram;
    const my = appYear === "All" || a.year === appYear;
    return ms && mt && mc && my;
  }).sort((a, b) => a.name.localeCompare(b.name));

  // // 🚀 2. APPROVE ACTION
  // const approve = async (id: string) => {
  //   try {
  //     const res = await fetch("http://localhost:8080/api/users/approve", {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ school_id: id }),
  //     });
  //     if (res.ok) {
  //       fireToast("ok", "Student registration approved!");
  //       fetchRegistrations(); // Refresh list
  //       setViewApplicant(null);
  //     } else {
  //       fireToast("err", "Failed to approve student.");
  //     }
  //   } catch (err) { fireToast("err", "Server error"); }
  // };

  // // 🚀 3. REJECT ACTION
  // const reject = async (id: string, reason: string) => {
  //   try {
  //     const res = await fetch("http://localhost:8080/api/users/reject", {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ school_id: id, reason: reason }),
  //     });
  //     if (res.ok) {
  //       fireToast("ok", "Registration rejected. Student has been notified.");
  //       fetchRegistrations(); // Refresh list
  //       setRejectModal(null);
  //       setViewApplicant(null);
  //       setRejectReason("");
  //     } else {
  //       fireToast("err", "Failed to reject student.");
  //     }
  //   } catch (err) { fireToast("err", "Server error"); }
  // };

  // const tabCounts: any = {
  //   pending: pending.filter(p => p.status === "pending").length,
  //   approved: pending.filter(p => p.status === "approved").length,
  //   rejected: pending.filter(p => p.status === "rejected").length,
  //   all: pending.length,
  // };

  // const statusColor: any = { pending: "amber", approved: "green", rejected: "red" };
  // const statusLabel: any = { pending: "⏳ Pending", approved: "✓ Approved", rejected: "✗ Rejected" };

  return (
    <div style={{ animation: "fadeUp .3s ease" }}>

      {/* HEADER */}
      <div style={{ marginBottom: 20 }}>
        <div className="page-header">Registration Approvals</div>
        <div className="page-sub">Review and approve student registration requests</div>
      </div>

      {/* SUMMARY CARDS */}
      {/* <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginBottom: 24 }}>
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
      </div> */}

      {/* FILTERS */}
      <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap", alignItems: "center" }}>
        <div className="search-wrapper">
          <IconSearch/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search"/>
        </div>
        <select className="pills" value={appProgram} onChange={e => setAppProgram(e.target.value)}>
          {PROGRAMS.map(c => <option key={c}>{c}</option>)}
        </select>
        <select className="pills" value={appYear} onChange={e => setAppYear(e.target.value)}>
          {YEARS.map(y => <option key={y}>{y}</option>)}
        </select>
        {(appProgram !== "All" || appYear !== "All" || search) && (
          <button className="pills" onClick={() => { setAppProgram("All"); setAppYear("All"); setSearch(""); }} style={{ background: "#f5f5f5", borderColor: "#dadada", color: "#777777" }}>
            Reset
          </button>
        )}
      </div>

      {/* TABLE */}
      <div className="data-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>User Details</th>
              <th>Email</th>
              <th>Department</th>
              <th>Program</th>
              <th>Year Level</th>
              <th>Data Joined</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} style={{ padding: 60, textAlign: "center" }}>
                  <div className="spinner" style={{ borderColor: "var(--color-surface)", borderTopColor: "var(--color-primary)", margin: "0 auto 12px" }} />
                  Loading accounts...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: 40, textAlign: "center", color: "var(--color-subtext)", fontStyle: "italic", background: "var(--color-surface)" }}>
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
                  <td style={{ fontSize: 12.5, color: "var(--color-subtext)" }}>{a.department}</td>
                  <td style={{ fontSize: 12.5, color: "var(--color-subtext)" }}>{a.program}</td>
                  <td style={{ fontSize: 12.5, color: "var(--color-subtext)" }}>{a.year}</td>
                  <td style={{ fontSize: 12.5, color: "var(--color-subtext)" }}>{a.joined}</td>
                  <td><button className="ellipsis-button" onClick={() => setViewApplicant(a)}><IconEllipsis/></button></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
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
                {/* <div style={{ marginTop: 8 }}><Badge label={statusLabel[viewApplicant.status]} type={statusColor[viewApplicant.status]} /></div> */}
              </div>
            </div>

            {[
              ["School ID", viewApplicant.id],
              ["Program", viewApplicant.program],
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
                {/* <Btn onClick={() => approve(viewApplicant.id)}>✓ Approve</Btn> */}
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
            <div style={{ fontSize: 12, color: "#8a8ea8", marginBottom: 18 }}>{rejectModal.email} · {rejectModal.id}</div>
            
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#1a2744", display: "block", marginBottom: 7 }}>Reason for Rejection *</label>
              <textarea value={rejectReason} onChange={e => setRejectReason(e.target.value)} placeholder="e.g. Incomplete requirements, Invalid student ID, Duplicate account…"
                style={{ width: "100%", background: "#f0ede5", border: "2px solid transparent", borderRadius: 11, padding: "11px 13px", fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: "#1a2744", outline: "none", resize: "vertical", minHeight: 90 }} />
            </div>
            <div style={{ background: "#fff8e6", border: "1px solid #fde8b0", borderRadius: 10, padding: "10px 14px", marginBottom: 18 }}>
              <div style={{ fontSize: 12, color: "#a06010" }}>📧 The student will receive an email notification with this reason.</div>
            </div>
            
            <div style={{ display: "flex", gap: 9 }}>
              {/* <Btn variant="red" onClick={() => { if (!rejectReason.trim()) { fireToast("err", "Please provide a reason"); return; } reject(rejectModal.id, rejectReason); }}>Confirm Rejection</Btn> */}
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