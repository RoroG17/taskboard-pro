
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-OFPVT24L.js"
    ],
    "route": "/tasks"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-OFPVT24L.js"
    ],
    "route": "/tasks/dashboard"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-RZNHTRUF.js"
    ],
    "route": "/about"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 539, hash: '807694a0b72d6e712cadb0ddb4e90ae4c5325a67b74fbf33953a3bc3d7f66fa8', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1052, hash: 'ab3bf530b44a1d54458bfbad6d0c272e5df82d94bbbefed725ee255a27f12aa7', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'tasks/dashboard/index.html': {size: 8755, hash: 'cf89db31d7cfca964cc27daf5a222f35e8dc13286ca50d16721d6d149c9d5bf7', text: () => import('./assets-chunks/tasks_dashboard_index_html.mjs').then(m => m.default)},
    'tasks/index.html': {size: 10044, hash: 'c8bbf34eac27df76de26082afb9f148fee480ef3c4e2fb882fb399fa47c7cfd2', text: () => import('./assets-chunks/tasks_index_html.mjs').then(m => m.default)},
    'index.html': {size: 3647, hash: '407abd295ca121d0ac99ea9794f8d578856ed4c9a89e1e6d3d0be2905230b8b2', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'about/index.html': {size: 3575, hash: '2581fa203bca90085d0db5d1d15b429119d10f20225cab07de36fbce093f19d4', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
