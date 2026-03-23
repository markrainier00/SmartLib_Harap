import React from "react";
import SuperAdminSidebar from "@/components/layout/SuperAdminSidebar";
import SuperAdminTopbar from "@/components/layout/SuperAdminTopbar";
import "./superadmin.css"; // 🚀 Gagawa tayo ng file para rito!

export const metadata = {
  title: "SmartLib - Super Admin",
  description: "Super Admin Portal for SmartLib",
};

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="superadmin-wrapper">
      <SuperAdminSidebar />
      <main className="main">
        <SuperAdminTopbar />
        {/* Dito papasok yung mga pages natin (Dashboard, Accounts, etc.) */}
        <div className="page active" style={{ display: 'block' }}>
          {children}
        </div>
      </main>
    </div>
  );
}