'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Container from '@mui/material/Container';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Contact Us', path: '/contact' },
];

export default function Navbar() {
  return (
    <AppBar position="sticky" color="inherit" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box component={Link} href="/" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
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
        </Toolbar>
      </Container>
    </AppBar>
  );
}
