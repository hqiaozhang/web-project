/*
 * @Author: zhanghongqiao@hiynn.com 
 * @Date: 2018-04-16 17:46:15 
 * @Description: 可视化列表页
 * @Last Modified by: zhanghongqiao@hiynn.com
 * @Last Modified time: 2018-04-16 20:58:30
 */
import $ from 'jquery'
import hbs from './index.hbs'
import SubNav from '@/components/subNav'
import ProjectList from '@/components/projectList'
import './styles/index.css'

export default class Visual {
  /**
   * Creates an instance of Visual.
   * @param {string} selector 容器选择集 
   */
  constructor(selector) {
    this.selector = selector
    $(selector).html(hbs())
    this.header = new SubNav('.sub-nav-wrap')
    this.projectList = new ProjectList('.project-wrap')
  }
  /**
   * @description 渲染方法
   */
  render() {
    console.log('Visual')
  }
}
