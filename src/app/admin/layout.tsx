"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "";
  const router = useRouter();
  const [showProf, setShowP] = useState(false);

  const NAV = [
    { id: "/admin",             label: "Dashboard",          icon: "📊" },
    { id: "/admin/approvals",   label: "Registration",       icon: "✅", badge: 5 },
    { id: "/admin/requests",    label: "Book Requests",      icon: "📬", badge: 3 },
    { id: "/admin/history",     label: "Borrow History",     icon: "🕐" },
    { id: "/admin/accounts",    label: "Manage Accounts",    icon: "👥" },
    // 👇 ITO YUNG BINAGO NATIN (ginawang /admin/books) 👇
    { id: "/admin/books",       label: "Library Management", icon: "📚" },
    { id: "/admin/analytics",   label: "Data Analytics",     icon: "📈" },
  ];

  return (
    <div style={{ display: "flex", height: "100vh", background: "#f5f3ee", fontFamily: "'DM Sans', sans-serif", color: "#1a2744", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-thumb { background: #d8d5cc; border-radius: 3px; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        .dm-serif { font-family: 'DM Serif Display', serif; }
        .nav-btn { display: flex; align-items: center; gap: 11px; padding: 10px 12px; border-radius: 11px; text-decoration: none; font-size: 13.5px; font-weight: 500; transition: all .18s; position: relative; }
        .nav-btn:hover { background: rgba(255,255,255,.08); color: rgba(255,255,255,.85); }
        .nav-btn.active { background: rgba(61,139,239,.18); color: #fff; }
        .pp-item:hover { background: #f5f3ee !important; }
      `}</style>

      {/* Blobs Background */}
      <div style={{ position: "fixed", width: 300, height: 300, borderRadius: "50%", background: "#b8d0f7", filter: "blur(60px)", opacity: .18, pointerEvents: "none", top: -80, left: -80 }} />
      <div style={{ position: "fixed", width: 240, height: 240, borderRadius: "50%", background: "#c5eac7", filter: "blur(60px)", opacity: .18, pointerEvents: "none", bottom: -60, right: -60 }} />

      {/* ── SIDEBAR ── */}
      <aside style={{ width: 232, flexShrink: 0, background: "#1a2744", display: "flex", flexDirection: "column", zIndex: 20, position: "relative" }}>
        <div style={{ padding: "22px 20px 16px", borderBottom: "1px solid rgba(255,255,255,.08)", display: "flex", alignItems: "center", gap: 11 }}>
          <svg width="36" height="36" viewBox="0 0 56 56" fill="none">
            <rect x="20" y="8" width="26" height="34" rx="4" fill="#e8528a" transform="rotate(6 33 25)" />
            <rect x="8" y="12" width="26" height="34" rx="4" fill="#3d8bef" transform="rotate(-4 21 29)" />
            <rect x="13" y="16" width="24" height="30" rx="4" fill="#4caf6e" />
            <rect x="14" y="17" width="2" height="28" rx="1" fill="rgba(255,255,255,0.4)" />
          </svg>
          <div>
            <div className="dm-serif" style={{ fontSize: 18, color: "#fff", lineHeight: 1 }}>SmartLib</div>
            <div style={{ fontSize: 9.5, color: "rgba(255,255,255,.35)", letterSpacing: .6, marginTop: 3, textTransform: "uppercase" }}>Admin Portal</div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: "14px 10px", display: "flex", flexDirection: "column", gap: 2 }}>
          {NAV.map(n => {
            const isActive = pathname === n.id;
            return (
              <Link key={n.id} href={n.id} className={`nav-btn ${isActive ? 'active' : ''}`} style={{ color: isActive ? "#fff" : "rgba(255,255,255,.42)" }}>
                {isActive && <div style={{ position: "absolute", left: 0, width: 3, height: 22, background: "#3d8bef", borderRadius: 2 }} />}
                <span style={{ fontSize: 17 }}>{n.icon}</span>
                <span style={{ flex: 1 }}>{n.label}</span>
                {n.badge && (
                  <span style={{ background: n.id.includes("approvals") ? "#e05c5c" : "#e8a020", color: "#fff", borderRadius: 20, fontSize: 10, fontWeight: 700, padding: "1px 7px" }}>{n.badge}</span>
                )}
              </Link>
            );
          })}
        </nav>

        <div style={{ margin: "0 12px 12px", background: "rgba(61,139,239,.14)", border: "1px solid rgba(61,139,239,.22)", borderRadius: 12, padding: "11px 14px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#7fb8f7", marginBottom: 2 }}>🛡 Admin Access</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,.3)", lineHeight: 1.4 }}>Full system permissions</div>
        </div>

        <div style={{ padding: "12px 16px 16px", borderTop: "1px solid rgba(255,255,255,.07)", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#3d8bef,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14, fontWeight: 700 }}>A</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,.85)" }}>Bryan Lumangaya</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.35)" }}>Administrator</div>
          </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT AREA ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative", zIndex: 1 }}>
        
        {/* TOPBAR */}
        <header style={{ height: 58, background: "#fff", borderBottom: "1px solid #e2dfd6", padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, position: "relative", zIndex: 40 }}>
          <div className="dm-serif" style={{ fontSize: 17, color: "#1a2744", textTransform: "capitalize" }}>
            {pathname === "/admin" ? "Dashboard" : pathname.replace("/admin/", "").replace("-", " ")}
          </div>

          <div style={{ position: "relative" }}>
            <button onClick={() => setShowP(!showProf)} style={{ display: "flex", alignItems: "center", gap: 9, background: "#f0ede5", border: "2px solid #e2dfd6", borderRadius: 50, padding: "5px 14px 5px 5px", cursor: "pointer" }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg,#3d8bef,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, fontWeight: 700 }}>A</div>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#1a2744" }}>Bryan Lumangaya</span>
            </button>
            {showProf && (
              <div style={{ position: "absolute", top: 50, right: 0, width: 220, background: "#fff", borderRadius: 16, boxShadow: "0 16px 40px rgba(26,39,68,.12)", border: "1px solid #e2dfd6", zIndex: 60, overflow: "hidden", animation: "fadeUp .2s ease" }}>
                <button className="pp-item" onClick={() => router.push("/admin/profile")} style={{ display: "block", width: "100%", padding: "12px 18px", background: "transparent", border: "none", textAlign: "left", cursor: "pointer", fontSize: 13, fontWeight: 500 }}>👤 Admin Profile</button>
                <button className="pp-item" onClick={() => router.push("/login")} style={{ display: "block", width: "100%", padding: "12px 18px", background: "transparent", border: "none", borderTop: "1px solid #e2dfd6", textAlign: "left", cursor: "pointer", fontSize: 13, fontWeight: 500, color: "#c94040" }}>🚪 Logout</button>
              </div>
            )}
          </div>
        </header>

        {showProf && <div style={{ position: "fixed", inset: 0, zIndex: 30 }} onClick={() => setShowP(false)} />}

        {/* ── PAHI-PAHINANG CONTENT ── */}
        <main style={{ flex: 1, overflowY: "auto", padding: "28px 30px" }}>
          {children}
        </main>
      </div>
    </div>
  );
}