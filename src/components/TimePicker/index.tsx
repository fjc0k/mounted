import MPicker from '../Picker'
import Taro from '@tarojs/taro'
import { CascadedData } from '../PickerView'
import { component } from '../component'
import { formatTemplate, memoize } from 'vtils'
import { MTimePickerProps } from './props'

const formatHI = memoize(
  formatTemplate,
  {
    createCache: () => new Map(),
    serializer: (template, hi) => `${
      (hi.h && `${hi.h}h`)
        || (hi.i && `${hi.i}i`)
    }${template}`,
  },
)

/**
 * 时间选择器组件。
 *
 * @example
 *
 * ```jsx
 * <MTimePicker
 *   title='选择时间'
 *   selectedTime={selectedTime}
 *   onConfirm={selectedTime => this.setState({ selectedTime })}>
 *   <Text>选择时间</Text>
 * </MTimePicker>
 * ```
 */
class MTimePicker extends component({
  props: MTimePickerProps,
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

  componentWillReceiveProps(nextProps: MTimePicker['props']) {
    // perf: 极短时间内的行为应是由子组件触发的父组件更新
    if (this.lastUpdateAt && (Date.now() - this.lastUpdateAt < 60)) {
      this.setState({
        localSelectedIndexes: this.lastSelectedIndexes,
      })
    } else {
      this.updateLocalState(nextProps)
    }
  }

  updateLocalState(props: MTimePicker['props']) {
    let reject: boolean | void = false

    const startTime = props.startTime.split(':')
    const startHour = parseInt(startTime[0]) || 0
    const startMinute = parseInt(startTime[1]) || 0

    const endTime = props.endTime.split(':')
    const endHour = parseInt(endTime[0]) || 23
    const endMinute = parseInt(endTime[1]) || 59

    const useRawHourValue = props.formatHour === '' || props.formatHour === 'h'
    const useRawMinuteValue = props.formatMinute === '' || props.formatMinute === 'i'

    const hourList: CascadedData = []
    const selectedIndexes: number[] = []
    for (let hour = startHour; hour <= endHour; hour++) {
      reject = props.filterHour && props.filterHour({
        hour: hour,
      })
      if (reject !== true) {
        if (hour === props.selectedTime[0]) {
          selectedIndexes[0] = hourList.length
        }
        const minuteList: CascadedData = []
        hourList.push({
          label: useRawHourValue ? hour.toString() : formatHI(props.formatHour, { h: hour }),
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
              label: useRawMinuteValue ? minute.toString() : formatHI(props.formatMinute, { i: minute }),
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

    this.setState({
      localData: hourList,
      localSelectedIndexes: selectedIndexes,
    })
  }

  handleConfirm: MPicker['props']['onConfirm'] = selectedIndexes => {
    const { localData } = this.state
    const selectedDate: number[] = []
    let list = localData
    const n = Math.min(selectedIndexes.length, 2)
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

export default MTimePicker
