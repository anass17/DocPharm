import UserNavbar from '../../../components/Navbar/UserNavbar';
import { Typography } from 'antd';
import { Container } from '@mui/material';

const {Title} = Typography

function UserSimpleLayout({children}) {

    return (
        <>
            <UserNavbar />
            <Container maxWidth="xl" sx={{ py: 5 }}>
                {children}
            </Container>
        </>
    )
}

export default UserSimpleLayout;