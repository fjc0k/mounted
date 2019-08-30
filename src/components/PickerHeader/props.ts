import {createProps} from '../component'
import {noop} from 'vtils'

export const MPickerHeaderDefaultProps = createProps({
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
  onConfirm: noop as () => void,
})

export type MPickerHeaderProps = typeof MPickerHeaderDefaultProps
