import PharmacyNavbar from '../../../components/Navbar/PharmacyNavbar';
import { Typography } from 'antd';
import { Container } from '@mui/material';

const {Title} = Typography

function PharmacySimpleLayout({children}) {

    return (
        <>
            <PharmacyNavbar />
            <Container maxWidth="xl" sx={{ py: 5 }}>
                {children}
            </Container>
        </>
    )
}

export default PharmacySimpleLayout;