(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/dashboard/history/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HistoryPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
// MOCK DATA PARA SA HISTORY
const HISTORY_DATA = [
    {
        id: 1,
        title: "Data Structures in Java",
        action: "Returned",
        date: "Feb 28, 2026",
        due: "Mar 01, 2026",
        status: "Returned"
    },
    {
        id: 2,
        title: "Calculus: Early Transcendentals",
        action: "Borrowed",
        date: "Feb 15, 2026",
        due: "Mar 15, 2026",
        status: "Borrowed"
    },
    {
        id: 3,
        title: "Organic Chemistry",
        action: "Reserved",
        date: "Feb 10, 2026",
        due: "—",
        status: "Returned"
    },
    {
        id: 4,
        title: "Engineering Mechanics",
        action: "Borrowed",
        date: "Jan 30, 2026",
        due: "Feb 28, 2026",
        status: "Overdue"
    },
    {
        id: 5,
        title: "Physics for Scientists",
        action: "Returned",
        date: "Jan 20, 2026",
        due: "Jan 22, 2026",
        status: "Returned"
    }
];
const TABS = [
    "All",
    "Borrowed",
    "Returned",
    "Overdue"
];
function HistoryPage() {
    _s();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("All");
    // Filter Logic
    const filteredData = HISTORY_DATA.filter((item)=>{
        if (activeTab === "All") return true;
        if (activeTab === "Borrowed" && item.status === "Borrowed") return true;
        if (activeTab === "Returned" && item.status === "Returned") return true;
        if (activeTab === "Overdue" && item.status === "Overdue") return true;
        return false;
    });
    // Summary Counts
    const total = HISTORY_DATA.length;
    const active = HISTORY_DATA.filter((i)=>i.status === "Borrowed").length;
    const returned = HISTORY_DATA.filter((i)=>i.status === "Returned").length;
    const overdue = HISTORY_DATA.filter((i)=>i.status === "Overdue").length;
    // Helper para sa icons at kulay
    const getIconAndColor = (status, action)=>{
        if (status === "Overdue") return {
            icon: "📖",
            bg: "#fdeaea",
            color: "#c94040"
        };
        if (status === "Borrowed") return {
            icon: "📖",
            bg: "#e8f1fd",
            color: "#3d8bef"
        };
        if (action === "Reserved") return {
            icon: "🎟️",
            bg: "#fef5e6",
            color: "#e89940"
        };
        return {
            icon: "↩️",
            bg: "#e6f7ec",
            color: "#2d7a4f"
        }; // Returned default
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "page-history",
        style: {
            animation: "fadeUp .3s ease both"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        .page-history { width: 100%; max-width: 1200px; margin: 0 auto; padding-bottom: 40px; }
        
        .hist-header { font-family: 'DM Serif Display', serif; font-size: 32px; color: #1a2744; margin-bottom: 6px; }
        .hist-sub { font-size: 15px; color: #8a8ea8; margin-bottom: 28px; }

        /* TABS */
        .tabs-container { display: flex; border-bottom: 2px solid #f2efe8; margin-bottom: 24px; gap: 8px; }
        .tab-btn { padding: 14px 20px; font-family: 'DM Sans', sans-serif; font-size: 14.5px; font-weight: 600; color: #8a8ea8; background: none; border: none; border-bottom: 3px solid transparent; cursor: pointer; transition: all .2s; margin-bottom: -2px; }
        .tab-btn:hover { color: #1a2744; }
        .tab-btn.active { color: #1a2744; border-bottom-color: #1a2744; }

        /* SUMMARY CARDS */
        .summary-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 28px; }
        @media (max-width: 768px) { .summary-grid { grid-template-columns: repeat(2, 1fr); } }
        
        .sum-card { background: #fff; border: 1px solid #e2dfd6; border-radius: 16px; padding: 24px 20px; text-align: center; box-shadow: 0 4px 12px rgba(26,39,68,.03); transition: transform .2s; }
        .sum-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(26,39,68,.06); }
        .sum-num { font-family: 'DM Serif Display', serif; font-size: 36px; line-height: 1; margin-bottom: 6px; }
        .sum-label { font-size: 13px; font-weight: 600; color: #8a8ea8; text-transform: uppercase; letter-spacing: 0.5px; }

        /* LIST CONTAINER */
        .list-container { background: #fff; border: 1px solid #e2dfd6; border-radius: 20px; box-shadow: 0 6px 20px rgba(26,39,68,.04); overflow: hidden; padding: 8px 24px; }
        
        .list-item { display: flex; align-items: center; justify-content: space-between; padding: 20px 0; border-bottom: 1px solid #f2efe8; }
        .list-item:last-child { border-bottom: none; }
        
        .li-left { display: flex; align-items: center; gap: 16px; }
        .li-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
        
        .li-title { font-size: 15px; font-weight: 700; color: #1a2744; margin-bottom: 4px; }
        .li-details { font-size: 12.5px; color: #8a8ea8; display: flex; align-items: center; gap: 8px; }
        
        .badge { display: inline-flex; align-items: center; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 700; letter-spacing: 0.3px; }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
      `
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/history/page.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hist-header",
                children: "Library History"
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/history/page.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hist-sub",
                children: "Your complete borrowing and return activity"
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/history/page.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "tabs-container",
                children: TABS.map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: `tab-btn ${activeTab === tab ? 'active' : ''}`,
                        onClick: ()=>setActiveTab(tab),
                        children: tab
                    }, tab, false, {
                        fileName: "[project]/src/app/dashboard/history/page.tsx",
                        lineNumber: 88,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/history/page.tsx",
                lineNumber: 86,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "summary-grid",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "sum-card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "sum-num",
                                style: {
                                    color: "#3d8bef"
                                },
                                children: total
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/history/page.tsx",
                                lineNumber: 101,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "sum-label",
                                children: "Total"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/history/page.tsx",
                                lineNumber: 102,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/history/page.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "sum-card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "sum-num",
                                style: {
                                    color: "#e89940"
                                },
                                children: active
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/history/page.tsx",
                                lineNumber: 105,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "sum-label",
                                children: "Active"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/history/page.tsx",
                                lineNumber: 106,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/history/page.tsx",
                        lineNumber: 104,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "sum-card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "sum-num",
                                style: {
                                    color: "#2d7a4f"
                                },
                                children: returned
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/history/page.tsx",
                                lineNumber: 109,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "sum-label",
                                children: "Returned"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/history/page.tsx",
                                lineNumber: 110,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/history/page.tsx",
                        lineNumber: 108,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "sum-card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "sum-num",
                                style: {
                                    color: "#c94040"
                                },
                                children: overdue
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/history/page.tsx",
                                lineNumber: 113,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "sum-label",
                                children: "Overdue"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/history/page.tsx",
                                lineNumber: 114,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/history/page.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/history/page.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "list-container",
                children: filteredData.length > 0 ? filteredData.map((item)=>{
                    const style = getIconAndColor(item.status, item.action);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "list-item",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "li-left",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "li-icon",
                                        style: {
                                            background: style.bg,
                                            color: style.color
                                        },
                                        children: style.icon
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/history/page.tsx",
                                        lineNumber: 127,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "li-title",
                                                children: item.title
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/history/page.tsx",
                                                lineNumber: 131,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "li-details",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            item.action,
                                                            " • ",
                                                            item.date
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/dashboard/history/page.tsx",
                                                        lineNumber: 133,
                                                        columnNumber: 23
                                                    }, this),
                                                    item.due !== "—" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "|"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/dashboard/history/page.tsx",
                                                                lineNumber: 136,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: [
                                                                    "Due: ",
                                                                    item.due
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/dashboard/history/page.tsx",
                                                                lineNumber: 137,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/dashboard/history/page.tsx",
                                                lineNumber: 132,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/history/page.tsx",
                                        lineNumber: 130,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/history/page.tsx",
                                lineNumber: 126,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "badge",
                                    style: {
                                        background: style.bg,
                                        color: style.color
                                    },
                                    children: item.status
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/history/page.tsx",
                                    lineNumber: 145,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/history/page.tsx",
                                lineNumber: 144,
                                columnNumber: 17
                            }, this)
                        ]
                    }, item.id, true, {
                        fileName: "[project]/src/app/dashboard/history/page.tsx",
                        lineNumber: 125,
                        columnNumber: 15
                    }, this);
                }) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: "40px 0",
                        textAlign: "center",
                        color: "#8a8ea8"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: "32px",
                                marginBottom: "8px"
                            },
                            children: "📭"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/history/page.tsx",
                            lineNumber: 154,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "No records found in this category."
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/history/page.tsx",
                            lineNumber: 155,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/history/page.tsx",
                    lineNumber: 153,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/history/page.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/history/page.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_s(HistoryPage, "q2+/MDPyg3h+XWrQG52Vm0D3zK0=");
_c = HistoryPage;
var _c;
__turbopack_context__.k.register(_c, "HistoryPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_dashboard_history_page_tsx_28dabf0d._.js.map