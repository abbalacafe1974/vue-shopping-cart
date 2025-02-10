import { createRouter, createWebHashHistory } from 'vue-router';
// import HomeView from '../views/client/HomeView.vue';

const routes = [
  {
    path: '/',
    redirect: 'home',
    component: () => import('../views/client/FrontView.vue'),
    children: [
      {
        path: 'home',
        component: () => import('../views/client/HomeView.vue'),
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import('../views/client/ProductsView.vue'),
        meta: {
          breadcrumb: [{
            name: '首頁',
            link: '/',
          },
          {
            name: '景點列表',
          }],
        },
      },
      {
        path: 'product/:id',
        component: () => import('../views/client/ProductView.vue'),
        meta: {
          breadcrumb: [{
            name: '首頁',
            link: '/',
          },
          {
            name: '景點列表',
            link: '/products',
          }],
        },
      },
      {
        path: 'cart',
        component: () => import('../views/client/CartView.vue'),
        meta: {
          breadcrumb: [{
            name: '首頁',
            link: '/',
          },
          {
            name: '購物車',
          }],
        },
      },
      {
        path: 'checkout',
        redirect: '/checkout/order',
        component: () => import('../views/client/CheckOutView.vue'),
        children: [
          {
            path: 'order',
            component: () => import('../views/client/OrderView.vue'),
          },
          {
            path: 'pay/:id',
            component: () => import('../views/client/PayView.vue'),
          },
          {
            path: 'payed/:id',
            component: () => import('../views/client/PayedView.vue'),
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active',
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' };
  },
});

export default router;
