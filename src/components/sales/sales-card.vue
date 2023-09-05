<script lang="ts" setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import type { Category } from '@/models/types'
import type { Product } from '@/models/types'

interface Props {
  product: Product
}

const props = defineProps<Props>()

const count = ref<number>(0)

const changeCount = (val: number): void => {
  if (count.value == 0 && val == -1) return

  count.value += val
}

import { categoryStore } from '@/stores/category'
const catStore = categoryStore()
const { categories } = storeToRefs(catStore)
const getCategory = (id: number | null): string => {
  let res = categories.value.find((category: Category) => category.id === id)
  return res?.title || 'topilmadi'
}

import { saleStore } from '@/stores/sale'
const sales = saleStore()

const add = (id:number | undefined, quantity:number) => {
  sales.add_to_cart({
    product: id,
    date: new Date(),
    quantity
  })
  count.value = 0
}
</script>

<template>
  <div class="card">
    <img :src="`${product.img.toString()}`" />
    <div class="title">{{ product.title }}</div>
    <div class="category">{{ getCategory(product.category) }}</div>
    <div class="price">{{ product.price }}</div>
    <div class="btns">
      <el-button icon="minus" @click="changeCount(-1)"></el-button>
      {{ count }}
      <el-button
        icon="plus"
        @click="changeCount(1)"
        :disabled="count === product.quantity"
      ></el-button>
    </div>
    <el-button
      :disabled="count === 0"
      class="cart"
      icon="shopping-cart"
      type="success"
      @click="add(product.id, count)"
      >Savatchaga</el-button
    >
  </div>
</template>

<style lang="scss">
@import '@/styles/card.scss';
</style>
