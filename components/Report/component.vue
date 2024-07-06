<script setup lang="ts">
import { getCauseType as getCauseTypeApi, ReportType } from '~/apis/users/report'

defineOptions({
  name: 'ReportBox'
})

const props = defineProps<{
  modelValue: {
    cause: number | null
    desc: string
  }
}>()

const emit = defineEmits(['update:modelValue'])

const formState = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const causeType = ref<ReportType[]>([])

const getCauseType = async () => {
  const { data } = await getCauseTypeApi()
  causeType.value = data
}
getCauseType()

console.log(defineModel)
</script>

<template>
  <div class="repot">
    <a-form
      :model="formState"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 20 }"
      autocomplete="off"
    >
      <a-form-item label="原因" required>
        <a-radio-group v-model:value="formState.cause" class="report-cause">
          <a-radio v-for="i in causeType" :value="i.key" :key="i.key" class="report-cause-item">
            {{ i.label }}
          </a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="详细描述" required>
        <a-textarea :rows="4" v-model:value="formState.desc" />
      </a-form-item>
    </a-form>
  </div>
</template>

<style lang="less" scoped>
.report-cause {
  .report-cause-item {
    width: 130px;
  }
}
</style>
