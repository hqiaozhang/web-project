/**
 * @Author:      zhq
 * @DateTime:    2017-01-13 13:52:27
 * @Description: 渐变柱状图
 * @Last Modified By:   zhq
 * @Last Modified Time:    2017-01-13 13:52:27
 */

define(function (require) {
    /**
     * 引入公用的文件
     */
    require('d3')
    require('lodash')
    // 引入公用的方法组件
    var commonUnit = require('../commonUnit')
    //图片路径
    var IMGPATH = commonUnit.imgPath()

    var gradientBar = {
        /**
         * 柱状图默认配置项
         */
        defaultSetting: function () {
            return {
                width: 500,
                height: 200,
                fontFamily: '微软雅黑',
                min: 1,
                // svg的上右下左的值(用于控制文字显示不全)
                padding: {
                    top: 35,
                    right: 70,
                    bottom: 0,
                    left: 30
                },
                // 条形图配置项
                itemStyle: {
                    height: 6,
                    // 背景色填充
                    color: '#282f36',
                    // 渐变配置项
                    gradient: {
                        color: ['#9936e8', '#49aefe'],
                        id: 'linearColor',
                        x1: '30%',
                        y1: '0%',
                        x2: '100%',
                        y2: '0%',
                        offset1: '0%',
                        offset2: '100%',
                        opacity1: 1,
                        opacity2: 1
                    },
                    radius: 10,  // 条形图两边的半径,
                    margin: {
                        top: 10,
                        right: 30,
                        bottom: 0,
                        left: 50
                    },
                },
                // 左边文字配置项
                leftText: {
                    fontSize: 12,
                    color: 'yellow',
                    textAnchor: 'end'
                },
                // 右边文字配置项
                rightText: {
                    fontSize: 12,
                    color: '#fff',
                    textAnchor: 'middle'
                }
            }
        },

        /**
         *  绘制图表
         *  @param    {string} id   容器id
         *  @param    {array}  data 图表数据
         *  @param    {object} opt  图表配置项
         *
         *  example:
         *  [
         *    {
         *      name: "江北区",
         *      value: 234
         *    }
         *  ]
         */
        drawCharts: function (id, data, opt) {
            var config = _.merge({}, this.defaultSetting(), opt)
            var dataset = []
            for (var i = 0, len = data.length; i < len; i++) {
                dataset.push(data[i].value)
            }
            var padding = config.padding

            var height = config.height + padding.top + padding.bottom

            // 创建svg
            var svg = commonUnit.addSvg(id, config)
            /**
             * 获取update部分
             */
            var update = svg.selectAll('g')
                .data(data)

            // 获取enter部分
            var enter = update.enter()

            // 获取exit部分
            var exit = update.exit()

            // 处理exit
            exit.remove()

            // 计算行高
            var height = config.height - config.padding.bottom
            var lineHeigh = height / dataset.length
            // 处理enter部分
            var appendG = enter.append('g')
                .attr('transform', function (d, i) {
                    return 'translate(0,' + (lineHeigh * i) + ')'
                })
                .attr('class', 'group')

            // 处理update部分
            var selectG = update.attr('transform', function (d, i) {
                return 'translate(0,' + (lineHeigh * i) + ')'
            })

            var lText = appendG.append('text')
            var rectBg = appendG.append('rect')
            var rect = appendG.append('rect')
            var paths = appendG.append('path')
            var img = appendG.append('image')
            var rText = appendG.append('text')

            var dom = {
                lText: lText,
                rectBg: rectBg,
                rect: rect,
                paths: paths,
                img: img,
                rText: rText
            }
            // 初始化调用添加元素的方法
            this.addElement(id, data, dom, config)

            lText = selectG.select('.left-text')
            rectBg = selectG.select('.rect-bg')
            rect = selectG.select('.rect-data')
            paths = selectG.select('.left-path')
            img = selectG.select('.left-img')
            rText = selectG.select('.right-text')
            dom = {
                lText: lText,
                rectBg: rectBg,
                rect: rect,
                paths: paths,
                img: img,
                rText: rText
            }
            // 有更新的调用添加元素的方法
            this.addElement(id, data, dom, config)
        },


        /**
         *  @describe [添加元素(text, rect, rect, text)]
         *  @param    {[string]}   id   [容器id]
         *  @param    {[object]}   dom  [各元素集合]
         */
        addElement: function (id, data, dom, config) {
            var dataset = []
            for (var i = 0, len = data.length; i < len; i++) {
                dataset.push(data[i].value)
            }
            var padding = config.padding

            // 小矩形方块配置
            var itemStyle = config.itemStyle
            // 渐变配置项
            var gradientCfg = itemStyle.gradient
            var colors = [
                {
                    id: itemStyle.gradient.id,
                    color: itemStyle.gradient.color
                }
            ]
            // 调用添渐变
            commonUnit.addGradient(id, colors, gradientCfg)
            var width = config.width - padding.left - padding.right
            // 数据的显示范围
            // 设置左边文字
            var leftTxt = config.leftText

            // 右边文字配置
            var rightTxt = config.rightText
            var margin = itemStyle.margin
            // 数据最大宽度
            var dataWidth = width - padding.left - padding.right - margin.left - margin.right

            var xScale = d3.scale.linear()
                .domain([0, d3.max(dataset)])
                .range([dataWidth, 0])

            // 添加左边文字
            dom.lText
                .attr({
                    fill: leftTxt.color,
                    'font-size': leftTxt.fontSize,
                    'text-anchor': leftTxt.textAnchor,
                    class: 'left-text',
                    x: padding.left,
                    y: itemStyle.height,
                    transform: 'translate(15,0)'
                })
                .text(function (d, i) {
                    return data[i].name
                })

            // 添加数据
            dom.rect
                .attr({
                    class: 'rect-data',
                    fill: 'url(#' + gradientCfg.id + ')',
                    y: 0,
                    x: padding.left + itemStyle.margin.left,
                    rx: itemStyle.radius,
                    ry: itemStyle.radius,
                    height: itemStyle.height,
                    width: function (d) {
                        var dWidth = dataWidth - xScale(d.value)
                        if (dWidth <= 0) {
                            dWidth = config.min
                        }
                        return dWidth
                    }
                })
            //添加左脚线条
            dom.paths
                .attr({
                    class: 'left-path',
                    fill: 'none',
                    stroke: leftTxt.color,
                    'stroke-width': 3,
                    transform: function(d){
                        var offsetX = -leftTxt.fontSize * (d.name.length-2)
                        return 'translate(' + offsetX + ',3)'
                    },
                    d: function(d){
                        var sP = 0 + ',' + leftTxt.fontSize
                        var eP = d.name.length * leftTxt.fontSize -4 + ',0'
                        return 'm'+ sP +' l30,0 l5,5 l'+ eP
                    }
                })
            //添加左边小图标
            dom.img
                .attr({
                    class: 'left-img',
                    x: 3,
                    y: 0,
                    width: 20,
                    height: 24,
                    transform: function(d){
                        var offsetX = -leftTxt.fontSize * (d.name.length-2)
                        return 'translate(' + offsetX + ',0)'
                    },
                    'xlink:href': IMGPATH + '../qinqing/equipment/icon-visitor.png'
                })
            // 添加右边文字
            dom.rText
                .attr({
                    fill: rightTxt.color,
                    'fill-opacity': 0.4,
                    'font-size': rightTxt.fontSize,
                    'text-anchor': rightTxt.textAnchor,
                    x: function (d) {
                        var dWidth = dataWidth - xScale(d.value)
                        if (dWidth <= 0) {
                            dWidth = config.min
                        }
                        return dWidth + 140
                    },
                    y: itemStyle.height,
                    class: 'right-text'
                })
                .text(function (d, i) {
                    return data[i].value
                })
        }
    }
    return gradientBar
})

