import Taro from '@tarojs/taro'
import { component } from '../component'
import { MTransitionProps } from './props'
import { View } from '@tarojs/components'

/** 过渡类型 */
enum TransitionType {
  /** 进入 */
  Enter = 'Enter',
  /** 离开 */
  Leave = 'Leave',
}

/**
 * 动画过渡组件。
 *
 * @example
 *
 * ```jsx
 * <MTransition name='zoom' visible={visible}>
 *   <View>动画内容</View>
 * </MTransition>
 * ```
 */
export default class MTransition extends component({
  props: MTransitionProps,
  state: {
    /** 动画类型 */
    type: TransitionType.Enter as TransitionType,
    /** 是否展示组件 */
    display: false as boolean,
  },
}) {
  componentWillMount() {
    if (this.props.visible) {
      this.setState({
        display: true,
        type: TransitionType.Enter,
      })
    } else {
      this.setState({
        display: false,
      })
    }
  }

  componentWillReceiveProps(nextProps: MTransition['props']) {
    this.setState(prevState => ({
      display: prevState.display || nextProps.visible,
      type: nextProps.visible ? TransitionType.Enter : TransitionType.Leave,
    }))
  }

  handleAnimationEnd = () => {
    this.setState({
      display: this.props.visible,
    })
    this.props.onTransitionEnd()
  }

  render() {
    const { name, duration, className } = this.props
    const { type, display } = this.state

    const animationName = `m-transition__${name}${type}`
    const animationDuration = `${duration}ms`

    return (
      <View
        className={`m-transition m-transition__${name} ${className}`}
        style={{
          WebkitAnimationName: animationName,
          WebkitAnimationDuration: animationDuration,
          animationName: animationName,
          animationDuration: animationDuration,
          ...(display ? {} : { display: 'none' }),
        }}
        onAnimationEnd={this.handleAnimationEnd}>
        {this.props.children}
      </View>
    )
  }
}
