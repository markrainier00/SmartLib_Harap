"use client";

import { useUser } from "@/lib/user";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { IconArrowDown } from "../icons";
import { useClickOutside } from "@/app/hooks/useClickOutside";

interface TopbarProps {
  isSidebarOpen: boolean;
}

export default function Topbar({ isSidebarOpen }: TopbarProps) {
  const router = useRouter();
  const [showProfile, setShowProfile] = useState(false);
  const user = useUser();
  const ref = useRef(null);

  useClickOutside(ref, () => setShowProfile(false));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/");
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
            <div className="smartlib-logo" style={{ fontSize: '20px' }}>SmartLib
                <span className="smartlib-sub" style={{ fontSize: '13px', display: 'block' }}>STAFF PORTAL</span>
            </div>

            <div className="topbar-actions">
                <div style={{ position: "relative" }} ref={ref}>
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
                            <button className="pp-item" style={{ color: "#c94040" }} onClick={handleLogout}>Log Out</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    </>
  );
}