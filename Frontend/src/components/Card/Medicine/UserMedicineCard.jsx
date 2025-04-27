import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import { Block } from '@mui/icons-material';
import { Box, Button, Icon } from '@mui/material';
import { Flex, Typography } from 'antd';
import { GRAY0, GRAY2, GREEN } from '../../../config/colors';
import { backend_url } from '../../../config/app';
import { Link } from 'react-router-dom';
import { HeartFilled } from '@ant-design/icons';
import { red } from '@mui/material/colors';
import { FaShoppingCart } from 'react-icons/fa';

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

const UserMedicineCard = ({medicine}) => {
    const [favorite, setFavorite] = React.useState(false);


    const handleFavoriteClick = () => {
        setFavorite(!favorite)
    }

  return (
    <Card sx={{ position: 'relative', p: 1 }}>
        <Box style={{ color: GRAY0, backgroundColor: '#FFF' }}>
            <Box style={{ backgroundColor: '#FFF' }}>
                <CardMedia
                    component="img"
                    className='h-[170px]'
                    style={{ borderRadius: 3 }}
                    image={backend_url + (medicine.medicine_image ? medicine.medicine_image : '/storage/placeholder.jpg')}
                    alt=""
                />
                <CardContent style={{ padding: '0.5rem 0.75rem' }}>
                    <Link to={`/medicines/${medicine.id}`}>
                        <Typography.Title level={5} style={{ marginBottom: '0.5rem' }}>{medicine?.medicine_name || "Unknown"}</Typography.Title>
                    </Link>
                    
                    <Box mb={3} height={50}>
                        <Flex gap={8} align='center' style={{ marginBottom: 5 }}>
                            {customPillsIcon}
                            <Typography.Text>{medicine?.medicine_weight || "0"}{medicine?.form_unit || 'mg'} -  {medicine?.form_name || "Unknown"}</Typography.Text>
                        </Flex>
                        {
                            medicine?.prescription_required ? (
                                <Flex gap={8} align='center' style={{ marginBottom: 5 }}>
                                    {customPrescriptionIcon}
                                    <Typography.Text>Prescription Required</Typography.Text>
                                </Flex>
                            ) : null
                        }
                    </Box>

                    <Flex justify='space-between' align='center'>
                        <Typography.Title level={5} style={{ margin: 0, color: GREEN, fontWeight: 600 }}>{medicine?.medicine_price || 0} DH</Typography.Title>
                        <Link to={`/medicines/${medicine.id}?cart=true`}>
                            <Button type='button' variant='contained' sx={{ fontSize: 13, bgcolor: GREEN }}>
                                <FaShoppingCart size={15} style={{ marginRight: 10 }} />
                                Add to Cart
                            </Button>
                        </Link>
                    </Flex>

                    {/* Options */}

                </CardContent>
            </Box>
        </Box>
        <Button disableRipple onClick={handleFavoriteClick} style={{ position: 'absolute', top: 12, right: 14, width: 30, height: 30, minWidth: 0, color: (favorite ? red[500] : '#FFF'), transition: 'all .3s', stroke: GRAY2 }}><HeartFilled style={{ strokeWidth: '10px', scale: 1.3 }} /></Button>
    </Card>
  );
}

export default UserMedicineCard;