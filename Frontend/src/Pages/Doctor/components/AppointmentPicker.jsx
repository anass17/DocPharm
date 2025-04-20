import React from 'react';
import { Calendar, theme } from 'antd';
import { GRAY4 } from '../../../config/colors';
import { Height } from '@mui/icons-material';

const onPanelChange = (value, mode) => {
  console.log(value.format('YYYY-MM-DD'), mode);
};

const AppointmentPicker = () => {

  const wrapperStyle = {
    width: '100%',
    border: `1px solid #DDD`,
    borderRadius: 5,
  };

  return (
    <div style={wrapperStyle}>
      <Calendar fullscreen={false} onPanelChange={onPanelChange} onChange={(date) => console.log(date)} />
    </div>
  );
};
export default AppointmentPicker;