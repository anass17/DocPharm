import React, { useState } from 'react';
import { Input, Radio, Typography } from 'antd';
import { PRIMARY_BLUE } from '../../../config/colors';
const style = {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
};
const AppointmentTypeSelect = () => {
  const [value, setValue] = useState(1);

  const onChange = e => {
    setValue(e.target.value);
  };
  
  return (
    <Radio.Group style={{ display: 'flex', flexDirection: 'column', gap: 10 }} onChange={onChange} defaultValue="a">
      <Radio.Button value="a" style={{ borderRadius: 5, height: 'auto', padding: '0.75rem 1.5rem', borderWidth: '2px', margin: 1, overflow: 'hidden' }}>
        <Typography.Title level={5} style={{ marginBottom: 1 }}>Online Consultation</Typography.Title>
        <Typography.Text style={{ fontSize: 18, fontWeight: 500, color: PRIMARY_BLUE }}>150 DH</Typography.Text>
      </Radio.Button>
      <Radio.Button value="b" style={{ borderRadius: 5, height: 'auto', padding: '0.75rem 1.5rem', borderWidth: '2px', margin: 1, overflow: 'hidden' }}>
        <Typography.Title level={5} style={{ marginBottom: 1 }}>In-person visit</Typography.Title>
        <Typography.Text style={{ fontSize: 18, fontWeight: 500, color: PRIMARY_BLUE }}>100 DH</Typography.Text>
      </Radio.Button>
    </Radio.Group>
  );
};
export default AppointmentTypeSelect;