import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/todos',
    method: 'get',
    params
  })
}
