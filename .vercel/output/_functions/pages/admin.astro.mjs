import { b as createAstro, c as createComponent, r as renderComponent, d as renderScript, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CX7bHXFR.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_B2MtGVRn.mjs';
import { p as parseSessionCookie, v as validateSession, a as prisma } from '../chunks/auth_DlAOnPhO.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://dev-durable.vercel.app");
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const cookieHeader = Astro2.request.headers.get("cookie");
  const token = parseSessionCookie(cookieHeader);
  if (!token) {
    return Astro2.redirect("/admin/login");
  }
  const user = await validateSession(token);
  if (!user) {
    return Astro2.redirect("/admin/login");
  }
  await prisma.$queryRaw`SELECT COUNT(*) FROM "User"`.catch(() => 0);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Administration", "data-astro-cid-u2h3djql": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="admin-dashboard" data-astro-cid-u2h3djql> <header class="admin-header" data-astro-cid-u2h3djql> <div class="admin-header__left" data-astro-cid-u2h3djql> <h1 data-astro-cid-u2h3djql>Administration</h1> <p data-astro-cid-u2h3djql>Bienvenue, ${user.name || user.email}</p> </div> <div class="admin-header__right" data-astro-cid-u2h3djql> <button id="logout-btn" class="btn btn--outline btn--sm" data-astro-cid-u2h3djql>
Déconnexion
</button> </div> </header> <div class="admin-content" data-astro-cid-u2h3djql> <section class="admin-section" data-astro-cid-u2h3djql> <h2 data-astro-cid-u2h3djql>Gestion du contenu</h2> <p class="admin-section__desc" data-astro-cid-u2h3djql>
Pour modifier le contenu du site, éditez directement les fichiers dans le dossier <code data-astro-cid-u2h3djql>src/content/</code>.
</p> <div class="admin-cards" data-astro-cid-u2h3djql> <article class="admin-card" data-astro-cid-u2h3djql> <h3 data-astro-cid-u2h3djql>Articles</h3> <p data-astro-cid-u2h3djql>Fichiers Markdown dans <code data-astro-cid-u2h3djql>src/content/articles/</code></p> <ul data-astro-cid-u2h3djql> <li data-astro-cid-u2h3djql>Créez un fichier <code data-astro-cid-u2h3djql>.md</code> pour chaque article</li> <li data-astro-cid-u2h3djql>Ajoutez le frontmatter (title, description, date, tags, image)</li> <li data-astro-cid-u2h3djql>Écrivez le contenu en Markdown</li> </ul> </article> <article class="admin-card" data-astro-cid-u2h3djql> <h3 data-astro-cid-u2h3djql>Pages</h3> <p data-astro-cid-u2h3djql>Fichiers JSON dans <code data-astro-cid-u2h3djql>src/content/pages/</code></p> <ul data-astro-cid-u2h3djql> <li data-astro-cid-u2h3djql><code data-astro-cid-u2h3djql>home.json</code> - Contenu de la page d'accueil</li> <li data-astro-cid-u2h3djql><code data-astro-cid-u2h3djql>about.json</code> - Contenu de la page À propos</li> </ul> </article> <article class="admin-card" data-astro-cid-u2h3djql> <h3 data-astro-cid-u2h3djql>Paramètres</h3> <p data-astro-cid-u2h3djql>Fichier <code data-astro-cid-u2h3djql>src/content/settings/general.json</code></p> <ul data-astro-cid-u2h3djql> <li data-astro-cid-u2h3djql>Nom du site</li> <li data-astro-cid-u2h3djql>Description</li> <li data-astro-cid-u2h3djql>Email de contact</li> </ul> </article> </div> </section> <section class="admin-section" data-astro-cid-u2h3djql> <h2 data-astro-cid-u2h3djql>Informations compte</h2> <dl class="admin-info" data-astro-cid-u2h3djql> <dt data-astro-cid-u2h3djql>Email</dt> <dd data-astro-cid-u2h3djql>${user.email}</dd> <dt data-astro-cid-u2h3djql>Rôle</dt> <dd data-astro-cid-u2h3djql>${user.role}</dd> <dt data-astro-cid-u2h3djql>Compte créé le</dt> <dd data-astro-cid-u2h3djql>${user.createdAt.toLocaleDateString("fr-FR")}</dd> </dl> </section> </div> </div> ` })}  ${renderScript($$result, "C:/Users/nathan.chavaudra/OneDrive - Magellan Partners/Bureau/Perso/Dev-Durable/growing-graham/src/pages/admin/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/nathan.chavaudra/OneDrive - Magellan Partners/Bureau/Perso/Dev-Durable/growing-graham/src/pages/admin/index.astro", void 0);

const $$file = "C:/Users/nathan.chavaudra/OneDrive - Magellan Partners/Bureau/Perso/Dev-Durable/growing-graham/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
