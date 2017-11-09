import fetch from '@/util/fetch'

const BASE_URL = '/api/user'

export function login (username, password) {
  return fetch.postp('/login', {
    username, password
  })
}

export function getUsers () {
  return fetch.get(BASE_URL)
}

export function createUser (account, password) {
  return fetch.postp(BASE_URL, {
    account, password
  })
}

export function changePassword (userId, newPassword) {
  return fetch.put(BASE_URL + '/' + userId, {
    newPassword
  })
}

export function deleteUser (userId) {
  return fetch.delete(BASE_URL + '/' + userId)
}

export function correlation (userId, roleId) {
  return fetch.postp(BASE_URL + '/correlation', {
    userId, roleId
  })
}

export function unCorrelation (userId, roleId) {
  return fetch.delete(BASE_URL + '/correlation', {
    userId, roleId
  })
}
