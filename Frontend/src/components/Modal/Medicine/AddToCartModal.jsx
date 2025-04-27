import React, { useEffect, useState } from 'react';
import { Button, Col, Divider, message, Modal, Row, Typography } from 'antd';
import {Button as Btn, Checkbox, FormControlLabel, FormGroup} from '@mui/material' 
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { GRAY0, GREEN, PRIMARY_BLUE, PRIMARY_GREEN } from '../../../config/colors';
import { DarkGreenButton } from '../../Button/FilledButtons';
import { backend_url } from '../../../config/app';
import Cookies from 'js-cookie'
import { grey, red } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addMedicineToCart, deleteMedicineFromCart, updateMedicineQuantity } from '../../../store/actions/cartActions';

const AddToCartModal = ({medicine, open, setOpen}) => {
    const [data, setData] = useState({quantity: 1, price: 0, prescription: false})
    const [loading, setLoading] = useState(false)
    const [backendErrors, setBackendErrors] = useState(null)
    const [cartId, setCartId] = useState(0)
    const cart = useSelector(data => data.cart.cart)
    const {id: param_id} = useParams()
    const dispatch = useDispatch();
    const [messageApi, contextHolder] = message.useMessage();
    
    const info = (message, type = 'success') => {
        messageApi.open({
            type: type,
            content: message,
            duration: 5
        });
    };

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
        requestRemoveCartItem(cartId)
    }

    const handleCheckBox = (event) => {
        setData({
            ...data,
            prescription: event.target.checked
        })
    };

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

    async function requestRemoveCartItem(id) {

        try {
            const response = await fetch(backend_url + '/api/cart/' + id, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('auth_token'),
                },
            });
    
            if (response.status === 422) {
                alert('Unauthorized')
            } else if (response.status === 204) {
                // alert('added');
                dispatch(deleteMedicineFromCart(id))
                setBackendErrors(null);
                info('Deleted from cart');
                setOpen(false)
            } else {
                alert('Error')
            }
        } catch (error) {
        }
    }

    useEffect(() => {
        const targetItem = cart.filter(item => item.medicine_id == param_id);
        targetItem.length > 0 ?
        setCartId(targetItem[0]?.pivot.medicine_id) :
        setCartId(0)
        
    }, [cart, medicine])

    async function sendCartOrder() {
        setLoading(true)

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
                setBackendErrors(responseData.errors);
            } else if (response.status === 201) {
                setBackendErrors(null);
                info('Successfully added to cart');
                dispatch(addMedicineToCart(
                    {
                        id: data.pharmacy,
                        medicine_id: medicine.id,
                        medicine: {medicine_name: medicine.medicine_name},
                        pivot: {medicine_id: data.pharmacy, order_quantity: data.quantity, unit_price: medicine.medicine_price}
                    }
                ))
                setOpen(false)
            } else {
                setBackendErrors(['An unexpected error occurred.']);
            }

        } catch (error) {
            setBackendErrors(['An error occurred while processing your request.']);
        } finally {
            setLoading(false)
        }
    }

    const handleCartItemUpdate = () => {
        dispatch(updateMedicineQuantity(cartId, +data.quantity))
        setOpen(false)
    }

    return (
        <>
            {contextHolder}
            <Modal
                open={open}
                title="Add To Cart"
                onCancel={handleCancel}
                footer={
                    cartId ? [
                        <Btn sx={{ px: 3, mr: 1, py: 1, color: '#FFF', bgcolor: red[400] }} key="remove" onClick={handleCartItemRemove}>
                            Remove
                        </Btn>,
                        <Btn sx={{ px: 3, py: 1, color: GRAY0, bgcolor: grey[200], border: '1px solid ' + grey[300] }} key="update" onClick={handleCartItemUpdate}>
                            Update
                        </Btn>
                    ] :
                    [
                        loading ? (
                            <Button key='loading' loading variant="" style={{ padding: '1.25rem 3rem' }} />
                        ) : (
                            <DarkGreenButton key="add" disabled={data.pharmacy && (medicine.prescription_required && data.prescription || !medicine.prescription_required) && data.quantity > 0 ? false : true} onClick={handleSubmit}>
                                Add
                            </DarkGreenButton>
                        )
                    ]
                }
            >
                <Box py={2}>
                    <Typography.Title level={4} style={{textAlign: 'center', marginBottom: 25, color: PRIMARY_BLUE}}>{medicine.medicine_name}</Typography.Title>
                
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

                    <FormControl fullWidth style={{ marginBottom: 20 }} disabled={cartId ? true : false}>
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
                            <Typography.Text>${(data.price || 0).toFixed(2)}</Typography.Text>
                        </Col>
                    </Row>

                    {
                        medicine.prescription_required ?
                        (
                            <FormGroup style={{ marginTop: 20 }}>
                                <FormControlLabel required control={<Checkbox style={{ color: PRIMARY_GREEN }} checked={data.prescription} onChange={handleCheckBox} disableRipple />} label="Confirm that you have prescription for this medicine" />
                            </FormGroup>
                        ): null
                    }

                    <Divider></Divider>
                    
                    <Box>
                        <Typography.Title level={4} style={{ marginBottom: 5}}>Total Price</Typography.Title>
                        <Typography.Text style={{color: PRIMARY_GREEN, fontSize: 20, fontWeight: 500}}>${(data.price*data.quantity || 0).toFixed(2)}</Typography.Text>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};
export default AddToCartModal;