import DoctorNavbar from '../../../components/Navbar/DoctorNavbar';
import { Typography } from 'antd';
import { Container } from '@mui/material';

const {Title} = Typography

function DoctorSimpleLayout({children}) {

    return (
        <>
            <DoctorNavbar />
            <Container maxWidth="xl" sx={{ py: 5 }}>
                {children}
            </Container>
        </>
    )
}

export default DoctorSimpleLayout;