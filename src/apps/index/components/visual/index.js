/*
 * @Author: zhanghongqiao@hiynn.com 
 * @Date: 2018-04-16 17:46:15 
 * @Description: 可视化页面
 * @Last Modified by: zhanghongqiao@hiynn.com
 * @Last Modified time: 2018-04-19 22:42:06
 */
import $ from 'jquery'
import hbs from './index.hbs'
import dataSources from '@/../static/json/visualProject.json'
import menuData from '@/../static/json/menu.json' // 子菜单导航
import SubNav from '@/components/subNav' 
import ProjectList from '@/components/projectList'
import ProjectBlock from '@/components/projectBlock'
import './styles/index.css'
const containr = '.visual-container' 
export default class Visual {
  /**
   * Creates an instance of Visual.
   * @param {string} selector 容器选择集 
   */
  constructor(selector) {
    this.selector = selector
    $(selector).html(hbs())
    this.header = new SubNav('.sub-nav-wrap', menuData.topMenu[1].children)
    this.projectList = new ProjectList(`${containr} .list-project-wrap`)
    this.projectBlock = new ProjectBlock(`${containr} .block-project-wrap`)
    this.allData = []
    for(let key in dataSources) {
      this.allData.push(...dataSources[key])
    }
 
  }
 
  /**
   * @description 渲染方法
   */
  render() {
    this.projectList.render(this.allData)
    this.projectBlock.render(this.allData)
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

    // 点击分类导航
    $('.sub-nav-wrap').on('click', 'a', (evt) => {
      let $this = $(evt.target)
      $this.addClass('active').siblings().removeClass('active')
      let type = $this.attr('type')
      if(type === 'all') {
        // 查看全部
        this.projectList.render(this.allData)
        this.projectBlock.render(this.allData)
      }else {
        // 分类
        this.projectList.render(dataSources[type])
        this.projectBlock.render(dataSources[type])
      }
      
    })
  }
}
