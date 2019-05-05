import { noop, omit } from 'vtils'
import { PickerProps } from '../Picker/props'
import { RequiredProp } from '../component'

const currentYear = new Date().getFullYear()

export const DatePickerProps = {
  ...omit(PickerProps, ['data', 'selectedIndexes', 'onConfirm']),

  /**
   * 开始日期。可以是：
   *
   * - 字符串: `2019-2-03`
   * - Unix 时间戳: `1554916837`
   *
   * @default `${currentYear - 10}-1-1`
   */
  startDate: `${currentYear - 10}-1-1` as string | number,

  /**
   * 结束日期。可以是：
   *
   * - 字符串: `2019-2-03`
   * - Unix 时间戳: `1554916837`
   *
   * @default `${currentYear + 10}-12-31`
   */
  endDate: `${currentYear + 10}-12-31` as string | number,

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
   * 年份过滤器，返回 `true` 可过滤掉传入的年份。
   */
  filterYear: undefined as (params: {
    /** 年 */
    year: number,
  }) => boolean | void,

  /**
   * 月份过滤器，返回 `true` 可过滤掉传入的月份。
   */
  filterMonth: undefined as (params: {
    /** 年 */
    year: number,
    /** 月 */
    month: number,
  }) => boolean | void,

  /**
   * 日期过滤器，返回 `true` 可过滤掉传入的日期。
   */
  filterDay: undefined as (params: {
    /** 年 */
    year: number,
    /** 月 */
    month: number,
    /** 日 */
    day: number,
  }) => boolean | void,

  /**
   * 选中的日期。
   */
  selectedDate: [] as any as RequiredProp<number[]>,

  /**
   * 点击确定事件。
   *
   * @default () => {}
   */
  onConfirm: noop as any as RequiredProp<(selectedDate: number[]) => void>,
}
