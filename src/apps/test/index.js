/**
 * @Author:      zhanghq
 * @DateTime:    2017-12-26 17:21:38
 * @Description: 主文件
 * @Last Modified By:   zhanghq
 * @Last Modified Time:    2017-12-26 17:21:38
 */

import mockApis from './mock'
import loader from '@/loader/loader'
import $ from 'jquery'
 
loader.load({
  apis: mockApis, 
  init() {
    $('body').html('test')
  }
})
