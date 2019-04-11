import Taro from '@tarojs/taro'
import { component } from '../component'
import { Disposer, wait } from 'vtils'
import { View } from '@tarojs/components'

/** 页面上存在的吸顶组件 */
const stickyComponents: MSticky[] = []

/**
 * 吸顶组件。
 *
 * @example
 *
 * ```jsx
 * <MSticky>
 *   <View>标题</View>
 * </MSticky>
 * ```
 */
export default class MSticky extends component({
  state: {
    /** 是否置顶 */
    fixed: false as boolean,
    /** 内容高度，单位：px */
    contentHeight: 0 as number,
  },
}) {
  /** 处置器 */
  disposer: Disposer = new Disposer()

  /** 组件索引 */
  index: number = 0

  componentWillMount() {
    this.index = stickyComponents.length
    stickyComponents.push(this)
    this.disposer.add(() => {
      stickyComponents.splice(
        stickyComponents.indexOf(this),
        1,
      )
    })
  }

  componentDidMount() {
    // 等待一段时间，确保页面渲染已经完成
    wait(300).then(() => {
      // 获取吸顶内容的高度
      wx.createSelectorQuery()
        .in(this.$scope)
        .select('.m-sticky')
        .boundingClientRect(({ height }) => {
          this.setState({
            contentHeight: height,
          })

          // 监听吸顶内容的位置
          const top = -(this.index === 0 ? 0 : height)
          const intersectionObserver = wx.createIntersectionObserver(this.$scope)
          const relativeToViewport = intersectionObserver.relativeToViewport({ top }) as any
          relativeToViewport.observe(
            '.m-sticky',
            (res: wx.ObserveCallbackResult) => {
              const fixed = res.intersectionRatio <= 0 && res.boundingClientRect.top < -top

              this.setState({ fixed })

              // 切换前一个吸顶组件的状态
              if (this.index >= 1) {
                const prevSticky = stickyComponents[this.index - 1]
                if (prevSticky.state.fixed !== fixed) {
                  prevSticky.setState({
                    fixed: !fixed,
                  })
                }
              }
            },
          )

          // 处置收集
          this.disposer.add(
            () => intersectionObserver.disconnect(),
          )
        })
        .exec()
    })
  }

  componentWillUnmount() {
    this.disposer.dispose()
  }

  render() {
    const { className } = this.props
    const { fixed, contentHeight } = this.state
    return (
      <View
        className={`m-sticky ${fixed && 'm-sticky_fixed'} ${className}`}
        style={contentHeight ? { height: `${contentHeight}px` } : {}}>
        <View className='m-sticky__content'>
          {this.props.children}
        </View>
      </View>
    )
  }
}
