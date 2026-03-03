"use client";

import React, { useState } from "react";
// Gamitin ang @/ para siguradong mahanap ang components folder sa loob ng src
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ 
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
    }}>
      {/* ── DASHBOARD GLOBAL STYLES ── */}
      <style>{`
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
      `}</style>

      {/* ── SIDEBAR ── */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      
      {/* ── MAIN CONTENT ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* TOPBAR */}
        <Topbar />
        
        {/* DYNAMIC PAGE CONTENT */}
        <div className="scroll-area">
          {children}
        </div>
      </div>
    </div>
  );
}