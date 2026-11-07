import mongoose, { Schema, Model } from 'mongoose';

export interface IServiceCapability {
  name: string;
  detail: string;
}

export interface IService {
  _id?: string;
  code: string;
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  capabilities: IServiceCapability[];
  accentColor: string;
  metrics: string;
  order: number;
}

export interface IProjectMetric {
  label: string;
  value: string;
}

export interface IProject {
  _id?: string;
  indexCode: string;
  slug: string;
  client: string;
  location: string;
  year: string;
  category: string;
  tagline: string;
  requirement?: string;
  contribution?: string;
  outcome?: string;
  logo?: string;
  description: string;
  architectureNote: string;
  deliverables: string[];
  metrics: IProjectMetric[];
  liveUrl?: string;
  accent: string;
  featured: boolean;
  order: number;
}

export interface ITestimonial {
  _id?: string;
  clientName: string;
  role: string;
  company: string;
  location: string;
  quote: string;
  projectTag: string;
  avatar?: string;
  logo?: string;
  rating: number;
  order: number;
}

export interface IArticle {
  _id?: string;
  code: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  publishedAt: string;
  author?: string;
  authorRole?: string;
  coverImage?: string;
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
  excerpt: string;
  body: string[];
}

export interface IInquiry {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  location?: string;
  serviceNeeded: string;
  projectStage: string;
  budgetRange: string;
  timeline: string;
  message: string;
  status: 'new' | 'reviewing' | 'scheduled' | 'archived';
  createdAt?: string;
}

const ServiceSchema = new Schema<IService>(
  {
    code: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    shortTitle: { type: String, required: true },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    capabilities: [
      {
        name: { type: String, required: true },
        detail: { type: String, required: true },
      },
    ],
    accentColor: { type: String, default: '#2563eb' },
    metrics: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const ProjectSchema = new Schema<IProject>(
  {
    indexCode: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    client: { type: String, required: true },
    location: { type: String, required: true },
    year: { type: String, required: true },
    category: { type: String, required: true },
    tagline: { type: String, required: true },
    requirement: { type: String },
    contribution: { type: String },
    outcome: { type: String },
    logo: { type: String },
    description: { type: String, required: true },
    architectureNote: { type: String, required: true },
    deliverables: [{ type: String }],
    metrics: [
      {
        label: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    liveUrl: { type: String },
    accent: { type: String, default: '#2563eb' },
    featured: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const TestimonialSchema = new Schema<ITestimonial>(
  {
    clientName: { type: String, required: true },
    role: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    quote: { type: String, required: true },
    projectTag: { type: String, required: true },
    avatar: { type: String },
    logo: { type: String },
    rating: { type: Number, default: 5 },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const ArticleSchema = new Schema<IArticle>(
  {
    code: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    category: { type: String, required: true },
    readTime: { type: String, required: true },
    publishedAt: { type: String, required: true },
    author: { type: String, default: 'Infinio Engineering' },
    authorRole: { type: String, default: 'Systems Architecture Team' },
    coverImage: { type: String, default: '/images/infinio-logo.png' },
    tags: [{ type: String }],
    seoTitle: { type: String },
    seoDescription: { type: String },
    excerpt: { type: String, required: true },
    body: [{ type: String }],
  },
  { timestamps: true }
);

const InquirySchema = new Schema<IInquiry>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    company: { type: String },
    location: { type: String },
    serviceNeeded: { type: String, required: true },
    projectStage: { type: String, required: true },
    budgetRange: { type: String, required: true },
    timeline: { type: String, required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ['new', 'reviewing', 'scheduled', 'archived'],
      default: 'new',
    },
  },
  { timestamps: true }
);

export const ServiceModel: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);

export const ProjectModel: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export const TestimonialModel: Model<ITestimonial> =
  mongoose.models.Testimonial ||
  mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);

export const ArticleModel: Model<IArticle> =
  mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema);

export const InquiryModel: Model<IInquiry> =
  mongoose.models.Inquiry || mongoose.model<IInquiry>('Inquiry', InquirySchema);
