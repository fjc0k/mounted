import * as ECharts from 'echarts'
import { noop } from 'vtils'
import { RequiredProp } from '../component'

export const MEChartsProps = {
  /**
   * 获取 `ECharts` 对象的函数。
   *
   * 请进入 https://echarts.baidu.com/builder.html 在线定制 `ECharts`，然后引入使用：
   *
   * ```jsx
   * const getECharts = () => require('./path/to/my/echarts')
   * ```
   */
  getECharts: noop as any as RequiredProp<() => ECharts.ECharts>,

  /**
   * 传递给 `ECharts` 的选项。
   *
   * @see https://echarts.baidu.com/option.html
   */
  options: {} as any as RequiredProp<ECharts.EChartOption>,

  /**
   * 是否禁用触摸反馈。
   *
   * @default false
   */
  disableTouch: false as boolean,
}
