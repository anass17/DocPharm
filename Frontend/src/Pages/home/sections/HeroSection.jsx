import { Container, Box, Grid2, Typography, Button } from "@mui/material"
import { GRAY0, GREEN, GRAY2, GREEN2} from "../../../config/colors"
import { Col, Flex, Row } from "antd"

export default function HeroSection() {

    return (
        <Box style={{backgroundImage: `linear-gradient(${GREEN2 + '60'}, #fff)`}}>
            <Container maxWidth="lg" sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
                <Row gutter={[16, 20]}>
                    <Col xs={24} lg={12} style={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ textAlign: {xs: 'center', lg: 'left'}, paddingBottom: {xs: 10, lg: 0} }}>
                            <Typography variant="h4" color={GRAY0} component='h1' mb={5}>Your Health Is Our Top Priority</Typography>
                            <Typography variant="body1" mb={3} color={GRAY2}>
                                Find the best doctors, medicines, and healthcare services all in one place. We're here to make healthcare accessible and convenient for you.
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: { xs: 'center', lg: 'flex-start' } }} gap={1}>
                                <Button sx={{ backgroundColor: GREEN, color: '#FFF', px: '25px', py: '10px' }}>
                                    Our Services
                                </Button>
                                <Button sx={{ borderColor: GRAY2, borderWidth: '2px', borderStyle: 'solid', color: GRAY2, px: '25px', py: '10px' }}>
                                    Get Started
                                </Button>
                            </Box>
                        </Box>
                    </Col>
                    <Col xs={0} lg={12}>
                        <img src="/images/home_herosection.png" style={{maxWidth: '100%', marginLeft: 'auto', display: 'block'}}></img>
                    </Col>
                </Row>
            </Container>
        </Box>
    )
}