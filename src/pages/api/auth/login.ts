export const prerender = false;

import type { APIRoute } from 'astro';
import { authenticateUser, createSession, getSessionCookie } from '../../../lib/auth';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();

    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email et mot de passe requis' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const user = await authenticateUser(email, password);

    if (!user) {
      return new Response(JSON.stringify({ error: 'Email ou mot de passe incorrect' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const token = await createSession(user.id);

    return new Response(JSON.stringify({ success: true, user: { id: user.id, email: user.email, name: user.name } }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': getSessionCookie(token),
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return new Response(JSON.stringify({ error: 'Erreur serveur' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
