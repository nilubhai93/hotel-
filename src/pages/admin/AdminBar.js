import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

const AdminBar = () => {
  const [activeTab, setActiveTab] = useState('inventory');

  const inventory = [
    { id: 1, name: 'Whiskey', category: 'Spirits', stock: 25, unit: 'bottles', price: 2500, status: 'good' },
    { id: 2, name: 'Vodka', category: 'Spirits', stock: 8, unit: 'bottles', price: 1800, status: 'low' },
    { id: 3, name: 'Beer', category: 'Beer', stock: 120, unit: 'bottles', price: 200, status: 'good' },
    { id: 4, name: 'Wine', category: 'Wine', stock: 5, unit: 'bottles', price: 3500, status: 'critical' },
  ];

  const sales = [
    { drink: 'Whiskey', quantity: 15, revenue: 37500, date: 'Today' },
    { drink: 'Beer', quantity: 45, revenue: 9000, date: 'Today' },
    { drink: 'Wine', quantity: 8, revenue: 28000, date: 'Today' },
  ];

  const stats = {
    totalItems: inventory.length,
    lowStock: inventory.filter(i => i.status !== 'good').length,
    todayRevenue: sales.reduce((sum, s) => sum + s.revenue, 0),
    todaySales: sales.reduce((sum, s) => sum + s.quantity, 0),
  };

  return (
    <AdminLayout>
      <style>{`
        .bar-header {
          margin-bottom: 30px;
        }

        .page-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 600;
          margin: 0;
        }
        .light-mode .page-title { color: #1C1917; }
        .dark-mode .page-title { color: #F9FAFB; }

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

        .inventory-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
        }

        .inventory-card {
          padding: 20px;
          border-radius: 12px;
          border: 1px solid rgba(0,0,0,0.06);
        }

        .light-mode .inventory-card {
          background: #FFFFFF;
        }

        .dark-mode .inventory-card {
          background: rgba(17, 24, 39, 0.75);
          border-color: rgba(255,255,255,0.08);
        }

        .item-name {
          font-weight: 600;
          font-size: 1.1rem;
          margin-bottom: 4px;
        }

        .light-mode .item-name { color: #1C1917; }
        .dark-mode .item-name { color: #F9FAFB; }

        .item-category {
          font-size: 0.85rem;
          opacity: 0.7;
          margin-bottom: 12px;
        }

        .item-details {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          font-size: 0.85rem;
        }

        .item-price {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-weight: 600;
        }

        .light-mode .item-price { color: #B45309; }
        .dark-mode .item-price { color: #F59E0B; }

        .stock-status {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
          margin-top: 8px;
        }

        .stock-status.good {
          background: rgba(16, 185, 129, 0.1);
          color: #059669;
        }

        .stock-status.low {
          background: rgba(245, 158, 11, 0.1);
          color: #D97706;
        }

        .stock-status.critical {
          background: rgba(239, 68, 68, 0.1);
          color: #DC2626;
        }

        .sales-grid {
          display: grid;
          gap: 12px;
        }

        .sales-card {
          padding: 16px;
          border-radius: 12px;
          border: 1px solid rgba(0,0,0,0.06);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .light-mode .sales-card {
          background: #FFFFFF;
        }

        .dark-mode .sales-card {
          background: rgba(17, 24, 39, 0.75);
          border-color: rgba(255,255,255,0.08);
        }

        .sales-info h4 {
          margin: 0 0 4px 0;
          font-weight: 600;
        }

        .light-mode .sales-info h4 { color: #1C1917; }
        .dark-mode .sales-info h4 { color: #F9FAFB; }

        .sales-details {
          font-size: 0.85rem;
          opacity: 0.7;
        }

        .sales-revenue {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 600;
        }

        .light-mode .sales-revenue { color: #B45309; }
        .dark-mode .sales-revenue { color: #F59E0B; }

        /* Mobile Responsiveness */
        @media (max-width: 768px) {
          .page-title {
            font-size: 1.75rem;
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

          .inventory-grid {
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

          .stat-value {
            font-size: 1.4rem;
          }
        }
      `}</style>

      <div className="bar-header">
        <h1 className="page-title">Bar Management</h1>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🍸</div>
          <div className="stat-value">{stats.totalItems}</div>
          <div className="stat-label">Total Items</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⚠️</div>
          <div className="stat-value">{stats.lowStock}</div>
          <div className="stat-label">Low Stock</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-value">₹{stats.todayRevenue.toLocaleString('en-IN')}</div>
          <div className="stat-label">Today's Revenue</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-value">{stats.todaySales}</div>
          <div className="stat-label">Items Sold</div>
        </div>
      </div>

      <div className="tabs-container">
        <button
          className={`tab ${activeTab === 'inventory' ? 'active' : ''}`}
          onClick={() => setActiveTab('inventory')}
        >
          Inventory
        </button>
        <button
          className={`tab ${activeTab === 'sales' ? 'active' : ''}`}
          onClick={() => setActiveTab('sales')}
        >
          Sales
        </button>
      </div>

      {activeTab === 'inventory' && (
        <div className="inventory-grid">
          {inventory.map(item => (
            <div key={item.id} className="inventory-card">
              <div className="item-name">{item.name}</div>
              <div className="item-category">{item.category}</div>
              <div className="item-details">
                <span>Stock:</span>
                <span>{item.stock} {item.unit}</span>
              </div>
              <div className="item-price">₹{item.price}</div>
              <span className={`stock-status ${item.status}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'sales' && (
        <div className="sales-grid">
          {sales.map((sale, idx) => (
            <div key={idx} className="sales-card">
              <div className="sales-info">
                <h4>{sale.drink}</h4>
                <div className="sales-details">{sale.quantity} units • {sale.date}</div>
              </div>
              <div className="sales-revenue">₹{sale.revenue.toLocaleString('en-IN')}</div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminBar;
