import { Button, Col, Flex, message, Row, Skeleton, Typography } from "antd";
import StatisticBlock from "../../../components/Statistics/StatisticBlock";
import { defaultShadow } from "../../../config/shadow";
import { GREEN } from "../../../config/colors";
import { useEffect, useState } from "react";
import { backend_url } from "../../../config/app";
import Cookies from 'js-cookie';
import { formatDistanceToNow } from 'date-fns';
import { Link } from "react-router-dom";
import { FaCalendar, FaCalendarCheck, FaClock, FaDollarSign, FaUserFriends, FaVideo } from "react-icons/fa";

const { Title, Text } = Typography

const DashboardSection = () => {

    const [loading, setLoading] = useState(false);
    const [recentAdded, setRecentAdded] = useState([]);
    const [statistics, setStatistics] = useState({});
    const [messageApi, contextHolder] = message.useMessage();

    const info = (message) => {
        messageApi.open({
            type: 'error',
            content: message,
            duration: 5
        });
    };

    const getStatistics = async () => {

        setLoading(true)
        
        try {

            const response = await fetch(`${backend_url}/api/doctor/dashboard`, {
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('auth_token'),
                }
            });
    
            const responseData = await response.json();
    
            if (response.status === 401) {
                info('You are not authorized to view this data');
            } else if (response.status === 200) {
                setStatistics(responseData.statistics)
            } else {
                info('Something went wrong! Could not load this data');
            }
        } catch (error) {
            if (error.name !== 'AbortError') {
                info('Something went wrong! Could not load this data');
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getStatistics()
    }, [])


    return (
        <>
            {contextHolder}
            <Row gutter={[16, 16]} style={{ marginBottom: 35 }}>
                <Col xs={24} md={12} xl={8}>
                    <StatisticBlock value={statistics.online_appointments || 0} name={"Online Appointments"} component={FaVideo} total={statistics.total_appointments} />
                </Col>
                <Col xs={24} md={12} xl={8}>
                    <StatisticBlock value={statistics.in_person_appointments || 0} name={"In-Person Appointments"} component={FaUserFriends} total={statistics.total_appointments} />
                </Col>
                <Col xs={24} md={12} xl={8}>
                    <StatisticBlock value={statistics.total_appointments || 0} name={"Total Appointments"} component={FaCalendar} />
                </Col>
                <Col xs={24} md={12} xl={8}>
                    <StatisticBlock value={statistics.active_appointments || 0} name={"Active Appointments"} component={FaClock} total={statistics.total_appointments} />
                </Col>
                <Col xs={24} md={12} xl={8}>
                    <StatisticBlock value={statistics.completed_appointments || 0} name={"Completed Appointments"} component={FaCalendarCheck} total={statistics.total_appointments} />
                </Col>
                <Col xs={24} md={12} xl={8}>
                    <StatisticBlock value={statistics.total_earnings || 0} name={"Total Earnings (DH)"} component={FaDollarSign} />
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={24} xl={12}>
                    <div style={{ backgroundColor: '#FFF', borderRadius: 7, boxShadow: defaultShadow }}>
                    </div>
                </Col>
                <Col xs={24} xl={12}>
                    <div style={{ backgroundColor: '#FFF', borderRadius: 7, boxShadow: defaultShadow}}>
                        <div style={{ padding: '15px 20px'  }}>
                            <Title level={4} style={{ marginBottom: 20 }}>Recent Added</Title>
                            <div>
                                {
                                    loading ?
                                    (
                                        <>
                                            <Skeleton active paragraph={{ rows: 1}} style={{ marginBottom: 25 }} />
                                            <Skeleton active paragraph={{ rows: 1}} style={{ marginBottom: 25 }} />
                                            <Skeleton active paragraph={{ rows: 1}} style={{ marginBottom: 25 }} />
                                            <Skeleton active paragraph={{ rows: 1}} style={{ marginBottom: 25 }} />
                                        </>
                                    ) : (
                                        recentAdded.map((item, index) => {
                                            return (
                                                <Flex key={'med-' + index} justify="space-between" style={{ marginBottom: 25 }}>
                                                    <div>
                                                        <Title level={5} style={{ marginBottom: "0", color: GREEN }}>{item.medicine_name}</Title>
                                                        <Text>{item.medicine_weight}mg</Text>
                                                    </div>
                                                    <div>
                                                        <Text strong>{formatDistanceToNow(item.created_at, { addSuffix: true })}</Text>
                                                    </div>
                                                </Flex>
                                            )
                                        })
                                    )
                                }
                            </div>
                        </div>

                        <Link to='/pharmacy/inventory'>
                            <Button type="text" style={{ borderTop: '1px solid #DDD', paddingTop: 25, paddingBottom: 25 }} block>
                                Show All
                            </Button>
                        </Link>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default DashboardSection;