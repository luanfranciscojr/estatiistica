(() => {
var exports = {};
exports.id = 931;
exports.ids = [931];
exports.modules = {

/***/ 8038:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/react");

/***/ }),

/***/ 8704:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/react-dom/server-rendering-stub");

/***/ }),

/***/ 7897:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/react-server-dom-webpack/client");

/***/ }),

/***/ 6786:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/react/jsx-runtime");

/***/ }),

/***/ 5868:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/app-render");

/***/ }),

/***/ 1844:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/get-segment-param");

/***/ }),

/***/ 6624:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/future/helpers/interception-routes");

/***/ }),

/***/ 5281:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/future/route-modules/route-module");

/***/ }),

/***/ 7085:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/app-router-context");

/***/ }),

/***/ 199:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/hash");

/***/ }),

/***/ 9569:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/hooks-client-context");

/***/ }),

/***/ 893:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix");

/***/ }),

/***/ 4490:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/handle-smooth-scroll");

/***/ }),

/***/ 8735:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-bot");

/***/ }),

/***/ 8231:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-path");

/***/ }),

/***/ 4614:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix");

/***/ }),

/***/ 3750:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash");

/***/ }),

/***/ 9618:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/server-inserted-html");

/***/ }),

/***/ 7283:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GlobalError: () => (/* reexport default from dynamic */ next_dist_client_components_error_boundary__WEBPACK_IMPORTED_MODULE_2___default.a),
/* harmony export */   __next_app__: () => (/* binding */ __next_app__),
/* harmony export */   originalPathname: () => (/* binding */ originalPathname),
/* harmony export */   pages: () => (/* binding */ pages),
/* harmony export */   routeModule: () => (/* binding */ routeModule),
/* harmony export */   tree: () => (/* binding */ tree)
/* harmony export */ });
/* harmony import */ var next_dist_server_future_route_modules_app_page_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9461);
/* harmony import */ var next_dist_server_future_route_modules_app_page_module__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_page_module__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(119);
/* harmony import */ var next_dist_client_components_error_boundary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6783);
/* harmony import */ var next_dist_client_components_error_boundary__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_client_components_error_boundary__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7183);
/* harmony import */ var next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__) if(["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
// @ts-ignore this need to be imported from next/dist to be external


const AppPageRouteModule = next_dist_server_future_route_modules_app_page_module__WEBPACK_IMPORTED_MODULE_0__.AppPageRouteModule;
// We inject the tree and pages here so that we can use them in the route
// module.
const tree = {
        children: [
        '',
        {
        children: ['__PAGE__', {}, {
          page: [() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 4807)), "/Users/luanfernandes/nib/estatiistica/apps/web/app/page.tsx"],
          metadata: {
    icon: [],
    apple: [],
    openGraph: [],
    twitter: [],
    manifest: "/manifest.webmanifest"
  }
        }]
      },
        {
        'layout': [() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 2505)), "/Users/luanfernandes/nib/estatiistica/apps/web/app/layout.tsx"],
'not-found': [() => Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 3850, 23)), "next/dist/client/components/not-found-error"],
        metadata: {
    icon: [],
    apple: [],
    openGraph: [],
    twitter: [],
    manifest: "/manifest.webmanifest"
  }
      }
      ]
      }.children;
const pages = ["/Users/luanfernandes/nib/estatiistica/apps/web/app/page.tsx"];

// @ts-expect-error - replaced by webpack/turbopack loader

const __next_app_require__ = __webpack_require__
const __next_app_load_chunk__ = () => Promise.resolve()
const originalPathname = "/page";
const __next_app__ = {
    require: __next_app_require__,
    loadChunk: __next_app_load_chunk__
};

// Create and export the route module that will be consumed.
const routeModule = new AppPageRouteModule({
    definition: {
        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_PAGE,
        page: "/page",
        pathname: "/",
        // The following aren't used in production.
        bundlePath: "",
        filename: "",
        appPaths: []
    },
    userland: {
        loaderTree: tree
    }
});

//# sourceMappingURL=app-page.js.map

/***/ }),

/***/ 9057:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 2746))

/***/ }),

/***/ 2746:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  AppShell: () => (/* binding */ AppShell)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(6786);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(8038);
// EXTERNAL MODULE: ../../node_modules/next/navigation.js
var navigation = __webpack_require__(4555);
;// CONCATENATED MODULE: ./src/features/auth/login-screen.tsx
/* __next_internal_client_entry_do_not_use__ LoginScreen auto */ 

function LoginScreen({ onLogin, error }) {
    const [login, setLogin] = (0,react_.useState)("");
    const [senha, setSenha] = (0,react_.useState)("");
    const [loading, setLoading] = (0,react_.useState)(false);
    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        try {
            await onLogin(login, senha);
        } finally{
            setLoading(false);
        }
    }
    return /*#__PURE__*/ jsx_runtime_.jsx("main", {
        className: "login-shell",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("section", {
            className: "login-card",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                    className: "eyebrow",
                    children: "V1 Operacional"
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                    children: "Acesso Local"
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                    className: "body-copy",
                    children: "O frontend comunica-se apenas com o backend local. A integracao com a NIB permanece encapsulada no servidor."
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("form", {
                    className: "form-stack",
                    onSubmit: handleSubmit,
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                            className: "field",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    children: "Login"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                    name: "login",
                                    type: "text",
                                    autoComplete: "username",
                                    value: login,
                                    onChange: (event)=>setLogin(event.target.value),
                                    required: true
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                            className: "field",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    children: "Senha"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                    name: "senha",
                                    type: "password",
                                    autoComplete: "current-password",
                                    value: senha,
                                    onChange: (event)=>setSenha(event.target.value),
                                    required: true
                                })
                            ]
                        }),
                        error ? /*#__PURE__*/ jsx_runtime_.jsx("p", {
                            className: "error-banner",
                            "aria-live": "polite",
                            children: error
                        }) : null,
                        /*#__PURE__*/ jsx_runtime_.jsx("button", {
                            type: "submit",
                            className: "primary-button",
                            disabled: loading,
                            children: loading ? "Entrando…" : "Entrar"
                        })
                    ]
                })
            ]
        })
    });
}

;// CONCATENATED MODULE: ./src/lib/api.ts
function getApiBaseUrl() {
    if (true) {
        return "http://localhost:3001/api";
    }
    return `${window.location.protocol}//${window.location.hostname}:3020/api`;
}
async function apiFetch(path, init) {
    const response = await fetch(`${getApiBaseUrl()}${path}`, {
        ...init,
        credentials: "include",
        headers: {
            "content-type": "application/json",
            ...init?.headers ?? {}
        }
    });
    if (!response.ok) {
        let errorMessage = "Falha na requisicao.";
        try {
            const payload = await response.json();
            errorMessage = payload.error?.message ?? payload.message ?? errorMessage;
        } catch  {
            errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
    }
    if (response.status === 204) {
        return null;
    }
    return await response.json();
}

;// CONCATENATED MODULE: ./src/lib/format.ts
function formatNumber(value) {
    return new Intl.NumberFormat("pt-BR").format(value);
}
function formatDate(value) {
    return new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        timeStyle: "short"
    }).format(new Date(value));
}
function formatDateOnly(value) {
    return new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        timeZone: "UTC"
    }).format(new Date(`${value}T00:00:00Z`));
}
function formatSessaoLabel(value) {
    return value ? `${value}º SENIB` : "Sem sessao";
}

;// CONCATENATED MODULE: ./src/features/configuracao/culto-configuracao-tab.tsx
/* __next_internal_client_entry_do_not_use__ CultoConfiguracaoTab auto */ 



