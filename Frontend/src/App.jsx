import './App.css'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// import React, { Suspense, lazy } from 'react';
import RoutesList from './routes.jsx'; 

// const Home = lazy(() => import('./Pages/Home'));
// const Login = lazy(() => import('./Pages/auth/Login.jsx'));
// const Logout = lazy(() => import('./Pages/auth/Logout.jsx'));
// const Register = lazy(() => import('./Pages/auth/Register.jsx'));
// const VerificationMessage = lazy(() => import('./Pages/auth/VerificationMessage.jsx'));
// const RegisterAsDoctor = lazy(() => import('./Pages/auth/RegisterAsDoctor.jsx'));
// const RegisterAsPharmacy = lazy(() => import('./Pages/auth/RegisterAsPharmacy.jsx'));
// const PendingMessage = lazy(() => import('./Pages/auth/PendingMessage.jsx'));
// const PharmacyDashboard = lazy(() => import('./Pages/pharmacy/PharmacyDashboard.jsx'));
// const NotFoundPage = lazy(() => import('./Pages/errors/NotFound.jsx'));

// import { BrowserRouter as Router, Routes, Route, useNavigate, redirect } from 'react-router-dom';
// import { useEffect } from 'react';
// import Cookies from 'js-cookie';
// import { useDispatch, useSelector } from 'react-redux';
// import { loginUser } from './store/actions/userActions.js';
// import ClientNavbar from './components/layouts/ClientNavbar.jsx';
// import PharmacyNavbar from './components/layouts/PharmacyNavbar.jsx';
// import { backend_url } from './config/app.js';

// import AuthMiddleware from './middlewares/AuthMiddleware.jsx';
// import Loading from './components/layouts/Loading.jsx';

function App() {

  return(
    <div>
        <RoutesList />
    </div>
  )

  // const user = useSelector(data => data.user.user);
  // const dispatch = useDispatch();


  // const navigate = useNavigate();
  // const [count, setCount] = useState(0)


  // useEffect(() => {
  
  //   if (!user && Cookies.get('auth_token')) {
  //     async function checkUser() {
  //       const response = await fetch(backend_url + '/api/user', {
  //           method: 'GET',
  //           headers: {
  //             'Authorization': 'Bearer ' + Cookies.get('auth_token'),
  //           }
  //       });
  
  //       const responseData = await response.json();
  
  //       if (response.status === 200) {
  //         dispatch(loginUser(responseData.user))
  //       }
  //     }
        
  //     checkUser()
  //   }

    
  // })

  // return (
  //   <>
  //     <Router>

  //       <AuthMiddleware />

  //       {
  //         !user ? (
  //           <Navbar />
  //         ) : (
  //           user.role == "pharmacy" ? (
  //             <PharmacyNavbar />
  //           ) : (
  //             <ClientNavbar />
  //           )
  //         )
  //       }

  //       <Suspense fallback={<Loading />}>
  //         <Routes>
  //           <Route path="/" element={<Home />} />
  //           <Route path="/login" element={<Login />} />
  //           <Route path="/logout" element={<Logout />} />
  //           <Route path="/register" element={<Register />} />
  //           <Route path="/verifyEmail" element={<VerificationMessage />} />
  //           <Route path="/registerAsDoctor" element={<RegisterAsDoctor />} />
  //           <Route path="/RegisterAsPharmacy" element={<RegisterAsPharmacy />} />
  //           <Route path="/pending" element={<PendingMessage />} />

  //           {
  //             user && user.role == "pharmacy" ? (
  //               <Route path="/dashboard" element={<PharmacyDashboard />} />
  //             ) : <></>
  //           }
          
  //           <Route path='*' element={<NotFoundPage />} />
  //         </Routes>
  //       </Suspense>
  //     </Router>
  //   </>
  // )
}

export default App