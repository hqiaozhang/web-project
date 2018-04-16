 
import $ from 'jquery'
import Home from '../components/home'
import Visual from '../components/visual'

export default class Index {
  constructor() {
    this.home = new Home('.home-container')
    this.visual = new Visual('.visual-container')
  }

  bindEvent() {
    $('.header-nav').on('click', 'a', (evt) => {
      let index = $(evt.target).index()
      $('.container-warp').fadeOut()
      $('.main').find('.container-warp').eq(index).fadeIn()
    })
  }

  render() {
    this.home.render()
    this.bindEvent()
  }
}
