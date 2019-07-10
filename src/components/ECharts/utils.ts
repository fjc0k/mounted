export class CanvasAdapter {
  ctx: any

  chart: any

  event: any

  constructor(ctx: any) {
    this.ctx = ctx
  }

  getContext(contextType: string) {
    if (contextType === '2d') {
      return this.ctx
    }
  }

  setChart(chart: any) {
    this.chart = chart
  }

  attachEvent() {}

  detachEvent() {}

  _initCanvas(zrender: any, ctx: any) {
    zrender.util.getContext = () => ctx

    zrender.util.$override('measureText', (text: any, font: any) => {
      ctx.font = font || '12px sans-serif'
      return ctx.measureText(text)
    })
  }

  _initStyle(ctx: any) {
    const styles = [
      'fillStyle', 'strokeStyle', 'globalAlpha',
      'textAlign', 'textBaseAlign', 'shadow', 'lineWidth',
      'lineCap', 'lineJoin', 'lineDash', 'miterLimit', 'fontSize',
    ]

    styles.forEach(style => {
      Object.defineProperty(ctx, style, {
        set: value => {
          if (
            style !== 'fillStyle' && style !== 'strokeStyle'
              || value !== 'none' && value !== null
          ) {
            ctx[`set${style.charAt(0).toUpperCase()}${style.slice(1)}`](value)
          }
        },
      })
    })

    ctx.createRadialGradient = ctx.createCircularGradient.bind(ctx)
  }

  _initEvent() {
    this.event = {}

    const eventNames = [
      {
        wxName: 'touchStart',
        ecName: 'mousedown',
      },
      {
        wxName: 'touchMove',
        ecName: 'mousemove',
      },
      {
        wxName: 'touchEnd',
        ecName: 'mouseup',
      },
      {
        wxName: 'touchEnd',
        ecName: 'click',
      },
    ]

    eventNames.forEach(name => {
      this.event[name.wxName] = (e: any) => {
        const touch = e.touches[0]
        this.chart.getZr().handler.dispatch(name.ecName, {
          zrX: name.wxName === 'tap' ? touch.clientX : touch.x,
          zrY: name.wxName === 'tap' ? touch.clientY : touch.y,
        })
      }
    })
  }
}

export function wrapTouch(event: any) {
  for (let i = 0; i < event.touches.length; ++i) {
    const touch = event.touches[i]
    touch.offsetX = touch.x
    touch.offsetY = touch.y
  }
  return event
}
