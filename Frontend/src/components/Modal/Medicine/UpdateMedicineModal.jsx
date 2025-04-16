import React, { useEffect, useState } from 'react';
import { Col, message, Modal, Row, Typography } from 'antd';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import FileUploadInput from '../../Form/FileUploadInput';
import { GRAY2, GRAY4, GREEN } from '../../../config/colors';
import MultiSelect from '../../Form/MultiSelect';
import { red } from '@mui/material/colors';
import { backend_url } from '../../../config/app';
import Cookies from 'js-cookie'
import { Typography as TPG } from '@mui/material';

const UpdateMedicineModal = ({medicine, open, setOpen, handleUpdate}) => {
    const [data, setData] = useState({new_quantity: 0, new_visibility: medicine.visibility});
    const [backendErrors, setBackendErrors] = useState(null)
    const [messageApi, contextHolder] = message.useMessage();

    const info = (message, type = 'success') => {
        messageApi.open({
            type: type,
            content: message,
            duration: 5
        });
    };

    // Event Handlers

    const handleCancel = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        const {name, value} = e.target;

        setData({
            ...data,
            [name]: value
        })
    }

    const submitForm = () => {
        sendMedicineUpdate()
    }

    async function sendMedicineUpdate() {
    
        try {
            const response = await fetch(`${backend_url}/api/medicines/${medicine.medicine_id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('auth_token'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
    
            const responseData = await response.json();
    
            if (response.status === 422) {
                setBackendErrors(responseData.errors);
            } else if (response.status === 200) {
                setBackendErrors(null);
                info(`The antibody "${medicine.medicine_name}" has been updated`);
                handleUpdate(medicine.id, +data.new_quantity + +medicine.medicine_quantity, data.new_visibility)
                setOpen(false)
                setData({
                    ...data,
                    new_quantity: 0
                })
            } else {
                setBackendErrors(['An unexpected error occurred.']);
            }

        } catch (error) {
            setBackendErrors(['An error occurred while processing your request.']);
        }
    }

    // Returned Content

    return (
        <>

        <Modal
            open={open}
            title={"Update: " + medicine.medicine_name}
            style={{ top: 60 }}
            onCancel={handleCancel}
            footer=
            {
                <Button variant='outlined' key="next1" onClick={submitForm} sx={{ borderColor: GREEN, color: '#FFF', bgcolor: GREEN, px: 4, ml: 1 }}>
                    Save
                </Button>
            }
        >
            {contextHolder}

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

            
            <Row gutter={[16, 22]} style={{ marginTop: 30 }}>
                <Col span={12}>
                    <TPG variant="body2" fontWeight={"bold"}>Current Units</TPG>
                    <TPG>{medicine.medicine_quantity}</TPG>
                </Col>
                <Col span={12}>
                    <TPG variant="body2" fontWeight={"bold"}>Total Units</TPG>
                    <TPG>{+medicine.medicine_quantity + +data.new_quantity}</TPG>
                </Col>
                <Col span={12}>
                    <TextField variant="outlined" name="new_quantity" onChange={handleChange} value={data.new_quantity} sx={{ mb: 2 }} label="Quantity" fullWidth/>
                </Col>
                <Col span={12}>
                    <FormControl fullWidth sx={{ bgcolor: '#F9F9F9' }}>
                        <InputLabel id="Visibility">Visibility</InputLabel>
                        <Select
                            labelId="new_visibility_label"
                            label="Visibility"
                            sx={{ textAlign: 'left' }}
                            defaultValue=""
                            value={data.new_visibility}
                            name="new_visibility"
                            onChange={handleChange}
                        >
                            <MenuItem key="type-3" value={true}>Visible</MenuItem>
                            <MenuItem key="type-2" value={false}>Hidden</MenuItem>
                        </Select>
                    </FormControl>
                </Col>
            </Row>
            
        </Modal>
        </>
    );
};

export default UpdateMedicineModal;