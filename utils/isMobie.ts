import { useWindowSize } from '@vueuse/core'

let windowSize: ReturnType<typeof useWindowSize>

export const isMobie = computed(() => {
  if (!windowSize) {
    windowSize = useWindowSize()
  }
  const { width } = windowSize
  console.log(width)

  return width.value < 500
})
