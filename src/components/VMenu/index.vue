<template>
  <div class="w-full h-[80px]"></div>
  <div class="w-full h-[80px] bg-opacity-40 backdrop-blur fixed top-0 left-0 right-0 z-99 flex justify-center">
    <div class="w-[1500px] px-[30px] flex items-center justify-between">
      <div class="flex items-center">
        <img src="@/assets/logo.png" class="h-[32px] w-[123px] cursor-pointer" alt="" @click="router.push('/')" />
      </div>
      <div class="flex items-center">
        <ul class="flex flex-1 justify-evenly mr-[20px]">
          <li v-for="v in navList" :key="v.key" class="mx-[30px] cursor-pointer flex flex-col items-center"
            @click="onClick(v)">
            <div class="flex items-center">
              <v-svg :name="v.icon" width="16" height="16" :fill="route.path === v.path ? 'white' : '#585897'" />
              <span class="ml-1" :class="route.path === v.path ? 'c-white' : 'c-[#585897]'">{{ v.name }}</span>
            </div>
          </li>
        </ul>
        <img src="@/assets/imgs/language.png" class="w-[16px] h-[16px] cursor-pointer" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'VMenu',
})
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const navList = computed(() => {
  return [
    {
      key: '1',
      name: '交易',
      icon: 'menu-1',
      path: '/trade',
    },
    {
      key: '2',
      name: '映射',
      icon: 'menu-2',
      path: '/shineUpon',
    },
    {
      key: '3',
      name: '流动性',
      icon: 'menu-3',
      path: '/fluidity',
    },
    {
      key: '4',
      name: '发币',
      icon: 'menu-4',
      path: '/coinIssuance',
    },
    {
      key: '5',
      name: '我的',
      icon: 'menu-5',
      path: '/my',
    },
  ]
})
const onClick = (item) => {
  if (!item.path) return
  router.push(item.path)
}
</script>

<style scoped lang="scss">
.btn {
  background: linear-gradient(180deg, #4f84ff 0%, #3c42ff 100%);
  box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.25);
}
</style>
