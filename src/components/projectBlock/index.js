/*
 * @Author: zhanghongqiao@hiynn.com 
 * @Date: 2018-04-17 09:18:38 
 * @Description: 缩略图方式布局
 * @Last Modified by: zhanghongqiao@hiynn.com
 * @Last Modified time: 2018-04-17 09:40:18
 */
 
import $ from 'jquery'
import hbs from './index.hbs'  
import './index.css'
 
export default class ProjectBlock {
 
  /**
   * Creates an instance of ProjectList.
   * @param {string} 元素选择器 
   */
  constructor(selector) {
    this.selector = selector
  }

  render(data) {
    $(this.selector).html(hbs(data))
  }
}
