import { scrollTo } from '~/utils/scrollTo'

export const tabs = ['post', 'like', 'history']
export const useHash = (defaultTab = tabs[0]) => {
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
      scrollToNav()
    } else {
      location.hash = ''
    }
  })

  watch(activeKey, (newValue) => {
    location.hash = newValue
    scrollToNav()
  })

  return { activeKey }
}
