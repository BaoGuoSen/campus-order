import axios from 'axios'

export const getOrderById = (id) => {
  return axios.get('/api/order/getOrderById', {
    params: {
      id: id
    }
  })
}
