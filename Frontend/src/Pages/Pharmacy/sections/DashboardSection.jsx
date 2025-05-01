import { Button, Col, Flex, message, Row, Skeleton, Typography } from "antd";
import StatisticBlock from "../../../components/Statistics/StatisticBlock";
import { defaultShadow } from "../../../config/shadow";
import { GREEN, PRIMARY_BLUE } from "../../../config/colors";
import { useEffect, useState } from "react";
import { backend_url } from "../../../config/app";
import Cookies from 'js-cookie';
import { formatDistanceToNow } from 'date-fns';
import { Link } from "react-router-dom";
import { FaBoxOpen, FaCheck, FaDollarSign, FaPills, FaShoppingCart } from "react-icons/fa";
import Chart from "../../../components/Chart/chart";

const { Title, Text } = Typography

const DashboardSection = () => {

    const [loading, setLoading] = useState(true);
    const [medicineStatistics, setMedicineStatistics] = useState([]);
    const [orderStatistics, setOrderStatistics] = useState([]);
    const [recentAdded, setRecentAdded] = useState([]);
    const [chartData, setChartData] = useState({})
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

            const response = await fetch(`${backend_url}/api/pharmacy/dashboard`, {
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('auth_token'),
                }
            });
    
            const responseData = await response.json();
    
            if (response.status === 401) {
                info('You are not authorized to view this data');
            } else if (response.status === 200) {
                setRecentAdded(responseData.recent_added)
                setMedicineStatistics(responseData.medicine_statistics)
                setOrderStatistics(responseData.order_statistics)
                setChartData({labels: responseData.chart.labels, data: responseData.chart.data})
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
            <Row gutter={[12, 12]} style={{ marginBottom: 35 }}>
                <Col xs={24} sm={12} xl={8}>
                    <StatisticBlock value={loading ? 'loading...' : (medicineStatistics.total_medicines || 0)} name={"Different Medicines"} component={FaPills} />
                </Col>
                <Col xs={24} sm={12} xl={8}>
                    <StatisticBlock value={loading ? 'loading...' : (medicineStatistics.medicine_units || 0)} name={"Available Units"} component={FaPills} />
                </Col>
                <Col xs={24} sm={12} xl={8}>
                    <StatisticBlock value={loading ? 'loading...' : (orderStatistics.sold_units || 0)} name={"Sold Units"} component={FaShoppingCart} />
                </Col>
                <Col xs={24} sm={12} xl={8}>
                    <StatisticBlock value={loading ? 'loading...' : (orderStatistics.total_orders || 0)} name={"Total Orders"} component={FaCheck} />
                </Col>
                <Col xs={24} sm={12} xl={8}>
                    <StatisticBlock value={loading ? 'loading...' : (orderStatistics.delivered_orders || 0)} total={orderStatistics.total_orders} name={"Delivered Orders"} component={FaBoxOpen} />
                </Col>
                <Col xs={24} sm={12} xl={8}>
                    <StatisticBlock value={loading ? 'loading...' : (orderStatistics.earnings || 0)} name={"Earnings (MAD)"} component={FaDollarSign} />
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col xs={24} xl={12}>
                    <div style={{ backgroundColor: '#FFF', borderRadius: 7, boxShadow: defaultShadow, minHeight: 400, height: '100%', padding: 10 }}>
                        <Chart chartData={chartData} name="Orders" />
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
                                                        <Link to={'/medicines/' + item.medicine_id} style={{ marginBottom: "0", color: PRIMARY_BLUE, display: 'block', fontWeight: 'bold' }}>{item.medicine_name}</Link>
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