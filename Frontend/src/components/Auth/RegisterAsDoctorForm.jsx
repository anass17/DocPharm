import { Container, Box, Grid2, Typography, Button, TextField, Link, Select, InputLabel, MenuItem, FormControl, Input } from "@mui/material"
import { GRAY0, GREEN, GRAY2, GREEN2, GRAY4, GRAY3, GREEN3 } from "../../config/colors"
import FormDivisor from "./FormDivisor"
import { CloudUpload } from "@mui/icons-material"
import FileUploadInput from "./FileUploadInput"
import { useState } from "react"
import PictureIcon from "../../icons/PictureIcon"
import FrontCardIcon from "../../icons/FrontCardIcon"
import BackCardIcon from "../../icons/BackCardIcon"
import FileIcon from "../../icons/FileIcon"
import Cookies from 'js-cookie';
import { backend_url } from "../../config/app"
import { red } from "@mui/material/colors"
import { updateUserVerificationStep } from "../../store/actions"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function RegisterForm() {
    const [step, setStep] = useState(1);
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({})
    const [backendErrors, setBackendErrors] = useState(null)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleChange(e) {
        const {name, value} = e.target;

        setData({
            ...data,
            [name]: value
        })
    }

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

    function handleNextButton(e) {
        e.preventDefault();

        let errorList = {}

        if (!data.medical_license_number) {
            errorList = {
                medical_license_number: true
            }
        }
        if (!data.cne_front) {
            errorList = {
                ...errorList,
                cne_front: true
            }
        }
        if (!data.cne_back) {
            errorList = {
                ...errorList,
                cne_back: true
            }
        }
        if (!data.prof_document) {
            errorList = {
                ...errorList,
                prof_document: true
            }
        }
        if (!data.building_front) {
            errorList = {
                ...errorList,
                building_front: true
            }
        }

        if (Object.keys(errorList).length > 0) {
            setErrors(errorList);
            return
        }
        
        setStep(2)
        setErrors({})
    }

    function handleSaveButton(e) {
        e.preventDefault();

        let errorList = {}

        if (!data.profile_picture) {
            errorList = {
                profile_picture: true
            }
        }
        if (!data.appointment_type) {
            errorList = {
                ...errorList,
                appointment_type: true
            }
        }
        if (!data.speciality) {
            errorList = {
                ...errorList,
                speciality: true
            }
        }
        if (!data.bio) {
            errorList = {
                ...errorList,
                bio: true
            }
        }
        if (!data.address) {
            errorList = {
                ...errorList,
                address: true
            }
        }
        if (!data.city) {
            errorList = {
                ...errorList,
                city: true
            }
        }
        if (!data.postal_code) {
            errorList = {
                ...errorList,
                postal_code: true
            }
        }
        if (!data.phone_number) {
            errorList = {
                ...errorList,
                phone_number: true
            }
        }

        if (Object.keys(errorList).length > 0) {
            setErrors(errorList);
            return
        }
        
        setErrors({})
        console.log(data)

        sendRegisterData()
    }

    function handleBackButton(e) {
        e.preventDefault()
        setStep(1)
    }

    async function sendRegisterData() {

        const formData = new FormData();

        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });

        try {
            const response = await fetch(backend_url + '/api/registerasdoctor', {
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
                dispatch(updateUserVerificationStep('complete'))
                navigate('/products', { replace: true });
            } else {
                alert('An unexpected error occurred.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while processing your request.');
        }
    }


    let VerificationStep = (
        <form onSubmit={handleNextButton} style={{ textAlign: 'center', marginTop: 75 }}>
            <Grid2 container spacing={5}>
                <Grid2 size={{md: 6, xs: 12}}>

                    <FormDivisor>Personal Verification</FormDivisor>

                    <FileUploadInput Icon={FrontCardIcon} onChange={handleFileUpload} error={errors.cne_front} inputName="cne_front" format="JPG, PNG, WEBP" description={!data.cne_front ? "CNE (Front)" : data.cne_front.name} />
                    <FileUploadInput Icon={BackCardIcon} onChange={handleFileUpload} error={errors.cne_back} inputName="cne_back" format="JPG, PNG, WEBP" description={!data.cne_back ? "CNE (Back)" : data.cne_back.name} />

                </Grid2>
                <Grid2 size={{md: 6, xs: 12}}>
                
                    <FormDivisor>Business Verification</FormDivisor>

                    <TextField label="Medical License Number" name="medical_license_number" value={data.medical_license_number} error={!errors.medical_license_number ? false : true} onChange={handleChange} variant="outlined" sx={{ marginBottom: 2, backgroundColor: '#F9F9F9' }} fullWidth />

                    <FileUploadInput Icon={FileIcon} onChange={handleFileUpload} error={errors.prof_document} inputName="prof_document" format="PDF" description={!data.prof_document ? "Prof document" : data.prof_document.name} />
                    <FileUploadInput Icon={PictureIcon} onChange={handleFileUpload} error={errors.building_front} inputName="building_front" format="JPG, PNG, WEBP" description={!data.building_front ? "Front of the building" : data.building_front.name} />

                </Grid2>
            </Grid2>
            <Box mt={2} display="flex" justifyContent={"center"} alignItems={"center"}>
                <Button variant="contained" type="submit" sx={{ bgcolor: GREEN, py: 1, px: 5 }}>Next</Button>
            </Box>
        </form>
    )

    let PreferencesStep = (
        <form style={{ textAlign: 'center', marginTop: 75 }}>
            <Grid2 container spacing={5}>
                <Grid2 size={{md: 6, xs: 12}}>

                    <FormDivisor>Additional Information</FormDivisor>

                    <FileUploadInput onChange={handleFileUpload} error={errors.profile_picture} inputName="profile_picture" format="JPG, PNG, WEBP" description={!data.profile_picture ? "Profile Picture" : data.profile_picture.name} />

                    <FormControl fullWidth sx={{ mb: 2, bgcolor: '#F9F9F9' }}>
                        <InputLabel id="appointmentType">Appointment Type</InputLabel>
                        <Select
                            labelId="appointmentType"
                            label="Appointment Type"
                            sx={{ textAlign: 'left' }}
                            value={data.appointment_type}
                            name="appointment_type"
                            error={!errors.appointment_type ? false : true}
                            onChange={handleChange}
                        >
                            <MenuItem value="">Select</MenuItem>
                            <MenuItem value="in-person">In-Person Appointments</MenuItem>
                            <MenuItem value="online">Online Appointments</MenuItem>
                            <MenuItem value="both">Both</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 2, bgcolor: '#F9F9F9' }}>
                        <InputLabel id="speciality">Speciality</InputLabel>
                        <Select
                            labelId="speciality"
                            label="Speciality"
                            sx={{ textAlign: 'left' }}
                            value={data.speciality}
                            name="speciality"
                            error={!errors.speciality ? false : true}
                            onChange={handleChange}
                        >
                            <MenuItem value="">Select</MenuItem>
                            <MenuItem value="in-person">Cardiology</MenuItem>
                            <MenuItem value="online">Physiology</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField variant="outlined" name="bio" value={data.bio} error={!errors.bio ? false : true} onChange={handleChange} label="Bio" sx={{ bgcolor: '#F9F9F9' }} rows={4} multiline fullWidth></TextField>

                </Grid2>
                <Grid2 size={{md: 6, xs: 12}}>
                
                    <FormDivisor>Work Address</FormDivisor>

                    <TextField variant="outlined" name="address" value={data.address} error={!errors.address ? false : true} onChange={handleChange} label="Address" rows={4} multiline fullWidth sx={{ mb: 2, bgcolor: '#F9F9F9' }}></TextField>

                    <Box display={"flex"} gap={2} sx={{ mb: 6 }}>
                        <FormControl fullWidth sx={{ bgcolor: '#F9F9F9' }}>
                            <InputLabel id="city">City</InputLabel>
                            <Select
                                labelId="City"
                                label="city"
                                sx={{ textAlign: 'left' }}
                                value={data.city}
                                name="city"
                                error={!errors.city ? false : true}
                                onChange={handleChange}
                            >
                                <MenuItem value="">Select</MenuItem>
                                <MenuItem value="in-person">Cardiology</MenuItem>
                                <MenuItem value="online">Physiology</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField variant="outlined" name="postal_code" value={data.postal_code} error={!errors.postal_code ? false : true} onChange={handleChange} label="Postal Code" sx={{ bgcolor: '#F9F9F9' }} fullWidth></TextField>
                    </Box>

                    <FormDivisor>Contact Information</FormDivisor>

                    <TextField variant="outlined" name="phone_number" value={data.phone_number} error={!errors.phone_number ? false : true} onChange={handleChange} label="Phone Number" sx={{ bgcolor: '#F9F9F9' }} fullWidth></TextField>

                </Grid2>
            </Grid2>
            <Box mt={6} display="flex" justifyContent={"center"} alignItems={"center"} gap={1}>
                <Button variant="contained" onClick={handleBackButton} sx={{ bgcolor: GRAY3, py: 1, px: 5 }}>Back</Button>
                <Button variant="contained" onClick={handleSaveButton} sx={{ bgcolor: GREEN, py: 1, px: 5 }}>Save</Button>
            </Box>
        </form>
    )

    return (
        <Container maxWidth="lg" sx={{ pb: 4, pt: 12, display:"flex", alignItems:'center', minHeight: '100vh' }}>
            <Box py={6} px={{md: 5, xs: 4}} sx={{ position: 'relative', backgroundColor: '#FFF', width: '100%', borderRadius: '5px', boxShadow: '0px 1px 2px rgba(0, 0, 0, .15)', border: '1px solid rgba(0, 0, 0, .1)' }}>
                <Typography variant="h4" component="h1" textAlign={"center"} mb={2}>Welcome Mr. Anass Boutaib</Typography>
                <Typography variant="body1" textAlign={"center"} color={GRAY2} mb={5}>Please complete the registration process by providing the following details</Typography>
                
                <Box textAlign={"center"}>
                    <Box display={"inline-block"} position={"relative"}>
                        <Box height={5} width={200} bgcolor={step == 2 ? GREEN : GRAY4}></Box>
                        <Box width={18} height={18} bgcolor={step == 2 ? GREEN : "#FFF"} border={"3px solid" + GREEN} position={"absolute"} borderRadius={"50%"} top={-10} left={0}>
                            <Typography position={"absolute"} left={9} top={30} sx={{ transform: 'translateX(-50%)' }} color={GREEN} fontWeight={500}>Verification</Typography>
                        </Box>
                        <Box width={18} height={18} bgcolor={'#FFF'} border={"3px solid #000"} borderColor={step == 2 ? GREEN : GRAY4} position={"absolute"} borderRadius={"50%"} top={-10} right={0}>
                            <Typography position={"absolute"} left={9} top={30} sx={{ transform: 'translateX(-50%)' }} color={step == 2 ? GREEN : "#aeacb6"} fontWeight={500}>Preferences</Typography>
                        </Box>
                    </Box>
                </Box>

                {
                    !backendErrors ? (
                        <></>
                    ) : (
                        <Box mt={8} color={red[600]} py={2} borderRadius={2} textAlign={"center"} bgcolor={red[50]}>
                            {
                                Object.values(backendErrors).map((item, index) => {
                                    return (<p style={{ margin: '0.5rem 0', fontFamily: 'roboto' }} key={index}>{item}</p>)
                                })
                            }
                        </Box>
                    )
                }
                
                {
                    step === 1 ? (
                        VerificationStep
                    ) : (
                        PreferencesStep
                    )
                }
            </Box>
        </Container>
    )
}