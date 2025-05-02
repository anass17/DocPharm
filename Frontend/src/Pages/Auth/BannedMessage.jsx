import { Container, Box, Typography, Button } from "@mui/material"
import { GREEN } from "../../config/colors"
import { Link } from "react-router-dom"

export default function BannedMessage() {

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 5, display:"flex", alignItems:'center', height: '100vh' }}>
            <Box py={{xs: 7, md: 10 }} px={{ xs: 3, md: 10 }} textAlign={"center"} sx={{ position: 'relative', backgroundColor: '#FFF', width: '100%', borderRadius: '5px', boxShadow: '0px 1px 2px rgba(0, 0, 0, .15)', border: '1px solid rgba(0, 0, 0, .1)' }}>
                <Typography variant="h4" component="h1" mb={5}>Access Denied!</Typography>
                <Typography variant="body1" mb={5}>You are banned from using the DocPharm platform due to a violation of our guidelines. If you believe this is a mistake, please contact an admin.</Typography>
                <Link to="/logout">
                    <Button sx={{ bgcolor: GREEN, py: 1, px: 5, color: '#FFF' }}>Logout</Button>
                </Link>
            </Box>
        </Container>
    </>

  )
}