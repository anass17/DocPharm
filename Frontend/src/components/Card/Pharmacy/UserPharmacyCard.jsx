import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import { Block } from '@mui/icons-material';
import { Box, Button, Icon } from '@mui/material';
import { Divider, Flex, Typography } from 'antd';
import { GRAY0, GRAY2, GREEN, PRIMARY_GREEN } from '../../../config/colors';
import { backend_url } from '../../../config/app';
import { Link } from 'react-router-dom';
import { HeartFilled } from '@ant-design/icons';
import { red } from '@mui/material/colors';
import { FaClock, FaMapMarkerAlt, FaShoppingCart } from 'react-icons/fa';

const UserPharmacyCard = ({pharmacy, today, timeCheck}) => {
    const [favorite, setFavorite] = React.useState(false);

    const handleFavoriteClick = () => {
        setFavorite(!favorite)
    }

  return (
    <Card sx={{ position: 'relative', p: 0.5, height: '100%', position: 'relative' }}>
        <Box style={{ color: GRAY0, backgroundColor: '#FFF' }}>
            <Box style={{ backgroundColor: '#FFF' }}>
                <CardMedia
                    component="img"
                    className='h-[170px]'
                    style={{ borderRadius: 3 }}
                    image={backend_url + '/storage/test/pharmacy.jpg'}
                    alt=""
                />
                <CardContent style={{ padding: '0.5rem 0.75rem 3rem' }}>
                    <Box style={{ marginBottom: '0.5rem' }}>
                        <Link to={`/pharmacies/${pharmacy.id}`}>
                            <Typography.Title level={5} style={{ margin: 0 }}>{pharmacy?.pharmacy_name || "Unknown"}</Typography.Title>
                        </Link>

                        {
                            !pharmacy.working_hours ? (
                                <Typography.Text style={{ fontWeight: 500, fontSize: 13, color: GRAY2, display: 'flex', gap: 7, alignItems: 'center' }}>
                                    <FaClock style={{ position: 'relative', top: 0.5 }} />
                                    Not Specified
                                </Typography.Text>
                            ) : (
                                !pharmacy.working_hours[today].active || !timeCheck(`${(new Date()).getHours()}:${(new Date()).getMinutes()}`, pharmacy.working_hours[today].open, pharmacy.working_hours[today].close) ? (
                                    <Typography.Text style={{ fontWeight: 500, fontSize: 13, color: red[500], display: 'flex', gap: 7, alignItems: 'center' }}>
                                        <FaClock style={{ position: 'relative', top: 0.5 }} />
                                        Closed
                                    </Typography.Text>
                                ) : (
                                    <Typography.Text style={{ fontWeight: 500, fontSize: 13, color: PRIMARY_GREEN, display: 'flex', gap: 7, alignItems: 'center' }}>
                                        <FaClock style={{ position: 'relative', top: 0.5 }} />
                                        Open Until {pharmacy.working_hours[today].close}
                                    </Typography.Text>
                                )
                            )
                        }
                    </Box>
                    
                    <Box>

                        <Typography.Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>
                            {pharmacy.bio || "Bio Not Added"}
                        </Typography.Paragraph>
                    </Box>

                    <Divider style={{ margin: '1.25rem 0' }} />

                    <Box>
                        <Flex align='center' gap={5}>
                            <FaMapMarkerAlt />
                            <Typography.Text>{pharmacy.address}, {pharmacy.city}</Typography.Text>
                        </Flex>
                    </Box>

                    <Flex justify='right' align='center' style={{position: 'absolute', padding: '0.75rem 1rem', bottom: 0, left: 0, width: '100%' }}>
                        <Link to={`/pharmacies/${pharmacy.id}`}>
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

export default UserPharmacyCard;