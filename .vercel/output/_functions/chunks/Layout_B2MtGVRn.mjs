import { b as createAstro, c as createComponent, m as maybeRenderHead, e as addAttribute, a as renderTemplate, d as renderScript, r as renderComponent, i as renderSlot, j as renderHead, u as unescapeHTML } from './astro/server_CX7bHXFR.mjs';
import 'piccolore';
/* empty css                            */
import 'clsx';

const $$Astro$1 = createAstro("https://dev-durable.vercel.app");
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Header;
  const navItems = [
    { label: "Accueil", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Articles", href: "/articles" },
    { label: "\xC0 propos", href: "/a-propos" },
    { label: "Contact", href: "/contact" }
  ];
  const currentPath = Astro2.url.pathname;
  return renderTemplate`${maybeRenderHead()}<header class="header" role="banner"> <div class="header__container"> <a href="/" class="header__logo" aria-label="Growing Graham - Retour à l'accueil"> <span class="header__logo-text">Growing Graham</span> </a> <nav class="header__nav" aria-label="Navigation principale"> <ul class="header__nav-list" role="list"> ${navItems.map((item) => renderTemplate`<li class="header__nav-item"> <a${addAttribute(item.href, "href")}${addAttribute(["header__nav-link", { "is-active": currentPath === item.href }], "class:list")}${addAttribute(currentPath === item.href ? "page" : void 0, "aria-current")}> ${item.label} </a> </li>`)} </ul> </nav> <button class="header__menu-toggle" aria-expanded="false" aria-controls="mobile-menu" aria-label="Ouvrir le menu de navigation"> <span class="header__menu-icon" aria-hidden="true"></span> </button> </div> <!-- Mobile Navigation --> <nav id="mobile-menu" class="header__mobile-nav" aria-label="Navigation mobile" hidden> <ul class="header__mobile-list" role="list"> ${navItems.map((item) => renderTemplate`<li class="header__mobile-item"> <a${addAttribute(item.href, "href")}${addAttribute(["header__mobile-link", { "is-active": currentPath === item.href }], "class:list")}${addAttribute(currentPath === item.href ? "page" : void 0, "aria-current")}> ${item.label} </a> </li>`)} </ul> </nav> </header> ${renderScript($$result, "C:/Users/nathan.chavaudra/OneDrive - Magellan Partners/Bureau/Perso/Dev-Durable/growing-graham/src/components/Header.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/nathan.chavaudra/OneDrive - Magellan Partners/Bureau/Perso/Dev-Durable/growing-graham/src/components/Header.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const footerLinks = [
    {
      title: "Contenu",
      links: [
        { label: "Articles", href: "/articles" },
        { label: "\xC0 propos", href: "/a-propos" },
        { label: "Contact", href: "/contact" }
      ]
    },
    {
      title: "L\xE9gal",
      links: [
        { label: "Mentions l\xE9gales", href: "/mentions-legales" },
        { label: "Politique de confidentialit\xE9", href: "/confidentialite" },
        { label: "Accessibilit\xE9", href: "/accessibilite" }
      ]
    }
  ];
  return renderTemplate`${maybeRenderHead()}<footer class="footer" role="contentinfo"> <div class="footer__container"> <div class="footer__main"> <!-- Brand Section --> <div class="footer__brand"> <a href="/" class="footer__logo" aria-label="Growing Graham - Retour à l'accueil"> <span class="footer__logo-text">Growing Graham</span> </a> <p class="footer__tagline">
Accompagnement en développement durable, RSE et transition écologique pour les entreprises engagées.
</p> </div> <!-- Navigation Links --> <nav class="footer__nav" aria-label="Navigation secondaire"> ${footerLinks.map((section) => renderTemplate`<div class="footer__nav-section"> <h3 class="footer__nav-title">${section.title}</h3> <ul class="footer__nav-list" role="list"> ${section.links.map((link) => renderTemplate`<li> <a${addAttribute(link.href, "href")} class="footer__nav-link"> ${link.label} </a> </li>`)} </ul> </div>`)} </nav> </div> <!-- Bottom Section --> <div class="footer__bottom"> <p class="footer__copyright">
&copy; ${currentYear} Growing Graham. Tous droits réservés.
</p> </div> </div> </footer>`;
}, "C:/Users/nathan.chavaudra/OneDrive - Magellan Partners/Bureau/Perso/Dev-Durable/growing-graham/src/components/Footer.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://dev-durable.vercel.app");
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title,
    description = "Growing Graham - Services en d\xE9veloppement durable, RSE et transition \xE9cologique pour les entreprises.",
    ogImage = "/og-image.jpg",
    type = "website",
    publishedDate
  } = Astro2.props;
  const canonicalURL = Astro2.site ? new URL(Astro2.url.pathname, Astro2.site) : Astro2.url.pathname;
  const siteUrl = Astro2.site?.href || "https://growinggraham.fr";
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Growing Graham",
    "url": siteUrl,
    "description": "Services en d\xE9veloppement durable, RSE et transition \xE9cologique pour les entreprises.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "FR"
    }
  };
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": type === "article" ? "Article" : "WebPage",
    "name": `${title} | Growing Graham`,
    "description": description,
    "url": canonicalURL,
    "publisher": {
      "@type": "Organization",
      "name": "Growing Graham"
    },
    ...publishedDate && { "datePublished": publishedDate.toISOString() }
  };
  return renderTemplate(_a || (_a = __template(['<html lang="fr"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><!-- Favicon --><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" href="/favicon.ico" sizes="32x32"><link rel="apple-touch-icon" href="/apple-touch-icon.png"><!-- SEO Meta --><title>', ' | Growing Graham</title><meta name="description"', '><meta name="generator"', '><link rel="canonical"', '><!-- Open Graph --><meta property="og:type" content="website"><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><meta property="og:locale" content="fr_FR"><!-- Twitter Card --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"', '><meta name="twitter:description"', '><meta name="twitter:image"', '><!-- Theme Color --><meta name="theme-color" content="#2D5A3D"><!-- Fonts: Inter from Google Fonts --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"><!-- JSON-LD Structured Data --><script type="application/ld+json">', '<\/script><script type="application/ld+json">', "<\/script>", '</head> <body> <!-- Skip Link for Accessibility --> <a href="#main-content" class="skip-link">\nAller au contenu principal\n</a> ', ' <main id="main-content" tabindex="-1"> ', " </main> ", " ", " </body> </html>"])), title, addAttribute(description, "content"), addAttribute(Astro2.generator, "content"), addAttribute(canonicalURL, "href"), addAttribute(canonicalURL, "content"), addAttribute(`${title} | Growing Graham`, "content"), addAttribute(description, "content"), addAttribute(ogImage, "content"), addAttribute(`${title} | Growing Graham`, "content"), addAttribute(description, "content"), addAttribute(ogImage, "content"), unescapeHTML(JSON.stringify(organizationSchema)), unescapeHTML(JSON.stringify(webPageSchema)), renderHead(), renderComponent($$result, "Header", $$Header, {}), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, {}), renderScript($$result, "C:/Users/nathan.chavaudra/OneDrive - Magellan Partners/Bureau/Perso/Dev-Durable/growing-graham/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts"));
}, "C:/Users/nathan.chavaudra/OneDrive - Magellan Partners/Bureau/Perso/Dev-Durable/growing-graham/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
