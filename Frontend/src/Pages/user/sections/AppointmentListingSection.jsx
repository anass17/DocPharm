import { Col, Input, notification, Row, Typography, Select, Button, Divider, Tag, Flex, Spin } from "antd";
import { useEffect, useState } from "react";
import { backend_url } from "../../../config/app";
import Cookies from 'js-cookie';
import AppointmentPicker from "../components/AppointmentPicker";
import { FaDotCircle, FaEllipsisH, FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { Box, InputLabel, MenuItem } from "@mui/material";
import { DarkGreenButton } from "../../../components/Button/FilledButtons";
import { GRAY2, GRAY3, PRIMARY_BLUE, PRIMARY_GREEN } from "../../../config/colors";
import { LoadingOutlined } from "@ant-design/icons";
import dayjs from 'dayjs'
import AppointmentDrawer from "../../../components/Drawer/Appointment/AppointmentDrawer";
import { Link } from "react-router-dom";
import UserAppointmentDrawer from "../../../components/Drawer/Appointment/UserAppointmentDrawer";
import { red } from "@mui/material/colors";

const { Title, Text } = Typography

const AppointmentsListingSection = () => {

    const [appointmentLoading, setAppointmentLoading] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const [api, NotificationHolder] = notification.useNotification();
    const [status, setStatus] = useState('')
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

    // Fetch API

    const getAppointments = async () => {
            
        setAppointmentLoading(true)

        try {

            const response = await fetch(`${backend_url}/api/appointments?status=${status}&type=${type}&search=${search}`, {
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
    }, [status, type, search]);
    

    return (
        <>
            {NotificationHolder}

            <Row gutter={[6, 20]} style={{ marginBottom: 16 }}>
                <Col span={12}>
                    <Title level={5}>Search for appointments</Title>
                    <Input size="large" onChange={(e) => setSearch(e.target.value)} placeholder="Search for ..." prefix={<FaSearch style={{ marginRight: 7 }} />} />
                </Col>
                <Col span={6}>
                    <Title level={5}>Select Type</Title>
                    <Select 
                        size="large"
                        style={{ width: '100%' }}
                        value={type}
                        onChange={(value) => setType(value)}
                        options={[
                            {label: 'Any', value: ''},
                            {label: 'In-Person', value: 'in_person'},
                            {label: 'Online', value: 'online'},
                        ]}
                    />
                </Col>
                <Col span={6}>
                    <Title level={5}>Select Status</Title>
                    <Select 
                        size="large"
                        style={{ width: '100%' }}
                        value={status}
                        onChange={(value) => setStatus(value)}
                        options={[
                            {label: 'Any', value: ''},
                            {label: 'Upcoming', value: 'active'},
                            {label: 'Rejected', value: 'rejected'},
                            {label: 'Completed', value: 'closed'}
                        ]}
                    />
                </Col>
            </Row>

            <Divider />

            <Box style={{ backgroundColor: '#FFF', boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.15)', marginBottom: 10, padding: '1rem 0.75rem', borderRadius: 5, fontWeight: 500 }}>
                <Row gutter={16}>
                    <Col xs={24} md={0} style={{textAlign: 'center' }}>
                        Appointments
                    </Col>
                    <Col xs={0} md={8}>
                        Client
                    </Col>
                    <Col xs={0} md={4}>
                        Type
                    </Col>
                    <Col xs={0} md={4}>
                        Status
                    </Col>
                    <Col xs={0} md={4}>
                        Date
                    </Col>
                    <Col xs={0} md={4}>
                        Prescription
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
                                            <Col xs={12} md={8}>
                                                <Flex align="center" gap={20}>
                                                    <img width={50} className="rounded-full" src={`${backend_url}${item?.doctor.profile_picture ? item.doctor.profile_picture : '/storage/user_placeholder.jpg'}`} />
                                                    <Box>
                                                        <Title level={5} style={{ marginBottom: -1 }}>{item.doctor.first_name} {item.doctor.last_name}</Title>
                                                        <Text style={{ color: GRAY3, fontSize: 13, display: 'flex', gap: 5}}>
                                                            <FaMapMarkerAlt style={{ position: 'relative', top: 4 }} />
                                                            {item.doctor.address}, {item.doctor.city}
                                                        </Text>
                                                    </Box>
                                                </Flex>
                                            </Col>
                                            <Col xs={12} md={4} className="text-right md:text-left">
                                                <Tag color={item.appointment_type == 'online' ? PRIMARY_GREEN : PRIMARY_BLUE} className="capitalize">{item.appointment_type.replace('_', '-')}</Tag>
                                            </Col>
                                            <Col xs={12} md={4} className="md:text-left">
                                                {
                                                    item.appointment_status == 'active' ? (
                                                        <span style={{color: PRIMARY_GREEN}} className="capitalize">Upcoming</span>
                                                    ) : (
                                                        item.appointment_status == 'rejected' ? (
                                                            <span style={{color: red[500]}} className="capitalize">Rejected</span>
                                                        ) : (
                                                            <span style={{color: GRAY2}} className="capitalize">Completed</span>
                                                        )
                                                    )
                                                }
                                            </Col>
                                            <Col xs={12} md={4}>
                                                <Title level={5} style={{ margin: 0 }}>{dayjs(item.appointment_date).format('MMMM D, YYYY')}</Title>
                                                <Text style={{ color: GRAY3, fontSize: 13 }}>{dayjs(item.appointment_date).format('HH:mm')}</Text>
                                            </Col>
                                            <Col xs={12} md={4} className="md:text-left">
                                                {
                                                    item.appointment_prescription ? (
                                                        <Link to={`/prescriptions/${item.appointment_prescription}`}>
                                                            View
                                                        </Link>
                                                    ): (
                                                        <span>N/A</span>
                                                    )
                                                    
                                                    }
                                                    
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

            <UserAppointmentDrawer appointment={openAppointment} open={drawerOpen} setOpen={setDrawerOpen} />
        </>
    )
}

export default AppointmentsListingSection;