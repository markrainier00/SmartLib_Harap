"use client";

import { useUser } from "@/lib/user";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef } from "react";
import { IconHamburger, IconBookReq, IconBorrowHis, IconDashboard, IconLibManage, IconManageAcc, IconRegistration, IconRecommendation, IconMyList, IconHistory, IconSupport, IconData, IconArrowDown } from "../icons";

export default function Sidebar({ isSidebarOpen, toggleSidebar }: { isSidebarOpen: boolean; toggleSidebar: () => void }) {
  const { role } = useUser();
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  const adminNavItems = [
    { id: "/admin/dashboard", icon: <IconDashboard />, label: "Dashboard" },
    { id: "/admin/books", icon: <IconLibManage />, label: "Library Management" },
    { id: "borrows", icon: <IconBookReq />, label: "Borrows", dropdown: true,
      children: [
        { href: "/admin/requests", label: "Request" },
        { href: "/admin/borrows", label: "Borrow" },
        { href: "/admin/history", label: "History" },
      ],
    },
    { id: "users", icon: <IconManageAcc />, label: "User Management", dropdown: true,
      children: [
        { href: "/admin/approvals", label: "Registration" },
        { href: "/admin/accounts", label: "Accounts" },
      ],
    },
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
          width: ${(isSidebarOpen) ? "240px" : (isHovered ? "240px" : "64px")};
          background: #FFFFFF;
          display: flex;
          flex-direction: column;
          padding: 0;
          z-index: 49; /* on top of main content */
          transition: width 0.25s ease;
          box-shadow: 2px 0 8px rgba(0,0,0,0.3);
        }

        .sidebar-nav {
          flex: 1;
          padding: 70px 12px 12px 12px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        
        .arrow {
          display: ${(isSidebarOpen || isHovered) ? "block" : "none"};
          transition: transform 0.2s ease;
        }
        .arrow.open {
          transform: rotate(180deg);
        }
        .nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 10px;
          font-size: 13.5px;
          font-weight: 500;
          color: var(--color-primary);
          text-decoration: none;
          transition: all .2s;
        }
        .nav-item:hover { background: rgba(27, 94, 53, .08); }
        .nav-item.active { background: rgba(27, 94, 53, .2); font-weight: 700; }

        .nav-label { display: ${(isSidebarOpen || isHovered) ? "inline" : "none"}; }
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
          max-height: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 2px;
          background: rgba(27, 94, 53, .08);
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
          transform: translateY(-5px);
          transition: max-height 0.3s ease, opacity 0.25s ease, transform 0.25s ease;
        }
        .dropdown-menu.open {
          max-height: 200px;
          transform: translateY(0);
        }
        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          color: var(--color-primary);
          transition: all .2s;
        }
        .dropdown-item:hover { background: rgba(27, 94, 53, .08); }
        .dropdown-item.active { background: rgba(27, 94, 53, .2); font-weight: 700; }
        
      `}</style>
      
      <aside className="sidebar"
        onMouseEnter={() => {
          if (!isSidebarOpen) {
            if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
            setIsHovered(true);
          }
        }}
        onMouseLeave={() => {
          if (!isSidebarOpen) {
            hoverTimeout.current = setTimeout(() => setIsHovered(false), 150);
          }
        }}
      >

        <nav className="sidebar-nav">
          {navItems.map((item, index) => {

            if (item.dropdown) {
              const isOpen = openDropdown === item.id;

              return (
                <div key={index}>
                  <button
                    className={`nav-item dropdown-btn ${isOpen ? "active" : ""}`}
                    onClick={() => setOpenDropdown(prev => (prev === item.id ? null : item.id))}
                  >
                    <div className="nav-left">
                      {item.icon}
                      <span className="nav-label">{item.label}</span>
                    </div>
                    <div className={`arrow ${isOpen ? "open" : ""}`}>
                      <IconArrowDown />
                    </div>
                  </button>

                  <div style={{ marginTop: "3px", paddingLeft: "36px", paddingRight: "10px" }}>
                    <div className={`dropdown-menu ${(isSidebarOpen || isHovered) && isOpen ? "open" : "" }`}>
                      {item.children?.map((child: any, i: number) => (
                        <Link
                          key={i}
                          href={child.href}
                          className={`dropdown-item ${
                            pathname?.includes(child.href) ? "active" : ""
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            const isActive = pathname?.includes(item.id);
            return (
              <Link key={index} href={item.id} className={`nav-item ${isActive ? "active" : ""}`}>
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