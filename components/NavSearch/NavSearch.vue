<script setup lang="ts">
import { Search as IconSearch } from '@icon-park/vue-next'
import { search as searchApi } from '~/apis/articles/search'
import { Articles } from '~/types/api'
import { throttle } from '~/utils/throttle'
import xss from 'xss'
import { useSearchHistoryStore } from '~/store/searchHistory'

defineOptions({
  name: 'NavSearch'
})

const props = defineProps<{
  keyword: string
}>()

const emit = defineEmits(['update:keyword'])

const keyword = computed({
  get() {
    return props.keyword
  },
  set(data) {
    emit('update:keyword', data)
  }
})

const focus = ref(false)
const result = ref<Articles[]>([])
const { history, removeHistory } = useSearchHistoryStore()
const inputRef = ref<HTMLElement>()
const searchContainerRef = ref<HTMLElement>()

const historyData = computed(() => {
  return history.map((e) => e).reverse()
})

const onFocus = () => {
  focus.value = true
}

onMounted(() => {
  onClickOutside(searchContainerRef.value, () => {
    focus.value = false
  })
})

const search = async () => {
  const res = await searchApi(keyword.value)
  result.value = res.data || []
}
const throttleSearch = throttle(search, 1000)
watch(
  () => props.keyword,
  () => {
    throttleSearch()
  }
)
/**
 * 高亮关键词
 */
const highlightKeyword = (text: string) => {
  const str = xss(text)
  return str.replaceAll(keyword.value, `<span class="keyword">${keyword.value}</span>`)
}

/**
 * 跳转搜索详情页
 * 清除输入框焦点，并跳转搜索详情页面
 */
const router = useRouter()
const toSearch = (keywordString = keyword.value) => {
  focus.value = false
  inputRef.value?.blur()
  router.push({
    path: '/search',
    query: {
      w: keywordString
    }
  })
}
</script>

<template>
  <div class="nav-search" :class="focus ? 'focus' : 'blur'">
    <div class="search-container" ref="searchContainerRef">
      <div class="search-input">
        <input
          type="text"
          v-model="keyword"
          ref="inputRef"
          @focus="onFocus"
          @keyup.enter="toSearch()"
          placeholder="输入关键词搜索"
        />
        <icon-search class="search-icon" @click="toSearch()" />
      </div>
      <div class="result" v-if="keyword">
        <nuxt-link class="item" v-for="i in result" :key="i.id" @click="toSearch(i.title)">
          <div class="name" v-html="highlightKeyword(i.title)"></div>
          <!-- <div class="desc" v-html="highlightKeyword(i.desc)"></div> -->
        </nuxt-link>
      </div>
      <div class="history" v-else>
        <client-only>
          <template v-for="i in historyData" :key="i.keyword">
            <nuxt-link class="item" @click="toSearch(i.keyword)">
              <a-tag closable @close="removeHistory(i.keyword)">
                {{ i.keyword }}
              </a-tag>
            </nuxt-link>
          </template>
        </client-only>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.nav-search {
  --height: 28px;
  @height: var(--height);
  height: @height;
  * {
    transition: all 0.3s;
  }

  .search-container {
    margin-right: 20px;
    box-sizing: border-box;
    height: @height;
    border-radius: 5px;
    overflow: hidden;
    position: relative;
    z-index: 200;
    .search-input {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #ececec;
      padding: 0 15px;
      height: @height;
      border-radius: 5px;
      flex-shrink: 0;
      .search-icon {
        padding: 5px;
        cursor: pointer;
      }
      input {
        height: 100%;
        flex: 1;
        outline: none;
        border: none;
        background-color: transparent;
      }
    }
    .result {
      flex: 1;
      overflow: auto;
      margin-top: 4px;
      .item {
        padding: 6px 0;
        display: block;
        cursor: pointer;
        :deep(.keyword) {
          color: red;
          color: @primary;
        }

        .name,
        .desc {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .desc {
          font-size: 14px;
        }
      }
    }
    .history {
      display: flex;
      flex-wrap: wrap;
      margin-top: 10px;
      .item {
        margin: 4px;
        cursor: pointer;
      }
    }
  }
  &.focus {
    .search-container {
      padding: 10px;
      max-height: 350px;
      min-height: 100px;
      height: 300px;
      background-color: @bg-color;
      box-shadow: 0 1px 5px 0 #aaaa;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
