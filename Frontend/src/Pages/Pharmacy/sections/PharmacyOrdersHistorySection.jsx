import { Button, Col, ConfigProvider, Divider, Flex, message, notification, Row, Typography } from "antd";
import { GRAY2, GRAY4, GREEN, GREEN5, LIGHT_BLUE } from "../../../config/colors";
import { Box, FormControl, InputAdornment, InputLabel, MenuItem, Select, Skeleton, TextField } from "@mui/material";
import { Pagination } from 'antd';
import { useEffect, useState } from "react";
import { backend_url } from "../../../config/app";
import Cookies from 'js-cookie';
import {Typography as TP} from "@mui/material";
import React from 'react';
import { FaArrowRight, FaBan, FaCaretRight, FaFlag, FaSearch } from "react-icons/fa";
import HistoryOrderCard from "../../../components/Card/Order/HistoryOrderCard";
import OrderDrawer from "../../../components/Drawer/Orders/OrderDrawer";

const { Title, Text } = Typography

const Context = React.createContext({ name: 'Default' });

const PharmacyOrdersHistorySection = () => {

    // States

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [open, setOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [itemsPerPage, setItemsPerPage] = useState(1);
    const [sorting, setSorting] = useState("create_date");
    const [search, setSearch] = useState("");
    const [api, NotificationHolder] = notification.useNotification();


    // Handlers

    const handlePageChange = (page) => {
        getOrdersHistory(page)
    }

    const handleSelectChange = (e) => {
        setSorting(e.target.value)
    }

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    // Functions

    const handleCardClick = (id) => {
        setOpen(true)
        setSelectedOrder(orders.filter(item => item.id === id)[0])
    }

    const openNotification = (message, description) => {
        api.info({
            message: message,
            description: <p>{description}</p>,
            placement: 'bottomRight',
            duration: 5,
            showProgress: true,
            pauseOnHover: true,
        });
    };

    const getOrdersHistory = async (page = 1) => {
        setLoading(true);
        
        try {

            const response = await fetch(`${backend_url}/api/orders/history?page=${page}&sort=${sorting}`, {
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('auth_token'),
                }
            });
    
            const responseData = await response.json();
    
            if (response.status === 401) {
                openNotification('Something Went Wrong!', 'Could not perform this action');
            } else if (response.status === 200) {
                setOrders(responseData.orders.data);
                setTotal(responseData.orders.total)
                setItemsPerPage(responseData.orders.per_page)
            } else {
                openNotification('Something Went Wrong!', 'Could not perform this action');

            }
            setLoading(false)
        } catch (error) {
            if (error.name !== 'AbortError') {
                openNotification('Something Went Wrong!', 'Could not load this data');

            }
        }
    }

    useEffect(() => {
        getOrdersHistory()
    }, [sorting])

    // Content

    return (
        <>
            {/* Message */}

            {NotificationHolder}

            <Flex style={{ marginBottom: 40 }} justify="space-between" align="center">
                <div style={{ maxWidth: '420px', width: '100%' }}>
                    <TextField
                        label="Search for Clients"
                        id="outlined-start-adornment"
                        sx={{ m: 1, width: 400, bgcolor: '#FFF' }}
                        placeholder="Type in Something ..."
                        onChange={handleChange}
                        slotProps={{
                            input: {
                            startAdornment: <InputAdornment position="start"><FaSearch /></InputAdornment>,
                            },
                        }}
                    />
                </div>

                <Flex gap={8}>
                    <FormControl sx={{ width: '200px' }} size="small">
                        <InputLabel id="sort-by-select-label">Sort By</InputLabel>
                        <Select
                            variant="outlined"
                            labelId="sort-by-select-label"
                            size="large"
                            id="sort-by-select"
                            label="Sort By"
                            value={sorting}
                            onChange={handleSelectChange}
                            sx={{ bgcolor: '#FFF' }}
                        >
                            <MenuItem value={'create_date'}>Create Date</MenuItem>
                            <MenuItem value={'modify_date'}>Modify Date</MenuItem>
                        </Select>
                    </FormControl>
                </Flex>
            </Flex>

            <Row gutter={[16, 16]}>
                {   
                    loading ?
                    Array(6).fill(0).map((_, index) => {
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
                            orders.map((item, index) => {
                                return (
                                    <Col span={8} key={index}>
                                        <HistoryOrderCard handleClick={handleCardClick} order={item} />
                                    </Col>
                                )
                            }) 
                        ) : 
                        (
                            <Col span={24} style={{ textAlign: 'center', marginTop: 20 }}>
                                <Flex justify="center" style={{ marginBottom: 20 }}>
                                    <FaBan fontSize={40} fill="#444"/>
                                </Flex>
                                
                                <TP style={{ textAlign: 'center', color: GRAY2, paddingTop: 15 }}>
                                    You don't have any received or completed any orders.
                                </TP>
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
                                itemBg: LIGHT_BLUE,
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

            <OrderDrawer order={selectedOrder} open={open} setOpen={setOpen}/>
        </>
    )
}

export default PharmacyOrdersHistorySection;