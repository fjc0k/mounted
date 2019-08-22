import Taro, { useEffect, useState } from '@tarojs/taro'
import { functionalComponent } from '../component'
import { MTransitionDefaultProps, MTransitionProps } from './props'
import { View } from '@tarojs/components'

/** 过渡类型 */
enum TransitionType {
  /** 进入 */
  Enter = 'Enter',
  /** 离开 */
  Leave = 'Leave',
}

function MTransition(props: MTransitionProps) {
  const [type, setType] = useState(TransitionType.Enter)
  const [display, setDisplay] = useState(false)

  useEffect(
    () => {
      setType(props.visible ? TransitionType.Enter : TransitionType.Leave)
      setDisplay(display || props.visible)
    },
    [props.visible],
  )

  function handleAnimationEnd() {
    setDisplay(props.visible)
    props.onTransitionEnd()
  }

  const animationName = `m-transition__${props.name}${type}`
  const animationDuration = `${props.duration}ms`

  return (
    <View
      className={`m-transition m-transition__${props.name} ${props.className}`}
      style={{
        WebkitAnimationName: animationName,
        WebkitAnimationDuration: animationDuration,
        animationName: animationName,
        animationDuration: animationDuration,
        ...(display ? {} : { display: 'none' }),
      }}
      onAnimationEnd={handleAnimationEnd}>
      {props.children}
    </View>
  )
}

export { MTransitionProps }

export default functionalComponent(MTransitionDefaultProps)(MTransition)
