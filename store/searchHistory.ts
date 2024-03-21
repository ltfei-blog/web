export const useSearchHistoryStore = defineStore(
  'history',
  () => {
    const history = ref<
      {
        keyword: string
      }[]
    >([])

    const addHistory = (keyword: string) => {
      if (keyword == '') {
        return
      }
      // 已经存在的置顶
      const item = history.value.findIndex((e) => {
        return e.keyword == keyword
      })
      // 先删掉旧的，然后新增
      item >= 0 && history.value.splice(item, 1)

      // 不存在新增
      history.value.push({
        keyword
      })
    }
    const removeHistory = (keyword: string) => {
      const item = history.value.findIndex((e) => {
        return e.keyword == keyword
      })
      history.value.splice(item, 1)
    }

    return { history, addHistory, removeHistory }
  },
  {
    persist: true
  }
)
