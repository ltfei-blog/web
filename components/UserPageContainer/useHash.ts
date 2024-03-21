import { scrollTo } from '~/utils/scrollTo'

export const tabs = ['post', 'like']
export const useHash = (defaultTab = 'post') => {
  const activeKey = ref(defaultTab)
  const { hash } = useRequestURL()
  const locationHash = hash.replace('#', '')

  const scrollToNav = () => {
    const navDom = document.querySelector('.tabs') as HTMLDivElement
    scrollTo(navDom?.offsetTop - 60)
  }

  /**
   * 服务端拿不到hash，延迟到客户端渲染后再切换
   */
  onMounted(() => {
    if (tabs.includes(locationHash)) {
      activeKey.value = locationHash
    }
    scrollToNav()
  })

  watch(activeKey, (newValue) => {
    location.hash = newValue
    scrollToNav()
  })

  return { activeKey }
}
