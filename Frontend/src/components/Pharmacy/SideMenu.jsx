import React, { useState } from 'react';
import { AppstoreOutlined, ClockCircleOutlined, MailOutlined, SettingOutlined, UserAddOutlined } from '@ant-design/icons';
import { ConfigProvider, Menu } from 'antd';
import { GREEN, GREEN2, GREEN3 } from '../../config/colors';
import AddMedicineModal from './AddMedicineModal';

const theme = {
    token: {
      colorPrimary: GREEN,
    },
};


const items = [
  {
    key: 'grp1',
    label: '',
    type: 'group',
    children: [
      { key: '13', label: 'Dashboard', icon: <AppstoreOutlined /> },
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
      { key: '17', label: 'Reported Products', icon: <AppstoreOutlined /> },
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


const SideMenu = () => {

    let [menuItem, setMenuItem] = useState('13');

  const onClick = e => {
    setMenuItem(e.key);
    console.log('click ', e);
  };


  return (

    <>

        {
            menuItem == '15' ? (
                <AddMedicineModal closeModal={() => {setMenuItem(0)}} />
                
            ) : null
        }

        <ConfigProvider theme={theme}>
            <Menu
            onClick={onClick}
            style={{ width: 320, minHeight: 'calc(100vh - 40px)', fontWeight: '500', paddingLeft: 4, paddingRight: 4, boxShadow: '0px 0px 2px rgba(0, 0, 0, .2)' }}
            defaultSelectedKeys={['13']}
            selectedKeys={[menuItem]}
            defaultOpenKeys={['grp1']}
            mode="inline"
            items={items}
            />
        </ConfigProvider>
    </>

  );
};
export default SideMenu;