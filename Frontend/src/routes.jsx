import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React, { Suspense, lazy, useEffect } from 'react';
import LoadingOverlay from './components/Loading/LoadingOverlay.jsx';
import UserDoctorsListing from './Pages/user/UserDoctorsListing.jsx';
import UserPharmacyView from './Pages/user/UserPharmacyView.jsx';
import UserAppointmentsListing from './Pages/user/UserAppointmentsListing.jsx';
import UserOrdersListing from './Pages/user/UserOrdersListing.jsx';
import AdminUserManagement from './Pages/admin/AdminUserManagement.jsx';
import AdminPendingUsers from './Pages/admin/AdminPendingUsers.jsx';
import AdminPendingUserView from './Pages/admin/AdminPendingUserView.jsx';
import AdminBannedUsers from './Pages/admin/AdminBannedUsers.jsx';
import AdminSettings from './Pages/admin/AdminSettings.jsx';
import UserSettings from './Pages/user/UserSettings.jsx';
import UserProfile from './Pages/user/UserProfile.jsx';
import AdminProfile from './Pages/admin/AdminProfile.jsx';
import UserPrescriptionView from './Pages/user/UserPrescriptionView.jsx';
import UserDashboard from './Pages/user/UserDashboard.jsx';
import AdminDashboard from './Pages/admin/AdminDashboard.jsx';
import FaqsPage from './Pages/Common/Faqs.jsx';
import ContactPage from './Pages/Common/Contact.jsx';
import BannedMessage from './Pages/Auth/BannedMessage.jsx';

const HomePage = lazy(() => import('./Pages/home/Home.jsx'));

// Authentication

const LoginPage = lazy(() => import('./Pages/auth/Login.jsx'));
const RegisterPage = lazy(() => import('./Pages/auth/Register.jsx'));
const RegisterAsDoctorPage = lazy(() => import('./Pages/auth/RegisterAsDoctor.jsx'));
const RegisterAsPharmacyPage = lazy(() => import('./Pages/auth/RegisterAsPharmacy.jsx'));
const Logout = lazy(() => import('./Pages/auth/Logout.jsx'));
const PendingMessage = lazy(() => import('./Pages/auth/PendingMessage.jsx'));
const VerificationMessage = lazy(() => import('./Pages/auth/VerificationMessage.jsx'));

// Pharmacy

const PharmacyDashboard = lazy(() => import('./Pages/pharmacy/PharmacyDashboard.jsx'));
const PharmacyInventory = lazy(() => import('./Pages/pharmacy/PharmacyInventory.jsx'));
const PharmacyMedicine = lazy(() => import('./Pages/pharmacy/PharmacyMedicine.jsx'));
const PharmacyOrders = lazy(() => import('./Pages/pharmacy/PharmacyOrders.jsx'));
const PharmacyOrdersHistory = lazy(() => import('./Pages/pharmacy/PharmacyOrdersHistory.jsx'));
const PharmacyProfile = lazy(() => import('./Pages/pharmacy/PharmacyProfile.jsx'));
const PharmacySettings = lazy(() => import('./Pages/pharmacy/PharmacySettings.jsx'));

// Client

const UserMedicine = lazy(() => import('./Pages/user/UserMedicine.jsx'));
const UserPaymentSuccess = lazy(() => import('./Pages/user/UserPaymentSuccess.jsx'));
const UserMedicines = lazy(() => import('./Pages/user/UserMedicines.jsx'));
const UserBookAppointment = lazy(() => import('./Pages/user/UserBookAppointment.jsx'));
const UserPharmacyListing = lazy(() => import('./Pages/user/UserPharmaciesListing.jsx'));

// Doctor

const DoctorProfile = lazy(() => import('./Pages/Doctor/DoctorProfile.jsx'));
const DoctorSettings = lazy(() => import('./Pages/Doctor/DoctorSettings.jsx'));
const DoctorAppointments = lazy(() => import('./Pages/Doctor/DoctorAppointments.jsx'));
const DoctorAppointmentsHistory = lazy(() => import('./Pages/Doctor/DoctorAppointmentsHistory.jsx'));
const DoctorDashboard = lazy(() => import('./Pages/Doctor/DoctorDashboard.jsx'));


// Errors

const NotFound = lazy(() => import('./Pages/errors/NotFound.jsx'));
const Unauthorized = lazy(() => import('./Pages/errors/Unauthorized.jsx'));

// Dashboard Redirection

const DashboardRedirection = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (user.role == 'pharmacy') {
      navigate('/pharmacy/dashboard');
    } else if (user.role == 'doctor') {
      navigate('/doctor/dashboard');
    } else if (user.role == 'admin') {
      navigate('/admin/dashboard');
    } else if (user.role == 'client') {
      navigate('/medicines');
    } else {
      navigate('/unauthorized');
    }
  }, [isAuthenticated]);
}

// Private Routes

const PrivateRoute = ({ roles, element }) => {
    const { isAuthenticated, user } = useSelector((state) => state.user);

    if (!isAuthenticated) {
      return <Navigate to='/login' replace />
    }
  
    if (user.verification_step === 'incomplete') {
        if (user.role === 'doctor') {
          return <Navigate to='/register/doctor' replace />
        } else if (user.role === 'pharmacy') {
          return <Navigate to='/register/pharmacy' replace />
        }
    }

    if (user.status === 'pending') {
      return <Navigate to='/pending' replace />
    } else if (user.status === 'banned') {
      return <Navigate to='/banned' replace />
    }
    
    if (!roles.includes(user.role)) {
      return <Navigate to='/unauthorized' replace />
    }
  
    return isAuthenticated && roles.includes(user.role) ? element : null;
};

// Routes List

