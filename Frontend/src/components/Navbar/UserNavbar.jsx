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
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

import { ShoppingCartOutlined, HeartFilled, HomeFilled } from '@ant-design/icons';
import { FaHome, FaHeart, FaShoppingCart, FaArrowDown, FaUserCircle, FaBell } from "react-icons/fa";
import CartDrawer from '../Drawer/CartDrawer.jsx';


import * as colors from '../../config/colors.js';
import { Link } from 'react-router-dom';
import { Icon } from '@mui/material';

import { DownOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Space } from 'antd';
import { useSelector } from 'react-redux';

function UserNavbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false)
  const cart = useSelector(data => data.cart.cart)

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

    let bgColor;
    let textColor;

    bgColor = '#FFF';
    textColor = colors.GRAY0


  return (
    <AppBar position="static" sx={{backgroundColor: bgColor, color: textColor, boxShadow: 'none', top: 0, left: 0, py: 1, boxShadow: '0px 0px 2px rgba(0, 0, 0, .2)'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'roboto',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link to="/" style={{ display: 'flex' }}>
              <img height={70} src='/public/images/logo/logo.png' />
            </Link>
            
          </Typography>
          
          {/* Desktop */}

          <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Box sx={{ display: 'flex', mr: 3, gap: '3px' }}>
              <Button disableRipple sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <FaHome fill={colors.GRAY2} size={24} />
              </Button>

              <Button disableRipple sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <FaBell fill={colors.GRAY2} size={22} />
              </Button>
              <Button disableRipple sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <FaHeart fill='#F40' size={22}/>
              </Button>
              <Badge count={cart.length} size="small" offset={[-17, 5]} style={{backgroundColor: colors.GRAY0, background: colors.GRAY0, color: colors.GREEN2, borderColor: colors.GREEN2, fontWeight: 500}}>
                <Button disableRipple onClick={() => setDrawerOpen(true)} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <FaShoppingCart fill={colors.GRAY2} size={22} />
                </Button>
              </Badge>
            </Box>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  minWidth: 200,
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleClose}>
              <Avatar /> Profile
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Dashboard
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
          
        </Toolbar>
      </Container>
      <CartDrawer open={drawerOpen} setOpen={setDrawerOpen} />
    </AppBar>
  );
}
export default UserNavbar;
