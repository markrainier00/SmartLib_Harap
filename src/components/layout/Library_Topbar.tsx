"use client";

import { useUser } from "@/lib/user";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import { IconArrowDown, IconID, IconNotif, IconSearch, IconLogo } from "../icons";
import { useClickOutside } from "@/app/hooks/useClickOutside";

interface TopbarProps {
  isSidebarOpen: boolean;
}

export default function Topbar({ isSidebarOpen }: TopbarProps) {
  const router = useRouter();
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showIdModal, setShowIdModal] = useState(false);
  const user = useUser();
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  useClickOutside(notifRef, () => setShowNotifs(false));
  useClickOutside(profileRef, () => setShowProfile(false));

  const notifs = [
    { id: 1, msg: "Your library account has been approved!", time: "2h ago", read: false },
    { id: 2, msg: "Calculus: Early Transcendentals due in 2 days", time: "1d ago", read: false },
  ];
  const unread = notifs.filter(n => !n.read).length;

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

    const canvas = await html2canvas(card, { scale: 3, backgroundColor: null });
    if (closeBtn) closeBtn.style.display = "flex";
    if (downloadBtn) downloadBtn.style.display = "flex";

    const link = document.createElement("a");
    link.download = "student-id.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const { firstName, fullName, email, school_id, program } = user;

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
        .pp-name { font-size: 16px; font-weight: 700; color: #102A1C; margin-bottom: 2px; }
        .pp-email { font-size: 12.5px; color: #7AAD8E; }

        .pp-menu { padding: 8px 0; }
        .pp-item { display: flex; align-items: center; gap: 12px; width: 100%; padding: 12px 24px; background: none; border: none; text-align: left; cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 13.5px; font-weight: 600; color: #3B6B50; transition: all .2s; }
        .pp-item:hover { background: #EBF7F0; color: #1B5E35; padding-left: 28px; }

        .id-modal-overlay { position: fixed; inset: 0; background: rgba(16,42,28,.7); backdrop-filter: blur(6px); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 20px; animation: fadeIn .2s ease; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        .id-card { background: linear-gradient(145deg, #1B5E35 0%, #256D42 100%); width: 100%; max-width: 360px; border-radius: 24px; padding: 32px 24px 0; color: #fff; position: relative; box-shadow: 0 24px 64px rgba(0,0,0,.3); text-align: center; border: 1px solid rgba(255,255,255,.1); animation: fadeUp .3s cubic-bezier(0.16, 1, 0.3, 1); overflow: hidden; }
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
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <IconLogo style={{ width: "40px", height: "40px", color: "var(--color-primary)" }} />
          <div className="smartlib-logo" style={{ fontSize: '20px' }}>SmartLib
            <span className="smartlib-sub" style={{ fontSize: '13px', display: 'block' }}>STUDENT PORTAL</span>
          </div>
        </div>

        {/* <div className="search-wrap" style={{ flex: 1 }}>
          <IconSearch/>
          <input type="text" placeholder="Search books, authors…" />
        </div> */}

        <div className="topbar-actions">
          <button className="action-btn" onClick={() => setShowIdModal(true)} title="Digital ID"><IconID/></button>

          <div style={{ position: "relative" }} ref={notifRef}>
            <button className="action-btn" onClick={() => setShowNotifs(!showNotifs)}>
              <IconNotif/>
              {unread > 0 && <span className="notif-badge">{unread}</span>}
            </button>
            {showNotifs && (
              <div className="dropdown notif-panel open">
                <div className="notif-head"><h4>Notifications</h4></div>
                {notifs.map(n => (
                  <div key={n.id} className={`notif-item ${n.read ? '' : 'unread'}`}>
                    <div style={{ flex: 1 }}>
                      <p className="ni-msg">{n.msg}</p>
                      <div className="ni-time">{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ position: "relative" }} ref={profileRef}>
            <button className={`profile-pill ${showProfile ? 'active' : ''}`} onClick={() => setShowProfile(!showProfile)}>
              <span>{firstName}</span><IconArrowDown/>
            </button>

            {showProfile && (
              <div className="dropdown open">
                <div className="pp-head">
                  <div className="pp-name">{fullName}</div>
                  <div className="pp-email">{email}</div>
                </div>
                <div className="pp-menu">
                  <button className="pp-item" onClick={() => handleNav("/library/profile")}>View Profile</button>
                  <button className="pp-item" style={{ color: "#c94040" }} onClick={handleLogout}>Log Out</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {showIdModal && (
        <div className="id-modal-overlay" onClick={() => setShowIdModal(false)}>
          <div className="id-card" onClick={e => e.stopPropagation()}>
            <button className="id-close" onClick={() => setShowIdModal(false)}>✕</button>
            <div className="id-logo">SmartLib</div>
            <div className="qr-container">
              <QRCode value={school_id} size={220} bgColor="#fff" fgColor="#1B5E35" level="H" />
            </div>
            <div className="id-name">{fullName}</div>
            <div className="id-program">{program}</div>
            <div className="id-footer">
              <span>{school_id}</span>
              <button className="download-btn" onClick={downloadID}>Download</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}