import type { APIRoute } from 'astro';
import { prisma } from '../../../lib/prisma';

// GET /api/comments?articleId=xxx - Get approved comments for an article
export const GET: APIRoute = async ({ url }) => {
  const articleId = url.searchParams.get('articleId');

  if (!articleId) {
    return new Response(JSON.stringify({ error: 'articleId requis' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const comments = await prisma.comment.findMany({
    where: { articleId, approved: true },
    orderBy: { createdAt: 'desc' },
  });

  return new Response(JSON.stringify(comments), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

// POST /api/comments - Submit a new comment
export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { articleId, author, email, content } = body;

    if (!articleId || !author || !email || !content) {
      return new Response(JSON.stringify({ error: 'Tous les champs sont requis' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const comment = await prisma.comment.create({
      data: {
        articleId,
        author,
        email,
        content,
        approved: false, // Comments need approval by default
      },
    });

    return new Response(JSON.stringify({
      message: 'Commentaire soumis avec succès. Il sera visible après modération.',
      comment
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating comment:', error);
    return new Response(JSON.stringify({ error: 'Erreur lors de la création du commentaire' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
