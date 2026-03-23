"use client"

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/layout/Library_Sidebar";
import Topbar from "@/components/layout/Library_Topbar";

export default function LibraryLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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