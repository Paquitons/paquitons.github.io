/* ============================================================
   LOCATION PAGES
   One page per town the business named as a core service area.
   A location page earns its place only if it says something that
   is true of that place and not of the next one: the housing
   stock, who issues the permit, what the weather does there. If
   a paragraph would still read correctly with the town name
   swapped, it doesn't belong here.

   `focus` links a local concern to the service page that deals
   with it. `nearby` names towns from the published service area.
   ============================================================ */

export const areas = [
  {
    slug: 'spring',
    name: 'Spring',
    meta: {
      title: 'Electrician in Spring, TX | Iron Volt Electric | (832) 610-8081',
      description: 'Licensed electrician in Spring, TX. Panel upgrades, repairs, rewiring, EV chargers and generators for homes and businesses. Emergency line answered 24/7. TECL #41098.',
    },
    lead: 'Spring is home base. Repairs, panel upgrades, EV chargers, generators and commercial work from Old Town Spring to the Grand Parkway, with an emergency line answered 24/7.',
    intro: [
      'Spring covers a lot of ground and a lot of different houses: subdivisions from the 1970s and 80s off FM 1960 and Kuykendahl, newer construction up toward the Grand Parkway, and older properties around Old Town Spring. Each era comes with its own electrical habits, and we know what to look for in all of them.',
      'Much of Spring sits outside any city limits, so the permitting picture is different from a job inside Houston. We confirm what applies to your address before we quote, and the work is done to the National Electrical Code either way.',
    ],
    focus: [
      { title: 'Panels in 1970s and 80s homes', body: 'Original panels in these houses are often 100 to 150 amps, and some are brands with a poor track record. If yours is original and you’re adding air conditioning capacity, a charger or a pool, have it assessed.', service: 'panel-upgrades' },
      { title: 'Storm season', body: 'Tropical storms and summer thunderstorms bring outages and tree damage to service masts. A standby generator and whole-home surge protection are worth planning before the season, not during it.', service: 'generators' },
      { title: 'Chargers in newer builds', body: 'Newer homes usually have a 200-amp service, but often a panel the builder already filled. A load calculation tells us whether a charger fits as it is.', service: 'ev-chargers' },
    ],
    nearby: ['Klein', 'Tomball', 'The Woodlands', 'Cypress', 'Humble'],
    faq: [
      { q: 'Do you cover all of Spring?', a: 'Yes, including Klein, the FM 1960 corridor and north to the Grand Parkway. If you’re not sure we reach your address, call and ask.' },
    ],
  },
  {
    slug: 'the-woodlands',
    name: 'The Woodlands',
    meta: {
      title: 'Electrician in The Woodlands, TX | Iron Volt Electric',
      description: 'Licensed electrician for The Woodlands: panel upgrades, standby generators, lighting, EV chargers and repairs. Written estimates and a 24/7 emergency line. TECL #41098.',
    },
    lead: 'Panel upgrades, standby generators, lighting, EV chargers and repairs across every village of The Woodlands, from Grogan’s Mill to Creekside Park.',
    intro: [
      'The Woodlands has been building since the 1970s, so the housing runs from original homes in the older villages to recent construction in Creekside Park. The older homes are reaching the age where panels, breakers and connections need attention. The newer ones tend to need capacity for chargers, generators and outdoor living.',
      'The tall pines and mature oaks are part of the appeal, and part of the risk: limbs come down on service drops and masts in storms, and that damage has to be repaired on your side before power can be restored.',
    ],
    focus: [
      { title: 'Generators and design review', body: 'Exterior equipment in The Woodlands, standby generators included, generally needs approval through residential design review before it’s installed. We can give you the equipment details and placement the application asks for.', service: 'generators' },
      { title: 'Original panels in the older villages', body: 'Homes in the older villages may still have their original panels. If yours has never been replaced, it’s worth an assessment before it becomes an emergency.', service: 'panel-upgrades' },
      { title: 'Two-story rooms', body: 'Tall entries and family rooms are common here. We hang and service fixtures at height safely, on boxes rated for their weight.', service: 'lighting' },
    ],
    nearby: ['Spring', 'Conroe', 'Shenandoah', 'Oak Ridge North', 'Magnolia', 'Tomball'],
    faq: [
      { q: 'Do I need approval to install a standby generator in The Woodlands?', a: 'In most cases, yes. Exterior additions generally go through residential design review before installation. Check your village’s current requirements; we’ll supply the equipment specifications and placement details the application asks for.' },
    ],
  },
  {
    slug: 'conroe',
    name: 'Conroe',
    meta: {
      title: 'Electrician in Conroe, TX | Iron Volt Electric',
      description: 'Licensed electrician in Conroe and around Lake Conroe. Repairs, panel upgrades, rewiring, generators and commercial electrical work. Emergency line answered 24/7. TECL #41098.',
    },
    lead: 'Repairs, panel upgrades, rewiring, generators and commercial work in Conroe and around Lake Conroe, from downtown out to Montgomery and Willis.',
    intro: [
      'Conroe is two different places, electrically. Around downtown there are older houses with older wiring, and panels that have been added to over the decades. Out along the growth corridors there are new subdivisions and commercial buildings going up every year.',
      'Inside the city limits, electrical work goes through the City of Conroe’s permitting and inspections. Around the lake and out in the county the requirements are different. We confirm which applies before we quote.',
    ],
    focus: [
      { title: 'Older homes near downtown', body: 'Original wiring, two-prong outlets and panels that have been added to over the years. We assess what’s there and give you options.', service: 'rewiring' },
      { title: 'Lake properties', body: 'Homes around Lake Conroe often have detached garages, outbuildings and outdoor living areas on long runs from the panel, and anything near water needs the right protection.', service: 'installations' },
      { title: 'Commercial growth', body: 'New retail, offices and light industrial along I-45 and SH 105. We handle build-outs, service installations and equipment hookups.', service: 'commercial' },
    ],
    nearby: ['The Woodlands', 'Willis', 'Montgomery', 'Magnolia', 'Shenandoah'],
    faq: [
      { q: 'Do you work around Lake Conroe?', a: 'Yes. Lake properties are within our service area, inside and outside the Conroe city limits.' },
    ],
  },
  {
    slug: 'cypress',
    name: 'Cypress',
    meta: {
      title: 'Electrician in Cypress, TX | Iron Volt Electric',
      description: 'Licensed electrician in Cypress, TX. EV chargers, panel upgrades, generators, outdoor circuits and repairs for newer and established homes. Emergency line 24/7. TECL #41098.',
    },
    lead: 'EV chargers, panel upgrades, generators, lighting and repairs for Cypress homes and businesses, from the 290 corridor to Bridgeland and Towne Lake.',
    intro: [
      'A lot of Cypress is newer construction, in master-planned communities along US 290 and the Grand Parkway. Most of those houses have a 200-amp service, but many panels were filled by the builder, with little room for the chargers, generators, pools and outdoor kitchens people add later.',
      'Cypress is unincorporated Harris County, so the permitting route is different from a job inside Houston. We sort that out before we quote.',
    ],
    focus: [
      { title: 'Full builder panels', body: 'A 200-amp service with no spare spaces is common. A load calculation shows whether you need a bigger panel, a sub-panel, or just better use of what’s there.', service: 'panel-upgrades' },
      { title: 'EV chargers', body: 'In newer homes the garage is often a short run from the panel. We tell you the circuit size your charger and car actually need.', service: 'ev-chargers' },
      { title: 'Outdoor living', body: 'Patio lighting, outdoor kitchens, pergola fans and pool equipment each need the right circuits and outdoor-rated protection.', service: 'installations' },
    ],
    nearby: ['Tomball', 'Jersey Village', 'Katy', 'Spring', 'Klein'],
    faq: [
      { q: 'My house is only a few years old. Why would the panel be full?', a: 'Builders size the panel for the house as built. Every circuit the plans called for is in there, which often leaves few spare spaces for anything added later. A full panel doesn’t mean there’s no capacity; a load calculation tells us what’s actually available.' },
    ],
  },
  {
    slug: 'katy',
    name: 'Katy',
    meta: {
      title: 'Electrician in Katy, TX | Iron Volt Electric',
      description: 'Licensed electrician for the Katy area, Cinco Ranch and the Energy Corridor. Residential repairs, panel upgrades, generators and commercial build-outs. TECL #41098.',
    },
    lead: 'Residential and commercial electrical work across the Katy area, including Cinco Ranch, the Energy Corridor and the I-10 corridor. Emergency line answered 24/7.',
    intro: [
      'Katy the city is small. Katy the area stretches across three counties, from the Energy Corridor out past the Grand Parkway. Homes range from established neighborhoods like Cinco Ranch to new construction further west, and the I-10 corridor is lined with retail, restaurants and offices.',
      'Whether your address is inside the City of Katy, the City of Houston or unincorporated county decides whose permit and inspection applies. We check before we quote.',
    ],
    focus: [
      { title: 'Restaurants and retail', body: 'Kitchen equipment hookups, tenant finish-outs and lighting upgrades for businesses along I-10 and the Grand Parkway.', service: 'commercial' },
      { title: 'Established neighborhoods', body: 'Homes from the 1990s and 2000s are reaching the age where original breakers, GFCIs and connections start to fail.', service: 'electrical-repairs' },
      { title: 'Backup power', body: 'Standby generators and transfer switches sized to run the air conditioning, if that’s what you need through an outage.', service: 'generators' },
    ],
    nearby: ['Cinco Ranch', 'Energy Corridor', 'Cypress', 'Memorial', 'Sugar Land'],
    faq: [
      { q: 'Do you cover both the Harris and Fort Bend County parts of Katy?', a: 'Yes. We cover the Katy area on both sides of I-10, including Cinco Ranch and the Energy Corridor.' },
    ],
  },
  {
    slug: 'humble',
    name: 'Humble',
    meta: {
      title: 'Electrician in Humble, Kingwood & Atascocita, TX | Iron Volt Electric',
      description: 'Licensed electrician in Humble, Kingwood and Atascocita. Repairs, panel upgrades, flood-damage assessments, generators and commercial work. Emergency line 24/7. TECL #41098.',
    },
    lead: 'Repairs, panel upgrades, flood-damage assessments, generators and commercial work in Humble, Kingwood and Atascocita.',
    intro: [
      'Humble, Kingwood and Atascocita sit around Lake Houston and the San Jacinto River, and many homes here have been through high water, most notably in Hurricane Harvey in 2017. Electrical equipment that has been underwater is one of the most important things to get checked after a flood.',
      'Humble is its own city, Kingwood is part of Houston, and Atascocita is unincorporated, so permits and inspections depend on the address. We confirm which applies before we quote.',
    ],
    focus: [
      { title: 'After a flood', body: 'Panels, breakers, outlets and wiring that have been submerged generally need replacing, not drying out. Water leaves corrosion and residue inside equipment that can fail later. We assess what was affected and what has to go.', service: 'electrical-repairs' },
      { title: 'Storm preparation', body: 'Standby generators, transfer switches and surge protection for homes that can’t sit through another long outage.', service: 'generators' },
      { title: 'Businesses along US 59', body: 'Service upgrades, lighting and equipment hookups for commercial properties around Humble and the airport corridor.', service: 'commercial' },
    ],
    nearby: ['Kingwood', 'Atascocita', 'Crosby', 'Spring', 'Highlands'],
    faq: [
      { q: 'My house flooded. Is the electrical system safe?', a: 'Don’t assume it is. Keep the power off to anything that was submerged until it has been assessed. Breakers, outlets, panels and some wiring that sat in water generally need replacing. We check what was affected and tell you what has to be replaced before it’s switched back on.' },
    ],
  },
  {
    slug: 'tomball',
    name: 'Tomball',
    meta: {
      title: 'Electrician in Tomball, TX | Iron Volt Electric',
      description: 'Licensed electrician in Tomball, TX. Panel upgrades, sub-panels for shops and outbuildings, generators, repairs and commercial work along SH 249. TECL #41098.',
    },
    lead: 'Electrical work for Tomball homes, acreage and businesses: panel upgrades, sub-panels for shops and outbuildings, generators, repairs, and commercial work along SH 249.',
    intro: [
      'Tomball mixes a historic downtown, established neighborhoods, newer subdivisions and a lot of land. Out toward Magnolia, properties with acreage, detached shops and barns are common, and they bring their own electrical needs: long feeder runs, sub-panels, and circuits sized for tools and equipment.',
      'Inside the City of Tomball, work goes through the city’s permitting. Outside it, the requirements differ. We check before we quote.',
    ],
    focus: [
      { title: 'Shops and outbuildings', body: 'Feeders and sub-panels for detached shops, barns and garages, sized for welders, compressors and whatever else you plan to run, with the wire sized for the length of the run.', service: 'panel-upgrades' },
      { title: 'Older homes near downtown', body: 'Older houses around downtown Tomball can have original wiring and panels that deserve a look.', service: 'rewiring' },
      { title: 'Businesses on 249 and 2920', body: 'Service, lighting and equipment work for businesses along SH 249 and FM 2920.', service: 'commercial' },
    ],
    nearby: ['Magnolia', 'Cypress', 'Spring', 'Klein', 'The Woodlands'],
    faq: [
      { q: 'Can you run power to a detached shop?', a: 'Yes. We size the feeder for what you plan to run, install a sub-panel in the shop, and handle the permit where one is required. Long runs need the wire sized for voltage drop, which we account for.' },
    ],
  },
];

export const areaBySlug = Object.fromEntries(areas.map((a) => [a.slug, a]));
