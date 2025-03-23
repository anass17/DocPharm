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

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFoundPage from './Pages/Errors/NotFound.jsx';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './Pages/store/actions.js';
import UserNavbar from './components/layouts/ClientNavbar.jsx';
import { backend_url } from './config/app.js';

function App() {

  const user = useSelector(data => data.user.user);
  const dispatch = useDispatch();


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
      {/* <Home /> */}
      {/* <Login /> */}
      {/* <Register /> */}
      {/* <VerificationMessage /> */}
      {/* <RegisterAsDoctor /> */}
      {/* <RegisterAsPharmacy /> */}

      <Router>
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
          <Route component={<NotFoundPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
//  (response.status === 422) {
          //     setErrors(responseData.errors);
          // } else if (response.status === 200) {
          //     dispatch(loginUser(responseData.user))
          //     Cookies.set('auth_token', responseData.token, { expires: 1, path: '' });
          //     navigate('/verifyEmail');
          // } else {
          //     alert('An unexpected error occurred.');
          // }