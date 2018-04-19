 
import $ from 'jquery'
import Home from '../components/home'
import Visual from '../components/visual'
import BusinessSystem from '../components/businessSystem'
import bodyBg from '../images/bg3.jpg'
import menu from '@/../static/json/menu.json' // 子菜单导航

export default class Index {
  constructor() {
    this.home = new Home('.home-container')
    this.visual = new Visual('.visual-container')
    this.businessSystem = new BusinessSystem('.business-container')
    let menuHmtl = ''
    menu.topMenu.map(item => {
      menuHmtl += `<a>${item.name}</a>`
    })
    $('.header-nav').append(menuHmtl)
    $('.header-nav a').eq(0).addClass('active')
  }

  bindEvent() {
    $('.header-nav').on('click', 'a', (evt) => {
      let $this = $(evt.target)
      $this.addClass('active').siblings().removeClass('active')
      let index = $this.index()

      if(index === 0){
        // 首页背景修改
        $('body').css('background', `url(${bodyBg}) fixed no-repeat top center`)
      }else{
        $('body').css('background', '#fff')
      }
      $('.container-warp').fadeOut()
      $('.main').find('.container-warp').eq(index).fadeIn()
    })
  }

  render() {
    this.home.render()
    this.visual.render()
    this.businessSystem.render()
    this.bindEvent()
  }
}
