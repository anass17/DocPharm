// import { useState } from 'react'
import './App.css'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Navbar from "./components/navbar"
import HeroSection from "./components/home/HeroSection";
import AboutSection from './components/home/AboutSection';
import ServicesSection from './components/home/ServicesSection';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Navbar background={false} />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
    </>
  )
}

export default App
