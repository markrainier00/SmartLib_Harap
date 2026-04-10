"use client";

import { useUser } from "@/lib/user";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconHamburger, IconBookReq, IconBorrowHis, IconDashboard, IconLibManage, IconManageAcc, IconRegistration, IconRecommendation, IconMyList, IconHistory, IconSupport, IconData } from "../icons";

export default function Sidebar({ isSidebarOpen, toggleSidebar }: { isSidebarOpen: boolean; toggleSidebar: () => void }) {
  const { role } = useUser();
  const pathname = usePathname();

  const adminNavItems = [
    { id: "/admin/dashboard", icon: <IconDashboard />, label: "Dashboard" },
    { id: "/admin/books", icon: <IconLibManage />, label: "Library Management" },
    { id: "/admin/requests", icon: <IconBookReq />, label: "Book Requests" },
    { id: "/admin/history", icon: <IconBorrowHis />, label: "Borrow History" },
    { id: "/admin/approvals", icon: <IconRegistration />, label: "Registration" },
    { id: "/admin/accounts", icon: <IconManageAcc />, label: "Manage Accounts" },
    { id: "/admin/analytics", icon: <IconData />, label: "Data Analytics" },
  ];
  const libraryNavItems = [
    { id: "/library/recommendation", icon: <IconRecommendation />, label: "Recommendation" },
    { id: "/library/mylist", icon: <IconMyList />, label: "My List" },
    { id: "/library/history", icon: <IconHistory />, label: "History" },
    { id: "/library/support", icon: <IconSupport />, label: "Support" },
  ];
  const superAdminNavItems = [
    { id: "/superadmin", icon: <IconDashboard />, label: "Dashboard" },
    { id: "/superadmin/accounts", icon: <IconManageAcc />, label: "Manage Accounts" },
    { id: "/superadmin/analytics", icon: <IconData />, label: "Data Analytics" },
    { id: "/superadmin/concerns", icon: <IconSupport />, label: "Student Concerns"},
  ];
  
  let navItems = [];
  if (role === 'Staff') {
    navItems = adminNavItems;
  } else if (role === 'Student') {
    navItems = libraryNavItems;
  } else if (role === 'Admin') {
    navItems = superAdminNavItems;
  }
  
  return (
    <>
      <style>{`
        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: ${isSidebarOpen ? "240px" : "64px"};
          background: #1B5E35;
          display: flex;
          flex-direction: column;
          padding: 0;
          z-index: 1000; /* on top of main content */
          transition: width 0.25s ease;
          box-shadow: 2px 0 8px rgba(0,0,0,0.3);
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
          background: #1B5E35;
          border: none;
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: 10px;
        }

        .sidebar-nav {
          flex: 1;
          padding: 8px 12px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
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
      
      <aside className="sidebar">
        <div className="sidebar-logo">
          <button className="hamburger-btn" onClick={toggleSidebar}><IconHamburger /></button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item, index) => {
            const isActive = pathname?.includes(item.id);
            return (
              <Link key={index} href={item.id} className={`nav-item ${isActive ? "active" : ""}`}>
                {item.icon}
                <span className="nav-label">{item.label}</span>
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}