<script setup lang="ts">
import { Upload as IconUpload } from '@icon-park/vue-next'
import { init as initApi } from '~/apis/articles/init'
import { save as saveApi } from '~/apis/articles/save'
import { publish as publishApi } from '~/apis/articles/publish'
import {
  uploadArticles as uploadArticlesApi,
  uploadCover as uploadCoverApi
} from '~/apis/articles/upload'
import type { UnwrapRef } from 'vue'
import type { FormInstance, UploadProps } from 'ant-design-vue'
import type { FormValidateError } from '~/types/form'
import EditLevalFooter from '~/components/EditLevalFooter/EditLevalFooter.vue'

defineOptions({
  name: 'PageEdit'
})

const router = useRouter()
const route = useRoute()

const editId = route.query.id as string | undefined

interface FormState {
  title: string
  desc: string
  cover?: string
  content: string
  type: 'add' | 'edit'
}

const data = reactive<UnwrapRef<FormState>>({
  title: '',
  content: '',
  desc: '',
  cover: undefined,
  type: 'add'
})

const count = computed(() => {
  // 在css伪元素中使用，需要加额外的引号
  return `"${data.content.length}"`
})

const formRef = ref<FormInstance>()

/**
 * 文章规则
 * todo: 动态从后端获取
 */
const saveRules = {
  title: {
    min: 2,
    max: 40
  },
  content: {
    min: 5,
    max: 40000
  },
  desc: {
    min: 10,
    max: 100
  }
}
const publishRules = {
  title: {
    min: 2,
    max: 40
  },
  content: {
    min: 100,
    max: 40000
  },
  desc: {
    min: 10,
    max: 100
  }
}
/**
 * 文章校验使用的规则
 */
const ruleType = ref<'save' | 'publish'>('save')
const rules = computed(() => {
  if (ruleType.value == 'save') {
    return saveRules
  } else {
    return publishRules
  }
})

const loading = ref(true)
const init = async () => {
  /**
   * 校验 editId
   */
  if (editId && !/^[0-9]{1,10}$/.test(editId)) {
    return message.error('404')
  }
  data.type = editId ? 'edit' : 'add'
  const res = await initApi(editId ? 'edit' : 'add', Number(editId))
  if (res.status != 200) {
    return message.error('初始化失败')
  }
  loading.value = false
  /**
   * 设置规则
   * todo: 动态获取规则
   */

  /**
   * 有草稿
   */
  if (res.data?.edit) {
    const { title, content, desc, cover } = res.data.edit
    data.title = title
    data.content = content
    data.desc = desc
    data.cover = cover
    message.info('已加载上次编辑的草稿')
    return
  }
  /**
   * 加载文章内容
   */
  if (res.data?.article) {
    const { title, content, desc, cover } = res.data.article
    data.title = title
    data.content = content
    data.desc = desc
    data.cover = cover
    return
  }
}

if (process.client) {
  init()
}

/**
 * todo: 验证失败时滚动到第一个异常的地方
 */

const validate = async (type: 'save' | 'publish'): Promise<false | object> => {
  return new Promise((resolve) => {
    ruleType.value = type
    nextTick(async () => {
      try {
        const validate = await formRef.value!.validate()
        resolve(validate)
      } catch (e: unknown) {
        message.warn((e as FormValidateError).errorFields[0].errors[0])
        resolve(false)
      }
    })
  })
}

/**
 * 存草稿
 */
const saveLoading = reactive({ value: false })
const save = async (): Promise<Boolean> => {
  const success = await validate('save')
  if (!success) {
    return false
  }

  const res = await saveApi({ ...data, editId: Number(editId) })
  if (res.status == 200) {
    message.success('保存成功')
    watchEdit()
    return true
  } else {
    message.error('保存失败，请稍后再试')
    return false
  }
}

/**
 * 发布
 */
const publishLoading = reactive({
  value: false
})
const publish = async () => {
  const success = await validate('publish')
  if (!success) {
    return
  }

  /**
   * 简介为选填项，如果不填，则由前端自动截取前..字，长度为10~100个字符
   */
  if (!data.desc) {
    data.desc = data.content.slice(0, 100)
  }

  const res = await publishApi({ ...data, articlesId: Number(editId) })
  if (res.status != 200) {
    return message.error('发布失败，请稍后再试')
  }
  // 如果需要审核，提示等待审核跳转首页
  // todo: 跳转到我发布的待审核的文章页面
  watchEdit()
  if (res.data.audit) {
    message.success('发布成功，请等待审核')
    router.push('/')
  } else {
    // 如果不需要审核，直接跳转到文章
    message.success('发布成功')
    router.push(`/p/${res.data.id}`)
  }
}

/**
 * 判断文章是否保存
 */
let saved = false
const watchEdit = () => {
  saved = true
  const stop = watch(data, () => {
    saved = false
    stop()
  })
}

/**
 * 通过vue-router跳转路由时的提示
 */
