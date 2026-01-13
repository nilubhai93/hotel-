import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

const AdminStores = () => {
  const [activeTab, setActiveTab] = useState('inventory');

  const inventory = [
    { id: 1, item: 'Bed Linen', category: 'Housekeeping', stock: 150, unit: 'sets', reorderLevel: 50, status: 'good' },
    { id: 2, item: 'Toiletries', category: 'Amenities', stock: 45, unit: 'boxes', reorderLevel: 50, status: 'low' },
    { id: 3, item: 'Cleaning Supplies', category: 'Housekeeping', stock: 20, unit: 'kits', reorderLevel: 30, status: 'critical' },
    { id: 4, item: 'Towels', category: 'Housekeeping', stock: 200, unit: 'pieces', reorderLevel: 100, status: 'good' },
  ];

  const purchaseOrders = [
    { id: 'PO001', supplier: 'ABC Supplies', items: 5, amount: 25000, status: 'pending', date: '2026-01-15' },
    { id: 'PO002', supplier: 'XYZ Traders', items: 3, amount: 18000, status: 'approved', date: '2026-01-14' },
    { id: 'PO003', supplier: 'Global Imports', items: 8, amount: 45000, status: 'delivered', date: '2026-01-12' },
  ];

  const suppliers = [
    { name: 'ABC Supplies', category: 'Housekeeping', contact: '+91 98765 43210', rating: 4.5 },
    { name: 'XYZ Traders', category: 'Amenities', contact: '+91 98765 43211', rating: 4.0 },
    { name: 'Global Imports', category: 'General', contact: '+91 98765 43212', rating: 4.8 },
  ];

  const stats = {
    totalItems: inventory.length,
    lowStock: inventory.filter(i => i.status !== 'good').length,
    pendingPOs: purchaseOrders.filter(po => po.status === 'pending').length,
    totalSuppliers: suppliers.length,
  };

  return (
    <AdminLayout>
      <style>{`
        .stores-header {
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

        .item-info h4 {
          margin: 0 0 4px 0;
          font-weight: 600;
        }

        .light-mode .item-info h4 { color: #1C1917; }
        .dark-mode .item-info h4 { color: #F9FAFB; }

        .item-details {
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

        .po-grid {
          display: grid;
          gap: 16px;
        }

        .po-card {
          padding: 20px;
          border-radius: 12px;
          border: 1px solid rgba(0,0,0,0.06);
        }

        .light-mode .po-card {
          background: #FFFFFF;
        }

        .dark-mode .po-card {
          background: rgba(17, 24, 39, 0.75);
          border-color: rgba(255,255,255,0.08);
        }

        .po-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 12px;
        }

        .po-id {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-weight: 600;
        }

        .light-mode .po-id { color: #B45309; }
        .dark-mode .po-id { color: #F59E0B; }

        .po-status {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .po-status.pending {
          background: rgba(245, 158, 11, 0.1);
          color: #D97706;
        }

        .po-status.approved {
          background: rgba(59, 130, 246, 0.1);
          color: #2563EB;
        }

        .po-status.delivered {
          background: rgba(16, 185, 129, 0.1);
          color: #059669;
        }

        .po-details {
          font-size: 0.85rem;
          opacity: 0.8;
        }

        .supplier-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
        }

        .supplier-card {
          padding: 20px;
          border-radius: 12px;
          border: 1px solid rgba(0,0,0,0.06);
        }

        .light-mode .supplier-card {
          background: #FFFFFF;
        }

        .dark-mode .supplier-card {
          background: rgba(17, 24, 39, 0.75);
          border-color: rgba(255,255,255,0.08);
        }

        .supplier-name {
          font-weight: 600;
          font-size: 1.1rem;
          margin-bottom: 4px;
        }

        .light-mode .supplier-name { color: #1C1917; }
        .dark-mode .supplier-name { color: #F9FAFB; }

        .supplier-category {
          font-size: 0.85rem;
          opacity: 0.7;
          margin-bottom: 12px;
        }

        .supplier-contact {
          font-size: 0.85rem;
          margin-bottom: 8px;
        }

        .rating {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .light-mode .rating {
          background: rgba(180, 83, 9, 0.1);
          color: #B45309;
        }

        .dark-mode .rating {
          background: rgba(245, 158, 11, 0.15);
          color: #F59E0B;
        }

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

          .supplier-grid {
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

      <div className="stores-header">
        <h1 className="page-title">Stores Management</h1>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-value">{stats.totalItems}</div>
          <div className="stat-label">Total Items</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⚠️</div>
          <div className="stat-value">{stats.lowStock}</div>
          <div className="stat-label">Low Stock</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-value">{stats.pendingPOs}</div>
          <div className="stat-label">Pending POs</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏪</div>
          <div className="stat-value">{stats.totalSuppliers}</div>
          <div className="stat-label">Suppliers</div>
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
          className={`tab ${activeTab === 'purchase-orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('purchase-orders')}
        >
          Purchase Orders
        </button>
        <button
          className={`tab ${activeTab === 'suppliers' ? 'active' : ''}`}
          onClick={() => setActiveTab('suppliers')}
        >
          Suppliers
        </button>
      </div>

      {activeTab === 'inventory' && (
        <div className="inventory-grid">
          {inventory.map(item => (
            <div key={item.id} className="inventory-card">
              <div className="item-info">
                <h4>{item.item}</h4>
                <div className="item-details">
                  {item.category} • {item.stock} {item.unit} (Reorder: {item.reorderLevel})
                </div>
              </div>
              <span className={`stock-status ${item.status}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'purchase-orders' && (
        <div className="po-grid">
          {purchaseOrders.map(po => (
            <div key={po.id} className="po-card">
              <div className="po-header">
                <div className="po-id">{po.id}</div>
                <span className={`po-status ${po.status}`}>
                  {po.status}
                </span>
              </div>
              <div className="po-details">
                {po.supplier} • {po.items} items • ₹{po.amount.toLocaleString('en-IN')} • {po.date}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'suppliers' && (
        <div className="supplier-grid">
          {suppliers.map((supplier, idx) => (
            <div key={idx} className="supplier-card">
              <div className="supplier-name">{supplier.name}</div>
              <div className="supplier-category">{supplier.category}</div>
              <div className="supplier-contact">📱 {supplier.contact}</div>
              <span className="rating">⭐ {supplier.rating}</span>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminStores;
