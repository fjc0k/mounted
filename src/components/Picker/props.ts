import {createProps, RequiredProp} from '../component'
import {MBottomSheetDefaultProps} from '../BottomSheet/props'
import {MPickerHeaderDefaultProps} from '../PickerHeader/props'
import {MPickerViewDefaultProps} from '../PickerView/props'
import {noop, omit} from 'vtils'

export const MPickerDefaultProps = {
  ...omit(
    MPickerViewDefaultProps,
    ['onChange', 'onPickEnd', 'onPickStart'],
  ),
  ...omit(
    MPickerHeaderDefaultProps,
    ['onCancel', 'onConfirm'],
  ),
  ...omit(
    MBottomSheetDefaultProps,
    ['renderMain'],
  ),
  ...createProps({
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
    onConfirm: noop as any as RequiredProp<(selectedIndexes: number[]) => void>,
  }),
}

export type MPickerProps = typeof MPickerDefaultProps
