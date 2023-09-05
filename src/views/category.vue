<script lang="ts" setup>
import { ref } from 'vue';
import categoryForm from '@/components/category/category-form.vue'
import categoryTable from '@/components/category/category-table.vue';
import { categoryStore } from '@/stores/category';
import { onMounted } from 'vue';

const store = categoryStore()
const id = ref<number>(0)

const handleEdit = (val: number) => {
  id.value = val
}

onMounted(() => {
  store.all_category()
})
</script>

<template>
  <div>
    <h1>Turkumlar</h1>
    <el-row :gutter="30">
      <el-col :span="8">
        <categoryForm :id="id" @edit="handleEdit"/>
      </el-col>
      <el-col :span="16">
        <categoryTable @edit="handleEdit"/>
      </el-col>
    </el-row>
  </div>
</template>

<style></style>
