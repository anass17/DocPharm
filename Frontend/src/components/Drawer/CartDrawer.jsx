import React, { useEffect, useState } from 'react';
import { Button, Col, Divider, Drawer, Flex, Row } from 'antd';
import { FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { DarkGreenButton } from '../Button/FilledButtons';
import CartMedicineItem from './CartMedicineItem';
import { useSelector } from 'react-redux';
import { GREEN } from '../../config/colors';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51RD1U4Pt1gEegd9zoFVDZP64y3tg4B4KFxYzAQnNFwpBIW90mgTKVpkvZg6RLBzHb1fMpVoeTgdyLEXukSoJ6nJ0005npVkp7m');

const CartDrawer = ({open, setOpen}) => {
    const [itemTotals, setItemTotals] = useState([]);
    const cart = useSelector(data => data.cart.cart);

    const onClose = () => {
        setOpen(false);
    };

    const handleClick = async () => {

        const formData = new FormData();

        const paymentItems = cart.map((item) => {
            return {
                name: item.medicine.medicine_name,
                unit_price: item.pivot.unit_price,
                quantity: item.pivot.order_quantity
            }
        })

        const res = await fetch('http://localhost:8000/api/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({items: paymentItems})
        });
    
        const data = await res.json();
        const stripe = await stripePromise;
    
        stripe.redirectToCheckout({
          sessionId: data.id,
        });
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
        return (itemTotals.reduce((acc, curr) => acc + (curr || 0), 0)).toFixed(2);
    };

    return (
        <>

        <Drawer title="Cart's Medicines" size={'large'} onClose={onClose} open={open}>
            {/* {
                console.log('ddsa -- ', cart)
            } */}
            {
                cart.length > 0 ?
                (
                    <>
                        <Row gutter={[16, 20]} style={{fontWeight: 500}}>
                            <Col span={10}>Medicine Details</Col>
                            <Col span={6} style={{textAlign: 'center'}}>Quantity</Col>
                            <Col span={4} style={{textAlign: 'center'}}>Unit Price</Col>
                            <Col span={4} style={{textAlign: 'center'}}>Total</Col>
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
                                <Button style={{ display: 'flex', alignItems: 'center', gap: 15, padding: '0.5rem 2rem', textAlign: 'center', height: 50, width: '100%', color: '#FFF', backgroundColor: GREEN, borderColor: GREEN, fontSize: 16, fontWeight: 600 }} onClick={handleClick}>
                                    <svg xmlns="http://www.w3.org/2000/svg" style={{ position: 'relative', top: 1 }} width={40} fill='#FFF' viewBox="0 0 640 512">
                                        {/* <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--> */}
                                        <path d="M165 144.7l-43.3 9.2-.2 142.4c0 26.3 19.8 43.3 46.1 43.3 14.6 0 25.3-2.7 31.2-5.9v-33.8c-5.7 2.3-33.7 10.5-33.7-15.7V221h33.7v-37.8h-33.7zm89.1 51.6l-2.7-13.1H213v153.2h44.3V233.3c10.5-13.8 28.2-11.1 33.9-9.3v-40.8c-6-2.1-26.7-6-37.1 13.1zm92.3-72.3l-44.6 9.5v36.2l44.6-9.5zM44.9 228.3c0-6.9 5.8-9.6 15.1-9.7 13.5 0 30.7 4.1 44.2 11.4v-41.8c-14.7-5.8-29.4-8.1-44.1-8.1-36 0-60 18.8-60 50.2 0 49.2 67.5 41.2 67.5 62.4 0 8.2-7.1 10.9-17 10.9-14.7 0-33.7-6.1-48.6-14.2v40c16.5 7.1 33.2 10.1 48.5 10.1 36.9 0 62.3-15.8 62.3-47.8 0-52.9-67.9-43.4-67.9-63.4zM640 261.6c0-45.5-22-81.4-64.2-81.4s-67.9 35.9-67.9 81.1c0 53.5 30.3 78.2 73.5 78.2 21.2 0 37.1-4.8 49.2-11.5v-33.4c-12.1 6.1-26 9.8-43.6 9.8-17.3 0-32.5-6.1-34.5-26.9h86.9c.2-2.3 .6-11.6 .6-15.9zm-87.9-16.8c0-20 12.3-28.4 23.4-28.4 10.9 0 22.5 8.4 22.5 28.4zm-112.9-64.6c-17.4 0-28.6 8.2-34.8 13.9l-2.3-11H363v204.8l44.4-9.4 .1-50.2c6.4 4.7 15.9 11.2 31.4 11.2 31.8 0 60.8-23.2 60.8-79.6 .1-51.6-29.3-79.7-60.5-79.7zm-10.6 122.5c-10.4 0-16.6-3.8-20.9-8.4l-.3-66c4.6-5.1 11-8.8 21.2-8.8 16.2 0 27.4 18.2 27.4 41.4 .1 23.9-10.9 41.8-27.4 41.8zm-126.7 33.7h44.6V183.2h-44.6z"/>
                                    </svg>

                                    Checkout
                                </Button>
                            </Col>
                            <Col span={2}></Col>
                            <Col span={6} style={{ display: 'flex', gap: 2, textAlign: 'center', justifyContent: 'center' }}>
                                <h3>{cart.length > 1 ? `${cart.length} Items`: '1 Item'}</h3>
                            </Col>
                            <Col span={4}></Col>
                            <Col span={4} style={{textAlign: 'center', fontSize: 18, fontWeight: 500}}>{calculateGrandTotal()} DH</Col>
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