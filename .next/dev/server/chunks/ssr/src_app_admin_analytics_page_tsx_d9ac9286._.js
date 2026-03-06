module.exports = [
"[project]/src/app/admin/analytics/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminAnalyticsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
/* ─── MOCK DATA ────────────────────────────────────────── */ const STATS = [
    {
        label: "Total Books",
        value: "2,451",
        trend: "+12%",
        isUp: true,
        color: "#3d8bef",
        bg: "#e8f1fd",
        icon: "📚"
    },
    {
        label: "Active Borrows",
        value: "184",
        trend: "+5%",
        isUp: true,
        color: "#4caf6e",
        bg: "#e6f7ec",
        icon: "📖"
    },
    {
        label: "Overdue Books",
        value: "12",
        trend: "-2%",
        isUp: false,
        color: "#c94040",
        bg: "#fdeaea",
        icon: "⚠️"
    },
    {
        label: "Total Students",
        value: "892",
        trend: "+24",
        isUp: true,
        color: "#7c3aed",
        bg: "#f3e8ff",
        icon: "👥"
    }
];
const MONTHLY_DATA = [
    {
        m: "Jan",
        val: 120
    },
    {
        m: "Feb",
        val: 180
    },
    {
        m: "Mar",
        val: 250
    },
    {
        m: "Apr",
        val: 210
    },
    {
        m: "May",
        val: 150
    },
    {
        m: "Jun",
        val: 90
    },
    {
        m: "Jul",
        val: 110
    },
    {
        m: "Aug",
        val: 300
    },
    {
        m: "Sep",
        val: 280
    },
    {
        m: "Oct",
        val: 220
    },
    {
        m: "Nov",
        val: 190
    },
    {
        m: "Dec",
        val: 160
    }
];
const CATEGORY_DATA = [
    {
        cat: "Computer Science",
        pct: 35,
        color: "#3d8bef"
    },
    {
        cat: "Engineering",
        pct: 25,
        color: "#4caf6e"
    },
    {
        cat: "Business",
        pct: 20,
        color: "#e8a020"
    },
    {
        cat: "Mathematics",
        pct: 12,
        color: "#7c3aed"
    },
    {
        cat: "Others",
        pct: 8,
        color: "#8a8ea8"
    }
];
const TOP_BOOKS = [
    {
        title: "Introduction to Algorithms",
        author: "Cormen et al.",
        borrows: 145,
        emoji: "📘"
    },
    {
        title: "Clean Code",
        author: "Robert C. Martin",
        borrows: 112,
        emoji: "📗"
    },
    {
        title: "Engineering Mechanics",
        author: "R.C. Hibbeler",
        borrows: 98,
        emoji: "📙"
    },
    {
        title: "Calculus: Early Transcendentals",
        author: "James Stewart",
        borrows: 85,
        emoji: "📕"
    },
    {
        title: "Business Law",
        author: "Jane Doe",
        borrows: 64,
        emoji: "📔"
    }
];
/* ─── COMPONENTS ───────────────────────────────────────── */ function Btn({ children, variant = "ghost", onClick, style = {} }) {
    const base = {
        border: "none",
        borderRadius: 10,
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
        transition: "all .18s",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "9px 16px",
        ...style
    };
    const v = {
        navy: {
            background: "#1a2744",
            color: "#fff",
            boxShadow: "0 4px 14px rgba(26,39,68,.22)"
        },
        ghost: {
            background: "#f0ede5",
            color: "#1a2744",
            border: "2px solid #e2dfd6"
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        style: {
            ...base,
            ...v[variant]
        },
        onClick: onClick,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/app/admin/analytics/page.tsx",
        lineNumber: 43,
        columnNumber: 10
    }, this);
}
function AdminAnalyticsPage() {
    const [timeRange, setTimeRange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("This Year");
    const maxBorrow = Math.max(...MONTHLY_DATA.map((d)=>d.val));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            animation: "fadeUp .3s ease",
            paddingBottom: 40
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        @keyframes growUp { from { height: 0; opacity: 0; } to { opacity: 1; } }
        @keyframes growRight { from { width: 0; opacity: 0; } to { opacity: 1; } }
        .bar-hover:hover { opacity: 0.8; }
        .row-hover:hover { background: #f7f5f0; }
      `
            }, void 0, false, {
                fileName: "[project]/src/app/admin/analytics/page.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    marginBottom: 24,
                    flexWrap: "wrap",
                    gap: 12
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontFamily: "'DM Serif Display', serif",
                                    fontSize: 24,
                                    color: "#1a2744"
                                },
                                children: "Data Analytics"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/analytics/page.tsx",
                                lineNumber: 63,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 13,
                                    color: "#8a8ea8",
                                    marginTop: 2
                                },
                                children: "System overview and borrowing trends"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/analytics/page.tsx",
                                lineNumber: 64,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/analytics/page.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: 8
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: timeRange,
                                onChange: (e)=>setTimeRange(e.target.value),
                                style: {
                                    background: "#fff",
                                    border: "2px solid #e2dfd6",
                                    borderRadius: 10,
                                    padding: "8px 14px",
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontSize: 13,
                                    color: "#1a2744",
                                    outline: "none",
                                    cursor: "pointer",
                                    fontWeight: 600
                                },
                                children: [
                                    "This Year",
                                    "Last 6 Months",
                                    "This Month"
                                ].map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        children: t
                                    }, t, false, {
                                        fileName: "[project]/src/app/admin/analytics/page.tsx",
                                        lineNumber: 68,
                                        columnNumber: 68
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/analytics/page.tsx",
                                lineNumber: 67,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Btn, {
                                onClick: ()=>window.print(),
                                children: "🖨️ Export PDF"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/analytics/page.tsx",
                                lineNumber: 70,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/analytics/page.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/analytics/page.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: 16,
                    marginBottom: 24
                },
                children: STATS.map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: "#fff",
                            borderRadius: 16,
                            border: "1px solid #e2dfd6",
                            padding: "20px",
                            boxShadow: "0 2px 12px rgba(26,39,68,.06)",
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 14
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 46,
                                    height: 46,
                                    borderRadius: 12,
                                    background: s.bg,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 22,
                                    flexShrink: 0
                                },
                                children: s.icon
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/analytics/page.tsx",
                                lineNumber: 78,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 12,
                                            color: "#8a8ea8",
                                            fontWeight: 600,
                                            textTransform: "uppercase",
                                            letterSpacing: ".05em",
                                            marginBottom: 6
                                        },
                                        children: s.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/analytics/page.tsx",
                                        lineNumber: 80,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            alignItems: "baseline",
                                            gap: 10
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontFamily: "'DM Serif Display', serif",
                                                    fontSize: 28,
                                                    color: "#1a2744",
                                                    lineHeight: 1
                                                },
                                                children: s.value
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/analytics/page.tsx",
                                                lineNumber: 82,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 12,
                                                    fontWeight: 700,
                                                    color: s.isUp ? "#2d7a4f" : "#c94040",
                                                    background: s.isUp ? "#e6f7ec" : "#fdeaea",
                                                    padding: "2px 6px",
                                                    borderRadius: 6
                                                },
                                                children: [
                                                    s.isUp ? "↑" : "↓",
                                                    " ",
                                                    s.trend
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/admin/analytics/page.tsx",
                                                lineNumber: 83,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/admin/analytics/page.tsx",
                                        lineNumber: 81,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/analytics/page.tsx",
                                lineNumber: 79,
                                columnNumber: 13
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/src/app/admin/analytics/page.tsx",
                        lineNumber: 77,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/admin/analytics/page.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr",
                    gap: 24,
                    alignItems: "start"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: 24
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: "#fff",
                                    borderRadius: 16,
                                    border: "1px solid #e2dfd6",
                                    padding: "24px",
                                    boxShadow: "0 2px 12px rgba(26,39,68,.06)"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 16,
                                            fontWeight: 700,
                                            color: "#1a2744",
                                            marginBottom: 24,
                                            fontFamily: "'DM Serif Display', serif"
                                        },
                                        children: "Books Borrowed (Monthly)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/analytics/page.tsx",
                                        lineNumber: 99,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            height: 220,
                                            display: "flex",
                                            alignItems: "flex-end",
                                            gap: "2%",
                                            position: "relative",
                                            paddingBottom: 24
                                        },
                                        children: [
                                            [
                                                0,
                                                0.25,
                                                0.5,
                                                0.75,
                                                1
                                            ].map((line, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        position: "absolute",
                                                        bottom: 24 + 196 * line,
                                                        left: 0,
                                                        right: 0,
                                                        borderTop: "1px dashed #e2dfd6",
                                                        zIndex: 0
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            position: "absolute",
                                                            left: -30,
                                                            top: -8,
                                                            fontSize: 10,
                                                            color: "#8a8ea8"
                                                        },
                                                        children: Math.round(maxBorrow * line)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/analytics/page.tsx",
                                                        lineNumber: 105,
                                                        columnNumber: 19
                                                    }, this)
                                                }, i, false, {
                                                    fileName: "[project]/src/app/admin/analytics/page.tsx",
                                                    lineNumber: 104,
                                                    columnNumber: 17
                                                }, this)),
                                            MONTHLY_DATA.map((d, i)=>{
                                                const heightPct = d.val / maxBorrow * 100;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        flex: 1,
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        alignItems: "center",
                                                        gap: 8,
                                                        zIndex: 1
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                width: "100%",
                                                                maxWidth: 36,
                                                                height: 196,
                                                                display: "flex",
                                                                alignItems: "flex-end",
                                                                position: "relative"
                                                            },
                                                            title: `${d.val} borrows`,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "bar-hover",
                                                                style: {
                                                                    width: "100%",
                                                                    height: `${heightPct}%`,
                                                                    background: "linear-gradient(to top, #3d8bef, #7fb8f7)",
                                                                    borderRadius: "6px 6px 0 0",
                                                                    animation: `growUp .5s ease forwards ${i * 0.05}s`,
                                                                    transformOrigin: "bottom",
                                                                    cursor: "pointer",
                                                                    transition: "opacity .15s"
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/admin/analytics/page.tsx",
                                                                lineNumber: 115,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/analytics/page.tsx",
                                                            lineNumber: 114,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontSize: 11,
                                                                color: "#8a8ea8",
                                                                fontWeight: 600
                                                            },
                                                            children: d.m
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/analytics/page.tsx",
                                                            lineNumber: 117,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, i, true, {
                                                    fileName: "[project]/src/app/admin/analytics/page.tsx",
                                                    lineNumber: 113,
                                                    columnNumber: 19
                                                }, this);
                                            })
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/admin/analytics/page.tsx",
                                        lineNumber: 101,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/analytics/page.tsx",
                                lineNumber: 98,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: "#fff",
                                    borderRadius: 16,
                                    border: "1px solid #e2dfd6",
                                    padding: "24px",
                                    boxShadow: "0 2px 12px rgba(26,39,68,.06)"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            marginBottom: 16
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 16,
                                                    fontWeight: 700,
                                                    color: "#1a2744",
                                                    fontFamily: "'DM Serif Display', serif"
                                                },
                                                children: "Most Popular Books"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/analytics/page.tsx",
                                                lineNumber: 127,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Btn, {
                                                style: {
                                                    padding: "5px 10px",
                                                    fontSize: 11
                                                },
                                                children: "View All"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/analytics/page.tsx",
                                                lineNumber: 128,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/admin/analytics/page.tsx",
                                        lineNumber: 126,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "grid",
                                            gap: 8
                                        },
                                        children: TOP_BOOKS.map((b, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "row-hover",
                                                style: {
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "space-between",
                                                    padding: "10px 12px",
                                                    background: "#fcfaf7",
                                                    border: "1px solid #f2efe8",
                                                    borderRadius: 10,
                                                    transition: "background .15s"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: 12
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    fontSize: 20
                                                                },
                                                                children: b.emoji
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/admin/analytics/page.tsx",
                                                                lineNumber: 134,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            fontSize: 13,
                                                                            fontWeight: 700,
                                                                            color: "#1a2744"
                                                                        },
                                                                        children: b.title
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/admin/analytics/page.tsx",
                                                                        lineNumber: 136,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            fontSize: 11,
                                                                            color: "#8a8ea8"
                                                                        },
                                                                        children: b.author
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/admin/analytics/page.tsx",
                                                                        lineNumber: 137,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/admin/analytics/page.tsx",
                                                                lineNumber: 135,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/admin/analytics/page.tsx",
                                                        lineNumber: 133,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: 13,
                                                            fontWeight: 700,
                                                            color: "#3d8bef",
                                                            background: "#e8f1fd",
                                                            padding: "4px 10px",
                                                            borderRadius: 20
                                                        },
                                                        children: [
                                                            b.borrows,
                                                            " Borrows"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/admin/analytics/page.tsx",
                                                        lineNumber: 140,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, i, true, {
                                                fileName: "[project]/src/app/admin/analytics/page.tsx",
                                                lineNumber: 132,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/analytics/page.tsx",
                                        lineNumber: 130,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/analytics/page.tsx",
                                lineNumber: 125,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/analytics/page.tsx",
                        lineNumber: 95,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: 24
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: "#fff",
                                    borderRadius: 16,
                                    border: "1px solid #e2dfd6",
                                    padding: "24px",
                                    boxShadow: "0 2px 12px rgba(26,39,68,.06)"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 16,
                                            fontWeight: 700,
                                            color: "#1a2744",
                                            marginBottom: 20,
                                            fontFamily: "'DM Serif Display', serif"
                                        },
                                        children: "Top Categories"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/analytics/page.tsx",
                                        lineNumber: 155,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 18
                                        },
                                        children: CATEGORY_DATA.map((c, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            marginBottom: 6
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontSize: 13,
                                                                    fontWeight: 600,
                                                                    color: "#1a2744"
                                                                },
                                                                children: c.cat
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/admin/analytics/page.tsx",
                                                                lineNumber: 160,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontSize: 13,
                                                                    fontWeight: 700,
                                                                    color: c.color
                                                                },
                                                                children: [
                                                                    c.pct,
                                                                    "%"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/admin/analytics/page.tsx",
                                                                lineNumber: 161,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/admin/analytics/page.tsx",
                                                        lineNumber: 159,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            width: "100%",
                                                            height: 8,
                                                            background: "#f0ede5",
                                                            borderRadius: 4,
                                                            overflow: "hidden"
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                height: "100%",
                                                                width: `${c.pct}%`,
                                                                background: c.color,
                                                                borderRadius: 4,
                                                                animation: `growRight .6s ease forwards ${i * 0.1}s`,
                                                                transformOrigin: "left"
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/analytics/page.tsx",
                                                            lineNumber: 164,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/analytics/page.tsx",
                                                        lineNumber: 163,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, i, true, {
                                                fileName: "[project]/src/app/admin/analytics/page.tsx",
                                                lineNumber: 158,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/analytics/page.tsx",
                                        lineNumber: 156,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/analytics/page.tsx",
                                lineNumber: 154,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: "linear-gradient(135deg, #1a2744, #2a3d66)",
                                    borderRadius: 16,
                                    padding: "24px",
                                    color: "#fff",
                                    position: "relative",
                                    overflow: "hidden",
                                    boxShadow: "0 8px 24px rgba(26,39,68,.15)"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            position: "absolute",
                                            top: -20,
                                            right: -20,
                                            fontSize: 100,
                                            opacity: 0.1,
                                            pointerEvents: "none"
                                        },
                                        children: "📈"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/analytics/page.tsx",
                                        lineNumber: 173,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 11,
                                            fontWeight: 700,
                                            letterSpacing: ".08em",
                                            textTransform: "uppercase",
                                            color: "#7fb8f7",
                                            marginBottom: 8
                                        },
                                        children: "Weekly Insight"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/analytics/page.tsx",
                                        lineNumber: 174,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontFamily: "'DM Serif Display', serif",
                                            fontSize: 20,
                                            lineHeight: 1.3,
                                            marginBottom: 12
                                        },
                                        children: "Borrowing increased by 15% this week!"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/analytics/page.tsx",
                                        lineNumber: 175,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: 13,
                                            color: "rgba(255,255,255,.7)",
                                            lineHeight: 1.5,
                                            marginBottom: 20
                                        },
                                        children: "Engineering and Computer Science books are driving the most traffic. Make sure to restock high-demand titles."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/analytics/page.tsx",
                                        lineNumber: 176,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        style: {
                                            width: "100%",
                                            background: "#fff",
                                            border: "none",
                                            borderRadius: 10,
                                            padding: "10px",
                                            fontFamily: "'DM Sans', sans-serif",
                                            fontSize: 13,
                                            fontWeight: 700,
                                            color: "#1a2744",
                                            cursor: "pointer",
                                            transition: "opacity .15s"
                                        },
                                        children: "Generate Full Report"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/analytics/page.tsx",
                                        lineNumber: 179,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/analytics/page.tsx",
                                lineNumber: 172,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/analytics/page.tsx",
                        lineNumber: 151,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/analytics/page.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/admin/analytics/page.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_app_admin_analytics_page_tsx_d9ac9286._.js.map