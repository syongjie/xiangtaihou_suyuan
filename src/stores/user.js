/*
 * @Author: pq yxqxq79@gmail.com
 * @Date: 2025-06-25 15:17:12
 * @LastEditors: pq yxqxq79@gmail.com
 * @LastEditTime: 2025-08-28 11:27:04
 * @FilePath: \order2-h5d:\小花\city-payfi\src\stores\user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAddressCounterStore = defineStore('user', {
  state: () => ({
    expiration: '',
    edIdentity: '',
    sessionKey: '',
    signature: '',
    walletPubKeyHex: '',
    userPrincipal: '', //用户的代理身份principal
    userBTCAddress: null,
    finalIdentity: null, // 保存身份对象
    Uintdata: [], // 用普通数组存储 Uint8Array
    USERINFROM: JSON.parse(localStorage.getItem('USERINFO'))  || '', // 用普通数组存储 Uint8Array
  }),
  actions: {
    setuserinfom(value) {
      this.USERINFROM = value
    },
    increment(value) {
      this.expiration = value
    },
    setSessionKey(value) {
      this.sessionKey = value
    },
    setUserAddress(user) {
      this.userBTCAddress = user
    },
    setUserPrincipal(user) {
      this.userPrincipal = user
    },
    setEdIdentity(edIdentity) {
      this.edIdentity = edIdentity
    },
    setSignature(signature) {
      this.signature = signature
    },
    setWalletPubKeyHex(walletPubKeyHex) {
      this.walletPubKeyHex = walletPubKeyHex
    },

    setData(uint8Array) {
      this.Uintdata = Array.from(uint8Array) // 转换为普通数组
    },
    getUint8Array() {
      return new Uint8Array(this.Uintdata) // 将普通数组转换回 Uint8Array
    },
    //推出登录
    setLogoout() {
      this.expiration = ''
      this.Uintdata = ''
      this.walletPubKeyHex = ''
      this.signature = ''
      this.edIdentity = ''
      this.userPrincipal = ''
      this.userBTCAddress = ''
      this.sessionKey = ''
      // 清除 localStorage 和 sessionStorage
      localStorage.clear()
      sessionStorage.clear()
      // 刷新页面
      location.reload()
    },
  },
  persist: true, // 开启持久化
})
