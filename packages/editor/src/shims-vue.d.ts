/* eslint-disable */

/// <reference types="vite/client" />

// Mocks all files ending in `.vue` showing them as plain Vue instances
declare module '*.vue' {
	import type { DefineComponent } from 'vue';
	const component: DefineComponent<{}, {}, any>;
	export default component;
}

// declare module '@bytetrade/uploader' {
//   const Uploader: any;
//   export { Uploader };
// }

// declare module 'Upload' {
//   import Vue from 'vue';
//   export default Vue;
// }
