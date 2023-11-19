import React, { useState } from "react";

const NotificationIcon = ({ count }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const handleClick = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="item" onClick={handleClick}>
      <div className="counter">{count}</div>
      {/* Tampilkan halaman notifikasi jika state showNotifications true */}
      {showNotifications && (
        <div className="notification-page">
          {/* Isi halaman notifikasi di sini */}
          <p>Ini adalah halaman notifikasi.</p>
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;