function getTodayRef() {
    return new Date().toISOString().slice(0, 10);
}
function CultoConfiguracaoTab({ user }) {
    const [dataReferencia, setDataReferencia] = (0,react_.useState)(getTodayRef());
    const [datas, setDatas] = (0,react_.useState)([]);
    const [selectedDate, setSelectedDate] = (0,react_.useState)("");
    const [painel, setPainel] = (0,react_.useState)(null);
    const [error, setError] = (0,react_.useState)(null);
    async function loadDatas() {
        try {
            const payload = await apiFetch("/cultos/datas", {
                headers: {}
            });
            setDatas(payload.items);
            if (!selectedDate && payload.items[0]) {
                setSelectedDate(payload.items[0].data_referencia);
            }
            setError(null);
        } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : "Falha ao carregar datas de culto.");
        }
    }
    async function loadPainel(dateRef) {
        try {
            const params = new URLSearchParams();
            if (dateRef) {
                params.set("data_referencia", dateRef);
            }
            const payload = await apiFetch(params.size ? `/cultos/painel?${params.toString()}` : "/cultos/painel", {
                headers: {}
            });
            setPainel(payload);
        } catch  {
            setPainel(null);
        }
    }
    (0,react_.useEffect)(()=>{
        loadDatas();
    }, []);
    (0,react_.useEffect)(()=>{
        if (selectedDate) {
            loadPainel(selectedDate);
        }
    }, [
        selectedDate
    ]);
    return /*#__PURE__*/ jsx_runtime_.jsx("section", {
        className: "layout-grid",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
            className: "panel-card span-full",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("header", {
                    className: "section-header",
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                className: "eyebrow",
                                children: "Configura\xe7\xe3o do Culto"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                                children: "Preparar Cultos por Data"
                            })
                        ]
                    })
                }),
                error ? /*#__PURE__*/ jsx_runtime_.jsx("p", {
                    className: "error-banner",
                    "aria-live": "polite",
                    children: error
                }) : null,
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "config-workspace",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("section", {
                            className: "import-toolbar-card",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "config-intro",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                            children: "Prepara\xe7\xe3o manual"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            children: "Gere a estrutura do dia com `1\xba culto` e `2\xba culto`. O painel operacional far\xe1 a contagem total de cada um."
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "action-row",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                                            className: "field compact-field",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                    children: "Data do culto"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                    className: "input",
                                                    type: "date",
                                                    value: dataReferencia,
                                                    onChange: (event)=>setDataReferencia(event.target.value)
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                            type: "button",
                                            className: "primary-button",
                                            onClick: async ()=>{
                                                await apiFetch("/cultos/preparar", {
                                                    method: "POST",
                                                    body: JSON.stringify({
                                                        data_referencia: dataReferencia
                                                    })
                                                });
                                                await loadDatas();
                                                setSelectedDate(dataReferencia);
                                                await loadPainel(dataReferencia);
                                            },
                                            children: "Preparar data de culto"
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("section", {
                            className: "stack-section",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("header", {
                                    className: "section-header",
                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                className: "eyebrow",
                                                children: "Cat\xe1logo Local"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                                                children: "Datas Preparadas"
                                            })
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "selection-list-shell",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("ul", {
                                        className: "selection-list",
                                        children: datas.map((item)=>/*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                                                    type: "button",
                                                    className: "selection-button",
                                                    onClick: ()=>setSelectedDate(item.data_referencia),
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                            children: formatDateOnly(item.data_referencia)
                                                        }),
                                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                                            children: [
                                                                formatNumber(item.total_geral),
                                                                " presentes \xb7 ",
                                                                item.status
                                                            ]
                                                        })
                                                    ]
                                                })
                                            }, item.data_referencia))
                                    })
                                })
                            ]
                        }),
                        painel?.cultos.length ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("section", {
                            className: "panel-card panel-card-nested span-full",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("header", {
                                    className: "section-header",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                    className: "eyebrow",
                                                    children: "Data Selecionada"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                                                    children: painel.data_atual ? formatDateOnly(painel.data_atual) : "Sem data"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                            className: "status-live",
                                            children: [
                                                formatNumber(painel.total_geral),
                                                " presentes no total do dia"
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "culto-counter-grid",
                                    children: painel.cultos.map((culto)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
                                            className: "inline-card",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                    children: culto.nome
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                                    children: [
                                                        "Total atual: ",
                                                        formatNumber(culto.total)
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                                    children: [
                                                        "Status: ",
                                                        culto.status
                                                    ]
                                                })
                                            ]
                                        }, culto.id))
                                })
                            ]
                        }) : null
                    ]
                })
            ]
        })
    });
}

;// CONCATENATED MODULE: ./src/features/configuracao/nova-teens-configuracao-tab.tsx
/* __next_internal_client_entry_do_not_use__ NovaTeensConfiguracaoTab auto */ 



function nova_teens_configuracao_tab_getTodayRef() {
    return new Date().toISOString().slice(0, 10);
}
function NovaTeensConfiguracaoTab({ user }) {
    const [dataReferencia, setDataReferencia] = (0,react_.useState)(nova_teens_configuracao_tab_getTodayRef());
    const [datas, setDatas] = (0,react_.useState)([]);
    const [selectedDate, setSelectedDate] = (0,react_.useState)("");
    const [painel, setPainel] = (0,react_.useState)(null);
    const [error, setError] = (0,react_.useState)(null);
    async function loadDatas() {
        try {
            const payload = await apiFetch("/nova-teens/datas", {
                headers: {}
            });
            setDatas(payload.items);
            if (!selectedDate && payload.items[0]) {
                setSelectedDate(payload.items[0].data_referencia);
            }
            setError(null);
        } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : "Falha ao carregar datas de Nova Teens.");
        }
    }
    async function loadPainel(dateRef) {
        try {
            const params = new URLSearchParams();
            if (dateRef) {
                params.set("data_referencia", dateRef);
            }
            const payload = await apiFetch(params.size ? `/nova-teens/painel?${params.toString()}` : "/nova-teens/painel", {
                headers: {}
            });
            setPainel(payload);
        } catch  {
            setPainel(null);
        }
    }
    (0,react_.useEffect)(()=>{
        loadDatas();
    }, []);
    (0,react_.useEffect)(()=>{
        if (selectedDate) {
            loadPainel(selectedDate);
        }
    }, [
        selectedDate
    ]);
    return /*#__PURE__*/ jsx_runtime_.jsx("section", {
        className: "layout-grid",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
            className: "panel-card span-full",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("header", {
                    className: "section-header",
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                className: "eyebrow",
                                children: "Configura\xe7\xe3o do Nova Teens"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                                children: "Preparar Encontros por Data"
                            })
                        ]
                    })
                }),
                error ? /*#__PURE__*/ jsx_runtime_.jsx("p", {
                    className: "error-banner",
                    "aria-live": "polite",
                    children: error
                }) : null,
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "config-workspace",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("section", {
                            className: "import-toolbar-card",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "config-intro",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                            children: "Prepara\xe7\xe3o manual"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            children: "Gere a estrutura do dia com `1\xba Nova Teens` e `2\xba Nova Teens`. O painel operacional far\xe1 a contagem de teens e l\xedderes em cada encontro."
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "action-row",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                                            className: "field compact-field",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                    children: "Data do encontro"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                    className: "input",
                                                    type: "date",
                                                    value: dataReferencia,
                                                    onChange: (event)=>setDataReferencia(event.target.value)
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                            type: "button",
                                            className: "primary-button",
                                            onClick: async ()=>{
                                                await apiFetch("/nova-teens/preparar", {
                                                    method: "POST",
                                                    body: JSON.stringify({
                                                        data_referencia: dataReferencia
                                                    })
                                                });
                                                await loadDatas();
                                                setSelectedDate(dataReferencia);
                                                await loadPainel(dataReferencia);
                                            },
                                            children: "Preparar data de Nova Teens"
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("section", {
                            className: "stack-section",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("header", {
                                    className: "section-header",
                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                className: "eyebrow",
                                                children: "Cat\xe1logo Local"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                                                children: "Datas Preparadas"
                                            })
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "selection-list-shell",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("ul", {
                                        className: "selection-list",
                                        children: datas.map((item)=>/*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                                                    type: "button",
                                                    className: "selection-button",
                                                    onClick: ()=>setSelectedDate(item.data_referencia),
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                            children: formatDateOnly(item.data_referencia)
                                                        }),
                                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                                            children: [
                                                                formatNumber(item.total_geral),
                                                                " presentes \xb7 ",
                                                                item.status
                                                            ]
                                                        })
                                                    ]
                                                })
                                            }, item.data_referencia))
                                    })
                                })
                            ]
                        }),
                        painel?.encontros.length ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("section", {
                            className: "panel-card panel-card-nested span-full",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("header", {
                                    className: "section-header",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                    className: "eyebrow",
                                                    children: "Data Selecionada"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                                                    children: painel.data_atual ? formatDateOnly(painel.data_atual) : "Sem data"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                            className: "status-live",
                                            children: [
                                                formatNumber(painel.total_geral),
                                                " presentes no total do dia"
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "culto-counter-grid",
                                    children: painel.encontros.map((encontro)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
                                            className: "inline-card",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                    children: encontro.nome
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                                    children: [
                                                        "Teens: ",
                                                        formatNumber(encontro.teens)
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                                    children: [
                                                        "L\xedderes: ",
                                                        formatNumber(encontro.lideres)
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                                    children: [
                                                        "Total atual: ",
                                                        formatNumber(encontro.total)
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                                    children: [
                                                        "Status: ",
                                                        encontro.status
                                                    ]
                                                })
                                            ]
                                        }, encontro.id))
                                })
                            ]
                        }) : null
                    ]
                })
            ]
        })
    });
}

;// CONCATENATED MODULE: ./src/features/configuracao/configuracao-tab.tsx
/* __next_internal_client_entry_do_not_use__ ConfiguracaoTab auto */ 





function ConfiguracaoTab({ user, operation }) {
    if (operation === "culto") {
        return /*#__PURE__*/ jsx_runtime_.jsx(CultoConfiguracaoTab, {
            user: user
        });
    }
    if (operation === "nova_teens") {
        return /*#__PURE__*/ jsx_runtime_.jsx(NovaTeensConfiguracaoTab, {
            user: user
        });
    }
    const [rodadas, setRodadas] = (0,react_.useState)([]);
    const [selectedRodada, setSelectedRodada] = (0,react_.useState)(null);
    const [importacoesRecentes, setImportacoesRecentes] = (0,react_.useState)([]);
    const [importacao, setImportacao] = (0,react_.useState)(null);
    const [nibDiagnostico, setNibDiagnostico] = (0,react_.useState)(null);
    const [error, setError] = (0,react_.useState)(null);
    const [manualDraft, setManualDraft] = (0,react_.useState)({
        referencia: "",
        salas: []
    });
    const [salaDraft, setSalaDraft] = (0,react_.useState)({
        codigo: "",
        nome: "",
        local: "",
        sessao_senib: 1,
        materia: "",
        professores: ""
    });
    const [selectedImportRodada, setSelectedImportRodada] = (0,react_.useState)(null);
    const [selectedImportAulas, setSelectedImportAulas] = (0,react_.useState)([]);
    const [manualNibRodadaId, setManualNibRodadaId] = (0,react_.useState)("");
    const [configTab, setConfigTab] = (0,react_.useState)("importar");
    const rodadaOptions = [
        ...new Set(rodadas.map((rodada)=>rodada.referencia).filter(Boolean))
    ];
    const canManageRodadas = user.roles.some((role)=>[
            "admin",
            "estatistica"
        ].includes(role));
    function openImportConfigurator(rodada) {
        setSelectedImportRodada(rodada);
        setSelectedImportAulas(rodada.available_aulas);
    }
    function buildManualSalaCodigo(value) {
        const normalized = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9\s-]/g, " ").trim().replace(/\s+/g, " ").toUpperCase();
        return normalized || "SALA";
    }
    async function loadRodadasAndLogs() {
        if (!canManageRodadas) {
            return;
        }
        try {
            const [rodadasPayload, importacoesPayload] = await Promise.all([
                apiFetch("/rodadas", {
                    headers: {}
                }),
                apiFetch("/importacoes/recentes", {
                    headers: {}
                })
            ]);
            setRodadas(rodadasPayload.items);
            setImportacoesRecentes(importacoesPayload.items);
        } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : "Falha ao carregar catalogo de rodadas.");
        }
    }
    async function importSelectedRodada() {
        if (!selectedImportRodada) {
            return;
        }
        await apiFetch("/importacoes/nib/rodadas", {
            method: "POST",
            body: JSON.stringify({
                external_id: selectedImportRodada.external_id,
                nib_rodada_id: selectedImportRodada.nib_rodada_id,
                selected_aulas: selectedImportAulas
            })
        });
        setImportacao(null);
        setSelectedImportRodada(null);
        setSelectedImportAulas([]);
        await loadRodadasAndLogs();
    }
    (0,react_.useEffect)(()=>{
        loadRodadasAndLogs();
    }, [
        canManageRodadas
    ]);
    if (!canManageRodadas) {
        return /*#__PURE__*/ jsx_runtime_.jsx("section", {
            className: "layout-grid",
            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
                className: "panel-card span-full",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("header", {
                        className: "section-header",
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                    className: "eyebrow",
                                    children: "Configura\xe7\xe3o da Rodada"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                                    children: "Acesso Restrito"
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                        className: "body-copy",
                        children: "Apenas usuarios com perfil `admin` ou `estatistica` podem importar, ativar ou cadastrar rodadas."
                    })
                ]
            })
        });
    }
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("section", {
        className: "layout-grid",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
                className: "panel-card span-full",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("header", {
                        className: "section-header",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                        className: "eyebrow",
                                        children: "Configura\xe7\xe3o da Rodada"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                                        children: "Preparar Importa\xe7\xe3o e Cadastro"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "config-tab-switch",
                                role: "tablist",
                                "aria-label": "Fluxos de configuracao",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                        type: "button",
                                        className: configTab === "importar" ? "tab-active" : "tab-button",
                                        onClick: ()=>setConfigTab("importar"),
                                        children: "Importar SENIB"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                        type: "button",
                                        className: configTab === "manual" ? "tab-active" : "tab-button",
                                        onClick: ()=>setConfigTab("manual"),
                                        children: "Cadastro manual"
                                    })
                                ]
                            })
                        ]
                    }),
                    error ? /*#__PURE__*/ jsx_runtime_.jsx("p", {
                        className: "error-banner",
                        "aria-live": "polite",
                        children: error
                    }) : null,
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "config-workspace",
                        children: configTab === "importar" ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "import-panel-stack",
                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "import-toolbar-card",
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: "config-intro",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                        children: "Importa\xe7\xe3o estruturada"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                        children: "Busque uma rodada da NIB, confira mat\xe9rias e aulas e atualize a rodada local sem misturar sess\xf5es no painel operacional."
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: "action-row",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                        type: "button",
                                                        className: "primary-button",
                                                        onClick: async ()=>{
                                                            try {
                                                                const payload = await apiFetch("/importacoes/nib/rodadas-disponiveis", {
                                                                    headers: {}
                                                                });
                                                                setImportacao({
                                                                    tipo: "selecao_necessaria",
                                                                    rodadas: payload.rodadas
                                                                });
                                                                setError(null);
                                                            } catch (requestError) {
                                                                setError(requestError instanceof Error ? requestError.message : "Falha ao listar rodadas elegiveis.");
                                                            }
                                                        },
                                                        children: "Buscar Rodadas Dispon\xedveis"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                        type: "button",
                                                        className: "secondary-button",
                                                        onClick: async ()=>{
                                                            try {
                                                                const payload = await apiFetch("/importacoes/nib/diagnostico", {
                                                                    headers: {}
                                                                });
                                                                setNibDiagnostico(payload);
                                                                setError(null);
                                                            } catch (requestError) {
                                                                setError(requestError instanceof Error ? requestError.message : "Falha ao consultar diagnostico da NIB.");
                                                            }
                                                        },
                                                        children: "Ver Diagn\xf3stico"
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: "import-manual-row",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                        className: "input",
                                                        type: "number",
                                                        min: "1",
                                                        placeholder: "Buscar rodada por ID interno da NIB",
                                                        value: manualNibRodadaId,
                                                        onChange: (event)=>setManualNibRodadaId(event.target.value)
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                        type: "button",
                                                        className: "secondary-button",
                                                        onClick: async ()=>{
                                                            try {
                                                                const rodadaId = Number(manualNibRodadaId);
                                                                if (!rodadaId) {
                                                                    throw new Error("Informe um id_rodada v\xe1lido.");
                                                                }
                                                                const payload = await apiFetch(`/importacoes/nib/rodadas/${rodadaId}`, {
                                                                    headers: {}
                                                                });
                                                                if (!payload.rodada) {
                                                                    throw new Error("Nenhuma mat\xe9ria retornada para esse id_rodada.");
                                                                }
                                                                openImportConfigurator({
                                                                    ...payload.rodada,
                                                                    nib_rodada_id: rodadaId
                                                                });
                                                                setError(null);
                                                            } catch (requestError) {
                                                                setError(requestError instanceof Error ? requestError.message : "Falha ao consultar rodada da NIB por ID.");
                                                            }
                                                        },
                                                        children: "Buscar por ID"
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                }),
                                nibDiagnostico ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "stack-section",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: "inline-card",
                                            children: [
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("strong", {
                                                    children: [
                                                        "Fonte principal atual:",
                                                        " ",
                                                        nibDiagnostico.melhor_fonte_importacao ?? "nenhuma dispon\xedvel"
                                                    ]
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                    children: nibDiagnostico.rodada_em_andamento ? `${nibDiagnostico.rodada_em_andamento.referencia} · ${nibDiagnostico.rodada_em_andamento.sessoes_senib.map(formatSessaoLabel).join(", ")} · ${formatNumber(nibDiagnostico.rodada_em_andamento.total_materias)} matérias` : "Nenhuma rodada em andamento detectada."
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: "stack-grid",
                                            children: nibDiagnostico.fontes.map((fonte)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
                                                    className: "inline-card",
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                            children: fonte.fonte
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                            children: fonte.endpoint
                                                        }),
                                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                                            children: [
                                                                fonte.disponivel ? "Dispon\xedvel" : "Sem dados",
                                                                " \xb7",
                                                                " ",
                                                                formatNumber(fonte.total_itens),
                                                                " itens"
                                                            ]
                                                        }),
                                                        fonte.sessoes_senib.length > 0 ? /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                            children: fonte.sessoes_senib.map(formatSessaoLabel).join(", ")
                                                        }) : null,
                                                        fonte.referencias.length > 0 ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                                            children: [
                                                                "Refs: ",
                                                                fonte.referencias.join(", ")
                                                            ]
                                                        }) : null,
                                                        fonte.observacao ? /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                            children: fonte.observacao
                                                        }) : null
                                                    ]
                                                }, fonte.fonte))
                                        })
                                    ]
                                }) : null,
                                importacao?.tipo === "importacao_direta" ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "inline-card",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                            children: [
                                                importacao.rodada.referencia,
                                                " \xb7",
                                                " ",
                                                importacao.rodada.sessoes_senib.map(formatSessaoLabel).join(", "),
                                                " \xb7",
                                                " ",
                                                formatNumber(importacao.rodada.total_materias),
                                                " mat\xe9rias"
                                            ]
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                            type: "button",
                                            className: "secondary-button",
                                            onClick: ()=>openImportConfigurator(importacao.rodada),
                                            children: "Configurar importa\xe7\xe3o"
                                        })
                                    ]
                                }) : null,
                                importacao?.tipo === "selecao_necessaria" ? /*#__PURE__*/ jsx_runtime_.jsx("section", {
                                    className: "import-config-card",
                                    "aria-labelledby": "select-import-title",
                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "dialog-shell",
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: "config-intro",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                        id: "select-import-title",
                                                        children: "Selecione a rodada para importar"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                        children: "Escolha a rodada desejada para carregar mat\xe9rias e aulas sem sair do fluxo desta tela."
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("ul", {
                                                className: "selection-list",
                                                children: importacao.rodadas.map((rodada)=>/*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                                                            type: "button",
                                                            className: "selection-button",
                                                            onClick: async ()=>{
                                                                try {
                                                                    const payload = rodada.nib_rodada_id ? await apiFetch(`/importacoes/nib/rodadas/${rodada.nib_rodada_id}`, {
                                                                        headers: {}
                                                                    }) : await apiFetch(`/importacoes/nib/rodada-detalhe?referencia=${encodeURIComponent(rodada.referencia)}`, {
                                                                        headers: {}
                                                                    });
                                                                    if (!payload.rodada) {
                                                                        throw new Error("Nenhuma mat\xe9ria retornada para a rodada selecionada.");
                                                                    }
                                                                    openImportConfigurator({
                                                                        ...payload.rodada,
                                                                        nib_rodada_id: payload.rodada.nib_rodada_id ?? rodada.nib_rodada_id
                                                                    });
                                                                    setImportacao(null);
                                                                    setError(null);
                                                                } catch (requestError) {
                                                                    setError(requestError instanceof Error ? requestError.message : "Falha ao carregar mat\xe9rias da rodada.");
                                                                }
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                                    children: rodada.referencia
                                                                }),
                                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                                                    children: [
                                                                        rodada.sessoes_senib.length > 0 ? `${rodada.sessoes_senib.map(formatSessaoLabel).join(", ")} · ` : "",
                                                                        rodada.total_materias > 0 ? `${formatNumber(rodada.total_materias)} matérias` : "Carregar mat\xe9rias e aulas"
                                                                    ]
                                                                })
                                                            ]
                                                        })
                                                    }, rodada.external_id))
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: "action-row",
                                                children: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                    type: "button",
                                                    className: "secondary-button",
                                                    onClick: ()=>setImportacao(null),
                                                    children: "Cancelar sele\xe7\xe3o"
                                                })
                                            })
                                        ]
                                    })
                                }) : null,
                                selectedImportRodada ? /*#__PURE__*/ jsx_runtime_.jsx("section", {
                                    className: "import-config-card",
                                    "aria-labelledby": "import-dialog-title",
                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "dialog-shell",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                                id: "import-dialog-title",
                                                children: "Configurar importa\xe7\xe3o da rodada"
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: "inline-card",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                        children: selectedImportRodada.referencia
                                                    }),
                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                                        children: [
                                                            selectedImportRodada.sessoes_senib.map(formatSessaoLabel).join(", "),
                                                            " \xb7",
                                                            " ",
                                                            formatNumber(selectedImportRodada.total_materias),
                                                            " mat\xe9rias"
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                        children: "Sempre importa todas as mat\xe9rias da rodada. Selecione abaixo apenas as aulas que devem ser gravadas."
                                                    })
                                                ]
                                            }),
                                            selectedImportRodada.available_aulas.length > 0 ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("fieldset", {
                                                className: "checkbox-group",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("legend", {
                                                        children: "Aulas para importar"
                                                    }),
                                                    selectedImportRodada.available_aulas.map((aula)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                                                            className: "checkbox-item",
                                                            children: [
                                                                /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                                    type: "checkbox",
                                                                    checked: selectedImportAulas.includes(aula),
                                                                    onChange: (event)=>setSelectedImportAulas((current)=>event.target.checked ? [
                                                                                ...current,
                                                                                aula
                                                                            ] : current.filter((item)=>item !== aula))
                                                                }),
                                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                    children: aula
                                                                })
                                                            ]
                                                        }, aula))
                                                ]
                                            }) : /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                className: "body-copy",
                                                children: "Essa rodada n\xe3o trouxe aulas detalhadas na NIB."
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: "action-row",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                        type: "button",
                                                        className: "primary-button",
                                                        onClick: importSelectedRodada,
                                                        children: "Importar e Atualizar Rodada"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                        type: "button",
                                                        className: "secondary-button",
                                                        onClick: ()=>{
                                                            setSelectedImportRodada(null);
                                                            setSelectedImportAulas([]);
                                                        },
                                                        children: "Cancelar"
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                }) : null
                            ]
                        }) : /*#__PURE__*/ jsx_runtime_.jsx("form", {
                            className: "form-stack config-workspace",
                            onSubmit: async (event)=>{
                                event.preventDefault();
                                await apiFetch("/rodadas/manual", {
                                    method: "POST",
                                    body: JSON.stringify({
                                        referencia: manualDraft.referencia,
                                        salas: manualDraft.salas.map((sala)=>({
                                                codigo: sala.codigo || buildManualSalaCodigo(sala.nome),
                                                nome: sala.nome,
                                                local: sala.local,
                                                sessao_senib: sala.sessao_senib,
                                                materias: [
                                                    {
                                                        materia: sala.materia,
                                                        professores: sala.professores.split(",").map((item)=>item.trim()).filter(Boolean)
                                                    }
                                                ]
                                            }))
                                    })
                                });
                                setManualDraft({
                                    referencia: "",
                                    salas: []
                                });
                                await loadRodadasAndLogs();
                            },
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "import-toolbar-card",
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "config-intro",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                children: "Cadastro de conting\xeancia"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                children: "Use esse fluxo apenas quando precisar criar uma rodada local sem depender da integra\xe7\xe3o da NIB."
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "form-grid",
                                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                                            className: "field",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                    children: "Rodada"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                    list: "manual-rodada-options",
                                                    name: "referencia",
                                                    value: manualDraft.referencia,
                                                    onChange: (event)=>setManualDraft((current)=>({
                                                                ...current,
                                                                referencia: event.target.value
                                                            })),
                                                    placeholder: "Selecione uma rodada existente ou digite uma nova",
                                                    required: true
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("datalist", {
                                                    id: "manual-rodada-options",
                                                    children: rodadaOptions.map((referencia)=>/*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                            value: referencia
                                                        }, referencia))
                                                })
                                            ]
                                        })
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "form-grid form-grid-manual",
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                                                className: "field",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                        children: "C\xf3digo da sala"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                        value: salaDraft.codigo,
                                                        onChange: (event)=>setSalaDraft((current)=>({
                                                                    ...current,
                                                                    codigo: event.target.value
                                                                })),
                                                        placeholder: "Opcional. Se vazio, usamos o nome da sala."
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                                                className: "field",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                        children: "Nome da Sala"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                        value: salaDraft.nome,
                                                        onChange: (event)=>setSalaDraft((current)=>({
                                                                    ...current,
                                                                    nome: event.target.value
                                                                }))
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                                                className: "field",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                        children: "Local"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                        value: salaDraft.local,
                                                        onChange: (event)=>setSalaDraft((current)=>({
                                                                    ...current,
                                                                    local: event.target.value
                                                                }))
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                                                className: "field",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                        children: "Sess\xe3o SENIB"
                                                    }),
                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("select", {
                                                        value: salaDraft.sessao_senib,
                                                        onChange: (event)=>setSalaDraft((current)=>({
                                                                    ...current,
                                                                    sessao_senib: Number(event.target.value)
                                                                })),
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                                value: 1,
                                                                children: "1\xba SENIB"
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                                value: 2,
                                                                children: "2\xba SENIB"
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                                value: 3,
                                                                children: "3\xba SENIB"
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                                                className: "field",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                        children: "Mat\xe9ria"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                        value: salaDraft.materia,
                                                        onChange: (event)=>setSalaDraft((current)=>({
                                                                    ...current,
                                                                    materia: event.target.value
                                                                }))
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                                                className: "field",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                        children: "Professores"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                        value: salaDraft.professores,
                                                        onChange: (event)=>setSalaDraft((current)=>({
                                                                    ...current,
                                                                    professores: event.target.value
                                                                }))
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                        type: "button",
                                        className: "secondary-button",
                                        onClick: ()=>{
                                            if (!salaDraft.nome || !salaDraft.materia) {
                                                setError("Informe o nome da sala e a mat\xe9ria antes de adicionar.");
                                                return;
                                            }
                                            setManualDraft((current)=>({
                                                    ...current,
                                                    salas: [
                                                        ...current.salas,
                                                        salaDraft
                                                    ]
                                                }));
                                            setSalaDraft({
                                                codigo: "",
                                                nome: "",
                                                local: "",
                                                sessao_senib: 1,
                                                materia: "",
                                                professores: ""
                                            });
                                            setError(null);
                                        },
                                        children: "Adicionar Sala"
                                    }),
                                    manualDraft.salas.length > 0 ? /*#__PURE__*/ jsx_runtime_.jsx("ul", {
                                        className: "draft-list",
                                        children: manualDraft.salas.map((sala, index)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("li", {
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                        children: sala.codigo || buildManualSalaCodigo(sala.nome)
                                                    }),
                                                    " ",
                                                    sala.nome,
                                                    " \xb7",
                                                    " ",
                                                    formatSessaoLabel(sala.sessao_senib),
                                                    " \xb7 ",
                                                    sala.materia
                                                ]
                                            }, `${sala.codigo || sala.nome}-${index}`))
                                    }) : null,
                                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                        type: "submit",
                                        className: "primary-button",
                                        disabled: manualDraft.salas.length === 0,
                                        children: "Criar Rodada Manual"
                                    })
                                ]
                            })
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
                className: "panel-card span-full",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("header", {
                        className: "section-header",
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                    className: "eyebrow",
                                    children: "Catalogo Local"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                                    children: "Rodadas Dispon\xedveis"
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "rodadas-grid",
                        children: rodadas.map((rodada)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("section", {
                                className: rodada.ativa ? "rodada-card rodada-card-active" : "rodada-card",
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "counter-head",
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                        children: rodada.referencia
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                        children: rodada.titulo ?? "Sem titulo"
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                className: rodada.ativa ? "status-ok" : "status-off",
                                                children: rodada.ativa ? "Ativa" : rodada.status
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "rodada-meta",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                children: rodada.sessoes_senib.map(formatSessaoLabel).join(", ")
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                children: rodada.origem
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                children: formatDate(rodada.created_at)
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "session-badges",
                                        children: rodada.sessoes_senib.map((sessao)=>/*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                className: "session-badge",
                                                children: formatSessaoLabel(sessao)
                                            }, sessao))
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "rodada-kpis",
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("small", {
                                                        children: "Salas"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                        children: formatNumber(rodada.total_salas)
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("small", {
                                                        children: "Mat\xe9rias"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                        children: formatNumber(rodada.total_materias)
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("small", {
                                                        children: "Total"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                        children: formatNumber(rodada.total_presenca)
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "action-row",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                type: "button",
                                                className: "secondary-button",
                                                onClick: async ()=>{
                                                    const payload = await apiFetch(`/rodadas/${rodada.id}`, {
                                                        headers: {}
                                                    });
                                                    setSelectedRodada(payload.rodada);
                                                },
                                                children: "Ver Detalhes"
                                            }),
                                            rodada.ativa ? /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                type: "button",
                                                className: "secondary-button",
                                                onClick: async ()=>{
                                                    await apiFetch(`/rodadas/${rodada.id}/encerrar`, {
                                                        method: "POST",
                                                        headers: {}
                                                    });
                                                    if (selectedRodada?.id === rodada.id) {
                                                        setSelectedRodada((current)=>current ? {
                                                                ...current,
                                                                ativa: false,
                                                                status: "encerrada"
                                                            } : current);
                                                    }
                                                    await loadRodadasAndLogs();
                                                },
                                                children: "Encerrar Rodada"
                                            }) : /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                type: "button",
                                                className: "primary-button",
                                                onClick: async ()=>{
                                                    await apiFetch(`/rodadas/${rodada.id}/ativar`, {
                                                        method: "POST",
                                                        headers: {}
                                                    });
                                                    await loadRodadasAndLogs();
                                                },
                                                children: "Ativar Rodada"
                                            })
                                        ]
                                    })
                                ]
                            }, rodada.id))
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
                className: "panel-card",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("header", {
                        className: "section-header",
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                    className: "eyebrow",
                                    children: "Rastreabilidade"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                                    children: "Importa\xe7\xf5es Recentes"
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("ul", {
                        className: "ordered-list",
                        children: importacoesRecentes.map((item)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("li", {
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "log-copy",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                children: item.fonte
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                children: item.external_reference ?? "sem refer\xeancia externa"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                        children: item.status
                                    })
                                ]
                            }, item.id))
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
                className: "panel-card",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("header", {
                        className: "section-header",
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                    className: "eyebrow",
                                    children: "Detalhamento"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                                    children: "Rodada Selecionada"
                                })
                            ]
                        })
                    }),
                    selectedRodada ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "detail-stack",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "inline-card",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                        children: selectedRodada.referencia
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                        children: [
                                            selectedRodada.origem,
                                            " \xb7",
                                            " ",
                                            selectedRodada.sessoes_senib.map(formatSessaoLabel).join(", "),
                                            " \xb7",
                                            " ",
                                            selectedRodada.ativa ? "ativa" : selectedRodada.status
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("ul", {
                                className: "rodada-detail-list",
                                children: selectedRodada.salas.map((sala)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("li", {
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: "counter-head",
                                                children: [
                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                                children: sala.nome
                                                            }),
                                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                                                children: [
                                                                    sala.codigo,
                                                                    " \xb7 ",
                                                                    formatSessaoLabel(sala.sessao_senib),
                                                                    " \xb7",
                                                                    " ",
                                                                    sala.local ?? "Sem local"
                                                                ]
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                        children: formatNumber(sala.contagem?.total ?? 0)
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: "materias-block",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                        className: "materias-title",
                                                        children: "Mat\xe9rias da Sala"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("ul", {
                                                        className: "materias-list",
                                                        children: sala.materias.map((materia)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("li", {
                                                                children: [
                                                                    /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                                        children: materia.materia
                                                                    }),
                                                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                        children: materia.professores.join(", ") || "Professor n\xe3o informado"
                                                                    })
                                                                ]
                                                            }, materia.id))
                                                    })
                                                ]
                                            })
                                        ]
                                    }, sala.id))
                            })
                        ]
                    }) : /*#__PURE__*/ jsx_runtime_.jsx("p", {
                        className: "body-copy",
                        children: "Selecione uma rodada no cat\xe1logo para inspecionar salas, mat\xe9rias e totalizadores."
                    })
                ]
            })
        ]
    });
}

