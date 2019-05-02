import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Home from '@/components/Home'
import StudentHome from '@/components/student/Index'
import AdminHome from '@/components/admin/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/admin',
      name: 'admin/index',
      component: AdminHome
    },
    {
      path: '/student',
      name: 'student/index',
      component: StudentHome
    }
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
