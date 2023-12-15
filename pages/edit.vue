<script setup lang="ts">
import { Upload as IconUpload } from '@icon-park/vue-next'
import { init as initApi } from '~/apis/articles/init'
import { save as saveApi } from '~/apis/articles/save'

defineOptions({
  name: 'PageEdit'
})

const data = reactive<{
  title: string
  desc?: string
  cover?: string
  content: string
  type: 'add' | 'edit'
}>({
  title: '',
  content: '',
  desc: '',
  cover: '',
  type: 'add'
})

const init = async () => {
  const res = await initApi()
  if (res.status == 200) {
    //
  } else {
    message.error('初始化失败')
  }
}

useNuxtApp().hook('page:start', () => {
  init()
})

/**
 * 存草稿
 */
const save = async () => {
  console.log(data)

  if (!data.title) {
    return message.error('填个标题吧')
  }
  if (!data.content) {
    return message.error('请输入内容')
  }
  const res = await saveApi(data)
  if (res.status == 200) {
    return message.success('保存成功')
  } else {
    return message.error('保存失败，请稍后再试')
  }
}

/**
 * 发布
 */
const publish = () => {
  if (!data.title) {
    //
  }
}
</script>

<template>
  <div class="edit">
    <!-- todo: 不同编辑模式的切换 -->
    <a-input placeholder="在这里输入标题" class="title_input" v-model:value="data.title"></a-input>
    <div class="editor">
      <client-only>
        <lazy-v-md-editor v-model="data.content"></lazy-v-md-editor>
      </client-only>
    </div>
    <h2>封面和摘要</h2>
    <a-row :gutter="10">
      <a-col class="grid-content" :span="5">
        <a-upload class="upload">
          <img v-if="data.cover" :src="data.cover" class="avatar" />
          <div v-else class="not_image">
            <icon-upload size="35"></icon-upload>
            拖拽或选择封面
          </div>
        </a-upload>
      </a-col>
      <a-col class="grid-content" :span="19">
        <a-textarea class="desc" v-model:value="data.desc"></a-textarea>
      </a-col>
    </a-row>
    <h2>文章设置</h2>
    <div class="unfinished">开发中,敬请期待</div>
    <div class="footer">
      <a-button type="primary" @click="save">存草稿</a-button>
      <a-button>预览</a-button>
      <a-button @click="publish">发布</a-button>
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
    height: 100px;
    resize: none;
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

    button {
      margin-left: 5px;
    }
  }
  .editor {
    .v-md-editor {
      min-height: 500px;
    }
  }
}
</style>
