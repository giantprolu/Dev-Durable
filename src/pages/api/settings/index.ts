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

// GET /api/settings - Get all settings
export const GET: APIRoute = async () => {
  const settings = await prisma.siteSetting.findMany();

  // Convert to key-value object for easier use
  const settingsObject = settings.reduce((acc, setting) => {
    acc[setting.key] = setting.value;
    return acc;
  }, {} as Record<string, string>);

  return new Response(JSON.stringify(settingsObject), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

// PUT /api/settings - Update settings (expects key-value pairs)
export const PUT: APIRoute = async ({ request }) => {
  const user = await validateAuth(request);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Non authentifié' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json() as Record<string, string>;

    // Upsert each setting
    const updates = Object.entries(body).map(([key, value]) =>
      prisma.siteSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      })
    );

    await prisma.$transaction(updates);

    // Return updated settings
    const settings = await prisma.siteSetting.findMany();
    const settingsObject = settings.reduce((acc, setting) => {
      acc[setting.key] = setting.value;
      return acc;
    }, {} as Record<string, string>);

    return new Response(JSON.stringify(settingsObject), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Update settings error:', error);
    return new Response(JSON.stringify({ error: 'Erreur lors de la mise à jour des paramètres' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
