import './List.scss'
import { View } from '@tarojs/components'
import { component } from '../../components/component'

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
