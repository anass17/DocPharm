import { BorderBottom } from "@mui/icons-material";
import { Box, Button, TextField, Typography as TP } from "@mui/material";
import { Col, Flex, notification, Row, Spin, Typography } from "antd";
import { FaEnvelope, FaFacebook, FaInstagram, FaMapMarker, FaMapMarkerAlt, FaPhone, FaPhoneAlt, FaTwitter } from "react-icons/fa";
import { Link, Navigate, useParams } from "react-router-dom";
import WorkingHoursLine from "../../../components/Others/WorkingHoursLine";
import { GRAY2, GREEN, GREEN2 } from "../../../config/colors";
import { useSelector } from "react-redux";
import AppointmentPicker from "../components/AppointmentPicker";
import AppointmentTimePicker from "../components/AppointmentTimePicker";
import { DarkGreenButton } from "../../../components/Button/FilledButtons";
import AppointmentTypeSelect from "../components/ApointmentTypeSelect";
import { useEffect, useState } from "react";
import { backend_url } from "../../../config/app";
import Cookies from "js-cookie";
import { loadStripe } from '@stripe/stripe-js';
import LoadingButton from "../../../components/Button/LoadingButton";
import { LoadingOutlined } from "@ant-design/icons";

const stripePromise = loadStripe('pk_test_51RD1U4Pt1gEegd9zoFVDZP64y3tg4B4KFxYzAQnNFwpBIW90mgTKVpkvZg6RLBzHb1fMpVoeTgdyLEXukSoJ6nJ0005npVkp7m');


function isTimeInRange(time, start, end) {
    const [tHours, tMinutes] = time.split(':').map(Number);
    const [sHours, sMinutes] = start.split(':').map(Number);
    const [eHours, eMinutes] = end.split(':').map(Number);
  
    const timeMinutes = tHours * 60 + tMinutes;
    const startMinutes = sHours * 60 + sMinutes;
    const endMinutes = eHours * 60 + eMinutes;
  
    return timeMinutes >= startMinutes && timeMinutes <= endMinutes;
}

