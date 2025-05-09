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
import AppointmentDrawer from "../../../components/Drawer/Appointment/AppointmentDrawer";

const { Title, Text } = Typography

const AppointmentsSection = () => {

    const [appointmentLoading, setAppointmentLoading] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const [api, NotificationHolder] = notification.useNotification();
    const [date, setDate] = useState(null)
    const [search, setSearch] = useState('')
    const [type, setType] = useState('')
    const [drawerOpen, setDrawerOpen] = useState(true);
    const [openAppointment, setOpenAppointment] = useState(null)

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

    const handleTypeSelect = (value) => {
        setType(value)
    }

    const handleAppointmentRejected = () => {
        setAppointments(appointments.filter(item => item.id != openAppointment.id))
        setDrawerOpen(false);
    }

    // Fetch API

    const getAppointments = async () => {
            
        setAppointmentLoading(true)

        try {

            const response = await fetch(`${backend_url}/api/doctor/appointments?date=${date}&type=${type}&search=${search}`, {
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
    }, [date, type, search]);
    

    return (
        <>
            {NotificationHolder}
            <Row gutter={[30, 30]}>
                <Col xs={24} xl={12}>
                    <AppointmentPicker onDateChange={handleDateChange} />
                </Col>
                <Col xs={24} xl={12}>
                    <Row gutter={[12, 20]} style={{marginBottom: 20}}>
                        <Col xs={24} md={12} xl={24}>
                            <Box>
                                <InputLabel>Find By Search</InputLabel>
                                <Input size="large" value={search} placeholder="Search for appointments ..." prefix={<FaSearch style={{ marginRight: 10 }} />} onChange={(e) => setSearch(e.target.value)} />
                            </Box>
                        </Col>
                        <Col xs={24} md={12} xl={24}>
                            <Box>
                                <InputLabel>Find By Appointment Type</InputLabel>
                                <Select
                                    placeholder="Appointment Type"
                                    size="large"
                                    style={{ width: '100%' }}
                                    value={type}
                                    options={
                                        [
                                            {value: '', label: 'Both'},
                                            {value: 'online', label: 'Online'},
                                            {value: 'in_person', label: 'In-Person'},
                                        ]
                                    }
                                    onChange={handleTypeSelect}
                                />
                            </Box>
                        </Col>
                    </Row>
                    <DarkGreenButton style={{ width: '100%' }} onClick={handleSelectionClear}>
                        Clear Selection
                    </DarkGreenButton>
                </Col>
            </Row>
            <Divider />
            
            <Box style={{ backgroundColor: '#FFF', boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.15)', marginBottom: 10, padding: '1rem 0.75rem', borderRadius: 5, fontWeight: 500 }}>
                <Row gutter={16}>
                    <Col xs={24} md={0} style={{textAlign: 'center' }}>
                        Appointments
                    </Col>
                    <Col xs={0} md={12}>
                        Client
                    </Col>
                    <Col xs={0} md={5}>
                        Type
                    </Col>
                    <Col xs={0} md={7}>
                        Date
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
                                    <Box key={index} overflow={'hidden'}>
                                        <Row gutter={[16, 20]} style={{ padding: '1rem 0.75rem', alignItems: 'center' }} className="hover:bg-gray-200 transition cursor-pointer" onClick={() => {setDrawerOpen(true); setOpenAppointment(item)}}>
                                            <Col xs={12} md={12}>
                                                <Flex align="center" gap={20}>
                                                    <img width={50} className="rounded-full" src={`${backend_url}${item.client.profile_picture ? item.client.profile_picture : '/storage/user_placeholder.jpg'}`} />
                                                    <Box>
                                                        <Title level={5} style={{ marginBottom: -1 }}>{item.client.first_name} {item.client.last_name}</Title>
                                                        <Text style={{ color: GRAY3, fontSize: 13}}>{item.client.email}</Text>
                                                    </Box>
                                                </Flex>
                                            </Col>
                                            <Col xs={12} md={5} className="text-right md:text-left">
                                                <Tag color={item.appointment_type == 'online' ? PRIMARY_GREEN : PRIMARY_BLUE} className="capitalize">{item.appointment_type.replace('_', '-')}</Tag>
                                            </Col>
                                            <Col xs={12} md={7}>
                                                <Title level={5} style={{ margin: 0 }}>{dayjs(item.appointment_date).format('MMMM D, YYYY')}</Title>
                                                <Text style={{ color: GRAY3, fontSize: 13 }}>{dayjs(item.appointment_date).format('HH:mm')}</Text>
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

            <AppointmentDrawer appointment={openAppointment} open={drawerOpen} setOpen={setDrawerOpen} onUpdate={handleAppointmentRejected} />
        </>
    )
}

export default AppointmentsSection;