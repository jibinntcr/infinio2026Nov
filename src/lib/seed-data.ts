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
  siteUrl: 'https://app-sepia-tau-ngxwehnvd9.vercel.app',
  tagline: 'Order in the chaos of your digital transformation.',
  vision:
    'At Infinio Technology Solutions, we envision a world where technology seamlessly integrates with everyday business operations, driving efficiency, innovation, and sustainable growth.',
  moodlePortalUrl: 'https://216.10.251.254/infinio/login/index.php',
  googleMapsKochiUrl:
    'https://www.google.com/maps/search/?api=1&query=CIASL+Business+Centre+CIAL+Aero+Park+Nedumbassery+Kochi+Kerala+683111',
  googleMapsThrissurUrl:
    'https://www.google.com/maps/place/Infinio+Technical+Solutions/@10.5219814,76.21824,17z',
  offices: [
    {
      city: 'Kochi Studio',
      badge: 'CIAL AERO PARK · KOCHI',
      region: 'Ernakulam, Kerala · 683111',
      address:
        'First Floor, CIASL Business Centre, CIAL Aero Park, F-23A, Cochin International Airport, Nedumbassery, Kochi, Kerala 683111',
      phones: ['+91 97454 50618'],
      email: 'info@infinio.co.in',
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
      image: '/photos/infinio-team.jpg',
    },
    {
      code: '03',
      valueName: 'Integrity',
      title: '03 · Radical Integrity',
      body: 'Since 2016, our relationships across Kochi, Thrissur, and Dubai have been anchored in transparent timelines, honest technical advisory, and dependable delivery.',
      image: '/photos/value-2.jpg',
    },
    {
      code: '04',
      valueName: 'Customer Focus',
      title: '04 · Customer-First Partnership',
      body: 'We measure our success by the operational clarity and measurable growth our platforms unlock for your teams and customers.',
      image: '/photos/value-4.jpg',
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
    accentColor: '#1a73e8',
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
        name: 'SEO & GEO Dominance',
        detail: 'Semantic schema, sub-second Core Web Vitals, and AI-search readiness.',
      },
    ],
    accentColor: '#7b61ff',
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
    accentColor: '#d96570',
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
    accentColor: '#137333',
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
    accentColor: '#b06000',
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
    accentColor: '#1a73e8',
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
    accent: '#1a73e8',
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
    accent: '#7b61ff',
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
    accent: '#b06000',
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
    accent: '#137333',
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
    accent: '#d96570',
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
    accent: '#1a73e8',
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
    code: 'BLOG // 01',
    slug: 'architecting-enterprise-software-for-scale',
    title: 'Why Most Enterprise Software Fails at the Architecture Layer (And How to Fix It)',
    subtitle: 'Replacing fragmented spreadsheets and siloed SaaS tools with a unified MongoDB & Next.js operational core.',
    category: 'Software Architecture',
    readTime: '5 min read',
    publishedAt: '2026-10-28',
    author: 'Infinio Architecture Team',
    authorRole: 'Enterprise Systems Practice · Kochi & Thrissur',
    coverImage: '/photos/infinio-team.jpg',
    tags: ['Enterprise Software', 'MongoDB', 'Next.js', 'System Design'],
    seoTitle: 'Enterprise Software Architecture Guide | Infinio Technology Solutions',
    seoDescription:
      'Learn how Infinio Technology Solutions re-architects fragmented enterprise ERPs and spreadsheets into high-speed unified platforms across Kerala and Dubai.',
    excerpt:
      'Growing companies across India and the UAE often accumulate a patchwork of disconnected spreadsheets and SaaS tools. Here is how we re-architect them into calm, unified platforms.',
    body: [
      'When organizations scale across multiple branches — whether from Thrissur and Kochi to Dubai — software entropy sets in fast. Teams spin up isolated spreadsheets, disconnected ERPs, and brittle scripts that never quite stay in sync.',
      'At Infinio Technology Solutions, our first step is never writing code blindly. We map the actual flow of decisions, inventory, and approvals across your organization, then design a clean MongoDB and microservice backbone where every event has a single source of truth.',
      'By separating read-heavy executive dashboards from transactional write pipelines and enforcing strict schema validation, we consistently deliver sub-second response times and 99.98% uptime SLAs.',
      'The result is software that feels calm: instant search across hundreds of thousands of SKU records, automated dealer workflows, and interfaces that require zero training.',
    ],
  },
  {
    code: 'BLOG // 02',
    slug: 'autonomous-ai-workflows-in-production',
    title: 'Deploying Autonomous AI Agents That Actually Reduce Operational Overhead by 70%',
    subtitle: 'Moving beyond generic chatbots to deterministic, grounded AI pipelines connected to your ERP and CRM.',
    category: 'AI & Automation',
    readTime: '4 min read',
    publishedAt: '2026-11-01',
    author: 'Infinio AI Lab',
    authorRole: 'Applied AI & Automation · Kochi',
    coverImage: '/photos/value-1.jpg',
    tags: ['AI Agents', 'Digital Transformation', 'Workflow Automation', 'LLM'],
    seoTitle: 'Enterprise AI Workflow Automation | Infinio Technology Solutions',
    seoDescription:
      'Discover how Infinio integrates grounded AI agents and automated document pipelines into enterprise operations across Kochi, Thrissur, and Dubai.',
    excerpt:
      'Generic chatbots rarely move the needle for enterprise operations. Grounded AI agents connected directly to your quotations, invoices, and inventory databases change everything.',
    body: [
      'The difference between a novelty AI demo and a production AI workflow comes down to grounding and tool execution. An enterprise AI assistant must only answer from verified company documents and trigger deterministic API actions.',
      'In our recent deployments for distribution and logistics enterprises, we engineered retrieval-augmented pipelines that ingest supplier PDFs, match line items against MongoDB inventory collections, and draft ready-to-approve purchase orders in seconds.',
      'Every automated action includes human-in-the-loop audit logs and role-based permissions, ensuring zero data drift and complete compliance.',
    ],
  },
  {
    code: 'BLOG // 03',
    slug: 'spatial-webgl-and-modern-seo-performance',
    title: 'Spatial WebGL Meets Core Web Vitals: Engineering 60 FPS 3D Websites That Rank #1',
    subtitle: 'How GPU-instanced Three.js geometry, semantic JSON-LD schema, and Next.js Server Components work in harmony.',
    category: 'Spatial Web & SEO',
    readTime: '4 min read',
    publishedAt: '2026-11-04',
    author: 'Infinio WebGL Studio',
    authorRole: 'Frontend & Spatial Engineering',
    coverImage: '/photos/value-4.jpg',
    tags: ['WebGL', 'Three.js', 'Next.js SEO', 'Core Web Vitals'],
    seoTitle: '3D WebGL Development & Technical SEO | Infinio Technology Solutions',
    seoDescription:
      'How Infinio combines interactive 3D WebGL experiences with sub-second Largest Contentful Paint (LCP) and semantic JSON-LD SEO.',
    excerpt:
      'Can an interactive 3D website still achieve a 99/100 Lighthouse SEO score and sub-second LCP? Yes — when you combine GPU instancing with Next.js App Router.',
    body: [
      'Historically, brands had to choose between a visually unforgettable 3D WebGL site and a fast, search-engine-friendly website. Heavy 3D assets blocked the main thread and hid content from search crawlers.',
      'By rendering all semantic headings, structured JSON-LD schema, and article content via Next.js Server Components while lazy-loading an instanced WebGL canvas in a single GPU draw call, we get the best of both worlds.',
      'Search engines and AI answer engines immediately index the semantic HTML, OpenGraph metadata, and XML sitemap, while visitors experience fluid 60 FPS spatial motion.',
    ],
  },
  {
    code: 'BLOG // 04',
    slug: 'zero-trust-cloud-security-and-continuous-lms-training',
    title: 'Zero-Trust Cloud Security: Why VAPT Audits and Continuous Team Training Belong Together',
    subtitle: 'Protecting cloud workloads across AWS, GCP, and hybrid nodes while upskilling engineering teams via Moodle LMS.',
    category: 'Cybersecurity & Cloud',
    readTime: '6 min read',
    publishedAt: '2026-11-06',
    author: 'Infinio Security & Academy',
    authorRole: 'Cybersecurity & Moodle LMS Division',
    coverImage: '/photos/value-2.jpg',
    tags: ['Cybersecurity', 'VAPT', 'Cloud Security', 'Moodle LMS'],
    seoTitle: 'Cloud Cybersecurity, VAPT & LMS Training | Infinio Technology Solutions',
    seoDescription:
      'Proactive vulnerability assessment, penetration testing (VAPT), zero-trust cloud architecture, and workforce training by Infinio Technology Solutions.',
    excerpt:
      'Firewalls alone do not secure a modern enterprise. Combining automated cloud hardening and VAPT audits with continuous engineering education via our Moodle LMS.',
    body: [
      'Modern cloud security is an ongoing discipline, not a one-time checklist. As businesses migrate critical databases and customer portals to the cloud, misconfigured IAM permissions and unpatched dependencies remain the primary attack vectors.',
      'Our cybersecurity practice pairs rigorous Vulnerability Assessment and Penetration Testing (VAPT) with continuous team upskilling through the Infinio Moodle LMS portal.',
      'When your cloud infrastructure is hardened by default and your teams practice hands-on security labs, innovation accelerates without fear.',
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
