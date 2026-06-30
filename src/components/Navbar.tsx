'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import Container from '@mui/material/Container';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Contact Us', path: '/contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ my: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ bgcolor: 'primary.main', p: 0.5, borderRadius: 1, display: 'inline-flex', mr: 1 }}>
          <Typography variant="h6" sx={{ color: 'common.white', letterSpacing: 1, lineHeight: 1, fontWeight: 900 }}>
            D
          </Typography>
        </Box>
        <Typography variant="h6" sx={{ color: 'secondary.main', letterSpacing: 1, fontWeight: 800 }}>
          DANDIA
        </Typography>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton component={Link} href={item.path} sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" color="inherit" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box component={Link} href="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <Box sx={{ bgcolor: 'primary.main', p: 0.5, borderRadius: 1, display: 'inline-flex', mr: 1 }}>
              <Typography variant="h6" sx={{ color: 'common.white', letterSpacing: 1, lineHeight: 1, fontWeight: 900 }}>
                D
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ color: 'secondary.main', letterSpacing: 1, fontWeight: 800 }}>
              DANDIA
            </Typography>
            <Typography variant="body2" sx={{ color: 'success.main', ml: 1, mt: 0.5, fontWeight: 600 }}>
              Tech
            </Typography>
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button 
                key={item.label} 
                component={Link} 
                href={item.path}
                sx={{ color: 'text.primary', ml: 1 }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>
      <nav>
        <Drawer
          anchor="right"
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </AppBar>
  );
}
