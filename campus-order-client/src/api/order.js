import axios from 'axios'

export const getOrderById = (id) => {
  return axios.get('api/order/getOrderById', {
    params: {
      id: id
    }
  })
}

export const getOrderByRiderId = (riderId) => {
  return axios.get('api/order/getOrderByRiderId', {
    params: {
      riderId: riderId
    }
  })
}
// 增加订单评分
export const updateOrder = (order) => {
  return axios.post('api/order/updateOrderRate', order)
}

// 修改订单状态，已送达
export const updateOrderStatusConfirm = (id) => {
  return axios.get('api/order/updateOrderStatusConfirm', {
    params: {
      id: id,
      endTime: new Date().getTime()
    }
  })
}
