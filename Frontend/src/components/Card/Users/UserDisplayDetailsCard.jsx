import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box, Button, Icon } from '@mui/material';
import { Divider, Flex, Tag, Typography } from 'antd';
import { GRAY0, GRAY2, GREEN, GREEN2, LIGHT_GREEN2, PRIMARY_BLUE, PRIMARY_GREEN } from '../../../config/colors';
import { backend_url } from '../../../config/app';
import { Link } from 'react-router-dom';
import { HeartFilled } from '@ant-design/icons';
import { grey, red } from '@mui/material/colors';
import { FaClock, FaMapMarkerAlt, FaStethoscope } from 'react-icons/fa';
import dayjs from 'dayjs';


const UserDisplayDetailsCard = ({user, onUserSelect}) => {

    return (
        <Card sx={{ position: 'relative', p: 0.5, height: '100%', position: 'relative', cursor: 'pointer', transition: 'background-color .2s', '&:hover' : {bgcolor: 'rgba(0, 0, 0, .03)'} }} onClick={() => onUserSelect(user)}>
            <Box style={{ color: GRAY0 }}>
                <Box>
                    <CardContent style={{ padding: '0.75rem 0.75rem' }}>
                        <Flex gap={20} align='center'>
                            <Box>
                                <img className='h-16 w-16 rounded-full' src={backend_url + (user.profile_picture ? user.profile_picture : '/storage/user_placeholder.jpg')} />
                            </Box>
                            <Box>
                                <Typography.Title level={5} style={{ fontSize: 17, marginBottom: 1, color: PRIMARY_BLUE }}>{user.first_name} {user.last_name}</Typography.Title>
                                <Flex gap={7} style={{ color: '#6B7280', fontWeight: 500 }}>
                                    {user.email}
                                </Flex>
                            </Box>
                        </Flex>
                        
                        <Box>

                            <Flex justify='space-between' style={{ marginTop: 20 }}>
                                <Tag title='Hello' color={user.role === 'doctor' ? PRIMARY_BLUE : (user.role == 'pharmacy' ? PRIMARY_GREEN : (user.role == 'admin' ? 'blueviolet': GREEN2))} className='capitalize'>{user.role}</Tag>
                                <Typography.Text>{dayjs(user.created_at).format('YYYY-MM-DD HH:mm')}</Typography.Text>
                            </Flex>
                        </Box>

                    </CardContent>
                </Box>
            </Box>
        </Card>
    );
}

export default UserDisplayDetailsCard;