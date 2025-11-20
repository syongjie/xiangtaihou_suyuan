/*
 * @Author: pq yxqxq79@gmail.com
 * @Date: 2025-07-22 16:10:30
 * @LastEditors: pq yxqxq79@gmail.com
 * @LastEditTime: 2025-09-03 18:26:37
 * @FilePath: \DCBBPrivate\src\i18n\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createI18n } from 'vue-i18n'
import zh from './locales/zh.json'
import en from './locales/en.json'
import ko from './locales/ko.json'
// import ja from './locales/ja.json'
import th from './locales/th.json'
import zhTW from './locales/zh-TW.json'

const savedLocale = localStorage.getItem('locale') || 'en'

const messages = {
  zh,
  'zh-TW': zhTW,
  en,
  ko,
  // ja,
  th
}

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'en',
  messages // 语言包
})

export default i18n
