// main.js
/*
 * @Author: pq yxqxq79@gmail.com
 * @Date: 2025-06-23 10:13:29
 * @LastEditors: pq yxqxq79@gmail.com
 * @LastEditTime: 2025-09-01 18:18:39
 * @FilePath: \order2-h5d:\小花\city-payfi\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import './assets/styles/global.css'



import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import i18n from '@/i18n'
import Vant from 'vant'
import 'vant/lib/index.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import 'virtual:svg-icons-register'
import 'virtual:uno.css'
import {formatNumber} from '@/utils/index'
import VSvg from '@/components/VSvg/index.vue'
import Viewer from 'v-viewer';  
import 'viewerjs/dist/viewer.css';

const app = createApp(App)
const pinia = createPinia()

// 注册全局方法
app.config.globalProperties.FROMATNUMBER = formatNumber;

// 正确顺序：先注册插件到 pinia
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

app.component('VSvg', VSvg)

app.use(router)
app.use(ElementPlus)
app.use(i18n)
app.use(Vant)
app.use(Vant.Lazyload)

// 配置 Viewer
Viewer.setDefaults({
  Options: {
    inline: false,
    button: true,
    navbar: true,
    title: false,
    toolbar: true,
    tooltip: true,
    movable: true,
    zoomable: true,
    rotatable: true,
    scalable: true,
    transition: true,
    fullscreen: true,
    keyboard: true,
  }
})
app.use(Viewer)

app.mount('#app')