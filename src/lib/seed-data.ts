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
  tagline: 'Intelligent Technology. Practical Business Impact.',
  vision:
    'At Infinio Technology Solutions, we envision a world where technology seamlessly integrates with everyday business operations, driving efficiency, innovation, and sustainable growth.',
  aboutSummary:
    'Founded in 2016 in Kerala, Infinio Technology Solutions partners with businesses, educational institutions, and organizations across India and the UAE to design, build, and maintain dependable software, web platforms, cloud infrastructure, and technical training systems.',
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
      phone: '+91 97454 50618',
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
      phone: '+91 94968 39168 / +91 487 2426638',
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
      phone: '+971 55 625 9175',
      email: 'info@infinio.co.in',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Jebel+Ali+Dubai+UAE',
    },
  ],
  partners: [
    { name: 'CUSATECH Foundation', logo: '/partners/partner-1.png' },
    { name: 'Cochin University of Science and Technology (CUSAT)', logo: '/partners/partner-2.png' },
    { name: 'LEADS', logo: '/partners/partner-3.png' },
    { name: 'Mudra Publications', logo: '/partners/partner-4.png' },
    { name: 'Metavalley', logo: '/partners/partner-5.png' },
    { name: 'Finder Sports', logo: '/partners/partner-6.png' },
    { name: 'Zamra International', logo: '/partners/partner-7.png' },
    { name: 'Poly Hack Community', logo: '/partners/partner-8.png' },
    { name: 'Newtech Plywoods (Newply)', logo: '/partners/partner-9.png' },
    { name: 'Zeka Events', logo: '/partners/partner-10.png' },
  ],
  values: [
    {
      code: '01',
      valueName: 'Innovation',
      title: 'Practical Innovation',
      body: 'We adopt modern software, cloud, and automation tools where they solve real operational bottlenecks for your team and customers.',
    },
    {
      code: '02',
      valueName: 'Excellence',
      title: 'Engineering Discipline',
      body: 'Every database schema, web application, and workflow is structured for clarity, accessibility, and long-term maintainability.',
    },
    {
      code: '03',
      valueName: 'Integrity',
      title: 'Transparent Partnership',
      body: 'Since 2016, our work across Thrissur, Kochi, and Dubai has been grounded in clear scope definitions, honest technical advice, and dependable support.',
    },
    {
      code: '04',
      valueName: 'Customer Focus',
      title: 'Customer-First Delivery',
      body: 'We measure our work by how smoothly your staff and customers can use the systems we build every day.',
    },
  ],
};

