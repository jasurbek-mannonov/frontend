<script lang="ts" setup>
import categoryForm from '@/components/category/category-form.vue'
</script>

<template>
  <div>
    <h1>Turkumlar</h1>
    <el-row :gutter="30">
      <el-col :span="8">
        <categoryForm />
      </el-col>
    </el-row>
  </div>
</template>

<style></style>
