import { Button, Col, Flex, message, Row, Skeleton, Typography } from "antd";
import StatisticBlock from "../../../components/Statistics/StatisticBlock";
import { defaultShadow } from "../../../config/shadow";
import { GREEN, PRIMARY_BLUE, PRIMARY_GREEN } from "../../../config/colors";
import { useEffect, useState } from "react";
import { backend_url } from "../../../config/app";
import Cookies from 'js-cookie';
import dayjs from 'dayjs'
import { formatDistanceToNow } from 'date-fns';
import { Link } from "react-router-dom";
import { FaBoxOpen, FaCheck, FaDollarSign, FaPills, FaShoppingCart } from "react-icons/fa";
import Chart from "../../../components/Chart/chart";
import { Typography as TP } from "@mui/material";

const { Title, Text } = Typography

const DashboardSection = () => {

    const [submit, setSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [statistics, setStatistics] = useState([]);
    const [recentActivities, setRecentActivities] = useState([]);
    const [chartData, setChartData] = useState({});
    const [messageApi, contextHolder] = message.useMessage();

    const info = (message) => {
        messageApi.open({
            type: 'error',
            content: message,
            duration: 5
        });
    };

    const getStatistics = async () => {

        setSubmit(true);
        setLoading(true)
        
        try {

            const response = await fetch(`${backend_url}/api/client/dashboard`, {
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('auth_token'),
                }
            });
    
            const responseData = await response.json();
    
            if (response.status === 401) {
                info('You are not authorized to view this data');
            } else if (response.status === 200) {
                setRecentActivities(responseData.recent_activities)
                setStatistics(responseData.statistics)
                setChartData({labels: responseData.chart.labels, dataset: [
                    {
                        label: 'Orders',
                        data: responseData.chart.orders,
                        borderColor: PRIMARY_GREEN
                    }, 
                    {
                        label: 'Appointments',
                        data: responseData.chart.appointments,
                        borderColor: PRIMARY_BLUE
                    }
                ]})
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
        getStatistics()

    }, [submit])


    return (
        <>
            {contextHolder}
            <Row gutter={[12, 12]} style={{ marginBottom: 35 }}>
                <Col span={8}>
                    <StatisticBlock value={loading ? 'loading...' : (statistics[0]?.total_appointments || 0)} name={"Total Appointments"} component={FaPills} />
                </Col>
                <Col span={8}>
                    <StatisticBlock value={loading ? 'loading...' : (statistics[0]?.completed_appointments || 0)} total={statistics[0]?.total_appointments} name={"Completed Appointments"} component={FaPills} />
                </Col>
                <Col span={8}>
                    <StatisticBlock value={loading ? 'loading...' : (statistics[0]?.rejected_appointments || 0)} total={statistics[0]?.total_appointments} name={"Rejected Appointments"} component={FaShoppingCart} />
                </Col>
                <Col span={8}>
                    <StatisticBlock value={loading ? 'loading...' : (statistics[1]?.total_orders || 0)} name={"Total Orders"} component={FaBoxOpen} />
                </Col>
                <Col span={8}>
                    <StatisticBlock value={loading ? 'loading...' : (statistics[1]?.delivered_orders || 0)} total={statistics[1]?.total_orders} name={"Delivered Orders"} component={FaCheck} />
                </Col>
                <Col span={8}>
                    <StatisticBlock value={loading ? 'loading...' : (statistics[0]?.total_earnings || 0)} name={"Total Spent (MAD)"} component={FaDollarSign} />
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <div style={{ backgroundColor: '#FFF', borderRadius: 7, boxShadow: defaultShadow, minHeight: 400, height: '100%', padding: 10 }}>
                        <Chart chartData={chartData} />
                    </div>
                </Col>
                <Col span={12}>
                    <div style={{ backgroundColor: '#FFF', borderRadius: 7, boxShadow: defaultShadow}}>
                        <div style={{ padding: '15px 20px'  }}>
                            <Title level={4} style={{ marginBottom: 20 }}>Recent Activities</Title>
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
                                        recentActivities.map((item, index) => {
                                            return (
                                                item.type === 'order' ? (
                                                    <Flex key={'med-' + index} justify="space-between" style={{ marginBottom: 25 }}>
                                                        <div>
                                                            {
                                                                item.status === 'delivered' ? (
                                                                    <Link to={'/orders/'} style={{ marginBottom: "0", color: PRIMARY_BLUE, display: 'block', fontWeight: 'bold' }}>An order has been delivered</Link>
                                                                ) : (
                                                                    item.status === 'ready' ? (
                                                                        <Link to={'/orders/'} style={{ marginBottom: "0", color: PRIMARY_BLUE, display: 'block', fontWeight: 'bold' }}>An order is ready</Link>
                                                                    ) : (
                                                                        item.status === 'accepted' ? (
                                                                            <Link to={'/orders/'} style={{ marginBottom: "0", color: PRIMARY_BLUE, display: 'block', fontWeight: 'bold' }}>A pharmacy has accepted your order</Link>
                                                                        ) : (
                                                                            <Link to={'/orders/'} style={{ marginBottom: "0", color: PRIMARY_BLUE, display: 'block', fontWeight: 'bold' }}>You have placed an order</Link>
                                                                        )
                                                                    )
                                                                )
                                                            }
                                                            <TP className="capitalize" fontSize={13}>{item.status}</TP>
                                                        </div>
                                                        <div>
                                                            <Text strong>{formatDistanceToNow(item.created_at, { addSuffix: true })}</Text>
                                                        </div>
                                                    </Flex>
                                                ) : (
                                                    <Flex key={'med-' + index} justify="space-between" style={{ marginBottom: 25 }}>
                                                        <div>
                                                            <Link to={'/appointments'} style={{ marginBottom: "0", color: PRIMARY_BLUE, display: 'block', fontWeight: 'bold' }}>Dr. {item.first_name} {item.last_name}</Link>
                                                            <TP fontSize={13}>Appointment On: {dayjs(item.appointment_date).format('MMMM DD, YYYY')}</TP>
                                                        </div>
                                                        <div>
                                                            <Text strong>{formatDistanceToNow(item.created_at, { addSuffix: true })}</Text>
                                                        </div>
                                                    </Flex>
                                                )
                                            )
                                        })
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default DashboardSection;