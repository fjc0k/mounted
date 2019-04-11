import MPicker from '../Picker'
import Taro from '@tarojs/taro'
import { CascadedData } from '../PickerView'
import { component, RequiredProp } from '../component'
import { formatTemplate, memoize, noop } from 'vtils'

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
  props: {
    /**
     * 开始时间。
     *
     * @default '00:00'
     */
    startTime: '00:00' as string,

    /**
     * 结束时间。
     *
     * @default '23:59'
     */
    endTime: `23:59` as string,

    /**
     * 格式化小时。
     *
     * @example
     *
     * 'h' // ==> '2'
     * 'hh' // ==> '02'
     * 'h时' // ==> '2时'
     * 'hh点' // ==> '02点'
     *
     * @default 'h'
     */
    formatHour: 'h' as string,

    /**
     * 格式化分钟。
     *
     * @example
     *
     * 'i' // ==> '5'
     * 'ii' // ==> '05'
     * 'i分' // ==> '5分'
     * 'ii分' // ==> '05分'
     *
     * @default 'i'
     */
    formatMinute: 'i' as string,

    /**
     * 小时过滤器，调用 `reject()` 函数可跳过传入的小时。
     *
     * @default () => {}
     */
    onFilterHour: noop as (params: {
      /** 时 */
      hour: number,
      /** 跳过当前小时 */
      reject: () => void,
    }) => void,

    /**
     * 分钟过滤器，调用 `reject()` 函数可跳过传入的分钟。
     *
     * @default () => {}
     */
    onFilterMinute: noop as (params: {
      /** 时 */
      hour: number,
      /** 分 */
      minute: number,
      /** 跳过当前分钟 */
      reject: () => void,
    }) => void,

    /**
     * 选中的时间。
     *
     * @example
     *
     * [20, 5] // ==> 20 时 5 分
     * [0, 20] // ==> 0 时 20 分
     */
    selectedTime: [] as any as RequiredProp<number[]>,

    /**
     * 单个条目高度。
     *
     * @default '2.5em'
     */
    itemHeight: '2.5em' as string,

    /**
     * 显示条目数量。
     *
     * @default 5
     */
    visibleItemCount: 5 as number,

    /**
     * 是否禁止选中
     *
     * @default false
     */
    disabled: false as boolean,

    /**
     * 是否可点击遮罩关闭。
     *
     * @default true
     */
    maskClosable: true as boolean,

    /**
     * 标题。
     *
     * @default ''
     */
    title: '' as string,

    /**
     * 是否无取消按钮。
     *
     * @default false
     */
    noCancel: false as boolean,

    /**
     * 取消文字。
     *
     * @default '取消'
     */
    cancelText: '取消' as string,

    /**
     * 确定文字。
     *
     * @default '确定'
     */
    confirmText: '确定' as string,

    /**
     * 点击取消事件。
     *
     * @default () => {}
     */
    onCancel: noop as () => void,

    /**
     * 点击确定事件。
     *
     * @default () => {}
     */
    onConfirm: noop as any as RequiredProp<(selectedDate: number[]) => void>,
  },
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
    let pass = true
    const reject = () => {
      pass = false
    }

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
      this.props.onFilterHour({
        hour: hour,
        reject: reject,
      })
      if (pass) {
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
          this.props.onFilterMinute({
            hour: hour,
            minute: minute,
            reject: reject,
          })
          if (pass) {
            if (minute === props.selectedTime[1]) {
              selectedIndexes[1] = minuteList.length
            }
            minuteList.push({
              label: useRawMinuteValue ? minute.toString() : formatHI(props.formatMinute, { i: minute }),
              value: minute,
            })
          } else {
            pass = true
          }
        }
        selectedIndexes[1] = selectedIndexes[1] == null ? 0 : selectedIndexes[1]
      } else {
        pass = true
      }
    }
    selectedIndexes[0] = selectedIndexes[0] == null ? 0 : selectedIndexes[0]

    this.setState({
      localData: hourList,
      localSelectedIndexes: selectedIndexes,
    })
  }

  handleCancel = () => {
    this.props.onCancel()
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
      maskClosable,
      itemHeight,
      visibleItemCount,
      noCancel,
      cancelText,
      confirmText,
      title,
      className,
    } = this.props
    const {
      localData,
      localSelectedIndexes,
    } = this.state
    return localData.length ? (
      <MPicker
        maskClosable={maskClosable}
        data={localData}
        selectedIndexes={localSelectedIndexes}
        itemHeight={itemHeight}
        visibleItemCount={visibleItemCount}
        noCancel={noCancel}
        cancelText={cancelText}
        confirmText={confirmText}
        title={title}
        className={className}
        onCancel={this.handleCancel}
        onConfirm={this.handleConfirm}>
        {this.props.children}
      </MPicker>
    ) : this.props.children
  }
}

export default MTimePicker
