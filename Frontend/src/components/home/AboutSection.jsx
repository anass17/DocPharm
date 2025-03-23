import { Container, Box, Grid2, Typography, Button } from "@mui/material"
import { GRAY0, GREEN, GRAY2 } from "../../config/colors"

export default function AboutSection() {

    return (
        <Box>
            <Container maxWidth="lg" sx={{py: "70px", display: 'flex', alignItems: 'center' }}>
                <Grid2 container spacing={4}>
                    <Grid2 size={6}>
                        <img src="/images/home_about_section.png" style={{maxWidth: '100%'}}></img>
                    </Grid2>
                    <Grid2 size={6} alignItems='center' display='flex'>
                        <Box>
                            <Typography variant="h5" color={GRAY0} component='h2' mb={5}>About MediCare</Typography>
                            <Typography variant="body1" mb={3} color={GRAY2}>
                                We're committed to providing accessible healthcare solutions to everyone. With our network of qualified doctors, pharmacies, and healthcare services, we ensure that quality healthcare is just a click away.
                            </Typography>
                            <Grid2 container spacing={2}>
                                <Grid2 size={6} display="flex" gap={2}>
                                    <svg xmlns="http://www.w3.org/2000/svg" style={{ fill: GREEN, width: '20px' }} viewBox="0 0 448 512">
                                        {/* Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. */}
                                        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-96 55.2C54 332.9 0 401.3 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7c0-81-54-149.4-128-171.1l0 50.8c27.6 7.1 48 32.2 48 62l0 40c0 8.8-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l0-24c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 24c8.8 0 16 7.2 16 16s-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16l0-40c0-29.8 20.4-54.9 48-62l0-57.1c-6-.6-12.1-.9-18.3-.9l-91.4 0c-6.2 0-12.3 .3-18.3 .9l0 65.4c23.1 6.9 40 28.3 40 53.7c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7l0-59.1zM144 448a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"/>
                                    </svg>
                                    <Typography>+1300 Doctor</Typography>
                                </Grid2>
                                <Grid2 size={6} display="flex" gap={2}>
                                    <svg xmlns="http://www.w3.org/2000/svg" style={{ fill: GREEN, width: '20px' }} viewBox="0 0 576 512">
                                        {/* <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--> */}
                                        <path d="M142.4 21.9c5.6 16.8-3.5 34.9-20.2 40.5L96 71.1 96 192c0 53 43 96 96 96s96-43 96-96l0-120.9-26.1-8.7c-16.8-5.6-25.8-23.7-20.2-40.5s23.7-25.8 40.5-20.2l26.1 8.7C334.4 19.1 352 43.5 352 71.1L352 192c0 77.2-54.6 141.6-127.3 156.7C231 404.6 278.4 448 336 448c61.9 0 112-50.1 112-112l0-70.7c-28.3-12.3-48-40.5-48-73.3c0-44.2 35.8-80 80-80s80 35.8 80 80c0 32.8-19.7 61-48 73.3l0 70.7c0 97.2-78.8 176-176 176c-92.9 0-168.9-71.9-175.5-163.1C87.2 334.2 32 269.6 32 192L32 71.1c0-27.5 17.6-52 43.8-60.7l26.1-8.7c16.8-5.6 34.9 3.5 40.5 20.2zM480 224a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"/>
                                    </svg>
                                    <Typography>+25 Speciality</Typography>
                                </Grid2>
                                <Grid2 size={6} display="flex" gap={2}>
                                    <svg xmlns="http://www.w3.org/2000/svg" style={{ fill: GREEN, width: '20px' }} viewBox="0 0 576 512">
                                        {/* <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--> */}
                                        <path d="M543.8 287.6c17 0 32-14 32-32.1c1-9-3-17-11-24L309.5 7c-6-5-14-7-21-7s-15 1-22 8L10 231.5c-7 7-10 15-10 24c0 18 14 32.1 32 32.1l32 0 0 160.4c0 35.3 28.7 64 64 64l320.4 0c35.5 0 64.2-28.8 64-64.3l-.7-160.2 32 0zM256 208c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 48 48 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-48 0 0 48c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-48-48 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l48 0 0-48z"/>
                                    </svg>
                                    <Typography>+200 Pharmacy</Typography>
                                </Grid2>
                                <Grid2 size={6} display="flex" gap={2}>
                                    <svg xmlns="http://www.w3.org/2000/svg" style={{ fill: GREEN, width: '20px' }} viewBox="0 0 576 512">
                                        {/* <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--> */}
                                        <path d="M112 96c-26.5 0-48 21.5-48 48l0 112 96 0 0-112c0-26.5-21.5-48-48-48zM0 144C0 82.1 50.1 32 112 32s112 50.1 112 112l0 224c0 61.9-50.1 112-112 112S0 429.9 0 368L0 144zM554.9 399.4c-7.1 12.3-23.7 13.1-33.8 3.1L333.5 214.9c-10-10-9.3-26.7 3.1-33.8C360 167.7 387.1 160 416 160c88.4 0 160 71.6 160 160c0 28.9-7.7 56-21.1 79.4zm-59.5 59.5C472 472.3 444.9 480 416 480c-88.4 0-160-71.6-160-160c0-28.9 7.7-56 21.1-79.4c7.1-12.3 23.7-13.1 33.8-3.1L498.5 425.1c10 10 9.3 26.7-3.1 33.8z"/>
                                    </svg>
                                    <Typography>+2000 Medicine</Typography>
                                </Grid2>
                            </Grid2>
                        </Box>
                    </Grid2>
                </Grid2>
            </Container>
        </Box>
    )
}