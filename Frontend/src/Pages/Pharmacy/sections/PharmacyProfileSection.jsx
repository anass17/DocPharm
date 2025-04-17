import { BorderBottom } from "@mui/icons-material";
import { Box, Typography as TP } from "@mui/material";
import { Col, Flex, Row, Typography } from "antd";
import { FaEnvelope, FaFacebook, FaInstagram, FaMapMarker, FaMapMarkerAlt, FaPhone, FaPhoneAlt, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import WorkingHoursLine from "../../../components/Others/WorkingHoursLine";
import { GRAY2, GREEN, GREEN2 } from "../../../config/colors";

const PharmacyProfileSection = () => {
    return (
        <>
            <Box height={400} borderRadius={2} overflow='hidden' mb={4} sx={{ display: 'flex', alignItems: 'flex-end', backgroundPosition: 'center', backgroundSize: 'cover', backgroundImage: 'url("http://localhost:8000/storage/test/pharmacy.jpg")' }}>
                <Box sx={{ bgcolor: 'rgba(0, 0, 0, .7)', width: '100%', py: 2, px: 3 }}>
                    <Typography.Text style={{ color: '#FFF', fontWeight: 500, fontSize: 20}}>Al Amal Pharmacy</Typography.Text>
                    <Typography.Text style={{ display: 'block', color: 'red', fontSize: 14, fontWeight: 500 }}>Closed Now</Typography.Text>
                </Box>
            </Box>
            <Row gutter={16}>
                <Col span={16}>
                    <Box p={3} bgcolor='#FFF' mb={3} boxShadow='0px 1px 2px rgba(0, 0, 0, .2)' borderRadius={2}>
                        <Typography.Title level={4} style={{ marginBottom: 20 }}>About Us</Typography.Title>
                        <TP fontSize={14}>Established in 1995, Pharmacie Centrale has been serving our community for over 30 years. We specialize in prescription medications, homeopathic remedies, and personalized healthcare services. Our team of experienced pharmacists is available 24/7 to assist with all your medical needs.</TP>
                    </Box>

                    <Box p={3} bgcolor='#FFF' boxShadow='0px 1px 2px rgba(0, 0, 0, .2)' borderRadius={2}>
                        <Typography.Title level={4}>Working Hours</Typography.Title>
                        <WorkingHoursLine active={true} day={'Monday'} open_at={"8:00"} close_at={"17:00"} />
                        <WorkingHoursLine day={'Tuesday'} open_at={"8:00"} close_at={"17:00"} />
                        <WorkingHoursLine day={'Wednesday'} open_at={"8:00"} close_at={"17:00"} />
                        <WorkingHoursLine day={'Thursday'} open_at={"8:00"} close_at={"17:00"} />
                        <WorkingHoursLine day={'Friday'} open_at={"8:00"} close_at={"17:00"} />
                        <WorkingHoursLine day={'Saturday'} open_at={"8:00"} close_at={"17:00"} />
                        <WorkingHoursLine day={'Sunday'} open_at={"8:00"} close_at={"17:00"} />
                        
                    </Box>
                </Col>
                <Col span={8}>
                    <Box p={3} bgcolor='#FFF' boxShadow='0px 1px 2px rgba(0, 0, 0, .2)' borderRadius={2}>
                        <Typography.Title level={4}>Contact Information</Typography.Title>
                        <Box sx={{ mb: 2.5, fontWeight: 500 }}>
                            <Typography.Text style={{ display: 'flex', gap: 15, padding: '0.3rem 0', alignItems: 'center' }}><FaPhoneAlt color={GREEN} fontSize={15} />+212 612345678</Typography.Text>
                            <Typography.Text style={{ display: 'flex', gap: 15, padding: '0.3rem 0', alignItems: 'center' }}><FaEnvelope color={GREEN} fontSize={15} />info@pharmacy.com</Typography.Text>
                            <Typography.Text style={{ display: 'flex', gap: 15, padding: '0.3rem 0', alignItems: 'center' }}><FaMapMarkerAlt color={GREEN} fontSize={15} />123 Health Street, Medical District, NY 1002</Typography.Text>
                        </Box>
                        <Box>
                            <Typography.Text style={{ fontWeight: 500, marginBottom: 15, display: 'block' }}>Follow Us</Typography.Text>
                            <Box style={{ display: 'flex', gap: 20 }}>
                                <Box sx={{ color: GRAY2, '&:hover': {color: '#1877F2'} }}>
                                    <Link to='#' style={{ color: "inherit" }} >
                                        <FaFacebook size={20} />
                                    </Link>
                                </Box>
                                <Box sx={{ color: GRAY2, '&:hover': {color: '#E1306C'} }}>
                                    <Link to='#' style={{ color: "inherit" }}>
                                        <FaInstagram size={20} />
                                    </Link>
                                </Box>
                                <Box sx={{ color: GRAY2, '&:hover': {color: '#1DA1F2'} }}>
                                    <Link to='#' style={{ color: "inherit" }}>
                                        <FaTwitter size={20} />
                                    </Link>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Col>
            </Row>
        </>
    )
}

export default PharmacyProfileSection;