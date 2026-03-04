"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Topbar() {
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifs = [
    { id: 1, icon: "✅", msg: "Your library account has been approved!", time: "2h ago", read: false },
    { id: 2, icon: "⏰", msg: "Calculus: Early Transcendentals due in 2 days", time: "1d ago", read: false },
  ];
  const unread = notifs.filter((n) => !n.read).length;

  return (
    <>
      <header className="topbar">
        <div className="search-wrap">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" placeholder="Search books, authors…" />
        </div>

        <div className="topbar-actions">
          {/* Notif Button */}
          <div style={{ position: "relative" }}>
            <button className="notif-btn" onClick={() => { setShowNotifs(!showNotifs); setShowProfile(false); }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#5a6070" strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              {unread > 0 && <span className="notif-badge">{unread}</span>}
            </button>
            {showNotifs && (
              <div className="dropdown notif-panel open">
                <div className="notif-head">
                  <h4>Notifications</h4>
                  <button>Mark all read</button>
                </div>
                {notifs.map(n => (
                  <div key={n.id} className={`notif-item ${n.read ? '' : 'unread'}`}>
                    <span className="ni-icon">{n.icon}</span>
                    <div style={{ flex: 1 }}>
                      <p className="ni-msg">{n.msg}</p>
                      <div className="ni-time">{n.time}</div>
                    </div>
                    {!n.read && <div className="ni-dot"></div>}
                  </div>
                ))}
                <div className="notif-footer">📧 Email alerts sent to bryan@cmdi.edu.ph</div>
              </div>
            )}
          </div>

          {/* Profile Pill */}
          <div style={{ position: "relative" }}>
            <button className="profile-pill" onClick={() => { setShowProfile(!showProfile); setShowNotifs(false); }}>
              <div className="pa">J</div>
              <span>bryan</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8a8ea8" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            {showProfile && (
              <div className="dropdown profile-panel open">
                <div className="pp-head">
                  <div className="pp-avatar">J</div>
                  <div className="pp-name">bryan Lumangaya</div>
                  <div className="pp-email">Bryan@cmdi.edu</div>
                  <div className="pp-badge">✓ Account Active</div>
                </div>
                <button className="pp-item" onClick={() => setShowProfile(false)}>👤 View Profile</button>
                <button className="pp-item" onClick={() => setShowProfile(false)}>🔑 Change Password</button>
                <Link href="/login" style={{ textDecoration: "none" }}>
                  <button className="pp-item">🚪 Logout</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Invisible overlay pampasara ng dropdown kapag clinick sa labas */}
      {(showNotifs || showProfile) && (
        <div style={{ position: "fixed", inset: 0, zIndex: 40 }} onClick={() => { setShowNotifs(false); setShowProfile(false); }} />
      )}
    </>
  );
}