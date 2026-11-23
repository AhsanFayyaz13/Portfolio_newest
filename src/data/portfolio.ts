export type ProjectCategory =
  | 'All'
  | 'AI & Multi-Agent Systems'
  | 'Full-Stack Web'
  | 'Automation & Tools';

export type ProjectFilterCategory = Exclude<ProjectCategory, 'All'>;

export interface ProjectGalleryItem {
  image: string;
  caption: string;
  detailLabel: string;
  objectPosition?: string;
}

export interface Project {
  id: string;
  title: string;
  shortTitle: string;
  category: ProjectFilterCategory;
  hook: string;
  role: string;
  timeline: string;
  tools: string[];
  image: string;
  imageAlt: string;
  liveUrl?: string;
  sourceUrl?: string;
  challenge: string;
  approach: string;
  outcome: string;
  architectureHighlights: string[];
  gallery: ProjectGalleryItem[];
}

export interface SkillGroup {
  id: string;
  title: string;
  summary: string;
  skills: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  location?: string;
  type: 'work' | 'leadership' | 'education';
  bullets: string[];
}

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  displayValue: string;
  icon: 'github' | 'globe' | 'mail' | 'linkedin' | 'instagram';
}

export interface NavLinkItem {
  id: 'work' | 'about' | 'experience' | 'contact';
  label: string;
  href: string;
}

export const SEO_METADATA = {
  title: 'M. Ahsan Fayyaz — AI Automation Engineer & Full-Stack Developer',
  description:
    'Portfolio of M. Ahsan Fayyaz, an AI Automation Engineer and Full-Stack Developer in Islamabad building LangGraph agents, RAG systems, and MERN web apps.',
  openGraphTagline:
    'AI Automation, Multi-Agent Systems & Full-Stack Web Engineering by M. Ahsan Fayyaz.',
} as const;

