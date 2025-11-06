import { ref, onMounted, onUnmounted } from 'vue'

// 防抖
function debounce(func, wait) {
  let timeout
  return function(...args) {
    const context = this
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(context, args), wait)
  }
}
export function useScreen(threshold = 992) {
  const isMobile = ref(window.innerWidth <= threshold)

  const debouncedCheckWindowSize = debounce(() => {
    isMobile.value = window.innerWidth <= threshold
  }, 100)

  onMounted(() => {
    window.addEventListener('resize', debouncedCheckWindowSize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', debouncedCheckWindowSize)
  })

  return {
    isMobile
  }
}
