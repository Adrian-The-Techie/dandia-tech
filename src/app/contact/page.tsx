'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  subject: yup.string().required('Subject is required'),
  message: yup.string().required('Message is required').min(10, 'Message should be of minimum 10 characters length'),
});

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export default function ContactPage() {
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitStatus(null);
      try {
        const response = await fetch(`${STRAPI_URL}/api/enquiries`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            data: {
              Name: values.name,
              Email: values.email,
              Subject: values.subject,
              Message: values.message,
              Platform: 'Tech'
            }
          }),
        });

        if (response.ok) {
          setSubmitStatus({ type: 'success', message: 'Message sent successfully! We will get back to you soon.' });
          resetForm();
        } else {
          setSubmitStatus({ type: 'error', message: 'Failed to send message. Please try again later.' });
        }
      } catch (error) {
        setSubmitStatus({ type: 'error', message: 'An error occurred. Please try again later.' });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Box sx={{ 
      py: 12, 
      bgcolor: '#f9fafb',
      color: 'text.primary',
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center'
    }}>
      <Container maxWidth="lg">
        <Card sx={{ 
          bgcolor: 'common.white', 
          borderRadius: 4,
          boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
          border: '1px solid #f3f4f6',
          overflow: 'hidden'
        }}>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' } 
          }}>
            {/* Left Column: Contact Info */}
            <Box sx={{ 
              p: { xs: 5, lg: 8 }, 
              bgcolor: 'primary.main', 
              color: 'common.white',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Decorative Blur */}
              <Box sx={{ 
                position: 'absolute', 
                top: 0, 
                right: 0, 
                width: 256, 
                height: 256, 
                bgcolor: 'rgba(255,255,255,0.1)', 
                borderRadius: '50%', 
                filter: 'blur(80px)', 
                zIndex: 0 
              }} />
              
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
                  Ready to get started?
                </Typography>
                <Typography variant="body1" sx={{ color: 'primary.light', mb: 6, fontSize: '1.1rem', lineHeight: 1.6 }}>
                  Transform your business with intelligent technology. Get in touch with our team today to discuss your project.
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', width: 48, height: 48, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <EmailIcon sx={{ color: 'common.white' }} />
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ color: 'primary.light', mb: 0.5 }}>Email Us</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>dandiaholdingsltd@gmail.com</Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', width: 48, height: 48, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <LocationOnIcon sx={{ color: 'common.white' }} />
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ color: 'primary.light', mb: 0.5 }}>Visit Us</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>Nairobi, Kenya</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Right Column: Form */}
            <Box sx={{ p: { xs: 5, lg: 8 } }}>
              <Typography variant="h4" sx={{ color: '#111827', fontWeight: 700, mb: 4 }}>
                Send us a message
              </Typography>

              {submitStatus && (
                <Alert severity={submitStatus.type} sx={{ mb: 4 }}>
                  {submitStatus.message}
                </Alert>
              )}
              
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      id="name"
                      name="name"
                      label="Your Name"
                      variant="outlined"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      id="email"
                      name="email"
                      label="Email Address"
                      variant="outlined"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      id="subject"
                      name="subject"
                      label="Subject"
                      variant="outlined"
                      value={formik.values.subject}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.subject && Boolean(formik.errors.subject)}
                      helperText={formik.touched.subject && formik.errors.subject}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      id="message"
                      name="message"
                      label="Message"
                      variant="outlined"
                      multiline
                      rows={4}
                      value={formik.values.message}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.message && Boolean(formik.errors.message)}
                      helperText={formik.touched.message && formik.errors.message}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Button 
                      color="primary" 
                      variant="contained" 
                      fullWidth 
                      type="submit" 
                      size="large"
                      disabled={formik.isSubmitting}
                      sx={{ py: 1.5, fontSize: '1rem', fontWeight: 600, boxShadow: '0 4px 12px rgba(10, 102, 194, 0.2)' }}
                    >
                      {formik.isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Box>
        </Card>
      </Container>
    </Box>
  );
}
