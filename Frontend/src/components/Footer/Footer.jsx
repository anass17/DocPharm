import { Box, Container, Grid2, Link, Typography } from '@mui/material';
import { GRAY0, GREEN, GRAY2, GRAY3, GRAY4 } from "../../config/colors"
import { Col, Row } from 'antd';

export default function Footer() {
    return (
        <Box sx={{ backgroundColor: GRAY0 }}>
            <Container maxWidth="lg">
                <Row gutter={[16, 35]} style={{ padding: '2.5rem 0' }}>
                    <Col xs={24} md={12} lg={6}>
                        <Typography variant="h5" color={'#FFF'} component='h2' mb={2}>DocPharm</Typography>
                        <Typography variant="body1" color={'#9CA3AF'}>Making healthcare accessible and convenient for everyone.</Typography>
                    </Col>
                    <Col xs={24} md={12} lg={6}>
                        <Typography variant="h6" color={'#FFF'} component='h3' mb={2}>Quick Links</Typography>
                        <Box color={'#9CA3AF'} sx={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                            <Link href="/login" sx={{textDecoration: 'none', color: 'inherit', fontFamily: 'inherit'}}>Medicines</Link>
                            <Link href="/login" sx={{textDecoration: 'none', color: 'inherit', fontFamily: 'inherit'}}>Doctors</Link>
                            <Link href="/login" sx={{textDecoration: 'none', color: 'inherit', fontFamily: 'inherit'}}>Pharmacies</Link>
                            <Link href="/faqs" sx={{textDecoration: 'none', color: 'inherit', fontFamily: 'inherit'}}>FAQs</Link>
                        </Box>
                    </Col>
                    <Col xs={24} md={12} lg={6}>
                        <Typography variant="h6" color={'#FFF'} component='h3' mb={2}>Contact</Typography>
                        <Box color={'#9CA3AF'} sx={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                            <Typography variant="body1">+212 645875426</Typography>
                            <Typography variant="body1">contact@docpharm.ma</Typography>
                        </Box>
                    </Col>
                    <Col xs={24} md={12} lg={6}>
                        <Typography variant="h6" color={'#FFF'} component='h3' mb={2}>Address</Typography>
                        <Typography color={'#9CA3AF'} variant="body1">123 Hay Essalam<br />
                            Massira Street<br />
                            Safi, Morocco
                        </Typography>
                    </Col>
                </Row>
                <hr style={{ borderColor: GRAY0 }} />
                <Typography py={2} variant='body1' textAlign={'center'} color='#9CA3AF'>© 2025 DocPharm. All rights reserved.</Typography>
            </Container>
        </Box>
    )
}