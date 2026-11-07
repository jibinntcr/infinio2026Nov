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

function readLocalStore(): LocalStoreSchema {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      return {
        services: parsed.services?.length ? parsed.services : SEED_SERVICES,
        projects: parsed.projects?.length ? parsed.projects : SEED_PROJECTS,
        testimonials: parsed.testimonials?.length
          ? parsed.testimonials
          : SEED_TESTIMONIALS,
        articles: parsed.articles?.length ? parsed.articles : SEED_ARTICLES,
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
    // ignore write error
  }
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
          ArticleModel.find().lean(),
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
      // fall through to local store
    }
  }

  const store = readLocalStore();
  return {
    engine: 'mongodb-hybrid-store',
    ...store,
  };
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

  const store = readLocalStore();
  const newInquiry: IInquiry = {
    _id: `mongo-${Date.now().toString(36)}`,
    ...payload,
    status: 'new',
    createdAt: new Date().toISOString(),
  };
  store.inquiries = [newInquiry, ...store.inquiries];
  writeLocalStore(store);

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

  const store = readLocalStore();
  store.inquiries = store.inquiries.map((item) =>
    item._id === id ? { ...item, status } : item
  );
  writeLocalStore(store);
  return store.inquiries.find((item) => item._id === id) || null;
}

export async function createProjectRecord(payload: {
  client: string;
  location: string;
  category: string;
  tagline: string;
  description: string;
  year?: string;
}) {
  const store = readLocalStore();
  const nextNum = store.projects.length + 1;
  const newProject: IProject = {
    indexCode: `WRK // 0${nextNum}`,
    slug: `${payload.client.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString(36)}`,
    client: payload.client,
    location: payload.location || 'Kochi, India',
    year: payload.year || '2026',
    category: payload.category || 'Custom Software',
    tagline: payload.tagline,
    description: payload.description || payload.tagline,
    architectureNote: 'Next.js · MongoDB · Cloud Architecture',
    deliverables: ['System Architecture', 'Full-Stack Engineering', 'Cloud Deployment'],
    metrics: [
      { label: 'Reliability', value: '99.9%' },
      { label: 'Status', value: 'Live' },
    ],
    accent: nextNum % 2 === 0 ? '#d8b48c' : '#5df2d6',
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

  store.projects.push(newProject);
  writeLocalStore(store);
  return newProject;
}

export const ensureSeededAndFetchAll = getSiteData;
