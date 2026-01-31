import type { APIRoute } from 'astro';
import { validateSession, parseSessionCookie } from '../../../lib/auth';
import { prisma } from '../../../lib/prisma';

async function validateAuth(request: Request) {
  const cookieHeader = request.headers.get('cookie');
  const token = parseSessionCookie(cookieHeader);
  if (!token) return null;
  return validateSession(token);
}

// GET /api/services/[id] - Get a single service
export const GET: APIRoute = async ({ params }) => {
  const { id } = params;
  if (!id) {
    return new Response(JSON.stringify({ error: 'ID manquant' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const service = await prisma.service.findUnique({ where: { id } });

  if (!service) {
    return new Response(JSON.stringify({ error: 'Service non trouvé' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify(service), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

// PUT /api/services/[id] - Update a service
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
    const { slug, title, summary, description, pageTitle, pageDescription, sidebarTitle, sidebarItems, ctaTitle, ctaText, formats, published, order } = body;

    const service = await prisma.service.update({
      where: { id },
      data: {
        ...(slug !== undefined && { slug }),
        ...(title !== undefined && { title }),
        ...(summary !== undefined && { summary }),
        ...(description !== undefined && { description }),
        ...(pageTitle !== undefined && { pageTitle }),
        ...(pageDescription !== undefined && { pageDescription }),
        ...(sidebarTitle !== undefined && { sidebarTitle }),
        ...(sidebarItems !== undefined && { sidebarItems }),
        ...(ctaTitle !== undefined && { ctaTitle }),
        ...(ctaText !== undefined && { ctaText }),
        ...(formats !== undefined && { formats }),
        ...(published !== undefined && { published }),
        ...(order !== undefined && { order }),
      },
    });

    return new Response(JSON.stringify(service), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Update service error:', error);
    if (error.code === 'P2002') {
      return new Response(JSON.stringify({ error: 'Ce slug existe déjà' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    if (error.code === 'P2025') {
      return new Response(JSON.stringify({ error: 'Service non trouvé' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ error: 'Erreur lors de la mise à jour du service' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// DELETE /api/services/[id] - Delete a service
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
    await prisma.service.delete({ where: { id } });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Delete service error:', error);
    if (error.code === 'P2025') {
      return new Response(JSON.stringify({ error: 'Service non trouvé' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ error: 'Erreur lors de la suppression du service' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
