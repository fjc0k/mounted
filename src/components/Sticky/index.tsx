import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { Disposer } from 'vtils'
import _ from './index.module.scss'

/**
 * 吸顶组件。
 */
class MSticky extends Taro.Component<{}, {
  /** 是否置顶 */
  fixed: boolean,
  /** 内容高度，单位：px */
  contentHeight: number,
}> {
  static options: wx.ComponentOptions = {
    addGlobalClass: true,
  }

  disposer = new Disposer()

  constructor() {
    super(...arguments)
    this.state = {
      fixed: false,
      contentHeight: 0,
    }
  }

  componentDidMount() {
    wx.createSelectorQuery()
      .in(this.$scope)
      .select(`.${_.sticky}`)
      .boundingClientRect(res => {
        this.setState({
          contentHeight: res.height,
        })
      })
      .exec()
    const intersectionObserver = wx.createIntersectionObserver(this.$scope)
    ;(intersectionObserver.relativeToViewport({ top: 0 }) as any)
      .observe(`.${_.sticky}`, (res: wx.ObserveCallbackResult) => {
        this.setState({
          fixed: res.intersectionRatio <= 0 && res.boundingClientRect.top < 0,
        })
      })
    this.disposer.add(intersectionObserver.disconnect)
  }

  componentWillUnmount() {
    this.disposer.dispose()
  }

  render() {
    const { fixed, contentHeight } = this.state
    return (
      <View
        className={`${_.sticky} ${fixed && _.fixed}`}
        style={{ height: contentHeight ? `${contentHeight}px` : 'initial' }}>
        <View className={_.content}>
          {this.props.children}
        </View>
      </View>
    )
  }
}

export default MSticky
