import MPickerHeader from '../PickerHeader'
import MPickerView from '../PickerView'
import Taro, {useCallback, useEffect, useRef, useState} from '@tarojs/taro'
import XBottomSheet from '../BottomSheet'
import {functionalComponent} from '../component'
import {MPickerDefaultProps, MPickerProps} from './props'
import {View} from '@tarojs/components'

function MPicker(props: MPickerProps) {
  const [visible, setVisible] = useState<boolean>(false)
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([])
  const canClose = useRef<boolean>(true)

  useEffect(() => {
    setSelectedIndexes(props.selectedIndexes)
  }, [props.selectedIndexes])

  const handleVisibleChange = useCallback((visible: boolean) => {
    setVisible(visible)
    if (!visible) {
      setSelectedIndexes(props.selectedIndexes)
    }
  }, [props.selectedIndexes])

  const handlePickStart = useCallback(() => {
    canClose.current = false
  }, [])

  const handlePickEnd = useCallback(() => {
    canClose.current = true
  }, [])

  const handlePickChange = useCallback((selectedIndexes: number[]) => {
    setSelectedIndexes(selectedIndexes)
  }, [])

  const handleCancelClick = useCallback(() => {
    if (canClose.current) {
      setSelectedIndexes(props.selectedIndexes)
      setVisible(false)
      props.onCancel()
    }
  }, [props.selectedIndexes, props.onCancel])

  const handleConfirmClick = useCallback(() => {
    if (canClose.current) {
      setVisible(false)
      props.onConfirm(selectedIndexes.slice())
    }
  }, [props.onConfirm, selectedIndexes])

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
