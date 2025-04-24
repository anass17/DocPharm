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

const customPillsIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-capsule-pill" viewBox="0 0 16 16">
        <path d="M11.02 5.364a3 3 0 0 0-4.242-4.243L1.121 6.778a3 3 0 1 0 4.243 4.243l5.657-5.657Zm-6.413-.657 2.878-2.879a2 2 0 1 1 2.829 2.829L7.435 7.536zM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8m-.5 1.042a3 3 0 0 0 0 5.917zm1 5.917a3 3 0 0 0 0-5.917z"/>
    </svg>
)

const customPrescriptionIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clipboard2-pulse" viewBox="0 0 16 16">
        <path d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5z"/>
        <path d="M3 2.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1H12a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5z"/>
        <path d="M9.979 5.356a.5.5 0 0 0-.968.04L7.92 10.49l-.94-3.135a.5.5 0 0 0-.926-.08L4.69 10H4.5a.5.5 0 0 0 0 1H5a.5.5 0 0 0 .447-.276l.936-1.873 1.138 3.793a.5.5 0 0 0 .968-.04L9.58 7.51l.94 3.135A.5.5 0 0 0 11 11h.5a.5.5 0 0 0 0-1h-.128z"/>
    </svg>
)

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
                        <Link to={`/phamacies/${pharmacy.id}`}>
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