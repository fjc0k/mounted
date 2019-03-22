import { noop } from 'vtils'

export default {
  data: [],
  value: [],
  /** 单个条目高度 */
  itemHeight: '2.5em' as string,
  /** 显示条目数量 */
  visibleItemCount: 5 as number,
  /** 是否禁止选中 */
  disabled: false as boolean,
  onChange: noop,
}
