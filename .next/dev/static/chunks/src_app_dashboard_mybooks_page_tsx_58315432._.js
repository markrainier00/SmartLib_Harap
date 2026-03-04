(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/dashboard/mybooks/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MyBooksPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
// Mock Data base sa HTML mo
const BOOKS = [
    {
        id: 1,
        title: "Introduction to Algorithms",
        author: "Cormen et al.",
        color: "#1e3a5f",
        spine: "#3d8bef",
        emoji: "📘"
    },
    {
        id: 2,
        title: "Calculus: Early Transcendentals",
        author: "James Stewart",
        color: "#3b1f6e",
        spine: "#7c3aed",
        emoji: "📙"
    },
    {
        id: 3,
        title: "Organic Chemistry",
        author: "Paula Bruice",
        color: "#1a4731",
        spine: "#4caf6e",
        emoji: "📗"
    },
    {
        id: 4,
        title: "Principles of Economics",
        author: "N. Gregory Mankiw",
        color: "#7c2d12",
        spine: "#ea580c",
        emoji: "📕"
    },
    {
        id: 5,
        title: "Human Anatomy & Physiology",
        author: "Marieb & Hoehn",
        color: "#134e4a",
        spine: "#0d9488",
        emoji: "📘"
    },
    {
        id: 8,
        title: "Financial Accounting",
        author: "Weygandt et al.",
        color: "#14532d",
        spine: "#15803d",
        emoji: "📕"
    }
];
function MyBooksPage() {
    _s();
    // State para sa mga listahan (simulated data)
    const [borrowed, setBorrowed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        2,
        5,
        8
    ]); // IDs of borrowed books
    const [reserved, setReserved] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        3
    ]); // IDs of reserved books
    const [saved, setSaved] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        1,
        4
    ]); // IDs of saved books
    // Helper function para sa reusable Book Cover UI
    const renderCover = (book, width, height, fontSize)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                width,
                height,
                borderRadius: 7,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                flexShrink: 0,
                boxShadow: "3px 3px 12px rgba(0,0,0,.18), inset -3px 0 8px rgba(0,0,0,.22)",
                background: `linear-gradient(150deg, ${book.color}, ${book.spine}88)`
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        position: "absolute",
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: 4,
                        background: book.spine
                    }
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                    lineNumber: 24,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        position: "absolute",
                        inset: 0,
                        background: "repeating-linear-gradient(0deg,transparent,transparent 16px,rgba(255,255,255,.05) 16px,rgba(255,255,255,.05) 17px)"
                    }
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                    lineNumber: 25,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        position: "relative",
                        zIndex: 1,
                        fontSize: `${fontSize}px`
                    },
                    children: book.emoji
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                    lineNumber: 26,
                    columnNumber: 7
                }, this),
                height > 100 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        position: "absolute",
                        bottom: 6,
                        left: 7,
                        right: 7,
                        fontSize: 8,
                        fontWeight: 700,
                        color: "#fff",
                        lineHeight: 1.2,
                        textShadow: "0 1px 3px rgba(0,0,0,.5)",
                        zIndex: 1,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden"
                    },
                    children: book.title
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
            lineNumber: 23,
            columnNumber: 5
        }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            animation: "fadeUp .3s ease both"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        .ml-title { font-family: 'DM Serif Display', serif; font-size: 24px; color: #1a2744; margin-bottom: 4px; }
        .ml-sub { font-size: 13px; color: #8a8ea8; margin-bottom: 24px; }
        
        .section-head { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
        .section-head h3 { font-size: 15px; font-weight: 700; color: #1a2744; margin: 0; }
        .count-badge { padding: 2px 10px; border-radius: 20px; font-size: 12px; font-weight: 700; }
        
        .list-card { background: #fff; border-radius: 16px; box-shadow: 0 2px 12px rgba(26,39,68,.08); border: 1px solid #e2dfd6; padding: 16px 18px; margin-bottom: 10px; transition: transform .2s; }
        .list-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(26,39,68,.12); }
        
        .lc-row { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; }
        .lc-left { display: flex; gap: 14px; }
        .lc-title { font-size: 14px; font-weight: 700; color: #1a2744; margin-bottom: 2px; }
        .lc-author { font-size: 12px; color: #8a8ea8; }
        .lc-due { font-size: 12px; color: #e05c5c; font-weight: 600; margin-top: 7px; display: flex; align-items: center; gap: 5px; }
        
        .lc-actions { display: flex; gap: 7px; flex-wrap: wrap; }
        .ml-btn { border: none; border-radius: 10px; padding: 6px 13px; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600; cursor: pointer; transition: all .18s; display: inline-flex; align-items: center; gap: 6px; }
        .ml-btn-ghost { background: #f0ede5; color: #1a2744; border: 2px solid #e2dfd6; }
        .ml-btn-ghost:hover { background: #ece9e1; border-color: #d1cdb8; }
        .ml-btn-red { background: #fdeaea; color: #e05c5c; border: 2px solid #f5c5c5; }
        .ml-btn-red:hover { background: #fad0d0; }

        .res-card { background: #f0f7ff; border: 1.5px solid #bae0fd; border-radius: 14px; padding: 16px 18px; margin-bottom: 10px; display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
        .res-alert { font-size: 12px; color: #3d8bef; margin-top: 7px; font-weight: 500; }
        
        .saved-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 14px; }
        .sv-card { background: #fff; border-radius: 14px; overflow: hidden; border: 1px solid #e2dfd6; box-shadow: 0 2px 12px rgba(26,39,68,.08); cursor: pointer; transition: all .22s; }
        .sv-card:hover { transform: translateY(-4px); box-shadow: 0 8px 32px rgba(26,39,68,.12); }
        .heart-btn { background: none; border: none; cursor: pointer; font-size: 16px; padding: 3px; transition: transform .15s; position: absolute; top: 8px; right: 8px; z-index: 10; }
        .heart-btn:hover { transform: scale(1.3); }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
      `
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ml-title",
                children: "My List"
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ml-sub",
                children: "Manage your borrowed, reserved, and saved books"
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: "28px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "section-head",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: "📖 Borrowed Books"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                lineNumber: 80,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "count-badge",
                                style: {
                                    background: "#e8f1fd",
                                    color: "#3d8bef"
                                },
                                children: borrowed.length
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                lineNumber: 81,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                        lineNumber: 79,
                        columnNumber: 9
                    }, this),
                    borrowed.map((id)=>{
                        const b = BOOKS.find((x)=>x.id === id);
                        if (!b) return null;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "list-card",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lc-row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "lc-left",
                                        children: [
                                            renderCover(b, 66, 88, 24),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "lc-title",
                                                        children: b.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                                        lineNumber: 93,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "lc-author",
                                                        children: b.author
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                                        lineNumber: 94,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "lc-due",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                width: "12",
                                                                height: "12",
                                                                viewBox: "0 0 24 24",
                                                                fill: "none",
                                                                stroke: "currentColor",
                                                                strokeWidth: "2.5",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                                        x: "3",
                                                                        y: "4",
                                                                        width: "18",
                                                                        height: "18",
                                                                        rx: "2"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                                                        lineNumber: 96,
                                                                        columnNumber: 123
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                                        x1: "16",
                                                                        y1: "2",
                                                                        x2: "16",
                                                                        y2: "6"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                                                        lineNumber: 96,
                                                                        columnNumber: 172
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                                        x1: "8",
                                                                        y1: "2",
                                                                        x2: "8",
                                                                        y2: "6"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                                                        lineNumber: 96,
                                                                        columnNumber: 209
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                                        x1: "3",
                                                                        y1: "10",
                                                                        x2: "21",
                                                                        y2: "10"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                                                        lineNumber: 96,
                                                                        columnNumber: 244
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                                                lineNumber: 96,
                                                                columnNumber: 23
                                                            }, this),
                                                            "Due: March 16, 2026"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                                        lineNumber: 95,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                                lineNumber: 92,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                        lineNumber: 90,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "lc-actions",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "ml-btn ml-btn-ghost",
                                                onClick: ()=>alert(`Extension requested for ${b.title}`),
                                                children: "🗓 Extend"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                                lineNumber: 102,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "ml-btn ml-btn-ghost",
                                                onClick: ()=>alert(`Concern reported for ${b.title}`),
                                                children: "💬 Report"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                                lineNumber: 103,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "ml-btn ml-btn-red",
                                                onClick: ()=>setBorrowed(borrowed.filter((x)=>x !== b.id)),
                                                children: "Return"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                                lineNumber: 104,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                        lineNumber: 101,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                lineNumber: 89,
                                columnNumber: 15
                            }, this)
                        }, b.id, false, {
                            fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                            lineNumber: 88,
                            columnNumber: 13
                        }, this);
                    }),
                    borrowed.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "list-card",
                        style: {
                            textAlign: "center",
                            color: "#8a8ea8"
                        },
                        children: "No borrowed books"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                        lineNumber: 110,
                        columnNumber: 35
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: "28px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "section-head",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: "🔖 Reserved Books"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                lineNumber: 116,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "count-badge",
                                style: {
                                    background: "#e8f1fd",
                                    color: "#3d8bef"
                                },
                                children: reserved.length
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                lineNumber: 117,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, this),
                    reserved.map((id)=>{
                        const b = BOOKS.find((x)=>x.id === id);
                        if (!b) return null;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "res-card",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        gap: "14px",
                                        alignItems: "center"
                                    },
                                    children: [
                                        renderCover(b, 56, 76, 20),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "lc-title",
                                                    children: b.title
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                                    lineNumber: 128,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "lc-author",
                                                    children: b.author
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                                    lineNumber: 129,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "res-alert",
                                                    children: "🔔 Email alert when available for pickup"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                                    lineNumber: 130,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                            lineNumber: 127,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                    lineNumber: 125,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        background: "#e8f1fd",
                                        color: "#3d8bef",
                                        padding: "3px 10px",
                                        borderRadius: "20px",
                                        fontSize: "11px",
                                        fontWeight: 600
                                    },
                                    children: "Reserved"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                    lineNumber: 133,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, b.id, true, {
                            fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                            lineNumber: 124,
                            columnNumber: 13
                        }, this);
                    }),
                    reserved.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "list-card",
                        style: {
                            textAlign: "center",
                            color: "#8a8ea8"
                        },
                        children: "No reserved books"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                        lineNumber: 139,
                        columnNumber: 35
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "section-head",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: "❤️ Saved Books"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                lineNumber: 145,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "count-badge",
                                style: {
                                    background: "#fdeaea",
                                    color: "#e05c5c"
                                },
                                children: saved.length
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                lineNumber: 146,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                        lineNumber: 144,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "saved-grid",
                        children: saved.map((id)=>{
                            const b = BOOKS.find((x)=>x.id === id);
                            if (!b) return null;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "sv-card",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            padding: "14px 14px 8px",
                                            display: "flex",
                                            justifyContent: "center",
                                            position: "relative"
                                        },
                                        children: [
                                            renderCover(b, 110, 148, 36),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "heart-btn",
                                                onClick: ()=>setSaved(saved.filter((x)=>x !== b.id)),
                                                children: "❤️"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                                lineNumber: 157,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                        lineNumber: 155,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            padding: "0 13px 13px"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: "13px",
                                                    fontWeight: 700,
                                                    color: "#1a2744",
                                                    lineHeight: 1.3,
                                                    marginBottom: "3px"
                                                },
                                                children: b.title.length > 24 ? b.title.slice(0, 24) + '…' : b.title
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                                lineNumber: 160,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: "11px",
                                                    color: "#8a8ea8"
                                                },
                                                children: b.author
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                                lineNumber: 163,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                        lineNumber: 159,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, b.id, true, {
                                fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                lineNumber: 154,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                        lineNumber: 149,
                        columnNumber: 9
                    }, this),
                    saved.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "list-card",
                        style: {
                            textAlign: "center",
                            color: "#8a8ea8"
                        },
                        children: "No saved books — tap ❤️ to save books you like"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                        lineNumber: 169,
                        columnNumber: 32
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                lineNumber: 143,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_s(MyBooksPage, "nr8CWeZGRoFCCVRxmI5XDyUXOhc=");
_c = MyBooksPage;
var _c;
__turbopack_context__.k.register(_c, "MyBooksPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_dashboard_mybooks_page_tsx_58315432._.js.map