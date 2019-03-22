import Self from './Collector'
import Taro from '@tarojs/taro'
import { Button, Form } from '@tarojs/components'
import { component, RequiredProp } from '../component'
import { noop } from 'vtils'

export default class Collector extends component({
  props: {
    count: 0 as any as RequiredProp<number>,
    onCollect: noop as any as RequiredProp<
      (e: { detail: { formId: string } }) => void
    >,
  },
}) {
  public render() {
    const { count } = this.props
    return (
      <Form
        className='m-form-id-collector__collector'
        reportSubmit={true}
        onSubmit={this.props.onCollect}>
        <Button formType='submit'>
          {
            count > 1
              ? (
                <Self
                  count={count - 1}
                  onCollect={this.props.onCollect}>
                  {this.props.children}
                </Self>
              )
              : this.props.children
          }
        </Button>
      </Form>
    )
  }
}
