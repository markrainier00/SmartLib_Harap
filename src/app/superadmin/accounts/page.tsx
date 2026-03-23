"use client";

import React, { useState, useEffect } from "react";

export default function SuperAdminAccounts() {
  const [admins, setAdmins] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [modal, setModal] = useState<{ type: string | null; target: any }>({ type: null, target: null });
  const [toast, setToast] = useState<{ show: boolean; msg: string; type: string }>({ show: false, msg: "", type: "ok" });

  // 🚀 STATE PARA SA ADD ADMIN FORM
  const [adminForm, setAdminForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "Library Admin"
  });

  const fireToast = (msg: string, type = "ok") => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: "", type: "ok" }), 3000);
  };
  const closeModal = () => setModal({ type: null, target: null });

  // ==========================================
  // 🚀 1. KUNIN ANG TOTOONG DATA SA DATABASE
  // ==========================================
  const fetchAccounts = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/users/all");
      const json = await res.json();
      
      if (json.isSuccess && json.data) {
        // Ihiwalay ang Admins
        const dbAdmins = json.data
          .filter((u: any) => u.role === "admin" || u.role === "superadmin")
          .map((u: any) => ({
            id: u.school_id, 
            name: `${u.firstname} ${u.lastname}`,
            email: u.email,
            role: u.program || "Admin", // Display role
            locked: u.status === "Locked",
            added: new Date(u.created_at).toLocaleDateString()
          }));
        
        // Ihiwalay ang Students
        const dbStudents = json.data
          .filter((u: any) => u.role === "student")
          .map((u: any) => ({
            id: u.school_id,
            name: `${u.firstname} ${u.lastname}`,
            email: u.email,
            course: u.program,
            year: u.year,
            locked: u.status === "Locked"
          }));

        setAdmins(dbAdmins);
        setStudents(dbStudents);
      }
    } catch (error) {
      fireToast("Failed to connect to server.", "err");
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  // ==========================================
  // 🚀 2. API ACTIONS (ADD, LOCK, DELETE)
  // ==========================================
  const handleAddAdminSubmit = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/users/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adminForm),
      });
      const json = await res.json();
      
      if (res.ok && json.isSuccess) {
        fireToast("Admin account created successfully!", "ok");
        setAdminForm({ firstname: "", lastname: "", email: "", password: "", role: "Library Admin" });
        closeModal();
        fetchAccounts(); // I-refresh ang table
      } else {
        fireToast(json.message || "Failed to add admin", "err");
      }
    } catch (error) {
      fireToast("Server error.", "err");
    }
  };

  const handleAction = async (actionType: "delete" | "lock", targetId: string, currentLockedStatus?: boolean) => {
    try {
      if (actionType === "delete") {
        const res = await fetch(`http://localhost:8080/api/users/${targetId}`, { method: "DELETE" });
        if (res.ok) {
          fireToast("Account deleted permanently.", "ok");
          fetchAccounts();
        }
      } else if (actionType === "lock") {
        const newStatus = currentLockedStatus ? "Active" : "Locked";
        const res = await fetch("http://localhost:8080/api/users/status", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ school_id: targetId, status: newStatus }),
        });
        if (res.ok) {
          fireToast(`Account ${newStatus.toLowerCase()} successfully.`, "ok");
          fetchAccounts();
        }
      }
    } catch (error) {
      fireToast("Failed to process action.", "err");
    }
    closeModal();
  };


  const filteredStudents = students.filter(s =>
    (!search || s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase())) &&
    (!course || s.course === course) && (!year || s.year === year)
  );

  return (
    <div className="sa-page-anim">
      <div className="page-title">Manage Accounts</div>
      <div className="page-sub">Only Super Admin can create and manage admin accounts. Student accounts are managed via the Student Portal.</div>
      <div style={{ background: "#fef9c3", border: "1px solid #fde68a", borderRadius: "var(--radius-sm)", padding: "11px 16px", display: "flex", gap: "10px", alignItems: "center", marginBottom: "18px", fontSize: "12.5px", color: "#854d0e" }}>
        <span style={{ fontSize: "16px" }}>ℹ️</span>
        <span><strong>Super Admin Only:</strong> Only you can create, lock, or delete admin accounts. Students register through the Student Portal independently.</span>
      </div>

      {/* ADMINS TABLE */}
      <div className="sa-card" style={{ marginBottom: "16px" }}>
        <div className="sa-card-header">
          <div><div className="sa-card-title">Admin Accounts</div><div className="sa-card-sub">Library staff with admin access</div></div>
          <button className="sa-btn sa-btn-green" onClick={() => setModal({ type: 'addAdmin', target: null })}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg> Add Admin
          </button>
        </div>
        <div className="sa-tbl-wrap">
          <table className="sa-table">
            <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Date Added</th><th>Actions</th></tr></thead>
            <tbody>
              {admins.length === 0 ? (
                <tr><td colSpan={6} style={{textAlign: "center", padding: "20px", color: "var(--text3)"}}>No admin accounts found.</td></tr>
              ) : admins.map((a) => (
                <tr key={a.id}>
                  <td style={{ fontWeight: 600 }}>{a.name}</td><td style={{ color: "var(--text2)" }}>{a.email}</td>
                  <td><span className="pill sa-pill-admin">{a.role}</span></td>
                  <td><span className={`pill ${a.locked ? 'sa-pill-locked' : 'sa-pill-active'}`}>{a.locked ? 'Locked' : 'Active'}</span></td>
                  <td style={{ color: "var(--text3)" }}>{a.added}</td>
                  <td>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <button className="sa-btn sa-btn-warn sa-btn-sm" onClick={() => setModal({ type: 'lockAdmin', target: a })}>{a.locked ? ' Unlock' : ' Lock'}</button>
                      <button className="sa-btn sa-btn-danger sa-btn-sm" onClick={() => setModal({ type: 'delAdmin', target: a })}> Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* STUDENTS TABLE */}
      <div className="sa-card">
        <div className="sa-card-header">
          <div><div className="sa-card-title">Student Accounts</div><div className="sa-card-sub">View-only — managed by Student Portal</div></div>
          <div style={{ display: "flex", gap: "8px" }}>
            <div className="sa-search-wrap">
              <span className="s-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg></span>
              <input type="text" className="sa-input" style={{ width: "190px" }} placeholder="Search student…" aria-label="Search Student" title="Search Student" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <select className="sa-sel" aria-label="Course Filter" title="Course Filter" value={course} onChange={(e) => setCourse(e.target.value)}><option value="">All Courses</option><option>BSIT</option><option>BSCS</option><option>BSED</option><option>BSBA</option><option>BSN</option><option>BSCE</option></select>
            <select className="sa-sel" aria-label="Year Filter" title="Year Filter" value={year} onChange={(e) => setYear(e.target.value)}><option value="">All Years</option><option>1st Year</option><option>2nd Year</option><option>3rd Year</option><option>4th Year</option></select>
          </div>
        </div>
        <div className="sa-tbl-wrap">
          <table className="sa-table">
            <thead><tr><th>Name</th><th>Email</th><th>Course</th><th>Year</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {filteredStudents.length === 0 ? (
                <tr><td colSpan={6} style={{textAlign: "center", padding: "20px", color: "var(--text3)"}}>No students found.</td></tr>
              ) : filteredStudents.map((s) => (
                <tr key={s.id}>
                  <td style={{ fontWeight: 600 }}>{s.name}</td><td style={{ color: "var(--text2)" }}>{s.email}</td><td>{s.course}</td><td>{s.year}</td>
                  <td><span className={`pill ${s.locked ? 'sa-pill-locked' : 'sa-pill-active'}`}>{s.locked ? 'Locked' : 'Active'}</span></td>
                  <td>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <button className="sa-btn sa-btn-warn sa-btn-sm" onClick={() => setModal({ type: 'lockStu', target: s })}>{s.locked ? ' Unlock' : ' Lock'}</button>
                      <button className="sa-btn sa-btn-danger sa-btn-sm" onClick={() => setModal({ type: 'delStu', target: s })}> Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── MODALS ── */}
      {modal.type === 'addAdmin' && (
        <div className="sa-overlay" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="sa-modal" style={{ minWidth: "460px" }}>
            <div className="sa-modal-title">Create Admin Account</div>
            <div className="sa-modal-desc">Fill in the details to create a new library admin account.</div>
            
            {/* 🚀 INAYOS NA FORM PARA PUMASOK SA DATABASE NATIN */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div className="sa-form-group"><label className="sa-form-label">First Name</label>
                <input className="sa-form-input" placeholder="Maria" value={adminForm.firstname} onChange={e => setAdminForm({...adminForm, firstname: e.target.value})} />
              </div>
              <div className="sa-form-group"><label className="sa-form-label">Last Name</label>
                <input className="sa-form-input" placeholder="Santos" value={adminForm.lastname} onChange={e => setAdminForm({...adminForm, lastname: e.target.value})} />
              </div>
              <div className="sa-form-group"><label className="sa-form-label">Email Address</label>
                <input type="email" className="sa-form-input" placeholder="admin@smartlib.edu" value={adminForm.email} onChange={e => setAdminForm({...adminForm, email: e.target.value})} />
              </div>
              <div className="sa-form-group"><label className="sa-form-label">Admin Role</label>
                <select className="sa-form-input" value={adminForm.role} onChange={e => setAdminForm({...adminForm, role: e.target.value})}>
                  <option>Library Admin</option><option>Assistant Admin</option><option>Cataloger</option>
                </select>
              </div>
              <div className="sa-form-group" style={{ gridColumn: "span 2" }}><label className="sa-form-label">Temporary Password</label>
                <input type="password" className="sa-form-input" placeholder="Enter temporary password" value={adminForm.password} onChange={e => setAdminForm({...adminForm, password: e.target.value})} />
              </div>
            </div>

            <div className="sa-modal-actions">
              <button className="sa-btn sa-btn-ghost" onClick={closeModal}>Cancel</button>
              <button className="sa-btn sa-btn-green" onClick={handleAddAdminSubmit}>Create Admin Account</button>
            </div>
          </div>
        </div>
      )}

      {modal.type === 'delAdmin' && (<div className="sa-overlay" onClick={(e) => e.target === e.currentTarget && closeModal()}><div className="sa-modal"><div className="sa-modal-title">Delete Admin Account</div><div className="sa-modal-desc">This will permanently delete <strong>{modal.target?.name}</strong>'s account. This cannot be undone.</div><div className="sa-modal-actions"><button className="sa-btn sa-btn-ghost" onClick={closeModal}>Cancel</button><button className="sa-btn sa-btn-danger" onClick={() => handleAction("delete", modal.target.id)}>Delete Account</button></div></div></div>)}
      
      {modal.type === 'lockAdmin' && (<div className="sa-overlay" onClick={(e) => e.target === e.currentTarget && closeModal()}><div className="sa-modal"><div className="sa-modal-title">{modal.target?.locked ? 'Unlock Account' : 'Lock Account'}</div><div className="sa-modal-desc">{modal.target?.locked ? `Unlock ${modal.target?.name}'s account to restore access.` : `Locking ${modal.target?.name}'s account will prevent login.`}</div><div className="sa-modal-actions"><button className="sa-btn sa-btn-ghost" onClick={closeModal}>Cancel</button><button className="sa-btn sa-btn-warn" onClick={() => handleAction("lock", modal.target.id, modal.target.locked)}>{modal.target?.locked ? ' Unlock Account' : ' Lock Account'}</button></div></div></div>)}
      
      {modal.type === 'delStu' && (<div className="sa-overlay" onClick={(e) => e.target === e.currentTarget && closeModal()}><div className="sa-modal"><div className="sa-modal-title">Delete Student Account</div><div className="sa-modal-desc">Delete <strong>{modal.target?.name}</strong>'s account? This cannot be undone.</div><div className="sa-modal-actions"><button className="sa-btn sa-btn-ghost" onClick={closeModal}>Cancel</button><button className="sa-btn sa-btn-danger" onClick={() => handleAction("delete", modal.target.id)}>Delete Account</button></div></div></div>)}
      
      {modal.type === 'lockStu' && (<div className="sa-overlay" onClick={(e) => e.target === e.currentTarget && closeModal()}><div className="sa-modal"><div className="sa-modal-title">{modal.target?.locked ? 'Unlock Student Account' : 'Lock Student Account'}</div><div className="sa-modal-desc">{modal.target?.locked ? `Restore access for ${modal.target?.name}.` : `This will prevent ${modal.target?.name} from logging in.`}</div><div className="sa-modal-actions"><button className="sa-btn sa-btn-ghost" onClick={closeModal}>Cancel</button><button className="sa-btn sa-btn-warn" onClick={() => handleAction("lock", modal.target.id, modal.target.locked)}>{modal.target?.locked ? ' Unlock' : ' Lock'}</button></div></div></div>)}
      
      <div className={`sa-toast ${toast.type === 'err' ? 'sa-toast-err' : ''} ${toast.show ? 'show' : ''}`} style={toast.type === 'err' ? { background: '#ef4444', color: '#fff' } : {}}> {toast.msg}</div>
    </div>
  );
}