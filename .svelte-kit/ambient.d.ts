
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const WHATSAPP_PHONE_NUMBER_ID: string;
	export const WHATSAPP_BUSINESS_ACCOUNT_ID: string;
	export const WHATSAPP_ACCESS_TOKEN: string;
	export const WHATSAPP_VERIFY_TOKEN: string;
	export const WHATSAPP_API_VERSION: string;
	export const VERCEL_OIDC_TOKEN: string;
	export const ANTIGRAVITY_AGENT: string;
	export const NVM_INC: string;
	export const NODE: string;
	export const ANTIGRAVITY_CONVERSATION_ID: string;
	export const JJ_EDITOR: string;
	export const INIT_CWD: string;
	export const NVM_CD_FLAGS: string;
	export const TERM: string;
	export const SHELL: string;
	export const ANTIGRAVITY_GEMINI_DIR: string;
	export const JJ_PAGER: string;
	export const HOMEBREW_REPOSITORY: string;
	export const TMPDIR: string;
	export const npm_config_global_prefix: string;
	export const ANTIGRAVITY_APP_DATA_DIR: string;
	export const FPATH: string;
	export const ANTIGRAVITY_PLUGIN_SHIM_DIR: string;
	export const COLOR: string;
	export const npm_config_noproxy: string;
	export const npm_config_local_prefix: string;
	export const GIT_EDITOR: string;
	export const NVM_DIR: string;
	export const USER: string;
	export const COMMAND_MODE: string;
	export const npm_config_globalconfig: string;
	export const SSH_AUTH_SOCK: string;
	export const __CF_USER_TEXT_ENCODING: string;
	export const npm_execpath: string;
	export const PAGER: string;
	export const DEFAULT_FAST_MODEL: string;
	export const DEFAULT_CODING_MODEL: string;
	export const ANTIGRAVITY_LS_VERSION: string;
	export const AGY_BROWSER_WS_URL: string;
	export const PATH: string;
	export const ZSH_TMUX_AUTOSTART: string;
	export const npm_package_json: string;
	export const _: string;
	export const ANTIGRAVITY_CREDENTIAL_SCOPE: string;
	export const npm_config_userconfig: string;
	export const npm_config_init_module: string;
	export const HGEDITOR: string;
	export const __CFBundleIdentifier: string;
	export const npm_command: string;
	export const PWD: string;
	export const ANTIGRAVITY_SOURCE_METADATA: string;
	export const DISABLE_AUTO_UPDATE: string;
	export const npm_lifecycle_event: string;
	export const EDITOR: string;
	export const npm_package_name: string;
	export const LANG: string;
	export const npm_config_npm_version: string;
	export const XPC_FLAGS: string;
	export const ANTIGRAVITY_CSRF_TOKEN: string;
	export const ZSH_TMUX_AUTOSTARTED: string;
	export const npm_config_node_gyp: string;
	export const npm_package_version: string;
	export const XPC_SERVICE_NAME: string;
	export const GEMINI_API_KEY: string;
	export const SHLVL: string;
	export const HOME: string;
	export const ANTIGRAVITY_TRAJECTORY_ID: string;
	export const ANTIGRAVITY_LS_ADDRESS: string;
	export const CHROME_DEVTOOLS_MCP_JS: string;
	export const HOMEBREW_PREFIX: string;
	export const OPENCODE_MODEL: string;
	export const npm_config_cache: string;
	export const LOGNAME: string;
	export const npm_lifecycle_script: string;
	export const ANTIGRAVITY_AGENTAPI_EXE: string;
	export const NVM_BIN: string;
	export const npm_config_user_agent: string;
	export const ANTIGRAVITY_PROJECT_ID: string;
	export const INFOPATH: string;
	export const HOMEBREW_CELLAR: string;
	export const ANTIGRAVITY_CONFIG_REL_DIR: string;
	export const OSLogRateLimit: string;
	export const GIT_PAGER: string;
	export const AGY_BROWSER_ACTIVE_PORT_FILE: string;
	export const npm_node_execpath: string;
	export const npm_config_prefix: string;
	export const NODE_ENV: string;
}

