import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();
  
    useEffect(() => {
      if (!isAuthenticated) {
        navigate('/login');
      } else if (!roles.includes(user.role)) {
        navigate('/unauthorized');
      }
    }, [isAuthenticated]);
  
    return isAuthenticated && roles.includes(user.role) ? element : null;
};

// Routes List

const RoutesList = () => {
    return (
      <Router>
        <Suspense fallback={<LoadingOverlay />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register/doctor" element={<RegisterAsDoctorPage />} />
            <Route path="/register/pharmacy" element={<RegisterAsPharmacyPage />} />
            <Route path="/pending" element={<PendingMessage />} />
            <Route path="/verification" element={<VerificationMessage />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            <Route path="/dashboard" element={<DashboardRedirection />} />

    
            {/* Protected Routes */}
            {/* <PrivateRoute
              path="/admin"
              roles={['admin']}  // Only Admin can access
              component={() => (
                <AdminLayout>
                <AdminDashboard />
                </AdminLayout>
                )}
                />
                
                <PrivateRoute
                path="/pharmacy"
                roles={['pharmacy']}  // Only Pharmacy can access
                component={() => (
                  <PharmacyLayout>
                  <PharmacyDashboard />
                  </PharmacyLayout>
                  )}
                  />
            
            <PrivateRoute
            path="/doctor"
            roles={['doctor']}  // Only Doctor can access
            component={() => (
              <DoctorLayout>
              <DoctorDashboard />
              </DoctorLayout>
              )}
              /> */}
            
            {/* Pharmacy Routes */}

            <Route path="/pharmacy/dashboard" element={<PharmacyDashboard />} />
            {/* <Route path="/pharmacy/dashboard" element={<PrivateRoute roles={['pharmacy']} element={<PharmacyDashboard />} />} /> */}
            {/* <Route path="/pharmacy/inventory" element={<PrivateRoute roles={['pharmacy']} element={<PharmacyInventory />} />} /> */}
            <Route path="/pharmacy/inventory" element={<PharmacyInventory />} />
            <Route path="/pharmacy/medicines/:id" element={<PharmacyMedicine />} />
            <Route path="/pharmacy/orders" element={<PharmacyOrders />} />
            <Route path="/pharmacy/history" element={<PharmacyOrdersHistory />} />
            <Route path="/pharmacy/profile" element={<PharmacyProfile />} />
            <Route path="/pharmacy/settings" element={<PharmacySettings />} />



            {/* User Routes */}

            <Route path="/medicines" element={<UserMedicines />} />
            <Route path="/pharmacies" element={<UserPharmacyListing />} />
            <Route path="/doctors" element={<UserDoctorsListing />} />
            <Route path="/pharmacies/:id" element={<UserPharmacyView />} />
            <Route path="/medicines/:id" element={<UserMedicine />} />
            <Route path="/doctors/:id" element={<UserBookAppointment />} />
            <Route path="/payment_success" element={<UserPaymentSuccess />} />
            <Route path="/client/appointments" element={<UserAppointmentsListing />} />
            <Route path="/client/orders" element={<UserOrdersListing />} />


            {/* Doctor Routes */}

            <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
            <Route path="/doctor/profile" element={<DoctorProfile />} />
            <Route path="/doctor/settings" element={<DoctorSettings />} />
            <Route path="/doctor/appointments" element={<DoctorAppointments />} />
            <Route path="/doctor/appointments/history" element={<DoctorAppointmentsHistory />} />


            {/* Doctor Routes */}

            <Route path="/admin/users" element={<AdminUserManagement />} />
            <Route path="/admin/users/pending" element={<AdminPendingUsers />} />
            <Route path="/admin/users/pending/:id" element={<AdminPendingUserView />} />
            <Route path="/admin/users/banned" element={<AdminBannedUsers />} />
    
            {/* Catch-all route for undefined paths */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    );
};

export default RoutesList;