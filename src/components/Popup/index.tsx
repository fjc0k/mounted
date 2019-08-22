import MTransition from '../Transition'
import Taro from '@tarojs/taro'
import { CommonEventFunction } from '@tarojs/components/types/common'
import { component } from '../component'
import { internalStore } from '../internal'
import { MPopupProps, Position, TransitionName } from './props'
import { View } from '@tarojs/components'

const positionToTransitionName: Record<Position, TransitionName> = {
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
  props: MPopupProps,
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
      zIndex: internalStore.zIndex++,
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
    const {
      visible,
      noMask,
      duration,
      position,
      customTransition,
      className,
    } = this.props

    const {
      zIndex,
      display,
    } = this.state

    return (
      <View
        className={`m-popup m-popup_${position} ${className}`}
        style={{
          zIndex: zIndex,
          top: `${internalStore.customNavigationBarFullHeight}px`,
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
