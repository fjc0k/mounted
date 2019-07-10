import Taro from '@tarojs/taro'
import { Canvas } from '@tarojs/components'
import { CanvasAdapter, wrapTouch } from './utils'
import { component } from '../component'
import { MEChartsProps } from './props'

const canvasId = 'canvas'

export default class MECharts extends component({
  props: MEChartsProps,
}) {
  chart: any

  componentDidMount() {
    const { getECharts, options } = this.props
    const echarts = getECharts()
    const ctx = Taro.createCanvasContext(canvasId, this.$scope)
    const canvas = new CanvasAdapter(ctx)
    ;(echarts as any).setCanvasCreator(() => canvas)
    Taro.createSelectorQuery()
      .in(this.$scope)
      .select('.m-echarts__canvas')
      .boundingClientRect(res => {
        this.chart = (echarts as any).init(canvas, null, res)
        this.chart.setOption(options)
        canvas.setChart(this.chart)
      })
      .exec()
  }

  handleTouchStart(e: any) {
    if (this.props.disableTouch) return
    if (this.chart && e.touches.length > 0) {
      const touch = e.touches[0]
      const handler = this.chart.getZr().handler
      handler.dispatch('mousedown', {
        zrX: touch.x,
        zrY: touch.y,
      })
      handler.dispatch('mousemove', {
        zrX: touch.x,
        zrY: touch.y,
      })
      handler.processGesture(wrapTouch(e), 'start')
    }
  }

  handleTouchMove(e: any) {
    if (this.props.disableTouch) return
    if (this.chart && e.touches.length > 0) {
      const touch = e.touches[0]
      const handler = this.chart.getZr().handler
      handler.dispatch('mousemove', {
        zrX: touch.x,
        zrY: touch.y,
      })
      handler.processGesture(wrapTouch(e), 'change')
    }
  }

  handleTouchEnd(e: any) {
    if (this.props.disableTouch) return
    if (this.chart) {
      const touch = e.changedTouches ? e.changedTouches[0] : {}
      const handler = this.chart.getZr().handler
      handler.dispatch('mouseup', {
        zrX: touch.x,
        zrY: touch.y,
      })
      handler.dispatch('click', {
        zrX: touch.x,
        zrY: touch.y,
      })
      handler.processGesture(wrapTouch(e), 'end')
    }
  }

  render() {
    const { className } = this.props

    return (
      <Canvas
        className={`m-echarts__canvas ${className}`}
        canvasId={canvasId}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}>
        {this.props.children}
      </Canvas>
    )
  }
}
