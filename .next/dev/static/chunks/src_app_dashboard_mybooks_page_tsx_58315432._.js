(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/dashboard/mybooks/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MyBooksPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
const books = [
    {
        id: 1,
        title: "Introduction to Algorithms",
        author: "Cormen et al.",
        category: "Computer Science",
        available: true,
        cover: "#1a1a2e",
        accent: "#e94560",
        course: [
            "BSCS",
            "BSIT",
            "BSCpE"
        ]
    },
    {
        id: 2,
        title: "Calculus: Early Transcendentals",
        author: "James Stewart",
        category: "Mathematics",
        available: false,
        cover: "#16213e",
        accent: "#4a90d9",
        course: [
            "BSMATH",
            "BSCS",
            "BSEd"
        ]
    },
    {
        id: 3,
        title: "Organic Chemistry",
        author: "Paula Bruice",
        category: "Chemistry",
        available: true,
        cover: "#1b262c",
        accent: "#bbe1fa",
        course: [
            "BSCHE",
            "BSPharma",
            "BSBio"
        ]
    },
    {
        id: 4,
        title: "Principles of Economics",
        author: "N. Gregory Mankiw",
        category: "Economics",
        available: true,
        cover: "#2c1810",
        accent: "#d4a574",
        course: [
            "BSECON",
            "BSBA",
            "BSAcc"
        ]
    },
    {
        id: 5,
        title: "Human Anatomy & Physiology",
        author: "Marieb & Hoehn",
        category: "Medicine",
        available: false,
        cover: "#1a2a1a",
        accent: "#4caf50",
        course: [
            "BSN",
            "BSMT",
            "BSPharma"
        ]
    },
    {
        id: 6,
        title: "Data Structures in Java",
        author: "Robert Lafore",
        category: "Computer Science",
        available: true,
        cover: "#2a1a2e",
        accent: "#9c27b0",
        course: [
            "BSCS",
            "BSIT"
        ]
    },
    {
        id: 7,
        title: "Engineering Mechanics",
        author: "R.C. Hibbeler",
        category: "Engineering",
        available: true,
        cover: "#1a1f2e",
        accent: "#ff6b35",
        course: [
            "BSCE",
            "BSMechE",
            "BSElecE"
        ]
    },
    {
        id: 8,
        title: "Financial Accounting",
        author: "Weygandt et al.",
        category: "Accounting",
        available: false,
        cover: "#1e2a1e",
        accent: "#66bb6a",
        course: [
            "BSAcc",
            "BSBA"
        ]
    }
];
function MyBooksPage() {
    // Static data para may makita tayo agad sa screen
    const borrowedIds = [
        2,
        5,
        8
    ];
    const reservedIds = [
        3
    ];
    const borrowedBooks = books.filter((b)=>borrowedIds.includes(b.id));
    const reservedBooks = books.filter((b)=>reservedIds.includes(b.id));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: 22
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "np",
                        style: {
                            fontSize: 24
                        },
                        children: "My Books"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: 13,
                            color: "rgba(226,226,238,.38)",
                            marginTop: 4
                        },
                        children: "Manage your borrowed and reserved books"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                style: {
                    fontSize: 14,
                    fontWeight: 600,
                    color: "rgba(226,226,238,.55)",
                    marginBottom: 12
                },
                children: [
                    "📖 Borrowed (",
                    borrowedBooks.length,
                    ")"
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    marginBottom: 28
                },
                children: [
                    borrowedBooks.map((b)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "card",
                            style: {
                                padding: "16px 20px"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                    flexWrap: "wrap",
                                    gap: 12
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            gap: 13
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    width: 44,
                                                    height: 58,
                                                    borderRadius: 8,
                                                    background: b.cover,
                                                    flexShrink: 0,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center"
                                                },
                                                children: "📕"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                                lineNumber: 38,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: 14,
                                                            fontWeight: 600
                                                        },
                                                        children: b.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                                        lineNumber: 40,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: 12,
                                                            color: "rgba(226,226,238,.42)",
                                                            marginTop: 2
                                                        },
                                                        children: b.author
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                                        lineNumber: 41,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: 12,
                                                            color: "#e74c3c",
                                                            marginTop: 6
                                                        },
                                                        children: "📅 Due: March 16, 2026"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                                        lineNumber: 42,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                                lineNumber: 39,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                        lineNumber: 37,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            gap: 8,
                                            flexWrap: "wrap"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "btn btn-ghost",
                                                style: {
                                                    fontSize: 12
                                                },
                                                children: "🗓 Extend"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                                lineNumber: 46,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "btn btn-ghost",
                                                style: {
                                                    fontSize: 12
                                                },
                                                children: "💬 Concern"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                                lineNumber: 47,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "btn btn-red",
                                                style: {
                                                    fontSize: 12
                                                },
                                                children: "Return"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                                lineNumber: 48,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                        lineNumber: 45,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                lineNumber: 36,
                                columnNumber: 13
                            }, this)
                        }, b.id, false, {
                            fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                            lineNumber: 35,
                            columnNumber: 11
                        }, this)),
                    borrowedBooks.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            opacity: .3,
                            fontSize: 13
                        },
                        children: "No borrowed books."
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                        lineNumber: 53,
                        columnNumber: 40
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                style: {
                    fontSize: 14,
                    fontWeight: 600,
                    color: "rgba(226,226,238,.55)",
                    marginBottom: 12
                },
                children: [
                    "🔖 Reserved (",
                    reservedBooks.length,
                    ")"
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    flexDirection: "column",
                    gap: 10
                },
                children: [
                    reservedBooks.map((b)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                background: "rgba(100,149,237,.05)",
                                border: "1px solid rgba(100,149,237,.14)",
                                borderRadius: 14,
                                padding: "16px 20px",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                flexWrap: "wrap",
                                gap: 10
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 14,
                                                fontWeight: 600
                                            },
                                            children: b.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                            lineNumber: 62,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 12,
                                                color: "rgba(226,226,238,.42)",
                                                marginTop: 2
                                            },
                                            children: b.author
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                            lineNumber: 63,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 12,
                                                color: "#6495ed",
                                                marginTop: 5
                                            },
                                            children: "🔔 Email alert when available"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                            lineNumber: 64,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                    lineNumber: 61,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "badge bb",
                                    children: "Reserved"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                    lineNumber: 66,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, b.id, true, {
                            fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                            lineNumber: 60,
                            columnNumber: 11
                        }, this)),
                    reservedBooks.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            opacity: .3,
                            fontSize: 13
                        },
                        children: "No reserved books."
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                        lineNumber: 69,
                        columnNumber: 40
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
_c = MyBooksPage;
var _c;
__turbopack_context__.k.register(_c, "MyBooksPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_dashboard_mybooks_page_tsx_58315432._.js.map