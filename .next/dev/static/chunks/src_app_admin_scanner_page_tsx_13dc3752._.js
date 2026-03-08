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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html5$2d$qrcode$2f$esm$2f$html5$2d$qrcode$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/html5-qrcode/esm/html5-qrcode.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
// 🎨 DESIGN MO: Button Component
function Btn({ children, variant = "navy", onClick, style = {}, disabled = false }) {
    const base = {
        border: "none",
        borderRadius: 10,
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 13,
        fontWeight: 700,
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all .18s",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        padding: "12px 24px",
        opacity: disabled ? 0.6 : 1,
        ...style
    };
    const v = {
        navy: {
            background: "#1a2744",
            color: "#fff",
            boxShadow: disabled ? "none" : "0 4px 14px rgba(26,39,68,.22)"
        },
        ghost: {
            background: "#f0ede5",
            color: "#1a2744",
            border: "2px solid #e2dfd6"
        },
        green: {
            background: "#2d7a4f",
            color: "#fff"
        },
        red: {
            background: "#ef4444",
            color: "#fff"
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        disabled: disabled,
        style: {
            ...base,
            ...v[variant]
        },
        onClick: onClick,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/app/admin/scanner/page.tsx",
        lineNumber: 15,
        columnNumber: 10
    }, this);
}
_c = Btn;
function AdminScannerPage() {
    _s();
    const [scannedResult, setScannedResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isScanning, setIsScanning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [studentInfo, setStudentInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const html5QrCodeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // 🚨 REF PARA SA CUSTOM FILE UPLOAD NATIN
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // 🧠 CENTRALIZED FUNCTION: Dito babagsak ang data galing Live Cam man o File Upload
    const processScan = (decodedText)=>{
        const studentQrId = decodedText.trim();
        setScannedResult(studentQrId);
        // Kunin ang data
        const allRequests = JSON.parse(localStorage.getItem("smartlib_requests") || "[]");
        const allPenalties = JSON.parse(localStorage.getItem("smartlib_penalties") || "[]");
        const myReservation = allRequests.find((req)=>req.studentId === studentQrId && req.status === "Pending");
        const myPenalty = allPenalties.find((p)=>p.studentId === studentQrId);
        setStudentInfo({
            name: myReservation ? myReservation.studentName : "Student " + studentQrId,
            reservation: myReservation || null,
            penalty: myPenalty ? myPenalty.amount : 0
        });
    };
    // 📸 UPLOAD IMAGE LOGIC
    const handleFileUpload = async (e)=>{
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const html5QrCode = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html5$2d$qrcode$2f$esm$2f$html5$2d$qrcode$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Html5Qrcode"]("reader");
            try {
                const decodedText = await html5QrCode.scanFile(file, false);
                processScan(decodedText);
            } catch (err) {
                alert("Hindi mabasa ang QR code sa picture na ito. Siguraduhing malinaw ang file.");
            }
            // I-reset ang input para pwede mag-upload ulit ng same file kung sakali
            e.target.value = "";
        }
    };
    // 🎥 LIVE CAMERA LOGIC
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminScannerPage.useEffect": ()=>{
            if (isScanning) {
                html5QrCodeRef.current = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html5$2d$qrcode$2f$esm$2f$html5$2d$qrcode$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Html5Qrcode"]("reader");
                html5QrCodeRef.current.start({
                    facingMode: "environment"
                }, {
                    fps: 10,
                    qrbox: {
                        width: 250,
                        height: 250
                    }
                }, {
                    "AdminScannerPage.useEffect": (decodedText)=>{
                        setIsScanning(false);
                        if (html5QrCodeRef.current) {
                            html5QrCodeRef.current.stop().then({
                                "AdminScannerPage.useEffect": ()=>{
                                    html5QrCodeRef.current?.clear();
                                    processScan(decodedText); // Ipasa ang data sa process function
                                }
                            }["AdminScannerPage.useEffect"]).catch({
                                "AdminScannerPage.useEffect": (err)=>console.log("Stop error", err)
                            }["AdminScannerPage.useEffect"]);
                        }
                    }
                }["AdminScannerPage.useEffect"], {
                    "AdminScannerPage.useEffect": (error)=>{}
                }["AdminScannerPage.useEffect"]).catch({
                    "AdminScannerPage.useEffect": (err)=>{
                        setIsScanning(false);
                        alert("Hindi mabuksan ang camera. Check your browser permissions.");
                    }
                }["AdminScannerPage.useEffect"]);
            }
            return ({
                "AdminScannerPage.useEffect": ()=>{
                    if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
                        html5QrCodeRef.current.stop().then({
                            "AdminScannerPage.useEffect": ()=>{
                                html5QrCodeRef.current?.clear();
                            }
                        }["AdminScannerPage.useEffect"]).catch({
                            "AdminScannerPage.useEffect": ()=>{}
                        }["AdminScannerPage.useEffect"]);
                    }
                }
            })["AdminScannerPage.useEffect"];
        }
    }["AdminScannerPage.useEffect"], [
        isScanning
    ]);
    const handleConfirmRelease = ()=>{
        if (!studentInfo?.reservation) return;
        const allRequests = JSON.parse(localStorage.getItem("smartlib_requests") || "[]");
        const updated = allRequests.map((req)=>req.id === studentInfo.reservation.id ? {
                ...req,
                status: "Approved"
            } : req);
        localStorage.setItem("smartlib_requests", JSON.stringify(updated));
        alert(`Success! "${studentInfo.reservation.bookTitle}" has been released.`);
        setScannedResult(null);
        setStudentInfo(null);
    };
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
        #reader { border: none !important; border-radius: 16px; overflow: hidden; background: #0f172a; width: 100%; min-height: 250px; }
        #reader video { object-fit: cover !important; border-radius: 16px; }
      `
            }, void 0, false, {
                fileName: "[project]/src/app/admin/scanner/page.tsx",
                lineNumber: 115,
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
                        lineNumber: 123,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 14,
                            color: "#8a8ea8"
                        },
                        children: "Use your laptop camera or upload a QR image"
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/scanner/page.tsx",
                        lineNumber: 124,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/scanner/page.tsx",
                lineNumber: 122,
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
                                            color: "rgba(255,255,255,0.5)",
                                            position: "absolute",
                                            top: "50%",
                                            left: "50%",
                                            transform: "translate(-50%, -50%)",
                                            width: "100%",
                                            zIndex: 10
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
                                                lineNumber: 135,
                                                columnNumber: 17
                                            }, this),
                                            "Camera is off"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/admin/scanner/page.tsx",
                                        lineNumber: 134,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        id: "reader"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/scanner/page.tsx",
                                        lineNumber: 140,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/scanner/page.tsx",
                                lineNumber: 131,
                                columnNumber: 11
                            }, this),
                            !isScanning ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "10px"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Btn, {
                                        onClick: ()=>{
                                            setScannedResult(null);
                                            setStudentInfo(null);
                                            setIsScanning(true);
                                        },
                                        style: {
                                            width: "100%"
                                        },
                                        children: scannedResult ? "📷 Scan Another ID" : "📷 Start Camera"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/scanner/page.tsx",
                                        lineNumber: 145,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "file",
                                        accept: "image/*",
                                        ref: fileInputRef,
                                        onChange: handleFileUpload,
                                        style: {
                                            display: "none"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/scanner/page.tsx",
                                        lineNumber: 150,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Btn, {
                                        variant: "ghost",
                                        onClick: ()=>fileInputRef.current?.click(),
                                        style: {
                                            width: "100%"
                                        },
                                        children: "📂 Upload QR Image"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/scanner/page.tsx",
                                        lineNumber: 157,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/scanner/page.tsx",
                                lineNumber: 144,
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
                                lineNumber: 162,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/scanner/page.tsx",
                        lineNumber: 130,
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
                                children: "Student Information"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/scanner/page.tsx",
                                lineNumber: 168,
                                columnNumber: 11
                            }, this),
                            !scannedResult || !studentInfo ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                        lineNumber: 174,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 14,
                                            fontWeight: 600
                                        },
                                        children: "Waiting for QR scan..."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/scanner/page.tsx",
                                        lineNumber: 175,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/scanner/page.tsx",
                                lineNumber: 173,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    animation: "fadeUp .4s ease"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            background: "#f8fafc",
                                            border: "1px solid #e2e8f0",
                                            borderRadius: 12,
                                            padding: 16,
                                            marginBottom: 16
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 11,
                                                    fontWeight: 700,
                                                    color: "#3d8bef",
                                                    marginBottom: 4
                                                },
                                                children: "STUDENT DETECTED"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/scanner/page.tsx",
                                                lineNumber: 182,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 18,
                                                    fontWeight: 700,
                                                    color: "#1a2744"
                                                },
                                                children: studentInfo.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/scanner/page.tsx",
                                                lineNumber: 183,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 13,
                                                    color: "#64748b"
                                                },
                                                children: [
                                                    "ID: ",
                                                    scannedResult
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/admin/scanner/page.tsx",
                                                lineNumber: 184,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/admin/scanner/page.tsx",
                                        lineNumber: 181,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "grid",
                                            gridTemplateColumns: "1fr 1fr",
                                            gap: 12,
                                            marginBottom: 20
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    background: studentInfo.penalty > 0 ? "#fef2f2" : "#f0fdf4",
                                                    border: `1px solid ${studentInfo.penalty > 0 ? "#fecaca" : "#bbf7d0"}`,
                                                    borderRadius: 12,
                                                    padding: 16
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: 11,
                                                            fontWeight: 700,
                                                            color: studentInfo.penalty > 0 ? "#ef4444" : "#22c55e",
                                                            marginBottom: 4
                                                        },
                                                        children: "PENALTY STATUS"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/scanner/page.tsx",
                                                        lineNumber: 190,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: 16,
                                                            fontWeight: 700,
                                                            color: "#1a2744"
                                                        },
                                                        children: studentInfo.penalty > 0 ? `₱${studentInfo.penalty}` : "Clear ✅"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/scanner/page.tsx",
                                                        lineNumber: 191,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/admin/scanner/page.tsx",
                                                lineNumber: 189,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    background: studentInfo.reservation ? "#eff6ff" : "#f8fafc",
                                                    border: `1px solid ${studentInfo.reservation ? "#bfdbfe" : "#e2e8f0"}`,
                                                    borderRadius: 12,
                                                    padding: 16
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: 11,
                                                            fontWeight: 700,
                                                            color: studentInfo.reservation ? "#3b82f6" : "#64748b",
                                                            marginBottom: 4
                                                        },
                                                        children: "RESERVATION"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/scanner/page.tsx",
                                                        lineNumber: 196,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: 14,
                                                            fontWeight: 700,
                                                            color: "#1a2744",
                                                            lineHeight: 1.2
                                                        },
                                                        children: studentInfo.reservation ? studentInfo.reservation.bookTitle : "None"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/scanner/page.tsx",
                                                        lineNumber: 197,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/admin/scanner/page.tsx",
                                                lineNumber: 195,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/admin/scanner/page.tsx",
                                        lineNumber: 187,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            gap: 10
                                        },
                                        children: [
                                            studentInfo.penalty > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Btn, {
                                                variant: "red",
                                                style: {
                                                    flex: 1
                                                },
                                                disabled: true,
                                                children: "Cannot Release"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/scanner/page.tsx",
                                                lineNumber: 206,
                                                columnNumber: 20
                                            }, this) : studentInfo.reservation ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Btn, {
                                                variant: "navy",
                                                style: {
                                                    flex: 1
                                                },
                                                onClick: handleConfirmRelease,
                                                children: "Release Book"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/scanner/page.tsx",
                                                lineNumber: 208,
                                                columnNumber: 20
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Btn, {
                                                variant: "navy",
                                                style: {
                                                    flex: 1
                                                },
                                                onClick: ()=>alert("Proceeding to Walk-in Borrowing..."),
                                                children: "Walk-in Borrow"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/scanner/page.tsx",
                                                lineNumber: 210,
                                                columnNumber: 20
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Btn, {
                                                variant: "ghost",
                                                onClick: ()=>{
                                                    setScannedResult(null);
                                                    setStudentInfo(null);
                                                },
                                                children: "Clear"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/scanner/page.tsx",
                                                lineNumber: 213,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/admin/scanner/page.tsx",
                                        lineNumber: 204,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/scanner/page.tsx",
                                lineNumber: 178,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/scanner/page.tsx",
                        lineNumber: 167,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/scanner/page.tsx",
                lineNumber: 127,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/admin/scanner/page.tsx",
        lineNumber: 114,
        columnNumber: 5
    }, this);
}
_s(AdminScannerPage, "ueOa7mvyKP5wjtBBkCl4m2jelEE=");
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