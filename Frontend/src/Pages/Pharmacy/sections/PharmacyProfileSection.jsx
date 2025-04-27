import { BorderBottom } from "@mui/icons-material";
import { Box, Typography as TP } from "@mui/material";
import { Col, Flex, Image, Row, Typography } from "antd";
import { FaEnvelope, FaFacebook, FaInstagram, FaMapMarker, FaMapMarkerAlt, FaPhone, FaPhoneAlt, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import WorkingHoursLine from "../../../components/Others/WorkingHoursLine";
import { GRAY2, GREEN, GREEN2 } from "../../../config/colors";
import { useSelector } from "react-redux";
import { backend_url } from "../../../config/app";

function isTimeInRange(time, start, end) {
    const [tHours, tMinutes] = time.split(':').map(Number);
    const [sHours, sMinutes] = start.split(':').map(Number);
    const [eHours, eMinutes] = end.split(':').map(Number);
  
    const timeMinutes = tHours * 60 + tMinutes;
    const startMinutes = sHours * 60 + sMinutes;
    const endMinutes = eHours * 60 + eMinutes;
  
    return timeMinutes >= startMinutes && timeMinutes <= endMinutes;
}

const PharmacyProfileSection = () => {

    const user = useSelector(data => data.user.user)

    const currentDay = (new Date()).toLocaleDateString('en-En', {weekday: 'long'}).toLowerCase()

    return (
        <>
            <Box height={400} borderRadius={2} overflow='hidden' mb={4} sx={{ position: 'relative'}}>
                <Image
                    width={'100%'}
                    height={'100%'}
                    className="object-cover"
                    src={`${backend_url}${user?.building_image ? user.building_image : '/storage/horizontal_image_placeholder.png'}`}
                />
                <Box sx={{ position: 'absolute', bottom: 0, left: 0,  bgcolor: 'rgba(0, 0, 0, .7)', width: '100%', py: 2, px: 3 }}>
                    <Typography.Text style={{ color: '#FFF', fontWeight: 500, fontSize: 20}}>{user?.pharmacy_name}</Typography.Text>
                    
                        {
                            !user?.working_hours ? (
                                <Typography.Text style={{ display: 'block', color: 'red', fontSize: 14, fontWeight: 500 }}>
                                    Unknown
                                </Typography.Text>
                            ) : (
                                !user.working_hours[currentDay].active || !isTimeInRange(`${(new Date()).getHours()}:${(new Date()).getMinutes()}`, user.working_hours[currentDay].open, user.working_hours[currentDay].close) ? (
                                    <Typography.Text style={{ display: 'block', color: 'red', fontSize: 14, fontWeight: 500 }}>
                                        Closed Now
                                    </Typography.Text>
                                ) : (
                                    <Typography.Text style={{ display: 'block', color: GREEN2, fontSize: 14, fontWeight: 500 }}>
                                        Open Now
                                    </Typography.Text>
                                )
                            )
                        }
                </Box>
            </Box>
            <Row gutter={[16, 22]}>
                <Col xs={24} lg={16}>
                    <Box p={3} bgcolor='#FFF' mb={3} boxShadow='0px 1px 2px rgba(0, 0, 0, .2)' borderRadius={2}>
                        <Typography.Title level={4} style={{ marginBottom: 20 }}>About Us</Typography.Title>
                        <TP fontSize={14}>{user?.bio || "Not added"}</TP>
                    </Box>

                    <Box p={3} bgcolor='#FFF' boxShadow='0px 1px 2px rgba(0, 0, 0, .2)' borderRadius={2}>
                        <Typography.Title level={4}>Working Hours</Typography.Title>
                        {
                            user?.working_hours ? (
                                <>
                                    <WorkingHoursLine day={'monday'} data={user?.working_hours} />
                                    <WorkingHoursLine day={'tuesday'} data={user?.working_hours} />
                                    <WorkingHoursLine day={'wednesday'} data={user?.working_hours} />
                                    <WorkingHoursLine day={'thursday'} data={user?.working_hours} />
                                    <WorkingHoursLine day={'friday'} data={user?.working_hours} />
                                    <WorkingHoursLine day={'saturday'} data={user?.working_hours} />
                                    <WorkingHoursLine day={'sunday'} data={user?.working_hours} />
                                </>
                            ) : (
                                <TP fontSize={14}>Not Specified</TP>
                            )
                        }
                        
                    </Box>
                </Col>
                <Col xs={24} lg={8}>
                    <Box p={3} bgcolor='#FFF' boxShadow='0px 1px 2px rgba(0, 0, 0, .2)' borderRadius={2}>
                        <Typography.Title level={4}>Contact Information</Typography.Title>
                        <Box sx={{ mb: 2.5, fontWeight: 500 }}>
                            <Typography.Text style={{ display: 'flex', gap: 15, padding: '0.3rem 0', alignItems: 'center' }}><FaPhoneAlt color={GREEN} fontSize={15} />{user?.phone_number}</Typography.Text>
                            <Typography.Text style={{ display: 'flex', gap: 15, padding: '0.3rem 0', alignItems: 'center' }}><FaEnvelope color={GREEN} fontSize={15} />{user?.email}</Typography.Text>
                            <Typography.Text style={{ display: 'flex', gap: 15, padding: '0.3rem 0', alignItems: 'center' }}><FaMapMarkerAlt color={GREEN} fontSize={15} />{user?.address}, {user?.city}</Typography.Text>
                        </Box>
                        <Box>
                            <Typography.Text style={{ fontWeight: 500, marginBottom: 15, display: 'block' }}>Follow Us</Typography.Text>
                            <Box style={{ display: 'flex', gap: 20 }}>
                                {
                                    user?.facebook_url ? (
                                        <Box sx={{ color: GRAY2, '&:hover': {color: '#1877F2'} }}>
                                            <Link target="_blank" to={user.facebook_url} style={{ color: "inherit" }} >
                                                <FaFacebook size={20} />
                                            </Link>
                                        </Box>
                                    ) : null
                                }
                                {
                                    user?.instagram_url ? (
                                        <Box sx={{ color: GRAY2, '&:hover': {color: '#E1306C'} }}>
                                            <Link target="_blank" to={user.instagram_url} style={{ color: "inherit" }}>
                                                <FaInstagram size={20} />
                                            </Link>
                                        </Box>
                                    ) : null
                                }
                                {
                                    user?.twitter_url ? (
                                        <Box sx={{ color: GRAY2, '&:hover': {color: '#1DA1F2'} }}>
                                            <Link target="_blank" to={user.twitter_url} style={{ color: "inherit" }}>
                                                <FaTwitter size={20} />
                                            </Link>
                                        </Box>
                                    ) : null
                                }
                                
                            </Box>
                        </Box>
                    </Box>
                </Col>
            </Row>
        </>
    )
}

export default PharmacyProfileSection;