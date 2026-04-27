"use client";

import React, { useState } from "react";
import Link from "next/link";
import FloatingInput from "@/components/ui/FloatingInput";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ForgotPasswordPage() {
  const [form, setForm] = useState({
    identifier: "",
  });

  const [ui, setUi] = useState({
    error: "",
    success: "",
    loading: false,
  });

  const setUI = (fields: Partial<typeof ui>) =>
    setUi(prev => ({ ...prev, ...fields }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUI({ error: "", success: "", loading: true });
    try {
      const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: form.identifier }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Something went wrong");
      setUI({ success: json.message });
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
          <div className="field mt-4">
            <FloatingInput
              label="Email Address / Student ID"
              type="text"
              value={form.identifier}
              onChange={e => setForm(prev => ({ ...prev, identifier: e.target.value }))}
              required
            />
          </div>
          <button type="submit" className="btn" disabled={ui.loading}>
            {ui.loading ? <><div className="spinner" /> Sending…</> : "Send Reset Link"}
          </button>
        </form>

        <Link href="/" className="hyperlink text-center mt-4">← Back to Sign In</Link>
      </div>
    </div>
  );
}