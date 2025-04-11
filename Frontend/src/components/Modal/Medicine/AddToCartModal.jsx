import React, { useEffect, useState } from 'react';
import { Button, Col, Divider, Modal, Row, Typography } from 'antd';
import {Button as Btn} from '@mui/material' 
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { GRAY0, GREEN } from '../../../config/colors';
import { DarkGreenButton } from '../../Button/FilledButtons';
import { backend_url } from '../../../config/app';
import Cookies from 'js-cookie'
import { grey, red } from '@mui/material/colors';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const AddToCartModal = ({medicine, open, setOpen}) => {
    const [data, setData] = useState({quantity: 1, price: 0})
    const [backendErrors, setBackendErrors] = useState(null)
    const cart = useSelector(data => data.cart.cart)
    const {id: param_id} = useParams()
    // const dispatch = useDispatch();


    const handleCancel = () => {
        setOpen(false);
    };

    useEffect(() => {
        setData({
            ...data,
            price: medicine.medicine_price
        })
    }, [medicine])

    const handleCartItemRemove = () => {
        requestRemoveCartItem()
    }

    const handleChange = (e) => {

        const {name, value} = e.target
        setData({
            ...data,
            [name]: value
        })
    }

    const handleSubmit = () => {
        sendCartOrder()
    }

    async function requestRemoveCartItem() {

        try {
            const response = await fetch(backend_url + '/api/cart/' + param_id, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('auth_token'),
                },
            });
    
            const responseData = await response.json();
    
            if (response.status === 422) {
                alert('error')
                // setBackendErrors(responseData.errors);
            } else if (response.status === 201) {
                console.log(responseData)
                alert('added');
                // setBackendErrors(null);
                // info(responseData.message);
                // setData({})
                // setErrors({})
                // setStep(1)
                // setOpen(false)
            } else {
                // setBackendErrors(['An unexpected error occurred.']);
                alert('dd')
            }

            // setSubmit(false)
        } catch (error) {
            alert('jj')
            // setBackendErrors(['An error occurred while processing your request.']);
            // setSubmit(false)
        }
    }

    async function sendCartOrder() {
        
        const formData = new FormData();

        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });

        try {
            const response = await fetch(backend_url + '/api/orders', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('auth_token'),
                },
                body:formData,
            });
    
            const responseData = await response.json();
    
            if (response.status === 422) {
                // alert('error')
                setBackendErrors(responseData.errors);
            } else if (response.status === 201) {
                console.log(responseData)
                alert('added');
                setBackendErrors(null);
                // info(responseData.message);
                // setData({})
                // setErrors({})
                // setStep(1)
                // setOpen(false)
            } else {
                setBackendErrors(['An unexpected error occurred.']);
                alert('dd')
            }

            // setSubmit(false)
        } catch (error) {
            alert('jj')
            setBackendErrors(['An error occurred while processing your request.']);
            // setSubmit(false)
        }
    }

    return (
        <>
            <Modal
                open={open}
                title="Add To Cart"
                onCancel={handleCancel}
                footer={
                    cart.filter(item => item.medicine_id == param_id) ? [
                        <Btn sx={{ px: 3, mr: 1, py: 1, color: '#FFF', bgcolor: red[400] }} key="remove" onClick={handleCartItemRemove}>
                            Remove
                        </Btn>,
                        <Btn sx={{ px: 3, py: 1, color: GRAY0, bgcolor: grey[200], border: '1px solid ' + grey[300] }} key="remove" onClick={handleSubmit}>
                            Update
                        </Btn>
                    ] :
                    [
                        <DarkGreenButton key="add" onClick={handleSubmit}>
                            Add
                        </DarkGreenButton>
                    ]
                }
            >
                <Box py={2}>
                    <Typography.Title level={4} style={{textAlign: 'center', marginBottom: 25, color: GREEN}}>Testophore 400</Typography.Title>
                
                    {
                        !backendErrors ? (
                            <></>
                        ) : (
                            <Box my={5} color={red[600]} py={2} borderRadius={2} textAlign={"center"} bgcolor={red[50]}>
                                {
                                    Object.values(backendErrors).map((item, index) => {
                                        return (<p style={{ margin: '0.5rem 0', fontFamily: 'roboto' }} key={index}>{item}</p>)
                                    })
                                }
                            </Box>
                        )
                    }

                    <FormControl fullWidth style={{ marginBottom: 20 }}>
                        <InputLabel id="order-pharmacy-label">Pharmacy</InputLabel>
                        <Select
                            labelId="order-pharmacy-label"
                            id="order-pharmacy"
                            value={data.pharmacy || ""}
                            label="Pharmacy"
                            name='pharmacy'
                            onChange={handleChange}
                        >
                            {
                                medicine.pharmacies ? (
                                    medicine.pharmacies.map((item, index) => {
                                        return <MenuItem key={'order-pharmacy-' + index} value={item.pivot.id}>{item.pharmacy_name} - {item.address}</MenuItem>
                                    })
                                ) : null
                            }
                        </Select>
                    </FormControl>

                    <Row gutter={20}>
                        <Col span={12}>
                            <TextField name="quantity" value={data.quantity} onChange={handleChange} label="Quantity" />
                        </Col>
                        <Col span={12}>
                            <Typography.Title level={5} style={{ marginBottom: 5}}>Unit Price</Typography.Title>
                            <Typography.Text>${data.price}</Typography.Text>
                        </Col>
                    </Row>
                    <Divider></Divider>
                    <Box>
                        <Typography.Title level={4} style={{ marginBottom: 5}}>Total Price</Typography.Title>
                        <Typography.Text style={{color: GREEN, fontSize: 20, fontWeight: 500}}>${data.price*data.quantity}</Typography.Text>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};
export default AddToCartModal;