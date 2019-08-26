import {createProps, RequiredProp} from '../component'
import {MPickerDefaultProps} from '../Picker/props'
import {noop, omit} from 'vtils'

export const MTimePickerDefaultProps = {
  ...omit(
    MPickerDefaultProps,
    ['data', 'selectedIndexes', 'onConfirm'],
  ),

  ...createProps({
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
     * @default params => params.hour
     */
    formatHour: undefined as (params: {
      /** 时 */
      hour: number,
    }) => string | number,

    /**
     * 格式化分钟。
     *
     * @default params => params.minute
     */
    formatMinute: undefined as (params: {
      /** 时 */
      hour: number,
      /** 分 */
      minute: number,
    }) => string | number,

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
     * [20, 5] // => 20 时 5 分
     * [0, 20] // => 0 时 20 分
     */
    selectedTime: [] as any as RequiredProp<number[]>,

    /**
     * 点击确定事件。
     *
     * @default () => {}
     */
    onConfirm: noop as any as RequiredProp<(selectedTime: number[]) => void>,
  }),
}

export type MTimePickerProps = typeof MTimePickerDefaultProps
