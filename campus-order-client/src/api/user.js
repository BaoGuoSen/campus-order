import axios from 'axios'

// 更新用户信息
export const updateUser = (user) => {
  return axios.post('api/user/update', user)
}

export const getAllRiders = () => {
  return axios.get('api/user/getAllRiders')
}

// 根据订单id找到持有人id
export const getOwnerIdByOrderId = (orderId) => {
  return axios.get('api/user/getOwnerIdByOrderId', {
    params: {
      orderId: orderId
    }
  })
}
