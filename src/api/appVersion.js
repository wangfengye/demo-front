import fetch from '@/util/fetch'

export function findByName (name) {
  return fetch({
    url: 'api/appVersion/' + name,
    method: 'get'
  })
}
