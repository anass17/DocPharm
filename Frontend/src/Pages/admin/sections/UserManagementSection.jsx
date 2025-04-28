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

  const items = [
    {
      key: '1',
      label: 'All',
    },
    {
      key: '2',
      label: 'Clients',
    },
    {
      key: '3',
      label: 'Doctors',
    },
    {
      key: '4',
      label: 'Pharmacies',
    },
    {
      key: '5',
      label: 'Admins',
    },
  ];

const UserManagementSection = () => {

    const [type, setType] = useState('All')
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])
    const [itemsPerPage, setItemsPerPage] = useState(1);
    const [page, setPage] = useState(1)
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('')
    const [total, setTotal] = useState(1)
    const [selected, setSelected] = useState(null)
    const [messageApi, contextHolder] = message.useMessage();

    const info = (message) => {
        messageApi.open({
            type: 'error',
            content: message,
            duration: 5
        });
    };


    const onChange = key => {
        setType(key);
    };

    const handlePageChange = (page) => {
        setPage(page)
    }

    const handleUserSelect = (user) => {
        setOpen(true);
        setSelected(user)
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

    const getUsers = async () => {

        setLoading(true);
        
        try {

            const response = await fetch(`${backend_url}/api/users?type=${type}&page=${page}&search=${search}`, {
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('auth_token'),
                }
            });
    
            const responseData = await response.json();
    
            if (response.status === 401) {
                info('You are not authorized to view this data');
            } else if (response.status === 200) {
                setUsers(responseData.users.data)
                setItemsPerPage(responseData.users.per_page)
                setTotal(responseData.users.total)
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
    }, [type, page, search])

    return (
        <>
            {contextHolder}
            <Box sx={{ bgcolor: '#FFF', boxShadow: '0px 1px 2px rgba(0, 0, 0, .2)', borderRadius: '7px', p: 4, mb: 3 }}>
                <Title level={2}>User Management</Title>
                <Row gutter={[10, 20]} style={{ margin: '2rem 0' }}>
                    <Col span={20}>
                        <Input size="large" prefix={<FaSearch style={{ marginRight: 10 }} />} placeholder="Search for ..." onChange={handleSearchChange}/>
                    </Col>
                    <Col span={4}>
                        <Select placeholder='Sort By' size="large" defaultValue={'a'} style={{ width: '100%' }} options={[{label: 'a', value: 'a'}]} />
                    </Col>
                </Row>
                <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            </Box>
            <Row gutter={[8, 8]}>
                {
                    users.length == 0 ? (
                        <Col span={24}>
                            <Typography sx={{ py: 3, textAlign: 'center' }}>No result for the chosen filters</Typography>
                        </Col>
                    ) : (
                        users.map((item, index) => {
                            return (
                                <Col span={8} key={'user-' + index}>
                                    <UserDisplayDetailsCard user={item} onUserSelect={handleUserSelect} />
                                </Col>
                            )
                        })
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
                    <Pagination align="center" onChange={handlePageChange} defaultCurrent={1} pageSize={itemsPerPage} total={total} showSizeChanger={false} hideOnSinglePage={true} />
                </ConfigProvider>
            </Box>

            <UserDisplayDetailsDrawer user={selected} open={open} setOpen={setOpen} />
        </>

    )
}

export default UserManagementSection;