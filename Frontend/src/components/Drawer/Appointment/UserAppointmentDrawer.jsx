import React, { useState } from 'react';
import { Col, Divider, Drawer, Flex, Row, Tag, Typography } from 'antd';
import { Box, Button } from '@mui/material';
import { GRAY2, GRAY3, PRIMARY_BLUE, PRIMARY_GREEN } from '../../../config/colors';
import { red } from '@mui/material/colors';
import dayjs from 'dayjs'
import { FaMapMarkerAlt, FaPhone, FaPhoneAlt } from 'react-icons/fa';

let {Title, Text} = Typography

const UserAppointmentDrawer = ({appointment, open, setOpen}) => {

    const onClose = () => {
        setOpen(false);
    };

    if (!appointment) {
        return
    }

    return (
        <>
            <Drawer title={"Appointment Details"} size={'large'} onClose={onClose} open={open}>
                <Typography.Title level={4} style={{ marginBottom: 25 }}>Doctor's Details</Typography.Title>
                <Row gutter={[16, 20]} style={{ alignItems: 'center' }}>
                    <Col xs={24} sm={12}>
                        <Flex align="center" gap={20}>
                            <img width={50} src="http://localhost:8000/storage/profile/fake.png" />
                            <Box>
                                <Title level={5} style={{ marginBottom: -1 }}>{appointment.doctor.first_name} {appointment.doctor.last_name}</Title>
                                <Text style={{ color: GRAY3, fontSize: 13}}>{appointment.doctor.email}</Text>
                            </Box>
                        </Flex>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Box>
                            <Text style={{ color: GRAY3, fontSize: 13, display: 'flex', gap: 8}}>
                                <FaMapMarkerAlt style={{ position: 'relative', top: 4 }} />
                                {appointment.doctor.address}, {appointment.doctor.city}
                            </Text>
                            <Text style={{ color: GRAY3, fontSize: 13, display: 'flex', gap: 8}}>
                                <FaPhoneAlt style={{ position: 'relative', top: 4 }} />
                                {appointment.doctor.phone_number}
                            </Text>
                        </Box>
                    </Col>
                </Row>

                <Divider />

                <Typography.Title level={4} style={{ marginBottom: 25 }}>Appointment Details</Typography.Title>
                <Row gutter={[20, 30]}>
                    <Col xs={24} sm={12}>
                        <Box>
                            <Typography.Title level={5}>Appointment Type</Typography.Title>
                            <Typography.Text>
                                <Tag color={appointment.appointment_type == 'online' ? PRIMARY_GREEN : PRIMARY_BLUE} className="capitalize">{appointment.appointment_type.replace('_', '-')}</Tag>
                            </Typography.Text>
                        </Box>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Box>
                            <Typography.Title level={5}>Appointment Status</Typography.Title>
                            <Typography.Text>
                                {
                                    appointment?.appointment_status == 'active' ? (
                                        <Text style={{ color: PRIMARY_GREEN, fontWeight: 500 }}>Upcoming</Text>
                                    ) : (
                                        appointment?.appointment_status == 'rejected' ? ( 
                                            <Text style={{ color: red[500], fontWeight: 500 }}>Rejected</Text>
                                        ) : (
                                            <Text style={{ color: GRAY2, fontWeight: 500 }}>Completed</Text>
                                        )
                                    )
                                }
                            </Typography.Text>
                        </Box>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Box>
                            <Typography.Title level={5}>Appointment Date</Typography.Title>
                            <Title level={5} style={{ margin: 0 }}>{dayjs(appointment.appointment_date).format('MMMM D, YYYY')} - {dayjs(appointment.appointment_date).format('HH:mm')}</Title>
                        </Box>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Box>
                            <Typography.Title level={5}>Appointment Price</Typography.Title>
                            <Title level={5} style={{ margin: 0 }}>{appointment.appointment_price} DH</Title>
                        </Box>
                    </Col>
                    <Col span={24}>
                        <Box>
                            <Typography.Title level={5}>Appointment Description</Typography.Title>
                            <Text style={{ margin: 0 }}>{appointment.appointment_description}</Text>
                        </Box>
                    </Col>
                </Row>

                <Divider />

                <Box sx={{ mt: 4 }}>
                    {
                        appointment.appointment_status !== 'rejected' ? (
                            appointment.appointment_prescription ? (
                                <Button>View Prescription</Button>
                            ) : (
                                <span>Prescription Not Available Yet</span>
                            )
                        ) : (
                            <>
                                <Typography.Title level={5}>Rejection Note</Typography.Title>
                                <Text style={{ margin: 0 }}>{appointment.appointment_rejection_note}</Text>
                            </>
                        )
                    }
                </Box>
            </Drawer>
        </>
    );
};

export default UserAppointmentDrawer;