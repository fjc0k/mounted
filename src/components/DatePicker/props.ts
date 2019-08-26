import {createProps, RequiredProp} from '../component'
import {MPickerDefaultProps} from '../Picker/props'
import {noop, omit} from 'vtils'

const currentYear = new Date().getFullYear()

export const MDatePickerDefaultProps = {
  ...omit(
    MPickerDefaultProps,
    ['data', 'selectedIndexes', 'onConfirm'],
  ),

  ...createProps({
    /**
     * 开始日期。可以是：
     *
     * - 字符串: `2019-2-03`
     * - ISO 8601 字符串：`2019-07-10T08:30:19.710Z`
     * - Unix 时间戳: `1554916837`
     *
     * @default `${currentYear - 10}-1-1`
     */
    startDate: `${currentYear - 10}-1-1` as string | number,

    /**
     * 结束日期。可以是：
     *
     * - 字符串: `2019-2-03`
     * - ISO 8601 字符串：`2019-07-10T08:30:19.710Z`
     * - Unix 时间戳: `1554916837`
     *
     * @default `${currentYear + 10}-12-31`
     */
    endDate: `${currentYear + 10}-12-31` as string | number,

    /**
     * 格式化年份。
     *
     * @default params => params.year
     */
    formatYear: undefined as (params: {
      /** 年 */
      year: number,
    }) => string | number,

    /**
     * 格式化月份。
     *
     * @default params => params.month
     */
    formatMonth: undefined as (params: {
      /** 年 */
      year: number,
      /** 月 */
      month: number,
    }) => string | number,

    /**
     * 格式化天数。
     *
     * @default params => params.day
     */
    formatDay: undefined as (params: {
      /** 年 */
      year: number,
      /** 月 */
      month: number,
      /** 日 */
      day: number,
    }) => string | number,

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
  }),
}

export type MDatePickerProps = typeof MDatePickerDefaultProps
