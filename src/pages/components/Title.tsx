import './Title.scss'
import { View } from '@tarojs/components'
import { component } from '../../components/component'

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
