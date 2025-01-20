import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import(/* webpackChunkName: "signin" */ '../views/SigninView.vue'),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/DashboardView.vue'),
    children: [
      {
        path: 'products',
        component: () => import(/* webpackChunkName: "products" */ '../views/ProductsView.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/OrdersView.vue'),
      },
      {
        path: 'coupons',
        component: () => import('../views/CouponsView.vue'),
      },
    ],
  },
  {
    path: '/user',
    component: () => import('../views/UserboardView.vue'),
    children: [
      {
        path: 'cart',
        component: () => import('../views/UserCartView.vue'),
      },
      {
        path: 'product/:productId',
        component: () => import('../views/UserProductView.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
