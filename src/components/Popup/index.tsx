import MTransition from '../Transition'
import Taro, {useEffect, useState} from '@tarojs/taro'
import {functionalComponent} from '../component'
import {MPopupDefaultProps, MPopupProps, Position, TransitionName} from './props'
import {useCustomNavigationBarFullHeight, useZIndex} from '../../hooks'
import {View} from '@tarojs/components'

const positionToTransitionName: Record<Position, TransitionName> = {
  center: 'fade',
  top: 'slideDown',
  bottom: 'slideUp',
  left: 'slideLeft',
  right: 'slideRight',
}

function MPopup(props: MPopupProps) {
  const [transitionEndCount, setTransitionEndCount] = useState(0)
  const [display, setDisplay] = useState(false)
  const {zIndex} = useZIndex()
  const {customNavigationBarFullHeight} = useCustomNavigationBarFullHeight()

  useEffect(
    () => {
      setDisplay(true)
    },
    [props.visible],
  )

  function handleMaskClick() {
    if (props.maskClosable) {
      props.onVisibleChange(false)
    }
  }

  function handleTransitionEnd() {
    const action = () => {
      setTransitionEndCount(0)
      setDisplay(props.visible)
    }
    if (props.noMask) {
      action()
    } else {
      if (transitionEndCount >= 1) {
        action()
      } else {
        setTransitionEndCount(transitionEndCount + 1)
      }
    }
  }

  return (
    <View
      className={`m-popup m-popup_${props.position} ${props.className}`}
      style={{
        zIndex: zIndex,
        top: `${customNavigationBarFullHeight}px`,
        ...(display ? {} : {display: 'none'}),
      }}
      onTouchMove={e => e.stopPropagation()}>
      {props.noMask ? null : (
        <MTransition
          name='fade'
          visible={props.visible}
          duration={props.duration}
          onTransitionEnd={handleTransitionEnd}>
          <View
            className='m-popup__mask'
            onClick={handleMaskClick}
          />
        </MTransition>
      )}
      <View className='m-popup__content'>
        <MTransition
          name={props.customTransition || positionToTransitionName[props.position]}
          visible={props.visible}
          duration={props.duration}
          onTransitionEnd={handleTransitionEnd}>
          {this.props.children}
        </MTransition>
      </View>
    </View>
  )
}

export {MPopupProps}

export default functionalComponent(MPopupDefaultProps)(MPopup)
