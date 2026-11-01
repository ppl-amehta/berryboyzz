export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.svg","story/frame-1-seed.jpg","story/frame-2-sprout.jpg","story/frame-3-canopy.jpg","story/frame-4-bloom.jpg","story/frame-5-ripening.jpg","story/frame-6-harvest.jpg","story/frame-7-punnet.jpg"]),
	mimeTypes: {".svg":"image/svg+xml",".jpg":"image/jpeg"},
	_: {
		client: {start:"_app/immutable/entry/start.mx9EQK8K.js",app:"_app/immutable/entry/app.Dv6w4RN_.js",imports:["_app/immutable/entry/start.mx9EQK8K.js","_app/immutable/chunks/CtZbMJ-r.js","_app/immutable/chunks/Hq2qUmNQ.js","_app/immutable/chunks/CYgJF_JY.js","_app/immutable/chunks/Uu66Es8v.js","_app/immutable/entry/app.Dv6w4RN_.js","_app/immutable/chunks/Hq2qUmNQ.js","_app/immutable/chunks/B4y1bmBq.js","_app/immutable/chunks/CDFQNSq5.js","_app/immutable/chunks/Uu66Es8v.js","_app/immutable/chunks/CV961vCQ.js","_app/immutable/chunks/orRXP5gy.js","_app/immutable/chunks/BOtSEiv5.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/whatsapp-webhook",
				pattern: /^\/api\/whatsapp-webhook\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/whatsapp-webhook/_server.ts.js'))
			},
			{
				id: "/cultivars",
				pattern: /^\/cultivars\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/cultivars/[slug]",
				pattern: /^\/cultivars\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/tours",
				pattern: /^\/tours\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/tours/[slug]",
				pattern: /^\/tours\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
