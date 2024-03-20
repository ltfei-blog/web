<script setup lang="ts">
import { Search as IconSearch } from '@icon-park/vue-next'

defineOptions({
  name: 'NavSearch'
})

const keyword = ref('')
const focus = ref(true)
</script>

<template>
  <div class="nav-search" :class="focus ? 'focus' : 'blur'">
    <div class="search-container">
      <div class="search-input">
        <input type="text" @focus="focus = true" @blur="focus = false" />
        <icon-search />
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
    // background-color: pink;
    box-sizing: border-box;
    height: 28px;
    border-radius: 5px;
    .search-input {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #ececec;
      padding: 0 15px;
      height: 28px;
      border-radius: 5px;
      input {
        height: 100%;
        outline: none;
        border: none;
        background-color: transparent;
      }
    }
  }
  &.focus {
    .search-container {
      padding: 10px;
      max-height: 300px;
      height: 200px;
      background-color: @bg-color;
      box-shadow: 0 1px 5px 0 #aaaa;
    }
  }
}
</style>
