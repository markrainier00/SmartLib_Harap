"use client";

import React, { useState } from "react";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("register");

  // State para ma-control ang pagpapakita ng password
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  // States para sa form inputs (para magawa natin yung auto-capitalize)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Function para gawing Capital ang unang letter habang nagta-type
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
    const value = e.target.value;
    if (value.length > 0) {
      setter(value.charAt(0).toUpperCase() + value.slice(1));
    } else {
      setter("");
    }
  };

  const handleAction = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Processing ${activeTab} request...`);
  };

  return (
    <div className="auth-card">
      
      {/* Logo and Header */}
      <div className="header-section">
        <svg className="logo-icon" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="8" width="26" height="34" rx="4" fill="#e8528a" transform="rotate(6 33 25)" />
          <rect x="8" y="12" width="26" height="34" rx="4" fill="#3d8bef" transform="rotate(-4 21 29)" />
          <rect x="13" y="16" width="24" height="30" rx="4" fill="#4caf6e" />
          <rect x="14" y="17" width="2" height="28" rx="1" fill="rgba(255,255,255,0.4)" />
        </svg>
        <h1 className="app-title">LibraSync</h1>
        <p className="app-subtitle">Student Library Management Portal</p>
      </div>

      {/* Toggle Tabs */}
      <div className="tabs-container">
        <button 
          className={`tab-btn ${activeTab === "signin" ? "active" : ""}`}
          onClick={() => setActiveTab("signin")}
          type="button"
        >
          Sign In
        </button>
        <button 
          className={`tab-btn ${activeTab === "register" ? "active" : ""}`}
          onClick={() => setActiveTab("register")}
          type="button"
        >
          Register
        </button>
      </div>

      {/* Forms */}
      <form onSubmit={handleAction}>
        
        {/* === REGISTER FORM VIEW === */}
        {activeTab === "register" && (
          <>
            <div className="form-row">
              <div>
                <label>First Name</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="Maria" 
                  value={firstName}
                  onChange={(e) => handleNameChange(e, setFirstName)}
                  required 
                />
              </div>
              <div>
                <label>Last Name</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="Santos" 
                  value={lastName}
                  onChange={(e) => handleNameChange(e, setLastName)}
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input type="email" className="input-field" placeholder="student@university.edu" required />
            </div>

            <div className="form-group">
              <label>Student ID Number</label>
              <input type="text" className="input-field" placeholder="2024-00123" required />
            </div>

            <div className="form-row">
              <div>
                <label>Course</label>
                <select className="input-field" required defaultValue="">
                  <option value="" disabled>Select</option>
                  <option value="BSME">BSME</option>
                  <option value="BSCS">BSCS</option>
                  <option value="BSIT">BSIT</option>
                  <option value="BSBA">BSBA</option>
                </select>
              </div>
              <div>
                <label>Year Level</label>
                <select className="input-field" required defaultValue="">
                  <option value="" disabled>Select</option>
                  <option value="1st">1st Year</option>
                  <option value="2nd">2nd Year</option>
                  <option value="3rd">3rd Year</option>
                  <option value="4th">4th Year</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="password-wrap">
                <input 
                  type={showRegisterPassword ? "text" : "password"} 
                  className="input-field" 
                  placeholder="Min. 8 characters" 
                  required 
                />
                <button 
                  type="button" 
                  className="toggle-password" 
                  onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showRegisterPassword ? (
                    /* Eye Off Icon (Hide) */
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                      <line x1="2" y1="2" x2="22" y2="22" />
                    </svg>
                  ) : (
                    /* Eye Icon (Show) */
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="submit-btn">Create Account</button>
          </>
        )}

        {/* === SIGN IN FORM VIEW === */}
        {activeTab === "signin" && (
          <>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" className="input-field" placeholder="student@university.edu" required />
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="password-wrap">
                <input 
                  type={showLoginPassword ? "text" : "password"} 
                  className="input-field" 
                  placeholder="••••••••" 
                  required 
                />
                <button 
                  type="button" 
                  className="toggle-password" 
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showLoginPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" y1="2" x2="22" y2="22" /></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                  )}
                </button>
              </div>
              <a href="#" className="forgot-link">Forgot password?</a> 
            </div>

            <button type="submit" className="submit-btn">Sign In</button>
          </>
        )}
      </form>

    </div>
  );
}