const RoutesList = () => {
    return (
      <Router>
        <Suspense fallback={<LoadingOverlay />}>
          <Routes>

            <Route path="/dashboard" element={<DashboardRedirection />} />

            {/* Authentication */}

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register/doctor" element={<RegisterAsDoctorPage />} />
            <Route path="/register/pharmacy" element={<RegisterAsPharmacyPage />} />
            <Route path="/pending" element={<PendingMessage />} />
            <Route path="/verification" element={<VerificationMessage />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/banned" element={<BannedMessage />} />

    
            {/* Pharmacy Routes */}

            <Route path="/pharmacy/dashboard" 
              element={
                <PrivateRoute roles={['pharmacy']} element={<PharmacyDashboard />} />
              } 
            />
            <Route path="/pharmacy/inventory" 
              element={
                <PrivateRoute roles={['pharmacy']} element={<PharmacyInventory />} />
              } 
            />
            <Route path="/pharmacy/medicines/:id" 
              element={
                <PrivateRoute roles={['pharmacy']} element={<PharmacyMedicine />} />
              } 
            />
            <Route path="/pharmacy/orders" 
              element={
                <PrivateRoute roles={['pharmacy']} element={<PharmacyOrders />} />
              } 
            />
            <Route path="/pharmacy/history" 
              element={
                <PrivateRoute roles={['pharmacy']} element={<PharmacyOrdersHistory />} />
              } 
            />
            <Route path="/pharmacy/profile" 
              element={
                <PrivateRoute roles={['pharmacy']} element={<PharmacyProfile />} />
              } 
            />
            <Route path="/pharmacy/settings" 
              element={
                <PrivateRoute roles={['pharmacy']} element={<PharmacySettings />} />
              } 
            />



            {/* Client Routes */}

            <Route path="/medicines" 
              element={
                <PrivateRoute roles={['user']} element={<UserMedicines />} />
              } 
            />
            <Route path="/pharmacies" 
              element={
                <PrivateRoute roles={['user']} element={<UserPharmacyListing />} />
              } 
            />
            <Route path="/doctors" 
              element={
                <PrivateRoute roles={['user']} element={<UserDoctorsListing />} />
              } 
            />
            <Route path="/pharmacies/:id" 
              element={
                <PrivateRoute roles={['user']} element={<UserPharmacyView />} />
              } 
            />
            <Route path="/medicines/:id" 
              element={
                <PrivateRoute roles={['user']} element={<UserMedicine />} />
              } 
            />
            <Route path="/doctors/:id" 
              element={
                <PrivateRoute roles={['user']} element={<UserBookAppointment />} />
              } 
            />
            <Route path="/payment_success" 
              element={
                <PrivateRoute roles={['user']} element={<UserPaymentSuccess />} />
              } 
            />
            <Route path="/client/appointments" 
              element={
                <PrivateRoute roles={['user']} element={<UserAppointmentsListing />} />
              } 
            />
            <Route path="/client/orders" 
              element={
                <PrivateRoute roles={['user']} element={<UserOrdersListing />} />
              } 
            />
            <Route path="/settings" 
              element={
                <PrivateRoute roles={['user']} element={<UserSettings />} />
              } 
            />
            <Route path="/profile" 
              element={
                <PrivateRoute roles={['user']} element={<UserProfile />} />
              } 
            />
            <Route path="/client/dashboard" 
              element={
                <PrivateRoute roles={['user']} element={<UserDashboard />} />
              } 
            />
            <Route path="/client/prescriptions/:id" 
              element={
                <PrivateRoute roles={['user']} element={<UserPrescriptionView />} />
              } 
            />


            {/* Doctor Routes */}

            <Route path="/doctor/dashboard" 
              element={
                <PrivateRoute roles={['doctor']} element={<DoctorDashboard />} />
              } 
            />
            <Route path="/doctor/profile" 
              element={
                <PrivateRoute roles={['doctor']} element={<DoctorProfile />} />
              } 
            />
            <Route path="/doctor/settings" 
              element={
                <PrivateRoute roles={['doctor']} element={<DoctorSettings />} />
              } 
            />
            <Route path="/doctor/appointments" 
              element={
                <PrivateRoute roles={['doctor']} element={<DoctorAppointments />} />
              } 
            />
            <Route path="/doctor/appointments/history" 
              element={
                <PrivateRoute roles={['doctor']} element={<DoctorAppointmentsHistory />} />
              } 
            />


            {/* Admin Routes */}

            <Route path="/admin/users" 
              element={
                <PrivateRoute roles={['admin']} element={<AdminUserManagement />} />
              } 
            />
            <Route path="/admin/users/pending" 
              element={
                <PrivateRoute roles={['admin']} element={<AdminPendingUsers />} />
              } 
            />
            <Route path="/admin/users/pending/:id" 
              element={
                <PrivateRoute roles={['admin']} element={<AdminPendingUserView />} />
              } 
            />
            <Route path="/admin/users/banned" 
              element={
                <PrivateRoute roles={['admin']} element={<AdminBannedUsers />} />
              } 
            />
            <Route path="/admin/settings" 
              element={
                <PrivateRoute roles={['admin']} element={<AdminSettings />} />
              } 
            />
            <Route path="/admin/profile" 
              element={
                <PrivateRoute roles={['admin']} element={<AdminProfile />} />
              } 
            />
            <Route path="/admin/dashboard" 
              element={
                <PrivateRoute roles={['admin']} element={<AdminDashboard />} />
              } 
            />

            {/* Common Routes */}

            <Route path="/" element={<HomePage />} />
            <Route path="/faqs" element={<FaqsPage />} />
            <Route path="/contact" element={<ContactPage />} />
    
            {/* Catch-all route for undefined paths */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    );
};

export default RoutesList;