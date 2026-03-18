"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";

export default function Topbar() {
  const router = useRouter();
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showIdModal, setShowIdModal] = useState(false);
  const [user, setUser] = useState<any>(null);

  // User
  useEffect(() => {
    const useStr = localStorage.getItem("user");
    if(useStr) {
      try {
        setUser(JSON.parse(useStr));
      } catch (e) {
        console.error("Failed to parse user");
      }
    }
  }, []);

  const notifs = [
    { id: 1, msg: "Your library account has been approved!", time: "2h ago", read: false },
    { id: 2, msg: "Calculus: Early Transcendentals due in 2 days", time: "1d ago", read: false },
  ];
  const unread = notifs.filter((n) => !n.read).length;

  const handleNav = (path: string) => {
    setShowProfile(false);
    router.push(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/");
  };

  const downloadID = async () => {
    const card = document.querySelector(".id-card") as HTMLElement;
    const closeBtn = document.querySelector(".id-close") as HTMLElement;
    const downloadBtn = document.querySelector(".download-btn") as HTMLElement;

    if (!card) return;

    if (closeBtn) closeBtn.style.display = "none";
    if (downloadBtn) downloadBtn.style.display = "none";

    const canvas = await html2canvas(card, {
      scale: 3,
      backgroundColor: null,
    });

    if (closeBtn) closeBtn.style.display = "flex";
    if (downloadBtn) downloadBtn.style.display = "flex";

    const link = document.createElement("a");

    link.download = "student-id.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const firstName = user?.firstname || "";
  const fullName = user ? `${user.firstname} ${user.lastname}` : "";
  const email = user?.email || "";
  const initial = user?.firstname?.charAt(0).toUpperCase() || "?";
  const school_id = user?.school_id || "";
  const program = user?.program || "";

  return (
    <>
      <style>{`
        .topbar {
          height: 64px;
          background: #ffffff;
          border-bottom: 1px solid #C3DDD0;
          padding: 0 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
          position: relative;
          z-index: 50;
        }

        .search-wrap { flex: 1; max-width: 480px; position: relative; }
        .search-wrap svg { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); pointer-events: none; color: #7AAD8E; }
        .search-wrap input {
          width: 100%;
          background: #EBF7F0;
          border: 2px solid transparent;
          border-radius: 50px;
          padding: 10px 14px 10px 42px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          color: #102A1C;
          outline: none;
          transition: all .2s;
        }
        .search-wrap input::placeholder { color: #7AAD8E; }
        .search-wrap input:focus { border-color: #1B5E35; background: #fff; }

        .topbar-actions { display: flex; align-items: center; gap: 14px; }

        .action-btn {
          position: relative;
          background: #EBF7F0;
          border: none;
          border-radius: 50%;
          width: 40px; height: 40px;
          cursor: pointer;
          transition: background .2s;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
          color: #1B5E35;
        }
        .action-btn:hover { background: #D6EDE1; }
        .notif-badge { position: absolute; top: 0; right: 0; width: 18px; height: 18px; background: #e05c5c; border-radius: 50%; border: 2px solid #fff; font-size: 10px; font-weight: 700; color: #fff; display: flex; align-items: center; justify-content: center; }

        .profile-pill {
          display: flex; align-items: center; gap: 10px;
          background: #EBF7F0;
          border: 2px solid transparent;
          border-radius: 50px;
          padding: 10px;
          cursor: pointer;
          transition: all .2s;
        }
        .profile-pill:hover, .profile-pill.active { background: #fff; border-color: #C3DDD0; box-shadow: 0 4px 12px rgba(27,94,53,.08); }
        .profile-pill span { font-size: 13.5px; font-weight: 600; color: #102A1C; }

        .dropdown { position: absolute; top: 60px; right: 0; background: #fff; border-radius: 20px; box-shadow: 0 16px 48px rgba(27,94,53,.12); border: 1px solid #C3DDD0; z-index: 60; overflow: hidden; animation: fadeUp .2s ease both; min-width: 260px; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:none; } }

        .notif-panel { width: 340px; }
        .notif-head { padding: 16px 20px; border-bottom: 1px solid #C3DDD0; display: flex; justify-content: space-between; align-items: center; background: #EBF7F0; }
        .notif-head h4 { margin: 0; font-size: 14px; font-weight: 700; color: #102A1C; }
        .notif-item { padding: 14px 20px; border-bottom: 1px solid #EBF7F0; display: flex; gap: 12px; align-items: flex-start; }
        .notif-item.unread { background: #F0F9F3; }
        .ni-msg { font-size: 13px; color: #102A1C; font-weight: 500; line-height: 1.4; margin: 0; }
        .ni-time { font-size: 11px; color: #7AAD8E; margin-top: 4px; }

        .pp-head { padding: 24px 20px; border-bottom: 1px solid #EBF7F0; display: flex; flex-direction: column; align-items: center; background: #EBF7F0; }
        .pp-avatar-lg { width: 64px; height: 64px; border-radius: 50%; background: #4CAF78; display: flex; align-items: center; justify-content: center; font-size: 26px; font-weight: 700; color: #fff; margin-bottom: 14px; box-shadow: 0 6px 16px rgba(76,175,120,.3); }
        .pp-name { font-size: 16px; font-weight: 700; color: #102A1C; margin-bottom: 2px; }
        .pp-email { font-size: 12.5px; color: #7AAD8E; }

        .pp-menu { padding: 8px 0; }
        .pp-item { display: flex; align-items: center; gap: 12px; width: 100%; padding: 12px 24px; background: none; border: none; text-align: left; cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 13.5px; font-weight: 600; color: #3B6B50; transition: all .2s; }
        .pp-item:hover { background: #EBF7F0; color: #1B5E35; padding-left: 28px; }
        .pp-icon { font-size: 16px; opacity: 0.8; }

        .id-modal-overlay { position: fixed; inset: 0; background: rgba(16,42,28,.7); backdrop-filter: blur(6px); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 20px; animation: fadeIn .2s ease; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        .id-card { background: linear-gradient(145deg, #1B5E35 0%, #256D42 100%); width: 100%; max-width: 360px; border-radius: 24px; padding: 32px 24px 0; color: #fff; position: relative; box-shadow: 0 24px 64px rgba(0,0,0,.3); text-align: center; border: 1px solid rgba(255,255,255,.1); animation: fadeUp .3s cubic-bezier(0.16, 1, 0.3, 1); overflow: hidden; }
        .id-card::before { content: ''; position: absolute; top: -50px; right: -50px; width: 150px; height: 150px; background: radial-gradient(circle, rgba(76,175,120,.4) 0%, transparent 70%); border-radius: 50%; }

        .id-close { position: absolute; top: 16px; right: 16px; background: rgba(255,255,255,.1); border: none; border-radius: 50%; width: 30px; height: 30px; color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background .2s; z-index: 10; }
        .id-close:hover { background: rgba(255,255,255,.2); }

        .id-logo { font-family: 'DM Serif Display', serif; font-size: 22px; margin-bottom: 24px; display: flex; align-items: center; justify-content: center; gap: 8px; position: relative; z-index: 2; }

        .qr-container { background: #fff; padding: 16px; border-radius: 16px; display: inline-flex; flex-direction: column; align-items: center; justify-content: center; margin-bottom: 16px; box-shadow: 0 8px 24px rgba(0,0,0,.2); position: relative; z-index: 2; }

        .download-btn { background: #EBF7F0; border: 1px solid #C3DDD0; color: #1B5E35; padding: 8px 16px; border-radius: 50px; font-size: 12px; font-weight: 700; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 6px; }
        .download-btn:hover { background: #D6EDE1; }

        .id-name { font-size: 22px; font-weight: 700; margin-bottom: 4px; letter-spacing: 0.5px; position: relative; z-index: 2; }
        .id-program { font-size: 12px; color: rgba(255,255,255,.7); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 24px; position: relative; z-index: 2; }

        .id-footer { background: rgba(0,0,0,.15); margin: 0 -24px; padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: rgba(255,255,255,.8); border-top: 1px solid rgba(255,255,255,.08); position: relative; z-index: 2; }
      `}</style>

      <header className="topbar">
        <div className="search-wrap">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" placeholder="Search books, authors…" />
        </div>

        <div className="topbar-actions">
          <button className="action-btn" onClick={() => setShowIdModal(true)} title="Digital ID">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="14" rx="2"/>
              <circle cx="8" cy="12" r="2"/>
              <path d="M12 10h6"/>
              <path d="M12 14h6"/>
            </svg>
          </button>

          <div style={{ position: "relative" }}>
            <button className="action-btn" onClick={() => { setShowNotifs(!showNotifs); setShowProfile(false); }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B5E35" strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              {unread > 0 && <span className="notif-badge">{unread}</span>}
            </button>
            {showNotifs && (
              <div className="dropdown notif-panel open">
                <div className="notif-head"><h4>Notifications</h4></div>
                {notifs.map(n => (
                  <div key={n.id} className={`notif-item ${n.read ? '' : 'unread'}`}>
                    <span style={{ fontSize: "20px" }}></span>
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
              <span>{firstName}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7AAD8E" strokeWidth="2.5" style={{ marginLeft: "2px" }}><polyline points="6 9 12 15 18 9"/></svg>
            </button>

            {showProfile && (
              <div className="dropdown open">
                <div className="pp-head">
                  <div className="pp-name">{fullName}</div>
                  <div className="pp-email">{email}</div>
                </div>
                <div className="pp-menu">
                  <button className="pp-item" onClick={() => handleNav("/library/profile")}><span className="pp-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="4"/>
                      <path d="M4 20c0-4 4-6 8-6s8 2 8 6"/>
                    </svg>
                  </span>View Profile</button>
                  <button className="pp-item" style={{ color: "#c94040" }} onClick={() => handleNav("/")}><span className="pp-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                      <path d="M16 17l5-5-5-5"/>
                      <path d="M21 12H9"/>
                    </svg>
                  </span>Logout</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {(showNotifs || showProfile) && (
        <div style={{ position: "fixed", inset: 0, zIndex: 40 }} onClick={() => { setShowNotifs(false); setShowProfile(false); }} />
      )}

      {showIdModal && (
        <div className="id-modal-overlay" onClick={() => setShowIdModal(false)}>
          <div className="id-card" onClick={(e) => e.stopPropagation()}>
            <button className="id-close" onClick={() => setShowIdModal(false)}>✕</button>
            <div className="id-logo">SmartLib</div>
            <div className="qr-container" id="qr-wrapper">
              <QRCode value={school_id} size={220} bgColor="#ffffff" fgColor="#1B5E35" level="H" />
              </div>
            <div className="id-name">{fullName}</div>
            <div className="id-program">{program}</div>
            <div className="id-footer">
              <span>{school_id}</span><button className="download-btn" onClick={downloadID}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg></button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}