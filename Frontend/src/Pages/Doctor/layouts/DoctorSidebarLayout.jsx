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
                <div style={{ padding: "3rem 2.5rem", flex: 1 }}>
                    <Box style={{ marginBottom: '55px' }}>
                        <Title level={1}>{title}</Title>
                        <Title level={5} style={{ color: GRAY2 }}>{description}</Title>
                    </Box>
                    {children}
                </div>
            </div>
        </>
    )
}

export default DoctorSidebarLayout;