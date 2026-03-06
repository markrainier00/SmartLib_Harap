"use client";

import React from "react";
import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div style={{ animation: "fadeUp .4s ease" }}>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        .hover-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(26,39,68,.1) !important; }
      `}</style>

      {/* HEADER SECTION */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: "#1a2744", marginBottom: 6 }}>
          Welcome back, Bryan! 👋
        </div>
        <div style={{ fontSize: 15, color: "#8a8ea8" }}>
          Here's what's happening in your library today.
        </div>
      </div>

      {/* BIG WELCOME BANNER */}
      <div style={{ background: "linear-gradient(135deg, #1a2744, #3d8bef)", borderRadius: 24, padding: "36px 40px", color: "#fff", position: "relative", overflow: "hidden", boxShadow: "0 16px 40px rgba(61,139,239,.2)", marginBottom: 32 }}>
        <div style={{ position: "absolute", right: -20, top: -40, fontSize: 160, opacity: 0.1, pointerEvents: "none" }}>📚</div>
        
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#7fb8f7", marginBottom: 8 }}>System Status</div>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, marginBottom: 12, lineHeight: 1.2 }}>All systems are running smoothly.</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,.8)", maxWidth: 500, lineHeight: 1.6, marginBottom: 24 }}>
            You have pending tasks that need your attention. Review new student registrations and book borrowing requests to keep the library moving.
          </p>
          
          <div style={{ display: "flex", gap: 12 }}>
            <Link href="/admin/approvals" style={{ background: "#fff", color: "#1a2744", padding: "10px 20px", borderRadius: 12, textDecoration: "none", fontSize: 13.5, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 8, transition: "transform .2s" }}>
              ✅ Review Registrations
            </Link>
            <Link href="/admin/requests" style={{ background: "rgba(255,255,255,.15)", color: "#fff", border: "1px solid rgba(255,255,255,.3)", padding: "10px 20px", borderRadius: 12, textDecoration: "none", fontSize: 13.5, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 8, transition: "background .2s" }}>
              📬 View Book Requests
            </Link>
          </div>
        </div>
      </div>

      {/* QUICK LINKS GRID */}
      <div style={{ fontSize: 16, fontWeight: 700, color: "#1a2744", fontFamily: "'DM Serif Display', serif", marginBottom: 16 }}>Quick Actions</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
        
        <Link href="/admin/scanner" className="hover-card" style={{ background: "#fff", border: "1px solid #e2dfd6", borderRadius: 16, padding: 24, textDecoration: "none", color: "inherit", transition: "all .2s", boxShadow: "0 4px 12px rgba(26,39,68,.04)" }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: "#e8f1fd", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 16 }}>📷</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#1a2744", marginBottom: 4 }}>Smart Scanner</div>
          <div style={{ fontSize: 12.5, color: "#8a8ea8", lineHeight: 1.5 }}>Quickly scan ID or Book barcodes</div>
        </Link>

        <Link href="/admin/books" className="hover-card" style={{ background: "#fff", border: "1px solid #e2dfd6", borderRadius: 16, padding: 24, textDecoration: "none", color: "inherit", transition: "all .2s", boxShadow: "0 4px 12px rgba(26,39,68,.04)" }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: "#e6f7ec", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 16 }}>📚</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#1a2744", marginBottom: 4 }}>Manage Library</div>
          <div style={{ fontSize: 12.5, color: "#8a8ea8", lineHeight: 1.5 }}>Add, edit, or remove books</div>
        </Link>

        <Link href="/admin/analytics" className="hover-card" style={{ background: "#fff", border: "1px solid #e2dfd6", borderRadius: 16, padding: 24, textDecoration: "none", color: "inherit", transition: "all .2s", boxShadow: "0 4px 12px rgba(26,39,68,.04)" }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: "#f3e8ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 16 }}>📈</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#1a2744", marginBottom: 4 }}>View Analytics</div>
          <div style={{ fontSize: 12.5, color: "#8a8ea8", lineHeight: 1.5 }}>Check system and borrow trends</div>
        </Link>

      </div>
    </div>
  );
}