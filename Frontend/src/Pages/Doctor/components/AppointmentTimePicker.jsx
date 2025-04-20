import React, { useState } from 'react';
import { Card, Row, Col } from 'antd';
import dayjs from 'dayjs';

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

const AppointmentTimePicker = ({ start = '09:00', end = '17:00', onSelect }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const slots = generateTimeSlots(start, end);

  const handleSelect = (slot) => {
    setSelectedSlot(slot.label);
    if (onSelect) onSelect(slot);
  };

  return (
    <Row gutter={[8, 8]}>
      {slots.map((slot, index) => (
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
      ))}
    </Row>
  );
};

export default AppointmentTimePicker;
