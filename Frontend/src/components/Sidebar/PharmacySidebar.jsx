import React, { useState } from 'react';
import { Button, ConfigProvider, Menu } from 'antd';
import { GREEN, GREEN2, GREEN3, GREEN5 } from '../../config/colors';
import AddMedicineModal from '../Modal/Medicine/AddMedicineModal';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaBookmark, FaBoxes, FaClock, FaColumns, FaHeadset, FaPen, FaQuestion } from 'react-icons/fa';
import { Box, useMediaQuery } from '@mui/material';

const links = {
  '13': '/pharmacy/dashboard',
  '16': '/pharmacy/inventory',
  '18': '/pharmacy/orders',
  '19': '/pharmacy/history',
  '20': '/contact',
  '21': '/faqs',
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
    label: 'Inventory',
    type: 'group',
    children: [
      { key: '15', label: 'Add New Product', icon: <FaPen /> },
      { key: '16', label: 'My Inventory', icon: <FaBoxes />},
    ],
  },
  {
    key: 'grp3',
    label: 'Orders',
    type: 'group',
    children: [
      { key: '18', label: 'Active Orders', icon: <FaClock /> },
      { key: '19', label: 'Orders History', icon: <FaBookmark /> },
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


const PharmacySidebar = ({menuItem}) => {

    let [modalOpen, setModalOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false)
    const lgScreen = useMediaQuery('(min-width: 1024px)');
    let navigate = useNavigate()

    const onClick = e => {
        if (e.key == '15') {
            setModalOpen(true);
        } else if (links[e.key]) {
            navigate(links[e.key]);
        }
    };


    return (

        <>

            <AddMedicineModal open={modalOpen} setOpen={setModalOpen} />

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
export default PharmacySidebar;