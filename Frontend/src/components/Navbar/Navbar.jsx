import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import {Tooltip as TLP} from 'antd'
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

import { FaHome, FaHeart, FaShoppingCart, FaArrowDown, FaUserCircle, FaBell, FaBoxes, FaCheckCircle, FaUser } from "react-icons/fa";
import CartDrawer from '../Drawer/CartDrawer.jsx';


import * as colors from '../../config/colors.js';
import { Link } from 'react-router-dom';
import { Icon } from '@mui/material';

import { DownOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Space } from 'antd';
import { useSelector } from 'react-redux';

function Navbar({bgColor = '#FFF', textColor = colors.GRAY0, shadow = '0px 0px 2px rgba(0, 0, 0, .2)', logo="logo.png"}) {
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <AppBar position='absolute' className='absolute top-0 left-0 w-full' sx={{backgroundColor: bgColor, color: textColor, top: 0, left: 0, py: 1, boxShadow: shadow}}>
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', gap: 1.5, flexDirection: {xs: 'column', md: 'row'}, alignItems: {xs: 'center', md: 'space-between'}, justifyContent: 'space-between' }}>
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex' },
              fontFamily: 'roboto',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link to="/pharmacy/dashboard" style={{ display: 'flex' }}>
              <img className='h-[55px]' src={`/public/images/logo/${logo}`} />
            </Link>
            
          </Typography>
          
          {/* Desktop */}

          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Box sx={{ display: 'flex', gap: '25px' }}>

              <Link to={'/pharmacy/dashboard'}>
                <Typography>Home</Typography>
              </Link>

              <Link to={'/pharmacy/orders'}>
                <Typography>Contact</Typography>
              </Link>

              <Link to={'/pharmacy/inventory'}>
                <Typography>Faqs</Typography>
              </Link>

              <Link to={'/pharmacy/inventory'}>
                <Typography>Sign Up</Typography>
              </Link>

            </Box>
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
}
export default Navbar;
