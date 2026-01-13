import React from 'react';

const AdminHeader = ({ isDarkMode, toggleTheme, toggleSidebar }) => {
  return (
    <header className="admin-header glass-panel">
      <style>{`
        .admin-header {
          height: 80px;
          padding: 0 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 90;
          transition: all 0.3s ease;
        }

        .light-mode .admin-header {
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
          background: rgba(255, 255, 255, 0.9);
        }

        .dark-mode .admin-header {
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(17, 24, 39, 0.75);
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .hamburger-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          transition: all 0.3s;
          display: none;
          flex-direction: column;
          gap: 4px;
          width: 40px;
          height: 40px;
          justify-content: center;
          align-items: center;
        }

        .hamburger-btn span {
          width: 24px;
          height: 2px;
          border-radius: 2px;
          transition: all 0.3s;
        }

        .light-mode .hamburger-btn span { background: #1C1917; }
        .dark-mode .hamburger-btn span { background: #F9FAFB; }

        .hamburger-btn:hover {
          background: rgba(180, 83, 9, 0.1);
        }

        .light-mode .hamburger-btn:hover span { background: #B45309; }
        .dark-mode .hamburger-btn:hover span { background: #F59E0B; }

        .header-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem;
          font-weight: 600;
        }
        
        .light-mode .header-title { color: #1C1917; }
        .dark-mode .header-title { color: #F9FAFB; }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .search-bar {
          padding: 10px 20px;
          border-radius: 30px;
          font-family: 'Montserrat', sans-serif;
          width: 250px;
          transition: all 0.3s;
        }

        .light-mode .search-bar {
          background: #FAFAF9;
          border: 1px solid rgba(0, 0, 0, 0.06);
          color: #1C1917;
        }

        .dark-mode .search-bar {
          background: #030712;
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #F9FAFB;
        }

        .search-bar:focus {
          outline: none;
        }
        
        .light-mode .search-bar:focus { border-color: #B45309; }
        .dark-mode .search-bar:focus { border-color: #F59E0B; }

        .action-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.2rem;
          padding: 8px;
          border-radius: 50%;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .light-mode .action-btn { color: #57534E; }
        .dark-mode .action-btn { color: #9CA3AF; }

        .action-btn:hover {
          background: rgba(180, 83, 9, 0.1);
        }
        
        .light-mode .action-btn:hover { color: #B45309; }
        .dark-mode .action-btn:hover { color: #F59E0B; }

        .profile-section {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-left: 20px;
        }
        
        .light-mode .profile-section { border-left: 1px solid rgba(0, 0, 0, 0.06); }
        .dark-mode .profile-section { border-left: 1px solid rgba(255, 255, 255, 0.08); }

        .profile-img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid;
          background-color: #333;
          background-image: url('https://i.pravatar.cc/150?img=68');
          background-size: cover;
        }
        
        .light-mode .profile-img { border-color: #B45309; }
        .dark-mode .profile-img { border-color: #F59E0B; }

        .profile-info {
          display: flex;
          flex-direction: column;
        }

        .profile-name {
          font-size: 0.9rem;
          font-weight: 600;
        }
        
        .light-mode .profile-name { color: #1C1917; }
        .dark-mode .profile-name { color: #F9FAFB; }

        .profile-role {
          font-size: 0.75rem;
        }
        
        .light-mode .profile-role { color: #57534E; }
        .dark-mode .profile-role { color: #9CA3AF; }

        /* Mobile Responsive */
        @media (max-width: 1024px) {
          .hamburger-btn {
            display: flex;
          }

          .admin-header {
            padding: 0 20px;
          }
        }

        @media (max-width: 768px) {
          .header-title {
            font-size: 1.5rem;
          }

          .profile-info {
            display: none;
          }

          .profile-section {
            padding-left: 12px;
          }
        }

        @media (max-width: 640px) {
          .admin-header {
            height: 70px;
            padding: 0 16px;
          }

          .header-actions {
            gap: 12px;
          }

          .profile-section {
            border-left: none;
            padding-left: 0;
          }
        }
      `}</style>

      <div className="header-left">
        <button className="hamburger-btn" onClick={toggleSidebar} title="Toggle Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div className="header-actions">

        <button className="action-btn" onClick={toggleTheme} title="Toggle Theme">
          {isDarkMode ? '☀️' : '🌙'}
        </button>


        <div className="profile-section">
          <div className="profile-info">
            <span className="profile-name">Alexander Bennett</span>
            <span className="profile-role">Manager</span>
          </div>
          <div className="profile-img"></div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
