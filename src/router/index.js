import Vue from 'vue';
import VueRouter from 'vue-router';
import lazyLoadView from '@/router/lazyload-view';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => lazyLoadView(import('@/views/Home.vue'))
	},
	{
		path: '/about',
		name: 'About',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => lazyLoadView(import('@/views/About.vue'))
	}
];

const router = new VueRouter({
	routes
});

export default router;
