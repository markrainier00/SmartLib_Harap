"use client";

import { useState } from "react";

export default function SuperAdminProfile() {
  const [activeTab, setActiveTab] = useState<"info" | "password">("info");
  
  const [toast, setToast] = useState({ show: false, msg: "", type: "ok" });
  const fireToast = (msg: string, type = "ok") => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: "", type: "ok" }), 3000);
  };

  return (
    <div className="app">
      <div className="page-layout fadeUp">
        <style>{`
          .sa-profile-grid { display: grid; grid-template-columns: 280px 1fr; gap: 16px; }
          .sa-ptabs { display: flex; border-bottom: 2px solid var(--border); margin-bottom: 20px; }
          .sa-ptab { padding: 9px 16px; font-size: 13px; font-weight: 600; cursor: pointer; color: var(--text3); border-bottom: 2px solid transparent; margin-bottom: -2px; transition: all .18s; }
          .sa-ptab:hover { color: var(--text); }
          .sa-ptab.active { color: var(--green-900); border-bottom-color: var(--green-800); }
          .sa-form-group { margin-bottom: 14px; }
          .sa-form-label { display: block; font-size: 11px; font-weight: 700; color: var(--text2); margin-bottom: 5px; letter-spacing: .06em; text-transform: uppercase; }
          .sa-form-input { width: 100%; background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius-sm); color: var(--text); font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; padding: 9px 12px; outline: none; transition: border-color .18s; }
          .sa-form-input:focus { border-color: var(--green-500); }
          .sa-form-input[readonly] { opacity: 0.7; cursor: default; }
          .sa-toast { position: fixed; bottom: 22px; right: 22px; z-index: 999; background: var(--white); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 11px 16px; font-size: 13px; font-weight: 500; display: flex; align-items: center; gap: 9px; box-shadow: var(--shadow); transform: translateY(70px); opacity: 0; pointer-events: none; transition: all .28s ease; }
          .sa-toast.show { transform: none; opacity: 1; pointer-events: auto; }
          .sa-toast.ok { border-left: 3px solid var(--green-500); }
        `}</style>

        <div className="page-title">My Profile</div>
        <div className="page-sub">Account information and security settings</div>

        <div className="sa-profile-grid">

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div className="sa-card">
              <div className="sa-ptabs">
                <div className={`sa-ptab ${activeTab === 'info' ? 'active' : ''}`} onClick={() => setActiveTab('info')}>View Information</div>
                <div className={`sa-ptab ${activeTab === 'password' ? 'active' : ''}`} onClick={() => setActiveTab('password')}>Change Password</div>
              </div>

              {activeTab === 'info' && (
                <div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div className="sa-form-group"><label className="sa-form-label">Full Name</label><input className="sa-form-input" value="Super Admin" readOnly aria-label="Full Name" title="Full Name" /></div>
                    <div className="sa-form-group"><label className="sa-form-label">Username</label><input className="sa-form-input" value="superadmin" readOnly aria-label="Username" title="Username" /></div>
                    <div className="sa-form-group"><label className="sa-form-label">Email Address</label><input className="sa-form-input" value="superadmin@smartlib.edu" readOnly aria-label="Email Address" title="Email Address" /></div>
                    <div className="sa-form-group"><label className="sa-form-label">Phone</label><input className="sa-form-input" value="+63 912 345 6789" readOnly aria-label="Phone Number" title="Phone Number" /></div>
                    <div className="sa-form-group"><label className="sa-form-label">Role</label><input className="sa-form-input" value="Super Administrator" readOnly aria-label="Role" title="Role" /></div>
                    <div className="sa-form-group"><label className="sa-form-label">Date Joined</label><input className="sa-form-input" value="January 12, 2021" readOnly aria-label="Date Joined" title="Date Joined" /></div>
                  </div>
                  <button className="sa-btn sa-btn-green" onClick={() => fireToast("Profile updated successfully!", "ok")}>Save Changes</button>
                </div>
              )}

              {activeTab === 'password' && (
                <div>
                  <div style={{ maxWidth: "400px", display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div className="sa-form-group"><label className="sa-form-label">Current Password</label><input type="password" className="sa-form-input" placeholder="Enter current password" aria-label="Current Password" title="Current Password" /></div>
                    <div className="sa-form-group"><label className="sa-form-label">New Password</label><input type="password" className="sa-form-input" placeholder="At least 8 characters" aria-label="New Password" title="New Password" /></div>
                    <div className="sa-form-group"><label className="sa-form-label">Confirm Password</label><input type="password" className="sa-form-input" placeholder="Repeat new password" aria-label="Confirm Password" title="Confirm Password" /></div>
                    <div style={{ background: "#fef9c3", border: "1px solid #fde68a", borderRadius: "var(--radius-sm)", padding: "10px 13px", fontSize: "12px", color: "#854d0e" }}>
                      ⚠️ Use at least 8 characters with uppercase, lowercase, and a number.
                    </div>
                  </div>
                  <button className="sa-btn sa-btn-green" style={{ marginTop: "14px" }} onClick={() => fireToast("Password changed successfully!", "ok")}>Update Password</button>
                </div>
              )}
            </div>

            <div className="sa-card">
              <div className="sa-card-title" style={{ marginBottom: "13px" }}>Recent Activity</div>
              <div style={{ fontSize: "12.5px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--border)" }}><span>🔐 Logged in</span><span style={{ color: "var(--text3)" }}>Today 8:24 AM</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--border)" }}><span>🗑️ Deleted admin: lib.staff@edu</span><span style={{ color: "var(--text3)" }}>Yesterday 3:10 PM</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--border)" }}><span>🔒 Locked account: asst.admin@edu</span><span style={{ color: "var(--text3)" }}>Mar 17, 2:45 PM</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}><span>➕ Created admin: maria.lib@edu</span><span style={{ color: "var(--text3)" }}>Mar 16, 10:00 AM</span></div>
              </div>
            </div>
          </div>
        </div>

        <div className={`sa-toast ${toast.type} ${toast.show ? 'show' : ''}`}>✅ {toast.msg}</div>
      </div>
    </div>
  );
}