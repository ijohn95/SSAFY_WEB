import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login.vue";
import Main from "../views/Main.vue";
import Signup from "../views/Signup.vue";
import Post from "../views/Post.vue";
import Detail from "../views/Detail.vue";
import Weather from "../views/Weather.vue";

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path:"/signup",
    name:"Signup",
    component: Signup,
  },
  {
    path:"/login",
    name:"Login",
    component: Login,
  },
  {
    path: '/main',
    name: 'Main',
    component: Main
  },
  {
    path:"/post",
    name:"Post",
    component: Post,
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: Detail
  },
  {
    path: '/weather',
    name: 'Weather',
    component: Weather
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
