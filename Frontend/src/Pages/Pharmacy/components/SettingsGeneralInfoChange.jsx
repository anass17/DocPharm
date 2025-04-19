import { Box, InputLabel } from "@mui/material"
import { Col, Flex, Input, Row, Typography } from "antd"
import CustomFileInput from "../../../components/Form/CustomFileInput"
import TextArea from "antd/es/input/TextArea"
import { FaFacebook, FaInstagram, FaSave, FaTwitter } from "react-icons/fa"
import { DarkGreenButton } from "../../../components/Button/FilledButtons"
import { useState } from "react"
import { useSelector } from "react-redux"

const SettingsGeneralInfoChange = () => {

    const user = useSelector(data => data.user.user) || {}

    const [generalInfoData, setGeneralInfoData] = useState({name: user.pharmacy_name, phone: user.phone_number, desc: user.bio, address: user.address, city: user.city, facebook: '', instagram: '', twitter: ''})
    const [generalInfoErrors, setGeneralInfoErrors] = useState({})

    const handleGeneralInfoChange = (e) => {
        setGeneralInfoData({
            ...generalInfoData,
            [e.target.name]: e.target.value
        })
    }

    const handleGeneralInfoSubmit = () => {
        const errors = {}

        if (!generalInfoData.name) {
            errors.name = "Pharmacy Name is required"
        }
        if (generalInfoData.phone.search(/^0[567][0-9]{8}$/) < 0) {
            errors.phone = "Enter a valid phone number"
        }
        if (!generalInfoData.desc) {
            errors.desc = "Enter a description"
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

        setGeneralInfoErrors({})
    }

    return (
        <Box sx={{ bgcolor: '#FFF', borderRadius: 2, p: 2.5, mb: 5, boxShadow: '0px 1px 2px rgba(0, 0, 0, .2)' }}>
            <Typography.Title level={4} style={{ marginBottom: 30 }}>General Information</Typography.Title>
            <Flex justify="center">
                <CustomFileInput url='http://localhost:8000/storage/test/pharmacy.jpg' />
            </Flex>
            <Row gutter={[10, 16]} style={{ margin: '1.25rem 0' }}>
                <Col xs={24} sm={12}>
                    <InputLabel>Pharmacy Name *</InputLabel>
                    <Input type='text' size="large" onChange={handleGeneralInfoChange} value={generalInfoData.name} name="name" />
                    <Typography.Text style={{ color: 'red' }}>{generalInfoErrors.name}</Typography.Text>
                </Col>
                <Col xs={24} sm={12}>
                    <InputLabel>Phone Number *</InputLabel>
                    <Input type='text' size="large" onChange={handleGeneralInfoChange} value={generalInfoData.phone} name="phone" />
                    <Typography.Text style={{ color: 'red' }}>{generalInfoErrors.phone}</Typography.Text>
                </Col>
            </Row>
            <Box style={{ margin: '1.25rem 0' }}>
                <Col span={24}>
                    <InputLabel>Description *</InputLabel>
                    <TextArea rows={3} size="large" style={{ resize: 'none' }} placeholder="Add a description ..." onChange={handleGeneralInfoChange} value={generalInfoData.desc} name="desc" />
                    <Typography.Text style={{ color: 'red' }}>{generalInfoErrors.desc}</Typography.Text>
                </Col>
            </Box>
            <Row gutter={[10, 16]} style={{ margin: '1.25rem 0' }}>
                <Col xs={24} sm={18}>
                    <InputLabel>Address *</InputLabel>
                    <Input type='text' size="large" onChange={handleGeneralInfoChange} value={generalInfoData.address} name="address" />
                    <Typography.Text style={{ color: 'red' }}>{generalInfoErrors.address}</Typography.Text>
                </Col>
                <Col xs={24} sm={6}>
                    <InputLabel>City *</InputLabel>
                    <Input type='text' size="large" onChange={handleGeneralInfoChange} value={generalInfoData.city} name="city" />
                    <Typography.Text style={{ color: 'red' }}>{generalInfoErrors.city}</Typography.Text>
                </Col>
            </Row>
            <Box>
                <Typography.Title level={5} style={{ marginBottom: 10 }}>Social Media</Typography.Title>
                <Flex gap={25} align="center" style={{ marginBottom: 10 }}>
                    <FaFacebook size={25} color="#1877F2" />
                    <Input type='text' size="large" placeholder="Facebook URL" onChange={handleGeneralInfoChange} value={generalInfoData.facebook} name="facebook" />
                </Flex>
                <Flex gap={25} align="center" style={{ marginBottom: 10 }}>
                    <FaInstagram size={25} color="#E1306C" />
                    <Input type='text' size="large" placeholder="Instagram URL" onChange={handleGeneralInfoChange} value={generalInfoData.instagram} name="instagram" />
                </Flex>
                <Flex gap={25} align="center" style={{ marginBottom: 10 }}>
                    <FaTwitter size={25} color="#1DA1F2" />
                    <Input type='text' size="large" placeholder="Twitter URL" onChange={handleGeneralInfoChange} value={generalInfoData.twitter} name="twitter" />
                </Flex>
            </Box>
            <DarkGreenButton style={{ marginTop: 20 }} onClick={handleGeneralInfoSubmit}>
                <FaSave />
                Save
            </DarkGreenButton>
        </Box>
    )
}

export default SettingsGeneralInfoChange