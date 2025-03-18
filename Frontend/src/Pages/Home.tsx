import Navbar from "../components/layouts/Navbar"
import HeroSection from "../components/home/HeroSection";
import AboutSection from '../components/home/AboutSection';
import ServicesSection from '../components/home/ServicesSection';
import SponsorsSection from '../components/home/SponsorsSection';
import Footer from '../components/layouts/Footer';

function Home() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Navbar background={false} />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <SponsorsSection />
      <Footer />
    </>
  )
}

export default Home