onBeforeRouteLeave((to, form, next) => {
  if (saved) {
    return next()
  }
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
  if (saved) {
    return
  }
  e.preventDefault()
  e.returnValue = ''
  return ''
}
onMounted(() => {
  window.addEventListener('beforeunload', beforeunload)
})
onUnmounted(() => {
  window.removeEventListener('beforeunload', beforeunload)
})

/**
 * 封装按钮加载状态
 */
const withLoding = async (
  fn: Function,
  loading: {
    value: boolean
  }
) => {
  loading.value = true
  await fn()
  loading.value = false
}

/**
 * 文章内上传图片
 */
const handleUploadImage = async (
  event: Event,
  insertImage: (data: { url: string; desc: string }) => void,
  files: File[]
) => {
  // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
  const { data, status } = await uploadArticlesApi(files[0])
  if (status != 200) {
    return message.error('上传失败，请稍后再试')
  }
  insertImage({
    url: data.url,
    desc: files[0].name
  })
}
/**
 * 上传封面
 */
const beforeCoverUpload: UploadProps['beforeUpload'] = async (file) => {
  const res = await uploadCoverApi(file)
  if (res.status != 200) {
    return message.error('上传失败，请稍后再试')
  }
  data.cover = res.data.url
}
</script>

<template>
  <div class="edit">
    <client-only>
      <a-spin :spinning="loading">
        <a-form
          :model="data"
          ref="formRef"
          :rules="{
            title: [
              {
                required: true,
                message: '请输入标题'
              },
              {
                min: rules.title.min,
                // todo: 从后端获取规则，给文本框设置字数提示
                max: rules.title.max,
                message: `标题长度在${rules.title.min}~${rules.title.max}个字符`
              }
            ],
            content: [
              {
                required: true,
                message: '请输入内容'
              },
              {
                min: rules.content.min,
                message: `内容不能少于${rules.content.min}字`
              },
              {
                max: 40000,
                message: '内容不能超过四万字'
              }
            ],
            desc: [{ min: 10, max: 100, message: '简介长度在10~100个字符' }]
          }"
        >
          <a-form-item name="title">
            <!-- todo: 不同编辑模式的切换 -->
            <a-input
              placeholder="在这里输入标题"
              class="title_input"
              v-model:value="data.title"
              show-count
              :maxlength="rules.title.max"
            ></a-input>
          </a-form-item>
          <a-form-item name="content">
            <div
              class="editor"
              :class="data.content.length > rules.content.max ? 'status-error' : ''"
            >
              <suspense>
                <template #fallback>
                  <a-spin class="editor-loading" v-if="!loading" />
                </template>
                <lazy-v-md-editor
                  v-model="data.content"
                  :disabled-menus="[]"
                  @upload-image="handleUploadImage"
                ></lazy-v-md-editor>
              </suspense>
            </div>
          </a-form-item>
          <h2>封面和摘要</h2>
          <a-row :gutter="10">
            <a-col class="grid-content" :span="5">
              <a-upload
                class="upload"
                list-type="picture-card"
                :before-upload="beforeCoverUpload"
                :show-upload-list="false"
              >
                <a-image
                  v-if="data.cover"
                  :src="data.cover"
                  fit="cover"
                  class="cover"
                  :preview="false"
                />
                <div v-else class="not_image">
                  <icon-upload size="35"></icon-upload>
                  拖拽或选择封面
                </div>
              </a-upload>
            </a-col>
            <a-col class="grid-content" :span="19">
              <a-form-item name="desc">
                <a-textarea
                  class="desc"
                  v-model:value="data.desc"
                  show-count
                  :maxlength="rules.desc.max"
                ></a-textarea>
              </a-form-item>
            </a-col>
          </a-row>
          <h2>文章设置</h2>
          <div class="unfinished">开发中,敬请期待</div>
          <a-form-item>
            <div class="footer">
              <a-button
                type="primary"
                @click="withLoding(save, saveLoading)"
                :loading="saveLoading.value"
                >存草稿</a-button
              >
              <a-button>预览</a-button>
              <a-button
                @click="withLoding(publish, publishLoading)"
                :loading="publishLoading.value"
              >
                发布
              </a-button>
            </div>
          </a-form-item>
        </a-form>
      </a-spin>
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
    :deep(.ant-upload) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100px;
      border-radius: 5px;
      .ant-image {
        display: block;
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
    .not_image {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  .desc {
    height: 100px;
    :deep(textarea) {
      resize: none;
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

    button {
      margin-left: 5px;
    }
  }
  .editor {
    .editor-loading {
      height: 500px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .v-md-editor {
      min-height: 500px;
      :deep(.v-md-editor__editor-wrapper .scrollbar) {
        position: relative;
        &::before {
          content: v-bind(count);
          position: absolute;
          bottom: 5px;
          right: 10px;
        }
      }
    }
    &.status-error :deep(.v-md-editor__editor-wrapper .scrollbar)::before {
      color: red;
    }
  }
}
</style>
