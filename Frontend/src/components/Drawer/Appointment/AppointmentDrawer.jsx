import React from 'react';
import { Col, Divider, Drawer, Flex, Row, Tag, Typography } from 'antd';
import { Box, Button } from '@mui/material';
import { GRAY3, GREEN, PRIMARY_BLUE, PRIMARY_GREEN } from '../../../config/colors';
import { red } from '@mui/material/colors';
import dayjs from 'dayjs'

let {Title, Text} = Typography

const AppointmentDrawer = ({appointment, open, setOpen}) => {

    const onClose = () => {
        setOpen(false);
    };

    if (!appointment) {
        return
    }

    return (
        <>

            <Drawer title={"Appointment Details"} size={'large'} onClose={onClose} open={open}>
                <Typography.Title level={4} style={{ marginBottom: 25 }}>Client Details</Typography.Title>
                <Row gutter={[16, 20]}>
                    <Col span={12}>
                        <Box>
                            <Flex align="center" gap={20}>
                                <img width={50} src="http://localhost:8000/storage/profile/fake.png" />
                                <Box>
                                    <Title level={5} style={{ marginBottom: -1 }}>{appointment.client.first_name} {appointment.client.last_name}</Title>
                                    <Text style={{ color: GRAY3, fontSize: 13}}>{appointment.client.email}</Text>
                                </Box>
                            </Flex>
                        </Box>
                    </Col>
                </Row>

                <Divider />

                <Typography.Title level={4} style={{ marginBottom: 25 }}>Appointment Details</Typography.Title>
                <Row gutter={[20, 30]}>
                    <Col span={12}>
                        <Box>
                            <Typography.Title level={5}>Appointment Type</Typography.Title>
                            <Typography.Text>
                                <Tag color={appointment.appointment_type == 'online' ? PRIMARY_GREEN : PRIMARY_BLUE} className="capitalize">{appointment.appointment_type.replace('_', '-')}</Tag>
                            </Typography.Text>
                        </Box>
                    </Col>
                    <Col span={12}>
                        <Box>
                            <Typography.Title level={5}>Appointment Status</Typography.Title>
                            <Typography.Text>
                                <Text style={{ color: PRIMARY_GREEN, fontWeight: 500 }} className="capitalize">{appointment?.appointment_status}</Text>
                            </Typography.Text>
                        </Box>
                    </Col>
                    <Col span={12}>
                        <Box>
                            <Typography.Title level={5}>Appointment Date</Typography.Title>
                            <Title level={5} style={{ margin: 0 }}>{dayjs(appointment.appointment_date).format('MMMM D, YYYY')} - {dayjs(appointment.appointment_date).format('HH:mm')}</Title>
                        </Box>
                    </Col>
                    <Col span={12}>
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
                    <Button variant='contained' sx={{ mr: 1, textTransform: 'capitalize', bgcolor: PRIMARY_BLUE }}>Add Prescription</Button>
                    <Button variant='contained' sx={{ bgcolor: red[500], textTransform: 'capitalize' }}>Reject</Button>
                </Box>
            </Drawer>
        </>
    );
};

export default AppointmentDrawer;