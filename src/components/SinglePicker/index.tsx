import MPicker from '../Picker'
import Taro, {useCallback, useEffect, useState} from '@tarojs/taro'
import {functionalComponent} from '../component'
import {MPickerData} from '../Picker/types'
import {MPickerProps} from '../Picker/props'
import {MSinglePickerDefaultProps, MSinglePickerProps} from './props'

function MSinglePicker(props: MSinglePickerProps) {
  const [data, setData] = useState<MPickerData>([])
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([0])

  useEffect(() => {
    setData([props.data])
  }, [props.data])

  useEffect(() => {
    setSelectedIndexes([props.selectedIndex])
  }, [props.selectedIndex])

  const handleConfirm: MPickerProps['onConfirm'] = useCallback(selectedIndexes => {
    props.onConfirm(selectedIndexes[0])
  }, [props.onConfirm])

  return (
    <MPicker
      {...props}
      data={data}
      selectedIndexes={selectedIndexes}
      onConfirm={handleConfirm}>
      {props.children}
    </MPicker>
  )
}

export * from './types'

export {MSinglePickerProps}

export default functionalComponent(MSinglePickerDefaultProps)(MSinglePicker)