;// CONCATENATED MODULE: ./src/features/dashboard/culto-dashboard-tab.tsx
/* __next_internal_client_entry_do_not_use__ CultoDashboardTab auto */ 



function buildSparklinePoints(values) {
    if (values.length === 0) {
        return "0,54 100,54";
    }
    const max = Math.max(...values, 1);
    return values.map((value, index)=>{
        const x = values.length === 1 ? 100 : index / (values.length - 1) * 100;
        const y = 54 - value / max * 34;
        return `${x},${y}`;
    }).join(" ");
}
function clampPercent(value) {
    return Math.max(0, Math.min(100, value));
}
function CultoDashboardTab() {
    const [payload, setPayload] = (0,react_.useState)(null);
    const [selectedDate, setSelectedDate] = (0,react_.useState)("");
    (0,react_.useEffect)(()=>{
        const params = new URLSearchParams();
        if (selectedDate) {
            params.set("data_referencia", selectedDate);
        }
        apiFetch(params.size ? `/cultos/dashboard?${params.toString()}` : "/cultos/dashboard", {
            headers: {}
        }).then((response)=>{
            setPayload(response);
            if (selectedDate && !response.datas_disponiveis.includes(selectedDate)) {
                setSelectedDate("");
            }
        });
    }, [
        selectedDate
    ]);
    const historico = payload?.historico ?? [];
    const totalsSeries = historico.length ? historico.slice(0, 8).map((item)=>item.total_geral).reverse() : [
        0
    ];
    const comparativo = payload?.comparativo_cultos ?? [];
    const ultimoTotal = payload?.ultima_leitura?.total_geral ?? 0;
    const mediaPorCulto = payload?.media_por_culto ?? 0;
    const mediaGeral = payload?.media_geral ?? 0;
    const pico = payload?.pico ?? 0;
    const maxBarValue = Math.max(...comparativo.map((item)=>item.media), 1);
    const latestDate = payload?.ultima_leitura?.data_referencia ?? null;
    const cards = [
        {
            key: "total",
            label: "\xdaltima leitura",
            value: ultimoTotal,
            caption: latestDate ? formatDateOnly(latestDate) : "Sem base",
            accent: "#b39cff",
            className: "dashboard-kpi-card-violet",
            series: totalsSeries
        },
        {
            key: "media-culto",
            label: "M\xe9dia por culto",
            value: Math.round(mediaPorCulto),
            caption: "M\xe9dia por slot operacional",
            accent: "#73e6ff",
            className: "dashboard-kpi-card-cyan",
            series: comparativo.map((item)=>Math.round(item.media))
        },
        {
            key: "media-geral",
            label: "M\xe9dia geral",
            value: Math.round(mediaGeral),
            caption: "M\xe9dia por data",
            accent: "#82efb3",
            className: "dashboard-kpi-card-emerald",
            series: totalsSeries
        },
        {
            key: "pico",
            label: "Pico",
            value: pico,
            caption: "Maior total em um dia",
            accent: "#c8b8ff",
            className: "dashboard-kpi-card-lilac",
            series: totalsSeries
        }
    ];
    return /*#__PURE__*/ jsx_runtime_.jsx("section", {
        className: "layout-grid",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
            className: "panel-card span-full dashboard-shell",
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("header", {
                    className: "dashboard-topline",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                    className: "eyebrow",
                                    children: "Indicadores Consolidados"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                                    children: "Dashboard Anal\xedtico de Culto"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "dashboard-toolbar",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    className: "dashboard-chip",
                                    children: "Opera\xe7\xe3o local"
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                                    className: "dashboard-select-field",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            children: "Data do culto"
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("select", {
                                            value: selectedDate,
                                            onChange: (event)=>setSelectedDate(event.target.value),
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                    value: "",
                                                    children: "Todas"
                                                }),
                                                (payload?.datas_disponiveis ?? []).map((item)=>/*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                        value: item,
                                                        children: formatDateOnly(item)
                                                    }, item))
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "dashboard-kpi-grid",
                    children: cards.map((card)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
                            className: `dashboard-kpi-card ${card.className}`,
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "dashboard-kpi-head",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            children: card.label
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("small", {
                                            children: card.caption
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                    children: formatNumber(card.value)
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("svg", {
                                    viewBox: "0 0 100 60",
                                    className: "dashboard-sparkline",
                                    "aria-hidden": "true",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("defs", {
                                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("linearGradient", {
                                                id: `culto-spark-${card.key}`,
                                                x1: "0",
                                                y1: "0",
                                                x2: "0",
                                                y2: "1",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("stop", {
                                                        offset: "0%",
                                                        stopColor: card.accent,
                                                        stopOpacity: "0.34"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("stop", {
                                                        offset: "100%",
                                                        stopColor: card.accent,
                                                        stopOpacity: "0"
                                                    })
                                                ]
                                            })
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("polygon", {
                                            points: `0,60 ${buildSparklinePoints(card.series)} 100,60`,
                                            fill: `url(#culto-spark-${card.key})`
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("polyline", {
                                            points: buildSparklinePoints(card.series),
                                            fill: "none",
                                            stroke: card.accent,
                                            strokeWidth: "2.4",
                                            strokeLinejoin: "round",
                                            strokeLinecap: "round"
                                        })
                                    ]
                                })
                            ]
                        }, card.key))
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "dashboard-analytics-grid",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
                            className: "dashboard-analytic-panel dashboard-analytic-panel-wide",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("header", {
                                    className: "dashboard-panel-head",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                                    children: "Comparativo entre Cultos"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                    children: "M\xe9dia consolidada entre 1\xba culto e 2\xba culto no recorte selecionado"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: "dashboard-pill-value",
                                            children: formatNumber(ultimoTotal)
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "dashboard-bar-chart dashboard-bar-chart-horizontal",
                                    children: comparativo.map((item)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: "dashboard-bar-line",
                                            children: [
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                    className: "dashboard-bar-line-head",
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                            children: item.nome
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                            children: formatNumber(Math.round(item.media))
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                    className: "dashboard-ranking-track",
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                        className: "dashboard-ranking-fill dashboard-ranking-fill-culto",
                                                        style: {
                                                            width: `${clampPercent(item.media / maxBarValue * 100)}%`
                                                        }
                                                    })
                                                })
                                            ]
                                        }, item.ordem))
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
                            className: "dashboard-analytic-panel",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("header", {
                                    className: "dashboard-panel-head",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                                    children: "Hist\xf3rico de Cultos"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                    children: selectedDate ? "Leitura consolidada da data filtrada" : "Evolu\xe7\xe3o de presen\xe7a por data"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: "dashboard-history-pills",
                                            children: [
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                                    className: "dashboard-chip",
                                                    children: [
                                                        "M\xe9dia ",
                                                        formatNumber(Math.round(mediaGeral))
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                                    className: "dashboard-chip dashboard-chip-strong",
                                                    children: [
                                                        "Pico ",
                                                        formatNumber(pico)
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                historico.length > 0 ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "dashboard-history-track",
                                    children: historico.slice(0, 8).map((item)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: "dashboard-history-node",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                    className: "dashboard-history-dot"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                    children: formatDateOnly(item.data_referencia)
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                                    children: [
                                                        formatNumber(item.total_geral),
                                                        " presentes"
                                                    ]
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("small", {
                                                    children: item.cultos.map((culto)=>`${culto.nome}: ${formatNumber(culto.total)}`).join(" \xb7 ")
                                                })
                                            ]
                                        }, item.data_referencia))
                                }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "dashboard-history-empty",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                            children: "Base de culto ainda vazia"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                            children: "Prepare a primeira data na configura\xe7\xe3o para liberar o hist\xf3rico local."
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
                            className: "dashboard-analytic-panel",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("header", {
                                    className: "dashboard-panel-head",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                                    children: "Ranking de Cultos"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                    children: latestDate ? formatDateOnly(latestDate) : "Sem data consolidada"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: "dashboard-chip",
                                            children: selectedDate ? "Data filtrada" : "Todas as datas"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("ul", {
                                    className: "dashboard-ranking-list",
                                    children: comparativo.map((item, index)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("li", {
                                            children: [
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                    className: "dashboard-ranking-copy",
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                            className: "dashboard-ranking-position",
                                                            children: index + 1
                                                        }),
                                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                            children: [
                                                                /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                                    children: item.nome
                                                                }),
                                                                /*#__PURE__*/ jsx_runtime_.jsx("small", {
                                                                    children: "M\xe9dia consolidada"
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                    className: "dashboard-ranking-track",
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                        className: "dashboard-ranking-fill dashboard-ranking-fill-culto",
                                                        style: {
                                                            width: `${clampPercent(item.media / maxBarValue * 100)}%`
                                                        }
                                                    })
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                    className: "dashboard-ranking-value",
                                                    children: formatNumber(Math.round(item.media))
                                                })
                                            ]
                                        }, item.ordem))
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
                            className: "dashboard-analytic-panel",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("header", {
                                    className: "dashboard-panel-head",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                                    children: "Leitura Atual por Culto"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                    children: latestDate ? formatDateOnly(latestDate) : "Sem leitura recente"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: "dashboard-chip",
                                            children: payload?.ultima_leitura ? formatNumber(payload.ultima_leitura.total_geral) : "0"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "culto-summary-grid",
                                    children: (payload?.ultima_leitura?.cultos ?? []).map((culto)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
                                            className: "inline-card",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                    children: culto.nome
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                                    children: [
                                                        formatNumber(culto.total),
                                                        " presentes"
                                                    ]
                                                })
                                            ]
                                        }, culto.ordem))
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    });
}

