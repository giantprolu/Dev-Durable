import { p as parseSessionCookie, v as validateSession } from '../../../chunks/auth_BP93sYo0.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const GET = async ({ request }) => {
  try {
    const cookieHeader = request.headers.get("cookie");
    const token = parseSessionCookie(cookieHeader);
    if (!token) {
      return new Response(JSON.stringify({ user: null }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
    const user = await validateSession(token);
    if (!user) {
      return new Response(JSON.stringify({ user: null }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Auth check error:", error);
    return new Response(JSON.stringify({ user: null }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
