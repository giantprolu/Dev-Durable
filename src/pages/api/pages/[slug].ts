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

// GET /api/pages/[slug] - Get page content
export const GET: APIRoute = async ({ params, request }) => {
  const { slug } = params;
  if (!slug) {
    return new Response(JSON.stringify({ error: 'Slug manquant' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const page = await prisma.pageContent.findUnique({ where: { slug } });

  if (!page) {
    return new Response(JSON.stringify({ error: 'Page non trouvée' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify(page), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

// PUT /api/pages/[slug] - Update or create page content
export const PUT: APIRoute = async ({ params, request }) => {
  const user = await validateAuth(request);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Non authentifié' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { slug } = params;
  if (!slug) {
    return new Response(JSON.stringify({ error: 'Slug manquant' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const { content } = body;

    if (!content) {
      return new Response(JSON.stringify({ error: 'Contenu manquant' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Upsert the page content
    const page = await prisma.pageContent.upsert({
      where: { slug },
      update: { content },
      create: { slug, content },
    });

    return new Response(JSON.stringify(page), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Update page error:', error);
    return new Response(JSON.stringify({ error: 'Erreur lors de la mise à jour de la page' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
