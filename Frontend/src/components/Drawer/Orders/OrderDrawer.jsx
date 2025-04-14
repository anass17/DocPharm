import React, { useEffect, useState } from 'react';
import { Button, Col, Divider, Drawer, Flex, Row, Typography } from 'antd';
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { GREEN, PRIMARY_BLUE, PRIMARY_GREEN } from '../../../config/colors';
import { loadStripe } from '@stripe/stripe-js';
import { Link } from 'react-router-dom';

const OrderDrawer = ({open, setOpen}) => {

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>

        <Drawer title={"Order Details:"} size={'large'} onClose={onClose} open={open}>
            <Typography.Title level={4} style={{ color: PRIMARY_GREEN }}>Order Details</Typography.Title>
            <Row gutter={[16, 20]}>
                <Col span={12}>
                    <Box>
                        <Typography.Title level={5}>Order Number</Typography.Title>
                        <Typography.Text>123</Typography.Text>
                    </Box>
                </Col>
                <Col span={12}>
                    <Box>
                        <Typography.Title level={5}>Order Status</Typography.Title>
                        <Typography.Text>Delivered</Typography.Text>
                    </Box>
                </Col>
                <Col span={12}>
                    <Box>
                        <Typography.Title level={5}>Order Placed At</Typography.Title>
                        <Typography.Text>24 Jan 2024</Typography.Text>
                    </Box>
                </Col>
                <Col span={12}>
                    <Box>
                        <Typography.Title level={5}>Order Delivered At</Typography.Title>
                        <Typography.Text>30 Jan 2024</Typography.Text>
                    </Box>
                </Col>
                <Col span={12}>
                    <Box>
                        <Typography.Title level={5}>Order Delivery method</Typography.Title>
                        <Typography.Text>Delivery</Typography.Text>
                    </Box>
                </Col>
                <Col span={12}>
                    <Box>
                        <Typography.Title level={5}>Rejection Reason</Typography.Title>
                        <Typography.Text>medicine is out of stock</Typography.Text>
                    </Box>
                </Col>
                <Col span={12}>
                    <Box>
                        <Typography.Title level={5}>Rejection Note</Typography.Title>
                        <Typography.Text>We are in a holiday for the moment</Typography.Text>
                    </Box>
                </Col>
            </Row>
            
            <Divider />

            <Typography.Title level={4} style={{ color: PRIMARY_GREEN }}>Customer Details</Typography.Title>
            <Row gutter={[16, 20]}>
                <Col span={12}>
                    <Box>
                        <Typography.Title level={5}>Customer Name</Typography.Title>
                        <Typography.Text>Anass Boutaib</Typography.Text>
                    </Box>
                </Col>
                <Col span={12}>
                    <Box>
                        <Typography.Title level={5}>Customer Email</Typography.Title>
                        <Typography.Text>anass.bt@gmail.com</Typography.Text>
                    </Box>
                </Col>
            </Row>

            <Divider />

            <Typography.Title level={4} style={{ color: PRIMARY_GREEN }}>Medicines</Typography.Title>
            <Row gutter={[10, 20]} style={{ marginBottom: 10, fontWeight: 500 }}>
                <Col span={12}>
                    Medicine Name
                </Col>
                <Col span={4}>
                    Qty
                </Col>
                <Col span={4}>
                    Unit Price
                </Col>
                <Col span={4}>
                    Total Price
                </Col>
            </Row>

            <Row gutter={[10, 20]} style={{ marginBottom: 10 }}>
                <Col span={12}>
                    <Link to={'/medicine'} style={{ color: PRIMARY_BLUE, fontWeight: 500 }}>
                        Green Lane
                    </Link>
                </Col>
                <Col span={4}>
                    5
                </Col>
                <Col span={4}>
                    12.5 DH
                </Col>
                <Col span={4}>
                    60 DH
                </Col>
            </Row>

            <Row gutter={[10, 20]} style={{ marginBottom: 10 }}>
                <Col span={12}>
                    <Link to={'/medicine'} style={{ color: PRIMARY_BLUE, fontWeight: 500 }}>
                        Green Lane
                    </Link>
                </Col>
                <Col span={4}>
                    5
                </Col>
                <Col span={4}>
                    12.5 DH
                </Col>
                <Col span={4}>
                    60 DH
                </Col>
            </Row>
            <Row gutter={[10, 20]} style={{ marginBottom: 10 }}>
                <Col span={12} style={{ fontWeight: 500 }}>
                    Delivery Fee
                </Col>
                <Col span={4}>
                    
                </Col>
                <Col span={4}>
                    
                </Col>
                <Col span={4}>
                    10 DH
                </Col>
            </Row>
            <Row gutter={[10, 20]} style={{ marginBottom: 10, marginTop: 20, fontWeight: 500 }}>
                <Col span={12} style={{ fontSize: 18 }}>
                    Total
                </Col>
                <Col span={4}>
                    
                </Col>
                <Col span={4}>
                    
                </Col>
                <Col span={4} style={{ fontSize: 18 }}>
                    70 DH
                </Col>
            </Row>
        </Drawer>
        </>
    );
};

export default OrderDrawer;