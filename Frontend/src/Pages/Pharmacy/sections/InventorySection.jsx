import { Button, Col, ConfigProvider, Flex, Row, Typography } from "antd";
import StatisticBlock from "../../../components/Statistics/StatisticBlock";
import { ClockCircleOutlined, DollarOutlined, DownloadOutlined, MenuOutlined, ShoppingCartOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { defaultShadow } from "../../../config/shadow";
import { GRAY2, GRAY4, GREEN, GREEN5 } from "../../../config/colors";
import SearchInput from "../../../components/Form/SearchInput";
import MedicineCard from "../../../components/Card/Medicine/MedicineCard";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Pagination } from 'antd';
import { useEffect, useState } from "react";
import { backend_url } from "../../../config/app";
import Cookies from 'js-cookie';

const { Title, Text } = Typography

const InventorySection = () => {

    const [submit, setSubmit] = useState(false);
    const [medicines, setMedicines] = useState([]);
    const [total, setTotal] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(1);
    const [sorting, setSorting] = useState("recent");

    const handlePageChange = (page) => {
        getMedicines(page)
    }

    const handleSelectChange = (e) => {
        setSorting(e.target.value)
    }

    const getMedicines = async (page = 1) => {
        setSubmit(true);
        try {

            const response = await fetch(`${backend_url}/api/medicines?page=${page}&sort=${sorting}`, {
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('auth_token'),
                }
            });
    
            const responseData = await response.json();
    
            if (response.status === 401) {
                alert('Unauth')
            } else if (response.status === 200) {
                setMedicines(responseData.medicines.data);
                setTotal(responseData.medicines.total)
                setItemsPerPage(responseData.medicines.per_page)
            } else {
                alert('Error-0')
            }
        } catch (error) {
            alert('Error')
        }
    }

    useEffect(() => {
        getMedicines()
    }, [submit, sorting])

    return (
        <>
            <Flex style={{ marginBottom: 40 }} justify="space-between" align="center">
                <div>
                    <SearchInput model={'Medicines'} />
                </div>
                <Flex gap={8}>
                    <FormControl sx={{ width: '200px' }} size="small">
                        <InputLabel id="sort-by-select-label">Sort By</InputLabel>
                        <Select
                            variant="outlined"
                            labelId="sort-by-select-label"
                            id="sort-by-select"
                            label="Sort By"
                            value={sorting}
                            onChange={handleSelectChange}
                            sx={{ bgcolor: '#FFF' }}
                        >
                            <MenuItem value={'recent'}>Recent</MenuItem>
                            <MenuItem value={'alphabitically'}>Alphabitically</MenuItem>
                            <MenuItem value={'availability'}>Availability</MenuItem>
                            <MenuItem value={'price'}>Price</MenuItem>
                        </Select>
                    </FormControl>
                </Flex>
            </Flex>
            <Row gutter={20}>
                {
                    medicines.map((item, index) => {
                        return (
                            <Col span={8} key={"medicine-" + index}>
                                <MedicineCard medicine={item} />
                            </Col>
                        )
                    })
                }
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
                    <Pagination align="center" onChange={handlePageChange} defaultCurrent={1} pageSize={itemsPerPage} total={total} showSizeChanger={false} />
                </ConfigProvider>
            </Box>
        </>
    )
}

export default InventorySection;