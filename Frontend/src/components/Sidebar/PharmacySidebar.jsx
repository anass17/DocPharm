import React, { useState } from 'react';
import { AppstoreOutlined, ClockCircleOutlined, MailOutlined, SettingOutlined, UserAddOutlined } from '@ant-design/icons';
import { ConfigProvider, Menu } from 'antd';
import { GREEN, GREEN2, GREEN3 } from '../../config/colors';
import AddMedicineModal from '../Modal/Medicine/AddMedicineModal';
import { useNavigate } from 'react-router-dom';

const theme = {
    token: {
      colorPrimary: GREEN,
    },
};

const links = {
  '13': 'dashboard',
  '16': 'inventory',
}

const items = [
  {
    key: 'grp1',
    label: '',
    type: 'group',
    children: [
      { key: '13', label: 'Dashboard', icon: <AppstoreOutlined />, href: '/green' },
      { key: '14', label: 'Manage Delivery Account', icon: <UserAddOutlined /> },
    ],
  },
  {
    key: 'grp2',
    label: 'Inventory',
    type: 'group',
    children: [
      { key: '15', label: 'Add New Product', icon: <AppstoreOutlined /> },
      { key: '16', label: 'My Inventory', icon: <AppstoreOutlined />},
    ],
  },
  {
    key: 'grp3',
    label: 'Orders',
    type: 'group',
    children: [
      { key: '18', label: 'Pending Orders', icon: <ClockCircleOutlined /> },
      { key: '19', label: 'Orders History', icon: <AppstoreOutlined /> },
    ],
  },
  {
    key: 'grp4',
    label: 'Help',
    type: 'group',
    children: [
      { key: '20', label: 'Contact Us', icon: <AppstoreOutlined /> },
      { key: '21', label: 'FAQs', icon: <AppstoreOutlined /> },
      { key: '22', label: 'Terms & Conditions', icon: <AppstoreOutlined /> },
    ],
  },
];


const PharmacySidebar = ({menuItem}) => {

    let [modalOpen, setModalOpen] = useState(false);
    let navigate = useNavigate()

    const onClick = e => {
      console.log(e);
        if (e.key == '15') {
            setModalOpen(true);
        } else if (links[e.key]) {
            navigate(`/pharmacy/${links[e.key]}`);
        }
    };


    return (

        <>

            <AddMedicineModal open={modalOpen} setOpen={setModalOpen} />

            <ConfigProvider theme={theme}>
                <Menu
                onClick={onClick}
                style={{ width: 320, minHeight: 'calc(100vh - 40px)', fontWeight: '500', paddingLeft: 4, paddingRight: 4, boxShadow: '0px 0px 2px rgba(0, 0, 0, .2)' }}
                selectedKeys={[menuItem]}
                mode="inline"
                items={items}
                />
            </ConfigProvider>
        </>

    );
};
export default PharmacySidebar;