import Taro from '@tarojs/taro'
import { Block, Button, Form, Label } from '@tarojs/components'
import { component } from '../component'
import { MFormIdCollectorProps } from './props'
import { range } from 'vtils'

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
  props: MFormIdCollectorProps,
}) {
  formIds: string[] = []

  handleCollect: (typeof Form)['defaultProps']['onSubmit'] = e => {
    this.formIds.push(e.detail.formId)
    if (this.formIds.length === this.props.count) {
      this.props.onCollect(
        this.formIds
          .filter(formId => formId && !formId.startsWith('requestFormId:fail'))
          .slice(),
      )
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
