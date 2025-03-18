import { Container, Box, Grid2, Typography, Button, TextField, Link } from "@mui/material"
import { GRAY0, GREEN, GRAY2, GREEN2, GRAY4, GRAY3, GREEN3 } from "../../config/colors"
import zIndex from "@mui/material/styles/zIndex"

export default function LoginForm() {

    return (
        <Container maxWidth="lg" sx={{ pt: 8, display:"flex", alignItems:'center', height: '100vh' }}>
            <Box sx={{ position: 'relative', backgroundColor: '#FFF', width: '100%', borderRadius: '5px', boxShadow: '0px 1px 2px rgba(0, 0, 0, .15)', border: '1px solid rgba(0, 0, 0, .1)' }}>
                <Typography variant="body2" position={"absolute"} top={20} right={30}>
                    Not a member? 
                    <Link sx={{ textDecoration: 'none' }} href="#" color={GREEN} ml={1}>Register now</Link>
                </Typography>
                <Grid2 container spacing={5} p={4} pt={{ xs: 9, md: 4 }} alignItems={"center"}>
                    <Grid2 display={{md: 'block', xs: 'none'}} size={{md: 6}}>
                        <Box py={{md: 13, lg: 10}} borderRadius={2} display={'flex'} justifyContent={'center'} sx={{ background: `linear-gradient(45deg, ${GREEN3}, ${GREEN2})` }}>
                            <img style={{ width: '90%' }} src="/images/login.png" />
                        </Box>
                    </Grid2>
                    <Grid2 size={{md: 6, sm: 12}}>
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
                                    <img src="/images/brands/Google.png" />
                                </Button>
                                <Button>
                                    <img src="/images/brands/Twitter.png" />
                                </Button>
                                <Button>
                                    <img src="/images/brands/Facebook.png" />
                                </Button>
                            </Box>
                        </form>
                    </Grid2>
                </Grid2>
            </Box>
        </Container>
    )
}