import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

const AdminFrontOfficeViews = () => {
  const [activeView, setActiveView] = useState('guests');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Sample guest data
  const guests = [
    { id: 'G001', name: 'John Smith', email: 'john.smith@email.com', phone: '+91 98765 43210', type: 'vip', stays: 12, totalSpent: 540000, lastVisit: '2026-01-10', status: 'checked-in', room: '101' },
    { id: 'G002', name: 'Emma Wilson', email: 'emma.w@email.com', phone: '+91 98765 43211', type: 'regular', stays: 5, totalSpent: 225000, lastVisit: '2025-12-15', status: 'checked-out', room: null },
    { id: 'G003', name: 'Michael Brown', email: 'michael.b@email.com', phone: '+91 98765 43212', type: 'corporate', stays: 8, totalSpent: 360000, lastVisit: '2026-01-05', status: 'checked-in', room: '305' },
    { id: 'G004', name: 'Sarah Davis', email: 'sarah.d@email.com', phone: '+91 98765 43213', type: 'vip', stays: 15, totalSpent: 675000, lastVisit: '2025-11-20', status: 'reserved', room: null },
    { id: 'G005', name: 'James Miller', email: 'james.m@email.com', phone: '+91 98765 43214', type: 'regular', stays: 3, totalSpent: 135000, lastVisit: '2025-10-05', status: 'checked-out', room: null },
  ];

  const filteredGuests = guests.filter(guest => {
    const matchesType = filterType === 'all' || guest.type === filterType;
    const matchesSearch = guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getTypeColor = (type) => {
    switch (type) {
      case 'vip': return 'type-vip';
      case 'corporate': return 'type-corporate';
      case 'regular': return 'type-regular';
      default: return '';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'checked-in': return 'status-checked-in';
      case 'checked-out': return 'status-checked-out';
      case 'reserved': return 'status-reserved';
      default: return '';
    }
  };

  const stats = {
    total: guests.length,
    checkedIn: guests.filter(g => g.status === 'checked-in').length,
    vip: guests.filter(g => g.type === 'vip').length,
    corporate: guests.filter(g => g.type === 'corporate').length,
  };

  return (
    <AdminLayout>
      <style>{`
        .views-header {
          margin-bottom: 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        .page-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 600;
          margin: 0;
        }
        .light-mode .page-title { color: #1C1917; }
        .dark-mode .page-title { color: #F9FAFB; }

        .header-actions {
          display: flex;
          gap: 12px;
        }

        .action-btn {
          padding: 12px 24px;
          background: linear-gradient(45deg, #B45309, #D97706);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(180, 83, 9, 0.3);
        }

        .dark-mode .action-btn {
          background: linear-gradient(45deg, #F59E0B, #FBBF24);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }

        .stat-card {
          padding: 20px;
          border-radius: 12px;
          border: 1px solid rgba(0,0,0,0.06);
          text-align: center;
        }

        .light-mode .stat-card {
          background: #FFFFFF;
          box-shadow: 0 2px 4px rgba(28, 25, 23, 0.05);
        }

        .dark-mode .stat-card {
          background: rgba(17, 24, 39, 0.75);
          border-color: rgba(255,255,255,0.08);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .stat-icon {
          font-size: 2rem;
          margin-bottom: 8px;
        }

        .stat-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .light-mode .stat-value { color: #1C1917; }
        .dark-mode .stat-value { color: #F9FAFB; }

        .stat-label {
          font-size: 0.85rem;
          opacity: 0.7;
        }

        .filters-section {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }

        .search-box {
          flex: 1;
          min-width: 250px;
          padding: 12px 20px;
          border-radius: 12px;
          border: 1px solid rgba(0,0,0,0.1);
          font-family: 'Montserrat', sans-serif;
          transition: all 0.3s;
        }

        .light-mode .search-box {
          background: #FFFFFF;
          color: #1C1917;
        }

        .dark-mode .search-box {
          background: rgba(17, 24, 39, 0.5);
          border-color: rgba(255,255,255,0.1);
          color: #F9FAFB;
        }

        .search-box:focus {
          outline: none;
          border-color: #B45309;
        }

        .filter-buttons {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 10px 20px;
          border: 1px solid rgba(0,0,0,0.1);
          background: transparent;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
          font-weight: 500;
          font-size: 0.85rem;
        }

        .light-mode .filter-btn {
          color: #57534E;
        }

        .dark-mode .filter-btn {
          color: #9CA3AF;
          border-color: rgba(255,255,255,0.1);
        }

        .filter-btn.active {
          background: rgba(180, 83, 9, 0.1);
          border-color: #B45309;
          color: #B45309;
        }

        .dark-mode .filter-btn.active {
          background: rgba(245, 158, 11, 0.15);
          border-color: #F59E0B;
          color: #F59E0B;
        }

        .guests-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 20px;
        }

        .guest-card {
          padding: 24px;
          border-radius: 16px;
          border: 1px solid rgba(0,0,0,0.06);
          cursor: pointer;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }

        .light-mode .guest-card {
          background: #FFFFFF;
          box-shadow: 0 4px 6px -1px rgba(28, 25, 23, 0.05);
        }

        .dark-mode .guest-card {
          background: rgba(17, 24, 39, 0.75);
          border-color: rgba(255,255,255,0.08);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5);
        }

        .guest-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px -4px rgba(28, 25, 23, 0.15);
        }

        .dark-mode .guest-card:hover {
          box-shadow: 0 12px 24px -4px rgba(0, 0, 0, 0.7);
        }

        .guest-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
        }

        .guest-card.type-vip::before {
          background: linear-gradient(90deg, #F59E0B, transparent);
        }

        .guest-card.type-corporate::before {
          background: linear-gradient(90deg, #3B82F6, transparent);
        }

        .guest-card.type-regular::before {
          background: linear-gradient(90deg, #10B981, transparent);
        }

        .guest-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 16px;
        }

        .guest-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .type-vip .guest-avatar {
          background: linear-gradient(135deg, #FEF3C7, #FDE68A);
          color: #D97706;
        }

        .type-corporate .guest-avatar {
          background: linear-gradient(135deg, #DBEAFE, #BFDBFE);
          color: #2563EB;
        }

        .type-regular .guest-avatar {
          background: linear-gradient(135deg, #D1FAE5, #A7F3D0);
          color: #059669;
        }

        .guest-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .light-mode .guest-name { color: #1C1917; }
        .dark-mode .guest-name { color: #F9FAFB; }

        .guest-id {
          font-size: 0.8rem;
          opacity: 0.6;
          margin-bottom: 12px;
        }

        .type-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .type-vip {
          background: rgba(245, 158, 11, 0.1);
          color: #D97706;
          border: 1px solid rgba(245, 158, 11, 0.2);
        }

        .type-corporate {
          background: rgba(59, 130, 246, 0.1);
          color: #2563EB;
          border: 1px solid rgba(59, 130, 246, 0.2);
        }

        .type-regular {
          background: rgba(16, 185, 129, 0.1);
          color: #059669;
          border: 1px solid rgba(16, 185, 129, 0.2);
        }

        .guest-contact {
          margin-bottom: 16px;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          margin-bottom: 6px;
          opacity: 0.8;
        }

        .guest-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-bottom: 16px;
          padding-top: 16px;
          border-top: 1px solid rgba(0,0,0,0.06);
        }

        .dark-mode .guest-stats {
          border-top-color: rgba(255,255,255,0.08);
        }

        .guest-stat {
          text-align: center;
        }

        .guest-stat-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem;
          font-weight: 600;
        }

        .light-mode .guest-stat-value { color: #B45309; }
        .dark-mode .guest-stat-value { color: #F59E0B; }

        .guest-stat-label {
          font-size: 0.75rem;
          opacity: 0.7;
        }

        .status-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: inline-block;
        }

        .status-checked-in {
          background: rgba(16, 185, 129, 0.1);
          color: #059669;
          border: 1px solid rgba(16, 185, 129, 0.2);
        }

        .status-checked-out {
          background: rgba(107, 114, 128, 0.1);
          color: #6B7280;
          border: 1px solid rgba(107, 114, 128, 0.2);
        }

        .status-reserved {
          background: rgba(168, 85, 247, 0.1);
          color: #9333EA;
          border: 1px solid rgba(168, 85, 247, 0.2);
        }

        .guest-actions {
          display: flex;
          gap: 8px;
          margin-top: 16px;
        }

        .icon-btn {
          flex: 1;
          padding: 8px 12px;
          background: transparent;
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .light-mode .icon-btn {
          color: #57534E;
        }

        .dark-mode .icon-btn {
          color: #9CA3AF;
          border-color: rgba(255,255,255,0.1);
        }

        .icon-btn:hover {
          background: rgba(180, 83, 9, 0.1);
          border-color: #B45309;
          color: #B45309;
        }

        .dark-mode .icon-btn:hover {
          background: rgba(245, 158, 11, 0.15);
          border-color: #F59E0B;
          color: #F59E0B;
        }

        /* Mobile Responsiveness */
        @media (max-width: 768px) {
          .views-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .page-title {
            font-size: 1.75rem;
          }

          .header-actions {
            width: 100%;
          }

          .action-btn {
            flex: 1;
            justify-content: center;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }

          .stat-card {
            padding: 16px;
          }

          .stat-icon {
            font-size: 1.5rem;
          }

          .stat-value {
            font-size: 1.6rem;
          }

          .filters-section {
            flex-direction: column;
          }

          .search-box {
            width: 100%;
            min-width: auto;
          }

          .filter-buttons {
            width: 100%;
            justify-content: space-between;
          }

          .filter-btn {
            flex: 1;
            min-width: 70px;
            padding: 10px 12px;
            font-size: 0.8rem;
          }

          .guests-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .guest-card {
            padding: 20px;
          }

          .guest-avatar {
            width: 50px;
            height: 50px;
            font-size: 1.5rem;
          }

          .guest-name {
            font-size: 1.2rem;
          }

          .guest-stats {
            gap: 10px;
          }

          .guest-stat-value {
            font-size: 1.2rem;
          }
        }

        @media (max-width: 480px) {
          .page-title {
            font-size: 1.5rem;
          }

          .action-btn {
            padding: 10px 16px;
            font-size: 0.85rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .stat-value {
            font-size: 1.4rem;
          }

          .guest-card {
            padding: 16px;
          }

          .guest-name {
            font-size: 1.1rem;
          }

          .contact-item {
            font-size: 0.8rem;
          }

          .guest-actions {
            flex-direction: column;
          }

          .icon-btn {
            width: 100%;
          }
        }

        /* Touch device optimizations */
        @media (hover: none) and (pointer: coarse) {
          .action-btn {
            padding: 14px 24px;
            min-height: 48px;
          }

          .filter-btn {
            padding: 12px 20px;
            min-height: 44px;
          }

          .icon-btn {
            padding: 12px;
            min-height: 44px;
          }
        }
      `}</style>

      <div className="views-header">
        <h1 className="page-title">Guest Management</h1>
        <div className="header-actions">
          <button className="action-btn">
            <span>➕</span>
            Add Guest
          </button>
          <button className="action-btn">
            <span>📤</span>
            Export
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Guests</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏨</div>
          <div className="stat-value">{stats.checkedIn}</div>
          <div className="stat-label">Currently Staying</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-value">{stats.vip}</div>
          <div className="stat-label">VIP Guests</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💼</div>
          <div className="stat-value">{stats.corporate}</div>
          <div className="stat-label">Corporate</div>
        </div>
      </div>

      <div className="filters-section">
        <input
          type="text"
          className="search-box"
          placeholder="🔍 Search by name, email, or guest ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filterType === 'all' ? 'active' : ''}`}
            onClick={() => setFilterType('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${filterType === 'vip' ? 'active' : ''}`}
            onClick={() => setFilterType('vip')}
          >
            VIP
          </button>
          <button
            className={`filter-btn ${filterType === 'corporate' ? 'active' : ''}`}
            onClick={() => setFilterType('corporate')}
          >
            Corporate
          </button>
          <button
            className={`filter-btn ${filterType === 'regular' ? 'active' : ''}`}
            onClick={() => setFilterType('regular')}
          >
            Regular
          </button>
        </div>
      </div>

      <div className="guests-grid">
        {filteredGuests.map(guest => (
          <div key={guest.id} className={`guest-card ${getTypeColor(guest.type)}`}>
            <div className="guest-avatar">
              {guest.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="guest-header">
              <div>
                <div className="guest-name">{guest.name}</div>
                <div className="guest-id">{guest.id}</div>
              </div>
              <span className={`type-badge ${getTypeColor(guest.type)}`}>
                {guest.type}
              </span>
            </div>

            <div className="guest-contact">
              <div className="contact-item">
                <span>📧</span>
                <span>{guest.email}</span>
              </div>
              <div className="contact-item">
                <span>📱</span>
                <span>{guest.phone}</span>
              </div>
            </div>

            <div className="guest-stats">
              <div className="guest-stat">
                <div className="guest-stat-value">{guest.stays}</div>
                <div className="guest-stat-label">Stays</div>
              </div>
              <div className="guest-stat">
                <div className="guest-stat-value">₹{(guest.totalSpent / 1000).toFixed(0)}K</div>
                <div className="guest-stat-label">Total Spent</div>
              </div>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <span className={`status-badge ${getStatusColor(guest.status)}`}>
                {guest.status}
                {guest.room && ` - Room ${guest.room}`}
              </span>
            </div>

            <div className="guest-actions">
              <button className="icon-btn">
                <span>👁️</span>
                View
              </button>
              <button className="icon-btn">
                <span>✏️</span>
                Edit
              </button>
              <button className="icon-btn">
                <span>📜</span>
                History
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminFrontOfficeViews;
