 
import $ from 'jquery'
import Home from '../components/home'
import Visual from '../components/visual'
import bodyBg from '../images/bg3.jpg'

export default class Index {
  constructor() {
    this.home = new Home('.home-container')
    this.visual = new Visual('.visual-container')
  }

  bindEvent() {
    $('.header-nav').on('click', 'a', (evt) => {
      let index = $(evt.target).index()
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
    this.bindEvent()
  }
}
