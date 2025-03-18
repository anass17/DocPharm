import { Container, Box, Grid2, Typography, Button, TextField, Link, Select, InputLabel, MenuItem, FormControl, Input } from "@mui/material"
import { GRAY0, GREEN, GRAY2, GREEN2, GRAY4, GRAY3, GREEN3 } from "../../config/colors"
import FormDivisor from "./FormDivisor"
import { CloudUpload } from "@mui/icons-material"
import FileUploadInput from "./FileUploadInput"

export default function RegisterForm() {

    return (
        <Container maxWidth="lg" sx={{ pb: 4, pt: 12, display:"flex", alignItems:'center', minHeight: '100vh' }}>
            <Box py={6} px={{md: 5, xs: 4}} sx={{ position: 'relative', backgroundColor: '#FFF', width: '100%', borderRadius: '5px', boxShadow: '0px 1px 2px rgba(0, 0, 0, .15)', border: '1px solid rgba(0, 0, 0, .1)' }}>
                <Typography variant="h4" component="h1" textAlign={"center"} mb={2}>Welcome Mr. Anass Boutaib</Typography>
                <Typography variant="body1" textAlign={"center"} color={GRAY2} mb={5}>Please complete the registration process by providing the following details</Typography>
                
                <Box textAlign={"center"}>
                    <Box display={"inline-block"} position={"relative"}>
                        <Box height={4} width={200} bgcolor={GREEN}></Box>
                        <Box width={18} height={18} bgcolor={GREEN} border={"3px solid" + GREEN} position={"absolute"} borderRadius={"50%"} top={-10} left={0}>
                            <Typography position={"absolute"} left={9} top={30} sx={{ transform: 'translateX(-50%)' }} color={GREEN} fontWeight={500}>Verification</Typography>
                        </Box>
                        <Box width={18} height={18} bgcolor={"#FFF"} border={"3px solid" + GREEN} position={"absolute"} borderRadius={"50%"} top={-10} right={0}>
                            <Typography position={"absolute"} left={9} top={30} sx={{ transform: 'translateX(-50%)' }} color="#aeacb6" fontWeight={500}>Preferences</Typography>
                        </Box>
                    </Box>
                </Box>
                
                <form style={{ textAlign: 'center', marginTop: 75 }}>
                    <Grid2 container spacing={5}>
                        <Grid2 size={{md: 6, xs: 12}}>

                            <FormDivisor>Personal Verification</FormDivisor>

                            <FileUploadInput format="JPG, PNG, WEBP" description="CNE (Front)" />
                            <FileUploadInput format="JPG, PNG, WEBP" description="CNE (Back)" />

                        </Grid2>
                        <Grid2 size={{md: 6, xs: 12}}>
                        
                            <FormDivisor>Business Verification</FormDivisor>

                            <TextField label="Medical License Number" variant="outlined" sx={{ marginBottom: 2, backgroundColor: '#F9F9F9' }} fullWidth />

                            <FileUploadInput format="JPG, PNG, WEBP" description="CNE (Back)" />
                            <FileUploadInput format="JPG, PNG, WEBP" description="CNE (Back)" />

                        </Grid2>
                    </Grid2>
                    <Box mt={2} display="flex" justifyContent={"center"} alignItems={"center"}>
                        <Button variant="contained" sx={{ bgcolor: GREEN, py: 1, px: 5 }}>Next</Button>
                    </Box>
                </form>
            </Box>
        </Container>
    )
}