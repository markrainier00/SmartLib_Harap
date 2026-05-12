"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { IconSend, IconSendPhoto, IconX } from "@/components/icons";
import { api } from "@/lib/api";

const GREEN_DARK = "#1a5c2e";
const GREEN_BORDER = "#b6dfc2";

export default function AdminChat({ onClose }: { onClose?: () => void }) {
  const [conversations, setConversations] = useState<any[]>([]);
  const [activeStudent, setActiveStudent] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState("");
  const [search, setSearch] = useState("");
  const [userMap, setUserMap] = useState<{ [key: string]: any }>({});
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isLoadingConvos, setIsLoadingConvos] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [unreadSet, setUnreadSet] = useState<Set<string>>(new Set());

const fetchConversations = useCallback(async () => {
  try {
    setIsLoadingConvos(true);
    const data = await api.get("/api/chat/admin/all");
    if (data.isSuccess) {
      setConversations(data.data || []);
      const map: { [key: string]: any } = {};
      const newUnreadSet = new Set<string>();

      (data.data || []).forEach((c: any) => {
        const hasUnread = (c.messages || []).some(
          (m: any) => m.sender_role?.toLowerCase() === "student" && !m.is_read
        );
        if (hasUnread) newUnreadSet.add(c.student_id);
      });
      setUnreadSet(newUnreadSet);

      await Promise.all(
        (data.data || []).map(async (c: any) => {
          try {
            const json = await api.get(`/api/admin/specificUser/${c.student_id}`);
            if (json.retCode === "200" && json.data?.[0]) {
              map[c.student_id] = json.data[0];
            }
          } catch {}
        })
      );

      setUserMap(map);
    }
  } catch {
    console.error("Failed to load conversations");
  } finally {
    setIsLoadingConvos(false);
  }
}, []);

  useEffect(() => { fetchConversations(); }, []);

  const markAsRead = async (convoId: any, studentId: string) => {
    if (!convoId) return;
    try {
      await api.post('/api/chat/read', { conversation_id: convoId, viewer_role: "admin" });
      setUnreadSet(prev => {
        const next = new Set(prev);
        next.delete(studentId);
        return next;
      });
    } catch (e) {
      console.error("Failed to mark as read", e);
    }
  };

  const fetchActiveChat = useCallback(async () => {
    if (!activeStudent) return;
    try {
      const data = await api.get(`/api/chat/student/${activeStudent.student_id}`);
      if (data.isSuccess) {
        setMessages(data.data.messages || []);
        markAsRead(activeStudent.id || activeStudent.ID, activeStudent.student_id);
        setIsInitialLoad(false);
      }
    } catch (error) {
      console.error("Failed to load active chat");
    } finally {
      setIsLoadingMessages(false);
    }
  }, [activeStudent]);

  useEffect(() => {
    if (!activeStudent) return;
    setIsInitialLoad(true);
    setIsLoadingMessages(true);

    fetchActiveChat();

    const eventSource = new EventSource(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/events`);
    eventSource.onmessage = (e) => {
      const data = JSON.parse(e.data);
  console.log("role value:", JSON.stringify(data.sender_role));
      if (data.type === "new_message" && data.sender_role?.toLowerCase() === "student") {
        fetchActiveChat();
      }
    };
    eventSource.onerror = () => fetchConversations();
    return () => eventSource.close();
  }, [activeStudent, fetchActiveChat, fetchConversations]);

  useEffect(() => {
    if (isInitialLoad) return;
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
  }, [isInitialLoad]);

  useEffect(() => {
    if (isInitialLoad) return;
    const scrollArea = scrollAreaRef.current;
    if (!scrollArea) return;

    const isNearBottom = scrollArea.scrollHeight - scrollArea.scrollTop - scrollArea.clientHeight < 100;
    if (isNearBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendPayload = async (contentStr: string) => {
    if (!contentStr || !activeStudent) return;
    try {
      const data = await api.post("/api/chat/send", {
        conversation_id: activeStudent.id || activeStudent.ID,
        sender_id: "ADMIN",
        sender_role: "admin",
        content: contentStr,
      });
      if (data.isSuccess) {
        setMessages((prev) => [...prev, data.data]);
        setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
        setUnreadSet(prev => {
          const next = new Set(prev);
          next.delete(activeStudent.student_id);
          return next;
        });
      }
    } catch {
      console.error("Failed to send reply");
    }
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim()) return;
    sendPayload(inputText);
    setInputText("");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => sendPayload(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const filtered = conversations.filter((c) => {
    const user = userMap[c.student_id];
    const fullName = user ? `${user.firstname} ${user.lastname}`.toLowerCase() : "";
    return !search ||
      c.student_id.toLowerCase().includes(search.toLowerCase()) ||
      fullName.includes(search.toLowerCase());
  });

  const formatTime = (dateString: string) => {
    if (!dateString) return "Just now";
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderMessage = (content: string) => {
    if (content && content.startsWith("data:image")) {
      return <img src={content} alt="Attachment" style={{ maxWidth: '250px', borderRadius: '8px', border: '1px solid #ddd', display: 'block' }} />;
    }
    return content;
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ display: "flex", flexDirection: "column", width: "100%", maxWidth: "1150px", height: "100%", maxHeight: "750px", background: "#fff", borderRadius: "16px", overflow: "hidden", border: `1px solid ${GREEN_BORDER}`, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}>

        {/* ── HEADER ── */}
        <div className="modal-header" style={{ backgroundColor: 'white', color: 'var(--color-primary)', padding: '10px 24px', display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${GREEN_BORDER}`, flexShrink: 0 }}>
          <p className="page-header m-0" style={{ fontSize: "18px", margin: 0 }}>SmartLib Support</p>
          <button className="close" style={{ position: "inherit" }} type="button" onClick={onClose} aria-label="Close modal"><IconX /></button>
        </div>

        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

          {/* ── LEFT PANEL ── */}
          <div style={{ width: "320px", borderRight: `1px solid var(--color-border)`, display: "flex", flexDirection: "column", background: "#fff" }}>
            <div style={{ borderBottom: `1px solid var(--color-border)`, padding: "10px 12px" }}>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search student..." style={{ width: "100%", padding: "7px 10px", borderRadius: "8px", border: `1px solid var(--color-border)`, background: "#f9fbf9", fontSize: "12px", outline: "none" }} />
            </div>

            <div style={{ flex: 1, overflowY: "auto" }}>
              {isLoadingConvos ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} style={{ padding: "15px", borderBottom: "1px solid var(--color-border)", display: "flex", gap: "10px", alignItems: "center" }}>
                    <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "#e8f0e9", flexShrink: 0 }} />
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                      <div style={{ height: "12px", borderRadius: "6px", background: "#e8f0e9", width: "60%" }} />
                      <div style={{ height: "10px", borderRadius: "6px", background: "#f0f5f1", width: "40%" }} />
                    </div>
                  </div>
                ))
              ) : filtered.length === 0 ? (
                <div style={{ padding: "40px", textAlign: "center", fontSize: "13px", color: "#9ca3af" }}>
                  No conversations found.
                </div>
              ) : (
                filtered.map((c, index) => {
                  const user = userMap[c.student_id];
                  const displayName = user ? `${user.firstname} ${user.lastname}` : c.student_id;
                  const avatarInitial = user ? user.firstname[0].toUpperCase() : c.student_id.slice(0, 2).toUpperCase();
                  const isActive = activeStudent?.student_id === c.student_id;

                  return (
                    <div key={`convo-${c.id || c.ID || index}`}
                      onClick={() => setActiveStudent(c)}
                      onMouseEnter={() => setHoveredId(c.student_id)}
                      onMouseLeave={() => setHoveredId(null)}
                      style={{ padding: "15px", cursor: "pointer", borderBottom: "1px solid var(--color-border)", background: isActive ? "var(--color-success-bg)" : hoveredId === c.student_id ? "var(--color-surface)" : "transparent" }}
                    >
                      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "linear-gradient(135deg, var(--color-success-border), var(--color-primary))", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", border: "3px solid var(--green-100)", flexShrink: 0 }}>
                          {avatarInitial}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <div style={{ fontWeight: 700, fontSize: "13px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {displayName}
                            </div>
                            {unreadSet.has(c.student_id) && (
                              <span style={{
                                width: 8, height: 8, borderRadius: "50%",
                                background: "#ef4444", flexShrink: 0
                              }} />
                            )}
                          </div>
                          <div style={{ fontSize: "11px", color: "#7AAD8E" }}>{c.student_id}</div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* ── RIGHT PANEL ── */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#fcfdfc" }}>
            {!activeStudent ? (
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "#cbd5e1" }}>
                <p>Select a student to respond</p>
              </div>
            ) : (
              <>
                <div style={{ background: "#fff", padding: "15px 20px", borderBottom: `1px solid var(--color-border)`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "15px", color: GREEN_DARK }}>
                      {userMap[activeStudent.student_id]
                        ? `${userMap[activeStudent.student_id].firstname} ${userMap[activeStudent.student_id].lastname}`
                        : `Student ${activeStudent.student_id}`}
                    </div>
                    <div style={{ fontSize: "12px", color: "#7AAD8E" }}>{activeStudent.student_id}</div>
                  </div>
                </div>

                <div ref={scrollAreaRef} style={{ flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
                  {isLoadingMessages ? (
                    Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: i % 2 === 0 ? "flex-start" : "flex-end" }}>
                        <div style={{ width: "55%", height: "40px", borderRadius: "14px", background: "#e8f0e9" }} />
                      </div>
                    ))
                  ) : (
                    messages.map((msg, i) => {
                      const isAdmin = msg.sender_role === "admin";
                      const time = formatTime(msg.created_at || msg.CreatedAt);
                      const status = msg.is_read || msg.IsRead ? "Seen" : "Sent";
                      const date = new Date(msg.created_at || msg.CreatedAt).toLocaleDateString([], {
                        month: "short", day: "numeric", year: "numeric"
                      });
                      const prevMsg = messages[i - 1];
                      const prevDate = prevMsg
                        ? new Date(prevMsg.created_at || prevMsg.CreatedAt).toLocaleDateString([], {
                            month: "short", day: "numeric", year: "numeric"
                          })
                        : null;
                      const showDate = date !== prevDate;

                      return (
                        <div key={i}>
                          {showDate && (
                            <div style={{ textAlign: "center", fontSize: "11px", color: "#9ca3af", margin: "8px 0" }}>
                              {date}
                            </div>
                          )}
                          <div style={{ display: "flex", justifyContent: isAdmin ? "flex-end" : "flex-start" }}>
                            <div style={{ maxWidth: "70%" }}>
                              <div style={{ padding: "10px 14px", fontSize: "13.5px", background: isAdmin ? GREEN_DARK : "#fff", color: isAdmin ? "#fff" : "#1e293b", border: isAdmin ? "none" : `1px solid ${GREEN_BORDER}`, borderRadius: isAdmin ? "14px 14px 2px 14px" : "14px 14px 14px 2px", boxShadow: "0 1px 2px rgba(0,0,0,0.05)", wordBreak: "break-word" }}>
                                {renderMessage(msg.content)}
                              </div>
                              <div style={{ fontSize: '10px', marginTop: '4px', textAlign: isAdmin ? 'right' : 'left', color: '#9ca3af', fontWeight: '500' }}>
                                {time} {isAdmin && ` • ${status}`}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className='modal-footer' style={{ justifyContent: "center" }}>
                  <div style={{ display: 'flex', gap: '10px', background: '#f1f5f1', padding: '3px', borderRadius: '10px', border: '1px solid var(--color-border)', alignItems: 'center', width: "100%" }}>
                    <input type="file" accept="image/*" style={{ display: 'none' }} ref={fileInputRef} onChange={handleImageUpload} />
                    <button type="button" onClick={() => fileInputRef.current?.click()} style={{ border: 'none', cursor: 'pointer', paddingLeft: '8px', color: '#1a5c2e' }} title="Send Photo">
                      <IconSendPhoto/>
                    </button>
                    <input value={inputText} onChange={e => setInputText(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSendMessage()} placeholder="Type a message..." style={{ flex: 1, padding: "10px", border: "none", background: "transparent", outline: "none", fontSize: "14px" }} />
                    <button onClick={() => handleSendMessage()} style={{ cursor: 'pointer', paddingRight: '8px' }}><IconSend/></button>
                  </div>
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}