<script lang="ts" setup>
    const props  = defineProps(['params'])
</script>

<template>
  <el-row :gutter="30">
    <el-col :span="12">
      <el-statistic :value="`${params.summa.toLocaleString()} so'm`">
        <template #title>
          <div style="display: inline-flex; align-items: center">
            Mahsulotlarning umumiy narxi
            <el-tooltip
              effect="dark"
              content="Number of users who logged into the product in one day"
              placement="top"
            >
              <el-icon style="margin-left: 4px" :size="12">
                <Warning />
              </el-icon>
            </el-tooltip>
          </div>
        </template>
      </el-statistic>
    </el-col>
  </el-row>
</template>

<style lang="scss"></style>
