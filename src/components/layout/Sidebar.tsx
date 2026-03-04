"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const [course, setCourse] = useState("BSCS");

  const NAV_ITEMS = [
    { id: "/dashboard/library", icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>, label: "Recommendations" },
    { id: "/dashboard/mybooks", icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>, label: "My List" },
    { id: "/dashboard/history", icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, label: "History" },
    { id: "/dashboard/support", icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, label: "Support" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <svg width="36" height="36" viewBox="0 0 56 56" fill="none">
          <rect x="20" y="8" width="26" height="34" rx="4" fill="#e8528a" transform="rotate(6 33 25)"/>
          <rect x="8" y="12" width="26" height="34" rx="4" fill="#3d8bef" transform="rotate(-4 21 29)"/>
          <rect x="13" y="16" width="24" height="30" rx="4" fill="#4caf6e"/>
          <rect x="14" y="17" width="2" height="28" rx="1" fill="rgba(255,255,255,0.4)"/>
        </svg>
        <div className="logo-text">
          <div className="logo-name">SmartLib</div>
          <div className="logo-sub">Student Portal</div>
        </div>
      </div>

      <div className="sidebar-course">
        <label>My Course</label>
        <select value={course} onChange={(e) => setCourse(e.target.value)}>
          {["BSCS", "BSIT", "BSCED", "BSE", "BSBA", "BSA", "BSECE", "BSCHE", "BSN", "BSCE", "BSIS", "BSP"].map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname?.includes(item.id);
          return (
            <Link key={item.id} href={item.id} className={`nav-item ${isActive ? "active" : ""}`}>
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-status">
        <span className="st-dot"></span><span className="st-label">Account Active</span>
        <div className="st-sub">Email alerts enabled for all library updates</div>
      </div>

      <div className="sidebar-user">
        <div className="user-avatar">J</div>
        <div style={{ overflow: "hidden" }}>
          <div className="user-name">Bryan Lumangaya</div>
          <div className="user-course">{course}</div>
        </div>
      </div>
    </aside>
  );
}