"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/lib/user";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconHamburger, IconBookReq, IconBorrowHis, IconDashboard, IconLibManage, IconManageAcc, IconRegistration, IconRecommendation, IconMyList, IconHistory, IconSupport, IconData, IconArrowDown } from "../icons";

export default function Sidebar({ isSidebarOpen, toggleSidebar }: { isSidebarOpen: boolean; toggleSidebar: () => void }) {
  const { role, user, id } = useUser() as any; 
  const pathname = usePathname();
  const [borrowsOpen, setBorrowsOpen] = useState(false);

  const [openTickets, setOpenTickets] = useState(0);
  const [studentUnread, setStudentUnread] = useState(0);

  const studentId = user?.school_id || user?.id || id;
  const currentRole = role ? String(role).toLowerCase() : "";

  useEffect(() => {
    const fetchBadges = async () => {
      if (!currentRole) return; 

      if (currentRole === 'staff' || currentRole === 'admin') {
        try {
          const res = await fetch("http://localhost:8080/api/chat/admin/all");
          const data = await res.json();
          if (data.isSuccess && data.data) {
            const count = data.data.filter((c: any) => {
              const stat = String(c.status || c.Status || "").toLowerCase();
              return stat === "open";
            }).length;
            setOpenTickets(count);
          }
        } catch(e) {}
      } 
      else if (currentRole === 'student' && studentId) {
        try {
          const res = await fetch(`http://localhost:8080/api/chat/student/${studentId}`);
          const data = await res.json();
          if (data.isSuccess && data.data.messages) {
            const unreadCount = data.data.messages.filter((m: any) => 
              (m.sender_role.toLowerCase() === 'admin') && !(m.is_read || m.IsRead)
            ).length;
            setStudentUnread(unreadCount);
          }
        } catch(e) {}
      }
    };

    fetchBadges();
    const interval = setInterval(fetchBadges, 3000); 
    return () => clearInterval(interval);
  }, [currentRole, studentId]);

  const adminNavItems = [
    { id: "/admin/dashboard", icon: <IconDashboard />, label: "Dashboard" },
    { id: "/admin/books", icon: <IconLibManage />, label: "Library Management" },
    { id: "borrows", icon: <IconBookReq />, label: "Borrows", dropdown: true },
    { id: "/admin/approvals", icon: <IconRegistration />, label: "Registration" },
    { id: "/admin/accounts", icon: <IconManageAcc />, label: "Manage Accounts" },
    { id: "/admin/analytics", icon: <IconData />, label: "Data Analytics" },
    { id: "/admin/support", icon: <IconSupport />, label: "Student Support", badge: openTickets > 0 ? openTickets : null },
  ];
  const isBorrowsActive = pathname?.includes("/admin/requests") || pathname?.includes("/admin/borrows") || pathname?.includes("/admin/history");

  const libraryNavItems = [
    { id: "/library/recommendation", icon: <IconRecommendation />, label: "Recommendation" },
    { id: "/library/mylist", icon: <IconMyList />, label: "My List" },
    { id: "/library/history", icon: <IconHistory />, label: "History" },
    { id: "/library/support", icon: <IconSupport />, label: "Support", badge: studentUnread > 0 ? studentUnread : null },
  ];
  
  const superAdminNavItems = [
    { id: "/superadmin", icon: <IconDashboard />, label: "Dashboard" },
    { id: "/superadmin/accounts", icon: <IconManageAcc />, label: "Manage Accounts" },
    { id: "/superadmin/analytics", icon: <IconData />, label: "Data Analytics" },
    { id: "/superadmin/concerns", icon: <IconSupport />, label: "Student Concerns", badge: openTickets > 0 ? openTickets : null },
  ];
  
  let navItems: any[] = [];
  if (currentRole === 'staff') navItems = adminNavItems;
  else if (currentRole === 'student') navItems = libraryNavItems;
  else if (currentRole === 'admin') navItems = superAdminNavItems;
  
  return (
    <>
      <style>{`
        .sidebar { position: fixed; top: 0; left: 0; height: 100vh; width: ${isSidebarOpen ? "240px" : "64px"}; background: #1B5E35; display: flex; flex-direction: column; padding: 0; z-index: 1000; transition: width 0.25s ease; box-shadow: 2px 0 8px rgba(0,0,0,0.3); }
        .sidebar-logo { display: flex; align-items: center; gap: 12px; padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,.1); justify-content: ${isSidebarOpen ? "flex-start" : "center"}; }
        .hamburger-btn { background: #1B5E35; border: none; color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; width: 30px; height: 30px; border-radius: 10px; }
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
          position: relative; 
        }
        .nav-item:hover { background: rgba(255,255,255,.08); color: #fff; }
        .nav-item.active { background: rgba(255,255,255,.15); color: #fff; font-weight: 600; }
        .nav-label { display: ${isSidebarOpen ? "inline" : "none"}; }
        .dropdown-btn {
          width: 100%;
          background: none;
          border: none;
          cursor: pointer;
          justify-content: space-between;
        }
        .dropdown-btn .nav-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .dropdown-menu {
          display: ${isSidebarOpen && borrowsOpen ? "flex" : "none"};
          flex-direction: column;
          gap: 2px;
          padding-left: 36px;
        }
        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,.55);
          text-decoration: none;
          transition: all .2s;
        }
        .dropdown-item:hover { background: rgba(255,255,255,.08); color: #fff; }
        .dropdown-item.active { background: rgba(255,255,255,.12); color: #fff; font-weight: 600; }
        
        /* 🚀 FIX: Absolute positioning para lumutang siya sa icon kapag naka-close */
        .nav-badge { 
          background: #ef4444; 
          color: white; 
          font-size: ${isSidebarOpen ? "11px" : "9px"}; 
          font-weight: bold; 
          min-width: ${isSidebarOpen ? "20px" : "16px"}; 
          height: ${isSidebarOpen ? "20px" : "16px"}; 
          border-radius: 50%; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          position: absolute; 
          right: ${isSidebarOpen ? "12px" : "10px"}; 
          top: ${isSidebarOpen ? "50%" : "6px"}; 
          transform: ${isSidebarOpen ? "translateY(-50%)" : "none"}; 
          box-shadow: 0 2px 4px rgba(0,0,0,0.2); 
          transition: all 0.2s ease;
        }
      `}</style>
      <aside className="sidebar">
        <div className="sidebar-logo">
          <button className="hamburger-btn" onClick={toggleSidebar}><IconHamburger /></button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item, index) => {
            if (item.dropdown) {
              return (
                <div key={index}>
                  <button
                    className={`nav-item dropdown-btn ${isBorrowsActive ? "active" : ""}`}
                    onClick={() => setBorrowsOpen(prev => !prev)}
                  >
                    <div className="nav-left">
                      {item.icon}
                      <span className="nav-label">{item.label}</span>
                    </div>
                    {isSidebarOpen && <IconArrowDown/>}
                  </button>
                  <div className="dropdown-menu">
                    <Link
                      href="/admin/requests"
                      className={`dropdown-item ${pathname?.includes("/admin/requests") ? "active" : ""}`}
                    >
                      Borrow Requests
                    </Link>
                    <Link
                      href="/admin/borrows"
                      className={`dropdown-item ${pathname?.includes("/admin/borrows") ? "active" : ""}`}
                    >
                      Manage Borrows
                    </Link>
                    <Link
                      href="/admin/history"
                      className={`dropdown-item ${pathname?.includes("/admin/history") ? "active" : ""}`}
                    >
                      Borrows History
                    </Link>
                  </div>
                </div>
              );
            }

            const isActive = pathname?.includes(item.id);
            return (
              <Link key={index} href={item.id} className={`nav-item ${isActive ? "active" : ""}`}>
                {item.icon}
                <span className="nav-label">{item.label}</span>
                {/* 🚀 IBINALIK KO ITO PARA LALABAS YUNG PULANG BILOG */}
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}