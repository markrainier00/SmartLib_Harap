"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

// 🎨 DESIGN MO: Pure UI Button Component (Kapareho ng sa SmartLib theme mo)
function Btn({ children, variant = "navy", onClick, style = {}, disabled = false }: any) {
  const base: any = { border: "none", borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700, cursor: disabled ? "not-allowed" : "pointer", transition: "all .18s", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "12px 24px", opacity: disabled ? 0.6 : 1, ...style };
  const v: any = {
    navy: { background: "#1a2744", color: "#fff", boxShadow: disabled ? "none" : "0 4px 14px rgba(26,39,68,.22)" },
    ghost: { background: "#f0ede5", color: "#1a2744", border: "2px solid #e2dfd6" },
  };
  return <button disabled={disabled} style={{ ...base, ...v[variant] }} onClick={onClick}>{children}</button>;
}

export default function ForgotPassword() {
  const router = useRouter();
  
  // UI States (Walang halong database, pure design muna)
  const [step, setStep] = useState(1); // Step 1: Email Input, Step 2: New Password Input
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // FRONTEND LOGIC: Pag-click ng Verify, pupunta lang sa Step 2 para makita ang UI
  const handleVerifyEmail = () => {
    if (!email) {
      alert("Please enter an email address.");
      return;
    }
    setStep(2); // Tuloy agad sa next step (UI Testing)
  };

  // FRONTEND LOGIC: Pag-click ng Reset, mag-a-alert lang tapos babalik sa Login
  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    alert("Password updated successfully! (Frontend UI Demo)");
    router.push("/login"); // Iikot pabalik sa login page mo
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#faf9f6", padding: "20px" }}>
      <style>{`
        .card { background: #fff; padding: 40px; border-radius: 24px; border: 1px solid #e2dfd6; box-shadow: 0 12px 32px rgba(26,39,68,.08); width: 100%; max-width: 400px; animation: fadeUp .4s ease; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        
        .input-group { margin-bottom: 20px; text-align: left; }
        .input-group label { display: block; font-size: 13px; font-weight: 700; color: #1a2744; margin-bottom: 8px; }
        .input-group input { width: 100%; padding: 12px 16px; border-radius: 10px; border: 2px solid #f0ede5; font-family: 'DM Sans', sans-serif; outline: none; transition: border .2s; }
        .input-group input:focus { border-color: #1a2744; }
      `}</style>

      <div className="card">
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          {/* DYNAMIC TEXT DEPENDING SA UI STEP */}
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "28px", color: "#1a2744", margin: "0 0 8px 0" }}>
            {step === 1 ? "Forgot Password?" : "Reset Password"}
          </h1>
          <p style={{ fontSize: "14px", color: "#8a8ea8", margin: 0 }}>
            {step === 1 ? "Enter your email to reset your account." : "Create a new secure password."}
          </p>
        </div>

        {/* STEP 1 UI: EMAIL FORM */}
        {step === 1 ? (
          <div style={{ animation: "fadeUp .3s ease" }}>
            <div className="input-group">
              <label>Email Address</label>
              <input 
                type="email" 
                placeholder="e.g. bryan@cmdi.edu" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            <Btn onClick={handleVerifyEmail} style={{ width: "100%", marginBottom: "12px" }}>
              Verify Email
            </Btn>
          </div>
        ) : (
          
        /* STEP 2 UI: NEW PASSWORD FORM */
          <div style={{ animation: "fadeUp .3s ease" }}>
            <div className="input-group">
              <label>New Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
              />
            </div>
            <div className="input-group">
              <label>Confirm Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
              />
            </div>
            <Btn onClick={handleResetPassword} style={{ width: "100%", marginBottom: "12px" }}>
              Reset Password
            </Btn>
          </div>
        )}

        {/* BACK TO LOGIN BUTTON */}
        <Btn variant="ghost" onClick={() => router.push("/login")} style={{ width: "100%" }}>
          Back to Login
        </Btn>
      </div>
    </div>
  );
}