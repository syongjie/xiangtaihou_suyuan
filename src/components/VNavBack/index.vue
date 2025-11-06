<template>
  <van-nav-bar
    :border="false"
    fixed
    placeholder
    left-arrow
    :z-index="10"
    v-bind="$attrs"
    @click-left="router.back()"
  >
    <template #left>
      <el-icon color="#fff" size="20"><Back /></el-icon>
    </template>
  </van-nav-bar>
</template>

<script setup>
defineOptions({
  name: 'VNavBack'
})
import { useRouter } from 'vue-router'
import { Back } from '@element-plus/icons-vue'

const router = useRouter()
</script>

<style scoped lang="scss">
:deep(.van-nav-bar) {
  background-color: transparent;
  backdrop-filter: blur(8px);
  .van-nav-bar__title{
    max-width: none;
    width: 92%;
    color: #ffffff;
    font-weight: normal;
    text-align: left;
    padding: 0 30px;
  }
}
</style>
