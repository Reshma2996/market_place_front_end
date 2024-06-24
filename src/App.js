import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import CreateEquipment from './components/CreateEquipment';
import BookingForm from './components/BookingForm';
import BookingLogs from './components/BookingLogs';
import Navbar from './components/Navbar';
import Login from './components/LoginForm';
import OwnerLogin from './components/OwnerLoginForm';
import Register from './components/RegisterForm';
import OwnerRegister from './components/OwnerRegisterForm';
import Dashboard from './components/Dashboard';
import OwnerDashboard from './components/OwnerDashboard';
import { AuthProvider, AuthContext } from './context/AuthContext';
import EditEquipment from './components/EditEquipment';
import DeleteEquipment from './components/DeleteEquipment';
import SearchEquipment from './components/SearchEquipment';
import PaymentPage from './pages/PaymentPage';

const AppRoutes = () => {
  const { isAuthenticated } = React.useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-equipment" element={<CreateEquipment />} />
      <Route path="/edit-equipment" element={<EditEquipment />} />
      <Route path="/search-equipment" element={<SearchEquipment />} />
      <Route path="/delete-equipment" element={<DeleteEquipment />} />
      <Route path="/bookings/create/:id" element={<BookingForm />} />
      <Route path="/bookings" element={<BookingLogs />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/owner-login" element={<OwnerLogin />} />
      <Route path="/owner-register" element={<OwnerRegister />} />

      {isAuthenticated ? (
        <>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/owner-dashboard" element={<OwnerDashboard />} />
          <Route path="/payment" element={<PaymentPage />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container mt-4">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
