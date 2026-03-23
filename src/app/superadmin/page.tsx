"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
  Title, Tooltip, Legend, ArcElement, Filler
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, Filler);

export default function SuperAdminDashboard() {
  const router = useRouter();

  // 🚀 STATE PARA SA MGA TOTOONG NUMERO
  const [totalStudents, setTotalStudents] = useState(0);
  const [activeBorrows, setActiveBorrows] = useState(0);
  const [availableBooks, setAvailableBooks] = useState(0); 
  const [recentTx, setRecentTx] = useState<any[]>([]);       
  const [returnedBooks, setReturnedBooks] = useState(0); // 🚀 BAGONG STATE PARA SA RETURNED BOOKS

  // 🚀 FETCH DATA MULA SA GO BACKEND
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/users/all");
        const json = await res.json();
        if (json.isSuccess && json.data) {
          const students = json.data.filter((u: any) => u.role === "student");
          setTotalStudents(students.length);
        }
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/admin/stats");
        const json = await res.json();
        if (json.isSuccess && json.data) {
          setActiveBorrows(json.data.active_borrows || 0);
          setAvailableBooks(json.data.total_books || 0); 
          setRecentTx(json.data.recent_tx || []);        
          setReturnedBooks(json.data.returned_books || 0); // 🚀 SINASALO ANG DATA GALING SA DB
        }
      } catch (error) {
        console.error("Failed to fetch stats", error);
      }
    };

    fetchUsers();
    fetchStats();
  }, []);

  const globalChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { labels: { color: "#7a9e87", font: { family: "Plus Jakarta Sans" } } } },
    scales: { x: { ticks: { color: "#7a9e87" }, grid: { color: "rgba(0,0,0,0.04)" } }, y: { ticks: { color: "#7a9e87" }, grid: { color: "rgba(0,0,0,0.04)" } } },
  };

  // Note: Ang mga charts dito ay fallback data muna habang wala pang laman ang DB mo para hindi masyadong blangko tingnan ang UI.
  const borrowLineData = {
    labels: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
    datasets: [
      { label: "Borrowed", data: [620, 780, 520, 910, 840, 1284], borderColor: "#2a7040", backgroundColor: "rgba(42,112,64,0.08)", tension: 0.4, fill: true, pointBackgroundColor: "#2a7040", pointRadius: 4 },
      { label: "Returned", data: [580, 740, 490, 870, 800, 1102], borderColor: "#1a4fa0", backgroundColor: "rgba(26,79,160,0.05)", tension: 0.4, fill: true, pointBackgroundColor: "#1a4fa0", pointRadius: 4 },
    ],
  };

  const categoryDonutData = {
    labels: ["Technology", "Science", "Literature", "Math", "Business"],
    datasets: [{ data: [284, 241, 176, 198, 144], backgroundColor: ["#2a7040", "#1a4fa0", "#7c3aed", "#d97706", "#0891b2"], borderWidth: 2, borderColor: "#ffffff" }],
  };

  return (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
      `}</style>

      <div className="page-title">Dashboard</div>
      <div className="page-sub">Overview of library activity and statistics</div>

      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: "#dbeafe" }}>📖</div>
          <div><div className="stat-value">{activeBorrows}</div><div className="stat-label">Active Borrows</div><div className="stat-delta up">Live Data</div></div>
        </div>
        
        {/* 🚀 BUHAY NA STAT: Books Returned */}
        <div className="stat-card">
          <div className="stat-icon" style={{ background: "#dcfce7" }}>✅</div>
          <div><div className="stat-value">{returnedBooks}</div><div className="stat-label">Books Returned</div><div className="stat-delta up">Live Data</div></div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon" style={{ background: "#ede9fe" }}>🎓</div>
          <div><div className="stat-value">{totalStudents}</div><div className="stat-label">Total Students</div><div className="stat-delta up">Live Data</div></div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon" style={{ background: "#fef9c3" }}>📚</div>
          <div><div className="stat-value">{availableBooks}</div><div className="stat-label">Registered Books</div><div className="stat-delta up">Live Data</div></div>
        </div>
      </div>

      <div className="chart-row">
        <div className="sa-card">
          <div className="sa-card-header">
            <div><div className="sa-card-title">Borrowing Activity</div><div className="sa-card-sub">Borrowed vs Returned — last 6 months</div></div>
            <select className="sa-sel" style={{ width: "auto" }} aria-label="Filter Time Range" title="Filter Time Range">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div style={{ position: "relative", height: "280px", width: "100%" }}>
            <Line data={borrowLineData} options={globalChartOptions} />
          </div>
        </div>
        
        <div className="sa-card">
          <div className="sa-card-header">
            <div><div className="sa-card-title">By Category</div><div className="sa-card-sub">Borrow distribution</div></div>
          </div>
          <div style={{ position: "relative", height: "280px", width: "100%" }}>
            <Doughnut data={categoryDonutData} options={{ maintainAspectRatio: false, plugins: { legend: { position: "bottom", labels: { color: "#4a6455" } } } }} />
          </div>
        </div>
      </div>

      <div className="chart-row2">
        <div className="sa-card">
          <div className="sa-card-header">
            <div className="sa-card-title">Recent Transactions</div>
            <button className="sa-btn sa-btn-ghost sa-btn-sm">View All</button>
          </div>
          <div className="recent-list">
            {recentTx.length === 0 ? (
               <div style={{ padding: 20, textAlign: "center", color: "#8a8ea8" }}>No recent transactions.</div>
            ) : (
              recentTx.map((r, i) => (
                <div className="recent-item" key={i}>
                  <div className="book-ic" style={{ background: r.bg || "#e2e8f0" }}>📗</div>
                  <div className="ri-info"><div className="ri-title">{r.title}</div><div className="ri-meta">{r.student}</div></div>
                  <span className={`pill pill-${r.status}`}>{r.status}</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="sa-card">
          <div className="sa-card-title" style={{ marginBottom: "14px" }}>Quick Actions</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <button onClick={() => router.push("/superadmin/accounts")} className="sa-btn sa-btn-green" style={{ justifyContent: "center", cursor: "pointer" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg> 
              Create Admin Account
            </button>
            <button className="sa-btn sa-btn-ghost" style={{ justifyContent: "center" }}>View Analytics Report</button>
            <button className="sa-btn sa-btn-ghost" style={{ justifyContent: "center" }}>Review Student Concerns</button>
            <button className="sa-btn sa-btn-ghost" style={{ justifyContent: "center" }}>Export Monthly Report</button>
          </div>
          <div className="div"></div>
          <div className="sa-card-title" style={{ fontSize: "13px", marginBottom: "10px" }}>System Status</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "7px", fontSize: "12.5px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "var(--text2)" }}>System Online</span><span style={{ color: "#166534", fontWeight: 600 }}>● Operational</span></div>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "var(--text2)" }}>Database</span><span style={{ fontWeight: 600 }}>Connected</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}