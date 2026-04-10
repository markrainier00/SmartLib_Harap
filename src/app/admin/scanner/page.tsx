"use client";

import React, { useState, useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

// 🎨 DESIGN MO: Button Component
function Btn({ children, variant = "navy", onClick, style = {}, disabled = false }: any) {
  const base: any = { border: "none", borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700, cursor: disabled ? "not-allowed" : "pointer", transition: "all .18s", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "12px 24px", opacity: disabled ? 0.6 : 1, ...style };
  const v: any = {
    navy: { background: "#1a2744", color: "#fff", boxShadow: disabled ? "none" : "0 4px 14px rgba(26,39,68,.22)" },
    ghost: { background: "#f0ede5", color: "#1a2744", border: "2px solid #e2dfd6" },
    green: { background: "#2d7a4f", color: "#fff" },
    red: { background: "#ef4444", color: "#fff" }
  };
  return <button disabled={disabled} style={{ ...base, ...v[variant] }} onClick={onClick}>{children}</button>;
}

export default function AdminScannerPage() {
  const [scannedResult, setScannedResult] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [studentInfo, setStudentInfo] = useState<any>(null);
  
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  
  // 🚨 REF PARA SA CUSTOM FILE UPLOAD NATIN
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 🧠 CENTRALIZED FUNCTION: Dito babagsak ang data galing Live Cam man o File Upload
  const processScan = (decodedText: string) => {
    const studentQrId = decodedText.trim();
    setScannedResult(studentQrId);
    
    // Kunin ang data
    const allRequests = JSON.parse(localStorage.getItem("smartlib_requests") || "[]");
    const allPenalties = JSON.parse(localStorage.getItem("smartlib_penalties") || "[]");

    const myReservation = allRequests.find((req: any) => req.studentId === studentQrId && req.status === "Pending");
    const myPenalty = allPenalties.find((p: any) => p.studentId === studentQrId);

    setStudentInfo({
      name: myReservation ? myReservation.studentName : "Student " + studentQrId,
      reservation: myReservation || null,
      penalty: myPenalty ? myPenalty.amount : 0
    });
  };

  // 📸 UPLOAD IMAGE LOGIC
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const html5QrCode = new Html5Qrcode("reader");

      try {
        const decodedText = await html5QrCode.scanFile(file, false);
        processScan(decodedText);
      } catch (err) {
        alert("Hindi mabasa ang QR code sa picture na ito. Siguraduhing malinaw ang file.");
      }
      
      // I-reset ang input para pwede mag-upload ulit ng same file kung sakali
      e.target.value = "";
    }
  };

  // 🎥 LIVE CAMERA LOGIC
  useEffect(() => {
    if (isScanning) {
      html5QrCodeRef.current = new Html5Qrcode("reader");

      html5QrCodeRef.current.start(
        { facingMode: "environment" }, 
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          setIsScanning(false);
          
          if (html5QrCodeRef.current) {
            html5QrCodeRef.current.stop().then(() => {
              html5QrCodeRef.current?.clear();
              processScan(decodedText); // Ipasa ang data sa process function
            }).catch(err => console.log("Stop error", err));
          }
        },
        (error) => { /* Silent error handling */ }
      ).catch((err) => {
        setIsScanning(false);
        alert("Hindi mabuksan ang camera. Check your browser permissions.");
      });
    }

    return () => {
      if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
        html5QrCodeRef.current.stop().then(() => {
          html5QrCodeRef.current?.clear();
        }).catch(() => {});
      }
    };
  }, [isScanning]);

  const handleConfirmRelease = () => {
    if (!studentInfo?.reservation) return;
    
    const allRequests = JSON.parse(localStorage.getItem("smartlib_requests") || "[]");
    const updated = allRequests.map((req: any) => 
      req.id === studentInfo.reservation.id ? { ...req, status: "Approved" } : req
    );
    localStorage.setItem("smartlib_requests", JSON.stringify(updated));
    
    alert(`Success! "${studentInfo.reservation.bookTitle}" has been released.`);
    setScannedResult(null);
    setStudentInfo(null);
  };

  return (
    <div style={{ animation: "fadeUp .3s ease", maxWidth: 900, margin: "0 auto" }}>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        #reader { border: none !important; border-radius: 16px; overflow: hidden; background: #0f172a; width: 100%; min-height: 250px; }
        #reader video { object-fit: cover !important; border-radius: 16px; }
      `}</style>

      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: "#1a2744", marginBottom: 4 }}>Live QR Scanner</div>
        <div style={{ fontSize: 14, color: "#8a8ea8" }}>Use your laptop camera or upload a QR image</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>
        
        {/* LEFT: SCANNER CONTROLS */}
        <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #e2dfd6", padding: 24, boxShadow: "0 12px 32px rgba(26,39,68,.08)" }}>
          <div style={{ position: "relative", width: "100%", background: "#0f172a", borderRadius: 16, overflow: "hidden", marginBottom: 20 }}>
            
            {!isScanning && !scannedResult && (
              <div style={{ padding: "60px 20px", textAlign: "center", color: "rgba(255,255,255,0.5)", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "100%", zIndex: 10 }}>
                <span style={{ fontSize: 50, display: "block", marginBottom: 12 }}>📷</span>
                Camera is off
              </div>
            )}
            
            <div id="reader"></div>
          </div>

          {!isScanning ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Btn onClick={() => { setScannedResult(null); setStudentInfo(null); setIsScanning(true); }} style={{ width: "100%" }}>
                {scannedResult ? "Scan Another ID" : "Start Camera"}
              </Btn>
              
              {/* 🚨 ANG CUSTOM UPLOAD BUTTON NATIN 🚨 */}
              <input 
                type="file" 
                accept="image/*" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                style={{ display: "none" }} 
              />
              <Btn variant="ghost" onClick={() => fileInputRef.current?.click()} style={{ width: "100%" }}>Upload QR Image</Btn>
            </div>
          ) : (
            <Btn variant="ghost" onClick={() => setIsScanning(false)} style={{ width: "100%" }}>Stop Camera</Btn>
          )}
        </div>

        {/* RIGHT: RESULTS */}
        <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #e2dfd6", padding: 24, boxShadow: "0 12px 32px rgba(26,39,68,.08)", height: "100%" }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#1a2744", marginBottom: 20, fontFamily: "'DM Serif Display', serif", borderBottom: "2px solid #f2efe8", paddingBottom: 12 }}>
            Student Information
          </div>

          {!scannedResult || !studentInfo ? (
            <div style={{ textAlign: "center", padding: "40px 0", color: "#8a8ea8" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Waiting for QR scan...</div>
            </div>
          ) : (
            <div style={{ animation: "fadeUp .4s ease" }}>
              
              {/* STUDENT PROFILE BOX */}
              <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 12, padding: 16, marginBottom: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#3d8bef", marginBottom: 4 }}>STUDENT DETECTED</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#1a2744" }}>{studentInfo.name}</div>
                <div style={{ fontSize: 13, color: "#64748b" }}>ID: {scannedResult}</div>
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                {/* Penalty Card */}
                <div style={{ background: studentInfo.penalty > 0 ? "#fef2f2" : "#f0fdf4", border: `1px solid ${studentInfo.penalty > 0 ? "#fecaca" : "#bbf7d0"}`, borderRadius: 12, padding: 16 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: studentInfo.penalty > 0 ? "#ef4444" : "#22c55e", marginBottom: 4 }}>PENALTY STATUS</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#1a2744" }}>{studentInfo.penalty > 0 ? `₱${studentInfo.penalty}` : "Clear"}</div>
                </div>

                {/* Reservation Card */}
                <div style={{ background: studentInfo.reservation ? "#eff6ff" : "#f8fafc", border: `1px solid ${studentInfo.reservation ? "#bfdbfe" : "#e2e8f0"}`, borderRadius: 12, padding: 16 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: studentInfo.reservation ? "#3b82f6" : "#64748b", marginBottom: 4 }}>RESERVATION</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#1a2744", lineHeight: 1.2 }}>
                    {studentInfo.reservation ? studentInfo.reservation.bookTitle : "None"}
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div style={{ display: "flex", gap: 10 }}>
                {studentInfo.penalty > 0 ? (
                   <Btn variant="red" style={{ flex: 1 }} disabled={true}>Cannot Release</Btn>
                ) : studentInfo.reservation ? (
                   <Btn variant="navy" style={{ flex: 1 }} onClick={handleConfirmRelease}>Release Book</Btn>
                ) : (
                   <Btn variant="navy" style={{ flex: 1 }} onClick={() => alert("Proceeding to Walk-in Borrowing...")}>Walk-in Borrow</Btn>
                )}
                
                <Btn variant="ghost" onClick={() => { setScannedResult(null); setStudentInfo(null); }}>Clear</Btn>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}