import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Ckeditor from '@/components/Ckeditor'
import TreeEditor from '@/components/TreeEditor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/ckeditor/:key',
      name: 'Ckeditor',
      component: Ckeditor
    },
    {
      path: '/tree_editor/:key',
      name: 'TreeEditor',
      component: TreeEditor
    }
  ]
})
