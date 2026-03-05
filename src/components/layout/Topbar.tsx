"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import QRCode from "react-qr-code"; // ── DITO NATIN IN-IMPORT ANG TOTOONG QR CODE ──

export default function Topbar() {
  const router = useRouter();
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showIdModal, setShowIdModal] = useState(false);

  const notifs = [
    { id: 1, icon: "✅", msg: "Your library account has been approved!", time: "2h ago", read: false },
    { id: 2, icon: "⏰", msg: "Calculus: Early Transcendentals due in 2 days", time: "1d ago", read: false },
  ];
  const unread = notifs.filter((n) => !n.read).length;

  const handleNav = (path: string) => {
    setShowProfile(false);
    router.push(path);
  };

  // Ito ang data na ipapasa natin sa QR Code (Kadalasan Student ID ito)
  const studentIdNumber = "2024-00123";

  return (
    <>
      <style>{`
        .topbar { height: 64px; background: #ffffff; border-bottom: 1px solid #e2dfd6; padding: 0 28px; display: flex; align-items: center; justify-content: space-between; flex-shrink: 0; position: relative; z-index: 50; }
        
        .search-wrap { flex: 1; max-width: 480px; position: relative; }
        .search-wrap svg { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); pointer-events: none; color: #8a8ea8; }
        .search-wrap input { width: 100%; background: #f0ede5; border: 2px solid transparent; border-radius: 50px; padding: 10px 14px 10px 42px; font-family: 'DM Sans', sans-serif; font-size: 13.5px; color: #1a2744; outline: none; transition: all .2s; }
        .search-wrap input::placeholder { color: #8a8ea8; }
        .search-wrap input:focus { border-color: #1a2744; background: #fff; }

        .topbar-actions { display: flex; align-items: center; gap: 14px; }
        
        .action-btn { position: relative; background: #f0ede5; border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer; transition: background .2s; display: flex; align-items: center; justify-content: center; font-size: 18px; color: #1a2744; }
        .action-btn:hover { background: #e2dfd6; }
        .notif-badge { position: absolute; top: 0; right: 0; width: 18px; height: 18px; background: #e05c5c; border-radius: 50%; border: 2px solid #fff; font-size: 10px; font-weight: 700; color: #fff; display: flex; align-items: center; justify-content: center; }

        .profile-pill { display: flex; align-items: center; gap: 10px; background: #f0ede5; border: 2px solid transparent; border-radius: 50px; padding: 4px 16px 4px 4px; cursor: pointer; transition: all .2s; }
        .profile-pill:hover, .profile-pill.active { background: #fff; border-color: #e2dfd6; box-shadow: 0 4px 12px rgba(26,39,68,.05); }
        .profile-pill .pa { width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, #3d8bef, #7c3aed); display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; color: #fff; }
        .profile-pill span { font-size: 13.5px; font-weight: 600; color: #1a2744; }

        .dropdown { position: absolute; top: 54px; right: 0; background: #fff; border-radius: 20px; box-shadow: 0 16px 48px rgba(26,39,68,.12); border: 1px solid #e2dfd6; z-index: 60; overflow: hidden; animation: fadeUp .2s ease both; min-width: 260px; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:none; } }
        
        .notif-panel { width: 340px; }
        .notif-head { padding: 16px 20px; border-bottom: 1px solid #e2dfd6; display: flex; justify-content: space-between; align-items: center; background: #faf9f6; }
        .notif-head h4 { margin: 0; font-size: 14px; font-weight: 700; color: #1a2744; }
        .notif-item { padding: 14px 20px; border-bottom: 1px solid #f2efe8; display: flex; gap: 12px; align-items: flex-start; }
        .notif-item.unread { background: #f0f6ff; }
        .ni-msg { font-size: 13px; color: #1a2744; font-weight: 500; line-height: 1.4; margin: 0; }
        .ni-time { font-size: 11px; color: #8a8ea8; margin-top: 4px; }

        .pp-head { padding: 24px 20px; border-bottom: 1px solid #f2efe8; display: flex; flex-direction: column; align-items: center; background: #faf9f6; }
        .pp-avatar-lg { width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(135deg, #3d8bef, #7c3aed); display: flex; align-items: center; justify-content: center; font-size: 26px; font-weight: 700; color: #fff; margin-bottom: 14px; box-shadow: 0 6px 16px rgba(61,139,239,.25); }
        .pp-name { font-size: 16px; font-weight: 700; color: #1a2744; margin-bottom: 2px; }
        .pp-email { font-size: 12.5px; color: #8a8ea8; margin-bottom: 14px; }
        
        .pp-badge { display: inline-flex; align-items: center; gap: 6px; padding: 5px 14px; border-radius: 20px; background: #e6f7ec; border: 1px solid #c3e8d1; font-size: 11.5px; font-weight: 700; color: #2d7a4f; }
        .pp-dot { width: 6px; height: 6px; background: #2d7a4f; border-radius: 50%; }

        .pp-menu { padding: 8px 0; }
        .pp-item { display: flex; align-items: center; gap: 12px; width: 100%; padding: 12px 24px; background: none; border: none; text-align: left; cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 13.5px; font-weight: 600; color: #475569; transition: all .2s; }
        .pp-item:hover { background: #f0ede5; color: #1a2744; padding-left: 28px; }
        .pp-icon { font-size: 16px; opacity: 0.8; }

        /* ── CSS PARA SA DIGITAL ID MODAL ── */
        .id-modal-overlay { position: fixed; inset: 0; background: rgba(26,39,68,.7); backdrop-filter: blur(6px); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 20px; animation: fadeIn .2s ease; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        
        .id-card { background: linear-gradient(145deg, #1a2744 0%, #2a3d6e 100%); width: 100%; max-width: 360px; border-radius: 24px; padding: 32px 24px; color: #fff; position: relative; box-shadow: 0 24px 64px rgba(0,0,0,.3); text-align: center; border: 1px solid rgba(255,255,255,.1); animation: fadeUp .3s cubic-bezier(0.16, 1, 0.3, 1); overflow: hidden; }
        .id-card::before { content: ''; position: absolute; top: -50px; right: -50px; width: 150px; height: 150px; background: radial-gradient(circle, rgba(61,139,239,.4) 0%, transparent 70%); border-radius: 50%; }
        
        .id-close { position: absolute; top: 16px; right: 16px; background: rgba(255,255,255,.1); border: none; border-radius: 50%; width: 30px; height: 30px; color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background .2s; z-index: 10; }
        .id-close:hover { background: rgba(255,255,255,.2); }

        .id-logo { font-family: 'DM Serif Display', serif; font-size: 22px; margin-bottom: 24px; display: flex; align-items: center; justify-content: center; gap: 8px; }
        
        /* BINAGO ANG QR CONTAINER PARA SAKTO SA TOTOONG QR CODE */
        .qr-container { background: #fff; padding: 16px; border-radius: 16px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 24px; box-shadow: 0 8px 24px rgba(0,0,0,.2); }

        .id-name { font-size: 22px; font-weight: 700; margin-bottom: 4px; letter-spacing: 0.5px; }
        .id-program { font-size: 13px; color: rgba(255,255,255,.7); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px; }
        
        .id-footer { background: rgba(0,0,0,.2); margin: 0 -24px -32px; padding: 16px 24px; display: flex; justify-content: space-between; font-size: 12px; color: rgba(255,255,255,.8); border-top: 1px solid rgba(255,255,255,.05); }
      `}</style>

      <header className="topbar">
        <div className="search-wrap">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" placeholder="Search books, authors…" />
        </div>

        <div className="topbar-actions">
          
          <button className="action-btn" onClick={() => setShowIdModal(true)} title="My Digital ID">
            💳
          </button>

          <div style={{ position: "relative" }}>
            <button className="action-btn" onClick={() => { setShowNotifs(!showNotifs); setShowProfile(false); }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a2744" strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              {unread > 0 && <span className="notif-badge">{unread}</span>}
            </button>
            {showNotifs && (
              <div className="dropdown notif-panel open">
                <div className="notif-head">
                  <h4>Notifications</h4>
                </div>
                {notifs.map(n => (
                  <div key={n.id} className={`notif-item ${n.read ? '' : 'unread'}`}>
                    <span style={{ fontSize: "20px" }}>{n.icon}</span>
                    <div style={{ flex: 1 }}>
                      <p className="ni-msg">{n.msg}</p>
                      <div className="ni-time">{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ position: "relative" }}>
            <button className={`profile-pill ${showProfile ? 'active' : ''}`} onClick={() => { setShowProfile(!showProfile); setShowNotifs(false); }}>
              <div className="pa">B</div>
              <span>Bryan</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8a8ea8" strokeWidth="2.5" style={{ marginLeft: "2px" }}><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            
            {showProfile && (
              <div className="dropdown open">
                <div className="pp-head">
                  <div className="pp-avatar-lg">B</div>
                  <div className="pp-name">Bryan Lumangaya</div>
                  <div className="pp-email">Bryan@cmdi.edu</div>
                  <div className="pp-badge">
                    <span className="pp-dot"></span>
                    Account Active
                  </div>
                </div>
                
                <div className="pp-menu">
                  <button className="pp-item" onClick={() => handleNav("/dashboard/profile")}>
                    <span className="pp-icon">👤</span> View Profile
                  </button>
                  <button className="pp-item" style={{ color: "#c94040" }} onClick={() => handleNav("/login")}>
                    <span className="pp-icon">🚪</span> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {(showNotifs || showProfile) && (
        <div style={{ position: "fixed", inset: 0, zIndex: 40 }} onClick={() => { setShowNotifs(false); setShowProfile(false); }} />
      )}

      {/* ── DIGITAL ID MODAL ── */}
      {showIdModal && (
        <div className="id-modal-overlay" onClick={() => setShowIdModal(false)}>
          <div className="id-card" onClick={(e) => e.stopPropagation()}>
            <button className="id-close" onClick={() => setShowIdModal(false)}>✕</button>
            
            <div className="id-logo">
              📚 SmartLib
            </div>

            <div className="qr-container">
              {/* TOTOONG QR CODE COMPONENT */}
              <QRCode 
                value={studentIdNumber} 
                size={160} 
                bgColor="#ffffff" 
                fgColor="#1a2744" 
                level="Q" 
              />
            </div>

            <div className="id-name">Bryan Lumangaya</div>
            <div className="id-program">Bachelor of Science in Computer Science</div>
            
            <div className="id-footer">
              <span>ID: {studentIdNumber}</span>
              <span style={{ color: "#4caf6e", fontWeight: "bold" }}>● Valid</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}