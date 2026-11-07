import {
  IService,
  IProject,
  ITestimonial,
  IArticle,
  IInquiry,
} from '@/models';

export const INFINIO_COMPANY = {
  name: 'Infinio Technology Solutions',
  shortName: 'INFINIO',
  founded: 2016,
  tagline: 'Order in the chaos of your digital transformation.',
  vision:
    'At Infinio Technology Solutions, we envision a world where technology seamlessly integrates with everyday business operations, driving efficiency, innovation, and growth.',
  moodlePortalUrl: 'https://216.10.251.254/infinio/login/index.php',
  googleMapsKochiUrl:
    'https://www.google.com/maps/search/?api=1&query=CIASL+Business+Centre+CIAL+Aero+Park+Nedumbassery+Kochi+Kerala+683111',
  googleMapsThrissurUrl:
    'https://www.google.com/maps/place/Infinio+Technical+Solutions/@10.5219814,76.21824,17z',
  studioPhotos: [
    {
      src: '/photos/kochi-office-1.jpg',
      title: 'CIASL Business Centre · CIAL Aero Park',
      subtitle: 'First Floor, Unit F-23A, Cochin International Airport, Nedumbassery, Kochi',
      tag: 'KOCHI STUDIO EXTERIOR',
      span: 'lg:col-span-7 lg:row-span-2',
    },
    {
      src: '/photos/kochi-workspace-2.jpg',
      title: 'Executive Architecture Boardroom',
      subtitle: 'Enterprise discovery & technical roadmapping suite in Kochi',
      tag: 'BOARDROOM',
      span: 'lg:col-span-5',
    },
    {
      src: '/photos/kochi-office-4.jpg',
      title: 'Engineering & Cloud R&D Pods',
      subtitle: 'Dedicated bays for software, WebGL, and AI engineering teams',
      tag: 'ENGINEERING FLOOR',
      span: 'lg:col-span-5',
    },
    {
      src: '/photos/kochi-office-2.jpg',
      title: 'Grand Atrium & Aviation Concourse',
      subtitle: 'Double-height reception inside CIASL Business Centre, Kochi',
      tag: 'RECEPTION ATRIUM',
      span: 'lg:col-span-4',
    },
    {
      src: '/photos/kochi-office-3.jpg',
      title: 'Infinio Academy & Cybersecurity Hall',
      subtitle: '100-seater smart auditorium for hands-on LMS cohorts & security labs',
      tag: 'ACADEMY LAB',
      span: 'lg:col-span-4',
    },
    {
      src: '/photos/kochi-workspace-4.jpg',
      title: 'CIAL Aero Park Campus',
      subtitle: 'Opposite International Terminal T3, Nedumbassery, Kochi 683111',
      tag: 'CAMPUS FACADE',
      span: 'lg:col-span-4',
    },
  ],
  offices: [
    {
      city: 'Kochi Studio',
      badge: 'CIAL AERO PARK · KOCHI',
      region: 'Ernakulam, Kerala · 683111',
      address:
        'First Floor, CIASL Business Centre, CIAL Aero Park, F-23A, Cochin International Airport, Nedumbassery ( & Metavalley TBI, Aluva), Kochi, Kerala 683111',
      phones: ['+91 97454 50618'],
      email: 'info@infinio.co.in',
      photo: '/photos/kochi-office-1.jpg',
      mapUrl:
        'https://www.google.com/maps/search/?api=1&query=CIASL+Business+Centre+CIAL+Aero+Park+Nedumbassery+Kochi+Kerala+683111',
    },
    {
      city: 'Thrissur HQ',
      badge: 'HEADQUARTERS · THRISSUR',
      region: 'Thrissur, Kerala · 680001',
      address:
        '2nd Floor, Vimala Building, Rice Bazar Road (Near St. Thomas College), Thrissur, Kerala 680001',
      phones: ['+91 94968 39168', '+91 487 2426638'],
      email: 'info@infinio.co.in',
      photo: '/photos/kochi-workspace-2.jpg',
      mapUrl:
        'https://www.google.com/maps/place/Infinio+Technical+Solutions/@10.5219814,76.21824,17z',
    },
    {
      city: 'Dubai Hub',
      badge: 'GCC OPERATIONS · DUBAI',
      region: 'Dubai, United Arab Emirates',
      address: 'Jebel Ali Industrial Area, Dubai, United Arab Emirates',
      phones: ['+971 55 625 9175'],
      email: 'info@infinio.co.in',
      photo: '/photos/kochi-office-2.jpg',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Jebel+Ali+Dubai+UAE',
    },
  ],
  pathStages: [
    {
      code: '01',
      valueName: 'Innovation',
      title: '01 · Relentless Innovation',
      body: 'We embrace emerging technologies — spatial 3D WebGL, AI workflow orchestration, and cloud-native architectures — to solve real operational bottlenecks.',
      image: '/photos/value-1.jpg',
    },
    {
      code: '02',
      valueName: 'Excellence',
      title: '02 · Engineering Excellence',
      body: 'Every database schema, API endpoint, and user interface is engineered with architectural discipline, sub-second responsiveness, and long-term maintainability.',
      image: '/photos/kochi-office-4.jpg',
    },
    {
      code: '03',
      valueName: 'Integrity',
      title: '03 · Radical Integrity',
      body: 'Since 2016, our relationships across Kochi, Thrissur, and Dubai have been anchored in transparent timelines, honest technical advisory, and dependable delivery.',
      image: '/photos/kochi-workspace-2.jpg',
    },
    {
      code: '04',
      valueName: 'Customer Focus',
      title: '04 · Customer-First Partnership',
      body: 'We measure our success by the operational clarity and measurable growth our platforms unlock for your teams and customers.',
      image: '/photos/kochi-office-3.jpg',
    },
  ],
};

