"use client";

import React, { useState, useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

function Btn({ children, variant = "navy", onClick, style = {} }: any) {
  const base: any = { border: "none", borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all .18s", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "12px 24px", ...style };
  const v: any = {
    navy: { background: "#1a2744", color: "#fff", boxShadow: "0 4px 14px rgba(26,39,68,.22)" },
    ghost: { background: "#f0ede5", color: "#1a2744", border: "2px solid #e2dfd6" },
    green: { background: "#2d7a4f", color: "#fff" },
  };
  return <button style={{ ...base, ...v[variant] }} onClick={onClick}>{children}</button>;
}

export default function AdminScannerPage() {
  const [scannedResult, setScannedResult] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    if (isScanning) {
      // Setup ang scanner pagka-click ng "Start Scanning"
      scannerRef.current = new Html5QrcodeScanner(
        "reader", 
        { fps: 10, qrbox: { width: 250, height: 250 } },
        /* verbose= */ false
      );

      scannerRef.current.render(
        (decodedText) => {
          setScannedResult(decodedText);
          setIsScanning(false);
          if (scannerRef.current) {
            scannerRef.current.clear(); // Patayin ang cam pag may na-detect na
          }
        },
        (error) => {
          // Silent error handling habang naghahanap ng code
        }
      );
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(err => console.error("Failed to clear scanner", err));
      }
    };
  }, [isScanning]);

  return (
    <div style={{ animation: "fadeUp .3s ease", maxWidth: 900, margin: "0 auto" }}>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        #reader { border: none !important; border-radius: 16px; overflow: hidden; }
        #reader__dashboard_section_csr button { 
          background: #1a2744 !important; color: white !important; border: none !important; 
          padding: 8px 16px !important; border-radius: 8px !important; cursor: pointer !important;
        }
      `}</style>

      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: "#1a2744", marginBottom: 4 }}>Live QR Scanner</div>
        <div style={{ fontSize: 14, color: "#8a8ea8" }}>Use your laptop camera to scan Student IDs</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>
        
        {/* LEFT: LIVE CAMERA VIEWPORT */}
        <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #e2dfd6", padding: 24, boxShadow: "0 12px 32px rgba(26,39,68,.08)" }}>
          <div style={{ position: "relative", width: "100%", background: "#0f172a", borderRadius: 16, overflow: "hidden", marginBottom: 20 }}>
            {!isScanning && !scannedResult && (
              <div style={{ padding: "60px 20px", textAlign: "center", color: "rgba(255,255,255,0.5)" }}>
                <span style={{ fontSize: 50, display: "block", marginBottom: 12 }}>📷</span>
                Camera is off
              </div>
            )}
            <div id="reader" style={{ width: "100%" }}></div>
          </div>

          {!isScanning ? (
            <Btn onClick={() => { setScannedResult(null); setIsScanning(true); }} style={{ width: "100%" }}>
              {scannedResult ? "Scan Again" : "📷 Start Camera"}
            </Btn>
          ) : (
            <Btn variant="ghost" onClick={() => setIsScanning(false)} style={{ width: "100%" }}>Stop Camera</Btn>
          )}
        </div>

        {/* RIGHT: RESULTS */}
        <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #e2dfd6", padding: 24, boxShadow: "0 12px 32px rgba(26,39,68,.08)", height: "100%" }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#1a2744", marginBottom: 20, fontFamily: "'DM Serif Display', serif", borderBottom: "2px solid #f2efe8", paddingBottom: 12 }}>
            Scanned Data
          </div>

          {!scannedResult ? (
            <div style={{ textAlign: "center", padding: "40px 0", color: "#8a8ea8" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Ready to scan...</div>
            </div>
          ) : (
            <div style={{ animation: "fadeUp .4s ease" }}>
              <div style={{ background: "#e6f7ec", border: "1px solid #b6e8c4", borderRadius: 12, padding: 16, marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#2d7a4f", marginBottom: 4 }}>QR CODE DETECTED</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#1a2744", wordBreak: "break-all" }}>{scannedResult}</div>
              </div>
              
              <div style={{ fontSize: 13, color: "#64748b", marginBottom: 20 }}>
                This data matches a record in the database. What would you like to do?
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <Btn variant="green" style={{ flex: 1 }} onClick={() => alert("Transaction Processed!")}>Process</Btn>
                <Btn variant="ghost" onClick={() => setScannedResult(null)}>Clear</Btn>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}