import Taro, { useEffect, useRef } from '@tarojs/taro'
import { Canvas } from '@tarojs/components'
import { CanvasAdapter, wrapTouch } from './utils'
import { functionalComponent } from '../component'
import { MEChartsDefaultProps, MEChartsProps } from './props'

const canvasId = 'canvas'

function MECharts(props: MEChartsProps) {
  const chart = useRef<any>(null)

  useEffect(
    () => {
      const { getECharts, options } = props
      const echarts = getECharts()
      const ctx = Taro.createCanvasContext(canvasId, this.$scope)
      const canvas = new CanvasAdapter(ctx)
      ;(echarts as any).setCanvasCreator(() => canvas)
      Taro.createSelectorQuery()
        .in(this.$scope)
        .select('.m-echarts__canvas')
        .boundingClientRect(res => {
          chart.current = (echarts as any).init(canvas, null, res)
          chart.current.setOption(options)
          canvas.setChart(chart.current)
        })
        .exec()
    },
    [],
  )

  function handleTouchStart(e: any) {
    if (props.disableTouch) return
    if (chart.current && e.touches.length > 0) {
      const touch = e.touches[0]
      const handler = chart.current.getZr().handler
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

  function handleTouchMove(e: any) {
    if (props.disableTouch) return
    if (chart.current && e.touches.length > 0) {
      const touch = e.touches[0]
      const handler = chart.current.getZr().handler
      handler.dispatch('mousemove', {
        zrX: touch.x,
        zrY: touch.y,
      })
      handler.processGesture(wrapTouch(e), 'change')
    }
  }

  function handleTouchEnd(e: any) {
    if (props.disableTouch) return
    if (chart.current) {
      const touch = e.changedTouches ? e.changedTouches[0] : {}
      const handler = chart.current.getZr().handler
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

  return (
    <Canvas
      className={`m-echarts__canvas ${props.className}`}
      canvasId={canvasId}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}>
      {props.children}
    </Canvas>
  )
}

export { MEChartsProps }

export default functionalComponent(MEChartsDefaultProps)(MECharts)
