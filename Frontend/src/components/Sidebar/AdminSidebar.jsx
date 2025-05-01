import React, { useState } from 'react';
import { Button, ConfigProvider, Menu } from 'antd';
import { GREEN, GREEN2, GREEN3, GREEN5 } from '../../config/colors';
import { useNavigate } from 'react-router-dom';
import { FaBan, FaBars, FaBookmark, FaBoxes, FaClock, FaCog, FaColumns, FaHeadset, FaPen, FaPills, FaQuestion, FaUser, FaUserClock, FaUserCog } from 'react-icons/fa';
import { Box, useMediaQuery } from '@mui/material';

const links = {
  '13': '/admin/dashboard',
  '14': '/admin/users/pending',
  '15': '/admin/users',
  '16': '/admin/users/banned',
  '17': '/admin/medicines/manage',
  '18': '/admin/profile',
  '19': '/admin/settings',
  '20': '/contact',
  '21': '/faqs'
}

const items = [
  {
    key: 'grp1',
    label: '',
    type: 'group',
    children: [
      { key: '13', label: 'Dashboard', icon: <FaColumns size={16} /> },
    ],
  },
  {
    key: 'grp2',
    label: 'Inventory',
    type: 'group',
    children: [
      { key: '14', label: 'Pending Users', icon: <FaUserClock size={16} /> },
      { key: '15', label: 'User Management', icon: <FaUserCog size={16} />},
      { key: '16', label: 'Banned Users', icon: <FaBan size={16} />},
    ],
  },
  {
    key: 'grp3',
    label: 'Services',
    type: 'group',
    children: [
      { key: '17', label: 'Medicine Management', icon: <FaPills size={16} /> },
    ],
  },
  {
    key: 'grp5',
    label: 'My Account',
    type: 'group',
    children: [
      { key: '18', label: 'Profile', icon: <FaUser /> },
      { key: '19', label: 'Settings', icon: <FaCog /> },
    ],
  },
  {
    key: 'grp4',
    label: 'Help',
    type: 'group',
    children: [
      { key: '20', label: 'Contact Us', icon: <FaHeadset /> },
      { key: '21', label: 'FAQs', icon: <FaQuestion /> },
    ],
  },
];


const AdminSidebar = ({menuItem}) => {

    const [mobileOpen, setMobileOpen] = useState(false)
    const lgScreen = useMediaQuery('(min-width: 1024px)');
    let navigate = useNavigate()

    const onClick = e => {
        navigate(links[e.key]);
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
                <Box className="absolute top-[85px] left-2 z-10 block lg:hidden" onClick={() => setMobileOpen(true)}>
                  <Button><FaBars /></Button>
                </Box>
                <Menu
                  onClick={onClick}
                  style={{ width: 320, minHeight: 'calc(100vh - 80px)', transition: 'transform .5s', fontWeight: '500', transform: (lgScreen ? 'none' : (mobileOpen ? 'translateX(0)' : 'translateX(-100%)')), paddingLeft: 4, paddingRight: 4, boxShadow: '0px 0px 2px rgba(0, 0, 0, .2)' }}
                  className={`fixed lg:static left-0 top-0 z-20 h-full lg:translate-x-0`}
                  selectedKeys={[menuItem]}
                  mode="inline"
                  items={items}
                />
            </ConfigProvider>
            <Box className={"absolute top-0 left-0 w-full h-full z-[15] bg-[#00000077] lg:hidden " + (mobileOpen ? 'block' : 'hidden')} onClick={() => setMobileOpen(false)} />
        </>

    );
};
export default AdminSidebar;