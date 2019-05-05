import { Data } from '.'
import { noop, omit } from 'vtils'
import { PickerProps } from '../Picker/props'
import { RequiredProp } from '../component'

export const SinglePickerProps = {
  ...omit(PickerProps, ['data', 'selectedIndexes', 'onConfirm']),

  /**
   * 选项数据。
   */
  data: [] as any as RequiredProp<Data>,

  /**
   * 选中条目的索引。
   */
  selectedIndex: 0 as any as RequiredProp<number>,

  /**
   * 点击确定事件。
   *
   * @default () => {}
   */
  onConfirm: noop as any as RequiredProp<(selectedIndex: number) => void>,
}
