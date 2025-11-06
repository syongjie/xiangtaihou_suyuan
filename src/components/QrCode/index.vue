<template>
  <div style="text-align: center;width: 100%;height: 100%;">
    <!-- 显示二维码 -->
    <QRCodeVue
      :value="value"
      :size="size"
      :level="level"
      :bgColor="bgColor"
      :fgColor="fgColor"
    />
  </div>
</template>

<script setup>
import QRCodeVue from "qrcode.vue";

// Props 定义
defineProps({
  value: {
    type: String,
    required: true, // 父组件传递过来的二维码内容
  },
  size: {
    type: Number,
    default: 200, // 二维码大小
  },
  level: {
    type: String,
    default: "M", // 容错级别
  },
  bgColor: {
    type: String,
    default: "#ffffff", // 背景颜色
  },
  fgColor: {
    type: String,
    default: "#000000", // 前景颜色
  },
});
</script>

<style scoped>
/* 可以根据需要自定义样式 */
</style>