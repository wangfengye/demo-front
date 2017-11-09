/**
 * gank api
 */
import fetch from '@/util/fetch'

const BASE_URL = 'http://gank.io/api/data'
export function getImages (count, page) {
  return fetch.get(BASE_URL + '/福利/' + count + '/' + page)
}
