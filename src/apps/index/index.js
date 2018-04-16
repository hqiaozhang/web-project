/**
 * @Author:      zhanghq
 * @DateTime:    2017-12-26 17:21:38
 * @Description: 主文件
 * @Last Modified By:   zhanghq
 * @Last Modified Time:    2017-12-26 17:21:38
 */

// import '@/loader/common/scripts/modernizr.custom'
import mockApis from './mock'
import loader from '@/loader/loader'
import Index from './scripts'
import './styles/index.css'
const index = new Index()

loader.load({
  apis: mockApis, 
  init() {
    index.render()
  }
})
