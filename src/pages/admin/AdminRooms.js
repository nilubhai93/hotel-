import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

const AdminRooms = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Sample booking data for occupied rooms
  const bookings = {
    102: {
      guestName: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+91 98765 43210',
      checkIn: '2026-01-10',
      checkOut: '2026-01-15',
      guests: 2,
      totalAmount: 60000,
      paid: 30000,
      bookingId: 'BK001',
      specialRequests: 'Late check-in, Extra pillows'
    },
    202: {
      guestName: 'Emma Wilson',
      email: 'emma.wilson@email.com',
      phone: '+91 98765 43211',
      checkIn: '2026-01-12',
      checkOut: '2026-01-18',
      guests: 2,
      totalAmount: 60000,
      paid: 60000,
      bookingId: 'BK002',
      specialRequests: 'Room with city view'
    },
    302: {
      guestName: 'Raj Kumar',
      email: 'raj.kumar@email.com',
      phone: '+91 98765 43212',
      checkIn: '2026-01-11',
      checkOut: '2026-01-14',
      guests: 1,
      totalAmount: 22500,
      paid: 22500,
      bookingId: 'BK003',
      specialRequests: 'None'
    }
  };

  const rooms = [
    { id: 101, name: 'Deluxe Suite', type: 'Suite', status: 'available', price: 15000, capacity: 2, floor: 1 },
    { id: 102, name: 'Ocean View', type: 'Deluxe', status: 'occupied', price: 12000, capacity: 2, floor: 1 },
    { id: 103, name: 'Standard Room', type: 'Standard', status: 'available', price: 8000, capacity: 2, floor: 1 },
    { id: 201, name: 'Family Suite', type: 'Suite', status: 'maintenance', price: 18000, capacity: 4, floor: 2 },
    { id: 202, name: 'Executive Room', type: 'Executive', status: 'occupied', price: 10000, capacity: 2, floor: 2 },
    { id: 203, name: 'Presidential Suite', type: 'Presidential', status: 'available', price: 25000, capacity: 3, floor: 2 },
    { id: 301, name: 'Garden View', type: 'Deluxe', status: 'available', price: 11000, capacity: 2, floor: 3 },
    { id: 302, name: 'City View', type: 'Standard', status: 'occupied', price: 7500, capacity: 2, floor: 3 },
  ];

  const filteredRooms = rooms.filter(room => {
    const matchesStatus = filterStatus === 'all' || room.status === filterStatus;
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.id.toString().includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'status-available';
      case 'occupied': return 'status-occupied';
      case 'maintenance': return 'status-maintenance';
      default: return '';
    }
  };

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    setShowBookingModal(true);
  };

  const closeModal = () => {
    setShowBookingModal(false);
    setSelectedRoom(null);
  };

  const currentBooking = selectedRoom && bookings[selectedRoom.id];

  return (
    <AdminLayout>
      <style>{`
        .page-header {
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(0,0,0,0.06);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }
        .dark-mode .page-header { border-bottom-color: rgba(255,255,255,0.08); }

        .page-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 600;
          color: #1C1917;
          margin: 0;
        }
        .dark-mode .page-title { color: #F9FAFB; }

        .header-actions {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .add-room-btn {
          padding: 12px 24px;
          background: linear-gradient(45deg, #B45309, #D97706);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .add-room-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(180, 83, 9, 0.3);
        }

        .dark-mode .add-room-btn {
          background: linear-gradient(45deg, #F59E0B, #FBBF24);
        }

        .filters-section {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
          flex-wrap: wrap;
          align-items: center;
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

        .dark-mode .search-box:focus {
          border-color: #F59E0B;
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

        .filter-btn:hover {
          transform: translateY(-2px);
        }

        .rooms-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
        }

        .room-card {
          backdrop-filter: blur(12px);
          border-radius: 16px;
          padding: 24px;
          position: relative;
          overflow: hidden;
          transition: all 0.3s;
          cursor: pointer;
          border: 1px solid rgba(0,0,0,0.06);
        }

        .light-mode .room-card {
          background: #FFFFFF;
          box-shadow: 0 4px 6px -1px rgba(28, 25, 23, 0.05);
        }

        .dark-mode .room-card {
          background: rgba(17, 24, 39, 0.75);
          border-color: rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5);
        }

        /* Status-based background colors */
        .light-mode .room-card.status-available {
          background: linear-gradient(135deg, #FFFFFF 0%, #F0FDF4 100%);
        }

        .light-mode .room-card.status-occupied {
          background: linear-gradient(135deg, #FFFFFF 0%, #FEF2F2 100%);
        }

        .light-mode .room-card.status-maintenance {
          background: linear-gradient(135deg, #FFFFFF 0%, #FFFBEB 100%);
        }

        .dark-mode .room-card.status-available {
          background: linear-gradient(135deg, rgba(17, 24, 39, 0.75) 0%, rgba(6, 78, 59, 0.2) 100%);
        }

        .dark-mode .room-card.status-occupied {
          background: linear-gradient(135deg, rgba(17, 24, 39, 0.75) 0%, rgba(127, 29, 29, 0.2) 100%);
        }

        .dark-mode .room-card.status-maintenance {
          background: linear-gradient(135deg, rgba(17, 24, 39, 0.75) 0%, rgba(120, 53, 15, 0.2) 100%);
        }

        .room-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px -4px rgba(28, 25, 23, 0.15);
        }

        .dark-mode .room-card:hover {
          box-shadow: 0 12px 24px -4px rgba(0, 0, 0, 0.7);
        }

        .room-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          opacity: 0.8;
        }

        .status-available::before { background: linear-gradient(90deg, #10B981, transparent); }
        .status-occupied::before { background: linear-gradient(90deg, #EF4444, transparent); }
        .status-maintenance::before { background: linear-gradient(90deg, #F59E0B, transparent); }

        .room-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 16px;
        }

        .room-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem;
          font-weight: 600;
          margin: 0;
        }

        .light-mode .room-number { color: #1C1917; }
        .dark-mode .room-number { color: #F9FAFB; }

        .status-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .status-badge.available {
          background: rgba(16, 185, 129, 0.1);
          color: #059669;
          border: 1px solid rgba(16, 185, 129, 0.2);
        }

        .status-badge.occupied {
          background: rgba(239, 68, 68, 0.1);
          color: #DC2626;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }

        .status-badge.maintenance {
          background: rgba(245, 158, 11, 0.1);
          color: #D97706;
          border: 1px solid rgba(245, 158, 11, 0.2);
        }

        .room-name {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .light-mode .room-name { color: #57534E; }
        .dark-mode .room-name { color: #D1D5DB; }

        .room-type {
          font-size: 0.85rem;
          opacity: 0.7;
          margin-bottom: 16px;
        }

        .room-details {
          display: flex;
          gap: 16px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
        }

        .light-mode .detail-item { color: #57534E; }
        .dark-mode .detail-item { color: #9CA3AF; }

        .room-price {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid rgba(0,0,0,0.06);
        }

        .dark-mode .room-price {
          border-top-color: rgba(255,255,255,0.08);
        }

        .light-mode .room-price { color: #B45309; }
        .dark-mode .room-price { color: #F59E0B; }

        .price-label {
          font-size: 0.75rem;
          opacity: 0.7;
          font-family: 'Montserrat', sans-serif;
          font-weight: 400;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-content {
          max-width: 600px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          border-radius: 16px;
          padding: 32px;
          position: relative;
        }

        .light-mode .modal-content {
          background: #FFFFFF;
        }

        .dark-mode .modal-content {
          background: rgba(17, 24, 39, 0.95);
          border: 1px solid rgba(255,255,255,0.1);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .modal-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem;
          font-weight: 600;
        }

        .light-mode .modal-title { color: #1C1917; }
        .dark-mode .modal-title { color: #F9FAFB; }

        .close-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: none;
          background: rgba(0,0,0,0.1);
          cursor: pointer;
          font-size: 1.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .close-btn:hover {
          background: rgba(239, 68, 68, 0.1);
          color: #DC2626;
        }

        .modal-body {
          margin-bottom: 24px;
        }

        .booking-info {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .info-group {
          padding: 16px;
          border-radius: 8px;
          border: 1px solid rgba(0,0,0,0.06);
        }

        .light-mode .info-group {
          background: rgba(0,0,0,0.02);
        }

        .dark-mode .info-group {
          background: rgba(255,255,255,0.02);
          border-color: rgba(255,255,255,0.08);
        }

        .info-label {
          font-size: 0.8rem;
          opacity: 0.7;
          margin-bottom: 4px;
        }

        .info-value {
          font-weight: 600;
          font-size: 1rem;
        }

        .light-mode .info-value { color: #1C1917; }
        .dark-mode .info-value { color: #F9FAFB; }

        .payment-status {
          display: flex;
          justify-content: space-between;
          padding: 16px;
          border-radius: 8px;
          margin-top: 16px;
        }

        .light-mode .payment-status {
          background: rgba(180, 83, 9, 0.1);
        }

        .dark-mode .payment-status {
          background: rgba(245, 158, 11, 0.15);
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          display: block;
          font-weight: 600;
          margin-bottom: 8px;
          font-size: 0.9rem;
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

        .modal-footer {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
        }

        .modal-btn {
          padding: 10px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          border: none;
        }

        .modal-btn.primary {
          background: linear-gradient(45deg, #B45309, #D97706);
          color: white;
        }

        .modal-btn.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(180, 83, 9, 0.3);
        }

        .modal-btn.secondary {
          background: transparent;
          border: 1px solid rgba(0,0,0,0.1);
        }

        .light-mode .modal-btn.secondary {
          color: #57534E;
        }

        .dark-mode .modal-btn.secondary {
          color: #9CA3AF;
          border-color: rgba(255,255,255,0.1);
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          opacity: 0.6;
        }

        .empty-state-icon {
          font-size: 4rem;
          margin-bottom: 16px;
        }

        .empty-state-text {
          font-size: 1.1rem;
        }

        /* Mobile Responsiveness */
        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .page-title {
            font-size: 1.75rem;
          }

          .header-actions {
            width: 100%;
          }

          .add-room-btn {
            width: 100%;
            padding: 14px 24px;
          }

          .filters-section {
            flex-direction: column;
            gap: 12px;
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
            min-width: 80px;
            padding: 12px 16px;
            font-size: 0.8rem;
          }

          .rooms-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .room-card {
            padding: 20px;
          }

          .room-number {
            font-size: 1.6rem;
          }

          .room-name {
            font-size: 1rem;
          }

          .room-price {
            font-size: 1.3rem;
          }

          .modal-content {
            padding: 24px;
          }
        }

        @media (max-width: 480px) {
          .page-title {
            font-size: 1.5rem;
          }

          .add-room-btn {
            padding: 12px 20px;
            font-size: 0.85rem;
          }

          .filter-btn {
            padding: 10px 12px;
            font-size: 0.75rem;
          }

          .room-card {
            padding: 16px;
          }

          .room-number {
            font-size: 1.4rem;
          }

          .room-details {
            gap: 12px;
          }

          .detail-item {
            font-size: 0.8rem;
          }

          .status-badge {
            padding: 5px 10px;
            font-size: 0.65rem;
          }
        }

        /* Touch device optimizations */
        @media (hover: none) and (pointer: coarse) {
          .add-room-btn {
            padding: 16px 24px;
            min-height: 48px;
          }

          .filter-btn {
            padding: 14px 20px;
            min-height: 44px;
          }

          .room-card {
            padding: 24px;
          }
        }
      `}</style>

      <div className="page-header">
        <h1 className="page-title">Room Management</h1>
        <div className="header-actions">
          <button className="add-room-btn">+ Add New Room</button>
        </div>
      </div>

      <div className="filters-section">
        <input
          type="text"
          className="search-box"
          placeholder="🔍 Search by room number or name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            All Rooms
          </button>
          <button
            className={`filter-btn ${filterStatus === 'available' ? 'active' : ''}`}
            onClick={() => setFilterStatus('available')}
          >
            Available
          </button>
          <button
            className={`filter-btn ${filterStatus === 'occupied' ? 'active' : ''}`}
            onClick={() => setFilterStatus('occupied')}
          >
            Occupied
          </button>
          <button
            className={`filter-btn ${filterStatus === 'maintenance' ? 'active' : ''}`}
            onClick={() => setFilterStatus('maintenance')}
          >
            Maintenance
          </button>
        </div>
      </div>

      {filteredRooms.length > 0 ? (
        <div className="rooms-grid">
          {filteredRooms.map(room => (
            <div
              key={room.id}
              className={`room-card ${getStatusColor(room.status)}`}
              onClick={() => handleRoomClick(room)}
            >
              <div className="room-header">
                <h3 className="room-number">#{room.id}</h3>
                <span className={`status-badge ${room.status}`}>
                  {room.status}
                </span>
              </div>
              <div className="room-name">{room.name}</div>
              <div className="room-type">{room.type}</div>
              <div className="room-details">
                <div className="detail-item">
                  <span>👥</span>
                  <span>{room.capacity} Guests</span>
                </div>
                <div className="detail-item">
                  <span>🏢</span>
                  <span>Floor {room.floor}</span>
                </div>
              </div>
              <div className="room-price">
                ₹{room.price.toLocaleString('en-IN')}
                <span className="price-label"> / night</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <div className="empty-state-text">No rooms found matching your criteria</div>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && selectedRoom && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                Room #{selectedRoom.id} - {selectedRoom.name}
              </h2>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              {selectedRoom.status === 'occupied' && currentBooking ? (
                // Show booking details for occupied rooms
                <div className="booking-info">
                  <div className="info-group">
                    <div className="info-label">Booking ID</div>
                    <div className="info-value">{currentBooking.bookingId}</div>
                  </div>
                  <div className="info-group">
                    <div className="info-label">Guest Name</div>
                    <div className="info-value">{currentBooking.guestName}</div>
                  </div>
                  <div className="info-group">
                    <div className="info-label">Contact Information</div>
                    <div className="info-value">
                      📧 {currentBooking.email}
                      <br />
                      📱 {currentBooking.phone}
                    </div>
                  </div>
                  <div className="info-group">
                    <div className="info-label">Check-in / Check-out</div>
                    <div className="info-value">
                      📅 {currentBooking.checkIn} → {currentBooking.checkOut}
                    </div>
                  </div>
                  <div className="info-group">
                    <div className="info-label">Number of Guests</div>
                    <div className="info-value">👥 {currentBooking.guests} Guests</div>
                  </div>
                  <div className="info-group">
                    <div className="info-label">Special Requests</div>
                    <div className="info-value">{currentBooking.specialRequests}</div>
                  </div>
                  <div className="payment-status">
                    <div>
                      <div className="info-label">Total Amount</div>
                      <div className="info-value">₹{currentBooking.totalAmount.toLocaleString('en-IN')}</div>
                    </div>
                    <div>
                      <div className="info-label">Paid</div>
                      <div className="info-value">₹{currentBooking.paid.toLocaleString('en-IN')}</div>
                    </div>
                    <div>
                      <div className="info-label">Balance</div>
                      <div className="info-value">₹{(currentBooking.totalAmount - currentBooking.paid).toLocaleString('en-IN')}</div>
                    </div>
                  </div>
                </div>
              ) : selectedRoom.status === 'available' ? (
                // Show booking form for available rooms
                <div>
                  <div className="form-group">
                    <label className="form-label">Guest Name</label>
                    <input type="text" className="form-input" placeholder="Enter guest name" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-input" placeholder="guest@email.com" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input type="tel" className="form-input" placeholder="+91 98765 43210" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Check-in Date</label>
                    <input type="date" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Check-out Date</label>
                    <input type="date" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Number of Guests</label>
                    <input type="number" className="form-input" placeholder="2" min="1" max={selectedRoom.capacity} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Special Requests</label>
                    <input type="text" className="form-input" placeholder="Any special requirements..." />
                  </div>
                  <div className="payment-status">
                    <div>
                      <div className="info-label">Room Rate</div>
                      <div className="info-value">₹{selectedRoom.price.toLocaleString('en-IN')} / night</div>
                    </div>
                  </div>
                </div>
              ) : (
                // Maintenance status
                <div className="info-group">
                  <div className="info-value">⚠️ This room is currently under maintenance and not available for booking.</div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="modal-btn secondary" onClick={closeModal}>Close</button>
              {selectedRoom.status === 'occupied' && (
                <button className="modal-btn primary">Check Out</button>
              )}
              {selectedRoom.status === 'available' && (
                <button className="modal-btn primary">Create Booking</button>
              )}
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminRooms;
