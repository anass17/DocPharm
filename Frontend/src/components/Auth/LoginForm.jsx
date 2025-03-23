import { Container, Box, Grid2, Typography, Button, TextField } from "@mui/material"
import { GRAY0, GREEN, GRAY2, GREEN2, GRAY4, GRAY3, GREEN3, GREEN5 } from "../../config/colors"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function LoginForm() {

    const navigate = useNavigate();
    const user = useSelector(data => data.user.user)

    useEffect(() => {
        if (user) {
            if (user.email_verified_at == null) {
                navigate('/verifyEmail');
            } else {
                navigate('/');
            }
        }
    })

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
                        <form style={{ textAlign: 'center' }}>
                            <Typography variant="h4" component="h1" mb={1}>Welcome There</Typography>
                            <Typography variant="body1" mb={5}>Log into your account and see what you missed</Typography>
                            <TextField label="Email" variant="outlined" sx={{ marginBottom: '7px', backgroundColor: '#F9F9F9' }} fullWidth />
                            <TextField label="Password" type="password" variant="outlined" sx={{ backgroundColor: '#F9F9F9' }} fullWidth />
                            <Box mt={2} display="flex" justifyContent={"space-between"} alignItems={"center"}>
                                <Button variant="contained" sx={{ bgcolor: GREEN, py: 1, px: 5 }}>Log in</Button>
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
                </Grid2>
            </Box>
        </Container>
    )
}