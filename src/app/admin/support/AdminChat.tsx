"use client";

import React, { useState, useEffect, useRef } from "react";

const GREEN_DARK = "#1a5c2e";
const GREEN_MED = "#2d7a3e";
const GREEN_LIGHT = "#e8f5ec";
const GREEN_BORDER = "#b6dfc2";

export default function AdminChat() {
  const [conversations, setConversations] = useState<any[]>([]);
  const [activeStudent, setActiveStudent] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState("");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null); // 🚀 Ref para sa photo upload

  const fetchConversations = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/chat/admin/all");
      const data = await res.json();
      if (data.isSuccess) setConversations(data.data || []);
    } catch (error) {
      console.error("Failed to load conversations");
    }
  };

  // 🚀 Taga-trigger ng SEEN kapag binuksan ni Admin ang chat
  const markAsRead = async (convoId: any) => {
    if (!convoId) return;
    try {
      await fetch('http://localhost:8080/api/chat/read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversation_id: convoId, viewer_role: "admin" })
      });
    } catch (e) {
      console.error("Failed to mark as read", e);
    }
  };

  useEffect(() => { fetchConversations(); }, []);

  useEffect(() => {
    if (!activeStudent) return;
    const fetchActiveChat = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/chat/student/${activeStudent.student_id}`);
        const data = await res.json();
        if (data.isSuccess) {
          setMessages(data.data.messages || []);
          markAsRead(activeStudent.id || activeStudent.ID); // 🚀 I-mark as read agad
        }
      } catch (error) {
        console.error("Failed to load active chat");
      }
    };
    
    fetchActiveChat();
    const interval = setInterval(fetchActiveChat, 3000); // Auto-refresh para real-time
    return () => clearInterval(interval);
  }, [activeStudent]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🚀 FUNCTION PARA MAG-SEND NG TEXT O PICTURE
  const sendPayload = async (contentStr: string) => {
    if (!contentStr || !activeStudent) return;
    const payload = {
      conversation_id: activeStudent.id || activeStudent.ID,
      sender_id: "ADMIN",
      sender_role: "admin",
      content: contentStr,
    };
    try {
      const res = await fetch("http://localhost:8080/api/chat/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.isSuccess) {
        setMessages((prev) => [...prev, data.data]);
        fetchConversations();
      }
    } catch (error) {
      console.error("Failed to send reply");
    }
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim()) return;
    sendPayload(inputText);
    setInputText("");
  };

  // 🚀 FUNCTION PARA MAG-UPLOAD NG PICTURE (Base64)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        sendPayload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const filtered = conversations.filter((c) => {
    const matchSearch = !search || c.student_id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || c.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const initials = (id: string) => id.slice(0, 2).toUpperCase();

  const formatTime = (dateString: string) => {
    if (!dateString) return "Just now";
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // 🚀 RENDERER PARA ALAM KUNG PICTURE O TEXT ANG IPAPAKITA
  const renderMessage = (content: string) => {
    if (content && content.startsWith("data:image")) {
      return <img src={content} alt="Attachment" style={{ maxWidth: '250px', borderRadius: '8px', border: '1px solid #ddd', display: 'block' }} />;
    }
    return content;
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "calc(100vh - 120px)", padding: "20px", boxSizing: "border-box" }}>
      <div style={{ display: "flex", width: "100%", maxWidth: "1150px", height: "100%", maxHeight: "750px", background: "#fff", borderRadius: "16px", overflow: "hidden", border: `1px solid ${GREEN_BORDER}`, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}>

        {/* ── LEFT PANEL ── */}
        <div style={{ width: "320px", borderRight: `1px solid ${GREEN_BORDER}`, display: "flex", flexDirection: "column", background: "#fff" }}>
          <div style={{ background: GREEN_DARK, padding: "18px", color: "#fff" }}>
            <div style={{ fontWeight: 700, fontSize: "15px" }}>Support Tickets</div>
            <div style={{ fontSize: "11px", opacity: 0.8 }}>{conversations.filter(c => c.status === "Open").length} active</div>
          </div>

          <div style={{ padding: "12px", borderBottom: `1px solid ${GREEN_BORDER}` }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search Student ID..." style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", border: `1px solid ${GREEN_BORDER}`, background: "#f9fbf9", fontSize: "12px", outline: "none", marginBottom: "8px" }} />
            <div style={{ display: "flex", gap: "4px" }}>
              {["All", "Open", "Resolved"].map(s => (
                <button key={s} onClick={() => setFilterStatus(s)} style={{ flex: 1, padding: "5px", fontSize: "10px", fontWeight: 700, borderRadius: "6px", cursor: "pointer", background: filterStatus === s ? GREEN_DARK : "#fff", color: filterStatus === s ? "#fff" : GREEN_DARK, border: `1px solid ${GREEN_DARK}` }}>{s}</button>
              ))}
            </div>
          </div>

          <div style={{ flex: 1, overflowY: "auto" }}>
            {filtered.map((c, index) => (
              <div key={`convo-${c.id || c.ID || index}`} onClick={() => setActiveStudent(c)} style={{ padding: "15px", cursor: "pointer", borderBottom: "1px solid #f0f0f0", background: (activeStudent?.id === c.id || activeStudent?.ID === c.ID) ? GREEN_LIGHT : "transparent", borderLeft: (activeStudent?.id === c.id || activeStudent?.ID === c.ID) ? `4px solid ${GREEN_DARK}` : "4px solid transparent" }}>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: GREEN_MED, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700 }}>{initials(c.student_id)}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: "13px" }}>{c.student_id}</div>
                    <div style={{ fontSize: "11px", color: c.status === 'Open' ? '#d97706' : '#16a34a' }}>{c.status}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#fcfdfc" }}>
          {!activeStudent ? (
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "#cbd5e1" }}><p>Select a student to start chatting</p></div>
          ) : (
            <>
              <div style={{ background: "#fff", padding: "15px 20px", borderBottom: `1px solid ${GREEN_BORDER}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "15px", color: GREEN_DARK }}>Student {activeStudent.student_id}</div>
                  <div style={{ fontSize: "11px", color: "#666" }}>{activeStudent.subject || "General Support"}</div>
                </div>
                <div style={{ background: GREEN_LIGHT, color: GREEN_DARK, padding: "4px 12px", borderRadius: "10px", fontSize: "11px", fontWeight: 700, border: `1px solid ${GREEN_BORDER}` }}>{activeStudent.status}</div>
              </div>

              <div style={{ flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
                {messages.map((msg, i) => {
                  const isAdmin = msg.sender_role === "admin";
                  const time = formatTime(msg.created_at || msg.CreatedAt);
                  const status = msg.is_read || msg.IsRead ? "Seen" : "Sent";

                  return (
                    <div key={i} style={{ display: "flex", justifyContent: isAdmin ? "flex-end" : "flex-start" }}>
                      <div style={{ maxWidth: "70%" }}>
                        {/* MESSAGE BUBBLE */}
                        <div style={{ 
                          padding: "10px 14px", fontSize: "13.5px",
                          background: isAdmin ? GREEN_DARK : "#fff", color: isAdmin ? "#fff" : "#1e293b",
                          border: isAdmin ? "none" : `1px solid ${GREEN_BORDER}`,
                          borderRadius: isAdmin ? "14px 14px 2px 14px" : "14px 14px 14px 2px",
                          boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                          wordBreak: "break-word"
                        }}>
                          {renderMessage(msg.content)}
                        </div>

                        {/* TIME & STATUS */}
                        <div style={{ fontSize: '10px', marginTop: '4px', textAlign: isAdmin ? 'right' : 'left', color: '#9ca3af', fontWeight: '500' }}>
                          {time} {isAdmin && ` • ${status}`}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              <div style={{ padding: "15px 20px", background: "#fff", borderTop: `1px solid ${GREEN_BORDER}` }}>
                <div style={{ display: "flex", gap: "10px", background: "#f1f5f1", padding: "5px", borderRadius: "12px", border: `1px solid ${GREEN_BORDER}`, alignItems: "center" }}>
                  
                  {/* 🚀 PHOTO UPLOAD BUTTON */}
                  <input type="file" accept="image/*" style={{ display: 'none' }} ref={fileInputRef} onChange={handleImageUpload} />
                  <button type="button" onClick={() => fileInputRef.current?.click()} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px', color: GREEN_DARK }} title="Send Photo">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
                  </button>

                  <input value={inputText} onChange={e => setInputText(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSendMessage()} placeholder="Type a message..." style={{ flex: 1, padding: "10px", border: "none", background: "transparent", outline: "none", fontSize: "14px" }} />
                  <button onClick={() => handleSendMessage()} style={{ background: GREEN_DARK, color: "#fff", border: "none", padding: "8px 20px", borderRadius: "8px", fontWeight: 700, cursor: "pointer" }}>Send</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}