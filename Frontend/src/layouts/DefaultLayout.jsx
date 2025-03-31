import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'

function Layout({children}) {

    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}

export default Layout;