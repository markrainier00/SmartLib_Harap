"use client";

import React, { useState, useEffect } from "react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("info");

  // State para sa Profile Info
  const [fullName, setFullName] = useState("Bryan Lumangaya");
  const [studentId, setStudentId] = useState("2024-00123");
  const [email, setEmail] = useState("bryan@cmdi.edu");
  const [program, setProgram] = useState("BSCS");
  const [yearLevel, setYearLevel] = useState("2nd Year");
  const [department, setDepartment] = useState("College of Computing");

  // State para sa Password
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#password") {
        setActiveTab("password");
      } else {
        setActiveTab("info");
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("✅ Profile information updated successfully!");
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPw !== confirmPw) {
      alert("⚠️ New passwords do not match!");
      return;
    }
    alert("✅ Password changed successfully!");
    setCurrentPw(""); setNewPw(""); setConfirmPw("");
  };

  const changeTab = (tab: string) => {
    setActiveTab(tab);
    window.history.pushState(null, "", `#${tab}`);
  };

  return (
    <div className="page-profile" style={{ animation: "fadeUp .3s ease both" }}>
      <style>{`
        .page-profile { width: 100%; max-width: 900px; margin: 0 auto; padding-bottom: 20px; }
        
        .prof-header { font-family: 'DM Serif Display', serif; font-size: 28px; color: #1a2744; margin-bottom: 4px; }
        .prof-sub { font-size: 14px; color: #8a8ea8; margin-bottom: 20px; }

        .tabs-container { display: flex; border-bottom: 2px solid #f2efe8; margin-bottom: 20px; }
        .tab-btn { padding: 10px 24px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600; color: #8a8ea8; background: none; border: none; border-bottom: 3px solid transparent; cursor: pointer; transition: all .2s; margin-bottom: -2px; display: flex; align-items: center; gap: 8px; }
        .tab-btn:hover { color: #1a2744; }
        .tab-btn.active { color: #1a2744; border-bottom-color: #3d8bef; }

        .card { background: #fff; border-radius: 20px; border: 1px solid #e2dfd6; box-shadow: 0 8px 30px rgba(26,39,68,.05); padding: 24px 32px; min-height: 400px; }
        
        .profile-summary { display: flex; align-items: center; gap: 20px; padding-bottom: 20px; border-bottom: 1px solid #f2efe8; margin-bottom: 20px; }
        .avatar-xl { width: 72px; height: 72px; border-radius: 50%; background: linear-gradient(135deg, #3d8bef, #7c3aed); display: flex; align-items: center; justify-content: center; font-size: 28px; font-weight: 700; color: #fff; box-shadow: 0 8px 24px rgba(61,139,239,.25); flex-shrink: 0; }
        .ps-info { flex: 1; }
        .ps-name { font-size: 20px; font-weight: 700; color: #1a2744; margin-bottom: 4px; }
        .ps-meta { font-size: 13px; color: #8a8ea8; display: flex; gap: 12px; align-items: center; }
        
        .badge-active { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 20px; background: #e6f7ec; border: 1px solid #c3e8d1; font-size: 11px; font-weight: 700; color: #2d7a4f; }
        .badge-dot { width: 6px; height: 6px; background: #2d7a4f; border-radius: 50%; }

        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px 24px; }
        @media (max-width: 650px) { .form-grid { grid-template-columns: 1fr; } }
        
        .field { display: flex; flex-direction: column; gap: 6px; text-align: left; }
        .field label { font-size: 11px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; color: #64748b; }
        .field input, .field select { width: 100%; background: #faf9f6; border: 2px solid #e2dfd6; border-radius: 10px; padding: 10px 14px; font-family: 'DM Sans', sans-serif; font-size: 13.5px; color: #1a2744; font-weight: 500; outline: none; transition: all .2s; }
        .field input:focus, .field select:focus { border-color: #3d8bef; background: #fff; box-shadow: 0 0 0 4px rgba(61,139,239,.1); }
        .field input:disabled { background: #f0ede5; color: #8a8ea8; cursor: not-allowed; }

        .btn-action { padding: 12px 24px; background: #1a2744; color: #fff; border: none; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all .2s; box-shadow: 0 4px 14px rgba(26,39,68,.2); display: inline-flex; justify-content: center; }
        .btn-action:hover { background: #2a3d6e; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(26,39,68,.3); }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
      `}</style>

      <div className="prof-header">My Profile</div>
      <div className="prof-sub">Manage your account information and security settings for SmartLib.</div>

      <div className="tabs-container">
        <button className={`tab-btn ${activeTab === 'info' ? 'active' : ''}`} onClick={() => changeTab('info')}>
          👤 Profile Info
        </button>
        <button className={`tab-btn ${activeTab === 'password' ? 'active' : ''}`} onClick={() => changeTab('password')}>
          🔑 Change Password
        </button>
      </div>

      <div className="card">
        {activeTab === 'info' && (
          <div style={{ animation: "fadeUp .25s ease both" }}>
            <div className="profile-summary">
              <div className="avatar-xl">B</div>
              <div className="ps-info">
                <div className="ps-name">{fullName}</div>
                <div className="ps-meta">
                  <span>ID: {studentId}</span>
                  <span>•</span>
                  <span>{email}</span>
                  <span>•</span>
                  <div className="badge-active">
                    <span className="badge-dot"></span> Account Active
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleProfileSave}>
              <div className="form-grid">
                <div className="field">
                  <label>Full Name</label>
                  <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} required />
                </div>
                <div className="field">
                  <label>Student ID (Non-editable)</label>
                  <input type="text" value={studentId} disabled />
                </div>
                <div className="field">
                  <label>Email Address</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="field">
                  <label>Program / Course</label>
                  <select value={program} onChange={e => setProgram(e.target.value)} required>
                    <option value="BSCS">BSCS</option>
                    <option value="BSIT">BSIT</option>
                    <option value="BSCpE">BSCpE</option>
                  </select>
                </div>
                <div className="field">
                  <label>Year Level</label>
                  <select value={yearLevel} onChange={e => setYearLevel(e.target.value)} required>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>
                <div className="field">
                  <label>Department</label>
                  <input type="text" value={department} onChange={e => setDepartment(e.target.value)} required />
                </div>
              </div>
              <div style={{ textAlign: "right", marginTop: "20px" }}>
                <button type="submit" className="btn-action">Save Changes</button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'password' && (
          <div style={{ animation: "fadeUp .25s ease both", maxWidth: "450px", margin: "0 auto" }}>
            <h3 style={{ fontSize: "20px", color: "#1a2744", margin: "0 0 24px 0", fontFamily: "'DM Serif Display', serif", textAlign: "center" }}>Update Security Credentials</h3>
            <form onSubmit={handlePasswordChange}>
              <div className="field" style={{ marginBottom: "16px" }}>
                <label>Current Password</label>
                <input type="password" placeholder="Enter current password" value={currentPw} onChange={e => setCurrentPw(e.target.value)} required />
              </div>
              
              <div className="field" style={{ marginBottom: "16px" }}>
                <label>New Password</label>
                <input type="password" placeholder="Enter new password" value={newPw} onChange={e => setNewPw(e.target.value)} required />
              </div>
              
              <div className="field" style={{ marginBottom: "24px" }}>
                <label>Confirm New Password</label>
                <input type="password" placeholder="Confirm new password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} required />
              </div>

              <div style={{ textAlign: "center" }}>
                <button type="submit" className="btn-action" style={{ width: "100%" }}>Update Password</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}