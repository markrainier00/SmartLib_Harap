"use client";

import React, { useState, useEffect } from "react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("info");

  const [fullName] = useState("Bryan Lumangaya");
  const [studentId] = useState("2024-00123");
  const [email, setEmail] = useState("bryan@cmdi.edu");
  const [program] = useState("Bachelor of Science in Computer Science");
  const [yearLevel] = useState("2nd Year");
  const [department] = useState("College of Computer Studies");

  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  useEffect(() => {
    const handleHashChange = () => {
      setActiveTab(window.location.hash === "#password" ? "password" : "info");
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
    if (newPw !== confirmPw) { alert("⚠️ New passwords do not match!"); return; }
    alert("✅ Password changed successfully!");
    setCurrentPw(""); setNewPw(""); setConfirmPw("");
  };

  const changeTab = (tab: string) => {
    setActiveTab(tab);
    window.history.pushState(null, "", `#${tab}`);
  };

  return (
    <div className="page-layout fadeUp">
      <div className="page-tabs">
        <button className={`page-tab ${activeTab === "info" ? "active" : ""}`} onClick={() => changeTab("info")}>
          Profile Info
        </button>
        <button className={`page-tab ${activeTab === "password" ? "active" : ""}`} onClick={() => changeTab("password")}>
          Change Password
        </button>
      </div>

      <div className="data-card" style={{ padding: "24px 32px", minHeight: 400 }}>
        {activeTab === "info" && (
          <div className="fadeUp">
            <div style={{ display: "flex", alignItems: "center", gap: 20, paddingBottom: 20, borderBottom: `1px solid var(--color-surface)`, marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "var(--color-primary)", marginBottom: 4 }}>{fullName}</div>
                <div style={{ fontSize: 13, color: "var(--color-subtext)", display: "flex", gap: 12 }}><span>ID: {studentId}</span></div>
              </div>
            </div>

            <form onSubmit={handleProfileSave}>
              <div className="two-col-grid">
                <div className="field">
                  <label>Email</label>
                  <input type="text" value={email} onChange={e => setEmail(e.target.value)} required/>
                </div>
                <div className="field">
                  <label>Program / Course</label>
                  <input type="text" value={program} disabled/>
                </div>
                <div className="field">
                  <label>Year Level</label>
                  <input type="text" value={yearLevel} disabled/>
                </div>
                <div className="field">
                  <label>Department</label>
                  <input type="text" value={department} disabled/>
                </div>
              </div>
              <div style={{  display: "flex", justifyContent: "center", marginTop: 20 }}>
                <button type="submit" className="btn" style={{ width: "auto", padding: "12px 24px" }}>Save Changes</button>
              </div>
            </form>
          </div>
        )}

        {activeTab === "password" && (
          <div className="fadeUp" style={{ maxWidth: 450, margin: "0 auto" }}>
            <h3 style={{ fontSize: 20, color: "var(--color-primary)", margin: "0 0 24px 0", fontFamily: "var(--font-display)", textAlign: "center" }}>
              Update Security Credentials
            </h3>
            <form onSubmit={handlePasswordChange}>
              <div className="field">
                <label>Current Password</label>
                <input type="password" placeholder="Enter current password" value={currentPw} onChange={e => setCurrentPw(e.target.value)} required />
              </div>
              <div className="field">
                <label>New Password</label>
                <input type="password" placeholder="Enter new password" value={newPw} onChange={e => setNewPw(e.target.value)} required />
              </div>
              <div className="field" style={{ marginBottom: 24 }}>
                <label>Confirm New Password</label>
                <input type="password" placeholder="Confirm new password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} required />
              </div>
              <button type="submit" className="btn">Update Password</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}