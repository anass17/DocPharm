import { Box, Container, Grid2, Typography } from '@mui/material';
import { GRAY0, GREEN, GRAY2 } from "../../../config/colors"
import { Col, Row } from 'antd';
import Title from 'antd/es/typography/Title';
import { FaCalendarCheck, FaClock, FaPills, FaPlus, FaStethoscope } from 'react-icons/fa';


export default function ServicesSection() {
    return (
        <Box sx={{ backgroundColor: '#F7F7F7', textAlign: {xs: 'center', md: 'left'} }}>
            <Container maxWidth="lg" sx={{ py: "70px" }}>
                <Typography variant="h5" color={GRAY0} textAlign={'center'} component='h2' mb={3}>Services We Offer</Typography>
                <Typography variant="body1" mb={7} textAlign={'center'} color={GRAY2}>
                    Comprehensive healthcare solutions designed for your convenience
                </Typography>
                <Row gutter={[20, 30]}>
                    <Col xs={24} md={12} xl={6}>
                        <Box sx={{ height: 60, display: 'flex', justifyContent: {xs: 'center', md: 'flex-start'} }}>
                            <FaPills size={40} fill={GREEN} />
                        </Box>
                        <Title level={5}>Order Medicines</Title>
                        <Typography>consectetur adipisicing elit. Obcaecati omnis iusto aliquid dicta recusandae minus a ad </Typography>
                    </Col>
                    <Col xs={24} md={12} xl={6}>
                        <Box sx={{ height: 60, display: 'flex', justifyContent: {xs: 'center', md: 'flex-start'}}}>
                        <FaStethoscope size={38} fill={GREEN} />
                        </Box>
                        <Title level={5}>Find Doctors</Title>
                        <Typography>consectetur adipisicing elit. Obcaecati omnis iusto aliquid dicta recusandae minus a ad </Typography>
                    </Col>
                    <Col xs={24} md={12} xl={6}>
                        <Box sx={{ height: 60, display: 'flex', justifyContent: {xs: 'center', md: 'flex-start'} }}>
                            <FaPlus size={38} fill={GREEN} />
                        </Box>
                        <Title level={5}>Browse Pharmacies</Title>
                        <Typography>consectetur adipisicing elit. Obcaecati omnis iusto aliquid dicta recusandae minus a ad </Typography>
                    </Col>
                    <Col xs={24} md={12} xl={6}>
                        <Box sx={{ height: 60, display: 'flex', justifyContent: {xs: 'center', md: 'flex-start'} }}>
                            <FaCalendarCheck size={37} fill={GREEN} />
                        </Box>
                        <Title level={5}>Book Appointments</Title>
                        <Typography>consectetur adipisicing elit. Obcaecati omnis iusto aliquid dicta recusandae minus a ad </Typography>
                    </Col>
                </Row>
            </Container>
        </Box>
    )
}