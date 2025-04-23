import { Box, InputLabel, MenuItem } from "@mui/material"
import { Col, Flex, Input, notification, Row, Typography, Select } from "antd"
import CustomFileInput from "../../../components/Form/CustomFileInput"
import TextArea from "antd/es/input/TextArea"
import { FaFacebook, FaInstagram, FaSave, FaTwitter } from "react-icons/fa"
import { DarkGreenButton } from "../../../components/Button/FilledButtons"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Cookies from 'js-cookie'
import { backend_url } from "../../../config/app"
import LoadingButton from "../../../components/Button/LoadingButton"
import { updateUserDetails } from "../../../store/actions/userActions"

const SettingsReservationChange = () => {

    const user = useSelector(data => data.user.user)
    const dispatch = useDispatch();

    const [reservationData, setReservationData] = useState({})
    const [reservationErrors, setReservationErrors] = useState({})
    const [loading, setLoading] = useState(false)
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
        setReservationData({appointment_type: user?.appointment_type, online_appointment_price: user?.appointment_prices?.online, in_person_appointment_price: user?.appointment_prices?.in_person})
    }, [user]);

    // Event Handlers

    const handleReservationTypeChange = (value) => {
        setReservationData({
            ...reservationData,
            appointment_type: value
        })
    }

    const handleReservationChange = (e) => {
        setReservationData({
            ...reservationData,
            [e.target.name]: e.target.value
        })
    }

    const handleReservationSubmit = () => {
        const errors = {}

        console.log(reservationData)

        if (!reservationData.appointment_type) {
            errors.appointment_type = "Select a type"
        }
        if (reservationData.online_appointment_price.search(/^[0-9]+(.[0-9]+)*$/) < 0) {
            errors.online_appointment_price = "Enter a valid price"
        }
        if (reservationData.in_person_appointment_price.search(/^[0-9]+(.[0-9]+)*$/) < 0) {
            errors.in_person_appointment_price = "Enter a valid price"
        }

        if (Object.keys(errors).length !== 0) {
            setReservationErrors(errors)
            return
        }

        updateReservationDetails()
        setReservationErrors({})
    }

    // Send Api Requests
    
    const updateReservationDetails = async () => {
        setLoading(true);
        
        try {

            const response = await fetch(`${backend_url}/api/doctor/update/reservation`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('auth_token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reservationData)
            });
    
            if (response.status === 401) {
                openNotification('Access Denied', 'You are not authorized to perform this action')
            } else if (response.status === 200 || response.status === 204) {
                openNotification('Successfully Updated', 'Your general information has been successfully updated', 'success')
                dispatch(updateUserDetails({
                    appointment_type: reservationData.appointment_type, 
                    appointment_prices: {
                        in_person: reservationData.in_person_appointment_price,
                        online: reservationData.online_appointment_price
                    }
                }))
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

    return (
        <>
            {NotificationHolder}
            <Box sx={{ bgcolor: '#FFF', borderRadius: 2, p: 2.5, mb: 5, boxShadow: '0px 1px 2px rgba(0, 0, 0, .2)' }}>
                <Typography.Title level={4} style={{ marginBottom: 30 }}>Booking Details</Typography.Title>
                <Row gutter={[8, 20]}>
                    <Col xs={24} sm={8}>
                        <InputLabel style={{ marginBottom: 7 }}>Appointments Type *</InputLabel>
                        <Select
                            size="large"
                            style={{ width: '100%' }}
                            value={reservationData.appointment_type}
                            placeholder="Select Type"
                            onChange={handleReservationTypeChange}
                            options={[
                                { value: 'both', label: 'Both' },
                                { value: 'online', label: 'Online Only' },
                                { value: 'in-person', label: 'In-Person Only' },
                              ]}
                        />
                        <Typography.Text style={{ color: 'red' }}>{reservationErrors.appointment_type}</Typography.Text>
                    </Col>
                    <Col xs={24} sm={8}>
                        <InputLabel style={{ marginBottom: 7 }}>Online Appointment Price</InputLabel>
                        <Input type='text' size="large" placeholder="Add a price (DH)" onChange={handleReservationChange} value={reservationData.online_appointment_price} name="online_appointment_price" />
                        <Typography.Text style={{ color: 'red' }}>{reservationErrors.online_appointment_price}</Typography.Text>
                    </Col>
                    <Col xs={24} sm={8}>
                        <InputLabel style={{ marginBottom: 7 }}>In-Person Appointment Price</InputLabel>
                        <Input type='text' size="large" placeholder="Add a price (DH)" onChange={handleReservationChange} value={reservationData.in_person_appointment_price} name="in_person_appointment_price" />
                        <Typography.Text style={{ color: 'red' }}>{reservationErrors.in_person_appointment_price}</Typography.Text>
                    </Col>
                </Row>
                {
                    loading ? (
                        <LoadingButton style={{ marginTop: 20 }}>
                            <FaSave />
                            Save
                        </LoadingButton>
                    ) : (
                        <DarkGreenButton style={{ marginTop: 20 }} onClick={handleReservationSubmit}>
                            <FaSave />
                            Save
                        </DarkGreenButton>
                    )
                }
            </Box>
        </>
    )
}

export default SettingsReservationChange