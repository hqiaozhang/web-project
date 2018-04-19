/*
 * @Author: zhanghongqiao@hiynn.com 
 * @Date: 2018-04-19 21:12:08 
 * @Description: 业务系统
 * @Last Modified by: zhanghongqiao@hiynn.com
 * @Last Modified time: 2018-04-19 22:42:10
 */
 
import $ from 'jquery'
import hbs from './index.hbs'
import dataSources from '@/../static/json/businessSystem.json'
import ProjectList from '@/components/projectList'
import ProjectBlock from '@/components/projectBlock'
import './styles/index.css'
const containr = '.business-container' 

export default class BusinessSystem {
  /**
   * Creates an instance of Visual.
   * @param {string} selector 容器选择集 
   */
  constructor(selector) {
    this.selector = selector
    $(selector).html(hbs())
    this.projectList = new ProjectList(`${containr} .list-project-wrap`)
    this.projectBlock = new ProjectBlock(`${containr} .block-project-wrap`)
 
  }
 
  /**
   * @description 渲染方法
   */
  render() {
    this.projectList.render(dataSources)
    this.projectBlock.render(dataSources)
    this.bindEvent()
  }

  bindEvent() {
    // 点击icon
    $(`${containr} .view-mode`).on('click', 'i', (evt) => {
      let $this = $(evt.target)
      let index = $this.index()
      $this.addClass('active').siblings().removeClass('active')
      $(`${containr} .project-wrap`).fadeOut()
      $(containr).find('.project-wrap').eq(index).fadeIn()
    })
  }
}
