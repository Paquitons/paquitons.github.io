/* ============================================================
   STRUCTURED DATA
   JSON-LD built from the business facts in site.mjs. Nothing
   here is written by hand, so it can't drift from the page copy.
   No ratings, review counts or prices: we don't publish any.
   ============================================================ */

import { site, allTowns } from './site.mjs';

const BUSINESS_ID = `${site.url}/#business`;

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Electrician',
    '@id': BUSINESS_ID,
    name: site.name,
    legalName: site.legalName,
    slogan: site.tagline,
    url: site.url + '/',
    telephone: site.phoneE164,
    email: site.email,
    logo: `${site.url}/images/IronVoltElectricBadge.png`,
    image: `${site.url}/images/og-iron-volt-electric.jpg`,
    foundingDate: site.founded,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Spring',
      addressRegion: 'TX',
      addressCountry: 'US',
    },
    areaServed: allTowns.map((name) => ({ '@type': 'Place', name: `${name}, TX` })),
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '18:00',
    }],
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'license',
      name: site.license.full,
      identifier: `TECL ${site.license.number}`,
      recognizedBy: { '@type': 'GovernmentOrganization', name: site.license.issuer },
    },
    sameAs: site.social.filter((s) => s.name !== 'Google').map((s) => s.href),
  };
}

export function serviceSchema(service, path) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    serviceType: service.name,
    description: service.meta.description,
    url: site.url + path,
    provider: { '@id': BUSINESS_ID },
    areaServed: { '@type': 'Place', name: 'Greater Houston, TX' },
  };
}

export function breadcrumbSchema(crumbs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      ...(c.href ? { item: site.url + c.href } : {}),
    })),
  };
}

export function faqSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: stripTags(f.a) },
    })),
  };
}

function stripTags(s) {
  return String(s).replace(/<[^>]+>/g, '');
}
