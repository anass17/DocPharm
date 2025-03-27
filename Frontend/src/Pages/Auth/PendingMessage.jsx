import { Container, Box, Grid2, Typography, Button, TextField } from "@mui/material"
import { GRAY0, GREEN, GRAY2, GREEN2, GRAY4, GRAY3, GREEN3, GREEN5 } from "../../config/colors"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"

export default function PendingMessage() {

  const user = useSelector(data => data.user.user)

  if (!user) {
    return;
  }

  return (
    <>
      <Container maxWidth="lg" sx={{ pt: 8, display:"flex", alignItems:'center', height: '100vh' }}>
            <Box py={{xs: 7, md: 10 }} px={{ xs: 3, md: 10 }} textAlign={"center"} sx={{ position: 'relative', backgroundColor: '#FFF', width: '100%', borderRadius: '5px', boxShadow: '0px 1px 2px rgba(0, 0, 0, .15)', border: '1px solid rgba(0, 0, 0, .1)' }}>
                <Typography variant="h4" component="h1" mb={5}>Hello {user.first_name}!</Typography>
                <Typography variant="body1" mb={5}>Thank you for registering in DocPharm platform, we have received your registration request, and we will activate your account once an admin approve it</Typography>
                <Link to="/logout">
                    <Button sx={{ bgcolor: GREEN, py: 1, px: 5, color: '#FFF' }}>Logout</Button>
                </Link>
            </Box>
        </Container>
    </>

  )
}