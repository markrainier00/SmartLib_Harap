"use client";

import { useState, useRef , useEffect } from "react";
import { useUser } from "@/lib/user";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconHamburger, IconBookReq, IconBorrowHis, IconDashboard, IconLibManage, IconManageAcc, IconRegistration, IconRecommendation, IconMyList, IconHistory, IconSupport, IconData, IconArrowDown } from "../icons";

export default function Sidebar({ isSidebarOpen, toggleSidebar }: { isSidebarOpen: boolean; toggleSidebar: () => void }) {
  const { role, user, id } = useUser() as any; 
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

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
      ],
    },
    { id: "/admin/analytics", icon: <IconData />, label: "Data Analytics" },
    { id: "/admin/support", icon: <IconSupport />, label: "Student Support", badge: openTickets > 0 ? openTickets : null },
  ];

  const libraryNavItems = [
    { id: "/library/recommendation", icon: <IconRecommendation />, label: "Recommendation" },
    { id: "/library/mylist", icon: <IconMyList />, label: "My List" },
    { id: "/library/history", icon: <IconHistory />, label: "History" },
    { id: "/library/support", icon: <IconSupport />, label: "Support", badge: studentUnread > 0 ? studentUnread : null },
  ];
  
  const superAdminNavItems = [
    { id: "/superadmin/dashboard", icon: <IconDashboard />, label: "Dashboard" },
    { id: "/superadmin/accounts", icon: <IconManageAcc />, label: "Manage Accounts" },
    { id: "/superadmin/analytics", icon: <IconData />, label: "Data Analytics" },
  ];
  
  let navItems: any[] = [];
  if (currentRole === 'staff') navItems = adminNavItems;
  else if (currentRole === 'student') navItems = libraryNavItems;
  else if (currentRole === 'admin') navItems = superAdminNavItems;
  
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
          z-index: 49;
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
          position: relative; 
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
      
        .nav-badge { 
          background: #ef4444; 
          color: white; 
          font-size: ${(isSidebarOpen || isHovered) ? "11px" : "9px"}; 
          font-weight: bold; 
          min-width: ${(isSidebarOpen || isHovered) ? "20px" : "16px"}; 
          height: ${(isSidebarOpen || isHovered) ? "20px" : "16px"}; 
          border-radius: 50%; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          position: absolute; 
          right: ${(isSidebarOpen || isHovered) ? "12px" : "10px"}; 
          top: ${(isSidebarOpen || isHovered) ? "50%" : "6px"}; 
          transform: ${(isSidebarOpen || isHovered) ? "translateY(-50%)" : "none"}; 
          box-shadow: 0 2px 4px rgba(0,0,0,0.2); 
          transition: all 0.2s ease;
        }
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
            const isActive = item.exact ? pathname === item.id : pathname?.includes(item.id);
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