;// CONCATENATED MODULE: ./src/features/dashboard/nova-teens-dashboard-tab.tsx
/* __next_internal_client_entry_do_not_use__ NovaTeensDashboardTab auto */ 



function nova_teens_dashboard_tab_buildSparklinePoints(values) {
    if (values.length === 0) {
        return "0,54 100,54";
    }
    const max = Math.max(...values, 1);
    return values.map((value, index)=>{
        const x = values.length === 1 ? 100 : index / (values.length - 1) * 100;
        const y = 54 - value / max * 34;
        return `${x},${y}`;
    }).join(" ");
}
function nova_teens_dashboard_tab_clampPercent(value) {
    return Math.max(0, Math.min(100, value));
}
function NovaTeensDashboardTab() {
    const [payload, setPayload] = (0,react_.useState)(null);
    const [selectedDate, setSelectedDate] = (0,react_.useState)("");
    (0,react_.useEffect)(()=>{
        const params = new URLSearchParams();
        if (selectedDate) {
            params.set("data_referencia", selectedDate);
        }
        apiFetch(params.size ? `/nova-teens/dashboard?${params.toString()}` : "/nova-teens/dashboard", {
            headers: {}
        }).then((response)=>{
            setPayload(response);
            if (selectedDate && !response.datas_disponiveis.includes(selectedDate)) {
                setSelectedDate("");
            }
        });
    }, [
        selectedDate
    ]);
    const historico = payload?.historico ?? [];
    const totalsSeries = historico.length ? historico.slice(0, 8).map((item)=>item.total_geral).reverse() : [
        0
    ];
    const comparativo = payload?.comparativo_encontros ?? [];
    const ultimoTotal = payload?.ultima_leitura?.total_geral ?? 0;
    const mediaPorEncontro = payload?.media_por_encontro ?? 0;
    const mediaGeral = payload?.media_geral ?? 0;
    const pico = payload?.pico ?? 0;
    const maxBarValue = Math.max(...comparativo.map((item)=>item.media_total), 1);
    const latestDate = payload?.ultima_leitura?.data_referencia ?? null;
    const cards = [
        {
            key: "total",
            label: "\xdaltima leitura",
            value: ultimoTotal,
            caption: latestDate ? formatDateOnly(latestDate) : "Sem base",
            accent: "#b39cff",
            className: "dashboard-kpi-card-violet",
            series: totalsSeries
        },
        {
            key: "media-encontro",
            label: "M\xe9dia por encontro",
            value: Math.round(mediaPorEncontro),
            caption: "M\xe9dia por slot operacional",
            accent: "#73e6ff",
            className: "dashboard-kpi-card-cyan",
            series: comparativo.map((item)=>Math.round(item.media_total))
        },
        {
            key: "media-geral",
            label: "M\xe9dia geral",
            value: Math.round(mediaGeral),
            caption: "M\xe9dia por data",
            accent: "#82efb3",
            className: "dashboard-kpi-card-emerald",
            series: totalsSeries
        },
        {
            key: "pico",
            label: "Pico",
            value: pico,
            caption: "Maior total em um dia",
            accent: "#c8b8ff",
            className: "dashboard-kpi-card-lilac",
            series: totalsSeries
        }
    ];
    return /*#__PURE__*/ jsx_runtime_.jsx("section", {
        className: "layout-grid",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
            className: "panel-card span-full dashboard-shell",
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("header", {
                    className: "dashboard-topline",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                    className: "eyebrow",
                                    children: "Indicadores Consolidados"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                                    children: "Dashboard Anal\xedtico Nova Teens"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "dashboard-toolbar",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    className: "dashboard-chip",
                                    children: "Opera\xe7\xe3o local"
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                                    className: "dashboard-select-field",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            children: "Data do encontro"
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("select", {
                                            value: selectedDate,
                                            onChange: (event)=>setSelectedDate(event.target.value),
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                    value: "",
                                                    children: "Todas"
                                                }),
                                                (payload?.datas_disponiveis ?? []).map((item)=>/*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                        value: item,
                                                        children: formatDateOnly(item)
                                                    }, item))
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "dashboard-kpi-grid",
                    children: cards.map((card)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
                            className: `dashboard-kpi-card ${card.className}`,
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "dashboard-kpi-head",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            children: card.label
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("small", {
                                            children: card.caption
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                    children: formatNumber(card.value)
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("svg", {
                                    viewBox: "0 0 100 60",
                                    className: "dashboard-sparkline",
                                    "aria-hidden": "true",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("defs", {
                                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("linearGradient", {
                                                id: `nova-teens-spark-${card.key}`,
                                                x1: "0",
                                                y1: "0",
                                                x2: "0",
                                                y2: "1",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("stop", {
                                                        offset: "0%",
                                                        stopColor: card.accent,
                                                        stopOpacity: "0.34"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("stop", {
                                                        offset: "100%",
                                                        stopColor: card.accent,
                                                        stopOpacity: "0"
                                                    })
                                                ]
                                            })
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("polygon", {
                                            points: `0,60 ${nova_teens_dashboard_tab_buildSparklinePoints(card.series)} 100,60`,
                                            fill: `url(#nova-teens-spark-${card.key})`
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("polyline", {
                                            points: nova_teens_dashboard_tab_buildSparklinePoints(card.series),
                                            fill: "none",
                                            stroke: card.accent,
                                            strokeWidth: "2.4",
                                            strokeLinejoin: "round",
                                            strokeLinecap: "round"
                                        })
                                    ]
                                })
                            ]
                        }, card.key))
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "dashboard-analytics-grid",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
                            className: "dashboard-analytic-panel dashboard-analytic-panel-wide",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("header", {
                                    className: "dashboard-panel-head",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                                    children: "Comparativo entre Encontros"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                    children: "M\xe9dia consolidada entre 1\xba Nova Teens e 2\xba Nova Teens no recorte selecionado"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: "dashboard-pill-value",
                                            children: formatNumber(ultimoTotal)
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "dashboard-bar-chart dashboard-bar-chart-horizontal",
                                    children: comparativo.map((item)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: "dashboard-bar-line",
                                            children: [
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                    className: "dashboard-bar-line-head",
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                            children: item.nome
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                            children: formatNumber(Math.round(item.media_total))
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                    className: "dashboard-ranking-track",
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                        className: "dashboard-ranking-fill dashboard-ranking-fill-culto",
                                                        style: {
                                                            width: `${nova_teens_dashboard_tab_clampPercent(item.media_total / maxBarValue * 100)}%`
                                                        }
                                                    })
                                                })
                                            ]
                                        }, item.ordem))
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
                            className: "dashboard-analytic-panel",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("header", {
                                    className: "dashboard-panel-head",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                                    children: "Hist\xf3rico de Encontros"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                    children: selectedDate ? "Leitura consolidada da data filtrada" : "Evolu\xe7\xe3o de presen\xe7a por data"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: "dashboard-history-pills",
                                            children: [
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                                    className: "dashboard-chip",
                                                    children: [
                                                        "M\xe9dia ",
                                                        formatNumber(Math.round(mediaGeral))
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                                    className: "dashboard-chip dashboard-chip-strong",
                                                    children: [
                                                        "Pico ",
                                                        formatNumber(pico)
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                historico.length > 0 ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "dashboard-history-track",
                                    children: historico.slice(0, 8).map((item)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: "dashboard-history-node",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                    className: "dashboard-history-dot"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                    children: formatDateOnly(item.data_referencia)
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                                    children: [
                                                        formatNumber(item.total_geral),
                                                        " presentes"
                                                    ]
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("small", {
                                                    children: item.encontros.map((encontro)=>`${encontro.nome}: ${formatNumber(encontro.total)}`).join(" \xb7 ")
                                                })
                                            ]
                                        }, item.data_referencia))
                                }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "dashboard-history-empty",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                            children: "Base de Nova Teens ainda vazia"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                            children: "Prepare a primeira data na configura\xe7\xe3o para liberar o hist\xf3rico local."
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
                            className: "dashboard-analytic-panel",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("header", {
                                    className: "dashboard-panel-head",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                                    children: "Ranking de Encontros"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                    children: latestDate ? formatDateOnly(latestDate) : "Sem data consolidada"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: "dashboard-chip",
                                            children: selectedDate ? "Data filtrada" : "Todas as datas"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("ul", {
                                    className: "dashboard-ranking-list",
                                    children: comparativo.map((item, index)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("li", {
                                            children: [
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                    className: "dashboard-ranking-copy",
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                            className: "dashboard-ranking-position",
                                                            children: index + 1
                                                        }),
                                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                            children: [
                                                                /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                                    children: item.nome
                                                                }),
                                                                /*#__PURE__*/ jsx_runtime_.jsx("small", {
                                                                    children: "M\xe9dia consolidada"
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                    className: "dashboard-ranking-track",
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                        className: "dashboard-ranking-fill dashboard-ranking-fill-culto",
                                                        style: {
                                                            width: `${nova_teens_dashboard_tab_clampPercent(item.media_total / maxBarValue * 100)}%`
                                                        }
                                                    })
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                    className: "dashboard-ranking-value",
                                                    children: formatNumber(Math.round(item.media_total))
                                                })
                                            ]
                                        }, item.ordem))
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
                            className: "dashboard-analytic-panel",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("header", {
                                    className: "dashboard-panel-head",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                                    children: "Composi\xe7\xe3o por Encontro"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                    children: latestDate ? formatDateOnly(latestDate) : "Sem leitura recente"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: "dashboard-chip",
                                            children: payload?.ultima_leitura ? formatNumber(payload.ultima_leitura.total_geral) : "0"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "culto-summary-grid",
                                    children: (payload?.ultima_leitura?.encontros ?? []).map((encontro)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
                                            className: "inline-card",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                    children: encontro.nome
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                                    children: [
                                                        "Teens: ",
                                                        formatNumber(encontro.teens)
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                                    children: [
                                                        "L\xedderes: ",
                                                        formatNumber(encontro.lideres)
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                                    children: [
                                                        "Total: ",
                                                        formatNumber(encontro.total)
                                                    ]
                                                })
                                            ]
                                        }, encontro.ordem))
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    });
}

;// CONCATENATED MODULE: ./src/features/dashboard/dashboard-tab.tsx
/* __next_internal_client_entry_do_not_use__ DashboardTab auto */ 





