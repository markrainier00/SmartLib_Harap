"use client";

import React, { useState } from "react";
import Link from "next/link"; 

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ForgotPasswordPage() {
  // Field
  const [identifier, setIdentifier] = useState("");

  // UI state
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Something went wrong");
      setSuccess(json.message);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

      <div className="auth-card">
        <div className="flex flex-col items-center">
          <div className="brand-name">SmartLib</div>
          <div className="brand-sub">Student Library Management Portal</div>
        </div>

        {error && <div className="alert-error">{error}</div>}
        {success && <div className="alert-success">{success}</div>}

        <p className="text-xs text-[#8a8ea8] mb-4">Enter your email or student ID to receive a reset link.</p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Email Address / Student ID</label>
            <input type="text" placeholder="student@university.edu or 2024-00123" value={identifier} onChange={(e) => setIdentifier(e.target.value)} required />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <Link href="/" className="text-xs text-center text-[#8a8ea8] mt-4 hover:text-[#1a2744] transition-colors">← Back to Sign In</Link>
      </div>
    </div>
  );
}