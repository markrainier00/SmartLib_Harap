(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/admin/approvals/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminApprovalsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
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
const YEARS = [
    "All",
    "1st Year",
    "2nd Year",
    "3rd Year",
    "4th Year",
    "5th Year"
];
const INIT_PENDING = [
    {
        id: 1,
        name: "Reina Dela Torre",
        email: "reina@university.edu",
        studentId: "2025-00101",
        course: "BSCS",
        year: "1st Year",
        dept: "College of Computing",
        date: "Mar 05, 2026",
        status: "pending"
    },
    {
        id: 2,
        name: "Marco Villafuerte",
        email: "marco@university.edu",
        studentId: "2025-00102",
        course: "BSN",
        year: "2nd Year",
        dept: "College of Nursing",
        date: "Mar 05, 2026",
        status: "pending"
    },
    {
        id: 3,
        name: "Jasmine Aquino",
        email: "jasmine@university.edu",
        studentId: "2025-00103",
        course: "BSBA",
        year: "1st Year",
        dept: "College of Business",
        date: "Mar 04, 2026",
        status: "pending"
    },
    {
        id: 4,
        name: "Eugene Macaraeg",
        email: "eugene@university.edu",
        studentId: "2025-00104",
        course: "BSCE",
        year: "3rd Year",
        dept: "College of Engineering",
        date: "Mar 04, 2026",
        status: "pending"
    },
    {
        id: 5,
        name: "Patricia Soriano",
        email: "pat@university.edu",
        studentId: "2025-00105",
        course: "BSMATH",
        year: "2nd Year",
        dept: "College of Science",
        date: "Mar 03, 2026",
        status: "pending"
    },
    {
        id: 6,
        name: "Lorenzo Bautista",
        email: "lorenzo@university.edu",
        studentId: "2025-00106",
        course: "BSPharma",
        year: "1st Year",
        dept: "College of Pharmacy",
        date: "Mar 03, 2026",
        status: "approved"
    },
    {
        id: 7,
        name: "Camille Reyes",
        email: "camille@university.edu",
        studentId: "2025-00107",
        course: "BSIT",
        year: "2nd Year",
        dept: "College of Computing",
        date: "Mar 02, 2026",
        status: "approved"
    },
    {
        id: 8,
        name: "Danilo Santos",
        email: "danilo@university.edu",
        studentId: "2025-00108",
        course: "BSAcc",
        year: "3rd Year",
        dept: "College of Accountancy",
        date: "Mar 02, 2026",
        status: "rejected"
    },
    {
        id: 9,
        name: "Rhea Mendoza",
        email: "rhea@university.edu",
        studentId: "2025-00109",
        course: "BSCHE",
        year: "1st Year",
        dept: "College of Engineering",
        date: "Mar 01, 2026",
        status: "pending"
    },
    {
        id: 10,
        name: "Francis Tan",
        email: "francis@university.edu",
        studentId: "2025-00110",
        course: "BSBio",
        year: "2nd Year",
        dept: "College of Science",
        date: "Mar 01, 2026",
        status: "rejected"
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
        amber: [
            "#fef5e6",
            "#a06010"
        ],
        navy: [
            "#e8ecf5",
            "#1a2744"
        ]
    };
    const [bg, fg] = m[type] || m.navy;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
        fileName: "[project]/src/app/admin/approvals/page.tsx",
        lineNumber: 28,
        columnNumber: 10
    }, this);
}
_c = Badge;
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        style: {
            ...base,
            ...v[variant]
        },
        onClick: onClick,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/app/admin/approvals/page.tsx",
        lineNumber: 38,
        columnNumber: 10
    }, this);
}
_c1 = Btn;
function AdminApprovalsPage() {
    _s();
    const [pending, setPending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(INIT_PENDING);
    const [appTab, setAppTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("pending"); // pending | approved | rejected | all
    const [appSearch, setAppSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [appCourse, setAppCourse] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("All");
    const [appYear, setAppYear] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("All");
    const [viewApplicant, setViewApplicant] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [rejectModal, setRejectModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [rejectReason, setRejectReason] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [toast, setToast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fireToast = (type, msg)=>{
        setToast({
            type,
            msg
        });
        setTimeout(()=>setToast(null), 3000);
    };
    const filtPending = pending.filter((p)=>{
        const ms = p.name.toLowerCase().includes(appSearch.toLowerCase()) || p.email.toLowerCase().includes(appSearch.toLowerCase()) || p.studentId.toLowerCase().includes(appSearch.toLowerCase());
        const mt = appTab === "all" || p.status === appTab;
        const mc = appCourse === "All" || p.course === appCourse;
        const my = appYear === "All" || p.year === appYear;
        return ms && mt && mc && my;
    }).sort((a, b)=>a.name.localeCompare(b.name));
    const approve = (id)=>{
        setPending((prev)=>prev.map((p)=>p.id === id ? {
                    ...p,
                    status: "approved"
                } : p));
        fireToast("ok", "Student registration approved! Email sent.");
        setViewApplicant(null);
    };
    const reject = (id, reason)=>{
        setPending((prev)=>prev.map((p)=>p.id === id ? {
                    ...p,
                    status: "rejected",
                    rejectReason: reason
                } : p));
        fireToast("ok", "Registration rejected. Student has been notified.");
        setRejectModal(null);
        setViewApplicant(null);
        setRejectReason("");
    };
    const tabCounts = {
        pending: pending.filter((p)=>p.status === "pending").length,
        approved: pending.filter((p)=>p.status === "approved").length,
        rejected: pending.filter((p)=>p.status === "rejected").length,
        all: pending.length
    };
    const statusColor = {
        pending: "amber",
        approved: "green",
        rejected: "red"
    };
    const statusLabel = {
        pending: "⏳ Pending",
        approved: "✓ Approved",
        rejected: "✗ Rejected"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            animation: "fadeUp .3s ease"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        .row-hover:hover { background: #f7f5f0 !important; }
      `
            }, void 0, false, {
                fileName: "[project]/src/app/admin/approvals/page.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: 22
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontFamily: "'DM Serif Display', serif",
                            fontSize: 24,
                            color: "#1a2744"
                        },
                        children: "Registration Approvals"
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/approvals/page.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 13,
                            color: "#8a8ea8",
                            marginTop: 2
                        },
                        children: "Review and approve student registration requests"
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/approvals/page.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/approvals/page.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                    gap: 12,
                    marginBottom: 24
                },
                children: [
                    {
                        label: "Pending",
                        val: tabCounts.pending,
                        color: "#e8a020",
                        bg: "#fff8e6",
                        icon: "⏳"
                    },
                    {
                        label: "Approved",
                        val: tabCounts.approved,
                        color: "#2d7a4f",
                        bg: "#e6f7ec",
                        icon: "✅"
                    },
                    {
                        label: "Rejected",
                        val: tabCounts.rejected,
                        color: "#c94040",
                        bg: "#fdeaea",
                        icon: "✗"
                    },
                    {
                        label: "Total",
                        val: tabCounts.all,
                        color: "#2563eb",
                        bg: "#e8f1fd",
                        icon: "📋"
                    }
                ].map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: "#fff",
                            borderRadius: 14,
                            border: "1px solid #e2dfd6",
                            padding: "16px 18px",
                            boxShadow: "0 2px 12px rgba(26,39,68,.06)",
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            cursor: "pointer"
                        },
                        onClick: ()=>setAppTab(s.label.toLowerCase()),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 40,
                                    height: 40,
                                    borderRadius: 11,
                                    background: s.bg,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 18,
                                    flexShrink: 0
                                },
                                children: s.icon
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/approvals/page.tsx",
                                lineNumber: 113,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontFamily: "'DM Serif Display', serif",
                                            fontSize: 26,
                                            color: s.color,
                                            lineHeight: 1
                                        },
                                        children: s.val
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/approvals/page.tsx",
                                        lineNumber: 115,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 12,
                                            color: "#8a8ea8",
                                            marginTop: 2
                                        },
                                        children: s.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/approvals/page.tsx",
                                        lineNumber: 116,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/approvals/page.tsx",
                                lineNumber: 114,
                                columnNumber: 13
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/src/app/admin/approvals/page.tsx",
                        lineNumber: 111,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/admin/approvals/page.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    borderBottom: "2px solid #e2dfd6",
                    marginBottom: 14
                },
                children: [
                    "pending",
                    "approved",
                    "rejected",
                    "all"
                ].map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setAppTab(t),
                        style: {
                            background: "none",
                            border: "none",
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 13,
                            fontWeight: 600,
                            padding: "9px 16px",
                            cursor: "pointer",
                            color: appTab === t ? "#1a2744" : "#8a8ea8",
                            borderBottom: `2px solid ${appTab === t ? "#1a2744" : "transparent"}`,
                            marginBottom: -2,
                            transition: "all .18s",
                            textTransform: "capitalize",
                            display: "flex",
                            alignItems: "center",
                            gap: 6
                        },
                        children: [
                            t,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    background: appTab === t ? "#1a2744" : "#f0ede5",
                                    color: appTab === t ? "#fff" : "#8a8ea8",
                                    borderRadius: 20,
                                    fontSize: 10,
                                    fontWeight: 700,
                                    padding: "1px 7px"
                                },
                                children: tabCounts[t]
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/approvals/page.tsx",
                                lineNumber: 128,
                                columnNumber: 13
                            }, this)
                        ]
                    }, t, true, {
                        fileName: "[project]/src/app/admin/approvals/page.tsx",
                        lineNumber: 125,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/admin/approvals/page.tsx",
                lineNumber: 123,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    gap: 10,
                    marginBottom: 16,
                    flexWrap: "wrap",
                    alignItems: "center"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: "relative",
                            flex: 1,
                            minWidth: 180
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                fileName: "[project]/src/app/admin/approvals/page.tsx",
                                lineNumber: 136,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: appSearch,
                                onChange: (e)=>setAppSearch(e.target.value),
                                placeholder: "Search name, email, ID…",
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
                                fileName: "[project]/src/app/admin/approvals/page.tsx",
                                lineNumber: 137,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/approvals/page.tsx",
                        lineNumber: 135,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: appCourse,
                        onChange: (e)=>setAppCourse(e.target.value),
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
                        children: COURSES.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                children: c
                            }, c, false, {
                                fileName: "[project]/src/app/admin/approvals/page.tsx",
                                lineNumber: 141,
                                columnNumber: 29
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/approvals/page.tsx",
                        lineNumber: 140,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: appYear,
                        onChange: (e)=>setAppYear(e.target.value),
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
                        children: YEARS.map((y)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                children: y
                            }, y, false, {
                                fileName: "[project]/src/app/admin/approvals/page.tsx",
                                lineNumber: 144,
                                columnNumber: 27
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/approvals/page.tsx",
                        lineNumber: 143,
                        columnNumber: 9
                    }, this),
                    (appCourse !== "All" || appYear !== "All" || appSearch) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            setAppCourse("All");
                            setAppYear("All");
                            setAppSearch("");
                        },
                        style: {
                            background: "transparent",
                            border: "1.5px solid #e2dfd6",
                            borderRadius: 9,
                            padding: "7px 13px",
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 12,
                            color: "#8a8ea8",
                            cursor: "pointer",
                            whiteSpace: "nowrap"
                        },
                        children: "✕ Reset"
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/approvals/page.tsx",
                        lineNumber: 147,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginLeft: "auto",
                            fontSize: 12,
                            color: "#8a8ea8",
                            whiteSpace: "nowrap"
                        },
                        children: [
                            filtPending.length,
                            " result",
                            filtPending.length !== 1 ? "s" : ""
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/approvals/page.tsx",
                        lineNumber: 152,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/approvals/page.tsx",
                lineNumber: 134,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: "#fff",
                    borderRadius: 16,
                    border: "1px solid #e2dfd6",
                    boxShadow: "0 2px 12px rgba(26,39,68,.06)",
                    overflow: "hidden"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "grid",
                            gridTemplateColumns: "2.2fr 2fr 1fr 1fr 1fr 1.6fr",
                            padding: "11px 20px",
                            background: "#f7f5f0",
                            borderBottom: "1px solid #e2dfd6"
                        },
                        children: [
                            "Applicant",
                            "Email",
                            "Student ID",
                            "Course",
                            "Date",
                            "Actions"
                        ].map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 10.5,
                                    fontWeight: 700,
                                    color: "#8a8ea8",
                                    letterSpacing: ".06em",
                                    textTransform: "uppercase"
                                },
                                children: h
                            }, h, false, {
                                fileName: "[project]/src/app/admin/approvals/page.tsx",
                                lineNumber: 159,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/approvals/page.tsx",
                        lineNumber: 157,
                        columnNumber: 9
                    }, this),
                    filtPending.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: 40,
                            textAlign: "center",
                            color: "#8a8ea8"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 36,
                                    marginBottom: 8
                                },
                                children: "📭"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/approvals/page.tsx",
                                lineNumber: 165,
                                columnNumber: 13
                            }, this),
                            "No registrations found"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/approvals/page.tsx",
                        lineNumber: 164,
                        columnNumber: 11
                    }, this) : filtPending.map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "row-hover",
                            style: {
                                display: "grid",
                                gridTemplateColumns: "2.2fr 2fr 1fr 1fr 1fr 1.6fr",
                                padding: "13px 20px",
                                borderBottom: i < filtPending.length - 1 ? "1px solid #f2efe8" : "none",
                                alignItems: "center",
                                transition: "background .15s",
                                background: p.status === "pending" ? "#fffdf5" : "#fff"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,
                                        cursor: "pointer"
                                    },
                                    onClick: ()=>setViewApplicant(p),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: 34,
                                                height: 34,
                                                borderRadius: "50%",
                                                background: `linear-gradient(135deg,#3d8bef,#4caf6e)`,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                color: "#fff",
                                                fontSize: 13,
                                                fontWeight: 700,
                                                flexShrink: 0
                                            },
                                            children: p.name[0]
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/approvals/page.tsx",
                                            lineNumber: 172,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: 13,
                                                        fontWeight: 600,
                                                        color: "#1a2744"
                                                    },
                                                    children: p.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/approvals/page.tsx",
                                                    lineNumber: 174,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: 10.5,
                                                        color: "#8a8ea8"
                                                    },
                                                    children: [
                                                        p.year,
                                                        " · ",
                                                        p.dept.split(" ").slice(-1)[0]
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/admin/approvals/page.tsx",
                                                    lineNumber: 175,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/admin/approvals/page.tsx",
                                            lineNumber: 173,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/approvals/page.tsx",
                                    lineNumber: 171,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 12.5,
                                        color: "#64748b"
                                    },
                                    children: p.email
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/approvals/page.tsx",
                                    lineNumber: 178,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 12.5,
                                        fontFamily: "monospace",
                                        color: "#1a2744",
                                        fontWeight: 600
                                    },
                                    children: p.studentId
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/approvals/page.tsx",
                                    lineNumber: 179,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
                                        label: p.course,
                                        type: "navy"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/approvals/page.tsx",
                                        lineNumber: 180,
                                        columnNumber: 20
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/approvals/page.tsx",
                                    lineNumber: 180,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 12,
                                        color: "#8a8ea8"
                                    },
                                    children: p.date
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/approvals/page.tsx",
                                    lineNumber: 181,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        gap: 6,
                                        alignItems: "center"
                                    },
                                    children: [
                                        p.status === "pending" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>approve(p.id),
                                                    style: {
                                                        background: "#e6f7ec",
                                                        color: "#2d7a4f",
                                                        border: "1.5px solid #b6e8c4",
                                                        borderRadius: 8,
                                                        padding: "5px 10px",
                                                        fontSize: 11.5,
                                                        fontWeight: 600,
                                                        cursor: "pointer",
                                                        fontFamily: "'DM Sans', sans-serif",
                                                        transition: "all .15s"
                                                    },
                                                    children: "✓ Approve"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/approvals/page.tsx",
                                                    lineNumber: 186,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        setRejectModal(p);
                                                        setRejectReason("");
                                                    },
                                                    style: {
                                                        background: "#fdeaea",
                                                        color: "#c94040",
                                                        border: "1.5px solid #f5c5c5",
                                                        borderRadius: 8,
                                                        padding: "5px 10px",
                                                        fontSize: 11.5,
                                                        fontWeight: 600,
                                                        cursor: "pointer",
                                                        fontFamily: "'DM Sans', sans-serif",
                                                        transition: "all .15s"
                                                    },
                                                    children: "✗ Reject"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/approvals/page.tsx",
                                                    lineNumber: 187,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
                                            label: statusLabel[p.status],
                                            type: statusColor[p.status]
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/approvals/page.tsx",
                                            lineNumber: 190,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setViewApplicant(p),
                                            style: {
                                                background: "#f0ede5",
                                                border: "1.5px solid #e2dfd6",
                                                borderRadius: 8,
                                                padding: "5px 9px",
                                                fontSize: 13,
                                                cursor: "pointer"
                                            },
                                            children: "👁"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/approvals/page.tsx",
                                            lineNumber: 192,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/approvals/page.tsx",
                                    lineNumber: 183,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, p.id, true, {
                            fileName: "[project]/src/app/admin/approvals/page.tsx",
                            lineNumber: 170,
                            columnNumber: 13
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/approvals/page.tsx",
                lineNumber: 156,
                columnNumber: 7
            }, this),
            viewApplicant && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                onClick: (e)=>e.target === e.currentTarget && setViewApplicant(null),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                marginBottom: 20
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 10,
                                        fontWeight: 700,
                                        letterSpacing: ".1em",
                                        textTransform: "uppercase",
                                        color: "#3d8bef"
                                    },
                                    children: "Registration Request"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/approvals/page.tsx",
                                    lineNumber: 204,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setViewApplicant(null),
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
                                    fileName: "[project]/src/app/admin/approvals/page.tsx",
                                    lineNumber: 205,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/approvals/page.tsx",
                            lineNumber: 203,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                alignItems: "center",
                                gap: 16,
                                marginBottom: 20,
                                padding: "16px",
                                background: "#f7f5f0",
                                borderRadius: 14
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        width: 56,
                                        height: 56,
                                        borderRadius: "50%",
                                        background: "linear-gradient(135deg,#3d8bef,#4caf6e)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "#fff",
                                        fontSize: 22,
                                        fontWeight: 700,
                                        flexShrink: 0
                                    },
                                    children: viewApplicant.name[0]
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/approvals/page.tsx",
                                    lineNumber: 209,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontFamily: "'DM Serif Display', serif",
                                                fontSize: 19,
                                                color: "#1a2744"
                                            },
                                            children: viewApplicant.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/approvals/page.tsx",
                                            lineNumber: 211,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: 12,
                                                color: "#8a8ea8",
                                                marginTop: 2
                                            },
                                            children: viewApplicant.email
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/approvals/page.tsx",
                                            lineNumber: 212,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                marginTop: 8
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
                                                label: statusLabel[viewApplicant.status],
                                                type: statusColor[viewApplicant.status]
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/approvals/page.tsx",
                                                lineNumber: 213,
                                                columnNumber: 47
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/approvals/page.tsx",
                                            lineNumber: 213,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/approvals/page.tsx",
                                    lineNumber: 210,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/approvals/page.tsx",
                            lineNumber: 208,
                            columnNumber: 13
                        }, this),
                        [
                            [
                                "Student ID",
                                viewApplicant.studentId
                            ],
                            [
                                "Course",
                                viewApplicant.course
                            ],
                            [
                                "Year Level",
                                viewApplicant.year
                            ],
                            [
                                "Department",
                                viewApplicant.dept
                            ],
                            [
                                "Applied On",
                                viewApplicant.date
                            ]
                        ].map(([k, v], i, arr)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    justifyContent: "space-between",
                                    padding: "10px 0",
                                    borderBottom: i < arr.length - 1 ? "1px solid #f2efe8" : "none"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: 13,
                                            color: "#64748b"
                                        },
                                        children: k
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/approvals/page.tsx",
                                        lineNumber: 225,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: 13,
                                            fontWeight: 600,
                                            color: "#1a2744"
                                        },
                                        children: v
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/approvals/page.tsx",
                                        lineNumber: 226,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, k, true, {
                                fileName: "[project]/src/app/admin/approvals/page.tsx",
                                lineNumber: 224,
                                columnNumber: 15
                            }, this)),
                        viewApplicant.rejectReason && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginTop: 14,
                                background: "#fdeaea",
                                border: "1px solid #f5c5c5",
                                borderRadius: 10,
                                padding: "10px 14px"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 11,
                                        fontWeight: 700,
                                        color: "#c94040",
                                        marginBottom: 4
                                    },
                                    children: "REJECTION REASON"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/approvals/page.tsx",
                                    lineNumber: 232,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 13,
                                        color: "#64748b"
                                    },
                                    children: viewApplicant.rejectReason
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/approvals/page.tsx",
                                    lineNumber: 233,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/approvals/page.tsx",
                            lineNumber: 231,
                            columnNumber: 15
                        }, this),
                        viewApplicant.status === "pending" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: 9,
                                marginTop: 20
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Btn, {
                                    onClick: ()=>approve(viewApplicant.id),
                                    children: "✓ Approve"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/approvals/page.tsx",
                                    lineNumber: 239,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Btn, {
                                    variant: "red",
                                    onClick: ()=>{
                                        setRejectModal(viewApplicant);
                                        setRejectReason("");
                                        setViewApplicant(null);
                                    },
                                    children: "✗ Reject"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/approvals/page.tsx",
                                    lineNumber: 240,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Btn, {
                                    variant: "ghost",
                                    onClick: ()=>setViewApplicant(null),
                                    children: "Close"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/approvals/page.tsx",
                                    lineNumber: 241,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/approvals/page.tsx",
                            lineNumber: 238,
                            columnNumber: 15
                        }, this),
                        viewApplicant.status !== "pending" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Btn, {
                            variant: "ghost",
                            style: {
                                marginTop: 18,
                                width: "100%",
                                justifyContent: "center"
                            },
                            onClick: ()=>setViewApplicant(null),
                            children: "Close"
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/approvals/page.tsx",
                            lineNumber: 245,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/admin/approvals/page.tsx",
                    lineNumber: 202,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/admin/approvals/page.tsx",
                lineNumber: 201,
                columnNumber: 9
            }, this),
            rejectModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "fixed",
                    inset: 0,
                    background: "rgba(26,39,68,.5)",
                    backdropFilter: "blur(6px)",
                    zIndex: 91,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 20
                },
                onClick: (e)=>e.target === e.currentTarget && setRejectModal(null),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: 10,
                                fontWeight: 700,
                                letterSpacing: ".1em",
                                textTransform: "uppercase",
                                color: "#c94040",
                                marginBottom: 8
                            },
                            children: "Reject Registration"
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/approvals/page.tsx",
                            lineNumber: 255,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontFamily: "'DM Serif Display', serif",
                                fontSize: 19,
                                color: "#1a2744",
                                marginBottom: 4
                            },
                            children: rejectModal.name
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/approvals/page.tsx",
                            lineNumber: 256,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: 12,
                                color: "#8a8ea8",
                                marginBottom: 18
                            },
                            children: [
                                rejectModal.email,
                                " · ",
                                rejectModal.studentId
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/approvals/page.tsx",
                            lineNumber: 257,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginBottom: 18
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
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
                                    fileName: "[project]/src/app/admin/approvals/page.tsx",
                                    lineNumber: 260,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    value: rejectReason,
                                    onChange: (e)=>setRejectReason(e.target.value),
                                    placeholder: "e.g. Incomplete requirements, Invalid student ID, Duplicate account…",
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
                                        minHeight: 90
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/approvals/page.tsx",
                                    lineNumber: 261,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/approvals/page.tsx",
                            lineNumber: 259,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                background: "#fff8e6",
                                border: "1px solid #fde8b0",
                                borderRadius: 10,
                                padding: "10px 14px",
                                marginBottom: 18
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 12,
                                    color: "#a06010"
                                },
                                children: "📧 The student will receive an email notification with this reason."
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/approvals/page.tsx",
                                lineNumber: 265,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/approvals/page.tsx",
                            lineNumber: 264,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: 9
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Btn, {
                                    variant: "red",
                                    onClick: ()=>{
                                        if (!rejectReason.trim()) {
                                            fireToast("err", "Please provide a reason");
                                            return;
                                        }
                                        reject(rejectModal.id, rejectReason);
                                    },
                                    children: "Confirm Rejection"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/approvals/page.tsx",
                                    lineNumber: 269,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Btn, {
                                    variant: "ghost",
                                    onClick: ()=>setRejectModal(null),
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/approvals/page.tsx",
                                    lineNumber: 270,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/approvals/page.tsx",
                            lineNumber: 268,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/admin/approvals/page.tsx",
                    lineNumber: 254,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/admin/approvals/page.tsx",
                lineNumber: 253,
                columnNumber: 9
            }, this),
            toast && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                fileName: "[project]/src/app/admin/approvals/page.tsx",
                lineNumber: 278,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/admin/approvals/page.tsx",
        lineNumber: 91,
        columnNumber: 5
    }, this);
}
_s(AdminApprovalsPage, "OrZp1MpACpBjGNFbTOFU9kScqlM=");
_c2 = AdminApprovalsPage;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "Badge");
__turbopack_context__.k.register(_c1, "Btn");
__turbopack_context__.k.register(_c2, "AdminApprovalsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_admin_approvals_page_tsx_0449554b._.js.map