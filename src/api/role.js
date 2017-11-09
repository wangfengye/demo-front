import fetch from '@/util/fetch'

const BASE_URL = '/api/role'

export function getRoles () {
  return fetch.get(BASE_URL)
}
export function createRole (role, description) {
  return fetch.postp(BASE_URL, {
    role, description
  })
}
export function deleteRole (roleId) {
  return fetch.delete(BASE_URL + '/' + roleId)
}
export function correlation (roleId, permissionId) {
  return fetch.postp(BASE_URL + '/correlation', {
    roleId, permissionId
  })
}
export function unCorrelation (roleId, permissionId) {
  return fetch.delete(BASE_URL + '/correlation', {
    roleId, permissionId
  })
}
