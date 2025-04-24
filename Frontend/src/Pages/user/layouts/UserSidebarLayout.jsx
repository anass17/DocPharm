import { Container, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import UserNavbar from '../../../components/Navbar/UserNavbar';
import { Col, Flex, Row, Typography } from 'antd';

const {Title} = Typography

function UserSidebarLayout({filters, setFilters, Sidebar, children, title, sorting, setSorting, sortOptions = null}) {

    return (
        <>
            <UserNavbar />
            <Container maxWidth="xl" sx={{py: 3 }}>
                <Row gutter={22}>
                    <Col xs={6}>
                        <Sidebar filters={filters} setFilters={setFilters} />
                    </Col>
                    <Col xs={18}>
                        <div style={{ padding: "0.5rem 0", flex: 1 }}>
                            <Flex justify='space-between' align='center' style={{ marginBottom: '45px' }}>
                                <Title level={1} style={{ marginBottom: 0 }}>{title}</Title>
                                {
                                    sortOptions ? (
                                        <FormControl sx={{ width: '200px' }} size='small'>
                                            <InputLabel id="sort-by-select-label">Sort By</InputLabel>
                                            <Select
                                                variant="outlined"
                                                labelId="sort-by-select-label"
                                                id="sort-by-select"
                                                label="Sort By"
                                                value={sorting}
                                                onChange={(e) => setSorting(e.target.value)}
                                                sx={{ bgcolor: '#FFF' }}
                                            >
                                                {
                                                    sortOptions.map((item, index) => <MenuItem value={item.toLowerCase()}>{item}</MenuItem>)
                                                }
                                            </Select>
                                        </FormControl>
                                    ) : null
                                }
                                
                            </Flex>
                            {children}
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default UserSidebarLayout;