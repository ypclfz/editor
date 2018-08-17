<template>
  <el-menu :router="true" :default-active="defaultActive">
    <el-menu-item v-for="item in data" :key="item.key" :index="item.path">
      <i class="el-icon-document"></i>
      <span slot="title">{{ item.text }}</span>
    </el-menu-item>
  </el-menu>
</template>
<script>
export default {
  name: 'EditorMenu',
  props: {
    data: {
      type: Array,
      required: true
    },
    defaultActive: {
      type: String
    }
  }
}
</script>
