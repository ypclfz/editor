<template>
  <div style="position: relative;">
    <div style="margin-right: 200px;">
      <textarea id='editor'></textarea>
    </div>
    <list ref="list" :data='listData' style="position: absolute; top: 0;right: 0;width: 180px;"></list>
  </div>
</template>
<script>
import List from '@/components/CkeditorList'

import CKEDITOR from 'ckeditor'
import config from '@/config/ckeditorConfig'
import {mapActions, mapGetters} from 'vuex'

const socketUrl = 'wss://editor.hongjianguo.com:2000'
export default {
  name: 'ckeditor',
  data () {
    return {
      editor: null,
      socket: null,
      listData: [],
      listDataCache: [],
      setListDataLock: false,
      sendingStr: '',
      oldStr: '',
      sendingLock: false
    }
  },
  computed: {
    ...mapGetters([
      'documentData'
    ]),
    key () {
      return this.$route.params.key
    }
  },
  methods: {
    ...mapActions([
      'setDocumentData',
      'setEditor'
    ]),
    init () {
      this.editor = CKEDITOR.replace('editor', config)
      window.editor = this.editor
      // this.socketInit()
      this.editor.on('change', (event) => {
        this.searchEditorData()
      })
      this.editor.on('focus', (event) => {
        this.socketInit()
        // this.searchEditorData()
      })
    },
    socketInit () {
      if (this.socket && this.socket.readyState !== 3) return false

      this.socket = new WebSocket(socketUrl)

      this.socket.onopen = () => {
        // Web Socket 已连接上，使用 send() 方法发送数据
        console.log('socket连接建立...')
      }

      this.socket.onmessage = (evt) => {
        console.log('数据已接收...')
        const data = JSON.parse(evt.data)
        console.log(data)
        this.setListData(data, 1000)
      }

      this.socket.onerror = () => {
        console.log('通信错误...')
      }

      this.socket.onclose = () => {
        // 关闭 websocket
        console.log('连接已关闭...')
      }
    },
    socketClose () {
      if (!this.socket || this.socket.readyState === 3) return false
      console.log('socketClose')
      this.socket.close()
    },
    searchEditorData () {
      let element = this.editor.getSelection().getStartElement()
      if (element) {
        let str = element.$.innerText
        str = str.replace(/[\n\r\s\u200b]/g, '')
        this.socketSender(str, 500)
      }
    },
    socketSender (data, time = false) {
      this.sendingStr = data

      if (time === false) {
        this.sendStr()
      } else {
        if (!this.sendingLock) {
          this.sendingLock = true
          window.setTimeout(() => {
            this.sendStr()
            this.sendingLock = false
          }, time)
        }
      }
    },
    sendStr () {
      console.log('sendStr')
      const str = this.sendingStr
      if (!this.socket || this.socket.readyState === 3) return false
      if (str === '' || str === this.oldStr) return false
      console.log(str)
      this.socket.send(str)
      this.oldStr = str
    },
    setListData (data, time = false) {
      if (!data) return false
      if (!Array.isArray(data)) return false

      this.listDataCache = data
      if (time === false) {
        this.listData = data
      } else {
        if (!this.setListDataLock) {
          this.setListDataLock = true

          window.setTimeout(() => {
            this.listData = this.listDataCache

            this.setListDataLock = false
          }, time)
        }
      }
    },
    savePageData () {
      const key = this.key
      const data = this.editor.getData()
      this.setDocumentData({data, key})
    },
    setPageData () {
      let data = this.documentData[this.key]
      data = data === undefined ? '' : data
      this.editor.setData(data)
    }
  },
  beforeRouteUpdate (to, from, next) {
    console.log('ckeditor beforeRouteUpdate')
    this.savePageData()
    next()
  },
  beforeRouteLeave (to, from, next) {
    console.log('ckeditor beforeRouteLeave')
    this.savePageData()
    this.editor.destroy()
    window.editor = null
    this.socketClose()
    next()
  },
  mounted () {
    console.log('ckeditor mounted')
    // 编辑器设置
    this.init()
    this.setPageData()
  },
  watch: {
    key () {
      console.log('ckeditor watch key')
      this.setPageData()
    }
  },
  components: {
    List
  }
}
</script>
