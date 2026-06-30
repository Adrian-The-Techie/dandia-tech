'use client';

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Skeleton from '@mui/material/Skeleton';

interface HeroData {
  Title: string;
  Subtitle: string;
  BackgroundImage?: { url: string };
}

interface HeroSectionProps {
  platform: 'Tech' | 'Branding' | 'SMS';
  primaryColor: string;        // e.g. 'primary.main' or '#0A66C2'
  accentColor?: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
  ctaColor?: 'primary' | 'secondary';
  badge?: string;              // small eyebrow label above the title
  fallback?: {
    title: string;
    subtitle: string;
    badge: string;
    imageUrl?: string;
  };
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

/** Safely build the image URL.
 *  - If Strapi returns an absolute URL (presigned S3, CDN, etc.) use it as-is.
 *  - If it's a relative path, prepend STRAPI_URL.
 */
function resolveImageUrl(url?: string, fallbackUrl?: string): string | undefined {
  if (!url) return fallbackUrl;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${STRAPI_URL}${url}`;
}

export default function CmsHeroSection({
  platform,
  primaryColor,
  ctaPrimaryLabel,
  ctaPrimaryHref,
  ctaSecondaryLabel = 'Learn More',
  ctaSecondaryHref = '/about',
  ctaColor = 'primary',
  badge,
  fallback,
}: HeroSectionProps) {
  const [hero, setHero] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await fetch(
          `${STRAPI_URL}/api/hero-sections?filters[Platform][$eq]=${platform}&populate=*&pagination[limit]=1`
        );
        const json = await res.json();
        if (json.data && json.data.length > 0) {
          setHero(json.data[0]);
        }
      } catch (err) {
        console.error('Failed to fetch hero section:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHero();
  }, [platform]);

  const title = hero?.Title || fallback?.title || '';
  const subtitle = hero?.Subtitle || fallback?.subtitle || '';
  const eyebrow = badge || fallback?.badge || '';
  const imageUrl = resolveImageUrl(hero?.BackgroundImage?.url, fallback?.imageUrl);

  return (
    /* Outer wrapper: light background with a subtle radial glow — mirrors the website hero */
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        bgcolor: '#f9fafb',
        pt: { xs: 14, md: 18 },   /* room for fixed navbar */
        pb: { xs: 10, md: 14 },
      }}
    >
      {/* Decorative blurred orb — mirrors website's blue/5 circle */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '25%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          height: 600,
          bgcolor: primaryColor,
          opacity: 0.06,
          borderRadius: '50%',
          filter: 'blur(80px)',
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
            gap: { xs: 6, lg: 10 },
            alignItems: 'center',
          }}
        >
          {/* ── Left column: text ─────────────────────────────── */}
          <Box>
            {/* Eyebrow / badge */}
            {eyebrow && (
              <Typography
                variant="overline"
                sx={{
                  color: primaryColor,
                  fontWeight: 700,
                  letterSpacing: 2,
                  display: 'block',
                  mb: 2,
                }}
              >
                {eyebrow}
              </Typography>
            )}

            {loading ? (
              <>
                <Skeleton variant="text" width="85%" sx={{ mb: 1, height: 70 }} />
                <Skeleton variant="text" width="70%" sx={{ mb: 3, height: 70 }} />
                <Skeleton variant="text" width="90%" sx={{ mb: 1, height: 28 }} />
                <Skeleton variant="text" width="80%" sx={{ mb: 6, height: 28 }} />
              </>
            ) : (
              <>
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{
                    fontSize: { xs: '2.4rem', sm: '3rem', md: '3.5rem' },
                    fontWeight: 900,
                    letterSpacing: '-1.5px',
                    lineHeight: 1.1,
                    color: '#111827',
                    mb: 3,
                  }}
                >
                  {title}
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    color: '#4b5563',
                    fontWeight: 400,
                    lineHeight: 1.7,
                    mb: 5,
                    maxWidth: 560,
                  }}
                >
                  {subtitle}
                </Typography>
              </>
            )}

            {/* CTA buttons */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                color={ctaColor}
                size="large"
                component={Link}
                href={ctaPrimaryHref}
                sx={{
                  px: 5,
                  py: 1.75,
                  fontWeight: 700,
                  fontSize: '1rem',
                  borderRadius: 2,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  textTransform: 'none',
                }}
              >
                {ctaPrimaryLabel}
              </Button>

              {ctaSecondaryLabel && (
                <Button
                  variant="outlined"
                  size="large"
                  component={Link}
                  href={ctaSecondaryHref}
                  sx={{
                    px: 5,
                    py: 1.75,
                    fontWeight: 700,
                    fontSize: '1rem',
                    borderRadius: 2,
                    textTransform: 'none',
                    borderColor: '#d1d5db',
                    color: '#374151',
                    bgcolor: 'white',
                    '&:hover': {
                      borderColor: primaryColor,
                      color: primaryColor,
                      bgcolor: 'white',
                    },
                  }}
                >
                  {ctaSecondaryLabel}
                </Button>
              )}
            </Box>
          </Box>

          {/* ── Right column: image ───────────────────────────── */}
          <Box
            sx={{
              display: { xs: 'none', lg: 'block' },
              position: 'relative',
              height: 500,
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: '0 25px 60px -12px rgba(0,0,0,0.25)',
            }}
          >
            {loading ? (
              <Skeleton variant="rectangular" width="100%" height="100%" />
            ) : imageUrl ? (
              <>
                <Box
                  component="img"
                  src={imageUrl}
                  alt={title}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                {/* Gradient overlay — mirrors website hero */}
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(135deg, ${primaryColor}66 0%, transparent 100%)`,
                    mixBlendMode: 'multiply',
                  }}
                />
              </>
            ) : (
              /* Placeholder when no image is set */
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  background: `linear-gradient(135deg, ${primaryColor}22 0%, ${primaryColor}08 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography sx={{ color: primaryColor, opacity: 0.4, fontWeight: 700 }}>
                  No image set in CMS
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
