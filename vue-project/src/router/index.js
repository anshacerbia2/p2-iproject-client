import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'
import CartView from '../views/CartView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/product/:id',
      name: 'product',
      component: ProductDetailView
    },
    {
      path: '/mycart',
      name: 'mycart',
      component: CartView
    },
  ]
})

router.beforeEach((to, from, next) => {
  const access_token = localStorage.getItem('access_token')
  if ((to.name === 'mycart' || to.name === 'product') && !access_token) next({ name: 'login' })
  else if ((to.name === 'login' || to.name === 'register') && access_token) next({ name: 'home' })
  else next()
});

export default router
