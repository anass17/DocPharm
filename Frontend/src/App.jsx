import './App.css'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import Navbar from './components/layouts/Navbar.jsx';
import Home from './Pages/Home';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import VerificationMessage from './Pages/Auth/VerificationMessage';
import RegisterAsDoctor from './Pages/Auth/RegisterAsDoctor';
import RegisterAsPharmacy from './Pages/Auth/RegisterAsPharmacy';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFoundPage from './Pages/Errors/NotFound.jsx';

function App() {


  // const [count, setCount] = useState(0)

  return (
    <>
      {/* <Home /> */}
      {/* <Login /> */}
      {/* <Register /> */}
      {/* <VerificationMessage /> */}
      {/* <RegisterAsDoctor /> */}
      {/* <RegisterAsPharmacy /> */}

      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verifyEmail" element={<VerificationMessage />} />
          <Route component={<NotFoundPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
