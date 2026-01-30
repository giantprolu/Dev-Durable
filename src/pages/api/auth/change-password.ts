import type { APIRoute } from 'astro';
import { validateSession, parseSessionCookie, updateUserPassword } from '../../../lib/auth';

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

  const formData = await request.formData();
  const currentPassword = formData.get('currentPassword')?.toString();
  const newPassword = formData.get('newPassword')?.toString();

  if (!currentPassword || !newPassword) {
    return new Response(JSON.stringify({ error: 'Veuillez remplir tous les champs' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const result = await updateUserPassword(user.id, currentPassword, newPassword);

  if (!result.success) {
    return new Response(JSON.stringify({ error: result.error }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ message: 'Mot de passe modifié avec succès' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
