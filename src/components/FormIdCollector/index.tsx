import Collector from './CollectorA'
import Taro from '@tarojs/taro'
import { Block, Button, Label } from '@tarojs/components'
import { component } from '../component'
import { noop } from 'vtils'

/**
 * 微信小程序 FormId 收集器。
 *
 * @example
 *
 * ```jsx
 * <MFormIdCollector
 *   count={5}
 *   onCollect={formIds => console.log(formIds)}>
 *   <View>任意内容</View>
 * </MFormIdCollector>
 * ```
 */
export default class MFormIdCollector extends component({
  props: {
    /**
     * 收集个数。
     *
     * @default 7
     */
    count: 7 as number,

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
  },
}) {
  formIds: string[] = []

  handleCollect: Collector['props']['onCollect'] = e => {
    this.formIds.push(e.detail.formId)
    if (this.formIds.length === this.props.count) {
      this.props.onCollect(this.formIds.slice())
      this.formIds = []
    }
  }

  render() {
    const { count, disabled } = this.props
    return disabled ? this.props.children : (
      <Block>
        <Label for='button'>
          {this.props.children}
        </Label>
        <Collector
          count={count}
          onCollect={this.handleCollect}>
          <Button id='button' />
        </Collector>
      </Block>
    )
  }
}
