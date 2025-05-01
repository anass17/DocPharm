import { Typography } from 'antd';
import AdminSidebar from '../../../components/Sidebar/AdminSidebar';
import AdminNavbar from '../../../components/Navbar/AdminNavbar';
import { Box } from '@mui/material';

const {Title} = Typography

function AdminSidebarLayout({children, menuItem}) {

    return (
        <>
            <AdminNavbar />
            <div style={{ display: "flex" }}>
                <AdminSidebar menuItem={menuItem} />
                <Box sx={{ padding: {xs: "2rem 1.5rem", md: "3rem 2.5rem"}, flex: 1 }}>
                    {children}
                </Box>
            </div>
        </>
    )
}

export default AdminSidebarLayout;