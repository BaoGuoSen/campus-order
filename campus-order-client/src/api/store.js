import axios from 'axios'

export const getStoreByStoreId = (id) => {
  return axios.get('api/store/getStoreByStoreId', {
    params: {
      id: id
    }
  })
}
