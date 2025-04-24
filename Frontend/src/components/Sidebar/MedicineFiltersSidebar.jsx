import React, { useState } from 'react';
import { AppstoreOutlined, ClockCircleOutlined, SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import { GREEN, GREEN2, GREEN3, GREEN5 } from '../../config/colors';
import { useNavigate } from 'react-router-dom';
import { Checkbox, Col, ConfigProvider, Divider, Flex, Input, Row, Typography } from 'antd';
import { Box, Button, TextField } from '@mui/material';
import SearchInput from '../Form/SearchInput';
import shadows from '@mui/material/styles/shadows';


const MedicineFiltersSidebar = ({filters, setFilters}) => {

    let unsavedFilters = {...filters}

    const handleChange = (e) => {
        const {name, value} = e.target;

        unsavedFilters = {
            ...unsavedFilters,
                [name]: value
        }
    }

    const handleSubmit = () => {
        setFilters(unsavedFilters)
    }

    return (

        <>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: GREEN
                    },
                }}
            >
                <Box p={3} borderRadius={2} bgcolor='#FFF' boxShadow={shadows[2]}>
                    <Typography.Title level={4}>Filters</Typography.Title>
                    <div style={{ maxWidth: '420px', width: '100%' }}>
                        <Typography.Title level={5}>Search for Products</Typography.Title>
                        <Input name="filter_search" id='search-input' onChange={handleChange} size="large" placeholder="Type in something ..." prefix={<SearchOutlined style={{ marginRight: '5px' }} />} style={{backgroundColor: GREEN5, borderColor: GREEN2, borderRadius: '4px' }} />
                    </div>
                    <Divider />
                    <Typography.Title level={5}>Price Range</Typography.Title>
                    <Flex gap={5}>
                        <TextField onChange={handleChange} name="filter_price_min" size='small' placeholder='Min'/>
                        <TextField onChange={handleChange} name="filter_price_max" size='small' placeholder='Max'/>
                    </Flex>
                    <Divider />
                    <Typography.Title level={5}>Form</Typography.Title>
                    <Box>
                        <Checkbox.Group style={{ width: '100%' }} defaultValue={['1', '2', '3', '4']} onChange={(checkedValues) => unsavedFilters = {...unsavedFilters, filter_forms: checkedValues}}>
                            <Row>
                                <Col span={24}>
                                    <Checkbox checked={true} value="1">Tablet</Checkbox>
                                </Col>
                                <Col span={24}>
                                    <Checkbox checked={true} value="2">Capsule</Checkbox>
                                </Col>
                                <Col span={24}>
                                    <Checkbox checked={true} value="3">Syrup</Checkbox>
                                </Col>
                                <Col span={24}>
                                    <Checkbox checked={true} value="4">Cream</Checkbox>
                                </Col>
                            </Row>
                        </Checkbox.Group>
                    </Box>
                    <Divider />
                    <Typography.Title level={5}>Prescription</Typography.Title>
                    <Box>

                    <Checkbox.Group style={{ width: '100%' }} defaultValue={['true', 'false']} onChange={(checkedValues) => unsavedFilters = {...unsavedFilters, filter_prescription: checkedValues}}>
                            <Row>
                                <Col span={24}>
                                    <Checkbox checked={true} value="true">Required</Checkbox>
                                </Col>
                                <Col span={24}>
                                    <Checkbox checked={true} value="false">Not Required</Checkbox>
                                </Col>
                            </Row>
                        </Checkbox.Group>
                    </Box>
                    <Button variant='contained' onClick={handleSubmit} fullWidth style={{ marginTop: 25, backgroundColor: GREEN }}>Apply Filters</Button>
                </Box>
            </ConfigProvider>
        </>

    );
};
export default MedicineFiltersSidebar;