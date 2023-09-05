<script lang="ts" setup>
import  {type Category} from '@/models/type'
import { paramStore } from '@/stores/param'
import {categoryStore} from '@/stores/category'
import { ElMessageBox } from 'element-plus'
import { storeToRefs } from 'pinia'
const store = paramStore()

const emit = defineEmits(['edit'])
const editParam = (id: number) => {
  emit('edit', id)
}

const { remove_param, toggle_param_status } = store
const { params } = storeToRefs(store)

const catStore = categoryStore()

const {categories} = storeToRefs(catStore)

const removeParam = (id: number) => {
  ElMessageBox.confirm(
    "O'chirishga ishonchingiz komilmi?",
    "Diqqat!",
    {
      confirmButtonText: "Ha",
      cancelButtonText: "Yo'q",
      type: 'warning'
    }
  ).then(() => {
    remove_param(id)
  }).catch(() => {})
}

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
            {{ getCategory(list.row.category) }}
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
              <el-icon>
                <check v-if="scope.row.status"/>
                <close v-else/>
              </el-icon>
            </el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Amallar">
        <template #default="list">
          <el-dropdown>
            <el-button class="el-dropdown-link">
              <el-icon>
                <more />
              </el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="editParam(list.row.id)">
                      <el-icon>
                        <edit/>
                      </el-icon>
                      tahrirlash
                </el-dropdown-item>
                <el-dropdown-item @click="removeParam(list.row.id)">
                      <el-icon>
                        <delete/>
                      </el-icon>
                      o'chirish
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-table-column>
    
    </el-table>
  </div>
</template>

<style lang="scss"></style>
