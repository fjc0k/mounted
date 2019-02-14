import { noop, omit } from 'vtils'
import defaultProps from '../PickerView/defaultProps'

export default {
  ...omit(defaultProps, ['onChange']),
  maskClosable: true as boolean,
  title: '' as string,
  noCancel: false as boolean,
  cancelText: '取消' as string,
  confirmText: '确定' as string,
  onCancel: noop as () => void,
  onConfirm: noop,
}
