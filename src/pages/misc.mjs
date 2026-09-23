/* ============================================================
   REVIEWS, PRIVACY, 404
   ============================================================ */

import { html, icon } from '../lib/html.mjs';
import { site } from '../site.mjs';
import { pageHeader, ctaBand, reviewsEmbed, profileLinks, serviceIndex } from '../components.mjs';
import { services } from '../data/services.mjs';
import { breadcrumbSchema } from '../schema.mjs';

/* ------------------------------------------------------------
   REVIEWS  /reviews
   ------------------------------------------------------------ */
export function reviewsPage() {
  const crumbs = [{ name: 'Home', href: '/' }, { name: 'Reviews' }];
  const main = html`
${pageHeader({
    crumbs,
    title: 'Customer reviews',
    lead: 'Reviews left by customers on our Google Business Profile. If we’ve done work for you, we’d be grateful for yours.',
    actions: html`<div class="button-row button-row--stack-sm">
      <a class="button button--primary button--lg" href="${site.reviewUrl}" target="_blank" rel="noopener noreferrer">Leave a Google review ${icon('external')}</a>
    </div>`,
    variant: 'compact',
  })}

<section class="section" aria-labelledby="reviews-title">
  <div class="container">
    <header class="section-head section-head--split reviews__head">
      <h2 id="reviews-title">From Google</h2>
      <div class="section-head__aside">
        <p>You’ll also find us here:</p>
        ${profileLinks()}
      </div>
    </header>
    ${reviewsEmbed()}
  </div>
</section>

${ctaBand({
    heading: 'Ready to book?',
    body: 'Request an appointment online or call us. Free written estimates, no obligation.',
  })}
`;
  return {
    path: '/reviews',
    section: 'reviews',
    title: 'Customer Reviews | Iron Volt Electric | Greater Houston Electrician',
    description: 'Google reviews from Iron Volt Electric customers across Greater Houston. Licensed electrician, TECL #41098.',
    schema: [breadcrumbSchema(crumbs)],
    main,
  };
}

/* ------------------------------------------------------------
   PRIVACY  /privacy
   Policy text unchanged from the original page.
   ------------------------------------------------------------ */