/**
 * Similar to [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		WHATSAPP_PHONE_NUMBER_ID: string;
		WHATSAPP_BUSINESS_ACCOUNT_ID: string;
		WHATSAPP_ACCESS_TOKEN: string;
		WHATSAPP_VERIFY_TOKEN: string;
		WHATSAPP_API_VERSION: string;
		VERCEL_OIDC_TOKEN: string;
		ANTIGRAVITY_AGENT: string;
		NVM_INC: string;
		NODE: string;
		ANTIGRAVITY_CONVERSATION_ID: string;
		JJ_EDITOR: string;
		INIT_CWD: string;
		NVM_CD_FLAGS: string;
		TERM: string;
		SHELL: string;
		ANTIGRAVITY_GEMINI_DIR: string;
		JJ_PAGER: string;
		HOMEBREW_REPOSITORY: string;
		TMPDIR: string;
		npm_config_global_prefix: string;
		ANTIGRAVITY_APP_DATA_DIR: string;
		FPATH: string;
		ANTIGRAVITY_PLUGIN_SHIM_DIR: string;
		COLOR: string;
		npm_config_noproxy: string;
		npm_config_local_prefix: string;
		GIT_EDITOR: string;
		NVM_DIR: string;
		USER: string;
		COMMAND_MODE: string;
		npm_config_globalconfig: string;
		SSH_AUTH_SOCK: string;
		__CF_USER_TEXT_ENCODING: string;
		npm_execpath: string;
		PAGER: string;
		DEFAULT_FAST_MODEL: string;
		DEFAULT_CODING_MODEL: string;
		ANTIGRAVITY_LS_VERSION: string;
		AGY_BROWSER_WS_URL: string;
		PATH: string;
		ZSH_TMUX_AUTOSTART: string;
		npm_package_json: string;
		_: string;
		ANTIGRAVITY_CREDENTIAL_SCOPE: string;
		npm_config_userconfig: string;
		npm_config_init_module: string;
		HGEDITOR: string;
		__CFBundleIdentifier: string;
		npm_command: string;
		PWD: string;
		ANTIGRAVITY_SOURCE_METADATA: string;
		DISABLE_AUTO_UPDATE: string;
		npm_lifecycle_event: string;
		EDITOR: string;
		npm_package_name: string;
		LANG: string;
		npm_config_npm_version: string;
		XPC_FLAGS: string;
		ANTIGRAVITY_CSRF_TOKEN: string;
		ZSH_TMUX_AUTOSTARTED: string;
		npm_config_node_gyp: string;
		npm_package_version: string;
		XPC_SERVICE_NAME: string;
		GEMINI_API_KEY: string;
		SHLVL: string;
		HOME: string;
		ANTIGRAVITY_TRAJECTORY_ID: string;
		ANTIGRAVITY_LS_ADDRESS: string;
		CHROME_DEVTOOLS_MCP_JS: string;
		HOMEBREW_PREFIX: string;
		OPENCODE_MODEL: string;
		npm_config_cache: string;
		LOGNAME: string;
		npm_lifecycle_script: string;
		ANTIGRAVITY_AGENTAPI_EXE: string;
		NVM_BIN: string;
		npm_config_user_agent: string;
		ANTIGRAVITY_PROJECT_ID: string;
		INFOPATH: string;
		HOMEBREW_CELLAR: string;
		ANTIGRAVITY_CONFIG_REL_DIR: string;
		OSLogRateLimit: string;
		GIT_PAGER: string;
		AGY_BROWSER_ACTIVE_PORT_FILE: string;
		npm_node_execpath: string;
		npm_config_prefix: string;
		NODE_ENV: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
