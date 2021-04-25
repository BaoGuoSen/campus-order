// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import AMap from 'vue-amap'
import 'element-ui/lib/theme-chalk/index.css'
import socket from './util/websocket'
import {getDistance} from './util/amap-getDistance'
AMap.getDistance = getDistance
Vue.use(AMap)

AMap.initAMapApiLoader({
  key: '2f3a1ccf54a3ffcd0591b284b9dc15c1', // 你的key
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.Geolocation', 'AMap.Geocoder', 'AMap.AMapManager', 'AMap.Marker'], // 应用功能项
  v: '1.4.4', // 版本
  uiVersion: '1.0' // ui版本
})
Vue.prototype.socket = socket
Vue.prototype.$axios = axios
Vue.use(router)
Vue.use(ElementUI)
Vue.config.productionTip = false
// http response 响应拦截器
axios.interceptors.response.use(response => {
  console.log(response)
  return response
}, error => {
  if (error.response) {
    // 返回接口返回的错误信息
    return Promise.reject(error.response.data)
  }
})
/* eslint-disable no-new */

// 路由权限控制
router.beforeEach((to, from, next) => {
  const userType = sessionStorage.getItem('userType')
  if (to.meta.requireAuth) {
    if (to.meta && to.meta.userTypes.includes(userType)) {
      next()
    } else {
      console.log(to.meta.userTypes.includes(userType), userType, to.meta.userTypes)
      next({path: '/403'})
    }
  } else {
    next()
  }
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
