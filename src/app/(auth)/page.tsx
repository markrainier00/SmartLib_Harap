"use client";
import {api} from "@/lib/api";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IconEye, IconEyeOff, IconBack, IconMail, IconID, IconImage } from "@/components/icons";
import FloatingInput from "@/components/ui/FloatingInput";
import PasswordStrength from "@/components/ui/PasswordStrength";

type AuthMode = "signin" | "register";
type RegisterStep = 1 | 2 | 3 | 4 | 5;

// ─── Step Progress Bar ────────────────────────────────────────────────────────
const StepBar = ({ current, total }: { current: RegisterStep; total: number }) => (
  <div className="progress">
    {Array.from({ length: total }, (_, i) => {
      const step = (i + 1) as RegisterStep;
      const status = step < current ? "done" : step === current ? "active" : "pending";
      return (
        <React.Fragment key={i}>
          <div className={`step-dot ${status}`}>
            {status === "done" ? (
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            ) : step}
          </div>
          {i < total - 1 && <div className={`step-line ${step < current ? "done" : ""}`} />}
        </React.Fragment>
      );
    })}
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("signin");
  const [step, setStep] = useState<RegisterStep>(1);

  // ── Sign In state ──
  const [signin, setSignin] = useState({
    identifier: "",
    password: "",
    showPw: false,
  });

  // ── Register state ──
  const [register, setRegister] = useState({
    email: "",
    schoolId: "",
    firstName: "",
    lastName: "",
    department: "",
    program: "",
    year: "",
    password: "",
    confirm: "",
    showPassword: false,
    showConfirm: false,
  });

  // ── OTP state ──
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

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
    .filter((s: any) => s.department === register.department)
    .map((s: any) => s.program);

  const selectedSchool = schools.find(
    (s: any) => s.program === register.program && s.department === register.department
  );
  const maxYears = selectedSchool?.duration || 4;

  const yearOptions = Array.from({ length: maxYears }, (_, i) => {
    const labels = ["1st", "2nd", "3rd", "4th", "5th", "6th"];
    return labels[i];
  });

  // ── School ID image state ──
  const [schoolIdImage, setSchoolIdImage] = useState<File | null>(null);
  const [schoolIdPreview, setSchoolIdPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── UI state ──
  const [ui, setUi] = useState({
    error: "",
    success: "",
    info: "",
    loading: false,
  });

  // ── Helpers ──
  const setReg = (fields: Partial<typeof register>) =>
    setRegister(prev => ({ ...prev, ...fields }));

  const setSignIn = (fields: Partial<typeof signin>) =>
    setSignin(prev => ({ ...prev, ...fields }));

  const setUI = (fields: Partial<typeof ui>) =>
    setUi(prev => ({ ...prev, ...fields }));

  const clearAlerts = () => setUI({ error: "", success: "", info: "" });

  const clearRegisterForm = () => {
    setRegister({
      email: "",
      schoolId: "",
      firstName: "",
      lastName: "",
      department: "",
      program: "",
      year: "",
      password: "",
      confirm: "",
      showPassword: false,
      showConfirm: false,
    });
    setSchoolIdImage(null);
    setSchoolIdPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const switchMode = (m: AuthMode, keepAlerts = false) => {
    setMode(m);
    setStep(1);
    if (!keepAlerts) clearAlerts();
    if (m === "register") setSignin({ identifier: "", password: "", showPw: false });
  };

  // ── Reset OTP when entering Step 2 ──
  useEffect(() => {
    if (step === 2) {
      setOtp(["", "", "", "", "", ""]);
      setTimeout(() => otpRefs.current[0]?.focus(), 50);
    }
  }, [step]);

  // ── OTP handlers ──
  const handleOtpChange = (idx: number, val: string) => {
    const digit = val.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[idx] = digit;
    setOtp(next);
    if (digit && idx < 5) otpRefs.current[idx + 1]?.focus();
  };

  const handleOtpKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) otpRefs.current[idx - 1]?.focus();
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6).split("");
    if (digits.length) {
      setOtp(digits.concat(Array(6 - digits.length).fill("")));
      otpRefs.current[Math.min(digits.length, 5)]?.focus();
      e.preventDefault();
    }
  };

  // ── File upload ──
  const handleSchoolIdImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { setUI({ error: "Please upload a valid image file." }); return; }
    if (file.size > 5 * 1024 * 1024) { setUI({ error: "Image must be under 5MB." }); return; }
    setSchoolIdImage(file);
    setSchoolIdPreview(URL.createObjectURL(file));
    setUI({ error: "" });
  };

  const removeSchoolIdImage = () => {
    setSchoolIdImage(null);
    setSchoolIdPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "firstName" | "lastName"
  ) => {
    const v = e.target.value;
    setReg({ [field]: v.length > 0 ? v.charAt(0).toUpperCase() + v.slice(1) : "" });
  };

  // API Calls 
  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    clearAlerts();

    if (!signin.identifier || !signin.password) {
      setUI({ error: "Please fill in all fields" });
      return;
    }

    setUI({ loading: true });
    try {
      const json = await api.postPublic("/api/auth/signin", {
        identifier: signin.identifier,
        password: signin.password,
      });

      if (json.retCode !== "200") throw new Error(json.message || "Sign in failed");
      
      localStorage.setItem("user", JSON.stringify(json.data));
      localStorage.setItem("token", json.token);

      const role = json.data.role;
      if (role === "Admin") {
        router.push("/superadmin");
      } else if (role === "Staff") {
        router.push("/admin");
      } else {
        router.push("/library");
      }
    } catch (err: any) {
      setUI({ error: err.message });
    } finally {
      setUI({ loading: false });
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    clearAlerts();
    if (!register.email) { setUI({ error: "Please enter an email." }); return; }
    setUI({ loading: true });
    try {
      const json = await api.postPublic("/api/auth/send-otp", {
        email: register.email,
      });
      if (json.retCode !== "200") throw new Error(json.message || "Could not send verification code");
      setStep(2);
      setUI({ info: `A 6-digit code was sent to ${register.email}` });
    } catch (err: any) {
      setUI({ error: err.message });
    } finally {
      setUI({ loading: false });
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    clearAlerts();
    const code = otp.join("");
    if (code.length < 6) { setUI({ error: "Please enter all 6 digits." }); return; }
    setUI({ loading: true });
    try {
      const json = await api.postPublic("/api/auth/verify-otp", {
        email: register.email,
        otp: code,
      });
      if (json.retCode !== "200") throw new Error(json.message || "Invalid or expired code");
      setStep(3);
      clearAlerts();
    } catch (err: any) {
      setUI({ error: err.message });
    } finally {
      setUI({ loading: false });
    }
  };

  const handleResendOtp = async () => {
    clearAlerts();
    try {
      const json = await api.postPublic("/api/auth/send-otp", {
        email: register.email,
      });
      if (json.retCode !== "200") throw new Error(json.message || "Could not resend code");
      setOtp(["", "", "", "", "", ""]);
      otpRefs.current[0]?.focus();
      setUI({ info: "A new code has been sent." });
    } catch (err: any) {
      setUI({ error: err.message });
    }
  };

  const handleCheckSchoolId = async (e: React.FormEvent) => {
    e.preventDefault();
    clearAlerts();
    setUI({ loading: true });
    try {
      const json = await api.postPublic("/api/auth/check-school-id", {
        school_id: register.schoolId,
      });
      if (json.retCode !== "200") throw new Error(json.message || "School ID check failed");
      setStep(4);
      clearAlerts();
    } catch (err: any) {
      setUI({ error: err.message });
    } finally {
      setUI({ loading: false });
    }
  };

  const handlePassword = (e: React.FormEvent) => {
    e.preventDefault();
    clearAlerts();
    if (register.password !== register.confirm) {
      setUI({ error: "Passwords do not match" });
      return;
    }
    setStep(5);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    clearAlerts();
    if (!schoolIdImage) { setUI({ error: "Please upload your School ID photo." }); return; }
    setUI({ loading: true });
    try {
      const formData = new FormData();
      formData.append("firstname", register.firstName);
      formData.append("lastname", register.lastName);
      formData.append("email", register.email);
      formData.append("school_id", register.schoolId);
      formData.append("department", register.department);
      formData.append("program", register.program);
      formData.append("year", register.year);
      formData.append("password", register.password);
      formData.append("school_id_image", schoolIdImage);

      const json = await api.postFormPublic("/api/auth/register", formData);
      clearRegisterForm();
      setUI({ success: json.message || "Registration successful." });
      switchMode("signin", true);
    } catch (err: any) {
      setUI({ error: err.message });
    } finally {
      setUI({ loading: false });
    }
  };

  return (
    <div className="layout">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      <div className="card">

        {/* Brand */}
        <div className="smartlib-logo text-center">SmartLib</div>
        <div className="smartlib-sub text-center mb-5">School Library Management Portal</div>

        {/* Mode tabs */}
        {(mode === "signin" || step === 1) && (
          <div className="tabs">
            <button className={`tab ${mode === "signin" ? "active" : ""}`} onClick={() => switchMode("signin")}>Sign In</button>
            <button className={`tab ${mode === "register" ? "active" : ""}`} onClick={() => switchMode("register")}>Register</button>
          </div>
        )}

        {/* Alerts */}
        {ui.error && (
          <div className="alert-error">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{flexShrink:0,marginTop:1}}>
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {ui.error}
          </div>
        )}
        {ui.success && (
          <div className="alert-success">
            <div className="check">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            {ui.success}
          </div>
        )}
        {ui.info && (
          <div className="alert-info">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{flexShrink:0,marginTop:1}}>
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
            {ui.info}
          </div>
        )}

        {/* ── SIGN IN ── */}
        {mode === "signin" && (
          <form onSubmit={handleSignin} className="slideFromLeft">
            <div className="field">
              <FloatingInput
                label="Email Address or School ID"
                type= "text"
                value={signin.identifier}
                onChange={e => setSignIn({ identifier: e.target.value })}
                required
              />
            </div>
            <div className="field">
              <FloatingInput
                label="Password"
                type={signin.showPw ? "text" : "password"}
                value={signin.password}
                onChange={e => setSignIn({ password: e.target.value })}
                required
                suffix={
                  <button type="button" className="pw-toggle" onClick={() => setSignIn({ showPw: !signin.showPw })}>
                    {signin.showPw ? <IconEyeOff /> : <IconEye />}
                  </button>
                }
              />
              <Link href="/forgot-password" className="hyperlink" style={{ textAlign: "right" }}>Forgot password?</Link>
            </div>
            <button type="submit" className="btn" disabled={ui.loading}>
              {ui.loading ? <><div className="loading-text" /> Signing in…</> : "Sign In"}
            </button>
          </form>
        )}

        {/* ── REGISTER ── */}
        {mode === "register" && (
          <div className="slideFromRight" key={step}>

            {/* Step 1: Email */}
            {step === 1 && (
              <form onSubmit={handleSendOtp}>
                <div className="field">
                  <FloatingInput
                    label="Email Address"
                    type= "email"
                    value={register.email}
                    onChange={e => setReg({ email: e.target.value })}
                    required
                  />
                </div>
                <button type="submit" className="btn" disabled={ui.loading}>
                  {ui.loading ? <><div className="loading-text" /> Sending code…</> : "Send Verification Code →"}
                </button>
              </form>
            )}

            {/* Step 2: OTP */}
            {step === 2 && (<>
              <button className="back" onClick={() => { setStep(1); clearAlerts(); }}><IconBack /> Back</button>
              <form onSubmit={handleVerifyOtp}>
                <div className="otp-row" onPaste={handleOtpPaste}>
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      aria-label={`Digit ${i + 1}`}
                      ref={el => { otpRefs.current[i] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      className={`otp-cell ${digit ? "filled" : ""}`}
                      onChange={e => handleOtpChange(i, e.target.value)}
                      onKeyDown={e => handleOtpKeyDown(i, e)}
                    />
                  ))}
                </div>
                <button type="submit" className="btn" disabled={ui.loading || otp.join("").length < 6} style={{marginTop:"18px"}}>
                  {ui.loading ? <><div className="loading-text" /> Verifying…</> : "Verify Code →"}
                </button>
                <div className="resend">
                  Didn't get it? <button type="button" onClick={handleResendOtp}>Resend code</button>
                </div>
              </form></>
            )}

            {/* Step 3: School ID */}
            {step === 3 && (<>
              <button className="back" onClick={() => { setStep(1); clearAlerts(); }}><IconBack /> Back</button>
              <form onSubmit={handleCheckSchoolId}>
                <div className="field">
                  <FloatingInput
                    label="School ID"
                    type= "text"
                    value={register.schoolId}
                    onChange={e => setReg({ schoolId: e.target.value })}
                    required
                  />
                </div>
                <button type="submit" className="btn" disabled={ui.loading}>
                  {ui.loading ? <><div className="loading-text" /> Checking…</> : "Continue →"}
                </button>
              </form></>
            )}

            {/* Step 4: Password */}
            {step === 4 && (<>
              <button className="back" onClick={() => { setStep(3); clearAlerts(); }}><IconBack /> Back</button>
              <form onSubmit={handlePassword}>
                <div className="field">
                  <FloatingInput
                    label="New Password"
                    type={register.showPassword ? "text" : "password"}
                    value={register.password}
                    onChange={e => setReg({ password: e.target.value })}
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}"
                    required
                    suffix={
                      <button type="button" className="pw-toggle" onClick={() => setReg({ showPassword: !register.showPassword })}>
                        {register.showPassword ? <IconEyeOff /> : <IconEye />}
                      </button>
                    }
                  />
                  <PasswordStrength password={register.password}/>
                </div>
                <div className="field">
                  <FloatingInput
                    label="Confirm Password"
                    type={register.showConfirm ? "text" : "password"}
                    value={register.confirm}
                    onChange={e => setReg({ confirm: e.target.value })}
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}"
                    required
                    suffix={
                      <button type="button" className="pw-toggle" onClick={() => setReg({ showConfirm: !register.showConfirm })}>
                        {register.showConfirm ? <IconEyeOff /> : <IconEye />}
                      </button>
                    }
                  />
                </div>
                <button type="submit" className="btn" disabled={ui.loading}>Save Password</button>
              </form></>
            )}

            {/* Step 5: Details */}
            {step === 5 && (<>
              <button className="back" onClick={() => { setStep(4); clearAlerts(); }}><IconBack /> Back</button>
              <form onSubmit={handleRegister}>
                <div style={{ padding: "10px", maxHeight: "400px", overflow: "auto" }}>
                  <FloatingInput
                    label="First Name"
                    type="text"
                    value={register.firstName}
                    onChange={e => handleNameChange(e, "firstName")}
                    required
                  />
                  <FloatingInput
                    label="Last Name"
                    type="text"
                    value={register.lastName}
                    onChange={e => handleNameChange(e, "lastName")}
                    required
                  />
                  <div className="field">
                    <label htmlFor="department" style={{ color: "var(--color-primary)" }}>Department</label>
                    <select id="department" value={register.department}
                      style={{ border: "1.5px solid var(--color-muted)" }}
                      onChange={e => setReg({ department: e.target.value, program: "", year: "" })} required
                    >
                      <option value="" disabled>Select department</option>
                      {departments.map((dept: string) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="program" style={{ color: "var(--color-primary)" }}>Program</label>
                    <select id="program" title="Based on department" value={register.program}
                      style={{ border: "1.5px solid var(--color-muted)" }}
                      onChange={e => setReg({ program: e.target.value, year: "" })} required disabled={!register.department}
                    >
                      <option value="" disabled>Select</option>
                      {programs.map((prog: string) => (
                        <option key={prog} value={prog}>{prog}</option>
                      ))}
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="year" style={{ color: "var(--color-primary)" }}>Year Level</label>
                    <select id="year" title="Based on program" value={register.year}
                      style={{ border: "1px solid var(--color-muted)" }}
                      onChange={e => setReg({ year: e.target.value })} required disabled={!register.program}
                    >
                      <option value="" disabled>Select</option>
                      {yearOptions.map((year: string) => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="schoolidImage" style={{ color: "var(--color-primary)" }}>School ID Upload (For Identity Verification)</label>
                    <input id="schoolidImage" aria-label="Upload School ID Photo" ref={fileInputRef} type="file" accept="image/*" style={{display:"none"}} onChange={handleSchoolIdImage} />
                    {!schoolIdPreview ? (
                      <div className="upload" onClick={() => fileInputRef.current?.click()}>
                        <div className="upload-icon"><IconImage/></div>
                        <div className="upload-text">Click to upload your School ID photo</div>
                        <div className="upload-hint">JPG, PNG, WEBP — max 2MB</div>
                      </div>
                    ) : (
                      <div className="upload has-img">
                        <div className="img-wrap">
                          <img src={schoolIdPreview} alt="School ID preview" className="img-preview" />
                          <button type="button" aria-label="Remove School ID Photo" className="img-remove" onClick={removeSchoolIdImage}>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <button type="submit" className="btn mt-5" disabled={ui.loading}>
                  {ui.loading ? <><div className="loading-text" /> Creating Account…</> : "Create Account"}
                </button>
              </form></>
            )}

            {/* Progress */}
            <StepBar current={step} total={5} />
          </div>
        )}
      </div>
    </div>
  );
}