<template>
  <el-table v-hover-column="setHoverColumn" :data="tableData">
    <el-table-column label="基本信息">
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="age" label="年龄" :colspan="2" />
    </el-table-column>
    <el-table-column label="联系方式">
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="phone" label="电话" />
    </el-table-column>
  </el-table>
  <div>当前悬浮列：{{ hoverColumn }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 示例数据
const hoverColumn = ref<number | null>(null);
const setHoverColumn = (column: number | null) => {
    hoverColumn.value = column
}
const tableData = ref([
  { name: '张三', age: 30, email: 'zhangsan@example.com', phone: '13800138000' },
  { name: '李四', age: 28, email: 'lisi@example.com', phone: '13900139000' }
]);
</script>
