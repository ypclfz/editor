<template>
  <div>
    <div style="padding-left: 5px;">
      <el-button icon="el-icon-plus" type="primary" @click="handleRootAdd">添加一级引用</el-button>
    </div>
    <draggable-tree ref="tree" :data="treeData" :draggable="false" cross-tree="cross-tree">
      <div slot-scope="{data, store}">
        <template v-if="!data.isDragPlaceHolder">
          <el-card>
            <div slot="header">
              <span>{{ data.number }}</span>
              <span v-if="data.level === 1" style="margin-left: 10px;">
                <span>一种</span>
                <el-input  v-model="data.subject" style="width: 200px;"></el-input>
              </span>
              <span v-else style="margin-left: 10px;'">如权利要求{{data.parent.number}}所述的{{store.rootData.children[data.rootIndex].subject}}</span>
            </div>
            <el-input v-model="data.text" type="textarea" resize="none" :rows="3"></el-input>
            <div v-if="data.tags && data.tags.length !== 0" style="margin-top: 10px;">
              <span>注释：</span>
              <el-tag
                v-for="(item, index) in data.tags"
                :key="index"
                :disable-transitions="true"
                style="margin-left: 5px;"
                :title="item.content">
                  {{ item.title }}
              </el-tag>
            </div>
            <div style="margin-top: 10px;overflow: hidden;">
              <el-button type="text" size="mini" v-if="data.children && data.children.length" @click="store.toggleOpen(data)">{{ data.open ? '收起附属项' : '展开附属项' }}</el-button>
              <div style="width: 250px; text-align: left;float: right;">
                <el-button circle icon="el-icon-edit-outline" size="mini" type="primary" @click="handleMark({data, store})" title="注释"></el-button>
                <el-button circle icon="el-icon-plus" size="mini" type="primary" @click="handleAdd({data, store})" title="添加"></el-button>
                <el-button circle icon="el-icon-minus" size="mini" type="primary" @click="handleDlete({data, store})" title="删除"></el-button>
                <el-button circle icon="el-icon-view" size="mini" type="primary" @click="handleTree({data, store})" title="修改引用"></el-button>
                <el-button circle icon="el-icon-arrow-up" size="mini" type="primary" @click="handleMove({data, store}, 'up')" v-if="!(data.index === 0)" title="上移"></el-button>
                <el-button circle icon="el-icon-arrow-down" size="mini" type="primary" @click="handleMove({data, store}, 'down')" v-if="!data.isLast" title="下移"></el-button>
              </div>
            </div>
          </el-card>
        </template>
      </div>
    </draggable-tree>
    <el-dialog title="注释" :visible.sync="dialogVisible" @closed="clearForm">
      <el-form ref="form" :model="form" label-position="top">
        <el-form-item prop="title" label="注释标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item prop="content" label="注释内容">
          <el-input type="textarea" v-model="form.content"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 0px;">
          <el-button type="primary" @click="handleMarkSubmit">确认注释</el-button>
          <el-button type="danger" @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="修改引用" :visible.sync="treeVisible" @closed="clearTree">
      <el-tree
        ref="editTree"
        :props="treeProps"
        :data="treeData"
        show-checkbox
        default-expand-all
        :check-strictly="true"
        :check-on-click-node="true"
        :expand-on-click-node="false"
        node-key="_id"
        @check-change="singleCheck"
        >
      </el-tree>
      <div>
        <el-button type="primary" @click="handleTreeSubmit">确认修改</el-button>
        <el-button type="danger" @click="treeVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>

