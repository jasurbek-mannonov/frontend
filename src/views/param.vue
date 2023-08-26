<script lang="ts" setup>
import paramForm from '@/components/param/param-form.vue'
import paramTable from '@/components/param/param-table.vue';
import { paramStore } from '@/stores/param';
import { onMounted } from 'vue';
import { categoryStore } from '@/stores/category';

const store = paramStore()
const catStore  = categoryStore()

onMounted(() => {
  catStore.all_category()
  store.all_param()
})
</script>

<template>
  <div>
    <h1>Mahsulot xususiyatlari</h1>
    <el-row :gutter="30">
      <el-col :span="8">
        <paramForm />
      </el-col>
      <el-col :span="16">
        <paramTable/>
      </el-col>
    </el-row>
  </div>
</template>

<style></style>
