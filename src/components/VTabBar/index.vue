<template>
  <van-tabbar
    v-model="active"
    :border="false"
    placeholder
    inactive-color="#585897"
    active-color="#E5E5F9"
    @change="onClick"
  >
    <van-tabbar-item
      v-for="v in navList"
      :key="v.key"
      :name="v.path"
    >
      <span>{{ v.name }}</span>
      <template #icon="props">
        <v-svg
          :name="v.icon"
          :fill="props.active ? 'white' : '#585897'"
          width="20"
          height="20"
        />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
defineOptions({
  name: 'VTabBar',
})
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const active = ref(route.path)
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

const onClick = (path) => {
  if (!path) return
  router.push(path)
}
</script>

<style scoped lang="scss">
:deep(.van-tabbar) {
  background: transparent;
  backdrop-filter: blur(20px);
  .van-tabbar-item--active {
    background: transparent;
  }
}
</style>
