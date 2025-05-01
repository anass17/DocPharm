import Layout from "../../layouts/DefaultLayout"
import HeroSection from "./sections/HeroSection";
import AboutSection from './sections/AboutSection';
import ServicesSection from './sections/ServicesSection';
import SponsorsSection from './sections/SponsorsSection';
import VisitSection from "./sections/VisitSection";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { GRAY2 } from "../../config/colors";

function Home() {

  return (
    <>
        <Navbar bgColor="rgba(255, 255, 255, 0)" textColor={GRAY2} shadow="none" logo="Logo-Dark.png" position="absolute" />
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <VisitSection />
        <SponsorsSection />
        <Footer />
    </>
  )
}

export default Home