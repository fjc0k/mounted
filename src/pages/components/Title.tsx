import './Title.scss'
import Taro from '@tarojs/taro'
import { component } from '../../components/component'
import { View } from '@tarojs/components'

export default class XTitle extends component({
  disableGlobalClass: true,
}) {
  render() {
    return (
      <View className='title'>
        {this.props.children}
      </View>
    )
  }
}
