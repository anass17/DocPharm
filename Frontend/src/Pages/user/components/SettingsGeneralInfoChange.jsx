import { Box, InputLabel } from "@mui/material"
import { Col, Flex, Input, notification, Row, Typography } from "antd"
import CustomFileInput from "../../../components/Form/CustomFileInput"
import { FaSave } from "react-icons/fa"
import { DarkGreenButton } from "../../../components/Button/FilledButtons"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Cookies from 'js-cookie'
import { backend_url } from "../../../config/app"
import LoadingButton from "../../../components/Button/LoadingButton"
import { updateUserDetails, updateUserProfilePicture } from "../../../store/actions/userActions"

const SettingsGeneralInfoChange = () => {

    const user = useSelector(data => data.user.user)
    const dispatch = useDispatch();

    const [generalInfoData, setGeneralInfoData] = useState({})
    const [generalInfoErrors, setGeneralInfoErrors] = useState({})
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

    // Event Handlers

    const handleGeneralInfoChange = (e) => {
        setGeneralInfoData({
            ...generalInfoData,
            [e.target.name]: e.target.value
        })
    }

    const handleGeneralInfoSubmit = () => {
        const errors = {}

        if (!generalInfoData.first_name) {
            errors.first_name = "First Name is required"
        }
        if (!generalInfoData.last_name) {
            errors.last_name = "Last Name is required"
        }
        if (generalInfoData.phone_number.search(/^0[567][0-9]{8}$/) < 0) {
            errors.phone_number = "Enter a valid phone number"
        }
        if (!generalInfoData.address) {
            errors.address = "Enter a valid address"
        }
        if (!generalInfoData.city) {
            errors.city = "Enter a valid city"
        }

        if (Object.keys(errors).length !== 0) {
            setGeneralInfoErrors(errors)
            return
        }

        updateGeneralInformation()
        setGeneralInfoErrors({})
    }

    // Send Api Requests
    
    const updateGeneralInformation = async () => {
        setLoading(true);
        
        try {

            const response = await fetch(`${backend_url}/api/user/update/general`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('auth_token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(generalInfoData)
            });
    
            if (response.status === 401) {
                openNotification('Access Denied', 'You are not authorized to perform this action')
            } else if (response.status === 200 || response.status === 204) {
                openNotification('Successfully Updated', 'Your general information has been successfully updated', 'success')
                dispatch(updateUserDetails(generalInfoData))
            } else {
                openNotification('Something went wrong', 'Could not perform this action')
            }
        } catch (error) {
            openNotification('Something went wrong', 'Could not perform this action')
        } finally {
            setLoading(false)
        }
    }

    const ImageComponent = () => {
        return (
            <CustomFileInput name="profile_picture" request_path={'/user/update/profile_picture'} url={`${backend_url}${user?.profile_picture ? user?.profile_picture : '/storage/user_placeholder.jpg'}`} dispatchMethod={updateUserProfilePicture} />
        )
    }

    useEffect(() => {
        setGeneralInfoData({first_name: user?.first_name, last_name: user?.last_name, phone_number: user?.phone_number, address: user?.address, city: user?.city})
    }, [user])

    return (
        <>
            {NotificationHolder}
            <Box sx={{ bgcolor: '#FFF', borderRadius: 2, p: 2.5, mb: 3, boxShadow: '0px 1px 2px rgba(0, 0, 0, .2)' }}>
                <Typography.Title level={4} style={{ marginBottom: 30 }}>General Information</Typography.Title>
                <Flex justify="center">
                    <ImageComponent />
                </Flex>
                <Row gutter={[10, 16]} style={{ margin: '1.25rem 0' }}>
                    <Col xs={24} sm={12}>
                        <InputLabel>First Name *</InputLabel>
                        <Input type='text' size="large" placeholder="Add first name ..." onChange={handleGeneralInfoChange} value={generalInfoData.first_name} name="first_name" />
                        <Typography.Text style={{ color: 'red' }}>{generalInfoErrors.first_name}</Typography.Text>
                    </Col>
                    <Col xs={24} sm={12}>
                        <InputLabel>Last Name *</InputLabel>
                        <Input type='text' size="large" placeholder="Add last name ..." onChange={handleGeneralInfoChange} value={generalInfoData.last_name} name="last_name" />
                        <Typography.Text style={{ color: 'red' }}>{generalInfoErrors.last_name}</Typography.Text>
                    </Col>
                    <Col xs={24} sm={12}>
                        <InputLabel>Phone Number *</InputLabel>
                        <Input type='text' size="large" placeholder="Add a phone number ..." onChange={handleGeneralInfoChange} value={generalInfoData.phone_number} name="phone_number" />
                        <Typography.Text style={{ color: 'red' }}>{generalInfoErrors.phone_number}</Typography.Text>
                    </Col>
                </Row>
                <Row gutter={[10, 16]} style={{ margin: '1.25rem 0' }}>
                    <Col xs={24} sm={18}>
                        <InputLabel>Address *</InputLabel>
                        <Input type='text' size="large" placeholder="Add address ..." onChange={handleGeneralInfoChange} value={generalInfoData.address} name="address" />
                        <Typography.Text style={{ color: 'red' }}>{generalInfoErrors.address}</Typography.Text>
                    </Col>
                    <Col xs={24} sm={6}>
                        <InputLabel>City *</InputLabel>
                        <Input type='text' size="large" placeholder="Add city ..." onChange={handleGeneralInfoChange} value={generalInfoData.city} name="city" />
                        <Typography.Text style={{ color: 'red' }}>{generalInfoErrors.city}</Typography.Text>
                    </Col>
                </Row>
                {
                    loading ? (
                        <LoadingButton style={{ marginTop: 20 }}>
                            <FaSave />
                            Save
                        </LoadingButton>
                    ) : (
                        <DarkGreenButton style={{ marginTop: 20 }} onClick={handleGeneralInfoSubmit}>
                            <FaSave />
                            Save
                        </DarkGreenButton>
                    )
                }
            </Box>
        </>
    )
}

export default SettingsGeneralInfoChange