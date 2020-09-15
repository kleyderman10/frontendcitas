import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/registrarse',
    name: 'registrarse',
    component:  () => import(/* webpackChunkName: "about" */ '../views/registrarse.vue')
  },
  {
    path: '/asignar',
    name: 'asignar',
    component:  () => import(/* webpackChunkName: "about" */ '../views/asignar.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/especialidades',
    name: 'especialidades',
    component: () => import(/* webpackChunkName: "about" */ '../views/especialidades.vue')
  },
  {
    path: '/olvidarpass',
    name: 'olvidarpass',
    component: () => import(/* webpackChunkName: "about" */ '../views/olvidarpass.vue')
  },
  {
    path: '/agendar',
    name: 'agendar',
    component: () => import(/* webpackChunkName: "about" */ '../views/agendar.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
