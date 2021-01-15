import axios from 'axios'
// import qs from 'qs'
// import store from '@/store'

const service = axios.create({
  // baseURL: process.env.VUE_APP_API_URL,
  responseType: 'json',
  timeout: 180000, // 超时时间
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截
service.interceptors.request.use(config => {
  // if (store.getters.token) {
  //   config.headers.token = store.getters.token || ''
  // }
  // config.data = qs.stringify(config.data)
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截

service.interceptors.response.use(response => {
  if (response.data.code === '11001') {
    return (location.href = response.data.redirectUrl)
  }
  if (response.data.code === '0000') {
    response.data.code = 200
  }
  return response
}, error => {
  return Promise.reject(error)
})

const get = (url, params = {}, config = {}) => {
  return new Promise((resolve, reject) => {
    service
      .get(url, { params: params, ...config })
      .then(
        res => {
          resolve(res.data)
        },
        err => {
          reject(err)
        }
      ).catch(error => {
        reject(error)
      })
  })
}

const post = (url, data = {}, config = {}) => {
  return new Promise((resolve, reject) => {
    service
      .post(url, data, config).then(
        res => {
          resolve(res.data)
        },
        err => {
          reject(err)
        }
      ).catch(error => {
        reject(error)
      })
  })
}

const del = (url, params = {}, config = {}, data = {}) => {
  return new Promise((resolve, reject) => {
    service
      .delete(url, { params: params, ...config, data })
      .then(
        res => {
          resolve(res.data)
        },
        err => {
          reject(err)
        }
      ).catch(error => {
        reject(error)
      })
  })
}

const put = (url, data = {}, config = {}) => {
  return new Promise((resolve, reject) => {
    service
      .put(url, data, config).then(
        res => {
          resolve(res.data)
        },
        err => {
          reject(err)
        }
      ).catch(error => {
        reject(error)
      })
  })
}

export { post, get, del, put }
