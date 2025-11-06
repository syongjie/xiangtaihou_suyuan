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
        <img src="@/assets/imgs/language.png" alt="" class="w-[16px] h-[16px] mx-3">
        <!-- @click="walletDialogRef.open()" -->
        <div class="bg-[#FF8E25]  flex justify-center items-center h-[33px] cursor-pointer px-[10px]">
          <span class="c-white tracking-[2px] text-xs" v-if="!useAddressCounter.userPrincipal" @click="LOGO">连接钱包</span>
          <span class="c-white tracking-[2px] text-xs" v-if="useAddressCounter.userPrincipal" @click="LOGOOUT">{{
           formatStringWithPlaceholder(walletAddres)  }}</span>
        </div>
        <!--        <div class="flex items-center">-->
        <!--          <img src="@/assets/imgs/qhqb.png" alt="" class="w-[24px] h-[24px]">-->
        <!--          <span class="text-sm c-white mx-2">Wallet</span>-->
        <!--          <img src="@/assets/imgs/sxjt.png" alt="" class="w-[8px] h-[8px]">-->
        <!--        </div>-->
      </div>
    </template>
  </van-nav-bar>

  <VWalletDialog ref="walletDialogRef" />
</template>

<script setup>
defineOptions({
  name: 'VNavBar'
})
import { useRouter } from 'vue-router'
import { ref, onMounted, watch, computed ,defineEmits} from 'vue'
import VWalletDialog from '@/components/VWalletDialog/index.vue'
import { ElMessageBox,ElLoading } from 'element-plus'
import useWeb3 from '@/hooks/useWeb3.js'
const { formatStringWithPlaceholder, contractLogin } = useWeb3()
import { useAddressCounterStore } from '@/stores/user.js'
const useAddressCounter = useAddressCounterStore()
const router = useRouter()
const walletDialogRef = ref();
const searchValue = ref('');

const emit = defineEmits(["searchTokens"]);
const onSearch =  () => {
  emit('searchTokens',searchValue.value); 
}
const walletAddres = computed(() => {
  return useAddressCounter.userPrincipal;
});
// 监听 computed 的值
watch(
  walletAddres,
  (newValue, oldValue) => {
    console.log('walletAddres 改变：', newValue, oldValue);
      location.reload()
  }
);
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

//点击登录
const LOGO = async () => {
  contractLogin()
}
// {
//     lock: true,
//     text: 'Loading',
//     background: 'rgba(0, 0, 0, 0.7)',
//   }
onMounted(async() => {
  if (!useAddressCounter.userPrincipal) {
    const loadingInstance = ElLoading.service({ fullscreen: true,text: 'Loading...',background: 'rgba(122, 122, 122, 0.8)' })
    await contractLogin();
    loadingInstance.close()
  }
})
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
