import axios from 'axios'

export const getOrderById = (id) => {
  return axios.get('api/order/getOrderById', {
    params: {
      id: id
    }
  })
}

export const updateOrder = (order) => {
  return axios.post('api/order/updateOrderRate', order)
}
