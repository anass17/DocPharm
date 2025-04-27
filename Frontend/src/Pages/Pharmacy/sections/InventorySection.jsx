import { Col, ConfigProvider, Flex, message, Row, Spin, Typography } from "antd";
import { GRAY2, GRAY4, GREEN, GREEN5, LIGHT_BLUE, PRIMARY_BLUE } from "../../../config/colors";
import SearchInput from "../../../components/Form/SearchInput";
import MedicineCard from "../../../components/Card/Medicine/MedicineCard";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Pagination } from 'antd';
import { useEffect, useState } from "react";
import { backend_url } from "../../../config/app";
import Cookies from 'js-cookie';
import MedicineCardLoading from "../../../components/Card/Medicine/MedicineCardLoading";

const { Title, Text } = Typography

const InventorySection = () => {

    const [submit, setSubmit] = useState(false);
    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(1);
    const [sorting, setSorting] = useState("recent");
    const [search, setSearch] = useState("");
    const [messageApi, contextHolder] = message.useMessage();

    const info = (message) => {
        messageApi.open({
            type: 'error',
            content: message,
            duration: 5
        });
    };

    let controller = new AbortController();

    const handleUpdateMedicine = (id, quantity, visibility) => {
        console.log(id, quantity, visibility)
        setMedicines(
            medicines.map((item) => item.id === id ? {...item, medicine_quantity: quantity, visibility: visibility} : item)
        )
    }

    const handlePageChange = (page) => {
        getMedicines(page)
    }

    const handleSelectChange = (e) => {
        setSorting(e.target.value)
    }

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const getMedicines = async (page = 1) => {
        
        if (controller) {
            controller.abort();
        }
        controller = new AbortController();
        const signal = controller.signal;

        setSubmit(true);
        setLoading(true);
        
        try {

            const response = await fetch(`${backend_url}/api/pharmacy/medicines?page=${page}&sort=${sorting}&search=${search}`, {
                signal,
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('auth_token'),
                }
            });
    
            const responseData = await response.json();
    
            if (response.status === 401) {
                info('You are not authorized to view this data');
            } else if (response.status === 200) {
                setMedicines(responseData.medicines.data);
                setTotal(responseData.medicines.total)
                setItemsPerPage(responseData.medicines.per_page)
            } else {
                info('Something went wrong! Could not load this data');
            }
            setLoading(false)
        } catch (error) {
            if (error.name !== 'AbortError') {
                info('Something went wrong! Could not load this data');
            }
        }
    }

    useEffect(() => {
        getMedicines()

        return () => {
            if (controller) {
                controller.abort();
            }
        };
    }, [submit, sorting, search])

    return (
        <>
            {contextHolder}
            <Flex style={{ marginBottom: 40 }} justify="space-between" align="center">
                <div style={{ maxWidth: '420px', width: '100%' }}>
                    <SearchInput onchange={handleChange} model={'Medicines'} />
                </div>

                <Flex gap={8}>
                    <FormControl sx={{ width: '200px' }} size="small">
                        <InputLabel id="sort-by-select-label">Sort By</InputLabel>
                        <Select
                            variant="outlined"
                            labelId="sort-by-select-label"
                            size="large"
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
            <Row gutter={[20, 20]}>
                {
                    loading ? (
                        Array(6).fill('').map((_, index) => {
                            return (
                                <Col span={8} key={index}>
                                    <MedicineCardLoading />
                                </Col>
                            )
                        })
                    ) : (
                        medicines.length === 0 ? (
                            <Col span={24}>
                                <Title level={5} style={{ textAlign: 'center', padding: '2rem 0 0.5rem' }}>You don't have any medicines</Title>
                            </Col>
                        ) : (
                            medicines.map((item, index) => {
                                return (
                                    <Col span={8} key={"medicine-" + index}>
                                        <MedicineCard medicine={item} handleUpdateMedicine={handleUpdateMedicine} />
                                    </Col>
                                )
                            })
                        )
                    )
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
                                itemBg: LIGHT_BLUE,
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