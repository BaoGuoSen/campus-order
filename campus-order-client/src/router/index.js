import Vue from 'vue'
import Router from 'vue-router'

const index = () => import('@/view/index')
const login = () => import('@/components/login')
const chooseUserType = () => import('@/components/chooseUserType')
const register = () => import('@/components/register')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index/login'
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [
        {
          path: 'login',
          name: 'login',
          component: login
        },
        {
          path: 'chooseUserType',
          name: 'chooseUserType',
          component: chooseUserType
        },
        {
          path: 'register',
          name: 'register',
          component: register
        }
      ]
    }
  ]
})
