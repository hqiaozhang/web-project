/**
 * @Author:      zhanghq
 * @DateTime:    2017-07-18 15:49:23
 * @Description: 饼图
 * @Last Modified By:   zhanghq
 * @Last Modified Time:    2017-07-18 15:49:23
 */


define(function(require) {
  /**
  * 引入公用的文件
  */
  require('d3')
  require('lodash')
  // 引入公用的组件
  var commonUnit = require('./commonUnit')
  
  var config // 通用配置项
  var pie // 转换原始数据为能用于绘图的数据
  var pieData // pie函数处理后的数据
  var innerRadius  // 定义内半径
  var outerRadius  // 定义外半径
  var arc1 // 定义计算弧形路径的函数
  var arc2 // 定义计算弧形路径hover的函数
  var lineArc // 折线开始的弧生成器
  var lEndArc // 折线结束的弧生成器 
  var isInit = 0 // 是否初始化
   
  /**
   *  默认配置项
   */
  var defaultSetting = {
    width: 1064,
    height: 1084,
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
    line: {
      show: true
    },
    itemStyle: {
      innerRadius: 210,
      outerRadius: 260,
      colors: ['#38f3ff', '#e14c4c'],
      circleBor: '#174793',
      circleBorW: 2,
      ratio: true,
      lineW: 110,
      dy: 110, // 间距
      isDy: false
    },
    lineStyle: {
      fill: '#174793',
      strokeWidth: 2
    },
    text: {
      fontSize: 48,
      fill: '#fff',
      textAnchor: 'middle',
      dy: 3.2
    }
  }

  /**
   *  默认数据源
   */
  var defaultDataSource = [ ]

  /**
   *  g元素tansfrom的位置 
   */
  function gTrans() {
    this.attr({
      transform: 'translate(' + config.width / 2 + ',' + config.height / 2 + ')'
    })
  }

  /**
   * 计算弧长的中心位置  
   */
  function midAngel(d) {
    // 计算弧长的中心位置 =（起始弧度 + 终止弧度）/2 = 弧度的中心位置
    return d.startAngle + (d.endAngle - d.startAngle) / 2
  }

  /**
   * 画最外层圆的圆
  */
  function circleAttr() {
    this.attr({
      cy: 0,
      cx: 0,
      r: outerRadius + 10,
      fill: 'none',
      stroke: config.itemStyle.circleBor,
      'stroke-width': config.itemStyle.circleBorW
    })
    .call(gTrans)
  }

  /**
   *  获取饼图填充色
   *  @example: [example]
   *  @param    {number}  idx [下标]
   */
  function getColor(idx) {
    // 默认颜色
    var defauleColor = [
      '#38f3ff', '#da2c59', '#5ab1ef', '#ffb980', '#d87a80',
      '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa',
      '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050',
      '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089'
    ]
    var palette = _.merge([], defauleColor, config.itemStyle.colors)
    return palette[idx % palette.length]  
  }  

  /**
   *  path属性设置
   */
  function arcPathAttr(roots, id) {
    roots.attr({
      d: function(d) {
        return arc1(d)
      },
      fill: function(d, i) {
        return getColor(i)
      },
     // filter: 'url(#filter1)'
    })
    .on('mouseover', function(d) {
      d3.select(this)
        .attr({
          cursor: 'pointer',
          'fill': '#e6e752'
        })
        .transition()
        .attr('d', function(d) {
          return arc2(d)
        })
      // 换算百分比
      if(config.itemStyle.ratio) {
        d.data.value = (d.value * 100).toFixed(0) + '%'
      }
      
      commonUnit.addTooltip(id, d.data)  
      d3.selectAll('.charts-tooltip')
        .style('display', 'block')
    })
    .on('mouseout', function(d, i) {
      d3.select(this)
        .attr({
          fill: function() {
            return getColor(i)
          }
        })
        .transition()
        .attr('d', function(d) {
          return arc1(d)
        })
      // 隐藏提示框  
      d3.selectAll('.charts-tooltip')
        .style('display', 'none')  
    })
  }

  /**
   *  path组元素(饼图)
   */
  function arcGroup(roots, id) {
    roots.attr('class', 'arcGroup')
      .call(gTrans)

    // 获取update部分 
    var update =  roots.selectAll('path')
      .data(pieData)
      .call(arcPathAttr, id)

    // 处理enter部分
    update.enter()
      .append('path')
      .call(arcPathAttr, id)

    // 处理exit部分
    update.exit().remove()
  }

  /**
   *  text属性设置
   */
  function textAttr(roots, type) {
    roots.attr({
      fill: function(d, i) {
        return getColor(i)
      },
      'text-anchor': function(d) {
        return midAngel(d) < Math.PI ? 'end' : 'start'
      },
      transform: function(d, i) {
        var pos = lEndArc.centroid(d)
        // 改变文字标识的x坐标
        var radius = config.itemStyle.innerRadius 
        var dy = config.itemStyle.dy 
        var tDy = config.text.dy // 文字间距
        var isDy = config.itemStyle.isDy
        if(isDy) {
          isDy = dy
        }else {
          isDy = 0
        }
        var angle = midAngel(d) < Math.PI ? 1 : -1
        pos[0] = radius * (midAngel(d) < Math.PI ? tDy : -tDy) - i * isDy * angle
        return 'translate(' + pos + ')'
      },
      class: function() {
        if(type === 1) {
          return 'name-text'
        }
        return 'value-text'
      },
      dy: function() {
        if(type === 1) {
          return '-0.4em'
        }
        return '1em'
      },
      'font-size': config.text.fontSize
    })
    .text(function(d) {
      if( type === 1 ) {
        return d.data.name
      } else {
      if(config.itemStyle.ratio) {
          return d.data.value = (d.value * 100).toFixed(0) + '%'
      } 
        return  d.data.value
      } 
      
    }) 
  }

  /**
   *  文字组元素 
   */
  function textGroup() {
    this.attr('class', 'textGroup')
    .call(gTrans)

    // 获取name update部分 
    var updateN =  this.selectAll('.name-text')
      .data(pieData)
      .call(textAttr, 1)
    // 处理enter部分  
    updateN.enter()
      .append('text')
      .call(textAttr, 1)
    // 处理exit部分
    updateN.exit().remove()      

   // 获取value update部分 
    var updateV =  this.selectAll('.value-text')
      .data(pieData)
      .call(textAttr, 2)
    // 处理enter部分  
    updateV.enter()
      .append('text')
      .call(textAttr, 2)
    // 处理exit部分
    updateV.exit().remove()
    
  }

 

  /**
   *  线条属性设置
   */
  function polylineAttr() {
    var cfg = config.lineStyle
    this.attr({
      points: function(d, i) {
        var pos = lEndArc.centroid(d)
        // 改变文字标识的x坐标
        var radius = config.itemStyle.outerRadius + config.itemStyle.lineW
        // 文字重合重合重新计算值，改变位置
        var dy = config.itemStyle.dy 
        var isDy = config.itemStyle.isDy
        if(isDy) {
          isDy = dy
        }else {
          isDy = 0
        }
        var angle = midAngel(d) < Math.PI ? 1.1 : -1.1
        pos[0] = radius * (midAngel(d) < Math.PI ? 1.5 : -1.5) - i * isDy * angle
        return [lineArc.centroid(d), lEndArc.centroid(d), pos] 
      },
      fill: 'none',
      stroke: function(d, i) {
        return getColor(i)
      },
      'stroke-width': cfg.strokeWidth
    })
  }

  /**
   *  线条组元素
   */
  function lineGroup() {
    this.attr('class', 'lineGroup')
    .call(gTrans)

    // 获取update部分 
    var update =  this.selectAll('polyline')
      .data(pieData)
      .call(polylineAttr)
    // 处理enter部分  
    update.enter()
      .append('polyline')
      .call(polylineAttr)
    // 处理exit部分
    update.exit().remove()    
  }

  /**
   *  绘制图表
   *  @param    {string} id   容器id
   *  @param    {array}  data 图表数据
   *  @param    {object} opt  图表配置项
   *  
   *  example:
   *  [
   *    {
   *      name: '江北区',
   *      value: 234
   *    }
   *  ] 
   */
  function drawCharts(id, data1, opt) {

    // 合并配置项
    config = _.merge({}, defaultSetting, opt)
    // 获取数据
    var data = data1 || defaultDataSource


    // 处理空数据
    var isData = commonUnit.noData(id, data)
 
    if (isData) {
      return
    }
    // 创建svg
    var svg = commonUnit.addSvg(id, config)
 
    // 转换原始数据为能用于绘图的数据
    pie = d3.layout.pie()
      .sort(null)
      .value(function(d) {
        return d.value
      })
     
    // 初始化的时候生成弧形函数
    if(!isInit) {
      innerRadius = config.itemStyle.innerRadius // 获取内半径
      outerRadius = config.itemStyle.outerRadius // 获取外半径
      // 创建弧生成器(计算弧形路径的函数)
      arc1 = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius) 
      // hover事件用的  
      arc2 = d3.svg.arc()
        .innerRadius(innerRadius - (innerRadius) / 15 )   
        .outerRadius(outerRadius + (outerRadius) / 30 )   
      // 线条的
      lineArc = d3.svg.arc()
        .innerRadius(1.1 * innerRadius)
        .outerRadius(1.1 * outerRadius)
      // 文字  
      lEndArc = d3.svg.arc()
        .innerRadius(1.6 * innerRadius)
        .outerRadius(1.6 * outerRadius)

      // 画一个外圈圆
      // svg.append('circle')
      //   .call(circleAttr)  

      // 调用高斯模糊
      commonUnit.addFilter(id)  
    }

    // 使用pie函数处理数据
    pieData = pie(data) 
    // 创建弧形路径组元素
    if(svg.selectAll('.arcGroup').node()) {
      svg.select('.arcGroup')
        .call(arcGroup, id) 
    }else {
      svg.append('g')
        .call(arcGroup, id) 
    }
    var lineShow = config.line.show
    // 是否显示指示线及文字
    if(lineShow){
      // 创建文字组元素 
      if(svg.selectAll('.textGroup').node()) {
        svg.select('.textGroup')
          .call(textGroup) 
      }else {
        svg.append('g')
          .call(textGroup) 
      }
      // 创建线组元素  
      if(svg.selectAll('.lineGroup').node()) {
        svg.select('.lineGroup')
          .call(lineGroup) 
      }else {
        svg.append('g')
          .call(lineGroup) 
      }
    }
    
  }

  var result = {
    drawCharts: drawCharts
  } 
  return result
})