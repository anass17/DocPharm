import Layout from "../../layouts/DefaultLayout"
import HeroSection from "./sections/HeroSection";
import AboutSection from './sections/AboutSection';
import ServicesSection from './sections/ServicesSection';
import SponsorsSection from './sections/SponsorsSection';
import VisitSection from "./sections/VisitSection";

function Home() {

  return (
    <>
      <Layout>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <VisitSection />
        <SponsorsSection />
      </Layout>
    </>
  )
}

export default Home