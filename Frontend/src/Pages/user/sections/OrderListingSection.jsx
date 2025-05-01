import { Col, Input, notification, Row, Typography, Select, Button, Divider, Tag, Flex, Spin } from "antd";
import { useEffect, useState } from "react";
import { backend_url } from "../../../config/app";
import Cookies from 'js-cookie';
import AppointmentPicker from "../components/AppointmentPicker";
import { FaBox, FaBoxOpen, FaCheck, FaClock, FaDotCircle, FaEllipsisH, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaRegCalendar, FaSearch } from "react-icons/fa";
import { Box, InputLabel, MenuItem, Typography as TP } from "@mui/material";
import { DarkGreenButton } from "../../../components/Button/FilledButtons";
import { GRAY2, GRAY3, PRIMARY_BLUE, PRIMARY_GREEN } from "../../../config/colors";
import { LoadingOutlined } from "@ant-design/icons";
import dayjs from 'dayjs'
import AppointmentDrawer from "../../../components/Drawer/Appointment/AppointmentDrawer";
import { Link } from "react-router-dom";
import UserAppointmentDrawer from "../../../components/Drawer/Appointment/UserAppointmentDrawer";
import { red } from "@mui/material/colors";

const { Title, Text } = Typography

const OrderListingSection = () => {

    const [orders, setOrders] = useState([]);
    const [api, NotificationHolder] = notification.useNotification();
    const [selected, setSelected] = useState(0)
    const [loading, setLoading] = useState(true)
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

    let grandTotal = 0;

    // Event Handler

    // Fetch API

    const getOrders = async () => {
            
        setLoading(true)

        try {

            const response = await fetch(`${backend_url}/api/client/orders`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('auth_token'),
                },
            });
    
            if (response.status === 401) {
                openNotification('Access Denied', 'You are not authorized to perform this action')
            } else if (response.status === 200) {
                let responseData = await response.json()

                setOrders(responseData.result)

            } else {
                openNotification('Something went wrong!', 'Could not load your orders')
            }
        } catch (error) {
            console.log(error)
            openNotification('Something went wrong!', 'Could not load your orders')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getOrders()
    }, []);
    

    return (
        <>
            {NotificationHolder}

            {
                loading ? (
                    <Flex justify="center" style={{ padding: '2rem 0' }}>
                        <Spin indicator={<LoadingOutlined spin />} size="large" />
                    </Flex>
                ) : (
                    orders.length === 0 ? (
                        <Box style={{ padding: '2rem 0', textAlign: 'center' }}>
                            <TP>You have not placed any orders</TP>
                        </Box>
                    ) : 
                    <Row gutter={[16, 16]}>
                        <Col xs={24} xl={10}>
                            <Row gutter={[10, 10]}>
                                {
                                    orders.map((item, index) => {
                                        return (
                                            <Col span={24} key={'order-' + index}>
                                                <Box style={{ backgroundColor: '#FFF', borderRadius: 5, padding: 16 }} className={`shadow border-2 cursor-pointer ${selected == index ? "border-green-500" : "border-gray-100"}`} onClick={() => setSelected(index)}>
                                                    <Row gutter={[12, 20]}>
                                                        <Col span={16}>
                                                            <Title level={5}>{item?.medicines[0]?.pharmacy.pharmacy_name}</Title>
                                                        </Col>
                                                        <Col span={8}>
                                                            <TP fontSize={14} align="right">#{item?.id}</TP>
                                                        </Col>
                                                        <Col span={16}>
                                                            <Flex align="center" gap={5}>
                                                                <FaRegCalendar />
                                                                <TP fontSize={14}>{dayjs(item?.confirmed_at).format("MMMM DD, YYYY")}</TP>
                                                            </Flex>
                                                        </Col>
                                                        <Col span={8}>
                                                            <Flex align="center" gap={5} justify="right">
                                                                {
                                                                    item?.status == 'delivered' ? (
                                                                        <>
                                                                            <FaBoxOpen />
                                                                            <TP fontSize={14}>Delivered</TP>
                                                                        </>
                                                                    ) : (
                                                                        item?.status == 'accepted' ? (
                                                                            <>
                                                                                <FaCheck />
                                                                                <TP fontSize={14}>Accepted</TP>
                                                                            </>
                                                                        ) : (
                                                                            item?.status == 'ready' ? (
                                                                                <>
                                                                                    <FaBox />
                                                                                    <TP fontSize={14}>Ready</TP>
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    <FaClock />
                                                                                    <TP fontSize={14}>Awaiting</TP>
                                                                                </>
                                                                            )
                                                                        )
                                                                    )
                                                                }
                                                                
                                                            </Flex>
                                                        </Col>
                                                    </Row>
                                                </Box>
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </Col>
                        <Col xs={24} xl={14}>
                            <Box style={{ backgroundColor: '#FFF', borderRadius: 5, padding: 20 }} className="shadow border border-gray-100">
                                <Flex align="center" justify="space-between" style={{ marginBottom: 20 }}>
                                    <Title level={4} style={{color: PRIMARY_BLUE }}>{orders[selected]?.medicines[0]?.pharmacy.pharmacy_name}</Title>
                                    <TP fontSize={14}>#{orders[selected]?.id}</TP>
                                </Flex>
                                <Box>
                                    <TP fontSize={20} color={GRAY3} style={{ marginBottom: 10 }}>Order's Details</TP>
                                    <Row gutter={[14, 14]}>
                                        <Col span={12}>
                                            <Title level={5} style={{ marginBottom: 2 }}>Placed At</Title>
                                            <TP>{dayjs(orders[selected]?.confirmed_at).format('MMMM DD, YYYY')}</TP>
                                        </Col>
                                        <Col span={12}>
                                            <Title level={5} style={{ marginBottom: 2 }}>Delivered At</Title>
                                            <TP>{orders[selected]?.delivered_at ? dayjs(orders[selected]?.confirmed_at).format('MMMM DD, YYYY') : 'N/A'}</TP>
                                        </Col>
                                        <Col span={12}>
                                            <Title level={5} style={{ marginBottom: 2 }}>Order Status</Title>
                                            <TP className="capitalize">{orders[selected]?.status}</TP>
                                        </Col>
                                        {
                                            orders[selected]?.delivery_code ? (
                                                <Col span={12}>
                                                    <Title level={5} style={{ marginBottom: 2 }}>Delivery Code</Title>
                                                    <TP className="capitalize">{orders[selected].delivery_code}</TP>
                                                </Col>
                                            ) : null
                                        }
                                    </Row>
                                </Box>
                                <Divider />
                                <Box>
                                    <TP fontSize={20} color={GRAY3} style={{ marginBottom: 10 }}>Order's Medicines</TP>
                                    {
                                        orders[selected]?.medicines?.map(item => {
                                            grandTotal += item.pivot.order_quantity * item.pivot.unit_price
                    
                                            return (
                                                <Row gutter={[10, 20]} style={{ marginBottom: 10 }}>
                                                    <Col span={12}>
                                                        <Link to={'/medicines/' + item.medicine.id} style={{ color: PRIMARY_BLUE, fontWeight: 500 }}>
                                                            {item.medicine.medicine_name}
                                                        </Link>
                                                    </Col>
                                                    <Col span={4}>
                                                        x {item.pivot.order_quantity}
                                                    </Col>
                                                    <Col span={4}>
                                                        {item.pivot.unit_price.toFixed(2)} DH
                                                    </Col>
                                                    <Col span={4} style={{ textAlign: 'right' }}>
                                                        {(item.pivot.order_quantity * item.pivot.unit_price).toFixed(2)} DH
                                                    </Col>
                                                </Row>
                                            )
                                        })
                                    }
                    
                                    <Row gutter={[10, 20]} style={{ marginBottom: 10, marginTop: 20, fontWeight: 500 }}>
                                        <Col span={12} style={{ fontSize: 18 }}>
                                            Total
                                        </Col>
                                        <Col span={4}>
                                            
                                        </Col>
                                        <Col span={4}>
                                            
                                        </Col>
                                        <Col span={4} style={{ fontSize: 18, textAlign: 'right' }}>
                                            {grandTotal.toFixed(2)} DH
                                        </Col>
                                    </Row>
                                </Box>
                                
                                <Divider />

                                <Box>
                                    <TP fontSize={20} color={GRAY3} style={{ marginBottom: 10 }}>Contact Information</TP>
                                    <Box>
                                        <Flex gap={15} style={{ marginBottom: 4 }}>
                                            <FaPhoneAlt style={{ position: 'relative', top: 4 }} fill={PRIMARY_GREEN} />
                                            <TP>{orders[selected]?.medicines[0]?.pharmacy.phone_number}</TP>
                                        </Flex>
                                    </Box>
                                    <Box>
                                        <Flex gap={15} style={{ marginBottom: 4 }}>
                                            <FaEnvelope style={{ position: 'relative', top: 4 }} fill={PRIMARY_GREEN} />
                                            <TP>{orders[selected]?.medicines[0]?.pharmacy.email}</TP>
                                        </Flex>
                                    </Box>
                                    <Box>
                                        <Flex gap={15} style={{ marginBottom: 4 }}>
                                            <FaMapMarkerAlt style={{ position: 'relative', top: 4 }} fill={PRIMARY_GREEN} />
                                            <TP>{orders[selected]?.medicines[0]?.pharmacy.address}</TP>
                                        </Flex>
                                    </Box>
                                </Box>
                                    
                            </Box>
                        </Col>
                    </Row>
                )
            }
        </>
    )
}

export default OrderListingSection;