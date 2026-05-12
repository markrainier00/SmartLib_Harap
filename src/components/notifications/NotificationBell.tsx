"use client";

import { api } from "@/lib/api";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/user";
import { useClickOutside } from "@/app/hooks/useClickOutside";
import { IconNotif } from "../icons";

export default function NotificationBell() {
  const { role, school_id } = useUser() as any;
  const router = useRouter();

  const [showNotifs, setShowNotifs] = useState(false);
  const [notifs, setNotifs] = useState<any[]>([]);
  const notifRef = useRef(null);

  useClickOutside(notifRef, () => setShowNotifs(false));

  const unread = notifs.filter((n) => !n.read).length;

  
  let notifChannel = school_id;
  if (role === "Admin") notifChannel = "Admin";
  if (role === "Staff") notifChannel = "Staff";

  
  useEffect(() => {
    if (!notifChannel) return;

    const safeChannelId = encodeURIComponent(notifChannel);

    const fetchHistory = async () => {
      try {
        const data = await api.get(`/api/notifications/history/${safeChannelId}`);
        if (data.isSuccess) setNotifs(data.data || []);
      } catch (err) {
        console.error("Failed to fetch notification history", err);
      }
    };
    fetchHistory();

    const eventSource = new EventSource(`${process.env.NEXT_PUBLIC_API_URL}/api/notifications/stream/${safeChannelId}`);

    eventSource.onmessage = (event) => {
      const newNotif = JSON.parse(event.data);
      setNotifs((prev) => {
        const isDuplicate = prev.some((notif) => notif.id === newNotif.id);
        if (isDuplicate) return prev;
        return [newNotif, ...prev];
      });
    };

    eventSource.onerror = () => {
      console.log("SSE interrupted. Browser is trying to auto-reconnect...");
    };

    return () => {
      eventSource.close();
    };
  }, [notifChannel]);


  const handleClearNotifs = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!notifChannel) return;
    try {
      const safeChannelId = encodeURIComponent(notifChannel);
      const data = await api.delete(`/api/notifications/clear/${safeChannelId}`);
      if (data.isSuccess) setNotifs([]);
    } catch (err) {
      console.error("Failed to clear notifications", err);
    }
  };

  const handleNav = (path: string) => {
    setShowNotifs(false);
    router.push(path);
  };

  return (
    <div style={{ position: "relative" }} ref={notifRef}>
      <button className="action-btn" onClick={() => setShowNotifs(!showNotifs)} aria-label="Notifications">
        <IconNotif />
        {unread > 0 && <span className="notif-badge">{unread}</span>}
      </button>

      {showNotifs && (
        <div className="dropdown notif-panel open">
          <div className="notif-head">
            <h3><strong>Notifications</strong></h3>
            {notifs.length > 0 && (
              <button className="clear-btn" onClick={handleClearNotifs}>
                Clear All
              </button>
            )}
          </div>
          
          <div className="notif-scroll-area">
            {notifs.map(n => (
              <div 
                key={n.id} 
                className={`notif-item ${n.read ? '' : 'unread'}`}
                onClick={async () => {
                  if (role === 'Admin' || role === 'Staff') {
                    const message = n.msg.toLowerCase();
                    if (message.includes("book request") || message.includes("isbn")) {
                      handleNav("/admin/requests"); 
                    } else if (message.includes("register")) {
                      handleNav("/admin/registration"); 
                    }
                  }

                  try {
                    await api.put(`/api/notifications/read/${n.id}`, {});
                  } catch (err) {
                    console.error("Failed to mark as read in DB", err);
                  }

                  setNotifs(prev => prev.map(notif => notif.id === n.id ? { ...notif, read: true } : notif));
                }}
              >
                <div className="flex-1">
                  <p className="ni-msg">{n.msg}</p>
                  <div className="ni-time">{n.time}</div>
                </div>
              </div>
            ))}
            {notifs.length === 0 && (
              <div style={{ padding: "20px", textAlign: "center", fontSize: "13px", color: "#7AAD8E" }}>
                No notifications yet.
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        .action-btn { position: relative; background: #EBF7F0; border: none; border-radius: 10px; width: 40px; height: 40px; cursor: pointer; transition: background .2s; display: flex; align-items: center; justify-content: center; font-size: 18px; color: #1B5E35; }
        .action-btn:hover { background: #D6EDE1; }
        .dropdown { position: absolute; top: 60px; right: 0; background: #fff; border-radius: 10px; box-shadow: 0 16px 48px rgba(27,94,53,.12); border: 1px solid #C3DDD0; z-index: 60; overflow: hidden; animation: fadeUp .2s ease both; min-width: 260px; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:none; } }
        .notif-panel { width: 340px; }
        .notif-head { padding: 16px 20px; border-bottom: 1px solid #C3DDD0; display: flex; justify-content: space-between; align-items: center; background: #EBF7F0; position: sticky; top: 0; z-index: 2;}
        .notif-head h4 { margin: 0; font-size: 14px; font-weight: 700; color: #102A1C; }
        .clear-btn { background: none; border: none; font-size: 12px; color: #c94040; font-weight: 700; cursor: pointer; transition: all 0.2s; padding: 4px 8px; border-radius: 4px; }
        .clear-btn:hover { background: #ffebeb; }
        .notif-scroll-area { max-height: 400px; overflow-y: auto; }
        .notif-item { padding: 14px 20px; border-bottom: 1px solid #EBF7F0; display: flex; gap: 12px; align-items: flex-start; cursor: pointer; transition: background 0.2s; }
        .notif-item:hover { background: #F8FDFB; }
        .notif-item.unread { background: #F0F9F3; }
        .notif-item.unread:hover { background: #E6F4EB; }
        .ni-msg { font-size: 13px; color: #102A1C; font-weight: 500; line-height: 1.4; margin: 0; }
        .ni-time { font-size: 11px; color: #7AAD8E; margin-top: 4px; }
      `}</style>
    </div>
  );
}