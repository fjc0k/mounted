import {createProps, RequiredProp} from '../component'
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
  ...createProps({
    /**
     * 是否可点击遮罩关闭。
     *
     * @default true
     */
    maskClosable: true as boolean,

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
