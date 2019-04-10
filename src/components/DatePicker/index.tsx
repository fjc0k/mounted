import MPicker from '../Picker'
import Taro from '@tarojs/taro'
import { CascadedData, NormalItem } from '../PickerView'
import { component, RequiredProp } from '../component'
import { formatTemplate, getDaysInMonth, memoize, noop } from 'vtils'

export type Item = NormalItem
export type Data = Item[]

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

const currentYear = new Date().getFullYear()

/**
 * 日期选择器组件。
 */
class MDatePicker extends component({
  props: {
    /**
     * 开始年份。
     *
     * @default new Date().getFullYear() - 10
     */
    startYear: (currentYear - 10) as number,
    /**
     * 结束年份。
     *
     * @default new Date().getFullYear() + 10
     */
    endYear: (currentYear + 10) as number,
    /**
     * 格式化年份。
     *
     * @example
     *
     * 'y' --> '2019'
     * 'yy' --> '19'
     * 'yyy' --> '019'
     * 'yyyy' --> '2019'
     * 'y年' --> '2019年'
     *
     * @default 'y'
     */
    formatYear: 'y' as string,
    /**
     * 格式化月份。
     *
     * @example
     *
     * 'm' --> '5'
     * 'mm' --> '05'
     * 'm月' --> '5月'
     *
     * @default 'm'
     */
    formatMonth: 'm' as string,
    /**
     * 格式化天数。
     *
     * @example
     *
     * 'd' --> '9'
     * 'dd' --> '09'
     * 'd日' --> '9日'
     *
     * @default 'd'
     */
    formatDay: 'd' as string,
    /**
     * 年份过滤器，调用 `reject()` 函数可跳过传入的年份。
     *
     * @default () => {}
     */
    onFilterYear: noop as (params: {
      /** 年 */
      year: number,
      /** 跳过当前年份 */
      reject: () => void,
    }) => void,
    /**
     * 月份过滤器，调用 `reject()` 函数可跳过传入的月份。
     *
     * @default () => {}
     */
    onFilterMonth: noop as (params: {
      /** 年 */
      year: number,
      /** 月 */
      month: number,
      /** 跳过当前月份 */
      reject: () => void,
    }) => void,
    /**
     * 日期过滤器，调用 `reject()` 函数可跳过传入的日期。
     *
     * @default () => {}
     */
    onFilterDay: noop as (params: {
      /** 年 */
      year: number,
      /** 月 */
      month: number,
      /** 日 */
      day: number,
      /** 跳过当前日期 */
      reject: () => void,
    }) => void,
    /**
     * 选中的日期。
     */
    selectedDate: [] as any as RequiredProp<number[]>,
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
    let pass = true
    const reject = () => {
      pass = false
    }

    const useRawYearValue = props.formatYear === '' || props.formatYear === 'y' || props.formatYear === 'yyyy'
    const useRawMonthValue = props.formatMonth === '' || props.formatMonth === 'm'
    const useRawDayValue = props.formatDay === '' || props.formatDay === 'd'

    const yearList: CascadedData = []
    const selectedIndexes: number[] = []
    for (let year = props.startYear; year <= props.endYear; year++) {
      this.props.onFilterYear({
        year: year,
        reject: reject,
      })
      if (pass) {
        if (year === props.selectedDate[0]) {
          selectedIndexes[0] = yearList.length
        }
        const monthList: CascadedData = []
        yearList.push({
          label: useRawYearValue ? year.toString() : formatYMD(props.formatYear, { y: year }),
          value: year,
          children: monthList,
        })
        for (let month = 1; month <= 12; month++) {
          this.props.onFilterMonth({
            year: year,
            month: month,
            reject: reject,
          })
          if (pass) {
            if (month === props.selectedDate[1]) {
              selectedIndexes[1] = monthList.length
            }
            const dayList: CascadedData = []
            monthList.push({
              label: useRawMonthValue ? month.toString() : formatYMD(props.formatMonth, { m: month }),
              value: month,
              children: dayList,
            })
            const days = getDaysInMonth(month, year)
            for (let day = 1; day <= days; day++) {
              this.props.onFilterDay({
                year: year,
                month: month,
                day: day,
                reject: reject,
              })
              if (pass) {
                if (day === props.selectedDate[2]) {
                  selectedIndexes[2] = dayList.length
                }
                dayList.push({
                  label: useRawDayValue ? day.toString() : formatYMD(props.formatDay, { d: day }),
                  value: day,
                })
              } else {
                pass = true
              }
            }
            selectedIndexes[2] = selectedIndexes[2] == null ? 0 : selectedIndexes[2]
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
      localData: yearList,
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

export default MDatePicker
