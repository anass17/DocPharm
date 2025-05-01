import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


import * as colors from '../../config/colors.js';
import { Link } from 'react-router-dom';

function Navbar({bgColor = '#FFF', textColor = colors.GRAY0, shadow = '0px 0px 2px rgba(0, 0, 0, .2)', logo="logo.png", position="static"}) {

  return (
    <AppBar position={position} className='absolute top-0 left-0 w-full' sx={{backgroundColor: bgColor, color: textColor, top: 0, left: 0, py: 1, boxShadow: shadow}}>
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

              <Link to={'/'}>
                <Typography>Home</Typography>
              </Link>

              <Link to={'/contact'}>
                <Typography>Contact</Typography>
              </Link>

              <Link to={'/faqs'}>
                <Typography>Faqs</Typography>
              </Link>

              <Link to={'/register'}>
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
