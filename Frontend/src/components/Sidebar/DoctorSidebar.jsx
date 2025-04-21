import React, { useState } from 'react';
import { AppstoreOutlined } from '@ant-design/icons';
import { ConfigProvider, Menu } from 'antd';
import { GREEN, GREEN5 } from '../../config/colors';
import { useNavigate } from 'react-router-dom';
import { FaCalendarCheck, FaColumns, FaHistory, FaUser, FaUserEdit } from 'react-icons/fa';

const links = {
  '13': 'dashboard',
  '15': 'appointments',
  '16': 'appointments/history',
  '18': 'profile',
  '19': 'settings',
}

const items = [
  {
    key: 'grp1',
    label: '',
    type: 'group',
    children: [
      { key: '13', label: 'Dashboard', icon: <FaColumns /> },
    ],
  },
  {
    key: 'grp2',
    label: 'Appointments',
    type: 'group',
    children: [
      { key: '15', label: 'Appointments', icon: <FaCalendarCheck /> },
      { key: '16', label: 'Appointments History', icon: <FaHistory />},
    ],
  },
  {
    key: 'grp3',
    label: 'My Account',
    type: 'group',
    children: [
      { key: '18', label: 'Profile', icon: <FaUser /> },
      { key: '19', label: 'Settings', icon: <FaUserEdit /> },
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


const DoctorSidebar = ({menuItem}) => {

    let [modalOpen, setModalOpen] = useState(false);
    let navigate = useNavigate()

    const onClick = e => {
        if (links[e.key]) {
            navigate(`/doctor/${links[e.key]}`);
        }
    };


    return (

        <>
            <ConfigProvider theme={{
                components: {
                  Menu: {
                    itemSelectedColor: GREEN,
                    itemSelectedBg: GREEN5,
                    itemBorderRadius: 5
                  },
                },
            }}>
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
export default DoctorSidebar;