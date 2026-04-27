"use client";

import { useState, useEffect, useRef } from 'react';
import { IconX, IconSend, IconSendPhoto } from '@/components/icons';
import { api } from '@/lib/api';

const ChatSupport = ({ studentId, onClose }: { studentId: string; onClose?: () => void }) => {
  const [conversation, setConversation] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState("");
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  const markAsRead = async (convoId: any) => {
    if (!convoId) return;
    try {
      await api.post('/api/chat/read', { conversation_id: convoId, viewer_role: "student" });
    } catch (e) {}
  };

  useEffect(() => {
    if (!studentId) return;

    const fetchChatHistory = async () => {
      try {
        const data = await api.get(`/api/chat/student/${studentId}`);
        if (data.isSuccess) {
          setConversation(data.data);
          setMessages(data.data.messages || []);
          markAsRead(data.data.id || data.data.ID);
          setIsInitialLoad(false);
        }
      } catch (error) {}
      finally {
        setIsLoading(false);
      }
    };

    fetchChatHistory();
    const interval = setInterval(fetchChatHistory, 3000);
    return () => clearInterval(interval);
  }, [studentId]);

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
    if (!contentStr || !conversation) return;
    const payload = {
      conversation_id: conversation.id || conversation.ID,
      sender_id: studentId,
      sender_role: "student",
      content: contentStr,
    };
    try {
      const data = await api.post('/api/chat/send', payload);
      if (data.isSuccess) {
        setMessages((prev) => [...prev, data.data]);
        setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
      }
    } catch (error) {}
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
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

  const formatTime = (dateString: string) => {
    if (!dateString) return "Just now";
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderMessage = (content: string) => {
    if (content?.startsWith("data:image")) {
      return <img src={content} alt="Upload" style={{ maxWidth: '250px', borderRadius: '8px', border: '1px solid #ddd', display: 'block' }} />;
    }
    return content;
  };

  return (
    <>
      <div className="overlay" onClick={onClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()} style={{ height: "100%", maxHeight: "750px", }}>
          <div className="modal-header" style={{ backgroundColor: 'white', color: 'var(--color-primary)', padding: '10px 24px', display: "flex", justifyContent: "space-between" }}>
            <p className="page-header m-0" style={{ fontSize: "18px" }}>SmartLib Support</p>
            <button className="close" style={{ position: "inherit" }} type="button" onClick={onClose} aria-label="Close modal"><IconX /></button>
          </div>

          <div ref={scrollAreaRef} style={{ flex: 1, padding: '24px', overflowY: 'auto', backgroundColor: 'var(--color-surface)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {isLoading ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#9ca3af', gap: '12px' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1a5c2e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}>
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                <p style={{ fontSize: '14px' }}>Loading messages...</p>
                <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
              </div>
            ) : messages.length === 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#cbd5e1' }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                <p style={{ marginTop: '12px' }}>No messages yet. You can say your concerns here.</p>
              </div>
            ) : (
              messages.map((msg, index) => {
                const isStudent = msg.sender_role?.toLowerCase() === 'student';
                const time = formatTime(msg.created_at || msg.CreatedAt);
                const status = msg.is_read || msg.IsRead ? "Seen" : "Sent";

                return (
                  <div key={`msg-${index}`} style={{ display: 'flex', justifyContent: isStudent ? 'flex-end' : 'flex-start' }}>
                    <div style={{ maxWidth: '75%' }}>
                      <div style={{
                        padding: '12px 18px', fontSize: '14px', lineHeight: '1.5',
                        backgroundColor: isStudent ? '#1a5c2e' : 'white',
                        color: isStudent ? 'white' : '#1e293b',
                        border: isStudent ? 'none' : '1px solid #b6dfc2',
                        borderRadius: isStudent ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)', wordBreak: 'break-word'
                      }}>
                        {renderMessage(msg.content)}
                      </div>
                      <div style={{ fontSize: '10px', marginTop: '4px', textAlign: isStudent ? 'right' : 'left', color: '#9ca3af', fontWeight: '500' }}>
                        {time} {isStudent && `• ${status}`}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className='modal-footer' style={{ justifyContent: "center" }}>
            <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '10px', background: '#f1f5f1', padding: '3px', borderRadius: '10px', border: '1px solid var(--color-border)', alignItems: 'center', width: "100%" }}>
              <input type="file" accept="image/*" style={{ display: 'none' }} ref={fileInputRef} onChange={handleImageUpload} />
              <button type="button" onClick={() => fileInputRef.current?.click()} style={{ border: 'none', cursor: 'pointer', paddingLeft: '8px', color: '#1a5c2e' }} title="Send Photo"><IconSendPhoto /></button>
              <input type="text" style={{ flex: 1, border: 'none', background: 'transparent', padding: '5px', fontSize: '14px', outline: 'none' }} placeholder="Type your concern here..." value={inputText} onChange={(e) => setInputText(e.target.value)} />
              <button type="submit" style={{ cursor: 'pointer', paddingRight: '8px' }} disabled={!inputText.trim()}><IconSend /></button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatSupport;