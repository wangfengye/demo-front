import fetch from '@/util/fetch'

export function findByName (name) {
  return fetch({
    url: 'api/appVersion/' + name,
    method: 'get'
  })
}
export function deleteById (id) {
  return fetch.delete('api/appVersion/' + '/' + id)
}
