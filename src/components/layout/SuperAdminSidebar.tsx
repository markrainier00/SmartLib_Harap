"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SuperAdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", path: "/superadmin", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg> },
    { name: "Manage Accounts", path: "/superadmin/accounts", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
    { name: "Data Analytics", path: "/superadmin/analytics", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> },
    { name: "Student Concerns", path: "/superadmin/concerns", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, badge: "5" },
    { name: "Profile", path: "/superadmin/profile", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">📚</div>
        <div className="logo-text">
          <div className="logo-name">SmartLib</div>
          <div className="logo-sub">Super Admin Portal</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link key={item.name} href={item.path} style={{ textDecoration: 'none' }}>
              <div className={`nav-item ${isActive ? "active" : ""}`}>
                {item.icon}
                {item.name}
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <Link href="/superadmin/profile" style={{ textDecoration: 'none' }}>
          <div className="admin-pill">
            <div className="avatar">SA</div>
            <div className="admin-pill-info">
              <div className="admin-pill-name">Super Admin</div>
              <div className="admin-pill-role">Administrator</div>
            </div>
          </div>
        </Link>
      </div>
    </aside>
  );
}