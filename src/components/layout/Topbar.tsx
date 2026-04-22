"use client";

import { api } from "@/lib/api";
import { useUser } from "@/lib/user";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import { IconHamburger, IconArrowDown, IconID, IconNotif, IconLogo, IconX, IconEye, IconEyeOff } from "../icons";
import { useClickOutside } from "@/app/hooks/useClickOutside";
import FloatingInput from "@/components/ui/FloatingInput";
import PasswordStrength from "@/components/ui/PasswordStrength";
import Modal from "@/components/Modal";
import LoadingModal from "@/components/LoadingModal";

interface TopbarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function Topbar({ isSidebarOpen, toggleSidebar }: TopbarProps) {
  const { role, firstName, fullName, email, school_id, department, program, year } = useUser();
  const router = useRouter();

  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showId, setShowId] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showChangeInformation, setShowChangeInformation] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  const [isLoadingOpen, setIsLoadingOpen] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Processing...");
  const [systemResponseOpen, setSystemResponseOpen] = useState(false);
  const [systemResponse, setSystemResponse] = useState("Processing...");

  const [infoForm, setInfoForm] = useState({
    newEmail: "",
    newYear: "",
    newDept: "",
    newProg: "",
  });

  const setInfoForm_ = (fields: Partial<typeof infoForm>) =>
    setInfoForm(prev => ({ ...prev, ...fields }));

  useEffect(() => {
    setInfoForm_({
      newEmail: email || "",
      ...(role === "Student" && {
        newDept: department || "",
        newProg: program || "",
        newYear: year || "",
      }),
    });
  }, [email, year, department, program, role]);

  // ── School data state ──
  const [schools, setSchools] = useState<any[]>([]);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const json = await api.getPublic("/api/auth/schools");
        if (json.retCode === "200") setSchools(json.data || []);
      } catch (err) {
        console.error("Failed to fetch schools", err);
      }
    };
    fetchSchools();
  }, []);

  // ── Derived options ──
  const departments = [...new Set(schools.map((s: any) => s.department))];

  const programs = schools
    .filter((s: any) => s.department === infoForm.newDept)
    .map((s: any) => s.program);

  const selectedSchool = schools.find(
    (s: any) => s.program === infoForm.newProg && s.department === infoForm.newDept
  );
  const maxYears = selectedSchool?.duration || 4;

  const yearOptions = Array.from({ length: maxYears }, (_, i) => {
    const labels = ["1st", "2nd", "3rd", "4th", "5th", "6th"];
    return labels[i];
  });

  const [pwForm, setPwForm] = useState({
    current: "",
    newPw: "",
    confirm: "",
    showCurrent: false,
    showNewPw: false,
    showConfirm: false,
  });
  const setPwForm_ = (fields: Partial<typeof pwForm>) => setPwForm(prev => ({ ...prev, ...fields }));
  
  useClickOutside(notifRef, () => setShowNotifs(false));
  useClickOutside(profileRef, () => setShowProfile(false));

  const [notifs, setNotifs] = useState<any[]>([]);
  const unread = notifs.filter((n) => !n.read).length;

  // ==========================================
  // 🔔 REAL-TIME SSE LOGIC
  // ==========================================
  useEffect(() => {
    if (!school_id) return; 

    const safeSchoolId = encodeURIComponent(school_id);

    const fetchHistory = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/notifications/history/${safeSchoolId}`);
        const data = await res.json();
        if (data.isSuccess) {
          setNotifs(data.data || []); 
        }
      } catch (err) {
        console.error("Failed to fetch notification history", err);
      }
    };
    fetchHistory();

    const eventSource = new EventSource(`http://localhost:8080/api/notifications/stream/${safeSchoolId}`);

    eventSource.onmessage = (event) => {
      const newNotif = JSON.parse(event.data);
      setNotifs((prev) => {
        const isDuplicate = prev.some((notif) => notif.id === newNotif.id);
        if (isDuplicate) return prev;
        return [newNotif, ...prev];
      });
    };

    eventSource.onerror = () => {
      console.log("SSE interrupted. Browser is trying to auto-reconnect...");
    };

    return () => {
      eventSource.close();
    };
  }, [school_id]);

  // 🚀 CLEAR ALL NOTIFICATIONS LOGIC
  const handleClearNotifs = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Para hindi magsara yung dropdown kapag kinlick
    if (!school_id) return;

    try {
      const safeSchoolId = encodeURIComponent(school_id);
      const res = await fetch(`http://localhost:8080/api/notifications/clear/${safeSchoolId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      
      if (data.isSuccess) {
        setNotifs([]); // Linisin ang screen agad
      }
    } catch (err) {
      console.error("Failed to clear notifications", err);
    }
  };

  const handleNav = (path: string) => {
    setShowProfile(false);
    setShowNotifs(false);
    router.push(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/");
  };

  const handleInformationChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const noChanges = infoForm.newEmail === email &&
    ( role !== "Student" ||
      (
        infoForm.newDept === department &&
        infoForm.newProg === program &&
        infoForm.newYear === year
      )
    );

    if (noChanges) {
        setSystemResponse( "No changes made." );
        setSystemResponseOpen(true);
      return;
    }

    setLoadingMessage("Requesting information update...");
    setIsLoadingOpen(true);

    try {
      const payload = {
        school_ID: school_id,
        email: infoForm.newEmail,
        ...(role === "Student" && {
          department: infoForm.newDept,
          program: infoForm.newProg,
          year: infoForm.newYear,
        }),
      };

      const json = await api.post("/api/auth/change-information", payload );

      if (json.retCode === "200") {
        setSystemResponse(json.message || "Information edit requested.")
      } else {
        setSystemResponse(json.message || "Failed to request information edit.");
      }
    } catch (err) {
      setSystemResponse("Server connection failed.");
    } finally {
      setShowChangeInformation(false);
      setInfoForm_({ newEmail: email,
        ...(role === "Student" && {
          newDept: department,
          newProg: program,
          newYear: year,
        }),
      });

      setIsLoadingOpen(false);
      setSystemResponseOpen(true);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoadingMessage("Processing password change...");
    setIsLoadingOpen(true);

    if (pwForm.newPw !== pwForm.confirm) {
        setIsLoadingOpen(false);
        setSystemResponse( "Password do not match." );
        setSystemResponseOpen(true);
      return;
    }

    try {
      const json = await api.post("/api/auth/change-password", {
        current_password: pwForm.current,
        new_password: pwForm.newPw,
      });
      if (json.retCode === "200") {
        setSystemResponse(json.message || "Password updated succesfully.")
      } else {
        setSystemResponse(json.message || "Failed to update password.");
      }
    } catch (err) {
      setSystemResponse("Server connection failed.");
    } finally {
      setShowChangePassword(false);
      setPwForm_({ current: "", newPw: "", confirm: "", showCurrent: false, showNewPw: false, showConfirm: false, });
      setIsLoadingOpen(false);
      setSystemResponseOpen(true);
    }
  };

  const downloadID = async () => {
    const card = document.querySelector(".id-card") as HTMLElement;
    const closeBtn = document.querySelector(".id-close") as HTMLElement;
    const downloadBtn = document.querySelector(".download-btn") as HTMLElement;
    if (!card) return;
    if (closeBtn) closeBtn.style.display = "none";
    if (downloadBtn) downloadBtn.style.display = "none";

    const canvas = await html2canvas(card, { scale: 3, backgroundColor: null });
    if (closeBtn) closeBtn.style.display = "flex";
    if (downloadBtn) downloadBtn.style.display = "flex";

    const link = document.createElement("a");
    link.download = `${fullName} - SmartLib ID.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <>
      <style>{`
        .topbar {
          height: 64px;
          background: #ffffff;
          border-bottom: 1px solid #C3DDD0;
          padding-right: 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
          position: relative;
          z-index: 50;
        }
        .topbar-actions { display: flex; align-items: center; gap: 5px; }

        .sidebar-logo {
          display: flex;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid rgba(255,255,255,.1);
          justify-content: "center";
          color: var(--color-primary);
        }
        .hamburger-btn { cursor: pointer; }
          
        .action-btn {
          display: flex;
          align-items: center;
          border: 1px solid transparent;
          border-radius: 7px;
          position: relative;
          width: 40px; height: 40px;
          cursor: pointer;
          transition: background .2s;
          justify-content: center;
          color: var(--color-subtext);
        }
        .profile-pill {
          display: flex;
          align-items: center;
          gap: 1px;
          border: 1px solid transparent;
          border-radius: 7px;
          padding: 3px;
          cursor: pointer;
          transition: all .2s;
        }
        .profile-pill:hover, .profile-pill.active, .action-btn:hover, .action-btn.active { border-color: #C3DDD0; box-shadow: 0 4px 12px rgba(27,94,53,.08); }
        .profile-pill span { font-size: 13.5px; font-weight: 600; color: #102A1C; }
        .avatar-icon {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--color-success-border), var(--color-primary));
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          border: 3px solid var(--green-100);
        }
              
        .notif-badge { position: absolute; top: 0; right: 0; width: 18px; height: 18px; background: #e05c5c; border-radius: 50%; border: 2px solid #fff; font-size: 10px; font-weight: 700; color: #fff; display: flex; align-items: center; justify-content: center; }
        .profile-arrow { position: absolute; bottom: 0; right: 0; width: 13px; height: 13px; background: var(--color-primary); border-radius: 50%; border: 1px solid #ffffff;  }

        .dropdown { position: absolute; top: 40px; right: 0; background: #fff; border-radius: 10px; box-shadow: 0 16px 48px rgba(27,94,53,.12); border: 1px solid #C3DDD0; z-index: 60; overflow: hidden; animation: fadeUp .2s ease both; min-width: 260px; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:none; } }

        .notif-panel { width: 340px; }
        .notif-head { padding: 5px 10px; border-bottom: 1px solid #C3DDD0; display: flex; justify-content: space-between; align-items: center; background: #EBF7F0; }
        .notif-head h4 { margin: 0; font-size: 14px; font-weight: 700; color: #102A1C; }
        
        .clear-btn { background: none; border: none; font-size: 12px; color: #c94040; font-weight: 700; cursor: pointer; transition: all 0.2s; padding: 4px 8px; border-radius: 4px; }
        .clear-btn:hover { background: #ffebeb; }

        .notif-item { 
          padding: 14px 20px; 
          border-bottom: 1px solid #EBF7F0; 
          display: flex; 
          gap: 12px; 
          align-items: flex-start; 
          cursor: pointer;
          transition: background 0.2s;
        }
        .notif-item:hover { background: #F8FDFB; }
        .notif-item.unread { background: #F0F9F3; }
        .notif-item.unread:hover { background: #E6F4EB; }
        .notif-panel { width: 340px; max-height: 400px; overflow-y: auto; }
        .notif-head { ... position: sticky; top: 0; z-index: 2; }
        .ni-msg { font-size: 13px; color: #102A1C; font-weight: 500; line-height: 1.4; margin: 0; }
        .ni-time { font-size: 11px; color: #7AAD8E; margin-top: 4px; }

        .pp-head { padding: 10px 15px; border-bottom: 1px solid #EBF7F0; display: flex; flex-direction: column; background: #EBF7F0; }
        .pp-name { font-size: 16px; font-weight: 700; color: #102A1C; margin-bottom: 2px; }
        .pp-sub { font-size: 12.5px; color: #7AAD8E; }
        .pp-menu { padding: 3px 0; }
        .pp-item { display: flex; align-items: center; gap: 12px; width: 100%; padding: 6px 12px; background: none; border: none; text-align: left; cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 13.5px; font-weight: 600; color: #3B6B50; transition: all .2s; }
        .pp-item:hover { background: #EBF7F0; color: #1B5E35; padding-left: 13px; }

        .id-card { background: linear-gradient(145deg, #1B5E35 0%, #256D42 100%); width: 100%; max-width: 360px; border-radius: 24px; padding: 32px 24px 0; color: #fff; position: relative; box-shadow: 0 24px 64px rgba(0,0,0,.3); text-align: center; border: 1px solid rgba(255,255,255,.1); animation: fadeUp .3s cubic-bezier(0.16, 1, 0.3, 1); overflow: hidden; }
        .id-close { position: absolute; top: 16px; right: 16px; background: rgba(255,255,255,.1); border: none; border-radius: 7px; width: 30px; height: 30px; color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background .2s; z-index: 10; }
        .id-close:hover { background: rgba(255,255,255,.2); }
        .id-logo { font-family: 'DM Serif Display', serif; font-size: 22px; margin-top: 0; margin-bottom: 24px; display: flex; align-items: center; justify-content: center; gap: 8px; position: relative; z-index: 2; }

        .qr-container { background: #fff; padding: 16px; border-radius: 10px; display: inline-flex; flex-direction: column; align-items: center; justify-content: center; margin-bottom: 16px; box-shadow: 0 8px 24px rgba(0,0,0,.2); position: relative; z-index: 2; }

        .download-btn { background: rgba(255,255,255,.1); border: none;  padding: 8px 16px; border-radius: 7px; font-size: 12px; font-weight: 700; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; }
        .download-btn:hover { background: rgba(255,255,255,.2); }

        .id-name { font-size: 22px; font-weight: 700; margin-bottom: 4px; letter-spacing: 0.5px; position: relative; z-index: 2; }
        .id-program { font-size: 12px; color: rgba(255,255,255,.7); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 24px; position: relative; z-index: 2; }
        .id-footer { background: rgba(0,0,0,.15); margin: 0 -24px; padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: rgba(255,255,255,.8); border-top: 1px solid rgba(255,255,255,.08); position: relative; z-index: 2; }
      `}</style>

      <header className="topbar">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div className="sidebar-logo">
          <button className="hamburger-btn" onClick={toggleSidebar} ><IconHamburger /></button>
        </div>
          <IconLogo style={{ width: "40px", height: "40px", color: "var(--color-primary)" }} />
          <div className="smartlib-logo" style={{ fontSize: '20px' }}>SmartLib
            <span className="smartlib-sub" style={{ fontSize: '13px', display: 'block' }}>
              {role === 'Staff' ? 'STAFF' : role === 'Admin' ? 'ADMINISTRATOR' : 'STUDENT'} PORTAL
            </span>
          </div>
        </div>

        <div className="topbar-actions">
          {/* 🆔 DIGITAL ID: PARA SA STUDENT LANG */}
          {role === 'Student' && (
            <button className="action-btn" onClick={() => setShowId(true)} aria-label="Digital ID">
              <IconID />
            </button>
          )}

          {/* 🔔 SHARED NOTIFICATION BELL */}
          <div style={{ position: "relative" }} ref={notifRef}>
            <button className="action-btn" onClick={() => setShowNotifs(!showNotifs)} aria-label="Notifications">
              <IconNotif />
              {unread > 0 && <span className="notif-badge">{unread}</span>}
            </button>
            {showNotifs && (
              <div className="dropdown notif-panel open">
                <div className="notif-head">
                  <h4>Notifications</h4>
                  {notifs.length > 0 && (
                    <button className="clear-btn" onClick={handleClearNotifs}>
                      Clear All
                    </button>
                  )}
                </div>
                
                {notifs.map(n => (
                  <div 
                    key={n.id} 
                    className={`notif-item ${n.read ? '' : 'unread'}`}
                    onClick={async () => {
                      // 1. SMART REDIRECTION LOGIC
                      if (role === 'Admin' || role === 'Staff') {
                        const message = n.msg.toLowerCase();
                        
                        if (message.includes("book request") || message.includes("isbn")) {
                          handleNav("/admin/requests"); 
                        } else if (message.includes("register")) {
                          handleNav("/admin/registration"); 
                        }
                      }

                      // 2. 🚀 SABIHAN ANG DATABASE NA NABASA NA ITO
                      try {
                        await fetch(`http://localhost:8080/api/notifications/read/${n.id}`, {
                          method: "PUT"
                        });
                      } catch (err) {
                        console.error("Failed to mark as read in DB", err);
                      }

                      // 3. Mark locally as read (Para mag-update agad yung UI)
                      setNotifs(prev => prev.map(notif => notif.id === n.id ? { ...notif, read: true } : notif));
                    }}
                  >
                    <div className="flex-1">
                      <p className="ni-msg">{n.msg}</p>
                      <div className="ni-time">{n.time}</div>
                    </div>
                  </div>
                ))}
                {notifs.length === 0 && (
                  <div style={{ padding: "20px", textAlign: "center", fontSize: "13px", color: "#7AAD8E" }}>
                    No notifications yet.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 👤 PROFILE DROPDOWN */}
          <div style={{ position: "relative" }} ref={profileRef}>
            <button className={`profile-pill ${showProfile ? 'active' : ''}`} onClick={() => setShowProfile(!showProfile)}>
              <p className="avatar-icon">{firstName[0]}</p><IconArrowDown className="profile-arrow text-white"/>
            </button>

            {showProfile && (
              <div className="dropdown open">
                <div className="pp-head">
                  <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <p className="avatar-icon">{firstName[0]}</p>
                    <div style={{ display: "flex", flexDirection: "column", paddingLeft: "5px" }}>
                      <p className="pp-name">{fullName}</p>
                      <p className="pp-sub">{school_id}</p>
                    </div>
                  </div>
                </div>
                <div className="pp-menu">
                  <button className="pp-item" onClick={() => {setShowChangeInformation(true)}}>Edit Information</button>
                  <button className="pp-item" onClick={() => setShowChangePassword(true)}>Change Password</button>
                  <button className="pp-item" style={{ color: "#c94040" }} onClick={handleLogout}>Log Out</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 🆔 DIGITAL ID MODAL */}
      {showId && (
        <div className="overlay" onClick={() => setShowId(false)}>
          <div className="id-card" onClick={e => e.stopPropagation()}>
            <button className="id-close" onClick={() => setShowId(false)} aria-label="Close ID card"><IconX /></button>
            <div className="flex flex-col items-center">
              <IconLogo />
              <div style={{ fontFamily: 'DM Serif Display', fontSize: '22px', marginBottom: '24px' }}>SmartLib</div>
            </div>
            <div className="qr-container">
              <QRCode value={school_id} size={220} bgColor="#fff" fgColor="#1B5E35" level="H" />
            </div>
            <div className="id-name">{fullName}</div>
            <div className="id-program">{program}</div>
            <div className="id-footer">
              <span>{school_id}</span>
              <button className="download-btn" onClick={downloadID}>Download</button>
            </div>
          </div>
        </div>
      )}

      {showChangePassword && (
        <form onSubmit={handlePasswordChange}>
        <div className="overlay" onClick={() => setShowChangePassword(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <button className="close" onClick={() => setShowChangePassword(false)} ><IconX/></button>
            </div>
            <div className="modal-scroll">
              <div style={{ textAlign: "center", marginBottom: "20px"}}>
                <div className="page-header">Change Password</div>
              </div>
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
            <div className="modal-footer">
              <button type="submit" className="btn">Update Password</button>
            </div>
          </div>
        </div>
        </form>
      )}


      {showChangeInformation && (
        <form onSubmit={handleInformationChange}>
        <div className="overlay" onClick={() => {setInfoForm_({ newEmail: email, newDept: department, newProg: program, newYear: year}); setShowChangeInformation(false)}}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <button className="close" onClick={() => {setInfoForm_({ newEmail: email, newDept: department, newProg: program, newYear: year}); setShowChangeInformation(false)}} ><IconX/></button>
            </div>
            <div className="modal-scroll">
              <div style={{ textAlign: "center", marginBottom: "20px"}}>
                <div className="page-header">Edit Information</div>
              </div>
              <div className="field">
                <FloatingInput
                  label="Email Address"
                  type= "email"
                  value={ infoForm.newEmail }
                  onChange={ e => setInfoForm_({ newEmail: e.target.value })}
                />
              </div>
              {role === "Student" &&(
              <>
                <div className="field">
                  <label htmlFor="department" style={{ color: "var(--color-primary)" }}>Department</label>
                  <select id="department" value={infoForm.newDept}
                    style={{ border: "1.5px solid var(--color-muted)" }}
                    onChange={e => setInfoForm_({ newDept: e.target.value, newProg: "", newYear: "" })}
                  >
                    <option value="" disabled>Select department</option>
                    {departments.map((dept: string) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="program" style={{ color: "var(--color-primary)" }}>Program</label>
                  <select id="program" title="Based on department" value={infoForm.newProg}
                    style={{ border: "1.5px solid var(--color-muted)" }}
                    onChange={e => setInfoForm_({ newProg: e.target.value, newYear: "" })} required disabled={!infoForm.newDept}
                  >
                    <option value="" disabled>Select</option>
                    {programs.map((prog: string) => (
                      <option key={prog} value={prog}>{prog}</option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="year" style={{ color: "var(--color-primary)" }}>Year Level</label>
                  <select id="year" title="Based on program" value={infoForm.newYear}
                    style={{ border: "1px solid var(--color-muted)" }}
                    onChange={e => setInfoForm_({ newYear: e.target.value })} required disabled={!infoForm.newProg}
                  >
                    <option value="" disabled>Select</option>
                    {yearOptions.map((year: string) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </>
              )}
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn">Request Update</button>
            </div>
          </div>
        </div>
        </form>
      )}

      {/* Modal for displaying messages */}
      <Modal isOpen={systemResponseOpen} message={systemResponse} onClose={() => setSystemResponseOpen(false)} cancelColor="bg-subtext" cancelText="Close"/>
      <LoadingModal isOpen={isLoadingOpen} message={loadingMessage} />
    </>
  );
}