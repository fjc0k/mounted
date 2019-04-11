import Collector from './CollectorB'
import Taro from '@tarojs/taro'
import { Button, Form } from '@tarojs/components'
import { PureComponent } from '@tarojs/taro'

export default class CollectorA extends PureComponent<{
  count: number,
  onCollect: (e: { detail: { formId: string } }) => void,
}> {
  static options: wx.ComponentOptions = {
    addGlobalClass: true,
  }

  render() {
    const { count } = this.props
    return (
      <Form
        className='m-form-id-collector_form'
        reportSubmit={true}
        onSubmit={this.props.onCollect}>
        <Button formType='submit'>
          {count > 1 ? (
            <Collector
              count={count - 1}
              onCollect={this.props.onCollect}>
              {this.props.children}
            </Collector>
          ) : (
            this.props.children
          )}
        </Button>
      </Form>
    )
  }
}
