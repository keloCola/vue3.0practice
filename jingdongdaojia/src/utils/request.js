import axios from 'axios'
// 创建一个axios 实例
const instance = axios.create({
  baseURL: 'https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd',
  timeout: 10000 // 超时
})
/**
 * get 请求
 * @param {*} url
 * @param {*} params
 * @returns
 */
export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance.get(url, {params}).then((response) => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}
/**
 * post 请求
 * @param {*} url
 * @param {*} data
 * @returns
 */
export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}
