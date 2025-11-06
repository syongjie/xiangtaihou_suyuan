<template>
  <van-popup v-model:show="show" closeable round :close-on-click-overlay="false">
    <div class="dialog-bg flex flex-col items-center w-[335px] md:w-[768px] py-[40px]">
      <span class="text-lg">链接钱包</span>
      <div class="flex flex-col mt-10">
        <div class="flex items-center btn-bg rounded-[12px] px-[16px] h-[56px] min-w-[280px] mb-5">
          <img src="@/assets/imgs/qb1.png" class="w-[40px] h-[40px] mr-[12px]" alt="">
          <span>Connect OKX</span>
        </div>
        <div class="flex items-center btn-bg rounded-[12px] px-[16px] h-[56px] min-w-[280px] mb-5">
          <img src="@/assets/imgs/qb2.png" class="w-[40px] h-[40px] mr-[12px]" alt="">
          <span>Connect Brave</span>
        </div>
        <div class="flex items-center btn-bg rounded-[12px] px-[16px] h-[56px] min-w-[280px] mb-5">
          <img src="@/assets/imgs/qb3.png" class="w-[40px] h-[40px] mr-[12px]" alt="">
          <span>Connect Metamask</span>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script setup>
import { ref } from 'vue'

const show = ref(false)

const open = () => {
  show.value = true
}

const close = () => {
  show.value = false
}

defineExpose({
  open,
  close
})
</script>

<style scoped lang="scss">

</style>
