import React, { useState } from 'react';
import { AppstoreOutlined, ClockCircleOutlined, SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import { GREEN, GREEN2, GREEN3, GREEN5, PRIMARY_GREEN } from '../../config/colors';
import { useNavigate } from 'react-router-dom';
import { Checkbox, Col, ConfigProvider, Divider, Flex, Input, Row, Select, Typography } from 'antd';
import { Box, Button, TextField } from '@mui/material';
import SearchInput from '../Form/SearchInput';
import shadows from '@mui/material/styles/shadows';


const PharmacyFiltersSidebar = ({filters, setFilters}) => {

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
                        colorPrimary: GREEN2
                    },
                }}
            >
                <Box p={2.5} borderRadius={2} bgcolor='#FFF' boxShadow={shadows[2]}>
                    <Typography.Title level={4} style={{ marginBottom: 15 }}>Filters</Typography.Title>
                    <div style={{ maxWidth: '420px', width: '100%' }}>
                        <Typography.Title level={5}>Search for Products</Typography.Title>
                        <Input name="filter_search" id='search-input' onChange={handleChange} size="large" placeholder="Type in something ..." prefix={<SearchOutlined style={{ marginRight: '5px' }} />} style={{ borderRadius: '4px' }} />
                    </div>
                    <Divider />
                    <Typography.Title level={5}>City</Typography.Title>
                        <Select 
                            // onChange={handleChange}
                            name="filter_city"
                            defaultValue={''}
                            size='large'
                            style={{ width: '100%' }}
                            options={[
                                { label: "All", value: "" },
                                { label: "Agadir", value: "Agadir" },
                                { label: "Al Hoceima", value: "Al Hoceima" },
                                { label: "Azilal", value: "Azilal" },
                                { label: "Berkane", value: "Berkane" },
                                { label: "Benslimane", value: "Benslimane" },
                                { label: "Beni Mellal", value: "Beni Mellal" },
                                { label: "Berkane", value: "Berkane" },
                                { label: "Casablanca", value: "Casablanca" },
                                { label: "Chefchaouen", value: "Chefchaouen" },
                                { label: "Dakhla", value: "Dakhla" },
                                { label: "El Jadida", value: "El Jadida" },
                                { label: "El Kelaa des Sraghna", value: "El Kelaa des Sraghna" },
                                { label: "Errachidia", value: "Errachidia" },
                                { label: "Essaouira", value: "Essaouira" },
                                { label: "Fès", value: "Fès" },
                                { label: "Figuig", value: "Figuig" },
                                { label: "Guelmim", value: "Guelmim" },
                                { label: "Ifrane", value: "Ifrane" },
                                { label: "Inezgane", value: "Inezgane" },
                                { label: "Kénitra", value: "Kénitra" },
                                { label: "Khémisset", value: "Khémisset" },
                                { label: "Khouribga", value: "Khouribga" },
                                { label: "Laâyoune", value: "Laâyoune" },
                                { label: "Larache", value: "Larache" },
                                { label: "Marrakesh", value: "Marrakesh" },
                                { label: "Meknès", value: "Meknès" },
                                { label: "Midelt", value: "Midelt" },
                                { label: "Mohammedia", value: "Mohammedia" },
                                { label: "Ouarzazate", value: "Ouarzazate" },
                                { label: "Oujda", value: "Oujda" },
                                { label: "Rabat", value: "Rabat" },
                                { label: "Safi", value: "Safi" },
                                { label: "Salé", value: "Salé" },
                                { label: "Sefrou", value: "Sefrou" },
                                { label: "Settat", value: "Settat" },
                                { label: "Tanger", value: "Tanger" },
                                { label: "Tata", value: "Tata" },
                                { label: "Taza", value: "Taza" },
                                { label: "Tiznit", value: "Tiznit" },
                                { label: "Taroudant", value: "Taroudant" },
                                { label: "Tétouan", value: "Tétouan" },
                                { label: "Tinghir", value: "Tinghir" },
                                { label: "Tiznit", value: "Tiznit" },
                                { label: "Youssoufia", value: "Youssoufia" }
                            ]}
                        />
                    <Divider />
                    <Typography.Title level={5}>Status</Typography.Title>
                    <Box>
                        <Checkbox.Group style={{ width: '100%' }} defaultValue={['1', '2']} onChange={(checkedValues) => unsavedFilters = {...unsavedFilters, filter_forms: checkedValues}}>
                            <Row gutter={[10, 6]}>
                                <Col span={24}>
                                    <Checkbox checked={true} value="1">Open</Checkbox>
                                </Col>
                                <Col span={24}>
                                    <Checkbox checked={true} value="2">Closed</Checkbox>
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
export default PharmacyFiltersSidebar;