import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_SfoSINtJ.mjs';
import { manifest } from './manifest_D_O9r0y2.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/a-propos.astro.mjs');
const _page2 = () => import('./pages/admin/login.astro.mjs');
const _page3 = () => import('./pages/admin/register.astro.mjs');
const _page4 = () => import('./pages/admin.astro.mjs');
const _page5 = () => import('./pages/api/auth/login.astro.mjs');
const _page6 = () => import('./pages/api/auth/logout.astro.mjs');
const _page7 = () => import('./pages/api/auth/me.astro.mjs');
const _page8 = () => import('./pages/api/auth/register.astro.mjs');
const _page9 = () => import('./pages/articles/_id_.astro.mjs');
const _page10 = () => import('./pages/articles.astro.mjs');
const _page11 = () => import('./pages/contact.astro.mjs');
const _page12 = () => import('./pages/services/formation.astro.mjs');
const _page13 = () => import('./pages/services/strategie-rse.astro.mjs');
const _page14 = () => import('./pages/services/transition-ecologique.astro.mjs');
const _page15 = () => import('./pages/services.astro.mjs');
const _page16 = () => import('./pages/tags/_tag_.astro.mjs');
const _page17 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/a-propos.astro", _page1],
    ["src/pages/admin/login.astro", _page2],
    ["src/pages/admin/register.astro", _page3],
    ["src/pages/admin/index.astro", _page4],
    ["src/pages/api/auth/login.ts", _page5],
    ["src/pages/api/auth/logout.ts", _page6],
    ["src/pages/api/auth/me.ts", _page7],
    ["src/pages/api/auth/register.ts", _page8],
    ["src/pages/articles/[id].astro", _page9],
    ["src/pages/articles/index.astro", _page10],
    ["src/pages/contact.astro", _page11],
    ["src/pages/services/formation.astro", _page12],
    ["src/pages/services/strategie-rse.astro", _page13],
    ["src/pages/services/transition-ecologique.astro", _page14],
    ["src/pages/services/index.astro", _page15],
    ["src/pages/tags/[tag].astro", _page16],
    ["src/pages/index.astro", _page17]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "2b89f69a-4966-46ca-9c37-9ae4e6212b72",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
