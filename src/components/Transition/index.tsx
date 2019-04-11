import Taro from '@tarojs/taro'
import { component, RequiredProp } from '../component'
import { noop } from 'vtils'
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
  props: {
    /**
     * 组件是否可见。
     */
    visible: true as any as RequiredProp<boolean>,

    /**
     * 动画名称。可以是：
     *
     * - `fade`: 淡入
     * - `fadeUp`: 上滑淡入
     * - `fadeDown`: 下滑淡入
     * - `fadeLeft`: 左滑淡入
     * - `fadeRight`: 右滑淡入
     * - `slideUp`: 上滑进入
     * - `slideDown`: 下滑进入
     * - `slideLeft`: 左滑进入
     * - `slideRight`: 右滑进入
     * - `zoom`: 缩放
     * - `drop`: 掉落
     *
     * @default 'fade'
     */
    name: 'fade' as (
      'fade' |
      'fadeUp' |
      'fadeDown' |
      'fadeLeft' |
      'fadeRight' |
      'slideUp' |
      'slideDown' |
      'slideLeft' |
      'slideRight' |
      'zoom' |
      'drop'
    ),

    /**
     * 动画时长，单位：毫秒。
     *
     * @default 300
     */
    duration: 300 as number,

    /**
     * 动画结束事件。
     *
     * @default () => {}
     */
    onTransitionEnd: noop as () => void,
  },
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
