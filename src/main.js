import Vue from 'vue'
import App from './App.vue'
import Vant from 'vant'
import echarts from "echarts";
import 'echarts/map/js/china'
Vue.prototype.$echarts = echarts;


import router from '@/router'

import  '@/styles/reset.css'

import 'vant/lib/index.css';

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
