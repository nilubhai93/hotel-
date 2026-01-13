import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

const AdminLayout = ({ children }) => {
  // Initialize theme from localStorage or default to false (light mode)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('hotelTheme');
    return savedTheme === 'dark';
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Save theme preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('hotelTheme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`admin-layout ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <style>{`
        .admin-layout {
          min-height: 100vh;
          font-family: 'Montserrat', sans-serif;
          transition: background-color 0.3s ease, color 0.3s ease;
          display: flex;
        }

        /* Light Mode (Default) */
        .admin-layout.light-mode {
          background-color: #FAFAF9; /* Warm Stone */
          color: #1C1917; /* Warm Black */
        }

        .admin-layout.light-mode .glass-panel {
          background: #FFFFFF;
          border: 1px solid rgba(0, 0, 0, 0.06);
          box-shadow: 0 8px 32px 0 rgba(28, 25, 23, 0.06);
        }

        /* Dark Mode */
        .admin-layout.dark-mode {
          background-color: #030712; /* Rich Black */
          color: #F9FAFB; /* Off-white */
        }

        .admin-layout.dark-mode .glass-panel {
          background: rgba(17, 24, 39, 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.5);
        }

        .admin-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          margin-left: 330px;
          width: calc(100% - 280px);
          transition: margin-left 0.3s ease;
        }

        .admin-content {
          padding: 30px;
          flex: 1;
        }

        /* Mobile Responsive */
        @media (max-width: 1024px) {
          .admin-main {
            margin-left: 0;
            width: 100%;
          }

          .admin-content {
            padding: 20px;
          }
        }

        @media (max-width: 640px) {
          .admin-content {
            padding: 16px;
          }
        }
      `}</style>

      <AdminSidebar isDarkMode={isDarkMode} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="admin-main">
        <AdminHeader isDarkMode={isDarkMode} toggleTheme={toggleTheme} toggleSidebar={toggleSidebar} />
        <main className="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;