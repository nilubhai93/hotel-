import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

const AdminHouseKeepingOperations = () => {
  const [activeTab, setActiveTab] = useState('tasks');
  const [filterStatus, setFilterStatus] = useState('all');

  // Sample data
  const tasks = [
    { id: 'T001', room: '101', type: 'Daily Cleaning', assignedTo: 'Maria Santos', status: 'in-progress', priority: 'high', dueTime: '10:00 AM' },
    { id: 'T002', room: '203', type: 'Deep Cleaning', assignedTo: 'John Doe', status: 'pending', priority: 'medium', dueTime: '11:00 AM' },
    { id: 'T003', room: '305', type: 'Turnover Service', assignedTo: 'Sarah Lee', status: 'completed', priority: 'high', dueTime: '09:30 AM' },
    { id: 'T004', room: '102', type: 'Daily Cleaning', assignedTo: 'Maria Santos', status: 'pending', priority: 'low', dueTime: '02:00 PM' },
    { id: 'T005', room: '201', type: 'Inspection', assignedTo: 'Mike Johnson', status: 'in-progress', priority: 'medium', dueTime: '03:00 PM' },
  ];

  const roomStatus = [
    { room: '101', status: 'clean', lastCleaned: '2 hours ago', nextService: 'Tomorrow' },
    { room: '102', status: 'dirty', lastCleaned: '1 day ago', nextService: 'Today' },
    { room: '103', status: 'inspected', lastCleaned: '3 hours ago', nextService: 'Tomorrow' },
    { room: '201', status: 'in-progress', lastCleaned: 'Now', nextService: 'Today' },
    { room: '202', status: 'clean', lastCleaned: '1 hour ago', nextService: 'Tomorrow' },
    { room: '203', status: 'dirty', lastCleaned: '2 days ago', nextService: 'Today' },
  ];

  const staff = [
    { id: 'S001', name: 'Maria Santos', role: 'Supervisor', tasksToday: 5, completed: 3, status: 'active' },
    { id: 'S002', name: 'John Doe', role: 'Cleaner', tasksToday: 4, completed: 2, status: 'active' },
    { id: 'S003', name: 'Sarah Lee', role: 'Cleaner', tasksToday: 6, completed: 4, status: 'active' },
    { id: 'S004', name: 'Mike Johnson', role: 'Inspector', tasksToday: 3, completed: 1, status: 'break' },
  ];

  const filteredTasks = tasks.filter(task =>
    filterStatus === 'all' || task.status === filterStatus
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'status-completed';
      case 'in-progress': return 'status-in-progress';
      case 'pending': return 'status-pending';
      case 'clean': return 'status-clean';
      case 'dirty': return 'status-dirty';
      case 'inspected': return 'status-inspected';
      case 'active': return 'status-active';
      case 'break': return 'status-break';
      default: return '';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  };

  const stats = {
    totalTasks: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    pending: tasks.filter(t => t.status === 'pending').length,
  };

  return (
    <AdminLayout>
      <style>{`
        .hk-header {
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

        .filter-buttons {
          display: flex;
          gap: 8px;
          margin-bottom: 24px;
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

        .tasks-grid {
          display: grid;
          gap: 16px;
        }

        .task-card {
          padding: 20px;
          border-radius: 12px;
          border: 1px solid rgba(0,0,0,0.06);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }

        .light-mode .task-card {
          background: #FFFFFF;
          box-shadow: 0 2px 4px rgba(28, 25, 23, 0.05);
        }

        .dark-mode .task-card {
          background: rgba(17, 24, 39, 0.75);
          border-color: rgba(255,255,255,0.08);
        }

        .task-info {
          flex: 1;
        }

        .task-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }

        .task-room {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-weight: 600;
        }

        .light-mode .task-room { color: #B45309; }
        .dark-mode .task-room { color: #F59E0B; }

        .priority-badge {
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .priority-high {
          background: rgba(239, 68, 68, 0.1);
          color: #DC2626;
        }

        .priority-medium {
          background: rgba(245, 158, 11, 0.1);
          color: #D97706;
        }

        .priority-low {
          background: rgba(59, 130, 246, 0.1);
          color: #2563EB;
        }

        .task-details {
          font-size: 0.85rem;
          opacity: 0.8;
          margin-bottom: 4px;
        }

        .task-meta {
          display: flex;
          gap: 16px;
          font-size: 0.8rem;
          opacity: 0.7;
        }

        .status-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .status-completed {
          background: rgba(16, 185, 129, 0.1);
          color: #059669;
          border: 1px solid rgba(16, 185, 129, 0.2);
        }

        .status-in-progress {
          background: rgba(59, 130, 246, 0.1);
          color: #2563EB;
          border: 1px solid rgba(59, 130, 246, 0.2);
        }

        .status-pending {
          background: rgba(245, 158, 11, 0.1);
          color: #D97706;
          border: 1px solid rgba(245, 158, 11, 0.2);
        }

        .status-clean {
          background: rgba(16, 185, 129, 0.1);
          color: #059669;
        }

        .status-dirty {
          background: rgba(239, 68, 68, 0.1);
          color: #DC2626;
        }

        .status-inspected {
          background: rgba(59, 130, 246, 0.1);
          color: #2563EB;
        }

        .status-active {
          background: rgba(16, 185, 129, 0.1);
          color: #059669;
        }

        .status-break {
          background: rgba(245, 158, 11, 0.1);
          color: #D97706;
        }

        .rooms-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 16px;
        }

        .room-status-card {
          padding: 16px;
          border-radius: 12px;
          border: 2px solid;
          text-align: center;
        }

        .room-status-card.status-clean {
          border-color: rgba(16, 185, 129, 0.3);
          background: rgba(16, 185, 129, 0.05);
        }

        .room-status-card.status-dirty {
          border-color: rgba(239, 68, 68, 0.3);
          background: rgba(239, 68, 68, 0.05);
        }

        .room-status-card.status-inspected {
          border-color: rgba(59, 130, 246, 0.3);
          background: rgba(59, 130, 246, 0.05);
        }

        .room-status-card.status-in-progress {
          border-color: rgba(245, 158, 11, 0.3);
          background: rgba(245, 158, 11, 0.05);
        }

        .room-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .light-mode .room-number { color: #1C1917; }
        .dark-mode .room-number { color: #F9FAFB; }

        .room-detail {
          font-size: 0.8rem;
          opacity: 0.7;
          margin-bottom: 4px;
        }

        .staff-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
        }

        .staff-card {
          padding: 20px;
          border-radius: 12px;
          border: 1px solid rgba(0,0,0,0.06);
        }

        .light-mode .staff-card {
          background: #FFFFFF;
        }

        .dark-mode .staff-card {
          background: rgba(17, 24, 39, 0.75);
          border-color: rgba(255,255,255,0.08);
        }

        .staff-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 12px;
        }

        .staff-name {
          font-weight: 600;
          font-size: 1.1rem;
        }

        .light-mode .staff-name { color: #1C1917; }
        .dark-mode .staff-name { color: #F9FAFB; }

        .staff-role {
          font-size: 0.85rem;
          opacity: 0.7;
        }

        .staff-progress {
          margin-top: 12px;
        }

        .progress-label {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          margin-bottom: 6px;
        }

        .progress-bar {
          width: 100%;
          height: 8px;
          background: rgba(0,0,0,0.1);
          border-radius: 4px;
          overflow: hidden;
        }

        .dark-mode .progress-bar {
          background: rgba(255,255,255,0.1);
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #10B981, #059669);
          transition: width 0.3s;
        }

        /* Mobile Responsiveness */
        @media (max-width: 768px) {
          .hk-header {
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

          .stat-value {
            font-size: 1.6rem;
          }

          .task-card {
            flex-direction: column;
            align-items: flex-start;
          }

          .rooms-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .staff-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .page-title {
            font-size: 1.5rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .rooms-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="hk-header">
        <h1 className="page-title">House Keeping Operations</h1>
        <div className="header-actions">
          <button className="action-btn">
            <span>➕</span>
            New Task
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-value">{stats.totalTasks}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-value">{stats.completed}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-value">{stats.inProgress}</div>
          <div className="stat-label">In Progress</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏰</div>
          <div className="stat-value">{stats.pending}</div>
          <div className="stat-label">Pending</div>
        </div>
      </div>

      <div className="tabs-container">
        <button
          className={`tab ${activeTab === 'tasks' ? 'active' : ''}`}
          onClick={() => setActiveTab('tasks')}
        >
          Tasks
        </button>
        <button
          className={`tab ${activeTab === 'rooms' ? 'active' : ''}`}
          onClick={() => setActiveTab('rooms')}
        >
          Room Status
        </button>
        <button
          className={`tab ${activeTab === 'staff' ? 'active' : ''}`}
          onClick={() => setActiveTab('staff')}
        >
          Staff
        </button>
      </div>

      {activeTab === 'tasks' && (
        <>
          <div className="filter-buttons">
            <button
              className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
              onClick={() => setFilterStatus('all')}
            >
              All
            </button>
            <button
              className={`filter-btn ${filterStatus === 'pending' ? 'active' : ''}`}
              onClick={() => setFilterStatus('pending')}
            >
              Pending
            </button>
            <button
              className={`filter-btn ${filterStatus === 'in-progress' ? 'active' : ''}`}
              onClick={() => setFilterStatus('in-progress')}
            >
              In Progress
            </button>
            <button
              className={`filter-btn ${filterStatus === 'completed' ? 'active' : ''}`}
              onClick={() => setFilterStatus('completed')}
            >
              Completed
            </button>
          </div>

          <div className="tasks-grid">
            {filteredTasks.map(task => (
              <div key={task.id} className="task-card">
                <div className="task-info">
                  <div className="task-header">
                    <div className="task-room">Room {task.room}</div>
                    <span className={`priority-badge ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                  <div className="task-details">{task.type}</div>
                  <div className="task-meta">
                    <span>👤 {task.assignedTo}</span>
                    <span>🕐 {task.dueTime}</span>
                  </div>
                </div>
                <span className={`status-badge ${getStatusColor(task.status)}`}>
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'rooms' && (
        <div className="rooms-grid">
          {roomStatus.map((room, idx) => (
            <div key={idx} className={`room-status-card ${getStatusColor(room.status)}`}>
              <div className="room-number">#{room.room}</div>
              <span className={`status-badge ${getStatusColor(room.status)}`}>
                {room.status}
              </span>
              <div className="room-detail">Last: {room.lastCleaned}</div>
              <div className="room-detail">Next: {room.nextService}</div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'staff' && (
        <div className="staff-grid">
          {staff.map(member => (
            <div key={member.id} className="staff-card">
              <div className="staff-header">
                <div>
                  <div className="staff-name">{member.name}</div>
                  <div className="staff-role">{member.role}</div>
                </div>
                <span className={`status-badge ${getStatusColor(member.status)}`}>
                  {member.status}
                </span>
              </div>
              <div className="staff-progress">
                <div className="progress-label">
                  <span>Tasks Today</span>
                  <span>{member.completed}/{member.tasksToday}</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${(member.completed / member.tasksToday) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminHouseKeepingOperations;
