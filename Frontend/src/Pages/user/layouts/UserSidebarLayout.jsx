import { Container, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import UserNavbar from '../../../components/Navbar/UserNavbar';
import { Flex, Typography } from 'antd';

const {Title} = Typography

function UserSidebarLayout({Sidebar, children, title}) {

    return (
        <>
            <UserNavbar />
            <Container maxWidth="xl" sx={{ gap: '2rem', display: "flex", py: 3 }}>
                <Sidebar />
                <div style={{ padding: "0.5rem 0", flex: 1 }}>
                    <Flex justify='space-between' align='center' style={{ marginBottom: '55px' }}>
                        <Title level={1} style={{ marginBottom: 0 }}>{title}</Title>
                        <FormControl sx={{ width: '200px' }} size='small'>
                            <InputLabel id="sort-by-select-label">Sort By</InputLabel>
                            <Select
                                variant="outlined"
                                labelId="sort-by-select-label"
                                id="sort-by-select"
                                label="Sort By"
                                value={'recent'}
                                // onChange={handleSelectChange}
                                sx={{ bgcolor: '#FFF' }}
                            >
                                <MenuItem value={'recent'}>Recent</MenuItem>
                                <MenuItem value={'alphabitically'}>Alphabitically</MenuItem>
                                <MenuItem value={'price'}>Price</MenuItem>
                            </Select>
                        </FormControl>
                    </Flex>
                    {children}
                </div>
            </Container>
        </>
    )
}

export default UserSidebarLayout;