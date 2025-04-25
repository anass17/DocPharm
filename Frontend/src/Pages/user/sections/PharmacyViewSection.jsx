import { BorderBottom } from "@mui/icons-material";
import { Box, Typography as TP } from "@mui/material";
import { Col, Flex, notification, Row, Typography } from "antd";
import { FaEnvelope, FaFacebook, FaInstagram, FaMapMarker, FaMapMarkerAlt, FaPhone, FaPhoneAlt, FaTwitter } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import WorkingHoursLine from "../../../components/Others/WorkingHoursLine";
import { GRAY2, GREEN, GREEN2 } from "../../../config/colors";
import { backend_url } from "../../../config/app";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

function isTimeInRange(time, start, end) {
    const [tHours, tMinutes] = time.split(':').map(Number);
    const [sHours, sMinutes] = start.split(':').map(Number);
    const [eHours, eMinutes] = end.split(':').map(Number);
  
    const timeMinutes = tHours * 60 + tMinutes;
    const startMinutes = sHours * 60 + sMinutes;
    const endMinutes = eHours * 60 + eMinutes;
  
    return timeMinutes >= startMinutes && timeMinutes <= endMinutes;
}

const PharmacyViewSection = () => {

    const currentDay = (new Date()).toLocaleDateString('en-En', {weekday: 'long'}).toLowerCase()
    
    const [pharmacy, setPharmacy] = useState({})
    const [loading, setLoading] = useState(false);

    const {id: param_id} = useParams()

    const [api, NotificationHolder] = notification.useNotification();

    const openNotification = (message, description, type = 'info') => {
        api.open({
            type: type,
            message: message,
            description: <p>{description}</p>,
            placement: 'bottomRight',
            duration: 5,
            showProgress: true,
            pauseOnHover: true,
        });
    };

    const getPharmacy = async () => {
        setLoading(true);

        try {

            const response = await fetch(`${backend_url}/api/pharmacies/${param_id}`, {
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('auth_token'),
                },
            });
    
            if (response.status === 401) {
                openNotification('Access Denied', 'You are not authorized to perform this action')
            } else if (response.status === 404) {
                openNotification('Not Found', 'The pharmacy you were looking for is not in our records', 'error')
            } else if (response.status === 200 || response.status === 204) {
                let responseData = await response.json();
                setPharmacy(responseData.pharmacy)
            } else {
                openNotification('Something went wrong', 'Could not perform this action')
            }
        } catch (error) {
            console.log(error)
            openNotification('Something went wrong', 'Could not perform this action')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getPharmacy();
    }, [param_id])
    

    return (
        <>
            {NotificationHolder}
            <Box height={400} borderRadius={2} overflow='hidden' mb={4} sx={{ display: 'flex', alignItems: 'flex-end', backgroundPosition: 'center', backgroundSize: 'cover', backgroundImage: 'url("http://localhost:8000/storage/test/pharmacy.jpg")' }}>
                <Box sx={{ bgcolor: 'rgba(0, 0, 0, .7)', width: '100%', py: 2, px: 3 }}>
                    <Typography.Text style={{ color: '#FFF', fontWeight: 500, fontSize: 20}}>
                        {
                            loading ? (
                                'loading ...'
                            ) : (
                                pharmacy?.pharmacy_name
                            )

                        }
                    </Typography.Text>
                    
                        {
                            !pharmacy?.working_hours ? (
                                <Typography.Text style={{ display: 'block', color: 'red', fontSize: 14, fontWeight: 500 }}>
                                    Not Specified
                                </Typography.Text>
                            ) : (
                                !pharmacy.working_hours[currentDay].active || !isTimeInRange(`${(new Date()).getHours()}:${(new Date()).getMinutes()}`, pharmacy.working_hours[currentDay].open, pharmacy.working_hours[currentDay].close) ? (
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
            <Row gutter={16}>
                <Col span={16}>
                    <Box p={3} bgcolor='#FFF' mb={3} boxShadow='0px 1px 2px rgba(0, 0, 0, .2)' borderRadius={2}>
                        <Typography.Title level={4} style={{ marginBottom: 20 }}>About Us</Typography.Title>
                        <TP fontSize={14}>{loading ? 'loading...' : (pharmacy?.bio || "Not added")}</TP>
                    </Box>

                    <Box p={3} bgcolor='#FFF' boxShadow='0px 1px 2px rgba(0, 0, 0, .2)' borderRadius={2}>
                        <Typography.Title level={4}>Working Hours</Typography.Title>
                        {
                            pharmacy?.working_hours ? (
                                <>
                                    <WorkingHoursLine day={'monday'} data={pharmacy?.working_hours} />
                                    <WorkingHoursLine day={'tuesday'} data={pharmacy?.working_hours} />
                                    <WorkingHoursLine day={'wednesday'} data={pharmacy?.working_hours} />
                                    <WorkingHoursLine day={'thursday'} data={pharmacy?.working_hours} />
                                    <WorkingHoursLine day={'friday'} data={pharmacy?.working_hours} />
                                    <WorkingHoursLine day={'saturday'} data={pharmacy?.working_hours} />
                                    <WorkingHoursLine day={'sunday'} data={pharmacy?.working_hours} />
                                </>
                            ) : (
                                <TP fontSize={14}>Not Specified</TP>
                            )
                        }
                        
                    </Box>
                </Col>
                <Col span={8}>
                    <Box p={3} bgcolor='#FFF' boxShadow='0px 1px 2px rgba(0, 0, 0, .2)' borderRadius={2}>
                        <Typography.Title level={4}>Contact Information</Typography.Title>
                        <Box sx={{ mb: 2.5, fontWeight: 500 }}>
                            <Typography.Text style={{ display: 'flex', gap: 15, padding: '0.3rem 0', alignItems: 'center' }}><FaPhoneAlt color={GREEN} fontSize={15} />{loading ? 'loading...' : pharmacy?.phone_number}</Typography.Text>
                            <Typography.Text style={{ display: 'flex', gap: 15, padding: '0.3rem 0', alignItems: 'center' }}><FaEnvelope color={GREEN} fontSize={15} />{loading ? 'loading...' : pharmacy?.email}</Typography.Text>
                            <Typography.Text style={{ display: 'flex', gap: 15, padding: '0.3rem 0', alignItems: 'center' }}><FaMapMarkerAlt color={GREEN} fontSize={15} />{loading ? 'loading...' : (pharmacy?.address + ' ' + pharmacy?.city)}</Typography.Text>
                        </Box>
                        <Box>
                            <Typography.Text style={{ fontWeight: 500, marginBottom: 15, display: 'block' }}>Follow Us</Typography.Text>
                            <Box style={{ display: 'flex', gap: 20 }}>
                                {
                                    pharmacy?.facebook_url ? (
                                        <Box sx={{ color: GRAY2, '&:hover': {color: '#1877F2'} }}>
                                            <Link target="_blank" to={pharmacy.facebook_url} style={{ color: "inherit" }} >
                                                <FaFacebook size={20} />
                                            </Link>
                                        </Box>
                                    ) : null
                                }
                                {
                                    pharmacy?.instagram_url ? (
                                        <Box sx={{ color: GRAY2, '&:hover': {color: '#E1306C'} }}>
                                            <Link target="_blank" to={pharmacy.instagram_url} style={{ color: "inherit" }}>
                                                <FaInstagram size={20} />
                                            </Link>
                                        </Box>
                                    ) : null
                                }
                                {
                                    pharmacy?.twitter_url ? (
                                        <Box sx={{ color: GRAY2, '&:hover': {color: '#1DA1F2'} }}>
                                            <Link target="_blank" to={pharmacy.twitter_url} style={{ color: "inherit" }}>
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

export default PharmacyViewSection;