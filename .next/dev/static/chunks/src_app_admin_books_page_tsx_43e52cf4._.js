(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/admin/books/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminLibraryPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
/* ─── HELPERS & MOCK DATA ───────────────────────────────── */ const CATS = [
    "All",
    "Computer Science",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Engineering",
    "Medicine",
    "Economics",
    "Accounting",
    "Law"
];
const COURSES = [
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
const EMOJIS = [
    "📘",
    "📙",
    "📗",
    "📕",
    "📔",
    "📒"
];
const COLORS = [
    {
        color: "#1e3a5f",
        spine: "#3d8bef"
    },
    {
        color: "#3b1f6e",
        spine: "#7c3aed"
    },
    {
        color: "#1a4731",
        spine: "#4caf6e"
    },
    {
        color: "#7c2d12",
        spine: "#ea580c"
    },
    {
        color: "#134e4a",
        spine: "#0d9488"
    },
    {
        color: "#0c4a6e",
        spine: "#0284c7"
    }
];
const EMPTY_BOOK = {
    title: "",
    author: "",
    cat: "Computer Science",
    course: "BSCS",
    color: "#1e3a5f",
    spine: "#3d8bef",
    avail: true,
    rating: 4.0,
    pages: "",
    emoji: "📘",
    copies: 1,
    description: ""
};
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
        fileName: "[project]/src/app/admin/books/page.tsx",
        lineNumber: 23,
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
        fileName: "[project]/src/app/admin/books/page.tsx",
        lineNumber: 33,
        columnNumber: 10
    }, this);
}
_c1 = Btn;
function AdminLibraryPage() {
    _s();
    const [libBooks, setLibBooks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            id: 1,
            title: "Introduction to Algorithms",
            author: "Cormen et al.",
            cat: "Computer Science",
            course: "BSCS",
            color: "#1e3a5f",
            spine: "#3d8bef",
            avail: true,
            rating: 4.8,
            pages: 1292,
            emoji: "📘",
            copies: 3,
            description: "A comprehensive text on algorithms."
        },
        {
            id: 2,
            title: "Calculus: Early Transcendentals",
            author: "James Stewart",
            cat: "Mathematics",
            course: "BSMATH",
            color: "#3b1f6e",
            spine: "#7c3aed",
            avail: false,
            rating: 4.5,
            pages: 1368,
            emoji: "📙",
            copies: 2,
            description: "Standard calculus textbook."
        },
        {
            id: 3,
            title: "Organic Chemistry",
            author: "Paula Bruice",
            cat: "Chemistry",
            course: "BSCHE",
            color: "#1a4731",
            spine: "#4caf6e",
            avail: true,
            rating: 4.3,
            pages: 1440,
            emoji: "📗",
            copies: 4,
            description: "In-depth coverage of organic chemistry."
        },
        {
            id: 4,
            title: "Principles of Economics",
            author: "N. Gregory Mankiw",
            cat: "Economics",
            course: "BSBA",
            color: "#7c2d12",
            spine: "#ea580c",
            avail: true,
            rating: 4.6,
            pages: 880,
            emoji: "📕",
            copies: 2,
            description: "Leading economics textbook."
        }
    ]);
    const [libSearch, setLibSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [libCat, setLibCat] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("All");
    const [libAvail, setLibAvail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("All");
    const [bookModal, setBookModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [bookForm, setBookForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(EMPTY_BOOK);
    const [delBook, setDelBook] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [nextId, setNextId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(5);
    const [toast, setToast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fireToast = (type, msg)=>{
        setToast({
            type,
            msg
        });
        setTimeout(()=>setToast(null), 3000);
    };
    const filtLib = libBooks.filter((b)=>{
        const ms = b.title.toLowerCase().includes(libSearch.toLowerCase()) || b.author.toLowerCase().includes(libSearch.toLowerCase());
        const mc = libCat === "All" || b.cat === libCat;
        const ma = libAvail === "All" || (libAvail === "Available" ? b.avail : !b.avail);
        return ms && mc && ma;
    });
    const openAdd = ()=>{
        setBookForm({
            ...EMPTY_BOOK
        });
        setBookModal({
            mode: "add"
        });
    };
    const openEdit = (b)=>{
        setBookForm({
            ...b
        });
        setBookModal({
            mode: "edit",
            book: b
        });
    };
    const openView = (b)=>{
        setBookModal({
            mode: "view",
            book: b
        });
    };
    const saveBook = ()=>{
        if (!bookForm.title.trim() || !bookForm.author.trim()) {
            fireToast("err", "Title and Author are required");
            return;
        }
        if (bookModal.mode === "add") {
            setLibBooks((prev)=>[
                    ...prev,
                    {
                        ...bookForm,
                        id: nextId,
                        pages: Number(bookForm.pages) || 0,
                        copies: Number(bookForm.copies) || 1,
                        rating: parseFloat(bookForm.rating) || 4.0
                    }
                ]);
            setNextId((n)=>n + 1);
            fireToast("ok", "Book added to library!");
        } else {
            setLibBooks((prev)=>prev.map((b)=>b.id === bookModal.book.id ? {
                        ...bookForm,
                        id: b.id,
                        pages: Number(bookForm.pages) || 0,
                        copies: Number(bookForm.copies) || 1,
                        rating: parseFloat(bookForm.rating) || 4.0
                    } : b));
            fireToast("ok", "Book updated successfully!");
        }
        setBookModal(null);
    };
    const Field = ({ label, val, set, type = "text", opts })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                marginBottom: 13
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    style: {
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: ".08em",
                        textTransform: "uppercase",
                        color: "#1a2744",
                        display: "block",
                        marginBottom: 5
                    },
                    children: label
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/books/page.tsx",
                    lineNumber: 83,
                    columnNumber: 7
                }, this),
                opts ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                    value: val,
                    onChange: (e)=>set(e.target.value),
                    style: {
                        width: "100%",
                        background: "#f0ede5",
                        border: "2px solid transparent",
                        borderRadius: 10,
                        padding: "9px 11px",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 13.5,
                        color: "#1a2744",
                        outline: "none"
                    },
                    children: opts.map((o)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                            children: o
                        }, o, false, {
                            fileName: "[project]/src/app/admin/books/page.tsx",
                            lineNumber: 86,
                            columnNumber: 33
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/books/page.tsx",
                    lineNumber: 85,
                    columnNumber: 9
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: type,
                    value: val,
                    onChange: (e)=>set(e.target.value),
                    style: {
                        width: "100%",
                        background: "#f0ede5",
                        border: "2px solid transparent",
                        borderRadius: 10,
                        padding: "9px 11px",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 13.5,
                        color: "#1a2744",
                        outline: "none"
                    }
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/books/page.tsx",
                    lineNumber: 89,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/admin/books/page.tsx",
            lineNumber: 82,
            columnNumber: 5
        }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            animation: "fadeUp .3s ease"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
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
                fileName: "[project]/src/app/admin/books/page.tsx",
                lineNumber: 96,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 20,
                    flexWrap: "wrap",
                    gap: 12
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontFamily: "'DM Serif Display', serif",
                                    fontSize: 24,
                                    color: "#1a2744"
                                },
                                children: "Library Management"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/books/page.tsx",
                                lineNumber: 109,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 13,
                                    color: "#8a8ea8",
                                    marginTop: 2
                                },
                                children: [
                                    libBooks.length,
                                    " books · ",
                                    libBooks.filter((b)=>b.avail).length,
                                    " available"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/books/page.tsx",
                                lineNumber: 110,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/books/page.tsx",
                        lineNumber: 108,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Btn, {
                        onClick: openAdd,
                        children: "＋ Add New Book"
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/books/page.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/books/page.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    gap: 10,
                    marginBottom: 18,
                    flexWrap: "wrap",
                    alignItems: "center"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: "relative",
                            flex: 1,
                            maxWidth: 300
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                fileName: "[project]/src/app/admin/books/page.tsx",
                                lineNumber: 118,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: libSearch,
                                onChange: (e)=>setLibSearch(e.target.value),
                                placeholder: "Search title or author…",
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
                                fileName: "[project]/src/app/admin/books/page.tsx",
                                lineNumber: 119,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/books/page.tsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: libCat,
                        onChange: (e)=>setLibCat(e.target.value),
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
                        children: CATS.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                children: c
                            }, c, false, {
                                fileName: "[project]/src/app/admin/books/page.tsx",
                                lineNumber: 123,
                                columnNumber: 26
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/books/page.tsx",
                        lineNumber: 122,
                        columnNumber: 9
                    }, this),
                    [
                        "All",
                        "Available",
                        "Borrowed"
                    ].map((v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: `chip ${libAvail === v ? "active" : ""}`,
                            onClick: ()=>setLibAvail(v),
                            children: v
                        }, v, false, {
                            fileName: "[project]/src/app/admin/books/page.tsx",
                            lineNumber: 126,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/books/page.tsx",
                lineNumber: 116,
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
                            gridTemplateColumns: "2.4fr 1.6fr 1.2fr 1fr 0.7fr 0.7fr 0.7fr 1.4fr",
                            padding: "11px 20px",
                            background: "#f7f5f0",
                            borderBottom: "1px solid #e2dfd6"
                        },
                        children: [
                            "Cover + Title",
                            "Author",
                            "Category",
                            "Course",
                            "Copies",
                            "Pages",
                            "Status",
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
                                fileName: "[project]/src/app/admin/books/page.tsx",
                                lineNumber: 134,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/books/page.tsx",
                        lineNumber: 132,
                        columnNumber: 9
                    }, this),
                    filtLib.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: 40,
                            textAlign: "center",
                            color: "#8a8ea8"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 36,
                                    marginBottom: 10
                                },
                                children: "📭"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/books/page.tsx",
                                lineNumber: 140,
                                columnNumber: 13
                            }, this),
                            "No books match your filters"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/books/page.tsx",
                        lineNumber: 139,
                        columnNumber: 11
                    }, this) : filtLib.map((b, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "row-hover",
                            style: {
                                display: "grid",
                                gridTemplateColumns: "2.4fr 1.6fr 1.2fr 1fr 0.7fr 0.7fr 0.7fr 1.4fr",
                                padding: "12px 20px",
                                borderBottom: i < filtLib.length - 1 ? "1px solid #f2efe8" : "none",
                                alignItems: "center",
                                transition: "background .15s"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 11,
                                        cursor: "pointer"
                                    },
                                    onClick: ()=>openView(b),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: 34,
                                                height: 46,
                                                borderRadius: 5,
                                                background: `linear-gradient(150deg,${b.color},${b.spine}88)`,
                                                flexShrink: 0,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                position: "relative",
                                                overflow: "hidden",
                                                boxShadow: `2px 2px 8px ${b.color}55`
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        position: "absolute",
                                                        left: 0,
                                                        top: 0,
                                                        bottom: 0,
                                                        width: 4,
                                                        background: b.spine
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/books/page.tsx",
                                                    lineNumber: 148,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: 18,
                                                        position: "relative"
                                                    },
                                                    children: b.emoji
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/books/page.tsx",
                                                    lineNumber: 149,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/admin/books/page.tsx",
                                            lineNumber: 147,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: 13,
                                                        fontWeight: 700,
                                                        color: "#1a2744",
                                                        lineHeight: 1.3
                                                    },
                                                    children: b.title.length > 28 ? b.title.slice(0, 28) + "…" : b.title
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/books/page.tsx",
                                                    lineNumber: 152,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: 10.5,
                                                        color: "#8a8ea8",
                                                        marginTop: 2
                                                    },
                                                    children: [
                                                        "ID #",
                                                        b.id
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/admin/books/page.tsx",
                                                    lineNumber: 153,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/admin/books/page.tsx",
                                            lineNumber: 151,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/books/page.tsx",
                                    lineNumber: 146,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 13,
                                        color: "#64748b"
                                    },
                                    children: b.author.length > 20 ? b.author.slice(0, 20) + "…" : b.author
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/books/page.tsx",
                                    lineNumber: 156,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
                                        label: b.cat,
                                        type: "navy"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/books/page.tsx",
                                        lineNumber: 157,
                                        columnNumber: 20
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/books/page.tsx",
                                    lineNumber: 157,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 12.5,
                                        color: "#64748b"
                                    },
                                    children: b.course
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/books/page.tsx",
                                    lineNumber: 158,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 13,
                                        fontWeight: 600,
                                        color: "#1a2744",
                                        textAlign: "center"
                                    },
                                    children: b.copies
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/books/page.tsx",
                                    lineNumber: 159,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 13,
                                        color: "#64748b"
                                    },
                                    children: b.pages
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/books/page.tsx",
                                    lineNumber: 160,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
                                        label: b.avail ? "Available" : "Borrowed",
                                        type: b.avail ? "green" : "red"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/books/page.tsx",
                                        lineNumber: 161,
                                        columnNumber: 20
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/books/page.tsx",
                                    lineNumber: 161,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        gap: 6
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "action-icon",
                                            onClick: ()=>openView(b),
                                            title: "View",
                                            children: "👁"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/books/page.tsx",
                                            lineNumber: 163,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "action-icon",
                                            style: {
                                                background: "#e8f1fd",
                                                borderColor: "#bdd6fa"
                                            },
                                            onClick: ()=>openEdit(b),
                                            title: "Edit",
                                            children: "✏️"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/books/page.tsx",
                                            lineNumber: 164,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "action-icon",
                                            style: {
                                                background: "#fdeaea",
                                                borderColor: "#f5c5c5",
                                                color: "#c94040"
                                            },
                                            onClick: ()=>setDelBook(b),
                                            title: "Delete",
                                            children: "🗑"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/books/page.tsx",
                                            lineNumber: 165,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/books/page.tsx",
                                    lineNumber: 162,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, b.id, true, {
                            fileName: "[project]/src/app/admin/books/page.tsx",
                            lineNumber: 145,
                            columnNumber: 13
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/books/page.tsx",
                lineNumber: 131,
                columnNumber: 7
            }, this),
            bookModal && bookModal.mode !== "view" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                onClick: (e)=>e.target === e.currentTarget && setBookModal(null),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        background: "#fff",
                        borderRadius: 22,
                        padding: "26px 28px",
                        maxWidth: 580,
                        width: "100%",
                        boxShadow: "0 24px 64px rgba(26,39,68,.18)",
                        animation: "fadeUp .25s ease",
                        maxHeight: "90vh",
                        overflowY: "auto"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: 20
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: 10,
                                                fontWeight: 700,
                                                letterSpacing: ".1em",
                                                textTransform: "uppercase",
                                                color: "#3d8bef",
                                                marginBottom: 5
                                            },
                                            children: bookModal.mode === "add" ? "Add New Book" : "Edit Book"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/books/page.tsx",
                                            lineNumber: 178,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontFamily: "'DM Serif Display', serif",
                                                fontSize: 20,
                                                color: "#1a2744"
                                            },
                                            children: bookModal.mode === "add" ? "New Library Book" : bookForm.title || "Edit Details"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/books/page.tsx",
                                            lineNumber: 179,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/books/page.tsx",
                                    lineNumber: 177,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setBookModal(null),
                                    style: {
                                        background: "#f0ede5",
                                        border: "none",
                                        borderRadius: 8,
                                        padding: "6px 10px",
                                        cursor: "pointer",
                                        fontSize: 16,
                                        color: "#8a8ea8"
                                    },
                                    children: "✕"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/books/page.tsx",
                                    lineNumber: 181,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/books/page.tsx",
                            lineNumber: 176,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "0 16px"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        gridColumn: "1/-1"
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                        label: "Title *",
                                        val: bookForm.title,
                                        set: (v)=>setBookForm((f)=>({
                                                    ...f,
                                                    title: v
                                                }))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/books/page.tsx",
                                        lineNumber: 185,
                                        columnNumber: 51
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/books/page.tsx",
                                    lineNumber: 185,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                    label: "Author *",
                                    val: bookForm.author,
                                    set: (v)=>setBookForm((f)=>({
                                                ...f,
                                                author: v
                                            }))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/books/page.tsx",
                                    lineNumber: 186,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                    label: "Category",
                                    val: bookForm.cat,
                                    set: (v)=>setBookForm((f)=>({
                                                ...f,
                                                cat: v
                                            })),
                                    opts: CATS.slice(1)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/books/page.tsx",
                                    lineNumber: 187,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                    label: "Course",
                                    val: bookForm.course,
                                    set: (v)=>setBookForm((f)=>({
                                                ...f,
                                                course: v
                                            })),
                                    opts: COURSES.slice(1)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/books/page.tsx",
                                    lineNumber: 188,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                    label: "Pages",
                                    val: bookForm.pages,
                                    set: (v)=>setBookForm((f)=>({
                                                ...f,
                                                pages: v
                                            })),
                                    type: "number"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/books/page.tsx",
                                    lineNumber: 189,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                    label: "Copies",
                                    val: bookForm.copies,
                                    set: (v)=>setBookForm((f)=>({
                                                ...f,
                                                copies: v
                                            })),
                                    type: "number"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/books/page.tsx",
                                    lineNumber: 190,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                    label: "Rating (0-5)",
                                    val: bookForm.rating,
                                    set: (v)=>setBookForm((f)=>({
                                                ...f,
                                                rating: v
                                            })),
                                    type: "number"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/books/page.tsx",
                                    lineNumber: 191,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                    label: "Emoji Icon",
                                    val: bookForm.emoji,
                                    set: (v)=>setBookForm((f)=>({
                                                ...f,
                                                emoji: v
                                            })),
                                    opts: EMOJIS
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/books/page.tsx",
                                    lineNumber: 192,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        gridColumn: "1/-1",
                                        marginBottom: 13
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            style: {
                                                fontSize: 10,
                                                fontWeight: 700,
                                                letterSpacing: ".08em",
                                                textTransform: "uppercase",
                                                color: "#1a2744",
                                                display: "block",
                                                marginBottom: 5
                                            },
                                            children: "Availability"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/books/page.tsx",
                                            lineNumber: 195,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                gap: 10
                                            },
                                            children: [
                                                true,
                                                false
                                            ].map((v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setBookForm((f)=>({
                                                                ...f,
                                                                avail: v
                                                            })),
                                                    style: {
                                                        flex: 1,
                                                        padding: "9px",
                                                        borderRadius: 10,
                                                        border: bookForm.avail === v ? "none" : "2px solid #e2dfd6",
                                                        background: bookForm.avail === v ? v ? "#e6f7ec" : "#fdeaea" : "#f0ede5",
                                                        color: bookForm.avail === v ? v ? "#2d7a4f" : "#c94040" : "#8a8ea8",
                                                        fontFamily: "'DM Sans', sans-serif",
                                                        fontSize: 13,
                                                        fontWeight: 600,
                                                        cursor: "pointer",
                                                        transition: "all .18s"
                                                    },
                                                    children: v ? "✓ Available" : "✗ Borrowed / Unavailable"
                                                }, String(v), false, {
                                                    fileName: "[project]/src/app/admin/books/page.tsx",
                                                    lineNumber: 198,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/books/page.tsx",
                                            lineNumber: 196,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/books/page.tsx",
                                    lineNumber: 194,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        gridColumn: "1/-1",
                                        marginBottom: 16
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            style: {
                                                fontSize: 10,
                                                fontWeight: 700,
                                                letterSpacing: ".08em",
                                                textTransform: "uppercase",
                                                color: "#1a2744",
                                                display: "block",
                                                marginBottom: 5
                                            },
                                            children: "Description"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/books/page.tsx",
                                            lineNumber: 206,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            value: bookForm.description,
                                            onChange: (e)=>setBookForm((f)=>({
                                                        ...f,
                                                        description: e.target.value
                                                    })),
                                            placeholder: "Brief description of the book…",
                                            style: {
                                                width: "100%",
                                                background: "#f0ede5",
                                                border: "2px solid transparent",
                                                borderRadius: 10,
                                                padding: "9px 11px",
                                                fontFamily: "'DM Sans', sans-serif",
                                                fontSize: 13.5,
                                                color: "#1a2744",
                                                outline: "none",
                                                resize: "vertical",
                                                minHeight: 72
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/books/page.tsx",
                                            lineNumber: 207,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/books/page.tsx",
                                    lineNumber: 205,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/books/page.tsx",
                            lineNumber: 184,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: 9
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Btn, {
                                    onClick: saveBook,
                                    children: bookModal.mode === "add" ? "＋ Add Book" : "💾 Save Changes"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/books/page.tsx",
                                    lineNumber: 213,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Btn, {
                                    variant: "ghost",
                                    onClick: ()=>setBookModal(null),
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/books/page.tsx",
                                    lineNumber: 214,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/books/page.tsx",
                            lineNumber: 212,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/admin/books/page.tsx",
                    lineNumber: 175,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/admin/books/page.tsx",
                lineNumber: 174,
                columnNumber: 9
            }, this),
            bookModal?.mode === "view" && (()=>{
                const b = bookModal.book;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    onClick: (e)=>e.target === e.currentTarget && setBookModal(null),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: "#fff",
                            borderRadius: 22,
                            padding: "26px 28px",
                            maxWidth: 480,
                            width: "100%",
                            boxShadow: "0 24px 64px rgba(26,39,68,.18)",
                            animation: "fadeUp .25s ease"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginBottom: 18
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
                                        children: "Book Details"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/books/page.tsx",
                                        lineNumber: 227,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setBookModal(null),
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
                                        fileName: "[project]/src/app/admin/books/page.tsx",
                                        lineNumber: 228,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/books/page.tsx",
                                lineNumber: 226,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    gap: 18,
                                    marginBottom: 18
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: 80,
                                            height: 110,
                                            borderRadius: 8,
                                            background: `linear-gradient(150deg,${b.color},${b.spine}88)`,
                                            flexShrink: 0,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            position: "relative",
                                            overflow: "hidden",
                                            boxShadow: `3px 3px 14px ${b.color}66,inset -3px 0 8px rgba(0,0,0,.22)`
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    position: "absolute",
                                                    left: 0,
                                                    top: 0,
                                                    bottom: 0,
                                                    width: 5,
                                                    background: b.spine
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/books/page.tsx",
                                                lineNumber: 232,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: 36,
                                                    position: "relative"
                                                },
                                                children: b.emoji
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/books/page.tsx",
                                                lineNumber: 233,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/admin/books/page.tsx",
                                        lineNumber: 231,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontFamily: "'DM Serif Display', serif",
                                                    fontSize: 18,
                                                    color: "#1a2744",
                                                    lineHeight: 1.3,
                                                    marginBottom: 4
                                                },
                                                children: b.title
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/books/page.tsx",
                                                lineNumber: 236,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 13,
                                                    color: "#8a8ea8",
                                                    marginBottom: 10
                                                },
                                                children: b.author
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/books/page.tsx",
                                                lineNumber: 237,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    gap: 6,
                                                    flexWrap: "wrap"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
                                                        label: b.cat,
                                                        type: "navy"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/books/page.tsx",
                                                        lineNumber: 239,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
                                                        label: b.avail ? "Available" : "Borrowed",
                                                        type: b.avail ? "green" : "red"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/books/page.tsx",
                                                        lineNumber: 240,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/admin/books/page.tsx",
                                                lineNumber: 238,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/admin/books/page.tsx",
                                        lineNumber: 235,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/books/page.tsx",
                                lineNumber: 230,
                                columnNumber: 15
                            }, this),
                            [
                                [
                                    "Course",
                                    b.course
                                ],
                                [
                                    "Pages",
                                    b.pages
                                ],
                                [
                                    "Copies",
                                    b.copies
                                ],
                                [
                                    "Rating",
                                    b.rating + "/5"
                                ]
                            ].map(([k, v], i, arr)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        justifyContent: "space-between",
                                        padding: "9px 0",
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
                                            fileName: "[project]/src/app/admin/books/page.tsx",
                                            lineNumber: 246,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: 13,
                                                fontWeight: 600,
                                                color: "#1a2744"
                                            },
                                            children: v
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/books/page.tsx",
                                            lineNumber: 247,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, k, true, {
                                    fileName: "[project]/src/app/admin/books/page.tsx",
                                    lineNumber: 245,
                                    columnNumber: 17
                                }, this)),
                            b.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 13,
                                    color: "#64748b",
                                    lineHeight: 1.6,
                                    marginTop: 12,
                                    marginBottom: 18
                                },
                                children: b.description
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/books/page.tsx",
                                lineNumber: 250,
                                columnNumber: 33
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    gap: 9,
                                    marginTop: 14
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Btn, {
                                        onClick: ()=>{
                                            setBookForm({
                                                ...b
                                            });
                                            setBookModal({
                                                mode: "edit",
                                                book: b
                                            });
                                        },
                                        children: "✏️ Edit"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/books/page.tsx",
                                        lineNumber: 252,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Btn, {
                                        variant: "red",
                                        onClick: ()=>{
                                            setDelBook(b);
                                            setBookModal(null);
                                        },
                                        children: "🗑 Delete"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/books/page.tsx",
                                        lineNumber: 253,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/books/page.tsx",
                                lineNumber: 251,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/books/page.tsx",
                        lineNumber: 225,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/books/page.tsx",
                    lineNumber: 224,
                    columnNumber: 11
                }, this);
            })(),
            delBook && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                onClick: (e)=>e.target === e.currentTarget && setDelBook(null),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: 40,
                                marginBottom: 10
                            },
                            children: "🗑️"
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/books/page.tsx",
                            lineNumber: 264,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontFamily: "'DM Serif Display', serif",
                                fontSize: 19,
                                color: "#1a2744",
                                marginBottom: 6
                            },
                            children: "Delete Book?"
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/books/page.tsx",
                            lineNumber: 265,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: 13,
                                color: "#64748b",
                                lineHeight: 1.6,
                                marginBottom: 22
                            },
                            children: [
                                "Permanently remove ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    style: {
                                        color: "#1a2744"
                                    },
                                    children: delBook.title
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/books/page.tsx",
                                    lineNumber: 267,
                                    columnNumber: 34
                                }, this),
                                " from the library?"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/books/page.tsx",
                            lineNumber: 266,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: 9,
                                justifyContent: "center"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Btn, {
                                    variant: "red",
                                    onClick: ()=>{
                                        setLibBooks((prev)=>prev.filter((b)=>b.id !== delBook.id));
                                        fireToast("ok", "Book deleted.");
                                        setDelBook(null);
                                    },
                                    children: "Yes, Delete"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/books/page.tsx",
                                    lineNumber: 270,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Btn, {
                                    variant: "ghost",
                                    onClick: ()=>setDelBook(null),
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/books/page.tsx",
                                    lineNumber: 271,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/books/page.tsx",
                            lineNumber: 269,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/admin/books/page.tsx",
                    lineNumber: 263,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/admin/books/page.tsx",
                lineNumber: 262,
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
                fileName: "[project]/src/app/admin/books/page.tsx",
                lineNumber: 279,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/admin/books/page.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
_s(AdminLibraryPage, "JtkQOZNZxyjDOGnmht1j5A8Jfjo=");
_c2 = AdminLibraryPage;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "Badge");
__turbopack_context__.k.register(_c1, "Btn");
__turbopack_context__.k.register(_c2, "AdminLibraryPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_admin_books_page_tsx_43e52cf4._.js.map