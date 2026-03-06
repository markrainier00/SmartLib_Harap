module.exports = [
"[project]/src/app/admin/requests/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminRequestsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
/* ─── HELPERS & MOCK DATA ───────────────────────────────── */ const COURSES = [
    "All",
    "BSCS",
    "BSIT",
    "BSCpE",
    "BSMATH",
    "BSBA",
    "BSAcc",
    "BSECE",
    "BSCHE",
    "BSN",
    "BSCE",
    "BSBio",
    "BSPharma"
];
const INIT_REQUESTS = [
    {
        id: 1,
        student: "Juan dela Cruz",
        studentId: "2025-00001",
        course: "BSCS",
        book: "Introduction to Algorithms",
        type: "borrow",
        date: "Mar 05, 2026",
        dueDate: "Mar 19, 2026",
        status: "pending"
    },
    {
        id: 2,
        student: "Maria Santos",
        studentId: "2025-00002",
        course: "BSN",
        book: "Human Anatomy & Physiology",
        type: "borrow",
        date: "Mar 05, 2026",
        dueDate: "Mar 19, 2026",
        status: "pending"
    },
    {
        id: 3,
        student: "Pedro Bautista",
        studentId: "2025-00005",
        course: "BSCE",
        book: "Engineering Mechanics",
        type: "reserve",
        date: "Mar 04, 2026",
        dueDate: "—",
        status: "pending"
    },
    {
        id: 4,
        student: "Sofia Manalo",
        studentId: "2025-00010",
        course: "BSMATH",
        book: "Calculus: Early Transcendentals",
        type: "borrow",
        date: "Mar 04, 2026",
        dueDate: "Mar 18, 2026",
        status: "approved"
    },
    {
        id: 5,
        student: "Mark Villanueva",
        studentId: "2025-00009",
        course: "BSCpE",
        book: "Physics for Scientists",
        type: "borrow",
        date: "Mar 03, 2026",
        dueDate: "Mar 17, 2026",
        status: "approved"
    },
    {
        id: 6,
        student: "Luz Garcia",
        studentId: "2025-00006",
        course: "BSPharma",
        book: "Organic Chemistry",
        type: "reserve",
        date: "Mar 03, 2026",
        dueDate: "—",
        status: "rejected"
    },
    {
        id: 7,
        student: "Nena Cruz",
        studentId: "2025-00008",
        course: "BSIT",
        book: "Data Structures in Java",
        type: "borrow",
        date: "Mar 02, 2026",
        dueDate: "Mar 16, 2026",
        status: "pending"
    },
    {
        id: 8,
        student: "Carlos Reyes",
        studentId: "2025-00003",
        course: "BSBA",
        book: "Business Law",
        type: "reserve",
        date: "Mar 02, 2026",
        dueDate: "—",
        status: "pending"
    },
    {
        id: 9,
        student: "Ana Lim",
        studentId: "2025-00004",
        course: "BSMATH",
        book: "Discrete Mathematics",
        type: "borrow",
        date: "Mar 01, 2026",
        dueDate: "Mar 15, 2026",
        status: "approved"
    },
    {
        id: 10,
        student: "Pedro Bautista",
        studentId: "2025-00005",
        course: "BSCE",
        book: "Physics for Scientists",
        type: "borrow",
        date: "Feb 28, 2026",
        dueDate: "Mar 14, 2026",
        status: "rejected",
        rejectReason: "Student already has overdue books."
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
        fileName: "[project]/src/app/admin/requests/page.tsx",
        lineNumber: 28,
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
        fileName: "[project]/src/app/admin/requests/page.tsx",
        lineNumber: 38,
        columnNumber: 10
    }, this);
}
function AdminRequestsPage() {
    const [requests, setRequests] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(INIT_REQUESTS);
    const [reqTab, setReqTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("pending");
    const [reqType, setReqType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("All"); // All | borrow | reserve
    const [reqSearch, setReqSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [reqCourse, setReqCourse] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("All");
    const [rejectReqModal, setRejectReqModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [rejectReqReason, setRejectReqReason] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [toast, setToast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const fireToast = (type, msg)=>{
        setToast({
            type,
            msg
        });
        setTimeout(()=>setToast(null), 3000);
    };
    const statusColor = {
        pending: "amber",
        approved: "green",
        rejected: "red",
        returned: "navy"
    };
    const statusLabel = {
        pending: "⏳ Pending",
        approved: "✓ Approved",
        rejected: "✗ Rejected",
        returned: "↩ Returned"
    };
    const typeColor = {
        borrow: "blue",
        reserve: "navy"
    };
    const filtReqs = requests.filter((r)=>{
        const ms = r.student.toLowerCase().includes(reqSearch.toLowerCase()) || r.book.toLowerCase().includes(reqSearch.toLowerCase()) || r.studentId.includes(reqSearch);
        const mt = reqTab === "all" || r.status === reqTab;
        const mtype = reqType === "All" || r.type === reqType;
        const mc = reqCourse === "All" || r.course === reqCourse;
        return ms && mt && mtype && mc;
    }).sort((a, b)=>a.student.localeCompare(b.student));
    const reqCounts = {
        pending: requests.filter((r)=>r.status === "pending").length,
        approved: requests.filter((r)=>r.status === "approved").length,
        returned: requests.filter((r)=>r.status === "returned").length,
        rejected: requests.filter((r)=>r.status === "rejected").length,
        all: requests.length
    };
    const approveReq = (id)=>{
        setRequests((prev)=>prev.map((r)=>r.id === id ? {
                    ...r,
                    status: "approved",
                    approvedDate: "Mar 05, 2026"
                } : r));
        fireToast("ok", "Request approved! Student notified.");
    };
    const markReturned = (id)=>{
        const today = "Mar 05, 2026";
        setRequests((prev)=>prev.map((r)=>r.id === id ? {
                    ...r,
                    status: "returned",
                    returnedDate: today
                } : r));
        fireToast("ok", "Book marked as returned.");
    };
    const rejectReq = (id, reason)=>{
        setRequests((prev)=>prev.map((r)=>r.id === id ? {
                    ...r,
                    status: "rejected",
                    rejectReason: reason
                } : r));
        fireToast("ok", "Request rejected. Student notified.");
        setRejectReqModal(null);
        setRejectReqReason("");
    };
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
                fileName: "[project]/src/app/admin/requests/page.tsx",
                lineNumber: 97,
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
                        children: "Book Requests"
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/requests/page.tsx",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 13,
                            color: "#8a8ea8",
                            marginTop: 2
                        },
                        children: "Manage student borrow and reserve requests"
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/requests/page.tsx",
                        lineNumber: 108,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/requests/page.tsx",
                lineNumber: 106,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                    gap: 12,
                    marginBottom: 22
                },
                children: [
                    {
                        key: "pending",
                        label: "Pending",
                        color: "#e8a020",
                        bg: "#fff8e6",
                        icon: "⏳"
                    },
                    {
                        key: "approved",
                        label: "Approved",
                        color: "#2d7a4f",
                        bg: "#e6f7ec",
                        icon: "✅"
                    },
                    {
                        key: "returned",
                        label: "Returned",
                        color: "#1a2744",
                        bg: "#e8ecf5",
                        icon: "↩️"
                    },
                    {
                        key: "rejected",
                        label: "Rejected",
                        color: "#c94040",
                        bg: "#fdeaea",
                        icon: "✗"
                    },
                    {
                        key: "all",
                        label: "Total",
                        color: "#2563eb",
                        bg: "#e8f1fd",
                        icon: "📋"
                    }
                ].map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onClick: ()=>setReqTab(s.key),
                        style: {
                            background: "#fff",
                            borderRadius: 14,
                            border: `2px solid ${reqTab === s.key ? "#1a2744" : "#e2dfd6"}`,
                            padding: "13px 14px",
                            boxShadow: "0 2px 12px rgba(26,39,68,.06)",
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            cursor: "pointer",
                            transition: "border .18s"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 36,
                                    height: 36,
                                    borderRadius: 10,
                                    background: s.bg,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 16,
                                    flexShrink: 0
                                },
                                children: s.icon
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/requests/page.tsx",
                                lineNumber: 122,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontFamily: "'DM Serif Display', serif",
                                            fontSize: 22,
                                            color: s.color,
                                            lineHeight: 1
                                        },
                                        children: reqCounts[s.key]
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/requests/page.tsx",
                                        lineNumber: 124,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 11,
                                            color: "#8a8ea8",
                                            marginTop: 2
                                        },
                                        children: s.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/requests/page.tsx",
                                        lineNumber: 125,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/requests/page.tsx",
                                lineNumber: 123,
                                columnNumber: 13
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/src/app/admin/requests/page.tsx",
                        lineNumber: 120,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/admin/requests/page.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    borderBottom: "2px solid #e2dfd6",
                    marginBottom: 14,
                    overflowX: "auto"
                },
                children: [
                    "pending",
                    "approved",
                    "returned",
                    "rejected",
                    "all"
                ].map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setReqTab(t),
                        style: {
                            background: "none",
                            border: "none",
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 13,
                            fontWeight: 600,
                            padding: "9px 14px",
                            cursor: "pointer",
                            color: reqTab === t ? "#1a2744" : "#8a8ea8",
                            borderBottom: `2px solid ${reqTab === t ? "#1a2744" : "transparent"}`,
                            marginBottom: -2,
                            transition: "all .18s",
                            textTransform: "capitalize",
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                            whiteSpace: "nowrap"
                        },
                        children: [
                            t,
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    background: reqTab === t ? "#1a2744" : "#f0ede5",
                                    color: reqTab === t ? "#fff" : "#8a8ea8",
                                    borderRadius: 20,
                                    fontSize: 10,
                                    fontWeight: 700,
                                    padding: "1px 6px"
                                },
                                children: reqCounts[t]
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/requests/page.tsx",
                                lineNumber: 136,
                                columnNumber: 17
                            }, this)
                        ]
                    }, t, true, {
                        fileName: "[project]/src/app/admin/requests/page.tsx",
                        lineNumber: 134,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/admin/requests/page.tsx",
                lineNumber: 132,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    gap: 9,
                    marginBottom: 16,
                    flexWrap: "wrap",
                    alignItems: "center"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: "relative",
                            flex: 1,
                            minWidth: 180
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    position: "absolute",
                                    left: 11,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    fontSize: 13,
                                    pointerEvents: "none"
                                },
                                children: "🔍"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/requests/page.tsx",
                                lineNumber: 144,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: reqSearch,
                                onChange: (e)=>setReqSearch(e.target.value),
                                placeholder: "Search student, book, ID…",
                                style: {
                                    width: "100%",
                                    background: "#fff",
                                    border: "2px solid #e2dfd6",
                                    borderRadius: 11,
                                    padding: "8px 13px 8px 32px",
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontSize: 13,
                                    color: "#1a2744",
                                    outline: "none"
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/requests/page.tsx",
                                lineNumber: 145,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/requests/page.tsx",
                        lineNumber: 143,
                        columnNumber: 9
                    }, this),
                    [
                        "All",
                        "borrow",
                        "reserve"
                    ].map((v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: `chip ${reqType === v ? "active" : ""}`,
                            onClick: ()=>setReqType(v),
                            children: v === "All" ? "All Types" : v === "borrow" ? "📖 Borrow" : "🔖 Reserve"
                        }, v, false, {
                            fileName: "[project]/src/app/admin/requests/page.tsx",
                            lineNumber: 149,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: reqCourse,
                        onChange: (e)=>setReqCourse(e.target.value),
                        style: {
                            background: "#fff",
                            border: "2px solid #e2dfd6",
                            borderRadius: 11,
                            padding: "8px 13px",
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 13,
                            color: "#1a2744",
                            outline: "none",
                            cursor: "pointer"
                        },
                        children: COURSES.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                children: c
                            }, c, false, {
                                fileName: "[project]/src/app/admin/requests/page.tsx",
                                lineNumber: 154,
                                columnNumber: 29
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/requests/page.tsx",
                        lineNumber: 153,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginLeft: "auto",
                            fontSize: 12,
                            color: "#8a8ea8"
                        },
                        children: [
                            filtReqs.length,
                            " result",
                            filtReqs.length !== 1 ? "s" : ""
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/requests/page.tsx",
                        lineNumber: 156,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/requests/page.tsx",
                lineNumber: 142,
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
                            gridTemplateColumns: "1.8fr 2.2fr 0.8fr 0.8fr 1fr 0.9fr 1.8fr",
                            padding: "11px 20px",
                            background: "#f7f5f0",
                            borderBottom: "1px solid #e2dfd6"
                        },
                        children: [
                            "Student",
                            "Book",
                            "Course",
                            "Type",
                            "Date",
                            "Status",
                            "Actions"
                        ].map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 10.5,
                                    fontWeight: 700,
                                    color: "#8a8ea8",
                                    letterSpacing: ".06em",
                                    textTransform: "uppercase"
                                },
                                children: h
                            }, h, false, {
                                fileName: "[project]/src/app/admin/requests/page.tsx",
                                lineNumber: 163,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/requests/page.tsx",
                        lineNumber: 161,
                        columnNumber: 9
                    }, this),
                    filtReqs.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: 40,
                            textAlign: "center",
                            color: "#8a8ea8"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 36,
                                    marginBottom: 8
                                },
                                children: "📭"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/requests/page.tsx",
                                lineNumber: 169,
                                columnNumber: 13
                            }, this),
                            "No requests found"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/requests/page.tsx",
                        lineNumber: 168,
                        columnNumber: 11
                    }, this) : filtReqs.map((r, i)=>{
                        const rowBg = r.status === "pending" ? "#fffdf5" : r.status === "returned" ? "#f7fdf9" : "#fff";
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "row-hover",
                            style: {
                                display: "grid",
                                gridTemplateColumns: "1.8fr 2.2fr 0.8fr 0.8fr 1fr 0.9fr 1.8fr",
                                padding: "12px 20px",
                                borderBottom: i < filtReqs.length - 1 ? "1px solid #f2efe8" : "none",
                                alignItems: "center",
                                transition: "background .15s",
                                background: rowBg
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: 13,
                                                fontWeight: 600,
                                                color: "#1a2744"
                                            },
                                            children: r.student
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/requests/page.tsx",
                                            lineNumber: 178,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: 11,
                                                color: "#8a8ea8"
                                            },
                                            children: r.studentId
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/requests/page.tsx",
                                            lineNumber: 179,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/requests/page.tsx",
                                    lineNumber: 177,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 12.5,
                                        color: "#64748b",
                                        lineHeight: 1.3
                                    },
                                    children: r.book.length > 30 ? r.book.slice(0, 30) + "…" : r.book
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/requests/page.tsx",
                                    lineNumber: 181,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 12,
                                        color: "#64748b"
                                    },
                                    children: r.course
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/requests/page.tsx",
                                    lineNumber: 182,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
                                        label: r.type === "borrow" ? "📖 Borrow" : "🔖 Reserve",
                                        type: typeColor[r.type]
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/requests/page.tsx",
                                        lineNumber: 183,
                                        columnNumber: 22
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/requests/page.tsx",
                                    lineNumber: 183,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 12,
                                        color: "#8a8ea8"
                                    },
                                    children: r.date
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/requests/page.tsx",
                                    lineNumber: 184,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
                                        label: statusLabel[r.status],
                                        type: statusColor[r.status]
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/requests/page.tsx",
                                        lineNumber: 185,
                                        columnNumber: 22
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/requests/page.tsx",
                                    lineNumber: 185,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        gap: 5,
                                        flexWrap: "wrap"
                                    },
                                    children: [
                                        r.status === "pending" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>approveReq(r.id),
                                                    style: {
                                                        background: "#e6f7ec",
                                                        color: "#2d7a4f",
                                                        border: "1.5px solid #b6e8c4",
                                                        borderRadius: 8,
                                                        padding: "5px 9px",
                                                        fontSize: 11,
                                                        fontWeight: 700,
                                                        cursor: "pointer",
                                                        fontFamily: "'DM Sans', sans-serif"
                                                    },
                                                    children: "✓ Approve"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/requests/page.tsx",
                                                    lineNumber: 190,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        setRejectReqModal(r);
                                                        setRejectReqReason("");
                                                    },
                                                    style: {
                                                        background: "#fdeaea",
                                                        color: "#c94040",
                                                        border: "1.5px solid #f5c5c5",
                                                        borderRadius: 8,
                                                        padding: "5px 9px",
                                                        fontSize: 11,
                                                        fontWeight: 700,
                                                        cursor: "pointer",
                                                        fontFamily: "'DM Sans', sans-serif"
                                                    },
                                                    children: "✗ Reject"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/requests/page.tsx",
                                                    lineNumber: 191,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true),
                                        r.status === "approved" && r.type === "borrow" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>markReturned(r.id),
                                            style: {
                                                background: "#e8ecf5",
                                                color: "#1a2744",
                                                border: "1.5px solid #c8d0e8",
                                                borderRadius: 8,
                                                padding: "5px 9px",
                                                fontSize: 11,
                                                fontWeight: 700,
                                                cursor: "pointer",
                                                fontFamily: "'DM Sans', sans-serif"
                                            },
                                            children: "↩ Mark Returned"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/requests/page.tsx",
                                            lineNumber: 195,
                                            columnNumber: 21
                                        }, this),
                                        r.status === "returned" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: 12,
                                                color: "#4caf6e",
                                                fontWeight: 600,
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 4
                                            },
                                            children: [
                                                "✓ Returned ",
                                                r.returnedDate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: 10,
                                                        color: "#8a8ea8",
                                                        fontWeight: 400
                                                    },
                                                    children: [
                                                        "(",
                                                        r.returnedDate,
                                                        ")"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/admin/requests/page.tsx",
                                                    lineNumber: 199,
                                                    columnNumber: 53
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/admin/requests/page.tsx",
                                            lineNumber: 198,
                                            columnNumber: 21
                                        }, this),
                                        r.status === "rejected" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: 11,
                                                color: "#c94040",
                                                fontStyle: "italic"
                                            },
                                            title: r.rejectReason,
                                            children: "Rejected"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/requests/page.tsx",
                                            lineNumber: 203,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/requests/page.tsx",
                                    lineNumber: 187,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, r.id, true, {
                            fileName: "[project]/src/app/admin/requests/page.tsx",
                            lineNumber: 176,
                            columnNumber: 15
                        }, this);
                    })
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/requests/page.tsx",
                lineNumber: 160,
                columnNumber: 7
            }, this),
            rejectReqModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                onClick: (e)=>e.target === e.currentTarget && setRejectReqModal(null),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        background: "#fff",
                        borderRadius: 22,
                        padding: "26px 28px",
                        maxWidth: 420,
                        width: "100%",
                        boxShadow: "0 24px 64px rgba(26,39,68,.18)",
                        animation: "fadeUp .25s ease"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: 10,
                                fontWeight: 700,
                                letterSpacing: ".1em",
                                textTransform: "uppercase",
                                color: "#c94040",
                                marginBottom: 8
                            },
                            children: [
                                "Reject ",
                                rejectReqModal.type,
                                " Request"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/requests/page.tsx",
                            lineNumber: 216,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontFamily: "'DM Serif Display', serif",
                                fontSize: 18,
                                color: "#1a2744",
                                marginBottom: 2
                            },
                            children: rejectReqModal.student
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/requests/page.tsx",
                            lineNumber: 217,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: 12,
                                color: "#8a8ea8",
                                marginBottom: 6
                            },
                            children: rejectReqModal.studentId
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/requests/page.tsx",
                            lineNumber: 218,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: 13,
                                color: "#64748b",
                                marginBottom: 16
                            },
                            children: [
                                "Book: ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    style: {
                                        color: "#1a2744"
                                    },
                                    children: rejectReqModal.book
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/requests/page.tsx",
                                    lineNumber: 219,
                                    columnNumber: 85
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/requests/page.tsx",
                            lineNumber: 219,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginBottom: 16
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    style: {
                                        fontSize: 11,
                                        fontWeight: 700,
                                        letterSpacing: ".08em",
                                        textTransform: "uppercase",
                                        color: "#1a2744",
                                        display: "block",
                                        marginBottom: 7
                                    },
                                    children: "Reason for Rejection *"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/requests/page.tsx",
                                    lineNumber: 222,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    value: rejectReqReason,
                                    onChange: (e)=>setRejectReqReason(e.target.value),
                                    placeholder: "e.g. Book already at max capacity, Account has overdue books…",
                                    style: {
                                        width: "100%",
                                        background: "#f0ede5",
                                        border: "2px solid transparent",
                                        borderRadius: 11,
                                        padding: "11px 13px",
                                        fontFamily: "'DM Sans', sans-serif",
                                        fontSize: 13.5,
                                        color: "#1a2744",
                                        outline: "none",
                                        resize: "vertical",
                                        minHeight: 80
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/requests/page.tsx",
                                    lineNumber: 223,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/requests/page.tsx",
                            lineNumber: 221,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: 9
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Btn, {
                                    variant: "red",
                                    onClick: ()=>{
                                        if (!rejectReqReason.trim()) {
                                            fireToast("err", "Please provide a reason");
                                            return;
                                        }
                                        rejectReq(rejectReqModal.id, rejectReqReason);
                                    },
                                    children: "Confirm Rejection"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/requests/page.tsx",
                                    lineNumber: 228,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Btn, {
                                    variant: "ghost",
                                    onClick: ()=>setRejectReqModal(null),
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/requests/page.tsx",
                                    lineNumber: 229,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/requests/page.tsx",
                            lineNumber: 227,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/admin/requests/page.tsx",
                    lineNumber: 215,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/admin/requests/page.tsx",
                lineNumber: 214,
                columnNumber: 9
            }, this),
            toast && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "fixed",
                    bottom: 24,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: toast.type === "err" ? "#c94040" : "#2d7a4f",
                    color: "#fff",
                    padding: "12px 22px",
                    borderRadius: 12,
                    fontSize: 13.5,
                    fontWeight: 500,
                    boxShadow: "0 8px 24px rgba(0,0,0,.2)",
                    zIndex: 200,
                    animation: "fadeUp .3s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: 8
                },
                children: [
                    toast.type === "err" ? "⚠️" : "✅",
                    " ",
                    toast.msg
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/requests/page.tsx",
                lineNumber: 237,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/admin/requests/page.tsx",
        lineNumber: 96,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_app_admin_requests_page_tsx_eb2ea91e._.js.map