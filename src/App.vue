<script setup lang="ts">
import { computed, ref } from 'vue'
import zhCN from 'element-plus/es/locale/lang/zh-cn.mjs'
import en from 'element-plus/es/locale/lang/en.mjs'

const locale = ref('zh')
const elementLocale = computed(() => {
  return locale.value === 'zh' ? zhCN : en
})
</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>


<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background-color: #f5f5f5;
}

#app {
  min-height: 100vh;
}
</style>
