<script lang="ts" setup>
import  {type Category} from '@/models/type'
import { paramStore } from '@/stores/param'
import { storeToRefs } from 'pinia'
import {categoryStore} from '@/stores/category'
const store = paramStore()

const { remove_param, toggle_param_status } = store
const { params } = storeToRefs(store)

const catStore = categoryStore()

const {categories} = storeToRefs(catStore)

const getCategory = (id: number): string => {
    let res = categories.value.find((category: Category) => category.id === id)
    return res?.title || 'topilmadi'
}
</script>

<template>
  <div>
    <h4>Xususiyatlar ro'yxati</h4>
    <el-table :data="params" stripe style="width: 100%" align="right">
      <el-table-column type="index" width="50px" />
      <el-table-column prop="title" label="Nomi" />
      <el-table-column label="Turkum">
        <template #default="list">
          <div>
            {{ getCategory(list.row.id) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Holati">
        <template #default="scope">
          <div>
            <el-button
              @click="toggle_param_status(scope.row)"
              :type="scope.row.status ? 'success' : 'danger'"
            >
              {{ scope.row.status ? 'faol' : 'nofaol' }}
            </el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Amallar">
        <template #default="scope">
          <el-popconfirm
            width="190"
            title="Qaroringiz qat'iymi?"
            confirm-button-text="ha"
            cancel-button-text="yo'q"
            @confirm="remove_param(scope.row.id)"
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