</template>
<script>
import {DraggableTree} from 'vue-draggable-nested-tree'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'treeEditor',
  data () {
    return {
      treeData: [],
      numberLock: false,
      number: 1,
      form: {
        title: '',
        conten: ''
      },
      dialogVisible: false,
      cacheNodeData: null,
      cacheNodeDataTree: null,
      treeVisible: false,
      rootIndex: 0,
      treeProps: {
        label: 'number',
        children: 'children'
      }
    }
  },
  computed: {
    ...mapGetters([
      'documentTreeData'
    ]),
    key () {
      return this.$route.params.key
    },
    
  },
  methods: {
    ...mapActions([
      'setDocumentTreeData'
    ]),
    handleChange () {
      this.refreshTreeWithNumber()
    },
    handleMove ({data, store}, direction) {
      const total = data.parent.children.length
      let startIndex = data.index
      let endIndex = direction === 'up' ? startIndex - 1 : startIndex + 1
      if (endIndex < 0 || endIndex > total - 1) return false  

      const arr = data.level === 1 ? this.treeData : data.parent.children
      let arrItem = arr.splice(startIndex, 1)[0]
      arr.splice(endIndex, 0, arrItem)

      this.refreshTreeWithNumber()
    },
    handleMark ({data, store}) {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.form.title = window.getSelection().toString()
        this.cacheNodeData = data
      })
    },
    handleMarkSubmit () {
      if (this.form.title === '') {
        this.$message({message: '标题不能为空', type: 'warning'})
        return false
      }
      if (this.cacheNodeData.tags) {
        this.cacheNodeData.tags.push({title: this.form.title, content: this.form.content})
      } else {
        this.cacheNodeData.tags = [{title: this.form.title, content: this.form.content}]
      }
      this.dialogVisible = false
    },
    singleCheck (node, status) {
      if(status) {
        this.$refs.editTree.setCheckedKeys([node._id])
      }
    },
    handleTree ({data, store}) {
      this.treeVisible = true
      this.cacheNodeDataTree = data
      this.$nextTick(() => {
        this.$refs.editTree.setCheckedKeys([data.parent._id])
      })
    },
    handleTreeSubmit() {
      const nodes = this.$refs.editTree.getCheckedNodes()
      if (!nodes[0]) return this.$message({message: '请选择一个节点', type: 'warning'})

      const data = this.cacheNodeDataTree 
      const arr = data.level === 1 ? this.treeData : data.parent.children
      const arrItem = arr.splice(this.cacheNodeDataTree.index, 1)
      nodes[0].children.push(...arrItem)

      this.refreshTreeWithNumber()
      this.treeVisible = false
    },
    handleRootAdd () {
      this.treeData.push({text: 'addRoot'})
      this.refreshTreeWithNumber()
    },
    handleAdd ({data, store}) {
      console.log(data, store);
      data.children.push({text: 'add'})
      this.refreshTreeWithNumber()
    },
    handleDlete ({data, store}) {
      const arr = data.level === 1 ? this.treeData : data.parent.children
      const index = data.index
      arr.splice(index, 1)
      if (data.children && data.children.length != 0) {
        arr.splice(index, 0, ...data.children)
      }

      this.refreshTreeWithNumber()
    },
    refreshTree () {
      const cache = this.treeData
      this.treeData = []
      this.$nextTick(() => {
        this.treeData = cache
      })
    },
    closeDrag (e) {
      e.stopPropagation()
    },
    refreshTreeWithNumber () {
      this.setNumber(this.treeData)
      this.refreshTree()
    },
    setNumber (val) {
      this.number = 1
      this.setNumberRe(val)
    },
    setNumberRe (val, rootIndex = 0) {
      const total = val.length;
      val.forEach((item, index) => {
        item.number = this.number
        item.index = index
        item.isLast = index + 1 === total
        item.rootIndex = rootIndex 
        if(item.level === 1) rootIndex = index
        this.number++
        if (item.children && item.children.length !== 0) {
          this.setNumberRe(item.children, rootIndex)
        }
      })
    },
    clearForm () {
      this.$refs.form.resetFields()
    },
    clearTree () {
      this.$refs.editTree.setCheckedKeys([])
    },
    savePageData () {
      this.setDocumentTreeData({data: this.treeData, key: this.key})
    }
  },
  beforeRouteLeave (to, from, next) {
    this.savePageData()
    next()
  },
  created () {
    this.treeData = this.documentTreeData[this.key] ? this.documentTreeData[this.key] : []
  },
  components: {
    DraggableTree
  }
}
</script>

<style>
.he-tree{
  /*border: 1px solid #ccc;*/
  /*padding: 20px;*/
  /*float: left;*/
  /*width: 100%;*/
  /*margin-right: 30px;*/
}
.tree-node{
}
.tree-node-inner{
  padding: 5px;
  /*border: 1px solid #ccc;*/
  cursor: pointer;
}
.draggable-placeholder{
}
.draggable-placeholder-inner{
  border: 1px dashed #0088F8;
  box-sizing: border-box;
  background: rgba(0, 136, 249, 0.09);
  color: #0088f9;
  text-align: center;
  padding: 0;
  display: flex;
  align-items: center;
}
.he-tree .el-card__header{
  padding: 10px;
}
</style>
