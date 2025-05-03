import React, { useEffect, useState } from 'react';
import { Button, Col, Divider, Input, Modal, notification, Row, Spin, Typography } from 'antd';
import {Button as Btn, Checkbox, FormControlLabel, FormGroup} from '@mui/material' 
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { GRAY0, GREEN, PRIMARY_BLUE, PRIMARY_GREEN } from '../../../config/colors';
import { DarkGreenButton } from '../../Button/FilledButtons';
import { backend_url } from '../../../config/app';
import Cookies from 'js-cookie'
import { grey, red } from '@mui/material/colors';
import Title from 'antd/es/typography/Title';
import { LoadingOutlined } from '@ant-design/icons';

const AddPrescriptionModal = ({apt_id, open, setOpen, statusUpdate}) => {
    const [loading, setLoading] = useState(false)
    const [searchLoading, setSearchLoading] = useState(false)
    const [description, setDescription] = useState('')
    const [search, setSearch] = useState('')
    const [selectedMedicines, setSelectedMedicines] = useState([])
    const [searchResult, setSearchResult] = useState([]);
    const [api, NotificationHolder] = notification.useNotification();

    const openNotification = (message, description, type = 'info') => {
        api.open({
            type: type,
            message: message,
            description: <p>{description}</p>,
            placement: 'bottomRight',
            duration: 5,
            showProgress: true,
            pauseOnHover: true,
        });
    };

    const handleMedicineClick = (item) => {
        setSelectedMedicines(
            [...selectedMedicines, item]
        )
        setSearch('')
    } 


    const handleCancel = () => {
        setOpen(false);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const handleMedicineRemove = (id) => {
        setSelectedMedicines(selectedMedicines.filter(item => item.id !== id))
    }

    // Fetch API
    
    const searchForMedicines = async () => {
        
        setSearchLoading(true)

        try {

            const response = await fetch(`${backend_url}/api/medicines?search=${search}`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('auth_token'),
                    'Content-Type': 'application/json'
                },
            });
    
            if (response.status === 401) {
                openNotification('Access Denied', 'You are not authorized to perform this action')
            } else if (response.status === 200) {
                let responseData = await response.json();

                setSearchResult(responseData.medicines.data)
            } else {
                openNotification('Something went wrong!', 'Could not load your appointments')
            }
        } catch (error) {
            console.log(error)
            openNotification('Something went wrong!', 'Could not load your appointments')
        } finally {
            setSearchLoading(false)
        }
    }

    const addPrescription = async () => {
        
        setLoading(true)

        try {

            const response = await fetch(`${backend_url}/api/prescriptions`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('auth_token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({appointment: apt_id, description: description, medicines: selectedMedicines.map(item=>item.id)})
            });
    
            if (response.status === 401) {
                openNotification('Access Denied', 'You are not authorized to perform this action')
            } else if (response.status === 201) {
                openNotification('Success', 'The prescription for this appointment has been added', 'success')
                statusUpdate()
            } else {
                openNotification('Something went wrong!', 'Could not create the prescription')
            }
        } catch (error) {
            console.log(error)
            openNotification('Something went wrong!', 'Could not create the prescription')
        } finally {
            setLoading(false)
            setOpen(false)
            setDescription('')
            setSelectedMedicines([])
        }
    }

    useEffect(()=> {
        if (search.length > 2) {
            searchForMedicines()
        } else {
            setSearchResult([])
        }
    }, [search])

    
    return (
        <>
            {NotificationHolder}
            <Modal
                open={open}
                title="Add Prescription"
                onCancel={handleCancel}
                footer={
                    [
                        loading ? (
                            <Button key='loading' loading variant="" style={{ padding: '1.25rem 3rem' }} />
                        ) : (
                            <DarkGreenButton key="add" onClick={() => addPrescription()}>
                                Add
                            </DarkGreenButton>
                        )
                    ]
                }
            >
                <Box py={2}>
                    <TextField name='' label='Prescription Note' multiline rows={4} fullWidth sx={{ mb: 1.5 }} value={description} onChange={(e) => setDescription(e.target.value)} />
                    <Box position={'relative'}>
                        <TextField name='' label="Add Medicine" value={search} fullWidth onChange={handleSearch}/>
                        <Box position={'absolute'} bgcolor="#FFF" width="100%" zIndex={100} maxHeight={300} overflow='auto' boxShadow='0px 1px 2px rgba(0, 0, 0, .2)'>
                            {
                                searchLoading ? (
                                    <Box sx={{ padding: '1.5rem 0.75rem', textAlign: 'center' }}>
                                        <Spin indicator={<LoadingOutlined spin />} size="large" />
                                    </Box>
                                ) : (
                                    search.length > 2 ? (
                                        searchResult.length != 0 ? 
                                        (
                                            searchResult.map((item, index) => {
                                                return (
                                                    <Box key={index} px={3} py={2} sx={{ cursor: 'pointer' }} className="hover:bg-gray-200 transition" borderBottom='1px solid #DDD' display={'flex'} gap={3} alignItems='center' onClick={() => handleMedicineClick(item)}>
                                                        <div>
                                                            <img style={{ width: 100, height: 70, objectFit: 'cover', borderRadius: 5 }} src={backend_url + (item.medicine_image ? item.medicine_image : '/storage/placeholder.jpg')} />
                                                        </div>
                                                        <div>
                                                            <Title level={5} style={{marginBottom: 1 }}>{item.medicine_name} - {item.medicine_weight} {item.form_unit}</Title>
                                                            <span>{item.form_name}</span>
                                                        </div>
                                                    </Box>
                                                )
                                            })
                                        ) : (
                                            <p className='text-center' style={{ padding: '1.5rem 0.75rem' }}>No Results</p>
                                        )
                                    ) : null
                                )
                            }
                        </Box>
                    </Box>
                </Box>
                <Box>
                    {
                        selectedMedicines.map((item, index) => {
                            return (
                                <Row key={index} style={{ margin: '0.6rem 0', alignItems: 'center' }}>
                                    <Col span={20}>
                                        <Box display={'flex'} gap={2} alignItems='center'>
                                            <div>
                                                <img style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 5 }} src={backend_url + (item.medicine_image ? item.medicine_image : '/storage/placeholder.jpg')} />
                                            </div>
                                            <div>
                                                <Title level={5} style={{marginBottom: 1 }}>{item.medicine_name} - {item.medicine_weight} {item.form_unit}</Title>
                                                <span>{item.form_name}</span>
                                            </div>
                                        </Box>
                                    </Col>
                                    <Col span={4} style={{ alignItems: 'center', textAlign: 'right' }}>
                                        <button className='font-medium text-red-500 text-[17px]' onClick={() => handleMedicineRemove(item.id)}>X</button>
                                    </Col>
                                </Row>
                            )
                        })
                    }
                </Box>
            </Modal>
        </>
    );
};
export default AddPrescriptionModal;