export const NAV_LINKS: NavLinkItem[] = [
  { id: 'work', label: 'Work', href: '#work' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const HERO_DATA = {
  name: 'M. Ahsan Fayyaz',
  monogram: 'AF',
  availability: 'Available for Remote Roles & Freelance Projects',
  headline: 'AI Agents and Full-Stack Systems That Ship.',
  subheadline:
    'I build Python multi-agent pipelines, RAG systems, and production MERN web apps from Islamabad.',
  primaryCta: {
    label: 'View Selected Work',
    href: '#work',
  },
  secondaryCta: {
    label: 'Get in Touch',
    href: '#contact',
  },
  location: 'Islamabad, Pakistan',
  currentRole: 'Automation Engineer at Auremix',
  // TODO: replace with /images/portrait.jpg
  heroImage: '/src/assets/images/hero_editorial_frame_1795453517693.jpg',
  heroImageAlt:
    'Minimalist dark architectural engineering desk with precision anodized forms and subtle cobalt lighting',
  heroFrameCaption: 'Systems Architecture & Full-Stack Engineering',
  heroFrameCoordinates: '33.6844° N, 73.0479° E',
} as const;

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  'All',
  'AI & Multi-Agent Systems',
  'Full-Stack Web',
  'Automation & Tools',
];

export const PROJECTS: Project[] = [
  {
    id: 'medeasy',
    title: 'MedEasy — Full-Stack Online Pharmacy Platform',
    shortTitle: 'MedEasy',
    category: 'Full-Stack Web',
    hook: 'End-to-end digital pharmacy with prescription uploads, user authentication, and automated order emails.',
    role: 'Full-Stack Developer',
    timeline: '2026',
    liveUrl: 'https://medeasy.systems',
    sourceUrl: 'https://github.com/AhsanFayyaz13',
    tools: [
      'React',
      'Vite',
      'Node.js',
      'Express.js',
      'MongoDB Atlas',
      'Mongoose',
      'Cloudinary',
      'Resend API',
      'Vercel',
      'Render',
    ],
    // TODO: replace with /images/projects/medeasy-hero.jpg
    image: '/src/assets/images/project_medeasy_platform_1795453516839.jpg',
    imageAlt:
      'MedEasy online pharmacy platform interface showing prescription upload and order tracking workflow',
    challenge:
      'Local pharmacies often rely on manual phone orders and fragmented messaging, creating friction when customers submit prescriptions or verify medicine availability. The platform needed a reliable web architecture capable of handling user accounts, prescription image uploads, and instant order confirmations.',
    approach:
      'Architected a decoupled MERN application with a React and Vite frontend on Vercel and a RESTful Express.js backend deployed on Render. Integrated Cloudinary for structured prescription storage, MongoDB Atlas for catalog persistence, and the Resend API for automated transactional emails.',
    outcome:
      'Deployed a live production healthcare platform at medeasy.systems with custom domain routing, authenticated user sessions, and automated email receipts. Separating media storage, database operations, and frontend delivery kept page loads fast under real traffic.',
    architectureHighlights: [
      'Decoupled Vercel frontend + Render REST API for independent scaling',
      'Structured Cloudinary media pipeline for verified prescription uploads',
      'Automated transactional order receipts via Resend API & MongoDB Atlas',
    ],
    gallery: [
      {
        // TODO: replace with /images/projects/medeasy-upload.jpg
        image: '/src/assets/images/project_medeasy_platform_1795453516839.jpg',
        detailLabel: 'Prescription Pipeline',
        caption: 'Direct client-to-Cloudinary prescription intake paired with authenticated order records.',
        objectPosition: 'left center',
      },
      {
        // TODO: replace with /images/projects/medeasy-tracking.jpg
        image: '/src/assets/images/project_medeasy_platform_1795453516839.jpg',
        detailLabel: 'Fulfillment & Receipts',
        caption: 'Live order state transitions backed by MongoDB Atlas and automated Resend email triggers.',
        objectPosition: 'right center',
      },
    ],
  },
  {
    id: 'multi-agent-flight-management',
    title: 'Multi-Agent Flight Management System',
    shortTitle: 'Flight Multi-Agent Engine',
    category: 'AI & Multi-Agent Systems',
    hook: 'Stateful multi-agent orchestration engine handling flight searches, bookings, and persistent session memory.',
    role: 'AI Systems Engineer',
    timeline: '2026',
    sourceUrl: 'https://github.com/AhsanFayyaz13',
    tools: [
      'Python',
      'LangChain',
      'LangGraph',
      'OpenAI API',
      'Streamlit',
      'PostgreSQL',
      'Supabase',
    ],
    // TODO: replace with /images/projects/flight-agents-hero.jpg
    image: '/src/assets/images/project_flight_multiagent_1795453515199.jpg',
    imageAlt:
      'Isometric multi-agent state graph illustrating deterministic flight routing and memory nodes',
    challenge:
      'Single-prompt chatbots break down during multi-step travel workflows that require switching between flight search, booking rules, and customer support. Without persistent state management, users lose itinerary context across turns or trigger conflicting actions.',
    approach:
      'Engineered a graph-based multi-agent workflow in Python using LangChain and LangGraph to isolate specialized agent roles and enforce deterministic state transitions. Wired PostgreSQL and Supabase as a persistent memory layer beneath a Streamlit interface to retain user context across sessions.',
    outcome:
      'Delivered a stateful orchestration system capable of routing multi-turn flight queries, preserving itinerary history across sessions, and executing structured booking logic without dropping context.',
    architectureHighlights: [
      'Deterministic LangGraph supervisor routing between search, booking, and support nodes',
      'PostgreSQL & Supabase checkpoint persistence for cross-session itinerary memory',
      'Interactive Streamlit control interface exposing real-time booking state',
    ],
    gallery: [
      {
        // TODO: replace with /images/projects/flight-agents-graph.jpg
        image: '/src/assets/images/project_flight_multiagent_1795453515199.jpg',
        detailLabel: 'State Graph Topology',
        caption: 'Isolated agent nodes preventing tool conflict across multi-turn travel inquiries.',
        objectPosition: 'center top',
      },
      {
        // TODO: replace with /images/projects/flight-agents-memory.jpg
        image: '/src/assets/images/project_flight_multiagent_1795453515199.jpg',
        detailLabel: 'Persistent Memory Layer',
        caption: 'Supabase PostgreSQL state checkpointing preserving user itineraries between sessions.',
        objectPosition: 'center bottom',
      },
    ],
  },
  {
    id: 'nasa-artemis-rag',
    title: 'NASA Artemis Plan — Agentic RAG Assistant',
    shortTitle: 'NASA Artemis RAG',
    category: 'AI & Multi-Agent Systems',
    hook: 'Retrieval-augmented assistant built to query and synthesize dense aerospace mission documentation.',
    role: 'AI & RAG Developer',
    timeline: '2026',
    sourceUrl: 'https://github.com/AhsanFayyaz13',
    tools: ['Python', 'LangChain', 'Streamlit', 'Vector Embeddings'],
    // TODO: replace with /images/projects/artemis-rag-hero.jpg
    image: '/src/assets/images/project_artemis_rag_1795453516400.jpg',
    imageAlt:
      'Technical lunar orbital trajectory blueprint paired with semantic document retrieval layers',
    challenge:
      'Navigating hundreds of pages of technical architecture inside the NASA Artemis Plan makes manual lookup slow and error-prone. Standard keyword search misses contextual dependencies across sections, while ungrounded language models risk fabricating mission specifications.',
    approach:
      'Built an agentic Retrieval-Augmented Generation pipeline in Python using LangChain to parse, chunk, and index the source documentation into semantic vector embeddings. Paired the retrieval chain with a clean Streamlit interface built for direct technical querying.',
    outcome:
      'Enabled fast, source-grounded Q&A across dense aerospace mission documents, surfacing verified technical parameters directly from retrieved passages.',
    architectureHighlights: [
      'Context-preserving chunking strategy tailored for dense engineering documentation',
      'Semantic vector retrieval minimizing hallucinations on mission-critical specs',
      'Focused Streamlit query interface surfacing source-grounded answers rapidly',
    ],
    gallery: [
      {
        // TODO: replace with /images/projects/artemis-rag-indexing.jpg
        image: '/src/assets/images/project_artemis_rag_1795453516400.jpg',
        detailLabel: 'Semantic Indexing',
        caption: 'Document parsing and vector embedding pipeline structured around mission phases.',
        objectPosition: 'left center',
      },
      {
        // TODO: replace with /images/projects/artemis-rag-synthesis.jpg
        image: '/src/assets/images/project_artemis_rag_1795453516400.jpg',
        detailLabel: 'Grounded Synthesis',
        caption: 'Retrieval-first prompting verifying orbital and technical parameters from source chunks.',
        objectPosition: 'right center',
      },
    ],
  },
  {
    id: 'ai-cover-letter-generator',
    title: 'AI Cover Letter Generator',
    shortTitle: 'AI Cover Letter Generator',
    category: 'Automation & Tools',
    hook: 'Browser tool drafting tailored, role-specific cover letters from structured candidate inputs.',
    role: 'Frontend & AI Developer',
    timeline: '2025',
    sourceUrl: 'https://github.com/AhsanFayyaz13',
    tools: ['JavaScript', 'Gemini API', 'Tailwind CSS', 'HTML5'],
    // TODO: replace with /images/projects/cover-letter-hero.jpg
    image: '/src/assets/images/project_cover_letter_ai_1795453516875.jpg',
    imageAlt:
      'Minimalist editorial document layout tablet resting beside Swiss typographic grid sheets',
    challenge:
      'Applicants spend hours rewriting cover letters from scratch to align their project history with each job description, often producing generic drafts that miss core technical requirements.',
    approach:
      'Integrated the Gemini API into a lightweight JavaScript web application that maps candidate experience directly against target job descriptions. Built a distraction-free, responsive interface with Tailwind CSS for rapid input and instant formatting.',
    outcome:
      'Compressed cover letter drafting from a manual multi-hour task into a repeatable browser workflow producing structured, role-aligned copy.',
    architectureHighlights: [
      'Structured prompt engineering mapping candidate achievements to job requirements',
      'Zero-bloat vanilla JavaScript & Tailwind CSS frontend for instant browser execution',
      'Clean formatting output ready for immediate editing and export',
    ],
    gallery: [
      {
        // TODO: replace with /images/projects/cover-letter-inputs.jpg
        image: '/src/assets/images/project_cover_letter_ai_1795453516875.jpg',
        detailLabel: 'Structured Candidate Intake',
        caption: 'Role-specific field mapping ensuring relevant technical skills lead the draft.',
        objectPosition: 'left center',
      },
      {
        // TODO: replace with /images/projects/cover-letter-output.jpg
        image: '/src/assets/images/project_cover_letter_ai_1795453516875.jpg',
        detailLabel: 'Editorial Output Canvas',
        caption: 'Distraction-free formatting view built for rapid review and copy-ready delivery.',
        objectPosition: 'right center',
      },
    ],
  },
  {
    id: 'nishtar-pharmacy',
    title: 'Nishtar Pharmacy — Digital Storefront & Local Search Setup',
    shortTitle: 'Nishtar Pharmacy',
    category: 'Full-Stack Web',
    hook: 'Mobile-first storefront, in-store QR access, and verified Google Maps presence for retail.',
    role: 'Web Developer & Digital Strategist',
    timeline: '2026',
    sourceUrl: 'https://github.com/AhsanFayyaz13',
    tools: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'Google Business Profile',
      'QR Systems',
    ],
    // TODO: replace with /images/projects/nishtar-pharmacy-hero.jpg
    image: '/src/assets/images/project_nishtar_storefront_1795453516468.jpg',
    imageAlt:
      'Matte dark aluminum countertop stand holding a mobile device displaying a local map grid and QR access code',
    challenge:
      'Physical retail pharmacies in growing districts frequently lack verifiable online hours, map directions, or quick digital contact points for walk-in customers.',
    approach:
      'Built a fast-loading web landing page paired with scannable in-store QR codes and a verified Google Maps business listing at Colony Chowk, Mailsi. Structured every touchpoint for mobile users needing immediate directions or direct contact details.',
    outcome:
      'Established a searchable local digital footprint connecting physical counter traffic with instant mobile access to store location and pharmacy services.',
    architectureHighlights: [
      'Mobile-first lightweight static storefront optimized for low-latency regional networks',
      'In-store scannable QR bridge linking walk-in customers to digital contact points',
      'Verified Google Business Profile & Maps pin for Colony Chowk, Mailsi',
    ],
    gallery: [
      {
        // TODO: replace with /images/projects/nishtar-qr.jpg
        image: '/src/assets/images/project_nishtar_storefront_1795453516468.jpg',
        detailLabel: 'Countertop QR Access',
        caption: 'Instant smartphone scan bridge connecting physical visitors to store services.',
        objectPosition: 'center top',
      },
      {
        // TODO: replace with /images/projects/nishtar-maps.jpg
        image: '/src/assets/images/project_nishtar_storefront_1795453516468.jpg',
        detailLabel: 'Local Search Footprint',
        caption: 'Verified Google Maps placement and mobile-first contact details for immediate navigation.',
        objectPosition: 'center bottom',
      },
    ],
  },
];

