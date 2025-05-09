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
import Tooltip from '@mui/material/Tooltip';
import {Tooltip as TLP} from 'antd'
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

import { FaHome, FaBoxes, FaCheckCircle, FaUser, FaClock, FaCapsules } from "react-icons/fa";


import * as colors from '../../config/colors.js';
import { Link } from 'react-router-dom';

import { Badge } from 'antd';
import { backend_url } from '../../config/app.js';
import { useSelector } from 'react-redux';

function AdminNavbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const user = useSelector(data => data.user.user)

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <AppBar position="static" sx={{backgroundColor: '#FFF', color: colors.GRAY0, top: 0, left: 0, py: 1, boxShadow: '0px 0px 2px rgba(0, 0, 0, .2)'}}>
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
            <Link to="/admin/dashboard" style={{ display: 'flex' }}>
              <img className='h-[55px]' src='/public/images/logo/logo.png' />
            </Link>
            
          </Typography>
          
          {/* Desktop */}

          <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Box sx={{ display: 'flex', mr: {xs: 0, md: 3}, gap: '3px' }}>
              

              <TLP title="Dashboard" color={colors.PRIMARY_GREEN}>
                <Link to={'/pharmacy/dashboard'}>
                  <Button disableRipple sx={{display: 'flex', minWidth: {xs: 40, md: 60}, justifyContent: 'center', alignItems: 'center'}}>
                    <FaHome fill={colors.GRAY2} size={23} />
                  </Button>
                </Link>
              </TLP>

              <TLP title="Pending Requests" color={colors.PRIMARY_GREEN}>
                <Link to={'/admin/users/pending'}>
                  <Button disableRipple sx={{display: 'flex', minWidth: {xs: 40, md: 60}, justifyContent: 'center', alignItems: 'center'}}>
                    <FaClock fill={colors.GRAY2} size={21} />
                  </Button>
                </Link>
              </TLP>

              <TLP title="Medicine Management" color={colors.PRIMARY_GREEN}>
                <Link to={'/admin/medicines/manage'}>
                  <Button disableRipple sx={{display: 'flex', minWidth: {xs: 40, md: 60}, justifyContent: 'center', alignItems: 'center'}}> 
                    <FaCapsules fill={colors.GRAY2} size={21}/>
                  </Button>
                </Link>
              </TLP>

            </Box>
            <Tooltip title={user?.first_name + ' ' + user?.last_name}>
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar sx={{ width: 40, height: 40 }} src={`${backend_url}${user?.profile_picture ? user.profile_picture : '/storage/user_placeholder.jpg'}`} />
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
            <Link to={'/admin/profile'}>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <FaUser fontSize="small" />
                </ListItemIcon>
                Profile
              </MenuItem>
            </Link>

            <Link to={'/admin/settings'}>
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
    </AppBar>
  );
}
export default AdminNavbar;
