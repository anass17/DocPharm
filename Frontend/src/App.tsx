import './App.css'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import Home from './Pages/Home';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';



function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      {/* <Home /> */}
      {/* <Login /> */}
      <Register />
    </>
  )
}

export default App
