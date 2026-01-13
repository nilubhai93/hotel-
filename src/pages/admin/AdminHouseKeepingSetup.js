import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

const AdminHouseKeepingSetup = () => {
  const [activeSection, setActiveSection] = useState('staff');

  // Sample data
  const staffMembers = [
    { id: 'S001', name: 'Maria Santos', role: 'Supervisor', shift: 'Morning', phone: '+91 98765 43210', email: 'maria@hotel.com', status: 'active' },
    { id: 'S002', name: 'John Doe', role: 'Cleaner', shift: 'Morning', phone: '+91 98765 43211', email: 'john@hotel.com', status: 'active' },
    { id: 'S003', name: 'Sarah Lee', role: 'Cleaner', shift: 'Evening', phone: '+91 98765 43212', email: 'sarah@hotel.com', status: 'active' },
    { id: 'S004', name: 'Mike Johnson', role: 'Inspector', shift: 'Morning', phone: '+91 98765 43213', email: 'mike@hotel.com', status: 'on-leave' },
  ];

  const cleaningCategories = [
    { id: 1, name: 'Daily Cleaning', duration: '30 min', tasks: ['Bed making', 'Bathroom cleaning', 'Vacuuming', 'Trash removal'] },
    { id: 2, name: 'Deep Cleaning', duration: '90 min', tasks: ['Complete sanitization', 'Window cleaning', 'Carpet shampooing', 'Furniture polishing'] },
    { id: 3, name: 'Turnover Service', duration: '45 min', tasks: ['Quick cleaning', 'Linen change', 'Amenities restocking', 'Inspection'] },
    { id: 4, name: 'Inspection', duration: '15 min', tasks: ['Quality check', 'Damage assessment', 'Inventory verification'] },
  ];

  const equipment = [
    { id: 1, name: 'Vacuum Cleaner', quantity: 5, available: 4, condition: 'good' },
    { id: 2, name: 'Mop & Bucket', quantity: 10, available: 8, condition: 'good' },
    { id: 3, name: 'Cleaning Cart', quantity: 6, available: 5, condition: 'fair' },
    { id: 4, name: 'Steam Cleaner', quantity: 2, available: 1, condition: 'excellent' },
  ];

  const schedules = [
    { shift: 'Morning', time: '6:00 AM - 2:00 PM', staff: 8 },
    { shift: 'Evening', time: '2:00 PM - 10:00 PM', staff: 5 },
    { shift: 'Night', time: '10:00 PM - 6:00 AM', staff: 2 },
  ];

  return (
    <AdminLayout>
      <style>{`
        .setup-header {
          margin-bottom: 30px;
        }

        .page-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 600;
          margin: 0;
          margin-bottom: 8px;
        }
        .light-mode .page-title { color: #1C1917; }
        .dark-mode .page-title { color: #F9FAFB; }

        .page-subtitle {
          font-size: 0.95rem;
          opacity: 0.7;
        }

        .section-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 32px;
          border-bottom: 2px solid rgba(0,0,0,0.06);
          overflow-x: auto;
        }

        .dark-mode .section-tabs {
          border-bottom-color: rgba(255,255,255,0.08);
        }

        .section-tab {
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

        .light-mode .section-tab {
          color: #57534E;
        }

        .dark-mode .section-tab {
          color: #9CA3AF;
        }

        .section-tab.active {
          border-bottom-color: #B45309;
          color: #B45309;
        }

        .dark-mode .section-tab.active {
          border-bottom-color: #F59E0B;
          color: #F59E0B;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 600;
        }

        .light-mode .section-title { color: #1C1917; }
        .dark-mode .section-title { color: #F9FAFB; }

        .add-btn {
          padding: 10px 20px;
          background: linear-gradient(45deg, #B45309, #D97706);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .add-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(180, 83, 9, 0.3);
        }

        .dark-mode .add-btn {
          background: linear-gradient(45deg, #F59E0B, #FBBF24);
        }

        .staff-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .staff-card {
          padding: 24px;
          border-radius: 16px;
          border: 1px solid rgba(0,0,0,0.06);
          transition: all 0.3s;
        }

        .light-mode .staff-card {
          background: #FFFFFF;
          box-shadow: 0 4px 6px -1px rgba(28, 25, 23, 0.05);
        }

        .dark-mode .staff-card {
          background: rgba(17, 24, 39, 0.75);
          border-color: rgba(255,255,255,0.08);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5);
        }

        .staff-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px -4px rgba(28, 25, 23, 0.15);
        }

        .dark-mode .staff-card:hover {
          box-shadow: 0 12px 24px -4px rgba(0, 0, 0, 0.7);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 16px;
        }

        .staff-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .light-mode .staff-name { color: #1C1917; }
        .dark-mode .staff-name { color: #F9FAFB; }

        .staff-role {
          font-size: 0.85rem;
          opacity: 0.7;
        }

        .status-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .status-badge.active {
          background: rgba(16, 185, 129, 0.1);
          color: #059669;
        }

        .status-badge.on-leave {
          background: rgba(245, 158, 11, 0.1);
          color: #D97706;
        }

        .staff-details {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 16px;
        }

        .detail-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          opacity: 0.8;
        }

        .card-actions {
          display: flex;
          gap: 8px;
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

        .category-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }

        .category-card {
          padding: 24px;
          border-radius: 16px;
          border: 1px solid rgba(0,0,0,0.06);
        }

        .light-mode .category-card {
          background: #FFFFFF;
          box-shadow: 0 4px 6px -1px rgba(28, 25, 23, 0.05);
        }

        .dark-mode .category-card {
          background: rgba(17, 24, 39, 0.75);
          border-color: rgba(255,255,255,0.08);
        }

        .category-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .light-mode .category-name { color: #1C1917; }
        .dark-mode .category-name { color: #F9FAFB; }

        .category-duration {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .light-mode .category-duration {
          background: rgba(180, 83, 9, 0.1);
          color: #B45309;
        }

        .dark-mode .category-duration {
          background: rgba(245, 158, 11, 0.15);
          color: #F59E0B;
        }

        .task-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .task-list li {
          padding: 8px 0;
          font-size: 0.85rem;
          opacity: 0.8;
          border-bottom: 1px solid rgba(0,0,0,0.04);
        }

        .dark-mode .task-list li {
          border-bottom-color: rgba(255,255,255,0.04);
        }

        .task-list li:last-child {
          border-bottom: none;
        }

        .task-list li:before {
          content: '✓ ';
          color: #10B981;
          font-weight: bold;
          margin-right: 8px;
        }

        .equipment-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 16px;
        }

        .equipment-card {
          padding: 20px;
          border-radius: 12px;
          border: 1px solid rgba(0,0,0,0.06);
        }

        .light-mode .equipment-card {
          background: #FFFFFF;
        }

        .dark-mode .equipment-card {
          background: rgba(17, 24, 39, 0.75);
          border-color: rgba(255,255,255,0.08);
        }

        .equipment-name {
          font-weight: 600;
          font-size: 1.1rem;
          margin-bottom: 12px;
        }

        .light-mode .equipment-name { color: #1C1917; }
        .dark-mode .equipment-name { color: #F9FAFB; }

        .equipment-stats {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          font-size: 0.85rem;
        }

        .condition-badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .condition-badge.excellent {
          background: rgba(16, 185, 129, 0.1);
          color: #059669;
        }

        .condition-badge.good {
          background: rgba(59, 130, 246, 0.1);
          color: #2563EB;
        }

        .condition-badge.fair {
          background: rgba(245, 158, 11, 0.1);
          color: #D97706;
        }

        .schedule-grid {
          display: grid;
          gap: 16px;
        }

        .schedule-card {
          padding: 24px;
          border-radius: 12px;
          border: 1px solid rgba(0,0,0,0.06);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .light-mode .schedule-card {
          background: #FFFFFF;
        }

        .dark-mode .schedule-card {
          background: rgba(17, 24, 39, 0.75);
          border-color: rgba(255,255,255,0.08);
        }

        .schedule-info h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-weight: 600;
          margin: 0 0 4px 0;
        }

        .light-mode .schedule-info h3 { color: #1C1917; }
        .dark-mode .schedule-info h3 { color: #F9FAFB; }

        .schedule-time {
          font-size: 0.85rem;
          opacity: 0.7;
        }

        .staff-count {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 600;
        }

        .light-mode .staff-count { color: #B45309; }
        .dark-mode .staff-count { color: #F59E0B; }

        /* Mobile Responsiveness */
        @media (max-width: 768px) {
          .page-title {
            font-size: 1.75rem;
          }

          .section-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .add-btn {
            width: 100%;
            justify-content: center;
          }

          .staff-grid,
          .category-grid,
          .equipment-grid {
            grid-template-columns: 1fr;
          }

          .schedule-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
        }

        @media (max-width: 480px) {
          .page-title {
            font-size: 1.5rem;
          }

          .section-tab {
            padding: 10px 16px;
            font-size: 0.85rem;
          }

          .staff-card,
          .category-card,
          .equipment-card {
            padding: 16px;
          }
        }

        /* Touch device optimizations */
        @media (hover: none) and (pointer: coarse) {
          .section-tab {
            padding: 14px 24px;
            min-height: 44px;
          }

          .add-btn {
            padding: 14px 24px;
            min-height: 48px;
          }

          .icon-btn {
            padding: 12px;
            min-height: 44px;
          }
        }
      `}</style>

      <div className="setup-header">
        <h1 className="page-title">House Keeping Setup</h1>
        <p className="page-subtitle">Manage staff, cleaning categories, and equipment</p>
      </div>

      <div className="section-tabs">
        <button
          className={`section-tab ${activeSection === 'staff' ? 'active' : ''}`}
          onClick={() => setActiveSection('staff')}
        >
          Staff Management
        </button>
        <button
          className={`section-tab ${activeSection === 'categories' ? 'active' : ''}`}
          onClick={() => setActiveSection('categories')}
        >
          Cleaning Categories
        </button>
        <button
          className={`section-tab ${activeSection === 'equipment' ? 'active' : ''}`}
          onClick={() => setActiveSection('equipment')}
        >
          Equipment
        </button>
        <button
          className={`section-tab ${activeSection === 'schedules' ? 'active' : ''}`}
          onClick={() => setActiveSection('schedules')}
        >
          Schedules
        </button>
      </div>

      {activeSection === 'staff' && (
        <>
          <div className="section-header">
            <h2 className="section-title">Staff Members</h2>
            <button className="add-btn">
              <span>➕</span>
              Add Staff
            </button>
          </div>

          <div className="staff-grid">
            {staffMembers.map(staff => (
              <div key={staff.id} className="staff-card">
                <div className="card-header">
                  <div>
                    <div className="staff-name">{staff.name}</div>
                    <div className="staff-role">{staff.role}</div>
                  </div>
                  <span className={`status-badge ${staff.status}`}>
                    {staff.status}
                  </span>
                </div>
                <div className="staff-details">
                  <div className="detail-row">
                    <span>🕐</span>
                    <span>{staff.shift} Shift</span>
                  </div>
                  <div className="detail-row">
                    <span>📱</span>
                    <span>{staff.phone}</span>
                  </div>
                  <div className="detail-row">
                    <span>📧</span>
                    <span>{staff.email}</span>
                  </div>
                </div>
                <div className="card-actions">
                  <button className="icon-btn">✏️ Edit</button>
                  <button className="icon-btn">🗑️ Remove</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeSection === 'categories' && (
        <>
          <div className="section-header">
            <h2 className="section-title">Cleaning Categories</h2>
            <button className="add-btn">
              <span>➕</span>
              Add Category
            </button>
          </div>

          <div className="category-grid">
            {cleaningCategories.map(category => (
              <div key={category.id} className="category-card">
                <div className="card-header">
                  <div className="category-name">{category.name}</div>
                  <div className="card-actions">
                    <button className="icon-btn">✏️</button>
                    <button className="icon-btn">🗑️</button>
                  </div>
                </div>
                <div className="category-duration">⏱️ {category.duration}</div>
                <ul className="task-list">
                  {category.tasks.map((task, idx) => (
                    <li key={idx}>{task}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      )}

      {activeSection === 'equipment' && (
        <>
          <div className="section-header">
            <h2 className="section-title">Equipment Inventory</h2>
            <button className="add-btn">
              <span>➕</span>
              Add Equipment
            </button>
          </div>

          <div className="equipment-grid">
            {equipment.map(item => (
              <div key={item.id} className="equipment-card">
                <div className="equipment-name">{item.name}</div>
                <div className="equipment-stats">
                  <span>Total: {item.quantity}</span>
                  <span>Available: {item.available}</span>
                </div>
                <span className={`condition-badge ${item.condition}`}>
                  {item.condition}
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      {activeSection === 'schedules' && (
        <>
          <div className="section-header">
            <h2 className="section-title">Shift Schedules</h2>
            <button className="add-btn">
              <span>➕</span>
              Add Schedule
            </button>
          </div>

          <div className="schedule-grid">
            {schedules.map((schedule, idx) => (
              <div key={idx} className="schedule-card">
                <div className="schedule-info">
                  <h3>{schedule.shift} Shift</h3>
                  <div className="schedule-time">{schedule.time}</div>
                </div>
                <div className="staff-count">{schedule.staff} Staff</div>
              </div>
            ))}
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminHouseKeepingSetup;
