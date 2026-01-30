import type { APIRoute } from 'astro';
import { del } from '@vercel/blob';
import { validateSession, parseSessionCookie } from '../../../lib/auth';
import { prisma } from '../../../lib/prisma';

// GET /api/media - List all media
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

  const media = await prisma.media.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return new Response(JSON.stringify(media), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

// DELETE /api/media - Delete media by ID (passed in body)
export const DELETE: APIRoute = async ({ request }) => {
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
    const { id } = body;

    if (!id) {
      return new Response(JSON.stringify({ error: 'ID manquant' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const media = await prisma.media.findUnique({ where: { id } });
    if (!media) {
      return new Response(JSON.stringify({ error: 'Média non trouvé' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Delete from Vercel Blob
    try {
      await del(media.url);
    } catch (blobError) {
      console.error('Error deleting from Vercel Blob:', blobError);
      // Continue with database deletion even if blob deletion fails
    }

    // Delete from database
    await prisma.media.delete({ where: { id } });

    return new Response(JSON.stringify({ message: 'Média supprimé' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Delete media error:', error);
    return new Response(JSON.stringify({ error: 'Erreur lors de la suppression du média' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
