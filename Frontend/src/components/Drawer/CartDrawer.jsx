import React, { useEffect, useState } from 'react';
import { Button, Col, Divider, Drawer, Flex, Row } from 'antd';
import { FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { DarkGreenButton } from '../Button/FilledButtons';
import CartMedicineItem from './CartMedicineItem';
import { useSelector } from 'react-redux';

const CartDrawer = ({open, setOpen}) => {
    const [deliveryFee, setDeliveryFee] = useState(0)
    const [itemTotals, setItemTotals] = useState([]);
    const cart = useSelector(data => data.cart.cart);

    const onClose = () => {
        setOpen(false);
    };

    // useEffect(() => {
    //     console.log(cart)
    // })

    const updateItemTotal = (index, totalPrice) => {
        setItemTotals((prev) => {
            const updatedTotals = [...prev];
            updatedTotals[index] = totalPrice;
            return updatedTotals;
        });
    };

    const calculateGrandTotal = () => {
        return itemTotals.reduce((acc, curr) => acc + (curr || 0), 0) + deliveryFee;
    };

    const handleDeliveryChange = (e) => {
        e.target.value == 'delivery' ? setDeliveryFee(10) : setDeliveryFee(0)
    }

    return (
        <>

        <Drawer title="Cart's Medicines" size={'large'} onClose={onClose} open={open}>
            {
                console.log('ddsa -- ', cart)
            }
            {
                cart.length > 0 ?
                (
                    <>
                        <Row gutter={[16, 20]} style={{fontWeight: 500}}>
                            <Col span={12}>Medicine Details</Col>
                            <Col span={6} style={{textAlign: 'center'}}>Quantity</Col>
                            <Col span={3} style={{textAlign: 'center'}}>Unit Price</Col>
                            <Col span={3} style={{textAlign: 'center'}}>Total</Col>
                        </Row>
                        <Divider />
                        {
                            cart.map((item, index) => {
                                return <CartMedicineItem index={index} key={index} medicine={item} updateItemTotal={updateItemTotal} />
                            }) 
                        }
                        <Divider />
                        <Row style={{alignItems: 'center', marginBottom: 20}}>
                            <Col span={8}>
                                <FormControl fullWidth>
                                    <InputLabel id="delivery-label">Method</InputLabel>
                                    <Select
                                        labelId="delivery-label"
                                        id="delivery"
                                        label="Method"
                                        onChange={handleDeliveryChange}
                                    >
                                        <MenuItem value='pick-up'>Pick Up</MenuItem>
                                        <MenuItem value='delivery'>Delivery</MenuItem>
                                    </Select>
                                </FormControl>
                            </Col>
                            <Col span={13}>
                            </Col>
                            <Col span={3} style={{textAlign: 'center', fontSize: 18, fontWeight: 500}}>+{deliveryFee} DH</Col>
                        </Row>
                        <Divider />
                        <Row style={{alignItems: 'center', marginBottom: 20}}>
                            <Col span={12}>
                                <DarkGreenButton>Checkout</DarkGreenButton>
                            </Col>
                            <Col span={6} style={{ display: 'flex', gap: 2, textAlign: 'center', justifyContent: 'center' }}>
                                <h3>3 Items</h3>
                            </Col>
                            <Col span={3}></Col>
                            <Col span={3} style={{textAlign: 'center', fontSize: 18, fontWeight: 500}}>{calculateGrandTotal()} DH</Col>
                        </Row>
                    </>
                    
                )
                :
                <Typography sx={{ textAlign: 'center', py: 5 }}>You have no items in your cart</Typography>
            }
        </Drawer>
        </>
    );
};

export default CartDrawer;