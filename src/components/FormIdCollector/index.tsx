import Collector from './Collector'
import Taro from '@tarojs/taro'
import { Button, Label, View } from '@tarojs/components'
import { component } from '../component'
import { noop } from 'vtils'

/**
 * Form Id 收集组件。
 */
export default class MFormIdCollector extends component({
  props: {
    /** 每次点击的收集个数 */
    count: 1 as number,
    /** 是否禁用 */
    disabled: false as boolean,
    /** 收集完成事件 */
    onCollect: noop as (formIds: string[]) => void,
  },
}) {
  /** Form Id 列表 */
  formIds: string[] = []

  handleSubmit: Collector['props']['onCollect'] = e => {
    this.formIds.push(e.detail.formId)
    if (this.formIds.length === this.props.count) {
      this.props.onCollect(this.formIds.slice())
      this.formIds = []
    }
  }

  public render() {
    const { count, disabled } = this.props
    return disabled ? this.props.children : (
      <View>
        <Label for='button'>
          {this.props.children}
        </Label>
        <Collector
          count={count}
          onCollect={this.handleSubmit}>
          <Button id='button' />
        </Collector>
      </View>
    )
  }
}
