"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirm: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add your registration logic
    console.log("Register:", form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0C1A36] p-6">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">
        
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-gray-600 text-sm">
            Register to access the library portal
          </p>
        </div>

        {/* Tabs */}
        <div className="flex mb-8 border rounded-xl overflow-hidden">
          <a
            href="/login"
            className="w-1/2 text-center py-3 bg-gray-100 text-gray-600"
          >
            Sign In
          </a>
          <div className="w-1/2 text-center py-3 bg-white font-semibold">
            Register
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-semibold">EMAIL ADDRESS</label>
            <input
              type="email"
              name="email"
              className="w-full mt-1 px-4 py-3 border rounded-lg bg-gray-50"
              placeholder="student@university.edu"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold">PASSWORD</label>
            <input
              type="password"
              name="password"
              className="w-full mt-1 px-4 py-3 border rounded-lg bg-gray-50"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold">CONFIRM PASSWORD</label>
            <input
              type="password"
              name="confirm"
              className="w-full mt-1 px-4 py-3 border rounded-lg bg-gray-50"
              placeholder="••••••••"
              value={form.confirm}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#0C1A36] text-white py-3 rounded-lg font-semibold mt-4"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}