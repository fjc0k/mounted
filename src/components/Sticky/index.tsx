import Taro, { useEffect, useState } from '@tarojs/taro'
import { EventBus, wait } from 'vtils'
import { functionalComponent } from '../component'
import { MStickyDefaultProps, MStickyProps } from './props'
import { useCustomNavigationBarFullHeight, useDisposer } from '../../hooks'
import { View } from '@tarojs/components'

const bus = new EventBus<{
  changeFixed: (stickyComponentIndex: number, sourceFixed: boolean) => any,
}>()

let stickyComponentCount = -1

function MSticky(props: MStickyProps) {
  const [ fixed, setFixed ] = useState(false)
  const [ contentHeight, setContentHeight ] = useState(0)
  const [ stickyComponentIndex ] = useState(stickyComponentCount++)
  const { customNavigationBarFullHeight } = useCustomNavigationBarFullHeight()
  const { addDisposer } = useDisposer()

  addDisposer([
    () => { stickyComponentCount-- },
    bus.on('changeFixed', (index, sourceFixed) => {
      if (index === stickyComponentIndex && sourceFixed !== fixed) {
        setFixed(!sourceFixed)
      }
    }),
  ])

  useEffect(() => {
    // 等待一段时间，确保页面渲染已经完成
    wait(300).then(() => {
      // 获取吸顶内容的高度
      wx.createSelectorQuery()
        .in(this.$scope)
        .select('.m-sticky')
        .boundingClientRect(({ height }) => {
          setContentHeight(height)

          // 监听吸顶内容的位置
          const top = -(this.index === 0 ? customNavigationBarFullHeight : height)
          const intersectionObserver = wx.createIntersectionObserver(this.$scope)
          const relativeToViewport = intersectionObserver.relativeToViewport({ top }) as any
          relativeToViewport.observe(
            '.m-sticky',
            (res: wx.ObserveCallbackResult) => {
              const fixed = res.intersectionRatio <= 0 && res.boundingClientRect.top < -top

              setFixed(fixed)

              // 切换前一个吸顶组件的状态
              if (this.index >= 1) {
                bus.emit('changeFixed', stickyComponentIndex - 1, fixed)
              }
            },
          )

          addDisposer(
            () => intersectionObserver.disconnect(),
          )
        })
        .exec()
    })
  }, [customNavigationBarFullHeight])

  return (
    <View
      className={`m-sticky ${fixed && 'm-sticky_fixed'} ${props.className}`}
      style={contentHeight ? { height: `${contentHeight}px` } : {}}>
      <View
        className='m-sticky__content'
        style={{ top: `${customNavigationBarFullHeight}px` }}>
        {this.props.children}
      </View>
    </View>
  )
}

export { MStickyProps }

export default functionalComponent(MStickyDefaultProps)(MSticky)
