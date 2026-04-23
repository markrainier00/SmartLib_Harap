"use client";
import { api } from "@/lib/api";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IconScan, IconRegistration, IconBooks } from "@/components/icons";
import ScannerModal from "@/components/ui/ScannerModal";

export default function StaffDashboard() {
  const router = useRouter();
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [borrows, setBorrows] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [scannerOpen, setScannerOpen] = useState(false);
  
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
                api.get(`/api/admin/pendingUsers`),
                api.get("/api/transactions/getBookBorrowRequest"),
                api.get("/api/transactions/getActiveBorrow"),
            ]);

            if (requestRes.data) setRequests(requestRes.data.length);
            if (registrationRes.data) setRegistrations(registrationRes.data.length);
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

  const Spinner = () => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
      <div style={{
        width: "28px", height: "28px",
        border: "3px solid rgba(42,112,64,0.2)",
        borderTop: "3px solid #2a7040",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <>
    <div className="app">
      <div className="page-layout fadeUp">
        <div className="hero relative">
          <div className="page-header text-white">Hello, {currentUser.firstname || 'Student'}!</div>
          
          <p className="page-sub text-white">Here's the overview of library activity</p>
          <div className="summary-grid">
            <div className="sum-card">
              <div className="sum-num">{isLoading ? <Spinner /> : registrations}</div>
              <div className="sum-label">Registration Requests</div>
            </div>
            <div className="sum-card">
              <div className="sum-num">{isLoading ? <Spinner /> : requests}</div>
              <div className="sum-label">Borrow Requests</div>
            </div>
            <div className="sum-card">
              <div className="sum-num">{isLoading ? <Spinner /> : borrows}</div>
              <div className="sum-label">Active Borrows</div>
            </div>
          </div>
        </div>

        <div style={{ padding: "32px 36px", background: "#ffffff", border: "1px solid var(--color-border)", borderRadius: "10px"}}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1a2744", marginBottom: 5 }}>Quick Actions</h3>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap"}}>
            <button className="btn"style={{ flex: "1 1 200px", flexDirection: "column", justifyContent: "center", padding: "30px" }} onClick={() => setScannerOpen(true)}>
              <IconScan/>
              <p style={{ fontSize: "large" }}>Scan QR</p>
            </button>
            <button className="btn"style={{ flex: "1 1 200px", flexDirection: "column", justifyContent: "center" }} onClick={() => router.push("/admin/approvals")}>
              <IconRegistration/>
              <p style={{ fontSize: "large" }}>Review Registrations</p>
            </button>
            <button className="btn"style={{ flex: "1 1 200px", flexDirection: "column", justifyContent: "center" }} onClick={() => router.push("/admin/requests")}>
              <IconBooks/><p style={{ fontSize: "large" }}>View Book Requests</p>
            </button>
          </div>
        </div>
      </div>
    </div>

    <ScannerModal
      isOpen={scannerOpen}
      onClose={() => setScannerOpen(false)}
      onScan={(id) => console.log("Scanned:", id)}
      onConfirmRelease={(reservation) => console.log("Released:", reservation)}
    />
    </>
  );
}