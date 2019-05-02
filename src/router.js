import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Home from '@/components/Home'
import StudentHome from '@/components/student/Index'
import Submit from '@/components/student/Submit'
import Statistics from '@/components/student/Statistics'
import AdminHome from '@/components/admin/Index'
import StudentManage from '@/components/admin/StudentManage'

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
      component: AdminHome,
      children:[
        {
          path: 'StudentManage',
          component: StudentManage
        }
      ]
    },
    {
      path: '/student',
      name: 'student/index',
      component: StudentHome,
      children:[
        {
          path: 'Submit',
          component: Submit
        },
        {
          path: 'Statistics',
          component: Statistics
        }
      ]
    }
  ]
})
