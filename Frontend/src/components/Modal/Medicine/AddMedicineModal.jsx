import React, { useEffect, useState } from 'react';
import { Col, ConfigProvider, message, Modal, Row, Steps } from 'antd';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import FileUploadInput from '../../Form/FileUploadInput';
import { GRAY2, GRAY4, GREEN, PRIMARY_GREEN } from '../../../config/colors';
import MultiSelect from '../../Form/MultiSelect';
import { red } from '@mui/material/colors';
import { backend_url } from '../../../config/app';
import Cookies from 'js-cookie'
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { FaCapsules, FaLaptopMedical, FaMedapps, FaPills } from 'react-icons/fa';
  
const AddMedicineModal = ({open, setOpen}) => {
    const [optionSubmit, setOptionSubmit] = useState(false);
    const [step, setStep] = useState(1);
    const [uses, setUses] = useState([]);
    const [forms, setForms] = useState([]);
    const [data, setData] = useState({});
    const [backendErrors, setBackendErrors] = useState(null)
    const [errors, setErrors] = useState({});
    const [submit, setSubmit] = useState(false)
    const [messageApi, contextHolder] = message.useMessage();

    const info = (message, type = 'success') => {
        messageApi.open({
            type: type,
            content: message,
            duration: 5
        });
    };

    const getOptions = async () => {
        setOptionSubmit(true);
        
        try {

            const response = await fetch(`${backend_url}/api/medicine/options`, {
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('auth_token'),
                }
            });
    
            const responseData = await response.json();
    
            if (response.status === 401) {
                info('You are not authorized to view this data', 'error');
            } else if (response.status === 200) {
                setUses(responseData.uses)
                setForms(responseData.forms)
            } else {
                info('Something went wrong! Could not load this data', 'error');
            }
        } catch (error) {
            info('Something went wrong! Could not load this data', 'error');
        }
    }

    useEffect(() => {
        getOptions()

    }, [optionSubmit])
    
    // Event Handlers

    const handleCancel = () => {
        setOpen(false);
    };

    function handleFileUpload(e) {
        const fileInput = e.target
        const file = fileInput.files[0];

        if (!file) {
            return;
        }

        setData({
            ...data,
            [e.target.name]: file
        })

    }

    const nextSlide = () => {
        const errorsList = {}
        if (step == 1) {
            if (!data.medicine_name) {
                errorsList.medicine_name = true
            }
            if (!data.medicine_description) {
                errorsList.medicine_description = true
            }
            if (!data.medicine_price) {
                errorsList.medicine_price = true
            }
            if (!data.medicine_quantity) {
                errorsList.medicine_quantity = true
            }
            if (!data.medicine_image) {
                errorsList.medicine_image = true
            }
        } else if (step == 2) {
            if (!data.medicine_form) {
                errorsList.medicine_form = true
            }
            if (!data.medicine_weight) {
                errorsList.medicine_weight = true
            }
            if (!data.prescription_required) {
                errorsList.prescription_required = true
            }
        }

        if (Object.keys(errorsList).length > 0) {
            setErrors(errorsList);
            return
        }

        setErrors({});
        setStep(step + 1);
    }

    const previousSlide = () => {
        setStep(step - 1);
    }

    const handleChange = (e) => {
        const {name, value} = e.target;

        setData({
            ...data,
            [name]: value
        })
    }

    const submitForm = () => {
        const errorsList = {}

        if (!data.usage_instructions) {
            errorsList.usage_instructions = true
        }
        if (!data.medicine_uses || data.medicine_uses.length == 0) {
            errorsList.medicine_uses = true
        }

        if (Object.keys(errorsList).length > 0) {
            setErrors(errorsList);
            return
        }

        setErrors({});
        sendMedicineData()
    }

    async function sendMedicineData() {

        setSubmit(true)
    
        const formData = new FormData();

        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });

        try {
            const response = await fetch(backend_url + '/api/medicines', {
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
                // alert('added');
                setBackendErrors(null);
                info(responseData.message);
                setData({})
                setErrors({})
                setStep(1)
                setOpen(false)
            } else {
                setBackendErrors(['An unexpected error occurred.']);
            }

            setSubmit(false)
        } catch (error) {
            setBackendErrors(['An error occurred while processing your request.']);
            setSubmit(false)
        }
    }

    // JSX Content (Steps)

    const formContent1 = (
        <>
            <TextField variant="outlined" sx={{ mb: 2 }} name="medicine_name" label="Name" value={data.medicine_name} onChange={handleChange} error={!errors.medicine_name ? false : true} fullWidth/>
            <TextField variant="outlined" sx={{ mb: 2 }} name="medicine_description" label="Description" value={data.medicine_description} onChange={handleChange} error={!errors.medicine_description ? false : true} multiline rows={4} fullWidth/>
            <Row gutter={12}>
                <Col span={12}>
                    <TextField variant="outlined" name="medicine_quantity" onChange={handleChange} value={data.medicine_quantity} error={!errors.medicine_quantity ? false : true} sx={{ mb: 2 }} label="Quantity" fullWidth/>
                </Col>
                <Col span={12}>
                    <TextField variant="outlined" name="medicine_price" onChange={handleChange} value={data.medicine_price} error={!errors.medicine_price ? false : true} sx={{ mb: 2 }} label="Price" fullWidth/>
                </Col>
            </Row>
            <FileUploadInput onChange={handleFileUpload} error={errors.medicine_image} description={!data.medicine_image ? "Medicine Image" : data.medicine_image.name} inputName="medicine_image" format="JPG, PNG, WEBP"></FileUploadInput>
        </>
    )

    const formContent2 = (
        <>
            <Row gutter={12}>
                <Col span={12}>
                    <FormControl fullWidth sx={{ bgcolor: '#F9F9F9' }}>
                        <InputLabel id="medicine_form">Form</InputLabel>
                        <Select
                            labelId="medicine_form_label"
                            label="Form"
                            sx={{ textAlign: 'left' }}
                            value={data.medicine_form || ''}
                            defaultValue=""
                            name="medicine_form"
                            error={!errors.medicine_form ? false : true}
                            onChange={handleChange}
                        >
                            <MenuItem key="form-1" value="">Select</MenuItem>
                            {
                                forms.map((item, index) => {
                                    return <MenuItem key={`medicine-form-${index}`} value={item.id}>{item.name}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                </Col>
                <Col span={12}>
                    <TextField variant="outlined" name="medicine_weight" value={data.medicine_weight} onChange={handleChange} error={!errors.medicine_weight ? false : true} sx={{ mb: 2 }} label="Weight" fullWidth/>
                </Col>
            </Row>
            <FormControl fullWidth sx={{ bgcolor: '#F9F9F9' }}>
                <InputLabel id="prescription_required">Prescription Requirement</InputLabel>
                <Select
                    labelId="prescription_required_label"
                    label="Prescription Requirement"
                    sx={{ textAlign: 'left' }}
                    defaultValue=""
                    value={data.prescription_required}
                    name="prescription_required"
                    error={!errors.prescription_required ? false : true}
                    onChange={handleChange}
                >
                    <MenuItem key="type-1" value="">Select</MenuItem>
                    <MenuItem key="type-3" value="0">Not Required</MenuItem>
                    <MenuItem key="type-2" value="1">Required</MenuItem>
                </Select>
            </FormControl>
        </>
    )

    const formContent3 = (
        <div style={{ marginBottom: 5 }}>
            <div style={{ marginBottom: 16 }}>
                <MultiSelect name="medicine_uses" data={data} error={!!errors.medicine_uses} setData={setData} label="Used For" items={uses} />
            </div>
            <TextField variant="outlined" name="usage_instructions" value={data.usage_instructions} onChange={handleChange} error={!errors.usage_instructions ? false : true} sx={{ mb: 2 }} label="Usage Instructions" multiline rows={4} fullWidth/>
        </div>
    )

    // Returned Content

    return (
        <>

        <Modal
            open={open}
            title="Add New Product"
            // centered
            style={{ top: 60 }}
            onCancel={handleCancel}
            footer=
            {
                step == 1 ? [
                    <Button variant='outlined' key="next1" onClick={nextSlide} sx={{ borderColor: GREEN, color: GREEN, px: 4, ml: 1 }}>
                        next
                    </Button>
                ] : ( step == 2 ? 
                    [
                        <Button variant='outlined' key="Back1" onClick={previousSlide} sx={{ borderColor: GRAY2, color: GRAY2, px: 4, ml: 1 }}>
                            Back
                        </Button>,
                        <Button variant='outlined' key="next2" onClick={nextSlide} sx={{ borderColor: GREEN, color: GREEN, px: 4, ml: 1 }}>
                            next
                        </Button>
                    ] : 
                    (
                        !submit ?
                        [
                            <Button variant='outlined' key="Back2" onClick={previousSlide} sx={{ borderColor: GRAY2, color: GRAY2, px: 4, ml: 1 }}>
                                Back
                            </Button>,
                            <Button variant='outlined' key="save" onClick={submitForm} sx={{ borderColor: GREEN, color: "#FFF", bgcolor: GREEN, px: 4, ml: 1 }}>
                                Save
                            </Button>
                        ] :
                        [
                            <Button loading key="save" variant="outlined" sx={{px: 4, ml: 1 }}>
                                Save
                            </Button>
                        ]
                    )
                )
            }
        >
            {contextHolder}

            <ConfigProvider
                theme={{
                    token: {
                      colorPrimary: PRIMARY_GREEN
                    },
                  }}
            >
                <Steps
                    style={{ padding: '2rem 0.5rem' }}
                    items={[
                        {
                            title: 'General',
                            status: (step > 1 ? 'finish' : 'wait'),
                            icon: <FaPills />,
                        },
                        {
                            title: 'Second',
                            status: (step > 2 ? 'finish' : 'wait'),
                            icon: <FaCapsules />,
                        },
                        {
                            title: 'Usage',
                            status: 'wait',
                            icon: <FaMedapps />,
                        }
                    ]}
                />
            </ConfigProvider>

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

            {
                step == 1 ? (
                    formContent1
                ) : (
                    step == 2 ? (
                        formContent2
                    ) : (
                        formContent3
                    )
                )
            }

            
        </Modal>
        </>
    );
};

export default AddMedicineModal;