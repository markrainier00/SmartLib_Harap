"use client";

import { useUser } from "@/lib/user";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import { IconArrowDown, IconID, IconNotif, IconLogo, IconX } from "../icons";
import { useClickOutside } from "@/app/hooks/useClickOutside";

interface TopbarProps {
  isSidebarOpen: boolean;
}

export default function Topbar({ isSidebarOpen }: TopbarProps) {
  const { role, firstName, fullName, email, school_id, program } = useUser();
  const router = useRouter();

  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showId, setShowId] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  useClickOutside(notifRef, () => setShowNotifs(false));
  useClickOutside(profileRef, () => setShowProfile(false));

  const [notifs, setNotifs] = useState<any[]>([]);
  const unread = notifs.filter((n) => !n.read).length;

  // ==========================================
  // 🔔 REAL-TIME SSE LOGIC
  // ==========================================
  useEffect(() => {
    if (!school_id) return; 

    const safeSchoolId = encodeURIComponent(school_id);

    const fetchHistory = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/notifications/history/${safeSchoolId}`);
        const data = await res.json();
        if (data.isSuccess) {
          setNotifs(data.data || []); 
        }
      } catch (err) {
        console.error("Failed to fetch notification history", err);
      }
    };
    fetchHistory();

    const eventSource = new EventSource(`http://localhost:8080/api/notifications/stream/${safeSchoolId}`);

    eventSource.onmessage = (event) => {
      const newNotif = JSON.parse(event.data);
      setNotifs((prev) => {
        const isDuplicate = prev.some((notif) => notif.id === newNotif.id);
        if (isDuplicate) return prev;
        return [newNotif, ...prev];
      });
    };

    eventSource.onerror = () => {
      console.log("SSE interrupted. Browser is trying to auto-reconnect...");
    };

    return () => {
      eventSource.close();
    };
  }, [school_id]);

  // 🚀 BAGONG FUNCTION: Para ma-clear ang Notifs
  const handleClearNotifs = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Para hindi magsara yung dropdown kapag kinlick
    if (!school_id) return;

    try {
      const safeSchoolId = encodeURIComponent(school_id);
      const res = await fetch(`http://localhost:8080/api/notifications/clear/${safeSchoolId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      
      if (data.isSuccess) {
        setNotifs([]); // Linisin ang screen
      }
    } catch (err) {
      console.error("Failed to clear notifications", err);
    }
  };

  const handleNav = (path: string) => {
    setShowProfile(false);
    setShowNotifs(false);
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
    link.download = `${fullName} - SmartLib ID.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

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
          margin-left: 64px;
        }
        .topbar-actions { display: flex; align-items: center; gap: 14px; }
        .action-btn {
          position: relative;
          background: #EBF7F0;
          border: none;
          border-radius: 10px;
          width: 40px; height: 40px;
          cursor: pointer;
          transition: background .2s;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
          color: #1B5E35;
        }
        .action-btn:hover { background: #D6EDE1; }
        .notif-badge { position: absolute; top: 0; right: 0; width: 18px; height: 18px; background: #e05c5c; border-radius: 50%; border: 2px solid #fff; font-size: 10px; font-weight: 700; color: #fff; display: flex; align-items: center; justify-content: center; }
        .dropdown { position: absolute; top: 60px; right: 0; background: #fff; border-radius: 10px; box-shadow: 0 16px 48px rgba(27,94,53,.12); border: 1px solid #C3DDD0; z-index: 60; overflow: hidden; animation: fadeUp .2s ease both; min-width: 260px; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:none; } }
        .notif-panel { width: 340px; max-height: 400px; overflow-y: auto; }
        .notif-head { padding: 16px 20px; border-bottom: 1px solid #C3DDD0; display: flex; justify-content: space-between; align-items: center; background: #EBF7F0; position: sticky; top: 0; z-index: 2;}
        .notif-head h4 { margin: 0; font-size: 14px; font-weight: 700; color: #102A1C; }
        
        .clear-btn { background: none; border: none; font-size: 12px; color: #c94040; font-weight: 700; cursor: pointer; transition: all 0.2s; padding: 4px 8px; border-radius: 4px; }
        .clear-btn:hover { background: #ffebeb; }

        /* 🎨 Notif Item Clickable Styles */
        .notif-item { 
          padding: 14px 20px; 
          border-bottom: 1px solid #EBF7F0; 
          display: flex; 
          gap: 12px; 
          align-items: flex-start; 
          cursor: pointer;
          transition: background 0.2s;
        }
        .notif-item:hover { background: #F8FDFB; }
        .notif-item.unread { background: #F0F9F3; }
        .notif-item.unread:hover { background: #E6F4EB; }
        
        .ni-msg { font-size: 13px; color: #102A1C; font-weight: 500; line-height: 1.4; margin: 0; }
        .ni-time { font-size: 11px; color: #7AAD8E; margin-top: 4px; }
        .pp-head { padding: 24px 20px; border-bottom: 1px solid #EBF7F0; display: flex; flex-direction: column; align-items: center; background: #EBF7F0; }
        .pp-name { font-size: 16px; font-weight: 700; color: #102A1C; margin-bottom: 2px; }
        .pp-email { font-size: 12.5px; color: #7AAD8E; }
        .pp-menu { padding: 8px 0; }
        .pp-item { display: flex; align-items: center; gap: 12px; width: 100%; padding: 12px 24px; background: none; border: none; text-align: left; cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 13.5px; font-weight: 600; color: #3B6B50; transition: all .2s; }
        .pp-item:hover { background: #EBF7F0; color: #1B5E35; padding-left: 28px; }
        .id-overlay { position: fixed; inset: 0; background: rgba(16,42,28,.7); backdrop-filter: blur(6px); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 20px; animation: fadeIn .2s ease; }
        .id-card { background: linear-gradient(145deg, #1B5E35 0%, #256D42 100%); width: 100%; max-width: 360px; border-radius: 24px; padding: 32px 24px 0; color: #fff; position: relative; box-shadow: 0 24px 64px rgba(0,0,0,.3); text-align: center; border: 1px solid rgba(255,255,255,.1); animation: fadeUp .3s cubic-bezier(0.16, 1, 0.3, 1); overflow: hidden; }
        .id-close { position: absolute; top: 16px; right: 16px; background: rgba(255,255,255,.1); border: none; border-radius: 50%; width: 30px; height: 30px; color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background .2s; z-index: 10; }
        .id-close:hover { background: rgba(255,255,255,.2); }
        .qr-container { background: #fff; padding: 16px; border-radius: 16px; display: inline-flex; flex-direction: column; align-items: center; justify-content: center; margin-bottom: 16px; box-shadow: 0 8px 24px rgba(0,0,0,.2); position: relative; z-index: 2; }
        .download-btn { background: #EBF7F0; border: 1px solid #C3DDD0; color: #1B5E35; padding: 8px 16px; border-radius: 50px; font-size: 12px; font-weight: 700; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 6px; }
        .id-name { font-size: 22px; font-weight: 700; margin-bottom: 4px; letter-spacing: 0.5px; position: relative; z-index: 2; }
        .id-program { font-size: 12px; color: rgba(255,255,255,.7); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 24px; position: relative; z-index: 2; }
        .id-footer { background: rgba(0,0,0,.15); margin: 0 -24px; padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: rgba(255,255,255,.8); border-top: 1px solid rgba(255,255,255,.08); position: relative; z-index: 2; }
      `}</style>

      <header className="topbar">
        <div className="flex items-center gap-2">
          <IconLogo style={{ width: "40px", height: "40px", color: "var(--color-primary)" }} />
          <div className="smartlib-logo" style={{ fontSize: '20px' }}>SmartLib
            <span className="smartlib-sub" style={{ fontSize: '13px', display: 'block' }}>
              {role === 'Staff' ? 'STAFF' : role === 'Admin' ? 'ADMINISTRATOR' : 'STUDENT'} PORTAL
            </span>
          </div>
        </div>

        <div className="topbar-actions">
          {/* 🆔 DIGITAL ID: PARA SA STUDENT LANG */}
          {role === 'Student' && (
            <button className="action-btn" onClick={() => setShowId(true)} aria-label="Digital ID">
              <IconID />
            </button>
          )}

          {/* 🔔 SHARED NOTIFICATION BELL */}
          <div style={{ position: "relative" }} ref={notifRef}>
            <button className="action-btn" onClick={() => setShowNotifs(!showNotifs)} aria-label="Notifications">
              <IconNotif />
              {unread > 0 && <span className="notif-badge">{unread}</span>}
            </button>
            {showNotifs && (
              <div className="dropdown notif-panel open">
                <div className="notif-head">
                  <h4>Notifications</h4>
                  {/* 🚀 BAGONG CLEAR ALL BUTTON */}
                  {notifs.length > 0 && (
                    <button className="clear-btn" onClick={handleClearNotifs}>
                      Clear All
                    </button>
                  )}
                </div>
                
                {notifs.map(n => (
                  <div 
                    key={n.id} 
                    className={`notif-item ${n.read ? '' : 'unread'}`}
                    onClick={() => {
                      // 🚀 SMART REDIRECTION LOGIC
                      if (role === 'Admin' || role === 'Staff') {
                        const message = n.msg.toLowerCase();
                        
                        if (message.includes("book request") || message.includes("isbn")) {
                          handleNav("/admin/requests"); 
                        } else if (message.includes("register")) {
                          handleNav("/admin/registration"); 
                        }
                      }

                      // Mark locally as read
                      setNotifs(prev => prev.map(notif => notif.id === n.id ? { ...notif, read: true } : notif));
                    }}
                  >
                    <div className="flex-1">
                      <p className="ni-msg">{n.msg}</p>
                      <div className="ni-time">{n.time}</div>
                    </div>
                  </div>
                ))}
                {notifs.length === 0 && (
                  <div style={{ padding: "20px", textAlign: "center", fontSize: "13px", color: "#7AAD8E" }}>
                    No notifications yet.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 👤 PROFILE DROPDOWN */}
          <div style={{ position: "relative" }} ref={profileRef}>
            <button className={`profile-pill ${showProfile ? 'active' : ''}`} onClick={() => setShowProfile(!showProfile)}>
              <span>{firstName}</span><IconArrowDown />
            </button>

            {showProfile && (
              <div className="dropdown open">
                <div className="pp-head">
                  <div className="pp-name">{fullName}</div>
                  <div className="pp-email">{email}</div>
                </div>
                <div className="pp-menu">
                  <button className="pp-item" onClick={() => {
                    if (role === 'Staff') handleNav("/admin/profile");
                    else if (role === 'Admin') handleNav("/superadmin/profile");
                    else handleNav("/library/profile");
                  }}>View Profile</button>
                  <button className="pp-item" style={{ color: "#c94040" }} onClick={handleLogout}>Log Out</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 🆔 DIGITAL ID MODAL */}
      {showId && (
        <div className="id-overlay" onClick={() => setShowId(false)}>
          <div className="id-card" onClick={e => e.stopPropagation()}>
            <button className="id-close" onClick={() => setShowId(false)} aria-label="Close ID card"><IconX /></button>
            <div className="flex flex-col items-center">
              <IconLogo />
              <div style={{ fontFamily: 'DM Serif Display', fontSize: '22px', marginBottom: '24px' }}>SmartLib</div>
            </div>
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