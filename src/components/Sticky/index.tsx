import Taro, { useEffect, useState } from '@tarojs/taro'
import { EventBus, wait } from 'vtils'
import { functionalComponent } from '../component'
import { MStickyProps } from './props'
import { useCustomNavigationBarFullHeight, useDisposer } from '../../hooks'
import { View } from '@tarojs/components'

const bus = new EventBus<{
  changeFixed: (stickyComponentIndex: number, sourceFixed: boolean) => any,
}>()

let stickyComponentCount = -1

function MSticky(props: typeof MStickyProps) {
  const [fixed, setFixed] = useState(false)
  const [contentHeight, setContentHeight] = useState(0)
  const [stickyComponentIndex] = useState(stickyComponentCount++)
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

export default functionalComponent(MStickyProps)(MSticky)

// /**
//  * 吸顶组件。
//  *
//  * @example
//  *
//  * ```jsx
//  * <MSticky>
//  *   <View>标题</View>
//  * </MSticky>
//  * ```
//  */
// export default class MSticky extends component({
//   props: MStickyProps,
//   state: {
//     /** 是否置顶 */
//     fixed: false as boolean,
//     /** 内容高度，单位：px */
//     contentHeight: 0 as number,
//   },
// }) {
//   /** 处置器 */
//   disposer: Disposer = new Disposer()

//   /** 组件索引 */
//   index: number = 0

//   componentWillMount() {
//     this.index = stickyComponents.length
//     stickyComponents.push(this)
//     this.disposer.add(() => {
//       stickyComponents.splice(
//         stickyComponents.indexOf(this),
//         1,
//       )
//     })
//   }

//   componentDidMount() {
//     // 等待一段时间，确保页面渲染已经完成
//     wait(300).then(() => {
//       // 获取吸顶内容的高度
//       wx.createSelectorQuery()
//         .in(this.$scope)
//         .select('.m-sticky')
//         .boundingClientRect(({ height }) => {
//           this.setState({
//             contentHeight: height,
//           })

//           // 监听吸顶内容的位置
//           const top = -(this.index === 0 ? internalStore.customNavigationBarFullHeight : height)
//           const intersectionObserver = wx.createIntersectionObserver(this.$scope)
//           const relativeToViewport = intersectionObserver.relativeToViewport({ top }) as any
//           relativeToViewport.observe(
//             '.m-sticky',
//             (res: wx.ObserveCallbackResult) => {
//               const fixed = res.intersectionRatio <= 0 && res.boundingClientRect.top < -top

//               this.setState({ fixed })

//               // 切换前一个吸顶组件的状态
//               if (this.index >= 1) {
//                 const prevSticky = stickyComponents[this.index - 1]
//                 if (prevSticky.state.fixed !== fixed) {
//                   prevSticky.setState({
//                     fixed: !fixed,
//                   })
//                 }
//               }
//             },
//           )

//           // 处置收集
//           this.disposer.add(
//             () => intersectionObserver.disconnect(),
//           )
//         })
//         .exec()
//     })
//   }

//   componentWillUnmount() {
//     this.disposer.dispose()
//   }

//   render() {
//     const { className } = this.props
//     const { fixed, contentHeight } = this.state

//     return (
//       <View
//         className={`m-sticky ${fixed && 'm-sticky_fixed'} ${className}`}
//         style={contentHeight ? { height: `${contentHeight}px` } : {}}>
//         <View
//           className='m-sticky__content'
//           style={{ top: `${internalStore.customNavigationBarFullHeight}px` }}>
//           {this.props.children}
//         </View>
//       </View>
//     )
//   }
// }
