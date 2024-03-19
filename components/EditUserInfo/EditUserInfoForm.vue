<script setup lang="ts">
import type { UnwrapRef } from 'vue'
import { useUserStore } from '~/store/user'
import { editUserInfo as editUserInfoApi } from '~/apis/users/userInfo'

defineOptions({
  name: 'EditUserInfoForm'
})

const { isLogin, user } = useUserStore()
if (!isLogin.value) {
  message.error('请先登录')
}

const emit = defineEmits(['handleOk'])

interface FormState {
  username: string
  gender: number
  desc: string
}

const formState: UnwrapRef<FormState> = reactive({
  username: user.value.username,
  gender: user.value.gender,
  desc: user.value.desc
})

const labelCol = { style: { width: '150px' } }
const wrapperCol = { span: 14 }

const onSubmit = async () => {
  const res = await editUserInfoApi(formState)
  if (res.status != 200) {
    return message.error('修改失败，请稍后再试')
  }

  message.success('修改成功')
  emit('handleOk')
  setTimeout(() => {
    /**
     * todo: 个人中心页用的是member接口下的数据，不是store中的，因此需要emit到个人页更新数据，这里暂时先刷新界面
     */
    location.reload()
  }, 500)
}
</script>

<template>
  <div class="edit-user-info-form">
    <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="用户名">
        <a-input v-model:value="formState.username" />
      </a-form-item>
      <a-form-item label="性别">
        <a-radio-group v-model:value="formState.gender">
          <a-radio :value="1">男</a-radio>
          <a-radio :value="0">女</a-radio>
          <a-radio :value="2">保密</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="简介">
        <a-textarea v-model:value="formState.desc" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">保存</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style lang="less" scoped></style>
