"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IconActiveBorrow, IconBookRequests, IconRegistrationRequests, IconLogo } from "@/components/icons";

export default function StaffDashboard() {
  const router = useRouter();
  
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      router.replace("/");
    } else {
      try {
        setCurrentUser(JSON.parse(userStr));
      } catch (e) {
        router.replace("/");
      }
    }
  }, [router]);

  
  if (!currentUser) return null;

  return (
    <div className="page-layout fadeUp">
      <div className="hero relative">
          <div className="hero-eyebrow">Hello, {currentUser.firstname || 'Student'}!</div>
          <h2>All systems are running smoothly.</h2>
          <p style={{ fontSize: 14, opacity: 0.9, maxWidth: 500, lineHeight: 1.6, marginBottom: 24 }}>
            You have pending tasks that need your attention. Review new student registrations and book borrowing requests to keep the library moving.
          </p>
          <IconLogo className="absolute right-10 top-4 w-60 h-60 opacity-10 -rotate-12"/>
      </div>

      <div className="summary-grid">
        <div className="sum-card">
          <div className="sum-num" style={{ color: "var(--color-error)" }}>?</div>
          <div className="sum-label">Registration Requests</div>
        </div>
        <div className="sum-card">
          <div className="sum-num" style={{ color: "#e8a020" }}>?</div>
          <div className="sum-label">Borrow Requests</div>
        </div>
        <div className="sum-card">
          <div className="sum-num" style={{ color: "var(--color-info)" }}>?</div>
          <div className="sum-label">Active Borrows</div>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1a2744", marginBottom: 16 }}>Quick Actions</h3>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 12 }}>
            <button className="btn" onClick={() => router.push("/admin/scanner")}>
              Scan QR
            </button>
            <button className="btn" onClick={() => router.push("/admin/approvals")}>
              Review Registrations
            </button>
            <button className="btn" onClick={() => router.push("/admin/requests")}>
              View Book Requests
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}