import React, { useState, useEffect } from 'react';

export default function NotificationBell() {
  const [unreadCount, setUnreadCount] = useState(2); 

  useEffect(() => {
    // Pansamantalang timer para makita mo na nag-uupdate yung red badge
    const testInterval = setInterval(() => {
      setUnreadCount((prevCount) => prevCount + 1);
    }, 5000);

    return () => clearInterval(testInterval);
  }, []);

  return (
    <div className="relative inline-flex items-center p-2 cursor-pointer">
      {/* Bell Icon */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-6 h-6 text-gray-600 hover:text-green-800 transition-colors" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>

      {/* Red Badge Indicator */}
      {unreadCount > 0 && (
        <span className="absolute top-1 right-1 inline-flex items-center justify-center px-[6px] py-[2px] text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full border-2 border-white">
          {unreadCount > 99 ? '99+' : unreadCount} 
        </span>
      )}
    </div>
  );
}