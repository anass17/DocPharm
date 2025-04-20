import React, { useMemo, useState } from 'react';
import { Card, Row, Col, Typography } from 'antd';
import dayjs from 'dayjs';
import { Box } from '@mui/material';

const generateTimeSlots = (start, end, intervalMinutes = 30) => {
  const slots = [];
  let current = dayjs(start, 'HH:mm');

  const endTime = dayjs(end, 'HH:mm');

  while (current.isBefore(endTime)) {
    const next = current.add(intervalMinutes, 'minute');
    slots.push({
      label: `${current.format('HH:mm')} - ${next.format('HH:mm')}`,
      start: current.format('HH:mm'),
      end: next.format('HH:mm'),
    });
    current = next;
  }

  return slots;
};

const AppointmentTimePicker = ({ active = true, start = '09:00', end = '17:00', selectedSlot, onSelect }) => {
  const slots = useMemo(() => generateTimeSlots(start, end), [start, end]);

  const handleSelect = (slot) => {
    onSelect(slot.label)
  };

  return (
    <Row gutter={[8, 8]}>
      {
        active ?
        (slots.map((slot, index) => (
          <Col span={6} key={index}>
            <Card
              hoverable
              size='small'
              onClick={() => handleSelect(slot)}
              style={{
                textAlign: 'center',
                backgroundColor:
                  selectedSlot === slot.label ? '#bae7ff' : '#ffffff',
                borderColor:
                  selectedSlot === slot.label ? '#1890ff' : '#DDD',
                  borderRadius: 5,
              }}
            >
              {slot.label}
            </Card>
          </Col>
        ))) : 
        (
          <Col span={24} style={{ textAlign: 'center', paddingTop: 30 }}>
            <Typography.Text>This date is Not available for bookings</Typography.Text>
          </Col>
        )
      }
      
    </Row>
  );
};

export default AppointmentTimePicker;
