import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from 'next/link';

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: '#0f172a', color: 'common.white', pt: 10, pb: 5, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Grid container spacing={8} sx={{ mb: 8 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Box sx={{ bgcolor: 'common.white', p: 1, borderRadius: 1, display: 'inline-flex' }}>
                <Typography variant="h6" sx={{ color: 'secondary.main', letterSpacing: 1, fontWeight: 900 }}>
                  DANDIA
                </Typography>
              </Box>
              <Typography variant="h6" sx={{ ml: 2, fontWeight: 600 }}>
                Tech
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ color: 'grey.400', maxWidth: 400 }}>
              Empowering organizations to grow smarter with intelligent automation and robust software solutions. We build for scale.
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }} gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Link href="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>Home</Link>
              <Link href="/about" style={{ color: '#9ca3af', textDecoration: 'none' }}>About Us</Link>
              <Link href="/services" style={{ color: '#9ca3af', textDecoration: 'none' }}>Services</Link>
              <Link href="/contact" style={{ color: '#9ca3af', textDecoration: 'none' }}>Contact</Link>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }} gutterBottom>
              Contact
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Typography variant="body2" sx={{ color: 'grey.400' }}>
                Nairobi, Kenya
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey.400' }}>
                dandiaholdingsltd@gmail.com
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ borderTop: 1, borderColor: 'grey.800', pt: 4, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="body2" sx={{ color: 'grey.500' }}>
            © {new Date().getFullYear()} Dandia Holdings Ltd. All rights reserved.
          </Typography>
          <Typography variant="body2" sx={{ color: 'grey.500' }}>
            Designed for the future.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
