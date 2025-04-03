import { Button, Col, Flex, message, Row, Skeleton, Typography } from "antd";
import StatisticBlock from "../../../components/Statistics/StatisticBlock";
import { ClockCircleOutlined, DollarOutlined, ShoppingCartOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { defaultShadow } from "../../../config/shadow";
import { GREEN } from "../../../config/colors";
import { useEffect, useState } from "react";
import { backend_url } from "../../../config/app";
import Cookies from 'js-cookie';
import { formatDistanceToNow } from 'date-fns';
import { Link } from "react-router-dom";

const { Title, Text } = Typography

const DashboardSection = () => {

    const [submit, setSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [recentAdded, setRecentAdded] = useState([]);
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

    }, [submit])


    return (
        <>
            {contextHolder}
            <Row gutter={[16, 16]} style={{ marginBottom: 35 }}>
                <Col span={8}>
                    <StatisticBlock value={25} name={"Different Medicines"} component={ClockCircleOutlined} />
                </Col>
                <Col span={8}>
                    <StatisticBlock value={250} name={"Medicine Unit"} component={ClockCircleOutlined} />
                </Col>
                <Col span={8}>
                    <StatisticBlock value={2020} name={"Sold Unit"} component={ShoppingCartOutlined} />
                </Col>
                <Col span={8}>
                    <StatisticBlock value={25} name={"Delivered Orders"} component={ClockCircleOutlined} />
                </Col>
                <Col span={8}>
                    <StatisticBlock value={250} name={"Orders"} component={UnorderedListOutlined} />
                </Col>
                <Col span={8}>
                    <StatisticBlock value={2020} name={"Earnings"} component={DollarOutlined} />
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <div style={{ backgroundColor: '#FFF', borderRadius: 7, boxShadow: defaultShadow }}>
                    </div>
                </Col>
                <Col span={12}>
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