export const ABOUT_DATA = {
  sectionTitle: 'About & Capabilities',
  sectionSubtitle:
    'Bridging backend automation, stateful AI agents, and crisp production interfaces.',
  storyParagraphs: [
    'Good software removes friction instead of adding complexity. Whether I am wiring an autonomous Python workflow at Auremix or architecting a full-stack web platform from scratch, I focus on systems that do real work reliably—connecting APIs, databases, and language models into clean, predictable pipelines.',
    'My approach sits at the intersection of backend logic and interface clarity. An AI agent is only as useful as the state management behind it, and a web application only succeeds when every route, database query, and user interaction feels immediate. I build end-to-end so nothing gets lost between the model layer and the browser.',
    'Outside the codebase, directing visual branding and leading student media teams across Islamabad taught me how clear communication shapes every product. When engineering discipline meets sharp visual structure, ideas move from prototype to production fast.',
  ],
  skillGroups: [
    {
      id: 'ai-automation',
      title: 'AI Engineering & Workflow Automation',
      summary: 'Stateful multi-agent orchestration, retrieval pipelines, and automated Python services.',
      skills: [
        'Python',
        'LangChain',
        'LangGraph',
        'Agentic RAG',
        'Multi-Agent Systems',
        'OpenAI API',
        'Gemini API',
        'Script Automation',
        'Scikit-learn',
        'Pandas',
        'NumPy',
        'Matplotlib',
      ],
    },
    {
      id: 'fullstack-web',
      title: 'Full-Stack Web Development',
      summary: 'Decoupled frontends, RESTful Node & Python APIs, and transactional web architecture.',
      skills: [
        'JavaScript (ES6+)',
        'React',
        'Vite',
        'Node.js',
        'Express.js',
        'Flask',
        'Streamlit',
        'HTML5',
        'CSS3',
        'Tailwind CSS',
        'REST APIs',
        'Resend API',
        'Cloudinary',
      ],
    },
    {
      id: 'data-infra-visual',
      title: 'Databases, Infrastructure & Visual Systems',
      summary: 'Relational & document persistence, cloud deployments, low-level systems, and design direction.',
      skills: [
        'MongoDB',
        'Mongoose',
        'PostgreSQL',
        'Supabase',
        'C++',
        'Assembly Language',
        'Git',
        'GitHub',
        'Vercel',
        'Render',
        'Canva',
      ],
    },
  ] as SkillGroup[],
};

