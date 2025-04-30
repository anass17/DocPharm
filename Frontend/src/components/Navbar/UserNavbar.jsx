import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

import { FaHome, FaHeart, FaShoppingCart, FaPills, FaColumns, FaPlus, FaCalendar, FaStethoscope } from "react-icons/fa";
import CartDrawer from '../Drawer/CartDrawer.jsx';

import * as colors from '../../config/colors.js';
import { Link } from 'react-router-dom';

import { Badge, Tooltip as TLP } from 'antd';
import { useSelector } from 'react-redux';
import { backend_url } from '../../config/app.js';

function UserNavbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false)
  const cart = useSelector(data => data.cart.cart)
  const user = useSelector(data => data.user.user)

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

  if (!user) {
    return;
  }


  return (
    <AppBar position="static" sx={{backgroundColor: bgColor, color: textColor, top: 0, left: 0, py: 1, boxShadow: '0px 0px 2px rgba(0, 0, 0, .2)'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: 'flex',
              fontFamily: 'roboto',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link to="/user/dashboard" style={{ display: 'flex' }}>
              <img className='h-[55px]' src='/public/images/logo/logo.png' />
            </Link>
            
          </Typography>
          
          {/* Desktop */}

          <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Box sx={{ display: 'flex', mr: {xs: 0, md: 3}, gap: '3px' }}>

              <TLP title="Dashboard" color={colors.PRIMARY_GREEN}>
                <Link to={'/client/dashboard'}>
                  <Button disableRipple sx={{display: 'flex', minWidth: {xs: 40, md: 60}, justifyContent: 'center', alignItems: 'center'}}>
                    <FaHome fill={colors.GRAY2} size={24} />
                  </Button>
                </Link>

              </TLP>

              <TLP title="Appointments" color={colors.PRIMARY_GREEN}>
                <Link to={'/client/appointments'}>
                  <Button disableRipple sx={{display: 'flex', minWidth: {xs: 40, md: 60}, justifyContent: 'center', alignItems: 'center'}}>
                    <FaCalendar fill={colors.GRAY2} size={21} />
                  </Button>
                </Link>
              </TLP>

              <TLP title="Favorite" color={colors.PRIMARY_GREEN}>
                <Button disableRipple sx={{display: 'flex', minWidth: {xs: 40, md: 60}, justifyContent: 'center', alignItems: 'center'}}>
                  <FaHeart fill='#F40' size={22}/>
                </Button>
              </TLP>

              <TLP title="Cart" color={colors.PRIMARY_GREEN}>
                <Badge count={cart.length} size="small" offset={[-17, 5]} style={{background: '#FFF', color: colors.PRIMARY_GREEN, borderColor: colors.PRIMARY_GREEN, fontWeight: 500}}>
                  <Button disableRipple onClick={() => setDrawerOpen(true)} sx={{display: 'flex', minWidth: {xs: 40, md: 60}, justifyContent: 'center', alignItems: 'center'}}>
                    <FaShoppingCart fill={colors.GRAY2} size={22} />
                  </Button>
                </Badge>
              </TLP>

            </Box>
            <Tooltip title={user.first_name + ' ' + user.last_name}>
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar sx={{ width: 42, height: 42 }} src={`${backend_url}${user.profile_picture ? user.profile_picture : '/storage/user_placeholder.jpg'}`} />
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
                  minWidth: 250,
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
            <Link to={'/profile'}>
              <MenuItem style={{ paddingTop: 14, paddingBottom: 14 }}>
                <Avatar src={`${backend_url}${user?.profile_picture ? user.profile_picture : '/storage/user_placeholder.jpg'}`} /> {user.first_name} {user.last_name}
              </MenuItem>
            </Link>

            <Divider sx={{ my: 1 }} />
            
            <Link to={'/medicines'}>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <FaPills size={18} />
                </ListItemIcon>
                Medicines
              </MenuItem>
            </Link>

            <Link to={'/doctors'}>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <FaStethoscope size={18} />
                </ListItemIcon>
                Doctors
              </MenuItem>
            </Link>

            <Link to={'/pharmacies'}>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <FaPlus size={18} />
                </ListItemIcon>
                Pharmacies
              </MenuItem>
            </Link>

            <Divider sx={{ my: 1 }} />
            
            <Link to={'/user/dashboard'}>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <FaColumns size={18} />
                </ListItemIcon>
                Dashboard
              </MenuItem>
            </Link>

            <Link to={'/settings'}>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
            </Link>

            <Link to={'/logout'}>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Link>
          </Menu>
          
        </Toolbar>
      </Container>
      <CartDrawer open={drawerOpen} setOpen={setDrawerOpen} />
    </AppBar>
  );
}
export default UserNavbar;
