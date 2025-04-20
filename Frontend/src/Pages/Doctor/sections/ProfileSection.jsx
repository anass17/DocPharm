import { BorderBottom } from "@mui/icons-material";
import { Box, Button, TextField, Typography as TP } from "@mui/material";
import { Col, Flex, Row, Typography } from "antd";
import { FaEnvelope, FaFacebook, FaInstagram, FaMapMarker, FaMapMarkerAlt, FaPhone, FaPhoneAlt, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import WorkingHoursLine from "../../../components/Others/WorkingHoursLine";
import { GRAY2, GREEN, GREEN2 } from "../../../config/colors";
import { useSelector } from "react-redux";
import AppointmentPicker from "../../user/components/AppointmentPicker";
import AppointmentTimePicker from "../../user/components/AppointmentTimePicker";
import { DarkGreenButton } from "../../../components/Button/FilledButtons";
import AppointmentTypeSelect from "../../user/components/ApointmentTypeSelect";

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

    {console.log(user)}

    const currentDay = (new Date()).toLocaleDateString('en-En', {weekday: 'long'}).toLowerCase()

    return (
        <>

            <Row gutter={16}>
                <Col span={8}>
                    <Box sx={{ bgcolor: '#FFF', p: 4, mb: 2.5, borderRadius: 2, boxShadow: '0px 1px 2px rgba(0, 0, 0, .15)' }}>
                        <Box height={200} borderRadius={2} mb={10} sx={{ backgroundPosition: 'center', position: 'relative', backgroundSize: 'cover', backgroundImage: 'url("http://localhost:8000/storage/test/pharmacy.jpg")' }}>
                            <img src="http://localhost:8000/storage/profile/fake.png" width={100} className="rounded-full border-2 border-blue-500 absolute bottom-0 left-10 translate-y-1/2" />
                        </Box>
                        <Box>
                            <Typography.Title level={2} style={{ marginBottom: 0 }}>Jim Karter</Typography.Title>
                            <Typography.Title level={5} style={{ marginTop: 0 }}>Cardiology</Typography.Title>
                            <Typography.Text>Dr. Michael Carter is a compassionate and experienced family physician with over 15 years in practice. He is dedicated to providing comprehensive care to patients of all ages, with a special focus on preventive medicine, chronic disease management, and holistic wellness. Known for his approachable manner and attentive care, Dr. Carter ensures each patient feels heard and supported.</Typography.Text>
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
                                <Box>
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
                <Col span={16}>
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
                        <Typography.Title level={4} style={{ marginBottom: 35 }}>Book an Appointment</Typography.Title>
                        <Row gutter={[30, 30]}>
                            <Col span={12}>
                                <Typography.Title level={5} style={{ marginBottom: 10 }}>Select Date</Typography.Title>
                                <AppointmentPicker />
                            </Col>
                            <Col span={12}>
                                <Typography.Title level={5} style={{ marginBottom: 10 }}>Select Time</Typography.Title>
                                <AppointmentTimePicker />
                            </Col>
                            <Col span={12}>
                                <Typography.Title level={5} style={{ marginBottom: 10 }}>Appointment Type</Typography.Title>
                                <AppointmentTypeSelect />
                            </Col>
                            <Col span={12}>
                                <Typography.Title level={5} style={{ marginBottom: 10 }}>Description</Typography.Title>
                                <TextField multiline rows={4} name="" style={{ marginBottom: 10 }} fullWidth placeholder="Please provide a brief description of the reason for your visit or any symptoms you're experiencing." />
                                <DarkGreenButton style={{ width: '100%' }}>Book Appointment</DarkGreenButton>
                            </Col>
                        </Row>
                    </Box>            
                </Col>
            </Row>
        </>
    )
}

export default ProfileSection;