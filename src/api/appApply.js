// app 密码验证申请api
import fetch from '@/util/fetch'
const BASE_URL = 'api/app/apply'
// 获取所有申请
export function findAll () {
  return fetch.get(BASE_URL)
}

export function submitApply (userName, desc, imei, applyDate) {
  return fetch.postp(BASE_URL, {
    userName, desc, imei, applyDate
  })
}
