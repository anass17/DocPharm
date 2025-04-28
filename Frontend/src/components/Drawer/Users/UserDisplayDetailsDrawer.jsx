import React, { useState } from 'react';
import { Col, Divider, Drawer, Flex, Image, Row, Tag, Typography } from 'antd';
import { Box, Button, Typography as TP } from '@mui/material';
import { GRAY2, GRAY3, GREEN2, PRIMARY_BLUE, PRIMARY_GREEN } from '../../../config/colors';
import { red } from '@mui/material/colors';
import dayjs from 'dayjs'
import { FaMapMarkerAlt, FaPhone, FaPhoneAlt } from 'react-icons/fa';
import { backend_url } from '../../../config/app';
import { Link } from 'react-router-dom';

let {Title, Text} = Typography

const UserDisplayDetailsDrawer = ({user, open, setOpen}) => {

    const onClose = () => {
        setOpen(false);
    };

    if (!user) {
        return
    }

    return (
        <>
            <Drawer title={"Appointment Details"} size={'large'} onClose={onClose} open={open}>
                <Typography.Title level={4} style={{ marginBottom: 25 }}>General Information</Typography.Title>
                <Row gutter={[16, 20]} style={{ alignItems: 'center', marginBottom: 40 }}>
                    <Col xs={24} sm={12}>
                        <Flex align="center" gap={20}>
                            <img width={50} className='rounded-full' src={backend_url + (user.profile_picture ? user.profile_picture : '/storage/user_placeholder.jpg')} />
                            <Box>
                                <Link to={user.role == 'doctor' ? `/doctors/${user.id}` : (user.role == 'pharmacy' ? `/pharmacies/${user.id}` : '#')}>
                                    <Title level={5} style={{ marginBottom: -1, color: PRIMARY_BLUE }}>{user.first_name} {user.last_name}</Title>
                                </Link>
                                <Text style={{ color: GRAY3, fontSize: 13}}>{user.email}</Text>
                            </Box>
                        </Flex>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Box>
                            <Text style={{ color: GRAY3, fontSize: 13, display: 'flex', gap: 8}}>
                                <FaMapMarkerAlt style={{ position: 'relative', top: 4 }} />
                                {user.address}, {user.city}
                            </Text>
                            <Text style={{ color: GRAY3, fontSize: 13, display: 'flex', gap: 8}}>
                                <FaPhoneAlt style={{ position: 'relative', top: 4 }} />
                                {user.phone_number}
                            </Text>
                        </Box>
                    </Col>
                </Row>
                <Row gutter={[20, 30]}>
                    {
                        user.bio ? (
                            <Col xs={24}>
                                <Box>
                                    <Typography.Title level={5}>Bio</Typography.Title>
                                    <TP>{user.bio}</TP>
                                </Box>
                            </Col>

                        ) : null
                    }
                    <Col xs={24} sm={12}>
                        <Box>
                            <Typography.Title level={5}>Role</Typography.Title>
                            <Typography.Text>
                                <Tag color={user.role === 'doctor' ? PRIMARY_BLUE : (user.role == 'pharmacy' ? PRIMARY_GREEN : (user.role == 'admin' ? 'blueviolet': GREEN2))} className="capitalize">{user.role}</Tag>
                            </Typography.Text>
                        </Box>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Box>
                            <Typography.Title level={5}>Status</Typography.Title>
                            <TP>{user.status}</TP>
                        </Box>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Box>
                            <Typography.Title level={5}>Registration Date</Typography.Title>
                            <TP>{dayjs(user.created_at).format('DD/MM/YYYY - HH:mm')}</TP>
                        </Box>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Box>
                            <Typography.Title level={5}>Email Verification Date</Typography.Title>
                            <TP>{dayjs(user.email_verified_at).format('DD/MM/YYYY - HH:mm')}</TP>
                        </Box>
                    </Col>
                </Row>

                {
                    user.role == 'pharmacy' || user.role == 'doctor' ? (
                        <>
                            <Divider />
                            <Typography.Title level={4} style={{ marginBottom: 25 }}>Business Details</Typography.Title>
                            <Row gutter={[20, 30]}>
                                <Col xs={24} sm={12}>
                                    <Box>
                                        <Typography.Title level={5}>Medical License Number</Typography.Title>
                                        <TP>{user.medical_license_number}</TP>
                                    </Box>
                                </Col>
                                {
                                    user.role == 'doctor' ? (
                                        <>
                                            <Col xs={24} sm={12}>
                                                <Box>
                                                    <Typography.Title level={5}>Speciality</Typography.Title>
                                                    <TP>{user.speciality}</TP>
                                                </Box>
                                            </Col>
                                        </>
                                    ) : (
                                        <>
                                            <Col xs={24} sm={12}>
                                                <Box>
                                                    <Typography.Title level={5}>Pharmacy Name</Typography.Title>
                                                    <TP>{user.pharmacy_name}</TP>
                                                </Box>
                                            </Col>
                                        </>
                                    )
                                }
                                
                                <Col xs={24}>
                                    <Box>
                                        <Typography.Title level={5}>Building Image</Typography.Title>
                                        <Image
                                            width={'100%'}
                                            height={300}
                                            className="object-cover"
                                            src={`${backend_url}${user?.building_image ? user.building_image : '/storage/horizontal_image_placeholder.png'}`}
                                        />
                                    </Box>
                                </Col>
                            </Row>
                        </>
                    ) : null
                }

                

            </Drawer>
        </>
    );
};

export default UserDisplayDetailsDrawer;