import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import testView from '../views/testjeonView.vue'
import adminView from '../views/admin/AdminMainView.vue'
import CartView from '../views/product/CartView.vue'
import loginView from '../views/loginView.vue'
import userJoinView from '../views/userJoinView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/notice',
    name: 'notice',
    component: testView
  },
  {
    path: '/admin',
    name: 'admin',
    component: adminView
  },
    path: '/cart',
    name: 'cart',
    component: CartView
  },
  {
    path: '/login',
    name: 'login',
    component: loginView
  },
  {
    path: '/userJoin',
    name: 'userJoin',
    component: userJoinView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
