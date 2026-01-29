import { f as getUserByEmail, h as createUser, c as createSession, g as getSessionCookie } from '../../../chunks/auth_DlAOnPhO.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  try {
    const formData = await request.formData();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const name = formData.get("name")?.toString();
    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Email et mot de passe requis" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: "Format email invalide" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (password.length < 8) {
      return new Response(JSON.stringify({ error: "Le mot de passe doit contenir au moins 8 caractères" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return new Response(JSON.stringify({ error: "Cet email est déjà utilisé" }), {
        status: 409,
        headers: { "Content-Type": "application/json" }
      });
    }
    const user = await createUser(email, password, name);
    const token = await createSession(user.id);
    return new Response(JSON.stringify({ success: true, user: { id: user.id, email: user.email, name: user.name } }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": getSessionCookie(token)
      }
    });
  } catch (error) {
    console.error("Register error:", error);
    return new Response(JSON.stringify({ error: "Erreur serveur" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
