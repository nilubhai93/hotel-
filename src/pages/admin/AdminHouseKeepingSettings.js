import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

const AdminHouseKeepingSettings = () => {
  const [settings, setSettings] = useState({
    autoAssignTasks: true,
    sendNotifications: true,
    requireInspection: true,
    trackTime: false,
    enableRating: true,
    autoSchedule: false,
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const qualityStandards = [
    { category: 'Cleanliness', score: 95, target: 90 },
    { category: 'Timeliness', score: 88, target: 85 },
    { category: 'Guest Satisfaction', score: 92, target: 90 },
    { category: 'Equipment Care', score: 85, target: 80 },
  ];

  return (
    <AdminLayout>
      <style>{`
        .settings-header {
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

        .settings-grid {
          display: grid;
          gap: 24px;
        }

        .settings-section {
          padding: 32px;
          border-radius: 16px;
          border: 1px solid rgba(0,0,0,0.06);
        }

        .light-mode .settings-section {
          background: #FFFFFF;
          box-shadow: 0 4px 6px -1px rgba(28, 25, 23, 0.05);
        }

        .dark-mode .settings-section {
          background: rgba(17, 24, 39, 0.75);
          border-color: rgba(255,255,255,0.08);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5);
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 2px solid rgba(0,0,0,0.06);
        }

        .dark-mode .section-header {
          border-bottom-color: rgba(255,255,255,0.08);
        }

        .section-icon {
          font-size: 2rem;
        }

        .section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0;
        }

        .light-mode .section-title { color: #1C1917; }
        .dark-mode .section-title { color: #F9FAFB; }

        .settings-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .setting-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          border-radius: 12px;
          transition: all 0.2s;
        }

        .light-mode .setting-item {
          background: rgba(0,0,0,0.02);
        }

        .dark-mode .setting-item {
          background: rgba(255,255,255,0.02);
        }

        .setting-item:hover {
          background: rgba(180, 83, 9, 0.05);
        }

        .setting-info {
          flex: 1;
        }

        .setting-label {
          font-weight: 600;
          font-size: 1rem;
          margin-bottom: 4px;
        }

        .light-mode .setting-label { color: #1C1917; }
        .dark-mode .setting-label { color: #F9FAFB; }

        .setting-description {
          font-size: 0.85rem;
          opacity: 0.7;
        }

        .toggle-switch {
          position: relative;
          width: 56px;
          height: 28px;
          background: rgba(0,0,0,0.1);
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .dark-mode .toggle-switch {
          background: rgba(255,255,255,0.1);
        }

        .toggle-switch.active {
          background: linear-gradient(45deg, #B45309, #D97706);
        }

        .dark-mode .toggle-switch.active {
          background: linear-gradient(45deg, #F59E0B, #FBBF24);
        }

        .toggle-slider {
          position: absolute;
          top: 2px;
          left: 2px;
          width: 24px;
          height: 24px;
          background: white;
          border-radius: 50%;
          transition: all 0.3s;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .toggle-switch.active .toggle-slider {
          left: 30px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          display: block;
          font-weight: 600;
          font-size: 0.9rem;
          margin-bottom: 8px;
        }

        .light-mode .form-label { color: #1C1917; }
        .dark-mode .form-label { color: #F9FAFB; }

        .form-input,
        .form-select {
          width: 100%;
          padding: 12px 16px;
          border-radius: 8px;
          border: 1px solid rgba(0,0,0,0.1);
          font-family: 'Montserrat', sans-serif;
          transition: all 0.3s;
        }

        .light-mode .form-input,
        .light-mode .form-select {
          background: #FFFFFF;
          color: #1C1917;
        }

        .dark-mode .form-input,
        .dark-mode .form-select {
          background: rgba(17, 24, 39, 0.5);
          border-color: rgba(255,255,255,0.1);
          color: #F9FAFB;
        }

        .form-input:focus,
        .form-select:focus {
          outline: none;
          border-color: #B45309;
        }

        .dark-mode .form-input:focus,
        .dark-mode .form-select:focus {
          border-color: #F59E0B;
        }

        .quality-grid {
          display: grid;
          gap: 16px;
        }

        .quality-card {
          padding: 20px;
          border-radius: 12px;
          border: 1px solid rgba(0,0,0,0.06);
        }

        .light-mode .quality-card {
          background: rgba(0,0,0,0.02);
        }

        .dark-mode .quality-card {
          background: rgba(255,255,255,0.02);
          border-color: rgba(255,255,255,0.08);
        }

        .quality-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .quality-name {
          font-weight: 600;
          font-size: 1rem;
        }

        .light-mode .quality-name { color: #1C1917; }
        .dark-mode .quality-name { color: #F9FAFB; }

        .quality-score {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 600;
        }

        .light-mode .quality-score { color: #B45309; }
        .dark-mode .quality-score { color: #F59E0B; }

        .progress-bar {
          width: 100%;
          height: 8px;
          background: rgba(0,0,0,0.1);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 8px;
        }

        .dark-mode .progress-bar {
          background: rgba(255,255,255,0.1);
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #10B981, #059669);
          transition: width 0.3s;
        }

        .progress-fill.warning {
          background: linear-gradient(90deg, #F59E0B, #D97706);
        }

        .target-label {
          font-size: 0.8rem;
          opacity: 0.7;
        }

        .save-btn {
          padding: 12px 32px;
          background: linear-gradient(45deg, #B45309, #D97706);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 0.9rem;
        }

        .save-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(180, 83, 9, 0.3);
        }

        .dark-mode .save-btn {
          background: linear-gradient(45deg, #F59E0B, #FBBF24);
        }

        /* Mobile Responsiveness */
        @media (max-width: 768px) {
          .page-title {
            font-size: 1.75rem;
          }

          .settings-section {
            padding: 24px;
          }

          .section-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .section-icon {
            font-size: 1.5rem;
          }

          .section-title {
            font-size: 1.3rem;
          }

          .setting-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .toggle-switch {
            align-self: flex-end;
          }
        }

        @media (max-width: 480px) {
          .page-title {
            font-size: 1.5rem;
          }

          .settings-section {
            padding: 20px;
          }

          .section-title {
            font-size: 1.2rem;
          }

          .setting-label {
            font-size: 0.9rem;
          }

          .setting-description {
            font-size: 0.8rem;
          }
        }

        /* Touch device optimizations */
        @media (hover: none) and (pointer: coarse) {
          .toggle-switch {
            width: 64px;
            height: 32px;
          }

          .toggle-slider {
            width: 28px;
            height: 28px;
          }

          .toggle-switch.active .toggle-slider {
            left: 34px;
          }

          .save-btn {
            padding: 14px 32px;
            min-height: 48px;
          }
        }
      `}</style>

      <div className="settings-header">
        <h1 className="page-title">House Keeping Configuration</h1>
        <p className="page-subtitle">Customize house keeping operations and preferences</p>
      </div>

      <div className="settings-grid">
        {/* General Settings */}
        <div className="settings-section">
          <div className="section-header">
            <span className="section-icon">⚙️</span>
            <h2 className="section-title">General Settings</h2>
          </div>
          <div className="settings-list">
            <div className="setting-item">
              <div className="setting-info">
                <div className="setting-label">Auto-Assign Tasks</div>
                <div className="setting-description">Automatically assign tasks to available staff</div>
              </div>
              <div
                className={`toggle-switch ${settings.autoAssignTasks ? 'active' : ''}`}
                onClick={() => toggleSetting('autoAssignTasks')}
              >
                <div className="toggle-slider"></div>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <div className="setting-label">Send Notifications</div>
                <div className="setting-description">Notify staff about new tasks and updates</div>
              </div>
              <div
                className={`toggle-switch ${settings.sendNotifications ? 'active' : ''}`}
                onClick={() => toggleSetting('sendNotifications')}
              >
                <div className="toggle-slider"></div>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <div className="setting-label">Require Inspection</div>
                <div className="setting-description">Mandatory quality inspection after cleaning</div>
              </div>
              <div
                className={`toggle-switch ${settings.requireInspection ? 'active' : ''}`}
                onClick={() => toggleSetting('requireInspection')}
              >
                <div className="toggle-slider"></div>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <div className="setting-label">Track Time</div>
                <div className="setting-description">Monitor time spent on each task</div>
              </div>
              <div
                className={`toggle-switch ${settings.trackTime ? 'active' : ''}`}
                onClick={() => toggleSetting('trackTime')}
              >
                <div className="toggle-slider"></div>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <div className="setting-label">Enable Rating</div>
                <div className="setting-description">Allow guests to rate room cleanliness</div>
              </div>
              <div
                className={`toggle-switch ${settings.enableRating ? 'active' : ''}`}
                onClick={() => toggleSetting('enableRating')}
              >
                <div className="toggle-slider"></div>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <div className="setting-label">Auto Schedule</div>
                <div className="setting-description">Automatically create daily cleaning schedules</div>
              </div>
              <div
                className={`toggle-switch ${settings.autoSchedule ? 'active' : ''}`}
                onClick={() => toggleSetting('autoSchedule')}
              >
                <div className="toggle-slider"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Task Configuration */}
        <div className="settings-section">
          <div className="section-header">
            <span className="section-icon">📋</span>
            <h2 className="section-title">Task Configuration</h2>
          </div>
          <div className="form-group">
            <label className="form-label">Default Task Priority</label>
            <select className="form-select">
              <option>Medium</option>
              <option>High</option>
              <option>Low</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Task Completion Time Limit (minutes)</label>
            <input type="number" className="form-input" defaultValue="45" />
          </div>
          <div className="form-group">
            <label className="form-label">Break Time Between Tasks (minutes)</label>
            <input type="number" className="form-input" defaultValue="15" />
          </div>
          <div className="form-group">
            <label className="form-label">Max Tasks Per Staff Per Day</label>
            <input type="number" className="form-input" defaultValue="8" />
          </div>
          <button className="save-btn">Save Configuration</button>
        </div>

        {/* Quality Standards */}
        <div className="settings-section">
          <div className="section-header">
            <span className="section-icon">⭐</span>
            <h2 className="section-title">Quality Standards</h2>
          </div>
          <div className="quality-grid">
            {qualityStandards.map((standard, idx) => (
              <div key={idx} className="quality-card">
                <div className="quality-header">
                  <div className="quality-name">{standard.category}</div>
                  <div className="quality-score">{standard.score}%</div>
                </div>
                <div className="progress-bar">
                  <div
                    className={`progress-fill ${standard.score < standard.target ? 'warning' : ''}`}
                    style={{ width: `${standard.score}%` }}
                  ></div>
                </div>
                <div className="target-label">Target: {standard.target}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="settings-section">
          <div className="section-header">
            <span className="section-icon">🔔</span>
            <h2 className="section-title">Notification Preferences</h2>
          </div>
          <div className="form-group">
            <label className="form-label">Notification Method</label>
            <select className="form-select">
              <option>Email & SMS</option>
              <option>Email Only</option>
              <option>SMS Only</option>
              <option>In-App Only</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Notify When</label>
            <select className="form-select">
              <option>Task Assigned</option>
              <option>Task Completed</option>
              <option>Task Overdue</option>
              <option>All Events</option>
            </select>
          </div>
          <button className="save-btn">Save Preferences</button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminHouseKeepingSettings;
