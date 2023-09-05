<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { productStore } from '@/stores/product';
import cart from '@/components/sales/cart.vue';
import salesCard from '@/components/sales/sales-card.vue'

const productsSt = productStore()
const {products} = storeToRefs(productsSt)

import { categoryStore } from '@/stores/category';
const catStore = categoryStore()

const toggle = ref<boolean>(false)

const handleClose = () => {
  toggle.value = false
}

onMounted(() => {
  catStore.all_category()
  productsSt.all_product()
})

</script>

<template>
  <div class="head">
    <h1>Sotuv bo'limi</h1>
    <el-button icon="shopping-cart" type="primary" @click="toggle = true">Savatcha</el-button>
  </div>
  <cart :dialog-visible="toggle" @close="handleClose"/>
    <el-input placeholder="Qidiruv" class="mb-1"/>
    <el-row :gutter="30">
      <el-col 
        :span="6"
        v-for="product of products"
        :key="product.id"
      >
      <salesCard :product="product"/>
      </el-col>
    </el-row>
</template>

<style lang="scss"></style>