'use client';

import React, { use, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

/** Use URL as-is if already absolute (presigned S3), otherwise prepend STRAPI_URL */
function resolveImageUrl(url?: string, fallback?: string): string {
  if (!url) return fallback || '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${STRAPI_URL}${url}`;
}



const WHATSAPP_NUMBER = '254700221171';

export default function ServiceDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(`${STRAPI_URL}/api/services?filters[Slug][$eq]=${resolvedParams.slug}&populate=*`);
        const json = await res.json();
        if (json.data && json.data.length > 0) {
          setService(json.data[0]);
        }
      } catch (err) {
        console.error('Failed to fetch service:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [resolvedParams.slug]);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 12, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }} gutterBottom>
          Loading...
        </Typography>
      </Container>
    );
  }

  if (!service) {
    return (
      <Container maxWidth="md" sx={{ py: 12, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }} gutterBottom>
          Service Not Found
        </Typography>
        <Button component={Link} href="/services" variant="contained" sx={{ mt: 4 }}>
          Back to Services
        </Button>
      </Container>
    );
  }

  const getWhatsAppLink = (productName: string) => {
    const message = `Hi Dandia Tech, I am interested in your service: ${productName}. Could you provide more information?`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <Box sx={{ bgcolor: 'background.default', pb: 12 }}>
      {/* Hero Section */}
      <Box sx={{ 
        position: 'relative', 
        height: { xs: '40vh', md: '50vh' }, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: 'common.white',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: `url(${resolveImageUrl(service.Image?.url, 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800')})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          bgcolor: 'rgba(15, 23, 42, 0.75)', // dark overlay
          zIndex: 1
        }
      }}>
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <Typography variant="overline" sx={{ fontWeight: 800, letterSpacing: 2, color: 'secondary.main', mb: 2, display: 'block' }}>
            {service.Category}
          </Typography>
          <Typography variant="h2" component="h1" sx={{ fontWeight: 900 }}>
            {service.Name}
          </Typography>
        </Container>
      </Box>

      {/* Content Section */}
      <Container maxWidth="md" sx={{ mt: -8, position: 'relative', zIndex: 3 }}>
        <Box sx={{ 
          bgcolor: 'background.paper', 
          p: { xs: 4, md: 8 }, 
          borderRadius: 4, 
          boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
          border: '1px solid',
          borderColor: 'divider'
        }}>
          <Button 
            component={Link} 
            href="/services" 
            startIcon={<ArrowBackIcon />} 
            sx={{ mb: 4, color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
          >
            Back to All Services
          </Button>

          <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary' }} gutterBottom>
            Overview
          </Typography>
          
          <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.125rem', lineHeight: 1.8, mb: 6 }}>
            {service.Description}
          </Typography>

          <Box sx={{ p: 4, bgcolor: '#f8fafc', borderRadius: 2, borderLeft: '4px solid', borderColor: 'primary.main', mb: 6 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }} gutterBottom>
              Pricing Details
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Starting from: <strong>{service.Price}</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Contact us for a tailored quote that fits your exact requirements and scale.
            </Typography>
          </Box>

          <Button 
            variant="contained" 
            color="primary" 
            size="large" 
            href={getWhatsAppLink(service.Name)}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ py: 2, px: 6, fontSize: '1.1rem', borderRadius: 2, boxShadow: '0 8px 16px rgba(10, 102, 194, 0.2)' }}
          >
            Enquire on WhatsApp
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
