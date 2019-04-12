import Taro from '@tarojs/taro'
import { Block, Button, Form, Label } from '@tarojs/components'
import { component } from '../component'
import { noop, range } from 'vtils'

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
  },
}) {
  formIds: string[] = []

  handleCollect = e => {
    this.formIds.push(e.detail.formId)
    if (this.formIds.length === this.props.count) {
      this.props.onCollect(this.formIds.slice())
      this.formIds = []
    }
  }

  render() {
    const { count, disabled } = this.props
    const finalCount = Math.min(count, 7)
    return (disabled || finalCount === 0) ? this.props.children : (
      <Block>
        <Label for='button_6'>
          <Label for='button_5'>
            <Label for='button_4'>
              <Label for='button_3'>
                <Label for='button_2'>
                  <Label for='button_1'>
                    <Label for='button_0'>
                      {this.props.children}
                    </Label>
                  </Label>
                </Label>
              </Label>
            </Label>
          </Label>
        </Label>
        {range(0, finalCount).map(i => (
          <Form
            key={i}
            className='m-form-id-collector_form'
            reportSubmit={true}
            onSubmit={this.handleCollect}>
            <Button
              id={`button_${i}`}
              formType='submit'
            />
          </Form>
        ))}
      </Block>
    )
  }
}
