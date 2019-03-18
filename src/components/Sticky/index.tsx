import { View } from '@tarojs/components'
import { Disposer, wait } from 'vtils'
import { component } from '../component'

/** 页面上存在的吸顶组件 */
const stickyComponents: MSticky[] = []

/**
 * 吸顶组件。
 */
class MSticky extends component({
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
    stickyComponents.push(this)
    this.index = stickyComponents.length - 1
    this.disposer.add(() => {
      stickyComponents.splice(this.index, 1)
    })
  }

  componentDidMount() {
    // 等待一段时间，确保页面渲染已经完成
    wait(300).then(() => {
      // 获取吸顶内容的高度
      wx.createSelectorQuery()
        .in(this.$scope)
        .select('.m-sticky')
        .boundingClientRect(res => {
          this.setState({
            contentHeight: res.height,
          })
        })
        .exec()
      // 监听吸顶内容的位置
      const intersectionObserver = wx.createIntersectionObserver(this.$scope)
      const relativeToViewport = intersectionObserver.relativeToViewport({ top: 0 }) as any
      relativeToViewport.observe(
        '.m-sticky',
        (res: wx.ObserveCallbackResult) => {
          const fixed = res.intersectionRatio <= 0 && res.boundingClientRect.top < 0
          this.setState({ fixed })
          // 切换前一个吸顶组件的状态
          if (this.index >= 1) {
            stickyComponents[this.index - 1].setState({
              fixed: !fixed,
            })
          }
        },
      )
      this.disposer.add(
        () => intersectionObserver.disconnect(),
      )
    })
  }

  componentWillUnmount() {
    this.disposer.dispose()
  }

  render() {
    const { fixed, contentHeight } = this.state
    return (
      <View
        className={`m-sticky ${fixed && 'm-sticky_fixed'}`}
        style={contentHeight ? { height: `${contentHeight}px` } : {}}>
        <View className='m-sticky__content'>
          {this.props.children}
        </View>
      </View>
    )
  }
}

export default MSticky
