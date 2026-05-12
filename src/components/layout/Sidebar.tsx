"use client";

import { useState, useRef } from "react";
import { useUser } from "@/lib/user";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconBookReq, IconDashboard, IconLibManage, IconManageAcc, IconRecommendation, IconMyList, IconHistory, IconSupport, IconData, IconArrowDown } from "../icons";

export default function Sidebar({ isSidebarOpen, toggleSidebar }: { isSidebarOpen: boolean; toggleSidebar: () => void }) {
  const { role } = useUser() as any;
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  const currentRole = role ? String(role).toLowerCase() : "";
  const isExpanded = isSidebarOpen || isHovered;

  const adminNavItems = [
    { id: "/admin/dashboard", icon: <IconDashboard />, label: "Dashboard" },
    { id: "/admin/books", icon: <IconLibManage />, label: "Library Management" },
    { id: "borrows", icon: <IconBookReq />, label: "Borrows", dropdown: true,
      children: [
        { href: "/admin/requests", label: "Requests" },
        { href: "/admin/borrows", label: "Manage" },
        { href: "/admin/history", label: "History" },
      ],
    },
    { id: "users", icon: <IconManageAcc />, label: "User Management", dropdown: true,
      children: [
        { href: "/admin/approvals", label: "Registration" },
        { href: "/admin/accounts", label: "Accounts" },
        { href: "/admin/archives", label: "Archives" },
      ],
    },
    { id: "/admin/analytics", icon: <IconData />, label: "Data Analytics" }
  ];

  const libraryNavItems = [
    { id: "/library/recommendation", icon: <IconRecommendation />, label: "Recommendation" },
    { id: "/library/mylist", icon: <IconMyList />, label: "My List" },
    { id: "/library/history", icon: <IconHistory />, label: "History" },
  ];

  const superAdminNavItems = [
    { id: "/superadmin/dashboard", icon: <IconDashboard />, label: "Dashboard" },
    { id: "user", icon: <IconBookReq />, label: "User Management", dropdown: true,
      children: [
        { href: "/superadmin/approvals", label: "Registration" },
        { href: "/superadmin/accounts", label: "Accounts" },
        { href: "/superadmin/scope", label: "Scope" },
        { href: "/superadmin/archives", label: "Archives" },
        { href: "/superadmin/logs", label: "Log History" },
      ],
    },
  ];

  let navItems: any[] = [];
  if (currentRole === 'staff') navItems = adminNavItems;
  else if (currentRole === 'student') navItems = libraryNavItems;
  else if (currentRole === 'admin') navItems = superAdminNavItems;

  return (
    <>
      <style>{`
        .sidebar {
          position: fixed; top: 0; left: 0; height: 100vh;
          background: var(--color-primary); display: flex; flex-direction: column;
          padding: 0; z-index: 49; transition: width 0.25s ease;
          box-shadow: 2px 0 8px rgba(0,0,0,0.3);
        }
        .sidebar-nav { flex: 1; padding: 70px 12px 12px 12px; display: flex; flex-direction: column; gap: 2px; }
        .nav-item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 10px; font-size: 13.5px; font-weight: 500; color: #FFFFFF; text-decoration: none; transition: background .2s; position: relative; overflow: hidden; }
        .nav-item:hover { background: rgba(255, 255, 255, .08); }
        .nav-item.active { background: rgba(255, 255, 255, .2); font-weight: 700; }
        .dropdown-btn { width: 100%; background: none; border: none; cursor: pointer; justify-content: space-between; }
        .dropdown-btn .nav-left { display: flex; align-items: center; gap: 10px; }
        .nav-label { white-space: nowrap; overflow: hidden; transition: opacity 0.2s ease, max-width 0.25s ease; }
        .nav-label.hidden { opacity: 0; max-width: 0; }
        .nav-label.visible { opacity: 1; max-width: 200px; }
        .nav-arrow { overflow: hidden; transition: opacity 0.2s ease, max-width 0.25s ease; }
        .nav-arrow.hidden { opacity: 0; max-width: 0; }
        .nav-arrow.visible { opacity: 1; max-width: 40px; }
        .dropdown-menu { max-height: 0; overflow: hidden; display: flex; flex-direction: column; gap: 2px; background: rgba(27, 94, 53, .08); border-bottom-left-radius: 10px; border-bottom-right-radius: 10px; transform: translateY(-5px); transition: max-height 0.3s ease, opacity 0.25s ease, transform 0.25s ease; }
        .dropdown-menu.open { max-height: 200px; transform: translateY(0); }
        .dropdown-item { display: flex; align-items: center; gap: 8px; padding: 8px 12px; border-radius: 8px; font-size: 13px; font-weight: 500; color: #FFFFFF; transition: all .2s; }
        .dropdown-item:hover { background: rgba(255, 255, 255, .08); }
        .dropdown-item.active { background: rgba(255, 255, 255, .2); font-weight: 700; }
      `}</style>

      <aside
        className="sidebar"
        style={{ width: isExpanded ? "240px" : "64px" }}
        onMouseEnter={() => { if (!isSidebarOpen) { if (hoverTimeout.current) clearTimeout(hoverTimeout.current); setIsHovered(true); } }}
        onMouseLeave={() => { if (!isSidebarOpen) { hoverTimeout.current = setTimeout(() => setIsHovered(false), 150); } }}
      >
        <nav className="sidebar-nav">
          {navItems.map((item, index) => {
            if (item.dropdown) {
              const isOpen = openDropdown === item.id;
              return (
                <div key={index}>
                  <button
                    className={`nav-item dropdown-btn ${isOpen ? "active" : ""}`}
                    onClick={() => setOpenDropdown(prev => prev === item.id ? null : item.id)}
                  >
                    <div className="nav-left">
                      {item.icon}
                      <span className={`nav-label ${isExpanded ? "visible" : "hidden"}`}>{item.label}</span>
                    </div>
                    <div className={`nav-arrow ${isExpanded ? "visible" : "hidden"}`} style={{ transition: "transform 0.2s ease, opacity 0.2s ease, max-width 0.25s ease", transform: isOpen ? "rotate(180deg)" : "none" }}>
                      <IconArrowDown />
                    </div>
                  </button>
                  <div style={{ marginTop: "3px", paddingLeft: "36px", paddingRight: "10px" }}>
                    <div className={`dropdown-menu ${isExpanded && isOpen ? "open" : ""}`}>
                      {item.children?.map((child: any, i: number) => (
                        <Link key={i} href={child.href} className={`dropdown-item ${pathname?.includes(child.href) ? "active" : ""}`}>
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            const isActive = item.exact ? pathname === item.id : pathname?.includes(item.id);
            return (
              <Link key={index} href={item.id} className={`nav-item ${isActive ? "active" : ""}`}>
                {item.icon}
                <span className={`nav-label ${isExpanded ? "visible" : "hidden"}`}>{item.label}</span>
                {item.badge && (
                  <span style={{
                    background: "#ef4444",
                    color: "white",
                    fontSize: isExpanded ? "11px" : "9px",
                    fontWeight: "bold",
                    minWidth: isExpanded ? "20px" : "16px",
                    height: isExpanded ? "20px" : "16px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    right: isExpanded ? "12px" : "10px",
                    top: isExpanded ? "50%" : "6px",
                    transform: isExpanded ? "translateY(-50%)" : "none",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                    transition: "all 0.2s ease",
                  }}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}