import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export const metadata = {
  title: "Dashboard | LibraSync",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* ── EKSAKTONG CSS MULA SA HTML MO ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');
        
        :root {
          --navy:        #1a2744;
          --navy-light:  #2a3d6e;
          --cream:       #f5f3ee;
          --input-bg:    #f0ede5;
          --green:       #4caf6e;
          --red:         #e05c5c;
          --blue:        #3d8bef;
          --muted:       #8a8ea8;
          --border:      #e2dfd6;
        }

        body { margin: 0; padding: 0; background: var(--cream); color: var(--navy); font-family: 'DM Sans', sans-serif; overflow: hidden; }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }

        .blob { position: fixed; border-radius: 50%; filter: blur(60px); opacity: .22; pointer-events: none; z-index: 0; }
        .blob-1 { top: -80px; left: -80px; width: 320px; height: 320px; background: #b8d0f7; }
        .blob-2 { bottom: -60px; right: -60px; width: 260px; height: 260px; background: #c5eac7; }

        .app { display: flex; height: 100vh; overflow: hidden; position: relative; z-index: 1; }

        /* Sidebar CSS */
        .sidebar { width: 240px; flex-shrink: 0; background: var(--navy); display: flex; flex-direction: column; overflow: hidden; position: relative; z-index: 30; }
        .sidebar::before { content: ''; position: absolute; top: -80px; left: -80px; width: 300px; height: 300px; background: radial-gradient(circle, rgba(61,139,239,.18) 0%, transparent 70%); pointer-events: none; }
        .sidebar-logo { padding: 24px 20px 18px; border-bottom: 1px solid rgba(255,255,255,.08); display: flex; align-items: center; gap: 11px; }
        .logo-name { font-family: 'DM Serif Display', serif; font-size: 18px; color: #fff; line-height: 1; }
        .logo-sub  { font-size: 9.5px; color: rgba(255,255,255,.35); letter-spacing: .6px; margin-top: 3px; text-transform: uppercase; line-height: 1; }
        .sidebar-course { padding: 14px 16px 12px; border-bottom: 1px solid rgba(255,255,255,.07); }
        .sidebar-course label { font-size: 10px; font-weight: 600; color: rgba(255,255,255,.35); letter-spacing: .8px; text-transform: uppercase; display: block; margin-bottom: 7px; }
        .sidebar-course select { width: 100%; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.12); border-radius: 10px; color: rgba(255,255,255,.85); padding: 8px 10px; font-family: 'DM Sans', sans-serif; font-size: 13px; outline: none; cursor: pointer; appearance: none; background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='rgba(255,255,255,0.4)' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 10px center; padding-right: 28px; }
        .sidebar-course select option { background: var(--navy); }
        .sidebar-nav { flex: 1; padding: 12px 10px; display: flex; flex-direction: column; gap: 2px; }
        .nav-item { display: flex; align-items: center; gap: 11px; padding: 10px 12px; border-radius: 11px; cursor: pointer; border: none; background: transparent; width: 100%; font-family: 'DM Sans', sans-serif; font-size: 13.5px; font-weight: 500; color: rgba(255,255,255,.45); transition: all .18s; text-decoration: none; position: relative; }
        .nav-item svg { flex-shrink: 0; opacity: .6; transition: opacity .18s; }
        .nav-item:hover { background: rgba(255,255,255,.07); color: rgba(255,255,255,.85); }
        .nav-item:hover svg { opacity: .85; }
        .nav-item.active { background: rgba(61,139,239,.18); color: #fff; }
        .nav-item.active svg { opacity: 1; }
        .nav-item.active::before { content: ''; position: absolute; left: 10px; width: 3px; height: 22px; background: var(--blue); border-radius: 2px; margin-left: -12px; }
        .sidebar-status { margin: 0 12px 12px; background: rgba(76,175,110,.12); border: 1px solid rgba(76,175,110,.22); border-radius: 12px; padding: 11px 14px; }
        .sidebar-status .st-dot { width: 7px; height: 7px; background: var(--green); border-radius: 50%; display: inline-block; margin-right: 7px; box-shadow: 0 0 0 3px rgba(76,175,110,.25); }
        .sidebar-status .st-label { font-size: 12px; font-weight: 600; color: #6fdb92; }
        .sidebar-status .st-sub { font-size: 11px; color: rgba(255,255,255,.3); margin-top: 4px; line-height: 1.4; }
        .sidebar-user { padding: 12px 16px 16px; border-top: 1px solid rgba(255,255,255,.07); display: flex; align-items: center; gap: 10px; }
        .user-avatar { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, var(--blue), #7c3aed); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; color: #fff; flex-shrink: 0; }
        .user-name { font-size: 13px; font-weight: 600; color: rgba(255,255,255,.85); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .user-course { font-size: 11px; color: rgba(255,255,255,.35); margin-top: 1px; }

        /* Topbar & Main CSS */
        .main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
        .topbar { height: 58px; background: #ffffff; border-bottom: 1px solid var(--border); padding: 0 28px; display: flex; align-items: center; gap: 14px; flex-shrink: 0; position: relative; z-index: 20; }
        .search-wrap { flex: 1; max-width: 480px; position: relative; }
        .search-wrap svg { position: absolute; left: 13px; top: 50%; transform: translateY(-50%); pointer-events: none; color: var(--muted); }
        .search-wrap input { width: 100%; background: var(--input-bg); border: 2px solid transparent; border-radius: 50px; padding: 9px 14px 9px 38px; font-family: 'DM Sans', sans-serif; font-size: 13.5px; color: var(--navy); outline: none; transition: border-color .2s, background .2s; }
        .search-wrap input::placeholder { color: #b0afba; }
        .search-wrap input:focus { border-color: var(--navy-light); background: #fff; }
        .topbar-actions { display: flex; align-items: center; gap: 10px; margin-left: auto; }
        .notif-btn { position: relative; background: var(--input-bg); border: 2px solid var(--border); border-radius: 12px; padding: 8px 10px; cursor: pointer; transition: background .18s; display: flex; }
        .notif-btn:hover { background: var(--cream); }
        .notif-badge { position: absolute; top: 4px; right: 4px; width: 16px; height: 16px; background: var(--red); border-radius: 8px; border: 2px solid #fff; font-size: 9px; font-weight: 700; color: #fff; display: flex; align-items: center; justify-content: center; }
        .profile-pill { display: flex; align-items: center; gap: 9px; background: var(--input-bg); border: 2px solid var(--border); border-radius: 50px; padding: 5px 14px 5px 5px; cursor: pointer; transition: background .18s; }
        .profile-pill:hover { background: var(--cream); }
        .profile-pill .pa { width: 30px; height: 30px; border-radius: 50%; background: linear-gradient(135deg, var(--blue), #7c3aed); display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: #fff; }
        .profile-pill span { font-size: 13px; font-weight: 600; color: var(--navy); }
        
        .dropdown { position: absolute; top: 54px; right: 0; background: #fff; border-radius: 18px; box-shadow: 0 24px 64px rgba(26,39,68,.18); border: 1px solid var(--border); z-index: 60; overflow: hidden; animation: fadeUp .2s ease both; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:none; } }
        .notif-panel { width: 330px; }
        .notif-head { padding: 14px 18px; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; }
        .notif-head h4 { margin: 0; font-size: 14px; font-weight: 700; color: var(--navy); }
        .notif-item { padding: 12px 18px; border-bottom: 1px solid #f7f5f0; display: flex; gap: 11px; align-items: flex-start; }
        .notif-item.unread { background: #f0f6ff; }
        .ni-msg { font-size: 13px; color: var(--navy); font-weight: 500; line-height: 1.4; margin: 0; }
        .ni-time { font-size: 11px; color: var(--muted); margin-top: 3px; }
        .notif-footer { padding: 10px 18px; text-align: center; font-size: 11px; color: var(--muted); }
        .profile-panel { width: 260px; }
        .pp-head { padding: 18px; border-bottom: 1px solid var(--border); text-align: center; }
        .pp-item { display: block; width: 100%; padding: 12px 18px; background: none; border: none; border-top: 1px solid var(--border); text-align: left; cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; color: #475569; transition: background .15s; }
        .pp-item:hover { background: var(--cream); color: var(--navy); }

        .content { flex: 1; overflow-y: auto; padding: 28px 30px; position: relative; z-index: 10; }
      `}</style>

      {/* Decorative blobs */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

      <div className="app">
        <Sidebar />
        
        <div className="main">
          <Topbar />
          <div className="content">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}