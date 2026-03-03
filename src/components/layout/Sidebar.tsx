"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { path: "/dashboard", label: "Dashboard", emoji: "▣" },
  { path: "/dashboard/library", label: "Library", emoji: "◫" },
  { path: "/dashboard/mybooks", label: "My Books", emoji: "◈" },
  { path: "/dashboard/history", label: "History", emoji: "◷" },
  { path: "/dashboard/recommendation", label: "For You", emoji: "◆" },
];

const courses = ["BSCS", "BSIT", "BSCpE", "BSMATH", "BSBA", "BSAcc", "BSECE", "BSCHE", "BSN", "BSCE"];

export default function Sidebar({ collapsed, setCollapsed }: { collapsed: boolean, setCollapsed: (val: boolean) => void }) {
  const pathname = usePathname();
  const [course, setCourse] = useState("BSCS");
  const SW = collapsed ? 64 : 220;

  return (
    <aside style={{
      width: SW, flexShrink: 0, background: "#0f0f1d", borderRight: "1px solid rgba(255,255,255,.07)",
      display: "flex", flexDirection: "column", transition: "width .22s ease", overflow: "hidden", zIndex: 20,
    }}>
      {/* Logo */}
      <div style={{ padding: "18px 14px 14px", borderBottom: "1px solid rgba(255,255,255,.06)", display: "flex", alignItems: "center", gap: 10, overflow: "hidden" }}>
        <div style={{ width: 34, height: 34, background: "#c9a84c", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, flexShrink: 0 }}>📚</div>
        {!collapsed && (
          <div>
            <div className="np" style={{ fontSize: 16, fontWeight: 700, color: "#c9a84c", lineHeight: 1 }}>Athenaeum</div>
            <div style={{ fontSize: 10, color: "rgba(226,226,238,.28)", marginTop: 3, letterSpacing: .5 }}>STUDENT PORTAL</div>
          </div>
        )}
      </div>

      {/* Nav items */}
      <nav style={{ flex: 1, padding: "12px 8px", display: "flex", flexDirection: "column", gap: 3 }}>
        {navItems.map(n => (
          <Link
            key={n.path}
            href={n.path}
            className={`nav-btn ${pathname === n.path ? "nav-active" : ""}`}
            title={collapsed ? n.label : ""}
            style={{ justifyContent: collapsed ? "center" : "flex-start" }}
          >
            <span className="nav-icon">{n.emoji}</span>
            {!collapsed && <span>{n.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Course selector */}
      {!collapsed && (
        <div style={{ padding: "0 12px 12px" }}>
          <p style={{ fontSize: 10, color: "rgba(226,226,238,.28)", letterSpacing: .6, marginBottom: 6, paddingLeft: 2 }}>MY COURSE</p>
          <select className="sel" value={course} onChange={e => setCourse(e.target.value)} style={{ width: "100%", fontSize: 12, padding: "7px 10px" }}>
            {courses.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
      )}

      {/* Collapse toggle */}
      <div style={{ padding: "10px 8px", borderTop: "1px solid rgba(255,255,255,.06)" }}>
        <button className="nav-btn" style={{ justifyContent: collapsed ? "center" : "flex-start" }} onClick={() => setCollapsed(!collapsed)}>
          <span className="nav-icon" style={{ transform: collapsed ? "scaleX(-1)" : "scaleX(1)", transition: "transform .22s", display: "inline-block" }}>◀</span>
          {!collapsed && <span style={{ fontSize: 12 }}>Collapse</span>}
        </button>
      </div>

      {/* User */}
      <div style={{ padding: "10px 10px 14px", borderTop: "1px solid rgba(255,255,255,.06)", display: "flex", alignItems: "center", gap: 10, overflow: "hidden" }}>
        <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#c9a84c,#6b4c10)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, flexShrink: 0 }}>J</div>
        {!collapsed && (
          <div style={{ overflow: "hidden" }}>
            <p style={{ fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Juan dela Cruz</p>
            <p style={{ fontSize: 11, color: "rgba(226,226,238,.38)" }}>{course}</p>
          </div>
        )}
      </div>
    </aside>
  );
}