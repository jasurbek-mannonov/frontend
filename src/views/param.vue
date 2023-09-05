<script lang="ts" setup>
import paramForm from '@/components/param/param-form.vue'
import paramTable from '@/components/param/param-table.vue';
import { paramStore } from '@/stores/param';
import { categoryStore } from '@/stores/category';
import { onMounted, ref } from 'vue';

const store = paramStore()
const catStore  = categoryStore()

const id = ref<number>(0)

const handleEdit = (val: number) => {
  id.value = val
}

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
        <paramForm @edit="handleEdit" :id="id"/>
      </el-col>
      <el-col :span="16">
        <paramTable @edit="handleEdit"/>
      </el-col>
    </el-row>
  </div>
</template>

<style></style>
