import { Box, Button, Typography as TP } from "@mui/material";
import { Col, Flex, Image, Row, Typography } from "antd";
import { FaEnvelope, FaFacebook, FaInstagram, FaMapMarkerAlt, FaPen, FaPhoneAlt, FaTwitter } from "react-icons/fa";
import { GRAY2, GRAY3, GREEN, PRIMARY_GREEN } from "../../../config/colors";
import { useSelector } from "react-redux";
import dayjs from 'dayjs'
import { backend_url } from "../../../config/app";
import { Link } from "react-router-dom";

const ProfileSection = () => {

    const user = useSelector(data => data.user.user)

    return (
        <>
            <Box className="bg-white rounded-lg shadow-md" style={{ padding: '1.75rem 1.5rem' }}>
                <Flex gap={24} align="center" style={{ marginBottom: 30 }}>
                    <Image
                        width={70}
                        height={70}
                        className="object-cover rounded-full"
                        src={`${backend_url}${user?.profile_picture ? user?.profile_picture : '/storage/user_placeholder.jpg'}`}
                    />
                    <Box>
                        <Typography.Title level={4} style={{ marginBottom: 3 }}>{user?.first_name ? (user.first_name + user?.last_name) : 'loading ...'}</Typography.Title>
                        <Typography.Title level={5} style={{ margin: 0, color: GRAY3 }}>Member Since: {dayjs(user?.created_at).format("MMMM DD, YYYY")}</Typography.Title>
                    </Box>
                </Flex>
                <Row gutter={[20, 20]}>
                    <Col xs={24} md={12}>
                        <Typography.Title level={4}>Details</Typography.Title>
                        <Box>
                            <Flex gap={15} style={{ marginBottom: 4 }}>
                                <FaPhoneAlt style={{ position: 'relative', top: 4 }} fill={PRIMARY_GREEN} />
                                <TP>{user?.phone_number ? user.phone_number : 'loading ...'}</TP>
                            </Flex>
                        </Box>
                        <Box>
                            <Flex gap={15} style={{ marginBottom: 4 }}>
                                <FaEnvelope style={{ position: 'relative', top: 4 }} fill={PRIMARY_GREEN} />
                                <TP>{user?.email ? user.email : 'loading ...'}</TP>
                            </Flex>
                        </Box>
                        <Box>
                            <Flex gap={15} style={{ marginBottom: 4 }}>
                                <FaMapMarkerAlt style={{ position: 'relative', top: 4 }} fill={PRIMARY_GREEN} />
                                <TP>{user?.address ? (user.address + ', ' + user.city) : 'loading ...'}</TP>
                            </Flex>
                        </Box>
                    </Col>
                    <Col xs={24} md={12}>
                        <Box sx={{ color: GRAY2, '&:hover': {color: '#1877F2'} }}>
                            <Typography.Title level={4}>Social Media</Typography.Title>
                            <Box style={{ display: 'flex', gap: 20 }}>
                                <Link target="_blank" to={''} style={{ color: "inherit" }} >
                                    <FaFacebook size={20} />
                                </Link>
                                <Box sx={{ color: GRAY2, '&:hover': {color: '#E1306C'} }}>
                                    <Link target="_blank" to={''} style={{ color: "inherit" }}>
                                        <FaInstagram size={20} />
                                    </Link>
                                </Box>
                                <Box sx={{ color: GRAY2, '&:hover': {color: '#1DA1F2'} }}>
                                    <Link target="_blank" to={''} style={{ color: "inherit" }}>
                                        <FaTwitter size={20} />
                                    </Link>
                                </Box>
                            </Box>
                        </Box>
                    </Col>
                </Row>
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                    <Link to={'/admin/settings'}>
                        <Button style={{ display: 'flex', gap: 3, backgroundColor: GREEN, padding: '0.5rem 2rem', color: '#FFF' }}>
                            <FaPen />
                            Edit
                        </Button>
                    </Link>
                </Box>
            </Box>
        </>
    )
}

export default ProfileSection;