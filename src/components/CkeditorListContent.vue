<template>
  <el-collapse v-model="activeName" accordion>
    <el-collapse-item v-for="(item, index) in data" :key="index">
      <template slot="title"><el-tag style="margin-right: 10px;" size="mini">{{ item.group }}</el-tag>{{ item.label }}</template>
      <div>{{ item.content }}<el-button size="mini" type="text" @click="fillContent(item.content)">应用</el-button></div>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
export default {
  name: 'ckeditorListContent',
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      activeName: ''
    }
  },
  methods: {
    fillContent (content) {
      window.editor.getSelection().getStartElement().appendText(content)
    }
  }
}
</script>
