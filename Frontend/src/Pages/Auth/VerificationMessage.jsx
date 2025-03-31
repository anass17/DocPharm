import { Container, Box, Grid2, Typography, Button, TextField, Link } from "@mui/material"
import { GRAY0, GREEN, GRAY2, GREEN2, GRAY4, GRAY3, GREEN3, GREEN5 } from "../../config/colors"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export default function VerificationMessage() {

  const user = useSelector(data => data.user.user)

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 5, display:"flex", alignItems:'center', height: '100vh' }}>
            <Box py={{xs: 7, md: 10 }} px={{ xs: 3, md: 10 }} textAlign={"center"} sx={{ position: 'relative', backgroundColor: '#FFF', width: '100%', borderRadius: '5px', boxShadow: '0px 1px 2px rgba(0, 0, 0, .15)', border: '1px solid rgba(0, 0, 0, .1)' }}>
                <Typography variant="h4" component="h1" mb={5}>Welcome to Our Community</Typography>
                <Typography variant="body1" mb={5}>We have sent you a verification email to <Typography display={"inline"} fontWeight={700} color="#00A2ED" component={"span"}>{user?.email || "{email}"}</Typography>. Please check your inbox and click on the link to proceed. If you can't find the email please check your spam folder.</Typography>
                <Typography variant="body1" mb={5}>Otherwise request a new verification email.</Typography>
                <Button variant="contained" sx={{ bgcolor: GREEN, py: 1, px: 5 }}>Send Verification Again</Button>
            </Box>
        </Container>
    </>

  )
}