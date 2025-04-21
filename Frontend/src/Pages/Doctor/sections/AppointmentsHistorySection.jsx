import { Col, Input, notification, Row, Typography, Select, Button, Divider, Tag, Flex } from "antd";
import { useState } from "react";
import { backend_url } from "../../../config/app";
import Cookies from 'js-cookie';
import AppointmentPicker from "../components/AppointmentPicker";
import { FaDotCircle, FaEllipsisH, FaSearch } from "react-icons/fa";
import { Box, InputLabel, MenuItem } from "@mui/material";
import { DarkGreenButton } from "../../../components/Button/FilledButtons";
import { GRAY3, PRIMARY_BLUE, PRIMARY_GREEN } from "../../../config/colors";

const { Title, Text } = Typography

const AppointmentsHistorySection = () => {

    const [loading, setLoading] = useState(false);
    const [api, NotificationHolder] = notification.useNotification();

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


    

    return (
        <>
            {NotificationHolder}
            <Row gutter={30}>
                <Col span={12}>
                    <AppointmentPicker />
                </Col>
                <Col span={12}>
                    <Box style={{ marginBottom: 20 }}>
                        <InputLabel>Find By Search</InputLabel>
                        <Input size="large" placeholder="Search for appointments ..." prefix={<FaSearch style={{ marginRight: 10 }} />} />
                    </Box>
                    <Box style={{ marginBottom: 20 }}>
                        <InputLabel>Appointment Type</InputLabel>
                        <Select
                            placeholder="Type"
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
                    <Box style={{ marginBottom: 20 }}>
                        <InputLabel>Appointment Status</InputLabel>
                        <Select
                            placeholder="Status"
                            size="large"
                            style={{ width: '100%' }}
                            defaultValue={''}
                            options={
                                [
                                    {value: '', label: 'Any'},
                                    {value: 'completed', label: 'Completed'},
                                    {value: 'active', label: 'Active'},
                                ]
                            }
                        />
                    </Box>
                    <DarkGreenButton style={{ width: '100%' }}>
                        Clear Selection
                    </DarkGreenButton>
                </Col>
            </Row>
            <Divider />
            
            <Box style={{ backgroundColor: '#FFF', boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.15)', marginBottom: 10, padding: '1rem 0.75rem', borderRadius: 5, fontWeight: 500 }}>
                <Row gutter={16}>
                    <Col span={8}>
                        Client
                    </Col>
                    <Col span={4}>
                        Type
                    </Col>
                    <Col span={4}>
                        Status
                    </Col>
                    <Col span={4}>
                        Price
                    </Col>
                    <Col span={4}>
                        Date
                    </Col>
                </Row>
            </Box>
            
            <Box style={{ backgroundColor: '#FFF', boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.15)', marginBottom: 10, borderRadius: 5, fontWeight: 500 }}>
                <Row gutter={16} style={{ padding: '1rem 0.75rem', alignItems: 'center' }}>
                    <Col span={8}>
                        <Flex align="center" gap={20}>
                            <img width={50} src="http://localhost:8000/storage/profile/fake.png" />
                            <Box>
                                <Title level={5} style={{ marginBottom: -1 }}>Anass Boutaib</Title>
                                <Text style={{ color: GRAY3, fontSize: 13}}>anass@gmail.com</Text>
                            </Box>
                        </Flex>
                    </Col>
                    <Col span={4}>
                        <Tag color={PRIMARY_GREEN}>Online</Tag>
                    </Col>
                    <Col span={4}>
                        <Text>Completed</Text>
                    </Col>
                    <Col span={4}>
                        <Text>150 MAD</Text>
                    </Col>
                    <Col span={4}>
                        <Title level={5} style={{ margin: 0 }}>Apr 22, 2025</Title>
                        <Text style={{ color: GRAY3, fontSize: 13 }}>9:00</Text>
                    </Col>
                </Row>
                <Divider style={{ margin: 0 }}/>
                <Row gutter={16} style={{ padding: '1rem 0.75rem', alignItems: 'center' }}>
                    <Col span={8}>
                        <Flex align="center" gap={20}>
                            <img width={50} src="http://localhost:8000/storage/profile/fake.png" />
                            <Box>
                                <Title level={5} style={{ marginBottom: -1 }}>Anass Boutaib</Title>
                                <Text style={{ color: GRAY3, fontSize: 13 }}>anass@gmail.com</Text>
                            </Box>
                        </Flex>
                    </Col>
                    <Col span={4}>
                        <Tag color={PRIMARY_BLUE}>In-Person</Tag>
                    </Col>
                    <Col span={4}>
                        <Text>Completed</Text>
                    </Col>
                    <Col span={4}>
                        <Text>150 MAD</Text>
                    </Col>
                    <Col span={4}>
                        <Title level={5} style={{ margin: 0 }}>Apr 22, 2025</Title>
                        <Text style={{ color: GRAY3, fontSize: 13 }}>9:00</Text>
                    </Col>
                </Row>
            </Box>
        </>
    )
}

export default AppointmentsHistorySection;