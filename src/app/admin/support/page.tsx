"use client";

import React from "react";
// 🚀 Dito natin kinukuha yung ginawa mong Chat Component
import AdminChat from "./AdminChat"; 

export default function AdminSupportPage() {
  return (
    <div className="p-8 fadeUp">
      {/* HEADER SECTION */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-1">Student Support Center</h1>
        <p className="text-sm text-gray-500">
          Manage and respond to student concerns, book requests, and live chats in real-time.
        </p>
      </div>

      {/* 🚀 TATAWAGIN ANG CHAT UI DITO */}
      <AdminChat />
      
    </div>
  );
}