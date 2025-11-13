/*
 * @Author: pq yxqxq79@gmail.com
 * @Date: 2025-06-25 15:17:12
 * @LastEditors: pq yxqxq79@gmail.com
 * @LastEditTime: 2025-08-28 11:27:04
 * @FilePath: \order2-h5d:\小花\city-payfi\src\stores\user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from 'pinia'

export const useAddressCounterStore = defineStore('user', {
  state: () => ({
    USERINFROM: JSON.parse(localStorage.getItem('USERINFO'))  || {},
  }),
  actions: {
    setuserinfom(value) {
      this.USERINFROM = value
    },
    // 退出登录
    setLogoout() {
      this.USERINFROM = {}
      // 清除 localStorage 和 sessionStorage
      localStorage.clear()
      sessionStorage.clear()
      // 刷新页面
      location.reload()
    },
  },
  persist: true, // 开启持久化
})
