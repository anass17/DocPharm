import { Col, Input, notification, Row, Typography, Select, Button, Divider, Tag, Flex, Spin } from "antd";
import { useEffect, useState } from "react";
import { backend_url } from "../../../config/app";
import Cookies from 'js-cookie';
import AppointmentPicker from "../components/AppointmentPicker";
import { FaDotCircle, FaEllipsisH, FaSearch } from "react-icons/fa";
import { Box, InputLabel, MenuItem } from "@mui/material";
import { DarkGreenButton } from "../../../components/Button/FilledButtons";
import { GRAY3, PRIMARY_BLUE, PRIMARY_GREEN } from "../../../config/colors";
import { LoadingOutlined } from "@ant-design/icons";
import dayjs from 'dayjs'

const { Title, Text } = Typography

const AppointmentsSection = () => {

    const [loading, setLoading] = useState(false);
    const [appointmentLoading, setAppointmentLoading] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const [api, NotificationHolder] = notification.useNotification();
    const [date, setDate] = useState(null)
    const [search, setSearch] = useState('')
    const [type, setType] = useState('')

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

    // Event Handler

    const handleDateChange = (_, date) => {
        setDate(date)
    }

    const handleSelectionClear = () => {
        setDate(null)
        setSearch('')
        setType('')
    }

    // Fetch API

    const getAppointments = async () => {
            
        setAppointmentLoading(true)

        try {

            const response = await fetch(`${backend_url}/api/appointments?date=${date}`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('auth_token'),
                },
            });
    
            if (response.status === 401) {
                openNotification('Access Denied', 'You are not authorized to perform this action')
            } else if (response.status === 200) {
                let responseData = await response.json()

                setAppointments(responseData.results)

            } else {
                openNotification('Something went wrong!', 'Could not load your appointments')
            }
        } catch (error) {
            console.log(error)
            openNotification('Something went wrong!', 'Could not load your appointments')
        } finally {
            setAppointmentLoading(false)
        }
    }

    useEffect(() => {
        getAppointments()
    }, [date]);
    

    return (
        <>
            {NotificationHolder}
            <Row gutter={30}>
                <Col span={12}>
                    <AppointmentPicker onDateChange={handleDateChange} />
                </Col>
                <Col span={12}>
                    <Box style={{ marginBottom: 20 }}>
                        <InputLabel>Find By Search</InputLabel>
                        <Input size="large" placeholder="Search for appointments ..." prefix={<FaSearch style={{ marginRight: 10 }} />} />
                    </Box>
                    <Box style={{ marginBottom: 20 }}>
                        <InputLabel>Find By Appointment Type</InputLabel>
                        <Select
                            placeholder="Appointment Type"
                            size="large"
                            style={{ width: '100%' }}
                            defaultValue={''}
                            options={
                                [
                                    {value: '', label: 'Any'},
                                    {value: 'both', label: 'Both'},
                                    {value: 'online', label: 'Online'},
                                    {value: 'in_person', label: 'In-Person'},
                                ]
                            }
                        />
                    </Box>
                    <DarkGreenButton style={{ width: '100%' }} onClick={handleSelectionClear}>
                        Clear Selection
                    </DarkGreenButton>
                </Col>
            </Row>
            <Divider />
            
            <Box style={{ backgroundColor: '#FFF', boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.15)', marginBottom: 10, padding: '1rem 0.75rem', borderRadius: 5, fontWeight: 500 }}>
                <Row gutter={16}>
                    <Col span={10}>
                        Client
                    </Col>
                    <Col span={4}>
                        Type
                    </Col>
                    <Col span={6}>
                        Date
                    </Col>
                    <Col span={4}>
                        Action
                    </Col>
                </Row>
            </Box>
            
            <Box style={{ backgroundColor: '#FFF', boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.15)', marginBottom: 10, borderRadius: 5, fontWeight: 500 }}>
                
                {
                    appointmentLoading ? (
                        <Box sx={{ p: 4, textAlign: 'center' }}>
                            <Spin indicator={<LoadingOutlined spin />} size="large" />
                        </Box>
                    ) : (
                        appointments.length === 0 ? (
                            <p className="text-center" style={{ padding: '2rem 0' }}>You don't have any appointment!</p>
                        ) : (
                            appointments.map((item, index) => {
                                return (
                                    <Box key={index}>
                                        <Row gutter={16} style={{ padding: '1rem 0.75rem', alignItems: 'center' }}>
                                            <Col span={10}>
                                                <Flex align="center" gap={20}>
                                                    <img width={50} src="http://localhost:8000/storage/profile/fake.png" />
                                                    <Box>
                                                        <Title level={5} style={{ marginBottom: -1 }}>{item.client.first_name} {item.client.last_name}</Title>
                                                        <Text style={{ color: GRAY3, fontSize: 13}}>{item.client.email}</Text>
                                                    </Box>
                                                </Flex>
                                            </Col>
                                            <Col span={4}>
                                                <Tag color={item.appointment_type == 'online' ? PRIMARY_GREEN : PRIMARY_BLUE} className="capitalize">{item.appointment_type.replace('_', '-')}</Tag>
                                            </Col>
                                            <Col span={6}>
                                                <Title level={5} style={{ margin: 0 }}>{dayjs(item.appointment_date).format('MMMM D, YYYY')}</Title>
                                                <Text style={{ color: GRAY3, fontSize: 13 }}>{dayjs(item.appointment_date).format('HH:mm')}</Text>
                                            </Col>
                                            <Col span={4}>
                                                <Button style={{ border: 'none' }}>
                                                    <FaEllipsisH />
                                                </Button>
                                            </Col>
                                        </Row>
                                        <Divider style={{ margin: 0 }}/>
                                    </Box>
                                )
                            })
                        )
                    )
                }
            </Box>
        </>
    )
}

export default AppointmentsSection;