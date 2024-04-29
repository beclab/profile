import { RouteRecordRaw } from 'vue-router';

const editor: RouteRecordRaw[] = [
	{
		path: '/',
		component: () => import('layouts/MainLayout.vue'),
		children: [{ path: '', component: () => import('pages/IndexPage.vue') }]
	},

	// Always leave this as last one,
	// but you can also remove it
	{
		path: '/:catchAll(.*)*',
		component: () => import('pages/ErrorNotFound.vue')
	}
];

const preview: RouteRecordRaw[] = [
	{
		path: '/',
		component: () => import('layouts/PreviewLayout.vue')
	},

	// Always leave this as last one,
	// but you can also remove it
	{
		path: '/:catchAll(.*)*',
		component: () => import('pages/ErrorNotFound.vue')
	}
];

let routes: RouteRecordRaw[] = [];

if (process.env.ACTION == 'EDITOR') {
	routes = [...routes, ...editor];
} else if (process.env.ACTION == 'PREVIEW') {
	routes = [...routes, ...preview];
}

export default routes;
