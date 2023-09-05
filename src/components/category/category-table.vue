<script lang="ts" setup>
import { categoryStore } from '@/stores/category'
import { storeToRefs } from 'pinia'
import { ElMessageBox } from 'element-plus';
const emit = defineEmits(['edit'])
const store = categoryStore()


const editCategory = (id: number) => {
  emit('edit', id)
}

const removeCat = (id: number) => {
  ElMessageBox.confirm(
    "Turkmumni o'chirishga ishonchingiz komilmi?",
    "Diqqat!",
    {
      confirmButtonText: "Ha",
      cancelButtonText: "Yo'q",
      type: 'warning'
    }
  ).then(() => {
    remove_category(id)
  }).catch(() => {})
}

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
      <el-table-column prop="title" label="Nomi" />
      <el-table-column label="Holati" width="90">
        <template #default="list">
          <div>
            <el-button
              @click="toggle_category_status(list.row)"
              :type="list.row.status ? 'success' : 'danger'"
            >
              <el-icon>
                <check v-if="list.row.status" />
                <close v-else />
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
                <el-dropdown-item @click="editCategory(list.row.id)">
                      <el-icon>
                        <edit/>
                      </el-icon>
                      tahrirlash
                </el-dropdown-item>
                <el-dropdown-item @click="removeCat(list.row.id)">
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
