"use client";

import React from "react";
import Link from "next/link";

export default function DashboardHome() {
  return (
    <div>
      <div style={{ marginBottom: 22 }}>
        <h1 className="np" style={{ fontSize: 26 }}>Welcome back, Juan 👋</h1>
        <p style={{ color: "rgba(226,226,238,.38)", fontSize: 13, marginTop: 5 }}>Library overview — March 2026</p>
      </div>

      {/* Account status banner */}
      <div style={{ background: "rgba(76,175,80,.07)", border: "1px solid rgba(76,175,80,.2)", borderRadius: 14, padding: "14px 18px", marginBottom: 22, display: "flex", gap: 12, alignItems: "center" }}>
        <span style={{ fontSize: 20 }}>✅</span>
        <div>
          <p style={{ fontSize: 14, fontWeight: 600, color: "#66bb6a" }}>Account Approved</p>
          <p style={{ fontSize: 12, color: "rgba(226,226,238,.42)", marginTop: 2 }}>Your library account is active. Email notifications sent to <span style={{ color: "#c9a84c" }}>juan@university.edu</span></p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: 13, marginBottom: 26 }}>
        {[
          { label: "Borrowed", value: 3, icon: "📖", color: "#c9a84c" },
          { label: "Reserved", value: 1, icon: "🔖", color: "#6495ed" },
          { label: "History",  value: 4, icon: "📋", color: "#66bb6a" },
          { label: "Overdue",  value: 0, icon: "⏰", color: "#e74c3c" },
        ].map((s, i) => (
          <div key={i} className="card" style={{ padding: "18px 20px" }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>{s.icon}</div>
            <div className="np" style={{ fontSize: 32, color: s.color, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "rgba(226,226,238,.38)", marginTop: 5 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 13, color: "rgba(226,226,238,.6)" }}>Quick Actions</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 10 }}>
        {[
          { label: "Browse Books",     icon: "🔍", path: "/dashboard/library" },
          { label: "Recommendations",  icon: "⭐", path: "/dashboard/recommendation" },
          { label: "View History",     icon: "📋", path: "/dashboard/history" },
        ].map((a, i) => (
          <Link key={i} href={a.path} className="btn btn-ghost" style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", justifyContent: "flex-start", borderRadius: 12, textDecoration: "none" }}>
            <span style={{ fontSize: 18 }}>{a.icon}</span>
            <span style={{ fontSize: 13 }}>{a.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}   