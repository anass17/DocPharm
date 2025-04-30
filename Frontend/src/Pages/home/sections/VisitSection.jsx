import { Box, Container, Grid2, Typography } from '@mui/material';
import { GRAY0, GREEN, GRAY2, GREEN5, LIGHT_GREEN_ACCENT, GRAY3 } from "../../../config/colors"
import { Col, Row } from 'antd';
import Title from 'antd/es/typography/Title';
import { FaCalendarCheck, FaClock, FaFilePrescription, FaHandHoldingMedical, FaPills, FaSearch } from 'react-icons/fa';

export default function VisitSection() {
    return (
        <Box sx={{ bgcolor: '#FFF' }}>
            <Container maxWidth="lg" sx={{ py: "70px" }}>
                <Typography variant="h5" color={GRAY0} textAlign={'center'} component='h2' mb={3}>Visit Specialist Doctor</Typography>
                <Typography variant="body1" mb={7} textAlign={'center'} color={GRAY2}>
                    Simple steps to connect with healthcare professionals
                </Typography>

                <Row gutter={[16, 30]} style={{ textAlign: 'center' }}>
                    <Col xs={24} sm={12} lg={8}>
                        <Box sx={{ display: 'flex', margin: '0 auto 20px', justifyContent: 'center', width: 40, height: 40, alignItems: 'center', borderRadius: '100%', backgroundColor: GREEN5 }}>
                            <FaSearch size={20} fill={GREEN} />
                        </Box>
                        <Title level={5} style={{ marginBottom : 4 }}>Find Doctor</Title>
                        <Typography variant='body1' style={{ color: GRAY3 }}>Search and filter doctors by speciality</Typography>
                    </Col>
                    <Col xs={24} sm={12} lg={8}>
                        <Box sx={{ display: 'flex', margin: '0 auto 20px', justifyContent: 'center', width: 40, height: 40, alignItems: 'center', borderRadius: '100%', backgroundColor: GREEN5 }}>
                            <FaCalendarCheck size={20} fill={GREEN} />
                        </Box>
                        <Title level={5} style={{ marginBottom : 4 }}>Check Availability</Title>
                        <Typography variant='body1' style={{ color: GRAY3 }}>View available time slots</Typography>
                    </Col>
                    <Col xs={24} sm={12} lg={8}>
                        <Box sx={{ display: 'flex', margin: '0 auto 20px', justifyContent: 'center', width: 40, height: 40, alignItems: 'center', borderRadius: '100%', backgroundColor: GREEN5 }}>
                            <FaClock size={20} fill={GREEN} />
                        </Box>
                        <Title level={5} style={{ marginBottom : 4 }}>Book Appointment</Title>
                        <Typography variant='body1' style={{ color: GRAY3 }}>Schedule your visit</Typography>
                    </Col>
                    <Col xs={24} sm={12} lg={8}>
                        <Box sx={{ display: 'flex', margin: '0 auto 20px', justifyContent: 'center', width: 40, height: 40, alignItems: 'center', borderRadius: '100%', backgroundColor: GREEN5 }}>
                            <FaFilePrescription size={20} fill={GREEN} />
                        </Box>
                        <Title level={5} style={{ marginBottom : 4 }}>Get Prescription</Title>
                        <Typography variant='body1' style={{ color: GRAY3 }}>Receive your medical prescription</Typography>
                    </Col>
                    <Col xs={24} sm={12} lg={8}>
                        <Box sx={{ display: 'flex', margin: '0 auto 20px', justifyContent: 'center', width: 40, height: 40, alignItems: 'center', borderRadius: '100%', backgroundColor: GREEN5 }}>
                            <FaPills size={20} fill={GREEN} />
                        </Box>
                        <Title level={5} style={{ marginBottom : 4 }}>Purchase Medicines</Title>
                        <Typography variant='body1' style={{ color: GRAY3 }}>Place an order of the medicines you need</Typography>
                    </Col>
                    <Col xs={24} sm={12} lg={8}>
                        <Box sx={{ display: 'flex', margin: '0 auto 20px', justifyContent: 'center', width: 40, height: 40, alignItems: 'center', borderRadius: '100%', backgroundColor: GREEN5 }}>
                            <FaHandHoldingMedical size={20} fill={GREEN} />
                        </Box>
                        <Title level={5} style={{ marginBottom : 4 }}>Receive them</Title>
                        <Typography variant='body1' style={{ color: GRAY3 }}>Get your medicines either by delivery or visiting pharmacy</Typography>
                    </Col>
                </Row>
            </Container>
        </Box>
    )
}