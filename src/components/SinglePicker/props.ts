import { MPickerProps } from '../Picker/props'
import { noop, omit } from 'vtils'
import { NormalItem } from '../PickerView'
import { RequiredProp } from '../component'

export type Item = NormalItem
export type Data = Item[]

export const MSinglePickerProps = {
  ...omit(MPickerProps, ['data', 'selectedIndexes', 'onConfirm']),

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
