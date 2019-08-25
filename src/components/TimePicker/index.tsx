import MPicker, { MPickerCascadedData, MPickerProps } from '../Picker'
import Taro, { useEffect, useState } from '@tarojs/taro'
import { functionalComponent } from '../component'
import { MTimePickerDefaultProps, MTimePickerProps } from './props'

function MTimePicker(props: MTimePickerProps) {
  const [data, setData] = useState<MPickerCascadedData>([])
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([])

  useEffect(
    () => {
      let reject: boolean | void = false

      const startTime = props.startTime.split(':')
      const startHour = parseInt(startTime[0]) || 0
      const startMinute = parseInt(startTime[1]) || 0

      const endTime = props.endTime.split(':')
      const endHour = parseInt(endTime[0]) || 23
      const endMinute = parseInt(endTime[1]) || 59

      const useRawHourValue = props.formatHour == null
      const useRawMinuteValue = props.formatMinute == null

      const hourList: MPickerCascadedData = []
      const selectedIndexes: number[] = []
      for (let hour = startHour; hour <= endHour; hour++) {
        reject = props.filterHour && props.filterHour({
          hour: hour,
        })
        if (reject !== true) {
          if (hour === props.selectedTime[0]) {
            selectedIndexes[0] = hourList.length
          }
          const minuteList: MPickerCascadedData = []
          hourList.push({
            label: String(useRawHourValue ? hour.toString() : props.formatHour({ hour })),
            value: hour,
            children: minuteList,
          })
          const minutes = hour === endHour ? endMinute : 59
          for (let minute = (hour === startHour ? startMinute : 0); minute <= minutes; minute++) {
            reject = props.filterMinute && props.filterMinute({
              hour: hour,
              minute: minute,
            })
            if (reject !== true) {
              if (minute === props.selectedTime[1]) {
                selectedIndexes[1] = minuteList.length
              }
              minuteList.push({
                label: String(useRawMinuteValue ? minute.toString() : props.formatMinute({ hour, minute })),
                value: minute,
              })
            } else {
              reject = false
            }
          }
          selectedIndexes[1] = selectedIndexes[1] == null ? 0 : selectedIndexes[1]
        } else {
          reject = false
        }
      }
      selectedIndexes[0] = selectedIndexes[0] == null ? 0 : selectedIndexes[0]

      setData(hourList)
      setSelectedIndexes(selectedIndexes)
    },
    [
      props.startTime,
      props.endTime,
      props.filterHour,
      props.filterMinute,
      props.formatHour,
      props.formatMinute,
    ],
  )

  const handleConfirm: MPickerProps['onConfirm'] = selectedIndexes => {
    const selectedDate: number[] = []
    for (
      let i = 0,
        n = Math.min(selectedIndexes.length, 2),
        list = data;
      i < n;
      i++
    ) {
      if (!list[selectedIndexes[i]]) break
      selectedDate.push(list[selectedIndexes[i]].value)
      list = list[selectedIndexes[i]].children
      if (!list) break
    }
    props.onConfirm(selectedDate)
  }

  return !data.length ? props.children : (
    <MPicker
      {...props}
      data={data}
      selectedIndexes={selectedIndexes}
      onConfirm={handleConfirm}>
      {props.children}
    </MPicker>
  )
}

export { MTimePickerProps }

export default functionalComponent(MTimePickerDefaultProps)(MTimePicker)
