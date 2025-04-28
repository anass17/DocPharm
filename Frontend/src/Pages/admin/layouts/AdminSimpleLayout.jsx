import AdminSidebar from '../../../components/Sidebar/AdminSidebar';
import AdminNavbar from '../../../components/Navbar/AdminNavbar';
import { Container } from '@mui/material';

function AdminSimpleLayout({children}) {

    return (
        <>
            <AdminNavbar />
            <Container maxWidth="xl" sx={{py: 6}}>
                {children}
            </Container>
        </>
    )
}

export default AdminSimpleLayout;