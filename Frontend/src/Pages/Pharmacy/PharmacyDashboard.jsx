import { Button, Col, Flex, Row, Typography } from "antd";
import StatisticBlock from "../../components/layouts/statistics/StatisticBlock";
import SideMenu from "../../components/Pharmacy/SideMenu";
import { ClockCircleOutlined, DollarOutlined, ShoppingCartOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { defaultShadow } from "../../config/shadow";
import { GREEN } from "../../config/colors";

const { Title, Text } = Typography

export default function PharmacyDashboard() {
    return (
        <>
            <div style={{ display: "flex" }}>
                <SideMenu />
                <div style={{ padding: "2rem 3rem", flex: 1 }}>
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
                </div>
            </div>
        </>
    )
}