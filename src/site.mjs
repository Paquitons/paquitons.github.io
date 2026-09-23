/* ============================================================
   BUSINESS FACTS
   The one place the phone number, license, hours and service
   area are written down. Every page reads from here, so a change
   to any of them is a one-line edit and a rebuild.

   Only put things here that are true and verifiable. The site
   makes no claim that is not in this file or in page copy that
   was supplied by the business.
   ============================================================ */

export const site = {
  name: 'Iron Volt Electric',
  legalName: 'Iron Volt Electric LLC',
  tagline: 'Wired right. Done right.',
  url: 'https://www.ironvoltelectric.com',

  phone: '(832) 610-8081',
  phoneHref: 'tel:+18326108081',
  smsHref: 'sms:+18326108081',
  phoneE164: '+18326108081',
  email: 'contact@ironvoltelectric.com',

  license: {
    short: 'TECL #41098',
    number: '41098',
    full: 'Texas Electrical Contractor License #41098',
    issuer: 'Texas Department of Licensing and Regulation',
    verifyUrl: 'https://www.tdlr.texas.gov/LicenseSearch/',
  },

  hours: {
    days: 'Monday to Saturday',
    time: '8am to 6pm',
    short: 'Mon–Sat, 8am–6pm',
    emergency: 'Emergency line answered 24/7',
  },

  // The company is new; the experience behind it is not. Always say
  // both, in this order, so nobody reads "25 years" as the age of the LLC.
  founded: '2026-01-12',
  foundedLabel: 'January 2026',
  experience: '25 years',

  base: 'Spring, TX',
  counties: 'Harris, Montgomery and Fort Bend counties',

  reviewUrl: 'https://g.page/r/CXlaNGHGERuGEBM/review',
  social: [
    { name: 'Google', href: 'https://g.page/r/CXlaNGHGERuGEBM/review' },
    { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61587192351664' },
    { name: 'Instagram', href: 'https://www.instagram.com/ironvoltelectric' },
    { name: 'Yelp', href: 'https://www.yelp.com/biz/iron-volt-electric-spring' },
    { name: 'Nextdoor', href: 'https://nextdoor.com/page/iron-volt-electric/' },
    { name: 'Threads', href: 'https://www.threads.net/@ironvoltelectric' },
  ],

  // Third-party embeds kept from the original site.
  embeds: {
    commonNinjaReviews: 'pid-5f24c4ec-6d59-458d-b2c3-5e9d4336353e',
    rosieBusinessId: 'dd1f3068-c9d5-4acc-9618-78165fdaea94',
    recaptchaKey: '6LePfFstAAAAAN2BhRaic_0Oei5qy1sNxbY-3X1B',
    bookingEndpoint: 'https://ironvolt.omnemarchy.online/booking',
  },
};

/* ------------------------------------------------------------
   SERVICE AREA
   Regions and towns as published on the service area page and
   pinned on the coverage map. Towns with a `slug` have their own
   page under /service-area/.
   ------------------------------------------------------------ */
export const regions = [
  {
    name: 'North',
    towns: [
      { name: 'The Woodlands', slug: 'the-woodlands' },
      { name: 'Conroe', slug: 'conroe' },
      { name: 'Magnolia' }, { name: 'Montgomery' }, { name: 'Willis' },
      { name: 'Shenandoah' }, { name: 'Oak Ridge North' },
    ],
  },
  {
    name: 'Northwest',
    towns: [
      { name: 'Spring', slug: 'spring' },
      { name: 'Tomball', slug: 'tomball' },
      { name: 'Cypress', slug: 'cypress' },
      { name: 'Klein' }, { name: 'Jersey Village' },
      { name: 'Hedwig Village' }, { name: 'Bunker Hill Village' }, { name: 'Piney Point Village' },
    ],
  },
  {
    name: 'Northeast',
    towns: [
      { name: 'Humble', slug: 'humble' },
      { name: 'Kingwood' }, { name: 'Atascocita' }, { name: 'Crosby' },
      { name: 'Highlands' }, { name: 'Baytown' }, { name: 'Cleveland' },
      { name: 'Dayton' }, { name: 'Liberty' },
    ],
  },
  {
    name: 'West',
    towns: [
      { name: 'Katy', slug: 'katy' },
      { name: 'Cinco Ranch' }, { name: 'Energy Corridor' },
    ],
  },
  {
    name: 'Central Houston',
    towns: [
      { name: 'Houston' }, { name: 'The Heights' }, { name: 'Montrose' },
      { name: 'River Oaks' }, { name: 'Memorial' }, { name: 'Bellaire' },
      { name: 'West University Place' },
    ],
  },
  {
    name: 'Southwest',
    towns: [
      { name: 'Sugar Land' }, { name: 'Missouri City' }, { name: 'Stafford' },
    ],
  },
];

export const allTowns = regions.flatMap((r) => r.towns.map((t) => t.name));
