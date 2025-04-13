import { Button, Col, ConfigProvider, message, Row, Typography } from "antd";
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
import PendingOrderCard from "../../../components/Card/Medicine/PendingOrderCard";
import React from 'react';

const { Title, Text } = Typography

const Context = React.createContext({ name: 'Default' });

const PharmacyOrdersSection = () => {

    // States

    const [type, setType] = useState('pending')
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(1);
    const [messageApi, contextHolder] = message.useMessage();

    // Handlers

    const handlePendingClick = () => {
        setType('pending')
    }

    const handleAcceptClick = () => {
        setType('accepted')
    }

    const handlePageChange = (page) => {
        getOrders(page)
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

            <TP sx={{ mb: 5, textAlign: 'center' }}>Please accept only when the order is on its way to deliver or it is ready to pick up</TP>

            {/* Buttons: Accepted & Pending */}

            <Box mb={5} display={'flex'} justifyContent={'center'} gap={1}>
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
                    <Button size="large" style={{ padding: '1.25rem 2rem', border: (type === 'pending' ? '2px solid ' + GREEN : '2px solid ' + GRAY4 ), borderRadius: 5, color: (type === 'pending' ? GREEN : '' ) }} icon={<Icon style={{ marginRight: 1, position: 'relative', top: 1 }} component={AccessTimeIcon}/>} onClick={handlePendingClick}>Pending</Button>
                    <Button size="large" style={{ padding: '1.25rem 2rem', border: (type === 'accepted' ? '2px solid ' + GREEN : '2px solid ' + GRAY4 ), borderRadius: 5, color: (type === 'accepted' ? GREEN : '' ) }} icon={<Icon style={{ marginRight: 1, position: 'relative', top: 1 }} component={CheckIcon} />} onClick={handleAcceptClick}>Accepted</Button>
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
                        orders.map((item, index) => {
                            return (
                                <Col span={8} key={index}>
                                    <PendingOrderCard order={item} />
                                </Col>
                            )
                        }) : 
                        <Col span={24}>
                            <TP style={{ textAlign: 'center', color: GRAY2, paddingTop: 30 }}>You don't have any orders that belong to this category</TP>
                        </Col>
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
        </>
    )
}

export default PharmacyOrdersSection;