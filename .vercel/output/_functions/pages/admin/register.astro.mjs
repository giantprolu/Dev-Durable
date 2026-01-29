import { b as createAstro, c as createComponent, r as renderComponent, d as renderScript, a as renderTemplate, m as maybeRenderHead, F as Fragment } from '../../chunks/astro/server_CX7bHXFR.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_B2MtGVRn.mjs';
import { p as parseSessionCookie, v as validateSession, a as prisma } from '../../chunks/auth_DlAOnPhO.mjs';
/* empty css                                       */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://dev-durable.vercel.app");
const prerender = false;
const $$Register = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Register;
  const cookieHeader = Astro2.request.headers.get("cookie");
  const token = parseSessionCookie(cookieHeader);
  if (token) {
    const user = await validateSession(token);
    if (user) {
      return Astro2.redirect("/admin");
    }
  }
  const userCount = await prisma.user.count();
  const allowRegistration = userCount === 0;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Cr\xE9er un compte Admin", "data-astro-cid-u26ovtac": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="admin-login" data-astro-cid-u26ovtac> <div class="admin-login__card" data-astro-cid-u26ovtac> <h1 data-astro-cid-u26ovtac>Créer un compte</h1> ${allowRegistration ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-u26ovtac": true }, { "default": async ($$result3) => renderTemplate` <p class="admin-login__subtitle" data-astro-cid-u26ovtac>Premier compte administrateur</p> <form id="register-form" class="form" data-astro-cid-u26ovtac> <div id="error-message" class="form__error" style="display: none;" data-astro-cid-u26ovtac></div> <div class="form__group" data-astro-cid-u26ovtac> <label for="name" class="form__label" data-astro-cid-u26ovtac>Nom</label> <input type="text" id="name" name="name" class="form__input" autocomplete="name" data-astro-cid-u26ovtac> </div> <div class="form__group" data-astro-cid-u26ovtac> <label for="email" class="form__label form__label--required" data-astro-cid-u26ovtac>Email</label> <input type="email" id="email" name="email" class="form__input" required autocomplete="email" data-astro-cid-u26ovtac> </div> <div class="form__group" data-astro-cid-u26ovtac> <label for="password" class="form__label form__label--required" data-astro-cid-u26ovtac>Mot de passe</label> <input type="password" id="password" name="password" class="form__input" required minlength="8" autocomplete="new-password" data-astro-cid-u26ovtac> <span class="form__hint" data-astro-cid-u26ovtac>Minimum 8 caractères</span> </div> <button type="submit" class="btn btn--primary btn--lg btn--full" id="submit-btn" data-astro-cid-u26ovtac>
Créer le compte
</button> </form> ` })}` : renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-u26ovtac": true }, { "default": async ($$result3) => renderTemplate` <p class="admin-login__subtitle" data-astro-cid-u26ovtac>L'inscription est désactivée.</p> <p style="color: var(--color-text-secondary); font-size: var(--font-size-sm);" data-astro-cid-u26ovtac>
Un compte administrateur existe déjà. Contactez l'administrateur pour obtenir un accès.
</p> <a href="/admin/login" class="btn btn--outline btn--lg btn--full" style="margin-top: var(--space-6);" data-astro-cid-u26ovtac>
Se connecter
</a> ` })}`} </div> </div> ` })}  ${renderScript($$result, "C:/Users/nathan.chavaudra/OneDrive - Magellan Partners/Bureau/Perso/Dev-Durable/growing-graham/src/pages/admin/register.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/nathan.chavaudra/OneDrive - Magellan Partners/Bureau/Perso/Dev-Durable/growing-graham/src/pages/admin/register.astro", void 0);

const $$file = "C:/Users/nathan.chavaudra/OneDrive - Magellan Partners/Bureau/Perso/Dev-Durable/growing-graham/src/pages/admin/register.astro";
const $$url = "/admin/register";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Register,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
