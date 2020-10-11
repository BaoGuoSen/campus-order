import Vue from 'vue'
import Router from 'vue-router'

const index = () => import('@/view/index')
const customer = () => import('@/view/customer')
const store = () => import('@/view/store')

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
    },
    {
      path: '/customer',
      name: 'customer',
      meta: {
        userTypes: ['3', '4'],
        requireAuth: true
      },
      component: customer
    },
    {
      path: '/store',
      name: 'store',
      meta: {
        userTypes: ['1'],
        requireAuth: true
      },
      component: store
    }
  ]
})
