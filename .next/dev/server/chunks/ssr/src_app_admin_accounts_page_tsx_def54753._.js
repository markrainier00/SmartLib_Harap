module.exports = [
"[project]/src/app/admin/accounts/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminAccountsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
/* ─── HELPERS & MOCK DATA ───────────────────────────────── */ const INIT_ACCOUNTS = [
    {
        id: "ACC-0001",
        name: "Bryan Lumangaya",
        email: "bryan@smartlib.edu",
        role: "admin",
        status: "active",
        lastLogin: "Mar 06, 2026",
        joined: "Jan 10, 2026",
        booksBorrowed: 0
    },
    {
        id: "ACC-0002",
        name: "Ana Lim",
        email: "ana@smartlib.edu",
        role: "admin",
        status: "active",
        lastLogin: "Mar 05, 2026",
        joined: "Jan 12, 2026",
        booksBorrowed: 0
    },
    {
        id: "ACC-0101",
        name: "Juan dela Cruz",
        email: "juan@university.edu",
        role: "student",
        status: "active",
        lastLogin: "Mar 06, 2026",
        joined: "Feb 10, 2026",
        booksBorrowed: 12
    },
    {
        id: "ACC-0102",
        name: "Maria Santos",
        email: "maria@university.edu",
        role: "student",
        status: "locked",
        lastLogin: "Feb 28, 2026",
        joined: "Feb 15, 2026",
        booksBorrowed: 4
    },
    {
        id: "ACC-0103",
        name: "Sofia Manalo",
        email: "sofia@university.edu",
        role: "student",
        status: "active",
        lastLogin: "Mar 04, 2026",
        joined: "Feb 20, 2026",
        booksBorrowed: 8
    },
    {
        id: "ACC-0104",
        name: "Pedro Bautista",
        email: "pedro@university.edu",
        role: "student",
        status: "active",
        lastLogin: "Mar 01, 2026",
        joined: "Jan 15, 2026",
        booksBorrowed: 15
    },
    {
        id: "ACC-0105",
        name: "Mark Villanueva",
        email: "mark@university.edu",
        role: "student",
        status: "locked",
        lastLogin: "Feb 18, 2026",
        joined: "Feb 18, 2026",
        booksBorrowed: 2
    },
    {
        id: "ACC-0106",
        name: "Luz Garcia",
        email: "luz@university.edu",
        role: "student",
        status: "active",
        lastLogin: "Mar 05, 2026",
        joined: "Mar 01, 2026",
        booksBorrowed: 1
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
        purple: [
            "#f3e8ff",
            "#7c3aed"
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
        fileName: "[project]/src/app/admin/accounts/page.tsx",
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
        },
        amber: {
            background: "#fff8e6",
            color: "#a06010",
            border: "2px solid #fde8b0"
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
        fileName: "[project]/src/app/admin/accounts/page.tsx",
        lineNumber: 35,
        columnNumber: 10
    }, this);
}
function AdminAccountsPage() {
    const [accounts, setAccounts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(INIT_ACCOUNTS);
    const [accSearch, setAccSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [accRole, setAccRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("All");
    const [accStatus, setAccStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("All");
    const [viewAcc, setViewAcc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [actionModal, setActionModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null); // { type: 'lock' | 'unlock' | 'delete', acc }
    const [toast, setToast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const fireToast = (type, msg)=>{
        setToast({
            type,
            msg
        });
        setTimeout(()=>setToast(null), 3000);
    };
    const filtAccs = accounts.filter((a)=>{
        const ms = a.name.toLowerCase().includes(accSearch.toLowerCase()) || a.email.toLowerCase().includes(accSearch.toLowerCase()) || a.id.toLowerCase().includes(accSearch.toLowerCase());
        const mr = accRole === "All" || a.role === accRole;
        const mt = accStatus === "All" || a.status === accStatus;
        return ms && mr && mt;
    }).sort((a, b)=>{
        if (a.role !== b.role) return a.role === "admin" ? -1 : 1;
        return a.name.localeCompare(b.name);
    });
    const stats = {
        total: accounts.length,
        active: accounts.filter((a)=>a.status === "active").length,
        locked: accounts.filter((a)=>a.status === "locked").length,
        admins: accounts.filter((a)=>a.role === "admin").length
    };
    const handleAction = ()=>{
        if (!actionModal) return;
        const { type, acc } = actionModal;
        if (type === "delete") {
            if (acc.role === "admin" && stats.admins <= 1) {
                fireToast("err", "Cannot delete the last admin account!");
            } else {
                setAccounts((prev)=>prev.filter((a)=>a.id !== acc.id));
                fireToast("ok", "Account permanently deleted.");
            }
        } else if (type === "lock") {
            if (acc.role === "admin") {
                fireToast("err", "Cannot lock an admin account!");
            } else {
                setAccounts((prev)=>prev.map((a)=>a.id === acc.id ? {
                            ...a,
                            status: "locked"
                        } : a));
                fireToast("ok", "Account has been locked.");
            }
        } else if (type === "unlock") {
            setAccounts((prev)=>prev.map((a)=>a.id === acc.id ? {
                        ...a,
                        status: "active"
                    } : a));
            fireToast("ok", "Account restored and unlocked.");
        }
        setActionModal(null);
        setViewAcc(null);
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
        .action-icon { background: #f0ede5; border: 1.5px solid #e2dfd6; border-radius: 8px; padding: 5px 9px; font-size: 13px; cursor: pointer; transition: all .15s; }
        .action-icon:hover { background: #e2dfd6; }
      `
            }, void 0, false, {
                fileName: "[project]/src/app/admin/accounts/page.tsx",
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
                        children: "Manage Accounts"
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/accounts/page.tsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 13,
                            color: "#8a8ea8",
                            marginTop: 2
                        },
                        children: "View, update, or restrict user access to the library"
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/accounts/page.tsx",
                        lineNumber: 110,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/accounts/page.tsx",
                lineNumber: 108,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                    gap: 12,
                    marginBottom: 22
                },
                children: [
                    {
                        label: "Total Users",
                        val: stats.total,
                        color: "#2563eb",
                        bg: "#e8f1fd",
                        icon: "👥"
                    },
                    {
                        label: "Active",
                        val: stats.active,
                        color: "#2d7a4f",
                        bg: "#e6f7ec",
                        icon: "✅"
                    },
                    {
                        label: "Locked",
                        val: stats.locked,
                        color: "#c94040",
                        bg: "#fdeaea",
                        icon: "🔒"
                    },
                    {
                        label: "Admins",
                        val: stats.admins,
                        color: "#7c3aed",
                        bg: "#f3e8ff",
                        icon: "🛡️"
                    }
                ].map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: "#fff",
                            borderRadius: 14,
                            border: "1px solid #e2dfd6",
                            padding: "16px 18px",
                            boxShadow: "0 2px 12px rgba(26,39,68,.06)",
                            display: "flex",
                            alignItems: "center",
                            gap: 12
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                fileName: "[project]/src/app/admin/accounts/page.tsx",
                                lineNumber: 122,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontFamily: "'DM Serif Display', serif",
                                            fontSize: 26,
                                            color: s.color,
                                            lineHeight: 1
                                        },
                                        children: s.val
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/accounts/page.tsx",
                                        lineNumber: 124,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 12,
                                            color: "#8a8ea8",
                                            marginTop: 2
                                        },
                                        children: s.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/accounts/page.tsx",
                                        lineNumber: 125,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/accounts/page.tsx",
                                lineNumber: 123,
                                columnNumber: 13
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/src/app/admin/accounts/page.tsx",
                        lineNumber: 121,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/admin/accounts/page.tsx",
                lineNumber: 114,
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
                                fileName: "[project]/src/app/admin/accounts/page.tsx",
                                lineNumber: 134,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: accSearch,
                                onChange: (e)=>setAccSearch(e.target.value),
                                placeholder: "Search name, email, or ID…",
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
                                fileName: "[project]/src/app/admin/accounts/page.tsx",
                                lineNumber: 135,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/accounts/page.tsx",
                        lineNumber: 133,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: accRole,
                        onChange: (e)=>setAccRole(e.target.value),
                        style: {
                            background: "#fff",
                            border: "2px solid #e2dfd6",
                            borderRadius: 11,
                            padding: "9px 14px",
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 13,
                            color: "#1a2744",
                            outline: "none",
                            cursor: "pointer"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "All",
                                children: "All Roles"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/accounts/page.tsx",
                                lineNumber: 140,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "student",
                                children: "Student"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/accounts/page.tsx",
                                lineNumber: 141,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "admin",
                                children: "Admin"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/accounts/page.tsx",
                                lineNumber: 142,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/accounts/page.tsx",
                        lineNumber: 139,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: accStatus,
                        onChange: (e)=>setAccStatus(e.target.value),
                        style: {
                            background: "#fff",
                            border: "2px solid #e2dfd6",
                            borderRadius: 11,
                            padding: "9px 14px",
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 13,
                            color: "#1a2744",
                            outline: "none",
                            cursor: "pointer"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "All",
                                children: "All Status"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/accounts/page.tsx",
                                lineNumber: 146,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "active",
                                children: "Active"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/accounts/page.tsx",
                                lineNumber: 147,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "locked",
                                children: "Locked"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/accounts/page.tsx",
                                lineNumber: 148,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/accounts/page.tsx",
                        lineNumber: 145,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginLeft: "auto",
                            fontSize: 12,
                            color: "#8a8ea8"
                        },
                        children: [
                            filtAccs.length,
                            " user",
                            filtAccs.length !== 1 ? "s" : ""
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/accounts/page.tsx",
                        lineNumber: 151,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/accounts/page.tsx",
                lineNumber: 132,
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
                            gridTemplateColumns: "2.5fr 2fr 1fr 1fr 1.2fr 1.2fr",
                            padding: "11px 20px",
                            background: "#f7f5f0",
                            borderBottom: "1px solid #e2dfd6"
                        },
                        children: [
                            "User Details",
                            "Email Address",
                            "Role",
                            "Status",
                            "Last Login",
                            "Actions"
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
                                fileName: "[project]/src/app/admin/accounts/page.tsx",
                                lineNumber: 158,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/accounts/page.tsx",
                        lineNumber: 156,
                        columnNumber: 9
                    }, this),
                    filtAccs.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                fileName: "[project]/src/app/admin/accounts/page.tsx",
                                lineNumber: 164,
                                columnNumber: 13
                            }, this),
                            "No accounts match your filters"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/accounts/page.tsx",
                        lineNumber: 163,
                        columnNumber: 11
                    }, this) : filtAccs.map((a, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "row-hover",
                            style: {
                                display: "grid",
                                gridTemplateColumns: "2.5fr 2fr 1fr 1fr 1.2fr 1.2fr",
                                padding: "12px 20px",
                                borderBottom: i < filtAccs.length - 1 ? "1px solid #f2efe8" : "none",
                                alignItems: "center",
                                transition: "background .15s",
                                background: a.status === "locked" ? "#fdfbfb" : "#fff"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 11,
                                        cursor: "pointer"
                                    },
                                    onClick: ()=>setViewAcc(a),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: 36,
                                                height: 36,
                                                borderRadius: "50%",
                                                background: a.role === "admin" ? "linear-gradient(135deg,#7c3aed,#3b1f6e)" : "linear-gradient(135deg,#3d8bef,#4caf6e)",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                color: "#fff",
                                                fontSize: 14,
                                                fontWeight: 700,
                                                flexShrink: 0,
                                                opacity: a.status === "locked" ? 0.5 : 1
                                            },
                                            children: a.name[0]
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/accounts/page.tsx",
                                            lineNumber: 171,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: 13.5,
                                                        fontWeight: 700,
                                                        color: a.status === "locked" ? "#8a8ea8" : "#1a2744"
                                                    },
                                                    children: a.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/accounts/page.tsx",
                                                    lineNumber: 175,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: 10.5,
                                                        color: "#8a8ea8",
                                                        fontFamily: "monospace",
                                                        marginTop: 2
                                                    },
                                                    children: a.id
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/accounts/page.tsx",
                                                    lineNumber: 176,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/admin/accounts/page.tsx",
                                            lineNumber: 174,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/accounts/page.tsx",
                                    lineNumber: 170,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 13,
                                        color: "#64748b"
                                    },
                                    children: a.email
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/accounts/page.tsx",
                                    lineNumber: 179,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
                                        label: a.role === "admin" ? "🛡️ Admin" : "Student",
                                        type: a.role === "admin" ? "purple" : "navy"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/accounts/page.tsx",
                                        lineNumber: 180,
                                        columnNumber: 20
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/accounts/page.tsx",
                                    lineNumber: 180,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
                                        label: a.status === "active" ? "✓ Active" : "🔒 Locked",
                                        type: a.status === "active" ? "green" : "red"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/accounts/page.tsx",
                                        lineNumber: 181,
                                        columnNumber: 20
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/accounts/page.tsx",
                                    lineNumber: 181,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 12.5,
                                        color: "#64748b"
                                    },
                                    children: a.lastLogin
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/accounts/page.tsx",
                                    lineNumber: 182,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        gap: 6
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "action-icon",
                                            onClick: ()=>setViewAcc(a),
                                            title: "View Details",
                                            children: "👁"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/accounts/page.tsx",
                                            lineNumber: 185,
                                            columnNumber: 17
                                        }, this),
                                        a.role !== "admin" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "action-icon",
                                            style: {
                                                background: a.status === "active" ? "#fff8e6" : "#e6f7ec",
                                                borderColor: a.status === "active" ? "#fde8b0" : "#b6e8c4",
                                                color: a.status === "active" ? "#a06010" : "#2d7a4f"
                                            },
                                            onClick: ()=>setActionModal({
                                                    type: a.status === "active" ? "lock" : "unlock",
                                                    acc: a
                                                }),
                                            title: a.status === "active" ? "Lock Account" : "Unlock Account",
                                            children: a.status === "active" ? "🔒" : "🔓"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/accounts/page.tsx",
                                            lineNumber: 187,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "action-icon",
                                            style: {
                                                background: "#fdeaea",
                                                borderColor: "#f5c5c5",
                                                color: "#c94040"
                                            },
                                            onClick: ()=>setActionModal({
                                                    type: "delete",
                                                    acc: a
                                                }),
                                            title: "Delete Account",
                                            children: "🗑"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/accounts/page.tsx",
                                            lineNumber: 193,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/accounts/page.tsx",
                                    lineNumber: 184,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, a.id, true, {
                            fileName: "[project]/src/app/admin/accounts/page.tsx",
                            lineNumber: 169,
                            columnNumber: 13
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/accounts/page.tsx",
                lineNumber: 155,
                columnNumber: 7
            }, this),
            viewAcc && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                onClick: (e)=>e.target === e.currentTarget && setViewAcc(null),
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
                                    style: {
                                        fontSize: 10,
                                        fontWeight: 700,
                                        letterSpacing: ".1em",
                                        textTransform: "uppercase",
                                        color: "#3d8bef"
                                    },
                                    children: "User Profile"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/accounts/page.tsx",
                                    lineNumber: 205,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setViewAcc(null),
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
                                    fileName: "[project]/src/app/admin/accounts/page.tsx",
                                    lineNumber: 206,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/accounts/page.tsx",
                            lineNumber: 204,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        width: 64,
                                        height: 64,
                                        borderRadius: "50%",
                                        background: viewAcc.role === "admin" ? "linear-gradient(135deg,#7c3aed,#3b1f6e)" : "linear-gradient(135deg,#3d8bef,#4caf6e)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "#fff",
                                        fontSize: 26,
                                        fontWeight: 700,
                                        flexShrink: 0,
                                        opacity: viewAcc.status === "locked" ? 0.5 : 1
                                    },
                                    children: viewAcc.name[0]
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/accounts/page.tsx",
                                    lineNumber: 210,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontFamily: "'DM Serif Display', serif",
                                                fontSize: 22,
                                                color: "#1a2744"
                                            },
                                            children: viewAcc.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/accounts/page.tsx",
                                            lineNumber: 212,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: 13,
                                                color: "#8a8ea8",
                                                marginTop: 2,
                                                fontFamily: "monospace"
                                            },
                                            children: [
                                                viewAcc.id,
                                                " · ",
                                                viewAcc.email
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/admin/accounts/page.tsx",
                                            lineNumber: 213,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                marginTop: 8,
                                                display: "flex",
                                                gap: 6
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
                                                    label: viewAcc.role === "admin" ? "🛡️ Admin" : "Student",
                                                    type: viewAcc.role === "admin" ? "purple" : "navy"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/accounts/page.tsx",
                                                    lineNumber: 215,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
                                                    label: viewAcc.status === "active" ? "✓ Active" : "🔒 Locked",
                                                    type: viewAcc.status === "active" ? "green" : "red"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/accounts/page.tsx",
                                                    lineNumber: 216,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/admin/accounts/page.tsx",
                                            lineNumber: 214,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/accounts/page.tsx",
                                    lineNumber: 211,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/accounts/page.tsx",
                            lineNumber: 209,
                            columnNumber: 13
                        }, this),
                        [
                            [
                                "Date Joined",
                                viewAcc.joined
                            ],
                            [
                                "Last Login",
                                viewAcc.lastLogin
                            ],
                            [
                                "Total Books Borrowed",
                                viewAcc.booksBorrowed
                            ]
                        ].map(([k, v], i, arr)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    justifyContent: "space-between",
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
                                        fileName: "[project]/src/app/admin/accounts/page.tsx",
                                        lineNumber: 227,
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
                                        fileName: "[project]/src/app/admin/accounts/page.tsx",
                                        lineNumber: 228,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, k, true, {
                                fileName: "[project]/src/app/admin/accounts/page.tsx",
                                lineNumber: 226,
                                columnNumber: 15
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: 9,
                                marginTop: 24
                            },
                            children: [
                                viewAcc.role !== "admin" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Btn, {
                                    variant: viewAcc.status === "active" ? "amber" : "navy",
                                    onClick: ()=>{
                                        setActionModal({
                                            type: viewAcc.status === "active" ? "lock" : "unlock",
                                            acc: viewAcc
                                        });
                                        setViewAcc(null);
                                    },
                                    style: {
                                        flex: 1,
                                        justifyContent: "center"
                                    },
                                    children: viewAcc.status === "active" ? "🔒 Lock Account" : "🔓 Unlock Account"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/accounts/page.tsx",
                                    lineNumber: 234,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Btn, {
                                    variant: "red",
                                    onClick: ()=>{
                                        setActionModal({
                                            type: "delete",
                                            acc: viewAcc
                                        });
                                        setViewAcc(null);
                                    },
                                    style: {
                                        flex: 1,
                                        justifyContent: "center"
                                    },
                                    children: "🗑 Delete"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/accounts/page.tsx",
                                    lineNumber: 238,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/accounts/page.tsx",
                            lineNumber: 232,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/admin/accounts/page.tsx",
                    lineNumber: 203,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/admin/accounts/page.tsx",
                lineNumber: 202,
                columnNumber: 9
            }, this),
            actionModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                onClick: (e)=>e.target === e.currentTarget && setActionModal(null),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        background: "#fff",
                        borderRadius: 22,
                        padding: "28px",
                        maxWidth: 400,
                        width: "100%",
                        boxShadow: "0 24px 64px rgba(26,39,68,.18)",
                        animation: "fadeUp .25s ease",
                        textAlign: "center"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: 40,
                                marginBottom: 10
                            },
                            children: actionModal.type === "delete" ? "🗑️" : actionModal.type === "lock" ? "🔒" : "🔓"
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/accounts/page.tsx",
                            lineNumber: 248,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontFamily: "'DM Serif Display', serif",
                                fontSize: 19,
                                color: "#1a2744",
                                marginBottom: 6,
                                textTransform: "capitalize"
                            },
                            children: [
                                actionModal.type,
                                " Account?"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/accounts/page.tsx",
                            lineNumber: 251,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: 13,
                                color: "#64748b",
                                lineHeight: 1.6,
                                marginBottom: 22
                            },
                            children: [
                                "Are you sure you want to ",
                                actionModal.type,
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    style: {
                                        color: "#1a2744"
                                    },
                                    children: actionModal.acc.name
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/accounts/page.tsx",
                                    lineNumber: 255,
                                    columnNumber: 59
                                }, this),
                                "'s account?",
                                actionModal.type === "delete" && " This action cannot be undone and all history will be lost.",
                                actionModal.type === "lock" && " They will not be able to log in or borrow books until unlocked."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/accounts/page.tsx",
                            lineNumber: 254,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: 9,
                                justifyContent: "center"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Btn, {
                                    variant: actionModal.type === "delete" ? "red" : actionModal.type === "lock" ? "amber" : "navy",
                                    onClick: handleAction,
                                    children: [
                                        "Yes, ",
                                        actionModal.type
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/accounts/page.tsx",
                                    lineNumber: 260,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Btn, {
                                    variant: "ghost",
                                    onClick: ()=>setActionModal(null),
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/accounts/page.tsx",
                                    lineNumber: 263,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/accounts/page.tsx",
                            lineNumber: 259,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/admin/accounts/page.tsx",
                    lineNumber: 247,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/admin/accounts/page.tsx",
                lineNumber: 246,
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
                fileName: "[project]/src/app/admin/accounts/page.tsx",
                lineNumber: 271,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/admin/accounts/page.tsx",
        lineNumber: 96,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_app_admin_accounts_page_tsx_def54753._.js.map