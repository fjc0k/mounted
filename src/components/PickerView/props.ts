import { Data } from '.'
import { noop } from 'vtils'
import { RequiredProp } from '../component'

export const PickerViewProps = {
  /**
   * 选项数据。
   */
  data: [] as any as RequiredProp<Data>,

  /**
   * 选中条目的索引列表。
   */
  selectedIndexes: [] as any as RequiredProp<number[]>,

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
   * 是否禁止选中。
   *
   * @default false
   */
  disabled: false as boolean,

  /**
   * 分隔符，用以分割列。
   *
   * @example
   *
   * '-' // 分隔符为 - 号
   * '至' // 分隔符为 至 字
   * 0 // 分隔符为数字 0
   * ['-', ':'] // 分隔符依次为 - 号、: 号
   *
   * @default ''
   */
  separator: '' as string | number | Array<string | number>,

  /**
   * 选中值改变事件。
   */
  onChange: noop as any as RequiredProp<(selectedIndexes: number[]) => void>,

  /**
   * 选择开始事件。
   *
   * @default () => {}
   */
  onPickStart: noop as () => void,

  /**
   * 选择结束事件。
   *
   * @default () => {}
   */
  onPickEnd: noop as () => void,
}
