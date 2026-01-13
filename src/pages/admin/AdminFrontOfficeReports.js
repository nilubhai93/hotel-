import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

const AdminFrontOfficeReports = () => {
    const [dateRange, setDateRange] = useState('week');
    const [reportType, setReportType] = useState('overview');

    // Sample report data
    const revenueData = [
        { date: 'Mon', revenue: 125000, bookings: 8 },
        { date: 'Tue', revenue: 145000, bookings: 10 },
        { date: 'Wed', revenue: 98000, bookings: 6 },
        { date: 'Thu', revenue: 167000, bookings: 12 },
        { date: 'Fri', revenue: 189000, bookings: 14 },
        { date: 'Sat', revenue: 210000, bookings: 16 },
        { date: 'Sun', revenue: 195000, bookings: 15 },
    ];

    const occupancyData = [
        { month: 'Jan', rate: 75 },
        { month: 'Feb', rate: 82 },
        { month: 'Mar', rate: 68 },
        { month: 'Apr', rate: 90 },
        { month: 'May', rate: 85 },
        { month: 'Jun', rate: 78 },
    ];

    const topRooms = [
        { room: '101', bookings: 28, revenue: 420000 },
        { room: '203', bookings: 25, revenue: 500000 },
        { room: '305', bookings: 22, revenue: 396000 },
        { room: '102', bookings: 20, revenue: 320000 },
        { room: '201', bookings: 18, revenue: 324000 },
    ];

    const stats = {
        totalRevenue: revenueData.reduce((sum, day) => sum + day.revenue, 0),
        totalBookings: revenueData.reduce((sum, day) => sum + day.bookings, 0),
        avgRevenue: Math.round(revenueData.reduce((sum, day) => sum + day.revenue, 0) / revenueData.length),
        avgOccupancy: Math.round(occupancyData.reduce((sum, m) => sum + m.rate, 0) / occupancyData.length),
    };

    const maxRevenue = Math.max(...revenueData.map(d => d.revenue));

    return (
        <AdminLayout>
            <style>{`
        .reports-header {
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

        .date-range-selector {
          display: flex;
          gap: 8px;
          background: rgba(0,0,0,0.05);
          padding: 4px;
          border-radius: 8px;
        }

        .dark-mode .date-range-selector {
          background: rgba(255,255,255,0.05);
        }

        .range-btn {
          padding: 8px 16px;
          background: transparent;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s;
          font-weight: 500;
          font-size: 0.85rem;
        }

        .light-mode .range-btn {
          color: #57534E;
        }

        .dark-mode .range-btn {
          color: #9CA3AF;
        }

        .range-btn.active {
          background: #FFFFFF;
          color: #B45309;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .dark-mode .range-btn.active {
          background: rgba(17, 24, 39, 0.9);
          color: #F59E0B;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
          margin-bottom: 32px;
        }

        .stat-card {
          padding: 24px;
          border-radius: 16px;
          border: 1px solid rgba(0,0,0,0.06);
          position: relative;
          overflow: hidden;
        }

        .light-mode .stat-card {
          background: #FFFFFF;
          box-shadow: 0 4px 6px -1px rgba(28, 25, 23, 0.05);
        }

        .dark-mode .stat-card {
          background: rgba(17, 24, 39, 0.75);
          border-color: rgba(255,255,255,0.08);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5);
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, #B45309, transparent);
        }

        .stat-label {
          font-size: 0.85rem;
          opacity: 0.7;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .stat-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 600;
        }

        .light-mode .stat-value { color: #1C1917; }
        .dark-mode .stat-value { color: #F9FAFB; }

        .chart-container {
          padding: 24px;
          border-radius: 16px;
          border: 1px solid rgba(0,0,0,0.06);
          margin-bottom: 24px;
        }

        .light-mode .chart-container {
          background: #FFFFFF;
          box-shadow: 0 4px 6px -1px rgba(28, 25, 23, 0.05);
        }

        .dark-mode .chart-container {
          background: rgba(17, 24, 39, 0.75);
          border-color: rgba(255,255,255,0.08);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5);
        }

        .chart-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 24px;
        }

        .light-mode .chart-title { color: #1C1917; }
        .dark-mode .chart-title { color: #F9FAFB; }

        .bar-chart {
          display: flex;
          align-items: flex-end;
          gap: 12px;
          height: 300px;
          padding: 20px 0;
        }

        .bar-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .bar {
          width: 100%;
          background: linear-gradient(180deg, #F59E0B, #D97706);
          border-radius: 8px 8px 0 0;
          transition: all 0.3s;
          cursor: pointer;
          position: relative;
        }

        .bar:hover {
          background: linear-gradient(180deg, #FBBF24, #F59E0B);
          transform: scaleY(1.05);
        }

        .bar-value {
          position: absolute;
          top: -25px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.75rem;
          font-weight: 600;
          white-space: nowrap;
        }

        .light-mode .bar-value { color: #1C1917; }
        .dark-mode .bar-value { color: #F9FAFB; }

        .bar-label {
          font-size: 0.85rem;
          font-weight: 500;
        }

        .light-mode .bar-label { color: #57534E; }
        .dark-mode .bar-label { color: #9CA3AF; }

        .line-chart {
          display: flex;
          align-items: flex-end;
          gap: 16px;
          height: 250px;
          padding: 20px 0;
        }

        .line-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .line-point {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }

        .point {
          width: 12px;
          height: 12px;
          background: #3B82F6;
          border-radius: 50%;
          border: 3px solid #FFFFFF;
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
          cursor: pointer;
          transition: all 0.3s;
        }

        .dark-mode .point {
          border-color: rgba(17, 24, 39, 0.9);
        }

        .point:hover {
          transform: scale(1.5);
        }

        .point-value {
          position: absolute;
          top: -25px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .light-mode .point-value { color: #1C1917; }
        .dark-mode .point-value { color: #F9FAFB; }

        .top-rooms-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }

        .room-rank-card {
          padding: 20px;
          border-radius: 12px;
          border: 1px solid rgba(0,0,0,0.06);
          position: relative;
        }

        .light-mode .room-rank-card {
          background: #FFFFFF;
        }

        .dark-mode .room-rank-card {
          background: rgba(17, 24, 39, 0.75);
          border-color: rgba(255,255,255,0.08);
        }

        .rank-badge {
          position: absolute;
          top: -10px;
          right: -10px;
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #F59E0B, #D97706);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 0.85rem;
          box-shadow: 0 4px 8px rgba(180, 83, 9, 0.3);
        }

        .room-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .light-mode .room-number { color: #B45309; }
        .dark-mode .room-number { color: #F59E0B; }

        .room-metrics {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .metric-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
        }

        .metric-label {
          opacity: 0.7;
        }

        .metric-value {
          font-weight: 600;
        }

        /* Mobile Responsiveness */
        @media (max-width: 768px) {
          .reports-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .page-title {
            font-size: 1.75rem;
          }

          .date-range-selector {
            width: 100%;
          }

          .range-btn {
            flex: 1;
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

          .chart-container {
            padding: 16px;
          }

          .chart-title {
            font-size: 1.3rem;
          }

          .bar-chart {
            height: 200px;
            gap: 8px;
          }

          .bar-value {
            font-size: 0.7rem;
          }

          .bar-label {
            font-size: 0.75rem;
          }

          .line-chart {
            height: 180px;
            gap: 12px;
          }

          .top-rooms-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }

        @media (max-width: 480px) {
          .page-title {
            font-size: 1.5rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .stat-value {
            font-size: 1.4rem;
          }

          .bar-chart {
            height: 150px;
            gap: 6px;
          }

          .bar-value {
            font-size: 0.65rem;
            top: -20px;
          }

          .line-chart {
            height: 150px;
          }

          .room-number {
            font-size: 1.5rem;
          }
        }

        /* Touch device optimizations */
        @media (hover: none) and (pointer: coarse) {
          .range-btn {
            padding: 12px 16px;
            min-height: 44px;
          }
        }
      `}</style>

            <div className="reports-header">
                <h1 className="page-title">Analytics & Reports</h1>
                <div className="date-range-selector">
                    <button
                        className={`range-btn ${dateRange === 'week' ? 'active' : ''}`}
                        onClick={() => setDateRange('week')}
                    >
                        Week
                    </button>
                    <button
                        className={`range-btn ${dateRange === 'month' ? 'active' : ''}`}
                        onClick={() => setDateRange('month')}
                    >
                        Month
                    </button>
                    <button
                        className={`range-btn ${dateRange === 'year' ? 'active' : ''}`}
                        onClick={() => setDateRange('year')}
                    >
                        Year
                    </button>
                </div>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-label">Total Revenue</div>
                    <div className="stat-value">₹{stats.totalRevenue.toLocaleString('en-IN')}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Total Bookings</div>
                    <div className="stat-value">{stats.totalBookings}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Avg Daily Revenue</div>
                    <div className="stat-value">₹{stats.avgRevenue.toLocaleString('en-IN')}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Avg Occupancy</div>
                    <div className="stat-value">{stats.avgOccupancy}%</div>
                </div>
            </div>

            <div className="chart-container">
                <h2 className="chart-title">Daily Revenue Trend</h2>
                <div className="bar-chart">
                    {revenueData.map((day, index) => (
                        <div key={index} className="bar-item">
                            <div
                                className="bar"
                                style={{ height: `${(day.revenue / maxRevenue) * 100}%` }}
                            >
                                <div className="bar-value">₹{(day.revenue / 1000).toFixed(0)}K</div>
                            </div>
                            <div className="bar-label">{day.date}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="chart-container">
                <h2 className="chart-title">Occupancy Rate Trend</h2>
                <div className="line-chart">
                    {occupancyData.map((month, index) => (
                        <div key={index} className="line-item">
                            <div className="line-point" style={{ height: `${month.rate}%` }}>
                                <div className="point">
                                    <div className="point-value">{month.rate}%</div>
                                </div>
                            </div>
                            <div className="bar-label">{month.month}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="chart-container">
                <h2 className="chart-title">Top Performing Rooms</h2>
                <div className="top-rooms-grid">
                    {topRooms.map((room, index) => (
                        <div key={index} className="room-rank-card">
                            <div className="rank-badge">#{index + 1}</div>
                            <div className="room-number">Room {room.room}</div>
                            <div className="room-metrics">
                                <div className="metric-row">
                                    <span className="metric-label">Bookings:</span>
                                    <span className="metric-value">{room.bookings}</span>
                                </div>
                                <div className="metric-row">
                                    <span className="metric-label">Revenue:</span>
                                    <span className="metric-value">₹{room.revenue.toLocaleString('en-IN')}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminFrontOfficeReports;
