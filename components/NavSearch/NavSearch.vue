<script setup lang="ts">
import { Search as IconSearch } from '@icon-park/vue-next'
import { search as searchApi } from '~/apis/articles/search'
import { Articles } from '~/types/api'
import { throttle } from '~/utils/throttle'
import xss from 'xss'

defineOptions({
  name: 'NavSearch'
})

const keyword = ref('')
const focus = ref(false)
const result = ref<Articles[]>([])

const search = async () => {
  const res = await searchApi(keyword.value)
  result.value = res.data
}

watch(keyword, throttle(search, 1000))
/**
 * 高亮关键词
 */
const highlightKeyword = (text: string) => {
  const str = xss(text)
  return str.replaceAll(keyword.value, `<span class="keyword">${keyword.value}</span>`)
}
</script>

<template>
  <div class="nav-search" :class="focus ? 'focus' : 'blur'">
    <div class="search-container">
      <div class="search-input">
        <input type="text" v-model="keyword" @focus="focus = true" @blur="focus = false" />
        <icon-search />
      </div>
      <div class="result">
        <nuxt-link class="item" v-for="i in result" :key="i.id" :to="`/p/${i.id}`">
          <div class="name" v-html="highlightKeyword(i.title)"></div>
          <div class="desc" v-html="highlightKeyword(i.desc)"></div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.nav-search {
  height: 28px;
  * {
    transition: all 0.3s;
  }

  .search-container {
    margin-right: 20px;
    width: 260px;
    box-sizing: border-box;
    height: 28px;
    border-radius: 5px;
    overflow: hidden;
    .search-input {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #ececec;
      padding: 0 15px;
      height: 28px;
      border-radius: 5px;
      flex-shrink: 0;
      input {
        height: 100%;
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
  }
  &.focus {
    .search-container {
      padding: 10px;
      max-height: 350px;
      min-height: 100px;
      height: 300px;
      // height: auto;
      background-color: @bg-color;
      box-shadow: 0 1px 5px 0 #aaaa;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
