import fs from 'fs';
import path from 'path';
import { connectToMongo } from './mongodb';
import {
  ServiceModel,
  ProjectModel,
  TestimonialModel,
  ArticleModel,
  InquiryModel,
  IService,
  IProject,
  ITestimonial,
  IArticle,
  IInquiry,
} from '@/models';
import {
  SEED_SERVICES,
  SEED_PROJECTS,
  SEED_TESTIMONIALS,
  SEED_ARTICLES,
  SEED_INQUIRIES,
} from './seed-data';

interface LocalStoreSchema {
  services: IService[];
  projects: IProject[];
  testimonials: ITestimonial[];
  articles: IArticle[];
  inquiries: IInquiry[];
}

const DATA_DIR = path.join(process.cwd(), '.data');
const DATA_FILE = path.join(DATA_DIR, 'mongo-store.json');

function normalizeArticles(rawArticles: IArticle[] | undefined): IArticle[] {
  if (!rawArticles || rawArticles.length === 0) return SEED_ARTICLES;
  const hasFullBlogSchema = rawArticles.every(
    (a) => a.publishedAt && a.category && a.author && !a.title.includes('70%') && !a.title.includes('Rank #1')
  );
  if (!hasFullBlogSchema) return SEED_ARTICLES;
  return rawArticles;
}

function normalizeProjects(rawProjects: IProject[] | undefined): IProject[] {
  if (!rawProjects || rawProjects.length === 0) return SEED_PROJECTS;
  const hasEvidenceFields = rawProjects.every((p) => p.requirement && p.contribution);
  if (!hasEvidenceFields) return SEED_PROJECTS;
  return rawProjects;
}

function readLocalStore(): LocalStoreSchema {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      return {
        services: SEED_SERVICES,
        projects: normalizeProjects(parsed.projects),
        testimonials: SEED_TESTIMONIALS,
        articles: normalizeArticles(parsed.articles),
        inquiries: parsed.inquiries?.length ? parsed.inquiries : SEED_INQUIRIES,
      };
    }
  } catch {
    // fallback to seed
  }

  return {
    services: SEED_SERVICES,
    projects: SEED_PROJECTS,
    testimonials: SEED_TESTIMONIALS,
    articles: SEED_ARTICLES,
    inquiries: SEED_INQUIRIES,
  };
}

function writeLocalStore(data: LocalStoreSchema) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch {
    // Note: on read-only serverless filesystems (e.g. Vercel without MongoDB URI), ignore fs write error
  }
}

// Keep an in-memory mirror so serverless instances reflect writes immediately even without local disk write
declare global {
  // eslint-disable-next-line no-var
  var __infinioMemoryStoreV2: LocalStoreSchema | undefined;
}

function getStore(): LocalStoreSchema {
  if (!global.__infinioMemoryStoreV2) {
    global.__infinioMemoryStoreV2 = readLocalStore();
  }
  return global.__infinioMemoryStoreV2;
}

function saveStore(next: LocalStoreSchema) {
  global.__infinioMemoryStoreV2 = next;
  writeLocalStore(next);
}

export async function getSiteData() {
  const conn = await connectToMongo();
  if (conn) {
    try {
      const serviceCount = await ServiceModel.countDocuments();
      if (serviceCount === 0) {
        await ServiceModel.insertMany(SEED_SERVICES);
        await ProjectModel.insertMany(SEED_PROJECTS);
        await TestimonialModel.insertMany(SEED_TESTIMONIALS);
        await ArticleModel.insertMany(SEED_ARTICLES);
        await InquiryModel.insertMany(
          SEED_INQUIRIES.map(({ _id, ...rest }) => rest)
        );
      }

      const [services, projects, testimonials, articles, inquiries] =
        await Promise.all([
          ServiceModel.find().sort({ order: 1 }).lean(),
          ProjectModel.find().sort({ order: 1 }).lean(),
          TestimonialModel.find().sort({ order: 1 }).lean(),
          ArticleModel.find().sort({ publishedAt: -1 }).lean(),
          InquiryModel.find().sort({ createdAt: -1 }).lean(),
        ]);

      return {
        engine: 'mongodb-native',
        services: JSON.parse(JSON.stringify(services)) as IService[],
        projects: JSON.parse(JSON.stringify(projects)) as IProject[],
        testimonials: JSON.parse(JSON.stringify(testimonials)) as ITestimonial[],
        articles: JSON.parse(JSON.stringify(articles)) as IArticle[],
        inquiries: JSON.parse(JSON.stringify(inquiries)) as IInquiry[],
      };
    } catch {
      // fall through
    }
  }

  const store = getStore();
  return {
    engine: 'mongodb-hybrid-store',
    ...store,
  };
}

export async function getArticleBySlug(slug: string): Promise<IArticle | null> {
  const data = await getSiteData();
  return data.articles.find((a) => a.slug === slug) || null;
}

export async function createInquiryRecord(
  payload: Omit<IInquiry, '_id' | 'status' | 'createdAt'>
) {
  const conn = await connectToMongo();
  if (conn) {
    try {
      const doc = await InquiryModel.create({
        ...payload,
        status: 'new',
      });
      return {
        engine: 'mongodb-native',
        inquiry: JSON.parse(JSON.stringify(doc)) as IInquiry,
      };
    } catch {
      // fall through
    }
  }

  const store = getStore();
  const newInquiry: IInquiry = {
    _id: `inq-${Date.now().toString(36)}`,
    ...payload,
    status: 'new',
    createdAt: new Date().toISOString(),
  };
  store.inquiries = [newInquiry, ...store.inquiries];
  saveStore(store);

  return {
    engine: 'mongodb-hybrid-store',
    inquiry: newInquiry,
  };
}

