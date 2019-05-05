import MPicker from '../Picker'
import Taro from '@tarojs/taro'
import { CascadedData } from '../PickerView'
import { component } from '../component'
import { formatTemplate, getDaysInMonth, memoize, toDate } from 'vtils'
import { MDatePickerProps } from './props'

const formatYMD = memoize(
  formatTemplate,
  {
    createCache: () => new Map(),
    serializer: (template, ymd) => `${
      (ymd.y && `${ymd.y}y`)
      || (ymd.m && `${ymd.m}m`)
      || (ymd.d && `${ymd.d}d`)
    }${template}`,
  },
)

/**
 * 日期选择器组件。
 *
 * @example
 *
 * ```jsx
 * <MDatePicker
 *   title='选择日期'
 *   selectedDate={selectedDate}
 *   onConfirm={selectedDate => this.setState({ selectedDate })}>
 *   <Text>选择日期</Text>
 * </MDatePicker>
 * ```
 */
class MDatePicker extends component({
  props: MDatePickerProps,
  state: {
    localData: [] as CascadedData,
    localSelectedIndexes: [] as number[],
  },
}) {
  lastUpdateAt: number = 0

  lastSelectedIndexes: number[] = []

  componentDidMount() {
    this.updateLocalState(this.props)
  }

  componentWillReceiveProps(nextProps: MDatePicker['props']) {
    // perf: 极短时间内的行为应是由子组件触发的父组件更新
    if (this.lastUpdateAt && (Date.now() - this.lastUpdateAt < 60)) {
      this.setState({
        localSelectedIndexes: this.lastSelectedIndexes,
      })
    } else {
      this.updateLocalState(nextProps)
    }
  }

  updateLocalState(props: MDatePicker['props']) {
    let reject: boolean | void = false

    const startDate = toDate(props.startDate)
    const startYear = startDate.getFullYear()
    const startMonth = startDate.getMonth() + 1
    const startDay = startDate.getDate()

    const endDate = toDate(props.endDate)
    const endYear = endDate.getFullYear()
    const endMonth = endDate.getMonth() + 1
    const endDay = endDate.getDate()

    const useRawYearValue = props.formatYear === '' || props.formatYear === 'y' || props.formatYear === 'yyyy'
    const useRawMonthValue = props.formatMonth === '' || props.formatMonth === 'm'
    const useRawDayValue = props.formatDay === '' || props.formatDay === 'd'

    const yearList: CascadedData = []
    const selectedIndexes: number[] = []
    for (let year = startYear; year <= endYear; year++) {
      reject = props.filterYear && props.filterYear({ year: year })
      if (reject !== true) {
        if (year === props.selectedDate[0]) {
          selectedIndexes[0] = yearList.length
        }
        const monthList: CascadedData = []
        yearList.push({
          label: useRawYearValue ? year.toString() : formatYMD(props.formatYear, { y: year }),
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
            const dayList: CascadedData = []
            monthList.push({
              label: useRawMonthValue ? month.toString() : formatYMD(props.formatMonth, { m: month }),
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
                  label: useRawDayValue ? day.toString() : formatYMD(props.formatDay, { d: day }),
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

    this.setState({
      localData: yearList,
      localSelectedIndexes: selectedIndexes,
    })
  }

  handleConfirm: MPicker['props']['onConfirm'] = selectedIndexes => {
    const { localData } = this.state
    const selectedDate: number[] = []
    let list = localData
    const n = Math.min(selectedIndexes.length, 3)
    for (let i = 0; i < n; i++) {
      if (!list[selectedIndexes[i]]) break
      selectedDate.push(list[selectedIndexes[i]].value)
      list = list[selectedIndexes[i]].children
      if (!list) break
    }
    this.lastUpdateAt = Date.now()
    this.lastSelectedIndexes = selectedIndexes
    this.props.onConfirm(selectedDate)
  }

  render() {
    const {
      localData,
      localSelectedIndexes,
    } = this.state

    return !localData.length ? this.props.children : (
      <MPicker
        {...this.props}
        data={localData}
        selectedIndexes={localSelectedIndexes}
        onConfirm={this.handleConfirm}>
        {this.props.children}
      </MPicker>
    )
  }
}

export default MDatePicker
