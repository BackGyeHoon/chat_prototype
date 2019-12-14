import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Zlist from '@/pages/List'
import Zroom from '@/pages/Room'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'list',
      component: Zlist
    },
    {
      path: '/list',
      name: 'list',
      component: Zlist
    },
    {
      path: '/room/:room_id',
      name: 'room',
      component: Zroom,
      props: true
    }
  ]
})
