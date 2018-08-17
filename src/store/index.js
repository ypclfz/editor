import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    title: '一种移动装置',
    documentData: {},
    documentTreeData: {}
  },
  getters: {
    documentTitle: (state) => state.title,
    documentData: (state) => state.documentData,
    documentTreeData: (state) => state.documentTreeData
  },
  mutations: {
    setTitle (state, title) {
      state.title = title
    },
    setDocumentData (state, {data, key}) {
      state.documentData = Object.assign({}, state.documentData, {[key]: data})
    },
    setDocumentTreeData (state, {data, key}) {
      state.documentTreeData = Object.assign({}, state.documentTreeData, {[key]: data})
    }
  },
  actions: {
    setDocumentData ({commit}, {data, key}) {
      if (data === undefined) return
      if (key === undefined) return
      commit('setDocumentData', {data, key})
    },
    setDocumentTreeData ({commit}, {data, key}) {
      if (data === undefined) return
      if (key === undefined) return
      commit('setDocumentTreeData', {data, key})
    }
  }
})
export default store
