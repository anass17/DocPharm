import React from 'react';
import { Calendar, theme } from 'antd';

const onPanelChange = (value, mode) => {
  console.log(value.format('YYYY-MM-DD'), mode);
};

const AppointmentPicker = ({onDateChange}) => {

  const wrapperStyle = {
    width: '100%',
    border: `1px solid #DDD`,
    borderRadius: 5,
  };

  const handleChange = (date) => {
    let selectedDayName = date.$d.toLocaleDateString('en-En', {weekday: 'long'}).toLowerCase()
    onDateChange(selectedDayName, date)
  }

  return (
    <div style={wrapperStyle}>
      <Calendar fullscreen={false} onPanelChange={onPanelChange} onChange={handleChange} />
    </div>
  );
};
export default AppointmentPicker;