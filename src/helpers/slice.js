/**
 * @Author:      zhanghq
 * @DateTime:    2017-12-09 17:25:14
 * @Description: 字符截取
 * @Last Modified By:   zhanghq
 * @Last Modified Time:    2017-12-09 17:25:14
 */

export default function slice(name) {
  if(name.length > 5) {
    name.slice(0, 5)
  }
  return name
}
