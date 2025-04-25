import { Col, ConfigProvider, message, Row, Typography } from "antd";
import { GREEN, GREEN5, LIGHT_BLUE } from "../../../config/colors";
import { Box } from "@mui/material";
import { Pagination } from 'antd';
import { useEffect, useMemo, useState } from "react";
import { backend_url } from "../../../config/app";
import Cookies from 'js-cookie';
import UserPharmacyCard from "../../../components/Card/Pharmacy/UserPharmacyCard";
import UserDoctorCard from "../../../components/Card/Doctor/UserDoctorCard";

const { Title, Text } = Typography

function isTimeInRange(time, start, end) {
    const [tHours, tMinutes] = time.split(':').map(Number);
    const [sHours, sMinutes] = start.split(':').map(Number);
    const [eHours, eMinutes] = end.split(':').map(Number);
  
    const timeMinutes = tHours * 60 + tMinutes;
    const startMinutes = sHours * 60 + sMinutes;
    const endMinutes = eHours * 60 + eMinutes;
  
    return timeMinutes >= startMinutes && timeMinutes <= endMinutes;
}

const PharmacyListingSection = ({sorting, filters}) => {

    const [doctors, setDoctors] = useState([]);
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

    const getDoctors = async () => {
        setLoading(true);
        
        try {

            const response = await fetch(`${backend_url}/api/doctors?page=${page}
                    &search=${filters.filter_search || ''}&city=${filters.filter_city || ''}&status=${filters.filter_status ? filters.filter_status.join(',') : ''}
                `, {
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('auth_token'),
                }
            });
    
            const responseData = await response.json();
    
            if (response.status === 401) {
                info('You are not authorized to view this data');
            } else if (response.status === 200) {
                setDoctors(responseData.doctors.data);
                setTotal(responseData.doctors.total)
                setItemsPerPage(responseData.doctors.per_page)
            } else {
                info('Something went wrong! Could not load this data');
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
            info('Something went wrong! Could not load this data');
        }
    }

    useEffect(() => {
        getDoctors()
    }, [page, sorting, filters])
    

    return (
        <>
            {contextHolder}
            <Row gutter={[10, 10]}>
                {
                    doctors.length === 0 ? (
                        <Col span={24}>
                            <p style={{ fontSize: 16, textAlign: 'center', fontWeight: 400 }}>No doctors were found</p>
                        </Col>
                    ) : (
                        doctors.map((item, index) => {
                            return (
                                <Col span={8} key={'doctor-' + index}>
                                    <UserDoctorCard doctor={item} />
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
                    <Pagination align="center" onChange={handlePageChange} defaultCurrent={1} pageSize={itemsPerPage} total={total} showSizeChanger={false} />
                </ConfigProvider>
            </Box>
        </>
    )
}

export default PharmacyListingSection;