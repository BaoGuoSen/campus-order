import axios from 'axios'

// 更新用户信息
export const updateUser = (user) => {
  return axios.post('api/user/update', user)
}