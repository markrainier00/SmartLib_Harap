module.exports = [
"[project]/src/app/admin/history/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminHistoryPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
/* ─── HELPERS & MOCK DATA ───────────────────────────────── */ const INIT_HISTORY = [
    {
        id: "TRX-00101",
        student: "Juan dela Cruz",
        book: "Introduction to Algorithms",
        borrowDate: "Feb 10, 2026",
        dueDate: "Feb 24, 2026",
        returnDate: "Feb 22, 2026",
        status: "returned",
        penalty: 0
    },
    {
        id: "TRX-00102",
        student: "Maria Santos",
        book: "Human Anatomy & Physiology",
        borrowDate: "Feb 15, 2026",
        dueDate: "Mar 01, 2026",
        returnDate: "Mar 03, 2026",
        status: "returned",
        penalty: 100
    },
    {
        id: "TRX-00103",
        student: "Sofia Manalo",
        book: "Calculus: Early Transcendentals",
        borrowDate: "Feb 25, 2026",
        dueDate: "Mar 11, 2026",
        returnDate: "—",
        status: "borrowed",
        penalty: 0
    },
    {
        id: "TRX-00104",
        student: "Pedro Bautista",
        book: "Engineering Mechanics",
        borrowDate: "Jan 15, 2026",
        dueDate: "Jan 29, 2026",
        returnDate: "—",
        status: "lost",
        penalty: 1500
    },
    {
        id: "TRX-00105",
        student: "Mark Villanueva",
        book: "Physics for Scientists",
        borrowDate: "Feb 18, 2026",
        dueDate: "Mar 04, 2026",
        returnDate: "—",
        status: "overdue",
        penalty: 100
    },
    {
        id: "TRX-00106",
        student: "Luz Garcia",
        book: "Organic Chemistry",
        borrowDate: "Mar 01, 2026",
        dueDate: "Mar 15, 2026",
        returnDate: "—",
        status: "borrowed",
        penalty: 0
    },
    {
        id: "TRX-00107",
        student: "Nena Cruz",
        book: "Data Structures in Java",
        borrowDate: "Feb 01, 2026",
        dueDate: "Feb 15, 2026",
        returnDate: "Feb 15, 2026",
        status: "returned",
        penalty: 0
    },
    {
        id: "TRX-00108",
        student: "Carlos Reyes",
        book: "Business Law",
        borrowDate: "Feb 12, 2026",
        dueDate: "Feb 26, 2026",
        returnDate: "Mar 01, 2026",
        status: "returned",
        penalty: 150
    }
];
function Badge({ label, type = "navy" }) {
    const m = {
        green: [
            "#e6f7ec",
            "#2d7a4f"
        ],
        red: [
            "#fdeaea",
            "#c94040"
        ],
        blue: [
            "#e8f1fd",
            "#2563eb"
        ],
        navy: [
            "#e8ecf5",
            "#1a2744"
        ],
        amber: [
            "#fef5e6",
            "#a06010"
        ],
        gray: [
            "#f0ede5",
            "#64748b"
        ]
    };
    const [bg, fg] = m[type] || m.navy;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        style: {
            background: bg,
            color: fg,
            padding: "3px 10px",
            borderRadius: 20,
            fontSize: 11,
            fontWeight: 600,
            display: "inline-block"
        },
        children: label
    }, void 0, false, {
        fileName: "[project]/src/app/admin/history/page.tsx",
        lineNumber: 24,
        columnNumber: 10
    }, this);
}
function Btn({ children, variant = "navy", onClick, style = {} }) {
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
        padding: "10px 20px",
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
        },
        red: {
            background: "#fdeaea",
            color: "#c94040",
            border: "2px solid #f5c5c5"
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
        fileName: "[project]/src/app/admin/history/page.tsx",
        lineNumber: 34,
        columnNumber: 10
    }, this);
}
function AdminHistoryPage() {
    const [history, setHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(INIT_HISTORY);
    const [histSearch, setHistSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [histStatus, setHistStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("All");
    const [viewTx, setViewTx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const statusColor = {
        returned: "green",
        borrowed: "blue",
        overdue: "red",
        lost: "gray"
    };
    const statusLabel = {
        returned: "✓ Returned",
        borrowed: "📖 Borrowed",
        overdue: "⚠️ Overdue",
        lost: "❓ Lost"
    };
    const filtHist = history.filter((h)=>{
        const ms = h.student.toLowerCase().includes(histSearch.toLowerCase()) || h.book.toLowerCase().includes(histSearch.toLowerCase()) || h.id.toLowerCase().includes(histSearch.toLowerCase());
        const mt = histStatus === "All" || h.status === histStatus;
        return ms && mt;
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            animation: "fadeUp .3s ease"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        .row-hover:hover { background: #f7f5f0 !important; }
        .chip { border: 2px solid #e2dfd6; border-radius: 50px; padding: 7px 16px; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600; cursor: pointer; background: #fff; color: #8a8ea8; transition: all .18s; }
        .chip:hover { border-color: #1a2744; color: #1a2744; }
        .chip.active { background: #1a2744; color: #fff; border-color: #1a2744; }
      `
            }, void 0, false, {
                fileName: "[project]/src/app/admin/history/page.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: 20
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontFamily: "'DM Serif Display', serif",
                            fontSize: 24,
                            color: "#1a2744"
                        },
                        children: "Borrow History"
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/history/page.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 13,
                            color: "#8a8ea8",
                            marginTop: 2
                        },
                        children: "Permanent log of all library transactions and penalties"
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/history/page.tsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/history/page.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    gap: 10,
                    marginBottom: 18,
                    flexWrap: "wrap",
                    alignItems: "center"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: "relative",
                            flex: 1,
                            minWidth: 200,
                            maxWidth: 350
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    position: "absolute",
                                    left: 12,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    fontSize: 14,
                                    pointerEvents: "none"
                                },
                                children: "🔍"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/history/page.tsx",
                                lineNumber: 75,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: histSearch,
                                onChange: (e)=>setHistSearch(e.target.value),
                                placeholder: "Search ID, student, or book…",
                                style: {
                                    width: "100%",
                                    background: "#fff",
                                    border: "2px solid #e2dfd6",
                                    borderRadius: 11,
                                    padding: "9px 13px 9px 38px",
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontSize: 13.5,
                                    color: "#1a2744",
                                    outline: "none"
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/history/page.tsx",
                                lineNumber: 76,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/history/page.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this),
                    [
                        "All",
                        "returned",
                        "borrowed",
                        "overdue",
                        "lost"
                    ].map((v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: `chip ${histStatus === v ? "active" : ""}`,
                            onClick: ()=>setHistStatus(v),
                            children: v === "All" ? "All Records" : statusLabel[v]
                        }, v, false, {
                            fileName: "[project]/src/app/admin/history/page.tsx",
                            lineNumber: 81,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginLeft: "auto",
                            fontSize: 12,
                            color: "#8a8ea8"
                        },
                        children: [
                            filtHist.length,
                            " record",
                            filtHist.length !== 1 ? "s" : ""
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/history/page.tsx",
                        lineNumber: 86,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/history/page.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: "#fff",
                    borderRadius: 16,
                    border: "1px solid #e2dfd6",
                    boxShadow: "0 2px 12px rgba(26,39,68,.06)",
                    overflow: "hidden"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "grid",
                            gridTemplateColumns: "1fr 1.8fr 2fr 1fr 1fr 1fr 1fr 0.6fr",
                            padding: "11px 20px",
                            background: "#f7f5f0",
                            borderBottom: "1px solid #e2dfd6"
                        },
                        children: [
                            "Trans ID",
                            "Student",
                            "Book",
                            "Borrowed",
                            "Due Date",
                            "Returned",
                            "Status",
                            ""
                        ].map((h, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 10.5,
                                    fontWeight: 700,
                                    color: "#8a8ea8",
                                    letterSpacing: ".06em",
                                    textTransform: "uppercase"
                                },
                                children: h
                            }, i, false, {
                                fileName: "[project]/src/app/admin/history/page.tsx",
                                lineNumber: 93,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/history/page.tsx",
                        lineNumber: 91,
                        columnNumber: 9
                    }, this),
                    filtHist.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: 40,
                            textAlign: "center",
                            color: "#8a8ea8"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 36,
                                    marginBottom: 10
                                },
                                children: "📭"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/history/page.tsx",
                                lineNumber: 99,
                                columnNumber: 13
                            }, this),
                            "No transaction records found"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/history/page.tsx",
                        lineNumber: 98,
                        columnNumber: 11
                    }, this) : filtHist.map((h, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "row-hover",
                            style: {
                                display: "grid",
                                gridTemplateColumns: "1fr 1.8fr 2fr 1fr 1fr 1fr 1fr 0.6fr",
                                padding: "14px 20px",
                                borderBottom: i < filtHist.length - 1 ? "1px solid #f2efe8" : "none",
                                alignItems: "center",
                                transition: "background .15s"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 12.5,
                                        fontFamily: "monospace",
                                        color: "#64748b",
                                        fontWeight: 600
                                    },
                                    children: h.id
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/history/page.tsx",
                                    lineNumber: 105,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 13,
                                        fontWeight: 600,
                                        color: "#1a2744"
                                    },
                                    children: h.student
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/history/page.tsx",
                                    lineNumber: 106,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 12.5,
                                        color: "#64748b",
                                        lineHeight: 1.3
                                    },
                                    children: h.book.length > 28 ? h.book.slice(0, 28) + "…" : h.book
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/history/page.tsx",
                                    lineNumber: 107,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 12,
                                        color: "#8a8ea8"
                                    },
                                    children: h.borrowDate
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/history/page.tsx",
                                    lineNumber: 108,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 12,
                                        color: h.status === "overdue" ? "#c94040" : "#8a8ea8",
                                        fontWeight: h.status === "overdue" ? 700 : 400
                                    },
                                    children: h.dueDate
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/history/page.tsx",
                                    lineNumber: 109,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 12,
                                        color: h.returnDate === "—" ? "#cbd5e1" : "#1a2744",
                                        fontWeight: 600
                                    },
                                    children: h.returnDate
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/history/page.tsx",
                                    lineNumber: 110,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
                                            label: statusLabel[h.status],
                                            type: statusColor[h.status]
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/history/page.tsx",
                                            lineNumber: 112,
                                            columnNumber: 17
                                        }, this),
                                        h.penalty > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: 10,
                                                color: "#c94040",
                                                fontWeight: 700,
                                                marginTop: 4
                                            },
                                            children: [
                                                "₱ ",
                                                h.penalty,
                                                ".00 Penalty"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/admin/history/page.tsx",
                                            lineNumber: 113,
                                            columnNumber: 35
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/history/page.tsx",
                                    lineNumber: 111,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        textAlign: "right"
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setViewTx(h),
                                        style: {
                                            background: "#f0ede5",
                                            border: "1.5px solid #e2dfd6",
                                            borderRadius: 8,
                                            padding: "5px 9px",
                                            fontSize: 13,
                                            cursor: "pointer",
                                            transition: "all .15s"
                                        },
                                        children: "👁"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/history/page.tsx",
                                        lineNumber: 116,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/history/page.tsx",
                                    lineNumber: 115,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, h.id, true, {
                            fileName: "[project]/src/app/admin/history/page.tsx",
                            lineNumber: 104,
                            columnNumber: 13
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/history/page.tsx",
                lineNumber: 90,
                columnNumber: 7
            }, this),
            viewTx && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "fixed",
                    inset: 0,
                    background: "rgba(26,39,68,.5)",
                    backdropFilter: "blur(6px)",
                    zIndex: 90,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 20
                },
                onClick: (e)=>e.target === e.currentTarget && setViewTx(null),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        background: "#fff",
                        borderRadius: 22,
                        padding: "28px",
                        maxWidth: 460,
                        width: "100%",
                        boxShadow: "0 24px 64px rgba(26,39,68,.18)",
                        animation: "fadeUp .25s ease"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                marginBottom: 20
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: 10,
                                                fontWeight: 700,
                                                letterSpacing: ".1em",
                                                textTransform: "uppercase",
                                                color: "#3d8bef",
                                                marginBottom: 4
                                            },
                                            children: "Transaction Details"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/history/page.tsx",
                                            lineNumber: 129,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontFamily: "monospace",
                                                fontSize: 16,
                                                fontWeight: 700,
                                                color: "#1a2744"
                                            },
                                            children: viewTx.id
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/history/page.tsx",
                                            lineNumber: 130,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/history/page.tsx",
                                    lineNumber: 128,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setViewTx(null),
                                    style: {
                                        background: "#f0ede5",
                                        border: "none",
                                        borderRadius: 8,
                                        padding: "5px 9px",
                                        cursor: "pointer",
                                        fontSize: 15,
                                        color: "#8a8ea8"
                                    },
                                    children: "✕"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/history/page.tsx",
                                    lineNumber: 132,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/history/page.tsx",
                            lineNumber: 127,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                padding: "16px",
                                background: "#f7f5f0",
                                borderRadius: 14,
                                marginBottom: 18
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 11,
                                        fontWeight: 700,
                                        color: "#8a8ea8",
                                        textTransform: "uppercase",
                                        marginBottom: 4
                                    },
                                    children: "Student & Book"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/history/page.tsx",
                                    lineNumber: 136,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontFamily: "'DM Serif Display', serif",
                                        fontSize: 19,
                                        color: "#1a2744"
                                    },
                                    children: viewTx.student
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/history/page.tsx",
                                    lineNumber: 137,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 13,
                                        color: "#64748b",
                                        marginTop: 4
                                    },
                                    children: [
                                        "📖 ",
                                        viewTx.book
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/history/page.tsx",
                                    lineNumber: 138,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/history/page.tsx",
                            lineNumber: 135,
                            columnNumber: 13
                        }, this),
                        [
                            [
                                "Status",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
                                    label: statusLabel[viewTx.status],
                                    type: statusColor[viewTx.status]
                                }, "1", false, {
                                    fileName: "[project]/src/app/admin/history/page.tsx",
                                    lineNumber: 142,
                                    columnNumber: 26
                                }, this)
                            ],
                            [
                                "Borrowed Date",
                                viewTx.borrowDate
                            ],
                            [
                                "Due Date",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: viewTx.status === "overdue" ? "#c94040" : "inherit"
                                    },
                                    children: viewTx.dueDate
                                }, "2", false, {
                                    fileName: "[project]/src/app/admin/history/page.tsx",
                                    lineNumber: 144,
                                    columnNumber: 28
                                }, this)
                            ],
                            [
                                "Returned Date",
                                viewTx.returnDate
                            ],
                            [
                                "Penalty Incurred",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: viewTx.penalty > 0 ? "#c94040" : "#2d7a4f",
                                        fontWeight: 700
                                    },
                                    children: [
                                        "₱ ",
                                        viewTx.penalty,
                                        ".00"
                                    ]
                                }, "3", true, {
                                    fileName: "[project]/src/app/admin/history/page.tsx",
                                    lineNumber: 146,
                                    columnNumber: 36
                                }, this)
                            ]
                        ].map(([k, v], i, arr)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "10px 0",
                                    borderBottom: i < arr.length - 1 ? "1px solid #f2efe8" : "none"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: 13,
                                            color: "#64748b"
                                        },
                                        children: k
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/history/page.tsx",
                                        lineNumber: 149,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: 13,
                                            fontWeight: 600,
                                            color: "#1a2744"
                                        },
                                        children: v
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/history/page.tsx",
                                        lineNumber: 150,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, k, true, {
                                fileName: "[project]/src/app/admin/history/page.tsx",
                                lineNumber: 148,
                                columnNumber: 15
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Btn, {
                            variant: "ghost",
                            style: {
                                marginTop: 24,
                                width: "100%",
                                justifyContent: "center"
                            },
                            onClick: ()=>setViewTx(null),
                            children: "Close Details"
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/history/page.tsx",
                            lineNumber: 154,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/admin/history/page.tsx",
                    lineNumber: 126,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/admin/history/page.tsx",
                lineNumber: 125,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/admin/history/page.tsx",
        lineNumber: 57,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_app_admin_history_page_tsx_6210b804._.js.map