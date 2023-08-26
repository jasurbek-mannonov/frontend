<script lang="ts" setup>
import { FormInstance, FormRules } from 'element-plus'
import type { Param, Category } from '@/models/types'
import { computed, ref } from 'vue'
import { paramStore } from '@/stores/param'
import { categoryStore } from '@/stores/category'

const store = paramStore()
const catStore = categoryStore()

const { add_param } = store

const param = ref<Param>({
  title: '',
  status: true,
  category: undefined
})

const catList = computed(() => catStore.categories.filter((category: Category) => category.status))

const paramForm = ref<FormInstance>()

const ruleForm = ref({
  title: '',
  category: ''
})

const rules = ref<FormRules<typeof ruleForm>>({
  title: [{ message: 'Turkum nomini kiriting', required: 'true' }],
  category: [{ message: 'Turkum xususiyatini belgilang', required: 'true' }]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      add_param(param.value)
      param.value = {
        title: '',
        status: true,
        category: undefined
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}
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
      <el-form-item label="Turkum" prop="category">
        <el-select 
          v-model="param.category" 
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
