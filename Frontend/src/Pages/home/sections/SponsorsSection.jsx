import { Box, Container, Grid2, Typography } from '@mui/material';
import {styled} from '@mui/system'
import { GRAY0, GREEN, GRAY2, LIGHT_GREEN2 } from "../../../config/colors"

const StyledHeadline = styled('h3')({
    position: 'relative',
    marginTop: '25px',
    marginBottom: '25px',
    '&::after': {
        content: '""',
        position: 'absolute',
        width: '60px',
        height: '3px',
        bottom: '-6px',
        borderRadius: '3px',
        left: 0,
        backgroundColor: GRAY0,
    },
  });

export default function ServicesSection() {
    return (
        <Box sx={{ backgroundColor: LIGHT_GREEN2 }}>
            <Container maxWidth="lg" sx={{ py: "70px" }}>
                <Typography variant="h5" color={GRAY0} textAlign={'center'} component='h2' mb={6}>Our Sponsors</Typography>
                <Grid2 container spacing={4}>
                    <Grid2 size={3}>
                        <img src="/images/brands/EverGreen.png"></img>
                    </Grid2>
                    <Grid2 size={3}>
                        <img src="/images/brands/VitalCare.png"></img>
                    </Grid2>
                    <Grid2 size={3}>
                        <img src="/images/brands/NetScale.png"></img>
                    </Grid2>
                    <Grid2 size={3}>
                        <img src="/images/brands/Compa.png"></img>
                    </Grid2>
                </Grid2>
            </Container>
        </Box>
    )
}