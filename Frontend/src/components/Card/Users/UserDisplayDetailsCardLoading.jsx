import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box } from '@mui/material';
import { Divider, Flex, Skeleton } from 'antd';
import { GRAY0 } from '../../../config/colors';


const UserDisplayDetailsCardLoading = () => {

  return (
    <Card sx={{ position: 'relative', p: 0.5, height: '100%', position: 'relative' }}>
        <Box style={{ color: GRAY0, backgroundColor: '#FFF' }}>
            <Box style={{ backgroundColor: '#FFF' }}>
                <CardContent style={{ padding: '0.5rem 0.75rem 3rem' }}>
                    <Flex gap={20} align='center'>
                        <Skeleton active avatar={{ size: 55 }} paragraph={{ rows: 2 }} />
                    </Flex>
                </CardContent>
            </Box>
        </Box>
    </Card>
  );
}

export default UserDisplayDetailsCardLoading;