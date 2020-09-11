import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Write from '../views/Write.vue'
import Article from '../views/Article.vue'
import User from '../views//User.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Home,
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/write',
    name: 'write',
    component: Write
  },
  {
    path: '/article/:id',
    name: 'article',
    component: Article
  },
  {
    path: '/user/:id',
    name: 'user',
    component: User
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