export const SEED_SERVICES: IService[] = [
  {
    code: 'SRV // 01',
    slug: 'software-development',
    title: 'Software Development',
    shortTitle: 'Software',
    tagline: 'Tailored business applications built around your daily workflows.',
    description:
      'Custom software solutions designed to fit your specific operational requirements — from internal management portals to customer-facing web and mobile applications.',
    capabilities: [
      {
        name: 'Custom Business Applications',
        detail: 'Internal operations portals, inventory tracking, and role-based management tools.',
      },
      {
        name: 'Mobile & Web Applications',
        detail: 'Responsive web apps and cross-platform mobile interfaces for staff and customers.',
      },
      {
        name: 'System Integration',
        detail: 'Connecting existing databases, accounting tools, and web services through clean APIs.',
      },
    ],
    accentColor: '#2563eb',
    metrics: 'Custom Architecture',
    order: 1,
  },
  {
    code: 'SRV // 02',
    slug: 'web-development',
    title: 'Web Design & Development',
    shortTitle: 'Web',
    tagline: 'Fast, accessible websites and digital catalogs that represent your brand.',
    description:
      'Responsive websites, digital product catalogs, and organization portals engineered for mobile usability, clear navigation, and search visibility.',
    capabilities: [
      {
        name: 'Corporate & Brand Websites',
        detail: 'Clean, mobile-responsive websites structured around your services and enquiries.',
      },
      {
        name: 'Product Catalogs & Portals',
        detail: 'Searchable product showcases and distributor or customer enquiry workflows.',
      },
      {
        name: 'Technical SEO & Performance',
        detail: 'Semantic HTML, structured metadata, and fast page loads across devices.',
      },
    ],
    accentColor: '#0d9488',
    metrics: 'Responsive & SEO-Ready',
    order: 2,
  },
  {
    code: 'SRV // 03',
    slug: 'digital-transformation',
    title: 'Digital Transformation & Automation',
    shortTitle: 'Automation',
    tagline: 'Streamlining manual processes with practical digital workflows.',
    description:
      'Helping growing organizations transition from scattered spreadsheets and manual follow-ups to structured digital workflows and AI-assisted tools.',
    capabilities: [
      {
        name: 'Process Digitization',
        detail: 'Replacing paper and spreadsheet tracking with centralized digital forms and approvals.',
      },
      {
        name: 'Applied AI & Workflow Assistants',
        detail: 'Grounded document search, enquiry routing, and operational automation.',
      },
      {
        name: 'Operational Dashboards',
        detail: 'Clear reporting views for leadership teams across multiple branches.',
      },
    ],
    accentColor: '#0284c7',
    metrics: 'Streamlined Workflows',
    order: 3,
  },
  {
    code: 'SRV // 04',
    slug: 'cloud-services',
    title: 'Cloud Services & Hosting',
    shortTitle: 'Cloud',
    tagline: 'Dependable cloud deployment, migration, and ongoing maintenance.',
    description:
      'Secure and scalable cloud hosting configurations — supporting smooth application deployment, routine backups, and reliable day-to-day operations.',
    capabilities: [
      {
        name: 'Cloud Deployment & Migration',
        detail: 'Moving websites, databases, and business portals to managed cloud environments.',
      },
      {
        name: 'Server & Database Administration',
        detail: 'Routine updates, backup configuration, and environment monitoring.',
      },
      {
        name: 'CI/CD & Release Workflows',
        detail: 'Structured deployment pipelines so updates go live smoothly.',
      },
    ],
    accentColor: '#2563eb',
    metrics: 'Managed Cloud Environments',
    order: 4,
  },
  {
    code: 'SRV // 05',
    slug: 'it-consulting',
    title: 'IT Consulting & Strategy',
    shortTitle: 'Consulting',
    tagline: 'Practical technology guidance aligned with your business goals.',
    description:
      'Clear, vendor-neutral advice to help you scope software projects, evaluate technology options, and plan phased digital improvements.',
    capabilities: [
      {
        name: 'System & Website Audits',
        detail: 'Reviewing existing websites and software to identify usability and technical improvements.',
      },
      {
        name: 'Project Scoping & Roadmaps',
        detail: 'Defining realistic milestones, deliverables, and technical requirements before build.',
      },
      {
        name: 'Long-Term Technology Support',
        detail: 'Ongoing advisory and maintenance for growing organizations.',
      },
    ],
    accentColor: '#0d9488',
    metrics: 'Partnering Since 2016',
    order: 5,
  },
  {
    code: 'SRV // 06',
    slug: 'cybersecurity',
    title: 'Cybersecurity & LMS Training',
    shortTitle: 'Security & LMS',
    tagline: 'Security assessments and structured learning via the Infinio LMS.',
    description:
      'Practical security reviews to protect your web applications alongside structured technical and cybersecurity courses delivered through our Moodle learning portal.',
    capabilities: [
      {
        name: 'Application Security Reviews',
        detail: 'Identifying common web vulnerabilities, access-control gaps, and configuration risks.',
      },
      {
        name: 'Access & Data Governance',
        detail: 'Role-based permissions, SSL/TLS configuration, and secure authentication practices.',
      },
      {
        name: 'Infinio Moodle LMS',
        detail: 'Dedicated online learning portal for student cohorts and corporate upskilling.',
      },
    ],
    accentColor: '#0284c7',
    metrics: 'Security & Training Portal',
    order: 6,
  },
];

