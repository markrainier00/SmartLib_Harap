"use client";

import { api } from "@/lib/api";
import { useUser } from "@/lib/user";
import  { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import FloatingInput from "@/components/ui/FloatingInput";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
  Title, Tooltip, Legend, ArcElement, Filler
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, Filler);

export default function SuperAdminDashboard() {
    const router = useRouter();
    const { firstName, school_id, program } = useUser();

    const [registrations, setRegistrations] = useState(0);
    const [accounts, setAccounts] = useState(0);
    const [library, setLibrary] = useState(0);
    const [borrows, setBorrows] = useState(0);
    const [borrowByDate, setBorrowByDate] = useState({});
    const [historyData, setHistoryData] = useState([]);
    const [bookData, setBookData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [categoryByBorrow, setCategoryByBorrow] = useState({});
    const [deptByBorrow, setDeptByBorrow] = useState({});

    const [viewMode, setViewMode] = useState<"daily" | "monthly" | "yearly">("daily");
    const [fromTimeRange, setFromTimeRange] = useState(() => {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), 1);
    });
    const [toTimeRange, setToTimeRange] = useState(() => {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth() + 1, 0);
    });
    const formatDate = (date) => {
        if (!date) return "";
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingOpen, setIsLoadingOpen] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("Processing...");
    const [isSystemResponseOpen, setSystemResponseOpen] = useState(false);
    const [systemResponse, setSystemResponse] = useState("");

    useEffect(() => {
        const fetchData = async () => {
                setIsLoading(true);
                try {
                    const [registrationRes, accountsRes, bookRes, historyRes] = await Promise.all([
                        api.get(`/api/admin/pendingUsers`),
                        api.get("/api/admin/wholeUsers"),
                        api.get("/api/books/getBooks"),
                        api.get(`/api/transactions/getWholeHistory`),
                    ]);
        
                    if (registrationRes.data) setRegistrations(registrationRes.data.length);
                    if (accountsRes.data) setAccounts(accountsRes.data.length);
                    if (bookRes.data?.length) {
                        const totals = bookRes.data.reduce(
                            (acc, book) => {
                            acc.copies += Number(book.copies) || 0;
                            acc.available += Number(book.available) || 0;
                            return acc;
                            },
                            { copies: 0, available: 0 }
                        );

                        setLibrary(totals.copies);
                        setBorrows(totals.copies - totals.available);
                    }
                    if (historyRes.data?.length) {
                        setHistoryData(historyRes.data);

                        const borrowByDate = historyRes.data.reduce((acc, item) => {
                            if (item.event !== "Borrow") return acc;
                            const date = new Date(item.date).toISOString().split("T")[0];
                            acc[date] = (acc[date] || 0) + 1;
                            return acc;
                        }, {});
                        setBorrowByDate(borrowByDate);
                    }
                    if (bookRes.data?.length) setBookData(bookRes.data);
                    if (accountsRes.data?.length) setUserData(accountsRes.data);
                } catch (err) {
                    console.error("Failed to fetch requests", err);
                } finally {
                    setIsLoading(false);
                }
            };
        fetchData();
    }, []);

    const categoryDonutData = useMemo(() => {
        const from = formatDate(fromTimeRange);
        const to = formatDate(toTimeRange);

        const categoryCount: Record<string, number> = {};

        historyData.forEach(item => {
            if (item.event !== "Borrow") return;

            const date = new Date(item.date).toISOString().split("T")[0];
            if (from && date < from) return;
            if (to && date > to) return;

            const book = bookData.find(b => b.isbn === item.isbn);
            if (!book || !book.category) return;

            book.category.split(",").forEach(cat => {
                const cleanCat = cat.trim();
                if (!cleanCat) return;
                categoryCount[cleanCat] = (categoryCount[cleanCat] ?? 0) + 1;
            });
        });

        const labels = Object.keys(categoryCount);
        const values = labels.map(cat => categoryCount[cat]);
        const colors = ["#2a7040","#1a4fa0","#7c3aed","#d97706","#0891b2","#e11d48","#059669","#b45309","#6366f1","#0284c7"];

        return {
            labels,
            datasets: [{ data: values, backgroundColor: colors.slice(0, labels.length), borderWidth: 2, borderColor: "#ffffff" }],
        };
    }, [historyData, bookData, fromTimeRange, toTimeRange]);

    const deptDonutData = useMemo(() => {
        const from = formatDate(fromTimeRange);
        const to = formatDate(toTimeRange);

        const deptCount: Record<string, number> = {};

        historyData.forEach(item => {
            if (item.event !== "Borrow") return;

            const date = new Date(item.date).toISOString().split("T")[0];
            if (from && date < from) return;
            if (to && date > to) return;

            const user = userData.find(u => u.school_id === item.school_id);
            if (!user || !user.department) return;

            const dept = user.department.trim();
            if (!dept) return;
            deptCount[dept] = (deptCount[dept] ?? 0) + 1;
        });

        const labels = Object.keys(deptCount);
        const values = labels.map(dept => deptCount[dept]);
        const colors = ["#0891b2","#7c3aed","#2a7040","#d97706","#1a4fa0","#e11d48","#059669","#b45309","#6366f1","#0284c7"];

        return {
            labels,
            datasets: [{ data: values, backgroundColor: colors.slice(0, labels.length), borderWidth: 2, borderColor: "#ffffff" }],
        };
    }, [historyData, userData, fromTimeRange, toTimeRange]);
    const borrowLineData = useMemo(() => {
        const from = formatDate(fromTimeRange);
        const to = formatDate(toTimeRange);

        if (!from || !to) return { labels: [], datasets: [] };

        let labels: string[] = [];
        let data: number[] = [];

        if (viewMode === "daily") {
            const allDays: string[] = [];
            const cursor = new Date(fromTimeRange);
            const end = new Date(toTimeRange);

            while (cursor <= end) {
                allDays.push(formatDate(cursor));
                cursor.setDate(cursor.getDate() + 1);
            }

            labels = allDays;
            data = allDays.map(date => borrowByDate[date] ?? 0);

        } else if (viewMode === "monthly") {
            const monthMap: Record<string, number> = {};

            Object.keys(borrowByDate).forEach(date => {
                if (date < from || date > to) return;
                const month = date.slice(0, 7);
                monthMap[month] = (monthMap[month] ?? 0) + borrowByDate[date];
            });

            const cursor = new Date(fromTimeRange.getFullYear(), fromTimeRange.getMonth(), 1);
            const end = new Date(toTimeRange.getFullYear(), toTimeRange.getMonth(), 1);

            while (cursor <= end) {
                const key = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}`;
                labels.push(key);
                data.push(monthMap[key] ?? 0);
                cursor.setMonth(cursor.getMonth() + 1);
            }

        } else if (viewMode === "yearly") {
            const yearMap: Record<string, number> = {};

            Object.keys(borrowByDate).forEach(date => {
                if (date < from || date > to) return;
                const year = date.slice(0, 4);
                yearMap[year] = (yearMap[year] ?? 0) + borrowByDate[date];
            });

            const startYear = fromTimeRange.getFullYear();
            const endYear = toTimeRange.getFullYear();

            for (let y = startYear; y <= endYear; y++) {
                const key = String(y);
                labels.push(key);
                data.push(yearMap[key] ?? 0);
            }
        }

        return {
            labels,
            datasets: [{
                label: "Borrowed",
                data,
                borderColor: "#2a7040",
                backgroundColor: "rgba(42,112,64,0.08)",
                tension: 0.4,
                fill: false,
                pointBackgroundColor: "#2a7040",
                pointRadius: labels.length > 60 ? 0 : 4,
            }],
        };
    }, [borrowByDate, fromTimeRange, toTimeRange, viewMode]);

    const Spinner = () => (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
            <div style={{
                width: "28px", height: "28px",
                border: "3px solid rgba(42,112,64,0.2)",
                borderTop: "3px solid #2a7040",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );

    return (
        <>
            <div className="page-layout fadeUp">
                <div className="hero relative">
                    <div className="page-header text-white">Hello, {firstName}!</div>
                    <p className="page-sub text-white">Here's the overview of library activity and statistics</p>
                    <div className="summary-grid">
                        <div className="sum-card">
                            <div className="sum-num">{isLoading ? <Spinner /> : registrations}</div>
                            <div className="sum-label">Register Request{registrations === 1 ? "" : "s"}</div>
                        </div>
                        <div className="sum-card">
                            <div className="sum-num">{isLoading ? <Spinner /> : accounts}</div>
                            <div className="sum-label">Total Student{accounts === 1 ? "" : "s"}</div>
                        </div>
                        <div className="sum-card">
                            <div className="sum-num">{isLoading ? <Spinner /> : library}</div>
                            <div className="sum-label">Book{library === 1 ? "" : "s"}</div>
                        </div>
                        <div className="sum-card">
                            <div className="sum-num">{isLoading ? <Spinner /> : borrows}</div>
                            <div className="sum-label">Active Borrow{borrows === 1 ? "" : "s"}</div>
                        </div>
                    </div>
                </div>

                <div style={{ padding: "32px 36px", background: "#ffffff", border: "1px solid var(--color-border)", borderRadius: "10px"}}>
                    <div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <p className="page-header">Borrowing Activity</p>
                            <div style={{ display: "flex", justifyContent: "right" }}>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <p className="badge badge-green text-right">Show Data</p>
                                        <div style={{ display: "flex", gap: "5px", marginBottom: "10px" }}>
                                            {(["daily", "monthly", "yearly"] as const).map(mode => (
                                                <button
                                                    key={mode}
                                                    onClick={() => setViewMode(mode)}
                                                    style={{
                                                        flex: 1,
                                                        padding: "4px 10px",
                                                        fontSize: "12px",
                                                        borderRadius: "6px",
                                                        border: "1px solid var(--color-primary)",
                                                        backgroundColor: viewMode === mode ? "var(--color-primary)" : "transparent",
                                                        color: viewMode === mode ? "#ffffff" : "var(--color-primary)",
                                                        cursor: "pointer",
                                                        textTransform: "capitalize",
                                                    }}
                                                >
                                                    {mode}
                                                </button>
                                            ))}
                                        </div>
                                    <div style={{ display: "flex", gap: "5px" }}>
                                        <FloatingInput label="From" type="date" placeholder=" " value={formatDate(fromTimeRange)} onChange={(e) => setFromTimeRange(new Date(e.target.value))}/>
                                        <FloatingInput label="To" type="date" placeholder=" " value={formatDate(toTimeRange)} onChange={(e) => setToTimeRange(new Date(e.target.value))}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%" }}>
                            <div style={{ width: "100%", height: "300px", backgroundColor: "var(--color-surface)", borderRadius: "10px" }}>
                                {isLoading ? <Spinner /> : ( <Line data={borrowLineData} options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: { legend: { display: false } },
                                    scales: { x: { ticks: { color: "#7a9e87" }, grid: { color: "rgba(0,0,0,0.04)" } }, y: { beginAtZero: true, grace: "15%", ticks: { color: "#7a9e87", precision: 0 }, grid: { color: "rgba(0,0,0,0.04)" } } },}}
                                /> )}
                            </div>

                            <div style={{ display: "flex", gap: "16px", width: "100%", flexWrap: "wrap" }}>
                                <div style={{ flex: "1 1 300px", minWidth: 0, borderRadius: "10px", backgroundColor: "var(--color-surface)", padding: "5px" }}>
                                    <p style={{ textAlign: "center", margin: "10px" }}>College Department Distribution of Borrows</p>
                                    <div style={{ maxHeight: "250px" }}>
                                        {isLoading ? <Spinner /> : deptDonutData.labels.length === 0 ? (
                                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "200px", color: "var(--color-subtext)", fontSize: "14px", textAlign: "center" }}>
                                                No borrows at the selected date
                                            </div>
                                        ) : (
                                            <Doughnut
                                                data={deptDonutData}
                                                options={{
                                                    maintainAspectRatio: false,
                                                    plugins: { legend: { position: "bottom", labels: { color: "#4a6455" } } }
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div style={{ flex: "1 1 300px", minWidth: 0, borderRadius: "10px", backgroundColor: "var(--color-surface)", padding: "5px" }}>
                                    <p style={{ textAlign: "center", margin: "10px" }}>Book Categories Distribution of Borrows</p>
                                    <div style={{ maxHeight: "250px" }}>
                                        {isLoading ? <Spinner /> : categoryDonutData.labels.length === 0 ? (
                                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "200px", color: "var(--color-subtext)", fontSize: "14px", textAlign: "center" }}>
                                                No borrows at the selected date
                                            </div>
                                        ) : (
                                            <Doughnut
                                                data={categoryDonutData}
                                                options={{
                                                    maintainAspectRatio: false,
                                                    plugins: { legend: { position: "bottom", labels: { color: "#4a6455" } } }
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}