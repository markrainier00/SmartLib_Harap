"use client";

import React, { useState, useEffect } from "react";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement,
  Title, Tooltip, Legend, ArcElement, Filler
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement, Filler);

export default function SuperAdminAnalytics() {
  // 🚀 1. GINAWA NATING STATE PARA HUMIGOP SA DATABASE
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBorrows: 0,
    activeStudents: 0,
    overdueBooks: 0,
    topBooks: [] as any[],
    monthlyBorrows: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    courseBorrows: [0, 0, 0, 0, 0, 0]
  });

  // 🚀 2. TATAWAG TAYO SA GO API MO
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/admin/analytics-full");
        const json = await res.json();
        if (json.isSuccess && json.data) {
          setStats({
            totalBorrows: json.data.total_borrows || 0,
            activeStudents: json.data.active_students || 0,
            overdueBooks: json.data.overdue_books || 0,
            topBooks: json.data.top_books || [],
            monthlyBorrows: json.data.monthly_borrows || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            courseBorrows: json.data.course_borrows || [0, 0, 0, 0, 0, 0]
          });
        }
      } catch (error) {
        console.error("Failed to fetch analytics", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const maxBookCount = stats.topBooks.length > 0 ? stats.topBooks[0].count : 1;
  const rankColors = ['#fef9c3', '#f1f5f9', '#fff7ed'];
  const rankTextColors = ['#d4840a', '#64748b', '#c2410c'];

  const globalChartOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: '#7a9e87', font: { family: 'Plus Jakarta Sans' } } } }, scales: { x: { ticks: { color: '#7a9e87' }, grid: { color: 'rgba(0,0,0,0.04)' } }, y: { ticks: { color: '#7a9e87' }, grid: { color: 'rgba(0,0,0,0.04)' } } } };
  
  const donutData = { labels: ['Technology', 'Science', 'Literature', 'Math', 'Business', 'Others'], datasets: [{ data: [892, 748, 521, 612, 489, 240], backgroundColor: ['#2a7040', '#1a4fa0', '#7c3aed', '#d97706', '#0891b2', '#94a3b8'], borderWidth: 2, borderColor: '#ffffff' }] };
  
  // 🚀 3. IPAPASOK NATIN ANG DATA SA MGA CHARTS MO
  const monthlyBarData = { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], datasets: [{ label: 'Books Borrowed', data: stats.monthlyBorrows, backgroundColor: 'rgba(42,112,64,0.75)', borderRadius: 5 }] };
  const studentsLineData = { labels: ['Jan', 'Feb', 'Mar'], datasets: [{ label: 'Active Students', data: [980, 1120, stats.activeStudents], borderColor: '#7c3aed', backgroundColor: 'rgba(124,58,237,0.08)', tension: 0.4, fill: true, pointBackgroundColor: '#7c3aed', pointRadius: 5 }] };
  const courseBarData = { labels: ['BSIT', 'BSCS', 'BSBA', 'BSED', 'BSN', 'BSCE'], datasets: [{ label: 'Borrows', data: stats.courseBorrows, backgroundColor: ['#2a7040', '#0891b2', '#7c3aed', '#d97706', '#1a4fa0', '#dc2626'], borderRadius: 5 }] };

  if (loading) return <div style={{ padding: 40, textAlign: "center", color: "#8a8ea8" }}>Loading analytics data...</div>;

  return (
  <>
  <div className="app">
    <div className="page-layout fadeUp">
      <div className="page-title">Data Analytics</div>
      <div className="page-sub">Borrowing insights, active students, and collection performance</div>
      
      {/* 🚀 4. MGA CARDS SA TAAS (LIVE NA YUNG NUMERO DITO) */}
      <div className="sa-m-cards">
        <div className="sa-m-card"><div className="sa-m-icon" style={{ background: "#dbeafe" }}>📈</div><div><div className="sa-m-val">{stats.totalBorrows}</div><div className="sa-m-lbl">Total Borrows This Year</div></div></div>
        <div className="sa-m-card"><div className="sa-m-icon" style={{ background: "#dcfce7" }}>👨‍🎓</div><div><div className="sa-m-val">{stats.activeStudents}</div><div className="sa-m-lbl">Active Students This Month</div></div></div>
        <div className="sa-m-card"><div className="sa-m-icon" style={{ background: "#fee2e2" }}>⚠️</div><div><div className="sa-m-val">{stats.overdueBooks}</div><div className="sa-m-lbl">Overdue Books</div></div></div>
      </div>
      
      <div className="sa-a-grid">
        <div className="sa-card">
          <div className="sa-card-header">
            <div><div className="sa-card-title">Most Borrowed Books</div><div className="sa-card-sub">Ranked by borrow count</div></div>
            <div style={{ display: "flex", gap: "6px" }}><select className="sa-sel" aria-label="Filter Year" title="Filter Year"><option>2025</option><option>2024</option></select><select className="sa-sel" aria-label="Filter Course" title="Filter Course"><option value="">All Courses</option><option>BSIT</option><option>BSCS</option></select></div>
          </div>
          <div className="sa-top-books">
            {stats.topBooks.length === 0 ? <div style={{padding: 20, textAlign: "center", color: "#8a8ea8"}}>No book data available yet.</div> : 
              stats.topBooks.map((b, i) => (
              <div className="sa-tb-item" key={i}>
                <div className="sa-rank" style={{ background: rankColors[i] || 'var(--border)', color: rankTextColors[i] || 'var(--text2)' }}>{i + 1}</div>
                <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: "12.5px", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{b.title}</div><div style={{ fontSize: "11px", color: "var(--text3)", marginTop: "1px" }}>{b.author} · {b.cat}</div><div className="sa-bar-wrap"><div className="sa-bar-fill" style={{ width: `${(b.count / maxBookCount) * 100}%` }}></div></div></div>
                <div className="sa-tb-count">{b.count}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="sa-card">
          <div className="sa-card-header"><div><div className="sa-card-title">By Category</div><div className="sa-card-sub">Current academic year</div></div></div>
          <div style={{ position: "relative", height: "300px", width: "100%", marginTop: "20px" }}><Doughnut data={donutData} options={{ maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { color: '#4a6455' } } } }} /></div>
        </div>
        <div className="sa-card sa-a-full">
          <div className="sa-card-header"><div><div className="sa-card-title">Monthly Borrowing Count</div><div className="sa-card-sub">Month-by-month borrow trends</div></div><select className="sa-sel" aria-label="Filter Year" title="Filter Year"><option>2025</option><option>2024</option></select></div>
          <div style={{ position: "relative", height: "220px", width: "100%" }}><Bar data={monthlyBarData} options={globalChartOptions} /></div>
        </div>
        <div className="sa-card"><div className="sa-card-header"><div><div className="sa-card-title">Active Students Count</div><div className="sa-card-sub">Students who borrowed at least once</div></div></div><div style={{ position: "relative", height: "240px", width: "100%" }}><Line data={studentsLineData} options={globalChartOptions} /></div></div>
        <div className="sa-card"><div className="sa-card-header"><div><div className="sa-card-title">Borrows by Course</div><div className="sa-card-sub">Which departments borrow most</div></div></div><div style={{ position: "relative", height: "240px", width: "100%" }}><Bar data={courseBarData} options={{ ...globalChartOptions, indexAxis: 'y' }} /></div></div>
      </div>
    </div>
    </div>
    </>
  );
}