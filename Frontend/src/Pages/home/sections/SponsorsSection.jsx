import { Box, Container, Grid2, Typography } from '@mui/material';
import { GRAY0, GREEN, GRAY2, LIGHT_GREEN2 } from "../../../config/colors"
import { Col, Row } from 'antd';


export default function ServicesSection() {
    return (
        <Box sx={{ backgroundColor: LIGHT_GREEN2 }}>
            <Container maxWidth="lg" sx={{ py: "70px" }}>
                <Typography variant="h5" color={GRAY0} textAlign={'center'} component='h2' mb={6}>Our Sponsors</Typography>
                <Row gutter={[16, 30]}>
                    <Col xs={24} sm={12} lg={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img style={{ margin: 'auto' }} src="/images/brands/EverGreen.png" />
                    </Col>
                    <Col xs={24} sm={12} lg={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img style={{ margin: 'auto' }} src="/images/brands/VitalCare.png" />
                    </Col>
                    <Col xs={24} sm={12} lg={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img style={{ margin: 'auto' }} src="/images/brands/NetScale.png" />
                    </Col>
                    <Col xs={24} sm={12} lg={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img style={{ margin: 'auto' }} src="/images/brands/Compa.png" />
                    </Col>
                </Row>
            </Container>
        </Box>
    )
}