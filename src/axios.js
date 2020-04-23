import axios from 'axios'

export default axios.create({
  baseURL: '/apis',
  timeout: 5000
})
