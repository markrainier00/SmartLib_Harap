"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function SuperAdminTopbar() {
  const [ddOpen, setDdOpen] = useState(false);

  return (
    <div className="topbar">
      <div className="search-box">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="text" placeholder="Search books, authors, accounts…" aria-label="Search input" title="Search" />
      </div>
      <div className="topbar-right">
        <div className="icon-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        </div>
        <div className="icon-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          <span className="notif-dot"></span>
        </div>
        
        <div className="user-pill" onClick={() => setDdOpen(!ddOpen)}>
          <div className="sa-avatar">SA</div>
          Super Admin
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          
          <div className={`sa-dropdown ${ddOpen ? "open" : ""}`} style={{ position: "absolute", top: "calc(100% + 8px)", right: 0 }}>
            <div className="sa-dd-header">
              <div className="sa-dd-name">Super Admin</div>
              <div className="sa-dd-email">superadmin@smartlib.edu</div>
            </div>
            <Link href="/superadmin/profile" style={{ textDecoration: 'none' }}>
              <div className="sa-dd-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> 
                View Profile
              </div>
            </Link>
            <div className="div" style={{ margin: "4px 0", height: "1px", background: "var(--border)" }}></div>
            <div className="sa-dd-item danger">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg> 
              Logout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}