const metricPalette = {
    total: {
        accent: "#b39cff",
        backgroundClass: "dashboard-kpi-card-violet"
    },
    alunos: {
        accent: "#73e6ff",
        backgroundClass: "dashboard-kpi-card-cyan"
    },
    verdinhos: {
        accent: "#82efb3",
        backgroundClass: "dashboard-kpi-card-emerald"
    },
    professor: {
        accent: "#c8b8ff",
        backgroundClass: "dashboard-kpi-card-lilac"
    }
};
function dashboard_tab_buildSparklinePoints(values) {
    if (values.length === 0) {
        return "0,54 100,54";
    }
    const max = Math.max(...values, 1);
    return values.map((value, index)=>{
        const x = values.length === 1 ? 100 : index / (values.length - 1) * 100;
        const y = 54 - value / max * 34;
        return `${x},${y}`;
    }).join(" ");
}
function dashboard_tab_clampPercent(value) {
    return Math.max(0, Math.min(100, value));
}
function formatDelta(value) {
    if (value === 0) {
        return "0%";
    }
    const prefix = value > 0 ? "+" : "";
    return `${prefix}${value.toFixed(1)}%`;
}
function buildCompositionGradient(entries) {
    const total = entries.reduce((sum, entry)=>sum + entry.value, 0);
    if (!total) {
        return "conic-gradient(#22304f 0 100%)";
    }
    let cursor = 0;
    const segments = entries.map((entry)=>{
        const start = cursor;
        cursor += entry.value / total * 100;
        return `${entry.color} ${start}% ${cursor}%`;
    });
    return `conic-gradient(${segments.join(", ")})`;
}
function DashboardTab({ operation }) {
    if (operation === "culto") {
        return /*#__PURE__*/ jsx_runtime_.jsx(CultoDashboardTab, {});
    }
    if (operation === "nova_teens") {
        return /*#__PURE__*/ jsx_runtime_.jsx(NovaTeensDashboardTab, {});
    }
    const [payload, setPayload] = (0,react_.useState)(null);
    const [rodadas, setRodadas] = (0,react_.useState)([]);
    const [sessaoSenib, setSessaoSenib] = (0,react_.useState)("2");
    const [rodadaId, setRodadaId] = (0,react_.useState)("");
    const [aulaRef, setAulaRef] = (0,react_.useState)("");
    function formatAulaLabel(value) {
        return value === "consolidado" ? "Consolidado" : value;
    }
    (0,react_.useEffect)(()=>{
        apiFetch("/rodadas", {
            headers: {}
        }).then((response)=>{
            setRodadas(response.items);
        });
    }, []);
    (0,react_.useEffect)(()=>{
        const params = new URLSearchParams();
        if (sessaoSenib) {
            params.set("sessao_senib", sessaoSenib);
        }
        if (rodadaId) {
            params.set("rodada_id", rodadaId);
        }
        if (aulaRef) {
            params.set("aula_ref", aulaRef);
        }
        apiFetch(params.size > 0 ? `/dashboard?${params.toString()}` : "/dashboard", {
            headers: {}
        }).then((response)=>{
            setPayload(response);
            if (aulaRef && !response.aulas_disponiveis.includes(aulaRef)) {
                setAulaRef("");
            }
        });
    }, [
        aulaRef,
        rodadaId,
        sessaoSenib
    ]);
    const historico = payload?.historico ?? [];
    const seriesBase = historico.length > 0 ? historico.slice(-8).map((item)=>item.total_presenca) : [
        0
    ];
    const composicao = payload?.composicao_presenca ?? {};
    const totalAtual = payload?.ultima_rodada?.total_presenca ?? 0;
    const mediaRodada = payload?.media_por_rodada ?? 0;
    const mediaGeral = payload?.media_geral ?? 0;
    const deltaMedia = mediaRodada ? (totalAtual - mediaRodada) / mediaRodada * 100 : 0;
    const totalAlunos = composicao.alunos ?? 0;
    const totalVerdinhos = composicao.verdinhos ?? 0;
    const totalProfessores = composicao.professor ?? 0;
    const totalAmarelinhos = composicao.amarelinhos ?? 0;
    const kpis = [
        {
            key: "total",
            label: "Total Geral",
            value: totalAtual,
            delta: deltaMedia,
            accent: metricPalette.total.accent,
            className: metricPalette.total.backgroundClass,
            series: seriesBase
        },
        {
            key: "alunos",
            label: "Alunos",
            value: totalAlunos,
            delta: totalAtual ? totalAlunos / totalAtual * 100 : 0,
            accent: metricPalette.alunos.accent,
            className: metricPalette.alunos.backgroundClass,
            series: seriesBase.map((value)=>Math.round(value * (totalAtual ? totalAlunos / totalAtual : 0)))
        },
        {
            key: "verdinhos",
            label: "Verdinhos",
            value: totalVerdinhos,
            delta: totalAtual ? totalVerdinhos / totalAtual * 100 : 0,
            accent: metricPalette.verdinhos.accent,
            className: metricPalette.verdinhos.backgroundClass,
            series: seriesBase.map((value)=>Math.round(value * (totalAtual ? totalVerdinhos / totalAtual : 0)))
        },
        {
            key: "professor",
            label: "Professores",
            value: totalProfessores,
            delta: totalAtual ? totalProfessores / totalAtual * 100 : 0,
            accent: metricPalette.professor.accent,
            className: metricPalette.professor.backgroundClass,
            series: seriesBase.map((value)=>Math.round(value * (totalAtual ? totalProfessores / totalAtual : 0)))
        }
    ];
    const chartBars = (payload?.ranking_materias ?? []).slice(0, 8);
    const maxBarValue = Math.max(...chartBars.map((item)=>item.media), 1);
    const compositionEntries = [
        {
            key: "alunos",
            label: "Alunos",
            value: totalAlunos,
            color: "#66d9ff"
        },
        {
            key: "verdinhos",
            label: "Verdinhos",
            value: totalVerdinhos,
            color: "#74dda3"
        },
        {
            key: "amarelinhos",
            label: "Amarelinhos",
            value: totalAmarelinhos,
            color: "#ffca49"
        },
        {
            key: "professor",
            label: "Professores",
            value: totalProfessores,
            color: "#a78bfa"
        }
    ];
    const donutStyle = {
        backgroundImage: buildCompositionGradient(compositionEntries)
    };
    const historicoRecente = historico.slice(-8);
    const rankingTop = (payload?.ranking_salas ?? []).slice(0, 5);
    const rankingMateriasTop = (payload?.ranking_materias ?? []).slice(0, 5);
    const leadingSala = rankingTop[0];
    const leadingMateria = rankingMateriasTop[0];
    const totalEquipes = totalVerdinhos + totalAmarelinhos + totalProfessores;
    return /*#__PURE__*/ jsx_runtime_.jsx("section", {
        className: "layout-grid",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
            className: "panel-card span-full dashboard-shell",
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("header", {
                    className: "dashboard-topline",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                    className: "eyebrow",
                                    children: "Indicadores Consolidados"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                                    children: "Dashboard Anal\xedtico SENIB"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "dashboard-toolbar",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    className: "dashboard-chip",
                                    children: "Hist\xf3rico local"
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                                    className: "dashboard-select-field",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            children: "Rodada"
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("select", {
                                            value: rodadaId,
                                            onChange: (event)=>{
                                                setRodadaId(event.target.value);
                                                setAulaRef("");
                                            },
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                    value: "",
                                                    children: "Todas as rodadas"
                                                }),
                                                rodadas.map((rodada)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("option", {
                                                        value: String(rodada.id),
                                                        children: [
                                                            rodada.referencia,
                                                            rodada.ativa ? " \xb7 ativa" : ""
                                                        ]
                                                    }, rodada.id))
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                                    className: "dashboard-select-field",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            children: "Data da aula"
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("select", {
                                            value: aulaRef,
                                            onChange: (event)=>setAulaRef(event.target.value),
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                    value: "",
                                                    children: "Todas"
                                                }),
                                                (payload?.aulas_disponiveis ?? []).map((item)=>/*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                        value: item,
                                                        children: formatAulaLabel(item)
                                                    }, item))
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "dashboard-session-switch",
                                    role: "tablist",
                                    "aria-label": "Sessoes SENIB do dashboard",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                            type: "button",
                                            className: sessaoSenib === "1" ? "tab-active" : "tab-button",
                                            onClick: ()=>{
                                                setSessaoSenib("1");
                                                setAulaRef("");
                                            },
                                            children: "1\xba SENIB"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                            type: "button",
                                            className: sessaoSenib === "2" ? "tab-active" : "tab-button",
                                            onClick: ()=>{
                                                setSessaoSenib("2");
                                                setAulaRef("");
                                            },
                                            children: "2\xba SENIB"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                            type: "button",
                                            className: sessaoSenib === "3" ? "tab-active" : "tab-button",
                                            onClick: ()=>{
                                                setSessaoSenib("3");
                                                setAulaRef("");
                                            },
                                            children: "3\xba SENIB"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                            type: "button",
                                            className: sessaoSenib === "" ? "tab-active" : "tab-button",
                                            onClick: ()=>{
                                                setSessaoSenib("");
                                                setAulaRef("");
                                            },
                                            children: "Juntas"
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "dashboard-kpi-grid",
                    children: kpis.map((card)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
                            className: `dashboard-kpi-card ${card.className}`,
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "dashboard-kpi-head",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            children: card.label
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("small", {
                                            children: "\xdaltima leitura"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                    children: formatNumber(card.value)
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("b", {
                                            children: formatDelta(card.delta)
                                        }),
                                        " vs media recente"
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("svg", {
                                    viewBox: "0 0 100 60",
                                    className: "dashboard-sparkline",
                                    "aria-hidden": "true",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("defs", {
                                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("linearGradient", {
                                                id: `spark-${card.key}`,
                                                x1: "0",
                                                y1: "0",
                                                x2: "0",
                                                y2: "1",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("stop", {
                                                        offset: "0%",
                                                        stopColor: card.accent,
                                                        stopOpacity: "0.34"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("stop", {
                                                        offset: "100%",
                                                        stopColor: card.accent,
                                                        stopOpacity: "0"
                                                    })
                                                ]
                                            })
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("polygon", {
                                            points: `0,60 ${dashboard_tab_buildSparklinePoints(card.series)} 100,60`,
                                            fill: `url(#spark-${card.key})`
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("polyline", {
                                            points: dashboard_tab_buildSparklinePoints(card.series),
                                            fill: "none",
                                            stroke: card.accent,
                                            strokeWidth: "2.4",
                                            strokeLinejoin: "round",
                                            strokeLinecap: "round"
                                        })
                                    ]
                                })
                            ]
                        }, card.key))
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "dashboard-analytics-grid",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
                            className: "dashboard-analytic-panel dashboard-analytic-panel-wide",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("header", {
                                    className: "dashboard-panel-head",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                                    children: "Salas e Mat\xe9rias por Presen\xe7a"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                    children: "Leitura atual destacando as mat\xe9rias mais fortes no recorte selecionado"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: "dashboard-pill-value",
                                            children: formatNumber(totalAtual)
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "dashboard-bar-chart",
                                    children: chartBars.map((item)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: "dashboard-bar-group",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                    className: "dashboard-bar-stack",
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                        className: "dashboard-bar-fill",
                                                        style: {
                                                            height: `${dashboard_tab_clampPercent(item.media / maxBarValue * 100)}%`
                                                        }
                                                    })
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                    children: item.materia
                                                })
                                            ]
                                        }, item.materia))
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
                            className: "dashboard-analytic-panel",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("header", {
                                    className: "dashboard-panel-head",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                                    children: "Hist\xf3rico de Aulas"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                    children: rodadaId ? "Leitura hist\xf3rica da rodada filtrada" : "Evolu\xe7\xe3o de frequ\xeancia por rodada"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: "dashboard-history-pills",
                                            children: [
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                                    className: "dashboard-chip",
                                                    children: [
                                                        "M\xe9dia ",
                                                        formatNumber(Math.round(mediaGeral))
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                                    className: "dashboard-chip dashboard-chip-strong",
                                                    children: [
                                                        "Pico ",
                                                        formatNumber(Math.max(...seriesBase, 0))
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "dashboard-history-summary",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                    children: "\xdaltima Aula"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                    children: formatNumber(totalAtual)
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                    children: "Varia\xe7\xe3o"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                    children: formatNumber(Math.round(totalAtual - mediaRodada))
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                    children: "Percentual"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                    children: formatDelta(deltaMedia)
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                historicoRecente.length > 1 ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "dashboard-history-track",
                                    children: historicoRecente.map((item)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: "dashboard-history-node",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                    className: "dashboard-history-dot"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                    children: item.referencia
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                    children: formatSessaoLabel(item.sessao_senib)
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("small", {
                                                    children: formatDate(item.data)
                                                })
                                            ]
                                        }, `${item.rodada_id}-${item.data}`))
                                }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "dashboard-history-empty",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                            children: "Base hist\xf3rica em forma\xe7\xe3o"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                            children: "Assim que novas rodadas forem importadas, a trilha de evolu\xe7\xe3o aparece aqui com comparativos reais."
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
                            className: "dashboard-analytic-panel dashboard-composition-panel",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("header", {
                                    className: "dashboard-panel-head",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                                    children: "Composi\xe7\xe3o de Presen\xe7a"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                    children: "Leitura atual consolidada"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: "dashboard-chip",
                                            children: "\xdaltima"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "dashboard-composition-layout",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: "dashboard-composition-hero",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                    className: "dashboard-donut",
                                                    style: donutStyle,
                                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                        className: "dashboard-donut-core",
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                                children: formatNumber(totalAtual)
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                children: "Total"
                                                            })
                                                        ]
                                                    })
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                    className: "dashboard-composition-kpis",
                                                    children: [
                                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
                                                            children: [
                                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                    children: "Predomin\xe2ncia"
                                                                }),
                                                                /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                                    children: totalAtual ? `${Math.round(totalAlunos / totalAtual * 100)}%` : "0%"
                                                                }),
                                                                /*#__PURE__*/ jsx_runtime_.jsx("small", {
                                                                    children: "Alunos no total consolidado"
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
                                                            children: [
                                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                    children: "Equipe"
                                                                }),
                                                                /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                                    children: formatNumber(totalEquipes)
                                                                }),
                                                                /*#__PURE__*/ jsx_runtime_.jsx("small", {
                                                                    children: "Verdinhos, amarelinhos e professores"
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("ul", {
                                            className: "dashboard-composition-list",
                                            children: compositionEntries.map((item)=>{
                                                const percentage = totalAtual ? Math.round(item.value / totalAtual * 100) : 0;
                                                return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("li", {
                                                    children: [
                                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                            className: "dashboard-composition-label",
                                                            children: [
                                                                /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                                                    style: {
                                                                        backgroundColor: item.color
                                                                    }
                                                                }),
                                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                    children: item.label
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                            className: "dashboard-composition-bar",
                                                            children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                                className: "dashboard-composition-fill",
                                                                style: {
                                                                    width: `${dashboard_tab_clampPercent(percentage)}%`,
                                                                    backgroundColor: item.color
                                                                }
                                                            })
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                            children: formatNumber(item.value)
                                                        }),
                                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("small", {
                                                            children: [
                                                                percentage,
                                                                "%"
                                                            ]
                                                        })
                                                    ]
                                                }, item.key);
                                            })
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
                            className: "dashboard-analytic-panel",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("header", {
                                    className: "dashboard-panel-head",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                                    children: "Ranking de Salas"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                    children: payload?.ultima_rodada?.referencia ?? "Sem rodada consolidada"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: "dashboard-chip",
                                            children: payload?.ultima_rodada ? formatSessaoLabel(payload.ultima_rodada.sessao_senib) : "Sem sessao"
                                        })
                                    ]
                                }),
                                leadingSala ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "dashboard-ranking-highlight",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            children: "L\xedder da rodada"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                            children: leadingSala.sala
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("small", {
                                            children: [
                                                formatNumber(leadingSala.media),
                                                " presen\xe7as consolidadas"
                                            ]
                                        })
                                    ]
                                }) : null,
                                /*#__PURE__*/ jsx_runtime_.jsx("ul", {
                                    className: "dashboard-ranking-list",
                                    children: rankingTop.map((item, index)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("li", {
                                            children: [
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                    className: "dashboard-ranking-copy",
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                            className: "dashboard-ranking-position",
                                                            children: index + 1
                                                        }),
                                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                            children: [
                                                                /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                                    children: item.sala
                                                                }),
                                                                /*#__PURE__*/ jsx_runtime_.jsx("small", {
                                                                    children: "M\xe9dia local consolidada"
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                    className: "dashboard-ranking-track",
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                        className: "dashboard-ranking-fill",
                                                        style: {
                                                            width: `${dashboard_tab_clampPercent(item.media / maxBarValue * 100)}%`
                                                        }
                                                    })
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                    className: "dashboard-ranking-value",
                                                    children: formatNumber(item.media)
                                                })
                                            ]
                                        }, item.sala))
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
                            className: "dashboard-analytic-panel",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("header", {
                                    className: "dashboard-panel-head",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                                    children: "Ranking de Mat\xe9rias"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                    children: payload?.ultima_rodada?.referencia ?? "Sem rodada consolidada"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: "dashboard-chip",
                                            children: payload?.ultima_rodada ? formatSessaoLabel(payload.ultima_rodada.sessao_senib) : "Sem sessao"
                                        })
                                    ]
                                }),
                                leadingMateria ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "dashboard-ranking-highlight",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            children: "Mat\xe9ria em destaque"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                            children: leadingMateria.materia
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("small", {
                                            children: [
                                                formatNumber(leadingMateria.media),
                                                " presen\xe7as consolidadas"
                                            ]
                                        })
                                    ]
                                }) : null,
                                /*#__PURE__*/ jsx_runtime_.jsx("ul", {
                                    className: "dashboard-ranking-list",
                                    children: rankingMateriasTop.map((item, index)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("li", {
                                            children: [
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                    className: "dashboard-ranking-copy",
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                            className: "dashboard-ranking-position",
                                                            children: index + 1
                                                        }),
                                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                            children: [
                                                                /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                                    children: item.materia
                                                                }),
                                                                /*#__PURE__*/ jsx_runtime_.jsx("small", {
                                                                    children: "M\xe9dia consolidada da mat\xe9ria"
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                    className: "dashboard-ranking-track",
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                        className: "dashboard-ranking-fill dashboard-ranking-fill-materia",
                                                        style: {
                                                            width: `${dashboard_tab_clampPercent(item.media / Math.max(...rankingMateriasTop.map((entry)=>entry.media), 1) * 100)}%`
                                                        }
                                                    })
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                    className: "dashboard-ranking-value",
                                                    children: formatNumber(item.media)
                                                })
                                            ]
                                        }, item.materia))
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    });
}

