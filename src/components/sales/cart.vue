<script lang="ts" setup>
import { computed, watch, ref } from 'vue'
import cookies from 'vue-cookies'
import { productStore } from '@/stores/product';
import type { Sale } from '@/models/types';
const productSt = productStore()

const props = defineProps({
  dialogVisible: { type: Boolean, default: false }
})
const emit = defineEmits(['close'])

const toggle = computed(() => props.dialogVisible)
const handleClose = () => {
  emit('close')
}

import { saleStore } from '@/stores/sale';
const store = saleStore()
const addSale = () => {
  store.save_cart(list.value)
  handleClose()
}

const list = ref<Sale[]>([])
const summa = ref<number>(0)
watch(
  () => props.dialogVisible.value,
  async (val) => {
    if (val) {
      list.value = cookies.get('cart')
      if (list.value.length > 0) {
        list.value = await Promise.all(
          list.value.map(async (item: Sale) => {
            if (item.product) {
              let result = await productSt.get_product(item.product)
              if (result.status == 200) {
                item.info = result.data
                summa.value += item.info?.price * item.quantity
              }
            }
            return item
          })
        )
      }
    }
  }
)
</script>

<template>
  <div>
    <el-dialog
      :model-value="dialogVisible"
      title="Savatcha"
      width="30%"
      :before-close="handleClose"
    >
      <el-table :data="list">
        <el-table-column label="Mahsulot nomi" prop="info.title" />
        <el-table-column label="Soni" prop="quantity" width="80"/>
        <el-table-column aria-label="Narxi" width="140">
          <template #default="scope">
            <div>
              {{ parseInt(scope.row.info?.price).toLocaleString() }} so'm 
            </div>
          </template>
        </el-table-column>
        <el-table-cloumn label="Umumiy narx" align="right">
          <template #default="scope">            
            <div>
              <b>
                {{ (scope.row.quantity * scope.row.info?.price).toLocaleString() }} so'm
              </b>
            </div>
          </template>
        </el-table-cloumn>
      </el-table>
      <el-divider/>
        <h3>Umumiy summa: <b>{{ summa.toLocaleString() }} so'm</b></h3>
      <el-divider/>
      <el-popconfirm 
      width="250"
      confirm-button-text="Ha"
      cancel-button-text="Yo'q"
      @confirm="addSale"
      title="Ishonchingiz komilmi?">
        <template #reference>
          <el-button type="success">Buyurtmani saqlash</el-button>
        </template>
      </el-popconfirm>
    </el-dialog>
  </div>
</template>

<style lang="scss"></style>
