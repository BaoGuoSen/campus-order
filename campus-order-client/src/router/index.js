import Vue from 'vue'
import Router from 'vue-router'

const HelloWorld = () => import('@/components/HelloWorld')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
