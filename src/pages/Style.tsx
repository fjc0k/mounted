import Taro from '@tarojs/taro'
import { Button, View } from '@tarojs/components'
import { component } from '../components/component'
import { XItem, XList, XTitle } from './components'

export default class Style extends component() {
  render() {
    return (
      <View>
        <XTitle>.m-pure-button</XTitle>
        <XList>
          <XItem
            title='去除原生 Button 组件自带的样式，仅保留文字居中，如：'
          />
          <XItem>
            <Button
              className='m-pure-button'
              openType='openSetting'>
              {'打开设置'}
            </Button>
          </XItem>
        </XList>
      </View>
    )
  }
}
