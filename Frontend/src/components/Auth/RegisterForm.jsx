import { Container, Box, Grid2, Typography, Button, TextField, Select, InputLabel, MenuItem, FormControl } from "@mui/material"
import { GRAY0, GREEN, GRAY2, GREEN2, GRAY4, GRAY3, GREEN3 } from "../../config/colors"
import { ChangeEvent, useState } from "react"
import { Link } from "react-router-dom";

export default function RegisterForm() {

    const [data, setData] = useState({first_name: '', last_name: '', email: '', password: '', type: ''});

    function handleChange(e) {
        const {name, value} = e.target;

        setData({
            ...data,
            [name]: value
        })
    }


    function handleSubmit(e) {
        e.preventDefault();

        fetch('http://localhost:8000/api/register', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
        .then(data => console.log(data));
    }

    return (
        <Container maxWidth="lg" sx={{ pb: 4, pt: 12, display:"flex", alignItems:'center', minHeight: '100vh' }}>
            <Box sx={{ position: 'relative', backgroundColor: '#FFF', width: '100%', borderRadius: '5px', boxShadow: '0px 1px 2px rgba(0, 0, 0, .15)', border: '1px solid rgba(0, 0, 0, .1)' }}>
                <Typography variant="body2" position={"absolute"} bottom={20} left={30}>
                    Already a member ? 
                    <Link to="/login" style={{ textDecoration: 'none', marginLeft: '0.25rem', color: GREEN }}>Sign in</Link>
                </Typography>
                <Grid2 container spacing={5} p={4} pb={{ xs: 8, md: 4 }} alignItems={"center"}>
                    <Grid2 size={{md: 6, sm: 12}}>
                        <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
                            <Typography variant="h4" component="h1" mb={1}>Join Us!</Typography>
                            <Typography variant="body1" mb={5}>Create an account and access to our services</Typography>
                            <Box display={"flex"} gap={1}>
                                <TextField label="First Name" name="first_name" variant="outlined" onChange={handleChange} sx={{ marginBottom: 1, backgroundColor: '#F9F9F9' }} fullWidth />
                                <TextField label="Last Name" name="last_name" onChange={handleChange} variant="outlined" sx={{ backgroundColor: '#F9F9F9' }} fullWidth />
                            </Box>
                            <TextField label="Email" variant="outlined" name="email" onChange={handleChange} sx={{ marginBottom: 1, backgroundColor: '#F9F9F9' }} fullWidth />
                            <TextField label="Password" type="password" name="password" variant="outlined" onChange={handleChange} sx={{ marginBottom: 1, backgroundColor: '#F9F9F9' }} fullWidth />

                            {/* Select - Account Type */}

                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Account Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Account Type"
                                    name="type"
                                    sx={{ textAlign: 'left' }}
                                    onChange={handleChange}
                                    value={data.type}
                                >
                                    <MenuItem value="">Select</MenuItem>
                                    <MenuItem value="client">Client</MenuItem>
                                    <MenuItem value="doctor">Doctor</MenuItem>
                                    <MenuItem value="pharmacy">Pharmacy</MenuItem>
                                </Select>
                            </FormControl>

                            {/* Sumbit */}

                            <Box mt={2} display="flex" justifyContent={"space-between"} alignItems={"center"}>
                                <Button variant="contained" type="Submit" sx={{ bgcolor: GREEN, py: 1, px: 5 }}>Log in</Button>
                                <Button variant="text" sx={{ color: GREEN }}>Reset Password</Button>
                            </Box>

                            <Box position={"relative"} mt={6}>
                                <Typography variant="body1" component="h6" bgcolor={"#FFF"} zIndex={10} color={GRAY3} position={"relative"} display={"inline-block"} px={2}>Or Continue With</Typography>
                                <Box height={'1px'} width={"100%"} bgcolor={GRAY4} position={"relative"} bottom={11}  ></Box>
                            </Box>

                            <Box mt={2} display={'flex'} justifyContent={"center"} gap={3}>
                                <Button>
                                    <img width={50} src="/images/brands/Google.png" />
                                </Button>
                                <Button>
                                    <img width={60} src="/images/brands/Twitter.png" />
                                </Button>
                                <Button>
                                    <img width={40} src="/images/brands/Facebook.png" />
                                </Button>
                            </Box>
                        </form>
                    </Grid2>
                    <Grid2 display={{md: 'block', xs: 'none'}} size={{md: 6}}>
                        <Box height={600} borderRadius={2} display={'flex'} alignItems={"center"} justifyContent={'center'} sx={{ background: `linear-gradient(45deg, ${GREEN3}, ${GREEN2})` }}>
                            <img style={{ width: '90%' }} src="/images/register.png" />
                        </Box>
                    </Grid2>
                </Grid2>
            </Box>
        </Container>
    )
}