;// CONCATENATED MODULE: ./src/features/painel/culto-painel-tab.tsx
/* __next_internal_client_entry_do_not_use__ CultoPainelTab auto */ 



function CultoPainelTab({ user }) {
    const [painel, setPainel] = (0,react_.useState)(null);
    const [selectedDate, setSelectedDate] = (0,react_.useState)("");
    const [error, setError] = (0,react_.useState)(null);
    const canManageCulto = user.roles.some((role)=>[
            "admin",
            "estatistica"
        ].includes(role));
    async function loadPainel() {
        try {
            const params = new URLSearchParams();
            if (selectedDate) {
                params.set("data_referencia", selectedDate);
            }
            const payload = await apiFetch(params.size ? `/cultos/painel?${params.toString()}` : "/cultos/painel", {
                headers: {}
            });
            setPainel(payload);
            if (payload.data_atual && payload.data_atual !== selectedDate) {
                setSelectedDate(payload.data_atual);
            }
            setError(null);
        } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : "Falha ao carregar cultos.");
        }
    }
    (0,react_.useEffect)(()=>{
        loadPainel();
    }, [
        selectedDate
    ]);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("section", {
        className: "layout-grid",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
                className: "panel-card hero-card span-full",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "hero-topline",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                className: "date-pill",
                                children: painel?.data_atual ? formatDateOnly(painel.data_atual) : "Sem data preparada"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                className: "status-live",
                                children: painel?.cultos.length ? "Opera\xe7\xe3o de culto pronta" : "Prepare os cultos na configura\xe7\xe3o"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("header", {
                        className: "hero-header",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                        className: "eyebrow",
                                        children: "Controle de Presen\xe7a"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                                        children: "Painel Operacional de Culto"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                        className: "body-copy hero-copy",
                                        children: painel?.cultos.length ? `${formatNumber(painel.total_geral)} presentes somando os dois cultos da data selecionada.` : "Abra a aba Configura\xe7\xe3o e prepare uma data com 1\xba culto e 2\xba culto para liberar esta opera\xe7\xe3o."
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "stat-chip stat-chip-hero",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                        children: "Total do dia"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                        children: formatNumber(painel?.total_geral ?? 0)
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("small", {
                                        children: "1\xba culto + 2\xba culto"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "action-row panel-toolbar-row",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                                className: "field compact-field",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                        children: "Data do culto"
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("select", {
                                        value: selectedDate,
                                        onChange: (event)=>setSelectedDate(event.target.value),
                                        disabled: !painel?.datas_disponiveis.length,
                                        children: [
                                            painel?.datas_disponiveis.length ? null : /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                value: "",
                                                children: "Nenhuma data preparada"
                                            }),
                                            (painel?.datas_disponiveis ?? []).map((item)=>/*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                    value: item,
                                                    children: formatDateOnly(item)
                                                }, item))
                                        ]
                                    })
                                ]
                            }),
                            canManageCulto ? /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                className: "status-live",
                                children: "Prepara\xe7\xe3o manual dispon\xedvel na aba Configura\xe7\xe3o"
                            }) : null
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
                className: "panel-card span-full",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("header", {
                        className: "section-header",
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                    className: "eyebrow",
                                    children: "Painel Operacional"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                                    children: "Contagem por Culto"
                                })
                            ]
                        })
                    }),
                    error ? /*#__PURE__*/ jsx_runtime_.jsx("p", {
                        className: "error-banner",
                        "aria-live": "polite",
                        children: error
                    }) : null,
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "culto-counter-grid",
                        children: (painel?.cultos ?? []).map((culto)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("section", {
                                className: "counter-card culto-counter-card",
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "counter-head",
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                        children: culto.nome
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                        children: painel?.data_atual ? formatDateOnly(painel.data_atual) : "Sem data"
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                className: "counter-total",
                                                children: formatNumber(culto.total)
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "culto-counter-body",
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: "culto-counter-value",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                        children: "Total geral"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                        children: formatNumber(culto.total)
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: "culto-counter-actions",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                        type: "button",
                                                        className: "mini-button",
                                                        "aria-label": `Diminuir total do ${culto.nome}`,
                                                        onClick: async ()=>{
                                                            const nextTotal = Math.max(culto.total - 1, 0);
                                                            await apiFetch(`/cultos/${culto.id}`, {
                                                                method: "PATCH",
                                                                body: JSON.stringify({
                                                                    total: nextTotal
                                                                })
                                                            });
                                                            await loadPainel();
                                                        },
                                                        children: "-"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                        type: "button",
                                                        className: "mini-button",
                                                        "aria-label": `Aumentar total do ${culto.nome}`,
                                                        onClick: async ()=>{
                                                            await apiFetch(`/cultos/${culto.id}`, {
                                                                method: "PATCH",
                                                                body: JSON.stringify({
                                                                    total: culto.total + 1
                                                                })
                                                            });
                                                            await loadPainel();
                                                        },
                                                        children: "+"
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            }, culto.id))
                    })
                ]
            })
        ]
    });
}

;// CONCATENATED MODULE: ./src/features/painel/nova-teens-painel-tab.tsx
/* __next_internal_client_entry_do_not_use__ NovaTeensPainelTab auto */ 



function NovaTeensPainelTab({ user }) {
    const [painel, setPainel] = (0,react_.useState)(null);
    const [selectedDate, setSelectedDate] = (0,react_.useState)("");
    const [error, setError] = (0,react_.useState)(null);
    const canManage = user.roles.some((role)=>[
            "admin",
            "estatistica"
        ].includes(role));
    async function loadPainel() {
        try {
            const params = new URLSearchParams();
            if (selectedDate) {
                params.set("data_referencia", selectedDate);
            }
            const payload = await apiFetch(params.size ? `/nova-teens/painel?${params.toString()}` : "/nova-teens/painel", {
                headers: {}
            });
            setPainel(payload);
            if (payload.data_atual && payload.data_atual !== selectedDate) {
                setSelectedDate(payload.data_atual);
            }
            setError(null);
        } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : "Falha ao carregar Nova Teens.");
        }
    }
    (0,react_.useEffect)(()=>{
        loadPainel();
    }, [
        selectedDate
    ]);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("section", {
        className: "layout-grid",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
                className: "panel-card hero-card span-full",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "hero-topline",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                className: "date-pill",
                                children: painel?.data_atual ? formatDateOnly(painel.data_atual) : "Sem data preparada"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                className: "status-live",
                                children: painel?.encontros.length ? "Opera\xe7\xe3o Nova Teens pronta" : "Prepare os encontros na configura\xe7\xe3o"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("header", {
                        className: "hero-header",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                        className: "eyebrow",
                                        children: "Controle de Presen\xe7a"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                                        children: "Painel Operacional Nova Teens"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                        className: "body-copy hero-copy",
                                        children: painel?.encontros.length ? `${formatNumber(painel.total_geral)} presentes somando os dois encontros da data selecionada.` : "Abra a aba Configura\xe7\xe3o e prepare uma data com 1\xba Nova Teens e 2\xba Nova Teens para liberar esta opera\xe7\xe3o."
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "stat-chip stat-chip-hero",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                        children: "Total do dia"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                        children: formatNumber(painel?.total_geral ?? 0)
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("small", {
                                        children: "Teens + l\xedderes"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "action-row panel-toolbar-row",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                                className: "field compact-field",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                        children: "Data do encontro"
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("select", {
                                        value: selectedDate,
                                        onChange: (event)=>setSelectedDate(event.target.value),
                                        disabled: !painel?.datas_disponiveis.length,
                                        children: [
                                            painel?.datas_disponiveis.length ? null : /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                value: "",
                                                children: "Nenhuma data preparada"
                                            }),
                                            (painel?.datas_disponiveis ?? []).map((item)=>/*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                    value: item,
                                                    children: formatDateOnly(item)
                                                }, item))
                                        ]
                                    })
                                ]
                            }),
                            canManage ? /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                className: "status-live",
                                children: "Prepara\xe7\xe3o manual dispon\xedvel na aba Configura\xe7\xe3o"
                            }) : null
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
                className: "panel-card span-full",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("header", {
                        className: "section-header",
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                    className: "eyebrow",
                                    children: "Painel Operacional"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                                    children: "Contagem por Encontro"
                                })
                            ]
                        })
                    }),
                    error ? /*#__PURE__*/ jsx_runtime_.jsx("p", {
                        className: "error-banner",
                        "aria-live": "polite",
                        children: error
                    }) : null,
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "culto-counter-grid",
                        children: (painel?.encontros ?? []).map((encontro)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("section", {
                                className: "counter-card culto-counter-card",
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "counter-head",
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                        children: encontro.nome
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                        children: painel?.data_atual ? formatDateOnly(painel.data_atual) : "Sem data"
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                className: "counter-total",
                                                children: formatNumber(encontro.total)
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "counter-stack",
                                        children: [
                                            [
                                                "teens",
                                                "Teens"
                                            ],
                                            [
                                                "lideres",
                                                "L\xedderes"
                                            ]
                                        ].map(([key, label])=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: "counter-row",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                        children: label
                                                    }),
                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                        className: "counter-actions",
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                                type: "button",
                                                                className: "mini-button",
                                                                "aria-label": `Diminuir ${label} em ${encontro.nome}`,
                                                                onClick: async ()=>{
                                                                    const field = key;
                                                                    const nextValue = Math.max(encontro[field] - 1, 0);
                                                                    await apiFetch(`/nova-teens/${encontro.id}`, {
                                                                        method: "PATCH",
                                                                        body: JSON.stringify({
                                                                            [field]: nextValue
                                                                        })
                                                                    });
                                                                    await loadPainel();
                                                                },
                                                                children: "-"
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                                children: formatNumber(encontro[key])
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                                type: "button",
                                                                className: "mini-button",
                                                                "aria-label": `Aumentar ${label} em ${encontro.nome}`,
                                                                onClick: async ()=>{
                                                                    const field = key;
                                                                    await apiFetch(`/nova-teens/${encontro.id}`, {
                                                                        method: "PATCH",
                                                                        body: JSON.stringify({
                                                                            [field]: encontro[field] + 1
                                                                        })
                                                                    });
                                                                    await loadPainel();
                                                                },
                                                                children: "+"
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }, key))
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "culto-counter-body",
                                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: "culto-counter-value",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                    children: "Total geral"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                    children: formatNumber(encontro.total)
                                                })
                                            ]
                                        })
                                    })
                                ]
                            }, encontro.id))
                    })
                ]
            })
        ]
    });
}

;// CONCATENATED MODULE: ./src/types/contracts.ts
const roleOptions = [
    "admin",
    "estatistica",
    "verdinho",
    "pastor"
];
const operationOptions = (/* unused pure expression or super */ null && ([
    "senib",
    "culto",
    "nova_teens"
]));
const categoryLabels = [
    [
        "alunos",
        "Alunos"
    ],
    [
        "verdinhos",
        "Verdinhos"
    ],
    [
        "amarelinhos",
        "Amarelinhos"
    ],
    [
        "professor",
        "Professor"
    ]
];

;// CONCATENATED MODULE: ./src/features/painel/painel-tab.tsx
/* __next_internal_client_entry_do_not_use__ PainelTab auto */ 






