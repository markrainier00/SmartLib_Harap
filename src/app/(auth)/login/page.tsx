"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
    const value = e.target.value;
    setter(value.length > 0 ? value.charAt(0).toUpperCase() + value.slice(1) : "");
  };

  // Function para dumiretso sa Library Dashboard pagka-login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard/library");
  };

  return (
    <div className="auth-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500;600&display=swap');
        
        .auth-container {
          min-height: 100vh;
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(ellipse at 30% 20%, #dde8f5 0%, #f5f3ee 55%),
                      radial-gradient(ellipse at 80% 80%, #e8f0d8 0%, transparent 50%);
          font-family: 'DM Sans', sans-serif;
          position: fixed;
          inset: 0;
          overflow-y: auto;
          padding: 40px 20px;
        }

        .blob { position: absolute; border-radius: 50%; filter: blur(60px); opacity: 0.35; pointer-events: none; }
        .blob-1 { width: 340px; height: 340px; background: #b8d0f7; top: -80px; left: -100px; }
        .blob-2 { width: 280px; height: 280px; background: #c5eac7; bottom: -60px; right: -80px; }

        .card { 
          background: #ffffff; 
          border-radius: 28px; 
          box-shadow: 0 32px 80px rgba(26, 39, 68, 0.18); 
          padding: 32px 36px; 
          width: 100%; 
          max-width: 440px; 
          position: relative; 
          z-index: 1; 
          display: flex;
          flex-direction: column;
          height: auto;
          transition: all 0.3s ease-in-out;
        }

        .brand-name { font-family: 'DM Serif Display', serif; font-size: 26px; color: #1a2744; margin-top: 10px; }
        .brand-sub { font-size: 12px; color: #8a8ea8; margin-bottom: 24px; text-align: center; }

        .tabs { display: flex; background: #f0ede5; border-radius: 12px; padding: 4px; margin-bottom: 20px; }
        .tab { flex: 1; padding: 8px; border: none; border-radius: 9px; font-size: 13.5px; font-weight: 500; cursor: pointer; transition: 0.2s; background: transparent; color: #8a8ea8; }
        .tab.active { background: #ffffff; color: #1a2744; box-shadow: 0 2px 8px rgba(26,39,68,0.1); }

        .field { margin-bottom: 12px; text-align: left; }
        .field label { display: block; font-size: 9.5px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #1a2744; margin-bottom: 4px; }
        
        .input-wrap { position: relative; display: flex; align-items: center; }
        .field input, .field select { 
          width: 100%; background: #f0ede5; border: 1.5px solid transparent; border-radius: 10px; padding: 10px 12px; 
          font-size: 13.5px; color: #1a2744; outline: none; transition: 0.2s; 
        }
        .field input:focus { border-color: #2a3d6e; background: #fff; }

        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        
        .btn-signin { 
          width: 100%; margin-top: 8px; padding: 13px; background: #1a2744; color: #fff; 
          border: none; border-radius: 12px; font-size: 14px; font-weight: 600; cursor: pointer; 
          box-shadow: 0 4px 16px rgba(26,39,68,0.2); transition: 0.2s;
        }
        .btn-signin:hover { background: #2a3d6e; transform: translateY(-1px); }

        .forgot-link { display: block; margin-top: 4px; font-size: 11px; color: #8a8ea8; text-decoration: none; text-align: right; }
        
        .toggle-pw { position: absolute; right: 10px; background: none; border: none; cursor: pointer; color: #b0afc9; display: flex; align-items: center; }
      `}</style>

      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

      <div className="card">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <svg width="48" height="48" viewBox="0 0 56 56" fill="none">
            <rect x="20" y="8" width="26" height="34" rx="4" fill="#e8528a" transform="rotate(6 33 25)"/>
            <rect x="8" y="12" width="26" height="34" rx="4" fill="#3d8bef" transform="rotate(-4 21 29)"/>
            <rect x="13" y="16" width="24" height="30" rx="4" fill="#4caf6e"/>
            <rect x="14" y="17" width="2" height="28" rx="1" fill="rgba(255,255,255,0.4)"/>
          </svg>
          <div className="brand-name">LibraSync</div>
          <div className="brand-sub">Student Library Management Portal</div>
        </div>

        <div className="tabs">
          <button className={`tab ${activeTab === 'signin' ? 'active' : ''}`} onClick={() => setActiveTab('signin')}>Sign In</button>
          <button className={`tab ${activeTab === 'register' ? 'active' : ''}`} onClick={() => setActiveTab('register')}>Register</button>
        </div>

        <form onSubmit={handleLogin}>
          {activeTab === 'signin' ? (
            <>
              {/* BINAGO ANG LABEL AT PLACEHOLDER BASE SA PDF */}
              <div className="field">
                <label>Email Address / Student ID</label>
                <input type="text" placeholder="student@university.edu or 2024-00123" required />
              </div>
              <div className="field">
                <label>Password</label>
                <div className="input-wrap">
                  <input type={showPassword ? "text" : "password"} placeholder="••••••••" required />
                  <button type="button" className="toggle-pw" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 19c-7 0-11-7-11-7a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 7 11 7a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    )}
                  </button>
                </div>
                <a href="#" className="forgot-link">Forgot password?</a>
              </div>
              <button type="submit" className="btn-signin">Sign In</button>
            </>
          ) : (
            <>
              <div className="form-row">
                <div className="field">
                  <label>First Name</label>
                  <input type="text" placeholder="Maria" value={firstName} onChange={(e) => handleNameChange(e, setFirstName)} required />
                </div>
                <div className="field">
                  <label>Last Name</label>
                  <input type="text" placeholder="Santos" value={lastName} onChange={(e) => handleNameChange(e, setLastName)} required />
                </div>
              </div>
              <div className="field">
                <label>Email Address</label>
                <input type="email" placeholder="student@university.edu" required />
              </div>
              <div className="field">
                <label>Student ID</label>
                <input type="text" placeholder="2024-00123" required />
              </div>
              <div className="form-row">
                {/* BINAGO ANG LABEL NA COURSE SA PROGRAM BASE SA PDF */}
                <div className="field">
                  <label>Program</label>
                  <select required defaultValue="">
                    <option value="" disabled>Select</option>
                    <option value="BSCS">BSCS</option>
                    <option value="BSIT">BSIT</option>
                    <option value="BSCpE">BSCpE</option>
                  </select>
                </div>
                <div className="field">
                  <label>Year</label>
                  <select required defaultValue="">
                    <option value="" disabled>Select</option>
                    <option value="1st">1st Year</option>
                    <option value="2nd">2nd Year</option>
                    <option value="3rd">3rd Year</option>
                    <option value="4th">4th Year</option>
                  </select>
                </div>
              </div>
              <div className="field">
                <label>Password</label>
                <div className="input-wrap">
                  <input type={showPassword ? "text" : "password"} placeholder="••••••••" required />
                <button type="button" className="toggle-pw" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 19c-7 0-11-7-11-7a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 7 11 7a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    )}
                  </button>
                </div>
              </div>
              <button type="submit" className="btn-signin">Create Account</button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}