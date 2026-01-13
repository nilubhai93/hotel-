import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

const AdminFrontOfficeBilling = () => {
  const [activeTab, setActiveTab] = useState('invoices');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Sample invoice data
  const invoices = [
    { id: 'INV-001', guestName: 'John Smith', room: '101', amount: 45000, paid: 45000, status: 'paid', date: '2026-01-14', dueDate: '2026-01-14' },
    { id: 'INV-002', guestName: 'Emma Wilson', room: '203', amount: 72000, paid: 36000, status: 'partial', date: '2026-01-13', dueDate: '2026-01-16' },
    { id: 'INV-003', guestName: 'Michael Brown', room: '305', amount: 54000, paid: 0, status: 'pending', date: '2026-01-15', dueDate: '2026-01-17' },
    { id: 'INV-004', guestName: 'Sarah Davis', room: '102', amount: 96000, paid: 96000, status: 'paid', date: '2026-01-12', dueDate: '2026-01-12' },
    { id: 'INV-005', guestName: 'James Miller', room: '201', amount: 60000, paid: 0, status: 'overdue', date: '2026-01-10', dueDate: '2026-01-13' },
  ];

  // Sample payment transactions
  const transactions = [
    { id: 'TXN-001', invoice: 'INV-001', amount: 45000, method: 'Credit Card', date: '2026-01-14 14:30', status: 'completed' },
    { id: 'TXN-002', invoice: 'INV-002', amount: 36000, method: 'Cash', date: '2026-01-13 16:15', status: 'completed' },
    { id: 'TXN-003', invoice: 'INV-004', amount: 96000, method: 'UPI', date: '2026-01-12 11:20', status: 'completed' },
    { id: 'TXN-004', invoice: 'INV-003', amount: 27000, method: 'Credit Card', date: '2026-01-15 10:00', status: 'pending' },
  ];

  const filteredInvoices = invoices.filter(inv => {
    const matchesStatus = filterStatus === 'all' || inv.status === filterStatus;
    const matchesSearch = inv.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.room.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'status-paid';
      case 'partial': return 'status-partial';
      case 'pending': return 'status-pending';
      case 'overdue': return 'status-overdue';
      case 'completed': return 'status-completed';
      default: return '';
    }
  };

  const stats = {
    totalRevenue: invoices.reduce((sum, inv) => sum + inv.amount, 0),
    collected: invoices.reduce((sum, inv) => sum + inv.paid, 0),
    pending: invoices.filter(i => i.status === 'pending').reduce((sum, inv) => sum + (inv.amount - inv.paid), 0),
    overdue: invoices.filter(i => i.status === 'overdue').reduce((sum, inv) => sum + (inv.amount - inv.paid), 0),
  };

  return (
    <AdminLayout>
      <style>{`
        .billing-header {
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
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
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
        }

        .stat-card.revenue::before { background: linear-gradient(90deg, #10B981, transparent); }
        .stat-card.collected::before { background: linear-gradient(90deg, #3B82F6, transparent); }
        .stat-card.pending::before { background: linear-gradient(90deg, #F59E0B, transparent); }
        .stat-card.overdue::before { background: linear-gradient(90deg, #EF4444, transparent); }

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

        .filters-section {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }

        .search-box {
          flex: 1;
          min-width: 250px;
          padding: 12px 20px;
          border-radius: 12px;
          border: 1px solid rgba(0,0,0,0.1);
          font-family: 'Montserrat', sans-serif;
          transition: all 0.3s;
        }

        .light-mode .search-box {
          background: #FFFFFF;
          color: #1C1917;
        }

        .dark-mode .search-box {
          background: rgba(17, 24, 39, 0.5);
          border-color: rgba(255,255,255,0.1);
          color: #F9FAFB;
        }

        .search-box:focus {
          outline: none;
          border-color: #B45309;
        }

        .filter-buttons {
          display: flex;
          gap: 8px;
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

        .data-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          border-radius: 16px;
          overflow: hidden;
        }

        .light-mode .data-table {
          background: #FFFFFF;
          box-shadow: 0 4px 6px -1px rgba(28, 25, 23, 0.05);
        }

        .dark-mode .data-table {
          background: rgba(17, 24, 39, 0.75);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5);
        }

        .data-table th {
          padding: 16px;
          text-align: left;
          font-weight: 600;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .light-mode .data-table th {
          background: #FAFAF9;
          color: #57534E;
          border-bottom: 2px solid rgba(0,0,0,0.06);
        }

        .dark-mode .data-table th {
          background: rgba(17, 24, 39, 0.9);
          color: #9CA3AF;
          border-bottom: 2px solid rgba(255,255,255,0.08);
        }

        .data-table td {
          padding: 16px;
          font-size: 0.9rem;
        }

        .light-mode .data-table td {
          color: #1C1917;
          border-bottom: 1px solid rgba(0,0,0,0.04);
        }

        .dark-mode .data-table td {
          color: #F9FAFB;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }

        .data-table tbody tr {
          transition: all 0.2s;
        }

        .light-mode .data-table tbody tr:hover {
          background: rgba(180, 83, 9, 0.03);
        }

        .dark-mode .data-table tbody tr:hover {
          background: rgba(245, 158, 11, 0.05);
        }

        .status-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: inline-block;
        }

        .status-paid {
          background: rgba(16, 185, 129, 0.1);
          color: #059669;
          border: 1px solid rgba(16, 185, 129, 0.2);
        }

        .status-partial {
          background: rgba(59, 130, 246, 0.1);
          color: #2563EB;
          border: 1px solid rgba(59, 130, 246, 0.2);
        }

        .status-pending {
          background: rgba(245, 158, 11, 0.1);
          color: #D97706;
          border: 1px solid rgba(245, 158, 11, 0.2);
        }

        .status-overdue {
          background: rgba(239, 68, 68, 0.1);
          color: #DC2626;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }

        .status-completed {
          background: rgba(16, 185, 129, 0.1);
          color: #059669;
          border: 1px solid rgba(16, 185, 129, 0.2);
        }

        .table-actions {
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

        .payment-method {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .light-mode .payment-method {
          background: rgba(0,0,0,0.05);
        }

        .dark-mode .payment-method {
          background: rgba(255,255,255,0.05);
        }

        .amount-display {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .light-mode .amount-display { color: #B45309; }
        .dark-mode .amount-display { color: #F59E0B; }

        .progress-bar {
          width: 100%;
          height: 8px;
          background: rgba(0,0,0,0.1);
          border-radius: 4px;
          overflow: hidden;
          margin-top: 4px;
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
          .billing-header {
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

          .filters-section {
            flex-direction: column;
          }

          .search-box {
            width: 100%;
            min-width: auto;
          }

          .filter-buttons {
            width: 100%;
            justify-content: space-between;
          }

          .filter-btn {
            flex: 1;
            min-width: 70px;
            padding: 10px 12px;
            font-size: 0.8rem;
          }

          .table-wrapper {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            margin: 0 -16px;
            padding: 0 16px;
          }

          .data-table {
            min-width: 900px;
          }

          .data-table th,
          .data-table td {
            padding: 12px 10px;
            font-size: 0.85rem;
          }
        }

        @media (max-width: 480px) {
          .page-title {
            font-size: 1.5rem;
          }

          .action-btn {
            padding: 10px 16px;
            font-size: 0.85rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .stat-value {
            font-size: 1.4rem;
          }

          .data-table {
            min-width: 800px;
          }

          .data-table th,
          .data-table td {
            padding: 10px 8px;
            font-size: 0.8rem;
          }

          .status-badge {
            padding: 4px 8px;
            font-size: 0.7rem;
          }
        }

        /* Touch device optimizations */
        @media (hover: none) and (pointer: coarse) {
          .action-btn {
            padding: 14px 24px;
            min-height: 48px;
          }

          .tab {
            padding: 14px 24px;
            min-height: 44px;
          }

          .filter-btn {
            padding: 12px 20px;
            min-height: 44px;
          }

          .icon-btn {
            padding: 10px 12px;
            min-height: 40px;
            min-width: 40px;
          }
        }
      `}</style>

      <div className="billing-header">
        <h1 className="page-title">Guest Billing & Invoices</h1>
        <div className="header-actions">
          <button className="action-btn">
            <span>➕</span>
            New Invoice
          </button>
          <button className="action-btn">
            <span>📥</span>
            Record Payment
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card revenue">
          <div className="stat-label">Total Revenue</div>
          <div className="stat-value">₹{stats.totalRevenue.toLocaleString('en-IN')}</div>
        </div>
        <div className="stat-card collected">
          <div className="stat-label">Collected</div>
          <div className="stat-value">₹{stats.collected.toLocaleString('en-IN')}</div>
        </div>
        <div className="stat-card pending">
          <div className="stat-label">Pending</div>
          <div className="stat-value">₹{stats.pending.toLocaleString('en-IN')}</div>
        </div>
        <div className="stat-card overdue">
          <div className="stat-label">Overdue</div>
          <div className="stat-value">₹{stats.overdue.toLocaleString('en-IN')}</div>
        </div>
      </div>

      <div className="tabs-container">
        <button
          className={`tab ${activeTab === 'invoices' ? 'active' : ''}`}
          onClick={() => setActiveTab('invoices')}
        >
          Invoices
        </button>
        <button
          className={`tab ${activeTab === 'transactions' ? 'active' : ''}`}
          onClick={() => setActiveTab('transactions')}
        >
          Transactions
        </button>
        <button
          className={`tab ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={() => setActiveTab('reports')}
        >
          Reports
        </button>
      </div>

      {activeTab === 'invoices' && (
        <>
          <div className="filters-section">
            <input
              type="text"
              className="search-box"
              placeholder="🔍 Search by guest name, invoice ID, or room..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="filter-buttons">
              <button
                className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
                onClick={() => setFilterStatus('all')}
              >
                All
              </button>
              <button
                className={`filter-btn ${filterStatus === 'paid' ? 'active' : ''}`}
                onClick={() => setFilterStatus('paid')}
              >
                Paid
              </button>
              <button
                className={`filter-btn ${filterStatus === 'pending' ? 'active' : ''}`}
                onClick={() => setFilterStatus('pending')}
              >
                Pending
              </button>
              <button
                className={`filter-btn ${filterStatus === 'overdue' ? 'active' : ''}`}
                onClick={() => setFilterStatus('overdue')}
              >
                Overdue
              </button>
            </div>
          </div>

          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Invoice ID</th>
                  <th>Guest Name</th>
                  <th>Room</th>
                  <th>Date</th>
                  <th>Due Date</th>
                  <th>Amount</th>
                  <th>Paid</th>
                  <th>Balance</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map(inv => (
                  <tr key={inv.id}>
                    <td><strong>{inv.id}</strong></td>
                    <td>{inv.guestName}</td>
                    <td>#{inv.room}</td>
                    <td>{inv.date}</td>
                    <td>{inv.dueDate}</td>
                    <td className="amount-display">₹{inv.amount.toLocaleString('en-IN')}</td>
                    <td>₹{inv.paid.toLocaleString('en-IN')}</td>
                    <td>₹{(inv.amount - inv.paid).toLocaleString('en-IN')}</td>
                    <td>
                      <span className={`status-badge ${getStatusColor(inv.status)}`}>
                        {inv.status}
                      </span>
                      {inv.status === 'partial' && (
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${(inv.paid / inv.amount) * 100}%` }}></div>
                        </div>
                      )}
                    </td>
                    <td>
                      <div className="table-actions">
                        <button className="icon-btn" title="View">👁️</button>
                        <button className="icon-btn" title="Print">🖨️</button>
                        <button className="icon-btn" title="Email">📧</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {activeTab === 'transactions' && (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Invoice</th>
                <th>Amount</th>
                <th>Payment Method</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(txn => (
                <tr key={txn.id}>
                  <td><strong>{txn.id}</strong></td>
                  <td>{txn.invoice}</td>
                  <td className="amount-display">₹{txn.amount.toLocaleString('en-IN')}</td>
                  <td>
                    <span className="payment-method">
                      {txn.method === 'Credit Card' && '💳'}
                      {txn.method === 'Cash' && '💵'}
                      {txn.method === 'UPI' && '📱'}
                      {txn.method}
                    </span>
                  </td>
                  <td>{txn.date}</td>
                  <td>
                    <span className={`status-badge ${getStatusColor(txn.status)}`}>
                      {txn.status}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button className="icon-btn" title="View">👁️</button>
                      <button className="icon-btn" title="Receipt">🧾</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'reports' && (
        <div style={{ textAlign: 'center', padding: '60px 20px', opacity: 0.6 }}>
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>📊</div>
          <div>Billing reports will be available here</div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminFrontOfficeBilling;
