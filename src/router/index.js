import store from '@/store';
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: 'order/:id',
        name:'Order',
        component: ()=> import('@/views/OrderDetails.vue'),
        beforeEnter: (to, from, next) => {
          if (!store.getters['orders/GET_ORDERS']) {
            store.dispatch('orders/FETCH_ALL_ORDERS').then(() => {
              next();
            });
          } else {
            next();
          }
        },
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
