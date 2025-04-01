import { Button, Col, Flex, Row, Typography } from "antd";
import StatisticBlock from "../../../components/Statistics/StatisticBlock";
import { ClockCircleOutlined, DollarOutlined, ShoppingCartOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { defaultShadow } from "../../../config/shadow";
import { GREEN } from "../../../config/colors";
import { useEffect, useState } from "react";
import { backend_url } from "../../../config/app";
import Cookies from 'js-cookie';

const { Title, Text } = Typography

const DashboardSection = () => {

    const [submit, setSubmit] = useState(false);

    const getStatistics = async () => {

        setSubmit(true);
        
        try {

            const response = await fetch(`${backend_url}/api/pharmacy/dashboard`, {
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('auth_token'),
                }
            });
    
            const responseData = await response.json();
    
            if (response.status === 401) {
                alert('Unauth')
            } else if (response.status === 200) {
                console.log(responseData);
            } else {
                alert('Error-0')
            }
        } catch (error) {
            if (error.name !== 'AbortError') {
                alert('Error')
            }
        }
    }

    useEffect(() => {
        getStatistics()

    }, [submit])


    return (
        <>
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
                                <Flex justify="space-between" style={{ marginBottom: 25 }}>
                                    <div>
                                        <Title level={5} style={{ marginBottom: "0", color: GREEN }}>First</Title>
                                        <Text>200mg</Text>
                                    </div>
                                    <div>
                                        <Text strong>2 hours ago</Text>
                                    </div>
                                </Flex>
                                <Flex justify="space-between" style={{ marginBottom: 25 }}>
                                    <div>
                                        <Title level={5} style={{ marginBottom: "0", color: GREEN }}>First</Title>
                                        <Text>200mg</Text>
                                    </div>
                                    <div>
                                        <Text strong>2 hours ago</Text>
                                    </div>
                                </Flex>
                                <Flex justify="space-between" style={{ marginBottom: 25 }}>
                                    <div>
                                        <Title level={5} style={{ marginBottom: "0", color: GREEN }}>First</Title>
                                        <Text>200mg</Text>
                                    </div>
                                    <div>
                                        <Text strong>2 hours ago</Text>
                                    </div>
                                </Flex>
                                <Flex justify="space-between" style={{ marginBottom: 25 }}>
                                    <div>
                                        <Title level={5} style={{ marginBottom: "0", color: GREEN }}>First</Title>
                                        <Text>200mg</Text>
                                    </div>
                                    <div>
                                        <Text strong>2 hours ago</Text>
                                    </div>
                                </Flex>
                            </div>
                        </div>

                        <Button type="text" style={{ borderTop: '1px solid #DDD', paddingTop: 25, paddingBottom: 25 }} block>
                            Show All
                        </Button>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default DashboardSection;