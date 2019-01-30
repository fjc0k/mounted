import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { Disposer } from 'vtils'
import { component } from '../component'
import { CUSTOM_CLASS } from '../const'
import _ from './index.module.scss'

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
  disposer = new Disposer()

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
    const { className } = this.props
    const { fixed, contentHeight } = this.state
    return (
      <View
        className={`${_.sticky} ${fixed && _.fixed} ${className} ${CUSTOM_CLASS}`}
        style={contentHeight ? { height: `${contentHeight}px` } : {}}>
        <View className={_.content}>
          {this.props.children}
        </View>
      </View>
    )
  }
}

export default MSticky
