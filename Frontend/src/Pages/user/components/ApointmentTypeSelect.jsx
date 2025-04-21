import React, { useState } from 'react';
import { Input, Radio, Typography } from 'antd';
import { PRIMARY_BLUE } from '../../../config/colors';
const style = {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
};
const AppointmentTypeSelect = ({value, onSelect, data}) => {

  const onChange = e => {
    onSelect(e.target.value)
  };
  
  return (
    <Radio.Group style={{ display: 'flex', flexDirection: 'column', gap: 10 }} onChange={onChange} value={value}>
      <Radio.Button disabled={data ? false : true} value="online" style={{ borderRadius: 5, height: 'auto', padding: '0.75rem 1.5rem', borderWidth: '2px', margin: 1, overflow: 'hidden' }}>
        <Typography.Title level={5} style={{ marginBottom: 1 }}>Online Consultation</Typography.Title>
        <Typography.Text style={{ fontSize: 18, fontWeight: 500, color: PRIMARY_BLUE }}>{data?.online || 0} DH</Typography.Text>
      </Radio.Button>
      <Radio.Button disabled={data ? false : true} value="in_person" style={{ borderRadius: 5, height: 'auto', padding: '0.75rem 1.5rem', borderWidth: '2px', margin: 1, overflow: 'hidden' }}>
        <Typography.Title level={5} style={{ marginBottom: 1 }}>In-person visit</Typography.Title>
        <Typography.Text style={{ fontSize: 18, fontWeight: 500, color: PRIMARY_BLUE }}>{data?.in_person || 0} DH</Typography.Text>
      </Radio.Button>
    </Radio.Group>
  );
};
export default AppointmentTypeSelect;