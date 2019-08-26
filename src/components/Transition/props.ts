import {createProps, RequiredProp} from '../component'
import {noop} from 'vtils'

export const MTransitionDefaultProps = createProps({
  /**
   * 组件是否可见。
   */
  visible: true as any as RequiredProp<boolean>,

  /**
   * 动画名称。可以是：
   *
   * - `fade`: 淡入
   * - `fadeUp`: 上滑淡入
   * - `fadeDown`: 下滑淡入
   * - `fadeLeft`: 左滑淡入
   * - `fadeRight`: 右滑淡入
   * - `slideUp`: 上滑进入
   * - `slideDown`: 下滑进入
   * - `slideLeft`: 左滑进入
   * - `slideRight`: 右滑进入
   * - `zoom`: 缩放
   * - `drop`: 掉落
   *
   * @default 'fade'
   */
  name: 'fade' as (
    'fade' |
    'fadeUp' |
    'fadeDown' |
    'fadeLeft' |
    'fadeRight' |
    'slideUp' |
    'slideDown' |
    'slideLeft' |
    'slideRight' |
    'zoom' |
    'drop'
  ),

  /**
   * 动画时长，单位：毫秒。
   *
   * @default 300
   */
  duration: 300 as number,

  /**
   * 动画结束事件。
   *
   * @default () => {}
   */
  onTransitionEnd: noop as () => void,
})

export type MTransitionProps = typeof MTransitionDefaultProps
