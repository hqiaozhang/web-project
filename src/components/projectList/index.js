/*
 * @Author: zhanghongqiao@hiynn.com 
 * @Date: 2018-04-09 22:32:26 
 * @Description: 项目区域
 * @Last Modified by: zhanghongqiao@hiynn.com
 * @Last Modified time: 2018-04-16 21:02:13
 */
import list from '@/../static/json/visualProject.json'
 
import $ from 'jquery'
import hbs from './index.hbs' 
import './index.css'
 
export default class ProjectList {
  /**
   *  构造函数
   */
  constructor(selector) {
    console.log(selector)
    $(selector).append(hbs(list))
  }
}
