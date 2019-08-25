import MPickerView from '../PickerView'
import MPopup from '../Popup'
import Taro, { useEffect, useRef, useState } from '@tarojs/taro'
import { functionalComponent } from '../component'
import { MPickerDefaultProps, MPickerProps } from './props'
import { View } from '@tarojs/components'

function MPicker(props: MPickerProps) {
  const [visible, setVisible] = useState<boolean>(false)
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([])
  const canClose = useRef<boolean>(false)

  useEffect(
    () => {
      setSelectedIndexes(props.selectedIndexes)
    },
    [props.selectedIndexes],
  )

  function handleTriggerClick() {
    setVisible(!visible)
  }

  function handleVisibleChange(visible: boolean) {
    setVisible(visible)
    if (!visible) {
      setSelectedIndexes(props.selectedIndexes)
    }
  }

  function handlePickStart() {
    canClose.current = false
  }

  function handlePickEnd() {
    canClose.current = true
  }

  function handlePickChange(selectedIndexes: number[]) {
    setSelectedIndexes(selectedIndexes)
  }

  function handleCancelClick() {
    if (canClose.current) {
      setSelectedIndexes(props.selectedIndexes)
      setVisible(false)
      props.onCancel()
    }
  }

  function handleConfirmClick() {
    if (canClose.current) {
      setVisible(false)
      props.onConfirm(selectedIndexes.slice())
    }
  }

  return props.disabled ? props.children : (
    <View className={props.className}>
      <View onClick={handleTriggerClick}>
        {props.children}
      </View>
      <MPopup
        position='bottom'
        visible={visible}
        maskClosable={props.maskClosable}
        onVisibleChange={handleVisibleChange}>
        <View className='m-picker'>
          <View className='m-picker__header'>
            <View
              className={`m-picker__cancel ${props.noCancel && 'm-picker__cancel_hidden'}`}
              onClick={handleCancelClick}>
              {props.cancelText}
            </View>
            <View className='m-picker__title'>
              {props.title}
            </View>
            <View
              className='m-picker__confirm'
              onClick={handleConfirmClick}>
              {props.confirmText}
            </View>
          </View>
          <MPickerView
            {...props}
            selectedIndexes={selectedIndexes}
            onPickStart={handlePickStart}
            onPickEnd={handlePickEnd}
            onChange={handlePickChange}
          />
        </View>
      </MPopup>
    </View>
  )
}

export * from './types'

export { MPickerProps }

export default functionalComponent(MPickerDefaultProps)(MPicker)
