import React, { useState } from 'react';
import { AppstoreOutlined, ClockCircleOutlined, SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import { GREEN, GREEN2, GREEN3, GREEN5 } from '../../config/colors';
import { useNavigate } from 'react-router-dom';
import { Checkbox, ConfigProvider, Divider, Flex, Input, Typography } from 'antd';
import { Box, Button, TextField } from '@mui/material';
import SearchInput from '../Form/SearchInput';
import shadows from '@mui/material/styles/shadows';


const MedicineFiltersSidebar = () => {

    const handleChange = () => {

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
                <Box p={3} borderRadius={2} bgcolor='#FFF' maxWidth='300px' boxShadow={shadows[2]}>
                    <Typography.Title level={4}>Filters</Typography.Title>
                    <div style={{ maxWidth: '420px', width: '100%' }}>
                        <Typography.Title level={5}>Search for Products</Typography.Title>
                        <Input id='search-input' onChange={onchange} size="large" placeholder="Type in something ..." prefix={<SearchOutlined style={{ marginRight: '5px' }} />} style={{backgroundColor: GREEN5, borderColor: GREEN2, borderRadius: '4px' }} />
                    </div>
                    <Divider />
                    <Typography.Title level={5}>Price Range</Typography.Title>
                    <Flex gap={5}>
                        <TextField size='small' placeholder='Min'/>
                        <TextField size='small' placeholder='Max'/>
                    </Flex>
                    <Divider />
                    <Typography.Title level={5}>Form</Typography.Title>
                    <Box>
                        {
                            ['Tablet', 'Syrup', 'Capsul', 'Cream'].map((item, index) => {
                                return (
                                    <Box>
                                        <Checkbox key={'filter-form-' + index} checked={true}>{item}</Checkbox>
                                    </Box>
                                ) 
                            })
                        }
                    </Box>
                    <Divider />
                    <Typography.Title level={5}>Prescription</Typography.Title>
                    <Box>

                        <Box>
                            <Checkbox checked={true}>Required</Checkbox>
                        </Box>
                        
                        <Box>
                            <Checkbox checked={true}>Not Required</Checkbox>
                        </Box>
                    </Box>
                    <Button variant='contained' fullWidth style={{ marginTop: 25, backgroundColor: GREEN }}>Apply Filters</Button>
                </Box>
            </ConfigProvider>
        </>

    );
};
export default MedicineFiltersSidebar;