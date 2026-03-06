"use client";

import React, { useState } from "react";

/* ─── HELPERS & MOCK DATA ───────────────────────────────── */
const INIT_HISTORY = [
  { id: "TRX-00101", student: "Juan dela Cruz", book: "Introduction to Algorithms", borrowDate: "Feb 10, 2026", dueDate: "Feb 24, 2026", returnDate: "Feb 22, 2026", status: "returned", penalty: 0 },
  { id: "TRX-00102", student: "Maria Santos", book: "Human Anatomy & Physiology", borrowDate: "Feb 15, 2026", dueDate: "Mar 01, 2026", returnDate: "Mar 03, 2026", status: "returned", penalty: 100 },
  { id: "TRX-00103", student: "Sofia Manalo", book: "Calculus: Early Transcendentals", borrowDate: "Feb 25, 2026", dueDate: "Mar 11, 2026", returnDate: "—", status: "borrowed", penalty: 0 },
  { id: "TRX-00104", student: "Pedro Bautista", book: "Engineering Mechanics", borrowDate: "Jan 15, 2026", dueDate: "Jan 29, 2026", returnDate: "—", status: "lost", penalty: 1500 },
  { id: "TRX-00105", student: "Mark Villanueva", book: "Physics for Scientists", borrowDate: "Feb 18, 2026", dueDate: "Mar 04, 2026", returnDate: "—", status: "overdue", penalty: 100 },
  { id: "TRX-00106", student: "Luz Garcia", book: "Organic Chemistry", borrowDate: "Mar 01, 2026", dueDate: "Mar 15, 2026", returnDate: "—", status: "borrowed", penalty: 0 },
  { id: "TRX-00107", student: "Nena Cruz", book: "Data Structures in Java", borrowDate: "Feb 01, 2026", dueDate: "Feb 15, 2026", returnDate: "Feb 15, 2026", status: "returned", penalty: 0 },
  { id: "TRX-00108", student: "Carlos Reyes", book: "Business Law", borrowDate: "Feb 12, 2026", dueDate: "Feb 26, 2026", returnDate: "Mar 01, 2026", status: "returned", penalty: 150 },
];

