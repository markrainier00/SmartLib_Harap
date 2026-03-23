"use client";

import React, { useState, useEffect } from "react";

export default function SuperAdminConcerns() {
  // 🚀 1. TINANGGAL NA NATIN ANG FAKE DATA, BLANGKONG ARRAY NA SIYA NGAYON
  const [concerns, setConcerns] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [replyText, setReplyText] = useState("");
  const [toast, setToast] = useState({ show: false, msg: "", type: "ok" });

  const fireToast = (msg: string, type = "ok") => { 
    setToast({ show: true, msg, type }); 
    setTimeout(() => setToast({ show: false, msg: "", type: "ok" }), 3000); 
  };

  // 🚀 2. FETCH CONCERNS MULA SA TOTOONG DATABASE
  const fetchConcerns = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/concerns");
      const json = await res.json();
      if (json.isSuccess && json.data) {
        // I-format ang petsa
        const formattedData = json.data.map((c: any) => ({
          ...c,
          date: new Date(c.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        }));
        setConcerns(formattedData);
      }
    } catch (error) {
      console.error("Failed to fetch concerns", error);
    }
  };

  useEffect(() => {
    fetchConcerns();
  }, []);

  // 🚀 3. SEND REPLY PAPUNTA SA DATABASE
  const handleSendReply = async () => { 
    if (!replyText.trim() || !selectedId) return; 
    
    try {
      const res = await fetch(`http://localhost:8080/api/concerns/${selectedId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reply: replyText }),
      });
      const json = await res.json();

      if (json.isSuccess) {
        const concern = concerns.find(c => c.id === selectedId); 
        fireToast(`Reply sent to ${concern?.student}`, "ok"); 
        setReplyText("");
        fetchConcerns(); // I-refresh ang listahan para makita agad ang reply
      } else {
        fireToast("Failed to send reply", "err");
      }
    } catch (err) {
      fireToast("Server error", "err");
    }
  };

  // 🚀 4. I-UPDATE ANG STATUS TO "RESOLVED" SA DATABASE
  const handleResolve = async () => { 
    if (!selectedId) return; 
    
    try {
      const res = await fetch(`http://localhost:8080/api/concerns/${selectedId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Resolved" }),
      });
      const json = await res.json();

      if (json.isSuccess) {
        fireToast("Marked as Resolved", "ok"); 
        fetchConcerns(); // I-refresh ang listahan
      } else {
        fireToast("Failed to resolve", "err");
      }
    } catch (err) {
      fireToast("Server error", "err");
    }
  };

  const filteredConcerns = concerns.filter(c => { 
    return (c.title.toLowerCase().includes(search.toLowerCase()) || c.student.toLowerCase().includes(search.toLowerCase())) && 
           (typeFilter === "All Types" || c.type === typeFilter) && 
           (statusFilter === "All Status" || c.status === statusFilter); 
  });
  
  const selectedConcern = concerns.find(c => c.id === selectedId);

  const ctypeClass: any = { 'Lost Book': 'sa-ct-lost', 'Damaged Book': 'sa-ct-damaged', 'Book Request': 'sa-ct-request', 'Renewal': 'sa-ct-renewal', 'Other': 'sa-ct-other' };
  const statusClass: any = { 'Pending': 'sa-pill-pending', 'In Review': 'sa-pill-review', 'Resolved': 'sa-pill-resolved' };

  return (
    <div className="sa-page-anim">
      <div className="page-title">Student Concerns</div>
      <div className="page-sub">Review and respond to concerns submitted by students</div>
      
      <div className="sa-filter-row">
        <div className="sa-search-wrap">
          <span className="s-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg></span>
          <input type="text" className="sa-input" style={{ width: "190px" }} placeholder="Search concern…" aria-label="Search concern" title="Search concern" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="sa-sel" aria-label="Filter by type" title="Filter by type" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}><option>All Types</option><option>Lost Book</option><option>Damaged Book</option><option>Book Request</option><option>Renewal</option><option>Other</option></select>
        <select className="sa-sel" aria-label="Filter by status" title="Filter by status" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}><option>All Status</option><option>Pending</option><option>In Review</option><option>Resolved</option></select>
      </div>

      <div className="sa-concern-layout">
        <div>
          <div className="sa-concern-list">
            {/* 🚀 KAPAG WALANG LAMAN ANG DATABASE, ITO ANG LALABAS */}
            {filteredConcerns.length === 0 ? (
               <div style={{ padding: 40, textAlign: "center", color: "#8a8ea8", background: "#fff", borderRadius: 16 }}>No concerns found in database.</div>
            ) : filteredConcerns.map(c => (
              <div key={c.id} className={`sa-cc ${selectedId === c.id ? 'active' : ''}`} onClick={() => setSelectedId(c.id)}>
                <div><span className={`sa-ctype ${ctypeClass[c.type] || 'sa-ct-other'}`}>{c.type}</span></div><div className="sa-cc-title">{c.title}</div>
                <div className="sa-cc-meta"><span className="sa-cc-who">👤 {c.student} · {c.course}</span><div style={{ display: "flex", alignItems: "center", gap: "8px" }}><span style={{ fontSize: "11px", color: "var(--text3)" }}>{c.date}</span><span className={`pill ${statusClass[c.status] || 'sa-pill-pending'}`}>{c.status}</span></div></div>
              </div>
            ))}
          </div>
        </div>
        <div className="sa-detail-panel">
          {!selectedConcern ? (
            <div className="sa-detail-empty"><div className="d-ico">💬</div><p>Select a concern to view details</p></div>
          ) : (
            <>
              <div style={{ marginBottom: "14px" }}><span className={`sa-ctype ${ctypeClass[selectedConcern.type] || 'sa-ct-other'}`}>{selectedConcern.type}</span><div style={{ fontSize: "15px", fontWeight: 800, color: "var(--green-900)", marginTop: "7px" }}>{selectedConcern.title}</div></div>
              <div className="sa-dr"><span className="sa-dk">Student</span><span className="sa-dv">{selectedConcern.student}</span></div>
              <div className="sa-dr"><span className="sa-dk">Course</span><span className="sa-dv">{selectedConcern.course}</span></div>
              <div className="sa-dr"><span className="sa-dk">Status</span><span className="sa-dv"><span className={`pill ${statusClass[selectedConcern.status] || 'sa-pill-pending'}`}>{selectedConcern.status}</span></span></div>
              
              <div style={{ marginTop: "13px" }}>
                <div className="sa-form-label">Student's Message</div>
                <div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "12px", fontSize: "12.5px", color: "var(--text2)", lineHeight: 1.65, marginTop: "5px" }}>{selectedConcern.msg}</div>
              </div>

              {/* 🚀 IPAKITA ANG PREVIOUS REPLY KUNG MERON NA SA DATABASE */}
              {selectedConcern.reply && (
                <div style={{ marginTop: "12px" }}>
                  <div className="sa-form-label">Admin's Previous Reply</div>
                  <div style={{ background: "#e8ecf5", border: "1px solid #c2c9d6", borderRadius: "var(--radius-sm)", padding: "12px", fontSize: "12.5px", color: "#1a2744", lineHeight: 1.65, marginTop: "5px" }}>
                    {selectedConcern.reply}
                  </div>
                </div>
              )}

              <div style={{ marginTop: "12px" }}>
                <div className="sa-form-label">{selectedConcern.reply ? "Send another reply" : "Admin Reply"}</div>
                <textarea className="sa-textarea" rows={3} placeholder="Type your response…" aria-label="Admin Reply Box" title="Admin Reply Box" value={replyText} onChange={e => setReplyText(e.target.value)} />
              </div>
              
              <div style={{ display: "flex", gap: "7px", marginTop: "11px" }}>
                <button className="sa-btn sa-btn-green" style={{ flex: 1, justifyContent: "center" }} onClick={handleSendReply}>Send Reply</button>
                {selectedConcern.status !== "Resolved" && (<button className="sa-btn sa-btn-ghost" style={{ flex: 1, justifyContent: "center" }} onClick={handleResolve}>✅ Mark as Resolved</button>)}
              </div>
            </>
          )}
        </div>
      </div>
      <div className={`sa-toast ${toast.type === 'err' ? 'sa-toast-err' : ''} ${toast.show ? 'show' : ''}`} style={toast.type === 'err' ? { background: '#ef4444', color: '#fff' } : {}}>✅ {toast.msg}</div>
    </div>
  );
}