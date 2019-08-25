import dayjs from 'dayjs'
import MPicker, { MPickerProps } from '../Picker'
import Taro, { useEffect, useState } from '@tarojs/taro'
import { functionalComponent } from '../component'
import { MDatePickerDefaultProps, MDatePickerProps } from './props'
import { memoize } from 'vtils'
import { MPickerCascadedData } from '../Picker/types'

const getDaysInMonth = memoize(
  (month: number, year: number) => {
    return dayjs(new Date(year, month - 1, 1)).daysInMonth()
  },
  {
    createCache: () => new Map(),
    serializer: (month, year) => `${year}-${month}`,
  },
)

function MDatePicker(props: MDatePickerProps) {
  const [data, setData] = useState<MPickerCascadedData>([])
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([])

  useEffect(
    () => {
      let reject: boolean | void = false

      const startDate = dayjs(props.startDate)
      const startYear = startDate.year()
      const startMonth = startDate.month() + 1
      const startDay = startDate.date()

      const endDate = dayjs(props.endDate)
      const endYear = endDate.year()
      const endMonth = endDate.month() + 1
      const endDay = endDate.date()

      const useRawYearValue = props.formatYear == null
      const useRawMonthValue = props.formatMonth == null
      const useRawDayValue = props.formatDay == null

      const yearList: MPickerCascadedData = []
      const selectedIndexes: number[] = []
      for (let year = startYear; year <= endYear; year++) {
        reject = props.filterYear && props.filterYear({ year: year })
        if (reject !== true) {
          if (year === props.selectedDate[0]) {
            selectedIndexes[0] = yearList.length
          }
          const monthList: MPickerCascadedData = []
          yearList.push({
            label: String(useRawYearValue ? year : props.formatYear({ year })),
            value: year,
            children: monthList,
          })
          const months = year === endYear ? endMonth : 12
          for (let month = (year === startYear ? startMonth : 1); month <= months; month++) {
            reject = props.filterMonth && props.filterMonth({
              year: year,
              month: month,
            })
            if (reject !== true) {
              if (month === props.selectedDate[1]) {
                selectedIndexes[1] = monthList.length
              }
              const dayList: MPickerCascadedData = []
              monthList.push({
                label: String(useRawMonthValue ? month : props.formatMonth({ year, month })),
                value: month,
                children: dayList,
              })
              const days = year === endYear && month === endMonth ? endDay : getDaysInMonth(month, year)
              for (let day = (year === startYear && month === startMonth ? startDay : 1); day <= days; day++) {
                reject = props.filterDay && props.filterDay({
                  year: year,
                  month: month,
                  day: day,
                })
                if (reject !== true) {
                  if (day === props.selectedDate[2]) {
                    selectedIndexes[2] = dayList.length
                  }
                  dayList.push({
                    label: String(useRawDayValue ? day : props.formatDay({ year, month, day })),
                    value: day,
                  })
                } else {
                  reject = false
                }
              }
              selectedIndexes[2] = selectedIndexes[2] == null ? 0 : selectedIndexes[2]
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

      setData(yearList)
      setSelectedIndexes(selectedIndexes)
    },
    [
      props.startDate,
      props.endDate,
      props.filterYear,
      props.filterMonth,
      props.filterDay,
      props.formatYear,
      props.formatMonth,
      props.formatDay,
    ],
  )

  const handleConfirm: MPickerProps['onConfirm'] = selectedIndexes => {
    const selectedDate: number[] = []
    for (
      let i = 0,
        n = Math.min(selectedIndexes.length, 3),
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

export default functionalComponent(MDatePickerDefaultProps)(MDatePicker)
