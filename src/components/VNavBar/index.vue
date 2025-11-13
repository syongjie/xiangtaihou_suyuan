<!--
 * @Author: pq yxqxq79@gmail.com
 * @Date: 2025-06-23 10:13:29
 * @LastEditors: pq yxqxq79@gmail.com
 * @LastEditTime: 2025-07-18 18:02:43
 * @FilePath: \order2-h5d:\小花\city-payfi\src\components\VNavBar\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <van-nav-bar :border="false" fixed placeholder z-index='9'>
    <template #title>
      <div class="flex items-center " >
        <img src="@/assets/imgs/logo-icon.png" alt="" class="w-[32px] h-[32px] mr-3" @click="router.push('/')">
        <van-search placeholder="搜索代币" v-model="searchValue" background="transparent" shape="round" @search="onSearch" />
      </div>
    </template>
  </van-nav-bar>
</template>

<script setup>
defineOptions({
  name: 'VNavBar'
})
import { useRouter } from 'vue-router'
import { ref, defineEmits} from 'vue'
const router = useRouter()
const searchValue = ref('');

const emit = defineEmits(["searchTokens"]);
const onSearch =  () => {
  emit('searchTokens',searchValue.value); 
}
</script>

<style scoped lang="scss">
:deep(.van-nav-bar) {
  background-color: #01010F;
  backdrop-filter: blur(8px);

  .van-nav-bar__title {
    max-width: none;
    width: 92%;
  }

  .van-icon {
    color: #8486A7;
  }
}

:deep(.van-search) {
  padding: 0;
  width: 100%;

  .van-search__content {
    background-color: #FFF5EA;
    font-size: 12px;
  }
}
</style>
