import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React, { Suspense, lazy, useEffect } from 'react';
import LoadingOverlay from './components/Loading/LoadingOverlay.jsx';
import UserMedicines from './Pages/user/UserMedicines.jsx';

// Authentication

const HomePage = lazy(() => import('./Pages/home/Home.jsx'));
const LoginPage = lazy(() => import('./Pages/auth/Login.jsx'));
const RegisterPage = lazy(() => import('./Pages/auth/Register.jsx'));
const RegisterAsDoctorPage = lazy(() => import('./Pages/auth/RegisterAsDoctor.jsx'));
const RegisterAsPharmacyPage = lazy(() => import('./Pages/auth/RegisterAsPharmacy.jsx'));
const Logout = lazy(() => import('./Pages/auth/Logout.jsx'));
const PendingMessage = lazy(() => import('./Pages/auth/PendingMessage.jsx'));
const VerificationMessage = lazy(() => import('./Pages/auth/VerificationMessage.jsx'));


const PharmacyDashboard = lazy(() => import('./Pages/pharmacy/PharmacyDashboard.jsx'));
const PharmacyInventory = lazy(() => import('./Pages/pharmacy/PharmacyInventory.jsx'));
const PharmacyMedicine = lazy(() => import('./Pages/pharmacy/PharmacyMedicine.jsx'));



const UserMedicine = lazy(() => import('./Pages/user/UserMedicine.jsx'));
const UserPaymentSuccess = lazy(() => import('./Pages/user/UserPaymentSuccess.jsx'));

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
    } else if (user.role == 'user') {
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
            
            <Route path="/pharmacy/dashboard" element={<PharmacyDashboard />} />
            {/* <Route path="/pharmacy/dashboard" element={<PrivateRoute roles={['pharmacy']} element={<PharmacyDashboard />} />} /> */}
            {/* <Route path="/pharmacy/inventory" element={<PrivateRoute roles={['pharmacy']} element={<PharmacyInventory />} />} /> */}
            <Route path="/pharmacy/inventory" element={<PharmacyInventory />} />
            <Route path="/pharmacy/medicines/:id" element={<PharmacyMedicine />} />





            <Route path="/medicines" element={<UserMedicines />} />
            <Route path="/medicines/:id" element={<UserMedicine />} />


            <Route path="/payment_success" element={<UserPaymentSuccess />} />
    
            {/* Catch-all route for undefined paths */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    );
};

export default RoutesList;