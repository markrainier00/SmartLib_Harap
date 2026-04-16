import React, { useState, useEffect, useRef } from 'react';

const ChatSupport = ({ studentId }) => {
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const markAsRead = async (convoId) => {
    if (!convoId) return;
    try {
      await fetch('http://localhost:8080/api/chat/read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversation_id: convoId, viewer_role: "student" })
      });
    } catch (e) {}
  };

  useEffect(() => {
    if (!studentId) return;
    const fetchChatHistory = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/chat/student/${studentId}`);
        const data = await res.json();
        if (data.isSuccess) {
          setConversation(data.data);
          setMessages(data.data.messages || []); 
          markAsRead(data.data.id || data.data.ID);
        }
      } catch (error) {}
    };
    fetchChatHistory();
    const interval = setInterval(fetchChatHistory, 3000); 
    return () => clearInterval(interval);
  }, [studentId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendPayload = async (contentStr) => {
    if (!contentStr || !conversation) return;
    const payload = {
      conversation_id: conversation.id || conversation.ID, 
      sender_id: studentId,
      sender_role: "student",
      content: contentStr
    };
    try {
      const res = await fetch('http://localhost:8080/api/chat/send', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.isSuccess) setMessages((prev) => [...prev, data.data]);
    } catch (error) {}
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendPayload(inputText);
    setInputText(""); 
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => sendPayload(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const formatTime = (dateString) => {
    if (!dateString) return "Just now";
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderMessage = (content) => {
    if (content && content.startsWith("data:image")) {
      return <img src={content} alt="Upload" style={{ maxWidth: '250px', borderRadius: '8px', border: '1px solid #ddd', display: 'block' }} />;
    }
    return content;
  };

  return (
    // 🚀 OUTER WRAPPER: Nagfo-force sa chat box na pumunta sa gitna at hindi bumakat sa dulo ng screen
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "calc(100vh - 120px)", padding: "20px", boxSizing: "border-box" }}>
      
      {/* 🚀 MAIN CHAT BOX: Limitado ang size, parehas sa AdminChat.tsx */}
      <div style={{ display: "flex", flexDirection: "column", width: "100%", maxWidth: "900px", height: "100%", maxHeight: "750px", background: "#fff", borderRadius: "16px", overflow: "hidden", border: "1px solid #b6dfc2", boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}>
        
        {/* HEADER */}
        <div style={{ backgroundColor: '#1a5c2e', color: 'white', padding: '18px 24px', fontWeight: 'bold', fontSize: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>SmartLib Support 💬</span>
          {conversation && (
            <span style={{ fontSize: '11px', background: '#e8f5ec', color: '#1a5c2e', padding: '5px 12px', borderRadius: '12px', fontWeight: 'bold', border: '1px solid #b6dfc2' }}>
              {conversation.status.toUpperCase()}
            </span>
          )}
        </div>

        {/* 🚀 CHAT AREA: Dito lang po aandar ang scrollbar kapag dumami na ang message */}
        <div style={{ flex: 1, padding: '24px', overflowY: 'auto', backgroundColor: '#fcfdfc', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {messages.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#cbd5e1' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
              <p style={{ marginTop: '12px' }}>No messages yet. Say hello!</p>
            </div>
          ) : (
            messages.map((msg, index) => {
              const isStudent = msg.sender_role.toLowerCase() === 'student';
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
                      {time} {isStudent && ` • ${status}`}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* INPUT AREA */}
        <div style={{ padding: '20px 24px', backgroundColor: 'white', borderTop: '1px solid #b6dfc2' }}>
          <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '10px', background: '#f1f5f1', padding: '6px', borderRadius: '14px', border: '1px solid #b6dfc2', alignItems: 'center' }}>
            
            <input type="file" accept="image/*" style={{ display: 'none' }} ref={fileInputRef} onChange={handleImageUpload} />
            <button type="button" onClick={() => fileInputRef.current.click()} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px', color: '#1a5c2e' }} title="Send Photo">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
            </button>

            <input type="text" style={{ flex: 1, border: 'none', background: 'transparent', padding: '10px', fontSize: '14px', outline: 'none' }} placeholder="Type your concern here..." value={inputText} onChange={(e) => setInputText(e.target.value)} />
            
            <button type="submit" disabled={!inputText.trim()} style={{ backgroundColor: '#1a5c2e', color: 'white', padding: '10px 24px', borderRadius: '10px', fontWeight: 'bold', border: 'none', cursor: inputText.trim() ? 'pointer' : 'not-allowed', opacity: inputText.trim() ? 1 : 0.6 }}>
              Send
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ChatSupport;