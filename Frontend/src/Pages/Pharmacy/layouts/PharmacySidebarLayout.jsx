import PharmacySidebar from '../../../components/Sidebar/PharmacySidebar'
import PharmacyNavbar from '../../../components/Navbar/PharmacyNavbar';
import { useState } from 'react';
import { Typography } from 'antd';
import { Box } from '@mui/material';

const {Title} = Typography

function PharmacyLayout({children, menuItem, title}) {

    return (
        <>
            <PharmacyNavbar />
            <div style={{ display: "flex" }}>
                <PharmacySidebar menuItem={menuItem} />
                <Box sx={{ padding: {xs: "2rem 1.5rem", md: "3rem 2.5rem"}, flex: 1 }}>
                    <Title level={1} style={{ textAlign: 'center', marginBottom: '55px' }}>{title}</Title>
                    {children}
                </Box>
            </div>
        </>
    )
}

export default PharmacyLayout;