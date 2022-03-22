import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';

import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';


const menuId = 'primary-search-account-menu';

interface iProps {
  qtCorreio: number
  qtNotificacao: number
}

export default function MyToolbar(props: iProps) {

  const qtCorreio = props.qtCorreio
  const qtNotificacao = props.qtNotificacao
    
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      </Menu>

  );

  return (

    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

      <IconButton size="large" aria-label="show 4 new mails" color="inherit">
        <Badge badgeContent={qtCorreio} color="error">
          <MailIcon />
        </Badge>
      </IconButton>

      <IconButton
        size="large"
        aria-label="show new notifications"
        color="inherit"
        >
        <Badge badgeContent={qtNotificacao} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <IconButton
        size="large"
        edge="end"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
        >
        <AccountCircle />
      </IconButton>

      { renderMenu }
    </Box>
  )
}
