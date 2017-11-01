import fetch from '@/util/fetch'

export function findAllApp () {
  return fetch({
    url: '/api/app',
    method: 'get'
  })
}

export function findByName (name) {
  return fetch({
    url: '/api/app/' + name,
    method: 'get'
  })
}

export function saveApp (form) {
  return fetch.postp('api/app', {
    name: form.name,
    version: form.version,
    code: form.code,
    apkUrl: form.apkUrl,
    desc: form.desc,
    updateDate: form.updateDate
  })
}
