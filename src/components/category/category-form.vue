<script lang="ts" setup>
import type { Category } from '@/models/types'
import type { FormInstance, FormRules } from 'element-plus'
import { ref, watch } from 'vue'

const props = defineProps(['id'])
const emit = defineEmits(['edit'])

import { categoryStore } from '@/stores/category'
const store = categoryStore()

const { add_category, get_category, save_category } = store

const categoryForm = ref<FormInstance>()

const category = ref<Category>({
  title: '',
  status: true
})

const toggle = ref<boolean>(false)

const ruleForm = ref({
  title: '',
  status: false
})

const rules = ref<FormRules<typeof ruleForm>>({
  title: [{ message: 'Turkum nomini kiriting', trigger: 'blur', required: 'true' }]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (toggle.value) {
        save_category(category.value)
        emit('edit',0)
      } else {
        add_category(category.value)
      }
      category.value = {
        title: '',
        status: true
      }
      toggle.value = false
    } else {
      console.log('error submit!', fields)
    }
  })
}

watch(
  () => props.id,
  async (val: number) => {
    if(val === 0) return;
    let result = await get_category(val)
    if (result.status === 200) {
      category.value = { ...result.data }
      toggle.value = true
    }
  }
)
</script>

<template>
  <h4>Yangi turkum</h4>
  <div>
    <el-form
      label-position="top"
      label-width="100px"
      ref="categoryForm"
      :model="category"
      status-icon
      :rules="rules"
      style="max-width: 460px"
    >
      <el-form-item label="Turkum nomi" prop="title">
        <el-input v-model="category.title" />
      </el-form-item>
      <el-form-item label="Turkum holati" prop="status">
        <el-switch
          v-model="category.status"
          class="mt-2"
          style="margin-left: 24px"
          inline-prompt
          active-icon="Check"
          inactive-icon="Close"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(categoryForm)">Saqlash</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss"></style>
