import { Button, Col, ConfigProvider, Divider, Flex, message, Row, Skeleton, Spin, Typography } from "antd";
import StatisticBlock from "../../../components/Statistics/StatisticBlock";
import { CheckOutlined, ClockCircleOutlined, DollarOutlined, DownloadOutlined, HeartOutlined, LoadingOutlined, MenuOutlined, PushpinFilled, ShoppingCartOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { defaultShadow } from "../../../config/shadow";
import { GRAY2, GRAY4, GREEN, GREEN5 } from "../../../config/colors";
import SearchInput from "../../../components/Form/SearchInput";
import MedicineCard from "../../../components/Card/Medicine/MedicineCard";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Pagination } from 'antd';
import { useEffect, useState } from "react";
import { backend_url } from "../../../config/app";
import Cookies from 'js-cookie';
import UpdateMedicineModal from "../../../components/Modal/Medicine/UpdateMedicineModal";
import { Link, useParams } from "react-router-dom";
import { Tabs } from 'antd';
import AddToCartModal from "../../../components/Modal/Medicine/AddToCartModal";
import { useSelector } from "react-redux";

const { Title, Text } = Typography


const items = [
    {
        key: '1',
        label: 'Description',
        children: 'loading ...'
    },
    {
        key: '2',
        label: 'Uses',
        children: 'loading ...',
    },
    {
        key: '3',
        label: 'Usage Instructions',
        children: 'loading ...',
    },
];

const UserMedicineDisplaySection = () => {
    const [medicine, setMedicine] = useState({});
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState(items)
    const [messageApi, contextHolder] = message.useMessage();
    const [open, setOpen] = useState(false);
    const { id: param_id } = useParams();
    const cart = useSelector(data => data.cart.cart)

    const info = (message) => {
        messageApi.open({
            type: 'error',
            content: message,
            duration: 5
        });
    };

        
    const onChange = key => {
        console.log(key);
    };

    const getMedicineDetails = async (id) => {

        setLoading(true);
        
        try {

            const response = await fetch(`${backend_url}/api/medicines/${id}`, {
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('auth_token'),
                }
            });
    
            const responseData = await response.json();
    
            if (response.status === 401) {
                info('You are not authorized to view this data');
            } else if (response.status === 404) {
                info('This medicine does not exist');
            } else if (response.status === 200) {
                setMedicine(responseData.medicine);
                setDetails(
                    [{
                        key: '1',
                        label: 'Description',
                        children: responseData.medicine.medicine_description
                    },
                    {
                        key: '2',
                        label: 'Uses',
                        children: responseData.medicine.uses.map((item, index) => {
                            return <Text strong style={{ display: 'block' }} key={'use-' + index}>{item.name}</Text>
                        })
                    },
                    {
                        key: '3',
                        label: 'Usage Instructions',
                        children: responseData.medicine.usage_instructions,
                    }]
                )
            } else {
                info('Something went wrong! Could not load this data');
            }
            setLoading(false)
        } catch (error) {
            if (error.name !== 'AbortError') {
                info('Something went wrong! Could not load this data');
            }
        }
    }

    useEffect(() => {
        if (location.search.search('cart=true') >= 0) {
            setOpen(true)
        }
        getMedicineDetails(param_id)
    }, [param_id])
    
    // useEffect(() => {
    //     console.log(cart)
    // })

    return (
        <>
            {contextHolder}
            <Row gutter={40}>
                <Col span={12}>
                    <Box sx={{ p: 4, bgcolor: '#FFF', borderRadius: 3, minHeight: 300, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        {
                            loading ? (
                                <Skeleton.Image active={true} style={{ height: 100, width: 100 }} />
                            ) : (
                                <img width={'100%'} style={{ borderRadius: 3 }} src={`${backend_url}${medicine.medicine_image}`} />
                            )
                        }
                    </Box>
                </Col>
                <Col span={12}>
                    {
                        !loading ? (
                            <>
                                <Title level={1}>{medicine.medicine_name}</Title>
                                <Title level={4} style={{ color: GREEN }}>${medicine.medicine_price}</Title>

                            </>
                        ) : (
                            <Skeleton active paragraph={{ rows: 1, width: 100 }} />
                        )
                    }
                    <Divider></Divider>
                    <Box>
                        {
                            !loading ? (
                                <>
                                    <Row gutter={[20, 20]}>
                                        <Col span={12}>
                                            <Title level={5} style={{ margin: 0 }}>Weight</Title>
                                            <Text>{medicine.medicine_weight}mg</Text>
                                        </Col>
                                        <Col span={12}>
                                            <Title level={5} style={{ margin: 0 }}>Form</Title>
                                            <Text>{medicine.medicine_form}</Text>
                                        </Col>
                                        <Col span={12}>
                                            <Title level={5} style={{ margin: 0 }}>Prescription</Title>
                                            <Text>{medicine.prescription_required ? 'Required' : 'Not Required'}</Text>
                                        </Col>
                                    </Row>
                                </>
                            ) : (
                                <Skeleton active paragraph={{ rows: 4 }} />
                            )
                        }
                        
                    </Box>
                    <Divider></Divider>
                    <Flex gap={6}>
                        {
                            cart?.filter(item => item.medicine_id == param_id).length > 0 ?
                            <Button style={{ flex: 1, backgroundColor: GRAY4, border: 'none', height: 40, color: GRAY2 }} onClick={() => setOpen(true)} icon={<CheckOutlined />}>Added To cart</Button> :
                            <Button style={{ flex: 1, backgroundColor: GREEN, borderColor: GREEN, height: 40, color: '#FFF' }} onClick={() => setOpen(true)} icon={<ShoppingCartOutlined />}>Add To Cart</Button>
                        }
                        <Button style={{ width: 40, height: 40 }}><HeartOutlined /></Button>
                    </Flex>
                </Col>
            </Row>
            <Box sx={{ bgcolor: '#FFF', px: 3, py: 1.5, mt: 6, borderRadius: 3 }}>
                <Tabs defaultActiveKey="1" items={details} onChange={onChange} />
            </Box>
            <Box pt={6}>
                <Title level={3}>Available At Nearby Pharmacies</Title>
                <Row gutter={[20, 20]}>
                    {
                        !loading && medicine.pharmacies ? (
                            medicine.pharmacies.map((item, index) => {
                                return (
                                    <Col span={8} key={'pharmacy-' + index}>
                                        <Box sx={{ bgcolor: '#FFF', boxShadow: '0px 2px 4px rgba(0, 0, 0, .25)', borderRadius: 2, py: 1.5, px: 4 }}>
                                            <Link to="#">
                                                <Title level={5} style={{ marginBottom: 0 }}>{item.pharmacy_name}</Title>
                                                <Text><PushpinFilled style={{ marginRight: 5 }} />{item.address}, {item.city}</Text>
                                                <Text style={{ color: 'dodgerblue', display: 'block', marginTop: 5 }}>{item.pivot.medicine_quantity} Units Available</Text>
                                            </Link>
                                        </Box>
                                    </Col>
                                )
                            })
                        ) : null
                    }
                </Row>
            </Box>
            <AddToCartModal medicine={medicine} open={open} setOpen={setOpen} />
        </>
    )
}

export default UserMedicineDisplaySection;