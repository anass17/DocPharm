import React, { useEffect, useState } from 'react';
import { Col, message, Modal, notification, Row, Typography } from 'antd';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { GRAY2, GRAY4, GREEN } from '../../../config/colors';
import { grey, red } from '@mui/material/colors';
import { backend_url } from '../../../config/app';
import Cookies from 'js-cookie'

const AdminDeleteMedicineModal = ({medicine, open, setOpen, handleUpdate}) => {
    const [backendErrors, setBackendErrors] = useState(null)
    const [loading, setLoading] = useState(null);
    const [api, NotificationHolder] = notification.useNotification();

    const openNotification = (message, description, status = 'info') => {
        api.open({
            message: message,
            type: status,
            description: <p>{description}</p>,
            placement: 'bottomRight',
            duration: 5,
            showProgress: true,
            pauseOnHover: true,
        });
    };


    // Event Handlers

    const handleCancel = () => {
        setBackendErrors(null)
        setOpen(false);
    };

    const submitForm = () => {
        deleteMedicine()
    }

    // Fetch API

    async function deleteMedicine() {
        setLoading(true)
        try {
            const response = await fetch(`${backend_url}/api/medicines/${medicine.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('auth_token'),
                },
            });

     
            if (response.status === 422) {
                const responseData = await response.json();
                setBackendErrors(responseData.errors);
            } else if (response.status === 204) {
                setBackendErrors(null);
                openNotification('Sucess!', `The medicine "${medicine.medicine_name}" has been delete from all pharmacies inventory.`, 'success')
                handleUpdate(medicine.id)
                setOpen(false)
            } else {
                setBackendErrors(['An unexpected error occurred.']);
            }

        } catch (error) {
            console.log(error)
            setBackendErrors(['An error occurred while processing your request.']);
        } finally {
            setLoading(false)
        }
    }

    // Returned Content

    return (
        <>

        <Modal
            open={open}
            title={"Delete: " + medicine.medicine_name}
            style={{ top: 60 }}
            onCancel={handleCancel}
            footer=
            {
                loading ? (
                    <Button loading variant='outlined' key="loading" sx={{ borderColor: grey[200], color: GRAY2, bgcolor: grey[200], px: 4, ml: 1 }}>
                        Loading
                    </Button>
                ) : (
                    <Button variant='outlined' key="next1" onClick={submitForm} sx={{ borderColor: red[500], color: '#FFF', bgcolor: red[500], px: 4, ml: 1 }}>
                        Confirm
                    </Button>
                )
                
            }
        >
            {NotificationHolder}

            {
                !backendErrors ? (
                    <></>
                ) : (
                    <Box my={5} color={red[600]} borderRadius={2} textAlign={"center"}>
                        {
                            Object.values(backendErrors).map((item, index) => {
                                return (<p style={{ margin: '0.5rem 0', fontFamily: 'roboto' }} key={index}>{item}</p>)
                            })
                        }
                    </Box>
                )
            }

            
            <Box sx={{ my: 4 }}>
                <Typography.Text style={{ fontSize: 15 }}>Before deleting this medicine, please note that it will also be removed from all pharmacy inventories.<br /><br /> Do you really want to delete this medicine?</Typography.Text>
            </Box>
            
        </Modal>
        </>
    );
};

export default AdminDeleteMedicineModal;