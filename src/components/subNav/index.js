/*
 * @Author: zhanghongqiao@hiynn.com 
 * @Date: 2018-04-09 22:05:54 
 * @Description: 头部导航
 * @Last Modified by: zhanghongqiao@hiynn.com
 * @Last Modified time: 2018-04-17 22:45:39
 */
 
import $ from 'jquery'
import hbs from './index.hbs' 
import './index.css'

export default class SubNav {
  /**
   *  构造函数
   */
  constructor(selector, data) {
    $(selector).append(hbs(data))
  }
}
