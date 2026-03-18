"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const program = "BSCS";

  const NAV_ITEMS = [
    { id: "/library/recommendation", icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>, label: "Recommendation" },
    { id: "/library/mylist", icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>, label: "My List" },
    { id: "/library/history", icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, label: "History" },
    { id: "/library/support", icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, label: "Support" },
  ];

  return (
    <>
      <style>{`
        .sidebar {
          width: 240px;
          min-height: 100vh;
          background: #1B5E35;
          display: flex;
          flex-direction: column;
          padding: 0;
          flex-shrink: 0;
          position: relative;
        }

        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 24px 20px 20px;
          border-bottom: 1px solid rgba(255,255,255,.1);
        }

        .logo-name {
          font-family: 'DM Serif Display', serif;
          font-size: 18px;
          color: #fff;
          font-weight: 700;
        }

        .logo-sub {
          font-size: 10px;
          color: rgba(255,255,255,.5);
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin-top: 1px;
        }

        .sidebar-course {
          padding: 20px 20px 12px;
        }

        .sidebar-course label {
          display: block;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: rgba(255,255,255,.45);
          margin-bottom: 8px;
        }

        .sidebar-nav {
          flex: 1;
          padding: 8px 12px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 10px;
          font-size: 13.5px;
          font-weight: 500;
          color: rgba(255,255,255,.65);
          text-decoration: none;
          transition: all .2s;
        }

        .nav-item:hover {
          background: rgba(255,255,255,.08);
          color: #fff;
        }

        .nav-item.active {
          background: rgba(255,255,255,.15);
          color: #fff;
          font-weight: 600;
        }

        .sidebar-user {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 16px 20px;
          border-top: 1px solid rgba(255,255,255,.1);
        }

        .user-avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #4CAF78;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          flex-shrink: 0;
        }

        .user-name {
          font-size: 13px;
          font-weight: 600;
          color: #fff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .user-course {
          font-size: 11px;
          color: rgba(255,255,255,.45);
          margin-top: 1px;
        }
      `}</style>

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
      </aside>
    </>
  );
}