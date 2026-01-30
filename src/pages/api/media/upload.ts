import type { APIRoute } from 'astro';
import { put } from '@vercel/blob';
import { validateSession, parseSessionCookie } from '../../../lib/auth';
import { prisma } from '../../../lib/prisma';

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
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return new Response(JSON.stringify({ error: 'Aucun fichier fourni' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      return new Response(JSON.stringify({ error: 'Type de fichier non autorisé. Formats acceptés: JPEG, PNG, GIF, WebP, SVG' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return new Response(JSON.stringify({ error: 'Le fichier est trop volumineux (max 5 Mo)' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const extension = file.name.split('.').pop() || 'jpg';
    const filename = `${timestamp}-${Math.random().toString(36).substring(7)}.${extension}`;

    // Upload to Vercel Blob
    const blob = await put(filename, file, {
      access: 'public',
    });

    // Save to database
    const media = await prisma.media.create({
      data: {
        filename: file.name,
        url: blob.url,
        type: file.type,
        size: file.size,
      },
    });

    return new Response(JSON.stringify(media), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Upload error:', error);
    return new Response(JSON.stringify({ error: 'Erreur lors de l\'upload du fichier' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