const BookAppointmentSection = () => {

    const user = useSelector(data => data.user.user)
    const currentDay = (new Date()).toLocaleDateString('en-En', {weekday: 'long'}).toLowerCase()

    const [doctor, setDoctor] = useState({})
    const [booked, setBooked] = useState(false)
    const [loading, setLoading] = useState(false)
    const [slotLoading, setSlotLoading] = useState(false)
    const [selectedDate, setSelectedDate] = useState(currentDay);
    const [selectedDay, setSelectedDay] = useState(currentDay);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [reservedSlots, setReservedSlots] = useState([])
    const [addedDescription, setAddedDescription] = useState('')
    const [formErrors, setFormErrors] = useState({})

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

    useEffect(() => {
        getDoctorPharmacy();
    }, [param_id])

    const handleDateChange = (day, date) => {
        setSelectedDate(date)
        setSelectedDay(day)
        setSelectedSlot(null)
        getTakenSlots(date)
    }

    const handleTextChange = (e) => {
        setAddedDescription(e.target.value)
    }

    const handleAppointmentBooking = () => {
        const errors = {}

        if (!selectedDate) {
            errors.selectedDate = 'Please select a date'
        }
        if (!selectedSlot) {
            errors.selectedSlot = 'Please select a time'
        }
        if (!selectedType) {
            errors.selectedType = 'Please select appointment type'
        }
        if (!addedDescription) {
            errors.addedDescription = 'Please add a specific description'
        }

        if (Object.keys(errors).length !== 0) {
            setFormErrors(errors)
            return
        }

        setFormErrors({})

        const date = new Date(selectedDate)
        const time = selectedSlot.split(' - ')[0].split(':').map(Number)
        date.setHours(time[0])
        date.setMinutes(time[1])
        date.setSeconds(0)

        bookAppointment(date)

    }

    const handleTimeSelect = (time) => {
        setSelectedSlot(time)
    }

    const getDoctorPharmacy = async () => {
        
        try {

            const response = await fetch(`${backend_url}/api/doctors/${param_id}`, {
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('auth_token'),
                },
            });
    
            if (response.status === 401) {
                openNotification('Access Denied', 'You are not authorized to perform this action')
            } else if (response.status === 404) {
                openNotification('Not Found', 'The doctor you were looking for is not in our records', 'error')
            } else if (response.status === 200 || response.status === 204) {
                let responseData = await response.json();
                setDoctor(responseData.doctor)
            } else {
                openNotification('Something went wrong', 'Could not perform this action')
            }
        } catch (error) {
            console.log(error)
            openNotification('Something went wrong', 'Could not perform this action')
        }
    }

    const bookAppointment = async (date) => {
        setLoading(true);
        
        try {

            const response = await fetch(`${backend_url}/api/appointments`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('auth_token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    doctor: param_id,
                    selectedDate: date,
                    selectedType,
                    addedDescription
                })
            });
    
            if (response.status === 401) {
                openNotification('Access Denied', 'You are not authorized to perform this action')
            } else if (response.status === 201) {
                openNotification('Added Successfully', 'Appointment Successfully Booked', 'success')
                setBooked(true)
                setAddedDescription('')
                setSelectedType(null)
                setSelectedSlot(null)
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

    const getTakenSlots = async (date) => {
        
        setSlotLoading(true)

        try {

            const response = await fetch(`${backend_url}/api/appointments?date=${date}`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('auth_token'),
                    'Content-Type': 'application/json'
                },
            });
    
            if (response.status === 401) {
                openNotification('Access Denied', 'You are not authorized to perform this action')
            } else if (response.status === 200) {
                let responseData = await response.json()

                console.log(responseData)
                setReservedSlots(responseData.results)

            } else {
                openNotification('Something went wrong', 'Could not perform this action')
            }
        } catch (error) {
            console.log(error)
            openNotification('Something went wrong', 'Could not perform this action')
        } finally {
            setSlotLoading(false)
        }
    }

    return (
        <>
            {NotificationHolder}
            <Row gutter={16}>
                <Col xs={24} xl={8}>
                    <Box sx={{ bgcolor: '#FFF', p: 4, mb: 2.5, borderRadius: 2, boxShadow: '0px 1px 2px rgba(0, 0, 0, .15)' }}>
                        <Box height={200} borderRadius={2} mb={10} sx={{ backgroundPosition: 'center', position: 'relative', backgroundSize: 'cover', backgroundImage: 'url("http://localhost:8000/storage/test/pharmacy.jpg")' }}>
                            <img src="http://localhost:8000/storage/profile/fake.png" width={100} className="rounded-full border-2 border-blue-500 absolute bottom-0 left-10 translate-y-1/2" />
                        </Box>
                        <Box>
                            <Typography.Title level={2} style={{ marginBottom: 0 }}>{doctor?.first_name || 'User'} {doctor?.last_name || 'User'}</Typography.Title>
                            <Typography.Title level={5} style={{ marginTop: 0 }}>{doctor?.speciality || 'Speciality'}</Typography.Title>
                            <Typography.Text>{doctor?.bio || 'Has not added the bio'}</Typography.Text>
                        </Box>
                        <Row gutter={[12, 20]} style={{ marginTop: 20 }}>
                            <Col xs={24} md={12} xl={24}>
                                <Typography.Title level={5}>Contact Us</Typography.Title>
                                <Box>
                                    <Box sx={{ fontWeight: 500 }}>
                                        <Typography.Text style={{ display: 'flex', gap: 15, padding: '0.3rem 0', alignItems: 'center' }}><FaPhoneAlt color={GREEN} fontSize={15} />{doctor?.phone_number}</Typography.Text>
                                        <Typography.Text style={{ display: 'flex', gap: 15, padding: '0.3rem 0', alignItems: 'center' }}><FaEnvelope color={GREEN} fontSize={15} />{doctor?.email}</Typography.Text>
                                        <Typography.Text style={{ display: 'flex', gap: 15, padding: '0.3rem 0', alignItems: 'center' }}><FaMapMarkerAlt color={GREEN} fontSize={15} />{doctor?.address}, {doctor?.city}</Typography.Text>
                                    </Box>
                                </Box>
                            </Col>
                            <Col xs={24} md={12} xl={24}>
                                <Typography.Title level={5}>Follow Us</Typography.Title>
                                <Box>
                                    {
                                        doctor?.facebook_url ? (
                                            <Box sx={{ color: GRAY2, '&:hover': {color: '#1877F2'} }}>
                                                <Link target="_blank" to={doctor.facebook_url} style={{ color: "inherit" }} >
                                                    <FaFacebook size={20} />
                                                </Link>
                                            </Box>
                                        ) : null
                                    }
                                    {
                                        doctor?.instagram_url ? (
                                            <Box sx={{ color: GRAY2, '&:hover': {color: '#E1306C'} }}>
                                                <Link target="_blank" to={doctor.instagram_url} style={{ color: "inherit" }}>
                                                    <FaInstagram size={20} />
                                                </Link>
                                            </Box>
                                        ) : null
                                    }
                                    {
                                        doctor?.twitter_url ? (
                                            <Box sx={{ color: GRAY2, '&:hover': {color: '#1DA1F2'} }}>
                                                <Link target="_blank" to={doctor.twitter_url} style={{ color: "inherit" }}>
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
                <Col xs={24} xl={16}>
                    <Box p={3} bgcolor='#FFF' mb={2.5} boxShadow='0px 1px 2px rgba(0, 0, 0, .2)' borderRadius={2}>
                        <Typography.Title level={4}>Working Hours</Typography.Title>
                        {
                            doctor?.working_hours ? (
                                <>
                                    <WorkingHoursLine day={'monday'} data={doctor?.working_hours} />
                                    <WorkingHoursLine day={'tuesday'} data={doctor?.working_hours} />
                                    <WorkingHoursLine day={'wednesday'} data={doctor?.working_hours} />
                                    <WorkingHoursLine day={'thursday'} data={doctor?.working_hours} />
                                    <WorkingHoursLine day={'friday'} data={doctor?.working_hours} />
                                    <WorkingHoursLine day={'saturday'} data={doctor?.working_hours} />
                                    <WorkingHoursLine day={'sunday'} data={doctor?.working_hours} />
                                </>
                            ) : (
                                <TP fontSize={14}>Not Specified</TP>
                            )
                        }
                        
                    </Box>
                    <Box p={3} bgcolor='#FFF' boxShadow='0px 1px 2px rgba(0, 0, 0, .2)' borderRadius={2}>
                        <Typography.Title level={4} style={{ marginBottom: 35 }}>Book an Appointment</Typography.Title>
                        <Row gutter={[30, 30]}>
                            <Col xs={24} lg={12}>
                                <Typography.Title level={5} style={{ marginBottom: 10 }}>Select Date</Typography.Title>
                                <AppointmentPicker onDateChange={handleDateChange}/>
                                <Typography.Text style={{ color: 'red' }}>{formErrors.selectedDate}</Typography.Text>
                            </Col>
                            <Col xs={24} lg={12}>
                            <Typography.Title level={5} style={{ marginBottom: 10 }}>Select Time</Typography.Title>
                            {
                                slotLoading ? (
                                    <Box style={{ textAlign: 'center', paddingTop: 30 }}>
                                        <Spin indicator={<LoadingOutlined spin />} size="large" />
                                    </Box>
                                ) : (
                                    <>
                                        <AppointmentTimePicker active={doctor.working_hours ? doctor.working_hours[selectedDay].active : false} 
                                            start={doctor.working_hours ? doctor.working_hours[selectedDay].open : '9:00'} end={doctor.working_hours ? doctor.working_hours[selectedDay].close : '17:00'} 
                                            onSelect={handleTimeSelect} selectedSlot={selectedSlot}
                                            reservedSlots={reservedSlots}
                                        />
                                        <Typography.Text style={{ color: 'red' }}>{formErrors.selectedSlot}</Typography.Text>
                                    </>
                                )
                            }
                                
                            </Col>
                            <Col xs={24} lg={12}>
                                <Typography.Title level={5} style={{ marginBottom: 10 }}>Appointment Type</Typography.Title>
                                <AppointmentTypeSelect value={selectedType} onSelect={setSelectedType} data={doctor.appointment_prices} />
                                <Typography.Text style={{ color: 'red' }}>{formErrors.selectedType}</Typography.Text>
                            </Col>
                            <Col xs={24} lg={12}>
                                <Typography.Title level={5} style={{ marginBottom: 10 }}>Description</Typography.Title>
                                <TextField multiline rows={4} name="" onChange={handleTextChange} value={addedDescription} fullWidth placeholder="Please provide a brief description of the reason for your visit or any symptoms you're experiencing." />
                                <Typography.Text style={{ color: 'red' }}>{formErrors.addedDescription}</Typography.Text>
                                
                                {
                                    loading ? (
                                        <LoadingButton style={{ width: '100%', marginTop: 10 }}>
                                            Book Appointment
                                        </LoadingButton>
                                    ) : (
                                        booked ? (
                                            <DarkGreenButton disabled style={{ width: '100%', marginTop: 10, backgroundColor: '#EEE', color: GRAY2 }}>
                                                Booked
                                            </DarkGreenButton>
                                        ) : (
                                            <DarkGreenButton style={{ width: '100%', marginTop: 10 }} onClick={handleAppointmentBooking}>
                                                Book Appointment
                                            </DarkGreenButton>
                                        )
                                    )
                                }
                            </Col>
                        </Row>
                    </Box>            
                </Col>
            </Row>
        </>
    )
}

export default BookAppointmentSection;