<template>
  <svg aria-hidden="true" v-bind="$attrs">
    <use :xlink:href="`#icon-${name}`" />
  </svg>
</template>

<script setup>
defineOptions({
  name: 'VSvg',
})

defineProps({
  name: {
    type: String,
    required: true
  },
})

</script>