export async function updateInquiryStatusRecord(
  id: string,
  status: IInquiry['status']
) {
  const conn = await connectToMongo();
  if (conn) {
    try {
      const updated = await InquiryModel.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      ).lean();
      if (updated) {
        return JSON.parse(JSON.stringify(updated)) as IInquiry;
      }
    } catch {
      // fall through
    }
  }

  const store = getStore();
  store.inquiries = store.inquiries.map((item) =>
    item._id === id ? { ...item, status } : item
  );
  saveStore(store);
  return store.inquiries.find((item) => item._id === id) || null;
}

export async function deleteInquiryRecord(id: string) {
  const conn = await connectToMongo();
  if (conn) {
    try {
      await InquiryModel.findByIdAndDelete(id);
    } catch {
      // fall through
    }
  }
  const store = getStore();
  store.inquiries = store.inquiries.filter((item) => item._id !== id);
  saveStore(store);
  return true;
}

export async function createProjectRecord(payload: {
  client: string;
  location: string;
  category: string;
  tagline: string;
  description: string;
  architectureNote?: string;
  deliverables?: string[];
  metrics?: { label: string; value: string }[];
  liveUrl?: string;
  year?: string;
}) {
  const store = getStore();
  const nextNum = store.projects.length + 1;
  const newProject: IProject = {
    indexCode: `WRK // 0${nextNum}`,
    slug: `${payload.client.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString(36)}`,
    client: payload.client,
    location: payload.location || 'Kochi, Kerala',
    year: payload.year || '2026',
    category: payload.category || 'Custom Software',
    tagline: payload.tagline,
    description: payload.description || payload.tagline,
    architectureNote:
      payload.architectureNote || 'Next.js · MongoDB · Cloud Architecture',
    deliverables: payload.deliverables?.length
      ? payload.deliverables
      : ['System Architecture', 'Full-Stack Engineering', 'Cloud Deployment'],
    metrics: payload.metrics?.length
      ? payload.metrics
      : [
          { label: 'Reliability', value: '99.9%' },
          { label: 'Status', value: 'Live' },
        ],
    liveUrl: payload.liveUrl,
    accent: nextNum % 2 === 0 ? '#7b61ff' : '#1a73e8',
    featured: true,
    order: nextNum,
  };

  const conn = await connectToMongo();
  if (conn) {
    try {
      const created = await ProjectModel.create(newProject);
      return JSON.parse(JSON.stringify(created)) as IProject;
    } catch {
      // fall through
    }
  }

  store.projects = [newProject, ...store.projects];
  saveStore(store);
  return newProject;
}

export async function deleteProjectRecord(slug: string) {
  const conn = await connectToMongo();
  if (conn) {
    try {
      await ProjectModel.findOneAndDelete({ slug });
    } catch {
      // fall through
    }
  }
  const store = getStore();
  store.projects = store.projects.filter((p) => p.slug !== slug);
  saveStore(store);
  return true;
}

export async function createArticleRecord(payload: {
  title: string;
  subtitle?: string;
  slug?: string;
  category?: string;
  readTime?: string;
  author?: string;
  authorRole?: string;
  coverImage?: string;
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
  excerpt: string;
  body: string[];
}) {
  const store = getStore();
  const nextNum = store.articles.length + 1;
  const cleanSlug =
    payload.slug?.trim() ||
    payload.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  const newArticle: IArticle = {
    code: `BLOG // 0${nextNum}`,
    slug: cleanSlug,
    title: payload.title,
    subtitle: payload.subtitle || payload.excerpt,
    category: payload.category || 'Software Architecture',
    readTime: payload.readTime || '4 min read',
    publishedAt: new Date().toISOString().split('T')[0],
    author: payload.author || 'Infinio Engineering',
    authorRole: payload.authorRole || 'Systems Architecture Team',
    coverImage: payload.coverImage || '/photos/infinio-team.jpg',
    tags: payload.tags?.length
      ? payload.tags
      : ['Engineering', 'Infinio', 'Digital Transformation'],
    seoTitle:
      payload.seoTitle || `${payload.title} | Infinio Technology Solutions`,
    seoDescription: payload.seoDescription || payload.excerpt,
    excerpt: payload.excerpt,
    body: payload.body?.length ? payload.body : [payload.excerpt],
  };

  const conn = await connectToMongo();
  if (conn) {
    try {
      const created = await ArticleModel.create(newArticle);
      return JSON.parse(JSON.stringify(created)) as IArticle;
    } catch {
      // fall through
    }
  }

  store.articles = [newArticle, ...store.articles];
  saveStore(store);
  return newArticle;
}

export async function updateArticleRecord(
  slug: string,
  updates: Partial<IArticle>
) {
  const conn = await connectToMongo();
  if (conn) {
    try {
      const updated = await ArticleModel.findOneAndUpdate({ slug }, updates, {
        new: true,
      }).lean();
      if (updated) return JSON.parse(JSON.stringify(updated)) as IArticle;
    } catch {
      // fall through
    }
  }

  const store = getStore();
  store.articles = store.articles.map((art) =>
    art.slug === slug ? { ...art, ...updates } : art
  );
  saveStore(store);
  return store.articles.find((art) => art.slug === (updates.slug || slug)) || null;
}

export async function deleteArticleRecord(slug: string) {
  const conn = await connectToMongo();
  if (conn) {
    try {
      await ArticleModel.findOneAndDelete({ slug });
    } catch {
      // fall through
    }
  }
  const store = getStore();
  store.articles = store.articles.filter((art) => art.slug !== slug);
  saveStore(store);
  return true;
}

export const ensureSeededAndFetchAll = getSiteData;
