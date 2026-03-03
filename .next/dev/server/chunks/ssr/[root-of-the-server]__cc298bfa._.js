module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/app/layout.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '../../components/layout/Sidebar'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '../../components/layout/Topbar'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
"use client";
;
;
;
;
function DashboardLayout({ children }) {
    const [collapsed, setCollapsed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            height: "100vh",
            width: "100vw",
            background: "#0c0c14",
            color: "#e2e2ee",
            fontFamily: "'DM Sans', sans-serif",
            overflow: "hidden",
            position: "absolute",
            top: 0,
            left: 0
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@600;700&display=swap');
        
        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-thumb { background: #252535; border-radius: 4px; }
        
        /* Typography */
        .np { font-family: 'Playfair Display', serif; }
        
        /* Buttons */
        .btn { cursor: pointer; border: none; border-radius: 10px; padding: 9px 18px; font-family: inherit; font-size: 13px; font-weight: 500; transition: all .18s; }
        .btn-gold { background: #c9a84c; color: #0c0c14; }
        .btn-gold:hover { background: #dfc06a; transform: translateY(-1px); }
        .btn-ghost { background: rgba(255,255,255,.06); color: #e2e2ee; border: 1px solid rgba(255,255,255,1); }
        .btn-ghost:hover { background: rgba(255,255,255,.11); }
        .btn-red { background: rgba(231,76,60,.12); color: #e74c3c; border: 1px solid rgba(231,76,60,.22); }
        .btn-red:hover { background: rgba(231,76,60,.22); }
        
        /* Inputs & Selects */
        .inp { background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1); border-radius: 10px; color: #e2e2ee; padding: 9px 13px; font-family: inherit; font-size: 13px; outline: none; width: 100%; transition: border-color .2s; }
        .inp:focus { border-color: #c9a84c; }
        textarea.inp { resize: vertical; min-height: 88px; }
        .sel { background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1); border-radius: 10px; color: #e2e2ee; padding: 9px 13px; font-family: inherit; font-size: 13px; outline: none; cursor: pointer; }
        .sel option { background: #1a1a2e; }
        
        /* Navigation Components */
        .nav-btn { display: flex; align-items: center; gap: 11px; padding: 10px 13px; border-radius: 10px; cursor: pointer; transition: all .18s; border: none; background: transparent; width: 100%; font-family: inherit; font-size: 13.5px; font-weight: 500; color: rgba(226,226,238,.4); text-decoration: none; white-space: nowrap; overflow: hidden; }
        .nav-btn:hover { background: rgba(255,255,255,.06); color: rgba(226,226,238,.8); }
        .nav-btn.nav-active { background: rgba(201,168,76,.11); color: #c9a84c; }
        .nav-icon { font-size: 17px; flex-shrink: 0; width: 20px; text-align: center; }
        
        /* UI Elements */
        .card { background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.07); border-radius: 16px; }
        .bk-card { background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.07); border-radius: 14px; overflow: hidden; transition: all .22s; cursor: pointer; }
        .bk-card:hover { transform: translateY(-3px); border-color: rgba(201,168,76,.35); box-shadow: 0 14px 40px rgba(0,0,0,.45); }
        .badge { display: inline-flex; align-items: center; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; letter-spacing: .4px; }
        
        /* Status Colors */
        .bg { background: rgba(76,175,80,.13); color: #66bb6a; } /* Green/Available */
        .br { background: rgba(231,76,60,.13); color: #e74c3c; } /* Red/Borrowed */
        .ba { background: rgba(201,168,76,.13); color: #c9a84c; } /* Gold/Mine */
        .bb { background: rgba(100,149,237,.13); color: #6495ed; } /* Blue/Reserved */
        
        /* Utils */
        .scroll-area { flex: 1; overflow-y: auto; padding: 28px; }
        .np-panel { position: absolute; top: 54px; right: 0; width: 316px; background: #141421; border: 1px solid rgba(255,255,255,.1); border-radius: 16px; z-index: 60; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,.5); }
      `
            }, void 0, false, {
                fileName: "[project]/src/app/layout.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Sidebar, {
                collapsed: collapsed,
                setCollapsed: setCollapsed
            }, void 0, false, {
                fileName: "[project]/src/app/layout.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Topbar, {}, void 0, false, {
                        fileName: "[project]/src/app/layout.tsx",
                        lineNumber: 79,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "scroll-area",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/src/app/layout.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/layout.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/layout.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__cc298bfa._.js.map