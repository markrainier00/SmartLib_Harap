"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { IconEye, IconEyeOff } from "@/components/icons";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") ?? "";

  const [form, setForm] = useState({
    password: "",
    confirm: "",
    showPassword: false,
    showConfirm: false,
  });

  const [ui, setUi] = useState({
    error: "",
    success: "",
    loading: false,
  });

  const setForm_ = (fields: Partial<typeof form>) =>
    setForm(prev => ({ ...prev, ...fields }));

  const setUI = (fields: Partial<typeof ui>) =>
    setUi(prev => ({ ...prev, ...fields }));

  useEffect(() => {
    if (!token) router.push("/");
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUI({ error: "", success: "" });

    if (form.password !== form.confirm) {
      setUI({ error: "Passwords do not match" });
      return;
    }

    setUI({ loading: true });
    try {
      const res = await fetch(`${API_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password: form.password }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Reset password failed");
      setUI({ success: json.message });
      setTimeout(() => router.push("/"), 2000);
    } catch (err: any) {
      setUI({ error: err.message });
    } finally {
      setUI({ loading: false });
    }
  };

  return (
    <div className="layout">
      <div className="blob">
        <div className="blob-1"></div>
        <div className="blob-2"></div>
      </div>

      <div className="card">
        <div className="smartlib-logo text-center">SmartLib</div>
        <div className="smartlib-sub text-center mb-5">School Library Management Portal</div>

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

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>New Password</label>
            <div className="input-wrap">
              <input
                type={form.showPassword ? "text" : "password"}
                value={form.password}
                onChange={e => setForm_({ password: e.target.value })}
                required
                minLength={8}
                className="has-icon"
              />
              <button type="button" className="pw-toggle" onClick={() => setForm_({ showPassword: !form.showPassword })}>
                {form.showPassword ? <IconEyeOff /> : <IconEye />}
              </button>
            </div>
          </div>
          <div className="field">
            <label>Confirm Password</label>
            <div className="input-wrap">
              <input
                type={form.showConfirm ? "text" : "password"}
                value={form.confirm}
                onChange={e => setForm_({ confirm: e.target.value })}
                required
                className="has-icon"
              />
              <button type="button" className="pw-toggle" onClick={() => setForm_({ showConfirm: !form.showConfirm })}>
                {form.showConfirm ? <IconEyeOff /> : <IconEye />}
              </button>
            </div>
          </div>
          <button type="submit" className="btn" disabled={ui.loading}>
            {ui.loading ? <><div className="spinner" /> Resetting…</> : "Reset Password"}
          </button>
        </form>

        <Link href="/" className="forgot text-center mt-4">← Back to Sign In</Link>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}