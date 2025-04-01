import { Button, Col, ConfigProvider, Flex, Row, Typography } from "antd";
import StatisticBlock from "../../../components/Statistics/StatisticBlock";
import { ClockCircleOutlined, DollarOutlined, DownloadOutlined, MenuOutlined, ShoppingCartOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { defaultShadow } from "../../../config/shadow";
import { GRAY2, GRAY4, GREEN, GREEN5 } from "../../../config/colors";
import SearchInput from "../../../components/Form/SearchInput";
import MedicineCard from "../../../components/Card/Medicine/MedicineCard";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Pagination } from 'antd';

const { Title, Text } = Typography

const InventorySection = () => {

    return (
        <>
            <Flex style={{ marginBottom: 40 }} justify="space-between" align="center">
                <div>
                    <SearchInput model={'Medicines'} />
                </div>
                <Flex gap={8}>
                    <Button type="primary" icon={<MenuOutlined />} style={{ height: '55px', width: '150px', justifyContent: 'flex-start', fontWeight: 500, backgroundColor: '#FFF', borderColor: GRAY4, color: GRAY2 }}>
                        Filters
                    </Button>
                    <FormControl sx={{ width: '200px' }}>
                        <InputLabel id="sort-by-select-label">Sort By</InputLabel>
                        <Select
                            variant="outlined"
                            labelId="sort-by-select-label"
                            id="sort-by-select"
                            label="Sort By"
                            // onChange={handleChange}
                            sx={{ bgcolor: '#FFF' }}
                        >
                            <MenuItem value={10}>Recent</MenuItem>
                            <MenuItem value={20}>Alphabitically</MenuItem>
                            <MenuItem value={30}>Availability</MenuItem>
                            <MenuItem value={30}>Price</MenuItem>
                        </Select>
                    </FormControl>
                </Flex>
            </Flex>
            <Row gutter={20}>
                <Col span={8}>
                    <MedicineCard medicine={{name: 'Testrapotine', weight: 50, unit: 'ml', prescription: 'Required', form: 'Tablet', price: 50.99, quantity: 20}} />
                </Col>
                <Col span={8}>
                    <MedicineCard />
                </Col>
                <Col span={8}>
                    <MedicineCard />
                </Col>
            </Row>

            <Box mt={5}>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: GREEN
                        },
                        components: {
                            Pagination: {
                                itemBg: GREEN5,
                            },
                        },
                    }}
                >
                    <Pagination align="center" onChange={(page) => {console.log(page)}} defaultCurrent={1} pageSize={5} total={16} showSizeChanger={false} />
                </ConfigProvider>
            </Box>
        </>
    )
}

export default InventorySection;