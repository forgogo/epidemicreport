// 1. 引入vue
import Vue from 'vue'
// 2. 引入 vue-router
import VueRouter from 'vue-router'


import index from '@/views/index.vue'
//使用
Vue.use(VueRouter)
//创建路由对象，进行路由配置
var router = new VueRouter({
    routes: [
        {
            name: 'index',
            path: '/',
            component: index
        }
    ]
})
//5暴露
export default router