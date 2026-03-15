"use client";

import React, { useEffect, useState } from "react";

// Reuse Badge and Btn components
function Badge({ label, type = "navy" }: any) {
  const m: any = {
    green: ["#e6f7ec", "#2d7a4f"], 
    red: ["#fdeaea", "#c94040"],
    blue: ["#e8f1fd", "#2563eb"], 
    navy: ["#e8ecf5", "#1a2744"],
    amber: ["#fef5e6", "#a06010"]
  };
  const [bg, fg] = m[type] || m.navy;
  return <span style={{ background: bg, color: fg, padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, display: "inline-block" }}>{label}</span>;
}

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [reqTab, setReqTab] = useState("Pending"); 
  const [reqSearch, setReqSearch] = useState("");
  const [toast, setToast] = useState<any>(null);

  const fireToast = (type: string, msg: string) => { setToast({ type, msg }); setTimeout(() => setToast(null), 3000); };

  // 🚀 FETCH DATA (Kasama na ang Pickup at Return dates)
  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/transactions/pending-all");
      const result = await res.json();
      if (res.ok) {
        setRequests(result.data || []);
      }
    } catch (err) {
      fireToast("err", "Failed to connect to backend");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // 🚀 APPROVE REQUEST (Mark as Borrowed)
  const approveReq = async (schoolID: string) => {
    try {
      const res = await fetch("http://localhost:8080/api/transactions/release", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ school_id: schoolID }),
      });
      if (res.ok) {
        fireToast("ok", "Book released successfully!");
        fetchRequests();
      }
    } catch (err) { fireToast("err", "Server error"); }
  };

  // 🚀 REJECT REQUEST 
  const rejectReq = async (schoolID: string) => {
    if(!confirm("Are you sure you want to REJECT this request?")) return;
    
    try {
      const res = await fetch(`http://localhost:8080/api/transactions/reject`, {
        method: "PUT", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ school_id: schoolID }),
      });
      
      if (res.ok) {
        fireToast("ok", "Request Rejected.");
        fetchRequests();
      } else {
        fireToast("err", "Failed to reject.");
      }
    } catch (err) { fireToast("err", "Server error"); }
  };

  // Helper para sa Date formatting (kung sakaling real-time date ang gusto mo)
  const formatDate = (dateStr: string) => {
    if(!dateStr) return "N/A";
    // Check if it's just a simple YYYY-MM-DD string (tulad ng sa form input)
    if(dateStr.length === 10) return dateStr; 
    
    const d = new Date(dateStr);
    if(isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString() + " " + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const filtReqs = requests.filter(r => {
    const ms = (r.book_title || "").toLowerCase().includes(reqSearch.toLowerCase()) ||
               (r.school_id || "").includes(reqSearch);
    const mt = reqTab === "All" || r.status === reqTab;
    return ms && mt;
  });

  return (
    <div style={{ animation: "fadeUp .3s ease", padding: "10px" }}>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        .row-hover:hover { background: #f7f5f0 !important; }
        .tab-btn { border: none; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-size: 13px; font-weight: 600; transition: 0.2s; background: #eee; color: #666; }
        .tab-btn.active { background: #1a2744; color: #fff; }
      `}</style>

      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, color: "#1a2744" }}>Transaction Requests</div>
        <div style={{ fontSize: 13, color: "#8a8ea8", marginTop: 2 }}>Manage real-time book borrowing requests</div>
      </div>

      {/* TABS & SEARCH */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 15 }}>
        <div style={{ display: "flex", gap: 10 }}>
          {["Pending", "Borrowed", "Rejected", "All"].map(t => (
            <button key={t} className={`tab-btn ${reqTab === t ? "active" : ""}`} onClick={() => setReqTab(t)}>{t}</button>
          ))}
        </div>
        <input value={reqSearch} onChange={e => setReqSearch(e.target.value)} placeholder="Search student or book..."
          style={{ width: "100%", maxWidth: 300, background: "#fff", border: "2px solid #e2dfd6", borderRadius: 10, padding: "8px 15px", fontSize: 13, outline: "none" }} />
      </div>

      {/* TABLE */}
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2dfd6", boxShadow: "0 2px 12px rgba(26,39,68,.06)", overflow: "hidden" }}>
        {/* 🚀 BINAGO ANG GRID LAYOUT PARA KASYA ANG DATES */}
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.5fr 1.5fr 1fr 1.5fr", padding: "14px 20px", background: "#f7f5f0", borderBottom: "1px solid #e2dfd6" }}>
          {["Student ID", "Book Title", "Schedule (Pickup - Return)", "Status", "Actions"].map(h => (
            <div key={h} style={{ fontSize: 10.5, fontWeight: 700, color: "#8a8ea8", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</div>
          ))}
        </div>
        
        {loading ? (
          <div style={{ padding: 50, textAlign: "center", color: "#1a2744" }}>
             <div className="spinner" style={{ width: 24, height: 24, border: "3px solid #1a274433", borderTopColor: "#1a2744", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 10px" }}></div>
             Loading requests...
          </div>
        ) : filtReqs.length === 0 ? (
          <div style={{ padding: 50, textAlign: "center", color: "#8a8ea8" }}>No requests found in this category</div>
        ) : (
          filtReqs.map((r, i) => (
            // 🚀 BINAGO ANG GRID LAYOUT DITO RIN
            <div key={i} className="row-hover" style={{ display: "grid", gridTemplateColumns: "1.2fr 1.5fr 1.5fr 1fr 1.5fr", padding: "16px 20px", borderBottom: "1px solid #f2efe8", alignItems: "center" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1a2744" }}>{r.school_id}</div>
              <div style={{ fontSize: 13, color: "#444" }}>{r.book_title}</div>
              
              {/* 🚀 ITO YUNG MGA DATES NA NILAGAY NG STUDENT */}
              <div style={{ fontSize: 12, color: "#64748b" }}>
                <div style={{ color: "#2d7a4f", fontWeight: 600 }}>P: {formatDate(r.pickup_date)}</div>
                <div style={{ color: "#c94040", fontWeight: 600, marginTop: 2 }}>R: {formatDate(r.return_date)}</div>
              </div>

              <div>
                <Badge label={r.status} type={r.status === "Pending" ? "amber" : r.status === "Borrowed" ? "green" : "red"} />
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {r.status === "Pending" ? (
                  <>
                    <button onClick={() => approveReq(r.school_id)} style={{ background: "#1a2744", color: "#fff", border: "none", borderRadius: 8, padding: "8px 12px", fontSize: 11, fontWeight: 600, cursor: "pointer", transition: "0.2s" }}>
                      Approve
                    </button>
                    <button onClick={() => rejectReq(r.school_id)} style={{ background: "#fdeaea", color: "#c94040", border: "1px solid #f5c5c5", borderRadius: 8, padding: "8px 12px", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
                      Reject
                    </button>
                  </>
                ) : (
                  <span style={{ fontSize: 11, color: "#b0afc9", fontStyle: "italic" }}>Processed</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      {/* TOAST */}
      {toast && (
        <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: toast.type === "err" ? "#c94040" : "#1a2744", color: "#fff", padding: "12px 25px", borderRadius: 12, zIndex: 200, boxShadow: "0 10px 25px rgba(0,0,0,0.2)", animation: "fadeUp 0.3s ease" }}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}