export const EXPERIENCE_TIMELINE: ExperienceItem[] = [
  {
    id: 'auremix',
    role: 'Automation Engineer',
    organization: 'Auremix',
    period: '2026 – Present',
    type: 'work',
    bullets: [
      'Architect and deploy intelligent business automation workflows using Python, REST APIs, and Large Language Model (LLM) integrations.',
      'Automate repetitive operational pipelines via custom scripting, cutting manual processing overhead and improving system reliability.',
    ],
  },
  {
    id: 'reverse-4k',
    role: 'Web Development Intern (Python & AI)',
    organization: 'REVERSE 4K',
    period: 'Summer 2025',
    type: 'work',
    bullets: [
      'Developed full-stack web application features integrating Python backend services with AI-driven workflows and responsive frontend interfaces.',
    ],
  },
  {
    id: 'campus-leadership',
    role: 'Campus & Youth Leadership',
    organization: 'Islamabad, Pakistan',
    period: '2025 – 2026',
    type: 'leadership',
    bullets: [
      'Serve as Co-Lead Graphics for the IIUI Computer Science Society, Head of Media & PR for Positive Pakistan (IIUI Cabinet), Media Secretary for Law Connect Pakistan, and Deputy Head of Ambassadors for Capital Youth Expo (CYE IIUI).',
      'Managed volunteer recruitment, conducted candidate interviews, and directed digital media campaigns across university and national youth initiatives.',
    ],
  },
  {
    id: 'iiui-bscs',
    role: 'B.S. in Computer Science & AI Certifications',
    organization: 'International Islamic University Islamabad (IIUI)',
    period: '2023 – 2027',
    type: 'education',
    bullets: [
      'Final-year Computer Science undergraduate in the Faculty of Computing, specializing in AI-driven software architecture.',
      'Completed the NAVTTC Artificial Intelligence training certification and currently preparing for Microsoft Azure AI certification.',
    ],
  },
];

