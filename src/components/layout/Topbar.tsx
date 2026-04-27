"use client";

import { api } from "@/lib/api";
import { useUser } from "@/lib/user";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import { IconHamburger, IconArrowDown, IconSupport, IconID, IconLogo, IconX, IconEye, IconEyeOff } from "../icons";
import { useClickOutside } from "@/app/hooks/useClickOutside";
import FloatingInput from "@/components/ui/FloatingInput";
import PasswordStrength from "@/components/ui/PasswordStrength";
import Modal from "@/components/Modal";
import LoadingModal from "@/components/LoadingModal";
import NotificationBell from "../notifications/NotificationBell"; 
import ChatSupport from "@/components/chatsupport/ChatSupport";
import AdminChat from "@/components/chatsupport/AdminChat";

interface TopbarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function Topbar({ isSidebarOpen, toggleSidebar }: TopbarProps) {
  const { role, firstName, fullName, email, school_id, department, program, year } = useUser() as any;
  const router = useRouter();

  const [showAdminSupport, setShowAdminSupport] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showId, setShowId] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showChangeInformation, setShowChangeInformation] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [studentUnread, setStudentUnread] = useState(0);

  const profileRef = useRef(null);

  const [isLoadingOpen, setIsLoadingOpen] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Processing...");
  const [systemResponseOpen, setSystemResponseOpen] = useState(false);
  const [systemResponse, setSystemResponse] = useState("Processing...");

  const [infoForm, setInfoForm] = useState({
    newEmail: "", newYear: "", newDept: "", newProg: "",
  });

  const setInfoForm_ = (fields: Partial<typeof infoForm>) =>
    setInfoForm(prev => ({ ...prev, ...fields }));

  const [openTickets, setOpenTickets] = useState(0);

  useEffect(() => {
    if (role !== "Staff") return;

    const fetchUnread = async () => {
      try {
        const data = await api.get("/api/chat/admin/all");
        if (data.isSuccess && data.data) {
          const checks = await Promise.all(
            data.data.map(async (c: any) => {
              try {
                const chatData = await api.get(`/api/chat/student/${c.student_id}`);
                if (chatData.isSuccess && chatData.data.messages) {
                  return chatData.data.messages.some(
                    (m: any) => m.sender_role?.toLowerCase() === "student" && !(m.is_read || m.IsRead)
                  );
                }
              } catch {}
              return false;
            })
          );
          const count = checks.filter(Boolean).length;
          setOpenTickets(count);
        }
      } catch {}
    };

    fetchUnread();
    const interval = setInterval(fetchUnread, 3000);
    return () => clearInterval(interval);
  }, [role]);

  useEffect(() => {
    if (role !== "Student" || !school_id) return;

    const fetchUnread = async () => {
      try {
        const data = await api.get(`/api/chat/student/${school_id}`);
        if (data.isSuccess && data.data.messages) {
          const unreadCount = data.data.messages.filter((m: any) =>
            m.sender_role.toLowerCase() === "admin" && !(m.is_read || m.IsRead)
          ).length;
          setStudentUnread(unreadCount);
        }
      } catch (e) {}
    };

    fetchUnread();
    const interval = setInterval(fetchUnread, 3000);
    return () => clearInterval(interval);
  }, [role, school_id]);

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

  const departments = [...new Set(schools.map((s: any) => s.department))];
  const programs = schools.filter((s: any) => s.department === infoForm.newDept).map((s: any) => s.program);
  const selectedSchool = schools.find((s: any) => s.program === infoForm.newProg && s.department === infoForm.newDept);
  const maxYears = selectedSchool?.duration || 4;
  const yearOptions = Array.from({ length: maxYears }, (_, i) => ["1st", "2nd", "3rd", "4th", "5th", "6th"][i]);

  const [pwForm, setPwForm] = useState({
    current: "", newPw: "", confirm: "", showCurrent: false, showNewPw: false, showConfirm: false,
  });
  const setPwForm_ = (fields: Partial<typeof pwForm>) => setPwForm(prev => ({ ...prev, ...fields }));
  
  useClickOutside(profileRef, () => setShowProfile(false));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/");
  };

  const handleInformationChange = async (e: React.FormEvent) => {
      e.preventDefault();

      const payload: Record<string, string> = {
          school_ID: school_id,
      };

      if (infoForm.newEmail !== email) payload.email = infoForm.newEmail;

      if (role === "Student") {
          if (infoForm.newDept !== department) payload.department = infoForm.newDept;
          if (infoForm.newProg !== program) payload.program = infoForm.newProg;
          if (infoForm.newYear !== year) payload.year = infoForm.newYear;
      }

      if (Object.keys(payload).length === 1) {
          setSystemResponse("No changes made.");
          setSystemResponseOpen(true);
          return;
      }

      setLoadingMessage("Requesting information update...");
      setIsLoadingOpen(true);

      try {
          const json = await api.post("/api/auth/change-information", payload);

          if (json.retCode === "200") {
              setSystemResponse(json.message || "Information edit requested.");
          } else {
              setSystemResponse(json.message || "Failed to request information edit.");
          }
      } catch (err) {
          setSystemResponse("Server connection failed.");
      } finally {
          setShowChangeInformation(false);
          setInfoForm_({
              newEmail: email,
              ...(role === "Student" && { newDept: department, newProg: program, newYear: year }),
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
        setSystemResponse("Password do not match.");
        setSystemResponseOpen(true);
      return;
    }

    try {
      const json = await api.post("/api/auth/change-password", {
        current_password: pwForm.current, new_password: pwForm.newPw,
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
        .topbar { height: 64px; background: #ffffff; border-bottom: 1px solid #C3DDD0; padding-right: 28px; display: flex; align-items: center; justify-content: space-between; flex-shrink: 0; position: relative; z-index: 50; }
        .topbar-actions { display: flex; align-items: center; gap: 5px; }
        .sidebar-logo { display: flex; align-items: center; padding: 20px; border-bottom: 1px solid rgba(255,255,255,.1); justify-content: "center"; color: var(--color-primary); }
        .hamburger-btn { cursor: pointer; background: none; border: none; color: inherit; display: flex; align-items: center; justify-content: center; width: 30px; height: 30px; }
        .action-btn { display: flex; align-items: center; border: 1px solid transparent; border-radius: 7px; position: relative; width: 40px; height: 40px; cursor: pointer; transition: background .2s; justify-content: center; color: var(--color-subtext); background: #EBF7F0;}
        .action-btn:hover { background: #D6EDE1; }
        .profile-pill { display: flex; align-items: center; gap: 1px; border: 1px solid transparent; border-radius: 7px; padding: 3px; cursor: pointer; transition: all .2s; background: none;}
        .profile-pill:hover, .profile-pill.active { border-color: #C3DDD0; box-shadow: 0 4px 12px rgba(27,94,53,.08); }
        .profile-pill span { font-size: 13.5px; font-weight: 600; color: #102A1C; }
        .avatar-icon { width: 30px; height: 30px; border-radius: 50%; background: linear-gradient(135deg, var(--color-success-border), var(--color-primary)); display: flex; align-items: center; justify-content: center; color: #fff; border: 3px solid var(--green-100); }
        .profile-arrow { position: absolute; bottom: 0; right: 0; width: 13px; height: 13px; background: var(--color-primary); border-radius: 50%; border: 1px solid #ffffff;  }
        
        .dropdown { position: absolute; top: 40px; right: 0; background: #fff; border-radius: 10px; box-shadow: 0 16px 48px rgba(27,94,53,.12); border: 1px solid #C3DDD0; z-index: 60; overflow: hidden; animation: fadeUp .2s ease both; min-width: 260px; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:none; } }

        .pp-head { padding: 10px 15px; border-bottom: 1px solid #EBF7F0; display: flex; flex-direction: column; background: #EBF7F0; }
        .pp-name { font-size: 16px; font-weight: 700; color: #102A1C; margin-bottom: 2px; }
        .pp-sub { font-size: 12.5px; color: #7AAD8E; }
        .pp-menu { padding: 3px 0; }
        .pp-item { display: flex; align-items: center; gap: 12px; width: 100%; padding: 6px 12px; background: none; border: none; text-align: left; cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 13.5px; font-weight: 600; color: #3B6B50; transition: all .2s; }
        .pp-item:hover { background: #EBF7F0; color: #1B5E35; padding-left: 13px; }

        .id-card { background: linear-gradient(145deg, #1B5E35 0%, #256D42 100%); width: 100%; max-width: 360px; border-radius: 24px; padding: 32px 24px 0; color: #fff; position: relative; box-shadow: 0 24px 64px rgba(0,0,0,.3); text-align: center; border: 1px solid rgba(255,255,255,.1); animation: fadeUp .3s cubic-bezier(0.16, 1, 0.3, 1); overflow: hidden; }
        .id-close { position: absolute; top: 16px; right: 16px; background: rgba(255,255,255,.1); border: none; border-radius: 7px; width: 30px; height: 30px; color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background .2s; z-index: 10; }
        .id-close:hover { background: rgba(255,255,255,.2); }
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
            <button className="hamburger-btn" onClick={toggleSidebar} title="Toggle Sidebar" aria-label="Toggle Sidebar"><IconHamburger /></button>
          </div>
          <IconLogo style={{ width: "40px", height: "40px", color: "var(--color-primary)" }} />
          <div className="smartlib-logo" style={{ fontSize: '20px' }}>SmartLib
            <span className="smartlib-sub" style={{ fontSize: '13px', display: 'block' }}>
              {role === 'Staff' ? 'STAFF' : role === 'Admin' ? 'ADMINISTRATOR' : 'STUDENT'} PORTAL
            </span>
          </div>
        </div>

        <div className="topbar-actions">
          {role === 'Student' && (
            <>
            <button className="action-btn" onClick={() => setShowId(true)} title="Digital ID" aria-label="Digital ID">
              <IconID />
            </button>
            
            <button className="action-btn" onClick={() => setShowSupport(true)} title="Support" aria-label="Support" style={{ position: "relative" }}>
              <IconSupport />
              {studentUnread > 0 && (
                <span style={{
                  position: "absolute", top: "4px", right: "4px",
                  background: "#ef4444", color: "white",
                  fontSize: "9px", fontWeight: "bold",
                  minWidth: "16px", height: "16px",
                  borderRadius: "50%", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                }}>
                </span>
              )}
            </button>
            </>
          )}

          {(role === 'Staff') && (
            <button className="action-btn" onClick={() => setShowAdminSupport(true)} title="Support" aria-label="Support" style={{ position: "relative" }}>
              <IconSupport />
              {openTickets > 0 && (
                <span style={{
                  position: "absolute", top: "4px", right: "4px",
                  background: "#ef4444", color: "white",
                  fontSize: "9px", fontWeight: "bold",
                  minWidth: "16px", height: "16px",
                  borderRadius: "50%", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                }}>
                  {openTickets}
                </span>
              )}
            </button>
          )}

          {role === 'Student' && (
            <NotificationBell />
          )}

          <div style={{ position: "relative" }} ref={profileRef}>
            <button className={`profile-pill ${showProfile ? 'active' : ''}`} onClick={() => setShowProfile(!showProfile)} title="Profile Menu" aria-label="Profile Menu">
              <p className="avatar-icon">{firstName ? firstName[0] : "U"}</p><IconArrowDown className="profile-arrow text-white"/>
            </button>

            {showProfile && (
              <div className="dropdown open">
                <div className="pp-head">
                  <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <p className="avatar-icon">{firstName ? firstName[0] : "U"}</p>
                    <div style={{ display: "flex", flexDirection: "column", paddingLeft: "5px" }}>
                      <p className="pp-name">{fullName}</p>
                      <p className="pp-sub">{school_id}</p>
                    </div>
                  </div>
                </div>
                <div className="pp-menu">
                  <button className="pp-item" onClick={() => {setShowProfile(false); setShowChangeInformation(true)}}>Edit Information</button>
                  <button className="pp-item" onClick={() => {setShowProfile(false); setShowChangePassword(true)}}>Change Password</button>
                  <button className="pp-item" style={{ color: "#c94040" }} onClick={handleLogout}>Log Out</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {showId && (
        <div className="overlay" onClick={() => setShowId(false)}>
          <div className="id-card" onClick={e => e.stopPropagation()}>
            <button className="id-close" onClick={() => setShowId(false)} title="Close ID card" aria-label="Close ID card"><IconX /></button>
            <div className="flex flex-col items-center">
              <IconLogo />
              <div style={{ fontFamily: 'DM Serif Display', fontSize: '22px', marginBottom: '24px' }}>SmartLib</div>
            </div>
            <div className="qr-container">
              <QRCode value={school_id || ""} size={220} bgColor="#fff" fgColor="#1B5E35" level="H" />
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
              <button className="close" onClick={() => setShowChangePassword(false)} title="Close" aria-label="Close"><IconX/></button>
            </div>
            <div className="modal-scroll">
              <div style={{ textAlign: "center", marginBottom: "20px"}}>
                <div className="page-header">Change Password</div>
              </div>
              <FloatingInput label="Current Password" type={pwForm.showCurrent ? "text" : "password"} value={pwForm.current} onChange={e => setPwForm_({ current: e.target.value })} required suffix={<button type="button" className="pw-toggle" onClick={() => setPwForm_({ showCurrent: !pwForm.showCurrent })} title="Show/Hide Password" aria-label="Show/Hide Password">{pwForm.showCurrent ? <IconEyeOff /> : <IconEye />}</button>}/>
              <FloatingInput label="New Password" type={pwForm.showNewPw ? "text" : "password"} value={pwForm.newPw} onChange={e => setPwForm_({ newPw: e.target.value })} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}" required suffix={<button type="button" className="pw-toggle" onClick={() => setPwForm_({ showNewPw: !pwForm.showNewPw })} title="Show/Hide Password" aria-label="Show/Hide Password">{pwForm.showNewPw ? <IconEyeOff /> : <IconEye />}</button>}/>
              <PasswordStrength password={pwForm.newPw}/>
              <FloatingInput label="Confirm New Password" type={pwForm.showConfirm ? "text" : "password"} value={pwForm.confirm} onChange={e => setPwForm_({ confirm: e.target.value })} required suffix={<button type="button" className="pw-toggle" onClick={() => setPwForm_({ showConfirm: !pwForm.showConfirm })} title="Show/Hide Password" aria-label="Show/Hide Password">{pwForm.showConfirm ? <IconEyeOff /> : <IconEye />}</button>}/>
            </div>
            <div className="modal-footer"><button type="submit" className="btn">Update Password</button></div>
          </div>
        </div>
        </form>
      )}

      {showChangeInformation && (
        <form onSubmit={handleInformationChange}>
        <div className="overlay" onClick={() => {setInfoForm_({ newEmail: email, newDept: department, newProg: program, newYear: year}); setShowChangeInformation(false)}}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <button className="close" onClick={() => {setInfoForm_({ newEmail: email, newDept: department, newProg: program, newYear: year}); setShowChangeInformation(false)}} title="Close" aria-label="Close"><IconX/></button>
            </div>
            <div className="modal-scroll">
              <div style={{ textAlign: "center", marginBottom: "20px"}}>
                <div className="page-header">Edit Information</div>
              </div>
              <div className="field">
                <FloatingInput label="Email Address" type="email" value={ infoForm.newEmail } onChange={ e => setInfoForm_({ newEmail: e.target.value })} />
              </div>
              {role === "Student" &&(
              <>
                <div className="field"><label htmlFor="department" style={{ color: "var(--color-primary)" }}>Department</label><select id="department" value={infoForm.newDept} style={{ border: "1.5px solid var(--color-muted)" }} onChange={e => setInfoForm_({ newDept: e.target.value, newProg: "", newYear: "" })}><option value="" disabled>Select department</option>{departments.map((dept: string) => (<option key={dept} value={dept}>{dept}</option>))}</select></div>
                <div className="field"><label htmlFor="program" style={{ color: "var(--color-primary)" }}>Program</label><select id="program" title="Based on department" value={infoForm.newProg} style={{ border: "1.5px solid var(--color-muted)" }} onChange={e => setInfoForm_({ newProg: e.target.value, newYear: "" })} required disabled={!infoForm.newDept}><option value="" disabled>Select</option>{programs.map((prog: string) => (<option key={prog} value={prog}>{prog}</option>))}</select></div>
                <div className="field"><label htmlFor="year" style={{ color: "var(--color-primary)" }}>Year Level</label><select id="year" title="Based on program" value={infoForm.newYear} style={{ border: "1px solid var(--color-muted)" }} onChange={e => setInfoForm_({ newYear: e.target.value })} required disabled={!infoForm.newProg}><option value="" disabled>Select</option>{yearOptions.map((year: string) => (<option key={year} value={year}>{year}</option>))}</select></div>
              </>
              )}
            </div>
            <div className="modal-footer"><button type="submit" className="btn">Request Update</button></div>
          </div>
        </div>
        </form>
      )}

      {showSupport && (
        <ChatSupport studentId={school_id} onClose={() => setShowSupport(false)} />
      )}

      {showAdminSupport && (
        <AdminChat onClose={() => setShowAdminSupport(false)} />
      )}

      {/* Modal for displaying messages */}
      <Modal isOpen={systemResponseOpen} message={systemResponse} onClose={() => setSystemResponseOpen(false)} cancelColor="bg-primary" cancelText="Okay"/>
      <LoadingModal isOpen={isLoadingOpen} message={loadingMessage} />
    </>
  );
}