import DoctorSidebar from '../../../components/Sidebar/DoctorSidebar'
import DoctorNavbar from '../../../components/Navbar/DoctorNavbar';
import { Typography } from 'antd';
import { Box } from '@mui/material';
import { GRAY2 } from '../../../config/colors';

const {Title} = Typography

function DoctorSidebarLayout({children, menuItem, title, description}) {

    return (
        <>
            <DoctorNavbar />
            <div style={{ display: "flex" }}>
                <DoctorSidebar menuItem={menuItem} />
                <Box sx={{ padding: {xs: "2rem 1.5rem", md: "3rem 2.5rem"}, flex: 1 }}>
                    <Box sx={{ marginBottom: '55px', textAlign: {xs: 'center', lg: 'left'} }}>
                        <Title level={1}>{title}</Title>
                        <Title level={5} style={{ color: GRAY2 }}>{description}</Title>
                    </Box>
                    {children}
                </Box>
            </div>
        </>
    )
}

export default DoctorSidebarLayout;