<template>
  <div>
    <div style="
    position: fixed;
    display: flex;
    height: 40px;
    line-height: 40px;
    width: 100%;
    background-color: #303133;
    box-shadow: 0 1px 2px rgba(0,0,0,.5);
    color: #fff;
    z-index: 100;">
      <div style="flex: 1; padding-left: 10px;">
        <span style="font-size: 15px; font-weight: bold;">{{ documentTitle }}</span>
      </div>
      <div style="width: 150px; text-align: center;">
        <el-button type="primary" size="mini" @click="dialogVisible = true">修改</el-button>
        <el-button type="primary" size="mini">保存</el-button>
      </div>
    </div>

    <editor-menu :data='menuData' style="position: fixed; width: 150px; top: 50px;" :default-active="defaultActive"></editor-menu>
    <div class="content" style="padding-left: 170px; padding-top: 50px;">
      <router-view/>
    </div>

    <el-dialog title="修改标题" :visible.sync="dialogVisible">
      <el-input :value="documentTitle" @input="handleInput"></el-input>
    </el-dialog>
  </div>
</template>

<script>
import EditorMenu from '@/components/EditorMenu'
import {mapGetters, mapMutations} from 'vuex'
const menuData = [
  {
    'text': '说明书摘要',
    'type': 'text',
    'key': 'abstract',
    'path': '/ckeditor/abstract'
  },
  {
    'text': '摘要附图',
    'type': 'image',
    'key': 'abstract_img',
    'path': '/ckeditor/abstract_img'
  },
  {
    'text': '权利要求书',
    'type': 'text',
    'key': 'claims',
    'path': '/tree_editor/claims'
  },
  {
    'text': '说明书',
    'type': 'text',
    'key': 'description',
    'path': '/ckeditor/description'
  },
  {
    'text': '说明书附图',
    'type': 'image',
    'key': 'description_img',
    'path': '/ckeditor/description_img'
  }
]
export default {
  name: 'Editor',
  data () {
    return {
      menuData,
      dialogVisible: false
    }
  },
  computed: {
    ...mapGetters([
      'documentData',
      'documentTitle'
    ]),
    defaultActive () {
      return this.$route.path
    }
  },
  methods: {
    ...mapMutations([
      'setTitle'
    ]),
    handleInput (val) {
      this.setTitle(val)
    }
  },
  components: {
    EditorMenu
  }
}
</script>

<style>
body {
  margin: 0px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
</style>
