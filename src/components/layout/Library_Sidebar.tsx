"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconHamburger, IconRecommendation, IconMyList, IconHistory, IconSupport } from "../icons";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isSidebarOpen, toggleSidebar }: SidebarProps) {
  const pathname = usePathname();

  const NAV_ITEMS = [
    { id: "/library/recommendation", icon: <IconRecommendation/>, label: "Recommendation" },
    { id: "/library/mylist", icon: <IconMyList/>, label: "My List" },
    { id: "/library/history", icon: <IconHistory/>, label: "History" },
    { id: "/library/support", icon: <IconSupport/>, label: "Support" },
  ];

  return (
    <>
      <style>{`
        .sidebar {
          width: ${isSidebarOpen ? "240px" : "64px"};
          min-height: 100vh;
          background: #1B5E35;
          display: flex;
          flex-direction: column;
          padding: 0;
          flex-shrink: 0;
          position: relative;
          transition: width 0.2s;
        }
        .sidebar::before {
          content: '';
          position: absolute;
          top: -80px; left: -80px;
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(255,255,255,.3) 0%, transparent 70%);
          pointer-events: none;
        }
        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          border-bottom: 1px solid rgba(255,255,255,.1);
          justify-content: ${isSidebarOpen ? "flex-start" : "center"};
        }
        .hamburger-btn {
          background: none;
          border: none;
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px; height: 32px;
          margin-right: ${isSidebarOpen ? "auto" : "0"};
        }

        .sidebar-nav { flex: 1; padding: 8px 12px; display: flex; flex-direction: column; gap: 2px; }
        .nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 10px;
          font-size: 13.5px;
          font-weight: 500;
          color: rgba(255,255,255,.65);
          text-decoration: none;
          transition: all .2s;
        }
        .nav-item:hover { background: rgba(255,255,255,.08); color: #fff; }
        .nav-item.active { background: rgba(255,255,255,.15); color: #fff; font-weight: 600; }

        .nav-label { display: ${isSidebarOpen ? "inline" : "none"}; }
        `}</style>

      <aside className={`sidebar ${isSidebarOpen ? "mobile-open" : ""}`}>
        {/* Hamburger */}
        <div className="sidebar-logo">
          <button className="hamburger-btn" onClick={toggleSidebar}>
            <IconHamburger />
          </button>
        </div>
          
        <nav className="sidebar-nav">
          {NAV_ITEMS.map(item => {
            const isActive = pathname?.includes(item.id);
            return (
              <Link key={item.id} href={item.id} className={`nav-item ${isActive ? "active" : ""}`}>
                {item.icon}
                <span className="nav-label">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}