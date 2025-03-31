import * as React from 'react';
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

import * as colors from '../../config/colors.js';
import { Link } from 'react-router-dom';

const pages = [['Pharmacy', '/'], ['Sign out', '/logout']];

function PharmacyNavbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

    let bgColor;
    let textColor;

    bgColor = colors.GRAY0;
    textColor = "#FFF"


  return (
    <AppBar position="static" sx={{backgroundColor: bgColor, color: textColor, boxShadow: 'none', py: 1 }}>
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
            <Link to="/">
              <span style={{color: colors.GREEN}}>Doc</span><span style={{ color: textColor }}>Pharm</span>
            </Link>
            
          </Typography>

          {/* Mobile */}

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Link to={page[1]} style={{ textAlign: 'center', textTransform: 'capitalize' }}>{page[0]}</Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link to="/">
              <span style={{color: colors.GREEN}}>Doc</span><span style={{ color: textColor }}>Pharm</span>
            </Link>
          </Typography>
          
          {/* Desktop */}

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
            {pages.map((page, index) => (
              <Link
                key={index}
                to={page[1]}
                onClick={handleCloseNavMenu}
                style={{ margin: '0 0.5rem', display: 'block', fontFamily: 'roboto', color: textColor, textTransform: 'capitalize', fontSize: '1rem' }}
              >
                {page[0]}
              </Link>
            ))}
          </Box>
          
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default PharmacyNavbar;
