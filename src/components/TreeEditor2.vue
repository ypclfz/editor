<template>
  <div class="hello">
    <vue-trees :data="data1" :type="'fold'" :canCheck="canCheck"  :control="control" :bgColor="bgColor" :fontColor="fontColor"></vue-trees>
    <vue-trees :data="data"  :canCheck="false"  :control="control" :afterAddNode="add" :beforeAddNode="beforeAddNode" ></vue-trees>
    <span class="change" @click="mod()">修改</span>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      data: [{"title": "第一个", 
        "expanded": true,  
        "children": [{
          "title": "1-1",
          "expanded": true,
          "children": [{
            "title": "1-1-1",
             "children": [{
               "title": "1-1-1-1"
             }]
          }, {
            "title": "1-1-2"
          }, {
            "title": "1-1-3"
          }]
        }]
      },
      {
        "title": "第二个" 
      }],
      data1: [{"title": "第一个", 
        "expanded": true,  
        "children": [{
          "title": "1-1",
          "expanded": true,
          "children": [{
            "title": "1-1-1",
             "children": [{
               "title": "1-1-1-1"
             }]
          }, {
            "title": "1-1-2"
          }, {
            "title": "1-1-3"
          }]
        }]
      },
      {
        "title": "第二个" 
      }],
      canCheck: true,
      control: false,
      bgColor: '#339999',
      fontColor: 'white'
    }
  },
  mounted () {
    
  },
  methods: {
    mod () {
      console.log(this.data)
      this.control = !this.control
    },
    add: function() {
      console.log('Now is add')
    },
    beforeAddNode (node) {
      console.log(node)
      return 'no'
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello {
  padding: 20px;
}
.change {
  background: #336699;
  padding: 5px 20px;
  color: white;
  border-radius: 5px
}
</style>