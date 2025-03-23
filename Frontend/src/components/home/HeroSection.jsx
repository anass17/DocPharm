import { Container, Box, Grid2, Typography, Button } from "@mui/material"
import { GRAY0, GREEN, GRAY2, GREEN2} from "../../config/colors"

export default function HeroSection() {

    return (
        <Box style={{backgroundImage: `linear-gradient(${GREEN2 + '60'}, #fff)`}}>
            <Container maxWidth="lg" sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
                <Grid2 container spacing={2}>
                    <Grid2 size={6} alignItems='center' display='flex'>
                        <Box>
                            <Typography variant="h4" color={GRAY0} component='h1' mb={5}>Your Health Is Our Top Priority</Typography>
                            <Typography variant="body1" mb={3} color={GRAY2}>
                                Find the best doctors, medicines, and healthcare services all in one place. We're here to make healthcare accessible and convenient for you.
                            </Typography>
                            <Grid2 container spacing={1}>
                                <Button sx={{ backgroundColor: GREEN, color: '#FFF', px: '25px', py: '10px' }}>
                                    Our Services
                                </Button>
                                <Button sx={{ borderColor: GREEN2, borderWidth: '2px', borderStyle: 'solid', color: GREEN2, px: '25px', py: '10px' }}>
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