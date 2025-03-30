import { Container, Box, Grid2, Typography, Button, TextField } from "@mui/material"
import { GRAY0, GREEN, GRAY2, GREEN2, GRAY4, GRAY3, GREEN3, GREEN5 } from "../../config/colors"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { backend_url } from "../../config/app";
import Cookies from 'js-cookie';
import { loginUser } from "../../store/actions";

export default function LoginForm() {

    const [data, setData] = useState({email: '', password: ''});
    const [errors, setErrors] = useState(null)
    const [submit, setSubmit] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(data => data.user.user)

    function handleChange(e) {
        const {name, value} = e.target;

        setData({
            ...data,
            [name]: value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setSubmit(true);
    
        try {
            const response = await fetch(backend_url + '/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            const responseData = await response.json();
    
            if (response.status === 401) {
                setErrors('Incorrect Login Credentials')
                setData({
                    ...data,
                    password: ''
                })
                setSubmit(false);
            } else if (response.status === 200) {
                dispatch(loginUser(responseData.user))
                Cookies.set('auth_token', responseData.token, { expires: 1, path: '' });
                navigate('/dashboard');
            } else {
                setErrors('An unexpected error occurred.')
                setData({
                    ...data,
                    password: ''
                })
                setSubmit(false);
            }
        } catch (error) {
            setErrors('An error occurred while processing your request.')
            setData({
                ...data,
                password: ''
            })
            setSubmit(false);
        }
    }

    return (
        <Container maxWidth="lg" sx={{ pt: 8, display:"flex", alignItems:'center', height: '100vh' }}>
            <Box sx={{ position: 'relative', backgroundColor: '#FFF', width: '100%', borderRadius: '5px', boxShadow: '0px 1px 2px rgba(0, 0, 0, .15)', border: '1px solid rgba(0, 0, 0, .1)' }}>
                <Typography variant="body2" position={"absolute"} bottom={25} right={30}>
                    Not a member? 
                    <Link style={{ textDecoration: 'none', marginLeft: '0.25rem', color: GREEN }} to="/register">Register now</Link>
                </Typography>
                <Grid2 container spacing={5} p={4} pb={{ xs: 7, md: 4 }} alignItems={"center"}>
                    <Grid2 display={{md: 'block', xs: 'none'}} size={{md: 6}}>
                        <Box py={{md: 6, lg: 3}} borderRadius={2} display={'flex'} justifyContent={'center'} sx={{ background: `linear-gradient(45deg, ${GREEN5}, ${GREEN3})` }}>
                            <img style={{ width: '90%' }} src="/images/login.png" />
                        </Box>
                    </Grid2>
                    <Grid2 size={{md: 6, xs: 12}}>
                        <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
                            <Typography variant="h4" component="h1" mb={1}>Welcome There</Typography>
                            <Typography variant="body1" mb={5}>Log into your account and see what you missed</Typography>
                            
                            <TextField label="Email" name="email" value={data.email} error={!!errors} onChange={handleChange} helperText={errors} variant="outlined" sx={{ marginBottom: '7px', backgroundColor: '#F9F9F9' }} fullWidth />
                            <TextField label="Password" name="password" value={data.password} onChange={handleChange} type="password" variant="outlined" sx={{ backgroundColor: '#F9F9F9' }} fullWidth />
                            
                            <Box mt={2} display="flex" justifyContent={"space-between"} alignItems={"center"}>
                                {
                                    !submit ?
                                    (
                                        <Button variant="contained" type="submit" sx={{ bgcolor: GREEN, py: 1, px: 5 }}>
                                            Log in
                                        </Button>
                                    ) : (
                                        <Button loading variant="outlined" type="button" sx={{ py: 1, px: 5 }}>
                                            Log in
                                        </Button>   
                                    )
                                }
                                <Button variant="text" sx={{ color: GREEN }}>Reset Password</Button>
                            </Box>

                            <Box position={"relative"} mt={6}>
                                <Typography variant="body1" component="h6" bgcolor={"#FFF"} zIndex={10} color={GRAY3} position={"relative"} display={"inline-block"} px={2}>Or Continue With</Typography>
                                <Box height={'1px'} width={"100%"} bgcolor={GRAY4} position={"relative"} bottom={11}></Box>
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
                </Grid2>
            </Box>
        </Container>
    )
}