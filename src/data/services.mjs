/* ============================================================
   SERVICES
   One entry per service page under /services/. The service
   template (src/templates/service.mjs) renders whichever blocks
   an entry provides, in a fixed order, so pages share a spine
   but not a shape: a page with no photography leads with facts,
   a page with a sizing table gets a table, and so on.

   Keep copy factual. Scope lists come from the original services
   page; explanatory copy is general electrical practice, not
   claims about the business. Prices appear only where the
   business supplied them.
   ============================================================ */

export const services = [
  /* ----------------------------------------------------------
     REPAIRS
     ---------------------------------------------------------- */
  {
    slug: 'electrical-repairs',
    name: 'Electrical repairs',
    title: 'Electrical repair and troubleshooting',
    // Soft hyphen: on the narrowest phones the word is wider than the screen.
    titleHtml: 'Electrical repair and trouble&shy;shooting',
    group: 'residential',
    anchors: ['repairs'],
    summary: 'Breakers that trip, dead outlets, flickering lights and faults you can’t pin down.',
    meta: {
      title: 'Electrical Repair & Troubleshooting in Spring & Houston | Iron Volt Electric',
      description: 'Tripping breakers, dead outlets, flickering lights, hot switches. Licensed electricians trace the fault and fix the cause. Spring and Greater Houston. (832) 610-8081.',
    },
    hero: {
      lead: 'Breakers that won’t stay on, outlets that quit, lights that flicker when the AC kicks in. We trace the fault to its cause, fix it to code and tell you what we found.',
      image: { key: 'panel-test-hands', alt: 'An electrician’s hands testing wiring inside an exterior panel with a clamp meter' },
    },
    intro: {
      heading: 'Fix the cause, not the symptom',
      body: [
        'A breaker that trips is doing its job. The question is why. It might be too much load on one circuit, an appliance going bad, a loose connection in a box, or insulation damaged somewhere inside a wall. Resetting it and hoping is not a repair.',
        'We test at the panel and along the circuit until we find the fault, then repair that. If we find something else on the way that you should know about, we tell you, and we tell you whether it can wait.',
      ],
    },
    signs: {
      heading: 'Call us if you notice',
      items: [
        'A breaker that trips again soon after you reset it',
        'Outlets or switches that are warm, discolored or buzzing',
        'Lights that dim or flicker when an appliance or the AC starts',
        'An outlet, or a whole room, that has gone dead',
        'GFCI outlets that trip constantly or won’t reset',
        { text: 'A burning or hot-plastic smell with no obvious source', urgent: 'Call now, day or night' },
      ],
    },
    scope: {
      heading: 'Repairs we handle',
      items: [
        'Tripped and failed breakers',
        'Dead outlets and switches',
        'Flickering and dimming lights',
        'Hot outlets, burning smells and scorch marks',
        'Circuit tracing and troubleshooting',
        'GFCI and AFCI faults',
        'Loose and failed connections',
        'Wiring damaged by rodents, nails or heat',
      ],
    },
    process: [
      { title: 'Describe the problem', body: 'Tell us what happens, when it started and what’s on the circuit. It helps us arrive with the right parts.' },
      { title: 'Test and trace', body: 'We test at the panel and along the circuit to find the actual fault, not just the place it shows up.' },
      { title: 'Price before the repair', body: 'You get the price for the repair before we do it. If the fix is bigger than expected, we explain why.' },
      { title: 'Repair and verify', body: 'We make the repair to code and test the circuit under load before we leave.' },
    ],
    safety: {
      heading: 'Until we get there',
      items: [
        'If a breaker trips again right after a reset, leave it off. Repeated resets can overheat a damaged circuit.',
        'Stop using any outlet or switch that is hot, buzzing, sparking or scorched. Switch its breaker off if you can do it safely.',
        'If you smell burning or see smoke, get everyone out and call 911 first.',
      ],
    },
    faq: [
      { q: 'Why does my breaker keep tripping?', a: 'Usually one of three things: the circuit is carrying more than it’s rated for, there’s a short circuit, or there’s a ground fault or arc fault that a GFCI or AFCI breaker is detecting. Occasionally the breaker itself is worn out. Each has a different fix, which is why we test before we replace anything.' },
      { q: 'Is a flickering light dangerous?', a: 'One flickering bulb is usually the bulb, the fixture, or a dimmer that doesn’t suit LED lamps. Lights flickering in several rooms, or dimming when a big appliance starts, can point to a loose connection at the panel or the service, and that should be checked soon. If there’s buzzing, heat or a burning smell with it, call us straight away.' },
      { q: 'How quickly can you come out?', a: 'For sparks, burning smells, heat or a total loss of power, call the emergency line. It’s answered 24/7 and those calls are dispatched as fast as we can get there. Routine repairs are scheduled Monday to Saturday, 8am to 6pm.' },
    ],
    related: ['panel-upgrades', 'rewiring', 'emergency'],
    cta: {
      heading: 'Something not working right?',
      body: 'Call and describe it. If it sounds urgent we’ll say so, and if it can wait we’ll book a time that suits you.',
    },
  },

  /* ----------------------------------------------------------
     PANEL UPGRADES
     ---------------------------------------------------------- */
  {
    slug: 'panel-upgrades',
    name: 'Panel upgrades',
    title: 'Electrical panel upgrades and replacement',
    group: 'residential',
    featured: true,
    anchors: ['panels'],
    summary: 'Service upgrades from 100A to 200A, panel replacement and breaker work.',
    meta: {
      title: 'Electrical Panel Upgrades in Spring & Houston | 100A to 200A | Iron Volt Electric',
      description: 'Panel replacement and 100A to 200A service upgrades, permitted and inspected. Load calculation first, and a straight answer on whether you need one. TECL #41098.',
    },
    hero: {
      lead: 'Replacing an old or undersized panel, upgrading service from 100 to 200 amps, and breaker work. Load calculation first, permit and utility coordination handled, and inspected before we call it done.',
      image: { key: 'panelboards-pair', alt: 'Two new panelboards installed side by side on an interior wall with their covers open' },
      facts: [
        ['Typical residential upgrade', 'One day, 4 to 8 hours'],
        ['Permit and inspection', 'Handled by us'],
      ],
    },
    intro: {
      heading: 'Does your house actually need one?',
      body: [
        'Not every house does, and we’ll say so if yours doesn’t. An upgrade makes sense when the panel can’t safely carry what you’re asking of it, when there’s no room for the circuits you want to add, or when the equipment has reached the end of its life.',
        'The answer comes from a load calculation, not a guess: what’s connected now, what you plan to add, and what the service can carry. That’s the first thing we do.',
      ],
    },
    signs: {
      heading: 'Signs it’s time',
      items: [
        'Breakers trip often, or lights dim when an appliance starts',
        'A 100-amp panel in a house with central air and modern appliances',
        'You’re adding an EV charger, pool, hot tub, generator or large appliance',
        'No spare spaces, or breakers doubled up to make room',
        'The panel is 25 years old or more',
        { text: 'Rust, water marks, scorching or a warm cover', urgent: 'Have it checked the same day' },
      ],
    },
    scope: {
      heading: 'What the work covers',
      items: [
        '100A to 200A service upgrades',
        'Full panel replacement',
        'Individual breaker replacement',
        'AFCI and GFCI breaker upgrades',
        'Sub-panels for additions, garages and shops',
        'Whole-home surge protection at the panel',
        'Load calculation and circuit balancing',
        'A clearly labeled panel directory',
      ],
    },
    gallery: {
      heading: 'Panel and service installations',
      images: [
        { key: 'service-disconnect', alt: 'Meter and service disconnect mounted on the exterior wall of a commercial building' },
        { key: 'service-rack', alt: 'Meter and distribution panel on a steel rack beside a parking area, with a green inspection tag' },
        { key: 'service-metal-building', alt: 'Meter and disconnect installed on the metal siding of a commercial building' },
        { key: 'service-stucco-wall', alt: 'Two service enclosures with conduit runs on a stucco wall' },
      ],
    },
    process: [
      { title: 'Assessment and load calculation', body: 'We look at the panel, the service and the house, and work out what it needs to carry now and later.' },
      { title: 'Written price and permit', body: 'You get the price in writing. Once you say go, we pull the permit and arrange the disconnect and reconnect with your utility.' },
      { title: 'Installation day', body: 'Most 100A to 200A residential upgrades take one day, usually four to eight hours. Power is off for part of it, and we tell you when.' },
      { title: 'Inspection and reconnection', body: 'The work is inspected, power is restored, and every circuit is labeled.' },
    ],
    safety: {
      heading: 'Panels worth a second look',
      body: [
        'Some panels have a documented record of breakers that fail to trip when they should. Federal Pacific Electric (Stab-Lok) and Zinsco are the best known, and both turn up in houses built between the 1950s and the 1980s. Having one doesn’t mean it’s about to fail. It does mean you can’t count on it, so have it assessed.',
        'Any sign of heat at the panel, like scorch marks, a hot cover or a burning smell, needs attention the same day. Call the emergency line.',
      ],
    },
    faq: [
      { q: 'How long does a panel upgrade take?', a: 'Most residential upgrades from 100A to 200A are done in a single day, usually four to eight hours. You’ll be without power for part of that. We arrange permits in advance so nothing holds up the day itself.' },
      { q: 'Do I need a bigger panel for an EV charger?', a: 'Not always. A load calculation tells us whether your current service can carry a Level 2 charger. Sometimes a smaller charger circuit or a load-management device avoids an upgrade. Sometimes the panel is genuinely at capacity. We’ll show you the numbers either way.' },
      { q: 'Will I need a permit?', a: 'Yes. Panel replacements and service upgrades need a permit and an inspection, and we handle both as part of the job. Be wary of anyone offering to skip it: unpermitted work can void your homeowner’s insurance and cause problems when you sell.' },
      { q: 'Can my existing EV charger move to a new panel?', a: 'Usually, yes. We check the circuit requirements during the estimate and tell you if anything needs to change. If you’re adding a charger and upgrading the panel, we plan both as one project, which saves time and money.' },
    ],
    related: ['ev-chargers', 'generators', 'inspections'],
    cta: {
      heading: 'Find out what your panel can carry',
      body: 'Book an assessment. We’ll run the numbers, tell you whether you need an upgrade, and put the price in writing.',
    },
  },

  /* ----------------------------------------------------------
     REWIRING
     ---------------------------------------------------------- */
  {
    slug: 'rewiring',
    name: 'Rewiring',
    title: 'House rewiring and wiring repair',
    group: 'residential',
    anchors: ['wiring'],
    summary: 'Aluminum wiring, knob-and-tube, damaged and unsafe wiring, partial or full rewires.',
    meta: {
      title: 'Rewiring & Aluminum Wiring Repair in Houston | Iron Volt Electric',
      description: 'Aluminum branch wiring, knob-and-tube, heat- and rodent-damaged wiring. In-person assessment, options and a written price. Licensed electrician, TECL #41098.',
    },
    hero: {
      lead: 'Aluminum branch wiring, knob-and-tube, cable damaged by heat or rodents, and additions wired by someone who shouldn’t have. We assess what’s in the walls and give you options, from targeted repair to a full rewire.',
      facts: [
        ['Aluminum branch wiring', 'Most common in homes built 1965 to 1973'],
        ['Knob-and-tube', 'Found in houses built before the 1950s'],
        ['Options and pricing', 'After an in-person assessment'],
      ],
    },
    intro: {
      heading: 'What’s behind the walls matters',
      body: [
        'Plenty of Houston homes from the 1960s and 70s were wired with aluminum branch circuits. The wire itself isn’t the problem; the connections are. Aluminum expands and oxidizes differently from copper, and over the years the joints at outlets, switches and splices can loosen and overheat.',
        'Older houses closer in, in neighborhoods like the Heights and Montrose, can still have knob-and-tube or cloth-insulated wiring that was never meant to carry today’s loads. And any house can have wiring damaged by rodents in the attic, by attic heat, or by an earlier owner’s weekend project.',
      ],
    },
    signs: {
      heading: 'Things we look for',
      items: [
        'Cable in the attic or garage stamped “AL” or “ALUMINUM”',
        'Outlets and switch plates that feel warm',
        'Lights that flicker when nothing else is changing',
        'Two-prong outlets throughout the house',
        'Splices made outside a junction box',
        { text: 'Scorched or melted insulation at a device', urgent: 'Stop using it and call' },
      ],
    },
    options: {
      heading: 'Your options with aluminum wiring',
      items: [
        { title: 'Repair the connections', body: 'Every connection point is reworked with connectors rated for joining aluminum to copper. Less disruptive and less expensive than a rewire, and it addresses the part that actually fails.' },
        { title: 'Replace the wiring', body: 'New copper circuits, run room by room. More work and more cost, but it settles the question for good, and it suits a house that’s being renovated anyway.' },
      ],
      note: 'We recommend one after inspecting in person, and we’ll price both if you want to compare.',
    },
    scope: {
      heading: 'What we do',
      items: [
        'Aluminum wiring remediation',
        'Partial and full rewiring',
        'Knob-and-tube replacement',
        'Repair after rodent, nail or heat damage',
        'Attic and crawlspace wiring',
        'Correcting unpermitted and DIY wiring',
      ],
    },
    process: [
      { title: 'Inspect', body: 'We open boxes, check connections, and look in the attic and at the panel to see what’s there and what condition it’s in.' },
      { title: 'Options and price', body: 'You get your options in writing, with a price for each.' },
      { title: 'Plan the work', body: 'We work room by room so most of the house keeps power, and tell you up front where we’ll need wall access.' },
      { title: 'Inspect and hand over', body: 'Permitted work is inspected, and we walk you through what changed.' },
    ],
    safety: {
      heading: 'Don’t DIY this one',
      body: [
        'Aluminum wiring needs connectors and devices rated for it. Standard outlets and push-in connectors made for copper are exactly what causes the overheating. If you’re replacing a device in an aluminum-wired house, call us first.',
      ],
    },
    faq: [
      { q: 'How do I know if I have aluminum wiring?', a: 'Look at the cable jacket where it’s visible: in the attic, in the garage or at the panel. Aluminum branch wiring is usually stamped “AL” or “ALUMINUM”. Homes built between about 1965 and 1973 are the most likely to have it. If you’re not sure, we can check during a visit.' },
      { q: 'Do I have to rewire the whole house?', a: 'Not necessarily. Many houses can be made safe by reworking the connections rather than replacing every run. We assess how much aluminum there is and what condition it’s in, then give you options at different price points.' },
    ],
    related: ['electrical-repairs', 'panel-upgrades', 'inspections'],
    cta: {
      heading: 'Not sure what’s in your walls?',
      body: 'Book an assessment. We’ll tell you what you have, what condition it’s in, and what it would take to make it right.',
    },
  },

  /* ----------------------------------------------------------
     EV CHARGERS
     ---------------------------------------------------------- */
  {
    slug: 'ev-chargers',
    name: 'EV chargers',
    title: 'EV charger installation',
    group: 'residential',
    anchors: ['ev'],
    summary: 'Level 2 home charging for every major brand, with the permit handled.',
    meta: {
      title: 'EV Charger Installation in Spring & Houston | Level 2 | Iron Volt Electric',
      description: 'Level 2 home EV charger installation for Tesla, Ford, GM, Rivian and more. Load calculation, dedicated circuit, permit handled. Licensed electrician serving Greater Houston.',
    },
    hero: {
      lead: 'Level 2 home charging for Tesla, Ford, GM, Rivian and every other major brand. We check your panel can carry it, run a dedicated circuit to where you park, and handle the permit.',
      facts: [
        ['Charger', 'Level 2, 240 volts'],
        ['Typical circuit', '40 to 60 amps, dedicated'],
        ['Permit', 'Included'],
      ],
    },
    intro: {
      heading: 'Start with the panel, not the charger',
      body: [
        'A Level 2 charger is one of the largest loads a house carries, and it runs for hours at a time. The electrical code treats it as a continuous load, so the circuit is sized at 125% of the charger’s rating: a 48-amp charger needs a 60-amp circuit.',
        'Whether your panel has room for that is the first question. Many do. Some need a lower charger setting, a load-management device or a panel upgrade. We tell you which after a load calculation, before you buy anything expensive.',
      ],
    },
    options: {
      heading: 'Hardwired or plug-in?',
      items: [
        { title: 'Hardwired', list: ['Supports the highest charging rates', 'No outlet to wear out or work loose', 'Usually the better choice for a charger that stays put'] },
        { title: 'Plug-in (NEMA 14-50)', list: ['Charger can be unplugged and taken with you', 'Usually limited to 40 amps', 'Current code requires GFCI protection on the outlet, which some chargers don’t tolerate well'] },
      ],
      note: 'We recommend one based on your charger, your car and where you park.',
    },
    scope: {
      heading: 'What’s included',
      items: [
        'Level 2 (240V) charger installation',
        'Dedicated circuit from the panel',
        'Hardwired or NEMA 14-50 outlet',
        'Garage, carport and outdoor mounting',
        'Load calculation before install',
        'Permit and inspection',
        'Every major EV brand',
      ],
    },
    process: [
      { title: 'Look at the site', body: 'Your panel, where you park, and the route between them.' },
      { title: 'Recommend and price', body: 'Charger amperage, circuit size and a written price.' },
      { title: 'Install and permit', body: 'Dedicated circuit run, charger mounted and connected, permit pulled.' },
      { title: 'Power up and test', body: 'We power it up and confirm it charges at the rate it should.' },
    ],
    safety: {
      heading: 'Why not a dryer outlet and an adapter?',
      body: [
        'An existing dryer outlet is usually on a 30-amp circuit that’s already in use, and adapters and extension cords aren’t rated for hours of continuous load. It’s a common cause of melted outlets.',
      ],
    },
    faq: [
      { q: 'Do I need a panel upgrade for an EV charger?', a: 'Not always. A load calculation tells us whether your current service can carry a Level 2 charger. Sometimes a lower charger setting or a load-management device avoids an upgrade. Sometimes the panel is genuinely at capacity. We’ll show you the numbers either way.' },
      { q: 'Which charger should I buy?', a: 'Any UL-listed Level 2 charger from a major manufacturer. If you haven’t bought one yet, talk to us first: the right amperage depends on your panel and on your car’s onboard charger, which caps how fast it can actually charge.' },
      { q: 'Can you install a charger outside?', a: 'Yes. Outdoor installations use a charger and fittings rated for outdoor use, with the circuit protected accordingly.' },
    ],
    related: ['panel-upgrades', 'installations', 'generators'],
    cta: {
      heading: 'Get a charger installed right',
      body: 'Tell us your car, your charger if you’ve already bought one, and where you park. We’ll take it from there.',
    },
  },

  /* ----------------------------------------------------------
     LIGHTING
     ---------------------------------------------------------- */
  {
    slug: 'lighting',
    name: 'Lighting',
    title: 'Lighting installation, indoors and out',
    group: 'residential',
    anchors: ['lighting'],
    summary: 'Recessed lighting, chandeliers, landscape and security lighting, LED retrofits.',
    meta: {
      title: 'Lighting Installation in Spring & Houston | Recessed, Chandeliers, Outdoor | Iron Volt Electric',
      description: 'Recessed lighting, high-ceiling chandeliers, landscape and security lighting, and LED retrofits across Greater Houston. Licensed electrician, written estimates.',
    },
    hero: {
      lead: 'Recessed lighting, chandeliers in two-story entries, fixture swaps, landscape and security lighting, and LED retrofits. Laid out properly, supported properly, and on dimmers that don’t flicker.',
      image: { key: 'foyer-chandelier', alt: 'A chandelier hung in a two-story entry above an arched front door' },
    },
    intro: {
      heading: 'Good lighting is mostly planning',
      body: [
        'Where the fixtures go, how many, what color temperature, which switches control what, and whether the dimmers suit LED lamps. Get those right and a room works. Get them wrong and no fixture will save it.',
        'We walk the space with you, suggest a layout, and price it in writing before any ceiling gets cut.',
      ],
    },
    feature: {
      heading: 'High ceilings and heavy fixtures',
      body: 'A chandelier in an 18- or 20-foot entry needs the right equipment to reach it and a box rated to carry it. Heavier fixtures need a box listed for their weight and anchored to the structure, not just to drywall. It’s the part of the job you can’t see afterward, and the part that matters most.',
    },
    gallery: {
      heading: 'Fixtures we’ve hung',
      images: [
        { key: 'foyer-crystal-chandelier', alt: 'A tall crystal chandelier hanging in a narrow two-story entry' },
        { key: 'ring-chandelier', alt: 'A large ring chandelier with candle-style lamps in a coffered ceiling' },
        { key: 'stairwell-chandelier', alt: 'An open ring chandelier hung high in a room with tall windows' },
        { key: 'linear-crystal-chandelier', alt: 'A long linear crystal chandelier hung beneath a high window wall' },
        { key: 'dining-pendant', alt: 'A lantern-style pendant over a dining area, with recessed lights in the ceiling' },
        { key: 'led-ceiling-fixture', alt: 'A flower-shaped LED ceiling fixture lit on a flat ceiling' },
      ],
    },
    scope: {
      heading: 'What we install',
      items: [
        'Recessed and track lighting',
        'Chandeliers and pendants, including high ceilings',
        'LED retrofits and upgrades',
        'Dimmer and smart switches',
        'Landscape and pathway lighting',
        'Security and flood lighting',
        'Patio, deck and pergola lighting',
        'Parking lot and exterior site lighting',
      ],
    },
    process: [
      { title: 'Walk the space', body: 'We look at the room, the ceiling and the attic above it, and talk through what you want the light to do.' },
      { title: 'Layout and price', body: 'A fixture layout, switching plan and written price before any work starts.' },
      { title: 'Install and clean up', body: 'We cut only what the layout needs, and leave the room the way we found it, apart from the lights.' },
    ],
    safety: {
      heading: 'Details that matter',
      items: [
        'Recessed lights in an insulated ceiling must be IC-rated, meaning rated for contact with insulation. The wrong fixture buried in attic insulation runs hot.',
        'LED lamps on old dimmers flicker, buzz or won’t dim low. The fix is a dimmer made for LED loads, matched to the fixture.',
      ],
    },
    faq: [
      { q: 'How much does recessed lighting cost?', a: 'It depends on the number of lights, the ceiling height, attic access and the existing wiring. Most Houston homeowners spend $100 to $200 per light installed, fixtures and labor included. A living room or kitchen with 10 to 12 lights generally runs $1,200 to $2,200. Book a free estimate for a number specific to your home.' },
      { q: 'Why do my LED lights flicker on a dimmer?', a: 'Most older dimmers were designed for incandescent bulbs and don’t handle the low load of LED lamps. The usual fix is a dimmer rated for LED, matched to the lamps you’re using. We check compatibility before we install.' },
      { q: 'Can you hang a chandelier in a two-story entry?', a: 'Yes. We bring the equipment to work at that height safely, and make sure the box and support are rated for the fixture’s weight.' },
    ],
    related: ['installations', 'commercial', 'electrical-repairs'],
    cta: {
      heading: 'Planning new lighting?',
      body: 'Tell us the room and what you have in mind. We’ll come out, suggest a layout and put the price in writing.',
    },
  },

  /* ----------------------------------------------------------
     GENERATORS
     ---------------------------------------------------------- */
  {
    slug: 'generators',
    name: 'Generators',
    title: 'Standby generators and backup power',
    group: 'residential',
    anchors: ['generators', 'surge'],
    summary: 'Standby generators, transfer switches, portable hookups and surge protection.',
    meta: {
      title: 'Generator Installation in Spring & Houston | Standby & Transfer Switches | Iron Volt Electric',
      description: 'Whole-home standby generators, automatic and manual transfer switches, portable generator hookups and whole-home surge protection, sized to your load. Greater Houston.',
    },
    hero: {
      lead: 'Whole-home standby generators, automatic and manual transfer switches, portable generator hookups and whole-home surge protection, sized to what you actually need to keep running.',
      image: { key: 'generator-brick-home', alt: 'A standby generator on a pad beside a brick house, below the meter and transfer switch' },
    },
    intro: {
      heading: 'Sized to what you need to keep running',
      body: [
        'After Winter Storm Uri in 2021 and Hurricane Beryl in 2024, a lot of Houston households decided they weren’t sitting through another multi-day outage. The right generator depends on what you want running when the grid is down: the essentials, or the whole house including the air conditioning.',
        'We size it with a load calculation, not a guess, and install the transfer switch that keeps it safe for you and for the line crews working to restore power.',
      ],
    },
    table: {
      heading: 'Rough sizing',
      head: ['Generator size', 'What it typically runs'],
      rows: [
        ['7 to 12 kW', 'Essentials: lights, refrigerator and key outlets'],
        ['20 to 22 kW', 'Most of a house, including central air'],
        ['24 to 30 kW and up', 'Larger homes, or more than one AC system'],
      ],
      note: 'A guide only. We confirm the size with a load calculation during the estimate.',
    },
    scope: {
      heading: 'What we install',
      groups: [
        { title: 'Generators', items: ['Whole-home standby generators', 'Portable generator hookups', 'Generac, Kohler, Cummins and Briggs & Stratton', 'Permit coordination'] },
        { title: 'Transfer switches', items: ['Automatic transfer switches', 'Manual transfer switches', 'Generator inlets and interlocks'] },
        { title: 'Surge protection', items: ['Whole-home surge protection at the panel', 'Point-of-use protection', 'HVAC and appliance protection'] },
      ],
    },
    gallery: {
      heading: 'Backup power installations',
      images: [
        { key: 'generator-cummins', alt: 'A Cummins standby generator newly set on its pad in a backyard' },
        { key: 'transfer-switch', alt: 'An electric meter and a transfer switch mounted on a stucco wall' },
        { key: 'generator-side-yard', alt: 'A standby generator installed in a side yard next to air conditioning units' },
        { key: 'generator-setting', alt: 'A standby generator with its cover open during installation' },
      ],
    },
    process: [
      { title: 'Site visit and load calculation', body: 'What you want to run, where the unit can go, and the clearances it needs from windows, doors and property lines.' },
      { title: 'Written price and permit', body: 'Generator size, transfer switch and a written price. We handle the electrical permit.' },
      { title: 'Installation', body: 'Pad, generator, transfer switch and wiring. The gas line is run by a licensed plumber; we tell you exactly what supply the unit needs.' },
      { title: 'Start-up and test', body: 'We run it, test a transfer under load, and show you how it works.' },
    ],
    safety: {
      heading: 'Never backfeed a house',
      body: [
        'Plugging a portable generator into a dryer or wall outlet with a double-ended cord sends power back out through your service. It can energize the lines outside and injure the crews working on them, and it can start a fire inside. A transfer switch or an interlock is the only safe way to connect one.',
        'Run portable generators outdoors only, well away from windows, doors and vents. Carbon monoxide builds up faster than people expect.',
      ],
    },
    faq: [
      { q: 'What size generator does my house need?', a: 'It depends what you want to keep running. A 7 to 12 kW unit covers essentials: lights, fridge and key outlets. A 20 to 22 kW unit runs most of a house including HVAC. Larger homes may need 24 to 30 kW or more. We run a load calculation during the estimate and recommend a size.' },
      { q: 'Automatic or manual transfer switch?', a: 'An automatic transfer switch starts the generator and switches the house over on its own when the power drops, whether you’re home or not. It’s the standard choice for a standby generator. A manual switch or an interlock suits a portable generator, where you start it and switch over yourself.' },
      { q: 'Do I need surge protection too?', a: 'It’s worth having in any house, and when a service is upgraded or replaced, current code requires it anyway. A whole-home surge protector at the panel protects everything downstream, including the electronics in your HVAC and appliances.' },
    ],
    related: ['panel-upgrades', 'emergency', 'installations'],
    cta: {
      heading: 'Ready for the next outage?',
      body: 'Book a site visit. We’ll size the generator to your load and put the price in writing.',
    },
  },

  /* ----------------------------------------------------------
     INSTALLATIONS
     ---------------------------------------------------------- */
  {
    slug: 'installations',
    name: 'Outlets, fans & circuits',
    title: 'Outlets, switches, ceiling fans and new circuits',
    group: 'residential',
    anchors: ['outlets', 'fans', 'circuits'],
    summary: 'New outlets, GFCI and USB outlets, smart switches, fans and dedicated circuits.',
    meta: {
      title: 'Outlet, Switch, Ceiling Fan & Dedicated Circuit Installation | Iron Volt Electric',
      description: 'New outlets, GFCI and USB outlets, smart switches, ceiling fans on fan-rated boxes, 240V outlets and dedicated circuits. Licensed electrician serving Spring and Greater Houston.',
    },
    hero: {
      lead: 'Outlets where you actually need them, GFCI and USB outlets, smart switches, ceiling fans on a proper fan-rated box, 240-volt outlets, and dedicated circuits for appliances, shops, hot tubs and home offices.',
      image: { key: 'led-ceiling-fixture', alt: 'A flower-shaped LED ceiling fixture installed on a flat ceiling' },
    },
    intro: {
      heading: 'Small jobs, done properly',
      body: [
        'Adding an outlet or hanging a fan looks simple, and usually is. The details are what separate a job that lasts from one that doesn’t: a box rated for a fan’s weight and movement, the right protection on outlets in kitchens, baths, garages and outdoors, and a circuit that can actually carry what’s plugged into it.',
      ],
    },
    scope: {
      heading: 'What we install',
      groups: [
        { title: 'Outlets and switches', items: ['Additional outlets', 'GFCI outlets for kitchens, baths, garages and outdoors', 'USB and smart outlets', '240V outlets', 'Smart and dimmer switches', 'Tamper-resistant outlet replacement'] },
        { title: 'Ceiling fans', items: ['New fan installation and wiring', 'Fan-rated box fitted in existing ceilings', 'Remote and smart fan controls', 'Outdoor-rated fans for patios', 'Old fan removal and disposal'] },
        { title: 'Dedicated circuits', items: ['Kitchen appliances', 'Washer and dryer', 'Home office and server equipment', 'Hot tub and pool equipment', 'Workshop and garage'] },
      ],
    },
    feature: {
      heading: 'Why a fan needs its own box',
      body: 'A standard ceiling box is made to hold a light fixture that just hangs there. A fan is heavier and it moves, and over time it can work a light box loose. Code requires a box listed for fan support. We fit one where there isn’t one, through the existing opening, without taking the ceiling apart.',
    },
    process: [
      { title: 'Tell us what you need', body: 'What you want added or moved, and where. Photos help.' },
      { title: 'Written price', body: 'You know the cost before we start.' },
      { title: 'Install and test', body: 'Installed to code, tested, and the area cleaned up.' },
    ],
    faq: [
      { q: 'Can you add an outlet without tearing up the walls?', a: 'Usually, yes. We fish cable through existing walls from the attic or from below. Two-story walls and fire blocking make some runs harder, and we tell you before we start if a small access opening will be needed.' },
      { q: 'Do I need a dedicated circuit?', a: 'Large appliances, anything with a motor or heating element that runs for long periods, and equipment whose manufacturer calls for one should have its own circuit. Sharing a circuit is a common cause of nuisance tripping.' },
    ],
    related: ['lighting', 'electrical-repairs', 'ev-chargers'],
    cta: {
      heading: 'Need something added or moved?',
      body: 'Tell us what and where. We’ll price it in writing before we start.',
    },
  },

  /* ----------------------------------------------------------
     INSPECTIONS
     ---------------------------------------------------------- */
  {
    slug: 'inspections',
    name: 'Inspections & code corrections',
    title: 'Electrical inspections and code corrections',
    group: 'both',
    anchors: ['inspections'],
    summary: 'Home-sale repairs, pre-purchase assessments and failed-inspection corrections.',
    meta: {
      title: 'Electrical Inspections & Code Corrections | Home Sale Repairs | Iron Volt Electric',
      description: 'Fixing electrical items on a home inspection report, pre-sale and pre-purchase assessments, failed inspections and GFCI/AFCI compliance. Licensed electrician, Spring and Greater Houston.',
    },
    hero: {
      lead: 'Pre-sale and pre-purchase assessments, electrical items flagged on a home inspection report, preparing for a city inspection, and correcting work that failed one.',
      image: { key: 'service-rack', alt: 'A new service installation on a steel rack with its green inspection tag attached' },
    },
    intro: {
      heading: 'When the report comes back with electrical items',
      body: [
        'A buyer’s inspector flags the panel, the GFCIs and a handful of outlets, and now there’s a deadline. We look at each item, tell you which ones are real safety issues and which are minor, and fix what needs fixing.',
        'We’re electricians, not home inspectors. We don’t write the report; we correct what it found, and we can put those corrections in writing for the other side of the sale.',
      ],
    },
    signs: {
      heading: 'Items that often show up on inspection reports',
      items: [
        'Missing GFCI protection in kitchens, baths, garages and outdoors',
        'Double-tapped breakers',
        'Open grounds and reversed polarity at outlets',
        'Missing knockout covers or panel screws',
        'Federal Pacific or Zinsco panels',
        'Aluminum branch wiring',
        'Junction boxes without covers, and exposed splices',
      ],
    },
    scope: {
      heading: 'What we handle',
      items: [
        'Inspection report repairs',
        'Pre-sale electrical assessment',
        'Pre-purchase assessment',
        'Preparation for city inspections',
        'Code violation correction',
        'GFCI and AFCI compliance upgrades',
        'Commercial code corrections',
        'Emergency and exit lighting',
      ],
    },
    process: [
      { title: 'Send us the report', body: 'Email the electrical section, or the whole report, to contact@ironvoltelectric.com.' },
      { title: 'Verify on site', body: 'We confirm each item in person. Reports are sometimes wrong in both directions.' },
      { title: 'Written price', body: 'Where it helps the negotiation, we can break it down item by item.' },
      { title: 'Correct and document', body: 'We make the corrections and describe the work in writing.' },
    ],
    safety: {
      heading: 'Not every flag is urgent. Some are.',
      body: [
        'A missing knockout cover is a quick fix. A double-tapped breaker or an overheating connection is a real hazard. We tell you plainly which is which, so you’re not paying for alarm and not ignoring something that matters.',
      ],
    },
    faq: [
      { q: 'Can you fix just the items on the report?', a: 'Yes. We look at each item, confirm it, and price the corrections. If we find something else that’s a genuine safety problem we’ll tell you, but you decide what gets done.' },
      { q: 'Do you do pre-purchase assessments?', a: 'Yes. If you’re buying an older home, especially one with an original panel or aluminum wiring, an electrician’s assessment before you close tells you what you’re taking on.' },
      { q: 'We failed a city inspection. Can you help?', a: 'Send us the inspector’s notes. We’ll correct the items and get the work ready for re-inspection.' },
    ],
    related: ['panel-upgrades', 'rewiring', 'commercial'],
    cta: {
      heading: 'Got an inspection report?',
      body: 'Email it to us or call. We’ll tell you what’s urgent, what isn’t, and what it costs to fix.',
      email: true,
    },
  },

  /* ----------------------------------------------------------
     COMMERCIAL
     ---------------------------------------------------------- */
  {
    slug: 'commercial',
    name: 'Commercial electrical',
    title: 'Commercial electrical contractor',
    group: 'commercial',
    anchors: ['commercial'],
    summary: 'Tenant build-outs, service upgrades, three-phase work, lighting and equipment hookups.',
    meta: {
      title: 'Commercial Electrician in Spring & Houston | Build-Outs, Service, Lighting | Iron Volt Electric',
      description: 'Commercial electrical for retail, offices, warehouses and restaurants: tenant finish-outs, 200A to 400A and three-phase service, LED lighting and equipment hookups. TECL #41098.',
    },
    hero: {
      lead: 'Retail, offices, warehouses and restaurants across Harris, Montgomery and Fort Bend counties. Tenant finish-outs, service upgrades and three-phase work, lighting, equipment hookups, and repairs that keep downtime short.',
      image: { key: 'service-rack-meter', alt: 'A freestanding commercial service with meter and panel on a steel rack beside a parking lot' },
    },
    intro: {
      heading: 'Keeping the doors open',
      body: [
        'On a commercial job the electrical work is rarely the point; the business is. We plan shutdowns with you so they’re as short as possible and happen when they hurt least, and we keep you posted on anything that affects your schedule.',
        'Our license covers commercial work, and we carry general liability and workers’ compensation. We provide proof of insurance before any work begins.',
      ],
    },
    capabilities: {
      heading: 'What we do for businesses',
      groups: [
        { title: 'Repairs and troubleshooting', items: ['Emergency commercial repairs', 'Circuit troubleshooting and replacement', 'Outlet and switch repairs', 'Panel and breaker repairs'] },
        { title: 'Service and distribution', items: ['200A to 400A service upgrades', 'Three-phase panel installation', 'Sub-panel installation', 'Load analysis and planning'] },
        { title: 'Tenant build-outs', items: ['New construction rough-in', 'Tenant finish-out wiring', 'Permit and inspection coordination', 'ADA-compliant outlet placement'] },
        { title: 'Lighting', items: ['LED retrofits and energy upgrades', 'Warehouse and industrial lighting', 'Parking lot and exterior lighting', 'Emergency and exit lighting'] },
        { title: 'Equipment hookups', items: ['Commercial kitchen equipment', 'HVAC and refrigeration', 'Industrial machinery connections', 'Single- and three-phase, 208V to 480V'] },
        { title: 'Protection and compliance', items: ['Panel-mounted surge protection', 'Server and IT equipment protection', 'Inspection preparation', 'Code violation correction'] },
      ],
    },
    gallery: {
      heading: 'Commercial service work',
      images: [
        { key: 'service-metal-building', alt: 'Meter and disconnect installed on the metal siding of a commercial building' },
        { key: 'service-disconnect', alt: 'Meter and service disconnect mounted on the exterior wall of a commercial building' },
        { key: 'panelboards-pair', alt: 'Two new panelboards installed side by side on an interior wall' },
        { key: 'service-stucco-wall', alt: 'Two service enclosures with conduit runs on a stucco wall' },
      ],
    },
    process: [
      { title: 'Walkthrough', body: 'We walk the site with you, and review drawings if there are any.' },
      { title: 'Scope and price', body: 'A written scope and price, with anything that depends on the landlord, the utility or other trades called out.' },
      { title: 'Permits and schedule', body: 'We pull the electrical permit and plan the work, and any shutdowns, around your hours.' },
      { title: 'Work, inspection and closeout', body: 'Installed, inspected and handed over with the panel directories updated.' },
    ],
    faq: [
      { q: 'Are you licensed and insured for commercial work?', a: 'Yes. We hold Texas Electrical Contractor License #41098 and carry general liability and workers’ compensation. We provide proof of insurance before any work begins.' },
      { q: 'Do you handle permits for tenant build-outs?', a: 'Yes. We pull the electrical permit and coordinate the inspections as part of the job.' },
    ],
    related: ['inspections', 'lighting', 'emergency'],
    cta: {
      heading: 'Have a commercial project?',
      body: 'Send us the scope, the drawings if you have them, and the timeline. We’ll walk it and price it.',
      email: true,
    },
  },

  /* ----------------------------------------------------------
     EMERGENCY
     ---------------------------------------------------------- */
  {
    slug: 'emergency',
    name: 'Emergency service',
    title: '24/7 emergency electrician',
    group: 'emergency',
    anchors: ['emergency'],
    emergency: true,
    summary: 'Sparks, burning smells, hot panels, power loss and storm damage. Answered 24/7.',
    meta: {
      title: '24/7 Emergency Electrician in Spring & Houston | (832) 610-8081 | Iron Volt Electric',
      description: 'Sparks, burning smells, hot outlets, power loss or storm damage? Our emergency line is answered 24/7. Licensed electrician serving Spring and Greater Houston. Call (832) 610-8081.',
    },
    hero: {
      lead: 'Sparks, a burning smell, a hot panel, power out to part of the house, or storm damage to your service. Our line is answered 24/7, and emergency calls are dispatched as fast as we can get there.',
    },
    signs: {
      heading: 'Call now if you have',
      items: [
        'Sparks or arcing from an outlet, switch or panel',
        'A burning or hot-plastic smell',
        'An outlet, switch, cord or panel that is hot to the touch',
        'Power out to part of the house while the neighbors have power',
        'A breaker that trips immediately every time it’s reset',
        'Water in or near electrical equipment',
        'Storm or tree damage to the service mast, meter or wiring on your house',
      ],
    },
    steps: {
      heading: 'While you wait',
      items: [
        'If there’s fire or smoke, get everyone out and call 911.',
        'If it’s safe to reach, switch off the affected breaker, or the main breaker.',
        'Don’t touch anything electrical that’s wet or standing in water.',
        'Stay clear of any downed wire and assume it’s live. Report it to your utility and to 911.',
      ],
    },
    intro: {
      heading: 'Us, or the utility?',
      body: [
        'If the whole street is dark, it’s the utility. If the wires from the pole to your house are down, call the utility and stay clear.',
        'Damage on your side of the meter is ours to fix: the service mast, weatherhead, meter base, panel and everything in the house. After a storm, that damage usually has to be repaired before the utility will reconnect you.',
      ],
    },
    process: [
      { title: 'Call (832) 610-8081', body: 'Day or night. The line is answered 24/7.' },
      { title: 'Tell us what’s happening', body: 'We tell you whether it’s safe to wait, what to switch off, and when we can be there.' },
      { title: 'We make it safe', body: 'The first job is isolating the fault so nothing gets worse.' },
      { title: 'Then the repair', body: 'If the permanent repair is a bigger job, you get a written price before we do it.' },
    ],
    faq: [
      { q: 'How quickly can you respond to an emergency?', a: 'Our line at (832) 610-8081 is answered 24/7. Sparks, burning smells, complete power loss and breakers that trip repeatedly are prioritized and dispatched as fast as we can get there. Don’t wait on these; they turn into fire hazards quickly.' },
      { q: 'Is a tripped breaker an emergency?', a: 'Usually not. Reset it once. If it trips again straight away, leave it off and call us during business hours, unless there’s heat, a burning smell or sparking. In that case, call the emergency line.' },
    ],
    related: ['electrical-repairs', 'panel-upgrades', 'generators'],
  },
];

export const serviceBySlug = Object.fromEntries(services.map((s) => [s.slug, s]));

/** Services in the order they appear in navigation and on the hub. */
export const residentialServices = services.filter((s) => s.group === 'residential' || s.group === 'both');
export const commercialService = serviceBySlug.commercial;
export const emergencyService = serviceBySlug.emergency;
