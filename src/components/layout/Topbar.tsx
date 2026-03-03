"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";

const initNotifs = [
  { id: 1, message: "Your library account has been approved!", time: "2 hours ago", read: false },
  { id: 2, message: "Introduction to Algorithms due in 2 days", time: "1 day ago", read: false },
  { id: 3, message: "Your reserved book is ready for pickup", time: "3 days ago", read: true },
];

const navLabels: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/library": "Library",
  "/dashboard/mybooks": "My Books",
  "/dashboard/history": "History",
  "/dashboard/recommendation": "For You",
};

export default function Topbar() {
  const pathname = usePathname();
  const [notifs, setNotifs] = useState(initNotifs);
  const [showNotifs, setShowNotifs] = useState(false);

  const unread = notifs.filter(n => !n.read).length;
  const currentLabel = navLabels[pathname] || "Dashboard";

  return (
    <header style={{ height: 56, background: "rgba(12,12,20,.97)", borderBottom: "1px solid rgba(255,255,255,.07)", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, position: "relative", zIndex: 30 }}>
      <h2 className="np" style={{ fontSize: 18 }}>{currentLabel}</h2>
      
      <div style={{ position: "relative" }}>
        <button className="btn btn-ghost" style={{ padding: "6px 11px", fontSize: 17, position: "relative" }} onClick={() => setShowNotifs(!showNotifs)}>
          🔔
          {unread > 0 && <span style={{ position: "absolute", top: 3, right: 3, width: 15, height: 15, background: "#e74c3c", borderRadius: 8, fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{unread}</span>}
        </button>
        
        {showNotifs && (
          <div className="np-panel" style={{ right: 0 }}>
            <div style={{ padding: "13px 18px", borderBottom: "1px solid rgba(255,255,255,.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 600, fontSize: 14 }}>Notifications</span>
              <button className="btn btn-ghost" style={{ padding: "4px 9px", fontSize: 11 }} onClick={() => setNotifs(notifs.map(n => ({ ...n, read: true })))}>Mark all read</button>
            </div>
            {notifs.map(n => (
              <div key={n.id} style={{ padding: "12px 18px", borderBottom: "1px solid rgba(255,255,255,.05)", background: n.read ? "transparent" : "rgba(201,168,76,.04)", display: "flex", gap: 10, alignItems: "flex-start" }}>
                <div style={{ width: 7, height: 7, borderRadius: 4, background: n.read ? "transparent" : "#c9a84c", marginTop: 5, flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: 13, color: n.read ? "rgba(226,226,238,.5)" : "#e2e2ee" }}>{n.message}</p>
                  <p style={{ fontSize: 11, color: "rgba(226,226,238,.3)", marginTop: 3 }}>{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Click-away overlay for notifs */}
      {showNotifs && <div style={{ position: "fixed", inset: 0, zIndex: -1 }} onClick={() => setShowNotifs(false)} />}
    </header>
  );
}