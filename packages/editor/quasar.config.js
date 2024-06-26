/* eslint-env node */

/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-js

import { configure } from 'quasar/wrappers';
import dotenv from 'dotenv';

dotenv.config();
console.log(process.env);

export default configure(function (/* ctx */) {
	return {
		eslint: {
			// fix: true,
			// include = [],
			// exclude = [],
			// rawOptions = {},
			warnings: true,
			errors: true
		},

		// https://v2.quasar.dev/quasar-cli-vite/prefetch-feature
		preFetch: true,

		// app boot file (/src/boot)
		// --> boot files are part of "main.js"
		// https://v2.quasar.dev/quasar-cli-vite/boot-files
		boot: ['i18n', 'smartEnginEntrance', 'bytetrade-ui'],

		// https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#css
		css: ['app.scss'],

		// https://github.com/quasarframework/quasar/tree/dev/extras
		extras: [
			// 'ionicons-v4',
			// 'mdi-v5',
			// 'fontawesome-v6',
			// 'eva-icons',
			// 'themify',
			// 'line-awesome',
			// 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

			'roboto-font', // optional, you are not bound to it
			'material-icons' // optional, you are not bound to it
		],

		// Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#build
		build: {
			target: {
				browser: ['es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
				node: 'node16'
			},

			vueRouterMode: 'history', // available values: 'hash', 'history'
			// vueRouterBase,
			// vueDevtools,
			// vueOptionsAPI: false,

			// rebuildCache: true, // rebuilds Vite/linter/etc cache on startup

			// publicPath: '/',
			// analyze: true,
			env: {
				ACTION: process.env.ACTION,
				URL: process.env.URL,
				WS_URL: process.env.WS_URL
			}
			// rawDefine: {}
			// ignorePublicFolder: true,
			// minify: false,
			// polyfillModulePreload: true,
			// distDir

			// extendViteConf (viteConf) {},
			// viteVuePluginOptions: {},

			// vitePlugins: [
			//   [ 'package-name', { ..options.. } ]
			// ]
		},

		// Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#devServer
		devServer: {
			https: true,
			host: process.env.DEV_DOMAIN || 'localhost',
			port: 9100,
			proxy: {
				// proxy all requests starting with /api to the backend server
				'/api': {
					target: `https://profile.${process.env.ACCOUNT}.myterminus.com`,
					changeOrigin: true,
					pathRewrite: {
						'^/api': ''
					}
				},
				// '/bfl': {
				//   target: 'https://profile.zyh2433219116.snowinning.com/',
				//   changeOrigin: true,
				//   pathRewrite: {
				//     '^/bfl': '',
				//   },
				// },
				// '/sign': {
				//   target: 'http://127.0.0.1:3190',
				//   changeOrigin: true,
				//   pathRewrite: {
				//     '^/sign': 'sign',
				//   },
				// },
				'/socket.io': {
					target: 'ws://localhost:9100',
					ws: true
				}
			},
			open: true // opens browser window automatically
			// hmr: {
			// 	port: 9100,
			// 	clientPort: 443,
			// 	path: '/socket.io'
			// }
		},

		// https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#framework
		framework: {
			config: {
				dark: 'auto'
			},

			// iconSet: 'material-icons', // Quasar icon set
			// lang: 'en-US', // Quasar language pack

			// For special cases outside of where the auto-import strategy can have an impact
			// (like functional components as one of the examples),
			// you can manually specify Quasar components/directives to be available everywhere:
			//
			// components: [],
			// directives: [],

			// Quasar plugins
			plugins: ['Notify', 'Dialog', 'Loading']
		},

		// animations: 'all', // --- includes all animations
		// https://v2.quasar.dev/options/animations
		animations: [],

		// https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#sourcefiles
		// sourceFiles: {
		//   rootComponent: 'src/App.vue',
		//   router: 'src/router/index',
		//   store: 'src/store/index',
		//   registerServiceWorker: 'src-pwa/register-service-worker',
		//   serviceWorker: 'src-pwa/custom-service-worker',
		//   pwaManifestFile: 'src-pwa/manifest.json',
		//   electronMain: 'src-electron/electron-main',
		//   electronPreload: 'src-electron/electron-preload'
		// },

		// https://v2.quasar.dev/quasar-cli-vite/developing-pwa/configuring-pwa
		pwa: {
			workboxMode: 'generateSW', // or 'injectManifest'
			injectPwaMetaTags: true,
			swFilename: 'sw.js',
			manifestFilename: 'manifest.json',
			useCredentialsForManifestTag: false
			// useFilenameHashes: true,
			// extendGenerateSWOptions (cfg) {}
			// extendInjectManifestOptions (cfg) {},
			// extendManifestJson (json) {}
			// extendPWACustomSWConf (esbuildConf) {}
		},

		// Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-cordova-apps/configuring-cordova
		cordova: {
			// noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
		},

		// Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-capacitor-apps/configuring-capacitor
		capacitor: {
			hideSplashscreen: true
		},

		// Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/configuring-electron
		electron: {
			// extendElectronMainConf (esbuildConf)
			// extendElectronPreloadConf (esbuildConf)

			inspectPort: 5858,

			bundler: 'packager', // 'packager' or 'builder'

			packager: {
				// https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
				// OS X / Mac App Store
				// appBundleId: '',
				// appCategoryType: '',
				// osxSign: '',
				// protocol: 'myapp://path',
				// Windows only
				// win32metadata: { ... }
			},

			builder: {
				// https://www.electron.build/configuration/configuration

				appId: 'editor'
			}
		},

		// Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-browser-extensions/configuring-bex
		bex: {
			contentScripts: ['my-content-script']

			// extendBexScriptsConf (esbuildConf) {}
			// extendBexManifestJson (json) {}
		}
	};
});
