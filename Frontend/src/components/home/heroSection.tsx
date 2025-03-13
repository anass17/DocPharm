import { Container, Box, Grid2, Typography, Button } from "@mui/material"
import { DARK_GRAY0, DARK_GREEN, DARK_GRAY2, LIGHT_GREEN1, LIGHT_GREEN2 } from "../../config/colors"

export default function HeroSection() {

    return (
        <Box style={{backgroundImage: `linear-gradient(${LIGHT_GREEN1 + '60'}, #fff)`}}>
            <Container maxWidth="lg" sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
                <Grid2 container spacing={2}>
                    <Grid2 size={6} alignItems='center' display='flex'>
                        <Box>
                            <Typography variant="h4" color={DARK_GRAY0} component='h1' mb={5}>Your Health Is Our Top Priority</Typography>
                            <Typography variant="body1" mb={3} color={DARK_GRAY2}>
                                Find the best doctors, medicines, and healthcare services all in one place. We're here to make healthcare accessible and convenient for you.
                            </Typography>
                            <Grid2 container spacing={1}>
                                <Button sx={{ backgroundColor: DARK_GREEN, color: '#FFF', px: '25px', py: '10px' }}>
                                    Our Services
                                </Button>
                                <Button sx={{ borderColor: LIGHT_GREEN1, borderWidth: '2px', borderStyle: 'solid', color: LIGHT_GREEN1, px: '25px', py: '10px' }}>
                                    Get Started
                                </Button>
                            </Grid2>
                        </Box>
                    </Grid2>
                    <Grid2 size={6}>
                        <img src="/images/home_herosection.png" style={{maxWidth: '100%', marginLeft: 'auto', display: 'block'}}></img>
                    </Grid2>
                </Grid2>
            </Container>
        </Box>
    )
}