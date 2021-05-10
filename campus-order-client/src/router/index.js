import Vue from 'vue'
import Router from 'vue-router'

const index = () => import('@/view/index')
const customer = () => import('@/view/customer')
const store = () => import('@/view/store')
const refuse = () => import('@/view/403')
const storeInfo = () => import('@/view/storeInfo')

const login = () => import('@/components/login')
const chooseUserType = () => import('@/components/chooseUserType')
const register = () => import('@/components/register')
const ownDishs = () => import('@/components/ownDishs')
const allDishs = () => import('@/components/allDishs')
const orderList = () => import('@/components/orderList')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index/login'
    },
    {
      path: '/403',
      name: '403',
      component: refuse
    },
    {
      path: '/paied',
      name: 'paied',
      component: () => import('@/view/paied')
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
      component: customer,
      children: [
        {
          path: 'allStores',
          name: 'allStores',
          component: () => import('@/components/allStores')
        },
        {
          path: 'allDishs',
          name: 'allDishs',
          component: allDishs
        },
        {
          path: 'cusOrderList',
          name: 'cusOrderList',
          component: () => import('@/components/cusOrderList')
        },
        {
          path: 'orderInfo/:id',
          name: 'orderInfo',
          component: () => import('@/components/orderInfo')
        }
      ]
    },
    {
      path: '/store',
      name: 'store',
      meta: {
        userTypes: ['1'],
        requireAuth: true
      },
      component: store,
      children: [
        {
          path: 'ownDishs',
          name: 'ownDishs',
          component: ownDishs
        },
        {
          path: 'orderList',
          name: 'orderList',
          component: orderList
        },
        {
          path: 'orderInfo/:id',
          name: 'storeOrderInfo',
          component: () => import('@/components/orderInfo')
        }
      ]
    },
    {
      path: '/storeInfo',
      name: 'storeInfo',
      meta: {
        userTypes: ['1'],
        requireAuth: true
      },
      component: storeInfo
    },
    {
      path: '/rider',
      name: 'rider',
      meta: {
        userTypes: ['2'],
        requireAuth: true
      },
      component: () => import('@/view/rider'),
      children: [
        {
          path: 'riderNavigation',
          name: 'riderNavigation',
          component: () => import('@/components/riderNavigation')
        }
      ]
    },
    {
      path: '/apply',
      name: 'apply',
      component: () => import('@/view/alipay')
    }
  ]
})
