import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

const AdminFrontOfficeSetup = () => {
    const [activeSection, setActiveSection] = useState('room-types');

    // Sample data
    const roomTypes = [
        { id: 1, name: 'Deluxe Suite', baseRate: 15000, capacity: 2, amenities: ['WiFi', 'TV', 'AC', 'Mini Bar'], count: 5 },
        { id: 2, name: 'Executive Room', baseRate: 10000, capacity: 2, amenities: ['WiFi', 'TV', 'AC'], count: 8 },
        { id: 3, name: 'Standard Room', baseRate: 8000, capacity: 2, amenities: ['WiFi', 'TV'], count: 12 },
        { id: 4, name: 'Family Suite', baseRate: 18000, capacity: 4, amenities: ['WiFi', 'TV', 'AC', 'Kitchen'], count: 3 },
    ];

    const ratePlans = [
        { id: 1, name: 'Standard Rate', discount: 0, description: 'Regular pricing' },
        { id: 2, name: 'Weekend Special', discount: 15, description: 'Friday-Sunday discount' },
        { id: 3, name: 'Corporate Rate', discount: 20, description: 'For business travelers' },
        { id: 4, name: 'Early Bird', discount: 25, description: 'Book 30 days in advance' },
    ];

    const taxes = [
        { id: 1, name: 'GST', rate: 12, type: 'percentage' },
        { id: 2, name: 'Service Charge', rate: 10, type: 'percentage' },
        { id: 3, name: 'Tourism Tax', rate: 100, type: 'fixed' },
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

        .config-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .config-card {
          padding: 24px;
          border-radius: 16px;
          border: 1px solid rgba(0,0,0,0.06);
          transition: all 0.3s;
        }

        .light-mode .config-card {
          background: #FFFFFF;
          box-shadow: 0 4px 6px -1px rgba(28, 25, 23, 0.05);
        }

        .dark-mode .config-card {
          background: rgba(17, 24, 39, 0.75);
          border-color: rgba(255,255,255,0.08);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5);
        }

        .config-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px -4px rgba(28, 25, 23, 0.15);
        }

        .dark-mode .config-card:hover {
          box-shadow: 0 12px 24px -4px rgba(0, 0, 0, 0.7);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 16px;
        }

        .card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-weight: 600;
        }

        .light-mode .card-title { color: #1C1917; }
        .dark-mode .card-title { color: #F9FAFB; }

        .card-actions {
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

        .card-detail {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          font-size: 0.9rem;
        }

        .detail-label {
          opacity: 0.7;
        }

        .detail-value {
          font-weight: 600;
        }

        .light-mode .detail-value { color: #B45309; }
        .dark-mode .detail-value { color: #F59E0B; }

        .amenities-list {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 12px;
        }

        .amenity-tag {
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .light-mode .amenity-tag {
          background: rgba(180, 83, 9, 0.1);
          color: #B45309;
        }

        .dark-mode .amenity-tag {
          background: rgba(245, 158, 11, 0.15);
          color: #F59E0B;
        }

        .discount-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 700;
          background: rgba(16, 185, 129, 0.1);
          color: #059669;
          border: 1px solid rgba(16, 185, 129, 0.2);
        }

        .card-description {
          font-size: 0.85rem;
          opacity: 0.7;
          margin-top: 8px;
        }

        .tax-type {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .light-mode .tax-type {
          background: rgba(0,0,0,0.05);
        }

        .dark-mode .tax-type {
          background: rgba(255,255,255,0.05);
        }

        /* Mobile Responsiveness */
        @media (max-width: 768px) {
          .page-title {
            font-size: 1.75rem;
          }

          .section-tabs {
            -webkit-overflow-scrolling: touch;
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

          .config-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .config-card {
            padding: 20px;
          }

          .card-title {
            font-size: 1.2rem;
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

          .config-card {
            padding: 16px;
          }

          .card-title {
            font-size: 1.1rem;
          }

          .card-detail {
            font-size: 0.85rem;
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
            padding: 10px 12px;
            min-height: 40px;
            min-width: 40px;
          }
        }
      `}</style>

            <div className="setup-header">
                <h1 className="page-title">Front Office Configuration</h1>
                <p className="page-subtitle">Manage room types, rate plans, taxes, and system settings</p>
            </div>

            <div className="section-tabs">
                <button
                    className={`section-tab ${activeSection === 'room-types' ? 'active' : ''}`}
                    onClick={() => setActiveSection('room-types')}
                >
                    Room Types
                </button>
                <button
                    className={`section-tab ${activeSection === 'rate-plans' ? 'active' : ''}`}
                    onClick={() => setActiveSection('rate-plans')}
                >
                    Rate Plans
                </button>
                <button
                    className={`section-tab ${activeSection === 'taxes' ? 'active' : ''}`}
                    onClick={() => setActiveSection('taxes')}
                >
                    Taxes & Fees
                </button>
                <button
                    className={`section-tab ${activeSection === 'policies' ? 'active' : ''}`}
                    onClick={() => setActiveSection('policies')}
                >
                    Policies
                </button>
            </div>

            {activeSection === 'room-types' && (
                <>
                    <div className="section-header">
                        <h2 className="section-title">Room Types</h2>
                        <button className="add-btn">
                            <span>➕</span>
                            Add Room Type
                        </button>
                    </div>

                    <div className="config-grid">
                        {roomTypes.map(type => (
                            <div key={type.id} className="config-card">
                                <div className="card-header">
                                    <div className="card-title">{type.name}</div>
                                    <div className="card-actions">
                                        <button className="icon-btn" title="Edit">✏️</button>
                                        <button className="icon-btn" title="Delete">🗑️</button>
                                    </div>
                                </div>
                                <div className="card-detail">
                                    <span className="detail-label">Base Rate:</span>
                                    <span className="detail-value">₹{type.baseRate.toLocaleString('en-IN')}/night</span>
                                </div>
                                <div className="card-detail">
                                    <span className="detail-label">Max Capacity:</span>
                                    <span className="detail-value">{type.capacity} Guests</span>
                                </div>
                                <div className="card-detail">
                                    <span className="detail-label">Total Rooms:</span>
                                    <span className="detail-value">{type.count}</span>
                                </div>
                                <div className="amenities-list">
                                    {type.amenities.map((amenity, idx) => (
                                        <span key={idx} className="amenity-tag">{amenity}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {activeSection === 'rate-plans' && (
                <>
                    <div className="section-header">
                        <h2 className="section-title">Rate Plans</h2>
                        <button className="add-btn">
                            <span>➕</span>
                            Add Rate Plan
                        </button>
                    </div>

                    <div className="config-grid">
                        {ratePlans.map(plan => (
                            <div key={plan.id} className="config-card">
                                <div className="card-header">
                                    <div className="card-title">{plan.name}</div>
                                    <div className="card-actions">
                                        <button className="icon-btn" title="Edit">✏️</button>
                                        <button className="icon-btn" title="Delete">🗑️</button>
                                    </div>
                                </div>
                                <div className="discount-badge">
                                    <span>🏷️</span>
                                    <span>{plan.discount}% Discount</span>
                                </div>
                                <p className="card-description">{plan.description}</p>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {activeSection === 'taxes' && (
                <>
                    <div className="section-header">
                        <h2 className="section-title">Taxes & Fees</h2>
                        <button className="add-btn">
                            <span>➕</span>
                            Add Tax
                        </button>
                    </div>

                    <div className="config-grid">
                        {taxes.map(tax => (
                            <div key={tax.id} className="config-card">
                                <div className="card-header">
                                    <div className="card-title">{tax.name}</div>
                                    <div className="card-actions">
                                        <button className="icon-btn" title="Edit">✏️</button>
                                        <button className="icon-btn" title="Delete">🗑️</button>
                                    </div>
                                </div>
                                <div className="card-detail">
                                    <span className="detail-label">Rate:</span>
                                    <span className="detail-value">
                                        {tax.type === 'percentage' ? `${tax.rate}%` : `₹${tax.rate}`}
                                    </span>
                                </div>
                                <div className="card-detail">
                                    <span className="detail-label">Type:</span>
                                    <span className="tax-type">{tax.type}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {activeSection === 'policies' && (
                <div style={{ textAlign: 'center', padding: '60px 20px', opacity: 0.6 }}>
                    <div style={{ fontSize: '4rem', marginBottom: '16px' }}>📋</div>
                    <div>Hotel policies configuration will be available here</div>
                </div>
            )}
        </AdminLayout>
    );
};

export default AdminFrontOfficeSetup;
