import { Box } from "@mui/material";
import { Col, ConfigProvider, message, Pagination, Row, Tabs } from "antd";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import { backend_url } from "../../../config/app";
import Cookies from 'js-cookie'
import UserDisplayDetailsCard from "../../../components/Card/Users/UserDisplayDetailsCard";
import { GREEN, LIGHT_BLUE } from "../../../config/colors";

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
  ];

const UserManagementSection = () => {

    const [type, setType] = useState('All')
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])
    const [itemsPerPage, setItemsPerPage] = useState(1);
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(1)
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

    const getUsers = async () => {

        setLoading(true);
        
        try {

            const response = await fetch(`${backend_url}/api/users?type=${type}&page=${page}`, {
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
    }, [type, page])

    return (
        <>
            {contextHolder}
            <Box sx={{ bgcolor: '#FFF', boxShadow: '0px 1px 2px rgba(0, 0, 0, .2)', borderRadius: '7px', p: 4, mb: 3 }}>
                <Title level={2}>User Management</Title>
                <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            </Box>
            <Row gutter={[8, 8]}>
                {
                    users.map((item, index) => {
                        return (
                            <Col span={8} key={'user-' + index}>
                                <UserDisplayDetailsCard user={item} />
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

export default UserManagementSection;