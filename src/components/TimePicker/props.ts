import { MPickerProps } from '../Picker/props'
import { noop, omit } from 'vtils'
import { RequiredProp } from '../component'

export const MTimePickerProps = {
  ...omit(MPickerProps, ['data', 'selectedIndexes', 'onConfirm']),

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
   * 小时过滤器，返回 `true` 可过滤掉传入的小时。
   */
  filterHour: undefined as (params: {
    /** 时 */
    hour: number,
  }) => boolean | void,

  /**
   * 分钟过滤器，返回 `true` 可过滤掉传入的分钟。
   */
  filterMinute: undefined as (params: {
    /** 时 */
    hour: number,
    /** 分 */
    minute: number,
  }) => boolean | void,

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
   * 点击确定事件。
   *
   * @default () => {}
   */
  onConfirm: noop as any as RequiredProp<(selectedTime: number[]) => void>,
}
