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
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js'))
		],
		routes: [
			{
				id: "/api/whatsapp-webhook",
				pattern: /^\/api\/whatsapp-webhook\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/whatsapp-webhook/_server.ts.js'))
			}
		],
		prerendered_routes: new Set(["/","/cultivars/","/tours/","/cultivars/raspberry/","/tours/harvest-visit/","/tours/study-tour/","/cultivars/blackberry/","/cultivars/mulberry/","/cultivars/blueberry/","/cultivars/strawberry/","/tours/join-hands-workshop/","/tours/farming-seminar/","/tours/value-added-workshop/"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
