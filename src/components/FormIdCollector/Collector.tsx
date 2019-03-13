import { Form, Button } from '@tarojs/components'
import { noop } from 'vtils'
import { component, RequiredProp } from '../component'
import Self from './Collector'

export default class Collector extends component({
  enableGlobalClass: true,
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