function PainelTab({ user, operation }) {
    if (operation === "culto") {
        return /*#__PURE__*/ jsx_runtime_.jsx(CultoPainelTab, {
            user: user
        });
    }
    if (operation === "nova_teens") {
        return /*#__PURE__*/ jsx_runtime_.jsx(NovaTeensPainelTab, {
            user: user
        });
    }
    const [painel, setPainel] = (0,react_.useState)(null);
    const [rodadas, setRodadas] = (0,react_.useState)([]);
    const [error, setError] = (0,react_.useState)(null);
    const [selectedSessao, setSelectedSessao] = (0,react_.useState)(null);
    const [selectedRodadaId, setSelectedRodadaId] = (0,react_.useState)("");
    const [selectedAulaRef, setSelectedAulaRef] = (0,react_.useState)("");
    const [overviewMode, setOverviewMode] = (0,react_.useState)("ultima");
    const [parserText, setParserText] = (0,react_.useState)("");
    const deferredParserText = (0,react_.useDeferredValue)(parserText);
    const [parserPreview, setParserPreview] = (0,react_.useState)(null);
    const [parserTemplateSnapshot, setParserTemplateSnapshot] = (0,react_.useState)("");
    const canManageRodadas = user.roles.some((role)=>[
            "admin",
            "estatistica"
        ].includes(role));
    async function loadPainel() {
        try {
            const params = new URLSearchParams();
            if (selectedSessao) {
                params.set("sessao_senib", String(selectedSessao));
            }
            if (selectedRodadaId) {
                params.set("rodada_id", selectedRodadaId);
            }
            if (selectedAulaRef) {
                params.set("aula_ref", selectedAulaRef);
            }
            const payload = await apiFetch(params.size > 0 ? `/painel/rodada-ativa?${params.toString()}` : "/painel/rodada-ativa", {
                headers: {}
            });
            setPainel(payload);
            if (payload.rodada && !selectedRodadaId) {
                setSelectedRodadaId(String(payload.rodada.id));
            }
            if (payload.sessao_atual && payload.sessao_atual !== selectedSessao) {
                setSelectedSessao(payload.sessao_atual);
            }
            if (payload.aula_atual && payload.aula_atual !== selectedAulaRef) {
                setSelectedAulaRef(payload.aula_atual);
            }
        } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : "Falha ao carregar painel.");
        }
    }
    (0,react_.useEffect)(()=>{
        apiFetch("/rodadas", {
            headers: {}
        }).then((payload)=>setRodadas(payload.items)).catch(()=>{});
    }, []);
    (0,react_.useEffect)(()=>{
        loadPainel();
    }, [
        selectedSessao,
        selectedRodadaId,
        selectedAulaRef
    ]);
    const totalAlunos = painel?.salas.reduce((sum, sala)=>sum + (sala.contagens.alunos ?? 0), 0) ?? 0;
    const totalEquipe = painel?.salas.reduce((sum, sala)=>sum + (sala.contagens.verdinhos ?? 0) + (sala.contagens.amarelinhos ?? 0) + (sala.contagens.professor ?? 0), 0) ?? 0;
    const totalSalas = painel?.salas.length ?? 0;
    const totalMaterias = painel?.salas.reduce((sum, sala)=>sum + sala.materias.length, 0) ?? 0;
    const rodadasAtivas = rodadas.filter((rodada)=>rodada.ativa);
    const headlineValue = overviewMode === "ultima" ? formatNumber(painel?.total_geral ?? 0) : overviewMode === "media_rodada" ? formatNumber(totalSalas ? Math.round((painel?.total_geral ?? 0) / totalSalas) : 0) : formatNumber(totalMaterias ? Math.round((painel?.total_geral ?? 0) / totalMaterias) : 0);
    const headlineLabel = overviewMode === "ultima" ? "\xdaltima leitura" : overviewMode === "media_rodada" ? "M\xe9dia por sala" : "M\xe9dia por mat\xe9ria";
    function buildSalaSubtitle(sala) {
        const normalizedName = sala.nome.trim().toLowerCase();
        const normalizedCode = sala.codigo.trim().toLowerCase();
        const normalizedLocal = sala.local?.trim().toLowerCase() ?? "";
        if (!sala.local) {
            return sala.codigo !== sala.nome ? sala.codigo : formatSessaoLabel(sala.sessao_senib);
        }
        if (normalizedLocal === normalizedName || normalizedLocal === normalizedCode) {
            return sala.codigo !== sala.nome ? sala.codigo : formatSessaoLabel(sala.sessao_senib);
        }
        return `${sala.codigo} · ${sala.local}`;
    }
    function formatAulaLabel(value) {
        return value === "consolidado" ? "Consolidado" : value;
    }
    function buildParserTemplate(payload) {
        if (!payload?.salas?.length) {
            return "";
        }
        const materiaCount = new Map();
        for (const sala of payload.salas){
            for (const materia of sala.materias){
                const key = materia.materia.trim().toLowerCase();
                materiaCount.set(key, (materiaCount.get(key) ?? 0) + 1);
            }
        }
        return payload.salas.flatMap((sala)=>{
            if (sala.materias.length === 0) {
                return [
                    `${sala.nome} alunos ${sala.contagens.alunos ?? 0} verdinhos ${sala.contagens.verdinhos ?? 0} amarelinhos ${sala.contagens.amarelinhos ?? 0} professor ${sala.contagens.professor ?? 0}`
                ];
            }
            return sala.materias.map((materia)=>{
                const materiaKey = materia.materia.trim().toLowerCase();
                const reference = (materiaCount.get(materiaKey) ?? 0) > 1 ? `${sala.nome} - ${materia.materia}` : materia.materia;
                return `${reference} alunos ${sala.contagens.alunos ?? 0} verdinhos ${sala.contagens.verdinhos ?? 0} amarelinhos ${sala.contagens.amarelinhos ?? 0} professor ${sala.contagens.professor ?? 0}`;
            });
        }).join("\n");
    }
    (0,react_.useEffect)(()=>{
        const nextTemplate = buildParserTemplate(painel);
        if (!nextTemplate) {
            return;
        }
        if (!parserText.trim() || parserText === parserTemplateSnapshot) {
            setParserText(nextTemplate);
            setParserTemplateSnapshot(nextTemplate);
            return;
        }
        setParserTemplateSnapshot(nextTemplate);
    }, [
        painel
    ]);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("section", {
        className: "layout-grid",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
                className: "panel-card hero-card span-full",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "hero-topline",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                className: "date-pill",
                                children: new Intl.DateTimeFormat("pt-BR", {
                                    dateStyle: "short"
                                }).format(new Date())
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                className: "status-live",
                                children: painel?.rodada ? `Sincronizado com ${painel.rodada.origem}` : "Aguardando rodada ativa"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("header", {
                        className: "hero-header",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                        className: "eyebrow",
                                        children: "Controle de Frequ\xeancia"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                                        children: painel?.rodada?.referencia ?? "Nenhuma rodada ativa"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                        className: "body-copy hero-copy",
                                        children: painel?.rodada ? `${formatSessaoLabel(painel.sessao_atual)} · ${formatNumber(painel.total_geral)} presentes na leitura atual.` : "Abra a aba Configura\xe7\xe3o para importar ou cadastrar uma rodada e liberar o painel operacional por sess\xe3o."
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "stat-chip stat-chip-hero",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                        children: "Visualiza\xe7\xe3o"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                        children: headlineValue
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("small", {
                                        children: headlineLabel
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "action-row panel-toolbar-row",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                                className: "field compact-field",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                        children: "Rodada"
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("select", {
                                        value: selectedRodadaId,
                                        onChange: (event)=>{
                                            setSelectedRodadaId(event.target.value);
                                            setSelectedSessao(null);
                                            setSelectedAulaRef("");
                                        },
                                        children: [
                                            rodadasAtivas.length === 0 ? /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                value: "",
                                                children: "Nenhuma rodada ativa"
                                            }) : null,
                                            rodadasAtivas.map((rodada)=>/*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                    value: String(rodada.id),
                                                    children: rodada.referencia
                                                }, rodada.id))
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                                className: "field compact-field",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                        children: "Data da aula"
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("select", {
                                        value: selectedAulaRef,
                                        onChange: (event)=>setSelectedAulaRef(event.target.value),
                                        disabled: !painel?.rodada,
                                        children: [
                                            painel?.aulas_disponiveis?.length ? null : /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                value: "",
                                                children: "Nenhuma aula dispon\xedvel"
                                            }),
                                            (painel?.aulas_disponiveis ?? []).map((aula)=>/*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                    value: aula,
                                                    children: formatAulaLabel(aula)
                                                }, aula))
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "session-strip",
                        role: "tablist",
                        "aria-label": "Sessoes SENIB",
                        children: (painel?.sessoes_disponiveis ?? []).map((sessao)=>/*#__PURE__*/ jsx_runtime_.jsx("button", {
                                type: "button",
                                className: painel?.sessao_atual === sessao ? "session-tab session-tab-active" : "session-tab",
                                onClick: ()=>{
                                    setSelectedSessao(sessao);
                                    setSelectedAulaRef("");
                                },
                                children: formatSessaoLabel(sessao)
                            }, sessao))
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
                className: "panel-card span-full",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("header", {
                        className: "section-header",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                        className: "eyebrow",
                                        children: "Vis\xe3o Geral"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                                        children: "Visualiza\xe7\xe3o Operacional"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "view-toggle",
                                children: [
                                    [
                                        "ultima",
                                        "\xdaltima"
                                    ],
                                    [
                                        "media_rodada",
                                        "M\xe9dia da rodada"
                                    ],
                                    [
                                        "media_geral",
                                        "M\xe9dia geral"
                                    ]
                                ].map(([value, label])=>/*#__PURE__*/ jsx_runtime_.jsx("button", {
                                        type: "button",
                                        className: overviewMode === value ? "tab-active" : "tab-button",
                                        onClick: ()=>setOverviewMode(value),
                                        children: label
                                    }, value))
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "overview-strip",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
                                className: "overview-card overview-card-primary",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                        children: "Presentes"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                        children: formatNumber(painel?.total_geral ?? 0)
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("small", {
                                        children: headlineLabel
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
                                className: "overview-card overview-card-cyan",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                        children: "Alunos"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                        children: formatNumber(totalAlunos)
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("small", {
                                        children: [
                                            totalSalas,
                                            " salas na sessao"
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
                                className: "overview-card overview-card-emerald",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                        children: "Equipe"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                        children: formatNumber(totalEquipe)
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("small", {
                                        children: [
                                            totalMaterias,
                                            " mat\xe9rias ativas"
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
                className: "panel-card span-full",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("header", {
                        className: "section-header",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                        className: "eyebrow",
                                        children: "Painel Operacional"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                                        children: "Contagem por Sala e Importa\xe7\xf5es"
                                    })
                                ]
                            }),
                            canManageRodadas ? /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                className: "status-live",
                                children: "Configura\xe7\xe3o dispon\xedvel em aba dedicada"
                            }) : null
                        ]
                    }),
                    error ? /*#__PURE__*/ jsx_runtime_.jsx("p", {
                        className: "error-banner",
                        "aria-live": "polite",
                        children: error
                    }) : null,
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "room-and-parser-grid",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "counter-grid",
                                children: painel?.salas.map((sala)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("section", {
                                        className: "counter-card",
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: "counter-head",
                                                children: [
                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                                children: sala.nome
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                children: buildSalaSubtitle(sala)
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                        className: "counter-total",
                                                        children: formatNumber(sala.total)
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: "counter-body",
                                                children: [
                                                    categoryLabels.map(([key, label])=>{
                                                        const contagemId = sala.contagem_id;
                                                        return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                            className: "counter-row",
                                                            children: [
                                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                    children: label
                                                                }),
                                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                                    className: "counter-actions",
                                                                    children: [
                                                                        /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                                            type: "button",
                                                                            className: "mini-button",
                                                                            "aria-label": `Diminuir ${label} em ${sala.nome}`,
                                                                            onClick: async ()=>{
                                                                                if (!contagemId) return;
                                                                                await apiFetch(`/painel/contagens/${contagemId}`, {
                                                                                    method: "PATCH",
                                                                                    body: JSON.stringify({
                                                                                        categoria: key,
                                                                                        operacao: "decremento"
                                                                                    })
                                                                                });
                                                                                await loadPainel();
                                                                            },
                                                                            children: "-"
                                                                        }),
                                                                        /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                                            children: formatNumber(sala.contagens[key] ?? 0)
                                                                        }),
                                                                        /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                                            type: "button",
                                                                            className: "mini-button",
                                                                            "aria-label": `Aumentar ${label} em ${sala.nome}`,
                                                                            onClick: async ()=>{
                                                                                if (!contagemId) return;
                                                                                await apiFetch(`/painel/contagens/${contagemId}`, {
                                                                                    method: "PATCH",
                                                                                    body: JSON.stringify({
                                                                                        categoria: key,
                                                                                        operacao: "incremento"
                                                                                    })
                                                                                });
                                                                                await loadPainel();
                                                                            },
                                                                            children: "+"
                                                                        })
                                                                    ]
                                                                })
                                                            ]
                                                        }, key);
                                                    }),
                                                    sala.materias.length > 0 ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                        className: "materias-block",
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                className: "materias-title",
                                                                children: "Mat\xe9rias"
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime_.jsx("ul", {
                                                                className: "materias-list",
                                                                children: sala.materias.map((materia)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("li", {
                                                                        children: [
                                                                            /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                                                children: materia.materia
                                                                            }),
                                                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                                children: materia.professores.join(", ") || "Professor n\xe3o informado"
                                                                            })
                                                                        ]
                                                                    }, materia.id))
                                                            })
                                                        ]
                                                    }) : null
                                                ]
                                            })
                                        ]
                                    }, sala.sala_id))
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("aside", {
                                className: "parser-sidecard",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("header", {
                                        className: "section-header parser-sidehead",
                                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                    className: "eyebrow",
                                                    children: "Integra\xe7\xf5es"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                                                    children: "Importar do WhatsApp"
                                                })
                                            ]
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                        className: "muted-copy",
                                        children: "O texto abaixo j\xe1 vem pronto com as mat\xe9rias da sess\xe3o. Basta copiar, colar no WhatsApp se quiser, e depois alterar s\xf3 os n\xfameros antes de interpretar."
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "parser-grid",
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                                                className: "field",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                        children: "Texto"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("textarea", {
                                                        name: "texto_parser",
                                                        value: parserText,
                                                        onChange: (event)=>setParserText(event.target.value),
                                                        placeholder: "Hist\xf3ria da Igreja alunos 0 verdinhos 0 amarelinhos 0 professor 0",
                                                        rows: 7
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: "action-row",
                                                children: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                    type: "button",
                                                    className: "primary-button wide-button",
                                                    onClick: async ()=>{
                                                        try {
                                                            const preview = await apiFetch("/parser/preview", {
                                                                method: "POST",
                                                                body: JSON.stringify({
                                                                    texto: deferredParserText
                                                                })
                                                            });
                                                            setParserPreview(preview);
                                                            setError(null);
                                                        } catch (requestError) {
                                                            setError(requestError instanceof Error ? requestError.message : "Falha ao interpretar mensagens.");
                                                        }
                                                    },
                                                    children: "Interpretar mensagens"
                                                })
                                            }),
                                            parserPreview ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: "preview-block",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("ul", {
                                                        className: "draft-list",
                                                        children: parserPreview.preview.map((item, index)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("li", {
                                                                children: [
                                                                    /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                                        children: item.sala
                                                                    }),
                                                                    " ",
                                                                    Object.entries(item.contagens).filter((entry)=>entry[1] !== undefined).map(([key, value])=>`${key}: ${value}`).join(" \xb7 ")
                                                                ]
                                                            }, `${item.sala}-${index}`))
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                        type: "button",
                                                        className: "secondary-button wide-button",
                                                        disabled: !painel?.rodada,
                                                        onClick: async ()=>{
                                                            if (!painel?.rodada) return;
                                                            try {
                                                                await apiFetch("/parser/confirmar", {
                                                                    method: "POST",
                                                                    body: JSON.stringify({
                                                                        rodadaId: painel.rodada.id,
                                                                        sessao_senib: painel.sessao_atual,
                                                                        aula_ref: painel.aula_atual,
                                                                        items: parserPreview.preview
                                                                    })
                                                                });
                                                                setParserPreview(null);
                                                                setParserText("");
                                                                setError(null);
                                                                await loadPainel();
                                                            } catch (requestError) {
                                                                setError(requestError instanceof Error ? requestError.message : "Falha ao aplicar contagens interpretadas.");
                                                            }
                                                        },
                                                        children: "Confirmar e aplicar"
                                                    })
                                                ]
                                            }) : /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: "preview-block preview-empty",
                                                children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                    children: "Cole as mensagens acima e clique em interpretar."
                                                })
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                ]
            })
        ]
    });
}