export function privacyPage() {
  const crumbs = [{ name: 'Home', href: '/' }, { name: 'Privacy policy' }];
  const main = html`
${pageHeader({
    crumbs,
    title: 'Privacy policy',
    lead: 'What we collect, what we do with it, and what we never do with it.',
    actions: false,
    variant: 'compact',
  })}

<section class="section">
  <div class="container">
    <div class="prose">
      <p class="note"><strong>Last updated:</strong> March 14, 2026</p>

      <p>${site.legalName} (“we,” “us,” or “our”) respects your privacy. This Privacy Policy explains what information we collect when you visit <a href="${site.url}">ironvoltelectric.com</a> or contact us, how we use it, and the steps we take to protect it.</p>

      <h2>Information we collect</h2>
      <p>We only collect information that you voluntarily provide to us through our website forms, phone calls, emails, or text messages. This may include:</p>
      <ul>
        <li>Your name</li>
        <li>Phone number</li>
        <li>Email address</li>
        <li>Property address</li>
        <li>Description of the electrical work you need</li>
        <li>Preferred scheduling dates and times</li>
      </ul>
      <p>We do not collect payment information through our website. Payment is handled separately at the time of service.</p>

      <h2>How we use your information</h2>
      <p>We use the information you provide solely for the purpose of:</p>
      <ul>
        <li>Responding to your inquiries and service requests</li>
        <li>Scheduling appointments and dispatching technicians</li>
        <li>Providing estimates and completing electrical work</li>
        <li>Following up on completed jobs</li>
        <li>Sending appointment confirmations or reminders</li>
      </ul>
      <p>We do not use your information for marketing emails, newsletters, or promotional campaigns unless you explicitly ask us to.</p>

      <h2>Information sharing</h2>
      <p>We do not sell, rent, or trade your personal information to third parties. Period.</p>
      <p>We may share your information only in the following limited situations:</p>
      <ul>
        <li><strong>Service delivery:</strong> With technicians or subcontractors directly involved in completing your electrical work</li>
        <li><strong>Legal requirements:</strong> If required by law, court order, or government regulation</li>
        <li><strong>Business tools:</strong> With service providers that help us operate (such as our email system), who are required to keep your data confidential</li>
      </ul>

      <h2>Cookies and analytics</h2>
      <p>Our website may use basic cookies and third-party tools (such as Google Analytics) to understand how visitors use our site. This data is anonymous and helps us improve the website experience. These tools may collect:</p>
      <ul>
        <li>Pages visited and time spent on site</li>
        <li>Browser type and device information</li>
        <li>General geographic location (city-level, not your address)</li>
      </ul>
      <p>You can disable cookies in your browser settings at any time.</p>

      <h2>Third-party widgets</h2>
      <p>Our website may embed third-party widgets (such as Google Reviews or social media buttons) that are governed by their own privacy policies. We recommend reviewing the privacy policies of those services directly.</p>

      <h2>Data security</h2>
      <p>We take reasonable measures to protect your information from unauthorized access, loss, or misuse. Our website uses HTTPS encryption, and form submissions are transmitted securely to our systems. However, no method of internet transmission is 100% secure, and we cannot guarantee absolute security.</p>

      <h2>Data retention</h2>
      <p>We retain your information only as long as needed to provide our services and fulfill legal or business obligations. If you would like us to delete your information, contact us and we will do so promptly.</p>

      <h2>Your rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Request a copy of the personal information we have about you</li>
        <li>Ask us to correct inaccurate information</li>
        <li>Ask us to delete your information</li>
        <li>Opt out of any future communications</li>
      </ul>
      <p>To exercise any of these rights, contact us using the information below.</p>

      <h2>Children’s privacy</h2>
      <p>Our website and services are not directed at individuals under the age of 18. We do not knowingly collect information from minors.</p>

      <h2>Changes to this policy</h2>
      <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date. We encourage you to review this page periodically.</p>

      <h2>Contact us</h2>
      <p>If you have questions about this Privacy Policy or how we handle your information, reach out to us:</p>
      <ul>
        <li><strong>Phone:</strong> <a href="${site.phoneHref}">${site.phone}</a></li>
        <li><strong>Email:</strong> <a href="mailto:${site.email}">${site.email}</a></li>
        <li><strong>Website:</strong> <a href="${site.url}">ironvoltelectric.com</a></li>
      </ul>
    </div>
  </div>
</section>
`;
  return {
    path: '/privacy',
    title: 'Privacy Policy | Iron Volt Electric',
    description: 'Privacy policy for Iron Volt Electric LLC: what information we collect, how we use it, and how we protect it.',
    schema: [breadcrumbSchema(crumbs)],
    main,
  };
}

/* ------------------------------------------------------------
   404
   GitHub Pages serves /404.html for any missing path, at that
   path, so every URL in it must be root-relative (it is).
   ------------------------------------------------------------ */
export function notFoundPage() {
  const main = html`
${pageHeader({
    title: 'Page not found',
    lead: `That page doesn’t exist, or it has moved. If you were looking for something specific, call ${site.phone} and we’ll point you at it.`,
    variant: 'compact',
  })}

<section class="section">
  <div class="container split">
    <div>
      <h2>Services</h2>
      <div class="mt-6">${serviceIndex(services)}</div>
    </div>
    <div>
      <h2>Everything else</h2>
      <ul class="service-index mt-6">
        ${[
          ['/', 'Home', 'Start from the beginning'],
          ['/service-area/', 'Service area', 'Every Greater Houston town we cover'],
          ['/about', 'About', 'Who we are, and what we’re licensed for'],
          ['/reviews', 'Reviews', 'What customers say about the work'],
          ['/contact', 'Contact', 'Call, text, email or send a request'],
        ].map(([href, name, desc]) => html`<li class="service-index__item"><a class="service-index__link" href="${href}"><span class="service-index__name">${name}</span><span class="service-index__desc">${desc}</span>${icon('arrow')}</a></li>`)}
      </ul>
    </div>
  </div>
</section>
`;
  return {
    path: '/404',
    title: 'Page Not Found | Iron Volt Electric',
    description: 'The page you were looking for doesn’t exist. Find Iron Volt Electric’s services, service area or contact details.',
    noindex: true,
    main,
  };
}
