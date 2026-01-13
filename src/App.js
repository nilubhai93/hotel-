import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from "./pages/landing";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRooms from './pages/admin/AdminRooms';
import AdminChannelManager from './pages/admin/AdminChannelManager';
import AdminFrontOfficeOperations from './pages/admin/AdminFrontOfficeOperations';
import AdminFrontOfficeAvailability from './pages/admin/AdminFrontOfficeAvailability';
import AdminFrontOfficeBilling from './pages/admin/AdminFrontOfficeBilling';
import AdminFrontOfficeViews from './pages/admin/AdminFrontOfficeViews';
import AdminFrontOfficeReports from './pages/admin/AdminFrontOfficeReports';
import AdminFrontOfficeSetup from './pages/admin/AdminFrontOfficeSetup';
import AdminFrontOfficeSettings from './pages/admin/AdminFrontOfficeSettings';
import AdminHouseKeepingOperations from './pages/admin/AdminHouseKeepingOperations';
import AdminHouseKeepingSetup from './pages/admin/AdminHouseKeepingSetup';
import AdminHouseKeepingSettings from './pages/admin/AdminHouseKeepingSettings';
import AdminKitchen from './pages/admin/AdminKitchen';
import AdminBar from './pages/admin/AdminBar';
import AdminStores from './pages/admin/AdminStores';
import AdminAccounts from './pages/admin/AdminAccounts';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/rooms" element={<AdminRooms />} />
          <Route path="/admin/channel-manager" element={<AdminChannelManager />} />

          {/* Front Office Routes */}
          <Route path="/admin/front-office/operations" element={<AdminFrontOfficeOperations />} />
          <Route path="/admin/front-office/availability" element={<AdminFrontOfficeAvailability />} />
          <Route path="/admin/front-office/billing" element={<AdminFrontOfficeBilling />} />
          <Route path="/admin/front-office/views" element={<AdminFrontOfficeViews />} />
          <Route path="/admin/front-office/reports" element={<AdminFrontOfficeReports />} />
          <Route path="/admin/front-office/setup" element={<AdminFrontOfficeSetup />} />
          <Route path="/admin/front-office/settings" element={<AdminFrontOfficeSettings />} />

          {/* House Keeping Routes */}
          <Route path="/admin/house-keeping/operations" element={<AdminHouseKeepingOperations />} />
          <Route path="/admin/house-keeping/setup" element={<AdminHouseKeepingSetup />} />
          <Route path="/admin/house-keeping/settings" element={<AdminHouseKeepingSettings />} />

          {/* Other Admin Routes */}
          <Route path="/admin/kitchen" element={<AdminKitchen />} />
          <Route path="/admin/bar" element={<AdminBar />} />
          <Route path="/admin/stores" element={<AdminStores />} />
          <Route path="/admin/accounts" element={<AdminAccounts />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
