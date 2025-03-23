import './App.css'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import Home from './Pages/Home';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import VerificationMessage from './Pages/Auth/VerificationMessage';
import RegisterAsDoctor from './Pages/Auth/RegisterAsDoctor';
import RegisterAsPharmacy from './Pages/Auth/RegisterAsPharmacy';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      {/* <Home /> */}
      {/* <Login /> */}
      <Register />
      {/* <VerificationMessage /> */}
      {/* <RegisterAsDoctor /> */}
      {/* <RegisterAsPharmacy /> */}
    </>
  )
}

export default App
