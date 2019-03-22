import './List.scss'
import Taro from '@tarojs/taro'
import { component } from '../../components/component'
import { View } from '@tarojs/components'

export default class XList extends component({
  disableGlobalClass: true,
}) {
  render() {
    return (
      <View className='list'>
        <View className='content'>
          {this.props.children}
        </View>
      </View>
    )
  }
}
