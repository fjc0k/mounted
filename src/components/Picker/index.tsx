import MPickerHeader from '../PickerHeader'
import MPickerView from '../PickerView'
import Taro, {useEffect, useRef, useState} from '@tarojs/taro'
import XBottomSheet from '../BottomSheet'
import {functionalComponent} from '../component'
import {MPickerDefaultProps, MPickerProps} from './props'
import {View} from '@tarojs/components'

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
    <XBottomSheet
      renderMain={(
        <View className='m-picker'>
          <MPickerHeader
            {...props}
            renderTitle={props.renderTitle}
            onCancel={handleCancelClick}
            onConfirm={handleConfirmClick}
          />
          <MPickerView
            {...props}
            selectedIndexes={selectedIndexes}
            onPickStart={handlePickStart}
            onPickEnd={handlePickEnd}
            onChange={handlePickChange}
          />
        </View>
      )}
      visible={visible}
      onVisibleChange={handleVisibleChange}>
      {props.children}
    </XBottomSheet>
  )
}

export * from './types'

export {MPickerProps}

export default functionalComponent(MPickerDefaultProps)(MPicker)
