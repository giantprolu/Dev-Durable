import type { APIRoute } from 'astro';
import { resetPassword } from '../../../lib/auth';

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const token = formData.get('token')?.toString();
  const password = formData.get('password')?.toString();

  if (!token || !password) {
    return new Response(JSON.stringify({ error: 'Données manquantes' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const result = await resetPassword(token, password);

  if (!result.success) {
    return new Response(JSON.stringify({ error: result.error }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(
    JSON.stringify({ message: 'Mot de passe réinitialisé avec succès' }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};
