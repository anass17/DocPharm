import React from 'react';
import Icon, { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import { GREEN } from '../../config/colors';
import { defaultShadow } from '../../config/shadow';


const StatisticBlock = ({name, value, component}) => (
  <Card variant="borderless"
    style={{ boxShadow: defaultShadow }}
  >
    <Statistic
      title={name}
      value={value}
      valueStyle={{ color: GREEN }}
      prefix={<Icon style={{ marginRight: 10}} component={component} />}
    />
</Card>
);
export default StatisticBlock;