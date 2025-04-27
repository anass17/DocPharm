import { Box, InputLabel } from "@mui/material"
import { Col, Flex, Input, notification, Row, Typography } from "antd"
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

const SettingsGeneralInfoChange = () => {

    const user = useSelector(data => data.user.user)
    const dispatch = useDispatch();

    const [generalInfoData, setGeneralInfoData] = useState({building_image: user?.building_image, pharmacy_name: user?.pharmacy_name, phone_number: user?.phone_number, bio: user?.bio, address: user?.address, city: user?.city, facebook_url: user?.facebook_url, instagram_url: user?.instagram_url, twitter_url: user?.twitter_url})
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

        if (!generalInfoData.pharmacy_name) {
            errors.pharmacy_name = "Pharmacy Name is required"
        }
        if (generalInfoData.phone_number.search(/^0[567][0-9]{8}$/) < 0) {
            errors.phone_number = "Enter a valid phone number"
        }
        if (!generalInfoData.bio) {
            errors.bio = "Enter a description"
        }
        if (!generalInfoData.address) {
            errors.address = "Enter pharmacy address"
        }
        if (!generalInfoData.city) {
            errors.city = "Enter pharmacy city"
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

            const response = await fetch(`${backend_url}/api/pharmacy/update/general`, {
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

    useEffect(() => {
        setGeneralInfoData({building_image: user?.building_image, pharmacy_name: user?.pharmacy_name, phone_number: user?.phone_number, bio: user?.bio, address: user?.address, city: user?.city, facebook_url: user?.facebook_url, instagram_url: user?.instagram_url, twitter_url: user?.twitter_url})
    }, [user])

    return (
        <>
            {NotificationHolder}
            <Box sx={{ bgcolor: '#FFF', borderRadius: 2, p: 2.5, mb: 5, boxShadow: '0px 1px 2px rgba(0, 0, 0, .2)' }}>
                <Typography.Title level={4} style={{ marginBottom: 30 }}>General Information</Typography.Title>
                <Flex justify="center">
                    <CustomFileInput name="building_image" request_path={'/api/pharmacy/building_image/upload'} url={`${backend_url}${generalInfoData.building_image ? generalInfoData.building_image : '/storage/placeholder.jpg'}`} />
                </Flex>
                <Row gutter={[10, 16]} style={{ margin: '1.25rem 0' }}>
                    <Col xs={24} sm={12}>
                        <InputLabel>Pharmacy Name *</InputLabel>
                        <Input type='text' size="large" placeholder="Add pharmacy name ..." onChange={handleGeneralInfoChange} value={generalInfoData.pharmacy_name} name="pharmacy_name" />
                        <Typography.Text style={{ color: 'red' }}>{generalInfoErrors.pharmacy_name}</Typography.Text>
                    </Col>
                    <Col xs={24} sm={12}>
                        <InputLabel>Phone Number *</InputLabel>
                        <Input type='text' size="large" placeholder="Add a phone number ..." onChange={handleGeneralInfoChange} value={generalInfoData.phone_number} name="phone_number" />
                        <Typography.Text style={{ color: 'red' }}>{generalInfoErrors.phone_number}</Typography.Text>
                    </Col>
                </Row>
                <Box style={{ margin: '1.25rem 0' }}>
                    <Col span={24}>
                        <InputLabel>Description *</InputLabel>
                        <TextArea rows={3} size="large" style={{ resize: 'none' }} placeholder="Add a description ..." onChange={handleGeneralInfoChange} value={generalInfoData.bio} name="bio" />
                        <Typography.Text style={{ color: 'red' }}>{generalInfoErrors.bio}</Typography.Text>
                    </Col>
                </Box>
                <Row gutter={[10, 16]} style={{ margin: '1.25rem 0' }}>
                    <Col xs={24} sm={18}>
                        <InputLabel>Address *</InputLabel>
                        <Input type='text' size="large" placeholder="Add pharmacy address ..." onChange={handleGeneralInfoChange} value={generalInfoData.address} name="address" />
                        <Typography.Text style={{ color: 'red' }}>{generalInfoErrors.address}</Typography.Text>
                    </Col>
                    <Col xs={24} sm={6}>
                        <InputLabel>City *</InputLabel>
                        <Input type='text' size="large" placeholder="Add pharmacy city ..." onChange={handleGeneralInfoChange} value={generalInfoData.city} name="city" />
                        <Typography.Text style={{ color: 'red' }}>{generalInfoErrors.city}</Typography.Text>
                    </Col>
                </Row>
                <Box>
                    <Typography.Title level={5} style={{ marginBottom: 10 }}>Social Media</Typography.Title>
                    <Flex gap={25} align="center" style={{ marginBottom: 10 }}>
                        <FaFacebook size={25} color="#1877F2" />
                        <Input type='text' size="large" placeholder="Facebook URL" onChange={handleGeneralInfoChange} value={generalInfoData.facebook_url} name="facebook_url" />
                    </Flex>
                    <Flex gap={25} align="center" style={{ marginBottom: 10 }}>
                        <FaInstagram size={25} color="#E1306C" />
                        <Input type='text' size="large" placeholder="Instagram URL" onChange={handleGeneralInfoChange} value={generalInfoData.instagram_url} name="instagram_url" />
                    </Flex>
                    <Flex gap={25} align="center" style={{ marginBottom: 10 }}>
                        <FaTwitter size={25} color="#1DA1F2" />
                        <Input type='text' size="large" placeholder="Twitter URL" onChange={handleGeneralInfoChange} value={generalInfoData.twitter_url} name="twitter_url" />
                    </Flex>
                </Box>
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