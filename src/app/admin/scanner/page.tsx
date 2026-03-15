"use client";

import React, { useState, useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

// 🎨 DESIGN MO: Button Component
function Btn({ children, variant = "navy", onClick, style = {}, disabled = false, title }: any) {
  const base: any = { 
    border: "none", borderRadius: 10, fontFamily: "'DM Sans', sans-serif", 
    fontSize: 13, fontWeight: 700, cursor: disabled ? "not-allowed" : "pointer", 
    transition: "all .18s", display: "inline-flex", alignItems: "center", 
    justifyContent: "center", gap: 6, padding: "12px 24px", opacity: disabled ? 0.6 : 1, ...style 
  };
  const v: any = {
    navy: { background: "#1a2744", color: "#fff", boxShadow: disabled ? "none" : "0 4px 14px rgba(26,39,68,.22)" },
    ghost: { background: "#f0ede5", color: "#1a2744", border: "2px solid #e2dfd6" },
    red: { background: "#ef4444", color: "#fff" }
  };
  return <button disabled={disabled} style={{ ...base, ...v[variant] }} onClick={onClick} title={title}>{children}</button>;
}

export default function AdminScannerPage() {
  const [scannedResult, setScannedResult] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [studentInfo, setStudentInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 🧠 CENTRALIZED FUNCTION: Dito kumukuha ng data mula sa Go Backend
  const processScan = async (decodedText: string) => {
    const studentQrId = decodedText.trim();
    setScannedResult(studentQrId);
    setLoading(true);
    
    try {
      const res = await fetch(`http://localhost:8080/api/scanner/${studentQrId}`);
      const result = await res.json();

      if (res.ok && result.isSuccess && result.data) {
        // 🚀 DITO NA-SET ANG DATA PARA LUMABAS SA VERIFICATION RESULT
        setStudentInfo({
          school_id: result.data.school_id,
          name: result.data.student_name,
          pending_books: result.data.pending_books || [],
          penalty: result.data.penalty || 0,
        });
      } else {
        alert(result.message || "⚠️ Student not found.");
        setStudentInfo(null);
      }
    } catch (err) {
      alert("⚠️ Connection Error: Check if Go backend is running.");
    } finally {
      setLoading(false);
    }
  };

  // 🎥 LIVE CAMERA LOGIC
  useEffect(() => {
    let scanner: Html5Qrcode | null = null;
    if (isScanning) {
      scanner = new Html5Qrcode("reader");
      html5QrCodeRef.current = scanner;
      scanner.start(
        { facingMode: "environment" }, 
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          setIsScanning(false);
          scanner!.stop().then(() => {
            scanner!.clear();
            processScan(decodedText);
          }).catch(e => console.warn(e));
        },
        () => {} 
      ).catch(() => setIsScanning(false));
    }
    return () => { if (scanner?.isScanning) scanner.stop().then(() => scanner.clear()); };
  }, [isScanning]);

  const handleConfirmRelease = async () => {
    if (!scannedResult) return;
    try {
      const res = await fetch("http://localhost:8080/api/transactions/release", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ school_id: scannedResult }),
      });
      if (res.ok) {
        alert(`✅ Books released for ${studentInfo.name}`);
        setStudentInfo(null);
        setScannedResult(null);
      }
    } catch (err) { alert("Server Error."); }
  };

  return (
    <div style={{ animation: "fadeUp .3s ease", maxWidth: 900, margin: "0 auto" }}>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        #reader { border: none !important; border-radius: 16px; overflow: hidden; background: #0f172a; width: 100%; min-height: 250px; }
        #reader video { object-fit: cover !important; border-radius: 16px; width: 100% !important; height: 100% !important; }
      `}</style>

      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: "#1a2744", marginBottom: 4 }}>SmartLib Scanner</h1>
        <p style={{ fontSize: 14, color: "#8a8ea8" }}>Manage student book releases via QR Scan</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>
        
        {/* LEFT: SCANNER BOX */}
        <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #e2dfd6", padding: 24, boxShadow: "0 12px 32px rgba(26,39,68,.08)" }}>
          <div style={{ position: "relative", width: "100%", background: "#0f172a", borderRadius: 16, overflow: "hidden", marginBottom: 20 }}>
            <div id="reader"></div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {!isScanning ? (
              <Btn onClick={() => { setScannedResult(null); setStudentInfo(null); setIsScanning(true); }}>
                {scannedResult ? "Scan New Student" : "Start Camera Scan"}
              </Btn>
            ) : (
              <Btn variant="red" onClick={() => setIsScanning(false)}>Stop Scanning</Btn>
            )}
            <input type="file" accept="image/*" ref={fileInputRef} onChange={(e: any) => {
              if (e.target.files?.[0]) {
                const scanner = new Html5Qrcode("reader");
                scanner.scanFile(e.target.files[0], false).then(res => processScan(res));
              }
            }} style={{ display: "none" }} />
            <Btn variant="ghost" onClick={() => fileInputRef.current?.click()} disabled={isScanning}>Upload QR Image</Btn>
          </div>
        </div>

        {/* RIGHT: VERIFICATION RESULT (DITO LALABAS ANG DATA) */}
        <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #e2dfd6", padding: 24, boxShadow: "0 12px 32px rgba(26,39,68,.08)", minHeight: 400 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#1a2744", marginBottom: 20, borderBottom: "2px solid #f2efe8", paddingBottom: 12 }}>Verification Result</h2>

          {loading ? (
             <div style={{ textAlign: "center", padding: "40px 0" }}>Fetching student data...</div>
          ) : !studentInfo ? (
            <div style={{ textAlign: "center", padding: "40px 0", color: "#8a8ea8" }}>
              <span style={{ fontSize: 40, display: "block", marginBottom: 12 }}>🔍</span>
              <p style={{ fontSize: 14 }}>Ready to scan student QR</p>
            </div>
          ) : (
            <div style={{ animation: "fadeUp .4s ease" }}>
              {/* AUTOMATIC STUDENT DISPLAY */}
              <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 12, padding: 16, marginBottom: 16 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#3d8bef" }}>STUDENT NAME</span>
                <p style={{ fontSize: 18, fontWeight: 700, color: "#1a2744" }}>{studentInfo.name}</p>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#8a8ea8", marginTop: 8, display: "block" }}>SCHOOL ID</span>
                <p style={{ fontSize: 14, fontWeight: 600 }}>{studentInfo.school_id}</p>
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                 <div style={{ background: studentInfo.penalty > 0 ? "#fef2f2" : "#f0fdf4", border: `1px solid ${studentInfo.penalty > 0 ? "#fecaca" : "#bbf7d0"}`, borderRadius: 12, padding: 12 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: studentInfo.penalty > 0 ? "#ef4444" : "#22c55e" }}>PENALTY</span>
                    <p style={{ fontSize: 15, fontWeight: 700 }}>{studentInfo.penalty > 0 ? `₱${studentInfo.penalty}` : "Clear ✅"}</p>
                 </div>
                 <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 12, padding: 12 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: "#3b82f6" }}>REQUESTS</span>
                    <p style={{ fontSize: 15, fontWeight: 700 }}>{studentInfo.pending_books.length} Book(s)</p>
                 </div>
              </div>

              <div style={{ background: "#f8f9fa", borderRadius: 12, padding: 16, marginBottom: 20, border: "1px solid #e9ecef" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#6c757d", marginBottom: 8, display: "block" }}>BOOKS TO RELEASE</span>
                {studentInfo.pending_books.map((b: string, i: number) => (
                    <div key={i} style={{ fontSize: 13, fontWeight: 600, color: "#1a2744", marginBottom: 4, padding: "4px 8px", background: "#fff", borderRadius: 6, border: "1px solid #dee2e6" }}>• {b}</div>
                ))}
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <Btn variant="navy" style={{ flex: 1 }} onClick={handleConfirmRelease} disabled={studentInfo.penalty > 0 || studentInfo.pending_books.length === 0}>
                  Confirm Release
                </Btn>
                <Btn variant="ghost" onClick={() => setStudentInfo(null)}>Clear</Btn>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}