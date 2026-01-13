import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

const AdminKitchen = () => {
  const [activeTab, setActiveTab] = useState('orders');

  // Sample data
  const orders = [
    { id: 'ORD001', table: '12', items: 3, amount: 2500, status: 'preparing', time: '10 mins ago', waiter: 'John' },
    { id: 'ORD002', table: '05', items: 2, amount: 1800, status: 'ready', time: '5 mins ago', waiter: 'Sarah' },
    { id: 'ORD003', table: 'Room 201', items: 4, amount: 3200, status: 'preparing', time: '15 mins ago', waiter: 'Room Service' },
    { id: 'ORD004', table: '08', items: 5, amount: 4500, status: 'pending', time: '2 mins ago', waiter: 'Mike' },
  ];

  const menuItems = [
    { id: 1, name: 'Butter Chicken', category: 'Main Course', price: 450, available: true },
    { id: 2, name: 'Paneer Tikka', category: 'Starters', price: 350, available: true },
    { id: 3, name: 'Biryani', category: 'Main Course', price: 400, available: false },
    { id: 4, name: 'Dal Makhani', category: 'Main Course', price: 300, available: true },
  ];

  const inventory = [
    { item: 'Rice', quantity: 50, unit: 'kg', status: 'good', reorderLevel: 20 },
    { item: 'Chicken', quantity: 15, unit: 'kg', status: 'low', reorderLevel: 20 },
    { item: 'Paneer', quantity: 8, unit: 'kg', status: 'critical', reorderLevel: 10 },
    { item: 'Vegetables', quantity: 30, unit: 'kg', status: 'good', reorderLevel: 15 },
  ];

  const stats = {
    activeOrders: orders.filter(o => o.status !== 'completed').length,
    todayRevenue: 45000,
    menuItems: menuItems.length,
    lowStock: inventory.filter(i => i.status !== 'good').length,
  };

  return (
    <AdminLayout>
      <style>{`
        .kitchen-header {
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

        .orders-grid {
          display: grid;
          gap: 16px;
        }

        .order-card {
          padding: 20px;
          border-radius: 12px;
          border: 1px solid rgba(0,0,0,0.06);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }

        .light-mode .order-card {
          background: #FFFFFF;
        }

        .dark-mode .order-card {
          background: rgba(17, 24, 39, 0.75);
          border-color: rgba(255,255,255,0.08);
        }

        .order-info {
          flex: 1;
        }

        .order-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }

        .order-id {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-weight: 600;
        }

        .light-mode .order-id { color: #B45309; }
        .dark-mode .order-id { color: #F59E0B; }

        .order-details {
          font-size: 0.85rem;
          opacity: 0.8;
          margin-bottom: 4px;
        }

        .order-meta {
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
        }

        .status-badge.pending {
          background: rgba(245, 158, 11, 0.1);
          color: #D97706;
        }

        .status-badge.preparing {
          background: rgba(59, 130, 246, 0.1);
          color: #2563EB;
        }

        .status-badge.ready {
          background: rgba(16, 185, 129, 0.1);
          color: #059669;
        }

        .menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
        }

        .menu-card {
          padding: 20px;
          border-radius: 12px;
          border: 1px solid rgba(0,0,0,0.06);
        }

        .light-mode .menu-card {
          background: #FFFFFF;
        }

        .dark-mode .menu-card {
          background: rgba(17, 24, 39, 0.75);
          border-color: rgba(255,255,255,0.08);
        }

        .menu-name {
          font-weight: 600;
          font-size: 1.1rem;
          margin-bottom: 4px;
        }

        .light-mode .menu-name { color: #1C1917; }
        .dark-mode .menu-name { color: #F9FAFB; }

        .menu-category {
          font-size: 0.85rem;
          opacity: 0.7;
          margin-bottom: 12px;
        }

        .menu-price {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 600;
        }

        .light-mode .menu-price { color: #B45309; }
        .dark-mode .menu-price { color: #F59E0B; }

        .availability-badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
          margin-top: 8px;
        }

        .availability-badge.available {
          background: rgba(16, 185, 129, 0.1);
          color: #059669;
        }

        .availability-badge.unavailable {
          background: rgba(239, 68, 68, 0.1);
          color: #DC2626;
        }

        .inventory-grid {
          display: grid;
          gap: 12px;
        }

        .inventory-card {
          padding: 16px;
          border-radius: 12px;
          border: 1px solid rgba(0,0,0,0.06);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .light-mode .inventory-card {
          background: #FFFFFF;
        }

        .dark-mode .inventory-card {
          background: rgba(17, 24, 39, 0.75);
          border-color: rgba(255,255,255,0.08);
        }

        .inventory-info h4 {
          margin: 0 0 4px 0;
          font-weight: 600;
        }

        .light-mode .inventory-info h4 { color: #1C1917; }
        .dark-mode .inventory-info h4 { color: #F9FAFB; }

        .inventory-quantity {
          font-size: 0.85rem;
          opacity: 0.7;
        }

        .stock-status {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
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

        /* Mobile Responsiveness */
        @media (max-width: 768px) {
          .kitchen-header {
            flex-direction: column;
            align-items: flex-start;
          }

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

          .order-card {
            flex-direction: column;
            align-items: flex-start;
          }

          .menu-grid {
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

      <div className="kitchen-header">
        <h1 className="page-title">Kitchen & Restaurant</h1>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-value">{stats.activeOrders}</div>
          <div className="stat-label">Active Orders</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-value">₹{stats.todayRevenue.toLocaleString('en-IN')}</div>
          <div className="stat-label">Today's Revenue</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🍽️</div>
          <div className="stat-value">{stats.menuItems}</div>
          <div className="stat-label">Menu Items</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⚠️</div>
          <div className="stat-value">{stats.lowStock}</div>
          <div className="stat-label">Low Stock Items</div>
        </div>
      </div>

      <div className="tabs-container">
        <button
          className={`tab ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
        <button
          className={`tab ${activeTab === 'menu' ? 'active' : ''}`}
          onClick={() => setActiveTab('menu')}
        >
          Menu
        </button>
        <button
          className={`tab ${activeTab === 'inventory' ? 'active' : ''}`}
          onClick={() => setActiveTab('inventory')}
        >
          Inventory
        </button>
      </div>

      {activeTab === 'orders' && (
        <div className="orders-grid">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-info">
                <div className="order-header">
                  <div className="order-id">{order.id}</div>
                </div>
                <div className="order-details">Table: {order.table} • {order.items} items • ₹{order.amount}</div>
                <div className="order-meta">
                  <span>👤 {order.waiter}</span>
                  <span>🕐 {order.time}</span>
                </div>
              </div>
              <span className={`status-badge ${order.status}`}>
                {order.status}
              </span>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'menu' && (
        <div className="menu-grid">
          {menuItems.map(item => (
            <div key={item.id} className="menu-card">
              <div className="menu-name">{item.name}</div>
              <div className="menu-category">{item.category}</div>
              <div className="menu-price">₹{item.price}</div>
              <span className={`availability-badge ${item.available ? 'available' : 'unavailable'}`}>
                {item.available ? 'Available' : 'Unavailable'}
              </span>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'inventory' && (
        <div className="inventory-grid">
          {inventory.map((item, idx) => (
            <div key={idx} className="inventory-card">
              <div className="inventory-info">
                <h4>{item.item}</h4>
                <div className="inventory-quantity">{item.quantity} {item.unit} (Reorder: {item.reorderLevel} {item.unit})</div>
              </div>
              <span className={`stock-status ${item.status}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminKitchen;
