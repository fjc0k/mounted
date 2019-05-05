import { noop, omit } from 'vtils'
import { PickerViewProps } from '../PickerView/props'
import { RequiredProp } from '../component'

export const PickerProps = {
  ...omit(PickerViewProps, ['onChange', 'onPickEnd', 'onPickStart']),

  /**
   * 是否可点击遮罩关闭。
   *
   * @default true
   */
  maskClosable: true as boolean,

  /**
   * 标题。
   *
   * @default ''
   */
  title: '' as string,

  /**
   * 是否无取消按钮。
   *
   * @default false
   */
  noCancel: false as boolean,

  /**
   * 取消文字。
   *
   * @default '取消'
   */
  cancelText: '取消' as string,

  /**
   * 确定文字。
   *
   * @default '确定'
   */
  confirmText: '确定' as string,

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
}
