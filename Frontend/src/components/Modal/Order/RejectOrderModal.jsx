import React, { useEffect, useState } from 'react';
import { Button, Col, ConfigProvider, Modal, notification, Row, Typography } from 'antd';
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { GRAY0, GREEN } from '../../../config/colors';
import { DarkGreenButton } from '../../Button/FilledButtons';
import { backend_url } from '../../../config/app';
import Cookies from 'js-cookie'
import { red } from '@mui/material/colors';
import TextArea from 'antd/es/input/TextArea';

const RejectOrderModal = ({handleRejected, orderId, open, setOpen}) => {
    const [reason, setReason] = useState('')
    const [reasonError, setReasonError] = useState(null)
    const [note, setNote] = useState('')
    const [noteError, setNoteError] = useState(null)
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
        setReason('');
        setNote('');
        setReasonError(null)
        setNoteError(null)
    };

    const handleSubmit = () => {
        let hasError = false

        if (reason === '') {
            setReasonError('Please select a reason');
            hasError = true
        } else {
            setReasonError(null);
        }
        if (note === '') {
            setNoteError('Please enter a detailled note');
            hasError = true
        } else {
            setNoteError(null);
        }

        if (hasError == false) {
            rejectOrder()
        }
    }

    async function rejectOrder() {

        const data = {
            reason,
            note,
            status: 'rejected'
        }

        try {
            const response = await fetch(backend_url + '/api/orders/' + orderId, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('auth_token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });
    
            if (response.status === 422) {
                const responseData = await response.json();
                setReasonError(responseData.error);
            } else if (response.status === 200 || response.status === 204) {
                openNotification('Order Rejected', 'We have notified the customer, you can view the order in Orders History');
                handleRejected();
                setReason('')
                setNote('')
                setOpen(false)
            } else {
                setReasonError('An unexpected error occurred.');
            }

        } catch (error) {
            console.log(error)
            setReasonError('An error occurred while processing your request.');
        }
    }

    return (
        <>
            {NotificationHolder}
            <Modal
                open={open}
                title={"Reject Order #" + orderId}
                onCancel={handleCancel}
                footer={
                    [
                        <Button style={{ backgroundColor: red[500], color: '#FFF', padding: '1.25rem 2rem', border: 'none' }} key="confirm" onClick={handleSubmit}>
                            Reject
                        </Button>
                    ]
                }
            >
                <Box py={2} sx={{ mb: 3 }}>
                    <Typography.Text style={{ marginBottom: 30, fontSize: '15px', color: 'rgb(44 44 44)', display: 'block' }}>Please enter an accurate rejection reason with a detailled note, these will be sent to the customer.</Typography.Text>

                    <Row gutter={[12, 12]}>
                        <Col span={24}>
                            <FormControl 
                                fullWidth
                                error={reasonError ? true : false} 
                            >
                                <InputLabel id="reason-label">Reason</InputLabel>
                                <Select
                                    labelId="reason-label"
                                    id="reason"
                                    value={reason}
                                    label="Reason"
                                    name="reason"
                                    onChange={(e) => setReason(e.target.value)}
                                >
                                    <MenuItem value={'distance_too_far'}>Distance Too Far</MenuItem>
                                    <MenuItem value={'medicine_is_out_of_stock'}>medicine is out of stock</MenuItem>
                                    <MenuItem value={'other'}>Other</MenuItem>
                                </Select>
                                <Typography.Text style={{ color: red[500] }}>{reasonError}</Typography.Text>
                            </FormControl>
                        </Col>
                        <Col span={24}>
                            <ConfigProvider
                                theme={{
                                    components: {
                                        Input: {
                                            hoverBorderColor: '#555'
                                        },
                                    },
                                }}
                            >
                                <TextArea
                                    showCount
                                    maxLength={250}
                                    onChange={(e) => setNote(e.target.value)}
                                    value={note}
                                    error={noteError ? 'true' : 'false'} 
                                    placeholder="Add Note ..."
                                    style={{ height: 120, resize: 'none', borderColor: '#CCC' }}
                                />
                                <Typography.Text style={{ color: red[500] }}>{noteError}</Typography.Text>
                            </ConfigProvider>
                        </Col>
                    </Row>
                </Box>
            </Modal>
        </>
    );
};
export default RejectOrderModal;