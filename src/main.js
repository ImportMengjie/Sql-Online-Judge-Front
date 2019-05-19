import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
Vue.component('v-chart', ECharts)

Vue.config.productionTip = false

Vue.prototype.$axios = axios;
axios.defaults.baseURL = 'http://127.0.0.1:5000';
Vue.use(VueAxios,axios);

Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
  if(store.getters.Usertype==='admin' && !to.path.includes('admin')){
    next('/admin')
  }
  else if(store.getters.Usertype==='student' && !to.path.includes('student')){
    next('/student')
  }
  else if(!to.path.includes('home') && store.getters.Usertype==='')
    next('/home')
  else
    next()

})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
