import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEO_CONFIG } from '../../lib/seo-config';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  structuredData?: object;
  noindex?: boolean;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonical,
  ogType = 'website',
  ogImage = SEO_CONFIG.defaultOgImage,
  structuredData,
  noindex = false,
}) => {
  const fullTitle = title ? `${title} | ${SEO_CONFIG.siteName}` : `${SEO_CONFIG.siteName} | ${SEO_CONFIG.defaultTitle}`;
  const metaDescription = description || SEO_CONFIG.defaultDescription;
  const metaKeywords = keywords || SEO_CONFIG.defaultKeywords;
  
  const url = canonical || (typeof window !== 'undefined' ? `${SEO_CONFIG.baseUrl}${window.location.pathname}` : SEO_CONFIG.baseUrl);

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="author" content={SEO_CONFIG.author} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={SEO_CONFIG.siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />
      {SEO_CONFIG.twitterHandle && <meta name="twitter:site" content={SEO_CONFIG.twitterHandle} />}

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};
