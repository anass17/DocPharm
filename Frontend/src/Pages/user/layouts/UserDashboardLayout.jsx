import { Typography } from 'antd';
import { Box } from '@mui/material';
import { GRAY2 } from '../../../config/colors';
import UserNavbar from '../../../components/Navbar/UserNavbar';
import UserSidebar from '../../../components/Sidebar/UserSidebar';

const {Title} = Typography

function UserDashboardLayout({children, menuItem, title, description}) {

    return (
        <>
            <UserNavbar />
            <div style={{ display: "flex" }}>
                <UserSidebar menuItem={menuItem} />
                <div style={{ padding: "3rem 2.5rem", flex: 1 }}>
                    <Box sx={{ marginBottom: '55px', textAlign: {xs: 'center', lg: 'left'} }}>
                        <Title level={1}>{title}</Title>
                        <Title level={5} style={{ color: GRAY2 }}>{description}</Title>
                    </Box>
                    {children}
                </div>
            </div>
        </>
    )
}

export default UserDashboardLayout;