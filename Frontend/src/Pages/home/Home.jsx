import Layout from "../../layouts/DefaultLayout"
import HeroSection from "./sections/HeroSection";
import AboutSection from './sections/AboutSection';
import ServicesSection from './sections/ServicesSection';
import SponsorsSection from './sections/SponsorsSection';

function Home() {

  return (
    <>
      <Layout>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <SponsorsSection />
      </Layout>
    </>
  )
}

export default Home