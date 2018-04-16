 
import Home from '../components/home'
import Visual from '../components/visual'

export default class Index {
  constructor() {
    this.home = new Home('.main')
    this.visual = new Visual('.main')
  }

  renderHome() {
    this.home.render()
  }

  renderVisual() {
    this.visual.render()
  }

  render() {
    this.renderVisual()
  }
}
