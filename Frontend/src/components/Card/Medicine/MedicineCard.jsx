import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Block } from '@mui/icons-material';
import { Box, Button, Icon } from '@mui/material';
import { Flex } from 'antd';
import { GREEN } from '../../../config/colors';
import OptionsButton from '../../Button/OptionsButton';
import { backend_url } from '../../../config/app';
import UpdateMedicineModal from '../../Modal/Medicine/UpdateMedicineModal';
import { EyeInvisibleOutlined } from '@ant-design/icons';

const customPillsIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-capsule-pill" viewBox="0 0 16 16">
        <path d="M11.02 5.364a3 3 0 0 0-4.242-4.243L1.121 6.778a3 3 0 1 0 4.243 4.243l5.657-5.657Zm-6.413-.657 2.878-2.879a2 2 0 1 1 2.829 2.829L7.435 7.536zM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8m-.5 1.042a3 3 0 0 0 0 5.917zm1 5.917a3 3 0 0 0 0-5.917z"/>
    </svg>
)

const customPrescriptionIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-clipboard2-pulse" viewBox="0 0 16 16">
        <path d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5z"/>
        <path d="M3 2.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1H12a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5z"/>
        <path d="M9.979 5.356a.5.5 0 0 0-.968.04L7.92 10.49l-.94-3.135a.5.5 0 0 0-.926-.08L4.69 10H4.5a.5.5 0 0 0 0 1H5a.5.5 0 0 0 .447-.276l.936-1.873 1.138 3.793a.5.5 0 0 0 .968-.04L9.58 7.51l.94 3.135A.5.5 0 0 0 11 11h.5a.5.5 0 0 0 0-1h-.128z"/>
    </svg>
)

const MedicineCard = ({medicine, handleUpdateMedicine}) => {
    const [update, setUpdate] = React.useState(false);

    const handleUpdate = () => {
        setUpdate(true)
    }

  return (
    <Card sx={{ position: 'relative' }} style={{ opacity: ( medicine.visibility ? 1 : 0.7 ) }}>
        <CardActionArea disableRipple>
            <CardMedia
                component="img"
                height="200"
                image={backend_url + medicine.medicine_image}
                alt=""
            />
            <CardContent>
                <Typography variant="h6" mb={-0.5} component="h3" sx={{ color: GREEN }}>{medicine?.medicine_name || "Unknown"}</Typography>
                <Typography display={'Block'} mb={2} variant="body2">{medicine?.medicine_weight || "0"} {medicine?.form_unit || 'mg'}</Typography>
                
                <Box mb={2}>
                    <Flex gap={8} align='center' style={{ marginBottom: 5 }}>
                        {customPillsIcon}
                        <Typography variant="body1">{medicine?.form_name || "Unknown"}</Typography>
                    </Flex>
                    <Flex gap={8} align='center'>
                        {customPrescriptionIcon}
                        <Typography variant="body1">Prescription {medicine?.prescription_required ? "Required" : "Not Required"}</Typography>
                    </Flex>
                </Box>

                <Flex justify='space-between' align='center'>
                    <Typography variant="body1">{medicine?.medicine_quantity || 0} Available Unit</Typography>
                    <Typography variant="h6">{medicine?.medicine_price || 0} <Typography variant='body1' display={'inline-block'}>DH</Typography></Typography>
                </Flex>

                {/* Options */}

            </CardContent>
        </CardActionArea>

        <Box position={'absolute'} top={10} right={10}>
            <OptionsButton onUpdate={handleUpdate} />
        </Box>

        <UpdateMedicineModal medicine={medicine} open={update} setOpen={setUpdate} handleUpdate={handleUpdateMedicine} />
    </Card>
  );
}

export default MedicineCard;