function Badge({ label, type = "navy" }: any) {
  const m: any = {
    green: ["#e6f7ec", "#2d7a4f"], red: ["#fdeaea", "#c94040"],
    blue: ["#e8f1fd", "#2563eb"], navy: ["#e8ecf5", "#1a2744"],
    amber: ["#fef5e6", "#a06010"], gray: ["#f0ede5", "#64748b"]
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
export default function AdminHistoryPage() {
  const [history, setHistory] = useState<any[]>(INIT_HISTORY);
  const [histSearch, setHistSearch] = useState("");
  const [histStatus, setHistStatus] = useState("All");

  const [viewTx, setViewTx] = useState<any>(null);

  const statusColor: any = { returned: "green", borrowed: "blue", overdue: "red", lost: "gray" };
  const statusLabel: any = { returned: "✓ Returned", borrowed: "📖 Borrowed", overdue: "⚠️ Overdue", lost: "❓ Lost" };

  const filtHist = history.filter(h => {
    const ms = h.student.toLowerCase().includes(histSearch.toLowerCase()) ||
               h.book.toLowerCase().includes(histSearch.toLowerCase()) ||
               h.id.toLowerCase().includes(histSearch.toLowerCase());
    const mt = histStatus === "All" || h.status === histStatus;
    return ms && mt;
  });

  return (
    <div style={{ animation: "fadeUp .3s ease" }}>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        .row-hover:hover { background: #f7f5f0 !important; }
        .chip { border: 2px solid #e2dfd6; border-radius: 50px; padding: 7px 16px; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600; cursor: pointer; background: #fff; color: #8a8ea8; transition: all .18s; }
        .chip:hover { border-color: #1a2744; color: #1a2744; }
        .chip.active { background: #1a2744; color: #fff; border-color: #1a2744; }
      `}</style>

      {/* HEADER */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, color: "#1a2744" }}>Borrow History</div>
        <div style={{ fontSize: 13, color: "#8a8ea8", marginTop: 2 }}>Permanent log of all library transactions and penalties</div>
      </div>

      {/* FILTERS */}
      <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200, maxWidth: 350 }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, pointerEvents: "none" }}>🔍</span>
          <input value={histSearch} onChange={e => setHistSearch(e.target.value)} placeholder="Search ID, student, or book…"
            style={{ width: "100%", background: "#fff", border: "2px solid #e2dfd6", borderRadius: 11, padding: "9px 13px 9px 38px", fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: "#1a2744", outline: "none" }} />
        </div>
        
        {["All", "returned", "borrowed", "overdue", "lost"].map(v => (
          <button key={v} className={`chip ${histStatus === v ? "active" : ""}`} onClick={() => setHistStatus(v)}>
            {v === "All" ? "All Records" : statusLabel[v]}
          </button>
        ))}
        
        <div style={{ marginLeft: "auto", fontSize: 12, color: "#8a8ea8" }}>{filtHist.length} record{filtHist.length !== 1 ? "s" : ""}</div>
      </div>

      {/* TABLE */}
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2dfd6", boxShadow: "0 2px 12px rgba(26,39,68,.06)", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.8fr 2fr 1fr 1fr 1fr 1fr 0.6fr", padding: "11px 20px", background: "#f7f5f0", borderBottom: "1px solid #e2dfd6" }}>
          {["Trans ID", "Student", "Book", "Borrowed", "Due Date", "Returned", "Status", ""].map((h, i) => (
            <div key={i} style={{ fontSize: 10.5, fontWeight: 700, color: "#8a8ea8", letterSpacing: ".06em", textTransform: "uppercase" }}>{h}</div>
          ))}
        </div>

        {filtHist.length === 0 ? (
          <div style={{ padding: 40, textAlign: "center", color: "#8a8ea8" }}>
            <div style={{ fontSize: 36, marginBottom: 10 }}>📭</div>
            No transaction records found
          </div>
        ) : (
          filtHist.map((h, i) => (
            <div key={h.id} className="row-hover" style={{ display: "grid", gridTemplateColumns: "1fr 1.8fr 2fr 1fr 1fr 1fr 1fr 0.6fr", padding: "14px 20px", borderBottom: i < filtHist.length - 1 ? "1px solid #f2efe8" : "none", alignItems: "center", transition: "background .15s" }}>
              <div style={{ fontSize: 12.5, fontFamily: "monospace", color: "#64748b", fontWeight: 600 }}>{h.id}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#1a2744" }}>{h.student}</div>
              <div style={{ fontSize: 12.5, color: "#64748b", lineHeight: 1.3 }}>{h.book.length > 28 ? h.book.slice(0, 28) + "…" : h.book}</div>
              <div style={{ fontSize: 12, color: "#8a8ea8" }}>{h.borrowDate}</div>
              <div style={{ fontSize: 12, color: h.status === "overdue" ? "#c94040" : "#8a8ea8", fontWeight: h.status === "overdue" ? 700 : 400 }}>{h.dueDate}</div>
              <div style={{ fontSize: 12, color: h.returnDate === "—" ? "#cbd5e1" : "#1a2744", fontWeight: 600 }}>{h.returnDate}</div>
              <div>
                <Badge label={statusLabel[h.status]} type={statusColor[h.status]} />
                {h.penalty > 0 && <div style={{ fontSize: 10, color: "#c94040", fontWeight: 700, marginTop: 4 }}>₱ {h.penalty}.00 Penalty</div>}
              </div>
              <div style={{ textAlign: "right" }}>
                <button onClick={() => setViewTx(h)} style={{ background: "#f0ede5", border: "1.5px solid #e2dfd6", borderRadius: 8, padding: "5px 9px", fontSize: 13, cursor: "pointer", transition: "all .15s" }}>👁</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── MODAL: VIEW TRANSACTION DETAILS ── */}
      {viewTx && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(26,39,68,.5)", backdropFilter: "blur(6px)", zIndex: 90, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={e => e.target === e.currentTarget && setViewTx(null)}>
          <div style={{ background: "#fff", borderRadius: 22, padding: "28px", maxWidth: 460, width: "100%", boxShadow: "0 24px 64px rgba(26,39,68,.18)", animation: "fadeUp .25s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#3d8bef", marginBottom: 4 }}>Transaction Details</div>
                <div style={{ fontFamily: "monospace", fontSize: 16, fontWeight: 700, color: "#1a2744" }}>{viewTx.id}</div>
              </div>
              <button onClick={() => setViewTx(null)} style={{ background: "#f0ede5", border: "none", borderRadius: 8, padding: "5px 9px", cursor: "pointer", fontSize: 15, color: "#8a8ea8" }}>✕</button>
            </div>

            <div style={{ padding: "16px", background: "#f7f5f0", borderRadius: 14, marginBottom: 18 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#8a8ea8", textTransform: "uppercase", marginBottom: 4 }}>Student & Book</div>
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 19, color: "#1a2744" }}>{viewTx.student}</div>
              <div style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>📖 {viewTx.book}</div>
            </div>

            {[
              ["Status", <Badge key="1" label={statusLabel[viewTx.status]} type={statusColor[viewTx.status]} />],
              ["Borrowed Date", viewTx.borrowDate],
              ["Due Date", <span key="2" style={{ color: viewTx.status === "overdue" ? "#c94040" : "inherit" }}>{viewTx.dueDate}</span>],
              ["Returned Date", viewTx.returnDate],
              ["Penalty Incurred", <span key="3" style={{ color: viewTx.penalty > 0 ? "#c94040" : "#2d7a4f", fontWeight: 700 }}>₱ {viewTx.penalty}.00</span>],
            ].map(([k, v], i, arr) => (
              <div key={k as string} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < arr.length - 1 ? "1px solid #f2efe8" : "none" }}>
                <span style={{ fontSize: 13, color: "#64748b" }}>{k}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#1a2744" }}>{v}</span>
              </div>
            ))}

            <Btn variant="ghost" style={{ marginTop: 24, width: "100%", justifyContent: "center" }} onClick={() => setViewTx(null)}>Close Details</Btn>
          </div>
        </div>
      )}
    </div>
  );
}