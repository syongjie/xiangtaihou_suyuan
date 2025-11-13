<template>
  <van-popup v-model:show="show" closeable round :close-on-click-overlay="false">
    <div class="dialog-bg flex flex-col items-center w-[335px] md:w-[768px] py-[40px]">
      <span class="text-lg">功能已移除</span>
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
