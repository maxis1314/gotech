import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth_center/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/auth_center/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/auth_center/logout',
    method: 'post'
  })
}
