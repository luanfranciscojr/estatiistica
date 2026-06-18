"use strict";
(() => {
var exports = {};
exports.id = 762;
exports.ids = [762];
exports.modules = {

/***/ 4021:
/***/ ((module) => {

module.exports = import("next/dist/compiled/@vercel/og/index.node.js");;

/***/ }),

/***/ 2037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 3566:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  headerHooks: () => (/* binding */ headerHooks),
  originalPathname: () => (/* binding */ originalPathname),
  requestAsyncStorage: () => (/* binding */ requestAsyncStorage),
  routeModule: () => (/* binding */ routeModule),
  serverHooks: () => (/* binding */ serverHooks),
  staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),
  staticGenerationBailout: () => (/* binding */ staticGenerationBailout)
});

// NAMESPACE OBJECT: ../../node_modules/next/dist/build/webpack/loaders/next-metadata-route-loader.js?page=%2Fmanifest.webmanifest%2Froute&isDynamic=1!./app/manifest.ts?__next_metadata_route__
var manifest_next_metadata_route_namespaceObject = {};
__webpack_require__.r(manifest_next_metadata_route_namespaceObject);
__webpack_require__.d(manifest_next_metadata_route_namespaceObject, {
  GET: () => (GET)
});

// EXTERNAL MODULE: ../../node_modules/next/dist/server/node-polyfill-headers.js
var node_polyfill_headers = __webpack_require__(5460);
// EXTERNAL MODULE: ../../node_modules/next/dist/server/future/route-modules/app-route/module.js
var app_route_module = __webpack_require__(9645);
// EXTERNAL MODULE: ../../node_modules/next/dist/server/future/route-kind.js
var route_kind = __webpack_require__(119);
// EXTERNAL MODULE: ../../node_modules/next/server.js
var server = __webpack_require__(989);
;// CONCATENATED MODULE: ./app/manifest.ts
function manifest() {
    return {
        name: "Estat\xedsticas SENIB",
        short_name: "SENIB",
        description: "Painel operacional local do SENIB",
        start_url: "/",
        display: "standalone",
        background_color: "#0a1120",
        theme_color: "#111a2f",
        lang: "pt-BR",
        orientation: "portrait",
        icons: [
            {
                src: "/icon-512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "maskable"
            },
            {
                src: "/icon-192.png",
                sizes: "192x192",
                type: "image/png"
            },
            {
                src: "/apple-touch-icon.png",
                sizes: "180x180",
                type: "image/png"
            }
        ]
    };
}

// EXTERNAL MODULE: ../../node_modules/next/dist/build/webpack/loaders/metadata/resolve-route-data.js
var resolve_route_data = __webpack_require__(6281);
;// CONCATENATED MODULE: ../../node_modules/next/dist/build/webpack/loaders/next-metadata-route-loader.js?page=%2Fmanifest.webmanifest%2Froute&isDynamic=1!./app/manifest.ts?__next_metadata_route__




const contentType = "application/manifest+json"
const fileType = "manifest"

async function GET() {
  const data = await manifest()
  const content = (0,resolve_route_data.resolveRouteData)(data, fileType)

  return new server.NextResponse(content, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': "public, max-age=0, must-revalidate",
    },
  })
}

;// CONCATENATED MODULE: ../../node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fmanifest.webmanifest%2Froute&name=app%2Fmanifest.webmanifest%2Froute&pagePath=private-next-app-dir%2Fmanifest.ts&appDir=%2FUsers%2Fluanfernandes%2Fnib%2Festatiistica%2Fapps%2Fweb%2Fapp&appPaths=%2Fmanifest&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!

// @ts-ignore this need to be imported from next/dist to be external


// @ts-expect-error - replaced by webpack/turbopack loader

const AppRouteRouteModule = app_route_module.AppRouteRouteModule;
// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = ""
const routeModule = new AppRouteRouteModule({
    definition: {
        kind: route_kind.RouteKind.APP_ROUTE,
        page: "/manifest.webmanifest/route",
        pathname: "/manifest.webmanifest",
        filename: "manifest",
        bundlePath: "app/manifest.webmanifest/route"
    },
    resolvedPagePath: "next-metadata-route-loader?page=%2Fmanifest.webmanifest%2Froute&isDynamic=1!/Users/luanfernandes/nib/estatiistica/apps/web/app/manifest.ts?__next_metadata_route__",
    nextConfigOutput,
    userland: manifest_next_metadata_route_namespaceObject
});
// Pull out the exports that we need to expose from the module. This should
// be eliminated when we've moved the other routes to the new format. These
// are used to hook into the route.
const { requestAsyncStorage , staticGenerationAsyncStorage , serverHooks , headerHooks , staticGenerationBailout  } = routeModule;
const originalPathname = "/manifest.webmanifest/route";


//# sourceMappingURL=app-route.js.map

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [471,740], () => (__webpack_exec__(3566)));
module.exports = __webpack_exports__;

})();