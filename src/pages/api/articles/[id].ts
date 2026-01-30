import type { APIRoute } from 'astro';
import { validateSession, parseSessionCookie } from '../../../lib/auth';
import { prisma } from '../../../lib/prisma';

// Helper to validate authentication
async function validateAuth(request: Request) {
  const cookieHeader = request.headers.get('cookie');
  const token = parseSessionCookie(cookieHeader);

  if (!token) return null;
  return validateSession(token);
}

// GET /api/articles/[id] - Get a single article
export const GET: APIRoute = async ({ params, request }) => {
  const user = await validateAuth(request);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Non authentifié' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { id } = params;
  if (!id) {
    return new Response(JSON.stringify({ error: 'ID manquant' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const article = await prisma.article.findUnique({
    where: { id },
    include: {
      author: {
        select: { id: true, name: true, email: true },
      },
    },
  });

  if (!article) {
    return new Response(JSON.stringify({ error: 'Article non trouvé' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify(article), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

// PUT /api/articles/[id] - Update an article
export const PUT: APIRoute = async ({ params, request }) => {
  const user = await validateAuth(request);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Non authentifié' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { id } = params;
  if (!id) {
    return new Response(JSON.stringify({ error: 'ID manquant' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const { title, slug, description, content, image, imageAlt, tags, published } = body;

    // Check if article exists
    const existingArticle = await prisma.article.findUnique({ where: { id } });
    if (!existingArticle) {
      return new Response(JSON.stringify({ error: 'Article non trouvé' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Check if slug is being changed and if new slug exists
    if (slug && slug !== existingArticle.slug) {
      const slugExists = await prisma.article.findUnique({ where: { slug } });
      if (slugExists) {
        return new Response(JSON.stringify({ error: 'Ce slug existe déjà' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    const article = await prisma.article.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(slug && { slug }),
        ...(description && { description }),
        ...(content && { content }),
        ...(image !== undefined && { image }),
        ...(imageAlt !== undefined && { imageAlt }),
        ...(tags !== undefined && { tags }),
        ...(published !== undefined && { published }),
      },
    });

    return new Response(JSON.stringify(article), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Update article error:', error);
    return new Response(JSON.stringify({ error: 'Erreur lors de la mise à jour de l\'article' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// DELETE /api/articles/[id] - Delete an article
export const DELETE: APIRoute = async ({ params, request }) => {
  const user = await validateAuth(request);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Non authentifié' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { id } = params;
  if (!id) {
    return new Response(JSON.stringify({ error: 'ID manquant' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const article = await prisma.article.findUnique({ where: { id } });
    if (!article) {
      return new Response(JSON.stringify({ error: 'Article non trouvé' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await prisma.article.delete({ where: { id } });

    return new Response(JSON.stringify({ message: 'Article supprimé' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Delete article error:', error);
    return new Response(JSON.stringify({ error: 'Erreur lors de la suppression de l\'article' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
