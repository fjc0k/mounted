import {createProps, RequiredProp} from '../component'
import {MPickerDefaultProps} from '../Picker/props'
import {MSinglePickerData} from './types'
import {noop, omit} from 'vtils'

export const MSinglePickerDefaultProps = {
  ...omit(
    MPickerDefaultProps,
    ['data', 'selectedIndexes', 'onConfirm'],
  ),

  ...createProps({
    /**
     * 选项数据。
     */
    data: [] as any as RequiredProp<MSinglePickerData>,

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
  }),
}

export type MSinglePickerProps = typeof MSinglePickerDefaultProps
