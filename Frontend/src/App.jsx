import './App.css'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import Navbar from './components/layouts/Navbar.jsx';
import Home from './Pages/Home';
import Login from './Pages/Auth/Login';
import Logout from './Pages/Auth/Logout';
import Register from './Pages/Auth/Register';
import VerificationMessage from './Pages/Auth/VerificationMessage';
import RegisterAsDoctor from './Pages/Auth/RegisterAsDoctor';
import RegisterAsPharmacy from './Pages/Auth/RegisterAsPharmacy';
import PendingMessage from './Pages/Auth/PendingMessage';

import { BrowserRouter as Router, Routes, Route, useNavigate, redirect } from 'react-router-dom';
import NotFoundPage from './Pages/Errors/NotFound.jsx';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './store/actions.js';
import UserNavbar from './components/layouts/ClientNavbar.jsx';
import { backend_url } from './config/app.js';

import AuthMiddleware from './middlewares/AuthMiddleware.jsx';

function App() {

  const user = useSelector(data => data.user.user);
  const dispatch = useDispatch();
  // const navigate = useNavigate();


  // const [count, setCount] = useState(0)


  useEffect(() => {
  
    if (!user && Cookies.get('auth_token')) {
      async function checkUser() {
        const response = await fetch(backend_url + '/api/user', {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + Cookies.get('auth_token'),
            }
        });
  
        const responseData = await response.json();
  
        if (response.status === 200) {
          dispatch(loginUser(responseData.user))
        }
      }
        
      checkUser()
    }

    
  })

  return (
    <>
      <Router>

        <AuthMiddleware />

        {
          !user ? (
            <Navbar />
          ) : (
            <UserNavbar />
          )
        }

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verifyEmail" element={<VerificationMessage />} />
          <Route path="/registerAsDoctor" element={<RegisterAsDoctor />} />
          <Route path="/RegisterAsPharmacy" element={<RegisterAsPharmacy />} />
          <Route path="/pending" element={<PendingMessage />} />
          <Route component={<NotFoundPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App