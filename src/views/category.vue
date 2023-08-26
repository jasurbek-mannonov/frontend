<script lang="ts" setup>
import categoryForm from '@/components/category/category-form.vue'
import categoryTable from '@/components/category/category-table.vue';
import { categoryStore } from '@/stores/category';
import { onMounted } from 'vue';

const store = categoryStore()

onMounted(() => {
  store.all_category()
})
</script>

<template>
  <div>
    <h1>Turkumlar</h1>
    <el-row :gutter="30">
      <el-col :span="8">
        <categoryForm />
      </el-col>
      <el-col :span="16">
        <categoryTable/>
      </el-col>
    </el-row>
  </div>
</template>

<style></style>
