// 获取时间 如: '2017-11-22'
export function getTime () {
  let date = new Date()
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}
