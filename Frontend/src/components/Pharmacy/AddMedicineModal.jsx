import React, { useState } from 'react';
import { Col, Modal, Row } from 'antd';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import FileUploadInput from '../Auth/FileUploadInput';
import { GRAY2, GRAY4, GREEN } from '../../config/colors';
import MultiSelect from '../Form/MultiSelect';
import { red } from '@mui/material/colors';
  

const names = [
    'Fever',
    'Headache',
    'Pain',
];

const AddMedicineModal = ({closeModal}) => {
    const [open, setOpen] = useState(true);
    const [step, setStep] = useState(1);
    const [data, setData] = useState({});
    const [backendErrors, setBackendErrors] = useState(null)
    const [errors, setErrors] = useState({});
    
    // Event Handlers

    const handleCancel = () => {
        setOpen(false);
        closeModal();
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
            if (!data.name) {
                errorsList.name = true
            }
            if (!data.description) {
                errorsList.description = true
            }
            if (!data.price) {
                errorsList.price = true
            }
            if (!data.quantity) {
                errorsList.quantity = true
            }
            if (!data.medicine_image) {
                errorsList.medicine_image = true
            }
        } else if (step == 2) {
            if (!data.form) {
                errorsList.form = true
            }
            if (!data.weight) {
                errorsList.weight = true
            }
            if (!data.type) {
                errorsList.type = true
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
        if (!data.used_for || data.used_for.length == 0) {
            errorsList.used_for = true
        }

        if (Object.keys(errorsList).length > 0) {
            setErrors(errorsList);
            return
        }

        setErrors({});
        sendMedicineData()
    }

    async function sendMedicineData() {
    
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
            } else if (response.status === 200) {
                alert('added');
            } else {
                setBackendErrors(['An unexpected error occurred.']);
            }
        } catch (error) {
            setBackendErrors(['An error occurred while processing your request.']);
        }
    }

    // JSX Content (Steps)

    const formContent1 = (
        <>
            <TextField variant="outlined" sx={{ mb: 2 }} name="name" label="Name" value={data.name} onChange={handleChange} error={!errors.name ? false : true} fullWidth/>
            <TextField variant="outlined" sx={{ mb: 2 }} name="description" label="Description" value={data.description} onChange={handleChange} error={!errors.description ? false : true} multiline rows={4} fullWidth/>
            <Row gutter={12}>
                <Col span={12}>
                    <TextField variant="outlined" name="quantity" onChange={handleChange} value={data.quantity} error={!errors.quantity ? false : true} sx={{ mb: 2 }} label="Quantity" fullWidth/>
                </Col>
                <Col span={12}>
                    <TextField variant="outlined" name="price" onChange={handleChange} value={data.price} error={!errors.price ? false : true} sx={{ mb: 2 }} label="Price" fullWidth/>
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
                        <InputLabel id="form">Form</InputLabel>
                        <Select
                            labelId="Form"
                            label="form"
                            sx={{ textAlign: 'left' }}
                            value={data.form}
                            defaultValue=""
                            name="form"
                            error={!errors.form ? false : true}
                            onChange={handleChange}
                        >
                            <MenuItem key="form-1" value="">Select</MenuItem>
                            <MenuItem key="form-2" value="Capsule">Capsule</MenuItem>
                            <MenuItem key="form-3" value="Serum">Serum</MenuItem>
                            <MenuItem key="form-4" value="Tablet">Tablet</MenuItem>
                        </Select>
                    </FormControl>
                </Col>
                <Col span={12}>
                    <TextField variant="outlined" name="weight" value={data.weight} onChange={handleChange} error={!errors.weight ? false : true} sx={{ mb: 2 }} label="Weight" fullWidth/>
                </Col>
            </Row>
            <FormControl fullWidth sx={{ bgcolor: '#F9F9F9' }}>
                <InputLabel id="type">Type</InputLabel>
                <Select
                    labelId="type"
                    label="Type"
                    sx={{ textAlign: 'left' }}
                     defaultValue=""
                    value={data.type}
                    name="type"
                    error={!errors.type ? false : true}
                    onChange={handleChange}
                >
                    <MenuItem key="type-1" value="">Select</MenuItem>
                    <MenuItem key="type-2" value="0">Prescription Required</MenuItem>
                    <MenuItem key="type-3" value="1">Over the Counter</MenuItem>
                </Select>
            </FormControl>
        </>
    )

    const formContent3 = (
        <div style={{ marginBottom: 5 }}>
            <div style={{ marginBottom: 16 }}>
                <MultiSelect name="used_for" data={data} error={!!errors.used_for} setData={setData} label="Used For" items={names} />
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
            centered
            onCancel={handleCancel}
            footer={step == 1 ? [
            <Button variant='outlined' onClick={nextSlide} sx={{ borderColor: GREEN, color: GREEN, px: 4, ml: 1 }}>
                next
            </Button>
            ] : ( step == 2 ? [
                <Button variant='outlined' onClick={previousSlide} sx={{ borderColor: GRAY2, color: GRAY2, px: 4, ml: 1 }}>
                    Back
                </Button>,
                <Button variant='outlined' onClick={nextSlide} sx={{ borderColor: GREEN, color: GREEN, px: 4, ml: 1 }}>
                    next
                </Button>
            ] : [
                <Button variant='outlined' onClick={previousSlide} sx={{ borderColor: GRAY2, color: GRAY2, px: 4, ml: 1 }}>
                    Back
                </Button>,
                <Button variant='outlined' onClick={submitForm} sx={{ borderColor: GREEN, color: "#FFF", bgcolor: GREEN, px: 4, ml: 1 }}>
                    Save
                </Button>
            ])}
        >
            <Box textAlign={"center"} mt={3} mb={4}>
                <Box display={"inline-flex"} position={"relative"}>
                    <Box height={4} width={120} bgcolor={step != 1 ? GREEN : GRAY4}></Box>
                    <Box height={4} width={120} bgcolor={step != 3 ? GRAY4 : GREEN}></Box>
                    <Box width={18} height={18} bgcolor={step != 1 ? GREEN : "#FFF"} border={"3px solid" + GREEN} position={"absolute"} borderRadius={"50%"} top={-10} left={0}></Box>
                    <Box width={18} height={18} bgcolor={step != 3 ? "#FFF" : GREEN} border={"3px solid #000"} borderColor={step != 1 ? GREEN : GRAY4} position={"absolute"} borderRadius={"50%"} top={-10} left="50%" sx={{ transform: "TranslateX(-50%)" }}></Box>
                    <Box width={18} height={18} bgcolor={'#FFF'} border={"3px solid #000"} borderColor={step == 3 ? GREEN : GRAY4} position={"absolute"} borderRadius={"50%"} top={-10} right={0}></Box>
                </Box>
            </Box>

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