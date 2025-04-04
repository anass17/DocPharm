import { Button, Col, ConfigProvider, Divider, Flex, message, Row, Skeleton, Spin, Typography } from "antd";
import StatisticBlock from "../../../components/Statistics/StatisticBlock";
import { ClockCircleOutlined, DollarOutlined, DownloadOutlined, HeartOutlined, LoadingOutlined, MenuOutlined, PushpinFilled, ShoppingCartOutlined, UnorderedListOutlined } from "@ant-design/icons";
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
import { Link, useParams } from "react-router-dom";import { Tabs } from 'antd';
import UserMedicineCard from "../../../components/Card/Medicine/UserMedicineCard";

const { Title, Text } = Typography

const UserMedicinesSection = () => {

    const [submit, setSubmit] = useState(false);
    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const info = (message) => {
        messageApi.open({
            type: 'error',
            content: message,
            duration: 5
        });
    };

    const getMedicines = async (page = 1) => {
        setSubmit(true);
        setLoading(true);
        
        try {

            const response = await fetch(`${backend_url}/api/medicines`, {
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('auth_token'),
                }
            });
    
            const responseData = await response.json();
    
            if (response.status === 401) {
                info('You are not authorized to view this data');
            } else if (response.status === 200) {
                setMedicines(responseData.medicines.data);
            } else {
                info('Something went wrong! Could not load this data');
            }
            setLoading(false)
        } catch (error) {
            info('Something went wrong! Could not load this data');
        }
    }

    useEffect(() => {
        getMedicines()
    }, [submit])
    

    return (
        <>
            {contextHolder}
            <Row gutter={14}>
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
        </>
    )
}

export default UserMedicinesSection;