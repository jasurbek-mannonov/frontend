<script lang="ts" setup>
import type { Param, Category } from '@/models/types'
import { FormInstance, FormRules } from 'element-plus'
import { computed, ref, watch } from 'vue'

import { paramStore } from '@/stores/param'
const store = paramStore()
const { add_param, get_param, save_param } = store

import {categoryStore} from '@/stores/category'
const catStore = categoryStore()

const catList = computed(() => catStore.categories.filter((category: Category) => {
  category.status
}))

const paramForm = ref<FormInstance>()

const param = ref<Param>({
  title: '',
  category: '',
  status: true
})

const toggle = ref<boolean>(false)

const ruleForm = ref({
  title: '',
  status: false
})

const rules = ref<FormRules<typeof ruleForm>>({
  title: [{ message: 'Turkum nomini kiriting', required: true }],
  category: [{ message: 'Xususiyat turkumini belgilang', required: true }]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (toggle.value) {
        save_param(param.value)
        emit('edit',0)
      } else {
        add_param(param.value)
      }
      param.value = {
        title: '',
        status: true,
        category: ''
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
    let result = await get_param(val)
    if (result.status === 200) {
      param.value = { ...result.data }
      toggle.value = true
    }
  }
)

const props = defineProps(['id'])
const emit = defineEmits(['edit'])
</script>

<template>
  <h4>Yangi xususiyat</h4>
  <div>
    <el-form
      label-position="top"
      label-width="100px"
      ref="paramForm"
      :model="param"
      status-icon
      :rules="rules"
      style="max-width: 460px"
    >
      <el-form-item label="Xususiyat nomi" prop="title">
        <el-input v-model="param.title" />
      </el-form-item>
      <el-form-item label="Turkum" prop="param">
        <el-select 
          v-model="param.param" 
          placeholder="Ro'yxatdan tanlang"
          filterable 
          clearable
          >
          <el-option
            v-for="item in catList"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Xususiyat holati" prop="status">
        <el-switch
          v-model="param.status"
          class="mt-2"
          style="margin-left: 24px"
          inline-prompt
          active-icon="Check"
          inactive-icon="Close"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(paramForm)">Saqlash</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss"></style>
