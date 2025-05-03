import { Box, Drawer, Typography } from "@mui/material";
import { Col, ConfigProvider, Input, message, Pagination, Row, Select, Tabs } from "antd";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import { backend_url } from "../../../config/app";
import Cookies from 'js-cookie'
import UserDisplayDetailsCard from "../../../components/Card/Users/UserDisplayDetailsCard";
import { GREEN, LIGHT_BLUE } from "../../../config/colors";
import UserDisplayDetailsDrawer from "../../../components/Drawer/Users/UserDisplayDetailsDrawer";
import { FaSearch } from "react-icons/fa";
import UserDisplayDetailsCardLoading from "../../../components/Card/Users/UserDisplayDetailsCardLoading";
import MedicineCardLoading from "../../../components/Card/Medicine/MedicineCardLoading";
import MedicineCard from "../../../components/Card/Medicine/MedicineCard";
import AdminMedicineCard from "../../../components/Card/Medicine/AdminMedicineCard";

const MedicineManagementSection = () => {

    const [type, setType] = useState('All')
    const [loading, setLoading] = useState(true)
    const [medicines, setMedicines] = useState([])
    const [itemsPerPage, setItemsPerPage] = useState(1);
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('newest_first')
    const [total, setTotal] = useState(1)
    const [messageApi, contextHolder] = message.useMessage();

    const info = (message) => {
        messageApi.open({
            type: 'error',
            content: message,
            duration: 5
        });
    };


    const handleDeleteMedicine = (id) => {
        setMedicines(
            medicines.filter((item) => item.id !== id)
        )
    }

    const handlePageChange = (page) => {
        setPage(page)
    }

    let typingDelay = null

    const handleSearchChange = (e) => {

        if (typingDelay) {
            clearTimeout(typingDelay);
        }

        typingDelay = setTimeout(() => {
            setSearch(e.target.value)
        }, 200)
        
    }

    const handleSortChange = (value) => {
        setSort(value)
    }

    const getUsers = async () => {

        setLoading(true);
        
        try {
        
            const response = await fetch(`${backend_url}/api/medicines?page=${page}&search=${search}&sort=${sort}`, {
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('auth_token'),
                }
            });

            if (response.status === 403) {
                info('You are not authorized to view this data');
            } else if (response.status === 200) {

                let responseData = await response.json();

                setMedicines(responseData.medicines.data);
                setTotal(responseData.medicines.total)
                setItemsPerPage(responseData.medicines.per_page)
            } else {
                info('Something went wrong! Could not load this data');
            }
        } catch (error) {
            console.log(error)
            info('Something went wrong! Could not load this data');
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getUsers()
    }, [type, page, search, sort])

    return (
        <>
            {contextHolder}
            <Box sx={{ bgcolor: '#FFF', boxShadow: '0px 1px 2px rgba(0, 0, 0, .2)', borderRadius: '7px', p: 4, mb: 3 }}>
                <Title level={2}>Medicine Management</Title>
                <Row gutter={[10, 20]} style={{ margin: '2rem 0' }}>
                    <Col span={20}>
                        <Input size="large" prefix={<FaSearch style={{ marginRight: 10 }} />} placeholder="Search for ..." onChange={handleSearchChange}/>
                    </Col>
                    <Col span={4}>
                        <Select placeholder='Sort By' size="large" value={sort} style={{ width: '100%' }}
                            onChange={handleSortChange} 
                            options={[
                                {value: 'newest_first', label: 'Newest First'},
                                {value: 'oldest_first', label: 'Oldest First'},
                            ]}
                        />
                    </Col>
                </Row>
            </Box>
            <Row gutter={[14, 14]}>
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
                                        <AdminMedicineCard medicine={item} onDeleteMedicine={handleDeleteMedicine} />
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

export default MedicineManagementSection;