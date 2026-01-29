import { b as createAstro, c as createComponent, r as renderComponent, d as renderScript, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_CX7bHXFR.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_B2MtGVRn.mjs';
import { p as parseSessionCookie, v as validateSession } from '../../chunks/auth_BP93sYo0.mjs';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://dev-durable.vercel.app");
const prerender = false;
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  const cookieHeader = Astro2.request.headers.get("cookie");
  const token = parseSessionCookie(cookieHeader);
  if (token) {
    const user = await validateSession(token);
    if (user) {
      return Astro2.redirect("/admin");
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Connexion Admin", "data-astro-cid-rf56lckb": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="admin-login" data-astro-cid-rf56lckb> <div class="admin-login__card" data-astro-cid-rf56lckb> <h1 data-astro-cid-rf56lckb>Administration</h1> <p class="admin-login__subtitle" data-astro-cid-rf56lckb>Connectez-vous pour gérer le contenu</p> <form id="login-form" class="form" data-astro-cid-rf56lckb> <div id="error-message" class="form__error" style="display: none;" data-astro-cid-rf56lckb></div> <div class="form__group" data-astro-cid-rf56lckb> <label for="email" class="form__label form__label--required" data-astro-cid-rf56lckb>Email</label> <input type="email" id="email" name="email" class="form__input" required autocomplete="email" data-astro-cid-rf56lckb> </div> <div class="form__group" data-astro-cid-rf56lckb> <label for="password" class="form__label form__label--required" data-astro-cid-rf56lckb>Mot de passe</label> <input type="password" id="password" name="password" class="form__input" required autocomplete="current-password" data-astro-cid-rf56lckb> </div> <button type="submit" class="btn btn--primary btn--lg btn--full" id="submit-btn" data-astro-cid-rf56lckb>
Se connecter
</button> </form> <p class="admin-login__register" data-astro-cid-rf56lckb>
Pas encore de compte ? <a href="/admin/register" data-astro-cid-rf56lckb>Créer un compte</a> </p> </div> </div> ` })}  ${renderScript($$result, "C:/Users/nathan.chavaudra/OneDrive - Magellan Partners/Bureau/Perso/Dev-Durable/growing-graham/src/pages/admin/login.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/nathan.chavaudra/OneDrive - Magellan Partners/Bureau/Perso/Dev-Durable/growing-graham/src/pages/admin/login.astro", void 0);

const $$file = "C:/Users/nathan.chavaudra/OneDrive - Magellan Partners/Bureau/Perso/Dev-Durable/growing-graham/src/pages/admin/login.astro";
const $$url = "/admin/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
