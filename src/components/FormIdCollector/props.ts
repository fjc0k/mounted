import { noop } from 'vtils'

export const MFormIdCollectorProps = {
  /**
   * 收集个数。最多一次收集 7 个。
   *
   * @default 1
   */
  count: 1 as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7,

  /**
   * 是否禁用。
   *
   * @default false
   */
  disabled: false as boolean,

  /**
   * 收集完成事件。
   *
   * @default () => {}
   */
  onCollect: noop as (formIds: string[]) => void,
}
