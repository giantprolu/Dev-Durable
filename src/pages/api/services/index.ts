import type { APIRoute } from 'astro';
import { validateSession, parseSessionCookie } from '../../../lib/auth';
import { prisma } from '../../../lib/prisma';

async function validateAuth(request: Request) {
  const cookieHeader = request.headers.get('cookie');
  const token = parseSessionCookie(cookieHeader);
  if (!token) return null;
  return validateSession(token);
}

// GET /api/services - Get all services
export const GET: APIRoute = async () => {
  const services = await prisma.service.findMany({
    where: { published: true },
    orderBy: { order: 'asc' },
  });

  return new Response(JSON.stringify(services), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

// POST /api/services - Create a new service
export const POST: APIRoute = async ({ request }) => {
  const user = await validateAuth(request);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Non authentifié' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const { slug, title, summary, description, pageTitle, pageDescription, sidebarTitle, sidebarItems, ctaTitle, ctaText, formats, published, order } = body;

    if (!slug || !title || !summary) {
      return new Response(JSON.stringify({ error: 'Slug, titre et résumé requis' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const service = await prisma.service.create({
      data: {
        slug,
        title,
        summary,
        description: description || '',
        pageTitle: pageTitle || title,
        pageDescription: pageDescription || summary,
        sidebarTitle: sidebarTitle || 'Livrables',
        sidebarItems: sidebarItems || [],
        ctaTitle: ctaTitle || `Intéressé par ${title} ?`,
        ctaText: ctaText || 'Discutons de votre projet.',
        formats: formats || [],
        published: published !== undefined ? published : true,
        order: order || 0,
      },
    });

    return new Response(JSON.stringify(service), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Create service error:', error);
    if (error.code === 'P2002') {
      return new Response(JSON.stringify({ error: 'Ce slug existe déjà' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ error: 'Erreur lors de la création du service' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
