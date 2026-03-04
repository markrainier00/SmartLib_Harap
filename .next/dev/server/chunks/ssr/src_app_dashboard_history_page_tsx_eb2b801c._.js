module.exports = [
"[project]/src/app/dashboard/history/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HistoryPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
// Mock Data mula sa iyong HTML
const HISTORY_DATA = [
    {
        id: 1,
        book: "Data Structures in Java",
        action: "Returned",
        date: "Feb 28, 2026",
        due: "Mar 01, 2026",
        status: "returned"
    },
    {
        id: 2,
        book: "Calculus: Early Transcendentals",
        action: "Borrowed",
        date: "Feb 15, 2026",
        due: "Mar 15, 2026",
        status: "borrowed"
    },
    {
        id: 3,
        book: "Organic Chemistry",
        action: "Reserved",
        date: "Feb 10, 2026",
        due: "—",
        status: "returned"
    },
    {
        id: 4,
        book: "Engineering Mechanics",
        action: "Borrowed",
        date: "Jan 30, 2026",
        due: "Feb 28, 2026",
        status: "overdue"
    },
    {
        id: 5,
        book: "Physics for Scientists",
        action: "Returned",
        date: "Jan 20, 2026",
        due: "Jan 22, 2026",
        status: "returned"
    },
    {
        id: 6,
        book: "Business Law",
        action: "Borrowed",
        date: "Mar 01, 2026",
        due: "Mar 22, 2026",
        status: "borrowed"
    }
];
function HistoryPage() {
    const [histTab, setHistTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("all");
    const filteredHistory = histTab === "all" ? HISTORY_DATA : HISTORY_DATA.filter((h)=>h.status === histTab);
    const stats = [
        {
            label: 'Total',
            val: HISTORY_DATA.length,
            color: '#2563eb'
        },
        {
            label: 'Active',
            val: HISTORY_DATA.filter((h)=>h.status === 'borrowed').length,
            color: '#e8a020'
        },
        {
            label: 'Returned',
            val: HISTORY_DATA.filter((h)=>h.status === 'returned').length,
            color: '#2d7a4f'
        },
        {
            label: 'Overdue',
            val: HISTORY_DATA.filter((h)=>h.status === 'overdue').length,
            color: '#c94040'
        }
    ];
    const icons = {
        Returned: '↩️',
        Borrowed: '📖',
        Reserved: '🔖'
    };
    const bgMap = {
        returned: '#f0fdf4',
        borrowed: '#eff6ff',
        overdue: '#fff1f0'
    };
    const badgeMap = {
        returned: 'badge-green',
        borrowed: 'badge-blue',
        overdue: 'badge-red'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "page-history",
        style: {
            animation: "fadeUp .3s ease both"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        .page-title { font-family: 'DM Serif Display', serif; font-size: 24px; color: #1a2744; margin-bottom: 4px; }
        .page-sub { font-size: 13px; color: #8a8ea8; margin-bottom: 24px; }
        
        .tab-row { display: flex; border-bottom: 2px solid #e2dfd6; margin-bottom: 22px; }
        .tab-btn { background: none; border: none; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600; padding: 10px 16px; cursor: pointer; color: #8a8ea8; border-bottom: 2px solid transparent; margin-bottom: -2px; transition: all .18s; }
        .tab-btn.on { color: #1a2744; border-bottom-color: #1a2744; }

        .hist-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap: 12px; margin-bottom: 22px; }
        .hist-stat { background: #fff; border: 1px solid #e2dfd6; border-radius: 14px; padding: 14px 16px; text-align: center; }
        .hs-val { font-family: 'DM Serif Display', serif; font-size: 30px; line-height: 1; margin-bottom: 4px; }
        .hs-label { font-size: 12px; color: #8a8ea8; }

        .card { background: #ffffff; border-radius: 16px; box-shadow: 0 2px 12px rgba(26,39,68,.08); border: 1px solid #e2dfd6; }
        .h-row { padding: 14px 0; border-bottom: 1px solid #f2efe8; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .h-row:last-child { border-bottom: none; }
        
        .badge { display: inline-flex; align-items: center; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; }
        .badge-green { background: #e6f7ec; color: #2d7a4f; }
        .badge-blue { background: #e8f1fd; color: #2563eb; }
        .badge-red { background: #fdeaea; color: #c94040; }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
      `
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/history/page.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "page-title",
                children: "Library History"
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/history/page.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "page-sub",
                children: "Your complete borrowing and return activity"
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/history/page.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "tab-row",
                children: [
                    "all",
                    "borrowed",
                    "returned",
                    "overdue"
                ].map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: `tab-btn ${histTab === tab ? "on" : ""}`,
                        onClick: ()=>setHistTab(tab),
                        children: tab.charAt(0).toUpperCase() + tab.slice(1)
                    }, tab, false, {
                        fileName: "[project]/src/app/dashboard/history/page.tsx",
                        lineNumber: 63,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/history/page.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hist-stats",
                children: stats.map((s, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hist-stat",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hs-val",
                                style: {
                                    color: s.color
                                },
                                children: s.val
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/history/page.tsx",
                                lineNumber: 76,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hs-label",
                                children: s.label
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/history/page.tsx",
                                lineNumber: 77,
                                columnNumber: 13
                            }, this)
                        ]
                    }, idx, true, {
                        fileName: "[project]/src/app/dashboard/history/page.tsx",
                        lineNumber: 75,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/history/page.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card",
                style: {
                    padding: "4px 20px"
                },
                children: filteredHistory.length > 0 ? filteredHistory.map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-row",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "13px"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: "40px",
                                            height: "40px",
                                            borderRadius: "11px",
                                            background: bgMap[h.status],
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "18px",
                                            flexShrink: 0
                                        },
                                        children: icons[h.action] || '📅'
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/history/page.tsx",
                                        lineNumber: 86,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: "14px",
                                                    fontWeight: 600,
                                                    color: "#1a2744"
                                                },
                                                children: h.book
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/history/page.tsx",
                                                lineNumber: 90,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: "12px",
                                                    color: "#8a8ea8",
                                                    marginTop: "2px"
                                                },
                                                children: [
                                                    h.action,
                                                    " · ",
                                                    h.date
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/dashboard/history/page.tsx",
                                                lineNumber: 91,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: "11px",
                                                    color: "#c0bdb8",
                                                    marginTop: "1px"
                                                },
                                                children: [
                                                    "Due: ",
                                                    h.due
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/dashboard/history/page.tsx",
                                                lineNumber: 92,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/history/page.tsx",
                                        lineNumber: 89,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/history/page.tsx",
                                lineNumber: 85,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `badge ${badgeMap[h.status]}`,
                                children: h.status.charAt(0).toUpperCase() + h.status.slice(1)
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/history/page.tsx",
                                lineNumber: 95,
                                columnNumber: 13
                            }, this)
                        ]
                    }, h.id, true, {
                        fileName: "[project]/src/app/dashboard/history/page.tsx",
                        lineNumber: 84,
                        columnNumber: 11
                    }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: "28px",
                        textAlign: "center",
                        color: "#8a8ea8"
                    },
                    children: "No records found"
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/history/page.tsx",
                    lineNumber: 100,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/history/page.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/history/page.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_app_dashboard_history_page_tsx_eb2b801c._.js.map