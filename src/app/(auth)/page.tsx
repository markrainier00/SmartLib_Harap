"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ─── Types ───────────────────────────────────────────────────────────────────
type AuthMode = "signin" | "register";
type RegisterStep = 1 | 2 | 3 | 4 | 5; // email → otp → school_id → password → details

// ─── Shared styles (injected once) ───────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .ac-root {
    min-height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DM Sans', sans-serif;
    position: fixed;
    inset: 0;
    overflow-y: auto;
    padding: 40px 20px;
    background: #f5f3ee;
  }

  /* Layered background */
  .ac-bg {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background:
      radial-gradient(ellipse 60% 50% at 15% 15%, #dde8f8 0%, transparent 70%),
      radial-gradient(ellipse 50% 40% at 85% 85%, #d8edd9 0%, transparent 65%),
      radial-gradient(ellipse 70% 60% at 50% 50%, #f5f3ee 0%, #ede9e0 100%);
  }
  .ac-bg-grain {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    opacity: 0.035;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 180px;
  }

  /* Card */
  .ac-card {
    background: #fff;
    border-radius: 28px;
    box-shadow: 0 2px 0 #e8e4da, 0 20px 60px rgba(26,39,68,0.13), 0 4px 16px rgba(26,39,68,0.06);
    padding: 36px 40px 40px;
    width: 100%;
    max-width: 460px;
    position: relative;
    z-index: 1;
    animation: cardIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  @keyframes cardIn {
    from { opacity: 0; transform: translateY(18px) scale(0.98); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* Brand */
  .ac-brand { text-align: center; margin-bottom: 6px; }
  .ac-logo {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: 'DM Serif Display', serif;
    font-size: 28px; color: #1a2744; letter-spacing: -0.5px;
  }
  .ac-logo-icon {
    width: 34px; height: 34px; background: #1a2744; border-radius: 9px;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .ac-sub { font-size: 11.5px; color: #9a9eb8; text-align: center; margin-bottom: 28px; letter-spacing: 0.02em; }

  /* Mode toggle pills */
  .ac-tabs { display: flex; background: #f0ede5; border-radius: 14px; padding: 4px; margin-bottom: 28px; gap: 4px; }
  .ac-tab {
    flex: 1; padding: 9px 0; border: none; border-radius: 10px;
    font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s;
    background: transparent; color: #8a8ea8; font-family: 'DM Sans', sans-serif;
  }
  .ac-tab.active { background: #fff; color: #1a2744; box-shadow: 0 2px 10px rgba(26,39,68,0.11); }

  /* Step progress */
  .ac-progress { display: flex; align-items: center; margin-top: 26px; }
  .ac-step-dot {
    width: 15px; height: 15px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 10px; font-weight: 600; flex-shrink: 0; transition: all 0.3s;
  }
  .ac-step-dot.done { background: #1a2744; color: #fff; }
  .ac-step-dot.active { background: #1a2744; color: #fff; box-shadow: 0 0 0 4px rgba(26,39,68,0.12); }
  .ac-step-dot.pending { background: #f0ede5; color: #b0afc9; }
  .ac-step-line { flex: 1; height: 2px; background: #f0ede5; margin: 0 6px; transition: background 0.3s; }
  .ac-step-line.done { background: #1a2744; }

  /* Fields */
  .ac-field { margin-bottom: 14px; text-align: left; }
  .ac-field label {
    display: block; font-size: 9.5px; font-weight: 700;
    letter-spacing: 0.09em; text-transform: uppercase; color: #1a2744; margin-bottom: 5px;
  }
  .ac-input-wrap { position: relative; display: flex; align-items: center; }
  .ac-field input, .ac-field select {
    width: 100%; background: #f7f5f1; border: 1.5px solid transparent;
    border-radius: 11px; padding: 11px 14px; font-size: 13.5px;
    color: #1a2744; outline: none; transition: all 0.2s;
    font-family: 'DM Sans', sans-serif;
  }
  .ac-field input:focus, .ac-field select:focus { border-color: #2a3d6e; background: #fff; box-shadow: 0 0 0 3px rgba(42,61,110,0.07); }
  .ac-field input.has-icon { padding-right: 44px; }
  .ac-field input.error-input { border-color: #e05555; background: #fff8f8; }

  .ac-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

  /* OTP Input */
  .ac-otp-row { display: flex; gap: 8px; justify-content: center; margin: 8px 0; }
  .ac-otp-cell {
    width: 48px; height: 56px; text-align: center;
    background: #f7f5f1; border: 1.5px solid transparent;
    border-radius: 12px; font-size: 22px; font-weight: 600;
    color: #1a2744; outline: none; transition: all 0.2s;
    font-family: 'DM Serif Display', serif;
  }
  .ac-otp-cell:focus { border-color: #2a3d6e; background: #fff; box-shadow: 0 0 0 3px rgba(42,61,110,0.07); }
  .ac-otp-cell.filled { border-color: #2a3d6e; background: #fff; }

  /* Resend */
  .ac-resend { text-align: center; margin-top: 14px; font-size: 12px; color: #9a9eb8; }
  .ac-resend button { background: none; border: none; cursor: pointer; color: #1a2744; font-weight: 600; font-size: 12px; transition: opacity 0.2s; font-family: 'DM Sans', sans-serif; }
  .ac-resend button:disabled { opacity: 0.4; cursor: not-allowed; }

  /* School ID upload */
  .ac-upload {
    border: 1.5px dashed #c8c4b8; border-radius: 11px;
    background: #f7f5f1; padding: 16px; text-align: center;
    cursor: pointer; transition: all 0.2s;
  }
  .ac-upload:hover { border-color: #2a3d6e; background: #eee9e0; }
  .ac-upload.has-img { border-style: solid; border-color: #2a3d6e; padding: 10px; }
  .ac-upload-icon { color: #b0afc9; margin-bottom: 5px; }
  .ac-upload-text { font-size: 12.5px; color: #8a8ea8; }
  .ac-upload-hint { font-size: 10.5px; color: #b8b6cc; margin-top: 3px; }
  .ac-img-wrap { position: relative; }
  .ac-img-preview { width: 100%; height: 110px; object-fit: cover; border-radius: 8px; display: block; }
  .ac-img-remove {
    position: absolute; top: 6px; right: 6px;
    background: rgba(26,39,68,0.7); border: none; border-radius: 50%;
    width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: #fff; transition: background 0.2s;
  }
  .ac-img-remove:hover { background: #cc0000; }

  /* Toggle password */
  .ac-pw-toggle { position: absolute; right: 12px; background: none; border: none; cursor: pointer; color: #b0afc9; display: flex; align-items: center; padding: 0; }
  .ac-pw-toggle:hover { color: #1a2744; }

  /* Primary button */
  .ac-btn {
    width: 100%; margin-top: 10px; padding: 13px;
    background: #1a2744; color: #fff; border: none;
    border-radius: 12px; font-size: 14px; font-weight: 600;
    cursor: pointer; box-shadow: 0 4px 16px rgba(26,39,68,0.2);
    transition: all 0.2s; font-family: 'DM Sans', sans-serif;
    display: flex; align-items: center; justify-content: center; gap: 8px;
  }
  .ac-btn:hover:not(:disabled) { background: #243564; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(26,39,68,0.25); }
  .ac-btn:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }

  /* Back link */
  .ac-back {
    display: inline-flex; align-items: center; gap: 5px;
    background: none; border: none; cursor: pointer;
    color: #9a9eb8; font-size: 12px; font-family: 'DM Sans', sans-serif;
    margin-bottom: 18px; padding: 0; transition: color 0.2s;
  }
  .ac-back:hover { color: #1a2744; }

  /* Alerts */
  .ac-alert-error { background: #fff2f2; border: 1px solid #ffd0d0; color: #c53030; border-radius: 10px; padding: 10px 14px; font-size: 12.5px; margin-bottom: 14px; display: flex; align-items: flex-start; gap: 8px; }
  .ac-alert-success { background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; border-radius: 10px; padding: 10px 14px; font-size: 12.5px; margin-bottom: 14px; display: flex; align-items: flex-start; gap: 8px; }
  .ac-alert-info { background: #eff6ff; border: 1px solid #bfdbfe; color: #1e40af; border-radius: 10px; padding: 10px 14px; font-size: 12.5px; margin-bottom: 14px; display: flex; align-items: flex-start; gap: 8px; }

  /* Divider */
  .ac-divider { display: flex; align-items: center; gap: 10px; margin: 18px 0 6px; }
  .ac-divider-line { flex: 1; height: 1px; background: #ede9e0; }
  .ac-divider-text { font-size: 11px; color: #b0afc9; }

  /* Fade transitions */
  .ac-fade { animation: fadeSlide 0.3s cubic-bezier(0.16,1,0.3,1) both; }
  @keyframes fadeSlide {
    from { opacity: 0; transform: translateX(12px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  /* Forgot link */
  .ac-forgot { display: block; margin-top: 5px; font-size: 11.5px; color: #9a9eb8; text-decoration: none; text-align: right; transition: color 0.2s; }
  .ac-forgot:hover { color: #1a2744; }

  /* Loading spinner */
  @keyframes spin { to { transform: rotate(360deg); } }
  .ac-spinner { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin 0.7s linear infinite; }

  /* Checkmark animation */
  .ac-check { display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; background: #22c55e; border-radius: 50%; flex-shrink: 0; margin-top: 1px; }
`;

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const IconEye = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);
const IconEyeOff = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 19c-7 0-11-7-11-7a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 7 11 7a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);
const IconBack = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);
const IconBook = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
);
const IconMail = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
);
const IconID = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
);

// ─── Step Progress Bar ────────────────────────────────────────────────────────
const StepBar = ({ current, total }: { current: RegisterStep; total: number }) => (
  <div className="ac-progress">
    {Array.from({ length: total }, (_, i) => {
      const step = (i + 1) as RegisterStep;
      const status = step < current ? "done" : step === current ? "active" : "pending";
      return (
        <React.Fragment key={i}>
          <div className={`ac-step-dot ${status}`}>
            {status === "done" ? (
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            ) : step}
          </div>
          {i < total - 1 && <div className={`ac-step-line ${step < current ? "done" : ""}`} />}
        </React.Fragment>
      );
    })}
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("signin");

  // ── Sign In state ──
  const [identifier, setIdentifier] = useState("");
  const [signinPassword, setSigninPassword] = useState("");
  const [showSigninPw, setShowSigninPw] = useState(false);

  // ── Register multi-step state ──
  const [step, setStep] = useState<RegisterStep>(1);

  // Step 1 — Email
  const [regEmail, setRegEmail] = useState("");

  // Step 2 — OTP
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [resendCountdown, setResendCountdown] = useState(60);
  const [resendActive, setResendActive] = useState(false);

  // Step 3 — School ID
  const [schoolId, setSchoolId] = useState("");

  // Step 4 — Details
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [program, setProgram] = useState("");
  const [year, setYear] = useState("");
  const [schoolIdImage, setSchoolIdImage] = useState<File | null>(null);
  const [schoolIdPreview, setSchoolIdPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Step 5 — Password
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirm, setConfirm] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  // ── UI state ──
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  // ── Helpers ──
  const clearAlerts = () => {
    setError("");
    setSuccess("");
    setInfo("");
  };
  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setRegEmail("");
    setSchoolId("");
    setProgram("");
    setYear("");
    setPassword("");
    setSchoolIdImage(null);
  }

  const switchMode = (m: AuthMode) => {
    setMode(m);
    setStep(1);
    clearAlerts();
  };

  // ── Reset OTP when entering Step 2 ──
  useEffect(() => {
    if (step === 2) {
      setOtp(["", "", "", "", "", ""]);
      setTimeout(() => otpRefs.current[0]?.focus(), 50); // optional focus
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
    if (!file.type.startsWith("image/")) { setError("Please upload a valid image file."); return; }
    if (file.size > 5 * 1024 * 1024) { setError("Image must be under 5MB."); return; }
    setSchoolIdImage(file);
    setSchoolIdPreview(URL.createObjectURL(file));
    setError("");
  };

  const removeSchoolIdImage = () => {
    setSchoolIdImage(null);
    setSchoolIdPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const v = e.target.value;
    setter(v.length > 0 ? v.charAt(0).toUpperCase() + v.slice(1) : "");
  };

  // ── API calls ──
  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    clearAlerts();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password: signinPassword }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Sign in failed");
      localStorage.setItem("user", JSON.stringify(json.data));
      router.push("/dashboard/library");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Step 1 — send OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    clearAlerts();
    setLoading(true);
    if (!regEmail) {
      setError("Please enter an email.");
      return;
    }
    try {
      const res = await fetch(`${API_URL}/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: regEmail }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Could not send verification code");
      setStep(2);
      setInfo(`A 6-digit code was sent to ${regEmail}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Step 2 — verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    clearAlerts();
    const code = otp.join("");
    if (code.length < 6) { setError("Please enter all 6 digits."); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: regEmail, otp: code }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Invalid or expired code");
      setStep(3);
      clearAlerts();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    clearAlerts();
    try {
      const res = await fetch(`${API_URL}/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: regEmail }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Could not resend code");
      setOtp(["", "", "", "", "", ""]);
      otpRefs.current[0]?.focus();
      setInfo("A new code has been sent.");
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Step 3 — check school ID
  const handleCheckSchoolId = async (e: React.FormEvent) => {
    e.preventDefault();
    clearAlerts();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/check-school-id`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ school_id: schoolId }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "School ID check failed");
      setStep(4);
      clearAlerts();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Step 4 — Password
  const handlePassword = async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");

      if (password !== confirm) {
          setError("Passwords do not match");
          return;
      }

      setStep(5);
  };


  // Step 5 — complete registration
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    clearAlerts();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("firstname", firstName);
      formData.append("lastname", lastName);
      formData.append("email", regEmail);
      formData.append("school_id", schoolId);
      formData.append("program", program);
      formData.append("year", year);
      formData.append("password", password);
      if (schoolIdImage) formData.append("school_id_image", schoolIdImage);

      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Registration failed");
      clearForm();
      setSuccess(json.message || "Account created! You can now sign in.");
      switchMode("signin");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ac-root">
      <style>{STYLES}</style>
      <div className="ac-bg" />
      <div className="ac-bg-grain" />

      <div className="ac-card">
        {/* Brand */}
        <div className="ac-brand">
          <div className="ac-logo">
            SmartLib
          </div>
        </div>
        <div className="ac-sub">School Library Management Portal</div>

        {/* Mode tabs — only show when not mid-registration */}
        {(mode === "signin" || step === 1) && (
          <div className="ac-tabs">
            <button className={`ac-tab ${mode === "signin" ? "active" : ""}`} onClick={() => switchMode("signin")}>Sign In</button>
            <button className={`ac-tab ${mode === "register" ? "active" : ""}`} onClick={() => switchMode("register")}>Register</button>
          </div>
        )}

        {/* Alerts */}
        {error && (
          <div className="ac-alert-error">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{flexShrink:0,marginTop:1}}>
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {error}
          </div>
        )}
        {success && (
          <div className="ac-alert-success">
            <div className="ac-check">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            {success}
          </div>
        )}
        {info && (
          <div className="ac-alert-info">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{flexShrink:0,marginTop:1}}>
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
            {info}
          </div>
        )}

        {/* ── SIGN IN ───────────────────────────────────────────── */}
        {mode === "signin" && (
          <form onSubmit={handleSignin} className="ac-fade">
            <div className="ac-field">
              <label>Email Address / School ID</label>
              <input
                type="text"
                placeholder="student@university.edu or 2024-00123"
                value={identifier}
                onChange={e => setIdentifier(e.target.value)}
                required
              />
            </div>
            <div className="ac-field">
              <label>Password</label>
              <div className="ac-input-wrap">
                <input
                  type={showSigninPw ? "text" : "password"}
                  placeholder="••••••••"
                  value={signinPassword}
                  onChange={e => setSigninPassword(e.target.value)}
                  className="has-icon"
                  required
                />
                <button type="button" className="ac-pw-toggle" onClick={() => setShowSigninPw(v => !v)}>
                  {showSigninPw ? <IconEyeOff /> : <IconEye />}
                </button>
              </div>
              <Link href="/forgot-password" className="ac-forgot">Forgot password?</Link>
            </div>
            <button type="submit" className="ac-btn" disabled={loading}>
              {loading ? <><div className="ac-spinner" /> Signing in…</> : "Sign In"}
            </button>
          </form>
        )}

        {/* ── REGISTER ─────────────────────────────────────────── */}
        {mode === "register" && (
          <div className="ac-fade" key={step}>

            {/* ── Step 1: Email ── */}
            {step === 1 && (
              <form onSubmit={handleSendOtp}>
                <div className="ac-field">
                  <label>Email Address</label>
                  <div className="ac-input-wrap">
                    <input
                      type="email"
                      placeholder="student@university.edu"
                      value={regEmail}
                      onChange={e => setRegEmail(e.target.value)}
                      required
                      style={{paddingLeft: "40px"}}
                    />
                    <span style={{position:"absolute",left:"13px",color:"#b0afc9",display:"flex",alignItems:"center"}}>
                      <IconMail />
                    </span>
                  </div>
                </div>
                <button type="submit" className="ac-btn" disabled={loading}>
                  {loading ? <><div className="ac-spinner" /> Sending code…</> : "Send Verification Code →"}
                </button>
              </form>
            )}

            {/* ── Step 2: OTP ── */}
            {step === 2 && (<>
              <button className="ac-back" onClick={() => { setStep(1); clearAlerts(); }}><IconBack /> Back</button>
              <form onSubmit={handleVerifyOtp}>
                <div className="ac-otp-row" onPaste={handleOtpPaste}>
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={el => { otpRefs.current[i] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      className={`ac-otp-cell ${digit ? "filled" : ""}`}
                      onChange={e => handleOtpChange(i, e.target.value)}
                      onKeyDown={e => handleOtpKeyDown(i, e)}
                    />
                  ))}
                </div>
                <div className="ac-resend">
                  {resendActive ? (
                    <>Resend code in <strong>{resendCountdown}s</strong></>
                  ) : (
                    <>Didn't get it? <button type="button" onClick={handleResendOtp} disabled={resendActive}>Resend code</button></>
                  )}
                </div>
                <button type="submit" className="ac-btn" disabled={loading || otp.join("").length < 6} style={{marginTop:"18px"}}>
                  {loading ? <><div className="ac-spinner" /> Verifying…</> : "Verify Code →"}
                </button>
              </form></>
            )}

            {/* Step 3: School ID */}
            {step === 3 && (<>
              <button className="ac-back" onClick={() => { setStep(1); clearAlerts(); }}><IconBack /> Back</button>
              <form onSubmit={handleCheckSchoolId}>
                <div className="ac-field">
                  <label>School ID Number</label>
                  <div className="ac-input-wrap">
                    <input
                      type="text"
                      placeholder="e.g. 2024-00123"
                      value={schoolId}
                      onChange={e => setSchoolId(e.target.value)}
                      required
                      style={{paddingLeft: "40px"}}
                    />
                    <span style={{position:"absolute",left:"13px",color:"#b0afc9",display:"flex",alignItems:"center"}}>
                      <IconID />
                    </span>
                  </div>
                </div>
                <button type="submit" className="ac-btn" disabled={loading}>
                  {loading ? <><div className="ac-spinner" /> Checking…</> : "Continue →"}
                </button>
              </form></>
            )}

            {/* Step 4: Password */}
            {step === 4 && (<>
              <button className="ac-back" onClick={() => { setStep(3); clearAlerts(); }}><IconBack /> Back</button>
              <form onSubmit={handlePassword}>
                <div className="field">
                    <label>New Password</label>
                    <div className="input-wrap">
                        <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}" minLength={8}/>
                        <button type="button" className="toggle-pw" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 19c-7 0-11-7-11-7a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 7 11 7a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                            ) : (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                            )}
                        </button>
                    </div>
                </div>
                <div className="field">
                    <label>Confirm Password</label>
                    <div className="input-wrap">
                        <input type={showConfirm ? "text" : "password"} value={confirm} onChange={(e) => setConfirm(e.target.value)} required/>
                        <button type="button" className="toggle-pw" onClick={() => setShowConfirm(!showConfirm)}>
                            {showConfirm ? (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 19c-7 0-11-7-11-7a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 7 11 7a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                            ) : (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                            )}
                        </button>
                    </div>
                </div>
                <button type="submit" className="btn-primary" disabled={loading}>Save Password</button>
              </form></>
            )}

            {/* Step 5: Details */}
            {step === 5 && (<>
              <button className="ac-back" onClick={() => { setStep(3); clearAlerts(); }}><IconBack /> Back</button>
              <form onSubmit={handleRegister}>
                <div className="ac-form-row">
                  <div className="ac-field">
                    <label>First Name</label>
                    <input type="text" placeholder="Juan" value={firstName} onChange={e => handleNameChange(e, setFirstName)} required />
                  </div>
                  <div className="ac-field">
                    <label>Last Name</label>
                    <input type="text" placeholder="Dela Cruz" value={lastName} onChange={e => handleNameChange(e, setLastName)} required />
                  </div>
                </div>

                <div className="ac-form-row">
                  <div className="ac-field">
                    <label>Program</label>
                    <select value={program} onChange={e => setProgram(e.target.value)} required>
                      <option value="" disabled>Select</option>
                      <option value="BSCS">BSCS</option>
                      <option value="BSIT">BSIT</option>
                      <option value="BSCpE">BSCpE</option>
                    </select>
                  </div>
                  <div className="ac-field">
                    <label>Year Level</label>
                    <select value={year} onChange={e => setYear(e.target.value)} required>
                      <option value="" disabled>Select</option>
                      <option value="1st">1st Year</option>
                      <option value="2nd">2nd Year</option>
                      <option value="3rd">3rd Year</option>
                      <option value="4th">4th Year</option>
                    </select>
                  </div>
                </div>

                <div className="ac-field">
                  <label>School ID Photo</label>
                  <input ref={fileInputRef} type="file" accept="image/*" style={{display:"none"}} onChange={handleSchoolIdImage} />
                  {!schoolIdPreview ? (
                    <div className="ac-upload" onClick={() => fileInputRef.current?.click()}>
                      <div className="ac-upload-icon">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="5" width="18" height="14" rx="2"/>
                          <circle cx="8.5" cy="10.5" r="1.5"/>
                          <path d="M21 15l-5-5L5 19"/>
                        </svg>
                      </div>
                      <div className="ac-upload-text">Click to upload your School ID photo</div>
                      <div className="ac-upload-hint">JPG, PNG, WEBP — max 2MB</div>
                    </div>
                  ) : (
                    <div className="ac-upload has-img">
                      <div className="ac-img-wrap">
                        <img src={schoolIdPreview} alt="School ID preview" className="ac-img-preview" />
                        <button type="button" className="ac-img-remove" onClick={removeSchoolIdImage}>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <button type="submit" className="ac-btn" disabled={loading}>
                  {loading ? <><div className="ac-spinner" /> Creating Account…</> : "Create Account"}
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
