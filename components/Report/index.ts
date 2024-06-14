import { report as reportApi } from '~/apis/users/report'
import Report from './Report.vue'

export const openReport = (type: 'article' | 'comment' | 'user', report_id: number) => {
  const show = ref(false)
  const formState = ref({
    cause: null,
    desc: ''
  })

  const typeText = () => {
    switch (type) {
      case 'article':
        return '文章'
      case 'comment':
        return '评论'
      case 'user':
        return '用户'
      default:
        return ''
    }
  }

  Modal.confirm({
    open: show.value,
    content: h(Report, {
      modelValue: formState.value,
      'onUpdate:modelValue': (value) => (formState.value = value)
    }),
    title: '举报' + typeText(),
    width: 600,
    cancelText: '取消',
    okText: '提交',
    async onOk() {
      try {
        if (formState.value.cause == null) {
          message.warn('请选择举报类型')
          return Promise.reject()
        }
        if (!formState.value.desc) {
          message.warn('请填写举报原因')
          return Promise.reject()
        }

        const { status } = await reportApi({
          type,
          report_id,
          cause: formState.value.cause,
          desc: formState.value.desc
        })

        if (status != 200) {
          message.error('举报失败')
          return Promise.reject()
        }

        message.success('举报成功')
        return Promise.resolve()
      } catch (error) {
        console.log(error)
      }
    }
  })
}