export const CONTACT_DATA = {
  heading: 'Start a Conversation',
  subheadline:
    'Available for remote engineering roles, AI automation consulting, and full-stack product builds.',
  email: 'm.ahsanfayyaz013@outlook.com',
  location: 'Islamabad, Pakistan',
  responseExpectation: 'Typically responds within 24 hours.',
  socialLinks: [
    {
      id: 'github',
      label: 'GitHub',
      href: 'https://github.com/AhsanFayyaz13',
      displayValue: 'github.com/AhsanFayyaz13',
      icon: 'github',
    },
    {
      id: 'medeasy-live',
      label: 'Live Featured Project — MedEasy',
      href: 'https://medeasy.systems',
      displayValue: 'medeasy.systems',
      icon: 'globe',
    },
    // TODO: Uncomment and drop in your LinkedIn URL when ready
    // {
    //   id: 'linkedin',
    //   label: 'LinkedIn',
    //   href: 'https://linkedin.com/in/your-handle',
    //   displayValue: 'linkedin.com/in/your-handle',
    //   icon: 'linkedin',
    // },
    // TODO: Uncomment and drop in your Instagram URL when ready
    // {
    //   id: 'instagram',
    //   label: 'Instagram',
    //   href: 'https://instagram.com/your-handle',
    //   displayValue: 'instagram.com/your-handle',
    //   icon: 'instagram',
    // },
  ] as SocialLink[],
};
