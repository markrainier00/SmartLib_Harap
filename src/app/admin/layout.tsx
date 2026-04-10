"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!user || !token) {
      router.replace("/")
    }
  }, [router]);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="app" style={{ display: "flex" }}>
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="main" style={{ flex: 1 }}>
        <Topbar isSidebarOpen={isSidebarOpen} />
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  );
}