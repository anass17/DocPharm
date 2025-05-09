import { BorderBottom } from "@mui/icons-material";
import { Box, Button, TextField, Typography as TP } from "@mui/material";
import { Col, Flex, Image, Row, Typography } from "antd";
import { FaEnvelope, FaFacebook, FaInstagram, FaMapMarker, FaMapMarkerAlt, FaPhone, FaPhoneAlt, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import WorkingHoursLine from "../../../components/Others/WorkingHoursLine";
import { GRAY2, GREEN, GREEN2, PRIMARY_BLUE } from "../../../config/colors";
import { useSelector } from "react-redux";
import AppointmentPicker from "../../user/components/AppointmentPicker";
import AppointmentTimePicker from "../../user/components/AppointmentTimePicker";
import { DarkGreenButton } from "../../../components/Button/FilledButtons";
import AppointmentTypeSelect from "../../user/components/ApointmentTypeSelect";
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

const ProfileSection = () => {

    const user = useSelector(data => data.user.user)

    {
        console.log(user)
    }

    const currentDay = (new Date()).toLocaleDateString('en-En', {weekday: 'long'}).toLowerCase()

    return (
        <>

            <Row gutter={16}>
                <Col xs={24} lg={10} xl={8}>
                    <Box sx={{ bgcolor: '#FFF', p: {xs: 2, lg: 4}, mb: 2.5, borderRadius: 2, boxShadow: '0px 1px 2px rgba(0, 0, 0, .15)' }}>
                        <Box height={200} borderRadius={2} mb={10} sx={{ backgroundPosition: 'center', position: 'relative', backgroundSize: 'cover', backgroundImage: 'url("http://localhost:8000/storage/test/pharmacy.jpg")' }}>
                            <Image
                                width={'100%'}
                                height={'100%'}
                                className="object-cover rounded-md"
                                src={`${backend_url}${user?.building_image ? user.building_image : '/storage/horizontal_image_placeholder.png'}`}
                            />
                            <img src={`${backend_url}${user?.profile_picture ? user.profile_picture : '/storage/user_placeholder.jpg'}`} width={100} className="rounded-full border-2 border-blue-500 absolute bottom-0 left-10 translate-y-1/2" />
                        </Box>
                        <Box>
                            <Typography.Title level={2} style={{ marginBottom: 0 }}>{user?.first_name} {user?.last_name}</Typography.Title>
                            <Typography.Title level={5} style={{ marginTop: 0 }}>{user?.speciality}</Typography.Title>
                            <Typography.Text>{user?.bio ? user.bio : 'You have not added the bio yet'}</Typography.Text>
                        </Box>
                        <Row gutter={[12, 20]} style={{ marginTop: 20 }}>
                            <Col span={24}>
                                <Typography.Title level={5}>Contact Us</Typography.Title>
                                <Box>
                                    <Box sx={{ fontWeight: 500 }}>
                                        <Typography.Text style={{ display: 'flex', gap: 15, padding: '0.3rem 0', alignItems: 'center' }}><FaPhoneAlt color={GREEN} fontSize={15} />{user?.phone_number}</Typography.Text>
                                        <Typography.Text style={{ display: 'flex', gap: 15, padding: '0.3rem 0', alignItems: 'center' }}><FaEnvelope color={GREEN} fontSize={15} />{user?.email}</Typography.Text>
                                        <Typography.Text style={{ display: 'flex', gap: 15, padding: '0.3rem 0', alignItems: 'center' }}><FaMapMarkerAlt color={GREEN} fontSize={15} />{user?.address}, {user?.city}</Typography.Text>
                                    </Box>
                                </Box>
                            </Col>
                            <Col span={24}>
                                <Typography.Title level={5}>Follow Us</Typography.Title>
                                <Box className="flex gap-3">
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
                            </Col>
                        </Row>
                    </Box>
                </Col>
                <Col xs={24} lg={14} xl={16}>
                    <Box p={3} bgcolor='#FFF' mb={2.5} boxShadow='0px 1px 2px rgba(0, 0, 0, .2)' borderRadius={2}>
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
                    <Box p={3} bgcolor='#FFF' boxShadow='0px 1px 2px rgba(0, 0, 0, .2)' borderRadius={2}>
                        <Typography.Title level={4}>Appointments Details</Typography.Title>
                        {
                            user?.appointment_prices ? (
                                <Row gutter={[8, 10]}>
                                    <Col xs={24} md={12} xl={8}>
                                        <Box sx={{ border: '1px solid #DDD' }} borderRadius={2} py={1.5} px={4}>
                                            <Typography.Title level={5} style={{ marginBottom: 1 }}>Appointment Type</Typography.Title>
                                            <Typography.Text style={{ color: PRIMARY_BLUE, fontWeight: 500 }} className="capitalize">{user?.appointment_type}</Typography.Text>
                                        </Box>
                                    </Col>
                                    <Col xs={24} md={12} xl={8}>
                                        <Box sx={{ border: '1px solid #DDD' }} borderRadius={2} py={1.5} px={4}>
                                            <Typography.Title level={5} style={{ marginBottom: 1 }}>Online Consultation</Typography.Title>
                                            <Typography.Text style={{ color: PRIMARY_BLUE, fontWeight: 500 }}>{user?.appointment_prices.online} MAD</Typography.Text>
                                        </Box>
                                    </Col>
                                    <Col xs={24} md={12} xl={8}>
                                        <Box sx={{ border: '1px solid #DDD' }} borderRadius={2} py={1.5} px={4}>
                                            <Typography.Title level={5} style={{ marginBottom: 1 }}>In-Person Visit</Typography.Title>
                                            <Typography.Text style={{ color: PRIMARY_BLUE, fontWeight: 500 }}>{user?.appointment_prices.in_person} MAD</Typography.Text>
                                        </Box>
                                    </Col>
                                </Row>
                            ) : (
                                <TP fontSize={14}>Not Specified</TP>
                            )
                        }
                        
                    </Box>            
                </Col>
            </Row>
        </>
    )
}

export default ProfileSection;