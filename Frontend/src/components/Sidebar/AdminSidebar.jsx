import React, { useState } from 'react';
import { ConfigProvider, Menu } from 'antd';
import { GREEN, GREEN2, GREEN3, GREEN5 } from '../../config/colors';
import AddMedicineModal from '../Modal/Medicine/AddMedicineModal';
import { useNavigate } from 'react-router-dom';
import { FaBan, FaBookmark, FaBoxes, FaClock, FaCog, FaColumns, FaHeadset, FaPen, FaPills, FaQuestion, FaUser, FaUserClock, FaUserCog } from 'react-icons/fa';

const links = {
  '13': 'dashboard',
  '14': 'users/pending',
  '15': 'users',
  '16': 'users/banned',
  '17': 'medicines/manage',
  '18': 'settings',
  '19': 'settings',
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

    let [modalOpen, setModalOpen] = useState(false);
    let navigate = useNavigate()

    const onClick = e => {
        navigate(`/admin/${links[e.key]}`);
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
export default AdminSidebar;