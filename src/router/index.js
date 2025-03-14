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
      },
      {
        path: 'product/:id',
        component: () => import('../views/client/ProductView.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
