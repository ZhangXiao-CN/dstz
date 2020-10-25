import Vue from 'vue'
import VueRouter from 'vue-router'

// import Home from '../views/Home.vue'
const Home = () => import(/* webpackChunkName: "group-Home" */ '../views/Home.vue')
// import Write from '../views/Write.vue'
const Write = () => import(/* webpackChunkName: "group-Write" */ '../views/Write.vue')
// import Article from '../views/Article.vue'
const Article = () => import(/* webpackChunkName: "group-Article" */ '../views/Article.vue')
// import User from '../views//User.vue'
const User = () => import(/* webpackChunkName: "group-User" */ '../views//User.vue')
const Message = () => import(/* webpackChunkName: "group-Message" */ '../views//Message.vue')

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
  },
  {
    path: '/message/',
    name: 'message',
    component: Message
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
