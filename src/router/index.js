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
    component: () => lazyLoadView(import('@/views/About/Index.vue'))
  },
  {
    path: '/shop',
    name: 'Shop',
    component: () => lazyLoadView(import('@/views/Shop/Index.vue'))
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => lazyLoadView(import('@/views/Cart/Index.vue'))
  },
  {
    path: '/FAQ',
    name: 'FAQ',
    component: () => lazyLoadView(import('@/views/Faq/Index.vue'))
  }
];

const router = new VueRouter({
  routes
});

export default router;
