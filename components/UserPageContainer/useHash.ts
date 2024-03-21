const tabs = ['post', 'like']
export const useHash = (defaultTab = 'post') => {
  const activeKey = ref(defaultTab)
  const { hash } = useRequestURL()
  const locationHash = hash.replace('#', '')

  if (tabs.includes(locationHash)) {
    activeKey.value = locationHash
  }

  watch(activeKey, (newValue) => {
    location.hash = newValue
  })

  return { activeKey }
}
