import fetch from '@/util/fetch'

export function findAll () {
  return fetch.get('/api/permission')
}

export function createPermission (permission, description) {
  return fetch.postp('/api/permission', {
    permission,
    description
  })
}

export function deletePermission (permissionId) {
  return fetch.delete('api/permission/' + permissionId)
}