export const SEED_SERVICES: IService[] = [
  {
    code: 'SRV // 01',
    slug: 'software-development',
    title: 'Software Development',
    shortTitle: 'Software',
    tagline: 'Custom enterprise applications engineered for clarity and scale.',
    description:
      'Tailored software solutions designed to meet your unique business needs — from custom ERP and workflow platforms to high-throughput mobile and web applications.',
    capabilities: [
      {
        name: 'Custom Enterprise Platforms',
        detail: 'Bespoke ERP, CRM, and operational control planes tailored to your workflows.',
      },
      {
        name: 'Mobile & Cross-Platform Apps',
        detail: 'Native-grade iOS, Android, and progressive web applications.',
      },
      {
        name: 'API & Legacy Modernization',
        detail: 'Unifying fragmented legacy databases into clean, real-time microservices.',
      },
    ],
    accentColor: '#5df2d6',
    metrics: '99.98% Uptime SLA',
    order: 1,
  },
  {
    code: 'SRV // 02',
    slug: 'web-development',
    title: 'Web & 3D Experiential',
    shortTitle: 'Web & 3D',
    tagline: 'Architectural web platforms, spatial WebGL, and high-conversion commerce.',
    description:
      'Responsive, user-friendly websites, immersive 3D WebGL brand experiences, and e-commerce platforms that elevate your digital presence and convert visitors.',
    capabilities: [
      {
        name: 'Next.js & Spatial WebGL',
        detail: 'Interactive 3D product showcases and editorial brand architectures.',
      },
      {
        name: 'Scalable E-Commerce',
        detail: 'Custom storefront engines with real-time inventory and payment gateways.',
      },
      {
        name: 'CMS & Content Systems',
        detail: 'Headless MongoDB and CMS architectures for effortless publishing.',
      },
    ],
    accentColor: '#d8b48c',
    metrics: '< 0.8s LCP Speed',
    order: 2,
  },
  {
    code: 'SRV // 03',
    slug: 'digital-transformation',
    title: 'Digital Transformation & AI',
    shortTitle: 'Transformation',
    tagline: 'Integrating intelligent automation into everyday business operations.',
    description:
      'End-to-end digital transformation strategies that replace manual spreadsheet chaos with automated pipelines, AI assistants, and real-time analytics.',
    capabilities: [
      {
        name: 'Workflow Automation',
        detail: 'Eliminating repetitive manual tasks across finance, logistics, and HR.',
      },
      {
        name: 'AI & LLM Integration',
        detail: 'Custom knowledge retrieval, intelligent triage, and predictive insights.',
      },
      {
        name: 'Executive Telemetry',
        detail: 'Live operational dashboards across multi-branch organizations.',
      },
    ],
    accentColor: '#5df2d6',
    metrics: '3.4× Process Velocity',
    order: 3,
  },
  {
    code: 'SRV // 04',
    slug: 'cloud-services',
    title: 'Cloud Services & DevOps',
    shortTitle: 'Cloud',
    tagline: 'Secure, scalable cloud infrastructure across AWS, GCP, and hybrid nodes.',
    description:
      'Secure and scalable cloud solutions — from seamless cloud migration and containerized deployment to continuous infrastructure management.',
    capabilities: [
      {
        name: 'Zero-Downtime Migration',
        detail: 'Moving on-premise workloads to resilient cloud clusters without disruption.',
      },
      {
        name: 'Kubernetes & CI/CD',
        detail: 'Automated build pipelines, container orchestration, and auto-scaling.',
      },
      {
        name: 'Database Reliability',
        detail: 'Managed MongoDB Atlas, PostgreSQL replicas, and automated backups.',
      },
    ],
    accentColor: '#d8b48c',
    metrics: 'Multi-Region HA',
    order: 4,
  },
  {
    code: 'SRV // 05',
    slug: 'it-consulting',
    title: 'IT Consulting & Strategy',
    shortTitle: 'Consulting',
    tagline: 'Strategic technology roadmaps aligned with long-term business growth.',
    description:
      'Expert advice and strategic planning to help you navigate complex technology decisions, optimize IT investments, and architect for the next decade.',
    capabilities: [
      {
        name: 'Architecture Audits',
        detail: 'Deep-dive code, database, and infrastructure reviews to eliminate bottlenecks.',
      },
      {
        name: 'Technology Roadmapping',
        detail: 'Phased investment plans that align engineering sprints with revenue goals.',
      },
      {
        name: 'Fractional CTO Advisory',
        detail: 'Dedicated senior architectural leadership for scaling teams.',
      },
    ],
    accentColor: '#5df2d6',
    metrics: 'Since 2016',
    order: 5,
  },
  {
    code: 'SRV // 06',
    slug: 'cybersecurity',
    title: 'Cybersecurity & Academy',
    shortTitle: 'Security',
    tagline: 'Proactive threat defense, VAPT audits, and enterprise LMS training.',
    description:
      'Comprehensive security measures to protect your digital assets, paired with our dedicated Infinio Moodle LMS portal for continuous technical and security upskilling.',
    capabilities: [
      {
        name: 'Threat Assessment & VAPT',
        detail: 'Vulnerability assessments and penetration testing across web and cloud.',
      },
      {
        name: 'Zero-Trust Data Protection',
        detail: 'End-to-end encryption, IAM governance, and compliance hardening.',
      },
      {
        name: 'Infinio Moodle LMS',
        detail: 'Dedicated digital learning portal for engineering and corporate teams.',
      },
    ],
    accentColor: '#d8b48c',
    metrics: '24/7 Threat Shield',
    order: 6,
  },
];

