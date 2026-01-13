import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

const AdminAccounts = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const transactions = [
    { id: 'TXN001', type: 'Income', category: 'Room Booking', amount: 45000, date: '2026-01-14', status: 'completed' },
    { id: 'TXN002', type: 'Expense', category: 'Supplies', amount: 12000, date: '2026-01-14', status: 'completed' },
    { id: 'TXN003', type: 'Income', category: 'Restaurant', amount: 8500, date: '2026-01-13', status: 'completed' },
    { id: 'TXN004', type: 'Expense', category: 'Salaries', amount: 150000, date: '2026-01-12', status: 'pending' },
  ];

  const invoices = [
    { id: 'INV001', client: 'ABC Corp', amount: 250000, status: 'paid', dueDate: '2026-01-15' },
    { id: 'INV002', client: 'XYZ Ltd', amount: 180000, status: 'pending', dueDate: '2026-01-20' },
    { id: 'INV003', client: 'Global Inc', amount: 320000, status: 'overdue', dueDate: '2026-01-10' },
  ];

  const expenses = [
    { category: 'Salaries', amount: 450000, percentage: 40 },
    { category: 'Utilities', amount: 125000, percentage: 11 },
    { category: 'Supplies', amount: 180000, percentage: 16 },
    { category: 'Maintenance', amount: 95000, percentage: 8 },
    { category: 'Other', amount: 275000, percentage: 25 },
  ];

  const stats = {
    totalIncome: transactions.filter(t => t.type === 'Income').reduce((sum, t) => sum + t.amount, 0),
    totalExpense: transactions.filter(t => t.type === 'Expense').reduce((sum, t) => sum + t.amount, 0),
    pendingInvoices: invoices.filter(i => i.status === 'pending').length,
    overdueInvoices: invoices.filter(i => i.status === 'overdue').length,
  };

  return (
    <AdminLayout>
      <style>{`
        .accounts-header {
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
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
        }

        .stat-card.income::before {
          background: linear-gradient(90deg, #10B981, transparent);
        }

        .stat-card.expense::before {
          background: linear-gradient(90deg, #EF4444, transparent);
        }

        .stat-card.pending::before {
          background: linear-gradient(90deg, #F59E0B, transparent);
        }

        .stat-label {
          font-size: 0.85rem;
          opacity: 0.7;
          margin-bottom: 8px;
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

        .transactions-grid {
          display: grid;
          gap: 12px;
        }

        .transaction-card {
          padding: 16px;
          border-radius: 12px;
          border: 1px solid rgba(0,0,0,0.06);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .light-mode .transaction-card {
          background: #FFFFFF;
        }

        .dark-mode .transaction-card {
          background: rgba(17, 24, 39, 0.75);
          border-color: rgba(255,255,255,0.08);
        }

        .txn-info h4 {
          margin: 0 0 4px 0;
          font-weight: 600;
        }

        .light-mode .txn-info h4 { color: #1C1917; }
        .dark-mode .txn-info h4 { color: #F9FAFB; }

        .txn-details {
          font-size: 0.85rem;
          opacity: 0.7;
        }

        .txn-amount {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 600;
        }

        .txn-amount.income {
          color: #10B981;
        }

        .txn-amount.expense {
          color: #EF4444;
        }

        .invoice-grid {
          display: grid;
          gap: 16px;
        }

        .invoice-card {
          padding: 20px;
          border-radius: 12px;
          border: 1px solid rgba(0,0,0,0.06);
        }

        .light-mode .invoice-card {
          background: #FFFFFF;
        }

        .dark-mode .invoice-card {
          background: rgba(17, 24, 39, 0.75);
          border-color: rgba(255,255,255,0.08);
        }

        .invoice-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 12px;
        }

        .invoice-id {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-weight: 600;
        }

        .light-mode .invoice-id { color: #B45309; }
        .dark-mode .invoice-id { color: #F59E0B; }

        .invoice-status {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .invoice-status.paid {
          background: rgba(16, 185, 129, 0.1);
          color: #059669;
        }

        .invoice-status.pending {
          background: rgba(245, 158, 11, 0.1);
          color: #D97706;
        }

        .invoice-status.overdue {
          background: rgba(239, 68, 68, 0.1);
          color: #DC2626;
        }

        .expense-grid {
          display: grid;
          gap: 16px;
        }

        .expense-card {
          padding: 20px;
          border-radius: 12px;
          border: 1px solid rgba(0,0,0,0.06);
        }

        .light-mode .expense-card {
          background: #FFFFFF;
        }

        .dark-mode .expense-card {
          background: rgba(17, 24, 39, 0.75);
          border-color: rgba(255,255,255,0.08);
        }

        .expense-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .expense-category {
          font-weight: 600;
          font-size: 1rem;
        }

        .light-mode .expense-category { color: #1C1917; }
        .dark-mode .expense-category { color: #F9FAFB; }

        .expense-amount {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-weight: 600;
        }

        .light-mode .expense-amount { color: #B45309; }
        .dark-mode .expense-amount { color: #F59E0B; }

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
          background: linear-gradient(90deg, #EF4444, #DC2626);
          transition: width 0.3s;
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

          .transaction-card,
          .invoice-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
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

      <div className="accounts-header">
        <h1 className="page-title">Accounts & Finance</h1>
      </div>

      <div className="stats-grid">
        <div className="stat-card income">
          <div className="stat-label">Total Income</div>
          <div className="stat-value">₹{stats.totalIncome.toLocaleString('en-IN')}</div>
        </div>
        <div className="stat-card expense">
          <div className="stat-label">Total Expense</div>
          <div className="stat-value">₹{stats.totalExpense.toLocaleString('en-IN')}</div>
        </div>
        <div className="stat-card pending">
          <div className="stat-label">Pending Invoices</div>
          <div className="stat-value">{stats.pendingInvoices}</div>
        </div>
        <div className="stat-card expense">
          <div className="stat-label">Overdue Invoices</div>
          <div className="stat-value">{stats.overdueInvoices}</div>
        </div>
      </div>

      <div className="tabs-container">
        <button
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`tab ${activeTab === 'transactions' ? 'active' : ''}`}
          onClick={() => setActiveTab('transactions')}
        >
          Transactions
        </button>
        <button
          className={`tab ${activeTab === 'invoices' ? 'active' : ''}`}
          onClick={() => setActiveTab('invoices')}
        >
          Invoices
        </button>
        <button
          className={`tab ${activeTab === 'expenses' ? 'active' : ''}`}
          onClick={() => setActiveTab('expenses')}
        >
          Expenses
        </button>
      </div>

      {activeTab === 'overview' && (
        <div style={{ textAlign: 'center', padding: '60px 20px', opacity: 0.6 }}>
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>📊</div>
          <div>Financial overview dashboard coming soon</div>
        </div>
      )}

      {activeTab === 'transactions' && (
        <div className="transactions-grid">
          {transactions.map(txn => (
            <div key={txn.id} className="transaction-card">
              <div className="txn-info">
                <h4>{txn.id}</h4>
                <div className="txn-details">{txn.category} • {txn.date}</div>
              </div>
              <div className={`txn-amount ${txn.type.toLowerCase()}`}>
                {txn.type === 'Income' ? '+' : '-'}₹{txn.amount.toLocaleString('en-IN')}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'invoices' && (
        <div className="invoice-grid">
          {invoices.map(invoice => (
            <div key={invoice.id} className="invoice-card">
              <div className="invoice-header">
                <div className="invoice-id">{invoice.id}</div>
                <span className={`invoice-status ${invoice.status}`}>
                  {invoice.status}
                </span>
              </div>
              <div className="txn-details">
                {invoice.client} • ₹{invoice.amount.toLocaleString('en-IN')} • Due: {invoice.dueDate}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'expenses' && (
        <div className="expense-grid">
          {expenses.map((expense, idx) => (
            <div key={idx} className="expense-card">
              <div className="expense-header">
                <div className="expense-category">{expense.category}</div>
                <div className="expense-amount">₹{expense.amount.toLocaleString('en-IN')}</div>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${expense.percentage}%` }}></div>
              </div>
              <div style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '8px' }}>
                {expense.percentage}% of total expenses
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminAccounts;
