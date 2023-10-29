<script setup lang="ts">
import { Upload as IconUpload } from '@icon-park/vue-next'
defineOptions({
  name: 'PageEdit'
})
const title = '标题'
</script>

<template>
  <div class="edit">
    <!-- todo: 不同编辑模式的切换 -->
    <el-input placeholder="在这里输入标题" class="title_input" v-model="title"></el-input>
    <nuxt-page />
    <h2>封面和摘要</h2>
    <el-row :gutter="10">
      <el-col class="grid-content" :span="5">
        <el-upload class="upload">
          <!-- <img src="" class="avatar" /> -->
          <div class="not_image">
            <el-icon size="35">
              <icon-upload></icon-upload>
            </el-icon>
            拖拽或选择封面
          </div>
        </el-upload>
      </el-col>
      <el-col class="grid-content" :span="19">
        <el-input class="desc" type="textarea" resize="none"></el-input>
      </el-col>
    </el-row>
    <h2>文章设置</h2>
    <div class="unfinished">开发中,敬请期待</div>
    <div class="footer">
      <el-button type="primary">存草稿</el-button>
      <el-button>预览</el-button>
      <el-button>发表</el-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.edit {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  background-color: @bg-color;
  position: relative;
  .title_input {
    height: 40px;
    font-size: 20px;
    :deep(input) {
      color: @text-color;
    }
  }
  h2 {
    font-weight: 400;
    font-size: 18px;
    margin: 20px 0 10px 0;
  }
  .upload {
    border: 1px solid @black-opacity-2;
    height: 100px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .not_image {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  .desc {
    :deep(textarea) {
      height: 100px;
    }
  }
  .unfinished {
    width: 100%;
    background-color: @black-opacity-1;
    box-sizing: border-box;
    padding: 20px;
  }
  .footer {
    position: sticky;
    bottom: 0;
    width: 100%;
    padding: 10px 0;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
    background-color: @bg-color;
    border-top: 1px solid @black-opacity-2;
  }
}
</style>
