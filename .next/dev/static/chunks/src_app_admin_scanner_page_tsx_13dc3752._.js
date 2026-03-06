(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/admin/scanner/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminScannerPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html5$2d$qrcode$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/html5-qrcode/esm/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html5$2d$qrcode$2f$esm$2f$html5$2d$qrcode$2d$scanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/html5-qrcode/esm/html5-qrcode-scanner.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function Btn({ children, variant = "navy", onClick, style = {} }) {
    const base = {
        border: "none",
        borderRadius: 10,
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 13,
        fontWeight: 700,
        cursor: "pointer",
        transition: "all .18s",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        padding: "12px 24px",
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
        green: {
            background: "#2d7a4f",
            color: "#fff"
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
        fileName: "[project]/src/app/admin/scanner/page.tsx",
        lineNumber: 13,
        columnNumber: 10
    }, this);
}
_c = Btn;
function AdminScannerPage() {
    _s();
    const [scannedResult, setScannedResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isScanning, setIsScanning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const scannerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminScannerPage.useEffect": ()=>{
            if (isScanning) {
                // Setup ang scanner pagka-click ng "Start Scanning"
                scannerRef.current = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html5$2d$qrcode$2f$esm$2f$html5$2d$qrcode$2d$scanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Html5QrcodeScanner"]("reader", {
                    fps: 10,
                    qrbox: {
                        width: 250,
                        height: 250
                    }
                }, /* verbose= */ false);
                scannerRef.current.render({
                    "AdminScannerPage.useEffect": (decodedText)=>{
                        setScannedResult(decodedText);
                        setIsScanning(false);
                        if (scannerRef.current) {
                            scannerRef.current.clear(); // Patayin ang cam pag may na-detect na
                        }
                    }
                }["AdminScannerPage.useEffect"], {
                    "AdminScannerPage.useEffect": (error)=>{
                    // Silent error handling habang naghahanap ng code
                    }
                }["AdminScannerPage.useEffect"]);
            }
            return ({
                "AdminScannerPage.useEffect": ()=>{
                    if (scannerRef.current) {
                        scannerRef.current.clear().catch({
                            "AdminScannerPage.useEffect": (err)=>console.error("Failed to clear scanner", err)
                        }["AdminScannerPage.useEffect"]);
                    }
                }
            })["AdminScannerPage.useEffect"];
        }
    }["AdminScannerPage.useEffect"], [
        isScanning
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            animation: "fadeUp .3s ease",
            maxWidth: 900,
            margin: "0 auto"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        #reader { border: none !important; border-radius: 16px; overflow: hidden; }
        #reader__dashboard_section_csr button { 
          background: #1a2744 !important; color: white !important; border: none !important; 
          padding: 8px 16px !important; border-radius: 8px !important; cursor: pointer !important;
        }
      `
            }, void 0, false, {
                fileName: "[project]/src/app/admin/scanner/page.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    textAlign: "center",
                    marginBottom: 32
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontFamily: "'DM Serif Display', serif",
                            fontSize: 28,
                            color: "#1a2744",
                            marginBottom: 4
                        },
                        children: "Live QR Scanner"
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/scanner/page.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 14,
                            color: "#8a8ea8"
                        },
                        children: "Use your laptop camera to scan Student IDs"
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/scanner/page.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/scanner/page.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 24,
                    alignItems: "start"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: "#fff",
                            borderRadius: 20,
                            border: "1px solid #e2dfd6",
                            padding: 24,
                            boxShadow: "0 12px 32px rgba(26,39,68,.08)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    position: "relative",
                                    width: "100%",
                                    background: "#0f172a",
                                    borderRadius: 16,
                                    overflow: "hidden",
                                    marginBottom: 20
                                },
                                children: [
                                    !isScanning && !scannedResult && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            padding: "60px 20px",
                                            textAlign: "center",
                                            color: "rgba(255,255,255,0.5)"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: 50,
                                                    display: "block",
                                                    marginBottom: 12
                                                },
                                                children: "📷"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/scanner/page.tsx",
                                                lineNumber: 74,
                                                columnNumber: 17
                                            }, this),
                                            "Camera is off"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/admin/scanner/page.tsx",
                                        lineNumber: 73,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        id: "reader",
                                        style: {
                                            width: "100%"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/scanner/page.tsx",
                                        lineNumber: 78,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/scanner/page.tsx",
                                lineNumber: 71,
                                columnNumber: 11
                            }, this),
                            !isScanning ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Btn, {
                                onClick: ()=>{
                                    setScannedResult(null);
                                    setIsScanning(true);
                                },
                                style: {
                                    width: "100%"
                                },
                                children: scannedResult ? "Scan Again" : "📷 Start Camera"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/scanner/page.tsx",
                                lineNumber: 82,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Btn, {
                                variant: "ghost",
                                onClick: ()=>setIsScanning(false),
                                style: {
                                    width: "100%"
                                },
                                children: "Stop Camera"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/scanner/page.tsx",
                                lineNumber: 86,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/scanner/page.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: "#fff",
                            borderRadius: 20,
                            border: "1px solid #e2dfd6",
                            padding: 24,
                            boxShadow: "0 12px 32px rgba(26,39,68,.08)",
                            height: "100%"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 16,
                                    fontWeight: 700,
                                    color: "#1a2744",
                                    marginBottom: 20,
                                    fontFamily: "'DM Serif Display', serif",
                                    borderBottom: "2px solid #f2efe8",
                                    paddingBottom: 12
                                },
                                children: "Scanned Data"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/scanner/page.tsx",
                                lineNumber: 92,
                                columnNumber: 11
                            }, this),
                            !scannedResult ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    textAlign: "center",
                                    padding: "40px 0",
                                    color: "#8a8ea8"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 40,
                                            marginBottom: 12
                                        },
                                        children: "🔍"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/scanner/page.tsx",
                                        lineNumber: 98,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 14,
                                            fontWeight: 600
                                        },
                                        children: "Ready to scan..."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/scanner/page.tsx",
                                        lineNumber: 99,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/scanner/page.tsx",
                                lineNumber: 97,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    animation: "fadeUp .4s ease"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            background: "#e6f7ec",
                                            border: "1px solid #b6e8c4",
                                            borderRadius: 12,
                                            padding: 16,
                                            marginBottom: 20
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 11,
                                                    fontWeight: 700,
                                                    color: "#2d7a4f",
                                                    marginBottom: 4
                                                },
                                                children: "QR CODE DETECTED"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/scanner/page.tsx",
                                                lineNumber: 104,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 16,
                                                    fontWeight: 700,
                                                    color: "#1a2744",
                                                    wordBreak: "break-all"
                                                },
                                                children: scannedResult
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/scanner/page.tsx",
                                                lineNumber: 105,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/admin/scanner/page.tsx",
                                        lineNumber: 103,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 13,
                                            color: "#64748b",
                                            marginBottom: 20
                                        },
                                        children: "This data matches a record in the database. What would you like to do?"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/scanner/page.tsx",
                                        lineNumber: 108,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            gap: 10
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Btn, {
                                                variant: "green",
                                                style: {
                                                    flex: 1
                                                },
                                                onClick: ()=>alert("Transaction Processed!"),
                                                children: "Process"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/scanner/page.tsx",
                                                lineNumber: 113,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Btn, {
                                                variant: "ghost",
                                                onClick: ()=>setScannedResult(null),
                                                children: "Clear"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/scanner/page.tsx",
                                                lineNumber: 114,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/admin/scanner/page.tsx",
                                        lineNumber: 112,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/scanner/page.tsx",
                                lineNumber: 102,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/scanner/page.tsx",
                        lineNumber: 91,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/scanner/page.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/admin/scanner/page.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
_s(AdminScannerPage, "xcMfl0jdtJAIno0cwYdNLQeCUdo=");
_c1 = AdminScannerPage;
var _c, _c1;
__turbopack_context__.k.register(_c, "Btn");
__turbopack_context__.k.register(_c1, "AdminScannerPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_admin_scanner_page_tsx_13dc3752._.js.map