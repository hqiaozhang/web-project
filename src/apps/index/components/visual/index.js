/*
 * @Author: zhanghongqiao@hiynn.com 
 * @Date: 2018-04-16 17:46:15 
 * @Description: 可视化页面
 * @Last Modified by: zhanghongqiao@hiynn.com
 * @Last Modified time: 2018-04-17 22:45:14
 */
import $ from 'jquery'
import hbs from './hbs/index.hbs'
import projectData from '@/../static/json/visualProject.json'
import SubNav from '@/components/subNav'
import ProjectList from '@/components/projectList'
import ProjectBlock from '@/components/projectBlock'
import './styles/index.css'
const dataSources = projectData.data
export default class Visual {
  /**
   * Creates an instance of Visual.
   * @param {string} selector 容器选择集 
   */
  constructor(selector) {
    this.selector = selector
    $(selector).html(hbs())
    this.header = new SubNav('.sub-nav-wrap', projectData.nav)
    this.projectList = new ProjectList('.list-project-wrap')
    this.projectBlock = new ProjectBlock('.block-project-wrap')
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
    $('.view-mode').on('click', 'i', (evt) => {
      let $this = $(evt.target)
      let index = $this.index()
      $this.addClass('active').siblings().removeClass('active')
      $('.project-wrap').fadeOut()
      $('.visual-container').find('.project-wrap').eq(index).fadeIn()
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