export const SEED_PROJECTS: IProject[] = [
  {
    indexCode: 'WRK // 01',
    slug: 'newply-digital-ecosystem',
    client: 'Newply (Newtech Plywoods)',
    location: 'Kerala, India',
    year: '2025',
    category: 'Web & Catalog',
    logo: '/partners/partner-9.png',
    tagline: 'Digital product showcase and enquiry workflow for a Kerala plywood brand.',
    requirement:
      'Present a multi-category plywood and board product range clearly online so dealers and customers can browse specifications and submit enquiries.',
    contribution:
      'Designed the brand website, structured the online product catalog, and implemented the dealer and customer enquiry flow.',
    outcome:
      'Delivered a clear, mobile-responsive product showcase endorsed by Newply leadership.',
    description:
      'Designed and built a structured digital product showcase for Newply, organizing product specifications into an accessible web experience with direct enquiry routing.',
    architectureNote: 'Responsive Web Platform · Product Catalog · Enquiry Routing',
    deliverables: ['Brand Website', 'Structured Product Catalog', 'Enquiry Workflow'],
    metrics: [
      { label: 'Deliverable', value: 'Product Catalog' },
      { label: 'Client Feedback', value: 'Verified Testimonial' },
    ],
    accent: '#2563eb',
    featured: true,
    order: 1,
  },
  {
    indexCode: 'WRK // 02',
    slug: 'zamra-international-kochi',
    client: 'Zamra International',
    location: 'Kochi, Kerala',
    year: '2025',
    category: 'Web Platforms',
    logo: '/photos/client-2.png',
    tagline: 'Corporate web presence for Zamra International Convention & Exhibition Centre.',
    requirement:
      'Provide a professional, reliable digital presence to showcase convention facilities and handle event and visitor enquiries in Kochi.',
    contribution:
      'Engineered the responsive web platform, structured venue information, and provided ongoing technical maintenance.',
    outcome:
      'Established a long-term technology partnership supporting Zamra International’s digital presence.',
    description:
      'Built and maintained the web platform for Zamra International Convention & Exhibition Centre in Kochi, presenting venue capabilities and streamlining visitor enquiries.',
    architectureNote: 'Corporate Web Platform · Responsive UI · Ongoing Support',
    deliverables: ['Venue Web Platform', 'Event Enquiry Flow', 'Managed Hosting Support'],
    metrics: [
      { label: 'Focus', value: 'Convention & Venue Web' },
      { label: 'Relationship', value: 'Multi-Year Partner' },
    ],
    accent: '#0d9488',
    featured: true,
    order: 2,
  },
  {
    indexCode: 'WRK // 03',
    slug: 'finder-sports-dubai',
    client: 'Finder Sports',
    location: 'Dubai, UAE',
    year: '2025',
    category: 'Web Platforms',
    logo: '/photos/client-4.png',
    tagline: 'Sports discovery and programme platform for Finder Sports in Dubai.',
    requirement:
      'Create an accessible online platform connecting sports academies, venues, and participants in the UAE.',
    contribution:
      'Designed and developed the responsive web interface, programme listings, and enquiry workflows for the Dubai operations team.',
    outcome:
      'Delivered on schedule with positive endorsement from Finder Sports leadership in Dubai.',
    description:
      'Engineered a responsive web platform for Finder Sports in Dubai, enabling visitors to explore sports programmes, academies, and contact options across devices.',
    architectureNote: 'Responsive Web Application · Programme Directory · GCC Deployment',
    deliverables: ['Sports Discovery Web App', 'Programme Listings', 'Enquiry Integration'],
    metrics: [
      { label: 'Region', value: 'Dubai, UAE' },
      { label: 'Delivery', value: 'On-Schedule Launch' },
    ],
    accent: '#0284c7',
    featured: true,
    order: 3,
  },
  {
    indexCode: 'WRK // 04',
    slug: 'leads-venture-lab',
    client: "LEADS' Venture Lab",
    location: 'Kerala, India',
    year: '2025',
    category: 'Portals & LMS',
    logo: '/photos/client-3.png',
    tagline: 'Digital portal for local empowerment, incubation, and social development programmes.',
    requirement:
      'Communicate incubation initiatives, community programmes, and participant information clearly online.',
    contribution:
      'Structured the organization portal, navigation architecture, and programme information pages.',
    outcome:
      'Provided a centralized digital hub for programme participants, mentors, and community stakeholders.',
    description:
      "Partnered with LEADS (Centre for Local Empowerment and Social Development) to deliver a structured web portal presenting their initiatives and incubation programmes.",
    architectureNote: 'Organization Portal · Programme Directory · Accessible Web UI',
    deliverables: ['Organization Web Portal', 'Programme Pages', 'Participant Enquiry Flow'],
    metrics: [
      { label: 'Sector', value: 'Incubation & Development' },
      { label: 'Platform', value: 'Web Portal' },
    ],
    accent: '#0d9488',
    featured: true,
    order: 4,
  },
  {
    indexCode: 'WRK // 05',
    slug: 'mudra-publications-thrissur',
    client: 'Mudra Publications',
    location: 'Thrissur, Kerala',
    year: '2025',
    category: 'Web & Catalog',
    logo: '/photos/client-5.png',
    tagline: 'Online catalog and enquiry platform for a Thrissur publishing house.',
    requirement:
      'Present publications and edition details online so readers and distributors can easily browse titles and contact the publisher.',
    contribution:
      'Designed and delivered the digital catalog website and reader enquiry workflow.',
    outcome:
      'Streamlined online title discovery and direct enquiries for the Thrissur publishing team.',
    description:
      'Delivered a tailored web presence and publication catalog for Mudra Publications in Thrissur, making book listings and publisher contact details accessible across devices.',
    architectureNote: 'Publishing Website · Title Catalog · Enquiry Management',
    deliverables: ['Digital Publication Catalog', 'Responsive Website', 'Contact Workflow'],
    metrics: [
      { label: 'Location', value: 'Thrissur, Kerala' },
      { label: 'Deliverable', value: 'Publishing Catalog' },
    ],
    accent: '#2563eb',
    featured: true,
    order: 5,
  },
  {
    indexCode: 'WRK // 06',
    slug: 'infinio-moodle-lms',
    client: 'Infinio Learning Portal',
    location: 'Kochi · Thrissur · Online',
    year: '2026',
    category: 'Portals & LMS',
    logo: '/images/infinio-logo.png',
    tagline: 'Dedicated Moodle LMS environment for technical and cybersecurity training.',
    requirement:
      'Provide a structured online learning portal for delivering coursework, practical assessments, and training resources.',
    contribution:
      'Deployed, configured, and maintained Infinio’s Moodle Learning Management System on cloud infrastructure.',
    outcome:
      'Supports structured online learning and technical training cohorts across Kerala.',
    description:
      'Configured and managed Infinio’s Moodle Learning Management System, providing students and trainees with organized course modules, assignments, and progress tracking.',
    architectureNote: 'Moodle LMS · Cloud Hosting · Course & Assessment Management',
    deliverables: ['Moodle LMS Deployment', 'Course Module Structure', 'Student Portal'],
    metrics: [
      { label: 'Platform', value: 'Moodle LMS' },
      { label: 'Access', value: 'Online Portal' },
    ],
    liveUrl: 'https://216.10.251.254/infinio/login/index.php',
    accent: '#0284c7',
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
    avatar: '/photos/client-1.jpg',
    logo: '/partners/partner-9.png',
    quote:
      'We are very satisfied clients and we would be happy to recommend Infinio! Their engineering precision transformed how we present our products.',
    projectTag: 'Web & Catalog',
    rating: 5,
    order: 1,
  },
  {
    clientName: 'Executive Directorate',
    role: 'Enterprise Partner',
    company: 'Zamra International',
    location: 'Kochi, Kerala',
    logo: '/photos/client-2.png',
    quote:
      'As the years pass, our bond with Infinio is getting stronger and stronger. A truly dependable technology partner for every stage of our growth.',
    projectTag: 'Web Platforms',
    rating: 5,
    order: 2,
  },
  {
    clientName: 'Operations Team',
    role: 'Dubai Leadership',
    company: 'Finder Sports',
    location: 'Dubai, UAE',
    logo: '/photos/client-4.png',
    quote:
      'Team Infinio strives to satisfy client demands. Their company is trustworthy since it consistently delivers exceptional outcomes on schedule.',
    projectTag: 'Web Platforms',
    rating: 5,
    order: 3,
  },
];

