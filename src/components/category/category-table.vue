<script lang="ts" setup>
import { categoryStore } from '@/stores/category'
import { storeToRefs } from 'pinia'
const store = categoryStore()

const { remove_category, toggle_category_status } = store
const { categories } = storeToRefs(store)

const removeCategory = (id: number): void => {
  remove_category(id)
}
</script>

<template>
  <div>
    <h4>Turkumlar ro'yxati</h4>
    <el-table :data="store.categories" stripe style="width: 100%" align="right">
      <el-table-column type="index" width="50px" />
      <el-table-column prop="title" label="Title" />
      <el-table-column label="Holati">
        <template #default="list">
          <div>
            <el-button 
            @click="toggle_category_status(list.row)"
            :type="list.row.status ? 'success' : 'danger'"
            >
              {{ list.row.status ? 'faol' : 'nofaol' }}
            </el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Amallar">
        <template #default="list">
          <el-popconfirm
            width="190"
            title="Qaroringiz qat'iymi?"
            confirm-button-text="ha"
            cancel-button-text="yo'q"
            @confirm="remove_category(list.row.id)"
          >
            <template #reference>
              <el-button icon="delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="scss"></style>
