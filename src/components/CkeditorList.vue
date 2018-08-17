<template>
  <el-tabs v-model="activeName" class="ckeitor-list">
    <el-tab-pane v-for="(item, key) in dataMap" :key="key" :label="key" :name="key">
      <list-content :data="item" :key="key"></list-content>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import ListContent from '@/components/CkeditorListContent'
export default {
  name: 'ckeitorList',
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      activeName: '全部'
    }
  },
  computed: {
    dataMap () {
      const data = this.data
      const map = {
        '全部': data
      }
      data.forEach(item => {
        if (map[item.group]) {
          map[item.group].push(item)
        } else {
          map[item.group] = [item]
        }
      })
      return map
    }
  },
  components: {
    ListContent
  }
}
</script>

<style>
.ckeitor-list .el-tabs__header {
  margin: 0px;
}
</style>
