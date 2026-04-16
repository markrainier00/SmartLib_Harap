"use client";
import { api } from "@/lib/api";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IconActiveBorrow, IconBookRequests, IconRegistrationRequests, IconLogo } from "@/components/icons";

export default function StaffDashboard() {
  const router = useRouter();
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [borrows, setBorrows] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
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
      const fetchData = async () => {
          setIsLoading(true);
          try {
              const [registrationRes, requestRes, borrowRes] = await Promise.all([
                  api.get(`/api/admin/registrations`),
                  api.get("/api/transactions/getBookBorrowRequest"),
                  api.get("/api/transactions/getActiveBorrow"),
              ]);
  
              if (registrationRes.data) setRequests(registrationRes.data.filter((u: any) => u.status === "Pending" && u.role === "Student").length);
              if (requestRes.data) setRegistrations(requestRes.data.length);
              if (borrowRes.data) setBorrows(borrowRes.data.length);
          } catch (err) {
              console.error("Failed to fetch requests", err);
          } finally {
              setIsLoading(false);
          }
      };
      fetchData();
  }, [router]);


  if (!currentUser) return null;

  return (
    <div className="page-layout fadeUp">
      <div className="hero relative">
        <div className="page-header text-white">Hello, {currentUser.firstname || 'Student'}!</div>
        
        <p className="page-sub text-white">
          You have pending tasks that need your attention. Review new student registrations and book borrowing requests to keep the library moving.
        </p>
        <div className="summary-grid">
          <div className="sum-card">
            <div className="sum-num">{registrations}</div>
            <div className="sum-label">Registration Requests</div>
          </div>
          <div className="sum-card">
            <div className="sum-num">{requests}</div>
            <div className="sum-label">Borrow Requests</div>
          </div>
          <div className="sum-card">
            <div className="sum-num">{borrows}</div>
            <div className="sum-label">Active Borrows</div>
          </div>
        </div>
        <IconLogo className="absolute right-2 bottom-0 w-60 h-60 opacity-10 -rotate-12"/>
      </div>

      {/* QUICK ACTIONS */}
      <div>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1a2744", marginBottom: 5 }}>Quick Actions</h3>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap"}}>
          <button className="btn"style={{ flex: "1 1 200px" }} onClick={() => router.push("/admin/scanner")}>
            Scan QR
          </button>
          <button className="btn"style={{ flex: "1 1 200px" }} onClick={() => router.push("/admin/approvals")}>
            Review Registrations
          </button>
          <button className="btn"style={{ flex: "1 1 200px" }} onClick={() => router.push("/admin/requests")}>
            View Book Requests
          </button>
        </div>
      </div>
    </div>
  );
}