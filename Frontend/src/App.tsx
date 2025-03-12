// import { useState } from 'react'
import './App.css'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Navbar from "./components/navbar"
import HeroSection from './components/home/heroSection';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Navbar background={false} />
      <HeroSection />
    </>
  )
}

export default App
