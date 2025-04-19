import { BorderBottom, Label } from "@mui/icons-material";
import { Box, Button, InputLabel, TextField, Typography as TP } from "@mui/material";
import { Col, Flex, Input, Row, Typography } from "antd";
import { FaClock, FaEnvelope, FaFacebook, FaInfo, FaInfoCircle, FaInstagram, FaLock, FaMapMarker, FaMapMarkerAlt, FaPhone, FaPhoneAlt, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import WorkingHoursLine from "../../../components/Others/WorkingHoursLine";
import { GRAY2, GRAY3, GREEN, GREEN2, PRIMARY_GREEN } from "../../../config/colors";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import CustomFileInput from "../../../components/Form/CustomFileInput";
import SettingsWorkingHoursLine from "../../../components/Others/SettingsWorkingHoursLine";
import { DarkGreenButton } from "../../../components/Button/FilledButtons";
import TextArea from "antd/es/input/TextArea";

const PharmacySettingsSection = () => {

    const user = useSelector(data => data.user.user)

    return (
        <>
            <Row gutter={16}>
                <Col span={8}>
                    <Box sx={{ bgcolor: '#FFF', borderRadius: 2, p: 2.5, boxShadow: '0px 1px 2px rgba(0, 0, 0, .2)' }}>
                        <Button variant="text" style={{ display: 'flex', gap: 15, color: GREEN, width: '100%', justifyContent: 'flex-start', p: 2 }}>
                            <FaLock />
                            <Typography.Text style={{ color: GRAY3 }} className="capitalize">Security</Typography.Text>
                        </Button>
                        <Button variant="text" style={{ display: 'flex', gap: 15, color: GREEN, width: '100%', justifyContent: 'flex-start', p: 2 }}>
                            <FaInfoCircle />
                            <Typography.Text style={{ color: GRAY3 }} className="capitalize">General Information</Typography.Text>
                        </Button>
                        <Button variant="text" style={{ display: 'flex', gap: 15, color: GREEN, width: '100%', justifyContent: 'flex-start', p: 2 }}>
                            <FaClock />
                            <Typography.Text style={{ color: GRAY3 }} className="capitalize">Working Hours</Typography.Text>
                        </Button>
                    </Box>
                </Col>
                <Col span={16}>
                    <Box sx={{ bgcolor: '#FFF', borderRadius: 2, p: 2.5, mb: 5, boxShadow: '0px 1px 2px rgba(0, 0, 0, .2)' }}>
                        <Typography.Title level={4} style={{ marginBottom: 30 }}>Security</Typography.Title>
                        <Row gutter={10} style={{ marginBottom: 20 }}>
                            <Col span={12}>
                                <TextField label="New Password" fullWidth />
                            </Col>
                            <Col span={12}>
                                <TextField label="Confirm Password" fullWidth />
                            </Col>
                        </Row>
                        <DarkGreenButton>Update Password</DarkGreenButton>
                    </Box>
                    <Box sx={{ bgcolor: '#FFF', borderRadius: 2, p: 2.5, mb: 5, boxShadow: '0px 1px 2px rgba(0, 0, 0, .2)' }}>
                        <Typography.Title level={4} style={{ marginBottom: 30 }}>General Information</Typography.Title>
                        <Flex justify="center">
                            <CustomFileInput />
                        </Flex>
                        <Row gutter={10} style={{ margin: '1.25rem 0' }}>
                            <Col span={12}>
                                <InputLabel>Pharmacy Name</InputLabel>
                                <Input type='text' size="large" />
                            </Col>
                            <Col span={12}>
                                <InputLabel>Phone Number</InputLabel>
                                <Input type='text' size="large" />
                            </Col>
                        </Row>
                        <Box style={{ margin: '1.25rem 0' }}>
                            <Col span={24}>
                                <InputLabel>Description</InputLabel>
                                <TextArea rows={3} size="large" style={{ resize: 'none' }}></TextArea>
                            </Col>
                        </Box>
                        <Row gutter={10} style={{ margin: '1.25rem 0' }}>
                            <Col span={18}>
                                <InputLabel>Address</InputLabel>
                                <Input type='text' size="large" />
                            </Col>
                            <Col span={6}>
                                <InputLabel>City</InputLabel>
                                <Input type='text' size="large" />
                            </Col>
                        </Row>
                        <Box>
                            <Typography.Title level={5} style={{ marginBottom: 10 }}>Social Media</Typography.Title>
                            <Flex gap={25} align="center" style={{ marginBottom: 10 }}>
                                <FaFacebook size={25} color="#1877F2" />
                                <Input type='text' size="large" placeholder="Facebook URL" />
                            </Flex>
                            <Flex gap={25} align="center" style={{ marginBottom: 10 }}>
                                <FaInstagram size={25} color="#E1306C" />
                                <Input type='text' size="large" placeholder="Instagram URL" />
                            </Flex>
                            <Flex gap={25} align="center" style={{ marginBottom: 10 }}>
                                <FaTwitter size={25} color="#1DA1F2" />
                                <Input type='text' size="large" placeholder="Twitter URL" />
                            </Flex>
                        </Box>
                    </Box>

                    {/* Working Hours */}

                    <Box sx={{ bgcolor: '#FFF', borderRadius: 2, p: 2.5, boxShadow: '0px 1px 2px rgba(0, 0, 0, .2)' }}>
                        <Typography.Title level={4} style={{ marginBottom: 30 }}>Working Hours</Typography.Title>
                        <Row style={{ marginBottom: 25, fontSize: 18, fontWeight: 500 }}>
                            <Col span={6}>
                                Day
                            </Col>
                            <Col span={6}>
                                Working Day
                            </Col>
                            <Col span={6}>
                                Open At
                            </Col>
                            <Col span={6}>
                                Closes At
                            </Col>
                        </Row>
                        <SettingsWorkingHoursLine day={'Monday'} active={true} open_at={"8:00"} close_at={'17:00'} />
                        <SettingsWorkingHoursLine day={'Tuesday'} active={true} open_at={"8:00"} close_at={'17:00'} />
                        <SettingsWorkingHoursLine day={'Wednesday'} active={true} open_at={"8:00"} close_at={'17:00'} />
                        <SettingsWorkingHoursLine day={'Thursday'} active={true} open_at={"8:00"} close_at={'17:00'} />
                        <SettingsWorkingHoursLine day={'Friday'} active={true} open_at={"8:00"} close_at={'17:00'} />
                        <SettingsWorkingHoursLine day={'Saturday'} active={false} open_at={"0:00"} close_at={'0:00'} />
                        <SettingsWorkingHoursLine day={'Sunday'} active={false} open_at={"0:00"} close_at={'0:00'} />
                    </Box>
                    <DarkGreenButton style={{ marginTop: 20 }}>Save</DarkGreenButton>
                </Col>
            </Row>
        </>
    )
}

export default PharmacySettingsSection;