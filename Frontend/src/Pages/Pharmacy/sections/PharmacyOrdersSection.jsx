import { Button, Col, ConfigProvider, Divider, message, Row, Typography } from "antd";
import Icon from "@ant-design/icons";
import { GRAY2, GRAY4, GREEN, GREEN5 } from "../../../config/colors";
import { Box, Skeleton } from "@mui/material";
import { Pagination } from 'antd';
import { useEffect, useState } from "react";
import { backend_url } from "../../../config/app";
import Cookies from 'js-cookie';
import {Typography as TP} from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckIcon from '@mui/icons-material/Check';
import PendingOrderCard from "../../../components/Card/Order/PendingOrderCard";
import AcceptedOrderCard from "../../../components/Card/Order/AcceptedOrderCard";
import ReadyOrderCard from "../../../components/Card/Order/ReadyOrderCard";
import React from 'react';
import { FaArrowRight, FaBan, FaCaretRight, FaFlag } from "react-icons/fa";
import ConfirmDeliveryModal from "../../../components/Modal/Order/ConfirmDeliveryModal";
import RejectOrderModal from "../../../components/Modal/Order/RejectOrderModal";

const { Title, Text } = Typography

const Context = React.createContext({ name: 'Default' });

const PharmacyOrdersSection = () => {

    // States

    const [type, setType] = useState('pending')
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [open, setOpen] = useState(false);
    const [rejectOpen, setRejectOpen] = useState(false);
    const [openOrder, setOpenOrder] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(1);
    const [messageApi, contextHolder] = message.useMessage();

    // Handlers

    const handlePageChange = (page) => {
        getOrders(page)
    }

    const handleConfirmClick = (id) => {
        setOpen(true);
        setOpenOrder(id)
    }

    const handleRejectClick = (id) => {
        setRejectOpen(true);
        setOpenOrder(id)
    }

    const handleDelivered = () => {
        setOrders(orders.filter(item => item.id != openOrder))
    }

    const handleRejected = () => {
        setOrders(orders.filter(item => item.id != openOrder))
    }

    // Functions

    const info = (message) => {
        messageApi.open({
            type: 'error',
            content: message,
            duration: 5
        });
    };

    const getOrders = async (page = 1) => {
        setLoading(true);
        
        try {

            const response = await fetch(`${backend_url}/api/orders?type=${type}&page=${page}`, {
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('auth_token'),
                }
            });
    
            const responseData = await response.json();
    
            if (response.status === 401) {
                info('You are not authorized to view this data');
            } else if (response.status === 200) {
                setOrders(responseData.orders.data);
                setTotal(responseData.orders.total)
                setItemsPerPage(responseData.orders.per_page)
            } else {
                info('Something went wrong! Could not load this data');
            }
            setLoading(false)
        } catch (error) {
            if (error.name !== 'AbortError') {
                info('Something went wrong! Could not load this data');
            }
        }
    }

    useEffect(() => {
        getOrders()
    }, [type])

    // Content

    return (
        <>
            {/* Message */}

            {contextHolder}

            <TP sx={{ mb: 5, textAlign: 'center' }}>Here you can manage all your incoming orders and closely track their progress through each stage.</TP>

            {/* Buttons: Accepted & Pending */}

            <Box mb={5} display={'flex'} justifyContent={'center'} alignItems={'center'} gap={1}>
                <ConfigProvider
                    theme={{
                        components: {
                            Button: {
                                defaultHoverColor: GREEN,
                                defaultActiveColor: GREEN
                            },
                        },
                    }}
                >
                    <Button size="large" style={{ width: 160, padding: '1.25rem 2rem', border: (type === 'pending' ? '2px solid ' + GREEN : '2px solid ' + GRAY4 ), borderRadius: 5, color: (type === 'pending' ? GREEN : '' ) }} icon={<Icon style={{ marginRight: 1, position: 'relative', top: 1 }} component={AccessTimeIcon}/>} onClick={() => setType('pending')}>Pending</Button>
                    <Box>
                        <FaCaretRight size={18} />
                    </Box>
                    <Button size="large" style={{ width: 160, padding: '1.25rem 2rem', border: (type === 'accepted' ? '2px solid ' + GREEN : '2px solid ' + GRAY4 ), borderRadius: 5, color: (type === 'accepted' ? GREEN : '' ) }} icon={<Icon style={{ marginRight: 1, position: 'relative', top: 1 }} component={CheckIcon} />} onClick={() => setType('accepted')}>Accepted</Button>
                    <Box>
                        <FaCaretRight size={18} />
                    </Box>
                    <Button size="large" style={{ width: 160, padding: '1.25rem 2rem', border: (type === 'ready' ? '2px solid ' + GREEN : '2px solid ' + GRAY4 ), borderRadius: 5, color: (type === 'ready' ? GREEN : '' ) }} icon={<Icon style={{ marginRight: 1.5 }} component={FaFlag} />} onClick={() => setType('ready')}>Ready</Button>
                </ConfigProvider>
            </Box>

            <Row gutter={[16, 16]}>
                {   
                    loading ?
                    Array(6).fill(0).map((item, index) => {
                        return (
                            <Col span={8} key={index}>
                                <Box sx={{ backgroundColor: '#FFF', boxShadow: '0px 1px 2px rgba(0, 0, 0, .15)', height: 280, p: 3, borderRadius: 2, display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                                    <Skeleton animation="wave" variant="text" />
                                    <Box>
                                        <Skeleton animation="wave" variant="text" />
                                        <Skeleton animation="wave" variant="text" />
                                    </Box>
                                    <Skeleton animation="wave" variant="text" />
                                    <Box display={'flex'} justifyContent={'space-between'}>
                                        <Skeleton animation="wave" width={100} variant="text" />
                                        <Skeleton animation="wave" width={100} height={30} variant="rounded" />
                                    </Box>
                                </Box>
                            </Col>
                        )
                    }) 
                    :
                    (
                        orders.length > 0 ?
                        (
                            type == 'pending' ? (
                                orders.map((item, index) => {
                                    return (
                                        <Col span={8} key={index}>
                                            <PendingOrderCard handleRejectClick={handleRejectClick} order={item} />
                                        </Col>
                                    )
                                }) 
                            ) : (
                                type == 'accepted' ? (
                                    orders.map((item, index) => {
                                        return (
                                            <Col span={8} key={index}>
                                                <AcceptedOrderCard order={item} />
                                            </Col>
                                        )
                                    }) 
                                ) : (
                                    orders.map((item, index) => {
                                        return (
                                            <Col span={8} key={index}>
                                                <ReadyOrderCard handleClick={handleConfirmClick} order={item} />
                                            </Col>
                                        )
                                    }) 

                                )
                            )
                        ) : 
                        (
                            <Col span={24} style={{ textAlign: 'center', marginTop: 20 }}>
                                <FaBan fontSize={40} fill="#444"/>
                                {
                                    type === 'pending' ? (
                                        <TP style={{ textAlign: 'center', color: GRAY2, paddingTop: 15 }}>
                                            You don't have any pending orders. We will list them here when you receive any.
                                        </TP>
                                    ) : (
                                        type === 'accepted' ? (
                                            <TP style={{ textAlign: 'center', color: GRAY2, paddingTop: 15 }}>
                                                You don't have any accepted orders. Accept pending orders to appear here.
                                            </TP>
                                        ) : (
                                            <TP style={{ textAlign: 'center', color: GRAY2, paddingTop: 15 }}>
                                                You don't have any ready orders. Set pending orders as ready to appear here.
                                            </TP>
                                        )
                                    )
                                }
                            </Col>
                        )
                        
                    )
                    
                }
            </Row>

            <Box mt={5}>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: GREEN
                        },
                        components: {
                            Pagination: {
                                itemBg: GREEN5,
                            },
                        },
                    }}
                >
                    <Pagination align="center" 
                    onChange={handlePageChange} 
                    hideOnSinglePage={true}
                    defaultCurrent={1}
                    pageSize={itemsPerPage} 
                    total={total} 
                    showSizeChanger={false} />
                </ConfigProvider>
            </Box>

            <ConfirmDeliveryModal handleDelivered={handleDelivered} medicineId={openOrder} open={open} setOpen={setOpen} />
            <RejectOrderModal handleRejected={handleRejected} orderId={openOrder} open={rejectOpen} setOpen={setRejectOpen} />
        </>
    )
}

export default PharmacyOrdersSection;