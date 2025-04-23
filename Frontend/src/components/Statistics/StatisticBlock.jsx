import React from 'react';
import Icon, { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import { GREEN } from '../../config/colors';
import { defaultShadow } from '../../config/shadow';


const StatisticBlock = ({name, value, component, total = null}) => (
  <Card variant="borderless"
    style={{ boxShadow: defaultShadow }}
  >
    <Statistic
      title={name}
      value={
        `${value} ${
          total ? `(${
            total !== 0 ? ((value / total) * 100).toFixed(1) : 0
          }%)` : ''
        }`
      }
      valueStyle={{ color: GREEN }}
      prefix={<Icon style={{ marginRight: 10}} component={component} />}
    />
</Card>
);
export default StatisticBlock;