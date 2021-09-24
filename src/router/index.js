import Vue from 'vue';
import VueRouter from 'vue-router';
import lazyLoadView from '@/router/lazyload-view';

Vue.use(VueRouter);

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: () => lazyLoadView(import('@/views/Home/Index.vue'))
  // },
  {
    path: '/',
    name: 'About',
    component: () => lazyLoadView(import('@/views/About/Index'))
  },
  {
    path: '/shop',
    name: 'Shop',
    component: () => lazyLoadView(import('@/views/Shop/Index'))
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => lazyLoadView(import('@/views/Cart/Index'))
  },
  {
    path: '/FAQ',
    name: 'Faq',
    component: () => lazyLoadView(import('@/views/Faq/Index'))
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => lazyLoadView(import('@/views/Checkout/Index'))
  },
  {
    path: '*',
    component: () => import('../views/404')
  }
];

const router = new VueRouter({
  routes
});

export default router;
