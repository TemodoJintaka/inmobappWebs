// ============================================
// SEO UTILITIES - META TAGS & STRUCTURED DATA
// ============================================

import { RealProperty } from '../types';

export interface MetaTags {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonical?: string;
}

/**
 * Generate meta tags for property detail page
 */
export const generatePropertyMetaTags = (property: RealProperty): MetaTags => {
  const price = parseFloat(property.price || '0').toLocaleString('es-VE', {
    style: 'currency',
    currency: 'USD',
  });

  const typePropertyName = property.type_property?.name || 'Propiedad';
  const stateName = property.state?.name || '';
  const negotiationName = property.type_negotiation?.name || '';
  const parishName = property.parish?.name || '';

  const title = `${property.name} - ${typePropertyName}${stateName ? ` en ${stateName}` : ''}`;
  const description = `${negotiationName} - ${typePropertyName} en ${property.address || ''}${stateName ? `, ${stateName}` : ''}. Precio: ${price}. ${(property.description || '').substring(0, 150)}...`;
  
  const keywords = [
    typePropertyName.toLowerCase(),
    negotiationName.toLowerCase(),
    stateName.toLowerCase(),
    parishName.toLowerCase(),
    'inmuebles',
    'bienes raíces',
    'propiedades',
  ].filter(Boolean).join(', ');

  const ogImage = property.images && property.images.length > 0 
    ? property.images[0].image 
    : '/default-property.jpg';

  return {
    title,
    description,
    keywords,
    ogTitle: title,
    ogDescription: description,
    ogImage,
    ogType: 'website',
    ogUrl: `/propiedades/${property.id}`,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: ogImage,
    canonical: `/propiedades/${property.id}`,
  };
};

/**
 * Generate structured data (JSON-LD) for property
 */
export const generatePropertyStructuredData = (property: RealProperty) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: property.name || 'Propiedad',
    description: property.description || '',
    image: property.images && property.images.length > 0 
      ? property.images.map(img => img.image)
      : ['/default-property.jpg'],
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: 'USD',
      availability: property.is_active 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'RealEstateAgent',
        name: property.assigned_to && property.assigned_to.user
          ? `${property.assigned_to.user.first_name || ''} ${property.assigned_to.user.last_name || ''}`.trim() || property.franchise?.name || 'Agente'
          : property.franchise?.name || 'Agente',
        email: property.assigned_to?.user?.email || property.franchise?.email || '',
        telephone: property.assigned_to?.user?.phone || property.franchise?.phone || '',
      },
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: property.address || '',
      addressLocality: property.parish?.name || '',
      addressRegion: property.state?.name || '',
      addressCountry: property.country?.name || 'Venezuela',
    },
  };

  return structuredData;
};

/**
 * Generate meta tags for listing page
 */
export const generateListingMetaTags = (
  totalProperties: number,
  filters?: any
): MetaTags => {
  let title = 'Propiedades en Venta y Alquiler';
  let description = `Encuentra ${totalProperties} propiedades disponibles. `;

  if (filters?.type_property) {
    title = `${filters.type_property} en Venta y Alquiler`;
  }

  if (filters?.state) {
    title += ` en ${filters.state}`;
    description += `Propiedades en ${filters.state}. `;
  }

  description += 'Explora nuestra amplia selección de inmuebles con filtros avanzados.';

  return {
    title,
    description,
    keywords: 'propiedades, inmuebles, bienes raíces, venta, alquiler, casas, apartamentos',
    ogTitle: title,
    ogDescription: description,
    ogType: 'website',
    canonical: '/propiedades',
  };
};

/**
 * Update document meta tags
 */
export const updateMetaTags = (metaTags: MetaTags): void => {
  if (typeof document === 'undefined') return;

  // Update title
  document.title = metaTags.title;

  // Helper function to update or create meta tag
  const updateMetaTag = (selector: string, content: string) => {
    let element = document.querySelector(selector);
    if (element) {
      element.setAttribute('content', content);
    } else {
      element = document.createElement('meta');
      const [attr, value] = selector.match(/\[(.*?)="(.*?)"\]/)?.slice(1) || [];
      if (attr && value) {
        element.setAttribute(attr, value);
        element.setAttribute('content', content);
        document.head.appendChild(element);
      }
    }
  };

  // Update meta tags
  if (metaTags.description) {
    updateMetaTag('meta[name="description"]', metaTags.description);
  }
  if (metaTags.keywords) {
    updateMetaTag('meta[name="keywords"]', metaTags.keywords);
  }

  // Open Graph tags
  if (metaTags.ogTitle) {
    updateMetaTag('meta[property="og:title"]', metaTags.ogTitle);
  }
  if (metaTags.ogDescription) {
    updateMetaTag('meta[property="og:description"]', metaTags.ogDescription);
  }
  if (metaTags.ogImage) {
    updateMetaTag('meta[property="og:image"]', metaTags.ogImage);
  }
  if (metaTags.ogUrl) {
    updateMetaTag('meta[property="og:url"]', metaTags.ogUrl);
  }
  if (metaTags.ogType) {
    updateMetaTag('meta[property="og:type"]', metaTags.ogType);
  }

  // Twitter Card tags
  if (metaTags.twitterCard) {
    updateMetaTag('meta[name="twitter:card"]', metaTags.twitterCard);
  }
  if (metaTags.twitterTitle) {
    updateMetaTag('meta[name="twitter:title"]', metaTags.twitterTitle);
  }
  if (metaTags.twitterDescription) {
    updateMetaTag('meta[name="twitter:description"]', metaTags.twitterDescription);
  }
  if (metaTags.twitterImage) {
    updateMetaTag('meta[name="twitter:image"]', metaTags.twitterImage);
  }

  // Canonical link
  if (metaTags.canonical) {
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (canonical) {
      canonical.href = metaTags.canonical;
    } else {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      canonical.href = metaTags.canonical;
      document.head.appendChild(canonical);
    }
  }
};

/**
 * Insert structured data into the document
 */
export const insertStructuredData = (data: any): void => {
  if (typeof document === 'undefined') return;

  // Remove existing structured data
  const existing = document.querySelector('script[type="application/ld+json"]');
  if (existing) {
    existing.remove();
  }

  // Add new structured data
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(data);
  document.head.appendChild(script);
};

