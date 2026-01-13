import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

const AdminFrontOfficeSettings = () => {
  const [settings, setSettings] = useState({
    autoCheckIn: true,
    emailNotifications: true,
    smsNotifications: false,
    autoBackup: true,
    requireDeposit: true,
    allowOnlineBooking: true,
    showAvailability: true,
    enableLoyalty: false,
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

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

        .form-input {
          width: 100%;
          padding: 12px 16px;
          border-radius: 8px;
          border: 1px solid rgba(0,0,0,0.1);
          font-family: 'Montserrat', sans-serif;
          transition: all 0.3s;
        }

        .light-mode .form-input {
          background: #FFFFFF;
          color: #1C1917;
        }

        .dark-mode .form-input {
          background: rgba(17, 24, 39, 0.5);
          border-color: rgba(255,255,255,0.1);
          color: #F9FAFB;
        }

        .form-input:focus {
          outline: none;
          border-color: #B45309;
        }

        .dark-mode .form-input:focus {
          border-color: #F59E0B;
        }

        .form-select {
          width: 100%;
          padding: 12px 16px;
          border-radius: 8px;
          border: 1px solid rgba(0,0,0,0.1);
          font-family: 'Montserrat', sans-serif;
          transition: all 0.3s;
        }

        .light-mode .form-select {
          background: #FFFFFF;
          color: #1C1917;
        }

        .dark-mode .form-select {
          background: rgba(17, 24, 39, 0.5);
          border-color: rgba(255,255,255,0.1);
          color: #F9FAFB;
        }

        .form-select:focus {
          outline: none;
          border-color: #B45309;
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

        .integration-card {
          padding: 20px;
          border-radius: 12px;
          border: 1px solid rgba(0,0,0,0.06);
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .light-mode .integration-card {
          background: rgba(0,0,0,0.02);
        }

        .dark-mode .integration-card {
          background: rgba(255,255,255,0.02);
          border-color: rgba(255,255,255,0.08);
        }

        .integration-info {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .integration-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .light-mode .integration-icon {
          background: rgba(180, 83, 9, 0.1);
        }

        .dark-mode .integration-icon {
          background: rgba(245, 158, 11, 0.15);
        }

        .integration-details h4 {
          margin: 0 0 4px 0;
          font-weight: 600;
        }

        .light-mode .integration-details h4 { color: #1C1917; }
        .dark-mode .integration-details h4 { color: #F9FAFB; }

        .integration-details p {
          margin: 0;
          font-size: 0.85rem;
          opacity: 0.7;
        }

        .connect-btn {
          padding: 8px 20px;
          background: transparent;
          border: 2px solid;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 0.85rem;
        }

        .light-mode .connect-btn {
          border-color: #B45309;
          color: #B45309;
        }

        .dark-mode .connect-btn {
          border-color: #F59E0B;
          color: #F59E0B;
        }

        .connect-btn:hover {
          background: rgba(180, 83, 9, 0.1);
        }

        .dark-mode .connect-btn:hover {
          background: rgba(245, 158, 11, 0.15);
        }

        .connect-btn.connected {
          background: rgba(16, 185, 129, 0.1);
          border-color: #10B981;
          color: #059669;
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

          .integration-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }

          .connect-btn {
            width: 100%;
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

          .integration-info {
            flex-direction: column;
            align-items: flex-start;
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

          .connect-btn {
            padding: 12px 20px;
            min-height: 44px;
          }
        }
      `}</style>

      <div className="settings-header">
        <h1 className="page-title">Front Office Preferences</h1>
        <p className="page-subtitle">Customize your front office operations and preferences</p>
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
                <div className="setting-label">Auto Check-In</div>
                <div className="setting-description">Automatically check-in guests when they arrive</div>
              </div>
              <div
                className={`toggle-switch ${settings.autoCheckIn ? 'active' : ''}`}
                onClick={() => toggleSetting('autoCheckIn')}
              >
                <div className="toggle-slider"></div>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <div className="setting-label">Require Deposit</div>
                <div className="setting-description">Require advance deposit for reservations</div>
              </div>
              <div
                className={`toggle-switch ${settings.requireDeposit ? 'active' : ''}`}
                onClick={() => toggleSetting('requireDeposit')}
              >
                <div className="toggle-slider"></div>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <div className="setting-label">Online Booking</div>
                <div className="setting-description">Allow guests to book rooms online</div>
              </div>
              <div
                className={`toggle-switch ${settings.allowOnlineBooking ? 'active' : ''}`}
                onClick={() => toggleSetting('allowOnlineBooking')}
              >
                <div className="toggle-slider"></div>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <div className="setting-label">Show Availability</div>
                <div className="setting-description">Display real-time room availability on website</div>
              </div>
              <div
                className={`toggle-switch ${settings.showAvailability ? 'active' : ''}`}
                onClick={() => toggleSetting('showAvailability')}
              >
                <div className="toggle-slider"></div>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <div className="setting-label">Loyalty Program</div>
                <div className="setting-description">Enable guest loyalty rewards program</div>
              </div>
              <div
                className={`toggle-switch ${settings.enableLoyalty ? 'active' : ''}`}
                onClick={() => toggleSetting('enableLoyalty')}
              >
                <div className="toggle-slider"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="settings-section">
          <div className="section-header">
            <span className="section-icon">🔔</span>
            <h2 className="section-title">Notifications</h2>
          </div>
          <div className="settings-list">
            <div className="setting-item">
              <div className="setting-info">
                <div className="setting-label">Email Notifications</div>
                <div className="setting-description">Receive booking confirmations via email</div>
              </div>
              <div
                className={`toggle-switch ${settings.emailNotifications ? 'active' : ''}`}
                onClick={() => toggleSetting('emailNotifications')}
              >
                <div className="toggle-slider"></div>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <div className="setting-label">SMS Notifications</div>
                <div className="setting-description">Send SMS alerts for important updates</div>
              </div>
              <div
                className={`toggle-switch ${settings.smsNotifications ? 'active' : ''}`}
                onClick={() => toggleSetting('smsNotifications')}
              >
                <div className="toggle-slider"></div>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <div className="setting-label">Auto Backup</div>
                <div className="setting-description">Automatically backup data daily</div>
              </div>
              <div
                className={`toggle-switch ${settings.autoBackup ? 'active' : ''}`}
                onClick={() => toggleSetting('autoBackup')}
              >
                <div className="toggle-slider"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Business Information */}
        <div className="settings-section">
          <div className="section-header">
            <span className="section-icon">🏨</span>
            <h2 className="section-title">Business Information</h2>
          </div>
          <div className="form-group">
            <label className="form-label">Hotel Name</label>
            <input type="text" className="form-input" defaultValue="Hotel++" />
          </div>
          <div className="form-group">
            <label className="form-label">Contact Email</label>
            <input type="email" className="form-input" defaultValue="info@hotelplus.com" />
          </div>
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input type="tel" className="form-input" defaultValue="+91 98765 43210" />
          </div>
          <div className="form-group">
            <label className="form-label">Address</label>
            <input type="text" className="form-input" defaultValue="123 Main Street, City, State" />
          </div>
          <div className="form-group">
            <label className="form-label">Time Zone</label>
            <select className="form-select">
              <option>Asia/Kolkata (IST)</option>
              <option>Asia/Dubai (GST)</option>
              <option>Europe/London (GMT)</option>
              <option>America/New_York (EST)</option>
            </select>
          </div>
          <button className="save-btn">Save Changes</button>
        </div>

        {/* Integrations */}
        <div className="settings-section">
          <div className="section-header">
            <span className="section-icon">🔗</span>
            <h2 className="section-title">Integrations</h2>
          </div>

          <div className="integration-card">
            <div className="integration-info">
              <div className="integration-icon">📧</div>
              <div className="integration-details">
                <h4>Email Service</h4>
                <p>SendGrid integration for automated emails</p>
              </div>
            </div>
            <button className="connect-btn connected">Connected</button>
          </div>

          <div className="integration-card">
            <div className="integration-info">
              <div className="integration-icon">💳</div>
              <div className="integration-details">
                <h4>Payment Gateway</h4>
                <p>Razorpay for online payments</p>
              </div>
            </div>
            <button className="connect-btn connected">Connected</button>
          </div>

          <div className="integration-card">
            <div className="integration-info">
              <div className="integration-icon">📱</div>
              <div className="integration-details">
                <h4>SMS Service</h4>
                <p>Twilio for SMS notifications</p>
              </div>
            </div>
            <button className="connect-btn">Connect</button>
          </div>

          <div className="integration-card">
            <div className="integration-info">
              <div className="integration-icon">📊</div>
              <div className="integration-details">
                <h4>Analytics</h4>
                <p>Google Analytics for insights</p>
              </div>
            </div>
            <button className="connect-btn">Connect</button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminFrontOfficeSettings;
