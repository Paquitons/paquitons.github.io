/* ============================================================
   STRUCTURED DATA
   JSON-LD built from the business facts in site.mjs and the
   service and town data. Nothing here is written by hand, so it
   can't drift from the page copy.
   No ratings, review counts or prices: we don't publish any.

   Entities are linked by @id, so Google reads one business, one
   website and one Service per service page, not copies of them:

     #business  Electrician (a LocalBusiness, so also an
                Organization). On every page.
     #website   WebSite, published by #business. Home page.
     <page>#service  Service, provided by #business.
   ============================================================ */

import { site, regions } from './site.mjs';
import { services } from './data/services.mjs';

export const BUSINESS_ID = `${site.url}/#business`;
const WEBSITE_ID = `${site.url}/#website`;

const place = (name) => ({ '@type': 'Place', name: `${name}, TX` });
const townWithPage = (t) => ({ '@type': 'City', name: `${t.name}, TX`, url: `${site.url}/service-area/${t.slug}` });

const MON_SAT = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const EVERY_DAY = [...MON_SAT, 'Sunday'];

export function localBusinessSchema() {
  const towns = regions.flatMap((r) => r.towns);
  return {
    '@context': 'https://schema.org',
    '@type': 'Electrician',
    '@id': BUSINESS_ID,
    name: site.name,
    legalName: site.legalName,
    slogan: site.tagline,
    description: `Licensed residential and commercial electrical contractor serving Greater Houston, with a 24/7 emergency line. ${site.license.full}.`,
    url: site.url + '/',
    telephone: site.phoneE164,
    email: site.email,
    logo: {
      '@type': 'ImageObject',
      url: `${site.url}/images/IronVoltElectricBadge.png`,
    },
    image: `${site.url}/images/og-iron-volt-electric.jpg`,
    foundingDate: site.founded,
    // A service-area business: the locality is published, the street
    // address is not, matching the Google Business Profile.
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Spring',
      addressRegion: 'TX',
      addressCountry: 'US',
    },
    areaServed: [
      { '@type': 'Place', name: 'Greater Houston, TX' },
      ...site.countyList.map((name) => ({ '@type': 'AdministrativeArea', name: `${name}, TX` })),
      ...towns.map((t) => (t.slug ? townWithPage(t) : place(t.name))),
    ],
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: MON_SAT,
      opens: '08:00',
      closes: '18:00',
    }],
    // Office hours above; the emergency line is answered around the clock.
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: site.phoneE164,
        email: site.email,
        areaServed: 'US-TX',
        availableLanguage: 'English',
        hoursAvailable: { '@type': 'OpeningHoursSpecification', dayOfWeek: MON_SAT, opens: '08:00', closes: '18:00' },
      },
      {
        '@type': 'ContactPoint',
        contactType: 'emergency',
        telephone: site.phoneE164,
        areaServed: 'US-TX',
        availableLanguage: 'English',
        hoursAvailable: { '@type': 'OpeningHoursSpecification', dayOfWeek: EVERY_DAY, opens: '00:00', closes: '23:59' },
      },
    ],
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'license',
      name: site.license.full,
      identifier: `TECL ${site.license.number}`,
      recognizedBy: { '@type': 'GovernmentOrganization', name: site.license.issuer },
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Electrical services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@id': `${site.url}/services/${s.slug}#service` },
      })),
    },
    knowsAbout: [
      'Electrical repair and troubleshooting',
      'Electrical panel replacement and service upgrades',
      'Aluminum wiring remediation',
      'EV charger installation',
      'Standby generators and transfer switches',
      'Whole-home surge protection',
      'Storm damage electrical repair',
      'Commercial electrical contracting',
      'National Electrical Code',
    ],
    sameAs: site.social.filter((s) => s.name !== 'Google').map((s) => s.href),
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: site.url + '/',
    name: site.name,
    alternateName: [site.legalName, 'Iron Volt'],
    inLanguage: 'en-US',
    publisher: { '@id': BUSINESS_ID },
  };
}

/** Towns that have their own page, as City entities. */
function townsWithPages() {
  return regions.flatMap((r) => r.towns).filter((t) => t.slug).map(townWithPage);
}

export function serviceSchema(service, path) {
  const audience = {
    residential: 'Homeowners',
    commercial: 'Businesses and property managers',
    both: 'Homeowners, buyers, sellers and businesses',
    emergency: 'Homeowners and businesses',
  }[service.group];
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${site.url}${path}#service`,
    name: service.title,
    serviceType: service.serviceType ?? service.name,
    description: service.meta.description,
    url: site.url + path,
    provider: { '@id': BUSINESS_ID },
    areaServed: [{ '@type': 'Place', name: 'Greater Houston, TX' }, ...townsWithPages()],
    ...(audience ? { audience: { '@type': 'Audience', audienceType: audience } } : {}),
    ...(service.emergency ? { hoursAvailable: { '@type': 'OpeningHoursSpecification', dayOfWeek: EVERY_DAY, opens: '00:00', closes: '23:59' } } : {}),
  };
}

/** A town page: the electrician service, in that town. */
export function areaServiceSchema(area, path) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${site.url}${path}#service`,
    name: `Electrician in ${area.name}, TX`,
    serviceType: 'Electrician',
    description: area.meta.description,
    url: site.url + path,
    provider: { '@id': BUSINESS_ID },
    areaServed: [area.name, ...(area.alsoCovers ?? [])].map((name) => ({ '@type': 'City', name: `${name}, TX` })),
  };
}

export function breadcrumbSchema(crumbs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: stripTags(c.name),
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
  return String(s).replace(/<[^>]+>/g, '').replace(/&shy;/g, '');
}
