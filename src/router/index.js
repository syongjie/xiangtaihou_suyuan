/*
 * @Author: pq yxqxq79@gmail.com
 * @Date: 2025-07-10 12:01:42
 * @LastEditors: pq yxqxq79@gmail.com
 * @LastEditTime: 2025-09-16 17:20:28
 * @FilePath: \order2-h5d:\小花\citypay-H5-PC\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// router/index.js
// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import TraceResult from '../views/TraceResult.vue'

const routes = [
  {
    path: '/',
    name: 'TraceResult',
    component: TraceResult,
    props: { productId: 'NX20230615' } // 设置默认产品ID作为首页
  },
  {
    path: '/trace/:productId',
    name: 'TraceResultWithId',
    component: TraceResult,
    props: true
  },
  {
    path: '/:pathMatch(.*)*', // 404 页面处理
    redirect: '/'  
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router