export const SEED_PROJECTS: IProject[] = [
  {
    indexCode: 'WRK // 01',
    slug: 'newply-digital-ecosystem',
    client: 'Newply',
    location: 'Kerala, India',
    year: '2025',
    category: 'Web & Digital Brand Architecture',
    tagline: 'Modernizing product catalog discovery and dealer operations.',
    description:
      'Designed and engineered a high-speed digital product showcase and dealer inquiry ecosystem for Newply, transforming a complex physical catalog into an intuitive online experience.',
    architectureNote: 'Next.js Edge · MongoDB Catalog Engine · Sub-second Search',
    deliverables: ['Brand Web Platform', 'Interactive Product Matrix', 'Dealer Lead Engine'],
    metrics: [
      { label: 'Catalog Speed', value: '0.6s' },
      { label: 'Dealer Inquiries', value: '+210%' },
    ],
    accent: '#5df2d6',
    featured: true,
    order: 1,
  },
  {
    indexCode: 'WRK // 02',
    slug: 'zamra-international-kochi',
    client: 'Zamra International',
    location: 'Kochi, Kerala',
    year: '2025',
    category: 'Enterprise Web & Cloud Infrastructure',
    tagline: 'Digital command center for Kerala’s premier international enterprise.',
    description:
      'Built a sleek, high-availability digital presence and cloud workflow for Zamra International in Kochi, handling high-volume operations and client inquiries seamlessly.',
    architectureNote: 'Cloud-Native Web · Booking Pipeline · High-Concurrency CDN',
    deliverables: ['Enterprise Platform', 'Workflow Automation', 'Cloud Migration'],
    metrics: [
      { label: 'Uptime', value: '99.99%' },
      { label: 'Partnership', value: '5+ Yrs' },
    ],
    accent: '#d8b48c',
    featured: true,
    order: 2,
  },
  {
    indexCode: 'WRK // 03',
    slug: 'finder-sports-dubai',
    client: 'Finder Sports',
    location: 'Dubai, UAE',
    year: '2025',
    category: 'Cross-Border E-Commerce & Platform',
    tagline: 'Connecting sports academies, venues, and athletes across the UAE.',
    description:
      'Engineered a responsive, high-conversion platform for Finder Sports in Dubai, enabling seamless discovery, scheduling, and management of sports programs.',
    architectureNote: 'Multi-Region Cloud · Real-Time Scheduling · Mobile Web',
    deliverables: ['Discovery Platform', 'Partner Portal', 'GCC Cloud Deployment'],
    metrics: [
      { label: 'Conversion Lift', value: '+165%' },
      { label: 'Region', value: 'Dubai UAE' },
    ],
    accent: '#5df2d6',
    featured: true,
    order: 3,
  },
  {
    indexCode: 'WRK // 04',
    slug: 'leads-venture-lab',
    client: "LEADS' Venture Lab",
    location: 'Kerala, India',
    year: '2025',
    category: 'Incubation & Innovation Portal',
    tagline: 'Digital backbone for startup incubation and mentorship cohorts.',
    description:
      "Partnered with LEADS' Venture Lab to deliver a structured digital platform that streamlines founder applications, mentor matching, and cohort milestones.",
    architectureNote: 'Cohort Management · Document Portal · Growth Analytics',
    deliverables: ['Venture Portal', 'Cohort Tracker', 'Search & Growth Engine'],
    metrics: [
      { label: 'Organic Reach', value: '3.4×' },
      { label: 'Cohort Signups', value: '+180%' },
    ],
    accent: '#d8b48c',
    featured: true,
    order: 4,
  },
  {
    indexCode: 'WRK // 05',
    slug: 'mudra-publications-thrissur',
    client: 'Mudra Publications',
    location: 'Thrissur, Kerala',
    year: '2025',
    category: 'Digital Publishing & Distribution',
    tagline: 'Bringing order to multi-edition publishing workflows and online reach.',
    description:
      'Delivered a tailored digital platform for Mudra Publications in Thrissur, streamlining publication listings, distributor orders, and reader engagement.',
    architectureNote: 'Publishing CMS · Order Workflow · Automated Notifications',
    deliverables: ['Digital Catalog', 'Order Management', 'Cloud Backup'],
    metrics: [
      { label: 'Page Speed', value: '99/100' },
      { label: 'Reader Reach', value: '+240%' },
    ],
    accent: '#5df2d6',
    featured: true,
    order: 5,
  },
  {
    indexCode: 'WRK // 06',
    slug: 'infinio-moodle-lms',
    client: 'Infinio Learning Portal',
    location: 'Kochi · Thrissur · Online',
    year: '2026',
    category: 'EdTech · Cybersecurity & Full-Stack LMS',
    tagline: 'Dedicated Moodle LMS cloud infrastructure for continuous technical mastery.',
    description:
      'Deployed and hardened Infinio’s dedicated Moodle Learning Management System, empowering students and enterprise teams with structured courses, labs, and certifications.',
    architectureNote: 'Hardened Linux Cloud · Moodle LMS · Automated Assessments',
    deliverables: ['LMS Cloud Cluster', 'Cybersecurity Labs', 'Credential Engine'],
    metrics: [
      { label: 'Active Learners', value: '2,500+' },
      { label: 'Portal', value: 'Live 24/7' },
    ],
    liveUrl: 'https://216.10.251.254/infinio/login/index.php',
    accent: '#d8b48c',
    featured: true,
    order: 6,
  },
];

