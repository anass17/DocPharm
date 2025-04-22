import React, { useState } from 'react';
import { Col, Divider, Drawer, Flex, notification, Row, Tag, Typography } from 'antd';
import { Box, Button, TextField } from '@mui/material';
import { GRAY2, GRAY3, GREEN, PRIMARY_BLUE, PRIMARY_GREEN } from '../../../config/colors';
import { grey, red } from '@mui/material/colors';
import { backend_url } from "../../../config/app";
import Cookies from 'js-cookie';
import dayjs from 'dayjs'
import AddPrescriptionModal from '../../Modal/Prescription/AddPrescriptionModal';

let {Title, Text} = Typography

const AppointmentDrawer = ({appointment, open, setOpen, onUpdate}) => {

    const [reject, setReject] = useState(false);
    const [rejectReason, setRejectReason] = useState('')
    const [rejectReasonError, setRejectReasonError] = useState('')
    const [rejectLoading, setRejectLoading] = useState(false)
    const [api, NotificationHolder] = notification.useNotification();
    const [modalOpen, setModalOpen] = useState(false)

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

    const onClose = () => {
        setOpen(false);
    };

    if (!appointment) {
        return
    }

    // Event Handlers

    const handleChange = (e) => {
        setRejectReason(e.target.value)
    }

    const handleRejectClick = () => {
        setReject(true);
    }

    const handleRejectionSubmit = () => {
        if (!rejectReason) {
            setRejectReasonError('Please specify the reason of the rejection')
            return
        }

        setRejectReasonError('')
        updateRejection()
    }

    const handlePrescriptionClick = () => {
        setModalOpen(true)
    }

    // Fetch API

    const updateRejection = async () => {
                
        setRejectLoading(true)

        try {

            const response = await fetch(`${backend_url}/api/appointments/${appointment.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('auth_token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({appointment_status: 'rejected', appointment_rejection_note: rejectReason})
            });
    
            if (response.status === 401) {
                openNotification('Access Denied', 'You are not authorized to perform this action')
            } else if (response.status === 204) {
                openNotification('Success', 'The appointment has been successfully rejected', 'success')
                setReject(false)
                setRejectReason('')
                setOpen(false)
                onUpdate()
            } else {
                openNotification('Something went wrong!', 'Could not load your appointments')
            }
        } catch (error) {
            console.log(error)
            openNotification('Something went wrong!', 'Could not load your appointments')
        } finally {
            setRejectLoading(false)
        }
    }

    return (
        <>
            {NotificationHolder}
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
                    {
                        reject ? (
                            <>
                                <TextField multiline rows={4} placeholder='Specify the reason of the rejection' fullWidth onChange={handleChange} />
                                <Text style={{ color: 'red' }}>{rejectReasonError}</Text>
                                <Box sx={{ mt: 1.5 }}>
                                    <Button variant='contained' sx={{ mr: 1, bgcolor: grey[500], textTransform: 'capitalize' }} onClick={() => setReject(false)}>Cancel</Button>
                                    {
                                        rejectLoading ? (
                                            <Button loading variant='contained' sx={{ bgcolor: grey[100], color: GRAY2 }}>Reject</Button>
                                        ) : (
                                            <Button variant='contained' sx={{ bgcolor: red[500], textTransform: 'capitalize' }} onClick={handleRejectionSubmit}>Reject</Button>
                                        )
                                    }
                                </Box>
                            </>
                        ) : (
                            <>
                                {
                                    dayjs(appointment.appointment_date).isBefore(dayjs()) ? (
                                        <Button variant='contained' sx={{ mr: 1, textTransform: 'capitalize', bgcolor: PRIMARY_BLUE }} onClick={handlePrescriptionClick}>Add Prescription</Button>
                                    ) : null
                                }
                                <Button variant='contained' sx={{ bgcolor: red[500], textTransform: 'capitalize' }} onClick={handleRejectClick}>Reject</Button>
                            </>
                        )
                    }
                </Box>
            </Drawer>

            <AddPrescriptionModal apt_id={appointment?.id} open={modalOpen} setOpen={setModalOpen} statusUpdate={onUpdate} />
        </>
    );
};

export default AppointmentDrawer;