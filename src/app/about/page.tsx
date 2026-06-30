import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function AboutPage() {
  return (
    <Box sx={{ py: 12, bgcolor: '#f9fafb' }}>
      <Container maxWidth="lg">
        <Typography variant="h2" gutterBottom sx={{ mb: 8, color: '#111827', fontWeight: 900, textAlign: 'center' }}>
          About Dandia Tech
        </Typography>

        <Box sx={{ display: 'grid', gap: 8, alignItems: 'center', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' } }}>
          <Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box component="img" src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" sx={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 3, boxShadow: 3 }} />
                <Box component="img" src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" sx={{ width: '100%', height: 250, objectFit: 'cover', borderRadius: 3, boxShadow: 3 }} />
              </Box>
              <Box sx={{ pt: 6 }}>
                <Box component="img" src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" sx={{ width: '100%', height: 320, objectFit: 'cover', borderRadius: 3, boxShadow: 3 }} />
              </Box>
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom sx={{ letterSpacing: 2, textTransform: 'uppercase', fontWeight: 800, color: 'secondary.main' }}>
              Our Story
            </Typography>
            <Typography variant="h3" gutterBottom sx={{ color: '#111827', mb: 4, fontWeight: 800 }}>
              Pioneering the Future of Technology
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, mb: 3, color: 'text.secondary' }}>
              At Dandia Tech, our mission is to empower businesses through innovative technology solutions. We specialize in building robust, scalable, and beautifully designed applications that drive growth and operational efficiency.
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, mb: 4, color: 'text.secondary' }}>
              From initial strategy to final deployment, we work closely with our clients to ensure their vision becomes a reality, leveraging modern frameworks and industry best practices.
            </Typography>

            <Box sx={{ display: 'flex', gap: 4, pt: 4, borderTop: '1px solid #e5e7eb' }}>
              <Box>
                <Typography variant="h4" color="primary.main" sx={{ fontWeight: 900 }}>
                  10+
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                  Years Experience
                </Typography>
              </Box>
              <Box>
                <Typography variant="h4" color="secondary.main" sx={{ fontWeight: 900 }}>
                  50+
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                  Projects Delivered
                </Typography>
              </Box>
              <Box>
                <Typography variant="h4" color="success.main" sx={{ fontWeight: 900 }}>
                  99%
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                  Client Satisfaction
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
