import { createProps, RequiredProp } from '../component'

export const NavigationBarDefaultProps = createProps({
  /**
   * 小程序主页的绝对路径，可带参数。
   *
   * @example '/pages/index/index?id=40'
   */
  homePath: '' as any as RequiredProp<string>,

  /**
   * 导航栏字体颜色，务必同时设置 `app.json` 中的 `window.navigationBarTextStyle` 且保持二者一致。
   *
   * @default 'white'
   */
  textStyle: 'white' as 'white' | 'black',

  /**
   * 导航栏背景颜色。默认值是 `auto`，表示：
   * - 若 `textStyle='white'`，则 `backgroundColor='#000000'`；
   * - 若 `textStyle='black'`，则 `backgroundColor='#FFFFFF'`。
   *
   * @default 'auto'
   */
  backgroundColor: 'auto' as string,
})

export type NavigationBarProps = typeof NavigationBarDefaultProps
