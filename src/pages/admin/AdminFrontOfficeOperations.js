import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

const AdminFrontOfficeOperations = () => {
  const [activeTab, setActiveTab] = useState('reservations');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Sample reservation data
  const reservations = [
    { id: 'RES001', guestName: 'John Smith', room: '101', checkIn: '2026-01-15', checkOut: '2026-01-18', status: 'confirmed', guests: 2, amount: 45000 },
    { id: 'RES002', guestName: 'Emma Wilson', room: '203', checkIn: '2026-01-16', checkOut: '2026-01-20', status: 'pending', guests: 3, amount: 72000 },
    { id: 'RES003', guestName: 'Michael Brown', room: '305', checkIn: '2026-01-14', checkOut: '2026-01-17', status: 'checked-in', guests: 2, amount: 54000 },
    { id: 'RES004', guestName: 'Sarah Davis', room: '102', checkIn: '2026-01-17', checkOut: '2026-01-21', status: 'confirmed', guests: 4, amount: 96000 },
    { id: 'RES005', guestName: 'James Miller', room: '201', checkIn: '2026-01-15', checkOut: '2026-01-19', status: 'cancelled', guests: 2, amount: 60000 },
  ];

  // Sample check-in data
  const checkIns = [
    { id: 'CHK001', guestName: 'Robert Taylor', room: '104', time: '14:30', status: 'pending', guests: 2 },
    { id: 'CHK002', guestName: 'Lisa Anderson', room: '206', time: '15:00', status: 'completed', guests: 3 },
    { id: 'CHK003', guestName: 'David Thomas', room: '301', time: '16:15', status: 'pending', guests: 2 },
  ];

  const filteredReservations = reservations.filter(res => {
    const matchesStatus = filterStatus === 'all' || res.status === filterStatus;
    const matchesSearch = res.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.room.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'status-confirmed';
      case 'pending': return 'status-pending';
      case 'checked-in': return 'status-checked-in';
      case 'cancelled': return 'status-cancelled';
      case 'completed': return 'status-completed';
      default: return '';
    }
  };

  return (
    <AdminLayout>
      <style>{`
        .operations-header {
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

        .tabs-container {
          display: flex;
          gap: 8px;
          margin-bottom: 24px;
          border-bottom: 2px solid rgba(0,0,0,0.06);
          overflow-x: auto;
        }

        .dark-mode .tabs-container {
          border-bottom-color: rgba(255,255,255,0.08);
        }

        .tab {
          padding: 12px 24px;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
          font-weight: 500;
          font-size: 0.9rem;
          border-bottom: 3px solid transparent;
          white-space: nowrap;
        }

        .light-mode .tab {
          color: #57534E;
        }

        .dark-mode .tab {
          color: #9CA3AF;
        }

        .tab.active {
          border-bottom-color: #B45309;
          color: #B45309;
        }

        .dark-mode .tab.active {
          border-bottom-color: #F59E0B;
          color: #F59E0B;
        }

        .tab:hover {
          background: rgba(180, 83, 9, 0.05);
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

        .data-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          border-radius: 16px;
          overflow: hidden;
        }

        .light-mode .data-table {
          background: #FFFFFF;
          box-shadow: 0 4px 6px -1px rgba(28, 25, 23, 0.05);
        }

        .dark-mode .data-table {
          background: rgba(17, 24, 39, 0.75);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5);
        }

        .data-table th {
          padding: 16px;
          text-align: left;
          font-weight: 600;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .light-mode .data-table th {
          background: #FAFAF9;
          color: #57534E;
          border-bottom: 2px solid rgba(0,0,0,0.06);
        }

        .dark-mode .data-table th {
          background: rgba(17, 24, 39, 0.9);
          color: #9CA3AF;
          border-bottom: 2px solid rgba(255,255,255,0.08);
        }

        .data-table td {
          padding: 16px;
          font-size: 0.9rem;
        }

        .light-mode .data-table td {
          color: #1C1917;
          border-bottom: 1px solid rgba(0,0,0,0.04);
        }

        .dark-mode .data-table td {
          color: #F9FAFB;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }

        .data-table tbody tr {
          transition: all 0.2s;
        }

        .light-mode .data-table tbody tr:hover {
          background: rgba(180, 83, 9, 0.03);
        }

        .dark-mode .data-table tbody tr:hover {
          background: rgba(245, 158, 11, 0.05);
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

        .status-confirmed {
          background: rgba(59, 130, 246, 0.1);
          color: #2563EB;
          border: 1px solid rgba(59, 130, 246, 0.2);
        }

        .status-pending {
          background: rgba(245, 158, 11, 0.1);
          color: #D97706;
          border: 1px solid rgba(245, 158, 11, 0.2);
        }

        .status-checked-in {
          background: rgba(16, 185, 129, 0.1);
          color: #059669;
          border: 1px solid rgba(16, 185, 129, 0.2);
        }

        .status-cancelled {
          background: rgba(239, 68, 68, 0.1);
          color: #DC2626;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }

        .status-completed {
          background: rgba(16, 185, 129, 0.1);
          color: #059669;
          border: 1px solid rgba(16, 185, 129, 0.2);
        }

        .table-actions {
          display: flex;
          gap: 8px;
        }

        .icon-btn {
          padding: 6px 10px;
          background: transparent;
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.9rem;
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

        .stat-label {
          font-size: 0.85rem;
          opacity: 0.7;
          margin-bottom: 8px;
        }

        .stat-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 600;
        }

        .light-mode .stat-value { color: #B45309; }
        .dark-mode .stat-value { color: #F59E0B; }

        .checkin-card {
          padding: 16px;
          border-radius: 12px;
          border: 1px solid rgba(0,0,0,0.06);
          margin-bottom: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .light-mode .checkin-card {
          background: #FFFFFF;
        }

        .dark-mode .checkin-card {
          background: rgba(17, 24, 39, 0.75);
          border-color: rgba(255,255,255,0.08);
        }

        .checkin-info {
          flex: 1;
        }

        .guest-name {
          font-weight: 600;
          font-size: 1rem;
          margin-bottom: 4px;
        }

        .checkin-details {
          font-size: 0.85rem;
          opacity: 0.7;
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          opacity: 0.6;
        }

        .empty-icon {
          font-size: 4rem;
          margin-bottom: 16px;
        }

        /* Mobile Responsiveness */
        @media (max-width: 768px) {
          .operations-header {
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

          .tabs-container {
            -webkit-overflow-scrolling: touch;
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

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }

          .stat-card {
            padding: 16px;
          }

          .stat-value {
            font-size: 1.6rem;
          }

          /* Table becomes scrollable on mobile */
          .table-wrapper {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            margin: 0 -16px;
            padding: 0 16px;
          }

          .data-table {
            min-width: 800px;
          }

          .data-table th,
          .data-table td {
            padding: 12px 10px;
            font-size: 0.85rem;
          }

          .checkin-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .table-actions {
            width: 100%;
            justify-content: flex-end;
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

          .tab {
            padding: 10px 16px;
            font-size: 0.85rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .stat-value {
            font-size: 1.4rem;
          }

          .data-table {
            min-width: 700px;
          }

          .data-table th,
          .data-table td {
            padding: 10px 8px;
            font-size: 0.8rem;
          }

          .status-badge {
            padding: 4px 8px;
            font-size: 0.7rem;
          }
        }

        /* Touch device optimizations */
        @media (hover: none) and (pointer: coarse) {
          .action-btn {
            padding: 14px 24px;
            min-height: 48px;
          }

          .tab {
            padding: 14px 24px;
            min-height: 44px;
          }

          .filter-btn {
            padding: 12px 20px;
            min-height: 44px;
          }

          .icon-btn {
            padding: 10px 12px;
            min-height: 40px;
            min-width: 40px;
          }
        }
      `}</style>

      <div className="operations-header">
        <h1 className="page-title">Front Office Operations</h1>
        <div className="header-actions">
          <button className="action-btn">
            <span>➕</span>
            New Reservation
          </button>
          <button className="action-btn">
            <span>📥</span>
            Check-In
          </button>
        </div>
      </div>

      <div className="tabs-container">
        <button
          className={`tab ${activeTab === 'reservations' ? 'active' : ''}`}
          onClick={() => setActiveTab('reservations')}
        >
          Reservations
        </button>
        <button
          className={`tab ${activeTab === 'checkins' ? 'active' : ''}`}
          onClick={() => setActiveTab('checkins')}
        >
          Check-Ins Today
        </button>
        <button
          className={`tab ${activeTab === 'checkouts' ? 'active' : ''}`}
          onClick={() => setActiveTab('checkouts')}
        >
          Check-Outs Today
        </button>
      </div>

      {activeTab === 'reservations' && (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">Total Reservations</div>
              <div className="stat-value">{reservations.length}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Confirmed</div>
              <div className="stat-value">{reservations.filter(r => r.status === 'confirmed').length}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Checked-In</div>
              <div className="stat-value">{reservations.filter(r => r.status === 'checked-in').length}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Pending</div>
              <div className="stat-value">{reservations.filter(r => r.status === 'pending').length}</div>
            </div>
          </div>

          <div className="filters-section">
            <input
              type="text"
              className="search-box"
              placeholder="🔍 Search by guest name, reservation ID, or room..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="filter-buttons">
              <button
                className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
                onClick={() => setFilterStatus('all')}
              >
                All
              </button>
              <button
                className={`filter-btn ${filterStatus === 'confirmed' ? 'active' : ''}`}
                onClick={() => setFilterStatus('confirmed')}
              >
                Confirmed
              </button>
              <button
                className={`filter-btn ${filterStatus === 'pending' ? 'active' : ''}`}
                onClick={() => setFilterStatus('pending')}
              >
                Pending
              </button>
              <button
                className={`filter-btn ${filterStatus === 'checked-in' ? 'active' : ''}`}
                onClick={() => setFilterStatus('checked-in')}
              >
                Checked-In
              </button>
            </div>
          </div>

          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Reservation ID</th>
                  <th>Guest Name</th>
                  <th>Room</th>
                  <th>Check-In</th>
                  <th>Check-Out</th>
                  <th>Guests</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReservations.map(res => (
                  <tr key={res.id}>
                    <td><strong>{res.id}</strong></td>
                    <td>{res.guestName}</td>
                    <td>#{res.room}</td>
                    <td>{res.checkIn}</td>
                    <td>{res.checkOut}</td>
                    <td>{res.guests}</td>
                    <td>₹{res.amount.toLocaleString('en-IN')}</td>
                    <td>
                      <span className={`status-badge ${getStatusColor(res.status)}`}>
                        {res.status}
                      </span>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button className="icon-btn" title="View">👁️</button>
                        <button className="icon-btn" title="Edit">✏️</button>
                        <button className="icon-btn" title="Cancel">❌</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {activeTab === 'checkins' && (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">Total Check-Ins</div>
              <div className="stat-value">{checkIns.length}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Completed</div>
              <div className="stat-value">{checkIns.filter(c => c.status === 'completed').length}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Pending</div>
              <div className="stat-value">{checkIns.filter(c => c.status === 'pending').length}</div>
            </div>
          </div>

          {checkIns.map(checkin => (
            <div key={checkin.id} className="checkin-card">
              <div className="checkin-info">
                <div className="guest-name">{checkin.guestName}</div>
                <div className="checkin-details">
                  Room #{checkin.room} • {checkin.guests} Guests • {checkin.time}
                </div>
              </div>
              <div className="table-actions">
                <span className={`status-badge ${getStatusColor(checkin.status)}`}>
                  {checkin.status}
                </span>
                <button className="icon-btn">Process</button>
              </div>
            </div>
          ))}
        </>
      )}

      {activeTab === 'checkouts' && (
        <div className="empty-state">
          <div className="empty-icon">📤</div>
          <div>No check-outs scheduled for today</div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminFrontOfficeOperations;
