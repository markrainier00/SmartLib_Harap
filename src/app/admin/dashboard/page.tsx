"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/user";
import { IconActiveBorrow, IconBookRequests, IconRegistrationRequests } from "@/components/icons";

export default function StaffDashboard() {
  const router = useRouter();
  const { firstName } = useUser();

  return (
    <div className="page-layout fadeUp">
      <div className="page-header">Library History</div>
      <div className="page-sub">Your complete borrowing activity recorded in the system</div>

      <div className="summary-grid">
        <div className="sum-card">
          <div className="sum-num" style={{ color: "var(--color-error)" }}>?</div>
          <div className="sum-label">Registration Requests</div>
        </div>
        <div className="sum-card">
          <div className="sum-num" style={{ color: "#e8a020" }}>?</div>
          <div className="sum-label">Borrow Requests</div>
        </div>
        <div className="sum-card">
          <div className="sum-num" style={{ color: "var(--color-info)" }}>?</div>
          <div className="sum-label">Active Borrows</div>
        </div>
      </div>

      {/* SYSTEM STATUS (Base sa Image mo) */}
      <div style={{ 
        background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)", 
        borderRadius: 24, 
        padding: "32px", 
        color: "#fff", 
        position: "relative",
        overflow: "hidden",
        marginBottom: 32,
        boxShadow: "0 20px 40px rgba(59, 130, 246, 0.2)"
      }}>
        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", opacity: 0.8, marginBottom: 12 }}>System Status</div>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>All systems are running smoothly.</h2>
          <p style={{ fontSize: 14, opacity: 0.9, maxWidth: 500, lineHeight: 1.6, marginBottom: 24 }}>
            You have pending tasks that need your attention. Review new student registrations and book borrowing requests to keep the library moving.
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={() => router.push("/admin/scanner")} style={{ background: "#fff", color: "#1e3a8a", border: "none", padding: "10px 20px", borderRadius: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
              ✅ Review Registrations
            </button>
            <button onClick={() => router.push("/admin/approvals")} style={{ background: "#fff", color: "#1e3a8a", border: "none", padding: "10px 20px", borderRadius: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
              ✅ Review Registrations
            </button>
            <button onClick={() => router.push("/admin/requests")} style={{ background: "rgba(255,255,255,0.2)", color: "#fff", border: "none", padding: "10px 20px", borderRadius: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, backdropFilter: "blur(10px)" }}>
              📬 View Book Requests
            </button>
          </div>
        </div>
        {/* Decorative Books Icon in background */}
        <div style={{ position: "absolute", right: -20, bottom: -20, fontSize: 180, opacity: 0.1, transform: "rotate(-15deg)" }}>📚</div>
      </div>

      {/* QUICK ACTIONS (Hindi tinanggal ang Scanner) */}
      <div>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1a2744", marginBottom: 16 }}>Quick Actions</h3>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          
        </div>
      </div>
    </div>
  );
}