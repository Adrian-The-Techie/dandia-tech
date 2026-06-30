'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CodeIcon from '@mui/icons-material/Code';
import CmsHeroSection from '../components/CmsHeroSection';

export default function Home() {
  return (
    <Box>
      {/* Hero Section — CMS Controlled */}
      <CmsHeroSection
        platform="Tech"
        primaryColor="#0A66C2"
        ctaPrimaryLabel="Get Started"
        ctaPrimaryHref="/services"
        ctaSecondaryLabel="Learn More"
        ctaSecondaryHref="/about"
        ctaColor="primary"
        fallback={{
          title: 'Innovate with Dandia Tech',
          subtitle: 'Organizations of all sizes—from start-ups to established enterprises. We have built the ultimate hub to run your business smarter, faster, and more efficiently.',
          badge: 'Empowering Your Business',
        }}
      />

      {/* Unique Selling Points */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#111827' }}>
            Unique Selling Points
          </Typography>
          <Box sx={{ width: 60, height: 4, bgcolor: 'primary.main', mx: 'auto', mt: 2, borderRadius: 2 }} />
        </Box>
        <Grid container spacing={4}>
          {[
            { title: 'Reliable Performance', desc: 'High delivery rates you can trust for critical business infrastructure.', icon: <CheckCircleOutlineIcon fontSize="large" color="primary" /> },
            { title: 'Seamless Integration', desc: 'Custom APIs and solutions — all in one seamless technology stack.', icon: <SettingsSuggestIcon fontSize="large" color="primary" /> },
            { title: 'Scalable Infrastructure', desc: 'Built to handle growth, high traffic, and expanding customer bases.', icon: <TrendingUpIcon fontSize="large" color="primary" /> },
            { title: 'Custom Solutions', desc: 'Smart software designed to drastically reduce operational costs.', icon: <CodeIcon fontSize="large" color="primary" /> }
          ].map((feature, idx) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#f9fafb', border: '1px solid #f3f4f6', transition: 'all 0.3s', '&:hover': { transform: 'translateY(-5px)', borderColor: 'primary.main', boxShadow: 3 } }}>
                <CardContent sx={{ flexGrow: 1, p: 4 }}>
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography gutterBottom variant="h6" component="h2" sx={{ fontWeight: 800, color: '#1f2937' }}>
                    {feature.title}
                  </Typography>
                  <Typography color="#6b7280" variant="body2" sx={{ lineHeight: 1.6 }}>
                    {feature.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Why Choose Us - Dark Section */}
      <Box sx={{ bgcolor: '#0f172a', py: 12, color: 'white', position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', top: 0, right: 0, width: 800, height: 800, bgcolor: 'rgba(10, 102, 194, 0.1)', borderRadius: '50%', filter: 'blur(80px)', transform: 'translate(30%, -30%)' }} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={8} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 5 }}>
              <Typography variant="h3" sx={{ fontWeight: 800 }} gutterBottom>
                Why Choose Dandia?
              </Typography>
              <Typography variant="h6" sx={{ color: 'grey.400', mb: 4, fontWeight: 400 }}>
                We don't just provide services; we build partnerships. Our commitment to excellence ensures your business always stays ahead.
              </Typography>
              <Box sx={{ width: 60, height: 4, bgcolor: 'secondary.main', borderRadius: 2 }} />
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
              <Grid container spacing={3}>
                {[
                  { title: "Reliable Systems", desc: "Stable applications with minimal downtime." },
                  { title: "Modern Tech", desc: "Using Next.js, React, and cloud native stacks." },
                  { title: "Fast Delivery", desc: "Agile sprints ensuring you get features faster." },
                  { title: "Customer-Focused", desc: "Tailoring every pixel and API to your goals." }
                ].map((item, i) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={i}>
                    <Box sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 2, border: '1px solid rgba(255,255,255,0.05)', '&:hover': { bgcolor: 'rgba(255,255,255,0.06)' } }}>
                      <Typography variant="h6" sx={{ fontWeight: 700 }} gutterBottom>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'grey.400' }}>
                        {item.desc}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Trusted Brands */}
      <Container maxWidth="lg" sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="overline" sx={{ fontWeight: 800, color: 'grey.500', letterSpacing: 2 }}>
          Trusted by local and global brands
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: { xs: 4, md: 8 }, mt: 4, opacity: 0.6 }}>
          {["Safaricom", "Airtel", "Standard Chartered", "Cleanshelf", "Machakos County", "LITS"].map((partner, i) => (
            <Typography key={i} variant="h5" sx={{ fontWeight: 800, color: 'grey.600', '&:hover': { color: 'primary.main', opacity: 1, transition: '0.3s' } }}>
              {partner}
            </Typography>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
