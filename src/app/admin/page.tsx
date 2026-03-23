"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/* ─── MINI COMPONENTS ─── */
function StatCard({ label, count, color, icon }: any) {
  return (
    <div style={{ background: "#fff", borderRadius: 16, padding: "20px", border: "1px solid #e2dfd6", display: "flex", alignItems: "center", gap: 15, flex: 1 }}>
      <div style={{ width: 48, height: 48, borderRadius: 12, background: `${color}15`, color: color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 24, fontWeight: 800, color: "#1a2744", lineHeight: 1 }}>{count}</div>
        <div style={{ fontSize: 12, color: "#8a8ea8", marginTop: 4, fontWeight: 500 }}>{label}</div>
      </div>
    </div>
  );
}

function ActionCard({ icon, title, desc, onClick }: any) {
  return (
    <div onClick={onClick} style={{ background: "#fff", borderRadius: 20, padding: "24px", border: "1px solid #e2dfd6", cursor: "pointer", transition: "all .2s", flex: 1, minWidth: 200 }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: "#f0ede5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, marginBottom: 16 }}>
        {icon}
      </div>
      <div style={{ fontWeight: 700, fontSize: 15, color: "#1a2744", marginBottom: 4 }}>{title}</div>
      <div style={{ fontSize: 12, color: "#8a8ea8", lineHeight: 1.5 }}>{desc}</div>
    </div>
  );
}

/* ─── MAIN DASHBOARD ─── */
export default function StaffDashboard() {
  const router = useRouter();
  const [adminName, setAdminName] = useState("Admin");
  
  // 🚀 STATE PARA SA MGA TOTOONG NUMERO
  const [stats, setStats] = useState({
    pendingRegistrations: 0,
    borrowRequests: 0,
    activeBorrows: 0
  });

  useEffect(() => {
    // 1. Kunin ang pangalan mula sa Local Storage
    const userStr = localStorage.getItem("smartLib_user");
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user.firstname) setAdminName(user.firstname);
    }

    // 2. 🚀 KUNIN ANG TOTOONG STATS MULA SA GO BACKEND
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/admin/stats");
        const json = await res.json();
        if (json.isSuccess) {
          setStats({
            pendingRegistrations: json.data.pending_registrations || 0,
            borrowRequests: json.data.borrow_requests || 0,
            activeBorrows: json.data.active_borrows || 0
          });
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div style={{ animation: "fadeUp .4s ease" }}>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
      `}</style>

      {/* GREETING SECTION */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, color: "#1a2744", marginBottom: 4 }}>
          Welcome back, {adminName}! 👋
        </h1>
        <p style={{ color: "#8a8ea8", fontSize: 14 }}>Here's what's happening in your library today.</p>
      </div>

      {/* 🚀 BUHAY NA STATS NA GALING SA DATABASE */}
      <div style={{ display: "flex", gap: 16, marginBottom: 28, flexWrap: "wrap" }}>
        <StatCard label="Pending Registrations" count={stats.pendingRegistrations} color="#e05c5c" icon="✅" />
        <StatCard label="Borrow Requests" count={stats.borrowRequests} color="#e8a020" icon="📬" />
        <StatCard label="Active Borrows" count={stats.activeBorrows} color="#3d8bef" icon="📖" />
      </div>

      {/* SYSTEM STATUS */}
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
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button onClick={() => router.push("/admin/approvals")} style={{ background: "#fff", color: "#1e3a8a", border: "none", padding: "10px 20px", borderRadius: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
              ✅ Review Registrations
            </button>
            <button onClick={() => router.push("/admin/requests")} style={{ background: "rgba(255,255,255,0.2)", color: "#fff", border: "none", padding: "10px 20px", borderRadius: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, backdropFilter: "blur(10px)" }}>
              📬 View Book Requests
            </button>
          </div>
        </div>
        <div style={{ position: "absolute", right: -20, bottom: -20, fontSize: 180, opacity: 0.1, transform: "rotate(-15deg)" }}>📚</div>
      </div>

      {/* QUICK ACTIONS */}
      <div>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1a2744", marginBottom: 16 }}>Quick Actions</h3>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          <ActionCard icon="📸" title="Smart Scanner" desc="Quickly scan student ID or Book barcodes" onClick={() => router.push("/admin/scanner")} />
          <ActionCard icon="📚" title="Manage Library" desc="Add, edit, or remove books from system" onClick={() => router.push("/admin/books")} />
          <ActionCard icon="📈" title="View History" desc="Check borrow trends and past logs" onClick={() => router.push("/admin/history")} />
        </div>
      </div>
    </div>
  );
}