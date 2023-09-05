<script lang="ts" setup>
import type { Product, Category, ProductParam, Param } from '@/models/types'
import type { FormInstance, FormRules } from 'element-plus'
import { computed, ref, watch } from 'vue'
const props = defineProps(['id', 'drawerToggle'])
const emit = defineEmits(['edit', 'close'])

const toggleModel = computed(() => props.drawerToggle)

import { productStore } from '@/stores/product';
const store = productStore()
const {add_product, save_product, get_product} = store


import { categoryStore } from '@/stores/category';
const catStore = categoryStore()

import { paramStore } from '@/stores/param';
const parStore = paramStore()

const {get_params_by_category} = parStore

const catList = computed(() => catStore.categories.filter((category: Category) => category.status))

const productForm = ref<FormInstance>()
const product = ref<Product>({
  title: '',
  category: null,
  status: true,
  price: 0,
  quantity: 0,
  createdAt: new Date(),
  params: [],
  img: ''
})
const toggle = ref<boolean>(false)
const ruleForm = ref({
  title: '',
  category: 0,
  price: 0,
  quantity: 0,
  img: 0
})

const rules = ref<FormRules<typeof ruleForm>>({
  title: [{ message: 'Mahsulot nomini kiriting', required: 'true' }],
  category: [{ message: 'Mahsulot xususiyatini belgilang', required: 'true' }],
  price: [{ message: 'Mahsulot narxini kiriting', required: 'true' }],
  quantity: [{ message: 'Mahsulot sonini kiriting', required: 'true' }],
  img: [{ message: 'Mahsulot rasmini kiriting', required: 'true' }]
})

const getParams = async (id: number | null) => {
  let result = await get_params_by_category(id)
  if(result.status == 200){
    product.value.params = result.data.map((param: Param) => {
      return {
        title: param.title,
        id: param.id,
        value: ''
      }
    })
  }
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      product.value.params = product.value.params.filter(param => param.value.length > 0)
      if(toggle.value){
        save_product(product.value)
        emit('edit', 0)
      }else{
        add_product(product.value)
      }
      product.value = {
        title: '',
        status: true,
        category: 0,
        price: 0,
        quantity: 0,
        params: [],
        createdAt: new Date(),
        img: ''
      }
      toggle.value = false
      closeEmit()
    } else {
      console.log('error submit!', fields)
    }
  })
}

watch(() => props.id, async (val: number) => {
  if (val === 0) return
  let result = await get_product(val)
  if(result.status === 200){
    product.value = {...result.data}
    let params = [...product.value.params]

    let res = await get_params_by_category(product.value.category)
    if(res.status === 200){
      product.value.params = res.data.map((param: Param) => {
        let obj = params.find(p => p.id === param.id)
        return {
          title: param.title,
          id: param.id,
          value: obj ? obj.value : ''
        }
      })
    }
    toggle.value = true
  }
})

const closeEmit = () => {
  emit('close')
}
</script>

<template>
  <div>
  <el-drawer 
    :model-value="toggleModel" 
    title="Mahsulot"
    :before-close="closeEmit"
    >
    <el-form
      ref="productForm"
      :model="product"
      status-icon
      label-position="top"
      label-width="100px"
      :rules="rules"
      style="max-width: 460px"
    >
      <el-form-item label="Mahsulot nomi" prop="title">
        <el-input v-model="product.title" />
      </el-form-item>

      <el-form-item label="Turkum" prop="category">
        <el-select 
          v-model="product.category" 
          placeholder="Ro'yxatdan tanlang" 
          filterable 
          clearable
          @change="getParams(product.category)"
        >
          <el-option 
            v-for="item in catList" 
            :key="item.id" 
            :label="item.title" 
            :value="item.id" />
        </el-select>
      </el-form-item>

      <el-form-item label="Narxi" props="price">
        <el-input
          class="full"
          type="number"
          v-model="product.price"
          :controls="false"
        >
        <template #append>so'm</template>
        </el-input>
      </el-form-item>

      <el-form-item label="Soni" props="quantity">
        <el-input-number
          class="full"
          v-model="product.quantity"
          :controls="false"
        />
      </el-form-item>

      <el-form-item label="Rasmi" props="img">
        <el-input v-model="product.img"/>
      </el-form-item>

      <div v-if="product.params.length > 0">
        <h4>Mahsulot xususiyatlari</h4>
        <el-form-item
          v-for="param, index of product.params"
          :key="index"
          :label="param.title"
        >
        <el-input v-model="param.value"/>
        </el-form-item>
      </div>

      <el-form-item label="Holati" prop="status">
        <el-switch
          v-model="product.status"
          class="mt-2"
          style="margin-left: 24px"
          inline-prompt
          active-icon="Check"
          inactive-icon="Close"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm(productForm)">Saqlash</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
  </div>
</template>

<style lang="scss"></style>
