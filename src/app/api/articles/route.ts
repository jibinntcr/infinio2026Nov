import { NextResponse } from 'next/server';
import {
  getSiteData,
  createArticleRecord,
  updateArticleRecord,
  deleteArticleRecord,
} from '@/lib/db-store';
import { getAuthenticatedAdmin } from '@/lib/auth';

export async function GET() {
  const data = await getSiteData();
  return NextResponse.json({ articles: data.articles, engine: data.engine });
}

export async function POST(request: Request) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized. Admin login required.' }, { status: 401 });
  }
  try {
    const body = await request.json();
    const {
      title,
      subtitle,
      category,
      excerpt,
      summary,
      content,
      bodyParagraphs,
      readTime,
      author,
      authorRole,
      tags,
      seoTitle,
      seoDescription,
    } = body;

    const finalExcerpt = excerpt || summary || subtitle || '';
    if (!title || !finalExcerpt) {
      return NextResponse.json({ error: 'Title and summary/excerpt are required.' }, { status: 400 });
    }

    const parsedBody: string[] = Array.isArray(bodyParagraphs)
      ? bodyParagraphs
      : typeof content === 'string' && content.trim()
      ? content.split('\n\n').map((p: string) => p.trim()).filter(Boolean)
      : [finalExcerpt];

    const article = await createArticleRecord({
      title,
      subtitle: subtitle || finalExcerpt,
      category: category || 'Engineering & AI',
      excerpt: finalExcerpt,
      body: parsedBody,
      readTime: readTime || '5 min read',
      author: author || admin.name,
      authorRole: authorRole || 'Engineering Practice, Infinio',
      tags: Array.isArray(tags)
        ? tags
        : typeof tags === 'string'
        ? tags.split(',').map((t: string) => t.trim()).filter(Boolean)
        : ['Engineering', 'Enterprise AI'],
      seoTitle: seoTitle || `${title} | Infinio Technology Solutions`,
      seoDescription: seoDescription || finalExcerpt,
    });
    return NextResponse.json({ article }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create blog post' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized. Admin login required.' }, { status: 401 });
  }
  try {
    const reqBody = await request.json();
    const { slug, content, summary, tags, ...rest } = reqBody;
    if (!slug) {
      return NextResponse.json({ error: 'Article slug is required.' }, { status: 400 });
    }
    const updates: any = { ...rest };
    if (summary) updates.excerpt = summary;
    if (typeof content === 'string' && content.trim()) {
      updates.body = content
        .split('\n\n')
        .map((p: string) => p.trim())
        .filter(Boolean);
    }
    if (typeof tags === 'string') {
      updates.tags = tags
        .split(',')
        .map((t: string) => t.trim())
        .filter(Boolean);
    } else if (Array.isArray(tags)) {
      updates.tags = tags;
    }

    const article = await updateArticleRecord(slug, updates);
    if (!article) {
      return NextResponse.json({ error: 'Article not found.' }, { status: 404 });
    }
    return NextResponse.json({ article });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update blog post' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized. Admin login required.' }, { status: 401 });
  }
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug') || searchParams.get('id');
    if (!slug) {
      return NextResponse.json({ error: 'Article slug is required.' }, { status: 400 });
    }
    await deleteArticleRecord(slug);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete blog post' }, { status: 500 });
  }
}
