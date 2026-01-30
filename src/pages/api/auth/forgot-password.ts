import type { APIRoute } from 'astro';
import { createPasswordResetToken } from '../../../lib/auth';
import { sendPasswordResetEmail } from '../../../lib/email';

export const POST: APIRoute = async ({ request, url }) => {
  const formData = await request.formData();
  const email = formData.get('email')?.toString()?.toLowerCase();

  if (!email) {
    return new Response(JSON.stringify({ error: 'Veuillez entrer votre adresse email' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return new Response(JSON.stringify({ error: 'Adresse email invalide' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Create token (returns null if user doesn't exist, but we don't reveal that)
  const result = await createPasswordResetToken(email);

  // Always return success to prevent email enumeration attacks
  // Only actually send email if user exists
  if (result) {
    const resetUrl = `${url.origin}/admin/reset-password?token=${result.token}`;
    await sendPasswordResetEmail(email, resetUrl);
  }

  return new Response(
    JSON.stringify({
      message: 'Si un compte existe avec cette adresse email, vous recevrez un lien de réinitialisation.',
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};
