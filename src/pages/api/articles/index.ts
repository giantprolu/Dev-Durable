import type { APIRoute } from 'astro';
import { validateSession, parseSessionCookie } from '../../../lib/auth';
import { prisma } from '../../../lib/prisma';

// GET /api/articles - List all articles
export const GET: APIRoute = async ({ request }) => {
  const cookieHeader = request.headers.get('cookie');
  const token = parseSessionCookie(cookieHeader);

  if (!token) {
    return new Response(JSON.stringify({ error: 'Non authentifié' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const user = await validateSession(token);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Session invalide' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const articles = await prisma.article.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      author: {
        select: { id: true, name: true, email: true },
      },
    },
  });

  return new Response(JSON.stringify(articles), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

// POST /api/articles - Create a new article
export const POST: APIRoute = async ({ request }) => {
  const cookieHeader = request.headers.get('cookie');
  const token = parseSessionCookie(cookieHeader);

  if (!token) {
    return new Response(JSON.stringify({ error: 'Non authentifié' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const user = await validateSession(token);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Session invalide' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const { title, slug, description, content, image, imageAlt, tags, published } = body;

    if (!title || !slug || !description || !content) {
      return new Response(JSON.stringify({ error: 'Titre, slug, description et contenu sont requis' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Check if slug already exists
    const existingArticle = await prisma.article.findUnique({ where: { slug } });
    if (existingArticle) {
      return new Response(JSON.stringify({ error: 'Ce slug existe déjà' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const article = await prisma.article.create({
      data: {
        title,
        slug,
        description,
        content,
        image: image || null,
        imageAlt: imageAlt || null,
        tags: tags || [],
        published: published ?? false,
        authorId: user.id,
      },
    });

    return new Response(JSON.stringify(article), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Create article error:', error);
    return new Response(JSON.stringify({ error: 'Erreur lors de la création de l\'article' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
