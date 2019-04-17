import MTransition from '../Transition'
import store from '../store'
import Taro from '@tarojs/taro'
import { CommonEventFunction } from '@tarojs/components/types/common'
import { component, RequiredProp } from '../component'
import { noop } from 'vtils'
import { View } from '@tarojs/components'

type TransitionName = MTransition['props']['name']
type Position = 'center' | 'top' | 'bottom' | 'right' | 'left'

const positionToTransitionName: { [k in Position]: TransitionName } = {
  center: 'fade',
  top: 'slideDown',
  bottom: 'slideUp',
  left: 'slideLeft',
  right: 'slideRight',
}

/**
 * 弹出层组件。
 */
export default class MPopup extends component({
  props: {
    /**
     * 弹出层是否可见。
     */
    visible: false as any as RequiredProp<boolean>,

    /**
     * 是否无遮罩。
     *
     * @default false
     */
    noMask: false as boolean,

    /**
     * 点击遮罩是否可关闭。
     *
     * @default true
     */
    maskClosable: true as boolean,

    /**
     * 动画时长，单位：毫秒。
     *
     * @default 300
     */
    duration: 300 as number,

    /**
     * 弹出内容位置。可以是：
     *
     * - `center`: 中间
     * - `top`: 顶部
     * - `bottom`: 底部
     * - `right`: 右侧
     * - `left`: 左侧
     *
     * @default 'center'
     */
    position: 'center' as Position,

    /**
     * 动画过渡默认是根据 `position` 决定的，
     * 你可以使用 `customTransition` 覆盖默认值。
     */
    customTransition: '' as TransitionName,

    /**
     * 可见性变化事件。
     */
    onVisibleChange: noop as any as RequiredProp<(visible: boolean) => void>,
  },
  state: {
    /** zIndex 值 */
    zIndex: 0 as number,
    /** 弹出层是否显示 */
    display: false as boolean,
  },
}) {
  /** 计数器 */
  transitionEndCounter = 0

  componentWillMount() {
    this.setState({
      zIndex: store.zIndex++,
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
    const action = () => {
      this.transitionEndCounter = 0
      this.setState({
        display: this.props.visible,
      })
    }
    if (this.props.noMask) {
      action()
    } else {
      this.transitionEndCounter++
      if (this.transitionEndCounter >= 2) {
        action()
      }
    }
  }

  render() {
    const { visible, noMask, duration, position, customTransition, className } = this.props
    const { zIndex, display } = this.state
    return (
      <View
        className={`m-popup m-popup_${position} ${className}`}
        style={{
          zIndex,
          ...(display ? {} : { display: 'none' }),
        }}
        onTouchMove={this.handleTouchMove}>
        {noMask ? null : (
          <MTransition
            name='fade'
            visible={visible}
            duration={duration}
            onTransitionEnd={this.handleTransitionEnd}>
            <View
              className='m-popup__mask'
              onClick={this.handleMaskClick}
            />
          </MTransition>
        )}
        <View className='m-popup__content'>
          <MTransition
            name={customTransition || positionToTransitionName[position]}
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
