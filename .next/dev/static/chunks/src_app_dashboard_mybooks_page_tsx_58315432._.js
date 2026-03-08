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
    }
];
function MyBooksPage() {
    _s();
    const [borrowed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        2,
        5
    ]);
    const [wishlist, setWishlist] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        1,
        3
    ]);
    const renderCover = (book, width, height, fontSize)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                width,
                height,
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                flexShrink: 0,
                boxShadow: "4px 4px 15px rgba(0,0,0,.15), inset -3px 0 8px rgba(0,0,0,.2)",
                background: `linear-gradient(150deg, ${book.color}, ${book.spine}88)`
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        position: "absolute",
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: 5,
                        background: book.spine
                    }
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                    lineNumber: 19,
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
                    lineNumber: 20,
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
                    lineNumber: 21,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
            lineNumber: 18,
            columnNumber: 5
        }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "page-mylist",
        style: {
            animation: "fadeUp .3s ease both"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        /* INAYOS ANG MAX-WIDTH AT MARGIN PARA PANTAY SA DISCOVER PAGE */
        .page-mylist { width: 100%; max-width: 1400px; margin: 0 auto; }
        
        .ml-title { font-family: 'DM Serif Display', serif; font-size: 28px; color: #1a2744; margin-bottom: 6px; }
        .ml-sub { font-size: 14px; color: #8a8ea8; margin-bottom: 28px; }
        
        .section-head { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
        .section-head h3 { font-size: 18px; font-weight: 700; color: #1a2744; margin: 0; }
        .count-badge { padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; }
        
        /* GINAWANG GRID ANG BORROWED BOOKS PARA HINDI HUMABA NANG SOBRA */
        .borrowed-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 16px; }
        
        .list-card { background: #fff; border-radius: 16px; box-shadow: 0 4px 14px rgba(26,39,68,.05); border: 1px solid #e2dfd6; padding: 18px; transition: transform .25s ease; display: flex; align-items: center; }
        .list-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(26,39,68,.1); }
        
        .lc-left { display: flex; gap: 16px; width: 100%; align-items: center; }
        .lc-title { font-size: 15px; font-weight: 700; color: #1a2744; margin-bottom: 4px; line-height: 1.3; }
        .lc-author { font-size: 13px; color: #8a8ea8; }
        .lc-due { font-size: 12.5px; color: #e05c5c; font-weight: 600; margin-top: 10px; display: flex; align-items: center; gap: 6px; background: #fdeaea; padding: 4px 10px; border-radius: 8px; display: inline-flex; }

        .saved-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 20px; }
        .sv-card { background: #fff; border-radius: 16px; overflow: hidden; border: 1px solid #e2dfd6; box-shadow: 0 4px 14px rgba(26,39,68,.05); cursor: pointer; transition: all .25s ease; display: flex; flex-direction: column; }
        .sv-card:hover { transform: translateY(-5px); box-shadow: 0 12px 30px rgba(26,39,68,.12); border-color: rgba(26,39,68,.2); }
        .sv-card-img { padding: 18px 18px 10px; display: flex; justify-content: center; position: relative; background: #faf9f6; }
        
        /* UNIFORM STAR BUTTON PARA SA WISHLIST */
        .star-btn { background: none; border: none; cursor: pointer; font-size: 22px; padding: 4px; transition: transform .2s ease; position: absolute; top: 8px; right: 8px; z-index: 10; text-shadow: 0 2px 4px rgba(0,0,0,0.3); color: #fff; }
        .star-btn:hover { transform: scale(1.25); }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
      `
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ml-title",
                children: "My List"
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ml-sub",
                children: "Monitor your current borrowed items and your wishlist"
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: "36px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "section-head",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: "📖 Borrowed Books"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                lineNumber: 67,
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
                                lineNumber: 68,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "borrowed-grid",
                        children: borrowed.map((id)=>{
                            const b = BOOKS.find((x)=>x.id === id);
                            if (!b) return null;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "list-card",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "lc-left",
                                    children: [
                                        renderCover(b, 75, 100, 28),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                flex: 1
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "lc-title",
                                                    children: b.title
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                                    lineNumber: 80,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "lc-author",
                                                    children: b.author
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                                    lineNumber: 81,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "lc-due",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            width: "14",
                                                            height: "14",
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
                                                                    lineNumber: 83,
                                                                    columnNumber: 123
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                                    x1: "16",
                                                                    y1: "2",
                                                                    x2: "16",
                                                                    y2: "6"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                                                    lineNumber: 83,
                                                                    columnNumber: 172
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                                    x1: "8",
                                                                    y1: "2",
                                                                    x2: "8",
                                                                    y2: "6"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                                                    lineNumber: 83,
                                                                    columnNumber: 209
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                                    x1: "3",
                                                                    y1: "10",
                                                                    x2: "21",
                                                                    y2: "10"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                                                    lineNumber: 83,
                                                                    columnNumber: 244
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                                            lineNumber: 83,
                                                            columnNumber: 23
                                                        }, this),
                                                        "Due: March 16, 2026"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                                    lineNumber: 82,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                            lineNumber: 79,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                    lineNumber: 77,
                                    columnNumber: 17
                                }, this)
                            }, b.id, false, {
                                fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                lineNumber: 76,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "section-head",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: "⭐ My Wishlist"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                lineNumber: 97,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "count-badge",
                                style: {
                                    background: "#fef5e6",
                                    color: "#a06010"
                                },
                                children: wishlist.length
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                lineNumber: 98,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "saved-grid",
                        children: wishlist.map((id)=>{
                            const b = BOOKS.find((x)=>x.id === id);
                            if (!b) return null;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "sv-card",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "sv-card-img",
                                        children: [
                                            renderCover(b, 120, 165, 50),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "star-btn",
                                                onClick: ()=>setWishlist(wishlist.filter((x)=>x !== b.id)),
                                                children: "⭐"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                                lineNumber: 109,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                        lineNumber: 107,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            padding: "12px 16px 16px",
                                            flex: 1,
                                            display: "flex",
                                            flexDirection: "column"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: "14px",
                                                    fontWeight: 700,
                                                    color: "#1a2744",
                                                    lineHeight: 1.4,
                                                    marginBottom: "4px"
                                                },
                                                children: b.title.length > 28 ? b.title.slice(0, 28) + '…' : b.title
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                                lineNumber: 112,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: "12px",
                                                    color: "#8a8ea8"
                                                },
                                                children: b.author
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                                lineNumber: 115,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                        lineNumber: 111,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, b.id, true, {
                                fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                                lineNumber: 106,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, this),
                    wishlist.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            color: "#8a8ea8",
                            padding: "20px 0"
                        },
                        children: "Your wishlist is empty."
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                        lineNumber: 121,
                        columnNumber: 35
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/mybooks/page.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_s(MyBooksPage, "dDlNMiWT3TRNLgvyYgsNnyANvQw=");
_c = MyBooksPage;
var _c;
__turbopack_context__.k.register(_c, "MyBooksPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_dashboard_mybooks_page_tsx_58315432._.js.map