"use client";

import { api } from "@/lib/api";
import { useState, useEffect, useRef } from "react";
import FloatingInput from "@/components/ui/FloatingInput";
import { IconSearch, IconX, IconDownload, IconLogo } from "@/components/icons";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
  Title, Tooltip, Legend, Filler
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, ChartDataLabels);

export default function AdminAnalyticsPage() {
  const [viewMode, setViewMode] = useState<"daily" | "monthly" | "yearly">("monthly");
  const [fromTimeRange, setFromTimeRange] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), 0, 1);
  });
  const [toTimeRange, setToTimeRange] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), 11, 31);
  });

  const formatDate = (date: Date) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("Highest %");
  const [showReport, setShowReport] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [adminName, setAdminName] = useState("Administrator");

  const [stats, setStats] = useState([
    { label: "Total Books", value: "0" },
    { label: "Active Borrows", value: "0" },
    { label: "Total Students", value: "0" },
  ]);
  const [monthlyData, setMonthlyData] = useState<{ m: string; val: number }[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [topBooks, setTopBooks] = useState<any[]>([]);
  const [topBooksModalOpen, setTopBooksModalOpen] = useState(false);
  const [topBooksSearch, setTopBooksSearch] = useState("");
  const reportRef = useRef<HTMLDivElement>(null);
  const [chartLoading, setChartLoading] = useState(false);
  const viewModeChanging = useRef(false);

  useEffect(() => {
    const userStr = localStorage.getItem("smartLib_user") || localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user.firstname) setAdminName(`${user.firstname} ${user.lastname}`);
    }
  }, []);

  useEffect(() => {
    if (viewModeChanging.current) {
    viewModeChanging.current = false; // reset
    return;
  }
    const fetchStats = async () => {
      setLoading(true);
      try {
        const from = formatDate(fromTimeRange);
        const to = formatDate(toTimeRange);
        const json = await api.get(`/api/admin/analytics-full?from=${from}&to=${to}&view=monthly`);
        if (json.isSuccess && json.data) {
          const { totalBooks, activeBorrows, totalStudents, categories, top } = json.data;
          setStats([
            { label: "Total Books", value: totalBooks?.toString() || "0" },
            { label: "Active Borrows", value: activeBorrows?.toString() || "0" },
            { label: "Total Students", value: totalStudents?.toString() || "0" },
          ]);
          setCategoryData(categories || []);
          setTopBooks(top || []);
        }
      } catch (err) {
        console.error("Failed to load stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [fromTimeRange, toTimeRange]);


  useEffect(() => {
    const fetchChart = async () => {
      setChartLoading(true);
      try {
        const from = formatDate(fromTimeRange);
        const to = formatDate(toTimeRange);
        const json = await api.get(`/api/admin/analytics-full?from=${from}&to=${to}&view=${viewMode}`);
        if (json.isSuccess && json.data) {
          setMonthlyData(json.data.monthly || []);
        }
      } catch (err) {
        console.error("Failed to load chart:", err);
      } finally {
        setChartLoading(false);
      }
    };
    fetchChart();
  }, [fromTimeRange, toTimeRange, viewMode]);

useEffect(() => {
  const now = new Date();
  viewModeChanging.current = true; // flag before updating dates
  if (viewMode === "daily") {
    const from = new Date();
    from.setDate(now.getDate() - 19);
    setFromTimeRange(from);
    setToTimeRange(now);
  } else if (viewMode === "monthly") {
    setFromTimeRange(new Date(now.getFullYear(), 0, 1));
    setToTimeRange(new Date(now.getFullYear(), 11, 31));
  } else if (viewMode === "yearly") {
    setFromTimeRange(new Date(now.getFullYear() - 4, 0, 1));
    setToTimeRange(new Date(now.getFullYear(), 11, 31));
  }
}, [viewMode]);

  const filteredCategories = [...categoryData]
    .filter((c) => c.cat.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortType === "Highest %") return b.pct - a.pct;
      if (sortType === "Lowest %") return a.pct - b.pct;
      if (sortType === "A–Z") return a.cat.localeCompare(b.cat);
      if (sortType === "Z–A") return b.cat.localeCompare(a.cat);
      return 0;
    });

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowReport(true);
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <style>{`
        @keyframes growUp { from { height: 0; opacity: 0; } to { opacity: 1; } }
        @keyframes growRight { from { width: 0; opacity: 0; } to { opacity: 1; } }
        @keyframes growBar { from { width: 0; } }
        @keyframes modalIn { from { opacity: 0; transform: scale(0.95) translateY(12px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        .bar-hover:hover { opacity: 0.8; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media print {
          .overlay {
            background: white !important;
            overflow: visible !important;
            padding: 0 !important;
          }

          body * {
            visibility: hidden;
          }

          .report-modal-content,
          .report-modal-content * {
            visibility: visible;
          }

          .report-modal-content {
            position: absolute;
            left: 0;
            top: 0;
          }
          @page { margin: 0; size: A4 portrait; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          .dashboard-container, aside, nav, header, .sidebar, .no-print { display: none !important; }
          html, body, #root, #__next, .app, .page-layout, main {
            background: #fff !important; height: auto !important; overflow: visible !important; position: static !important; padding: 0 !important; margin: 0 !important;
          }
          .report-modal-content { box-shadow: none !important; border: none !important; border-radius: 0 !important; max-width: 100% !important; width: 100% !important; margin: 0 !important; padding: 15mm !important; }
          .print-avoid-break { page-break-inside: auto; }
        }
      `}</style>

        <div className="dashboard-container page-layout fadeUp">
          <div style={{ padding: "22px 36px", background: "#ffffff", border: "1px solid var(--color-border)", borderRadius: "10px"}}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "30px", borderBottom: "1px solid var(--color-border)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div className="page-header">Data Analytics</div>
                  <div className="page-sub">System overview and borrowing trends</div>
                  <button className="btn w-auto py-2 px-2" onClick={handleGenerateReport}>
                    {isGenerating ? "Generating..." : "View Full Report"}
                  </button>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "right", marginBottom: "20px", alignItems: "flex-end" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p className="badge badge-green text-right mb-2">Show Data</p>
                  {/* Date Range */}
                  <div style={{ display: "flex", gap: "5px" }}>
                      <FloatingInput label="From" type="date" placeholder=" " value={formatDate(fromTimeRange)} onChange={(e) => setFromTimeRange(new Date(e.target.value))}/>
                      <FloatingInput label="To" type="date" placeholder=" " value={formatDate(toTimeRange)} onChange={(e) => setToTimeRange(new Date(e.target.value))}/>
                  </div>
                </div>
              </div>
            </div>

          {loading ? (
            <div style={{ padding: 100, textAlign: "center", color: "#1a2744" }}>
              <div style={{ width: 30, height: 30, border: "3px solid #1a274433", borderTopColor: "#1a2744", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
              Analyzing library data...
            </div>
          ) : (
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
                {stats.map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                    <div className="sum-card" style={{ flex: 1 }}>
                      <div className="sum-label">{s.label}</div>
                      <div className="sum-num">{s.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24, alignItems: "start" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

                  {/* ── LINE CHART ── */}
                  <div style={{ background: "#fff", borderRadius: 10, border: "1px solid var(--color-border)", padding: "24px" }}>
                    <div style={{ display:"flex", justifyContent:"space-between" }}>
                      <div className="page-header" style={{ fontSize: 16, marginBottom: 24 }}>
                        Books Borrowed ({viewMode.charAt(0).toUpperCase() + viewMode.slice(1)})
                      </div>
                      <select className="pills" value={viewMode}onChange={(e) =>setViewMode(e.target.value as "daily" | "monthly" | "yearly")}>
                        <option value="daily">Daily</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                      </select>
                    </div>
                    <div style={{ height: 300, position: "relative" }}>
                      {chartLoading ? (
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                          <div style={{ width: 24, height: 24, border: "3px solid rgba(27,94,53,0.2)", borderTopColor: "#1B5E35", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
                        </div>
                      ) : (
                        <Line
                          data={{
                            labels: monthlyData.map(d => d.m),
                            datasets: [{
                              label: "Borrowed",
                              data: monthlyData.map(d => d.val),
                              borderColor: "#1B5E35",
                              backgroundColor: "rgba(27,94,53,0.08)",
                              tension: 0.4,
                              fill: false,
                              pointBackgroundColor: "#1B5E35",
                              pointRadius: monthlyData.length > 60 ? 0 : 4,
                            }],
                          }}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: { legend: { display: false },
                            datalabels: { display: false } },
                            scales: {
                              x: { ticks: { color: "#7a9e87" }, grid: { color: "rgba(0,0,0,0.04)" } },
                              y: { beginAtZero: true, grace: "15%", ticks: { color: "#7a9e87", precision: 0 }, grid: { color: "rgba(0,0,0,0.04)" } },
                            },
                          }}
                        />
                      )}
                    </div>
                  </div>

                </div>

                {/* ── CATEGORIES ── */}
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  <div style={{ background: "#fff", borderRadius: 10, border: "1px solid var(--color-border)", padding: "24px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                      <span className="page-header" style={{ fontSize: 16 }}>Top Borrowed Categories</span>
                      <button onClick={() => setModalOpen(true)} className="btn px-2 py-1 text-xs w-auto" style={{ borderRadius:"5px" }}>View All</button>
                    </div>
                    {categoryData.length === 0 ? (
                      <div className="page-sub text-center">No data for selected range.</div>
                    ) : categoryData.slice(0, 5).map((c, i) => (
                      <div key={i} style={{ marginBottom: 16 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                          <span className="page-text text-sm">{c.cat}</span>
                          <span className="badge p-0" style={{ color: "var(--color-primary)" }}>{c.pct}%</span>
                        </div>
                        <div style={{ width: "100%", height: 8, background: "var(--color-surface-hover)", borderRadius: 4, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${c.pct}%`, background: "var(--color-primary)", animation: `growRight .6s ease forwards ${i * 0.1}s`, transformOrigin: "left" }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* ── TOP BOOKS ── */}
                  <div style={{ background: "#fff", borderRadius: 10, border: "1px solid var(--color-border)", padding: "24px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                      <div className="page-header" style={{ fontSize: 16 }}>Most Popular Books</div>
                      {topBooks.length > 5 && (
                        <button onClick={() => setTopBooksModalOpen(true)} className="btn px-2 py-1 text-xs w-auto" style={{ borderRadius: "5px" }}>View All</button>
                      )}
                    </div>
                    <div style={{ display: "grid", gap: 8 }}>
                      {topBooks.length === 0 ? (
                        <div className="page-sub text-center">No data for selected range.</div>
                      ) : topBooks.slice(0, 5).map((b, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", background: "var(--color-surface)", borderRadius: 10 }}>
                          <div>
                            <div className="page-text text-sm">{b.title}</div>
                            <div className="page-sub m-0 text-xs">ISBN {b.isbn}</div>
                          </div>
                          <div className="badge badge-green">{b.borrows} {b.borrows === 1 ? "Borrow" : "Borrows"}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        
      </div>
      </div>

      {/* ── VIEW ALL CATEGORIES MODAL ── */}
      {modalOpen && (
        <div className="overlay" onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}>
          <div className="modal">
            <div className="modal-header">
                <button className="close" onClick={() => setModalOpen(false)}><IconX/></button>
            </div>
            <div className="modal-scroll">
              <div style={{ textAlign: "center" }}>
                <div className="page-header text-xl">All Borrowed Categories</div>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", padding: "20px 0px", borderBottom: "1px solid var(--color-border)" }}>
                <div className="search-wrapper">
                    <IconSearch/><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search"/>
                </div>
                <select className="pills" value={sortType} onChange={(e) => setSortType(e.target.value)}>
                  {["Highest %", "Lowest %", "A–Z", "Z–A"].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {filteredCategories.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 0", color: "#94a3b8" }}>No categories found.</div>
              ) : filteredCategories.map((c, i) => (
                <div key={i} style={{ padding: "10px 8px", borderRadius: 8, marginBottom: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <span className="page-text text-sm" style={{ display: "flex", alignItems: "center", gap: 8 }}>{c.cat}</span>
                    <span className="badge p-0" style={{ color: "var(--color-primary)" }}>{c.pct}%</span>
                  </div>
                  <div style={{ height: 7, background: "var(--color-surface-hover)", borderRadius: 99, overflow: "hidden" }}>
                    <div style={{ height: "100%", background: "var(--color-primary)", width: `${c.pct}%`, animation: "growBar 0.7s ease both" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── VIEW ALL TOP BOOKS MODAL ── */}
      {topBooksModalOpen && (
        <div className="overlay" onClick={(e) => e.target === e.currentTarget && setTopBooksModalOpen(false)}>
          <div className="modal">
            <div className="modal-header">
                <button className="close" onClick={() => setTopBooksModalOpen(false)}><IconX/></button>
            </div>
            <div className="modal-scroll">
              <div style={{ textAlign: "center" }}>
                <div className="page-header text-xl">All Borrowed Books</div>
              </div>
              <div style={{ padding: "20px 0px", borderBottom: "1px solid var(--color-border)" }}>
                <div className="search-wrapper w-full max-w-150">
                    <IconSearch/><input value={topBooksSearch} onChange={(e) => setTopBooksSearch(e.target.value)} placeholder="Search"/>
                </div>
              </div>
              <div style={{ flex: 1, overflowY: "auto", padding: "20px 0px", display: "grid", gap: 8 }}>
                {topBooks
                  .filter(b => b.title.toLowerCase().includes(topBooksSearch.toLowerCase()) || b.isbn.toLowerCase().includes(topBooksSearch.toLowerCase()))
                  .map((b, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", background: "var(--color-surface)", borderRadius: 10 }}>
                      <div style={{ textAlign:"left" }}>
                        <div className="page-text text-sm">{b.title}</div>
                        <div className="page-sub m-0 text-xs">ISBN {b.isbn}</div>
                      </div>
                      <div className="badge badge-green">{b.borrows} {b.borrows === 1 ? "Borrow" : "Borrows"}</div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── PRINT REPORT MODAL ── */}
      {showReport && (
        <div className="overlay" style={{ background: "var(--color-success-bg)", display: "flex", justifyContent: "center", alignItems: "flex-start", overflowY: "auto", padding: "40px 20px" }}>
          <div className="report-modal-content" ref={reportRef} style={{ background: "#fff", width: "210mm", padding: "15mm", boxSizing: "border-box", position: "relative", boxShadow: "0 15px 50px rgba(0,0,0,0.2)", margin: "0 auto" }}>
            <div style={{ display: "flex", gap: 10, marginBottom: 16 }} className="no-print">
              <button className="close" onClick={() => setShowReport(false)}><IconX /></button>
              <button className="close" style={{ right:"60px" }} onClick={handlePrint}><IconDownload /></button>
            </div>

            <div style={{ borderBottom: "2px solid var(--color-border)", paddingBottom:5, marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div style={{ display:"flex", alignItems:"center" }}>
                <IconLogo style={{ width: "18px", height: "18px", color: "var(--color-primary)", marginRight:"5px" }}/>
                <div className="smartlib-logo" style={{ fontSize: "15px" }}>SmartLib</div>
              </div>

              <div className="smartlib-sub" style={{ fontSize: '13px' }}>Analytics Report</div>
              <div className="smartlib-sub" style={{ fontSize: '13px', textAlign: "right" }}><strong>Period:</strong> {formatDate(fromTimeRange)} → {formatDate(toTimeRange)}</div>
            </div>

            <div className="print-avoid-break" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 15, borderBottom: "1px solid var(--color-border)", paddingBottom: 20, marginBottom: 20 }}>
              {stats.map((s, i) => (
                <div key={i} className="sum-card">
                  <div className="sum-label">{s.label}</div>
                  <div className="sum-num text-2xl">{s.value}</div>
                </div>
              ))}
            </div>
<div
  className="print-avoid-break"
  style={{
    marginBottom: 20,
    border: "1px solid var(--color-border)",
    borderRadius: 10,
    padding: 20,
  }}
>
  <div
    className="page-header"
    style={{
      fontSize: 16,
      marginBottom: 16,
    }}
  >
    Books Borrowed ({viewMode.charAt(0).toUpperCase() + viewMode.slice(1)})
  </div>

  <div style={{ height: 280 }}>
    <Line
      data={{
        labels: monthlyData.map((d) => d.m),
        datasets: [
          {
            label: "Borrowed",
            data: monthlyData.map((d) => d.val),
            borderColor: "#1B5E35",
            backgroundColor: "rgba(27,94,53,0.08)",
            tension: 0.4,
            fill: false,
            pointBackgroundColor: "#1B5E35",
            pointRadius: monthlyData.length > 60 ? 0 : 4,
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
    datalabels: {
      color: "#1B5E35",
      anchor: "end",
      align: "top",
      font: {
        size: 10,
        weight: "bold",
      },
      formatter: (value: number) => value,
    },
        },
        scales: {
          x: {
            ticks: { color: "#7a9e87" },
            grid: { color: "rgba(0,0,0,0.04)" },
          },
          y: {
            beginAtZero: true,
            grace: "15%",
            ticks: {
              color: "#7a9e87",
              precision: 0,
            },
            grid: {
              color: "rgba(0,0,0,0.04)",
            },
          },
        },
      }}
    />
  </div>
</div>
            <div className="print-avoid-break" style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems:"stretch" }}>
              <div style={{ flex: "1.5 1 250px", display:"flex" }}>
                <table style={{ width: "100%", height:"100%", borderCollapse: "separate", borderSpacing:0, fontSize: 12, border:"1px solid var(--color-border)", borderRadius:"10px", overflow:"hidden" }}>
                  <thead>
                    <tr style={{ background: "var(--color-surface)", textAlign: "left" }}>
                      <th className="text-primary text-xs" style={{ padding: "10px", borderBottom: "2px solid var(--color-border)" }}>Book</th>
                      <th className="text-primary text-xs" style={{ padding: "10px", borderBottom: "2px solid var(--color-border)", textAlign: "center" }}>Borrows</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topBooks.length > 0 ? topBooks.map((b, i) => (
                      <tr key={i}>
                        <td className="page-text text-xs" style={{ padding: "10px", borderBottom: "1px solid var(--color-border)" }}>
                          {b.title}<br /><span className="page-sub m-0 text-xs">{b.isbn}</span>
                        </td>
                        <td className="page-text text-xs" style={{ padding: "10px", textAlign: "center", borderBottom: "1px solid var(--color-border)" }}>{b.borrows}</td>
                      </tr>
                    )) : <tr><td colSpan={2} style={{ padding: "10px", textAlign: "center", color: "#64748b" }}>No data available.</td></tr>}
                  </tbody>
                </table>
              </div>

              <div style={{ flex: "1 1 250px", display:"flex" }}>
                <table style={{ width: "100%", height: "100%", borderCollapse: "separate", borderSpacing:0, fontSize: 12, border:"1px solid var(--color-border)", borderRadius:"10px", overflow:"hidden" }}>
                  <thead>
                    <tr style={{ background: "var(--color-surface)", textAlign: "left" }}>
                      <th className="text-primary text-xs" style={{ padding: "10px", borderBottom: "2px solid var(--color-border)" }}>Category</th>
                      <th className="text-primary text-xs" style={{ padding: "10px", borderBottom: "2px solid var(--color-border)", textAlign:"center" }}>%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryData.length > 0 ? categoryData.map((c, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #e2e8f0" }}>
                        <td className="page-text text-xs" style={{ padding: "10px", borderBottom: "1px solid var(--color-border)" }}>{c.cat}</td>
                        <td className="page-text text-xs" style={{ padding: "10px", textAlign: "center", borderBottom: "1px solid var(--color-border)" }}>{c.pct}%</td>
                      </tr>
                    )) : <tr><td colSpan={2} style={{ padding: "10px", textAlign: "center", color: "#64748b" }}>No data available.</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>

            <div style={{ marginTop: 30, borderTop: "2px solid var(--color-border)", paddingTop: 15, display: "flex", justifyContent: "space-between", fontSize: 10, color: "#94a3b8" }}>
              <div><strong>Staff:</strong> {adminName}</div>
              <div><strong>Date:</strong> {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}