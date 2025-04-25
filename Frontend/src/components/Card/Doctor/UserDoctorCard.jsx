import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Box, Button, Icon } from '@mui/material';
import { Divider, Flex, Typography } from 'antd';
import { GRAY0, GRAY2, GREEN, PRIMARY_GREEN } from '../../../config/colors';
import { backend_url } from '../../../config/app';
import { Link } from 'react-router-dom';
import { HeartFilled } from '@ant-design/icons';
import { red } from '@mui/material/colors';
import { FaClock, FaHeartbeat, FaMapMarkerAlt, FaStethoscope } from 'react-icons/fa';


const UserDoctorCard = ({doctor}) => {
    const [favorite, setFavorite] = React.useState(false);

    const handleFavoriteClick = () => {
        setFavorite(!favorite)
    }

  return (
    <Card sx={{ position: 'relative', p: 0.5, height: '100%', position: 'relative' }}>
        <Box style={{ color: GRAY0, backgroundColor: '#FFF' }}>
            <Box style={{ backgroundColor: '#FFF' }}>
                <CardContent style={{ padding: '0.5rem 0.75rem 3rem' }}>
                    <Flex gap={20} align='center'>
                        <Box>
                            <img className='h-16' src={backend_url + '/storage/profile/fake.png'} />
                        </Box>
                        <Box>
                            <Link to={`/doctors/${doctor.id}`}>
                                <Typography.Title level={5}>{doctor.first_name} {doctor.last_name}</Typography.Title>
                            </Link>
                            <Flex gap={7}>
                                <FaStethoscope style={{ position: 'relative', top: 2 }} />
                                {doctor.speciality}
                            </Flex>
                        </Box>
                    </Flex>
                    
                    <Box>

                        <Typography.Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }} style={{ marginTop: 20 }}>
                            {doctor.bio || "Bio Not Added"}
                        </Typography.Paragraph>
                    </Box>

                    <Divider style={{ margin: '1.25rem 0' }} />

                    <Box style={{ marginBottom: 5 }}>
                        <Flex align='center' gap={5}>
                            <FaMapMarkerAlt />
                            <Typography.Text>{doctor.address}, {doctor.city}</Typography.Text>
                        </Flex>
                    </Box>
                    <Box>
                        <Flex align='center' gap={5}>
                            <FaClock />
                            <Typography.Text>
                                {
                                    doctor.appointment_type === 'online' ? (
                                        'Online '
                                    ) : (
                                        doctor.appointment_type === 'in_person' ? (
                                            'In-Person '
                                        ) : (
                                            'In-Person & Online '
                                        )
                                    )
                                }
                                Appointments
                            </Typography.Text>
                        </Flex>
                    </Box>

                    <Flex justify='right' align='center' style={{position: 'absolute', padding: '0.75rem 1rem', bottom: 0, left: 0, width: '100%' }}>
                        <Link to={`/doctors/${doctor.id}`}>
                            <Button type='button' variant='contained' sx={{ fontSize: 13, bgcolor: GREEN }}>
                                <span className='capitalize'>View Details</span>
                            </Button>
                        </Link>
                    </Flex>

                    {/* Options */}

                </CardContent>
            </Box>
        </Box>
        <Button disableRipple onClick={handleFavoriteClick} style={{ position: 'absolute', top: 6, right: 7, width: 30, height: 30, minWidth: 0, color: (favorite ? red[500] : '#FFF'), transition: 'all .3s', stroke: GRAY2 }}><HeartFilled style={{ strokeWidth: '10px', scale: 1.3 }} /></Button>
    </Card>
  );
}

export default UserDoctorCard;