import React, { useEffect, useState } from 'react';
import { Button, Col, Divider, Drawer, Flex, Row, Typography } from 'antd';
import { Box, FormControl, InputLabel, MenuItem, Select, Skeleton, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { GREEN, PRIMARY_BLUE, PRIMARY_GREEN } from '../../../config/colors';
import { loadStripe } from '@stripe/stripe-js';
import { Link } from 'react-router-dom';
import { red } from '@mui/material/colors';
import { FaEnvelope, FaMailBulk, FaMailchimp, FaUser } from 'react-icons/fa';

const OrderDrawer = ({order, open, setOpen}) => {

    const onClose = () => {
        setOpen(false);
    };

    let grandTotal = 0

    if (!order) {
        return
    }

    return (
        <>

            <Drawer title={"Order Details:"} size={'large'} onClose={onClose} open={open}>
                <Typography.Title level={4} style={{ color: PRIMARY_GREEN }}>Order Details</Typography.Title>
                <Row gutter={[16, 20]}>
                    <Col span={12}>
                        <Box>
                            <Typography.Title level={5}>Order Number</Typography.Title>
                            <Typography.Text>#{order.id}</Typography.Text>
                        </Box>
                    </Col>
                    <Col span={12}>
                        <Box>
                            <Typography.Title level={5}>Order Status</Typography.Title>
                            <Typography.Text>
                                {
                                    order.status == 'delivered' ? 
                                    <p style={{ margin: 0, color: GREEN, fontWeight: 500 }}>Delivered</p> : 
                                    <p style={{ margin: 0, color: red[500], fontWeight: 500 }}>Rejected</p>
                                }
                            </Typography.Text>
                        </Box>
                    </Col>
                    <Col span={12}>
                        <Box>
                            <Typography.Title level={5}>Order Placed At</Typography.Title>
                            <Typography.Text>{order.confirmed_at}</Typography.Text>
                        </Box>
                    </Col>
                    <Col span={12}>
                        <Box>
                            <Typography.Title level={5}>Order Delivery method</Typography.Title>
                            <Typography.Text style={{ textTransform: 'capitalize' }}>{order.delivery_method}</Typography.Text>
                        </Box>
                    </Col>
                    {
                        order.status == 'rejected' ? (
                            <>
                                <Col span={12}>
                                    <Box>
                                        <Typography.Title level={5}>Rejection Reason</Typography.Title>
                                        <Typography.Text>{order.rejection_reason}</Typography.Text>
                                    </Box>
                                </Col>
                                <Col span={12}>
                                    <Box>
                                        <Typography.Title level={5}>Rejection Note</Typography.Title>
                                        <Typography.Text>{order.rejection_note}</Typography.Text>
                                    </Box>
                                </Col>
                            </>
                        ) : (
                            <Col span={12}>
                                <Box>
                                    <Typography.Title level={5}>Order Delivered At</Typography.Title>
                                    <Typography.Text>{order.delivered_at}</Typography.Text>
                                </Box>
                            </Col>
                        )
                    }
                    
                </Row>
                
                <Divider />

                <Typography.Title level={4} style={{ color: PRIMARY_GREEN }}>Customer Details</Typography.Title>
                <Row gutter={[16, 20]}>
                    <Col span={12}>
                        <Box>
                            <Typography.Title level={5}>Customer Name</Typography.Title>
                            <Flex gap={7} align='center'>
                                <FaUser />
                                <Typography.Text>{order.client.first_name} {order.client.last_name}</Typography.Text>
                            </Flex>
                        </Box>
                    </Col>
                    <Col span={12}>
                        <Box>
                            <Typography.Title level={5}>Customer Email</Typography.Title>
                            <Flex gap={7} align='center'>
                                <FaEnvelope />
                                <Typography.Text>{order.client.email}</Typography.Text>
                            </Flex>
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
                    <Col span={4} style={{ textAlign: 'right' }}>
                        Total Price
                    </Col>
                </Row>

                {
                    order.medicines.map(item => {
                        grandTotal += item.pivot.order_quantity * item.pivot.unit_price

                        return (
                            <Row gutter={[10, 20]} style={{ marginBottom: 10 }}>
                                <Col span={12}>
                                    <Link to={'/medicines/' + item.medicine.id} style={{ color: PRIMARY_BLUE, fontWeight: 500 }}>
                                        {item.medicine.medicine_name}
                                    </Link>
                                </Col>
                                <Col span={4}>
                                    {item.pivot.order_quantity}
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

                <Row gutter={[10, 20]} style={{ marginBottom: 10 }}>
                    <Col span={12} style={{ fontWeight: 500 }}>
                        Delivery Fee
                    </Col>
                    <Col span={4}>
                        
                    </Col>
                    <Col span={4}>
                        
                    </Col>
                    <Col span={4} style={{ textAlign: 'right' }}>
                        {order.delivery_method == 'delivery' ? '10.00' : '0.00'} DH
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
                    <Col span={4} style={{ fontSize: 18, textAlign: 'right' }}>
                        {(grandTotal + (order.delivery_method == 'delivery' ? 10 : 0)).toFixed(2)} DH
                    </Col>
                </Row>
            </Drawer>
        </>
    );
};

export default OrderDrawer;