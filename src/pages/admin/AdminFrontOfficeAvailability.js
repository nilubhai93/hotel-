import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

const AdminFrontOfficeAvailability = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'calendar'

  // Sample room availability data
  const rooms = [
    { id: 101, type: 'Deluxe Suite', status: 'available', nextBooking: '2026-01-20', occupancy: 0 },
    { id: 102, type: 'Ocean View', status: 'occupied', checkOut: '2026-01-18', occupancy: 2 },
    { id: 103, type: 'Standard Room', status: 'available', nextBooking: '2026-01-22', occupancy: 0 },
    { id: 104, type: 'Executive Room', status: 'cleaning', nextBooking: '2026-01-16', occupancy: 0 },
    { id: 201, type: 'Family Suite', status: 'occupied', checkOut: '2026-01-19', occupancy: 4 },
    { id: 202, type: 'Presidential Suite', status: 'available', nextBooking: null, occupancy: 0 },
    { id: 203, type: 'Deluxe Room', status: 'maintenance', estimatedReady: '2026-01-17', occupancy: 0 },
    { id: 301, type: 'Garden View', status: 'occupied', checkOut: '2026-01-16', occupancy: 2 },
    { id: 302, type: 'City View', status: 'available', nextBooking: '2026-01-18', occupancy: 0 },
    { id: 303, type: 'Standard Room', status: 'reserved', checkIn: '2026-01-17', occupancy: 0 },
  ];

  // Forecast data for next 7 days
  const forecast = [
    { date: '2026-01-15', available: 6, occupied: 3, reserved: 1 },
    { date: '2026-01-16', available: 5, occupied: 4, reserved: 1 },
    { date: '2026-01-17', available: 4, occupied: 5, reserved: 1 },
    { date: '2026-01-18', available: 7, occupied: 2, reserved: 1 },
    { date: '2026-01-19', available: 6, occupied: 3, reserved: 1 },
    { date: '2026-01-20', available: 5, occupied: 4, reserved: 1 },
    { date: '2026-01-21', available: 8, occupied: 1, reserved: 1 },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'status-available';
      case 'occupied': return 'status-occupied';
      case 'cleaning': return 'status-cleaning';
      case 'maintenance': return 'status-maintenance';
      case 'reserved': return 'status-reserved';
      default: return '';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available': return '✅';
      case 'occupied': return '🔴';
      case 'cleaning': return '🧹';
      case 'maintenance': return '🔧';
      case 'reserved': return '📅';
      default: return '❓';
    }
  };

  const stats = {
    total: rooms.length,
    available: rooms.filter(r => r.status === 'available').length,
    occupied: rooms.filter(r => r.status === 'occupied').length,
    cleaning: rooms.filter(r => r.status === 'cleaning').length,
    maintenance: rooms.filter(r => r.status === 'maintenance').length,
    reserved: rooms.filter(r => r.status === 'reserved').length,
  };

  const occupancyRate = ((stats.occupied / stats.total) * 100).toFixed(1);

  return (
    <AdminLayout>
      <style>{`
        .availability-header {
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

        .view-toggle {
          display: flex;
          gap: 8px;
          background: rgba(0,0,0,0.05);
          padding: 4px;
          border-radius: 8px;
        }

        .dark-mode .view-toggle {
          background: rgba(255,255,255,0.05);
        }

        .toggle-btn {
          padding: 8px 16px;
          background: transparent;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s;
          font-weight: 500;
          font-size: 0.85rem;
        }

        .light-mode .toggle-btn {
          color: #57534E;
        }

        .dark-mode .toggle-btn {
          color: #9CA3AF;
        }

        .toggle-btn.active {
          background: #FFFFFF;
          color: #B45309;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .dark-mode .toggle-btn.active {
          background: rgba(17, 24, 39, 0.9);
          color: #F59E0B;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
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

        .occupancy-card {
          padding: 24px;
          border-radius: 16px;
          margin-bottom: 24px;
          text-align: center;
        }

        .light-mode .occupancy-card {
          background: linear-gradient(135deg, #FFFFFF 0%, #FEF3C7 100%);
          border: 1px solid rgba(180, 83, 9, 0.2);
        }

        .dark-mode .occupancy-card {
          background: linear-gradient(135deg, rgba(17, 24, 39, 0.75) 0%, rgba(146, 64, 14, 0.3) 100%);
          border: 1px solid rgba(245, 158, 11, 0.2);
        }

        .occupancy-rate {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .light-mode .occupancy-rate { color: #B45309; }
        .dark-mode .occupancy-rate { color: #F59E0B; }

        .occupancy-label {
          font-size: 1rem;
          font-weight: 600;
          opacity: 0.8;
        }

        .rooms-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }

        .room-status-card {
          padding: 16px;
          border-radius: 12px;
          border: 2px solid;
          cursor: pointer;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }

        .room-status-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
        }

        .room-status-card.status-available {
          border-color: rgba(16, 185, 129, 0.3);
          background: rgba(16, 185, 129, 0.05);
        }

        .room-status-card.status-available::before {
          background: #10B981;
        }

        .room-status-card.status-occupied {
          border-color: rgba(239, 68, 68, 0.3);
          background: rgba(239, 68, 68, 0.05);
        }

        .room-status-card.status-occupied::before {
          background: #EF4444;
        }

        .room-status-card.status-cleaning {
          border-color: rgba(59, 130, 246, 0.3);
          background: rgba(59, 130, 246, 0.05);
        }

        .room-status-card.status-cleaning::before {
          background: #3B82F6;
        }

        .room-status-card.status-maintenance {
          border-color: rgba(245, 158, 11, 0.3);
          background: rgba(245, 158, 11, 0.05);
        }

        .room-status-card.status-maintenance::before {
          background: #F59E0B;
        }

        .room-status-card.status-reserved {
          border-color: rgba(168, 85, 247, 0.3);
          background: rgba(168, 85, 247, 0.05);
        }

        .room-status-card.status-reserved::before {
          background: #A855F7;
        }

        .room-status-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.1);
        }

        .room-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .light-mode .room-number { color: #1C1917; }
        .dark-mode .room-number { color: #F9FAFB; }

        .room-type {
          font-size: 0.85rem;
          opacity: 0.7;
          margin-bottom: 12px;
        }

        .room-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .status-available .room-status-badge {
          background: rgba(16, 185, 129, 0.2);
          color: #059669;
        }

        .status-occupied .room-status-badge {
          background: rgba(239, 68, 68, 0.2);
          color: #DC2626;
        }

        .status-cleaning .room-status-badge {
          background: rgba(59, 130, 246, 0.2);
          color: #2563EB;
        }

        .status-maintenance .room-status-badge {
          background: rgba(245, 158, 11, 0.2);
          color: #D97706;
        }

        .status-reserved .room-status-badge {
          background: rgba(168, 85, 247, 0.2);
          color: #9333EA;
        }

        .room-details {
          font-size: 0.8rem;
          opacity: 0.7;
          margin-top: 8px;
        }

        .forecast-section {
          margin-top: 32px;
        }

        .section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .light-mode .section-title { color: #1C1917; }
        .dark-mode .section-title { color: #F9FAFB; }

        .forecast-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 12px;
        }

        .forecast-card {
          padding: 16px;
          border-radius: 12px;
          border: 1px solid rgba(0,0,0,0.06);
          text-align: center;
        }

        .light-mode .forecast-card {
          background: #FFFFFF;
        }

        .dark-mode .forecast-card {
          background: rgba(17, 24, 39, 0.75);
          border-color: rgba(255,255,255,0.08);
        }

        .forecast-date {
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .forecast-stats {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .forecast-stat {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
        }

        .legend {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 16px;
          padding: 16px;
          border-radius: 12px;
        }

        .light-mode .legend {
          background: rgba(0,0,0,0.02);
        }

        .dark-mode .legend {
          background: rgba(255,255,255,0.02);
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
        }

        .legend-color {
          width: 16px;
          height: 16px;
          border-radius: 4px;
        }

        /* Mobile Responsiveness */
        @media (max-width: 768px) {
          .availability-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .page-title {
            font-size: 1.75rem;
          }

          .view-toggle {
            width: 100%;
          }

          .toggle-btn {
            flex: 1;
          }

          .stats-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
          }

          .stat-card {
            padding: 16px 12px;
          }

          .stat-icon {
            font-size: 1.5rem;
          }

          .stat-value {
            font-size: 1.5rem;
          }

          .stat-label {
            font-size: 0.75rem;
          }

          .occupancy-rate {
            font-size: 2.5rem;
          }

          .rooms-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }

          .room-status-card {
            padding: 12px;
          }

          .room-number {
            font-size: 1.3rem;
          }

          .forecast-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .legend {
            gap: 12px;
          }

          .legend-item {
            font-size: 0.8rem;
          }
        }

        @media (max-width: 480px) {
          .page-title {
            font-size: 1.5rem;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .stat-value {
            font-size: 1.3rem;
          }

          .occupancy-rate {
            font-size: 2rem;
          }

          .rooms-grid {
            grid-template-columns: 1fr;
          }

          .forecast-grid {
            grid-template-columns: 1fr;
          }

          .legend {
            flex-direction: column;
            gap: 8px;
          }
        }

        /* Touch device optimizations */
        @media (hover: none) and (pointer: coarse) {
          .toggle-btn {
            padding: 12px 16px;
            min-height: 44px;
          }

          .room-status-card {
            padding: 16px;
          }
        }
      `}</style>

      <div className="availability-header">
        <h1 className="page-title">Room Availability & Forecast</h1>
        <div className="view-toggle">
          <button
            className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            📊 Grid View
          </button>
          <button
            className={`toggle-btn ${viewMode === 'calendar' ? 'active' : ''}`}
            onClick={() => setViewMode('calendar')}
          >
            📅 Calendar View
          </button>
        </div>
      </div>

      <div className="occupancy-card">
        <div className="occupancy-rate">{occupancyRate}%</div>
        <div className="occupancy-label">Current Occupancy Rate</div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🏨</div>
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Rooms</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-value">{stats.available}</div>
          <div className="stat-label">Available</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔴</div>
          <div className="stat-value">{stats.occupied}</div>
          <div className="stat-label">Occupied</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🧹</div>
          <div className="stat-value">{stats.cleaning}</div>
          <div className="stat-label">Cleaning</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔧</div>
          <div className="stat-value">{stats.maintenance}</div>
          <div className="stat-label">Maintenance</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-value">{stats.reserved}</div>
          <div className="stat-label">Reserved</div>
        </div>
      </div>

      <div className="legend">
        <div className="legend-item">
          <div className="legend-color" style={{ background: '#10B981' }}></div>
          <span>Available</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ background: '#EF4444' }}></div>
          <span>Occupied</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ background: '#3B82F6' }}></div>
          <span>Cleaning</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ background: '#F59E0B' }}></div>
          <span>Maintenance</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ background: '#A855F7' }}></div>
          <span>Reserved</span>
        </div>
      </div>

      <div className="rooms-grid">
        {rooms.map(room => (
          <div key={room.id} className={`room-status-card ${getStatusColor(room.status)}`}>
            <div className="room-number">#{room.id}</div>
            <div className="room-type">{room.type}</div>
            <div className="room-status-badge">
              <span>{getStatusIcon(room.status)}</span>
              <span>{room.status}</span>
            </div>
            {room.status === 'occupied' && (
              <div className="room-details">Check-out: {room.checkOut}</div>
            )}
            {room.status === 'available' && room.nextBooking && (
              <div className="room-details">Next: {room.nextBooking}</div>
            )}
            {room.status === 'maintenance' && (
              <div className="room-details">Ready: {room.estimatedReady}</div>
            )}
            {room.status === 'reserved' && (
              <div className="room-details">Check-in: {room.checkIn}</div>
            )}
          </div>
        ))}
      </div>

      <div className="forecast-section">
        <h2 className="section-title">7-Day Availability Forecast</h2>
        <div className="forecast-grid">
          {forecast.map((day, index) => (
            <div key={index} className="forecast-card">
              <div className="forecast-date">{day.date}</div>
              <div className="forecast-stats">
                <div className="forecast-stat">
                  <span>✅ Available:</span>
                  <strong>{day.available}</strong>
                </div>
                <div className="forecast-stat">
                  <span>🔴 Occupied:</span>
                  <strong>{day.occupied}</strong>
                </div>
                <div className="forecast-stat">
                  <span>📅 Reserved:</span>
                  <strong>{day.reserved}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminFrontOfficeAvailability;
