import { Button, Col, ConfigProvider, Divider, Flex, message, notification, Row, Typography } from "antd";
import Icon from "@ant-design/icons";
import { GRAY2, GRAY4, GREEN, GREEN5 } from "../../../config/colors";
import { Box, FormControl, InputAdornment, InputLabel, MenuItem, Select, Skeleton, TextField } from "@mui/material";
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
import { FaArrowRight, FaBan, FaCaretRight, FaFlag, FaSearch } from "react-icons/fa";
import ConfirmDeliveryModal from "../../../components/Modal/Order/ConfirmDeliveryModal";
import RejectOrderModal from "../../../components/Modal/Order/RejectOrderModal";
import SearchInput from "../../../components/Form/SearchInput";

const { Title, Text } = Typography

const Context = React.createContext({ name: 'Default' });

const PharmacyOrdersHistorySection = () => {

    // States

    const [type, setType] = useState('pending')
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [open, setOpen] = useState(false);
    const [rejectOpen, setRejectOpen] = useState(false);
    const [openOrder, setOpenOrder] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(1);
    const [sorting, setSorting] = useState("recent");
    const [search, setSearch] = useState("");
    const [api, NotificationHolder] = notification.useNotification();


    // Handlers

    const handlePageChange = (page) => {
        getOrders(page)
    }

    const handleSelectChange = (e) => {
        setSorting(e.target.value)
    }

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    // Functions

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
                openNotification('Something Went Wrong!', 'Could not perform this action');
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

            {NotificationHolder}

            <Flex style={{ marginBottom: 40 }} justify="space-between" align="center">
                <div style={{ maxWidth: '420px', width: '100%' }}>
                    <TextField
                        label="Search for Clients"
                        id="outlined-start-adornment"
                        sx={{ m: 1, width: 400, bgcolor: '#FFF' }}
                        placeholder="Type in Something ..."
                        onchange={handleChange}
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
                            <MenuItem value={'recent'}>Recent</MenuItem>
                            <MenuItem value={'alphabitically'}>Alphabitically</MenuItem>
                            <MenuItem value={'availability'}>Availability</MenuItem>
                            <MenuItem value={'price'}>Price</MenuItem>
                        </Select>
                    </FormControl>
                </Flex>
            </Flex>
        </>
    )
}

export default PharmacyOrdersHistorySection;