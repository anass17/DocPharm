import { Col, ConfigProvider, message, Row } from "antd";
import { GREEN, GREEN5, LIGHT_BLUE } from "../../../config/colors";
import { Box } from "@mui/material";
import { Pagination } from 'antd';
import { useEffect, useState } from "react";
import { backend_url } from "../../../config/app";
import Cookies from 'js-cookie';
import UserMedicineCard from "../../../components/Card/Medicine/UserMedicineCard";


const UserMedicinesSection = ({sorting, filters}) => {

    const [submit, setSubmit] = useState(false);
    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(1);
    const [page, setPage] = useState(1);
    const [messageApi, contextHolder] = message.useMessage();

    const info = (message) => {
        messageApi.open({
            type: 'error',
            content: message,
            duration: 5
        });
    };

    const handlePageChange = (currentPage) => {
        setPage(currentPage)
    }

    const getMedicines = async (page = 1) => {
        setSubmit(true);
        setLoading(true);
        
        try {

            const response = await fetch(`${backend_url}/api/medicines?page=${page}&sort=${sorting}&search=${filters.filter_search || ''}&min=${filters.filter_price_min || ''}&max=${filters.filter_price_max || ''}&prescription=${filters.filter_prescription ? filters.filter_prescription.join(',') : ''}&forms=${filters.filter_forms ? filters.filter_forms.join(',') : ''}`, {
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
            info('Something went wrong! Could not load this data');
        }
    }

    useEffect(() => {
        console.log(filters)
        getMedicines(page)
    }, [submit, page, sorting, filters])
    

    return (
        <>
            {contextHolder}
            <Row gutter={[10, 10]}>
                {
                    medicines.map((item, index) => {
                        return (
                            <Col span={8} key={'medicine-' + index}>
                                <UserMedicineCard medicine={item} />
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

export default UserMedicinesSection;