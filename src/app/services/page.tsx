'use client';

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

/** Use URL as-is if already absolute (presigned S3), otherwise prepend STRAPI_URL */
function resolveImageUrl(url?: string, fallback?: string): string {
  if (!url) return fallback || '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${STRAPI_URL}${url}`;
}

const categories = ['All', 'Software', 'Marketing', 'Design', 'Infrastructure'];

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`${STRAPI_URL}/api/services?filters[Platform][$eq]=Tech&populate=*`);
        const json = await res.json();
        if (json.data) {
          setServices(json.data);
        }
      } catch (err) {
        console.error('Failed to fetch services:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const filteredServices = services.filter(service => {
    const matchesSearch = service.Name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          service.Description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || service.Category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography variant="h2" gutterBottom sx={{ mb: 2, color: 'primary.main', fontWeight: 900, textAlign: 'center' }}>
          Our Services
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', mb: 6, maxWidth: 700, mx: 'auto', textAlign: 'center' }}>
          Explore our range of specialized services designed to accelerate your growth and enhance your digital presence.
        </Typography>
        
        {/* Filters */}
        <Box sx={{ display: 'flex', gap: 2, mb: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
          <TextField 
            label="Search Services" 
            variant="outlined" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ minWidth: 300, bgcolor: 'background.paper' }}
          />
          <TextField
            select
            label="Category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            sx={{ minWidth: 200, bgcolor: 'background.paper' }}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        {/* Service Grid */}
        <Grid container spacing={4}>
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={service.documentId || service.id}>
                <Link href={`/services/${service.Slug}`} style={{ textDecoration: 'none' }}>
                  <Card sx={{ 
                    height: 350, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: 3,
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': { 
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                      '& .overlay': {
                        bgcolor: 'rgba(0,0,0,0.5)'
                      },
                      '& .read-more': {
                        opacity: 1,
                        transform: 'translateY(0)'
                      }
                    }
                  }}>
                    {/* Background Image */}
                    <Box sx={{
                      position: 'absolute',
                      top: 0, left: 0, right: 0, bottom: 0,
                      backgroundImage: `url(${resolveImageUrl(service.Image?.url, 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800')})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      zIndex: 0
                    }} />
                    {/* Dark Overlay */}
                    <Box className="overlay" sx={{
                      position: 'absolute',
                      top: 0, left: 0, right: 0, bottom: 0,
                      bgcolor: 'rgba(0,0,0,0.65)',
                      transition: 'background-color 0.3s ease',
                      zIndex: 1
                    }} />
                    {/* Content */}
                    <Box sx={{ position: 'relative', zIndex: 2, p: 4, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', color: 'common.white' }}>
                      <Typography variant="overline" sx={{ fontWeight: 800, letterSpacing: 1, color: 'secondary.main', mb: 1 }}>
                        {service.Category}
                      </Typography>
                      <Typography variant="h5" component="h2" sx={{ fontWeight: 800 }} gutterBottom>
                        {service.Name}
                      </Typography>
                      <Box className="read-more" sx={{ 
                        opacity: 0, 
                        transform: 'translateY(10px)', 
                        transition: 'all 0.3s ease',
                        display: 'inline-block',
                        mt: 2
                      }}>
                        <Typography variant="button" sx={{ fontWeight: 700, borderBottom: '2px solid', borderColor: 'primary.main', pb: 0.5 }}>
                          View Details &rarr;
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </Link>
              </Grid>
            ))
          ) : (
            <Grid size={{ xs: 12 }}>
              <Typography variant="h6" sx={{ textAlign: 'center', color: 'text.secondary' }}>
                {loading ? 'Loading services...' : 'No services found matching your filters.'}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
