module.exports = [
"[project]/src/app/dashboard/my-qr/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MyQrPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$qr$2d$code$2f$lib$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-qr-code/lib/index.js [app-ssr] (ecmascript)"); // Gamit ang library mo
"use client";
;
;
function MyQrPage() {
    // Hardcoded muna for testing. Sa totoong system, kukunin ito sa naka-login na user.
    const studentIdNumber = "2024-00123";
    const studentName = "Bryan Lumangaya";
    const program = "Bachelor of Science in Computer Science";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: "40px 20px",
            minHeight: "80vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'DM Sans', sans-serif"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    textAlign: "center",
                    marginBottom: 32,
                    animation: "fadeUp .3s ease"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        style: {
                            fontFamily: "'DM Serif Display', serif",
                            fontSize: 32,
                            color: "#1a2744",
                            marginBottom: 8
                        },
                        children: "My Digital Pass"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/my-qr/page.tsx",
                        lineNumber: 16,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            color: "#8a8ea8",
                            fontSize: 15
                        },
                        children: "Present this ID to the librarian to process your transactions."
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/my-qr/page.tsx",
                        lineNumber: 17,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/my-qr/page.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        
        .id-card { 
          background: linear-gradient(145deg, #1a2744 0%, #2a3d6e 100%); 
          width: 100%; 
          max-width: 380px; 
          border-radius: 24px; 
          padding: 40px 24px 0; 
          color: #fff; 
          position: relative; 
          box-shadow: 0 24px 64px rgba(26,39,68,.2); 
          text-align: center; 
          border: 1px solid rgba(255,255,255,.1); 
          animation: fadeUp .4s cubic-bezier(0.16, 1, 0.3, 1); 
          overflow: hidden; 
        }
        
        .id-card::before { 
          content: ''; 
          position: absolute; 
          top: -50px; 
          right: -50px; 
          width: 150px; 
          height: 150px; 
          background: radial-gradient(circle, rgba(61,139,239,.4) 0%, transparent 70%); 
          border-radius: 50%; 
        }
        
        .id-logo { font-family: 'DM Serif Display', serif; font-size: 24px; margin-bottom: 28px; display: flex; align-items: center; justify-content: center; gap: 8px; position: relative; z-index: 2; }
        
        .qr-container { 
          background: #fff; 
          padding: 20px; 
          border-radius: 20px; 
          display: inline-flex; 
          align-items: center; 
          justify-content: center; 
          margin-bottom: 28px; 
          box-shadow: 0 12px 32px rgba(0,0,0,.3); 
          position: relative; 
          z-index: 2;
        }

        .id-name { font-size: 24px; font-weight: 700; margin-bottom: 6px; letter-spacing: 0.5px; position: relative; z-index: 2; }
        .id-program { font-size: 13px; color: rgba(255,255,255,.7); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 28px; position: relative; z-index: 2; }
        
        .id-footer { 
          background: rgba(0,0,0,.2); 
          margin: 0 -24px; 
          padding: 20px 24px; 
          display: flex; 
          justify-content: space-between;
          align-items: center;
          font-size: 13px; 
          color: rgba(255,255,255,.9); 
          border-top: 1px solid rgba(255,255,255,.05); 
          position: relative; 
          z-index: 2;
        }
      `
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/my-qr/page.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "id-card",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "id-logo",
                        children: "📚 SmartLib"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/my-qr/page.tsx",
                        lineNumber: 84,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "qr-container",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$qr$2d$code$2f$lib$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            value: studentIdNumber,
                            size: 220,
                            bgColor: "#ffffff",
                            fgColor: "#1a2744",
                            level: "H"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/my-qr/page.tsx",
                            lineNumber: 90,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/my-qr/page.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "id-name",
                        children: studentName
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/my-qr/page.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "id-program",
                        children: program
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/my-qr/page.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "id-footer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontWeight: 600,
                                    letterSpacing: "1px"
                                },
                                children: [
                                    "ID: ",
                                    studentIdNumber
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/my-qr/page.tsx",
                                lineNumber: 103,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    color: "#4caf50",
                                    fontWeight: "bold",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            width: 8,
                                            height: 8,
                                            background: "#4caf50",
                                            borderRadius: "50%",
                                            display: "inline-block",
                                            boxShadow: "0 0 8px #4caf50"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/my-qr/page.tsx",
                                        lineNumber: 105,
                                        columnNumber: 13
                                    }, this),
                                    "Valid"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/my-qr/page.tsx",
                                lineNumber: 104,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/my-qr/page.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/my-qr/page.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    textAlign: "center",
                    marginTop: 32,
                    fontSize: 13,
                    color: "#8a8ea8"
                },
                children: "💡 Tip: Turn your screen brightness up for faster scanning."
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/my-qr/page.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/my-qr/page.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_app_dashboard_my-qr_page_tsx_647dda9f._.js.map