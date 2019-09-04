import Taro, {useEffect, useRef, useState} from '@tarojs/taro'
import {EventBus, wait} from 'vtils'
import {functionalComponent} from '../component'
import {MStickyDefaultProps, MStickyProps} from './props'
import {useCustomNavigationBarFullHeight} from '../../hooks'
import {View} from '@tarojs/components'

const bus = new EventBus<{
  changeFixed: (stickyComponentIndex: number, sourceFixed: boolean) => any,
}>()

let stickyComponentCount = -1

function MSticky(props: MStickyProps) {
  const [fixed, setFixed] = useState(false)
  const [contentHeight, setContentHeight] = useState(0)
  const {customNavigationBarFullHeight} = useCustomNavigationBarFullHeight()
  const stickyComponentIndex = useRef<number>(0)
  const disconnectIntersectionObserver = useRef<() => void>(null)

  useEffect(() => {
    stickyComponentIndex.current = ++stickyComponentCount
    const offListener = bus.on('changeFixed', (index, sourceFixed) => {
      if (index === stickyComponentIndex.current && sourceFixed !== fixed) {
        setFixed(!sourceFixed)
      }
    })
    return offListener
  }, [])

  useEffect(() => {
    // 等待一段时间，确保页面渲染已经完成
    wait(300).then(() => {
      // 获取吸顶内容的高度
      wx.createSelectorQuery()
        .in(this.$scope)
        .select('.m-sticky')
        .boundingClientRect(({top: contentTop, height}) => {
          setContentHeight(height)

          if (contentTop === customNavigationBarFullHeight) {
            setFixed(true)
          }

          if (disconnectIntersectionObserver.current) {
            disconnectIntersectionObserver.current()
          }

          // 监听吸顶内容的位置
          const top = -(height + customNavigationBarFullHeight)
          const intersectionObserver = wx.createIntersectionObserver(this.$scope)
          const relativeToViewport = intersectionObserver.relativeToViewport({top}) as any
          relativeToViewport.observe(
            '.m-sticky',
            (res: wx.ObserveCallbackResult) => {
              const fixed = res.intersectionRatio <= 0 && res.boundingClientRect.top < -top

              setFixed(fixed)

              // 切换前一个吸顶组件的状态
              if (stickyComponentIndex.current >= 1) {
                bus.emit('changeFixed', stickyComponentIndex.current - 1, fixed)
              }
            },
          )

          disconnectIntersectionObserver.current = () => intersectionObserver.disconnect()
        })
        .exec()
    })
    return () => disconnectIntersectionObserver.current && disconnectIntersectionObserver.current()
  }, [customNavigationBarFullHeight])

  return (
    <View
      className={`m-sticky ${fixed && 'm-sticky_fixed'} ${props.className}`}
      style={contentHeight ? {height: `${contentHeight}px`} : {}}>
      <View
        className='m-sticky__content'
        style={{top: `${customNavigationBarFullHeight}px`}}>
        {props.children}
      </View>
    </View>
  )
}

export {MStickyProps}

export default functionalComponent(MStickyDefaultProps)(MSticky)
