export const throttle = (fn: () => void, time: number) => {
  let timeout: NodeJS.Timeout | null = null
  return () => {
    if (timeout) {
      return
    }
    timeout = setTimeout(() => {
      fn()
      timeout = null
    }, time)
  }
}