export const SEED_ARTICLES: IArticle[] = [
  {
    code: 'BLOG // 01',
    slug: 'architecting-enterprise-software-for-scale',
    title: 'Why Growing Businesses Outgrow Spreadsheets — And How Custom Software Brings Clarity',
    subtitle: 'Replacing disconnected spreadsheets and manual follow-ups with a unified operational web platform.',
    category: 'Software Architecture',
    readTime: '5 min read',
    publishedAt: '2026-10-28',
    author: 'Infinio Engineering Team',
    authorRole: 'Software Practice · Kochi & Thrissur',
    coverImage: '/images/infinio-logo.png',
    tags: ['Custom Software', 'MongoDB', 'Next.js', 'System Design'],
    seoTitle: 'From Spreadsheets to Custom Business Software | Infinio Technology Solutions',
    seoDescription:
      'Learn how Infinio Technology Solutions helps growing businesses across Kerala and Dubai replace fragmented spreadsheets with dependable custom web platforms.',
    excerpt:
      'Growing companies across India and the UAE often accumulate disconnected spreadsheets and manual processes. Here is how structured software architecture brings operational clarity.',
    body: [
      'When organizations expand across multiple locations — whether coordinating between Thrissur, Kochi, and Dubai — manual spreadsheets quickly become difficult to maintain. Different teams hold different versions of product lists, customer enquiries, and order statuses.',
      '### Mapping the Real Operational Flow',
      'At Infinio Technology Solutions, our first step is understanding how information actually moves across your teams. Before writing application code, we map who creates records, who reviews them, and what reports leadership needs to see.',
      '- Centralize product, enquiry, and customer data in a single structured database',
      '- Provide role-based views so sales, operations, and management see relevant information clearly',
      '- Build responsive web interfaces that work reliably on both office desktops and mobile devices',
      'By focusing on clear data models and straightforward user interfaces, custom software reduces daily coordination friction and gives teams a dependable foundation for growth.',
    ],
  },
  {
    code: 'BLOG // 02',
    slug: 'autonomous-ai-workflows-in-production',
    title: 'Designing Grounded AI Workflows for Everyday Business Operations',
    subtitle: 'Moving beyond generic chat interfaces to practical, document-grounded automation connected to your business data.',
    category: 'AI & Automation',
    readTime: '4 min read',
    publishedAt: '2026-11-01',
    author: 'Infinio Engineering Team',
    authorRole: 'Digital Transformation Practice · Kochi',
    coverImage: '/images/infinio-logo.png',
    tags: ['Workflow Automation', 'Digital Transformation', 'Applied AI', 'Business Operations'],
    seoTitle: 'Practical AI Workflow Automation for Business | Infinio Technology Solutions',
    seoDescription:
      'How Infinio designs practical, grounded AI assistants and automated workflows that help teams handle enquiries, documents, and internal lookups.',
    excerpt:
      'Generic chatbots rarely solve real operational problems. Practical automation starts by connecting verified company information to clear, reviewable workflows.',
    body: [
      'Many businesses want to explore AI and automation but are rightly cautious about accuracy and control. An assistant that guesses answers or operates outside established business rules creates more work rather than less.',
      '### Grounding Automation in Verified Data',
      'Effective business automation focuses on well-defined, repeatable tasks: routing customer enquiries to the right department, searching approved product catalogs, and summarizing structured records.',
      '- Restrict knowledge retrieval to approved company documents and product databases',
      '- Keep human review in the loop for customer communications and operational approvals',
      '- Log actions clearly so administrators can review and refine workflow rules over time',
      'When automation is designed around transparency and human oversight, teams save time on routine lookups while staying in full control of customer relationships.',
    ],
  },
  {
    code: 'BLOG // 03',
    slug: 'spatial-webgl-and-modern-seo-performance',
    title: 'Balancing Interactive Web Design with Fast, Accessible Performance and Technical SEO',
    subtitle: 'How progressive enhancement, resilient fallbacks, and semantic HTML keep modern websites usable on every device.',
    category: 'Web Engineering & SEO',
    readTime: '4 min read',
    publishedAt: '2026-11-04',
    author: 'Infinio Web Practice',
    authorRole: 'Frontend & Web Engineering · Kochi & Thrissur',
    coverImage: '/images/infinio-logo.png',
    tags: ['Web Development', 'Technical SEO', 'Accessibility', 'Progressive Enhancement'],
    seoTitle: 'Accessible Interactive Web Design & Technical SEO | Infinio Technology Solutions',
    seoDescription:
      'How Infinio combines engaging interactive visuals with resilient fallbacks, mobile usability, and clean technical SEO.',
    excerpt:
      'Interactive visuals should enhance a website’s story without ever blocking visitors on mobile devices, restricted browsers, or search engines.',
    body: [
      'A company website serves many visitors at once: prospective clients on mobile phones, enterprise buyers on corporate networks, assistive-technology users, and search engine crawlers.',
      '### Progressive Enhancement First',
      'When adding interactive graphics or 3D visuals to a web page, the core content, navigation, and contact flows must remain completely independent of the animation layer.',
      '- Render headings, service descriptions, and structured JSON-LD metadata directly in semantic HTML',
      '- Isolate interactive canvas components behind error boundaries and capability checks',
      '- Honour reduced-motion preferences and provide clear static or SVG diagrams when hardware acceleration is unavailable',
      'This approach ensures that every visitor experiences a fast, readable, and trustworthy website regardless of their device or browser settings.',
    ],
  },
  {
    code: 'BLOG // 04',
    slug: 'zero-trust-cloud-security-and-continuous-lms-training',
    title: 'Application Security and Continuous Team Training: A Practical Approach for Growing Organizations',
    subtitle: 'Combining routine web security reviews, disciplined access controls, and structured learning via Moodle LMS.',
    category: 'Cybersecurity & LMS',
    readTime: '5 min read',
    publishedAt: '2026-11-06',
    author: 'Infinio Security & Academy',
    authorRole: 'Cybersecurity & Moodle LMS Division',
    coverImage: '/images/infinio-logo.png',
    tags: ['Cybersecurity', 'Application Security', 'Cloud Hosting', 'Moodle LMS'],
    seoTitle: 'Web Application Security & Moodle LMS Training | Infinio Technology Solutions',
    seoDescription:
      'How Infinio pairs practical web security assessments and access governance with structured technical training on the Infinio Moodle LMS.',
    excerpt:
      'Protecting business web applications requires both sound technical configuration and well-trained teams who understand everyday security practices.',
    body: [
      'As organizations move more of their catalogs, customer enquiries, and internal workflows online, maintaining security hygiene becomes an essential part of software maintenance.',
      '### Combining Technical Controls with Practical Training',
      'Most security incidents stem from preventable configuration gaps, outdated dependencies, or unclear access permissions rather than exotic attacks.',
      '- Review web applications for common vulnerabilities, secure session handling, and proper input validation',
      '- Configure role-based access controls and encrypted connections across cloud environments',
      '- Support continuous technical and cybersecurity learning through structured courses on the Infinio Moodle LMS portal',
      'Pairing routine technical reviews with accessible team training helps organizations maintain a strong, practical security posture as they grow.',
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
    serviceNeeded: 'Web Design & Development',
    projectStage: 'Catalog Expansion',
    budgetRange: 'Standard Project',
    timeline: '1 – 2 Months',
    message:
      'Looking to expand our online product catalog with additional specification filters and dealer enquiry routing.',
    status: 'scheduled',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    _id: 'inq-seed-2',
    name: 'Operations Team',
    email: 'ops@findersports.ae',
    phone: '+971 55 625 9175',
    company: 'Finder Sports',
    location: 'Dubai, UAE',
    serviceNeeded: 'Digital Transformation & Automation',
    projectStage: 'Platform Enhancement',
    budgetRange: 'Enterprise Engagement',
    timeline: '1 – 3 Months',
    message:
      'We would like to discuss automating programme enquiry routing and partner updates for our Dubai platform.',
    status: 'reviewing',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];