export const SEED_TESTIMONIALS: ITestimonial[] = [
  {
    clientName: 'Muhsin K H',
    role: 'Managing Partner',
    company: 'Newply',
    location: 'Kerala, India',
    quote:
      'We are very satisfied clients and we would be happy to recommend Infinio! Their engineering precision transformed how we present our products.',
    projectTag: 'Web & Brand Architecture',
    rating: 5,
    order: 1,
  },
  {
    clientName: 'Executive Directorate',
    role: 'Enterprise Partner',
    company: 'Zamra International',
    location: 'Kochi, Kerala',
    quote:
      'As the years pass, our bond with Infinio is getting stronger and stronger. A truly dependable technology partner for every stage of our growth.',
    projectTag: 'Enterprise Web Platform',
    rating: 5,
    order: 2,
  },
  {
    clientName: 'Operations Team',
    role: 'Dubai Leadership',
    company: 'Finder Sports',
    location: 'Dubai, UAE',
    quote:
      'Team Infinio strives to satisfy client demands. Their company is trustworthy since it consistently delivers exceptional outcomes on schedule.',
    projectTag: 'Cross-Border Cloud Platform',
    rating: 5,
    order: 3,
  },
];

export const SEED_ARTICLES: IArticle[] = [
  {
    code: 'ESSAY // 01',
    slug: 'order-is-not-control',
    title: 'Order is not control. It is making space.',
    subtitle: 'Why stripping away visual and architectural noise makes mission-critical software weigh more.',
    category: 'Systems Architecture',
    readTime: '3 MIN READ',
    publishedAt: '2026-02-14',
    excerpt:
      'We look at every enterprise project like a plane covered in scattered fragments. Having a vision means seeing the finished system before moving the first block.',
    body: [
      'We approach every digital transformation like a field of scattered operational fragments. Spreadsheets, disconnected ERPs, slow websites, and manual handoffs are simply the starting raw material.',
      'At Infinio Technology Solutions — across our studios at CIASL Business Centre in Kochi, Vimala Building in Thrissur, and Jebel Ali in Dubai — we engineer software by removing every unnecessary detour until only pure utility remains.',
      'When you strip away operational noise, what remains carries real weight: sub-second dashboards, predictable APIs, and interfaces that require zero training.',
    ],
  },
  {
    code: 'ESSAY // 02',
    slug: 'the-illusion-of-static-order',
    title: 'The illusion of static order.',
    subtitle: 'Markets shift, traffic spikes, threats evolve. Our job is building systems that hold when disorder returns.',
    category: 'Cloud & Resilience',
    readTime: '4 MIN READ',
    publishedAt: '2026-03-02',
    excerpt:
      'Markets shift in Dubai, operations expand in Kochi, new security threats emerge overnight. Our craft is building cloud systems that hold firm.',
    body: [
      'Business complexity never stops evolving. Anyone who promises you a set-and-forget static system is selling an illusion.',
      'Our craft at Infinio is engineering cloud architectures, cybersecurity postures, and agile software that hold firm when disorder inevitably returns.',
      'Chaos is not our enemy — it is the raw matter from which resilient systems are born. We step inside it, find the underlying logic, and restore order.',
    ],
  },
  {
    code: 'ESSAY // 03',
    slug: 'everything-starts-from-one-fragment',
    title: 'Everything starts from a single module.',
    subtitle: 'Alone, a module is a silent block. Joined by the right logic, it becomes an infinite system.',
    category: 'Spatial Web & AI',
    readTime: '3 MIN READ',
    publishedAt: '2026-03-19',
    excerpt:
      'No complex platform is born whole. It is constructed one validated microservice, one shader, and one automation at a time.',
    body: [
      'No enterprise platform is born whole. It is built one resilient fragment at a time — a single API endpoint, a single database schema, a single automated workflow.',
      'That is why our emblem is the infinity loop built from modular geometric segments. Alone, a block is silent. United with others by deterministic logic, it becomes an unstoppable ecosystem.',
      'Taking what is scattered and restoring its meaning is, quite literally, what we do every day.',
    ],
  },
];

export const SEED_INQUIRIES: IInquiry[] = [
  {
    _id: 'inq-seed-1',
    name: 'Muhsin K H',
    email: 'contact@newply.in',
    phone: '+91 98460 00001',
    company: 'Newply',
    location: 'Kerala, India',
    serviceNeeded: 'Web & 3D Experiential',
    projectStage: 'Redesign / Re-architecture',
    budgetRange: '₹3L – ₹10L / $5k – $15k',
    timeline: '1 – 2 Months',
    message:
      'Looking to expand our distributor portal with real-time 3D product configurators and ERP sync.',
    status: 'scheduled',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    _id: 'inq-seed-2',
    name: 'Rashid Al Maktoum',
    email: 'ops@findersports.ae',
    phone: '+971 55 625 9175',
    company: 'Finder Sports',
    location: 'Dubai, UAE',
    serviceNeeded: 'Digital Transformation & AI',
    projectStage: 'Process & AI Automation',
    budgetRange: '₹10L+ / $15k+ Enterprise',
    timeline: 'Immediate (Within 2 Weeks)',
    message:
      'We need autonomous inventory and WhatsApp order AI agents integrated with our Dubai warehouse.',
    status: 'reviewing',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];
