import { View } from '@tarojs/components'
import { noop } from 'vtils'
import { CommonEventFunction } from '@tarojs/components/types/common'
import { component, RequiredProp } from '../component'
import MTransition from '../Transition'
import _ from './index.module.scss'

type Position = 'center' | 'top' | 'bottom' | 'right' | 'left'

const positionToTransitionName: { [key in Position]: MTransition['props']['name'] } = {
  center: 'fade',
  top: 'slideDown',
  bottom: 'slideUp',
  left: 'slideLeft',
  right: 'slideRight',
}

/**
 * 弹出层组件。
 */
class MPopup extends component({
  props: {
    /** 弹出层是否可见 */
    visible: false as any as RequiredProp<boolean>,
    /** 点击遮罩是否可关闭 */
    maskClosable: true as boolean,
    /** 动画时长，单位：毫秒 */
    duration: 300 as number,
    /** 弹出内容位置 */
    position: 'center' as Position,
    /** 可见性变化事件 */
    onVisibleChange: noop as any as RequiredProp<(visible: boolean) => void>,
  },
  state: {
    /** zIndex 值 */
    zIndex: 0 as number,
    /** 弹出层是否显示 */
    display: false as boolean,
  },
}) {
  /** 起始 zIndex 值 */
  static startZIndex = 5000

  /** 计数器 */
  transitionEndCounter = 0

  componentWillMount() {
    this.setState({
      zIndex: MPopup.startZIndex++,
      display: this.props.visible,
    })
  }

  componentWillReceiveProps(nextProps: MPopup['props']) {
    if (nextProps.visible !== this.props.visible) {
      this.setState({
        display: true,
      })
    }
  }

  handleTouchMove: CommonEventFunction = e => {
    e.stopPropagation()
  }

  handleMaskClick = () => {
    if (this.props.maskClosable) {
      this.props.onVisibleChange(false)
    }
  }

  handleTransitionEnd = () => {
    this.transitionEndCounter++
    if (this.transitionEndCounter >= 2) {
      this.transitionEndCounter = 0
      this.setState({
        display: this.props.visible,
      })
    }
  }

  render() {
    const { visible, duration, position } = this.props
    const { zIndex, display } = this.state
    return (
      <View
        className={`${_.popup} ${_[position]}`}
        style={{
          zIndex,
          ...(display ? {} : { display: 'none' }),
        }}
        onTouchMove={this.handleTouchMove}>
        <MTransition
          name='fade'
          visible={visible}
          duration={duration}
          onTransitionEnd={this.handleTransitionEnd}>
          <View
            className={_.mask}
            onClick={this.handleMaskClick}
          />
        </MTransition>
        <View className={_.content}>
          <MTransition
            name={positionToTransitionName[position]}
            visible={visible}
            duration={duration}
            onTransitionEnd={this.handleTransitionEnd}>
            {this.props.children}
          </MTransition>
        </View>
      </View>
    )
  }
}

export default MPopup
