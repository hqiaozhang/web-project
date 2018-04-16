/**
 * @Author:      zhanghq
 * @DateTime:    2017-11-22 09:46:54
 * @Description: 文字溢出处理
 * @Last Modified By:   zhanghq
 * @Last Modified Time:    2017-11-22 09:46:54
 */

export default function overflow(data, len) {
  let nLen = len
  let str = '...'
  if(data.length > 8) {
    nLen = len + 2
    str = '...'
  }else {
    nLen = data.length
    str = ''
  }
  return `${data.slice(0, nLen)}${str}`
  
}
