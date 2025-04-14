import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, notification, Row, Typography } from 'antd';
import { Box, TextField } from '@mui/material';
import { GRAY0, GREEN } from '../../../config/colors';
import { DarkGreenButton } from '../../Button/FilledButtons';
import { backend_url } from '../../../config/app';
import Cookies from 'js-cookie'

const ConfirmDeliveryModal = ({handleDelivered, medicineId, open, setOpen}) => {
    const [code, setCode] = useState(null)
    const [codeError, setCodeError] = useState(null)
    const [api, NotificationHolder] = notification.useNotification();
    
    const openNotification = (message, description) => {
        api.success({
            message: message,
            description: <p>{description}</p>,
            placement: 'bottomRight',
            duration: 5,
            showProgress: true,
            pauseOnHover: true,
        });
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        if (!code || code.search(/^[0-9]{6}$/) < 0) {
            setCodeError('Please Enter a valid 6-digit code');
        } else {
            setCodeError(null)
            confirmOrder()
        }
    }

    async function confirmOrder() {
        
        const formData = new FormData();

        formData.append('code', code);
        formData.append('status', 'delivered');

        try {
            const response = await fetch(backend_url + '/api/orders/' + medicineId, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('auth_token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({status: 'delivered', code: code}),
            });
    
            if (response.status === 422) {
                const responseData = await response.json();
                setCodeError(responseData.error);
            } else if (response.status === 200 || response.status === 204) {
                openNotification('Order Delivered', 'You can view the order details in Orders History');
                handleDelivered();
                setOpen(false)
            } else {
                setCodeError('An unexpected error occurred.');
            }

        } catch (error) {
            console.log(error)
            setCodeError('An error occurred while processing your request.');
        }
    }

    return (
        <>
            {NotificationHolder}
            <Modal
                open={open}
                title="Add To Cart"
                onCancel={handleCancel}
                footer={
                    [
                        <DarkGreenButton key="confirm" onClick={handleSubmit}>
                            Confirm
                        </DarkGreenButton>
                    ]
                }
            >
                <Box py={2}>
                    <Typography.Title level={4} style={{textAlign: 'center', marginBottom: 25}}>Confirm Delivery</Typography.Title>
                    <Typography.Text style={{ marginBottom: 30, fontSize: '15px', color: 'rgb(44 44 44)', display: 'block' }}>Please ask the customer for the delivery 6 digit code and enter it below to confirm the delivery of the order</Typography.Text>

                    <Row gutter={20}>
                        <Col span={16}>
                            <TextField name="code" helperText={codeError} error={codeError ? true : false} onChange={(e) => setCode(e.target.value)} label="Code" fullWidth/>
                        </Col>
                    </Row>
                </Box>
            </Modal>
        </>
    );
};
export default ConfirmDeliveryModal;