;// CONCATENATED MODULE: ./src/features/users/users-tab.tsx
/* __next_internal_client_entry_do_not_use__ UsersTab auto */ 



function UsersTab() {
    const [payload, setPayload] = (0,react_.useState)(null);
    const [form, setForm] = (0,react_.useState)({
        nome: "",
        login: "",
        senha: "",
        roles: [
            "verdinho"
        ]
    });
    const [passwordDrafts, setPasswordDrafts] = (0,react_.useState)({});
    const [editDrafts, setEditDrafts] = (0,react_.useState)({});
    async function loadUsers() {
        const users = await apiFetch("/admin/users", {
            headers: {}
        });
        setPayload(users);
        setEditDrafts(Object.fromEntries(users.items.map((user)=>[
                user.id,
                {
                    nome: user.nome,
                    ativo: user.ativo,
                    roles: [
                        ...user.roles
                    ]
                }
            ])));
    }
    (0,react_.useEffect)(()=>{
        loadUsers();
    }, []);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("section", {
        className: "layout-grid",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
                className: "panel-card",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("header", {
                        className: "section-header",
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                    className: "eyebrow",
                                    children: "Administra\xe7\xe3o"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                                    children: "Novo Usu\xe1rio"
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("form", {
                        className: "form-stack",
                        onSubmit: async (event)=>{
                            event.preventDefault();
                            await apiFetch("/admin/users", {
                                method: "POST",
                                body: JSON.stringify(form)
                            });
                            setForm({
                                nome: "",
                                login: "",
                                senha: "",
                                roles: [
                                    "verdinho"
                                ]
                            });
                            await loadUsers();
                        },
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                                className: "field",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                        children: "Nome"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                        value: form.nome,
                                        onChange: (event)=>setForm((current)=>({
                                                    ...current,
                                                    nome: event.target.value
                                                })),
                                        required: true
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                                className: "field",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                        children: "Login"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                        value: form.login,
                                        onChange: (event)=>setForm((current)=>({
                                                    ...current,
                                                    login: event.target.value
                                                })),
                                        autoComplete: "username",
                                        required: true
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                                className: "field",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                        children: "Senha"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                        value: form.senha,
                                        onChange: (event)=>setForm((current)=>({
                                                    ...current,
                                                    senha: event.target.value
                                                })),
                                        type: "password",
                                        autoComplete: "new-password",
                                        required: true
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("fieldset", {
                                className: "checkbox-group",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("legend", {
                                        children: "Perfis"
                                    }),
                                    roleOptions.map((role)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                                            className: "checkbox-item",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                    type: "checkbox",
                                                    checked: form.roles.includes(role),
                                                    onChange: (event)=>{
                                                        setForm((current)=>({
                                                                ...current,
                                                                roles: event.target.checked ? [
                                                                    ...current.roles,
                                                                    role
                                                                ] : current.roles.filter((entry)=>entry !== role)
                                                            }));
                                                    }
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                    children: role
                                                })
                                            ]
                                        }, role))
                                ]
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                type: "submit",
                                className: "primary-button",
                                children: "Criar Usu\xe1rio"
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
                className: "panel-card span-full",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("header", {
                        className: "section-header",
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                    className: "eyebrow",
                                    children: "Controle de Acesso"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                                    children: "Usu\xe1rios Cadastrados"
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "users-grid",
                        children: payload?.items.map((user)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("section", {
                                className: "user-card",
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "counter-head",
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                        children: user.nome
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                        children: user.login
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                className: editDrafts[user.id]?.ativo ? "status-ok" : "status-off",
                                                children: editDrafts[user.id]?.ativo ? "Ativo" : "Inativo"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                                        className: "field",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                children: "Nome"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                value: editDrafts[user.id]?.nome ?? user.nome,
                                                onChange: (event)=>setEditDrafts((current)=>({
                                                            ...current,
                                                            [user.id]: {
                                                                ...current[user.id] ?? {
                                                                    nome: user.nome,
                                                                    ativo: user.ativo,
                                                                    roles: [
                                                                        ...user.roles
                                                                    ]
                                                                },
                                                                nome: event.target.value
                                                            }
                                                        }))
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("fieldset", {
                                        className: "checkbox-group",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("legend", {
                                                children: "Perfis"
                                            }),
                                            roleOptions.map((role)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                                                    className: "checkbox-item",
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                            type: "checkbox",
                                                            checked: editDrafts[user.id]?.roles.includes(role) ?? user.roles.includes(role),
                                                            onChange: (event)=>{
                                                                const currentDraft = editDrafts[user.id] ?? {
                                                                    nome: user.nome,
                                                                    ativo: user.ativo,
                                                                    roles: [
                                                                        ...user.roles
                                                                    ]
                                                                };
                                                                const roles = event.target.checked ? [
                                                                    ...new Set([
                                                                        ...currentDraft.roles,
                                                                        role
                                                                    ])
                                                                ] : currentDraft.roles.filter((entry)=>entry !== role);
                                                                setEditDrafts((current)=>({
                                                                        ...current,
                                                                        [user.id]: {
                                                                            ...currentDraft,
                                                                            roles
                                                                        }
                                                                    }));
                                                            }
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                            children: role
                                                        })
                                                    ]
                                                }, role))
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "action-row",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                type: "button",
                                                className: "secondary-button",
                                                onClick: ()=>setEditDrafts((current)=>({
                                                            ...current,
                                                            [user.id]: {
                                                                ...current[user.id] ?? {
                                                                    nome: user.nome,
                                                                    ativo: user.ativo,
                                                                    roles: [
                                                                        ...user.roles
                                                                    ]
                                                                },
                                                                ativo: !(current[user.id]?.ativo ?? user.ativo)
                                                            }
                                                        })),
                                                children: editDrafts[user.id]?.ativo ? "Marcar Inativo" : "Marcar Ativo"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                type: "button",
                                                className: "primary-button",
                                                onClick: async ()=>{
                                                    await apiFetch(`/admin/users/${user.id}`, {
                                                        method: "PATCH",
                                                        body: JSON.stringify({
                                                            nome: editDrafts[user.id]?.nome ?? user.nome,
                                                            ativo: editDrafts[user.id]?.ativo ?? user.ativo,
                                                            roles: editDrafts[user.id]?.roles ?? user.roles
                                                        })
                                                    });
                                                    await loadUsers();
                                                },
                                                children: "Salvar Altera\xe7\xf5es"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                type: "button",
                                                className: "secondary-button",
                                                onClick: async ()=>{
                                                    await apiFetch(`/admin/users/${user.id}`, {
                                                        method: "DELETE",
                                                        headers: {}
                                                    });
                                                    await loadUsers();
                                                },
                                                children: "Excluir"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                                        className: "field",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                children: "Nova Senha"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                type: "password",
                                                value: passwordDrafts[user.id] ?? "",
                                                onChange: (event)=>setPasswordDrafts((current)=>({
                                                            ...current,
                                                            [user.id]: event.target.value
                                                        })),
                                                autoComplete: "new-password"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                        type: "button",
                                        className: "mini-button wide-button",
                                        onClick: async ()=>{
                                            const senha = passwordDrafts[user.id];
                                            if (!senha) return;
                                            await apiFetch(`/admin/users/${user.id}/password`, {
                                                method: "PATCH",
                                                body: JSON.stringify({
                                                    senha
                                                })
                                            });
                                            setPasswordDrafts((current)=>({
                                                    ...current,
                                                    [user.id]: ""
                                                }));
                                        },
                                        children: "Atualizar Senha"
                                    })
                                ]
                            }, user.id))
                    })
                ]
            })
        ]
    });
}

;// CONCATENATED MODULE: ./src/components/app-shell.tsx
/* __next_internal_client_entry_do_not_use__ AppShell auto */ 








function resolveTab(value) {
    if (value === "painel" || value === "configuracao" || value === "dashboard" || value === "usuarios") {
        return value;
    }
    return "painel";
}
function resolveOperation(value) {
    if (value === "culto" || value === "nova_teens") {
        return value;
    }
    return "senib";
}
function AppShell() {
    const router = (0,navigation.useRouter)();
    const pathname = (0,navigation.usePathname)();
    const searchParams = (0,navigation.useSearchParams)();
    const [session, setSession] = (0,react_.useState)(null);
    const [sessionLoading, setSessionLoading] = (0,react_.useState)(true);
    const [authError, setAuthError] = (0,react_.useState)(null);
    const activeTab = resolveTab(searchParams.get("tab"));
    const activeOperation = resolveOperation(searchParams.get("op"));
    async function refreshSession() {
        const payload = await apiFetch("/auth/session", {
            headers: {}
        });
        (0,react_.startTransition)(()=>setSession(payload));
    }
    function setActiveTab(tab) {
        const nextParams = new URLSearchParams(searchParams.toString());
        nextParams.set("tab", tab);
        router.replace(`${pathname}?${nextParams.toString()}`);
    }
    function setActiveOperation(operation) {
        const nextParams = new URLSearchParams(searchParams.toString());
        nextParams.set("op", operation);
        router.replace(`${pathname}?${nextParams.toString()}`);
    }
    (0,react_.useEffect)(()=>{
        refreshSession().catch(()=>{
            (0,react_.startTransition)(()=>setSession({
                    authenticated: false,
                    user: null
                }));
        }).finally(()=>setSessionLoading(false));
    }, []);
    (0,react_.useEffect)(()=>{
        if (!session?.authenticated || !session.user) {
            return;
        }
        const canViewPainel = session.user.roles.some((role)=>[
                "admin",
                "estatistica",
                "verdinho"
            ].includes(role));
        const canManageRodadas = session.user.roles.some((role)=>[
                "admin",
                "estatistica"
            ].includes(role));
        if (!canViewPainel && activeTab === "painel") {
            setActiveTab("dashboard");
        }
        if (!canManageRodadas && activeTab === "configuracao") {
            setActiveTab(canViewPainel ? "painel" : "dashboard");
        }
    }, [
        activeTab,
        session
    ]);
    const permissions = (0,react_.useMemo)(()=>{
        const user = session?.user;
        return {
            canViewPainel: user ? user.roles.some((role)=>[
                    "admin",
                    "estatistica",
                    "verdinho"
                ].includes(role)) : false,
            canManageRodadas: user ? user.roles.some((role)=>[
                    "admin",
                    "estatistica"
                ].includes(role)) : false,
            canViewUsers: user ? user.roles.includes("admin") : false
        };
    }, [
        session
    ]);
    if (sessionLoading) {
        return /*#__PURE__*/ jsx_runtime_.jsx("main", {
            className: "screen-state",
            children: "Carregando…"
        });
    }
    if (!session?.authenticated || !session.user) {
        return /*#__PURE__*/ jsx_runtime_.jsx(LoginScreen, {
            error: authError,
            onLogin: async (login, senha)=>{
                setAuthError(null);
                try {
                    await apiFetch("/auth/login", {
                        method: "POST",
                        body: JSON.stringify({
                            login,
                            senha
                        })
                    });
                    await refreshSession();
                } catch (error) {
                    setAuthError(error instanceof Error ? error.message : "Falha ao autenticar.");
                }
            }
        });
    }
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("main", {
        className: "shell",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("header", {
                className: "topbar",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                className: "eyebrow",
                                children: activeOperation === "culto" ? "Opera\xe7\xe3o Local de Culto" : activeOperation === "nova_teens" ? "Opera\xe7\xe3o Local Nova Teens" : "Opera\xe7\xe3o Local SENIB"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                                children: "Estat\xedsticas SENIB"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "topbar-actions",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "user-badge",
                                "aria-label": "Usuario autenticado",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                        children: session.user.nome
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                        children: session.user.roles.join(", ")
                                    })
                                ]
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                type: "button",
                                className: "secondary-button",
                                onClick: async ()=>{
                                    await apiFetch("/auth/logout", {
                                        method: "POST",
                                        headers: {}
                                    });
                                    setSession({
                                        authenticated: false,
                                        user: null
                                    });
                                },
                                children: "Sair"
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("nav", {
                className: "nav-tabs",
                "aria-label": "Navegacao principal",
                children: [
                    permissions.canViewPainel ? /*#__PURE__*/ jsx_runtime_.jsx("button", {
                        type: "button",
                        className: activeTab === "painel" ? "tab-active" : "tab-button",
                        onClick: ()=>setActiveTab("painel"),
                        children: "Painel"
                    }) : null,
                    permissions.canManageRodadas ? /*#__PURE__*/ jsx_runtime_.jsx("button", {
                        type: "button",
                        className: activeTab === "configuracao" ? "tab-active" : "tab-button",
                        onClick: ()=>setActiveTab("configuracao"),
                        children: "Configura\xe7\xe3o"
                    }) : null,
                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                        type: "button",
                        className: activeTab === "dashboard" ? "tab-active" : "tab-button",
                        onClick: ()=>setActiveTab("dashboard"),
                        children: "Dashboard"
                    }),
                    permissions.canViewUsers ? /*#__PURE__*/ jsx_runtime_.jsx("button", {
                        type: "button",
                        className: activeTab === "usuarios" ? "tab-active" : "tab-button",
                        onClick: ()=>setActiveTab("usuarios"),
                        children: "Usu\xe1rios"
                    }) : null
                ]
            }),
            activeTab !== "usuarios" ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "operation-switch",
                role: "tablist",
                "aria-label": "Opera\xe7\xe3o estat\xedstica",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                        type: "button",
                        className: activeOperation === "senib" ? "tab-active" : "tab-button",
                        onClick: ()=>setActiveOperation("senib"),
                        children: "SENIB"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                        type: "button",
                        className: activeOperation === "culto" ? "tab-active" : "tab-button",
                        onClick: ()=>setActiveOperation("culto"),
                        children: "Culto"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                        type: "button",
                        className: activeOperation === "nova_teens" ? "tab-active" : "tab-button",
                        onClick: ()=>setActiveOperation("nova_teens"),
                        children: "Nova Teens"
                    })
                ]
            }) : null,
            activeTab === "painel" && permissions.canViewPainel ? /*#__PURE__*/ jsx_runtime_.jsx(PainelTab, {
                user: session.user,
                operation: activeOperation
            }) : null,
            activeTab === "configuracao" && permissions.canManageRodadas ? /*#__PURE__*/ jsx_runtime_.jsx(ConfiguracaoTab, {
                user: session.user,
                operation: activeOperation
            }) : null,
            activeTab === "dashboard" ? /*#__PURE__*/ jsx_runtime_.jsx(DashboardTab, {
                operation: activeOperation
            }) : null,
            activeTab === "usuarios" && permissions.canViewUsers ? /*#__PURE__*/ jsx_runtime_.jsx(UsersTab, {}) : null
        ]
    });
}


/***/ }),

/***/ 4807:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ HomePage)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(6786);
// EXTERNAL MODULE: ../../node_modules/next/dist/build/webpack/loaders/next-flight-loader/module-proxy.js
var module_proxy = __webpack_require__(391);
;// CONCATENATED MODULE: ./src/components/app-shell.tsx

const proxy = (0,module_proxy.createProxy)(String.raw`/Users/luanfernandes/nib/estatiistica/apps/web/src/components/app-shell.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;

const e0 = proxy["AppShell"];

;// CONCATENATED MODULE: ./app/page.tsx


function HomePage() {
    return /*#__PURE__*/ jsx_runtime_.jsx(e0, {});
}


/***/ }),

/***/ 4555:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(6944)


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [471,11,993], () => (__webpack_exec__(7283)));
module.exports = __webpack_exports__;

})();