import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminSidebar = ({ isDarkMode, isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize menu state - open if current path matches a submenu item
  const [openMenus, setOpenMenus] = useState(() => {
    const path = location.pathname;
    return {
      'Front Office': path.startsWith('/admin/front-office'),
      'House Keeping': path.startsWith('/admin/house-keeping')
    };
  });

  // Keep parent menu open when navigating to its submenu items
  useEffect(() => {
    const path = location.pathname;
    setOpenMenus(prev => ({
      ...prev,
      'Front Office': path.startsWith('/admin/front-office') || prev['Front Office'],
      'House Keeping': path.startsWith('/admin/house-keeping') || prev['House Keeping']
    }));
  }, [location.pathname]);

  // Helper to check if a path is active
  const isActive = (path) => location.pathname === path;

  const toggleMenu = (label) => {
    setOpenMenus(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  const handleLogout = () => {
    navigate('/');
    if (onClose) onClose();
  };

  const handleNavigation = (path) => {
    navigate(path);
    // Only close sidebar on mobile (when onClose is provided and screen is small)
    if (onClose && window.innerWidth <= 1024) {
      onClose();
    }
  };

  // Check if parent menu should be active (when any submenu item is active)
  const isParentActive = (item) => {
    if (!item.submenu) return false;
    return item.submenu.some(subItem => isActive(subItem.path));
  };

  const menuItems = [
    {
      label: 'Dashboard',
      path: '/admin/dashboard',
      icon: '📊'
    },
    {
      label: 'Rooms',
      path: '/admin/rooms',
      icon: '🛏️'
    },
    {
      label: 'Channel Manager',
      path: '/admin/channel-manager',
      icon: '🌐'
    },
    {
      label: 'Front Office',
      icon: '🏨',
      submenu: [
        { label: 'Operations', path: '/admin/front-office/operations', icon: '⚡', subtitle: 'Reservations & Check-ins' },
        { label: 'Availability', path: '/admin/front-office/availability', icon: '📅', subtitle: 'Room Status & Forecast' },
        { label: 'Billing', path: '/admin/front-office/billing', icon: '💳', subtitle: 'Guest Billing & Invoices' },
        { label: 'Views', path: '/admin/front-office/views', icon: '👁️', subtitle: 'Guest Management' },
        { label: 'Reports', path: '/admin/front-office/reports', icon: '📈', subtitle: 'Analytics & Reports' },
        { label: 'Setup', path: '/admin/front-office/setup', icon: '⚙️', subtitle: 'Configuration' },
        { label: 'Settings', path: '/admin/front-office/settings', icon: '🔧', subtitle: 'Preferences' }
      ]
    },
    {
      label: 'House Keeping',
      icon: '🧹',
      submenu: [
        { label: 'Operations', path: '/admin/house-keeping/operations', icon: '📋', subtitle: 'Daily Tasks & Cleaning' },
        { label: 'Setup', path: '/admin/house-keeping/setup', icon: '⚙️', subtitle: 'Staff & Categories' },
        { label: 'Settings', path: '/admin/house-keeping/settings', icon: '🔧', subtitle: 'Configuration' }
      ]
    },
    {
      label: 'Kitchen & Restaurant',
      path: '/admin/kitchen',
      icon: '👨‍🍳'
    },
    {
      label: 'Bar Management',
      path: '/admin/bar',
      icon: '🍸'
    },
    {
      label: 'Stores',
      path: '/admin/stores',
      icon: '📦'
    },
    {
      label: 'Accounts',
      path: '/admin/accounts',
      icon: '💰'
    }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}

      <div className={`admin-sidebar glass-panel ${isOpen ? 'open' : ''}`}>
        <style>{`
          .admin-sidebar {
            width: 280px;
            height: 100vh;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 100;
            padding: 30px;
            display: flex;
            flex-direction: column;
            transition: all 0.3s ease;
            overflow-y: auto;
          }
          
          .light-mode .admin-sidebar {
            border-right: 1px solid rgba(0, 0, 0, 0.06);
            background: #FFFFFF;
          }
          
          .dark-mode .admin-sidebar {
            border-right: 1px solid rgba(255, 255, 255, 0.08);
            background: rgba(17, 24, 39, 0.75);
          }
          
          /* Hide scrollbar */
          .admin-sidebar::-webkit-scrollbar { display: none; }
          .admin-sidebar { -ms-overflow-style: none; scrollbar-width: none; }

          .sidebar-brand {
            margin-bottom: 50px;
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .brand-icon {
            font-size: 1.8rem;
          }
          .light-mode .brand-icon { color: #B45309; }
          .dark-mode .brand-icon { color: #F59E0B; }

          .brand-text {
            font-family: 'Cormorant Garamond', serif;
            font-size: 1.8rem;
            font-weight: 700;
            letter-spacing: 1px;
            text-transform: uppercase;
          }
          .light-mode .brand-text { color: #1C1917; }
          .dark-mode .brand-text { color: #F9FAFB; }

          .brand-plus {
            font-weight: 300;
          }
          .light-mode .brand-plus { color: #B45309; }
          .dark-mode .brand-plus { color: #F59E0B; }

          .close-sidebar-btn {
            display: none;
            position: absolute;
            top: 20px;
            right: 20px;
            background: none;
            border: none;
            font-size: 1.8rem;
            cursor: pointer;
            padding: 8px;
            border-radius: 50%;
            transition: all 0.3s;
            line-height: 1;
            width: 36px;
            height: 36px;
            align-items: center;
            justify-content: center;
          }

          .light-mode .close-sidebar-btn { color: #57534E; }
          .dark-mode .close-sidebar-btn { color: #9CA3AF; }

          .close-sidebar-btn:hover {
            background: rgba(180, 83, 9, 0.1);
          }

          .light-mode .close-sidebar-btn:hover { color: #B45309; }
          .dark-mode .close-sidebar-btn:hover { color: #F59E0B; }

          .nav-menu {
            list-style: none;
            padding: 0;
            display: flex;
            flex-direction: column;
            gap: 12px;
            flex: 1;
          }

          .nav-item {
            padding: 14px 20px;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 15px;
            font-size: 0.95rem;
            font-weight: 500;
            border: 1px solid transparent;
          }
          
          .light-mode .nav-item { color: #57534E; }
          .dark-mode .nav-item { color: #9CA3AF; }

          .nav-item:hover, .nav-item.active {
            transform: translateX(5px);
          }
          
          .light-mode .nav-item:hover, .light-mode .nav-item.active {
            background: rgba(180, 83, 9, 0.08);
            color: #B45309;
            border-color: #B45309;
          }
          
          .dark-mode .nav-item:hover, .dark-mode .nav-item.active {
            background: rgba(245, 158, 11, 0.15);
            color: #F59E0B;
            border-color: #F59E0B;
          }
          
          .logout-btn {
              margin-top: auto;
          }
          
          .light-mode .logout-btn { color: #DC2626; border-color: rgba(220, 38, 38, 0.1); margin-bottom: 15px;}
          .dark-mode .logout-btn { color: #F87171; border-color: rgba(248, 113, 113, 0.1); }
          
          .nav-item.logout-btn:hover {
              transform: translateX(5px);
          }
          
          .light-mode .nav-item.logout-btn:hover {
              background: rgba(220, 38, 38, 0.05);
              color: #B91C1C;
              border-color: rgba(185, 28, 28, 0.2);
          }
          
          .dark-mode .nav-item.logout-btn:hover {
              background: rgba(248, 113, 113, 0.1);
              color: #EF4444;
              border-color: rgba(239, 68, 68, 0.2);
          }

          .nav-icon {
            font-size: 1.2rem;
          }

          .submenu {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease-out;
            margin-left: 20px;
            border-left: 1px solid rgba(0,0,0,0.1);
            padding-left: 10px;
          }
          
          .submenu.open {
            max-height: 1000px;
            transition: max-height 0.5s ease-in;
            margin-bottom: 10px;
          }

          .submenu-item {
              display: flex;
              align-items: center;
              gap: 12px;
              padding: 10px 12px;
              border-radius: 8px;
              cursor: pointer;
              transition: all 0.2s;
              margin-bottom: 4px;
          }
          
          .light-mode .submenu-item:hover { background: rgba(0,0,0,0.03); }
          .dark-mode .submenu-item:hover { background: rgba(255,255,255,0.03); }
          
          .submenu-item.active {
              background: rgba(180, 83, 9, 0.1);
          }
          .light-mode .submenu-item.active .submenu-title { color: #B45309; }
          .dark-mode .submenu-item.active .submenu-title { color: #F59E0B; }

          .nav-icon.small {
              font-size: 1rem;
              width: 24px;
              display: flex;
              justify-content: center;
          }

          .submenu-text {
              display: flex;
              flex-direction: column;
          }

          .submenu-title {
              font-size: 0.85rem;
              font-weight: 600;
          }
          
          .submenu-subtitle {
              font-size: 0.7rem;
              opacity: 0.6;
          }
          
          .light-mode .submenu { border-left-color: rgba(0,0,0,0.06); }
          .dark-mode .submenu { border-left-color: rgba(255,255,255,0.08); }

          /* Mobile Sidebar Overlay */
          .sidebar-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 99;
          }

          /* Mobile Responsive Sidebar */
          @media (max-width: 1024px) {
            .admin-sidebar {
              position: fixed;
              left: -340px;
              transition: left 0.3s ease;
              z-index: 100;
            }

            .admin-sidebar.open {
              left: 0;
            }

            .close-sidebar-btn {
              display: flex;
            }
          }

          @media (max-width: 640px) {
            .admin-sidebar {
              width: 240px;
              padding: 20px;
            }

            .sidebar-brand {
              margin-bottom: 35px;
            }

            .brand-icon {
              font-size: 1.6rem;
            }

            .brand-text {
              font-size: 1.6rem;
            }

            .nav-menu {
              gap: 10px;
            }

            .nav-item {
              padding: 12px 16px;
              font-size: 0.9rem;
            }

            .nav-icon {
              font-size: 1.1rem;
            }

            .submenu-item {
              padding: 8px 10px;
            }

            .submenu-title {
              font-size: 0.8rem;
            }

            .submenu-subtitle {
              font-size: 0.65rem;
            }
          }
        `}</style>

        <button className="close-sidebar-btn" onClick={onClose} title="Close Menu">
          ×
        </button>

        <div className="sidebar-brand">
          <span className="brand-icon">⚜️</span>
          <span className="brand-text">Hotel <span className="brand-plus">++</span></span>
        </div>

        <ul className="nav-menu">
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              <li
                className={`nav-item ${isActive(item.path) || isParentActive(item) ? 'active' : ''}`}
                onClick={() => item.submenu ? toggleMenu(item.label) : handleNavigation(item.path)}
              >
                {typeof item.icon === 'string' ? (
                  <span className="nav-icon">{item.icon}</span>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center' }}>{item.icon}</div>
                )}
                <span style={{ flex: 1 }}>{item.label}</span>

                {/* Chevron for submenus */}
                {item.submenu && (
                  <span style={{
                    transform: openMenus[item.label] ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s',
                    display: 'flex'
                  }}>
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
              </li>

              {item.submenu && (
                <div className={`submenu ${openMenus[item.label] ? 'open' : ''}`}>
                  {item.submenu.map((subItem, subIndex) => (
                    <div
                      key={subIndex}
                      className={`submenu-item ${isActive(subItem.path) ? 'active' : ''}`}
                      onClick={() => handleNavigation(subItem.path)}
                    >
                      <span className="nav-icon small">{subItem.icon}</span>
                      <div className="submenu-text">
                        <div className="submenu-title">{subItem.label}</div>
                        <div className="submenu-subtitle">{subItem.subtitle}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </React.Fragment>
          ))}

          <li className="nav-item logout-btn" onClick={handleLogout}>
            <span className="nav-icon">🚪</span>
            Logout
          </li>
        </ul>
      </div>
    </>
  );
};

export default AdminSidebar;
