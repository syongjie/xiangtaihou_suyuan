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
        <div
          class=" flex justify-center items-center bg-[#FF8E25] px-[36px] h-[40px] rounded-[8px] cursor-pointer ml-[30px]">
          <span class="c-white tracking-[2px] " v-if="!useAddressCounter.userPrincipal" @click="LOGO">连接钱包</span>
          <span class="c-white tracking-[2px]" v-if="useAddressCounter.userPrincipal" @click="LOGOOUT">{{
            formatStringWithPlaceholder(walletAddres) }}</span>
        </div>
      </div>
    </div>
  </div>
  <VWalletDialog ref="walletDialogRef" />
</template>

<script setup>
defineOptions({
  name: 'VMenu',
})
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import VWalletDialog from '@/components/VWalletDialog/index.vue'
import useWeb3 from '@/hooks/useWeb3.js'
const { captionAccount, contractLogin, formatStringWithPlaceholder } = useWeb3()
const router = useRouter()
const route = useRoute()
import { useAddressCounterStore } from '@/stores/user.js'
import { ElMessageBox, ElMessage, ElLoading } from 'element-plus'

const useAddressCounter = useAddressCounterStore()
const walletDialogRef = ref()
const walletAddres = computed(() => {
  return useAddressCounter.userPrincipal;
});
//点击登录
const LOGO = async () => {
  const loadingInstance = ElLoading.service({ fullscreen: true, text: 'Loading...', background: 'rgba(122, 122, 122, 0.8)' })
  await contractLogin();
  loadingInstance.close()
}
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
//点击推出登录
const LOGOOUT = async () => {
  ElMessageBox.confirm('你确定要退出登录吗？', '', {
    confirmButtonText: '确定退出', // 自定义确定按钮文字
    cancelButtonText: '取消操作',  // 自定义取消按钮文字
    type: 'warning',               // 提示框类型，可选（如 warning、success、info、error）
  })
    .then(() => {
      useAddressCounter.setLogoout()
    })
    .catch(() => {
      // catch error
    })
}
const onClick = (item) => {
  if (!useAddressCounter.userPrincipal) return ElMessage({
    message: '请先登录',
    type: 'warning',
  })
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
