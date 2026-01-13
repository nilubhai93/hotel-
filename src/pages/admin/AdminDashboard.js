import React from 'react';
import AdminLayout from '../../components/AdminLayout';
import StatCard from '../../components/StatCard';

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <style>{`
        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
        }

        /* Removed legacy stat-card styles */

        .recent-section {
          backdrop-filter: blur(12px);
          border-radius: 24px;
          padding: 32px;
          position: relative;
          overflow: hidden;
        }
        
        .light-mode .recent-section {
            background: #FFFFFF;
            border: 1px solid rgba(0, 0, 0, 0.06);
            box-shadow: 0 4px 6px -1px rgba(28, 25, 23, 0.05);
        }
        
        .dark-mode .recent-section {
            background: rgba(17, 24, 39, 0.75);
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5);
        }
        
        /* Section Background Accent */
        .recent-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            opacity: 0.5;
        }
        .light-mode .recent-section::before { background: linear-gradient(90deg, #B45309, transparent); }
        .dark-mode .recent-section::before { background: linear-gradient(90deg, #F59E0B, transparent); }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
        }
        
        .light-mode .section-header { border-bottom: 1px solid rgba(0,0,0,0.06); }
        .dark-mode .section-header { border-bottom: 1px solid rgba(255,255,255,0.08); }

        .section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 600;
          margin: 0;
          letter-spacing: -0.01em;
        }
        
        .light-mode .section-title { color: #1C1917; }
        .dark-mode .section-title { color: #F9FAFB; }
        
        .view-all {
            font-size: 0.875rem;
            text-decoration: none;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            padding: 8px 16px;
            border-radius: 8px;
        }
        
        .light-mode .view-all { color: #B45309; background: rgba(180, 83, 9, 0.08); }
        .dark-mode .view-all { color: #F59E0B; background: rgba(245, 158, 11, 0.15); }
        
        .view-all:hover {
            transform: translateY(-2px);
        }
        
        .light-mode .view-all:hover { box-shadow: 0 4px 12px rgba(28, 25, 23, 0.1); }
        .dark-mode .view-all:hover { box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); }

        .bookings-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0 12px; /* Increased row spacing */
        }

        .bookings-table th {
          text-align: left;
          padding: 12px 24px;
          font-weight: 600;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        
        .light-mode .bookings-table th { color: #57534E; }
        .dark-mode .bookings-table th { color: #9CA3AF; }

        .bookings-table td {
          padding: 24px 24px;
          font-size: 1rem;
          transition: all 0.2s ease;
          font-variant-numeric: tabular-nums;
        }
        
        .light-mode .bookings-table td {
            background: rgba(255,255,255,0.5);
            color: #1C1917;
            border-top: 1px solid rgba(0,0,0,0.06);
            border-bottom: 1px solid rgba(0,0,0,0.06);
        }
        
        .dark-mode .bookings-table td {
            background: rgba(255,255,255,0.015);
            color: #F9FAFB;
            border-top: 1px solid rgba(255,255,255,0.08);
            border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        
        .bookings-table td:first-child {
            border-left: 1px solid transparent;
            border-top-left-radius: 16px;
            border-bottom-left-radius: 16px;
            font-weight: 500;
        }
        
        .light-mode .bookings-table td:first-child { border-left-color: rgba(0,0,0,0.06); }
        .dark-mode .bookings-table td:first-child { border-left-color: rgba(255,255,255,0.08); }
        
        .bookings-table td:last-child {
            border-right: 1px solid transparent;
            border-top-right-radius: 16px;
            border-bottom-right-radius: 16px;
            font-weight: 600;
            font-family: 'Cormorant Garamond', serif;
            font-size: 1.1rem;
        }
        
        .light-mode .bookings-table td:last-child { border-right-color: rgba(0,0,0,0.06); }
        .dark-mode .bookings-table td:last-child { border-right-color: rgba(255,255,255,0.08); }

        .bookings-table tr:hover td {
          transform: scale(1.005);
        }
        
        .light-mode .bookings-table tr:hover td { background: #FAFAF9; border-color: #B45309; }
        .dark-mode .bookings-table tr:hover td { background: #030712; border-color: #F59E0B; }

        .status-badge {
          padding: 8px 16px;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: inline-flex;
          align-items: center;
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }
        
        .status-badge::before {
            content: '';
            width: 6px;
            height: 6px;
            border-radius: 50%;
            margin-right: 8px;
            background-color: currentColor;
        }

        .status-confirmed {
          background: rgba(16, 185, 129, 0.1);
          color: #059669;
          border: 1px solid rgba(16, 185, 129, 0.2);
        }

        .status-pending {
          background: rgba(245, 158, 11, 0.1);
          color: #d97706;
          border: 1px solid rgba(245, 158, 11, 0.2);
        }

        /* ===== MOBILE RESPONSIVENESS ===== */

        /* Tablet (Portrait) */
        @media (max-width: 768px) {
          .dashboard-grid {
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 20px;
            margin-bottom: 32px;
          }

          .recent-section {
            padding: 24px;
            border-radius: 20px;
          }

          .section-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
            margin-bottom: 24px;
            padding-bottom: 16px;
          }

          .section-title {
            font-size: 1.75rem;
          }

          .view-all {
            font-size: 0.8rem;
            padding: 6px 14px;
          }

          .bookings-table {
            font-size: 0.9rem;
          }

          .bookings-table th {
            padding: 10px 16px;
            font-size: 0.7rem;
          }

          .bookings-table td {
            padding: 20px 16px;
            font-size: 0.9rem;
          }

          .status-badge {
            padding: 6px 12px;
            font-size: 0.7rem;
          }
        }

        /* Mobile (Landscape & Portrait) */
        @media (max-width: 640px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
            gap: 16px;
            margin-bottom: 24px;
          }

          .recent-section {
            padding: 20px;
            border-radius: 16px;
            overflow-x: auto;
          }

          .section-header {
            margin-bottom: 20px;
            padding-bottom: 12px;
          }

          .section-title {
            font-size: 1.5rem;
          }

          .view-all {
            font-size: 0.75rem;
            padding: 6px 12px;
          }

          /* Table wrapper for horizontal scroll */
          .table-wrapper {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            margin: 0 -20px;
            padding: 0 20px;
          }

          .bookings-table {
            min-width: 600px;
            border-spacing: 0 8px;
          }

          .bookings-table th {
            padding: 8px 12px;
            font-size: 0.65rem;
            white-space: nowrap;
          }

          .bookings-table td {
            padding: 16px 12px;
            font-size: 0.85rem;
          }

          .bookings-table td:first-child {
            border-radius: 12px 0 0 12px;
          }

          .bookings-table td:last-child {
            border-radius: 0 12px 12px 0;
            font-size: 1rem;
          }

          .status-badge {
            padding: 5px 10px;
            font-size: 0.65rem;
          }
        }

        /* Small Mobile */
        @media (max-width: 480px) {
          .dashboard-grid {
            gap: 12px;
            margin-bottom: 20px;
          }

          .recent-section {
            padding: 16px;
            border-radius: 14px;
          }

          .section-header {
            gap: 10px;
            margin-bottom: 16px;
            padding-bottom: 10px;
          }

          .section-title {
            font-size: 1.35rem;
          }

          .view-all {
            font-size: 0.7rem;
            padding: 5px 10px;
            letter-spacing: 0.03em;
          }

          .table-wrapper {
            margin: 0 -16px;
            padding: 0 16px;
          }

          .bookings-table {
            min-width: 550px;
            border-spacing: 0 6px;
          }

          .bookings-table th {
            padding: 6px 10px;
            font-size: 0.6rem;
          }

          .bookings-table td {
            padding: 14px 10px;
            font-size: 0.8rem;
          }

          .bookings-table td:last-child {
            font-size: 0.95rem;
          }

          .status-badge {
            padding: 4px 8px;
            font-size: 0.6rem;
          }

          .status-badge::before {
            width: 5px;
            height: 5px;
            margin-right: 6px;
          }
        }

        /* Extra Small Mobile */
        @media (max-width: 360px) {
          .section-title {
            font-size: 1.25rem;
          }

          .bookings-table {
            min-width: 500px;
          }

          .bookings-table th {
            padding: 6px 8px;
            font-size: 0.55rem;
          }

          .bookings-table td {
            padding: 12px 8px;
            font-size: 0.75rem;
          }

          .bookings-table td:last-child {
            font-size: 0.9rem;
          }
        }

        /* Touch device optimizations */
        @media (hover: none) and (pointer: coarse) {
          .view-all {
            padding: 10px 16px;
            min-height: 44px;
            display: inline-flex;
            align-items: center;
          }

          .bookings-table td {
            padding: 18px 12px;
          }
        }
      `}</style>

      {/* Stats Grid */}
      <div className="dashboard-grid">
        <StatCard
          title="Total Bookings"
          value="845"
          trend="↑ 12%"
          trendLabel="vs last month"
          icon="📅"
          color="blue"
        />
        <StatCard
          title="Total Revenue"
          value="₹92,50,000"
          trend="↑ 8%"
          trendLabel="vs last month"
          icon="💰"
          isHighlighted={true}
          color="amber"
        />
        <StatCard
          title="Room Occupancy"
          value="76%"
          trend="↓ 2%"
          trendLabel="vs last month"
          icon="🛏️"
          color="violet"
        />
        <StatCard
          title="Active Guests"
          value="218"
          trend="↑ 5%"
          trendLabel="Now in hotel"
          icon="👥"
          color="emerald"
        />
      </div>

      {/* Recent Activity */}
      <div className="recent-section">
        <div className="section-header">
          <h2 className="section-title">Recent Bookings</h2>
          <span className="view-all">VIEW ALL</span>
        </div>
        <div className="table-wrapper">
          <table className="bookings-table">
            <thead>
              <tr>
                <th>Guest Name</th>
                <th>Room Type</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>James Richardson</td>
                <td>Presidential Suite</td>
                <td>Oct 24, 2026</td>
                <td>Oct 29, 2026</td>
                <td><span className="status-badge status-confirmed">Confirmed</span></td>
                <td>₹3,75,000</td>
              </tr>
              <tr>
                <td>Eleanor Wooten</td>
                <td>Deluxe Ocean View</td>
                <td>Oct 24, 2026</td>
                <td>Oct 27, 2026</td>
                <td><span className="status-badge status-pending">Pending</span></td>
                <td>₹1,00,000</td>
              </tr>
              <tr>
                <td>Marcus Thorne</td>
                <td>Executive Suite</td>
                <td>Oct 25, 2026</td>
                <td>Oct 30, 2026</td>
                <td><span className="status-badge status-confirmed">Confirmed</span></td>
                <td>₹2,37,500</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
