"use client";

import { useUser } from "@/lib/user";
import {api} from "@/lib/api";
import React, { useState, useEffect } from "react";
import { IconEye, IconEyeOff } from "@/components/icons";
import FloatingInput from "@/components/ui/FloatingInput";
import PasswordStrength from "@/components/ui/PasswordStrength";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("info");

  const { firstName, lastName, fullName, email, school_id, department, program, year, initial } = useUser();
  const [newEmail, setNewEmail] = useState("");
  useEffect(() => {
    if (email) setNewEmail(email);
  }, [email]);
  
  const [pwForm, setPwForm] = useState({
    current: "",
    newPw: "",
    confirm: "",
    showCurrent: false,
    showNewPw: false,
    showConfirm: false,
  });
  const setPwForm_ = (fields: Partial<typeof pwForm>) =>
    setPwForm(prev => ({ ...prev, ...fields }));

  const [pwUI, setPwUI] = useState({ error: "", success: "", loading: false });

  const setPWUI = (fields: Partial<typeof pwUI>) =>
    setPwUI(prev => ({ ...prev, ...fields }));

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
    alert("Profile information updated successfully!");
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPWUI({ error: "", success: "", loading: true });

    if (pwForm.newPw !== pwForm.confirm) {
      setPWUI({ error: "Passwords do not match", success: "", loading: false });
      return;
    }

    try {
      const json = await api.post("/api/auth/change-password", {
        current_password: pwForm.current,
        new_password: pwForm.newPw,
      });
      if (json.retCode !== "200") throw new Error(json.message || "Failed to update password");
      setPWUI({ error: "", success: json.message, loading: false });
      setPwForm_({ current: "", newPw: "", confirm: "", showCurrent: false, showNewPw: false, showConfirm: false, });
    } catch (err: any) {
      setPWUI({ error: err.message, success: "", loading: false });
    }
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
                <div style={{ fontSize: 20, fontWeight: 700, color: "var(--color-primary)" }}>{fullName}</div>
                <div style={{ fontSize: 15, color: "var(--color-subtext)", display: "flex", gap: 12 }}><span>{school_id}</span></div>
              </div>
            </div>

            <form onSubmit={handleProfileSave}>
              <div className="two-col-grid">
                <div className="field">
                  <FloatingInput
                    label="Email Address"
                    type= "email"
                    value={ newEmail }
                    onChange={ e => setNewEmail( e.target.value )}
                    required
                  />
                </div>
                <div className="field">
                  <FloatingInput
                    label="Year Level"
                    type= "text"
                    value={ year }
                  />
                </div>
                <div className="field">
                  <FloatingInput
                    label="Program"
                    type= "text"
                    value={ program }
                  />
                </div>
                <div className="field">
                  <FloatingInput
                    label="Department"
                    type= "text"
                    value={ department }
                  />
                </div>
              </div>
              <div style={{  display: "flex", justifyContent: "right" }}>
                <button type="submit" className="btn" style={{ width: "auto", padding: "12px 24px" }}>Save Changes</button>
              </div>
            </form>
          </div>
        )}

        {activeTab === "password" && (
          <div className="fadeUp" style={{ maxWidth: 450, margin: "0 auto" }}>
            <h3 style={{ fontSize: 20, color: "var(--color-primary)", margin: "24px 0 24px 0", fontFamily: "var(--font-display)", textAlign: "center" }}>
              Update Security Credentials
            </h3>

            {pwUI.error && (
              <div className="alert-error">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{flexShrink:0,marginTop:1}}>
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {pwUI.error}
              </div>
            )}
            {pwUI.success && (
              <div className="alert-success">
                <div className="check">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                {pwUI.success}
              </div>
            )}
            
            <form onSubmit={handlePasswordChange}>
              <div className="field">
                <FloatingInput
                  label="Current Password"
                  type={pwForm.showCurrent ? "text" : "password"}
                  value={pwForm.current}
                  onChange={e => setPwForm_({ current: e.target.value })}
                  required
                  suffix={
                    <button type="button" className="pw-toggle" onClick={() => setPwForm_({ showCurrent: !pwForm.showCurrent })}>
                      {pwForm.showCurrent ? <IconEyeOff /> : <IconEye />}
                    </button>
                  }
                />
              </div>
              <div className="field">
                <FloatingInput
                  label="New Password"
                  type={pwForm.showNewPw ? "text" : "password"}
                  value={pwForm.newPw}
                  onChange={e => setPwForm_({ newPw: e.target.value })}
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}"
                  required
                  suffix={
                    <button type="button" className="pw-toggle" onClick={() => setPwForm_({ showNewPw: !pwForm.showNewPw })}>
                      {pwForm.showNewPw ? <IconEyeOff /> : <IconEye />}
                    </button>
                  }
                />
                <PasswordStrength password={pwForm.newPw}/>
              </div>
              <div className="field" style={{ marginBottom: 24 }}>
                <FloatingInput
                  label="Confirm New Password"
                  type={pwForm.showConfirm ? "text" : "password"}
                  value={pwForm.confirm}
                  onChange={e => setPwForm_({ confirm: e.target.value })}
                  required
                  suffix={
                    <button type="button" className="pw-toggle" onClick={() => setPwForm_({ showConfirm: !pwForm.showConfirm })}>
                      {pwForm.showConfirm ? <IconEyeOff /> : <IconEye />}
                    </button>
                  }
                />
              </div>
              <div style={{  display: "flex", justifyContent: "right", marginTop: 20 }}>
                <button type="submit" className="btn" style={{ width: "auto", padding: "12px 24px" }} disabled={ pwUI.loading }>
                  {pwUI.loading ? <><div className="spinner" /> Updating…</> : "Update Password"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}