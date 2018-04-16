/*
 * @Author: zhanghongqiao@hiynn.com 
 * @Date: 2018-04-16 14:33:55 
 * @Description: 首页
 * @Last Modified by: zhanghongqiao@hiynn.com
 * @Last Modified time: 2018-04-16 17:56:27
 */

// 这里必须引loader里面的jquery，与版本有关系
import $ from '@/loader/common/scripts/jquery'
import '@/loader/common/scripts/modernizr.custom' 
import '@/loader/common/scripts/jquery.imgslider'

import projectList from '@/../static/json/homeProject.json'
import hbs from './index.hbs'
import './styles/index.css'

export default class Home {
  constructor(selector) {
    this.selector = selector
    $(selector).html(hbs(projectList))
  }

  render() {
    $(function() {
      $('#fs-slider').imgslider()
    })
  }
}
