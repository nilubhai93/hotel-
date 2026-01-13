import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

const AdminChannelManager = () => {
    const [activeTab, setActiveTab] = useState('channels');
    const [selectedChannel, setSelectedChannel] = useState(null);
    const [showConfigModal, setShowConfigModal] = useState(false);
    const [showSyncModal, setShowSyncModal] = useState(false);
    const [showMappingModal, setShowMappingModal] = useState(false);
    const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);

    const openModal = (type, channel) => {
        setSelectedChannel(channel);
        switch (type) {
            case 'config':
                setShowConfigModal(true);
                break;
            case 'sync':
                setShowSyncModal(true);
                break;
            case 'mapping':
                setShowMappingModal(true);
                break;
            case 'analytics':
                setShowAnalyticsModal(true);
                break;
            default:
                break;
        }
    };

    const closeAllModals = () => {
        setShowConfigModal(false);
        setShowSyncModal(false);
        setShowMappingModal(false);
        setShowAnalyticsModal(false);
        setSelectedChannel(null);
    };

    // Sample data
    const channels = [
        {
            id: 1,
            name: 'Booking.com',
            status: 'connected',
            bookings: 45,
            revenue: 225000,
            commission: 15,
            lastSync: '5 mins ago',
            availability: 'synced',
            logo: '🅱️',
            apiKey: 'bdc_api_key_***',
            hotelId: 'HTL123456'
        },
        {
            id: 2,
            name: 'Expedia',
            status: 'connected',
            bookings: 32,
            revenue: 192000,
            commission: 18,
            lastSync: '10 mins ago',
            availability: 'synced',
            logo: '🅴',
            apiKey: 'exp_api_key_***',
            hotelId: 'EXP789012'
        },
        {
            id: 3,
            name: 'Airbnb',
            status: 'disconnected',
            bookings: 0,
            revenue: 0,
            commission: 12,
            lastSync: 'Never',
            availability: 'not-synced',
            logo: '🅰️',
            apiKey: '',
            hotelId: ''
        },
        {
            id: 4,
            name: 'MakeMyTrip',
            status: 'connected',
            bookings: 28,
            revenue: 168000,
            commission: 20,
            lastSync: '2 mins ago',
            availability: 'synced',
            logo: '🅼',
            apiKey: 'mmt_api_key_***',
            hotelId: 'MMT345678'
        },
        {
            id: 5,
            name: 'Goibibo',
            status: 'pending',
            bookings: 0,
            revenue: 0,
            commission: 18,
            lastSync: 'Pending',
            availability: 'not-synced',
            logo: '🅶',
            apiKey: 'goi_api_key_***',
            hotelId: 'GOI901234'
        },
        {
            id: 6,
            name: 'Agoda',
            status: 'connected',
            bookings: 22,
            revenue: 154000,
            commission: 17,
            lastSync: '8 mins ago',
            availability: 'synced',
            logo: '🅰️',
            apiKey: 'ago_api_key_***',
            hotelId: 'AGO567890'
        },
    ];

    const recentBookings = [
        { id: 'BK001', channel: 'Booking.com', guest: 'John Smith', room: '101', checkIn: '2026-01-20', checkOut: '2026-01-23', amount: 15000, status: 'confirmed', nights: 3 },
        { id: 'BK002', channel: 'Expedia', guest: 'Emma Wilson', room: '203', checkIn: '2026-01-22', checkOut: '2026-01-25', amount: 18000, status: 'confirmed', nights: 3 },
        { id: 'BK003', channel: 'MakeMyTrip', guest: 'Raj Kumar', room: '305', checkIn: '2026-01-18', checkOut: '2026-01-20', amount: 12000, status: 'pending', nights: 2 },
        { id: 'BK004', channel: 'Agoda', guest: 'Sarah Lee', room: '102', checkIn: '2026-01-25', checkOut: '2026-01-28', amount: 21000, status: 'confirmed', nights: 3 },
    ];

    const ratePlans = [
        {
            id: 1,
            name: 'Standard Rate',
            basePrice: 8000,
            channels: ['Booking.com', 'Expedia', 'MakeMyTrip', 'Agoda'],
            active: true,
            restrictions: 'Min 1 night'
        },
        {
            id: 2,
            name: 'Weekend Special',
            basePrice: 10000,
            channels: ['Booking.com', 'Airbnb'],
            active: true,
            restrictions: 'Fri-Sun only'
        },
        {
            id: 3,
            name: 'Corporate Rate',
            basePrice: 7000,
            channels: ['Expedia', 'MakeMyTrip'],
            active: true,
            restrictions: 'Min 2 nights'
        },
        {
            id: 4,
            name: 'Early Bird',
            basePrice: 6500,
            channels: ['Booking.com', 'Expedia', 'Agoda'],
            active: false,
            restrictions: 'Book 30 days advance'
        },
    ];

    const inventory = [
        { roomType: 'Deluxe Suite', total: 10, available: 6, blocked: 2, booked: 2 },
        { roomType: 'Executive Room', total: 15, available: 10, blocked: 1, booked: 4 },
        { roomType: 'Standard Room', total: 20, available: 14, blocked: 0, booked: 6 },
        { roomType: 'Family Suite', total: 5, available: 3, blocked: 0, booked: 2 },
    ];

    const performance = [
        { channel: 'Booking.com', bookings: 45, revenue: 225000, conversion: 12.5, avgBookingValue: 5000 },
        { channel: 'Expedia', bookings: 32, revenue: 192000, conversion: 9.8, avgBookingValue: 6000 },
        { channel: 'MakeMyTrip', bookings: 28, revenue: 168000, conversion: 11.2, avgBookingValue: 6000 },
        { channel: 'Agoda', bookings: 22, revenue: 154000, conversion: 8.5, avgBookingValue: 7000 },
    ];

    const roomMappings = [
        { localRoom: 'Deluxe Suite', channelRoom: 'Deluxe King Room', mapped: true },
        { localRoom: 'Executive Room', channelRoom: 'Executive Double', mapped: true },
        { localRoom: 'Standard Room', channelRoom: 'Standard Twin', mapped: true },
        { localRoom: 'Family Suite', channelRoom: 'Family Room', mapped: false },
    ];

    const stats = {
        totalChannels: channels.length,
        activeChannels: channels.filter(c => c.status === 'connected').length,
        totalBookings: channels.reduce((sum, c) => sum + c.bookings, 0),
        totalRevenue: channels.reduce((sum, c) => sum + c.revenue, 0),
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'connected': return 'status-connected';
            case 'disconnected': return 'status-disconnected';
            case 'pending': return 'status-pending';
            case 'confirmed': return 'status-confirmed';
            case 'synced': return 'status-synced';
            case 'not-synced': return 'status-not-synced';
            default: return '';
        }
    };

    return (
        <AdminLayout>
            <style>{`
        .cm-header {
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

        .action-btn.secondary {
          background: transparent;
          border: 2px solid;
        }

        .light-mode .action-btn.secondary {
          border-color: #B45309;
          color: #B45309;
        }

        .dark-mode .action-btn.secondary {
          border-color: #F59E0B;
          color: #F59E0B;
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

        .channels-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }

        .channel-card {
          padding: 24px;
          border-radius: 16px;
          border: 1px solid rgba(0,0,0,0.06);
          transition: all 0.3s;
          position: relative;
        }

        .light-mode .channel-card {
          background: #FFFFFF;
          box-shadow: 0 4px 6px -1px rgba(28, 25, 23, 0.05);
        }

        .dark-mode .channel-card {
          background: rgba(17, 24, 39, 0.75);
          border-color: rgba(255,255,255,0.08);
        }

        .channel-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px -4px rgba(28, 25, 23, 0.15);
        }

        .dark-mode .channel-card:hover {
          box-shadow: 0 12px 24px -4px rgba(0, 0, 0, 0.7);
        }

        .channel-logo {
          position: absolute;
          top: 20px;
          right: 20px;
          font-size: 2.5rem;
          opacity: 0.3;
        }

        .channel-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 16px;
        }

        .channel-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-weight: 600;
        }

        .light-mode .channel-name { color: #1C1917; }
        .dark-mode .channel-name { color: #F9FAFB; }

        .status-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .status-connected {
          background: rgba(16, 185, 129, 0.1);
          color: #059669;
          border: 1px solid rgba(16, 185, 129, 0.2);
        }

        .status-disconnected {
          background: rgba(239, 68, 68, 0.1);
          color: #DC2626;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }

        .status-pending {
          background: rgba(245, 158, 11, 0.1);
          color: #D97706;
          border: 1px solid rgba(245, 158, 11, 0.2);
        }

        .status-confirmed {
          background: rgba(16, 185, 129, 0.1);
          color: #059669;
        }

        .status-synced {
          background: rgba(59, 130, 246, 0.1);
          color: #2563EB;
        }

        .status-not-synced {
          background: rgba(239, 68, 68, 0.1);
          color: #DC2626;
        }

        .channel-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-bottom: 16px;
        }

        .channel-stat {
          text-align: center;
        }

        .channel-stat-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem;
          font-weight: 600;
        }

        .light-mode .channel-stat-value { color: #B45309; }
        .dark-mode .channel-stat-value { color: #F59E0B; }

        .channel-stat-label {
          font-size: 0.75rem;
          opacity: 0.7;
        }

        .channel-info {
          font-size: 0.85rem;
          opacity: 0.7;
          margin-bottom: 8px;
        }

        .channel-actions {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
          margin-top: 16px;
        }

        .icon-btn {
          padding: 8px 12px;
          background: transparent;
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.85rem;
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

        .mapping-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .mapping-item {
          padding: 16px;
          border-radius: 8px;
          border: 1px solid rgba(0,0,0,0.06);
        }

        .light-mode .mapping-item {
          background: rgba(0,0,0,0.02);
        }

        .dark-mode .mapping-item {
          background: rgba(255,255,255,0.02);
          border-color: rgba(255,255,255,0.08);
        }

        .mapping-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .sync-status {
          padding: 16px;
          border-radius: 8px;
          margin-bottom: 16px;
        }

        .light-mode .sync-status {
          background: rgba(59, 130, 246, 0.1);
        }

        .dark-mode .sync-status {
          background: rgba(59, 130, 246, 0.15);
        }

        .analytics-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-bottom: 16px;
        }

        .analytics-card {
          padding: 16px;
          border-radius: 8px;
          text-align: center;
        }

        .light-mode .analytics-card {
          background: rgba(0,0,0,0.02);
        }

        .dark-mode .analytics-card {
          background: rgba(255,255,255,0.02);
        }

        .analytics-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .light-mode .analytics-value { color: #B45309; }
        .dark-mode .analytics-value { color: #F59E0B; }

        .analytics-label {
          font-size: 0.85rem;
          opacity: 0.7;
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

        /* Other existing styles... */
        .bookings-grid {
          display: grid;
          gap: 16px;
        }

        .booking-card {
          padding: 20px;
          border-radius: 12px;
          border: 1px solid rgba(0,0,0,0.06);
        }

        .light-mode .booking-card {
          background: #FFFFFF;
        }

        .dark-mode .booking-card {
          background: rgba(17, 24, 39, 0.75);
          border-color: rgba(255,255,255,0.08);
        }

        .booking-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 12px;
        }

        .booking-id {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-weight: 600;
        }

        .light-mode .booking-id { color: #B45309; }
        .dark-mode .booking-id { color: #F59E0B; }

        .booking-details {
          font-size: 0.85rem;
          opacity: 0.8;
          line-height: 1.6;
        }

        .rate-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 16px;
        }

        .rate-card {
          padding: 20px;
          border-radius: 12px;
          border: 1px solid rgba(0,0,0,0.06);
        }

        .light-mode .rate-card {
          background: #FFFFFF;
        }

        .dark-mode .rate-card {
          background: rgba(17, 24, 39, 0.75);
          border-color: rgba(255,255,255,0.08);
        }

        .rate-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 12px;
        }

        .rate-name {
          font-weight: 600;
          font-size: 1.1rem;
        }

        .light-mode .rate-name { color: #1C1917; }
        .dark-mode .rate-name { color: #F9FAFB; }

        .rate-price {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .light-mode .rate-price { color: #B45309; }
        .dark-mode .rate-price { color: #F59E0B; }

        .rate-restrictions {
          font-size: 0.8rem;
          opacity: 0.7;
          margin-bottom: 12px;
        }

        .channel-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .channel-tag {
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .light-mode .channel-tag {
          background: rgba(180, 83, 9, 0.1);
          color: #B45309;
        }

        .dark-mode .channel-tag {
          background: rgba(245, 158, 11, 0.15);
          color: #F59E0B;
        }

        .inventory-grid {
          display: grid;
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

        .inventory-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .room-type {
          font-weight: 600;
          font-size: 1.1rem;
        }

        .light-mode .room-type { color: #1C1917; }
        .dark-mode .room-type { color: #F9FAFB; }

        .inventory-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }

        .inv-stat {
          text-align: center;
        }

        .inv-stat-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 600;
        }

        .light-mode .inv-stat-value { color: #B45309; }
        .dark-mode .inv-stat-value { color: #F59E0B; }

        .inv-stat-label {
          font-size: 0.75rem;
          opacity: 0.7;
        }

        .performance-grid {
          display: grid;
          gap: 16px;
        }

        .performance-card {
          padding: 20px;
          border-radius: 12px;
          border: 1px solid rgba(0,0,0,0.06);
        }

        .light-mode .performance-card {
          background: #FFFFFF;
        }

        .dark-mode .performance-card {
          background: rgba(17, 24, 39, 0.75);
          border-color: rgba(255,255,255,0.08);
        }

        .perf-header {
          font-weight: 600;
          font-size: 1.1rem;
          margin-bottom: 16px;
        }

        .light-mode .perf-header { color: #1C1917; }
        .dark-mode .perf-header { color: #F9FAFB; }

        .perf-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }

        .perf-stat {
          text-align: center;
        }

        .perf-stat-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-weight: 600;
        }

        .light-mode .perf-stat-value { color: #B45309; }
        .dark-mode .perf-stat-value { color: #F59E0B; }

        .perf-stat-label {
          font-size: 0.75rem;
          opacity: 0.7;
        }

        .active-toggle {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .active-toggle.active {
          background: rgba(16, 185, 129, 0.1);
          color: #059669;
        }

        .active-toggle.inactive {
          background: rgba(107, 114, 128, 0.1);
          color: #6B7280;
        }

        /* Mobile Responsiveness */
        @media (max-width: 768px) {
          .cm-header {
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

          .channels-grid {
            grid-template-columns: 1fr;
          }

          .rate-grid {
            grid-template-columns: 1fr;
          }

          .inventory-stats,
          .perf-stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .modal-content {
            padding: 24px;
          }

          .analytics-grid {
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

          .channel-stats {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

            <div className="cm-header">
                <h1 className="page-title">Channel Manager</h1>
                <div className="header-actions">
                    <button className="action-btn">
                        <span>🔄</span>
                        Sync All
                    </button>
                    <button className="action-btn secondary">
                        <span>➕</span>
                        Add Channel
                    </button>
                </div>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon">🌐</div>
                    <div className="stat-value">{stats.totalChannels}</div>
                    <div className="stat-label">Total Channels</div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">✅</div>
                    <div className="stat-value">{stats.activeChannels}</div>
                    <div className="stat-label">Active Channels</div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">📋</div>
                    <div className="stat-value">{stats.totalBookings}</div>
                    <div className="stat-label">Total Bookings</div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">💰</div>
                    <div className="stat-value">₹{stats.totalRevenue.toLocaleString('en-IN')}</div>
                    <div className="stat-label">Total Revenue</div>
                </div>
            </div>

            <div className="tabs-container">
                <button
                    className={`tab ${activeTab === 'channels' ? 'active' : ''}`}
                    onClick={() => setActiveTab('channels')}
                >
                    Channels
                </button>
                <button
                    className={`tab ${activeTab === 'bookings' ? 'active' : ''}`}
                    onClick={() => setActiveTab('bookings')}
                >
                    Bookings
                </button>
                <button
                    className={`tab ${activeTab === 'rates' ? 'active' : ''}`}
                    onClick={() => setActiveTab('rates')}
                >
                    Rate Plans
                </button>
                <button
                    className={`tab ${activeTab === 'inventory' ? 'active' : ''}`}
                    onClick={() => setActiveTab('inventory')}
                >
                    Inventory
                </button>
                <button
                    className={`tab ${activeTab === 'performance' ? 'active' : ''}`}
                    onClick={() => setActiveTab('performance')}
                >
                    Performance
                </button>
            </div>

            {activeTab === 'channels' && (
                <div className="channels-grid">
                    {channels.map(channel => (
                        <div key={channel.id} className="channel-card">
                            <div className="channel-logo">{channel.logo}</div>
                            <div className="channel-header">
                                <div className="channel-name">{channel.name}</div>
                                <span className={`status-badge ${getStatusColor(channel.status)}`}>
                                    {channel.status}
                                </span>
                            </div>
                            <div className="channel-stats">
                                <div className="channel-stat">
                                    <div className="channel-stat-value">{channel.bookings}</div>
                                    <div className="channel-stat-label">Bookings</div>
                                </div>
                                <div className="channel-stat">
                                    <div className="channel-stat-value">₹{(channel.revenue / 1000).toFixed(0)}K</div>
                                    <div className="channel-stat-label">Revenue</div>
                                </div>
                            </div>
                            <div className="channel-info">💰 Commission: {channel.commission}%</div>
                            <div className="channel-info">🔄 Last Sync: {channel.lastSync}</div>
                            <div className="channel-info">
                                📅 Availability: <span className={`status-badge ${getStatusColor(channel.availability)}`}>{channel.availability}</span>
                            </div>
                            <div className="channel-actions">
                                <button className="icon-btn" onClick={() => openModal('config', channel)}>⚙️ Configure</button>
                                <button className="icon-btn" onClick={() => openModal('sync', channel)}>🔄 Sync Now</button>
                                <button className="icon-btn" onClick={() => openModal('mapping', channel)}>🗺️ Room Mapping</button>
                                <button className="icon-btn" onClick={() => openModal('analytics', channel)}>📊 Analytics</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'bookings' && (
                <div className="bookings-grid">
                    {recentBookings.map(booking => (
                        <div key={booking.id} className="booking-card">
                            <div className="booking-header">
                                <div className="booking-id">{booking.id}</div>
                                <span className={`status-badge ${getStatusColor(booking.status)}`}>
                                    {booking.status}
                                </span>
                            </div>
                            <div className="booking-details">
                                <strong>{booking.channel}</strong> • {booking.guest}
                                <br />
                                🏨 Room {booking.room} • {booking.nights} nights
                                <br />
                                📅 {booking.checkIn} → {booking.checkOut}
                                <br />
                                💰 ₹{booking.amount.toLocaleString('en-IN')}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'rates' && (
                <div className="rate-grid">
                    {ratePlans.map(rate => (
                        <div key={rate.id} className="rate-card">
                            <div className="rate-header">
                                <div className="rate-name">{rate.name}</div>
                                <span className={`active-toggle ${rate.active ? 'active' : 'inactive'}`}>
                                    {rate.active ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                            <div className="rate-price">₹{rate.basePrice.toLocaleString('en-IN')}/night</div>
                            <div className="rate-restrictions">📋 {rate.restrictions}</div>
                            <div className="channel-tags">
                                {rate.channels.map((channel, idx) => (
                                    <span key={idx} className="channel-tag">{channel}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'inventory' && (
                <div className="inventory-grid">
                    {inventory.map((item, idx) => (
                        <div key={idx} className="inventory-card">
                            <div className="inventory-header">
                                <div className="room-type">{item.roomType}</div>
                            </div>
                            <div className="inventory-stats">
                                <div className="inv-stat">
                                    <div className="inv-stat-value">{item.total}</div>
                                    <div className="inv-stat-label">Total</div>
                                </div>
                                <div className="inv-stat">
                                    <div className="inv-stat-value">{item.available}</div>
                                    <div className="inv-stat-label">Available</div>
                                </div>
                                <div className="inv-stat">
                                    <div className="inv-stat-value">{item.blocked}</div>
                                    <div className="inv-stat-label">Blocked</div>
                                </div>
                                <div className="inv-stat">
                                    <div className="inv-stat-value">{item.booked}</div>
                                    <div className="inv-stat-label">Booked</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'performance' && (
                <div className="performance-grid">
                    {performance.map((perf, idx) => (
                        <div key={idx} className="performance-card">
                            <div className="perf-header">{perf.channel}</div>
                            <div className="perf-stats">
                                <div className="perf-stat">
                                    <div className="perf-stat-value">{perf.bookings}</div>
                                    <div className="perf-stat-label">Bookings</div>
                                </div>
                                <div className="perf-stat">
                                    <div className="perf-stat-value">₹{(perf.revenue / 1000).toFixed(0)}K</div>
                                    <div className="perf-stat-label">Revenue</div>
                                </div>
                                <div className="perf-stat">
                                    <div className="perf-stat-value">{perf.conversion}%</div>
                                    <div className="perf-stat-label">Conversion</div>
                                </div>
                                <div className="perf-stat">
                                    <div className="perf-stat-value">₹{(perf.avgBookingValue / 1000).toFixed(1)}K</div>
                                    <div className="perf-stat-label">Avg Value</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Configure Modal */}
            {showConfigModal && selectedChannel && (
                <div className="modal-overlay" onClick={closeAllModals}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 className="modal-title">Configure {selectedChannel.name}</h2>
                            <button className="close-btn" onClick={closeAllModals}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label className="form-label">API Key</label>
                                <input type="text" className="form-input" defaultValue={selectedChannel.apiKey} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Hotel ID</label>
                                <input type="text" className="form-input" defaultValue={selectedChannel.hotelId} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Commission Rate (%)</label>
                                <input type="number" className="form-input" defaultValue={selectedChannel.commission} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Auto-Sync Inventory</label>
                                <select className="form-input">
                                    <option>Enabled</option>
                                    <option>Disabled</option>
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="modal-btn secondary" onClick={closeAllModals}>Cancel</button>
                            <button className="modal-btn primary">Save Changes</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Sync Modal */}
            {showSyncModal && selectedChannel && (
                <div className="modal-overlay" onClick={closeAllModals}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 className="modal-title">Sync {selectedChannel.name}</h2>
                            <button className="close-btn" onClick={closeAllModals}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="sync-status">
                                <strong>Last Sync:</strong> {selectedChannel.lastSync}
                                <br />
                                <strong>Status:</strong> <span className={`status-badge ${getStatusColor(selectedChannel.availability)}`}>{selectedChannel.availability}</span>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Sync Options</label>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <input type="checkbox" defaultChecked /> Sync Inventory
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <input type="checkbox" defaultChecked /> Sync Rates
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <input type="checkbox" defaultChecked /> Sync Bookings
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <input type="checkbox" /> Sync Availability Calendar
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="modal-btn secondary" onClick={closeAllModals}>Cancel</button>
                            <button className="modal-btn primary">Start Sync</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Room Mapping Modal */}
            {showMappingModal && selectedChannel && (
                <div className="modal-overlay" onClick={closeAllModals}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 className="modal-title">Room Mapping - {selectedChannel.name}</h2>
                            <button className="close-btn" onClick={closeAllModals}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="mapping-list">
                                {roomMappings.map((mapping, idx) => (
                                    <div key={idx} className="mapping-item">
                                        <div className="mapping-row">
                                            <strong>{mapping.localRoom}</strong>
                                            <span className={`status-badge ${mapping.mapped ? 'status-connected' : 'status-disconnected'}`}>
                                                {mapping.mapped ? 'Mapped' : 'Not Mapped'}
                                            </span>
                                        </div>
                                        <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>
                                            → {mapping.channelRoom}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="modal-btn secondary" onClick={closeAllModals}>Close</button>
                            <button className="modal-btn primary">Update Mappings</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Analytics Modal */}
            {showAnalyticsModal && selectedChannel && (
                <div className="modal-overlay" onClick={closeAllModals}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 className="modal-title">{selectedChannel.name} Analytics</h2>
                            <button className="close-btn" onClick={closeAllModals}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="analytics-grid">
                                <div className="analytics-card">
                                    <div className="analytics-value">{selectedChannel.bookings}</div>
                                    <div className="analytics-label">Total Bookings</div>
                                </div>
                                <div className="analytics-card">
                                    <div className="analytics-value">₹{(selectedChannel.revenue / 1000).toFixed(0)}K</div>
                                    <div className="analytics-label">Revenue</div>
                                </div>
                                <div className="analytics-card">
                                    <div className="analytics-value">{selectedChannel.commission}%</div>
                                    <div className="analytics-label">Commission</div>
                                </div>
                                <div className="analytics-card">
                                    <div className="analytics-value">₹{(selectedChannel.revenue / selectedChannel.bookings || 0).toFixed(0)}</div>
                                    <div className="analytics-label">Avg Booking</div>
                                </div>
                            </div>
                            <div style={{ marginTop: '24px', padding: '16px', borderRadius: '8px', background: 'rgba(0,0,0,0.02)' }}>
                                <strong>Performance Insights:</strong>
                                <ul style={{ marginTop: '12px', paddingLeft: '20px' }}>
                                    <li>Conversion rate: {((selectedChannel.bookings / 500) * 100).toFixed(1)}%</li>
                                    <li>Last 30 days: {selectedChannel.bookings} bookings</li>
                                    <li>Revenue growth: +12.5%</li>
                                </ul>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="modal-btn secondary" onClick={closeAllModals}>Close</button>
                            <button className="modal-btn primary">Export Report</button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default AdminChannelManager;
