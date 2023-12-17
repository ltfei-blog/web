<script setup lang="ts">
import { Upload as IconUpload } from '@icon-park/vue-next'
import { init as initApi } from '~/apis/articles/init'
import { save as saveApi } from '~/apis/articles/save'
import { publish as publishApi } from '~/apis/articles/publish'
import type { UnwrapRef } from 'vue'
import type { Rule, FormInstance } from 'ant-design-vue/es/form'
import type { FormValidateError } from '~/types/form'
import EditLevalFooter from '~/components/EditLevalFooter/EditLevalFooter.vue'

defineOptions({
  name: 'PageEdit'
})

const router = useRouter()

interface FormState {
  title: string
  desc: string
  cover: string
  content: string
  type: 'add' | 'edit'
}

const data = reactive<UnwrapRef<FormState>>({
  title: '',
  content: '',
  desc: '',
  cover: '',
  type: 'add'
})

const formRef = ref<FormInstance>()

const init = async () => {
  const res = await initApi()
  if (res.status == 200) {
    //
  } else {
    message.error('初始化失败')
  }
}

/**
 * todo: 存草稿和发布的验证规则不同
 * https://antdv.com/components/form-cn#components-form-demo-dynamic-rule
 *
 * todo: 通过伪元素设置内容区域字数提示
 *
 * todo: 验证失败时滚动到第一个异常的地方
 */
/**
 * 发布文章的规则
 */
const publishRules: Record<string, Rule[]> = {
  title: [
    {
      required: true,
      message: '请输入标题'
    },
    {
      min: 2,
      // todo: 从后端获取规则，给文本框设置字数提示
      max: 40,
      message: '标题长度在2~40个字符'
    }
  ],
  content: [
    {
      required: true,
      message: '请输入内容'
    },
    {
      min: 100,
      message: '内容不能少于100字'
    },
    {
      max: 40000,
      message: '内容不能超过四万字'
    }
  ],
  desc: [
    { required: true, message: '请输入简介' },
    { min: 10, max: 100, message: '简介长度在10~100个字符' }
  ]
}

/**
 * 保存草稿时的规则
 */
const saveRules: Record<string, Rule[]> = {
  title: [
    {
      required: true,
      message: '请输入标题'
    },
    {
      min: 2,
      // todo: 从后端获取规则，给文本框设置字数提示
      max: 40,
      message: '标题长度在2~40个字符'
    }
  ],
  content: [
    {
      required: true,
      message: '请输入内容'
    },
    {
      min: 100,
      message: '内容不能少于100字'
    },
    {
      max: 40000,
      message: '内容不能超过四万字'
    }
  ],
  desc: [{ min: 10, max: 100, message: '简介长度在10~100个字符' }]
}

const rules = ref<'publish' | 'save'>('save')

useNuxtApp().hook('page:start', () => {
  init()
})

const validate = async () => {
  try {
    return await formRef.value!.validate()
  } catch (e: unknown) {
    message.warn((e as FormValidateError).errorFields[0].errors[0])
  }
}

/**
 * 存草稿
 */
const save = async (): Promise<Boolean> => {
  const success = await validate()
  if (!success) {
    return false
  }

  const res = await saveApi(data)
  if (res.status == 200) {
    message.success('保存成功')
    return true
  } else {
    message.error('保存失败，请稍后再试')
    return false
  }
}

/**
 * 发布
 */
const publish = async () => {
  const success = await validate()
  if (!success) {
    return
  }

  const res = await publishApi(data)
  if (res.status != 200) {
    return message.error('发布失败，请稍后再试')
  }
  // 如果需要审核，提示等待审核跳转首页
  // todo: 我发布的待审核的文章
  if (res.data.audit) {
    message.success('发布成功，请等待审核')
    router.push('/')
  } else {
    message.success('发布成功')
    router.push(`/p/${res.data.id}`)
  }
  // 如果不需要审核，直接跳转到文章
}
/**
 * 通过vue-router跳转路由时的提示
 * todo: 判断文章是否保存
 */
onBeforeRouteLeave((to, form, next) => {
  // levalModel.value = true
  const modal = Modal.warn({
    title: '还没有保存文章',
    content: '是否保存文章',
    onCancel() {
      next(false)
    },
    footer() {
      return h(EditLevalFooter, {
        async onClose(e) {
          if (e == 'saveAndClose') {
            const result = await save()
            // 保存时需要等待请求后关闭
            modal.destroy()
            if (result) {
              return next()
            }
            return next(false)
          }
          // 取消和不保存无需等待，直接销毁
          modal.destroy()
          if (e == 'cancel') {
            return next(false)
          }
          if (e == 'onlyClose') {
            return next()
          }
        }
      })
    }
  })
})
/**
 * 浏览器关闭/刷新窗口时的提示
 */
const beforeunload = (e: BeforeUnloadEvent) => {
  e.returnValue = '系统不会保存您所做的更改'
  return '系统不会保存您所做的更改'
}
onMounted(() => {
  window.addEventListener('beforeunload', beforeunload)
})
onUnmounted(() => {
  window.removeEventListener('beforeunload', beforeunload)
})
</script>

<template>
  <div class="edit">
    <client-only>
      <a-form :model="data" ref="formRef" :rules="rules == 'save' ? saveRules : publishRules">
        <a-form-item name="title">
          <!-- todo: 不同编辑模式的切换 -->
          <a-input
            placeholder="在这里输入标题"
            class="title_input"
            v-model:value="data.title"
          ></a-input>
        </a-form-item>
        <a-form-item name="content">
          <div class="editor">
            <lazy-v-md-editor v-model="data.content"></lazy-v-md-editor>
          </div>
        </a-form-item>
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
        <a-form-item>
          <div class="footer">
            <a-button type="primary" @click="save">存草稿</a-button>
            <a-button>预览</a-button>
            <a-button @click="publish">发布</a-button>
          </div>
        </a-form-item>
      </a-form>
    </client-only>
  </div>
  <!-- <EditLevalFooter :open="levalModel" /> -->
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
