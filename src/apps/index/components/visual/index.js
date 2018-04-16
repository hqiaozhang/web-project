/*
 * @Author: zhanghongqiao@hiynn.com 
 * @Date: 2018-04-16 17:46:15 
 * @Description: 可视化列表页
 * @Last Modified by: zhanghongqiao@hiynn.com
 * @Last Modified time: 2018-04-16 17:58:54
 */
import $ from 'jquery'
import hbs from './index.hbs'
import './styles/index.css'

export default class Visual {
  /**
   * Creates an instance of Visual.
   * @param {string} selector 容器选择集 
   */
  constructor(selector) {
    this.selector = selector
    $(selector).html(hbs())
  }
  /**
   * @description 渲染方法
   */
  render() {
    console.log('Visual')
  }
}
